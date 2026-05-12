import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { motion } from "framer-motion";
import { getCaseStudy, type GalleryItem } from "../lib/site";
import { projectsHref } from "../lib/route";

export default function WorkDetailPage({ slug }: { slug: string }) {
  const study = getCaseStudy(slug);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "auto" });
  }, [slug]);

  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  if (!study) {
    return (
      <section className="relative min-h-screen bg-cream-100 pb-24 pt-40">
        <div className="mx-auto w-full max-w-[900px] px-6">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-taupe-400">
            404
          </p>
          <h1 className="mt-4 font-display text-display-md text-ink">
            Case study not found
          </h1>
          <p className="mt-4 text-taupe-500">
            That project doesn&rsquo;t have a write up yet.
          </p>
          <a
            href={projectsHref()}
            className="mt-8 inline-flex items-center gap-2 rounded-pill border border-taupe-300/60 px-5 py-2.5 text-sm font-semibold text-taupe-500 transition-colors hover:bg-blush-100"
          >
            <span aria-hidden>←</span> Browse all projects
          </a>
        </div>
      </section>
    );
  }

  const sectionIds = useMemo(
    () => study.sections.map((s) => slugify(s.heading)),
    [study]
  );

  const scrollToId = useCallback((id: string) => {
    const el = document.getElementById(id);
    if (!el) return;
    const top = el.getBoundingClientRect().top + window.scrollY - 96;
    window.scrollTo({ top, behavior: "smooth" });
  }, []);

  return (
    <article className="relative bg-cream-100 pb-32">
      <div
        aria-hidden
        className="pointer-events-none absolute right-[-10%] top-40 -z-0 h-96 w-96 rounded-full bg-blush-200/40 blur-3xl"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute left-[-10%] top-[60%] -z-0 h-80 w-80 rounded-full bg-taupe-100/40 blur-3xl"
      />

      {/* COMPACT LEFT-ALIGNED HEADER */}
      <header className="relative mx-auto w-full max-w-[1200px] px-6 pt-28 sm:px-10 sm:pt-32 lg:px-14">
        <a
          href={projectsHref()}
          className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.22em] text-taupe-400 transition-colors hover:text-taupe-500"
        >
          <span aria-hidden>←</span> All projects
        </a>

        <h1 className="mt-10 font-display text-[clamp(2.5rem,7vw,5.5rem)] font-medium leading-[1.02] tracking-[-0.02em] text-ink">
          {study.title}
        </h1>
        <p className="mt-6 max-w-2xl text-lg leading-relaxed text-taupe-500 sm:text-xl">
          {study.tagline}
        </p>

        <dl className="mt-10 grid grid-cols-2 gap-x-8 gap-y-6 border-t border-taupe-200/60 pt-8 sm:grid-cols-4">
          <MetaRow label="Role" value={study.meta.role} />
          <MetaRow label="Duration" value={study.meta.duration} />
          <MetaRow label="Timeline" value={study.meta.timeline} />
          <MetaRow label="Toolkit" value={study.meta.tools} />
        </dl>

        {study.skills.length > 0 && (
          <div className="mt-8">
            <p className="text-[0.68rem] font-semibold uppercase tracking-[0.22em] text-taupe-400">
              Skills applied
            </p>
            <ul className="mt-3 flex flex-wrap gap-2">
              {study.skills.map((s) => (
                <li
                  key={s}
                  className="rounded-pill border border-taupe-200/70 bg-cream-50 px-3.5 py-1.5 text-xs font-medium text-taupe-500"
                >
                  {s}
                </li>
              ))}
            </ul>
          </div>
        )}

        {study.externalLink && (
          <div className="mt-10">
            <a
              href={study.externalLink.href}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-2 rounded-pill bg-ink px-6 py-3 text-sm font-semibold text-cream-50 transition-colors hover:bg-taupe-500"
            >
              {study.externalLink.label}
              <span
                aria-hidden
                className="transition-transform group-hover:translate-x-1"
              >
                →
              </span>
            </a>
          </div>
        )}
      </header>

      {/* MAIN — two column with sticky TOC */}
      <div className="relative mx-auto mt-20 w-full max-w-[1200px] px-6 sm:px-10 lg:px-14">
        <div className="grid gap-12 lg:grid-cols-[220px_1fr] lg:gap-20">
          <aside className="hidden lg:block">
            <div className="sticky top-28">
              <p className="text-[0.7rem] font-semibold uppercase tracking-[0.24em] text-taupe-400">
                Contents
              </p>
              <ol className="mt-5 space-y-3 text-sm text-taupe-500">
                {study.sections.map((s, i) => (
                  <li key={s.heading}>
                    <button
                      type="button"
                      onClick={() => scrollToId(sectionIds[i])}
                      className="group flex w-full items-baseline gap-3 text-left transition-colors hover:text-ink"
                    >
                      <span className="font-mono text-[0.7rem] tracking-wider text-taupe-400 group-hover:text-blush-500">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <span className="leading-snug">{s.heading}</span>
                    </button>
                  </li>
                ))}
                {study.gallery.length > 0 && (
                  <li>
                    <button
                      type="button"
                      onClick={() => scrollToId("final-screens")}
                      className="group flex w-full items-baseline gap-3 text-left transition-colors hover:text-ink"
                    >
                      <span className="font-mono text-[0.7rem] tracking-wider text-taupe-400 group-hover:text-blush-500">
                        {String(study.sections.length + 1).padStart(2, "0")}
                      </span>
                      <span className="leading-snug">Final screens</span>
                    </button>
                  </li>
                )}
              </ol>
            </div>
          </aside>

          <div className="flex flex-col gap-24 sm:gap-28">
            {study.sections.map((s, i) => (
              <SectionBlock
                key={s.heading}
                id={sectionIds[i]}
                index={i}
                label={s.label}
                heading={s.heading}
                body={s.body}
                bullets={s.bullets}
                isResearch={s.heading.toLowerCase().includes("survey")}
              />
            ))}
          </div>
        </div>
      </div>

      {study.gallery.length > 0 && (
        <GallerySection
          heading={study.galleryHeading ?? "Final screens"}
          note={study.galleryNote}
          items={study.gallery}
          title={study.title}
          number={study.sections.length + 1}
          featuredNote={study.featuredNote}
          onOpen={setLightboxIndex}
        />
      )}

      {lightboxIndex !== null && (
        <Lightbox
          items={study.gallery}
          index={lightboxIndex}
          onClose={() => setLightboxIndex(null)}
          onChange={setLightboxIndex}
        />
      )}
    </article>
  );
}

