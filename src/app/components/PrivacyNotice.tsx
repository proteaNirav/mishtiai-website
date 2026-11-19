import React from "react";

/** Public website privacy summary, not a Founder Console policy. */
export function PrivacyNotice() {
  return (
    <section id="privacy" aria-labelledby="privacy-title" className="py-16 px-6 bg-background border-t border-border">
      <div className="max-w-[800px] mx-auto space-y-6 text-sm text-muted-foreground">
        <div>
          <p className="text-primary uppercase tracking-[0.25em] mb-2">Privacy and transparency</p>
          <h2 id="privacy-title" className="text-2xl md:text-3xl font-bold text-foreground">Website privacy information</h2>
          <p className="mt-2">Last updated 19 November 2026</p>
        </div>
        <p>
          This is the public Mishti AI informational website, separate from the private Founder Console.
          The early-access form on this page is optional. We do not offer user registrations or payment
          collection on this site. Submitting a request does not grant access to the Founder Console.
        </p>
        <div className="space-y-2">
          <h3 className="text-lg font-semibold text-foreground">Early-access requests</h3>
          <p>
            If you submit the early-access form, we collect your name, work email, optional organization,
            and the message you write, plus a required processing acknowledgment. The browser posts that
            information to <code>/api/early-access</code> on this same website. Cloudflare Turnstile is used
            to reduce automated abuse. Cloudflare may process technical connection information such as IP
            address, device or browser metadata, and security events as part of hosting, Turnstile, and the
            intake Worker.
          </p>
          <p>
            Accepted submissions are stored append-only in Cloudflare KV for the operator to review.
            If Email Routing is enabled on the Worker, a copy may also be sent to the operator mailbox.
            Records are kept until the operator deletes them, or as needed for operational and legal
            requirements. No response deadline is guaranteed.
          </p>
        </div>
        <div className="space-y-2">
          <h3 className="text-lg font-semibold text-foreground">Website delivery</h3>
          <p>
            Cloudflare provides our website hosting, bot protection, and security services, and may process
            technical connection information such as IP addresses, device or browser metadata,
            requests and security events. This site can also load font resources from Google Fonts,
            which may receive connection metadata when your browser requests a font.
          </p>
        </div>
        <div className="space-y-2">
          <h3 className="text-lg font-semibold text-foreground">Contact and rights requests</h3>
          <p>
            For questions, access, correction or deletion requests, email
            {" "}<a className="underline text-primary" href="mailto:niraventp@gmail.com?subject=Mishti%20AI%20Privacy%20Request">niraventp@gmail.com</a>.
            Correspondence sent by email is used to review and respond to your enquiry and may be retained
            in the mailbox according to operational and legal requirements.
          </p>
        </div>
        <div className="space-y-2">
          <h3 className="text-lg font-semibold text-foreground">Service-specific policies</h3>
          <p>
            Our private Founder Console has separate access and data-handling controls.
            This public notice does not apply to private Founder Console records.
          </p>
        </div>
      </div>
    </section>
  );
}
