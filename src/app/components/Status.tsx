import { CheckCircle2, Package } from "lucide-react";

export function Status() {
  const completed = [
    "Architecture: Complete",
    "Core Layers: Implemented",
    "Console: Operational (internal)",
    "Repository: Clean & versioned"
  ];

  return (
    <section className="relative py-32 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-5xl md:text-6xl font-bold mb-16">
            Current <span className="text-primary">Status</span>
          </h2>
        </div>

        <div className="grid md:grid-cols-2 gap-6 mb-12">
          {completed.map((item, i) => (
            <div
              key={i}
              className="relative rounded-xl border border-border bg-card backdrop-blur-md p-6 hover:border-primary/40 transition-all group"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent rounded-xl opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="relative flex items-center gap-4">
                <CheckCircle2 className="w-6 h-6 text-primary flex-shrink-0" />
                <span className="text-lg font-medium">{item}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Release Badge */}
        <div className="relative">
          <div className="absolute inset-0 bg-gradient-to-r from-primary/20 via-[#14f195]/20 to-primary/20 blur-3xl" />
          <div className="relative rounded-2xl border border-primary/40 bg-gradient-to-br from-card/90 to-card/60 backdrop-blur-xl p-12 text-center shadow-[0_0_50px_rgba(0,212,255,0.25)]">
            <div className="inline-flex items-center gap-3 mb-4">
              <Package className="w-8 h-8 text-primary" />
              <h3 className="text-2xl font-bold">Release</h3>
            </div>
            <p className="text-4xl font-bold font-mono bg-gradient-to-r from-primary via-[#14f195] to-primary bg-clip-text text-transparent">
              mishti-foundations-v1
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
