/**
 * W2 read-only guard for vendor/build files accidentally added to Git.
 */
import { spawnSync } from "node:child_process";
import { existsSync, readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, resolve } from "node:path";
import assert from "node:assert/strict";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
function git(args) {
  const result = spawnSync("git", args, { cwd: root, encoding: "utf8", maxBuffer: 2097152 });
  if (result.error || result.status !== 0) {
    throw new Error("Git invocation failed: " + args.join(" ") + " / " + (result.error?.message || result.stderr));
  }
  return result.stdout;
}
assert.equal(git(["ls-files", "-z", "--", "node_modules", "dist"]).length, 0,
  "tracked vendor/build files detected");
const pkg = JSON.parse(readFileSync(resolve(root, "package.json"), "utf8"));
assert.match(pkg.packageManager || "", /^pnpm@10\./);
assert.ok(existsSync(resolve(root, "pnpm-lock.yaml")), "lockfile missing");
const ignores = readFileSync(resolve(root, ".gitignore"), "utf8").split(/\r?\n/);
for (const pattern of ["node_modules/", "dist/"]) {
  assert.ok(ignores.some((line) => line.trim() === pattern), "Missing .gitignore rule: " + pattern);
}
for (const probe of ["node_modules/__w2_probe.js", "dist/__w2_probe.html"]) {
  const result = spawnSync("git", ["check-ignore", "-q", "--", probe], { cwd: root });
  assert.equal(result.status, 0, "Expected ignored path: " + probe);
}
console.log("W2 PASS: vendor/build trees are not tracked, ignore rules and lockfile intact.");