function MetaRow({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <dt className="text-[0.68rem] font-semibold uppercase tracking-[0.22em] text-taupe-400">
        {label}
      </dt>
      <dd className="mt-1.5 text-[0.95rem] text-ink">{value}</dd>
    </div>
  );
}

function SectionBlock({
  id,
  index,
  label,
  heading,
  body,
  bullets,
  isResearch,
}: {
  id: string;
  index: number;
  label: string;
  heading: string;
  body: string;
  bullets?: string[];
  isResearch: boolean;
}) {
  const callout = isResearch
    ? {
        stat: "20 to 30 min",
        caption:
          "of focus before phone alerts, messages, or fatigue pull attention away. The single strongest signal from the survey.",
      }
    : null;

  return (
    <motion.section
      id={id}
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.55 }}
      className="relative scroll-mt-28"
    >
      <div className="flex items-baseline gap-4">
        <span
          aria-hidden
          className="font-display text-5xl font-medium leading-none text-blush-300 sm:text-6xl"
        >
          {String(index + 1).padStart(2, "0")}
        </span>
        <span className="text-[0.7rem] font-semibold uppercase tracking-[0.28em] text-taupe-400">
          {label.split("/")[1]?.trim() ?? label}
        </span>
      </div>

      <h2 className="mt-6 font-display text-[2rem] font-medium leading-[1.15] text-ink sm:text-[2.6rem]">
        {heading}
      </h2>

      <p className="mt-6 max-w-2xl text-base leading-relaxed text-taupe-500 sm:text-[1.05rem] sm:leading-[1.75]">
        {body}
      </p>

      {bullets && (
        <ul className="mt-10 grid gap-4 sm:grid-cols-2">
          {bullets.map((b, i) => (
            <li
              key={b}
              className="relative rounded-2xl border border-taupe-200/50 bg-cream-50 p-5"
            >
              <span className="font-mono text-[0.7rem] tracking-wider text-blush-500">
                {String(i + 1).padStart(2, "0")}
              </span>
              <p className="mt-2 text-[0.95rem] leading-relaxed text-ink">{b}</p>
            </li>
          ))}
        </ul>
      )}

      {callout && (
        <figure className="mt-10 overflow-hidden rounded-3xl bg-blush-200/70 p-8 sm:p-10">
          <blockquote>
            <p className="font-display text-5xl font-medium leading-none text-ink sm:text-7xl">
              {callout.stat}
            </p>
            <p className="mt-5 max-w-md text-[0.95rem] leading-relaxed text-taupe-500">
              {callout.caption}
            </p>
          </blockquote>
        </figure>
      )}
    </motion.section>
  );
}

