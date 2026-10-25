import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

const access = readFileSync(new URL("../src/app/components/Access.tsx", import.meta.url), "utf8");
const app = readFileSync(new URL("../src/app/App.tsx", import.meta.url), "utf8");

test("W3: access request remains user-initiated with processing disclosure", () => {
  assert.match(access, /fetch\("https:\/\/formspree\.io\/f\/mvzdjvlw"/);
  assert.match(access, /event\.preventDefault\(\)/);
  assert.match(access, /type="checkbox"[\s\S]*?name="formspree_processing_acknowledged"[\s\S]*?required/);
  assert.match(access, /third-party form processor/i);
  assert.match(access, /Do not include passwords, secrets/i);
});

test("W3: unverified access and response promises are absent", () => {
  assert.doesNotMatch(access, /within 24 hours|response within 24 hours/i);
  assert.match(access, /Access is not automatic/);
  assert.match(access, /no response deadline is guaranteed/i);
});

test("W3: inactive console-logging modals are not mounted on the public site", () => {
  assert.doesNotMatch(app, /import \{\s*(?:AccessModal|PartnerModal)\s*\}/);
  assert.doesNotMatch(app, /<(?:AccessModal|PartnerModal)\b/);
  assert.match(app, /<Access \/>/);
  assert.doesNotMatch(access, /console\.(?:log|debug)/);
});
