import test from "node:test";
import assert from "node:assert/strict";
import {
  createMemoryKv,
  handleIntakeRequest,
  INTAKE_PATH,
} from "./intake.js";

function env(overrides = {}) {
  return {
    INTAKE: createMemoryKv(),
    TURNSTILE_SITE_KEY: "1x00000000000000000000AA",
    TURNSTILE_SECRET_KEY: "1x0000000000000000000000000000000AA",
    ALLOW_DEV_BYPASS: "1",
    ...overrides,
  };
}

function request(method, body, headers = {}, origin = "http://127.0.0.1:4173") {
  const init = {
    method,
    headers: {
      origin,
      "x-mishti-intake": "1",
      ...headers,
    },
  };
  if (body !== undefined) {
    init.headers["content-type"] = init.headers["content-type"] || "application/json";
    init.body = typeof body === "string" ? body : JSON.stringify(body);
  }
  return new Request(`http://127.0.0.1:4173${INTAKE_PATH}`, init);
}

async function read(response) {
  return {
    status: response.status,
    body: await response.json(),
  };
}

const valid = {
  name: "Test Operator",
  email: "operator@example.com",
  company: "Example Co",
  message: "Governed evaluation for a non-production pilot.",
  processingAcknowledged: true,
  turnstileToken: "dev-local",
  website: "",
};

test("GET returns public site key when configured", async () => {
  const { status, body } = await read(await handleIntakeRequest(request("GET"), env()));
  assert.equal(status, 200);
  assert.equal(body.ok, true);
  assert.equal(body.enabled, true);
  assert.equal(body.siteKey, "1x00000000000000000000AA");
  assert.equal(body.path, INTAKE_PATH);
});

test("GET reports disabled when Turnstile secret is missing", async () => {
  const { status, body } = await read(
    await handleIntakeRequest(request("GET"), env({ TURNSTILE_SECRET_KEY: "" })),
  );
  assert.equal(status, 200);
  assert.equal(body.enabled, false);
  assert.equal(body.siteKey, "");
});

test("POST stores a valid local request in KV", async () => {
  const store = createMemoryKv();
  const { status, body } = await read(
    await handleIntakeRequest(request("POST", valid), env({ INTAKE: store })),
  );
  assert.equal(status, 200);
  assert.equal(body.ok, true);
  const listed = await store.list({ prefix: "intake:" });
  assert.equal(listed.keys.length, 1);
  const saved = JSON.parse(await store.get(listed.keys[0].name));
  assert.equal(saved.email, "operator@example.com");
  assert.equal(saved.name, "Test Operator");
  assert.ok(saved.ipHash);
  assert.equal(saved.ip, undefined);
});

test("POST honeypot returns success without storing", async () => {
  const store = createMemoryKv();
  const { status, body } = await read(
    await handleIntakeRequest(
      request("POST", { ...valid, website: "https://spam.example" }),
      env({ INTAKE: store }),
    ),
  );
  assert.equal(status, 200);
  assert.equal(body.ok, true);
  const listed = await store.list({ prefix: "intake:" });
  assert.equal(listed.keys.length, 0);
});

test("POST rejects Formspree-style third-party origin", async () => {
  const { status, body } = await read(
    await handleIntakeRequest(
      request("POST", valid, {}, "https://formspree.io"),
      env(),
    ),
  );
  assert.equal(status, 403);
  assert.equal(body.error, "origin_not_allowed");
});

test("POST requires Turnstile token", async () => {
  const { status, body } = await read(
    await handleIntakeRequest(request("POST", { ...valid, turnstileToken: "" }), env()),
  );
  assert.equal(status, 400);
  assert.equal(body.error, "turnstile_required");
});

test("POST requires processing acknowledgment", async () => {
  const { status, body } = await read(
    await handleIntakeRequest(
      request("POST", { ...valid, processingAcknowledged: false }),
      env(),
    ),
  );
  assert.equal(status, 400);
  assert.equal(body.error, "acknowledgment_required");
});

test("POST rejects invalid email", async () => {
  const { status, body } = await read(
    await handleIntakeRequest(request("POST", { ...valid, email: "not-an-email" }), env()),
  );
  assert.equal(status, 400);
  assert.equal(body.error, "invalid_email");
});

test("POST rate-limits the same client", async () => {
  const shared = env();
  for (let i = 0; i < 5; i += 1) {
    const { status } = await read(
      await handleIntakeRequest(
        request("POST", { ...valid, email: `user${i}@example.com` }),
        shared,
      ),
    );
    assert.equal(status, 200);
  }
  const { status, body } = await read(
    await handleIntakeRequest(
      request("POST", { ...valid, email: "user-last@example.com" }),
      shared,
    ),
  );
  assert.equal(status, 429);
  assert.equal(body.error, "rate_limited");
});

test("POST does not mention Formspree or a 24-hour promise", async () => {
  const { body } = await read(await handleIntakeRequest(request("POST", valid), env()));
  const serialized = JSON.stringify(body);
  assert.doesNotMatch(serialized, /formspree|mvzdjvlw|24 hour/i);
});

test("unknown path is 404", async () => {
  const response = await handleIntakeRequest(
    new Request("http://127.0.0.1/api/other"),
    env(),
  );
  assert.equal(response.status, 404);
});
