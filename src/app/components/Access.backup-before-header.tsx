import { ArrowRight, Mail, Lock, Shield } from "lucide-react";

interface AccessProps {
  onRequestAccess?: () => void;
  onPartnerClick?: () => void;
}

export function Access({ onRequestAccess, onPartnerClick }: AccessProps) {
  return (
    <section className="relative py-32 px-6 overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-[#0a0a14] to-background" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,212,255,0.1)_0%,transparent_70%)]" />

      {/* Accent lines */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />

      <div className="relative max-w-5xl mx-auto text-center">
        {/* Status badge */}
        <div className="inline-flex items-center gap-2 px-4 py-2 mb-8 rounded-full border border-primary/20 bg-primary/5 backdrop-blur-sm">
          <Lock className="w-4 h-4 text-primary" />
          <span className="text-sm text-foreground/80 tracking-wide font-medium">
            LIMITED EARLY ACCESS FOR ENTERPRISE PARTNERS
          </span>
        </div>

        {/* Main statement */}
        <div className="mb-12">
          <h2 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-8 leading-tight">
            Mishti AI is a{" "}
            <span className="bg-gradient-to-r from-primary via-[#14f195] to-primary bg-clip-text text-transparent">
              governed intelligence infrastructure
            </span>.
          </h2>
        </div>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-12">
          <button
            onClick={onRequestAccess}
            className="group px-10 py-5 bg-primary text-primary-foreground rounded-lg font-semibold text-lg transition-all shadow-lg shadow-primary/25 hover:shadow-primary/50 hover:scale-105 flex items-center gap-3"
          >
            Request Early Access
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </button>
          <button
            onClick={onPartnerClick}
            className="px-10 py-5 bg-card/50 text-foreground rounded-lg font-semibold text-lg transition-all border border-border hover:border-primary/40 backdrop-blur-md hover:bg-card/80 flex items-center gap-3"
          >
            <Mail className="w-5 h-5" />
            Partner With Us
          </button>
        </div>

        {/* Trust Line */}
        <div className="inline-flex items-center gap-6 px-6 py-4 rounded-xl border border-primary/20 bg-card/40 backdrop-blur-md">
          <div className="flex items-center gap-2 text-sm">
            <Shield className="w-4 h-4 text-primary" />
            <span className="text-muted-foreground">No hidden execution</span>
          </div>
          <div className="w-px h-4 bg-border" />
          <div className="flex items-center gap-2 text-sm">
            <Shield className="w-4 h-4 text-primary" />
            <span className="text-muted-foreground">Full audit trail</span>
          </div>
          <div className="w-px h-4 bg-border" />
          <div className="flex items-center gap-2 text-sm">
            <Shield className="w-4 h-4 text-primary" />
            <span className="text-muted-foreground">Deterministic recovery</span>
          </div>
        </div>
      </div>
    </section>
  );
}
