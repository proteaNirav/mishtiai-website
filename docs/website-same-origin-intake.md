# Same-origin early-access intake (Cloudflare Worker + Turnstile)

Status: **merged to `main` (`3b79c758`); public Turnstile site key follow-up on a later PR**. Live Pages/Worker still not deployed. Do not recut DNS.

Replaces Formspree `mvzdjvlw`. Live CSP is `form-action 'self'` / `connect-src 'self'` plus Turnstile hosts after this change. No third-party form host.

## What this change is

| Piece | Role |
| --- | --- |
| `src/app/components/Access.tsx` | Early-access form. Browser `fetch` POST to `/api/early-access`. |
| Cloudflare Turnstile | Bot protection. Widget from `https://challenges.cloudflare.com`. |
| Worker `mishti-early-access-intake` | Same-origin GET/POST `/api/early-access`. |
| Cloudflare KV binding `INTAKE` | Append-only store (source of truth). |
| Optional Email Routing `send_email` | Copy to founder mailbox. Not required. |

Live Pages stays the existing Direct Upload project. This does **not** recreate Pages, add a hostname, or change apex/www DNS. The Worker is attached with a **route on the existing zone**:

- `mishtiai.in/api/early-access*`

Turnstile widget hostname is **`mishtiai.in` only** (not `www`).

Pages Functions are not used because the live site is a static Direct Upload of `dist/`; a Worker route does not change that publish method.

## What is live vs not

| Surface | Live today | After this PR is merged **and** owner deploy |
| --- | --- | --- |
| https://mishtiai.in/ | Closed-intake copy, CSP blocks third-party forms | New form + Turnstile CSP, still no Formspree |
| `/api/early-access` | 404 (no Worker) | Worker GET config + POST intake |
| Formspree `mvzdjvlw` | Endpoint still exists at Formspree; site does not call it | Still unused. Owner may pause/delete it in the Formspree dashboard |
| Founder Console / P4 #349 / P4B #351 / website PR #6 | Untouched | Untouched |

## Cost

₹0 extra if limited to Cloudflare Free: Worker requests, KV writes, Turnstile managed widget, optional Email Routing. No Formspree, no paid AI, no extra DNS.

## Owner keys and dashboard steps (required before intake works)

Do not paste secret values into GitHub, chat, or this repo.

1. **Turnstile** — widget “Mishti AI Early Access” exists (managed, **hostname `mishtiai.in` only**, not `www`, pre-clearance off). Public site key `0x4AAAAAAGISoDHLJ7QQJxlG` is baked in `Access.tsx`. The widget script loads only when GET `/api/early-access` reports `enabled: true`. Owner keeps the **secret** in the Cloudflare dashboard and sets it as a Worker secret (do not paste it into git or chat). Dummy always-pass keys are local-only.

2. **KV**
   ```text
   wrangler kv namespace create INTAKE
   ```
   Put the returned id into `workers/early-access/wrangler.toml` (replace the zero placeholder) **or** bind `INTAKE` in the Worker dashboard. Do not publish Access AUD or D1 UUIDs.

3. **Worker secret**
   ```text
   wrangler secret put TURNSTILE_SECRET_KEY
   ```
   Leave `ALLOW_DEV_BYPASS` unset in production. Do not put dummy site/secret keys on production.

4. **Deploy Worker**
   ```text
   cd workers/early-access
   wrangler deploy
   ```
   Then add the apex route above on the existing `mishtiai.in` zone. `workers_dev = false` stays: no extra `workers.dev` hostname.

5. **Rebuild and re-upload Pages `dist/`** of the SHA that contains the public site key to the **existing** Pages project. Direct Upload of static files still does not include the Worker; the route handles `/api/early-access`.

6. **Optional email copy**
   Enable Email Routing on `mishtiai.in`, verify `niraventp@gmail.com` (or another owner mailbox), add a `send_email` binding as commented in `wrangler.toml`, set `INTAKE_FROM` / `INTAKE_NOTIFY_TO`. If this is skipped, read submissions from KV (`intake:` prefix) in the dashboard.

7. **Formspree**
   Pause or delete form `mvzdjvlw` in the Formspree dashboard when ready. This PR does not call it.

## Local preview (not edge proof)

```text
pnpm install
pnpm run verify:intake
pnpm run verify:leads
pnpm run verify:privacy
PAGES_DIST=.pages-check-dist pnpm run build
PAGES_DIST=.pages-check-dist pnpm run verify:pages
PAGES_DIST=.pages-check-dist pnpm run verify:public-release
PAGES_DIST=.pages-check-dist pnpm run smoke:static
pnpm dev
```

Vite serves `/api/early-access` from the same handler with in-memory KV. The frontend widget uses the public production site key **only after** the mock/Worker reports intake enabled. Local POST may use `dev-local` on localhost only. This is not Cloudflare edge proof. Public live intake stays closed until Pages re-upload and Worker deploy.

## Guards kept

- No Formspree / `mvzdjvlw` in Access source or built JS
- Turnstile widget mounts only when `config?.enabled` is true
- `form-action 'self'`
- No 24-hour response claim
- AccessModal / PartnerModal stay unmounted
- Founder Console, P4, P4B, and website PR #6 are out of scope
- Public live intake stays closed until owner merge + Pages upload + Worker deploy
