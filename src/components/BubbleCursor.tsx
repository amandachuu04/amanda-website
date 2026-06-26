import { useEffect, useRef } from "react";

interface Bubble {
  id: number;
  x: number;
  y: number;
  size: number;
  opacity: number;
  vx: number;
  vy: number;
  born: number;
  lifetime: number;
  hueOffset: number;
}

export default function BubbleCursor() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const bubblesRef = useRef<Bubble[]>([]);
  const idRef = useRef(0);
  const rafRef = useRef<number>(0);
  const lastSpawnRef = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current!;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    const onMouseMove = (e: MouseEvent) => {
      const now = performance.now();
      if (now - lastSpawnRef.current < 35) return;
      lastSpawnRef.current = now;

      const size = 14 + Math.random() * 22;
      bubblesRef.current.push({
        id: idRef.current++,
        x: e.clientX,
        y: e.clientY,
        size,
        opacity: 0.85 + Math.random() * 0.15,
        vx: (Math.random() - 0.5) * 0.7,
        vy: -(0.5 + Math.random() * 0.8),
        born: now,
        lifetime: 1000 + Math.random() * 700,
        hueOffset: Math.random() * 360,
      });
    };
    window.addEventListener("mousemove", onMouseMove);

    const draw = (now: number) => {
      const ctx = canvas.getContext("2d")!;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      bubblesRef.current = bubblesRef.current.filter((b) => {
        const age = now - b.born;
        if (age > b.lifetime) return false;

        const progress = age / b.lifetime;
        const alpha = b.opacity * (1 - progress);

        b.x += b.vx;
        b.y += b.vy;
        b.vy *= 0.996;

        const r = b.size / 2;
        // hue slowly shifts over lifetime for an oil-slick shimmer
        const hue = (b.hueOffset + now * 0.03) % 360;

        ctx.save();
        ctx.globalAlpha = alpha;

        // --- clip everything to the circle ---
        ctx.beginPath();
        ctx.arc(b.x, b.y, r, 0, Math.PI * 2);
        ctx.clip();

        // 1. near-transparent interior — just a very faint white centre
        const interior = ctx.createRadialGradient(b.x, b.y, 0, b.x, b.y, r);
        interior.addColorStop(0,   "rgba(255,255,255,0.04)");
        interior.addColorStop(0.6, "rgba(255,255,255,0.02)");
        interior.addColorStop(1,   "rgba(255,255,255,0.0)");
        ctx.fillStyle = interior;
        ctx.fillRect(b.x - r, b.y - r, b.size, b.size);

        // 2. iridescent edge band — radial from outside inward, vivid colours
        const edgeBand = ctx.createRadialGradient(b.x, b.y, r * 0.62, b.x, b.y, r);
        edgeBand.addColorStop(0,    "rgba(255,255,255,0)");
        edgeBand.addColorStop(0.55, `hsla(${hue + 200}, 90%, 70%, 0.18)`);
        edgeBand.addColorStop(0.75, `hsla(${hue + 280}, 95%, 72%, 0.38)`);
        edgeBand.addColorStop(0.88, `hsla(${hue},       100%, 68%, 0.55)`);
        edgeBand.addColorStop(0.95, `hsla(${hue + 40},  100%, 75%, 0.7)`);
        edgeBand.addColorStop(1,    `hsla(${hue + 160}, 90%, 80%, 0.5)`);
        ctx.fillStyle = edgeBand;
        ctx.fillRect(b.x - r, b.y - r, b.size, b.size);

        // 3. colour sweep across the sphere (teal left, pink/magenta right)
        const sweep = ctx.createLinearGradient(b.x - r, b.y, b.x + r, b.y);
        sweep.addColorStop(0,    `hsla(${hue + 170}, 100%, 65%, 0.22)`);
        sweep.addColorStop(0.35, `hsla(${hue + 190}, 95%,  70%, 0.10)`);
        sweep.addColorStop(0.65, `hsla(${hue + 300}, 95%,  70%, 0.10)`);
        sweep.addColorStop(1,    `hsla(${hue + 320}, 100%, 68%, 0.22)`);
        ctx.fillStyle = sweep;
        ctx.fillRect(b.x - r, b.y - r, b.size, b.size);

        // 4. warm gold/orange accent at bottom (like the reference)
        const bottom = ctx.createRadialGradient(
          b.x, b.y + r * 0.7, 0,
          b.x, b.y + r * 0.7, r * 0.55
        );
        bottom.addColorStop(0,   `hsla(${hue + 40}, 100%, 68%, 0.28)`);
        bottom.addColorStop(1,   "rgba(255,255,255,0)");
        ctx.fillStyle = bottom;
        ctx.fillRect(b.x - r, b.y - r, b.size, b.size);

        // 5. large soft highlight — upper centre (white glow)
        const hiTop = ctx.createRadialGradient(
          b.x - r * 0.1, b.y - r * 0.45, r * 0.01,
          b.x - r * 0.1, b.y - r * 0.2,  r * 0.6
        );
        hiTop.addColorStop(0,   "rgba(255,255,255,0.75)");
        hiTop.addColorStop(0.3, "rgba(255,255,255,0.25)");
        hiTop.addColorStop(1,   "rgba(255,255,255,0)");
        ctx.fillStyle = hiTop;
        ctx.fillRect(b.x - r, b.y - r, b.size, b.size);

        // 6. sharp specular dot — top centre
        const dot1 = ctx.createRadialGradient(
          b.x + r * 0.05, b.y - r * 0.62, 0,
          b.x + r * 0.05, b.y - r * 0.62, r * 0.18
        );
        dot1.addColorStop(0,   "rgba(255,255,255,0.95)");
        dot1.addColorStop(0.5, "rgba(255,255,255,0.4)");
        dot1.addColorStop(1,   "rgba(255,255,255,0)");
        ctx.fillStyle = dot1;
        ctx.fillRect(b.x - r, b.y - r, b.size, b.size);

        // 7. small secondary specular — lower centre (blue-white)
        const dot2 = ctx.createRadialGradient(
          b.x, b.y + r * 0.58, 0,
          b.x, b.y + r * 0.58, r * 0.14
        );
        dot2.addColorStop(0,   "rgba(200,230,255,0.9)");
        dot2.addColorStop(0.5, "rgba(180,210,255,0.3)");
        dot2.addColorStop(1,   "rgba(255,255,255,0)");
        ctx.fillStyle = dot2;
        ctx.fillRect(b.x - r, b.y - r, b.size, b.size);

        ctx.restore();

        // 8. outer rim stroke (drawn outside clip so the edge is crisp)
        ctx.save();
        ctx.globalAlpha = alpha * 0.6;
        ctx.beginPath();
        ctx.arc(b.x, b.y, r, 0, Math.PI * 2);
        const rimStroke = ctx.createLinearGradient(b.x - r, b.y - r, b.x + r, b.y + r);
        rimStroke.addColorStop(0,    `hsla(${hue + 170}, 90%, 80%, 0.9)`);
        rimStroke.addColorStop(0.5,  `hsla(${hue + 300}, 90%, 82%, 0.9)`);
        rimStroke.addColorStop(1,    `hsla(${hue + 40},  90%, 78%, 0.9)`);
        ctx.strokeStyle = rimStroke;
        ctx.lineWidth = Math.max(1, r * 0.07);
        ctx.stroke();
        ctx.restore();

        return true;
      });

      rafRef.current = requestAnimationFrame(draw);
    };

    rafRef.current = requestAnimationFrame(draw);

    return () => {
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", onMouseMove);
      cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none fixed inset-0 z-50"
      aria-hidden="true"
    />
  );
}
