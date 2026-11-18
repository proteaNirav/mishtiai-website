# Website W2 - Generated/dependency files: index-only cleanup candidate

Base: W3 exact SHA 2eea4c0a457e7d98121fab43e970310dcdf58b56, stacked on website W1 PR #1. NO MERGE OR DEPLOY.

## Evidence and operation

- Prior tracked content: 162,348 entries under node_modules and 3 under dist, total 162,351.
- Existing .gitignore correctly covers node_modules/ and dist/ but does not untrack previously indexed entries.
- Inside a new sparse-checkout worktree only, git rm --cached --sparse -r -q -- node_modules dist removes these entries from that branch's *Git index*. It does not delete files from the active Cursor checkout, change main, or rewrite history.
- Verified remaining tracked entries in node_modules and dist: 0; verified source deletions outside those directories: 0.
- This PR adds only the source hygiene verifier script, package command and this evidence document besides the index-only untracking.

## Security, repeatability and rollback

- This is necessarily a large Git diff (>162k deleted file entries). For review inspect exact base/head, the set of deletion path prefixes and counts; do not assume the GitHub UI can show each file.
- The pnpm lockfile and source stay tracked. A clean offline frozen-lockfile install, W3 source tests and isolated Pages build and smoke must pass before acceptance.
- Do not reset the source checkout or remove active files in order to perform this cleanup. Fresh installs produce ignored node_modules locally and builds produce ignored dist output.
- Historical Git commits still contain previous vendor/build trees: this is NOT history purification or proof no historical secrets exist. Purging Git history needs separate investigation and authorization.
- Rollback is a separately reviewed Git revert on a future authorized branch, not a force-push.
- No Cloudflare Pages, preview deployment, public cutover, DNS, Vercel, Formspree POST, protected branch merge, D1, Founder Console or P5 actions authorized.

## Pending release gates

- Current Formspree ownership, receiving inbox, spam controls, retention and processor terms still require dashboard evidence. Historical notifications to niraventp@gmail.com show previous delivery only.
- Public visitor privacy notice requires owner-approved retention, controller/rights contact, processing purposes and vendor terms.
- Cloudflare production Node 22 and Pages edge headers/routing require real checks under separate release approval.
- Existing website W1 and W3 PRs, Founder Console P4C #353, security PR #355 must remain draft/unmerged.

Acceptance: run pnpm run verify:source-hygiene, pnpm install --offline --frozen-lockfile, pnpm run verify:leads, and a clean isolated PAGES_DIST build + verify:pages + smoke:static.