import { BookOpen, Terminal, Workflow, Database, Lock, Zap } from "lucide-react";

export function LES() {
  const capabilities = [
    {
      icon: Terminal,
      title: "API-Driven Cognition",
      description: "Direct programmatic access to intelligence layer",
      tag: "API"
    },
    {
      icon: Workflow,
      title: "Prompt Interface",
      description: "Natural language with type-safe outputs",
      tag: "INTERFACE"
    },
    {
      icon: Database,
      title: "Gateway Integration",
      description: "Enterprise system connectivity",
      tag: "GATEWAY"
    },
    {
      icon: Lock,
      title: "Controlled Learning",
      description: "Governed knowledge ingestion",
      tag: "GOVERNANCE"
    }
  ];

  return (
    <section className="relative py-32 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-20">
          <div className="inline-flex items-center gap-2 px-4 py-2 mb-6 rounded-full border border-[#14f195]/20 bg-[#14f195]/5">
            <BookOpen className="w-4 h-4 text-[#14f195]" />
            <span className="text-sm text-[#14f195] tracking-wide font-medium">PHASE 2</span>
          </div>
          <h2 className="text-5xl md:text-6xl font-bold mb-6">
            Learning Execution System
          </h2>
          <p className="text-2xl text-foreground/80 max-w-3xl mx-auto mb-4">
            LES enables enterprise systems to interact with Mishti safely through{" "}
            <span className="text-[#14f195] font-semibold">governed intelligence</span>.
          </p>
          <p className="text-lg text-muted-foreground font-mono">LES</p>
        </div>

        {/* Capability Cards Grid */}
        <div className="grid md:grid-cols-2 gap-8 mb-16">
          {capabilities.map((capability, i) => {
            const Icon = capability.icon;

            return (
              <div
                key={i}
                className={`group relative rounded-2xl border border-[#14f195]/30 bg-card/60 backdrop-blur-md p-8 transition-all duration-300 hover:scale-[1.02] hover:shadow-[0_0_40px_rgba(20,241,149,0.15)]`}
              >
                {/* Background gradient */}
                <div className={`absolute inset-0 bg-[#14f195]/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity`} />

                {/* Content */}
                <div className="relative">
                  {/* Header */}
                  <div className="flex items-start justify-between mb-6">
                    <div className={`w-14 h-14 rounded-xl bg-[#14f195]/10 border border-[#14f195]/30 flex items-center justify-center group-hover:scale-110 transition-transform`}>
                      <Icon className={`w-7 h-7 text-[#14f195]`} />
                    </div>
                    <span className={`px-3 py-1 rounded-full bg-[#14f195]/10 border border-[#14f195]/30 text-xs text-[#14f195] font-mono`}>
                      {capability.tag}
                    </span>
                  </div>

                  {/* Title & Description */}
                  <h3 className="text-2xl font-bold mb-3">{capability.title}</h3>
                  <p className="text-muted-foreground">{capability.description}</p>

                  {/* Technical accent */}
                  <div className="mt-6 pt-6 border-t border-border/50">
                    <div className="flex items-center gap-2 text-xs font-mono text-muted-foreground">
                      <div className={`w-2 h-2 rounded-full bg-[#14f195] animate-pulse`} />
                      <span>GOVERNED ACCESS</span>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Architecture Flow Diagram */}
        <div className="relative rounded-2xl border border-border bg-card/40 backdrop-blur-md p-10">
          <div className="absolute inset-0 bg-gradient-to-br from-[#14f195]/5 via-transparent to-primary/5 rounded-2xl" />

          <div className="relative">
            <h3 className="text-2xl font-bold mb-8 text-center">System Integration</h3>

            <div className="flex items-center justify-between gap-4">
              {/* External Systems */}
              <div className="flex-1 text-center">
                <div className="w-full rounded-xl border border-border bg-card/60 p-6 mb-3">
                  <Database className="w-8 h-8 text-muted-foreground mx-auto mb-2" />
                  <div className="text-sm font-semibold">External Systems</div>
                </div>
              </div>

              {/* Arrow */}
              <div className="flex flex-col items-center gap-2">
                <div className="w-12 h-px bg-gradient-to-r from-primary/50 to-[#14f195]/50" />
                <Zap className="w-5 h-5 text-primary" />
                <div className="w-12 h-px bg-gradient-to-r from-[#14f195]/50 to-primary/50" />
              </div>

              {/* LES Gateway */}
              <div className="flex-1 text-center">
                <div className="w-full rounded-xl border border-[#14f195]/40 bg-gradient-to-br from-[#14f195]/10 to-card/60 p-6 mb-3 shadow-[0_0_30px_rgba(20,241,149,0.15)]">
                  <Workflow className="w-8 h-8 text-[#14f195] mx-auto mb-2" />
                  <div className="text-sm font-semibold">LES Gateway</div>
                </div>
              </div>

              {/* Arrow */}
              <div className="flex flex-col items-center gap-2">
                <div className="w-12 h-px bg-gradient-to-r from-[#14f195]/50 to-primary/50" />
                <Lock className="w-5 h-5 text-[#14f195]" />
                <div className="w-12 h-px bg-gradient-to-r from-primary/50 to-[#14f195]/50" />
              </div>

              {/* Mishti Core */}
              <div className="flex-1 text-center">
                <div className="w-full rounded-xl border border-primary/40 bg-gradient-to-br from-primary/10 to-card/60 p-6 mb-3 shadow-[0_0_30px_rgba(0,212,255,0.15)]">
                  <Terminal className="w-8 h-8 text-primary mx-auto mb-2" />
                  <div className="text-sm font-semibold">Mishti Core</div>
                </div>
              </div>
            </div>

            <div className="text-center mt-6 text-sm text-muted-foreground">
              Bidirectional, governed communication
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
