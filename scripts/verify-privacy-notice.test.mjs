import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
const read = file => readFileSync(new URL(file, import.meta.url), "utf8");
const app = read("../src/app/App.tsx");
const footer = read("../src/app/components/Footer.tsx");
const notice = read("../src/app/components/PrivacyNotice.tsx");
test("public privacy notice is visible and linked", () => {
  assert.match(app, /<PrivacyNotice\s*\/>/);
  assert.match(footer, /href="#privacy"/);
  assert.match(notice, /id="privacy"/);
});
test("notice describes same-origin Cloudflare intake rather than Formspree", () => {
  assert.match(notice, /Cloudflare/);
  assert.match(notice, /Google Fonts/);
  assert.match(notice, /Turnstile/);
  assert.match(notice, /\/api\/early-access/);
  assert.match(notice, /niraventp@gmail\.com/);
  assert.match(notice, /No response deadline is guaranteed/);
  assert.doesNotMatch(notice, /Formspree|mvzdjvlw|pre-publication draft|within 24 hours/i);
  assert.doesNotMatch(notice, /not currently accepting access-request forms/i);
});
