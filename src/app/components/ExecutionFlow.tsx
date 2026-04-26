import { FileCode, AlertCircle, Shield, Play, Eye, RotateCcw, Brain, ArrowRight } from "lucide-react";

export function ExecutionFlow() {
  const flowStages = [
    {
      id: 1,
      title: "Action Request",
      icon: FileCode,
      description: "AI identifies required change",
      status: "initiated",
      color: "primary"
    },
    {
      id: 2,
      title: "Readiness",
      icon: AlertCircle,
      description: "Prerequisites validated",
      status: "processing",
      color: "neon-purple"
    },
    {
      id: 3,
      title: "Cognition",
      icon: Brain,
      description: "Consortium debate",
      status: "processing",
      color: "neon-teal"
    },
    {
      id: 4,
      title: "Governance",
      icon: Shield,
      description: "Policy approval required",
      status: "pending",
      color: "primary"
    },
    {
      id: 5,
      title: "Execution",
      icon: Play,
      description: "Controlled execution",
      status: "ready",
      color: "neon-teal"
    },
    {
      id: 6,
      title: "Review",
      icon: Eye,
      description: "Operator validation",
      status: "ready",
      color: "neon-purple"
    },
    {
      id: 7,
      title: "Recovery",
      icon: RotateCcw,
      description: "Rollback available",
      status: "standby",
      color: "primary"
    }
  ];

  const getColorClasses = (color: string) => {
    switch (color) {
      case "primary":
        return {
          bg: "bg-primary/10",
          border: "border-primary/40",
          text: "text-primary",
          glow: "shadow-[0_0_30px_rgba(0,212,255,0.2)]",
          dot: "bg-primary"
        };
      case "neon-teal":
        return {
          bg: "bg-[#14f195]/10",
          border: "border-[#14f195]/40",
          text: "text-[#14f195]",
          glow: "shadow-[0_0_30px_rgba(20,241,149,0.2)]",
          dot: "bg-[#14f195]"
        };
      case "neon-purple":
        return {
          bg: "bg-[#a855f7]/10",
          border: "border-[#a855f7]/40",
          text: "text-[#a855f7]",
          glow: "shadow-[0_0_30px_rgba(168,85,247,0.2)]",
          dot: "bg-[#a855f7]"
        };
      default:
        return {
          bg: "bg-primary/10",
          border: "border-primary/40",
          text: "text-primary",
          glow: "shadow-[0_0_30px_rgba(0,212,255,0.2)]",
          dot: "bg-primary"
        };
    }
  };

  return (
    <section className="relative py-32 px-6 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-[#0f0f1a] to-background" />
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(0,212,255,0.02)_1px,transparent_1px),linear-gradient(to_bottom,rgba(0,212,255,0.02)_1px,transparent_1px)] bg-[size:80px_80px]" />

      <div className="relative max-w-[1400px] mx-auto">
        {/* Header */}
        <div className="text-center mb-20">
          <div className="inline-flex items-center gap-2 px-4 py-2 mb-6 rounded-full border border-primary/20 bg-primary/5">
            <Play className="w-4 h-4 text-primary" />
            <span className="text-sm text-primary tracking-wide font-medium">MOST IMPORTANT</span>
          </div>
          <h2 className="text-5xl md:text-7xl font-bold mb-6">
            End-to-End <span className="text-primary">Execution Flow</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Complete governance pipeline from request to recovery
          </p>
        </div>

        {/* Flow Pipeline */}
        <div className="relative mb-16">
          {/* Connection Line */}
          <div className="absolute top-16 left-0 right-0 h-px hidden lg:block">
            <div className="w-full h-full bg-gradient-to-r from-primary/0 via-primary/50 to-primary/0" />
          </div>

          {/* Stages Grid */}
          <div className="grid grid-cols-1 md:grid-cols-7 gap-6">
            {flowStages.map((stage, i) => {
              const Icon = stage.icon;
              const colors = getColorClasses(stage.color);

              return (
                <div key={i} className="relative flex flex-col">
                  {/* Stage card */}
                  <div
                    className={`group relative rounded-xl border ${colors.border} bg-card/80 backdrop-blur-md p-5 transition-all duration-300 hover:scale-105 ${colors.glow}`}
                  >
                    {/* Background */}
                    <div className={`absolute inset-0 ${colors.bg} rounded-xl opacity-50 group-hover:opacity-100 transition-opacity`} />

                    {/* Content */}
                    <div className="relative">
                      {/* Icon */}
                      <div className="flex flex-col items-center mb-4">
                        <div className={`w-12 h-12 rounded-lg ${colors.bg} border ${colors.border} flex items-center justify-center mb-3`}>
                          <Icon className={`w-6 h-6 ${colors.text}`} />
                        </div>
                      </div>

                      {/* Title */}
                      <h3 className="text-base font-bold mb-2 text-center">{stage.title}</h3>

                      {/* Description */}
                      <p className="text-xs text-muted-foreground text-center mb-3">
                        {stage.description}
                      </p>

                      {/* Status */}
                      <div className={`pt-3 border-t ${colors.border}`}>
                        <div className="flex items-center justify-center gap-2">
                          <div className={`w-1.5 h-1.5 rounded-full ${colors.dot} ${stage.status === 'processing' ? 'animate-pulse' : ''}`} />
                          <span className={`text-xs font-mono uppercase ${colors.text} opacity-70`}>
                            {stage.status}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Arrow connector (desktop) */}
                  {i < flowStages.length - 1 && (
                    <div className="hidden md:block absolute top-16 -right-3 w-6 h-6 z-10">
                      <div className="w-6 h-6 rounded-full bg-primary/20 border-2 border-primary/40 backdrop-blur-sm flex items-center justify-center">
                        <ArrowRight className="w-3 h-3 text-primary" />
                      </div>
                    </div>
                  )}

                  {/* Mobile connector */}
                  {i < flowStages.length - 1 && (
                    <div className="md:hidden flex justify-center py-3">
                      <ArrowRight className="w-5 h-5 text-primary rotate-90" />
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Comparison */}
        <div className="relative">
          <div className="absolute inset-0 bg-gradient-to-r from-destructive/10 via-transparent to-primary/10 blur-3xl" />
          <div className="relative rounded-2xl border border-border bg-card/60 backdrop-blur-md p-10">
            <div className="grid md:grid-cols-2 gap-8">
              {/* Traditional */}
              <div className="text-center">
                <h3 className="text-lg font-bold mb-4 text-destructive">Traditional AI</h3>
                <div className="flex items-center justify-center gap-3 text-sm font-mono">
                  <span className="text-muted-foreground">Request</span>
                  <ArrowRight className="w-4 h-4 text-destructive" />
                  <span className="text-muted-foreground">Execute</span>
                  <ArrowRight className="w-4 h-4 text-destructive" />
                  <span className="text-destructive">Hope</span>
                </div>
              </div>

              {/* Mishti */}
              <div className="text-center">
                <h3 className="text-lg font-bold mb-4 text-primary">Mishti AI</h3>
                <div className="flex items-center justify-center gap-2 text-xs font-mono flex-wrap">
                  <span className="text-muted-foreground">Request</span>
                  <ArrowRight className="w-3 h-3 text-primary" />
                  <span className="text-muted-foreground">Validate</span>
                  <ArrowRight className="w-3 h-3 text-primary" />
                  <span className="text-muted-foreground">Govern</span>
                  <ArrowRight className="w-3 h-3 text-primary" />
                  <span className="text-muted-foreground">Execute</span>
                  <ArrowRight className="w-3 h-3 text-primary" />
                  <span className="text-muted-foreground">Review</span>
                  <ArrowRight className="w-3 h-3 text-primary" />
                  <span className="text-primary">Recover</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
