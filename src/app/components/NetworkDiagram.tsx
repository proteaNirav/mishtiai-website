import React, { useEffect, useRef } from "react";

export function NetworkDiagram() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Set canvas size
    const updateSize = () => {
      const rect = canvas.getBoundingClientRect();
      canvas.width = rect.width * window.devicePixelRatio;
      canvas.height = rect.height * window.devicePixelRatio;
      ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
    };
    updateSize();
    window.addEventListener("resize", updateSize);

    // Node class
    class Node {
      x: number;
      y: number;
      vx: number;
      vy: number;
      radius: number;
      type: "core" | "secondary" | "tertiary";
      pulsePhase: number;

      constructor(x: number, y: number, type: "core" | "secondary" | "tertiary") {
        this.x = x;
        this.y = y;
        this.vx = (Math.random() - 0.5) * 0.2;
        this.vy = (Math.random() - 0.5) * 0.2;
        this.type = type;
        this.pulsePhase = Math.random() * Math.PI * 2;

        if (type === "core") {
          this.radius = 8;
        } else if (type === "secondary") {
          this.radius = 5;
        } else {
          this.radius = 3;
        }
      }

      update(width: number, height: number) {
        this.x += this.vx;
        this.y += this.vy;

        // Bounce off edges
        if (this.x < 0 || this.x > width) this.vx *= -1;
        if (this.y < 0 || this.y > height) this.vy *= -1;

        // Keep within bounds
        this.x = Math.max(0, Math.min(width, this.x));
        this.y = Math.max(0, Math.min(height, this.y));
      }

      draw(ctx: CanvasRenderingContext2D, time: number) {
        const pulse = Math.sin(time * 0.002 + this.pulsePhase) * 0.3 + 0.7;

        // Glow
        const gradient = ctx.createRadialGradient(this.x, this.y, 0, this.x, this.y, this.radius * 3);

        if (this.type === "core") {
          gradient.addColorStop(0, `rgba(0, 212, 255, ${0.6 * pulse})`);
          gradient.addColorStop(0.5, `rgba(0, 212, 255, ${0.2 * pulse})`);
          gradient.addColorStop(1, "rgba(0, 212, 255, 0)");
        } else if (this.type === "secondary") {
          gradient.addColorStop(0, `rgba(20, 241, 149, ${0.5 * pulse})`);
          gradient.addColorStop(0.5, `rgba(20, 241, 149, ${0.15 * pulse})`);
          gradient.addColorStop(1, "rgba(20, 241, 149, 0)");
        } else {
          gradient.addColorStop(0, `rgba(168, 85, 247, ${0.4 * pulse})`);
          gradient.addColorStop(0.5, `rgba(168, 85, 247, ${0.1 * pulse})`);
          gradient.addColorStop(1, "rgba(168, 85, 247, 0)");
        }

        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius * 3, 0, Math.PI * 2);
        ctx.fill();

        // Core
        ctx.fillStyle = this.type === "core"
          ? `rgba(0, 212, 255, ${pulse})`
          : this.type === "secondary"
          ? `rgba(20, 241, 149, ${pulse})`
          : `rgba(168, 85, 247, ${pulse})`;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fill();

        // Ring for core nodes
        if (this.type === "core") {
          ctx.strokeStyle = `rgba(0, 212, 255, ${0.5 * pulse})`;
          ctx.lineWidth = 2;
          ctx.beginPath();
          ctx.arc(this.x, this.y, this.radius + 4, 0, Math.PI * 2);
          ctx.stroke();
        }
      }
    }

    // Create nodes
    const rect = canvas.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;

    const nodes: Node[] = [];

    // Core nodes (central governance layer)
    for (let i = 0; i < 3; i++) {
      nodes.push(new Node(
        width * 0.3 + Math.random() * width * 0.4,
        height * 0.3 + Math.random() * height * 0.4,
        "core"
      ));
    }

    // Secondary nodes (intelligence layer)
    for (let i = 0; i < 8; i++) {
      nodes.push(new Node(
        Math.random() * width,
        Math.random() * height,
        "secondary"
      ));
    }

    // Tertiary nodes (execution points)
    for (let i = 0; i < 12; i++) {
      nodes.push(new Node(
        Math.random() * width,
        Math.random() * height,
        "tertiary"
      ));
    }

    // Animation loop
    let animationId: number;
    const animate = (time: number) => {
      ctx.clearRect(0, 0, width, height);

      // Draw connections
      ctx.lineWidth = 1;
      nodes.forEach((node, i) => {
        nodes.slice(i + 1).forEach((otherNode) => {
          const dx = otherNode.x - node.x;
          const dy = otherNode.y - node.y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          const maxDistance = 200;

          if (distance < maxDistance) {
            const opacity = (1 - distance / maxDistance) * 0.3;

            // Color based on node types
            if (node.type === "core" || otherNode.type === "core") {
              ctx.strokeStyle = `rgba(0, 212, 255, ${opacity})`;
            } else if (node.type === "secondary" || otherNode.type === "secondary") {
              ctx.strokeStyle = `rgba(20, 241, 149, ${opacity})`;
            } else {
              ctx.strokeStyle = `rgba(168, 85, 247, ${opacity})`;
            }

            ctx.beginPath();
            ctx.moveTo(node.x, node.y);
            ctx.lineTo(otherNode.x, otherNode.y);
            ctx.stroke();

            // Data flow particles on strong connections
            if (distance < 150 && Math.random() > 0.98) {
              const progress = (time * 0.001) % 1;
              const px = node.x + dx * progress;
              const py = node.y + dy * progress;

              ctx.fillStyle = node.type === "core" ? "rgba(0, 212, 255, 0.8)" : "rgba(20, 241, 149, 0.8)";
              ctx.beginPath();
              ctx.arc(px, py, 2, 0, Math.PI * 2);
              ctx.fill();
            }
          }
        });
      });

      // Update and draw nodes
      nodes.forEach((node) => {
        node.update(width, height);
        node.draw(ctx, time);
      });

      animationId = requestAnimationFrame(animate);
    };

    animate(0);

    return () => {
      window.removeEventListener("resize", updateSize);
      cancelAnimationFrame(animationId);
    };
  }, []);

  return (
    <div className="relative w-full aspect-square max-w-2xl mx-auto">
      {/* Glass container */}
      <div className="absolute inset-0 rounded-2xl border border-primary/10 bg-gradient-to-br from-card/40 to-card/20 backdrop-blur-sm overflow-hidden">
        <canvas
          ref={canvasRef}
          className="w-full h-full"
          style={{ width: "100%", height: "100%" }}
        />
      </div>

      {/* Corner labels */}
      <div className="absolute top-4 left-4 px-3 py-1.5 rounded-md bg-primary/10 border border-primary/20 backdrop-blur-sm">
        <span className="text-xs font-mono text-primary">GOVERNANCE LAYER</span>
      </div>
      <div className="absolute bottom-4 right-4 px-3 py-1.5 rounded-md bg-[#14f195]/10 border border-[#14f195]/20 backdrop-blur-sm">
        <span className="text-xs font-mono text-[#14f195]">INTELLIGENCE MESH</span>
      </div>
    </div>
  );
}
