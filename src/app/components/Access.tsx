import React, { useState } from "react";

interface AccessProps {
  onRequestAccess?: () => void;
  onPartnerClick?: () => void;
}

export function Access({}: AccessProps) {
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("sending");

    const form = event.currentTarget;
    const data = new FormData(form);

    try {
      const response = await fetch("https://formspree.io/f/mvzdjvlw", {
        method: "POST",
        body: data,
        headers: {
          Accept: "application/json",
        },
      });

      if (response.ok) {
        setStatus("success");
        form.reset();
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  }

  return (
    <section id="access" className="py-24 px-6 bg-background">
      <div className="max-w-[800px] mx-auto text-center">
        <p className="text-primary uppercase tracking-[0.3em] text-sm mb-4">
          Limited Early Access
        </p>

        <h2 className="text-3xl md:text-5xl font-bold mb-6">
          Get Access to Controlled AI Execution
        </h2>

        <p className="text-muted-foreground mb-10">
          We will review your use case and give you controlled access to Mishti AI within 24 hours.
        </p>

        <form onSubmit={handleSubmit} className="space-y-4 text-left">
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
            disabled={status === "sending"}
            className="w-full py-4 bg-primary text-primary-foreground rounded-lg font-semibold hover:bg-primary/90 transition-all shadow-lg shadow-primary/25 disabled:opacity-60"
          >
            {status === "sending" ? "Submitting..." : "Submit Access Request"}
          </button>

          {status === "success" && (
            <p className="text-[#14f195] text-center">
              Request received. We will review and respond shortly.
            </p>
          )}

          {status === "error" && (
            <p className="text-red-400 text-center">
              Something went wrong. Please email connect@mishtiai.in.
            </p>
          )}
        </form>
      </div>
    </section>
  );
}

