import { useEffect, useRef } from "react";
import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
} from "framer-motion";
import { site } from "../lib/site";

type Polaroid = {
  id: string;
  label: string;
  caption?: string;
  rot: number;
  /** percent of container */
  x: number;
  y: number;
  /** parallax intensity, 0 = static, 1 = max */
  depth: number;
  width: number;
  /** kind decides what fills the "photo" area */
  kind: "avatar" | "boba" | "image";
  /** for kind === "image" */
  image?: string;
};

const POLAROIDS: Polaroid[] = [
  {
    id: "me",
    label: "hi, that's me ☻",
    rot: -7,
    x: 2,
    y: 6,
    depth: 0.4,
    width: 200,
    kind: "avatar",
  },
  {
    id: "design",
    label: "design",
    rot: 6,
    x: 55,
    y: 2,
    depth: 0.9,
    width: 180,
    kind: "image",
    image: "/polaroid-design.jpg",
  },
  {
    id: "uxui",
    label: "implementation",
    rot: -9,
    x: 58,
    y: 50,
    depth: 0.55,
    width: 190,
    kind: "image",
    image: "/polaroid-uxui.png",
  },
  {
    id: "interests",
    label: "interests ♡",
    rot: 8,
    x: 6,
    y: 56,
    depth: 0.75,
    width: 200,
    kind: "image",
    image: "/polaroid-interests.png",
  },
];

/** Shrink width on narrow viewports while capping at the design width. */
function responsiveWidth(w: number): string {
  return `min(${w}px, calc(${Math.round(w * 0.45)}px + ${(w * 0.1).toFixed(1)}vw))`;
}

function PhotoFill({ kind, image }: { kind: Polaroid["kind"]; image?: string }) {
  if (kind === "avatar") {
    return (
      <img
        src={site.avatar}
        alt=""
        aria-hidden
        className="h-full w-full object-cover object-top"
      />
    );
  }
  if (kind === "image" && image) {
    return (
      <img
        src={image}
        alt=""
        aria-hidden
        className="h-full w-full object-cover"
      />
    );
  }
  // boba
  return (
    <div
      className="relative flex h-full w-full items-end justify-center pb-3"
      style={{
        background:
          "linear-gradient(180deg, #FDF3EA 0%, #FBDADA 60%, #F8C8C8 100%)",
      }}
    >
      <span className="text-6xl drop-shadow-sm">🧋</span>
      <span aria-hidden className="absolute left-3 top-3 text-xl text-taupe-300">
        ✦
      </span>
    </div>
  );
}

function Tape({ side }: { side: "left" | "right" }) {
  const rot = side === "left" ? -12 : 14;
  const pos = side === "left" ? "left-3" : "right-3";
  return (
    <span
      aria-hidden
      className={`absolute top-[-10px] ${pos} h-5 w-14 rounded-[2px]`}
      style={{
        background:
          "linear-gradient(180deg, rgba(252, 220, 220, 0.65), rgba(252, 220, 220, 0.45))",
        transform: `rotate(${rot}deg)`,
        boxShadow: "0 1px 2px rgba(139,111,92,0.15)",
      }}
    />
  );
}

export default function Polaroids() {
  const reduce = useReducedMotion();
  const containerRef = useRef<HTMLDivElement>(null);

  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const smx = useSpring(mx, { stiffness: 120, damping: 22, mass: 0.7 });
  const smy = useSpring(my, { stiffness: 120, damping: 22, mass: 0.7 });

  useEffect(() => {
    if (reduce) return;
    const el = containerRef.current;
    if (!el) return;
    const onMove = (e: PointerEvent) => {
      const rect = el.getBoundingClientRect();
      const nx = (e.clientX - rect.left) / rect.width - 0.5;
      const ny = (e.clientY - rect.top) / rect.height - 0.5;
      mx.set(nx);
      my.set(ny);
    };
    const onLeave = () => {
      mx.set(0);
      my.set(0);
    };
    el.addEventListener("pointermove", onMove);
    el.addEventListener("pointerleave", onLeave);
    return () => {
      el.removeEventListener("pointermove", onMove);
      el.removeEventListener("pointerleave", onLeave);
    };
  }, [mx, my, reduce]);

  return (
    <div
      ref={containerRef}
      className="relative h-[clamp(420px,58vh,600px)] w-full select-none"
      style={{ perspective: "1000px", perspectiveOrigin: "50% 42%" }}
      aria-hidden
    >
      {POLAROIDS.map((p, i) => (
        <PolaroidItem key={p.id} p={p} index={i} smx={smx} smy={smy} reduce={reduce ?? false} />
      ))}
    </div>
  );
}

