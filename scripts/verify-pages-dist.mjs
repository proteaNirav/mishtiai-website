import { readFileSync, existsSync, readdirSync, statSync } from "node:fs";
import { join } from "node:path";

const dist = "dist";
const failures = [];

function fail(message) {
  failures.push(message);
}

function read(path) {
  return readFileSync(path, "utf8");
}

for (const file of ["index.html", "_headers", "logo.svg"]) {
  if (!existsSync(join(dist, file))) {
    fail(`missing ${join(dist, file)}`);
  }
}

const indexPath = join(dist, "index.html");
if (existsSync(indexPath)) {
  const html = read(indexPath);
  if (!html.includes("<!DOCTYPE html>") && !html.includes("<html")) {
    fail("dist/index.html is not HTML");
  }
  if (!html.includes('id="root"')) {
    fail("dist/index.html missing #root");
  }
  if (!html.includes("/assets/") || !html.includes(".js")) {
    fail("dist/index.html does not reference a hashed JS bundle");
  }
  if (!html.includes(".css")) {
    fail("dist/index.html does not reference a hashed CSS bundle");
  }
}

const logoPath = join(dist, "logo.svg");
if (existsSync(logoPath)) {
  const logo = read(logoPath);
  if (!logo.includes("<svg") || statSync(logoPath).size < 32) {
    fail("dist/logo.svg is not a usable SVG");
  }
}

const redirectsPath = join(dist, "_redirects");
if (existsSync(redirectsPath)) {
  const rules = read(redirectsPath)
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter((line) => line && !line.startsWith("#"));
  if (rules.length > 0) {
    fail(`dist/_redirects must have no rewrite rules; found: ${rules.join(" | ")}`);
  }
  if (rules.some((line) => /\/\*\s+\/index\.html\s+200/.test(line))) {
    fail("dist/_redirects still contains the forbidden /* /index.html 200 catch-all");
  }
}

const headersPath = join(dist, "_headers");
if (existsSync(headersPath)) {
  const headers = read(headersPath);
  const required = [
    ["X-Frame-Options: DENY", "X-Frame-Options DENY"],
    ["X-Content-Type-Options: nosniff", "X-Content-Type-Options nosniff"],
    ["Content-Security-Policy:", "Content-Security-Policy"],
    ["script-src 'self'", "CSP script-src 'self'"],
    ["style-src 'self' 'unsafe-inline'", "CSP style-src unsafe-inline exception"],
    ["formspree.io", "Formspree connect/form-action"],
    ["fonts.googleapis.com", "Google Fonts style-src"],
  ];
  for (const [token, label] of required) {
    if (!headers.includes(token)) {
      fail(`dist/_headers missing ${label}`);
    }
  }
  if (/strict-transport-security/i.test(headers)) {
    fail("dist/_headers must not enable HSTS in this phase");
  }
}

const assetsDir = join(dist, "assets");
if (!existsSync(assetsDir)) {
  fail("missing dist/assets");
} else {
  const assets = readdirSync(assetsDir);
  const js = assets.filter((name) => /^index-[A-Za-z0-9_-]+\.js$/.test(name));
  const css = assets.filter((name) => /^index-[A-Za-z0-9_-]+\.css$/.test(name));
  if (js.length === 0) {
    fail("dist/assets has no hashed JS bundle");
  }
  if (css.length === 0) {
    fail("dist/assets has no hashed CSS bundle");
  }
  for (const name of [...js, ...css]) {
    const size = statSync(join(assetsDir, name)).size;
    if (size < 1024) {
      fail(`${name} is too small to be a real bundle (${size} bytes)`);
    }
  }
}

function countFiles(dir) {
  let count = 0;
  for (const entry of readdirSync(dir)) {
    const path = join(dir, entry);
    if (statSync(path).isDirectory()) {
      count += countFiles(path);
    } else {
      count += 1;
    }
  }
  return count;
}

const fileCount = existsSync(dist) ? countFiles(dist) : 0;
if (fileCount === 0) {
  fail("dist is empty");
} else if (fileCount >= 20000) {
  fail(`dist has ${fileCount} files; Cloudflare Pages free limit is 20000`);
}

if (failures.length > 0) {
  console.error("Cloudflare Pages dist verification failed:");
  for (const failure of failures) {
    console.error(`- ${failure}`);
  }
  process.exit(1);
}

console.log(`Cloudflare Pages dist verification passed (${fileCount} files).`);
console.log("Catch-all rewrite absent. Local checks are not Cloudflare edge proof.");
