# Netlify Free standby — 26 October 2026

Source: isolated backup branch off production Cloudflare website SHA 4ea033e7. Public marketing site only.

- Cloudflare is production primary; do NOT change mishtiai.in or www DNS.
- Netlify manual upload uses only verified Vite dist static files, never the repository root or Founder Console.
- Global X-Robots-Tag: noindex prevents duplicate standby indexing; CSP blocks Formspree and external forms.
- Privacy notice explicitly identifies Cloudflare primary and Netlify standby, including connection metadata.
- Vercel backup remains until all team projects are inventoried; no downgrade or cancellation here.
- Free plan: 300 monthly credits with hard limit; standby can pause, no automatic failover or SLA.
- Approval for future DNS failover requires independent hosted health check. Never point DNS to failed backup.
- Run frozen offline install, Node22 verification, clean build, Pages verify, static smoke and Netlify-specific guard.
- Private Founder Console remains protected and separate.