function GallerySection({
  heading,
  note,
  items,
  title,
  number,
  featuredNote,
  onOpen,
}: {
  heading: string;
  note?: string;
  items: GalleryItem[];
  title: string;
  number: number;
  featuredNote?: string;
  onOpen: (i: number) => void;
}) {
  const scrollerRef = useRef<HTMLDivElement>(null);
  const [pos, setPos] = useState({ atStart: true, atEnd: false });

  const featuredIdx = items.findIndex((g) => g.aspect === "square");
  const rest = items
    .map((g, i) => ({ g, i }))
    .filter(({ i }) => i !== featuredIdx);
  const featured = featuredIdx >= 0 ? items[featuredIdx] : null;

  const updateEdges = () => {
    const el = scrollerRef.current;
    if (!el) return;
    setPos({
      atStart: el.scrollLeft <= 4,
      atEnd: el.scrollLeft + el.clientWidth >= el.scrollWidth - 4,
    });
  };

  useEffect(() => {
    updateEdges();
    const el = scrollerRef.current;
    if (!el) return;
    el.addEventListener("scroll", updateEdges, { passive: true });
    window.addEventListener("resize", updateEdges);
    return () => {
      el.removeEventListener("scroll", updateEdges);
      window.removeEventListener("resize", updateEdges);
    };
  }, []);

  const scrollBy = (dir: 1 | -1) => {
    const el = scrollerRef.current;
    if (!el) return;
    el.scrollBy({ left: dir * el.clientWidth * 0.7, behavior: "smooth" });
  };

  return (
    <section
      id="final-screens"
      className="relative mt-24 overflow-hidden bg-ink py-20 text-cream-50 scroll-mt-28 sm:mt-32 sm:py-28"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute -left-20 top-20 h-72 w-72 rounded-full bg-blush-300/20 blur-3xl"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -right-20 bottom-10 h-80 w-80 rounded-full bg-blush-400/10 blur-3xl"
      />

      <div className="relative mx-auto w-full max-w-[1300px] px-6 sm:px-10 lg:px-14">
        <div className="flex items-baseline gap-4">
          <span
            aria-hidden
            className="font-display text-5xl font-medium leading-none text-blush-300 sm:text-6xl"
          >
            {String(number).padStart(2, "0")}
          </span>
          <span className="text-[0.7rem] font-semibold uppercase tracking-[0.28em] text-cream-50/60">
            Final screens
          </span>
        </div>
        <h2 className="mt-6 font-display text-4xl font-medium sm:text-6xl">
          {heading}
        </h2>
        {note && (
          <p className="mt-4 max-w-xl text-base leading-relaxed text-cream-50/70">
            {note}
          </p>
        )}

        {/* Featured brand mark */}
        {featured && featured.kind !== "video" && (
          <button
            type="button"
            onClick={() => onOpen(featuredIdx)}
            className="mt-14 flex w-full items-center gap-8 rounded-3xl border border-cream-50/10 bg-cream-50/[0.04] p-6 text-left transition-colors hover:bg-cream-50/[0.08] sm:p-10"
          >
            <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-2xl bg-cream-50 sm:h-32 sm:w-32">
              <img
                src={featured.src}
                alt={`${title} brand mark`}
                className="h-full w-full object-contain p-3"
              />
            </div>
            <div>
              <p className="text-[0.7rem] font-semibold uppercase tracking-[0.22em] text-cream-50/60">
                Identity · Click to expand
              </p>
              <p className="mt-2 font-display text-2xl sm:text-3xl">
                {featured.caption ?? "Brand mark"}
              </p>
              {featuredNote && (
                <p className="mt-2 max-w-sm text-sm text-cream-50/60">
                  {featuredNote}
                </p>
              )}
            </div>
          </button>
        )}

        {/* Scrollable strip with controls */}
        <div className="relative mt-12">
          <div className="mb-4 flex items-center justify-between text-[0.7rem] uppercase tracking-[0.22em] text-cream-50/60">
            <span>Drag, scroll, or use the arrows</span>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => scrollBy(-1)}
                disabled={pos.atStart}
                aria-label="Scroll previous"
                className="grid h-9 w-9 place-items-center rounded-full border border-cream-50/20 transition-colors hover:bg-cream-50/10 disabled:cursor-not-allowed disabled:opacity-30"
              >
                <span aria-hidden>←</span>
              </button>
              <button
                type="button"
                onClick={() => scrollBy(1)}
                disabled={pos.atEnd}
                aria-label="Scroll next"
                className="grid h-9 w-9 place-items-center rounded-full border border-cream-50/20 transition-colors hover:bg-cream-50/10 disabled:cursor-not-allowed disabled:opacity-30"
              >
                <span aria-hidden>→</span>
              </button>
            </div>
          </div>

          <div
            ref={scrollerRef}
            className="flex snap-x snap-mandatory gap-5 overflow-x-auto pb-6"
            style={{ scrollbarColor: "rgba(253,237,237,0.3) transparent" }}
          >
            {rest.map(({ g, i }) => (
              <GalleryThumb
                key={g.src}
                item={g}
                title={title}
                onClick={() => onOpen(i)}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function GalleryThumb({
  item,
  title,
  onClick,
}: {
  item: GalleryItem;
  title: string;
  onClick: () => void;
}) {
  const isVideo = item.kind === "video";
  const aspectClass =
    item.aspect === "square" ? "aspect-square" : "aspect-[9/19]";
  const widthClass = "w-[58%] sm:w-[40%] md:w-[30%] lg:w-[22%]";

  return (
    <motion.figure
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.1 }}
      transition={{ duration: 0.5 }}
      className={`group relative flex-shrink-0 snap-center ${widthClass}`}
    >
      <button
        type="button"
        onClick={onClick}
        className={`relative block w-full overflow-hidden rounded-[2rem] ring-1 ring-cream-50/10 transition-transform hover:scale-[1.02] ${aspectClass} ${
          isVideo ? "bg-ink" : "bg-gradient-to-br from-blush-200 to-cream-200"
        }`}
      >
        {isVideo ? (
          <>
            <video
              src={`${item.src}#t=0.1`}
              muted
              playsInline
              preload="metadata"
              className="absolute inset-0 h-full w-full object-contain"
            />
            <div className="pointer-events-none absolute inset-0 grid place-items-center bg-ink/15">
              <span className="grid h-16 w-16 place-items-center rounded-full bg-cream-50/90 text-ink">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                  <path d="M8 5v14l11-7z" />
                </svg>
              </span>
            </div>
          </>
        ) : (
          <img
            src={item.src}
            alt={item.caption ?? `${title} screen`}
            loading="lazy"
            className="absolute inset-0 h-full w-full object-cover"
          />
        )}
      </button>
      <figcaption className="mt-4 text-[0.7rem] uppercase tracking-[0.22em] text-cream-50/60">
        {item.caption ?? "Tap to expand"}
      </figcaption>
    </motion.figure>
  );
}

function Lightbox({
  items,
  index,
  onClose,
  onChange,
}: {
  items: GalleryItem[];
  index: number;
  onClose: () => void;
  onChange: (i: number) => void;
}) {
  const item = items[index];

  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") onChange((index + 1) % items.length);
      if (e.key === "ArrowLeft") onChange((index - 1 + items.length) % items.length);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [index, items.length, onChange, onClose]);

  if (!item) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      onClick={onClose}
      className="fixed inset-0 z-[100] flex flex-col bg-ink/90 backdrop-blur-sm"
    >
      <div className="flex items-center justify-between p-5 text-cream-50">
        <span className="font-mono text-xs tracking-[0.22em] text-cream-50/70">
          {String(index + 1).padStart(2, "0")} / {String(items.length).padStart(2, "0")}
        </span>
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            onClose();
          }}
          aria-label="Close"
          className="grid h-10 w-10 place-items-center rounded-full border border-cream-50/20 transition-colors hover:bg-cream-50/10"
        >
          <span aria-hidden className="text-lg">×</span>
        </button>
      </div>

      <div className="relative flex min-h-0 flex-1 items-center justify-center px-16 pb-4 sm:px-20">
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            onChange((index - 1 + items.length) % items.length);
          }}
          aria-label="Previous"
          className="absolute left-4 top-1/2 z-10 grid h-12 w-12 -translate-y-1/2 place-items-center rounded-full border border-cream-50/20 text-cream-50 transition-colors hover:bg-cream-50/10 sm:left-8"
        >
          <span aria-hidden>←</span>
        </button>

        {item.kind === "video" ? (
          <video
            key={item.src}
            src={item.src}
            poster={item.poster}
            controls
            autoPlay
            playsInline
            onClick={(e) => e.stopPropagation()}
            className="h-auto max-h-full w-auto max-w-full rounded-xl"
          />
        ) : (
          <img
            src={item.src}
            alt={item.caption ?? "Expanded design"}
            onClick={(e) => e.stopPropagation()}
            className="h-auto max-h-full w-auto max-w-full rounded-xl object-contain"
          />
        )}

        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            onChange((index + 1) % items.length);
          }}
          aria-label="Next"
          className="absolute right-4 top-1/2 z-10 grid h-12 w-12 -translate-y-1/2 place-items-center rounded-full border border-cream-50/20 text-cream-50 transition-colors hover:bg-cream-50/10 sm:right-8"
        >
          <span aria-hidden>→</span>
        </button>
      </div>

      {item.caption && (
        <p className="flex-shrink-0 px-5 pb-6 text-center text-sm text-cream-50/70">
          {item.caption}
        </p>
      )}
    </div>
  );
}

function slugify(s: string) {
  return s
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}
