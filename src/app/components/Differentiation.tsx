import { X, Check, Zap } from "lucide-react";

export function Differentiation() {
  const comparisons = [
    {
      category: "Execution Style",
      traditional: {
        title: "Direct & Uncontrolled",
        description: "AI executes actions immediately without validation or oversight"
      },
      mishti: {
        title: "Governed & Controlled",
        description: "Every action validated through readiness and governance layers"
      }
    },
    {
      category: "Traceability",
      traditional: {
        title: "Opaque Decision Paths",
        description: "Hidden reasoning with no audit trail or decision lineage"
      },
      mishti: {
        title: "Complete Decision Lineage",
        description: "Full execution trace with append-only intelligence records"
      }
    },
    {
      category: "Governance",
      traditional: {
        title: "No Oversight",
        description: "Actions occur without approval mechanisms or policy enforcement"
      },
      mishti: {
        title: "Enforced Policy Engine",
        description: "Multi-layer governance with operator control and approval flows"
      }
    },
    {
      category: "Reliability",
      traditional: {
        title: "Unpredictable Outcomes",
        description: "No recovery guarantees, non-deterministic failure handling"
      },
      mishti: {
        title: "Deterministic Recovery",
        description: "Replay, retry, resume, rollback with guaranteed state management"
      }
    }
  ];

  return (
    <section className="relative py-32 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-20">
          <h2 className="text-5xl md:text-6xl font-bold mb-6">
            What Makes Mishti <span className="text-primary">Different</span>
          </h2>
          <p className="text-xl text-muted-foreground">
            A fundamental shift from unpredictable AI to governed intelligence
          </p>
        </div>

        {/* Comparison Grid */}
        <div className="space-y-8">
          {comparisons.map((comparison, i) => (
            <div key={i} className="grid md:grid-cols-2 gap-6">
              {/* Traditional AI - Left */}
              <div className="group relative rounded-2xl border border-destructive/30 bg-card/60 backdrop-blur-md p-8 hover:border-destructive/50 transition-all">
                <div className="absolute inset-0 bg-gradient-to-br from-destructive/5 to-transparent rounded-2xl" />

                <div className="relative">
                  {/* Header */}
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-10 h-10 rounded-lg bg-destructive/10 border border-destructive/30 flex items-center justify-center">
                      <X className="w-5 h-5 text-destructive" />
                    </div>
                    <div>
                      <div className="text-xs uppercase tracking-wide text-destructive/70 font-mono mb-1">
                        {comparison.category}
                      </div>
                      <h3 className="text-xl font-bold text-destructive/90">Traditional AI</h3>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="space-y-3">
                    <h4 className="text-lg font-semibold text-foreground/80">
                      {comparison.traditional.title}
                    </h4>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {comparison.traditional.description}
                    </p>
                  </div>

                  {/* Risk indicator */}
                  <div className="mt-6 pt-4 border-t border-destructive/20">
                    <div className="flex items-center gap-2 text-xs text-destructive/70 font-medium">
                      <div className="w-2 h-2 rounded-full bg-destructive" />
                      <span>HIGH RISK</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Mishti AI - Right */}
              <div className="group relative rounded-2xl border border-primary/40 bg-gradient-to-br from-primary/10 via-card/90 to-card/60 backdrop-blur-xl p-8 hover:border-primary/60 transition-all shadow-[0_0_30px_rgba(0,212,255,0.15)] hover:shadow-[0_0_40px_rgba(0,212,255,0.25)]">
                <div className="absolute inset-0 bg-gradient-to-br from-[#14f195]/5 to-transparent rounded-2xl" />

                <div className="relative">
                  {/* Header */}
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-10 h-10 rounded-lg bg-primary/20 border border-primary/40 flex items-center justify-center">
                      <Check className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <div className="text-xs uppercase tracking-wide text-primary/70 font-mono mb-1">
                        {comparison.category}
                      </div>
                      <h3 className="text-xl font-bold text-primary">Mishti AI</h3>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="space-y-3">
                    <h4 className="text-lg font-semibold text-foreground">
                      {comparison.mishti.title}
                    </h4>
                    <p className="text-sm text-foreground/70 leading-relaxed">
                      {comparison.mishti.description}
                    </p>
                  </div>

                  {/* Enterprise indicator */}
                  <div className="mt-6 pt-4 border-t border-primary/20">
                    <div className="flex items-center gap-2 text-xs text-primary/70 font-medium">
                      <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                      <span>ENTERPRISE SAFE</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Summary */}
        <div className="mt-16 relative">
          <div className="absolute inset-0 bg-gradient-to-r from-primary/20 via-[#14f195]/20 to-primary/20 blur-3xl" />
          <div className="relative rounded-2xl border border-primary/40 bg-gradient-to-br from-card/90 to-card/60 backdrop-blur-xl p-10 text-center shadow-[0_0_50px_rgba(0,212,255,0.2)]">
            <div className="inline-flex items-center gap-3 mb-4">
              <Zap className="w-6 h-6 text-primary" />
              <h3 className="text-2xl font-bold">The Core Difference</h3>
            </div>
            <div className="max-w-3xl mx-auto space-y-3">
              <p className="text-lg text-foreground/80">
                <span className="text-destructive font-semibold">Traditional AI</span> optimizes for output speed at the cost of control
              </p>
              <div className="w-24 h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent mx-auto" />
              <p className="text-lg text-foreground">
                <span className="text-primary font-semibold">Mishti AI</span> optimizes for correctness, traceability, and governance
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
