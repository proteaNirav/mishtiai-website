# Mishti AI public website

Figma Make export for the public marketing site. Original design: https://www.figma.com/design/4jXHWXqJhBD9lRMbn1Z7K1/Website-Content-Development.

## Local

```text
pnpm install
pnpm dev
pnpm build
pnpm verify:pages
pnpm smoke:static
```

Use Node 22 (see `.node-version`). `pnpm lint` and `pnpm test` are not defined in this export. `pnpm smoke:static` is a naive local static-output check, not Cloudflare edge proof. Do not treat Vite preview as Pages behavior.

## Cloudflare Pages (proposed — not applied)

Phase 1 prep only. Do not deploy or change DNS from this branch.

- Build command: `pnpm run build`
- Output directory: `dist`
- `public/_redirects` has no catch-all rewrite (hash/scroll site)
- Security headers: `public/_headers` (no HSTS)
- Hosting, DNS, form, and rollback notes: `docs/cloudflare-pages-phase1.md`
 