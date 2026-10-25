import { createReadStream, existsSync, readFileSync, statSync } from "node:fs";
import { createServer } from "node:http";
import { extname, join, resolve, sep } from "node:path";
import {
  EXPECTED_TITLE,
  STALE_TITLE,
  parseTitle,
  referencedHashedAssets,
  resolvePagesDist,
} from "./pages-output.mjs";

const dist = resolve(resolvePagesDist());
const failures = [];

function fail(message) {
  failures.push(message);
}

console.log(`smoke:static output directory: ${dist}`);

const types = {
  ".html": "text/html; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".svg": "image/svg+xml",
};

function safeFile(urlPath) {
  const relative = urlPath.replace(/^\/+/, "").split("/").join(sep);
  const full = resolve(dist, relative);
  const root = dist.endsWith(sep) ? dist : `${dist}${sep}`;
  if (full !== dist && !full.startsWith(root)) {
    return null;
  }
  return existsSync(full) && statSync(full).isFile() ? full : null;
}

function startServer() {
  return new Promise((resolveServer) => {
    const server = createServer((req, res) => {
      const url = new URL(req.url ?? "/", "http://127.0.0.1");
      const file = safeFile(decodeURIComponent(url.pathname));
      if (!file) {
        res.writeHead(404, { "content-type": "text/plain; charset=utf-8" });
        res.end("not found");
        return;
      }
      res.writeHead(200, { "content-type": types[extname(file)] ?? "application/octet-stream" });
      createReadStream(file).pipe(res);
    });
    server.listen(0, "127.0.0.1", () => {
      const { port } = server.address();
      resolveServer({ server, origin: `http://127.0.0.1:${port}` });
    });
  });
}

async function get(origin, path) {
  const response = await fetch(new URL(path, origin));
  const body = await response.text();
  return {
    status: response.status,
    type: response.headers.get("content-type") ?? "",
    body,
  };
}

const indexPath = join(dist, "index.html");
if (!existsSync(indexPath)) {
  console.error(`Local static-output smoke failed: missing ${indexPath}`);
  process.exit(1);
}

const html = readFileSync(indexPath, "utf8");
const title = parseTitle(html);
if (title.includes(STALE_TITLE) || title !== EXPECTED_TITLE) {
  fail(`index.html title must be "${EXPECTED_TITLE}"; got "${title}"`);
}
const { js: jsRefs, css: cssRefs } = referencedHashedAssets(html);
if (jsRefs.length !== 1 || cssRefs.length !== 1) {
  fail(`index.html must reference exactly one hashed JS and one hashed CSS; js=${jsRefs.join(",")} css=${cssRefs.join(",")}`);
}

const { server, origin } = await startServer();

try {
  const home = await get(origin, "/index.html");
  const homeTitle = parseTitle(home.body);
  if (
    home.status !== 200 ||
    !home.type.includes("text/html") ||
    homeTitle !== EXPECTED_TITLE ||
    homeTitle.includes(STALE_TITLE)
  ) {
    fail(
      `GET /index.html expected current title HTML 200, got ${home.status} ${home.type} title="${homeTitle}"`,
    );
  }

  const logo = await get(origin, "/logo.svg");
  if (logo.status !== 200 || !logo.type.includes("image/svg+xml") || !logo.body.includes("<svg")) {
    fail(`GET /logo.svg expected SVG 200, got ${logo.status} ${logo.type}`);
  }

  for (const jsPath of jsRefs) {
    const js = await get(origin, jsPath);
    if (js.status !== 200 || !js.type.includes("javascript") || js.body.includes("<!DOCTYPE html>")) {
      fail(`GET ${jsPath} expected JS 200, got ${js.status} ${js.type}`);
    }
  }
  for (const cssPath of cssRefs) {
    const css = await get(origin, cssPath);
    if (css.status !== 200 || !css.type.includes("text/css") || css.body.includes("<!DOCTYPE html>")) {
      fail(`GET ${cssPath} expected CSS 200, got ${css.status} ${css.type}`);
    }
  }

  const unknown = await get(origin, "/does-not-exist");
  if (unknown.status !== 404) {
    fail(`GET /does-not-exist expected 404 from naive static server, got ${unknown.status}`);
  }
  if (unknown.body.includes("<!DOCTYPE html>") || unknown.body.includes('id="root"')) {
    fail("unknown path was rewritten to HTML; catch-all must stay removed");
  }
} finally {
  server.close();
}

if (failures.length > 0) {
  console.error("Local static-output smoke failed (not Cloudflare edge):");
  for (const failure of failures) {
    console.error(`- ${failure}`);
  }
  process.exit(1);
}

console.log(`Local static-output smoke passed at ${origin} for ${dist}.`);
console.log("Naive static server, no SPA fallback. This is not Cloudflare edge proof.");
console.log("Vite preview was not used for this smoke.");
