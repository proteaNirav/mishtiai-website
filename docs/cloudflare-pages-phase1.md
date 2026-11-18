# Cloudflare Pages Phase 1 — proposed hosting (do not apply)

Status: **READY_FOR_ARCHITECT_REVIEW** after W1 catch-all removal. Isolated development branch only. **Do not deploy, change live DNS, reactivate/disable Vercel, merge, or spend money.**

Reviewed locally on Protea-AI-Dev-01 with Ollama `qwen2.5-coder:14b`. No Grok/Codex/paid cloud was used for this work.

## Proposed host

| Item | Proposed value | Apply now? |
| --- | --- | --- |
| Product | Cloudflare Pages (Free) | No |
| Project name (suggested) | `mishtiai-website` | No |
| Production hostname | `www.mishtiai.in` | No |
| Apex | `mishtiai.in` → later redirect to `www` after Architect/owner approval | No |
| Preview | `*.pages.dev` (keep `X-Robots-Tag: noindex` on `pages.dev`) | No |
| Vercel | Leave existing project untouched | Do not change |

Git-integrated Pages project creation can auto-publish `main` and public PR previews. Connecting the repo is **not authorized**. Do not copy this public-site config onto founder-private `console.mishtiai.in`.

## Site review (as found)

- Vite 6 + React 18 Figma Make export. Scripts: `dev`, `build`, `verify:pages`, `smoke:static`. No lint or test toolchain.
- Single page. `react-router` is a dependency but unused. Navigation is `scrollIntoView` plus hash links (`#architecture`, `#roadmap`, `#access`).
- Assets: `public/logo.svg`; Inter via Google Fonts CSS `@import`; no other CDN images.
- `react` / `react-dom` are explicit `dependencies` so a clean Pages install can resolve them.
- Repo currently tracks `node_modules` (~162k files) and a stale `dist`. Pages **must** publish `dist` only. Free plan deployed-file limit is 20,000. Vendor untrack is a **separate plan** (W2). This PR does **not** untrack those trees.

## W1 routing (corrected)

`public/_redirects` has **no rewrite rules**. The previous `/* /index.html 200` catch-all was removed because Cloudflare can apply `_redirects` even when `/assets/*.js`, `/assets/*.css`, or `/logo.svg` exist, and redirects run before `_headers`.

Do not add a top-level `404.html`. Pages default SPA fallback (no `404.html`) remains available if client routes are added later. That edge behavior is **not proven** here. Vite preview is **not** Cloudflare edge proof. `pnpm smoke:static` uses a naive Node static server with no SPA rewrite: hashed JS/CSS/logo must be 200 with their own types; unknown paths must be 404, not HTML.

## Proposed Pages build settings (dashboard — do not create yet)

| Setting | Value |
| --- | --- |
| Production branch | Architect-approved merge target (today `main`) |
| Framework preset | React (Vite) |
| Build command | `pnpm run build` |
| Build output directory | `dist` |
| Root directory | `/` |
| Node | `22` (see `.node-version`; Pages v3 default is Node 22) |
| Package manager | pnpm (`packageManager` field is `pnpm@10.26.1`) |
| Environment variables | none required |
| Functions / Workers | none — static site only |

## W3 — forms, privacy, latent CTAs (document only; no rewrite)

No personal data was submitted during this offline review.

### Live early-access form

- Component: `src/app/components/Access.tsx`
- Endpoint: browser POST to `https://formspree.io/f/mvzdjvlw` (public form id, not a secret)
- Fields: `name`, `email`, `company`, `message`, hidden `_subject`
- Error handling: non-OK or network failure sets `error` and shows “Please email connect@mishtiai.in.” Success resets the form and shows “Request received. We will review and respond shortly.”
- On-page promise: “controlled access … within 24 hours” and “You receive a response within 24 hours.” Owner must confirm this SLA is operationally true before cutover. Success copy says “shortly,” which is weaker than 24 hours.

### Formspree ownership / privacy / anti-spam / retention — owner confirmation required

This review cannot see the Formspree dashboard. Before public cutover, owner must confirm:

| Item | Offline finding | Owner must confirm |
| --- | --- | --- |
| Ownership | Form id is hardcoded; no token in repo | Account that owns `mvzdjvlw` is proteaNirav / Mishti AI |
| Notification | Unknown | Inbox is `connect@mishtiai.in` or another authorized mailbox |
| Anti-spam | No captcha or honeypot in this form | Formspree reCAPTCHA / AKISMET / domain allowlist enabled as needed |
| Privacy disclosure | Site has no privacy notice near the form | Lawful-basis / vendor-processing text before public leads |
| Retention | Unknown | How long Formspree and mailbox keep submissions |
| Dummy submit | Not run (no personal data) | Separately authorized non-PII test after Formspree ownership is confirmed |

Do not send real lead data from this workstream.

### Latent Partner / Access modal CTAs — do not treat as live leads

- `AccessModal` is mounted with `isModalOpen`, which is never set `true` in current `App.tsx`. Submit only `console.log`s PII. Not a live lead path.
- `PartnerModal` is mounted; `App` passes `onPartnerClick={() => setIsPartnerModalOpen(true)}`, but current `Access` **ignores** that prop (`Access({}: AccessProps)`). No partner button in the live Access section. Submit only `console.log`s PII.
- Backup files (`Access.backup-before-header.tsx`, `App.backup-before-header.tsx`) still show the older wired CTAs. Those files are not the live entry.

Before publication (separate change, not this W1 fix): either implement those flows honestly (no console PII) or keep them unreachable / remove the dead mounts so they cannot be re-wired by accident. Do not silently rewrite them here.

## Security notes for Architect

- CSP `style-src 'self' 'unsafe-inline' https://fonts.googleapis.com` is a **temporary** exception for the Figma inline-style export. Keep it documented. Do not claim it has been tightened.
- HSTS is **not** enabled. Do not add it until live DNS is approved and correct.
- Default Pages header `Access-Control-Allow-Origin: *` remains unless Architect wants it detached. Not tested on the Pages edge.
- No application secrets in the repo.

## Deployment / DNS / rollback (proposed, not executed)

Unchanged from Phase 1: do not create a Pages project, do not add `www.mishtiai.in`, do not edit DNS, do not disable Vercel. Rollback remains “leave DNS where it is” until a later authorized cutover. Git revert target for this branch is the previous reviewed head until Architect accepts the W1 SHA.

## Local evidence commands

Do **not** smoke or verify leftover tracked `dist/` (it still has the stale Figma title `Website Content Development`). Set `PAGES_DIST` so `build`, `verify:pages`, and `smoke:static` share one fresh empty output:

```text
# PowerShell — isolated clean output
$env:PAGES_DIST=".pages-check-dist"
pnpm run build
pnpm run verify:pages
pnpm run smoke:static
pnpm run lint    # not defined — expected
pnpm test        # not defined — expected
```

`verify:pages` rejects the stale title, missing referenced hashes, and leftover unreferenced `index-*.js` / `index-*.css`. `smoke:static` requests the hashes parsed from that same `index.html`. These are local static-output checks. They are **not** Cloudflare Pages edge verification. Tracked `dist/` is not reset or untracked (W2).

Cost of this phase: **₹0**.
