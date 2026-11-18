import { readFileSync, existsSync, readdirSync, statSync } from "node:fs";
import { basename, join } from "node:path";
import {
  EXPECTED_TITLE,
  STALE_TITLE,
  parseTitle,
  referencedHashedAssets,
  resolvePagesDist,
} from "./pages-output.mjs";

const dist = resolvePagesDist();
const failures = [];

function fail(message) {
  failures.push(message);
}

function read(path) {
  return readFileSync(path, "utf8");
}

console.log(`verify:pages output directory: ${dist}`);

for (const file of ["index.html", "_headers", "logo.svg"]) {
  if (!existsSync(join(dist, file))) {
    fail(`missing ${join(dist, file)}`);
  }
}

const indexPath = join(dist, "index.html");
let jsRefs = [];
let cssRefs = [];

if (existsSync(indexPath)) {
  const html = read(indexPath);
  if (!html.includes("<!DOCTYPE html>") && !html.includes("<html")) {
    fail(`${indexPath} is not HTML`);
  }
  if (!html.includes('id="root"')) {
    fail(`${indexPath} missing #root`);
  }

  const title = parseTitle(html);
  if (title.includes(STALE_TITLE)) {
    fail(`${indexPath} has stale title "${title}"`);
  }
  if (title !== EXPECTED_TITLE) {
    fail(`${indexPath} title must be "${EXPECTED_TITLE}"; got "${title}"`);
  }

  ({ js: jsRefs, css: cssRefs } = referencedHashedAssets(html));
  if (jsRefs.length !== 1) {
    fail(`${indexPath} must reference exactly one hashed JS bundle; found ${jsRefs.join(", ") || "none"}`);
  }
  if (cssRefs.length !== 1) {
    fail(`${indexPath} must reference exactly one hashed CSS bundle; found ${cssRefs.join(", ") || "none"}`);
  }

  for (const ref of [...jsRefs, ...cssRefs]) {
    const file = join(dist, ref.replace(/^\/+/, ""));
    if (!existsSync(file)) {
      fail(`${indexPath} references missing ${ref}`);
    } else if (statSync(file).size < 1024) {
      fail(`${ref} is too small to be a real bundle (${statSync(file).size} bytes)`);
    }
  }
}

const logoPath = join(dist, "logo.svg");
if (existsSync(logoPath)) {
  const logo = read(logoPath);
  if (!logo.includes("<svg") || statSync(logoPath).size < 32) {
    fail(`${logoPath} is not a usable SVG`);
  }
}

const redirectsPath = join(dist, "_redirects");
if (existsSync(redirectsPath)) {
  const rules = read(redirectsPath)
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter((line) => line && !line.startsWith("#"));
  if (rules.length > 0) {
    fail(`${redirectsPath} must have no rewrite rules; found: ${rules.join(" | ")}`);
  }
  if (rules.some((line) => /\/\*\s+\/index\.html\s+200/.test(line))) {
    fail(`${redirectsPath} still contains the forbidden /* /index.html 200 catch-all`);
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
    ["connect-src 'self'", "CSP no remote script/connection"],
    ["form-action 'self'", "CSP no external form target"],
    ["fonts.googleapis.com", "Google Fonts style-src"],
  ];
  for (const [token, label] of required) {
    if (!headers.includes(token)) {
      fail(`${headersPath} missing ${label}`);
    }
  }
  if (/formspree\.io/i.test(headers)) {
    fail("public info-only site CSP must not allow Formspree submissions");
  }
  if (/strict-transport-security/i.test(headers)) {
    fail(`${headersPath} must not enable HSTS in this phase`);
  }
}

const assetsDir = join(dist, "assets");
if (!existsSync(assetsDir)) {
  fail(`missing ${assetsDir}`);
} else {
  const assets = readdirSync(assetsDir);
  const hashed = assets.filter((name) => /^index-[A-Za-z0-9_-]+\.(js|css)$/.test(name));
  const referencedNames = new Set(
    [...jsRefs, ...cssRefs].map((ref) => basename(ref)),
  );
  const leftovers = hashed.filter((name) => !referencedNames.has(name));
  if (leftovers.length > 0) {
    fail(`stale hashed assets not referenced by index.html: ${leftovers.join(", ")}`);
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
  fail(`${dist} is empty`);
} else if (fileCount >= 20000) {
  fail(`${dist} has ${fileCount} files; Cloudflare Pages free limit is 20000`);
}

if (failures.length > 0) {
  console.error("Cloudflare Pages dist verification failed:");
  for (const failure of failures) {
    console.error(`- ${failure}`);
  }
  process.exit(1);
}

console.log(`Cloudflare Pages dist verification passed (${fileCount} files in ${dist}).`);
console.log("Catch-all rewrite absent. Title and hashed asset refs match this output.");
console.log("Local checks are not Cloudflare edge proof.");
