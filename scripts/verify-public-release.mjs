import { readFileSync, readdirSync } from "node:fs";
import { resolve, join } from "node:path";
const dist = resolve(process.env.PAGES_DIST?.trim() || "dist");
const js = readdirSync(join(dist, "assets")).filter(f=>/^index-[A-Za-z0-9_-]+\.js$/.test(f));
if(js.length!==1) throw new Error("Require exactly one built JS bundle");
const bundle = readFileSync(join(dist,"assets",js[0]), "utf8");
const access = readFileSync(new URL("../src/app/components/Access.tsx",import.meta.url),"utf8");
const banned = ["mvzdjvlw", "formspree.io/f/", "POST /employees", "wrangler.p4b"];
for(const marker of banned) {
 if(bundle.includes(marker)||access.includes(marker)) throw new Error("Unexpected private/form marker in public release: "+marker);
}
if(!bundle.includes("Early-access applications are temporarily closed"))throw new Error("Public page closed-intake text missing");
console.log("Public info-only release guard PASS: no live lead submission and no private-console marker");
