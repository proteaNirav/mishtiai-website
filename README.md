# Mishti AI public website

Figma Make export for the public marketing site. Original design: https://www.figma.com/design/4jXHWXqJhBD9lRMbn1Z7K1/Website-Content-Development.

## Local

```text
pnpm install
pnpm dev
pnpm build
pnpm verify:pages
```

Use Node 22 (see `.node-version`). `pnpm lint` and `pnpm test` are not defined in this export.

## Cloudflare Pages (proposed — not applied)

Phase 1 prep only. Do not deploy or change DNS from this branch.

- Build command: `pnpm run build`
- Output directory: `dist`
- SPA fallback: `public/_redirects`
- Security headers: `public/_headers`
- Hosting, DNS, and rollback notes: `docs/cloudflare-pages-phase1.md`
 