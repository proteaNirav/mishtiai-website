import { Eye, FileText, RotateCcw, Shield } from "lucide-react";

export function SystemGuarantees() {
  const guarantees = [
    {
      icon: Eye,
      title: "No Hidden Execution",
      description: "Every action visible and traceable"
    },
    {
      icon: FileText,
      title: "Append-Only Audit Trail",
      description: "Immutable record of all decisions"
    },
    {
      icon: RotateCcw,
      title: "Deterministic Recovery Paths",
      description: "Guaranteed state restoration capability"
    },
    {
      icon: Shield,
      title: "Governance Required for All Actions",
      description: "Zero autonomous execution without approval"
    }
  ];

  return (
    <section className="relative py-20 px-6 border-y border-primary/20 bg-gradient-to-b from-primary/5 via-transparent to-primary/5">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-4 gap-6">
          {guarantees.map((guarantee, i) => {
            const Icon = guarantee.icon;
            return (
              <div
                key={i}
                className="group relative rounded-xl border border-primary/30 bg-card/60 backdrop-blur-md p-6 hover:border-primary/50 transition-all hover:shadow-[0_0_30px_rgba(0,212,255,0.2)]"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent rounded-xl opacity-0 group-hover:opacity-100 transition-opacity" />

                <div className="relative">
                  <div className="w-12 h-12 rounded-lg bg-primary/10 border border-primary/30 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                    <Icon className="w-6 h-6 text-primary" />
                  </div>

                  <h3 className="text-lg font-bold mb-2 leading-tight">{guarantee.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {guarantee.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
