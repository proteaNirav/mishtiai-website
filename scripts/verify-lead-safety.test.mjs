import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
const app = readFileSync(new URL("../src/app/App.tsx", import.meta.url), "utf8");
const access = readFileSync(new URL("../src/app/components/Access.tsx", import.meta.url), "utf8");
test("public site uses same-origin intake, not Formspree", () => {
  assert.match(app, /<Access\s*\/>/);
  assert.match(access, /<form\b/);
  assert.match(access, /\/api\/early-access/);
  assert.match(access, /challenges\.cloudflare\.com\/turnstile/);
  assert.match(access, /0x4AAAAAAGISoDHLJ7QQJxlG/);
  assert.match(access, /intake_processing_acknowledged/);
  assert.doesNotMatch(access, /1x00000000000000000000AA/);
  assert.doesNotMatch(access, /formspree|mvzdjvlw|within 24 hours/i);
  assert.doesNotMatch(access, /https:\/\/formspree\.io/i);
});
test("no private console or browser console logging forms exposed", () => {
  assert.doesNotMatch(app, /<AccessModal\b|<PartnerModal\b/);
  assert.doesNotMatch(app, /console\.log\s*\(/);
  assert.match(access, /separate private Founder Console/);
});
