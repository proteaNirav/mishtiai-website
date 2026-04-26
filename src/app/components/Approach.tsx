import { Shield, GitBranch, CheckCircle2, Workflow, Database, Lock } from "lucide-react";

export function Approach() {
  const architecturalPillars = [
    {
      icon: GitBranch,
      title: "Deterministic Execution Models",
      description: "State-machine based execution with guaranteed reproducibility",
      metrics: ["100% replay capability", "Zero state drift", "Immutable audit logs"]
    },
    {
      icon: Database,
      title: "Append-Only Intelligence Layers",
      description: "Knowledge accumulation without data mutation or loss",
      metrics: ["Temporal versioning", "Complete lineage", "Rollback to any point"]
    },
    {
      icon: Workflow,
      title: "Structured Decision Lifecycle",
      description: "Enforced flow from request through validation to execution",
      metrics: ["7-stage pipeline", "Governance gates", "Operator approval"]
    },
    {
      icon: Lock,
      title: "Operator-Controlled Surfaces",
      description: "Human-in-the-loop for all critical decision points",
      metrics: ["Real-time oversight", "Policy enforcement", "Veto capability"]
    }
  ];

  return (
    <section className="relative py-32 px-6 bg-gradient-to-b from-transparent via-muted/10 to-transparent">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 mb-6 rounded-lg border border-primary/20 bg-primary/5">
            <Shield className="w-4 h-4 text-primary" />
            <span className="text-sm text-primary tracking-wide font-mono">ARCHITECTURAL FOUNDATION</span>
          </div>
          <h2 className="text-5xl md:text-6xl font-bold mb-6">
            Governed Intelligence <span className="text-primary">Architecture</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Four foundational pillars ensuring enterprise-grade control and auditability
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6 mb-16">
          {architecturalPillars.map((pillar, i) => {
            const Icon = pillar.icon;
            return (
              <div
                key={i}
                className="group relative rounded-2xl border border-border bg-card/60 backdrop-blur-md p-8 hover:border-primary/40 transition-all hover:shadow-[0_0_40px_rgba(0,212,255,0.15)]"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity" />

                <div className="relative">
                  {/* Header */}
                  <div className="flex items-start gap-4 mb-6">
                    <div className="w-14 h-14 rounded-xl bg-primary/10 border border-primary/30 flex items-center justify-center flex-shrink-0 group-hover:bg-primary/20 transition-colors">
                      <Icon className="w-7 h-7 text-primary" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-bold mb-2">{pillar.title}</h3>
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        {pillar.description}
                      </p>
                    </div>
                  </div>

                  {/* Metrics */}
                  <div className="pt-4 border-t border-border/50">
                    <div className="space-y-2">
                      {pillar.metrics.map((metric, j) => (
                        <div key={j} className="flex items-center gap-2 text-sm">
                          <CheckCircle2 className="w-4 h-4 text-primary flex-shrink-0" />
                          <span className="text-foreground/70 font-mono">{metric}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Core Principle */}
        <div className="relative max-w-5xl mx-auto">
          <div className="absolute inset-0 bg-gradient-to-r from-primary/20 via-[#14f195]/20 to-primary/20 blur-3xl" />
          <div className="relative rounded-2xl border border-primary/30 bg-gradient-to-br from-card/90 to-card/60 backdrop-blur-xl overflow-hidden shadow-[0_0_50px_rgba(0,212,255,0.2)]">
            {/* Grid background */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(0,212,255,0.05)_1px,transparent_1px),linear-gradient(to_bottom,rgba(0,212,255,0.05)_1px,transparent_1px)] bg-[size:40px_40px]" />

            <div className="relative p-12 text-center">
              <div className="mb-6">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-primary/20 bg-primary/10 mb-4">
                  <span className="text-xs font-mono text-primary uppercase tracking-wide">Core Principle</span>
                </div>
              </div>

              <div className="space-y-4">
                <p className="text-3xl md:text-4xl font-bold">
                  <span className="bg-gradient-to-r from-white via-primary to-[#14f195] bg-clip-text text-transparent">
                    Intelligence is allowed.
                  </span>
                </p>
                <div className="w-24 h-px bg-gradient-to-r from-transparent via-primary to-transparent mx-auto" />
                <p className="text-3xl md:text-4xl font-bold">
                  <span className="bg-gradient-to-r from-[#14f195] via-primary to-white bg-clip-text text-transparent">
                    Execution is controlled.
                  </span>
                </p>
              </div>

              {/* System indicator */}
              <div className="mt-8 flex items-center justify-center gap-6 text-sm font-mono text-muted-foreground">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                  <span>VALIDATION: ACTIVE</span>
                </div>
                <div className="w-px h-4 bg-border" />
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-[#14f195]" />
                  <span>GOVERNANCE: ENFORCED</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
