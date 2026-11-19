# Mishti AI public website

Figma Make export for the public marketing site. Original design: https://www.figma.com/design/4jXHWXqJhBD9lRMbn1Z7K1/Website-Content-Development.

## Local

```text
pnpm install
pnpm dev
```

`pnpm dev` also serves same-origin `/api/early-access` from an in-memory mock of the intake Worker. The public Turnstile site key is baked in the frontend. That mock is not Cloudflare edge proof.

Clean isolated check (do not use leftover tracked `dist/`):

```text
# PowerShell
$env:PAGES_DIST=".pages-check-dist"
pnpm run build
pnpm run verify:pages
pnpm run smoke:static
pnpm run verify:intake
pnpm run verify:leads
pnpm run verify:privacy
pnpm run verify:public-release
```

Use Node 22 (see `.node-version`). `pnpm lint` and `pnpm test` are not defined in this export. `verify:pages` rejects the stale Figma title `Website Content Development` and hashed assets that `index.html` does not reference. `smoke:static` is a naive local static-output check, not Cloudflare edge proof. Do not treat Vite preview as Pages behavior.

## Cloudflare Pages + intake Worker

Live public site is already on Cloudflare Pages from the accepted static release. Do not recreate the Pages project or recut DNS.

Same-origin early-access intake is a **separate Worker** with routes on the existing zone (`/api/early-access`). Owner Turnstile keys, KV id, Worker deploy, and a Pages `dist` re-upload are required before it is live. Runbook: `docs/website-same-origin-intake.md`.

- Build command: `pnpm run build`
- Output directory: `dist`
- `public/_redirects` has no catch-all rewrite (hash/scroll site)
- Security headers: `public/_headers` (no HSTS; Turnstile hosts allowed; `form-action 'self'`)
- Historical Pages cutover notes: `docs/cloudflare-pages-phase1.md`
 