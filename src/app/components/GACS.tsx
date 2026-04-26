import { Code2, ArrowRight, Shield, CheckCircle2, Lock, Play, AlertCircle } from "lucide-react";

export function GACS() {
  const flowSteps = [
    {
      icon: Code2,
      title: "Request",
      description: "AI identifies code change",
      color: "primary"
    },
    {
      icon: AlertCircle,
      title: "Readiness",
      description: "System validates safety",
      color: "neon-purple"
    },
    {
      icon: Shield,
      title: "Approval",
      description: "Governance grants permission",
      color: "neon-teal"
    },
    {
      icon: Play,
      title: "Execution",
      description: "Code executes with traceability",
      color: "primary"
    }
  ];

  const principles = [
    { label: "Traceable", icon: CheckCircle2 },
    { label: "Reversible", icon: CheckCircle2 },
    { label: "Auditable", icon: CheckCircle2 }
  ];

  const getColorClasses = (color: string) => {
    switch (color) {
      case "primary":
        return {
          bg: "bg-primary/10",
          border: "border-primary/40",
          text: "text-primary",
          glow: "shadow-[0_0_30px_rgba(0,212,255,0.2)]"
        };
      case "neon-teal":
        return {
          bg: "bg-[#14f195]/10",
          border: "border-[#14f195]/40",
          text: "text-[#14f195]",
          glow: "shadow-[0_0_30px_rgba(20,241,149,0.2)]"
        };
      case "neon-purple":
        return {
          bg: "bg-[#a855f7]/10",
          border: "border-[#a855f7]/40",
          text: "text-[#a855f7]",
          glow: "shadow-[0_0_30px_rgba(168,85,247,0.2)]"
        };
      default:
        return {
          bg: "bg-primary/10",
          border: "border-primary/40",
          text: "text-primary",
          glow: "shadow-[0_0_30px_rgba(0,212,255,0.2)]"
        };
    }
  };

  return (
    <section className="relative py-32 px-6 overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 bg-gradient-to-b from-muted/20 via-transparent to-muted/20" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-radial from-primary/10 via-transparent to-transparent blur-3xl" />

      <div className="relative max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-20">
          <div className="inline-flex items-center gap-2 px-4 py-2 mb-6 rounded-full border border-primary/20 bg-primary/5">
            <Code2 className="w-4 h-4 text-primary" />
            <span className="text-sm text-primary tracking-wide font-medium">PHASE 10 — FLAGSHIP</span>
          </div>
          <h2 className="text-5xl md:text-7xl font-bold mb-8">
            Governed Autonomous
            <br />
            <span className="bg-gradient-to-r from-primary via-[#14f195] to-primary bg-clip-text text-transparent">
              Coding System
            </span>
          </h2>
          <p className="text-2xl text-foreground/80 max-w-3xl mx-auto mb-4">
            AI can modify production systems — but only under{" "}
            <span className="text-primary font-semibold">enforced governance</span>.
          </p>
          <p className="text-lg text-muted-foreground font-mono">GACS</p>
        </div>

        {/* Flow Diagram */}
        <div className="mb-16">
          <div className="grid md:grid-cols-4 gap-6 relative">
            {/* Connecting lines */}
            <div className="hidden md:block absolute top-1/2 left-0 right-0 h-px">
              <div className="w-full h-full bg-gradient-to-r from-primary/0 via-primary/30 to-primary/0" />
            </div>

            {flowSteps.map((step, i) => {
              const Icon = step.icon;
              const colors = getColorClasses(step.color);

              return (
                <div key={i} className="relative">
                  {/* Card */}
                  <div
                    className={`group relative rounded-2xl border ${colors.border} bg-card/80 backdrop-blur-md p-6 transition-all duration-500 hover:scale-105 ${colors.glow} hover:${colors.glow}`}
                  >
                    {/* Background gradient */}
                    <div className={`absolute inset-0 ${colors.bg} rounded-2xl opacity-50 group-hover:opacity-100 transition-opacity`} />

                    {/* Content */}
                    <div className="relative">
                      {/* Step number */}
                      <div className="flex items-center justify-between mb-4">
                        <div className={`w-10 h-10 rounded-lg ${colors.bg} border ${colors.border} flex items-center justify-center`}>
                          <Icon className={`w-5 h-5 ${colors.text}`} />
                        </div>
                        <span className={`text-xs font-mono ${colors.text} opacity-50`}>
                          {i + 1}
                        </span>
                      </div>

                      {/* Title */}
                      <h3 className="text-xl font-bold mb-2">{step.title}</h3>

                      {/* Description */}
                      <p className="text-sm text-muted-foreground">{step.description}</p>
                    </div>

                    {/* Pulse animation on hover */}
                    <div className={`absolute inset-0 rounded-2xl border-2 ${colors.border} opacity-0 group-hover:opacity-100 animate-ping`} />
                  </div>

                  {/* Arrow connector */}
                  {i < flowSteps.length - 1 && (
                    <div className="hidden md:flex absolute top-1/2 -right-3 -translate-y-1/2 z-10">
                      <div className="w-6 h-6 rounded-full bg-primary/20 border border-primary/40 backdrop-blur-sm flex items-center justify-center">
                        <ArrowRight className="w-3 h-3 text-primary" />
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Guarantees */}
        <div className="grid md:grid-cols-3 gap-6 mb-16">
          {principles.map((principle, i) => {
            const Icon = principle.icon;
            return (
              <div
                key={i}
                className="group relative rounded-xl border border-border bg-card/60 backdrop-blur-md p-6 hover:border-primary/40 transition-all text-center"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent rounded-xl opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="relative">
                  <Icon className="w-8 h-8 text-primary mx-auto mb-3" />
                  <div className="text-xl font-bold">{principle.label}</div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
