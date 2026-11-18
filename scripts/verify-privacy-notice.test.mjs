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
test("notice describes current informational site rather than unverified form service", () => {
  assert.match(notice, /Cloudflare/);
  assert.match(notice, /Google Fonts/);
  assert.match(notice, /not currently accepting access-request forms/i);
  assert.match(notice, /niraventp@gmail\.com/);
  assert.doesNotMatch(notice, /Formspree|mvzdjvlw|pre-publication draft|within 24 hours/i);
});
