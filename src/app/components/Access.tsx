import React from "react";

/** Public information-only launch. No lead collection or account creation. */
export function Access() {
  return (
    <section id="access" className="py-24 px-6 bg-background">
      <div className="max-w-[800px] mx-auto text-center">
        <p className="text-primary uppercase tracking-[0.3em] text-sm mb-4">Early Access</p>
        <h2 className="text-3xl md:text-5xl font-bold mb-6">Governed AI Access</h2>
        <p className="text-muted-foreground mb-6">
          Early-access applications are temporarily closed while onboarding and
          privacy controls are being finalized. No personal information is collected
          through a request form on this public website.
        </p>
        <p className="text-sm text-muted-foreground">
          Please check back for the next onboarding announcement. This public website
          does not grant access to the separate private Founder Console.
        </p>
      </div>
    </section>
  );
}
