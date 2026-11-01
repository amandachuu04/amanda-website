import { useRef, useState, type ReactNode, type RefObject } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { projects, site } from "../lib/site";
import { navigate, workHref } from "../lib/route";

/** Shared drag behaviour for everything sitting on the desk. */
function DeskItem({
  deskRef,
  x,
  y,
  rot = 0,
  delay = 0,
  className = "",
  label,
  children,
}: {
  deskRef: RefObject<HTMLDivElement>;
  x: string;
  y: string;
  rot?: number;
  delay?: number;
  className?: string;
  label?: string;
  children: ReactNode;
}) {
  const [z, setZ] = useState(1);
  const reduce = useReducedMotion();
  return (
    <motion.div
      drag
      dragConstraints={deskRef}
      dragElastic={0.12}
      dragMomentum={false}
      onDragStart={() => setZ(++zTop)}
      onPointerDown={() => setZ(++zTop)}
      initial={reduce ? false : { opacity: 0, scale: 0.6, rotate: rot - 12 }}
      animate={{ opacity: 1, scale: 1, rotate: rot }}
      transition={{ type: "spring", stiffness: 260, damping: 18, delay }}
      whileHover={reduce ? undefined : { scale: 1.04 }}
      whileDrag={{ scale: 1.08, rotate: 0, cursor: "grabbing" }}
      className={`absolute cursor-grab touch-none select-none ${className}`}
      style={{ left: x, top: y, zIndex: z }}
      aria-label={label}
    >
      {children}
    </motion.div>
  );
}
let zTop = 10;

/* ---------- camera that prints project photos ---------- */
const printable = projects.filter((p) => p.image && p.slug);

type Print = { id: number; idx: number; x: number; y: number; rot: number };

function Camera({ onSnap }: { onSnap: () => void }) {
  const [pressed, setPressed] = useState(false);
  const press = () => {
    setPressed(true);
    onSnap();
    setTimeout(() => setPressed(false), 180);
  };
  return (
    <motion.button
      type="button"
      onTap={press}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          press();
        }
      }}
      className="group relative block w-[clamp(120px,15vw,168px)] cursor-pointer"
      aria-label="Take a photo of one of my projects"
    >
      <svg viewBox="0 0 170 140" className="w-full drop-shadow-[0_14px_18px_rgba(101,76,140,0.35)]">
        <rect x="58" y={pressed ? 4 : 0} width="26" height="12" rx="4" fill="#A987E3" />
        <rect x="6" y="10" width="158" height="124" rx="26" fill="#DCC6F7" />
        <rect x="6" y="10" width="158" height="40" rx="20" fill="#ECDDFB" />
        <rect x="18" y="20" width="26" height="20" rx="6" fill="#FFFEFF" opacity=".9" />
        <rect x="118" y="20" width="32" height="18" rx="6" fill="#362848" />
        <circle cx="134" cy="29" r="5" fill="#7E63A8" />
        <circle cx="85" cy="82" r="40" fill="#F6EEFD" />
        <circle cx="85" cy="82" r="31" fill="#4D3A6B" />
        <circle cx="85" cy="82" r="20" fill="#241A30" />
        <circle cx="76" cy="73" r="6" fill="#FFFFFF" opacity=".7" />
        <circle cx="93" cy="90" r="2.5" fill="#FFFFFF" opacity=".5" />
        <text x="85" y="128" textAnchor="middle" fontSize="10" fontWeight="700" fill="#7E63A8" letterSpacing="2" fontFamily="Quicksand, sans-serif">
          SNAP ♡
        </text>
      </svg>
      <span className="pointer-events-none absolute -top-7 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-pill bg-ink px-2.5 py-1 text-[10px] font-bold text-cream-50 opacity-0 transition-opacity group-hover:opacity-100">
        click to print my work
      </span>
    </motion.button>
  );
}

