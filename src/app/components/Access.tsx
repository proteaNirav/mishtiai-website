import React from "react";

interface AccessProps {
  onRequestAccess?: () => void;
  onPartnerClick?: () => void;
}

export function Access({}: AccessProps) {
  return (
    <section id="access" className="py-24 px-6 bg-background">
      <div className="max-w-[800px] mx-auto text-center">
        <p className="text-primary uppercase tracking-[0.3em] text-sm mb-4">
          Limited Early Access
        </p>

        <h2 className="text-3xl md:text-5xl font-bold mb-6">
          Request Access to Mishti AI
        </h2>

        <p className="text-muted-foreground mb-10">
          Tell us about your organization and governed AI use case.
        </p>

        <form
          action="https://formspree.io/f/mvzdjvlw"
          method="POST"
          className="space-y-4 text-left"
        >
          <input type="hidden" name="_subject" value="New Mishti AI Access Request" />

          <input
            type="text"
            name="name"
            placeholder="Full Name"
            required
            className="w-full px-4 py-3 rounded-lg bg-card border border-border text-foreground"
          />

          <input
            type="email"
            name="email"
            placeholder="Work Email"
            required
            className="w-full px-4 py-3 rounded-lg bg-card border border-border text-foreground"
          />

          <input
            type="text"
            name="company"
            placeholder="Company / Organization"
            className="w-full px-4 py-3 rounded-lg bg-card border border-border text-foreground"
          />

          <textarea
            name="message"
            placeholder="What do you want to use Mishti AI for?"
            rows={5}
            required
            className="w-full px-4 py-3 rounded-lg bg-card border border-border text-foreground"
          />

          <button
            type="submit"
            className="w-full py-4 bg-primary text-primary-foreground rounded-lg font-semibold hover:bg-primary/90 transition-all shadow-lg shadow-primary/25"
          >
            Submit Access Request
          </button>
        </form>
      </div>
    </section>
  );
}
