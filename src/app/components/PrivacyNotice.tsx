import React from "react";

/** Public information-only privacy summary, not a Founder Console policy. */
export function PrivacyNotice() {
  return (
    <section id="privacy" aria-labelledby="privacy-title" className="py-16 px-6 bg-background border-t border-border">
      <div className="max-w-[800px] mx-auto space-y-6 text-sm text-muted-foreground">
        <div>
          <p className="text-primary uppercase tracking-[0.25em] mb-2">Privacy and transparency</p>
          <h2 id="privacy-title" className="text-2xl md:text-3xl font-bold text-foreground">Website privacy information</h2>
          <p className="mt-2">Last updated 25 October 2026</p>
        </div>
        <p>
          This is the public Mishti AI informational website, separate from the private Founder Console.
          We are not currently accepting access-request forms, user registrations or payment details on this site.
          A separate notice will be provided if those services are enabled in the future.
        </p>
        <div className="space-y-2">
          <h3 className="text-lg font-semibold text-foreground">Website delivery</h3>
          <p>
            Cloudflare provides our website hosting and security services, and may process
            technical connection information such as IP addresses, device or browser metadata,
            requests and security events. This site can also load font resources from Google Fonts,
            which may receive connection metadata when your browser requests a font.
          </p>
        </div>
        <div className="space-y-2">
          <h3 className="text-lg font-semibold text-foreground">Contact and rights requests</h3>
          <p>
            If you voluntarily contact us by email, your message and contact information will be used
            to review and respond to your enquiry. Such correspondence may be retained in the mailbox
            according to operational and legal requirements. For questions, access, correction or deletion
            requests, email
            {" "}<a className="underline text-primary" href="mailto:niraventp@gmail.com?subject=Mishti%20AI%20Privacy%20Request">niraventp@gmail.com</a>.
          </p>
        </div>
        <div className="space-y-2">
          <h3 className="text-lg font-semibold text-foreground">Service-specific policies</h3>
          <p>
            Our private Founder Console has separate access and data-handling controls.
            This public notice does not apply to private Founder Console records.
            We will publish further terms and retention details before enabling public lead collection.
          </p>
        </div>
      </div>
    </section>
  );
}