function PrintPhoto({ p, deskRef }: { p: Print; deskRef: RefObject<HTMLDivElement> }) {
  const proj = printable[p.idx];
  const [z, setZ] = useState(() => ++zTop);
  return (
    <motion.div
      drag
      dragConstraints={deskRef}
      dragElastic={0.12}
      dragMomentum={false}
      onPointerDown={() => setZ(++zTop)}
      initial={{ left: "16%", top: "62%", opacity: 0, scale: 0.4, rotate: 0 }}
      animate={{ left: `${p.x}%`, top: `${p.y}%`, opacity: 1, scale: 1, rotate: p.rot }}
      exit={{ opacity: 0, scale: 0.6 }}
      transition={{ type: "spring", stiffness: 120, damping: 16 }}
      whileDrag={{ scale: 1.08, rotate: 0 }}
      onTap={() => {
        navigate(workHref(proj.slug!));
        window.scrollTo({ top: 0, behavior: "auto" });
      }}
      className="absolute w-[clamp(104px,11vw,138px)] cursor-pointer touch-none select-none rounded-[4px] bg-white p-2 pb-7 shadow-[0_16px_30px_-14px_rgba(101,76,140,0.55)]"
      style={{ zIndex: z }}
      title={`Open ${proj.title}`}
    >
      <motion.img
        src={proj.image}
        alt={`${proj.title} preview`}
        draggable={false}
        initial={{ filter: "brightness(2.2) saturate(0) blur(2px)" }}
        animate={{ filter: "brightness(1) saturate(1) blur(0px)" }}
        transition={{ duration: 2.2, ease: "easeOut" }}
        className="aspect-square w-full rounded-[2px] object-cover"
      />
      <span className="absolute inset-x-0 bottom-1.5 truncate px-2 text-center font-display text-[11px] text-taupe-500">
        {proj.title} ↗
      </span>
    </motion.div>
  );
}

/* ---------- boba you can sip ---------- */
function Boba() {
  const [level, setLevel] = useState(1);
  const [slurps, setSlurps] = useState<number[]>([]);
  const reduce = useReducedMotion();
  const sip = () => {
    setLevel((l) => (l <= 0.05 ? 1 : Math.max(0, l - 0.25)));
    const id = Date.now();
    setSlurps((s) => [...s, id]);
    setTimeout(() => setSlurps((s) => s.filter((x) => x !== id)), 900);
  };
  const top = 46 + (1 - level) * 70; // tea surface y in svg units
  return (
    <motion.button type="button" onTap={sip} onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); sip(); } }} className="relative block w-[clamp(64px,7.5vw,88px)] cursor-pointer" aria-label="Take a sip of boba">
      <svg viewBox="0 0 90 150" className="w-full drop-shadow-[0_12px_14px_rgba(101,76,140,0.3)]">
        <rect x="52" y="0" width="9" height="80" rx="4" fill="#F49AC1" transform="rotate(12 56 40)" />
        <path d="M14 34 Q45 10 76 34 Z" fill="#FFFEFF" opacity=".85" />
        <rect x="10" y="32" width="70" height="8" rx="4" fill="#FFFEFF" />
        <path d="M14 40 L76 40 L68 140 Q45 146 22 140 Z" fill="#FFFFFF" opacity=".55" />
        <clipPath id="cup">
          <path d="M14 40 L76 40 L68 140 Q45 146 22 140 Z" />
        </clipPath>
        <g clipPath="url(#cup)">
          <motion.rect x="0" width="90" height="120" fill="#C7A8F0" animate={{ y: top }} transition={{ type: "spring", stiffness: 90, damping: 14 }} />
          <motion.rect x="0" width="90" height="4" fill="#ECDDFB" animate={{ y: top }} transition={{ type: "spring", stiffness: 90, damping: 14 }} />
          {[[30, 130], [42, 133], [54, 130], [36, 122], [50, 121], [62, 124], [26, 120], [44, 112]].map(([cx, cy], i) => (
            <motion.circle
              key={i}
              cx={cx}
              r="5"
              fill="#362848"
              animate={{ cy: Math.max(cy, top + 6) }}
              transition={{ type: "spring", stiffness: 140, damping: 10, delay: i * 0.02 }}
            />
          ))}
        </g>
        <path d="M14 40 L76 40 L68 140 Q45 146 22 140 Z" fill="none" stroke="#FFFFFF" strokeWidth="2" />
        <text x="45" y="92" textAnchor="middle" fontSize="16" fill="#FFFEFF">♡</text>
      </svg>
      <AnimatePresence>
        {slurps.map((id) => (
          <motion.span
            key={id}
            initial={{ opacity: 0, y: 0, scale: 0.6 }}
            animate={{ opacity: 1, y: reduce ? 0 : -34, scale: 1 }}
            exit={{ opacity: 0 }}
            className="pointer-events-none absolute -top-2 left-1/2 -translate-x-1/2 whitespace-nowrap font-display text-sm text-taupe-500"
          >
            {level <= 0.05 ? "refilled ♡" : "slurp!"}
          </motion.span>
        ))}
      </AnimatePresence>
    </motion.button>
  );
}

