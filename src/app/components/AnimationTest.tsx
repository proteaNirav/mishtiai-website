export function AnimationTest() {
  return (
    <div className="fixed bottom-4 right-4 z-50 p-4 bg-card border border-primary/40 rounded-lg backdrop-blur-md">
      <div className="flex items-center gap-3">
        <div className="w-3 h-3 rounded-full bg-primary animate-pulse" />
        <span className="text-sm font-mono text-primary">Animation Test: Pulse</span>
      </div>
      <div className="flex items-center gap-3 mt-2">
        <div className="w-3 h-3 rounded-full bg-[#14f195] animate-ping" />
        <span className="text-sm font-mono text-[#14f195]">Animation Test: Ping</span>
      </div>
      <div className="flex items-center gap-3 mt-2">
        <div className="w-3 h-3 rounded-full bg-[#a855f7] animate-spin" />
        <span className="text-sm font-mono text-[#a855f7]">Animation Test: Spin</span>
      </div>
    </div>
  );
}
