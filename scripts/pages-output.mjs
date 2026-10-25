export const EXPECTED_TITLE = "Mishti AI — Governed Intelligence Infrastructure";
export const STALE_TITLE = "Website Content Development";

export function resolvePagesDist() {
  const configured = process.env.PAGES_DIST?.trim();
  return configured && configured.length > 0 ? configured : "dist";
}

export function parseTitle(html) {
  const match = html.match(/<title>([^<]*)<\/title>/i);
  return match ? match[1].trim() : "";
}

export function referencedHashedAssets(html) {
  const js = [
    ...html.matchAll(/src=["'](\/assets\/index-[A-Za-z0-9_-]+\.js)["']/g),
  ].map((match) => match[1]);
  const css = [
    ...html.matchAll(/href=["'](\/assets\/index-[A-Za-z0-9_-]+\.css)["']/g),
  ].map((match) => match[1]);
  return { js, css };
}
