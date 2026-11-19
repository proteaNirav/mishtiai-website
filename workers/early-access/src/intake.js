/**
 * Same-origin early-access intake handler.
 * Shared by the Cloudflare Worker and the local Vite preview mock.
 * Does not log personal data.
 */

export const INTAKE_PATH = "/api/early-access";
export const INTAKE_HEADER = "x-mishti-intake";
/** Public Turnstile site key (frontend also bakes this). Not a secret. */
export const PUBLIC_TURNSTILE_SITE_KEY = "0x4AAAAAAGISoDHLJ7QQJxlG";

const PRODUCTION_ORIGINS = new Set([
  "https://mishtiai.in",
  "https://www.mishtiai.in",
]);

const MAX_NAME = 200;
const MAX_EMAIL = 320;
const MAX_COMPANY = 200;
const MAX_MESSAGE = 4000;
const MAX_PER_HOUR = 5;
const RATE_TTL_SECONDS = 3600;

export function jsonResponse(body, status, extraHeaders = {}) {
  return new Response(JSON.stringify(body), {
    status,
    headers: {
      "content-type": "application/json; charset=utf-8",
      "cache-control": "no-store",
      ...extraHeaders,
    },
  });
}

export function corsHeadersFor(origin, env) {
  if (!isAllowedOrigin(origin, env)) {
    return {};
  }
  return {
    "access-control-allow-origin": origin,
    "access-control-allow-methods": "GET, POST, OPTIONS",
    "access-control-allow-headers": `content-type, ${INTAKE_HEADER}, accept`,
    "access-control-max-age": "600",
    vary: "Origin",
  };
}

export function isAllowedOrigin(origin, env = {}) {
  if (!origin) return false;
  if (PRODUCTION_ORIGINS.has(origin)) return true;
  if (env.ALLOW_DEV_BYPASS === "1") {
    try {
      const url = new URL(origin);
      return url.hostname === "localhost" || url.hostname === "127.0.0.1";
    } catch {
      return false;
    }
  }
  return false;
}

export function normalizePath(pathname) {
  if (pathname.length > 1 && pathname.endsWith("/")) {
    return pathname.slice(0, -1);
  }
  return pathname;
}

function clip(value, max) {
  return String(value ?? "").trim().slice(0, max);
}

function isEmail(value) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) && value.length <= MAX_EMAIL;
}

export async function sha256hex(value) {
  const bytes = new TextEncoder().encode(value);
  const digest = await crypto.subtle.digest("SHA-256", bytes);
  return [...new Uint8Array(digest)]
    .map((byte) => byte.toString(16).padStart(2, "0"))
    .join("");
}

export function createMemoryKv() {
  const map = new Map();
  return {
    async get(key) {
      const row = map.get(key);
      if (!row) return null;
      if (row.expires && Date.now() > row.expires) {
        map.delete(key);
        return null;
      }
      return row.value;
    },
    async put(key, value, options = {}) {
      const expires = options.expirationTtl
        ? Date.now() + options.expirationTtl * 1000
        : null;
      map.set(key, { value, expires });
    },
    async list({ prefix = "" } = {}) {
      const keys = [];
      for (const key of map.keys()) {
        if (key.startsWith(prefix)) keys.push({ name: key });
      }
      return { keys };
    },
  };
}

async function verifyTurnstile(token, ip, env) {
  const secret = String(env.TURNSTILE_SECRET_KEY || "").trim();
  if (!secret) return { ok: false, reason: "turnstile_unconfigured" };

  if (
    env.ALLOW_DEV_BYPASS === "1" &&
    token === "dev-local" &&
    (!ip || ip === "127.0.0.1" || ip === "::1")
  ) {
    return { ok: true, reason: "dev_bypass" };
  }

  const body = new URLSearchParams();
  body.set("secret", secret);
  body.set("response", token);
  if (ip) body.set("remoteip", ip);

  try {
    const response = await fetch(
      "https://challenges.cloudflare.com/turnstile/v0/siteverify",
      { method: "POST", body },
    );
    const data = await response.json();
    if (data?.success === true) return { ok: true, reason: "siteverify" };
    return { ok: false, reason: "turnstile_failed" };
  } catch {
    return { ok: false, reason: "turnstile_unreachable" };
  }
}

function clientIp(request) {
  const cf = request.headers.get("cf-connecting-ip");
  if (cf) return cf.trim();
  const forwarded = request.headers.get("x-forwarded-for");
  if (forwarded) return forwarded.split(",")[0].trim();
  return "";
}

function configPayload(env) {
  const secret = String(env.TURNSTILE_SECRET_KEY || "").trim();
  const store = env.INTAKE;
  const enabled = Boolean(secret && store);
  return {
    enabled,
    siteKey: PUBLIC_TURNSTILE_SITE_KEY,
    path: INTAKE_PATH,
  };
}

async function parsePayload(request) {
  const contentType = request.headers.get("content-type") || "";
  if (contentType.includes("application/json")) {
    const data = await request.json();
    return data && typeof data === "object" ? data : {};
  }
  if (
    contentType.includes("application/x-www-form-urlencoded") ||
    contentType.includes("multipart/form-data")
  ) {
    const form = await request.formData();
    return Object.fromEntries(form.entries());
  }
  throw new Error("unsupported_content_type");
}

function acknowledged(value) {
  if (value === true) return true;
  if (typeof value === "string") {
    return ["yes", "true", "on", "1"].includes(value.trim().toLowerCase());
  }
  return false;
}

