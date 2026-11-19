/**
 * Vite/preview middleware that serves POST/GET /api/early-access from the
 * same Worker handler with an in-memory KV. Not Cloudflare edge proof.
 */
import {
  createMemoryKv,
  handleIntakeRequest,
  INTAKE_PATH,
  normalizePath,
} from "../workers/early-access/src/intake.js";

function readBody(req) {
  return new Promise((resolve, reject) => {
    const chunks = [];
    req.on("data", (chunk) => chunks.push(chunk));
    req.on("end", () => resolve(Buffer.concat(chunks)));
    req.on("error", reject);
  });
}

export function createLocalIntakeEnv() {
  return {
    INTAKE: createMemoryKv(),
    TURNSTILE_SITE_KEY:
      process.env.TURNSTILE_SITE_KEY?.trim() || "1x00000000000000000000AA",
    TURNSTILE_SECRET_KEY:
      process.env.TURNSTILE_SECRET_KEY?.trim() ||
      "1x0000000000000000000000000000000AA",
    ALLOW_DEV_BYPASS: process.env.ALLOW_DEV_BYPASS?.trim() || "1",
  };
}

export function createIntakeMiddleware(env = createLocalIntakeEnv()) {
  return async function intakeMiddleware(req, res, next) {
    const host = req.headers.host || "127.0.0.1";
    const originBase = `http://${host}`;
    let pathname = "/";
    try {
      pathname = normalizePath(new URL(req.url || "/", originBase).pathname);
    } catch {
      next();
      return;
    }
    if (pathname !== INTAKE_PATH) {
      next();
      return;
    }

    try {
      const headers = new Headers();
      for (const [key, value] of Object.entries(req.headers)) {
        if (value == null) continue;
        headers.set(key, Array.isArray(value) ? value.join(", ") : String(value));
      }
      if (!headers.has("origin")) {
        headers.set("origin", originBase);
      }
      const method = req.method || "GET";
      const raw =
        method === "GET" || method === "HEAD" || method === "OPTIONS"
          ? undefined
          : await readBody(req);
      const request = new Request(new URL(pathname, originBase), {
        method,
        headers,
        body: raw && raw.length > 0 ? raw : undefined,
      });
      const response = await handleIntakeRequest(request, env);
      res.statusCode = response.status;
      response.headers.forEach((value, key) => {
        res.setHeader(key, value);
      });
      const buf = Buffer.from(await response.arrayBuffer());
      res.end(buf);
    } catch {
      res.statusCode = 500;
      res.setHeader("content-type", "application/json; charset=utf-8");
      res.end(JSON.stringify({ ok: false, error: "local_intake_failed" }));
    }
  };
}
