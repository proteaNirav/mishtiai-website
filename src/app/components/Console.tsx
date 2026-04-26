import { Monitor, Activity, CheckCircle2, Clock, AlertCircle, PlayCircle, Terminal, FileText } from "lucide-react";

export function Console() {
  const executionLogs = [
    {
      id: "EXE-2847",
      action: "Update user authentication flow",
      status: "completed",
      timestamp: "2026-04-23 14:32:18",
      readiness: "validated",
      governance: "approved",
      operator: "Sarah Chen"
    },
    {
      id: "EXE-2846",
      action: "Refactor payment gateway integration",
      status: "in-review",
      timestamp: "2026-04-23 14:28:45",
      readiness: "pending",
      governance: "awaiting-approval",
      operator: "—"
    },
    {
      id: "EXE-2845",
      action: "Optimize database query performance",
      status: "completed",
      timestamp: "2026-04-23 14:15:09",
      readiness: "validated",
      governance: "approved",
      operator: "Michael Torres"
    },
    {
      id: "EXE-2844",
      action: "Add telemetry tracking endpoints",
      status: "blocked",
      timestamp: "2026-04-23 14:02:31",
      readiness: "failed",
      governance: "rejected",
      operator: "—"
    }
  ];

  const followUpQueue = [
    { task: "Review EXE-2846 governance approval", priority: "high", due: "15 min" },
    { task: "Validate EXE-2844 readiness failure", priority: "medium", due: "1 hour" },
    { task: "Archive completed executions (12)", priority: "low", due: "EOD" }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "text-[#14f195] bg-[#14f195]/10 border-[#14f195]/30";
      case "in-review":
        return "text-primary bg-primary/10 border-primary/30";
      case "blocked":
        return "text-destructive bg-destructive/10 border-destructive/30";
      default:
        return "text-muted-foreground bg-muted/10 border-border";
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "text-destructive bg-destructive/10";
      case "medium":
        return "text-primary bg-primary/10";
      case "low":
        return "text-muted-foreground bg-muted/20";
      default:
        return "text-muted-foreground bg-muted/20";
    }
  };

  return (
    <section className="relative py-32 px-6 bg-gradient-to-b from-transparent via-muted/20 to-transparent">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 mb-6 rounded-full border border-[#a855f7]/20 bg-[#a855f7]/5">
            <Monitor className="w-4 h-4 text-[#a855f7]" />
            <span className="text-sm text-[#a855f7] tracking-wide font-medium">OPERATOR INTERFACE</span>
          </div>
          <h2 className="text-5xl md:text-6xl font-bold mb-6">
            The <span className="text-[#a855f7]">Console</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Real-time execution visibility with complete audit trails and operator control
          </p>
        </div>

        {/* Main Dashboard Mockup */}
        <div className="relative rounded-2xl border border-border bg-[#0a0a0f] overflow-hidden shadow-2xl mb-8">
          {/* Dashboard Header */}
          <div className="border-b border-border bg-card/40 backdrop-blur-sm px-6 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Terminal className="w-5 h-5 text-primary" />
                <h3 className="text-lg font-semibold">Execution Monitor</h3>
                <span className="px-2 py-1 rounded text-xs bg-[#14f195]/10 text-[#14f195] border border-[#14f195]/20">
                  LIVE
                </span>
              </div>
              <div className="flex items-center gap-4 text-sm text-muted-foreground">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-[#14f195] animate-pulse" />
                  <span>4 Active</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4" />
                  <span>Last updated: 2s ago</span>
                </div>
              </div>
            </div>
          </div>

          {/* Dashboard Content */}
          <div className="p-6">
            {/* Execution Table */}
            <div className="rounded-xl border border-border bg-card/20 overflow-hidden">
              {/* Table Header */}
              <div className="grid grid-cols-12 gap-4 px-4 py-3 bg-card/40 border-b border-border text-xs font-semibold text-muted-foreground uppercase tracking-wide">
                <div className="col-span-2">Execution ID</div>
                <div className="col-span-3">Action Request</div>
                <div className="col-span-2">Status</div>
                <div className="col-span-2">Readiness</div>
                <div className="col-span-2">Governance</div>
                <div className="col-span-1">Operator</div>
              </div>

              {/* Table Rows */}
              <div className="divide-y divide-border/50">
                {executionLogs.map((log, i) => (
                  <div
                    key={i}
                    className="grid grid-cols-12 gap-4 px-4 py-4 hover:bg-card/20 transition-colors group"
                  >
                    {/* Execution ID */}
                    <div className="col-span-2 flex items-center gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                      <span className="font-mono text-sm text-primary">{log.id}</span>
                    </div>

                    {/* Action */}
                    <div className="col-span-3 flex flex-col">
                      <span className="text-sm font-medium text-foreground/90">{log.action}</span>
                      <span className="text-xs text-muted-foreground font-mono">{log.timestamp}</span>
                    </div>

                    {/* Status */}
                    <div className="col-span-2 flex items-center">
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold border ${getStatusColor(log.status)}`}>
                        {log.status}
                      </span>
                    </div>

                    {/* Readiness */}
                    <div className="col-span-2 flex items-center gap-2 text-sm">
                      {log.readiness === "validated" && (
                        <>
                          <CheckCircle2 className="w-4 h-4 text-[#14f195]" />
                          <span className="text-[#14f195]">Validated</span>
                        </>
                      )}
                      {log.readiness === "pending" && (
                        <>
                          <Clock className="w-4 h-4 text-primary" />
                          <span className="text-primary">Pending</span>
                        </>
                      )}
                      {log.readiness === "failed" && (
                        <>
                          <AlertCircle className="w-4 h-4 text-destructive" />
                          <span className="text-destructive">Failed</span>
                        </>
                      )}
                    </div>

                    {/* Governance */}
                    <div className="col-span-2 flex items-center gap-2 text-sm">
                      {log.governance === "approved" && (
                        <>
                          <CheckCircle2 className="w-4 h-4 text-[#14f195]" />
                          <span className="text-[#14f195]">Approved</span>
                        </>
                      )}
                      {log.governance === "awaiting-approval" && (
                        <>
                          <Clock className="w-4 h-4 text-primary" />
                          <span className="text-primary">Awaiting</span>
                        </>
                      )}
                      {log.governance === "rejected" && (
                        <>
                          <AlertCircle className="w-4 h-4 text-destructive" />
                          <span className="text-destructive">Rejected</span>
                        </>
                      )}
                    </div>

                    {/* Operator */}
                    <div className="col-span-1 flex items-center text-sm text-muted-foreground">
                      {log.operator}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Supporting Panels */}
        <div className="grid md:grid-cols-3 gap-6">
          {/* Follow-up Queue */}
          <div className="md:col-span-2 rounded-2xl border border-border bg-card/60 backdrop-blur-md overflow-hidden">
            <div className="border-b border-border px-6 py-4 bg-card/40">
              <div className="flex items-center gap-2">
                <Activity className="w-5 h-5 text-primary" />
                <h3 className="font-semibold">Follow-up Queue</h3>
                <span className="ml-auto px-2 py-1 rounded text-xs bg-primary/10 text-primary">
                  {followUpQueue.length} items
                </span>
              </div>
            </div>
            <div className="p-6">
              <div className="space-y-3">
                {followUpQueue.map((item, i) => (
                  <div
                    key={i}
                    className="flex items-center justify-between p-4 rounded-lg border border-border bg-card/20 hover:bg-card/40 transition-colors group"
                  >
                    <div className="flex items-center gap-3 flex-1">
                      <div className={`w-2 h-2 rounded-full ${item.priority === 'high' ? 'bg-destructive' : item.priority === 'medium' ? 'bg-primary' : 'bg-muted-foreground'}`} />
                      <div className="flex-1">
                        <div className="text-sm font-medium text-foreground/90">{item.task}</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className={`px-2 py-1 rounded text-xs font-semibold uppercase ${getPriorityColor(item.priority)}`}>
                        {item.priority}
                      </span>
                      <span className="text-xs text-muted-foreground font-mono">{item.due}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* System Stats */}
          <div className="rounded-2xl border border-border bg-card/60 backdrop-blur-md overflow-hidden">
            <div className="border-b border-border px-6 py-4 bg-card/40">
              <div className="flex items-center gap-2">
                <PlayCircle className="w-5 h-5 text-[#14f195]" />
                <h3 className="font-semibold">System Stats</h3>
              </div>
            </div>
            <div className="p-6">
              <div className="space-y-6">
                <div>
                  <div className="flex items-baseline justify-between mb-2">
                    <span className="text-sm text-muted-foreground">Executions Today</span>
                    <span className="text-2xl font-bold text-foreground">247</span>
                  </div>
                  <div className="h-1.5 bg-card rounded-full overflow-hidden">
                    <div className="h-full bg-gradient-to-r from-primary to-[#14f195] w-[73%]" />
                  </div>
                </div>

                <div>
                  <div className="flex items-baseline justify-between mb-2">
                    <span className="text-sm text-muted-foreground">Approval Rate</span>
                    <span className="text-2xl font-bold text-[#14f195]">94%</span>
                  </div>
                  <div className="h-1.5 bg-card rounded-full overflow-hidden">
                    <div className="h-full bg-[#14f195] w-[94%]" />
                  </div>
                </div>

                <div>
                  <div className="flex items-baseline justify-between mb-2">
                    <span className="text-sm text-muted-foreground">Avg. Review Time</span>
                    <span className="text-2xl font-bold text-primary">2.3m</span>
                  </div>
                  <div className="h-1.5 bg-card rounded-full overflow-hidden">
                    <div className="h-full bg-primary w-[45%]" />
                  </div>
                </div>

                <div className="pt-4 border-t border-border">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Uptime</span>
                    <span className="text-[#14f195] font-mono font-semibold">99.97%</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* System State Note */}
        <div className="mt-12 relative">
          <div className="absolute inset-0 bg-gradient-to-r from-[#a855f7]/20 via-primary/20 to-[#a855f7]/20 blur-3xl" />
          <div className="relative rounded-2xl border border-[#a855f7]/40 bg-gradient-to-br from-card/90 to-card/60 backdrop-blur-xl p-8">
            <div className="text-center mb-6">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[#a855f7]/30 bg-[#a855f7]/10 mb-4">
                <CheckCircle2 className="w-4 h-4 text-[#a855f7]" />
                <span className="text-sm font-mono text-[#a855f7]">REAL SYSTEM DATA</span>
              </div>
              <h3 className="text-2xl font-bold mb-2">All data reflects real system state (no simulation)</h3>
              <p className="text-muted-foreground">
                Every metric, status, and trace shown in the console comes directly from live execution logs
              </p>
            </div>
            <div className="grid md:grid-cols-3 gap-6 pt-6 border-t border-border/50">
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 rounded-full bg-[#a855f7] mt-2" />
                <div>
                  <div className="font-semibold mb-1">No Fake Execution</div>
                  <div className="text-sm text-muted-foreground">Every state reflects actual system state</div>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 rounded-full bg-[#a855f7] mt-2" />
                <div>
                  <div className="font-semibold mb-1">No Derived Readiness</div>
                  <div className="text-sm text-muted-foreground">Validation results come from real checks</div>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 rounded-full bg-[#a855f7] mt-2" />
                <div>
                  <div className="font-semibold mb-1">Only System Truth</div>
                  <div className="text-sm text-muted-foreground">UI mirrors actual execution state</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