function PolaroidItem({
  p,
  index,
  smx,
  smy,
  reduce,
}: {
  p: Polaroid;
  index: number;
  smx: ReturnType<typeof useSpring>;
  smy: ReturnType<typeof useSpring>;
  reduce: boolean;
}) {
  // parallax: closer (higher depth) moves more
  const tx = useTransform(smx, (v) => v * 40 * p.depth);
  const ty = useTransform(smy, (v) => v * 28 * p.depth);
  const tr = useTransform(smx, (v) => p.rot + v * 3 * p.depth);

  // 3-D perspective tilt: cards lean toward the cursor
  const rotateY = useTransform(smx, (v) => v * 30 * p.depth);
  const rotateX = useTransform(smy, (v) => -v * 22 * p.depth);
  // each card rests on its own depth plane (closer = pushed toward viewer)
  const restZ = (p.depth - 0.55) * 130;

  // drop shadow slides opposite the tilt so the card feels lifted
  const shadowX = useTransform(smx, (v) => -v * 46 * p.depth);
  const shadowY = useTransform(smy, (v) => 20 - v * 34 * p.depth);
  const boxShadow = useMotionTemplate`${shadowX}px ${shadowY}px 46px -16px rgba(139, 111, 92, 0.42), 0 4px 12px -6px rgba(139, 111, 92, 0.2)`;

  // glare highlight tracks the cursor across the photo
  const shineX = useTransform(smx, (v) => `${50 + v * 80}%`);
  const shineY = useTransform(smy, (v) => `${50 + v * 80}%`);
  const shine = useMotionTemplate`radial-gradient(circle at ${shineX} ${shineY}, rgba(255, 255, 255, 0.55), rgba(255, 255, 255, 0) 58%)`;

  return (
    <motion.figure
      className="absolute"
      style={{
        left: `${p.x}%`,
        top: `${p.y}%`,
        width: responsiveWidth(p.width),
        transformStyle: "preserve-3d",
        x: reduce ? 0 : tx,
        y: reduce ? 0 : ty,
        z: reduce ? 0 : restZ,
        rotate: reduce ? p.rot : tr,
        rotateX: reduce ? 0 : rotateX,
        rotateY: reduce ? 0 : rotateY,
        zIndex: Math.round(p.depth * 10) + index,
      }}
      initial={{ opacity: 0, y: 18, scale: 0.9 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.7, delay: 0.15 + index * 0.12, ease: "easeOut" }}
      whileHover={reduce ? undefined : { scale: 1.06, zIndex: 50 }}
    >
      {/* gentle idle float */}
      <motion.div
        animate={
          reduce
            ? undefined
            : { y: [0, -6, 0], rotate: [0, p.rot * 0.05, 0] }
        }
        transition={{
          duration: 6 + index,
          repeat: Infinity,
          ease: "easeInOut",
          delay: index * 0.3,
        }}
        className="relative rounded-[6px] bg-cream-50 pb-10 pt-3 shadow-soft"
        style={{
          boxShadow: reduce
            ? "0 18px 40px -18px rgba(139, 111, 92, 0.35), 0 4px 10px -4px rgba(139, 111, 92, 0.18)"
            : boxShadow,
          padding: "12px 12px 44px 12px",
        }}
      >
        <Tape side={index % 2 === 0 ? "left" : "right"} />
        <div
          className="relative overflow-hidden rounded-[2px]"
          style={{ aspectRatio: "1 / 1" }}
        >
          <PhotoFill kind={p.kind} image={p.image} />
          {!reduce && (
            <motion.span
              aria-hidden
              className="pointer-events-none absolute inset-0"
              style={{ background: shine, mixBlendMode: "soft-light" }}
            />
          )}
        </div>
        <figcaption className="absolute inset-x-0 bottom-2 px-3 text-center">
          <span
            className="font-display text-sm text-taupe-500"
            style={{ fontStyle: "italic" }}
          >
            {p.label}
          </span>
          {p.caption && (
            <span className="ml-1.5 text-[10px] uppercase tracking-[0.18em] text-taupe-300">
              {p.caption}
            </span>
          )}
        </figcaption>
      </motion.div>
    </motion.figure>
  );
}
