import { CheckCircle2, Circle, Sparkles, RotateCcw, Brain, Network, Lock, Code2 } from "lucide-react";

export function Roadmap() {
  const phases = [
    {
      number: 6,
      title: "Recovery",
      description: "Deterministic failure handling",
      icon: RotateCcw,
      status: "completed"
    },
    {
      number: 7,
      title: "Cognition",
      description: "Intelligence processing layer",
      icon: Brain,
      status: "completed"
    },
    {
      number: 8,
      title: "Mesh Brain",
      description: "Distributed intelligence routing",
      icon: Network,
      status: "completed"
    },
    {
      number: 9,
      title: "Governed Execution",
      description: "Controlled action handoff",
      icon: Lock,
      status: "completed"
    },
    {
      number: 10,
      title: "GACS",
      description: "Autonomous coding system",
      icon: Code2,
      status: "next"
    }
  ];

  return (
    <section className="relative py-32 px-6 bg-gradient-to-b from-transparent via-muted/20 to-transparent">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-20">
          <h2 className="text-5xl md:text-6xl font-bold mb-6">
            Development <span className="text-primary">Roadmap</span>
          </h2>
          <p className="text-xl text-muted-foreground">
            From foundational layers to autonomous systems
          </p>
        </div>

        {/* Timeline */}
        <div className="relative">
          {/* Connection Line */}
          <div className="absolute top-20 left-0 right-0 h-px hidden lg:block">
            <div className="w-full h-full bg-gradient-to-r from-[#14f195]/30 via-[#14f195]/60 to-primary/30" />
          </div>

          {/* Phases Grid */}
          <div className="grid lg:grid-cols-5 gap-8 lg:gap-4">
            {phases.map((phase, i) => {
              const Icon = phase.icon;
              const isCompleted = phase.status === "completed";
              const isNext = phase.status === "next";

              return (
                <div key={i} className="relative">
                  {/* Phase Card */}
                  <div
                    className={`relative rounded-2xl border backdrop-blur-md p-6 transition-all duration-300 ${
                      isNext
                        ? "border-primary/40 bg-gradient-to-br from-primary/10 via-card/90 to-card/60 shadow-[0_0_40px_rgba(0,212,255,0.2)] hover:shadow-[0_0_50px_rgba(0,212,255,0.3)] scale-105"
                        : isCompleted
                        ? "border-[#14f195]/30 bg-card/60 hover:border-[#14f195]/50"
                        : "border-border bg-card/40 opacity-60"
                    }`}
                  >
                    {/* Status Indicator */}
                    <div className="flex items-center justify-center mb-6">
                      <div
                        className={`w-16 h-16 rounded-full border-2 flex items-center justify-center ${
                          isNext
                            ? "border-primary/40 bg-primary/10"
                            : isCompleted
                            ? "border-[#14f195]/40 bg-[#14f195]/10"
                            : "border-border bg-card/20"
                        }`}
                      >
                        {isCompleted && <CheckCircle2 className="w-8 h-8 text-[#14f195]" />}
                        {isNext && <Sparkles className="w-8 h-8 text-primary" />}
                        {!isCompleted && !isNext && <Circle className="w-8 h-8 text-muted-foreground" />}
                      </div>
                    </div>

                    {/* Phase Number */}
                    <div className="text-center mb-3">
                      <span
                        className={`text-xs font-mono uppercase tracking-wide ${
                          isNext ? "text-primary" : isCompleted ? "text-[#14f195]" : "text-muted-foreground"
                        }`}
                      >
                        Phase {phase.number}
                      </span>
                    </div>

                    {/* Icon & Title */}
                    <div className="text-center mb-4">
                      <div className="flex justify-center mb-3">
                        <div
                          className={`w-12 h-12 rounded-lg flex items-center justify-center ${
                            isNext
                              ? "bg-primary/20 border border-primary/30"
                              : isCompleted
                              ? "bg-[#14f195]/20 border border-[#14f195]/30"
                              : "bg-card/40 border border-border"
                          }`}
                        >
                          <Icon
                            className={`w-6 h-6 ${
                              isNext ? "text-primary" : isCompleted ? "text-[#14f195]" : "text-muted-foreground"
                            }`}
                          />
                        </div>
                      </div>
                      <h3 className="text-xl font-bold mb-2">{phase.title}</h3>
                      <p className="text-sm text-muted-foreground">{phase.description}</p>
                    </div>

                    {/* Status Badge */}
                    {isNext && (
                      <div className="mt-4 pt-4 border-t border-primary/20">
                        <div className="flex flex-col items-center gap-1 text-xs text-primary font-medium">
                          <div className="flex items-center gap-2">
                            <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                            <span>NEXT EVOLUTION</span>
                          </div>
                        </div>
                      </div>
                    )}

                    {isCompleted && (
                      <div className="mt-4 pt-4 border-t border-[#14f195]/20">
                        <div className="flex items-center justify-center gap-2 text-xs text-[#14f195] font-medium">
                          <CheckCircle2 className="w-3 h-3" />
                          <span>COMPLETED</span>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Connector Arrow (desktop only) */}
                  {i < phases.length - 1 && (
                    <div className="hidden lg:block absolute top-20 -right-2 w-4 h-4">
                      <div
                        className={`w-3 h-3 rounded-full ${
                          phase.status === "completed" ? "bg-[#14f195]/50" : "bg-primary/30"
                        }`}
                      />
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Current Status */}
        <div className="mt-16 relative">
          <div className="absolute inset-0 bg-gradient-to-r from-[#14f195]/20 via-primary/20 to-[#14f195]/20 blur-3xl" />
          <div className="relative rounded-2xl border border-border bg-card/60 backdrop-blur-md p-10">
            <div className="grid md:grid-cols-2 gap-8">
              {/* Completed */}
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <CheckCircle2 className="w-6 h-6 text-[#14f195]" />
                  <h3 className="text-2xl font-bold">Foundation Complete</h3>
                </div>
                <ul className="space-y-2 text-foreground/80">
                  <li className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-[#14f195]" />
                    <span>Recovery layer operational</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-[#14f195]" />
                    <span>Cognition system deployed</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-[#14f195]" />
                    <span>Mesh brain architecture live</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-[#14f195]" />
                    <span>Governance layer enforced</span>
                  </li>
                </ul>
              </div>

              {/* Next */}
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <Sparkles className="w-6 h-6 text-primary" />
                  <h3 className="text-2xl font-bold">Next: Phase 10</h3>
                </div>
                <ul className="space-y-2 text-foreground/80">
                  <li className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                    <span>Autonomous coding system (GACS)</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                    <span>Policy engine expansion</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                    <span>Execution orchestration</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                    <span>LES Phase 2 integration</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
