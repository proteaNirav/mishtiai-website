import { readFileSync, existsSync, readdirSync, statSync } from "node:fs";
import { join } from "node:path";

const dist = "dist";
const requiredFiles = ["index.html", "_redirects", "_headers", "logo.svg"];
const failures = [];

for (const file of requiredFiles) {
  const path = join(dist, file);
  if (!existsSync(path)) {
    failures.push(`missing ${path}`);
  }
}

if (existsSync(join(dist, "_redirects"))) {
  const redirects = readFileSync(join(dist, "_redirects"), "utf8");
  if (!redirects.includes("/index.html") || !redirects.includes("200")) {
    failures.push("dist/_redirects does not contain the SPA 200 rewrite");
  }
}

if (existsSync(join(dist, "_headers"))) {
  const headers = readFileSync(join(dist, "_headers"), "utf8");
  for (const token of [
    "X-Frame-Options",
    "Content-Security-Policy",
    "formspree.io",
    "fonts.googleapis.com",
  ]) {
    if (!headers.includes(token)) {
      failures.push(`dist/_headers missing ${token}`);
    }
  }
}

const assetsDir = join(dist, "assets");
if (!existsSync(assetsDir)) {
  failures.push("missing dist/assets");
} else {
  const assets = readdirSync(assetsDir);
  if (!assets.some((name) => name.endsWith(".js"))) {
    failures.push("dist/assets has no hashed JS bundle");
  }
  if (!assets.some((name) => name.endsWith(".css"))) {
    failures.push("dist/assets has no hashed CSS bundle");
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
const freeLimit = 20000;
if (fileCount === 0) {
  failures.push("dist is empty");
} else if (fileCount >= freeLimit) {
  failures.push(`dist has ${fileCount} files; Cloudflare Pages free limit is ${freeLimit}`);
}

if (failures.length > 0) {
  console.error("Cloudflare Pages dist verification failed:");
  for (const failure of failures) {
    console.error(`- ${failure}`);
  }
  process.exit(1);
}

console.log(`Cloudflare Pages dist verification passed (${fileCount} files).`);
