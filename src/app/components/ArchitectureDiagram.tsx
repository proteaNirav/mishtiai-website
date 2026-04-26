import {
  User,
  FileCheck,
  AlertCircle,
  Brain,
  Shield,
  Play,
  Eye,
  RotateCcw,
  ArrowRight,
  Lock,
  Database,
  FileText,
  Network,
  Terminal,
  Zap,
  ChevronRight
} from "lucide-react";

export function ArchitectureDiagram() {
  const primaryFlow = [
    {
      title: "User/System Request",
      icon: User,
      details: ["External trigger", "User intent", "System event"],
      color: "muted",
      hasGateAfter: false
    },
    {
      title: "Action Request Admission",
      icon: FileCheck,
      details: [
        "Validates intent",
        "Validates target",
        "Validates origin",
        "Creates immutable request"
      ],
      color: "primary",
      hasGateAfter: true
    },
    {
      title: "Readiness Evaluation",
      icon: AlertCircle,
      details: [
        "Checks evidence",
        "Checks target posture",
        "Blocks unsafe actions",
        "Creates readiness record"
      ],
      color: "purple",
      hasGateAfter: true
    },
    {
      title: "Cognition Layer",
      icon: Brain,
      details: [
        "Experience & Knowledge",
        "Wisdom & Emotion",
        "Consortium Debate",
        "Yukti cognition"
      ],
      color: "teal",
      hasGateAfter: false
    },
    {
      title: "Governance Review",
      icon: Shield,
      details: [
        "Handoff proposal",
        "Review decision",
        "Policy enforcement",
        "Operator approval"
      ],
      color: "primary",
      hasGateAfter: true
    },
    {
      title: "Controlled Execution",
      icon: Play,
      details: [
        "No hidden execution",
        "No uncontrolled chaining",
        "Traceable only"
      ],
      color: "teal",
      hasGateAfter: false
    },
    {
      title: "Post-Execution Review",
      icon: Eye,
      details: [
        "Outcome classification",
        "Explainability",
        "Follow-up proposal",
        "Console visibility"
      ],
      color: "purple",
      hasGateAfter: false
    },
    {
      title: "Recovery/Follow-Up",
      icon: RotateCcw,
      details: [
        "Retry & Resume",
        "Replay capability",
        "Rollback support",
        "Deterministic recovery"
      ],
      color: "primary",
      hasGateAfter: false
    }
  ];

  const foundationLayers = [
    {
      title: "Append-Only Audit Ledger",
      icon: FileText,
      description: "Immutable record of all decisions and actions",
      color: "primary"
    },
    {
      title: "Policy Registry",
      icon: Database,
      description: "Governance rules and approval requirements",
      color: "teal"
    },
    {
      title: "Mesh Brain",
      icon: Network,
      description: "Learner → Consortium → Node architecture",
      color: "purple"
    },
    {
      title: "Operator Console",
      icon: Terminal,
      description: "Real-time visibility and control",
      color: "primary"
    },
    {
      title: "Gateway/API",
      icon: Zap,
      description: "Enterprise system integration",
      color: "teal"
    }
  ];

  const getColorClasses = (color: string) => {
    switch (color) {
      case "primary":
        return {
          bg: "bg-primary/10",
          border: "border-primary/40",
          text: "text-primary",
          glow: "shadow-[0_0_25px_rgba(0,212,255,0.2)]",
          dot: "bg-primary"
        };
      case "teal":
        return {
          bg: "bg-[#14f195]/10",
          border: "border-[#14f195]/40",
          text: "text-[#14f195]",
          glow: "shadow-[0_0_25px_rgba(20,241,149,0.2)]",
          dot: "bg-[#14f195]"
        };
      case "purple":
        return {
          bg: "bg-[#a855f7]/10",
          border: "border-[#a855f7]/40",
          text: "text-[#a855f7]",
          glow: "shadow-[0_0_25px_rgba(168,85,247,0.2)]",
          dot: "bg-[#a855f7]"
        };
      case "muted":
        return {
          bg: "bg-muted/10",
          border: "border-border",
          text: "text-muted-foreground",
          glow: "",
          dot: "bg-muted-foreground"
        };
      default:
        return {
          bg: "bg-primary/10",
          border: "border-primary/40",
          text: "text-primary",
          glow: "",
          dot: "bg-primary"
        };
    }
  };

  return (
    <section className="relative py-32 px-6 bg-gradient-to-b from-background via-[#0a0a14] to-background overflow-hidden">
      {/* Background grid */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(0,212,255,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(0,212,255,0.03)_1px,transparent_1px)] bg-[size:60px_60px]" />

      <div className="relative max-w-[1600px] mx-auto">
        {/* Title */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 mb-6 rounded-lg border border-primary/20 bg-primary/5 backdrop-blur-sm">
            <Shield className="w-4 h-4 text-primary" />
            <span className="text-sm text-primary tracking-wide font-mono">SYSTEM ARCHITECTURE</span>
          </div>
          <h2 className="text-5xl md:text-6xl font-bold mb-4">
            Mishti AI <span className="text-primary">Governed Intelligence Architecture</span>
          </h2>
          <p className="text-lg text-muted-foreground">
            Complete execution lifecycle with layered governance and recovery
          </p>
        </div>

        {/* Main Flow Container */}
        <div className="relative rounded-3xl border border-primary/20 bg-gradient-to-br from-card/40 to-card/20 backdrop-blur-xl p-8 mb-12 overflow-x-auto">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-[#14f195]/5 rounded-3xl" />

          <div className="relative min-w-[1400px]">
            {/* Primary Flow */}
            <div className="flex items-start gap-3 mb-8">
              {primaryFlow.map((stage, i) => {
                const Icon = stage.icon;
                const colors = getColorClasses(stage.color);

                return (
                  <div key={i} className="flex items-center gap-3 flex-1">
                    {/* Stage Card */}
                    <div className={`group relative rounded-xl border ${colors.border} bg-card/80 backdrop-blur-md hover:bg-card/90 transition-all ${colors.glow} w-full`}>
                      <div className={`absolute inset-0 ${colors.bg} rounded-xl opacity-60 group-hover:opacity-100 transition-opacity`} />

                      <div className="relative p-5">
                        {/* Icon & Title */}
                        <div className="flex items-start gap-3 mb-3 pb-3 border-b border-border/50">
                          <div className={`w-11 h-11 rounded-lg ${colors.bg} border ${colors.border} flex items-center justify-center flex-shrink-0`}>
                            <Icon className={`w-6 h-6 ${colors.text}`} />
                          </div>
                          <div className="flex-1 min-w-0">
                            <h3 className="text-sm font-bold leading-tight mb-1">{stage.title}</h3>
                            <div className={`text-xs font-mono ${colors.text} opacity-70`}>
                              Stage {i + 1}
                            </div>
                          </div>
                        </div>

                        {/* Details */}
                        <ul className="space-y-1.5">
                          {stage.details.map((detail, j) => (
                            <li key={j} className="flex items-start gap-2 text-xs">
                              <div className={`w-1 h-1 rounded-full ${colors.dot} mt-1.5 flex-shrink-0`} />
                              <span className="text-foreground/70 leading-relaxed">{detail}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    {/* Connector */}
                    {i < primaryFlow.length - 1 && (
                      <div className="flex flex-col items-center gap-2 -mx-1">
                        {stage.hasGateAfter ? (
                          // Governance Gate
                          <div className="flex flex-col items-center gap-2">
                            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary/20 to-primary/10 border-2 border-primary/50 backdrop-blur-sm flex items-center justify-center shadow-[0_0_20px_rgba(0,212,255,0.3)]">
                              <Lock className="w-6 h-6 text-primary" />
                            </div>
                            <div className="px-2 py-1 rounded-md bg-primary/10 border border-primary/30">
                              <span className="text-[10px] font-mono text-primary uppercase tracking-wide">
                                GATE
                              </span>
                            </div>
                          </div>
                        ) : (
                          // Regular Arrow
                          <div className="w-10 h-10 rounded-lg bg-border/20 border border-border/50 backdrop-blur-sm flex items-center justify-center">
                            <ChevronRight className="w-5 h-5 text-muted-foreground" />
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Main Message Callout */}
        <div className="mb-12 relative">
          <div className="absolute inset-0 bg-gradient-to-r from-primary/20 via-[#14f195]/20 to-primary/20 blur-3xl" />
          <div className="relative rounded-2xl border border-primary/40 bg-gradient-to-br from-card/90 to-card/60 backdrop-blur-xl p-8 text-center shadow-[0_0_60px_rgba(0,212,255,0.25)]">
            <div className="flex items-center justify-center gap-4 mb-3">
              <Shield className="w-7 h-7 text-primary" />
              <h3 className="text-3xl font-bold">Core Governance Principle</h3>
            </div>
            <p className="text-2xl font-semibold">
              No decision. No action. No automation — <span className="text-primary">without governance</span>.
            </p>
          </div>
        </div>

        {/* Foundation Layers */}
        <div className="relative">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-muted/10 to-muted/20 rounded-2xl blur-xl" />
          <div className="relative rounded-2xl border border-border bg-card/40 backdrop-blur-md p-8">
            <div className="text-center mb-8">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 mb-3 rounded-full border border-primary/20 bg-primary/5">
                <Database className="w-4 h-4 text-primary" />
                <span className="text-xs font-mono text-primary uppercase tracking-wide">
                  Supporting Infrastructure
                </span>
              </div>
              <h3 className="text-2xl font-bold mb-2">Foundation Layers</h3>
              <p className="text-sm text-muted-foreground">
                Core systems enabling governed intelligence
              </p>
            </div>

            <div className="grid grid-cols-5 gap-4">
              {foundationLayers.map((layer, i) => {
                const Icon = layer.icon;
                const colors = getColorClasses(layer.color);
                return (
                  <div
                    key={i}
                    className={`group relative rounded-xl border ${colors.border} bg-card/60 backdrop-blur-sm p-5 hover:border-opacity-100 transition-all ${colors.glow}`}
                  >
                    <div className={`absolute inset-0 ${colors.bg} rounded-xl opacity-50 group-hover:opacity-100 transition-opacity`} />

                    <div className="relative">
                      <div className={`w-10 h-10 rounded-lg ${colors.bg} border ${colors.border} flex items-center justify-center mb-4`}>
                        <Icon className={`w-5 h-5 ${colors.text}`} />
                      </div>
                      <h4 className="text-sm font-bold mb-2 leading-tight">{layer.title}</h4>
                      <p className="text-xs text-muted-foreground leading-relaxed">
                        {layer.description}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Connecting lines visual hint */}
            <div className="mt-6 flex items-center justify-center gap-2 text-xs text-muted-foreground">
              <div className="w-16 h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
              <span className="font-mono">All layers support the execution flow above</span>
              <div className="w-16 h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
            </div>
          </div>
        </div>

        {/* Footer Note */}
        <div className="mt-12 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-border bg-card/40 backdrop-blur-sm">
            <div className="w-2 h-2 rounded-full bg-[#14f195] animate-pulse" />
            <span className="text-sm text-muted-foreground font-mono">
              Foundations Release v1 — Phase 6 to Phase 9C
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
