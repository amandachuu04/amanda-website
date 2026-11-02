import { useEffect, useRef } from "react";

interface Flower {
  x: number;
  y: number;
  size: number;
  angle: number;
  spin: number;
  vx: number;
  vy: number;
  born: number;
  lifetime: number;
  petal: string;
}

const PETALS = ["#F8C8C8", "#EFAEAE", "#E08F8F"];
const CENTER = "#FFFDF9";
const SPAWN_GAP = 55; // ms between flowers

function drawFlower(ctx: CanvasRenderingContext2D, f: Flower, scale: number) {
  const r = (f.size / 2) * scale;
  ctx.save();
  ctx.translate(f.x, f.y);
  ctx.rotate(f.angle);
  ctx.fillStyle = f.petal;
  for (let i = 0; i < 5; i++) {
    ctx.rotate((Math.PI * 2) / 5);
    ctx.beginPath();
    ctx.ellipse(0, -r * 0.58, r * 0.38, r * 0.5, 0, 0, Math.PI * 2);
    ctx.fill();
  }
  ctx.fillStyle = CENTER;
  ctx.beginPath();
  ctx.arc(0, 0, r * 0.26, 0, Math.PI * 2);
  ctx.fill();
  ctx.restore();
}

export default function FlowerCursor() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const flowersRef = useRef<Flower[]>([]);
  const rafRef = useRef<number>(0);
  const lastSpawnRef = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current!;
    const ctx = canvas.getContext("2d")!;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const resize = () => {
      const dpr = window.devicePixelRatio || 1;
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    window.addEventListener("resize", resize);

    const onMouseMove = (e: MouseEvent) => {
      const now = performance.now();
      if (reduced || now - lastSpawnRef.current < SPAWN_GAP) return;
      lastSpawnRef.current = now;

      flowersRef.current.push({
        x: e.clientX,
        y: e.clientY,
        size: 14 + Math.random() * 12,
        angle: Math.random() * Math.PI * 2,
        spin: (Math.random() - 0.5) * 0.05,
        vx: (Math.random() - 0.5) * 0.6,
        vy: 0.4 + Math.random() * 0.7,
        born: now,
        lifetime: 1000 + Math.random() * 700,
        petal: PETALS[Math.floor(Math.random() * PETALS.length)],
      });
    };
    window.addEventListener("mousemove", onMouseMove);

    const draw = (now: number) => {
      ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);

      flowersRef.current = flowersRef.current.filter((f) => {
        const age = Math.max(0, now - f.born); // a frame can start just before the flower spawned
        if (age > f.lifetime) return false;

        const progress = age / f.lifetime;
        f.x += f.vx;
        f.y += f.vy;
        f.angle += f.spin;

        ctx.globalAlpha = 1 - progress * progress;
        // blooms open quickly, then drifts down and fades
        drawFlower(ctx, f, Math.min(1, age / 160));
        return true;
      });
      ctx.globalAlpha = 1;

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
      className="pointer-events-none fixed inset-0 z-50 h-full w-full"
      aria-hidden="true"
    />
  );
}