async function rateLimit(env, ipHash) {
  if (!env.INTAKE) return { ok: false, reason: "store_missing" };
  const hour = new Date().toISOString().slice(0, 13);
  const key = `rl:${hour}:${ipHash}`;
  const current = Number.parseInt((await env.INTAKE.get(key)) || "0", 10);
  if (Number.isFinite(current) && current >= MAX_PER_HOUR) {
    return { ok: false, reason: "rate_limited" };
  }
  await env.INTAKE.put(key, String((Number.isFinite(current) ? current : 0) + 1), {
    expirationTtl: RATE_TTL_SECONDS,
  });
  return { ok: true };
}

async function persist(env, record) {
  const key = `intake:${record.receivedAt}:${record.id}`;
  await env.INTAKE.put(key, JSON.stringify(record));
  return key;
}

async function maybeEmail(env, record) {
  if (!env.INTAKE_EMAIL) return { emailed: false };
  const from = String(env.INTAKE_FROM || "intake@mishtiai.in").trim();
  const to = String(env.INTAKE_NOTIFY_TO || "").trim();
  if (!to) return { emailed: false };
  try {
    const { EmailMessage } = await import("cloudflare:email");
    const subject = "New Mishti AI access request";
    const raw = [
      `From: ${from}`,
      `To: ${to}`,
      `Subject: ${subject}`,
      "MIME-Version: 1.0",
      "Content-Type: text/plain; charset=utf-8",
      "",
      `Received: ${record.receivedAt}`,
      `Name: ${record.name}`,
      `Email: ${record.email}`,
      `Company: ${record.company || "(none)"}`,
      "",
      record.message,
      "",
      "Stored append-only in Cloudflare KV. Do not reply from this message if the mailbox is unattended.",
    ].join("\r\n");
    await env.INTAKE_EMAIL.send(new EmailMessage(from, to, raw));
    return { emailed: true };
  } catch {
    return { emailed: false };
  }
}

export async function handleIntakeRequest(request, env = {}) {
  const url = new URL(request.url);
  const path = normalizePath(url.pathname);
  const origin = request.headers.get("origin") || "";
  const cors = corsHeadersFor(origin, env);

  if (path !== INTAKE_PATH) {
    return jsonResponse({ ok: false, error: "not_found" }, 404, cors);
  }

  if (request.method === "OPTIONS") {
    if (!isAllowedOrigin(origin, env)) {
      return jsonResponse({ ok: false, error: "origin_not_allowed" }, 403);
    }
    return new Response(null, { status: 204, headers: cors });
  }

  if (request.method === "GET") {
    return jsonResponse({ ok: true, ...configPayload(env) }, 200, cors);
  }

  if (request.method !== "POST") {
    return jsonResponse({ ok: false, error: "method_not_allowed" }, 405, {
      ...cors,
      allow: "GET, POST, OPTIONS",
    });
  }

  if (origin && !isAllowedOrigin(origin, env)) {
    return jsonResponse({ ok: false, error: "origin_not_allowed" }, 403, cors);
  }

  const config = configPayload(env);
  if (!config.enabled) {
    return jsonResponse({ ok: false, error: "intake_unavailable" }, 503, cors);
  }

  let payload;
  try {
    payload = await parsePayload(request);
  } catch {
    return jsonResponse({ ok: false, error: "invalid_payload" }, 400, cors);
  }

  const honeypot = clip(payload.website, 200);
  if (honeypot) {
    return jsonResponse({ ok: true }, 200, cors);
  }

  const name = clip(payload.name, MAX_NAME);
  const email = clip(payload.email, MAX_EMAIL).toLowerCase();
  const company = clip(payload.company, MAX_COMPANY);
  const message = clip(payload.message, MAX_MESSAGE);
  const token = clip(
    payload.turnstileToken || payload["cf-turnstile-response"],
    4000,
  );

  if (!name || !email || !message) {
    return jsonResponse({ ok: false, error: "missing_fields" }, 400, cors);
  }
  if (!isEmail(email)) {
    return jsonResponse({ ok: false, error: "invalid_email" }, 400, cors);
  }
  if (!acknowledged(payload.processingAcknowledged)) {
    return jsonResponse({ ok: false, error: "acknowledgment_required" }, 400, cors);
  }
  if (!token) {
    return jsonResponse({ ok: false, error: "turnstile_required" }, 400, cors);
  }

  const ip = clientIp(request);
  const verified = await verifyTurnstile(token, ip, env);
  if (!verified.ok) {
    const status = verified.reason === "turnstile_unconfigured" ? 503 : 400;
    return jsonResponse({ ok: false, error: verified.reason }, status, cors);
  }

  const ipHash = await sha256hex(ip || "unknown");
  const limited = await rateLimit(env, ipHash);
  if (!limited.ok) {
    const status = limited.reason === "rate_limited" ? 429 : 503;
    return jsonResponse({ ok: false, error: limited.reason }, status, cors);
  }

  const receivedAt = new Date().toISOString();
  const id = (await sha256hex(`${receivedAt}:${email}:${ipHash}`)).slice(0, 16);
  const record = {
    id,
    receivedAt,
    name,
    email,
    company,
    message,
    ipHash,
  };

  await persist(env, record);
  await maybeEmail(env, record);

  return jsonResponse({ ok: true }, 200, cors);
}
