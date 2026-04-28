import React from "react";

export function Credibility() {
  return (
    <section className="py-24 px-6 bg-background border-t border-border">
      <div className="max-w-[1100px] mx-auto text-center">

        <p className="text-primary uppercase tracking-[0.3em] text-sm mb-4">
          Enterprise Credibility
        </p>

        <h2 className="text-3xl md:text-5xl font-bold mb-8">
          Built for Real Systems, Not Experiments
        </h2>

        <p className="text-muted-foreground max-w-[800px] mx-auto mb-12">
          Mishti AI is designed for organizations where execution cannot be left
          to probabilistic systems. It brings governance, traceability, and
          deterministic control into AI-driven operations.
        </p>

        {/* Trust Blocks */}
        <div className="grid md:grid-cols-3 gap-8 text-left">

          <div className="p-6 border border-border rounded-xl bg-card">
            <h3 className="font-semibold mb-2">Who Built This</h3>
            <p className="text-sm text-muted-foreground">
              Designed and architected by enterprise product and infrastructure
              specialists with deep experience in workforce systems, access
              control, and large-scale operational software.
            </p>
          </div>

          <div className="p-6 border border-border rounded-xl bg-card">
            <h3 className="font-semibold mb-2">Where It Fits</h3>
            <p className="text-sm text-muted-foreground">
              Suitable for enterprise IT, manufacturing systems, compliance-driven
              environments, and any system where AI actions must be governed before execution.
            </p>
          </div>

          <div className="p-6 border border-border rounded-xl bg-card">
            <h3 className="font-semibold mb-2">What You Get</h3>
            <p className="text-sm text-muted-foreground">
              A controlled execution environment where every action is validated,
              approved, and traceable — eliminating unsafe automation and
              unpredictable system behavior.
            </p>
          </div>

        </div>

        {/* Use Case */}
        <div className="mt-16 p-8 border border-border rounded-xl bg-card text-left">
          <h3 className="text-xl font-semibold mb-4">
            Example Use Case
          </h3>
          <p className="text-muted-foreground">
            A manufacturing enterprise uses Mishti AI to validate system-level
            configuration changes before execution. Every proposed change passes
            through readiness checks, governance approval, and controlled
            execution — with full rollback capability and audit visibility.
          </p>
        </div>

      </div>
    </section>
  );
}
