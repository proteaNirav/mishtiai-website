import { readFileSync, readdirSync } from "node:fs";
import { resolve, join } from "node:path";
const dist = resolve(process.env.PAGES_DIST?.trim() || "dist");
const js = readdirSync(join(dist, "assets")).filter(f=>/^index-[A-Za-z0-9_-]+\.js$/.test(f));
if(js.length!==1) throw new Error("Require exactly one built JS bundle");
const bundle = readFileSync(join(dist,"assets",js[0]), "utf8");
const access = readFileSync(new URL("../src/app/components/Access.tsx",import.meta.url),"utf8");
const banned = ["mvzdjvlw", "formspree.io/f/", "POST /employees", "wrangler.p4b", "1x00000000000000000000AA"];
for(const marker of banned) {
 if(bundle.includes(marker)||access.includes(marker)) throw new Error("Unexpected private/form marker in public release: "+marker);
}
const required = ["/api/early-access", "challenges.cloudflare.com", "0x4AAAAAAGISoDHLJ7QQJxlG"];
for(const marker of required) {
 if(!bundle.includes(marker) || !access.includes(marker)) {
  throw new Error("Same-origin intake marker missing from public release: "+marker);
 }
}
if(bundle.includes("Early-access applications are temporarily closed")) {
 throw new Error("Closed-intake copy must not ship while same-origin intake is enabled");
}
console.log("Public release guard PASS: same-origin intake present, Formspree and private-console markers absent");
