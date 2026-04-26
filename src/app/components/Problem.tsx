import { AlertTriangle, XCircle, TrendingDown } from "lucide-react";

export function Problem() {
  const systemFailures = [
    {
      metric: "Traceability",
      traditional: "0%",
      impact: "Complete opacity in decision paths",
      severity: "critical"
    },
    {
      metric: "Validation",
      traditional: "None",
      impact: "Unverified outputs before execution",
      severity: "critical"
    },
    {
      metric: "Recovery",
      traditional: "Non-deterministic",
      impact: "Cannot guarantee state restoration",
      severity: "high"
    },
    {
      metric: "Governance",
      traditional: "Absent",
      impact: "Zero operator control or oversight",
      severity: "critical"
    }
  ];

  const getSeverityColor = (severity: string) => {
    if (severity === "critical") return "text-destructive";
    if (severity === "high") return "text-[#ff8c42]";
    return "text-[#fbbf24]";
  };

  return (
    <section className="relative py-32 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 mb-6 rounded-lg border border-destructive/20 bg-destructive/5">
            <AlertTriangle className="w-4 h-4 text-destructive" />
            <span className="text-sm text-destructive tracking-wide font-mono">SYSTEM FAILURE ANALYSIS</span>
          </div>
          <h2 className="text-5xl md:text-6xl font-bold mb-6">
            Traditional AI <span className="text-destructive">System Failures</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Enterprise deployment blockers in current AI architectures
          </p>
        </div>

        {/* Failure Analysis Table */}
        <div className="rounded-2xl border border-destructive/30 bg-card/60 backdrop-blur-md overflow-hidden mb-12">
          {/* Table Header */}
          <div className="grid grid-cols-12 gap-4 px-6 py-4 bg-card/60 border-b border-destructive/20">
            <div className="col-span-3 text-xs font-mono uppercase tracking-wide text-muted-foreground">
              System Metric
            </div>
            <div className="col-span-2 text-xs font-mono uppercase tracking-wide text-muted-foreground">
              Traditional AI
            </div>
            <div className="col-span-5 text-xs font-mono uppercase tracking-wide text-muted-foreground">
              Enterprise Impact
            </div>
            <div className="col-span-2 text-xs font-mono uppercase tracking-wide text-muted-foreground">
              Severity
            </div>
          </div>

          {/* Table Rows */}
          <div className="divide-y divide-destructive/10">
            {systemFailures.map((failure, i) => (
              <div
                key={i}
                className="grid grid-cols-12 gap-4 px-6 py-5 hover:bg-destructive/5 transition-colors group"
              >
                <div className="col-span-3 flex items-center gap-3">
                  <XCircle className="w-4 h-4 text-destructive/70" />
                  <span className="font-semibold">{failure.metric}</span>
                </div>
                <div className="col-span-2 flex items-center">
                  <span className="font-mono text-sm text-destructive">{failure.traditional}</span>
                </div>
                <div className="col-span-5 flex items-center">
                  <span className="text-sm text-foreground/70">{failure.impact}</span>
                </div>
                <div className="col-span-2 flex items-center">
                  <span className={`px-3 py-1 rounded-full text-xs font-semibold uppercase border ${
                    failure.severity === 'critical'
                      ? 'bg-destructive/10 border-destructive/30 text-destructive'
                      : 'bg-[#ff8c42]/10 border-[#ff8c42]/30 text-[#ff8c42]'
                  }`}>
                    {failure.severity}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Impact Summary Cards */}
        <div className="grid md:grid-cols-3 gap-6">
          <div className="rounded-xl border border-destructive/30 bg-gradient-to-br from-destructive/10 to-transparent backdrop-blur-md p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-lg bg-destructive/20 border border-destructive/30 flex items-center justify-center">
                <TrendingDown className="w-5 h-5 text-destructive" />
              </div>
              <h3 className="text-lg font-bold">Unpredictable Execution</h3>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed">
              No guarantee of consistent behavior across identical inputs
            </p>
          </div>

          <div className="rounded-xl border border-destructive/30 bg-gradient-to-br from-destructive/10 to-transparent backdrop-blur-md p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-lg bg-destructive/20 border border-destructive/30 flex items-center justify-center">
                <XCircle className="w-5 h-5 text-destructive" />
              </div>
              <h3 className="text-lg font-bold">Audit Failures</h3>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Inability to reconstruct decision paths for compliance requirements
            </p>
          </div>

          <div className="rounded-xl border border-destructive/30 bg-gradient-to-br from-destructive/10 to-transparent backdrop-blur-md p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-lg bg-destructive/20 border border-destructive/30 flex items-center justify-center">
                <AlertTriangle className="w-5 h-5 text-destructive" />
              </div>
              <h3 className="text-lg font-bold">Unsafe Automation</h3>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Autonomous actions without validation or rollback mechanisms
            </p>
          </div>
        </div>

        {/* Bottom Statement */}
        <div className="mt-12 relative">
          <div className="absolute inset-0 bg-destructive/10 blur-2xl" />
          <div className="relative rounded-xl border border-destructive/30 bg-card/80 backdrop-blur-md p-6 text-center">
            <p className="text-lg font-mono">
              <span className="text-destructive font-bold">RESULT:</span>{" "}
              <span className="text-foreground/80">Enterprise AI remains theoretical, not operational</span>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
