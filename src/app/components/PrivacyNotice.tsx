import React from "react";

/** Public-site privacy disclosure. Publication requires owner/legal review. */
export function PrivacyNotice() {
  return (
    <section id="privacy" aria-labelledby="privacy-title" className="py-16 px-6 bg-background border-t border-border">
      <div className="max-w-[800px] mx-auto space-y-6 text-sm text-muted-foreground">
        <div>
          <p className="text-primary uppercase tracking-[0.25em] mb-2">Data and transparency</p>
          <h2 id="privacy-title" className="text-2xl md:text-3xl font-bold text-foreground">Privacy notice</h2>
          <p className="mt-2">Updated 25 October 2026 — pre-publication draft, pending owner review.</p>
        </div>
        <p>
          This notice describes how information submitted through the Mishti AI public website
          early-access form is intended to be handled. This site is not the private Founder Console.
          The responsible legal entity and definitive retention schedule will be published after verification,
          before public intake is activated.
        </p>
        <div className="space-y-2">
          <h3 className="text-lg font-semibold text-foreground">Information requested</h3>
          <p>
            When you submit an access request, you provide your name, work email, optional organization,
            description of your use case, and an acknowledgment of third-party processing.
            Please do not include passwords, secrets, or sensitive personal information.
          </p>
        </div>
        <div className="space-y-2">
          <h3 className="text-lg font-semibold text-foreground">Purpose and response</h3>
          <p>
            Details are used to review the requested early access, evaluate suitability and contact you
            if additional information is needed. Submission does not create an account or guarantee approval
            or a reply within any particular period.
          </p>
        </div>
        <div className="space-y-2">
          <h3 className="text-lg font-semibold text-foreground">Form service and external resources</h3>
          <p>
            The form sends your submission to Formspree, a third-party form processing service.
            Formspree may also process technical metadata such as your IP address and browser information.
            See the
            {" "}<a className="underline text-primary" href="https://formspree.io/legal/privacy-policy/" target="_blank" rel="noopener noreferrer">Formspree privacy policy</a>.
            The website may request font resources from Google Fonts; that request may reveal connection metadata
            to the font provider.
          </p>
        </div>
        <div className="space-y-2">
          <h3 className="text-lg font-semibold text-foreground">Storage and retention</h3>
          <p>
            Form submissions may be stored by Formspree and copied into the notification mailbox.
            The exact retention period and deletion configuration have not yet been verified.
            A definite schedule must be approved and published before this website accepts public requests.
          </p>
        </div>
        <div className="space-y-2">
          <h3 className="text-lg font-semibold text-foreground">Questions, access and deletion requests</h3>
          <p>
            To ask about a submission, request a correction, or request deletion, email
            {" "}<a className="underline text-primary" href="mailto:niraventp@gmail.com?subject=Mishti%20AI%20Privacy%20Request">niraventp@gmail.com</a>.
            Requests will be reviewed subject to applicable law and available processor controls.
          </p>
        </div>
        <p className="text-xs">
          This notice is an implementation draft, not a representation that Formspree routing,
          company identity, privacy-law requirements or retention controls have completed acceptance.
        </p>
      </div>
    </section>
  );
}
