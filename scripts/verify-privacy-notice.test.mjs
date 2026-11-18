import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

const read = (path) => readFileSync(new URL(path, import.meta.url), "utf8");
const app = read("../src/app/App.tsx");
const footer = read("../src/app/components/Footer.tsx");
const form = read("../src/app/components/Access.tsx");
const privacy = read("../src/app/components/PrivacyNotice.tsx");

test("W4 privacy section is discoverable from site and access form", () => {
  assert.match(app, /<PrivacyNotice\s*\/>/);
  assert.match(privacy, /id="privacy"/);
  assert.match(footer, /href="#privacy"/);
  assert.match(form, /href="#privacy"/);
});

test("W4 clearly identifies actual processor and technical collection", () => {
  assert.match(privacy, /Formspree, a third-party form processing service/);
  assert.match(privacy, /formspree\.io\/legal\/privacy-policy/);
  assert.match(privacy, /technical metadata such as your IP address/);
  assert.match(privacy, /Google Fonts/);
  assert.match(privacy, /niraventp@gmail\.com/);
});

test("W4 does not invent owner/legal identity or retention period", () => {
  assert.match(privacy, /pre-publication draft, pending owner review/i);
  assert.match(privacy, /responsible legal entity and definitive retention schedule/i);
  assert.match(privacy, /exact retention period and deletion configuration have not yet been verified/i);
  assert.match(privacy, /before this website accepts public requests/i);
  assert.doesNotMatch(privacy, /ISO\s?27001 certified|GDPR compliant|DPDP compliant/i);
});
