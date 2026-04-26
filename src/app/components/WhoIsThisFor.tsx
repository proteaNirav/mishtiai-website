import { Building2, Users, ShieldCheck, Factory } from "lucide-react";

export function WhoIsThisFor() {
  const audiences = [
    {
      icon: Building2,
      title: "Enterprise IT Teams",
      description: "Infrastructure and platform engineering teams requiring governed AI systems"
    },
    {
      icon: Users,
      title: "Product Owners",
      description: "Product leaders building AI-powered features with audit requirements"
    },
    {
      icon: ShieldCheck,
      title: "Compliance-Driven Organizations",
      description: "Regulated industries requiring full traceability and governance"
    },
    {
      icon: Factory,
      title: "Manufacturing & Industrial IT",
      description: "Organizations deploying AI in production-critical environments"
    }
  ];

  return (
    <section className="relative py-32 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Built for <span className="text-primary">Enterprise Teams</span>
          </h2>
          <p className="text-xl text-muted-foreground">
            Mishti AI serves organizations that cannot compromise on control
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {audiences.map((audience, i) => {
            const Icon = audience.icon;
            return (
              <div
                key={i}
                className="rounded-xl border border-border bg-card/60 backdrop-blur-md p-6 hover:border-primary/40 transition-all hover:shadow-[0_0_25px_rgba(0,212,255,0.1)]"
              >
                <div className="w-12 h-12 rounded-lg bg-primary/10 border border-primary/30 flex items-center justify-center mb-4">
                  <Icon className="w-6 h-6 text-primary" />
                </div>

                <h3 className="text-lg font-bold mb-2">{audience.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {audience.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
