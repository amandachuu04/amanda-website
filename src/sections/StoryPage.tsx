import { createContext, CSSProperties, ReactNode, useContext, useMemo, useState } from "react";
import { motion } from "framer-motion";
import { CaseStudy } from "../lib/site";
import { projectsHref } from "../lib/route";
import Lightbox, { LightboxItem } from "../components/Lightbox";

export const reveal = {
  initial: { opacity: 0, y: 28 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-60px" },
  transition: { duration: 0.6, ease: "easeOut" as const },
};

export function Eyebrow({ children }: { children: ReactNode }) {
  return (
    <span className="section-eyebrow">
      <span aria-hidden className="inline-block h-1.5 w-6 rounded-full bg-blush-300" />
      {children}
    </span>
  );
}

export function Wrap({ className = "", children }: { className?: string; children: ReactNode }) {
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

const ZoomContext = createContext<(item: LightboxItem) => void>(() => {});

export function Zoomable({ src, alt = "", caption, className = "", style }: { src: string; alt?: string; caption?: string; className?: string; style?: CSSProperties }) {
  const open = useContext(ZoomContext);
  return (
    <button type="button" aria-label={`Enlarge ${alt || caption || "image"}`} onClick={() => open({ kind: "image", src, alt, caption })} className="block w-full cursor-zoom-in">
      <img src={src} alt={alt} loading="lazy" className={className} style={style} />
    </button>
  );
}

const captionClass = "mt-3 text-center text-[10px] font-semibold uppercase tracking-[0.16em] text-taupe-500";

export function ScreensBand({
  title,
  note,
  groups,
  grid,
}: {
  title: ReactNode;
  note?: string;
  groups: { label?: string; items: { src: string; caption?: string }[] }[];
  grid: string;
}) {
  return (
    <section className="relative bg-blush-100 py-16 sm:py-20">
      <Wrap>
        <motion.div {...reveal}>
          <Eyebrow>Final screens</Eyebrow>
          <h2 className="mt-4 font-display text-[clamp(2.2rem,4.6vw,3.8rem)] font-bold leading-tight text-ink">{title}</h2>
          {note && <p className="mt-4 text-base text-taupe-600 sm:text-lg">{note}</p>}
        </motion.div>
        {groups.map((g) => (
          <div key={g.label ?? "screens"} className="mt-14">
            {g.label && <h3 className="mb-6 font-display text-2xl font-bold text-ink">{g.label}</h3>}
            <div className={`grid grid-cols-3 gap-3 sm:gap-5 ${grid}`}>
              {g.items.map((item, i) => (
                <motion.figure
                  key={item.src + i}
                  {...reveal}
                  transition={{ ...reveal.transition, delay: 0.05 * Math.min(i, 6) }}
                  whileHover={{ y: -10, rotate: i % 2 ? 2 : -2 }}
                  className={`m-0 ${i % 2 && g.items.length <= 6 ? "lg:mt-12" : ""}`}
                >
                  <Zoomable src={item.src} alt={item.caption} caption={item.caption} className="block w-full rounded-[1.4rem] shadow-soft" />
                  <figcaption className={captionClass}>{item.caption}</figcaption>
                </motion.figure>
              ))}
            </div>
          </div>
        ))}
      </Wrap>
    </section>
  );
}

type Props = {
  study: Pick<CaseStudy, "title" | "tagline" | "meta" | "skills" | "externalLink">;
  media: StoryMedia[];
  band?: ReactNode;
  after?: ReactNode;
  brand?: { src: string; note?: string };
  children: ReactNode;
};

function factList(meta: CaseStudy["meta"]) {
  const showLanguage = meta.language && !meta.tools.includes(meta.language);
  const fontLabel = meta.fonts && /[,&]/.test(meta.fonts) ? "Fonts" : "Font";
  const facts: [string, string | undefined][] = [
    ["Role", meta.role],
    ["Timeline", meta.timeline],
    ["Duration", meta.duration],
    ["Tools", meta.tools],
    ["Language", showLanguage ? meta.language : undefined],
    ["Variations", meta.variations],
    [fontLabel, meta.fonts],
    ["Size", meta.size],
  ];
  return facts.filter((f): f is [string, string] => Boolean(f[1]));
}

export default function StoryPage({ study, media, band, after, brand, children }: Props) {
  const [zoomed, setZoomed] = useState<LightboxItem | null>(null);
  const zoom = useMemo(() => (item: LightboxItem) => setZoomed(item), []);
  const facts = factList(study.meta);
  const rowWidth = Math.min(1400, media.reduce((sum, m) => sum + m.ratio, 0) * 1000);

  return (
    <ZoomContext.Provider value={zoom}>
    <div className="relative w-full overflow-hidden bg-cream-100 pt-28 sm:pt-32">
      <div aria-hidden className="pointer-events-none absolute inset-0 grain opacity-50" />

      {/* ---------- hero ---------- */}
      <Wrap className="relative">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
          <a href={projectsHref()} className="text-xs font-semibold uppercase tracking-[0.18em] text-taupe-400 hover:text-taupe-500">
            ← All projects
          </a>
          <h1 className={`mt-6 font-display ${study.title.length > 14 ? "text-[clamp(2.8rem,8vw,6.5rem)]" : "text-[clamp(3.6rem,12vw,10rem)]"} font-bold leading-[0.95] tracking-tight text-ink`}>{study.title}</h1>
          <p className="mt-6 text-lg text-taupe-500 sm:text-xl">{study.tagline}</p>
          <dl className="mt-8 grid grid-cols-2 gap-x-8 gap-y-4 md:grid-cols-3 lg:flex lg:justify-between">
            {facts.map(([k, v]) => (
              <div key={k} className={v.length <= 12 ? "whitespace-nowrap" : ""}>
                <dt className="text-[10px] font-semibold uppercase tracking-[0.2em] text-taupe-400">{k}</dt>
                {v.length > 60 ? (
                  <dd className="mt-0.5">
                    <ul className="font-display text-base font-bold text-ink">
                      {v.split(", ").map((item) => (
                        <li key={item} className="py-0.5">{item}</li>
                      ))}
                    </ul>
                  </dd>
                ) : (
                  <dd className="mt-1 font-display text-base font-bold text-ink">{v}</dd>
                )}
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
      {media.length === 0 && <div className="h-12 sm:h-16" />}
      {media.length > 0 && (
      <Wrap className="relative mb-16 mt-14 sm:mb-20 sm:mt-20">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.15, ease: "easeOut" }}
          className="mx-auto flex flex-col gap-4 md:flex-row lg:gap-5"
          style={{ maxWidth: rowWidth }}
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
                  <Zoomable src={m.src} alt={m.alt} caption={m.caption} className="h-full w-full object-cover" style={{ aspectRatio: m.ratio }} />
                )}
              </div>
              {m.caption && <figcaption className={captionClass}>{m.caption}</figcaption>}
            </figure>
          ))}
        </motion.div>
      </Wrap>
      )}

      {children}

      {band}
      {after}

      {brand && (
        <Wrap className="relative py-16 sm:py-20">
          <motion.div {...reveal} className="flex flex-col items-start gap-6 sm:flex-row sm:items-center">
            <img src={brand.src} alt="Brand mark" className="h-24 w-24 shrink-0 object-contain" />
            <div className="min-w-0 flex-1">
              <p className="font-display text-xl font-bold text-ink">Brand mark</p>
              <p className="mt-1 text-base text-taupe-600 sm:text-lg">{brand.note}</p>
            </div>
          </motion.div>
        </Wrap>
      )}
      {zoomed && <Lightbox items={[zoomed]} index={0} onClose={() => setZoomed(null)} onChange={() => {}} />}
    </div>
    </ZoomContext.Provider>
  );
}
