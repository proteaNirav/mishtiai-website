# Cloudflare Pages Phase 1 — proposed hosting (do not apply)

Status: **READY_FOR_ARCHITECT_REVIEW**. Isolated development branch only. **Do not deploy, change live DNS, reactivate/disable Vercel, merge, or spend money.**

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

## Site review (as found)

- Vite 6 + React 18 Figma Make export. Scripts: `dev`, `build`. No lint or test toolchain.
- Single page. `react-router` is a dependency but unused. Navigation is `scrollIntoView` plus hash links (`#architecture`, `#roadmap`, `#access`).
- Assets: `public/logo.svg`; Inter via Google Fonts CSS `@import`; no other CDN images.
- Forms:
  - Early-access form in `src/app/components/Access.tsx` POSTs from the browser to `https://formspree.io/f/mvzdjvlw`. Form ID is public by Formspree design. No repo secrets, no `VITE_*` env.
  - `PartnerModal` only `console.log`s. `AccessModal` is unused (`isModalOpen` never set true) and also only logs.
- Third parties at runtime: Google Fonts, Formspree. Fallback contact: `connect@mishtiai.in`.
- `react` / `react-dom` were optional peerDependencies (Make default). They are now explicit `dependencies` so a clean Pages install can resolve them.
- Repo currently tracks `node_modules` (~162k files) and a stale `dist` (missing `logo.svg`). Pages **must** publish `dist` only. Free plan deployed-file limit is 20,000. This PR does **not** untrack vendor/build trees.

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

## Deployment procedure (proposed, not executed)

1. Architect reviews this PR. Owner approves merge. **Do not merge in Phase 1.**
2. Owner creates a Cloudflare Pages project from `proteaNirav/mishtiai-website` on the Free plan, output `dist`.
3. First production deploy stays on `*.pages.dev` until DNS is approved.
4. Confirm preview: home, hash links, logo, early-access Formspree submit, security headers.
5. Only after Architect + owner sign-off, add custom domain `www.mishtiai.in` in Pages → Custom domains (not by editing DNS first).
6. Leave Vercel as-is until the Cloudflare hostname is verified and the owner chooses cutover.

## DNS verification (proposed, not applied)

Cloudflare requires the Pages custom-domain flow **before** a manual CNAME, or the hostname returns 522.

Proposed records after Pages shows the target (example; use the actual `*.pages.dev` Cloudflare prints):

| Type | Name | Content | Purpose |
| --- | --- | --- | --- |
| CNAME | `www` | `<project>.pages.dev` | Serve the site at `www.mishtiai.in` |
| Apex | `mishtiai.in` | **not changed in Phase 1** | Later: CNAME/ALIAS or redirect to `www` if the zone is on Cloudflare |

Verification checklist (post-approval only):

- Pages dashboard shows the custom domain **Active**.
- `https://www.mishtiai.in` serves this build (TLS issued by Cloudflare).
- `https://www.mishtiai.in/#access` reaches the form.
- Response includes `X-Frame-Options: DENY` and the committed CSP.
- `*.pages.dev` remains `noindex`.
- CAA records, if any, allow Let’s Encrypt / Google Trust / SSL.com as in Cloudflare Pages docs.

Do **not** add HSTS until the hostname has been live and correct.

## Rollback (proposed, not applied)

1. **Pages:** Workers & Pages → project → Deployments → Retry / promote the last known-good production deployment. No DNS edit required.
2. **Domain detach:** remove the Pages custom domain, then delete the `www` CNAME. Site becomes `*.pages.dev` only.
3. **Vercel:** because Vercel is not disabled in this phase, rollback to the previous host is “leave DNS pointing where it already points.” Do not flip DNS in Phase 1.
4. **Git:** revert this branch; `main` remains `67d2dc97` until Architect merge.

## Security notes for Architect

- Formspree form ID is client-visible. Rate limits / spam controls live in Formspree, not in this repo.
- Partner and unused Access modal submissions are not sent anywhere.
- CSP uses `style-src 'unsafe-inline'` because the Figma export uses inline styles. Tighten only after a design pass.
- Default Pages header `Access-Control-Allow-Origin: *` remains unless Architect wants it detached.
- No application secrets in the repo. Do not add Formspree tokens to Pages env unless a server Function is later approved (out of scope).

## Local evidence commands

```text
pnpm run build
pnpm run verify:pages
pnpm run lint    # not defined — expected
pnpm test        # not defined — expected
```

Cost of this phase: **₹0**.
