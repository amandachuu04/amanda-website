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
  const mouseRef = useRef({ x: 0, y: 0 });
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
      mouseRef.current = { x: e.clientX, y: e.clientY };

      const now = performance.now();
      if (now - lastSpawnRef.current < 30) return;
      lastSpawnRef.current = now;

      const size = 8 + Math.random() * 18;
      bubblesRef.current.push({
        id: idRef.current++,
        x: e.clientX,
        y: e.clientY,
        size,
        opacity: 0.75 + Math.random() * 0.2,
        vx: (Math.random() - 0.5) * 0.8,
        vy: -(0.4 + Math.random() * 0.7),
        born: now,
        lifetime: 900 + Math.random() * 600,
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
        b.vy *= 0.995;

        ctx.save();
        ctx.globalAlpha = alpha;

        const r = b.size / 2;
        const hue = (b.hueOffset + now * 0.04) % 360;

        // --- iridescent rim via thick stroked arc ---
        ctx.beginPath();
        ctx.arc(b.x, b.y, r, 0, Math.PI * 2);

        // thin pastel rim gradient (pink → lavender → sky blue)
        const rimGrad = ctx.createLinearGradient(
          b.x - r, b.y - r, b.x + r, b.y + r
        );
        rimGrad.addColorStop(0,    `hsla(${hue},       60%, 85%, 0.9)`);
        rimGrad.addColorStop(0.33, `hsla(${hue + 60},  55%, 88%, 0.85)`);
        rimGrad.addColorStop(0.66, `hsla(${hue + 160}, 65%, 90%, 0.85)`);
        rimGrad.addColorStop(1,    `hsla(${hue + 240}, 60%, 85%, 0.9)`);
        ctx.strokeStyle = rimGrad;
        ctx.lineWidth = Math.max(1.5, r * 0.18);
        ctx.stroke();

        // --- very faint transparent interior fill ---
        const innerFill = ctx.createRadialGradient(
          b.x, b.y, 0,
          b.x, b.y, r
        );
        innerFill.addColorStop(0,   "rgba(255,255,255,0.0)");
        innerFill.addColorStop(0.7, `hsla(${hue + 180}, 60%, 95%, 0.04)`);
        innerFill.addColorStop(1,   `hsla(${hue},       60%, 90%, 0.08)`);
        ctx.fillStyle = innerFill;
        ctx.fill();

        // --- bright specular highlight (upper-left) ---
        const shine = ctx.createRadialGradient(
          b.x - r * 0.32, b.y - r * 0.38, r * 0.02,
          b.x - r * 0.2,  b.y - r * 0.2,  r * 0.55
        );
        shine.addColorStop(0,   "rgba(255,255,255,0.75)");
        shine.addColorStop(0.4, "rgba(255,255,255,0.15)");
        shine.addColorStop(1,   "rgba(255,255,255,0)");
        ctx.fillStyle = shine;
        ctx.fill();

        // --- small secondary highlight (lower-right) ---
        const shine2 = ctx.createRadialGradient(
          b.x + r * 0.35, b.y + r * 0.35, r * 0.01,
          b.x + r * 0.35, b.y + r * 0.35, r * 0.3
        );
        shine2.addColorStop(0,   "rgba(255,255,255,0.3)");
        shine2.addColorStop(1,   "rgba(255,255,255,0)");
        ctx.fillStyle = shine2;
        ctx.fill();

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
