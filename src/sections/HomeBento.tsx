import { CSSProperties, ReactNode, useEffect, useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { experiences, projects, site, toolGroups, type Project } from "../lib/site";
import { projectsHref, workHref } from "../lib/route";

const spring = { type: "spring" as const, stiffness: 260, damping: 22 };

function Tile({
  className = "",
  delay = 0,
  children,
  href,
  label,
}: {
  className?: string;
  delay?: number;
  children: ReactNode;
  href?: string;
  label?: string;
}) {
  const base =
    "group relative overflow-hidden rounded-[1.75rem] border border-taupe-200/40 bg-cream-50 shadow-card transition-shadow hover:shadow-soft";
  const motionProps = {
    initial: { opacity: 0, y: 24, scale: 0.98 },
    whileInView: { opacity: 1, y: 0, scale: 1 },
    viewport: { once: true, margin: "-60px" },
    transition: { duration: 0.55, ease: "easeOut" as const, delay },
    whileHover: { y: -4, transition: spring },
  };
  return href ? (
    <motion.a href={href} aria-label={label} className={`${base} block ${className}`} {...motionProps}>
      {children}
    </motion.a>
  ) : (
    <motion.div className={`${base} ${className}`} {...motionProps}>
      {children}
    </motion.div>
  );
}

function Eyebrow({ children, light }: { children: ReactNode; light?: boolean }) {
  return (
    <span
      className={`text-[10px] font-semibold uppercase tracking-[0.2em] ${
        light ? "text-cream-100/70" : "text-taupe-400"
      }`}
    >
      {children}
    </span>
  );
}

function Arrow() {
  return (
    <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-cream-50/85 text-taupe-500 backdrop-blur transition-all duration-300 group-hover:rotate-45 group-hover:bg-taupe-400 group-hover:text-cream-50">
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden>
        <path d="M7 17 17 7M9 7h8v8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </span>
  );
}

function BigClock() {
  const fmt = () =>
    new Intl.DateTimeFormat("en-US", { timeZone: "America/New_York", hour: "numeric", minute: "2-digit", hour12: true }).formatToParts(new Date());
  const [parts, setParts] = useState(fmt);
  useEffect(() => {
    const id = setInterval(() => setParts(fmt()), 10000);
    return () => clearInterval(id);
  }, []);
  const get = (t: string) => parts.find((p) => p.type === t)?.value ?? "";
  return (
    <p className="my-3 flex items-baseline gap-2 font-display font-bold text-ink tabular-nums">
      <span className="text-[clamp(2.6rem,4vw,3.4rem)] leading-none">
        {get("hour")}
        <motion.span animate={{ opacity: [1, 0.2, 1] }} transition={{ duration: 2, repeat: Infinity }}>:</motion.span>
        {get("minute")}
      </span>
      <span className="text-lg text-taupe-400">{get("dayPeriod")}</span>
    </p>
  );
}

/** Image width ÷ height, so each card can match its picture exactly. */
const RATIOS: Record<string, number> = {
  "/paws-and-care.jpg": 3000 / 2000,
  "/nextrip.png": 1600 / 1200,
  "/floraflow.avif": 1987 / 2048,
  "/magtracker.avif": 433 / 461,
  "/name-logo-design.avif": 799 / 1200,
  "/choco-cake-recipe.avif": 6000 / 4000,
  "/banana-bread-recipe.avif": 1536 / 1024,
  "/hierarchy-ad.avif": 2560 / 1440,
  "/modular-grid.avif": 5500 / 3667,
};
const ratioOf = (p: Project) => (p.image && RATIOS[p.image]) || 4 / 3;

function ProjectCard({ p, copy }: { p: Project; copy?: boolean }) {
  const ratio = ratioOf(p);
  return (
    <motion.a
      href={p.slug ? workHref(p.slug) : p.href ?? "#"}
      aria-label={`Open ${p.title}`}
      aria-hidden={copy}
      tabIndex={copy ? -1 : undefined}
      whileHover={{ y: -4, transition: spring }}
      className="group relative flex shrink-0 flex-col overflow-hidden rounded-[1.75rem] border border-taupe-200/40 bg-cream-50 shadow-card transition-shadow hover:shadow-soft"
      style={{ width: `min(calc(var(--h) * ${ratio}), 82vw)` }}
    >
      <div className={`relative w-full overflow-hidden bg-gradient-to-br ${p.swatch}`} style={{ aspectRatio: String(ratio) }}>
        {p.image && (
          <img
            src={p.image}
            alt={`${p.title} project preview`}
            loading="lazy"
            className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
          />
        )}
        <div className="absolute inset-x-0 top-0 flex items-start justify-between p-4">
          <span className="mr-2 rounded-xl bg-cream-50/90 px-3 py-1 text-[10px] font-semibold uppercase leading-relaxed tracking-[0.14em] text-taupe-500 backdrop-blur">
            {p.kind}
          </span>
          <Arrow />
        </div>
      </div>
      <div className="px-5 pb-5 pt-4">
        <h3 className="font-display text-2xl font-bold text-ink transition-colors group-hover:text-taupe-500">{p.title}</h3>
        {p.meta && <p className="mt-1 text-xs text-taupe-400">{p.meta}</p>}
      </div>
    </motion.a>
  );
}

function CarouselButton({ dir, disabled, onClick }: { dir: "Previous" | "Next"; disabled: boolean; onClick: () => void }) {
  return (
    <button
      type="button"
      aria-label={`${dir} project`}
      disabled={disabled}
      onClick={onClick}
      className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-taupe-200/60 bg-cream-50 text-taupe-500 transition-colors hover:bg-blush-100 disabled:opacity-40 disabled:hover:bg-cream-50"
    >
      {dir === "Previous" ? "←" : "→"}
    </button>
  );
}

const AUTO_SPEED = 70; // px per second
const RESUME_AFTER = 3000; // ms to wait after someone uses the arrows or swipes

/** Scrolls on its own and loops over a doubled card list, pausing while someone is using it. */
function useCarousel(count: number) {
  const track = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const paused = useRef(false);
  const holdUntil = useRef(0);
  const aim = useRef<number | null>(null); // where an arrow click is headed, so quick clicks add up
  const [ends, setEnds] = useState({ latest: true, oldest: false });

  const hold = () => {
    holdUntil.current = performance.now() + RESUME_AFTER;
  };
  const loopWidth = (el: HTMLDivElement) => (el.children[count] as HTMLElement).offsetLeft - (el.children[0] as HTMLElement).offsetLeft;
  /** Arrow stops, ending with the oldest project at the right edge and the looped copies out of view. */
  const stops = (el: HTMLDivElement) => {
    const pad = (el.children[0] as HTMLElement).offsetLeft;
    const cards = Array.from(el.children).slice(0, count) as HTMLElement[];
    const oldest = cards[count - 1];
    const end = oldest.offsetLeft + oldest.offsetWidth + parseFloat(getComputedStyle(el).columnGap) - el.clientWidth;
    return [...cards.map((c) => c.offsetLeft - pad).filter((l) => l < end - 8), end];
  };

  useEffect(() => {
    const el = track.current;
    if (!el) return;
    let frame = 0;
    let last = performance.now();
    let pos = el.scrollLeft;
    const tick = (now: number) => {
      const dt = Math.min(now - last, 50);
      last = now;
      if (reduced || paused.current || now < holdUntil.current) {
        pos = el.scrollLeft;
      } else {
        pos += (AUTO_SPEED * dt) / 1000;
        const width = loopWidth(el);
        if (pos >= width) pos -= width;
        el.scrollLeft = pos;
      }
      if (aim.current !== null && (now >= holdUntil.current || Math.abs(el.scrollLeft - aim.current) < 2)) aim.current = null;
      const at = (aim.current ?? el.scrollLeft) % loopWidth(el);
      const latest = at < 8;
      const oldest = Math.abs(at - stops(el).slice(-1)[0]) < 8;
      setEnds((e) => (e.latest === latest && e.oldest === oldest ? e : { latest, oldest }));
      frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [count, reduced]);

  const go = (step: 1 | -1) => {
    const el = track.current;
    if (!el) return;
    hold();
    const width = loopWidth(el);
    if (aim.current === null && el.scrollLeft >= width) el.scrollLeft -= width;
    const from = aim.current ?? el.scrollLeft;
    const lefts = stops(el);
    const last = lefts[lefts.length - 1];
    const target = step > 0 ? lefts.find((l) => l > from + 8) ?? (from > last + 8 ? last : undefined) : [...lefts].reverse().find((l) => l < Math.min(from, last) - 8);
    if (target === undefined) return;
    aim.current = target;
    el.scrollTo({ left: target, behavior: "smooth" });
  };

  const handlers = {
    onMouseEnter: () => { paused.current = true; },
    onMouseLeave: () => { paused.current = false; },
    onFocus: () => { paused.current = true; },
    onBlur: () => { paused.current = false; },
    onTouchStart: () => { paused.current = true; },
    onTouchEnd: () => { paused.current = false; hold(); },
  };

  return { track, go, handlers, ends };
}

export default function HomeBento() {
  const now = experiences[0];
  const carousel = useCarousel(projects.length);
  const tools = toolGroups.flatMap((g) => g.items);

  return (
    <>
      {/* ---------- at-a-glance bento ---------- */}
      <section id="hero" className="relative w-full bg-cream-100 pb-16 pt-28 sm:pt-32">
        <div aria-hidden className="absolute inset-0 grain opacity-60" />
        <div className="relative mx-auto w-full max-w-[1560px] space-y-4 px-4 sm:px-8 lg:space-y-5 lg:px-12">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-[minmax(0,1.45fr)_minmax(0,1.3fr)_minmax(0,1fr)] xl:grid-cols-[minmax(0,1.75fr)_minmax(0,1.2fr)_minmax(0,1fr)] lg:gap-5">
          {/* intro */}
          <Tile className="flex flex-col justify-center gap-7 p-7 sm:col-span-2 sm:p-9 lg:col-span-1 lg:row-span-2">
            <div className="flex flex-wrap items-center gap-2">
              <span className="pill">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-blush-300 opacity-75" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-blush-400" />
                </span>
                Available for work
              </span>
              <span className="pill">UX/UI · Web Dev</span>
            </div>
            <div>
              <h1 className="font-display text-[clamp(2.3rem,3.9vw,4rem)] font-bold leading-[1.02] tracking-tight text-ink">
                Hi, I&apos;m Amanda!
                <br />
                <span className="text-taupe-500">I design &amp;</span>{" "}
                <span className="italic text-taupe-500">build things :)</span>
              </h1>
              <p className="mt-5 max-w-lg text-base text-taupe-500 sm:text-lg">
                Designing thoughtful digital experiences through code, creativity, and user-centered thinking.
              </p>
              <div className="mt-7 flex flex-wrap gap-3">
                <a href={site.cvFile} download className="btn-primary">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden>
                    <path d="M12 4v12m0 0 4-4m-4 4-4-4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M4 20h16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                  </svg>
                  Download CV
                </a>
                <a href="#contact" className="btn-secondary">Let&apos;s talk →</a>
              </div>
            </div>
          </Tile>

          {/* avatar */}
          <Tile delay={0.05} className="min-h-[340px] bg-blush-100 lg:row-span-2">
            <img src={site.avatar} alt="Illustrated portrait of Amanda Chu" className="absolute inset-x-0 bottom-0 top-12 h-[calc(100%-3rem)] w-full object-contain object-bottom transition-transform duration-700 group-hover:scale-[1.04]" />
            <span className="absolute left-4 top-4 rounded-pill bg-cream-50/90 px-3 py-1.5 font-display text-sm italic text-taupe-500 backdrop-blur">
              hi, that&apos;s me ☻
            </span>
          </Tile>

          {/* now */}
          <Tile delay={0.1} href="/about#experience" label="See my experience" className="flex flex-col justify-between bg-blush-100 p-6">
            <div className="flex items-center justify-between">
              <Eyebrow>Right now</Eyebrow>
              <span className="relative flex h-2.5 w-2.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-blush-300 opacity-75" />
                <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-blush-400" />
              </span>
            </div>
            <div className="mt-4">
              <p className="font-display text-xl font-bold leading-tight text-ink">{now.role}</p>
              <p className="mt-1 text-sm text-taupe-500">{now.company}</p>
              <p className="mt-3 text-sm leading-snug text-taupe-600">
                Redesigning the HIPPRA website, turning a dropdown concept into tab-based navigation.
              </p>
              <p className="mt-3 flex items-center justify-between text-xs text-taupe-400">
                <span>{now.dates}</span>
                <span className="font-semibold text-taupe-500 transition-transform group-hover:translate-x-1">See experience →</span>
              </p>
            </div>
          </Tile>

          {/* location + clock */}
          <Tile delay={0.15} className="flex flex-col justify-between p-6">
            <div className="flex items-center justify-between">
              <Eyebrow>Based in</Eyebrow>
              <span className="text-xs font-semibold text-taupe-500">{site.location} · local time</span>
            </div>
            <BigClock />
            <div className="flex flex-wrap items-center gap-1.5">
              <span className="mr-1 text-xs text-taupe-400">Speaks</span>
              {["English", "Cantonese", "Mandarin"].map((l) => (
                <span key={l} className="rounded-pill bg-cream-100 px-2.5 py-1 text-xs font-semibold text-taupe-500">{l}</span>
              ))}
            </div>
          </Tile>

        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4 lg:gap-5">
          {/* interests */}
          <Tile delay={0.1} className="flex flex-col gap-4 p-6">
            <Eyebrow>Interests ♡</Eyebrow>
            <ul className="grid flex-1 auto-rows-fr grid-cols-2 gap-2">
              {["Boba", "Concerts", "Shopping", "Music"].map((x, i) => (
                <motion.li
                  key={x}
                  whileHover={{ y: -3, rotate: i % 2 ? 2 : -2 }}
                  className={`flex min-h-[3rem] items-center justify-center rounded-2xl px-2 text-center font-display text-base font-bold text-taupe-500 ${
                    i === 0 || i === 3 ? "bg-blush-100" : "bg-taupe-50"
                  }`}
                >
                  {x}
                </motion.li>
              ))}
            </ul>
          </Tile>

          {/* design -> implementation */}
          <Tile delay={0.15} className="flex flex-col justify-center gap-6 p-6 sm:col-span-2">
            <div className="flex items-center justify-between">
              <Eyebrow>How I work</Eyebrow>
              <span className="text-xs text-taupe-400">From Figma to code</span>
            </div>
            <div className="grid grid-cols-1 items-center gap-3 sm:grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)]">
              <div className="rounded-2xl bg-blush-100 p-4 lg:p-5">
                <p className="font-display text-[clamp(1.3rem,1.9vw,1.6rem)] font-bold italic text-taupe-500">design</p>
                <p className="mt-1 text-xs text-taupe-500">Research, wireframes &amp; high-fidelity screens in Figma</p>
              </div>
              <motion.span aria-hidden className="justify-self-center text-2xl text-taupe-300" animate={{ x: [0, 4, 0] }} transition={{ duration: 1.8, repeat: Infinity }}>
                <span className="inline-block rotate-90 sm:rotate-0">→</span>
              </motion.span>
              <div className="rounded-2xl bg-taupe-50 p-4 lg:p-5">
                <p className="font-display text-[clamp(1.3rem,1.9vw,1.6rem)] font-bold italic text-taupe-500">implementation</p>
                <p className="mt-1 text-xs text-taupe-500">Responsive, accessible builds in HTML, CSS &amp; JavaScript</p>
              </div>
            </div>
          </Tile>

          {/* contact */}
          <Tile delay={0.2} href="#contact" label="Contact me" className="flex flex-col justify-between bg-taupe-400 p-6 text-cream-100">
            <div className="flex items-start justify-between">
              <Eyebrow light>Say hello</Eyebrow>
              <Arrow />
            </div>
            <div className="mt-6">
              <p className="font-display text-2xl font-bold">Let&apos;s talk.</p>
              <p className="mt-1 break-all text-sm text-cream-100/85">{site.email}</p>
              <p className="mt-3 text-xs leading-relaxed text-cream-100/75">Open to internships, freelance design, and collaborative projects.</p>
            </div>
          </Tile>
        </div>
        </div>

        {/* tools marquee */}
        <div className="relative mt-10 overflow-hidden border-y border-taupe-200/40 bg-cream-50/60 py-4" aria-label="Tools I use">
          <motion.div
            className="flex w-max gap-10 whitespace-nowrap font-display text-lg text-taupe-400"
            animate={{ x: ["0%", "-50%"] }}
            transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
          >
            {[...tools, ...tools].map((t, i) => (
              <span key={i} className="inline-flex items-center gap-10">
                {t}
                <span aria-hidden className="text-blush-300">✦</span>
              </span>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ---------- projects bento ---------- */}
      <section id="projects" className="relative w-full scroll-mt-24 bg-cream-100 pb-24 sm:pb-32">
        <div className="mx-auto w-full max-w-[1560px] px-4 sm:px-8 lg:px-10">
          <div className="flex flex-wrap items-end justify-between gap-6 pb-8 pt-8">
            <div>
              <span className="section-eyebrow">
                <span aria-hidden className="inline-block h-1.5 w-6 rounded-full bg-blush-300" />
                All projects
              </span>
              <h2 className="mt-3 font-display text-display-md font-bold text-ink">
                Things I&apos;ve <span className="italic text-taupe-500">made so far</span>
              </h2>
              <p className="mt-3 text-base text-taupe-500">A growing collection of my projects, from newest to oldest. More on the way.</p>
            </div>
            <div className="flex items-center gap-3">
              <CarouselButton dir="Previous" disabled={carousel.ends.latest} onClick={() => carousel.go(-1)} />
              <CarouselButton dir="Next" disabled={carousel.ends.oldest} onClick={() => carousel.go(1)} />
              <a href={projectsHref()} className="btn-secondary">View all →</a>
            </div>
          </div>

        </div>

        <div
          ref={carousel.track}
          {...carousel.handlers}
          className="relative flex items-start gap-4 overflow-x-auto px-4 pb-8 pt-2 [scrollbar-width:none] sm:px-8 lg:gap-5 lg:px-10 [&::-webkit-scrollbar]:hidden"
          style={{ "--h": "clamp(15rem, 30vw, 27rem)" } as CSSProperties}
        >
          {[...projects, ...projects].map((p, i) => (
            <ProjectCard key={i} p={p} copy={i >= projects.length} />
          ))}
        </div>
      </section>
    </>
  );
}
