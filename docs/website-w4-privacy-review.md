# W4 — Mishti AI public-site privacy notice (PRE-LAUNCH DRAFT)

Branch: docs/mishti-website-w4-privacy-notice-20261025. Based on W2 SHA 8331ec67, which includes W3 (2eea4c0a) and W1 (7bc33d9f). THIS IS NOT PRODUCTION APPROVAL.

## Evidence-based source and user interface

- Adds a readable #privacy section on the same static page (no new router/catch-all), footer navigation, and a link adjacent to the early-access form acknowledgment.
- Lists only fields actually present in the form: name, work email, optional organization, free-text description, and processing acknowledgment.
- Identifies Formspree as a processor; links to the official Formspree privacy policy. Mentions possible connection metadata, external Google Fonts requests and email notifications without claiming unverified controls.
- Uses niraventp@gmail.com as the confirmed mailbox for privacy requests; Gmail account ownership and past Formspree notification history were verified, but LIVE form routing is not verified.
- Explicitly labels the notice a pre-publication draft, and does not invent the legal operator name, statutory basis or exact submission retention period. Those missing facts are publication blockers.
- No change to Formspree form ID, submission code or vendor account. No test submits personal information.

## Required OWNER evidence before public activation

1. Confirm the legal name and appropriate physical/business contact details of the entity controlling this website and replace the currently incomplete operator statement.
2. Approve a precise retention schedule covering Formspree dashboard, Gmail copies, backup/export data and deletion/access requests.
3. Verify Formspree form mvzdjvlw is active, its current notification target, monthly limits, spam controls, domain allowlist and deletion/processor policy. Do not confuse historical Gmail mail with live account verification.
4. Review current privacy notice with responsible legal/privacy stakeholder for relevant jurisdictions; inline processing checkbox does not alone establish informed consent or regulatory compliance.
5. Run independently approved synthetic-only form test after dashboard review and a separately authorized Node 22 / Cloudflare Pages edge verification.
6. Maintain separate Founder Console P4C #353, Issue #354 PR #355 and private D1/Access gates. Public Pages must never host private Founder data.

## Guardrails

Zero Cloudflare deployment, DNS, Vercel activation, GitHub merge, workflow dispatch, paid models, or Formspree POST. Do not alter rocketgpt.dev or Protea AIOS.

Local acceptance: verify:privacy, verify:leads, verify:source-hygiene, fresh isolated build, verify:pages, smoke:static.
