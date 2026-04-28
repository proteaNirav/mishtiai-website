import { Layers, RotateCcw, Brain, Network, Lock, Eye, ArrowDown, Zap } from "lucide-react";

export function Architecture() {
  const layers = [
    {
      icon: RotateCcw,
      title: "Recovery Layer",
      phase: "Phase 6",
      description: "Deterministic failure handling and state management",
      features: [
        "replay, retry, resume, rollback capabilities",
        "simulation-first execution model",
        "deterministic failure recovery"
      ],
      accentColor: "primary"
    },
    {
      icon: Brain,
      title: "Cognition Layer",
      phase: "Phase 7",
      description: "Intelligence processing with structured reasoning",
      features: [
        "knowledge, emotion, wisdom signals",
        "hypothesis generation + consortium debate",
        "Yukti: read-only intelligence surface"
      ],
      accentColor: "neon-teal"
    },
    {
      icon: Network,
      title: "Mesh Brain",
      phase: "Phase 8",
      description: "Distributed intelligence routing and lineage tracking",
      features: [
        "Learner → Consortium → Node architecture",
        "lineage-based intelligence routing",
        "distributed cognition framework"
      ],
      accentColor: "neon-purple"
    },
    {
      icon: Lock,
      title: "Governed Execution",
      phase: "Phase 9",
      description: "Controlled action handoff with governance enforcement",
      features: [
        "Action Request → Readiness → Governance flow",
        "no direct execution paths",
        "controlled handoff model"
      ],
      accentColor: "primary"
    },
    {
      icon: Eye,
      title: "Operator Control",
      phase: "Control Layer",
      description: "Human oversight and audit visibility",
      features: [
        "post-execution review system",
        "follow-up action queues",
        "complete audit visibility"
      ],
      accentColor: "neon-teal"
    }
  ];

  const getAccentClass = (color: string) => {
    switch (color) {
      case "primary":
        return {
          border: "border-primary/40",
          bg: "bg-primary/10",
          glow: "shadow-[0_0_40px_rgba(0,212,255,0.15)]",
          hoverGlow: "group-hover:shadow-[0_0_60px_rgba(0,212,255,0.3)]",
          text: "text-primary",
          dot: "bg-primary"
        };
      case "neon-teal":
        return {
          border: "border-[#14f195]/40",
          bg: "bg-[#14f195]/10",
          glow: "shadow-[0_0_40px_rgba(20,241,149,0.15)]",
          hoverGlow: "group-hover:shadow-[0_0_60px_rgba(20,241,149,0.3)]",
          text: "text-[#14f195]",
          dot: "bg-[#14f195]"
        };
      case "neon-purple":
        return {
          border: "border-[#a855f7]/40",
          bg: "bg-[#a855f7]/10",
          glow: "shadow-[0_0_40px_rgba(168,85,247,0.15)]",
          hoverGlow: "group-hover:shadow-[0_0_60px_rgba(168,85,247,0.3)]",
          text: "text-[#a855f7]",
          dot: "bg-[#a855f7]"
        };
      default:
        return {
          border: "border-primary/40",
          bg: "bg-primary/10",
          glow: "shadow-[0_0_40px_rgba(0,212,255,0.15)]",
          hoverGlow: "group-hover:shadow-[0_0_60px_rgba(0,212,255,0.3)]",
          text: "text-primary",
          dot: "bg-primary"
        };
    }
  };

  return (
    <section className="relative py-32 px-6 bg-gradient-to-b from-transparent via-muted/20 to-transparent">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="text-center mb-20">
          <div className="inline-flex items-center gap-2 px-4 py-2 mb-6 rounded-full border border-primary/20 bg-primary/5">
            <Layers className="w-4 h-4 text-primary" />
            <span className="text-sm text-primary tracking-wide font-medium">CORE ARCHITECTURE</span>
          </div>
          <h2 className="text-5xl md:text-6xl font-bold mb-6">
            Five-Layer <span className="text-primary">Governed System</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Each layer enforces structure, traceability, and control before execution
          </p>
        </div>

        {/* Layer Pipeline */}
        <div className="space-y-8">
          {layers.map((layer, i) => {
            const Icon = layer.icon;
            const accent = getAccentClass(layer.accentColor);

            return (
              <div key={i}>
                {/* Layer Card */}
                <div
                  className={`group relative rounded-2xl border ${accent.border} bg-card/60 backdrop-blur-md p-8 md:p-10 transition-all duration-300 ${accent.glow} ${accent.hoverGlow} hover:scale-[1.02]`}
                >
                  {/* Background gradient */}
                  <div className={`absolute inset-0 ${accent.bg} rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />

                  {/* Content */}
                  <div className="relative">
                    <div className="flex items-start gap-6 mb-6">
                      {/* Icon */}
                      <div className={`w-16 h-16 rounded-xl ${accent.bg} border ${accent.border} flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300`}>
                        <Icon className={`w-8 h-8 ${accent.text}`} />
                      </div>

                      {/* Title and Phase */}
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="text-3xl font-bold">{layer.title}</h3>
                          <span className={`px-3 py-1 rounded-full ${accent.bg} border ${accent.border} text-sm ${accent.text} font-mono`}>
                            {layer.phase}
                          </span>
                        </div>
                        <p className="text-lg text-muted-foreground">{layer.description}</p>
                      </div>
                    </div>

                    {/* Features */}
                    <div className="pl-[88px]">
                      <ul className="space-y-3">
                        {layer.features.map((feature, j) => (
                          <li key={j} className="flex items-start gap-3">
                            <div className={`w-1.5 h-1.5 rounded-full ${accent.dot} mt-2.5 flex-shrink-0`} />
                            <span className="text-foreground/80">{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* Layer number indicator */}
                  <div className="absolute -left-4 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-card border border-border flex items-center justify-center">
                    <span className={`text-sm font-bold ${accent.text}`}>{i + 1}</span>
                  </div>
                </div>

                {/* Flow Arrow */}
                {i < layers.length - 1 && (
                  <div className="flex items-center justify-center py-4">
                    <div className="flex flex-col items-center gap-2">
                      <div className="w-px h-8 bg-gradient-to-b from-primary/50 to-primary/20" />
                      <div className="w-8 h-8 rounded-full border border-primary/30 bg-primary/10 flex items-center justify-center backdrop-blur-sm">
                        <ArrowDown className="w-4 h-4 text-primary animate-pulse" />
                      </div>
                      <div className="w-px h-8 bg-gradient-to-b from-primary/20 to-transparent" />
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <div className="mt-16 text-center">
          <div className="inline-flex items-center gap-3 px-6 py-4 rounded-xl border border-primary/30 bg-gradient-to-r from-primary/10 to-[#14f195]/10 backdrop-blur-sm">
            <Zap className="w-5 h-5 text-primary" />
            <span className="text-lg font-semibold">
              Every layer enforces <span className="text-primary">governance</span> before execution
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
