import { ArrowRight, Lock, Activity } from "lucide-react";
import { NetworkDiagram } from "./NetworkDiagram";

interface HeroProps {
  onRequestAccess?: () => void;
}

export function Hero({ onRequestAccess }: HeroProps) {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      {/* Background layers */}
      <div className="absolute inset-0 bg-gradient-to-br from-background via-[#0f0f1a] to-background" />
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(0,212,255,0.02)_1px,transparent_1px),linear-gradient(to_bottom,rgba(0,212,255,0.02)_1px,transparent_1px)] bg-[size:80px_80px]" />

      <div className="relative z-10 max-w-[1440px] mx-auto px-8 lg:px-16 py-32 w-full">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          {/* Left: Text Content */}
          <div className="space-y-8">
            {/* System Status Badge */}
            <div className="inline-flex items-center gap-3 px-4 py-2 rounded-lg border border-primary/20 bg-card/40 backdrop-blur-sm">
              <Activity className="w-4 h-4 text-primary" />
              <span className="text-sm text-foreground/80 font-mono">
                SYSTEM STATUS: OPERATIONAL
              </span>
              <div className="w-2 h-2 rounded-full bg-[#14f195] animate-pulse" />
            </div>

            {/* Main Headline */}
            <div className="space-y-6">
              <h1 className="text-6xl lg:text-7xl xl:text-8xl font-bold leading-[1.05] tracking-tight">
                <span className="block text-white">Governed</span>
                <span className="block text-white">Intelligence.</span>
                <span className="block bg-gradient-to-r from-primary via-[#14f195] to-primary bg-clip-text text-transparent">
                  Not Just AI.
                </span>
              </h1>

              <div className="w-16 h-1 bg-gradient-to-r from-primary to-transparent" />
            </div>

            {/* Supporting Line */}
            <p className="text-2xl lg:text-3xl font-semibold text-foreground/90">
              AI Infrastructure for Controlled Execution Systems
            </p>

            {/* Subtext */}
            <p className="text-xl text-foreground/70 leading-relaxed max-w-xl">
              Enterprise infrastructure ensuring every intelligent action is{" "}
              <span className="text-primary font-semibold">validated</span>,{" "}
              <span className="text-primary font-semibold">traceable</span>, and{" "}
              <span className="text-primary font-semibold">controlled</span>{" "}
              before execution.
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <button
                onClick={onRequestAccess}
                className="group px-8 py-4 bg-primary text-primary-foreground rounded-lg font-semibold transition-all shadow-lg shadow-primary/25 hover:shadow-primary/50 hover:scale-[1.02] flex items-center justify-center gap-3"
              >
                Request Early Access
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
              <button className="px-8 py-4 bg-card/50 text-foreground rounded-lg font-semibold transition-all border border-border hover:border-primary/40 backdrop-blur-md hover:bg-card/80 flex items-center justify-center gap-3">
                <Lock className="w-5 h-5" />
                View Architecture
              </button>
            </div>

            {/* System Info */}
            <div className="pt-6 flex items-center gap-6 text-sm font-mono">
              <div className="flex items-center gap-2 text-muted-foreground">
                <span className="text-primary">VERSION:</span>
                <span>foundations-v1</span>
              </div>
              <div className="w-px h-4 bg-border" />
              <div className="flex items-center gap-2 text-muted-foreground">
                <span className="text-primary">STATUS:</span>
                <span>Private Alpha</span>
              </div>
            </div>
          </div>

          {/* Right: Network Diagram */}
          <div className="relative">
            {/* Glow effect behind diagram */}
            <div className="absolute inset-0 bg-gradient-radial from-primary/20 via-primary/5 to-transparent blur-3xl scale-150" />

            {/* Network visualization */}
            <div className="relative">
              <NetworkDiagram />
            </div>
          </div>
        </div>
      </div>

      {/* Bottom gradient line */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
    </section>
  );
}
