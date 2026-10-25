# Website W3 — lead-handling safety candidate (offline only)

Source: W1 accepted website commit 7bc33d9f; isolated branch security/mishti-website-w3-lead-safety-20261025. No protected merge, hosting change, DNS modification, or deployment is authorized.

## Implemented

- Existing browser POST to public Formspree form mvzdjvlw remains in the early-access form; no third-party submission was performed during this work.
- Removed the unsupported 24-hour response/access promise. Applying does not grant automatic access.
- Added a required acknowledgment that visitor contact details and messages go to Formspree for processing, and a clear warning not to include secrets or sensitive information.
- Removed the unused AccessModal and PartnerModal mounts from the live App component. Both old components remain untouched in source for future review; they were unreachable from the current public Access section and their handlers only logged submitted personal information. Do not re-enable without a reviewed working submission destination.
- Added a dependency-free local W3 contract test: pnpm run verify:leads. It neither accesses Formspree nor establishes privacy-law compliance.

## Owner and security gates before public publication

1. Confirm the actual account controlling Formspree form mvzdjvlw, the receiving inbox, domain/origin allowlist, spam and abuse controls, retention, and deletion process.
2. Approve a complete visitor privacy notice including controller/contact identity, processing purposes, retention, third-party processing and individual rights. An inline acknowledgment alone is not a comprehensive privacy policy.
3. With explicit authorization after ownership confirmation, run a synthetic, non-personal end-to-end form delivery check. Do not send real personal information during offline review.
4. Keep repository W2 cleanup separate. The approximately 162,348 tracked node_modules entries and tracked dist remain untouched; never mass-delete or rewrite git history under this W3 authorization.
5. Keep the public website PR #1 in draft; no Cloudflare Pages project/Git auto-publication, DNS, preview hosting, Vercel changes or merge. Founder Console remains frozen under separate P4C and Issue #354 governance gates.

Validation: pnpm run verify:leads, then an isolated PAGES_DIST build followed by verify:pages and smoke:static; no Formspree POST.
