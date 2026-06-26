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
        const hue = (b.hueOffset + now * 0.06) % 360;

        ctx.beginPath();
        ctx.arc(b.x, b.y, r, 0, Math.PI * 2);
        ctx.clip();

        // iridescent film layer — conic gradient rotated by time+hueOffset
        const conic = ctx.createConicGradient(
          (hue * Math.PI) / 180,
          b.x,
          b.y
        );
        conic.addColorStop(0,    `hsla(${hue},       100%, 75%, 0.55)`);
        conic.addColorStop(0.2,  `hsla(${hue + 60},  100%, 70%, 0.5)`);
        conic.addColorStop(0.4,  `hsla(${hue + 140}, 100%, 80%, 0.5)`);
        conic.addColorStop(0.6,  `hsla(${hue + 200}, 100%, 72%, 0.5)`);
        conic.addColorStop(0.8,  `hsla(${hue + 280}, 100%, 78%, 0.5)`);
        conic.addColorStop(1,    `hsla(${hue},       100%, 75%, 0.55)`);
        ctx.fillStyle = conic;
        ctx.fillRect(b.x - r, b.y - r, b.size, b.size);

        // glassy inner highlight
        const shine = ctx.createRadialGradient(
          b.x - r * 0.3, b.y - r * 0.35, r * 0.05,
          b.x, b.y, r
        );
        shine.addColorStop(0, "rgba(255,255,255,0.6)");
        shine.addColorStop(0.4, "rgba(255,255,255,0.08)");
        shine.addColorStop(1, "rgba(255,255,255,0)");
        ctx.fillStyle = shine;
        ctx.fillRect(b.x - r, b.y - r, b.size, b.size);

        ctx.restore();

        // border drawn outside the clip so it isn't swallowed
        ctx.save();
        ctx.globalAlpha = alpha;
        ctx.beginPath();
        ctx.arc(b.x, b.y, r, 0, Math.PI * 2);
        ctx.strokeStyle = `hsla(${hue + 90}, 100%, 85%, 0.7)`;
        ctx.lineWidth = 1.2;
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