/* ---------- now playing = what I'm up to ---------- */
function NowPlaying() {
  const [playing, setPlaying] = useState(true);
  const reduce = useReducedMotion();
  return (
    <div className="w-[clamp(158px,20vw,236px)] rounded-2xl bg-white/90 p-3 shadow-[0_16px_30px_-16px_rgba(101,76,140,0.5)] backdrop-blur">
      <div className="flex items-center gap-3">
        <div className="relative grid h-12 w-12 shrink-0 place-items-center overflow-hidden rounded-xl bg-gradient-to-br from-blush-400 via-taupe-300 to-taupe-500 text-lg text-white">
          ✦
        </div>
        <div className="min-w-0">
          <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-taupe-300">Now playing</p>
          <p className="truncate font-display text-sm text-ink">UI/UX Design Intern</p>
          <p className="truncate text-xs text-taupe-400">Nexus 8 International</p>
        </div>
      </div>
      <div className="mt-3 flex items-center gap-2">
        <motion.button
          type="button"
          onTap={() => setPlaying((p) => !p)}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              e.preventDefault();
              setPlaying((p) => !p);
            }
          }}
          className="grid h-7 w-7 shrink-0 cursor-pointer place-items-center rounded-full bg-taupe-400 text-[10px] text-white"
          aria-label={playing ? "Pause" : "Play"}
        >
          {playing ? "❚❚" : "▶"}
        </motion.button>
        <div className="h-1 flex-1 overflow-hidden rounded-full bg-blush-200">
          <motion.div
            className="h-full rounded-full bg-taupe-400"
            animate={playing && !reduce ? { width: ["10%", "100%"] } : undefined}
            transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
            style={{ width: "38%" }}
          />
        </div>
        <div className="flex h-4 items-end gap-[2px]" aria-hidden>
          {[0, 1, 2, 3].map((i) => (
            <motion.span
              key={i}
              className="w-[3px] rounded-full bg-blush-500"
              animate={playing && !reduce ? { height: ["30%", "100%", "45%", "80%", "30%"] } : { height: "30%" }}
              transition={{ duration: 0.9 + i * 0.15, repeat: Infinity, ease: "easeInOut" }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

/* ---------- small die-cut stickers ---------- */
function Sticker({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <div className={`grid place-items-center rounded-full border-[3px] border-white font-display shadow-[0_8px_14px_-8px_rgba(101,76,140,0.6)] ${className}`}>
      {children}
    </div>
  );
}

export default function Desk() {
  const deskRef = useRef<HTMLDivElement>(null);
  const [prints, setPrints] = useState<Print[]>([]);
  const [flash, setFlash] = useState(0);
  const [count, setCount] = useState(0);

  const snap = () => {
    setFlash((f) => f + 1);
    setCount((c) => c + 1);
    setPrints((ps) => {
      const next: Print = {
        id: Date.now(),
        idx: count % printable.length,
        x: 34 + Math.random() * 36,
        y: 70 + Math.random() * 8,
        rot: Math.round(Math.random() * 20 - 10),
      };
      return [...ps, next].slice(-4);
    });
  };

  return (
    <div className="relative">
      <div
        ref={deskRef}
        className="relative h-[clamp(460px,62vh,620px)] w-full overflow-hidden rounded-[2rem] border border-taupe-200/50 shadow-[0_30px_60px_-30px_rgba(101,76,140,0.45)]"
        style={{
          background:
            "radial-gradient(120% 90% at 30% 20%, #F6EEFD 0%, #ECDDFB 55%, #DCC6F7 100%)",
        }}
      >
        {/* cutting-mat grid + ruler ticks */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0"
          style={{
            backgroundImage:
              "linear-gradient(to right, rgba(101,76,140,0.10) 1px, transparent 1px), linear-gradient(to bottom, rgba(101,76,140,0.10) 1px, transparent 1px)",
            backgroundSize: "36px 36px",
          }}
        />
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 top-0 h-3"
          style={{ backgroundImage: "linear-gradient(to right, rgba(101,76,140,0.35) 1px, transparent 1px)", backgroundSize: "9px 100%" }}
        />
        <div
          aria-hidden
          className="pointer-events-none absolute inset-y-0 left-0 w-3"
          style={{ backgroundImage: "linear-gradient(to bottom, rgba(101,76,140,0.35) 1px, transparent 1px)", backgroundSize: "100% 9px" }}
        />

        {/* leaf peeking in, like the plant on my real desk */}
        <svg aria-hidden viewBox="0 0 200 200" className="pointer-events-none absolute -right-10 -top-12 w-[clamp(150px,18vw,230px)] rotate-[200deg] opacity-90">
          <path d="M100 10 C160 30 190 90 170 150 C150 190 90 195 60 170 C20 140 20 70 100 10 Z" fill="#9CC28A" />
          <path d="M100 14 C110 70 115 120 110 185" stroke="#7FAE6E" strokeWidth="5" fill="none" />
          <path d="M108 60 L150 45 M110 95 L165 90 M110 130 L155 140 M104 70 L60 55 M106 110 L45 105" stroke="#7FAE6E" strokeWidth="4" />
        </svg>

        <DeskItem deskRef={deskRef} x="6%" y="8%" rot={-8} delay={0.1} label="My avatar sticker">
          <div className="relative">
            <motion.img
              src={site.avatar}
              alt="Illustrated Amanda winking with a peace sign"
              draggable={false}
              whileHover={{ rotate: [0, -6, 6, -3, 0] }}
              transition={{ duration: 0.6 }}
              className="w-[clamp(110px,13vw,160px)] rounded-[38%] border-[6px] border-white bg-white object-cover shadow-[0_14px_24px_-12px_rgba(101,76,140,0.6)]"
            />
            <span className="absolute -bottom-3 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-pill bg-white px-3 py-1 font-display text-xs text-taupe-500 shadow-sm">
              hi, that's me ☻
            </span>
          </div>
        </DeskItem>

        <DeskItem deskRef={deskRef} x="7%" y="56%" rot={-4} delay={0.2} label="Camera">
          <Camera onSnap={snap} />
        </DeskItem>

        <DeskItem deskRef={deskRef} x="50%" y="9%" rot={4} delay={0.3} label="Now playing card">
          <NowPlaying />
        </DeskItem>

        <DeskItem deskRef={deskRef} x="82%" y="44%" rot={6} delay={0.35} label="Boba">
          <Boba />
        </DeskItem>

        <DeskItem deskRef={deskRef} x="46%" y="50%" rot={-3} delay={0.4} label="Notebook">
          <div className="relative w-[clamp(150px,17vw,200px)] rounded-r-xl rounded-l-md bg-taupe-400 p-4 pl-6 text-cream-50 shadow-[0_16px_26px_-14px_rgba(54,40,72,0.7)]">
            <span aria-hidden className="absolute inset-y-2 left-1.5 flex flex-col justify-between">
              {Array.from({ length: 7 }).map((_, i) => (
                <span key={i} className="h-1.5 w-3 rounded-full bg-cream-50/80" />
              ))}
            </span>
            <p className="font-display text-base leading-tight">my design notes ♡</p>
            <p className="mt-2 text-[11px] leading-snug text-cream-50/80">research → wireframes → prototype → code</p>
          </div>
        </DeskItem>

        {/* stickers */}
        <DeskItem deskRef={deskRef} x="33%" y="14%" rot={-12} delay={0.45} label="Heart sticker">
          <Sticker className="h-14 w-14 bg-pop text-2xl text-white">♥</Sticker>
        </DeskItem>
        <DeskItem deskRef={deskRef} x="38%" y="30%" rot={10} delay={0.5} label="UX sticker">
          <Sticker className="h-16 w-16 bg-ink text-lg text-blush-300">UX</Sticker>
        </DeskItem>
        <DeskItem deskRef={deskRef} x="68%" y="33%" rot={-8} delay={0.55} label="Star sticker">
          <Sticker className="h-12 w-12 bg-[#FFE08A] text-xl text-taupe-500">✦</Sticker>
        </DeskItem>
        <DeskItem deskRef={deskRef} x="22%" y="42%" rot={8} delay={0.6} label="Hello sticker">
          <div className="rounded-2xl rounded-bl-sm border-[3px] border-white bg-blush-400 px-3 py-1.5 font-display text-sm text-white shadow-[0_8px_14px_-8px_rgba(101,76,140,0.6)]">
            hello!
          </div>
        </DeskItem>

        <AnimatePresence>
          {prints.map((p) => (
            <PrintPhoto key={p.id} p={p} deskRef={deskRef} />
          ))}
        </AnimatePresence>

        {/* camera flash */}
        <AnimatePresence>
          {flash > 0 && (
            <motion.div
              key={flash}
              aria-hidden
              initial={{ opacity: 0.85 }}
              animate={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
              className="pointer-events-none absolute inset-0 z-[999] bg-white"
            />
          )}
        </AnimatePresence>
      </div>

      <p className="mt-4 text-center text-sm text-taupe-400">
        psst… everything on my desk is draggable. try the camera ✦
      </p>
    </div>
  );
}
