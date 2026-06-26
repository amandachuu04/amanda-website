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
        opacity: 0.55 + Math.random() * 0.3,
        vx: (Math.random() - 0.5) * 0.8,
        vy: -(0.4 + Math.random() * 0.7),
        born: now,
        lifetime: 900 + Math.random() * 600,
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
        ctx.beginPath();
        ctx.arc(b.x, b.y, b.size / 2, 0, Math.PI * 2);

        // fill
        ctx.fillStyle = "rgba(255, 255, 255, 0.18)";
        ctx.fill();

        // rim highlight
        const grad = ctx.createRadialGradient(
          b.x - b.size * 0.15,
          b.y - b.size * 0.15,
          b.size * 0.05,
          b.x,
          b.y,
          b.size / 2
        );
        grad.addColorStop(0, "rgba(255,255,255,0.55)");
        grad.addColorStop(1, "rgba(255,255,255,0)");
        ctx.fillStyle = grad;
        ctx.fill();

        // border
        ctx.strokeStyle = "rgba(255, 255, 255, 0.5)";
        ctx.lineWidth = 1;
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
