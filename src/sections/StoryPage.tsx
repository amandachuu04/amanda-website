import { CSSProperties, ReactNode } from "react";
import { motion } from "framer-motion";
import { CaseStudy, GalleryItem } from "../lib/site";
import { projectsHref } from "../lib/route";

export const reveal = {
  initial: { opacity: 0, y: 28 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-60px" },
  transition: { duration: 0.6, ease: "easeOut" as const },
};

function Eyebrow({ children }: { children: ReactNode }) {
  return (
    <span className="section-eyebrow">
      <span aria-hidden className="inline-block h-1.5 w-6 rounded-full bg-blush-300" />
      {children}
    </span>
  );
}

function Wrap({ className = "", children }: { className?: string; children: ReactNode }) {
  return <div className={`mx-auto w-full max-w-[1560px] px-4 sm:px-8 lg:px-10 ${className}`}>{children}</div>;
}

export const body = "text-base leading-relaxed text-taupe-600 sm:text-lg";

export function Section({ eyebrow, title, children }: { eyebrow: string; title: ReactNode; children: ReactNode }) {
  return (
    <Wrap className="relative">
      <div className="border-t border-taupe-200/60 py-16 sm:py-20">
        <motion.div {...reveal}>
          <Eyebrow>{eyebrow}</Eyebrow>
          <h2 className="mb-6 mt-4 font-display text-[clamp(2.2rem,4.6vw,3.8rem)] font-bold leading-[1.05] text-ink">{title}</h2>
          {children}
        </motion.div>
      </div>
    </Wrap>
  );
}

export function FeatureList({ items }: { items?: string[] }) {
  return (
    <ol className="mt-12 grid grid-cols-1 gap-x-10 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
      {items?.map((b, i) => (
        <motion.li key={b} {...reveal} transition={{ ...reveal.transition, delay: 0.06 * i }} className="border-t-2 border-blush-200 pt-5">
          <span className="font-display text-5xl font-bold leading-none text-blush-300">{String(i + 1).padStart(2, "0")}</span>
          <p className="mt-4 text-base leading-relaxed text-ink sm:text-lg">{b}</p>
        </motion.li>
      ))}
    </ol>
  );
}

export type StoryMedia = {
  src: string;
  ratio: number;
  alt?: string;
  caption?: string;
  video?: boolean;
  poster?: string;
};

type Props = {
  study: CaseStudy;
  media: StoryMedia[];
  screens: GalleryItem[];
  screensGrid: string;
  children: ReactNode;
};

export default function StoryPage({ study, media, screens, screensGrid, children }: Props) {
  const brand = study.gallery[0];
  const facts: [string, string | undefined][] = [
    ["Role", study.meta.role],
    ["Timeline", study.meta.timeline],
    ["Duration", study.meta.duration],
    ["Tools", study.meta.tools],
    ["Font", study.meta.fonts],
  ];

  return (
    <div className="relative w-full overflow-hidden bg-cream-100 pt-28 sm:pt-32">
      <div aria-hidden className="pointer-events-none absolute inset-0 grain opacity-50" />

      {/* ---------- hero ---------- */}
      <Wrap className="relative">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
          <a href={projectsHref()} className="text-xs font-semibold uppercase tracking-[0.18em] text-taupe-400 hover:text-taupe-500">
            ← All projects
          </a>
          <h1 className="mt-6 font-display text-[clamp(3.6rem,12vw,10rem)] font-bold leading-[0.9] tracking-tight text-ink">{study.title}</h1>
          <p className="mt-6 text-lg text-taupe-500 sm:text-xl">{study.tagline}</p>
          <dl className="mt-8 grid grid-cols-2 gap-x-8 gap-y-4 md:flex md:justify-between">
            {facts.filter(([, v]) => v).map(([k, v]) => (
              <div key={k}>
                <dt className="text-[10px] font-semibold uppercase tracking-[0.2em] text-taupe-400">{k}</dt>
                <dd className="mt-1 font-display text-base font-bold text-ink">{v}</dd>
              </div>
            ))}
          </dl>
          <p className="mt-8 text-[10px] font-semibold uppercase tracking-[0.2em] text-taupe-400">Skills applied</p>
          <div className="mt-2 flex flex-wrap gap-2">
            {study.skills.map((t) => (
              <span key={t} className="rounded-pill border border-taupe-200/60 px-4 py-2 text-sm font-medium text-taupe-600">{t}</span>
            ))}
          </div>
          {study.externalLink && (
            <a href={study.externalLink.href} target="_blank" rel="noopener noreferrer" className="btn-primary mt-8">
              {study.externalLink.label} ↗
            </a>
          )}
        </motion.div>
      </Wrap>

      {/* ---------- photos + demo video, same height, nothing cropped ---------- */}
      <Wrap className="relative mb-16 mt-14 sm:mb-20 sm:mt-20">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.15, ease: "easeOut" }}
          className="mx-auto flex max-w-[1400px] flex-col gap-4 md:flex-row lg:gap-5"
        >
          {media.map((m) => (
            <figure
              key={m.src}
              className={`m-0 min-w-0 md:[flex:var(--f)_1_0%] ${m.video ? "mx-auto w-full max-w-[320px] md:max-w-none" : ""}`}
              style={{ "--f": m.ratio } as CSSProperties}
            >
              <div className={`overflow-hidden rounded-[2rem] shadow-soft ${m.video ? "bg-ink" : ""}`} style={{ aspectRatio: m.ratio }}>
                {m.video ? (
                  <video src={m.src} poster={m.poster} controls muted loop playsInline preload="metadata" className="h-full w-full object-cover" />
                ) : (
                  <img src={m.src} alt={m.alt ?? ""} className="h-full w-full object-cover" />
                )}
              </div>
              {m.caption && <figcaption className="mt-3 text-center text-[10px] font-semibold uppercase tracking-[0.16em] text-taupe-500">{m.caption}</figcaption>}
            </figure>
          ))}
        </motion.div>
      </Wrap>

      {children}

      {/* ---------- final screens band ---------- */}
      <section className="relative bg-blush-100 py-16 sm:py-20">
        <Wrap>
          <motion.div {...reveal}>
            <Eyebrow>Final screens</Eyebrow>
            <h2 className="mt-4 font-display text-[clamp(2.2rem,4.6vw,3.8rem)] font-bold leading-tight text-ink">
              The companion <span className="italic text-taupe-500">app</span>
            </h2>
            <p className="mt-4 text-base text-taupe-600 sm:text-lg">{study.galleryNote}</p>
          </motion.div>
          <div className={`mt-14 grid grid-cols-3 gap-3 sm:gap-5 ${screensGrid}`}>
            {screens.map((g, i) => (
              <motion.figure
                key={g.src}
                {...reveal}
                transition={{ ...reveal.transition, delay: 0.07 * i }}
                whileHover={{ y: -10, rotate: i % 2 ? 2 : -2 }}
                className={`m-0 ${i % 2 ? "lg:mt-12" : ""}`}
              >
                <img
                  src={g.src}
                  alt={g.caption ?? ""}
                  loading="lazy"
                  className="block w-full rounded-[1.4rem] shadow-soft"
                  style={{ aspectRatio: "440 / 956" }}
                />
                <figcaption className="mt-3 text-center text-[10px] font-semibold uppercase tracking-[0.16em] text-taupe-500">{g.caption}</figcaption>
              </motion.figure>
            ))}
          </div>
        </Wrap>
      </section>

      {/* ---------- brand mark ---------- */}
      <Wrap className="relative py-16 sm:py-20">
        <motion.div {...reveal} className="flex flex-col items-start gap-6 sm:flex-row sm:items-center">
          <img src={brand.src} alt="FloraFlow brand mark" className="h-24 w-24 shrink-0 object-contain" />
          <div className="min-w-0 flex-1">
            <p className="font-display text-xl font-bold text-ink">Brand mark</p>
            <p className="mt-1 text-base text-taupe-600 sm:text-lg">{study.featuredNote}</p>
          </div>
        </motion.div>
      </Wrap>
    </div>
  );
}
