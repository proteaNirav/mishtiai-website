import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
const app = readFileSync(new URL("../src/app/App.tsx", import.meta.url), "utf8");
const access = readFileSync(new URL("../src/app/components/Access.tsx", import.meta.url), "utf8");
test("public site offers no form or remote lead submission", () => {
  assert.match(app, /<Access\s*\/>/);
  assert.doesNotMatch(access, /<form\b|<input\b|<textarea\b|type="submit"/i);
  assert.doesNotMatch(access, /fetch\s*\(|formspree|mvzdjvlw/i);
  assert.match(access, /Early-access applications are temporarily closed/i);
});
test("no private console or browser console logging forms exposed", () => {
  assert.doesNotMatch(app, /<AccessModal\b|<PartnerModal\b/);
  assert.doesNotMatch(app, /console\.log\s*\(/);
  assert.match(access, /separate private Founder Console/);
});
