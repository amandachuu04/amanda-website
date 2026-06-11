import { useCallback, useEffect, useMemo, useRef, useState, type MouseEvent as ReactMouseEvent } from "react";
import { motion } from "framer-motion";
import {
  getCaseStudy,
  type CaseStudy,
  type GalleryFlow,
  type GalleryItem,
  type SectionMedia,
  type SectionMediaItem,
} from "../lib/site";
import { projectsHref } from "../lib/route";

type LightboxEntry =
  | { kind: "image"; src: string; caption?: string }
  | { kind: "video"; src: string; poster?: string; caption?: string };

export default function WorkDetailPage({ slug }: { slug: string }) {
  const study = getCaseStudy(slug);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "auto" });
  }, [slug]);

  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const sectionMediaStartIndex = useMemo<number[]>(() => {
    if (!study) return [];
    const indexes: number[] = [];
    let running = 0;
    for (const section of study.sections) {
      indexes.push(running);
      running +=
        countSectionMediaItems(section.media) +
        countSectionMediaItems(section.extraMedia);
    }
    return indexes;
  }, [study]);

  const lightboxItems = useMemo<LightboxEntry[]>(() => {
    if (!study) return [];
    const entries: LightboxEntry[] = [];
    for (const section of study.sections) {
      const items = [
        ...flattenSectionMedia(section.media),
        ...flattenSectionMedia(section.extraMedia),
      ];
      for (const item of items) {
        entries.push(sectionItemToEntry(item));
      }
    }
    for (const g of study.gallery) {
      if (g.kind === "video") {
        entries.push({ kind: "video", src: g.src, poster: g.poster, caption: g.caption });
      } else {
        entries.push({ kind: "image", src: g.src, caption: g.caption });
      }
    }
    for (const section of study.endSections ?? []) {
      const items = [
        ...flattenSectionMedia(section.media),
        ...flattenSectionMedia(section.extraMedia),
      ];
      for (const item of items) {
        entries.push(sectionItemToEntry(item));
      }
    }
    return entries;
  }, [study]);

  const galleryStartIndex = useMemo(() => {
    if (!study) return 0;
    return study.sections.reduce(
      (sum, s) =>
        sum +
        countSectionMediaItems(s.media) +
        countSectionMediaItems(s.extraMedia),
      0
    );
  }, [study]);

  const endSectionMediaStartIndex = useMemo<number[]>(() => {
    if (!study) return [];
    const indexes: number[] = [];
    let running = galleryStartIndex + study.gallery.length;
    for (const section of study.endSections ?? []) {
      indexes.push(running);
      running +=
        countSectionMediaItems(section.media) +
        countSectionMediaItems(section.extraMedia);
    }
    return indexes;
  }, [study, galleryStartIndex]);

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
            className="group mt-8 inline-flex items-center gap-2 rounded-pill border border-taupe-300/60 px-5 py-2.5 text-sm font-semibold text-taupe-500 transition-colors hover:bg-blush-100"
          >
            <span aria-hidden className="inline-block transition-transform duration-300 group-hover:-translate-x-1">←</span> Browse all projects
          </a>
        </div>
      </section>
    );
  }

  const sectionIds = useMemo(
    () => study.sections.map((s) => slugify(s.heading)),
    [study]
  );

  const endSectionIds = useMemo(
    () => (study.endSections ?? []).map((s) => slugify(s.heading)),
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
      <header className="relative mx-auto w-full max-w-[1500px] px-6 pt-28 sm:px-10 sm:pt-32 lg:px-14 xl:px-24">
        <motion.a
          href={projectsHref()}
          initial={{ opacity: 0, x: -8 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="group inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.22em] text-taupe-400 transition-colors hover:text-taupe-500"
        >
          <span aria-hidden className="inline-block transition-transform duration-300 group-hover:-translate-x-1">←</span> All projects
        </motion.a>

        <motion.h1
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.05 }}
          className="mt-10 font-display text-[clamp(2.5rem,7vw,5.5rem)] font-medium leading-[1.02] tracking-[-0.02em] text-ink"
        >
          {study.title}
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="mt-6 text-lg leading-relaxed text-taupe-500 sm:text-xl"
        >
          {study.tagline}
        </motion.p>

        {study.category === "programming" ? (
          <motion.dl
            initial="hidden"
            animate="show"
            variants={{
              hidden: {},
              show: { transition: { staggerChildren: 0.05, delayChildren: 0.25 } },
            }}
            className="mt-10 grid w-full grid-cols-3 gap-x-8 gap-y-6 border-t border-taupe-200/60 pt-8"
          >
            <MetaRow label="Language" value={study.meta.language ?? study.meta.tools} />
            <MetaRow label="Duration" value={study.meta.duration} />
            <MetaRow label="Timeline" value={study.meta.timeline} />
          </motion.dl>
        ) : (
          <DesignMetaGrid meta={study.meta} />
        )}

        {study.skills.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="mt-8"
          >
            <p className="text-[0.68rem] font-semibold uppercase tracking-[0.22em] text-taupe-400">
              Skills applied
            </p>
            <motion.ul
              initial="hidden"
              animate="show"
              variants={{
                hidden: {},
                show: { transition: { staggerChildren: 0.04, delayChildren: 0.35 } },
              }}
              className="mt-3 flex flex-wrap gap-2"
            >
              {study.skills.map((s) => (
                <motion.li
                  key={s}
                  variants={{
                    hidden: { opacity: 0, y: 6, scale: 0.92 },
                    show: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.4 } },
                  }}
                  whileHover={{ y: -3, scale: 1.04 }}
                  className="cursor-default rounded-pill border border-taupe-200/70 bg-cream-50 px-3.5 py-1.5 text-xs font-medium text-taupe-500 transition-colors hover:border-blush-300/70 hover:text-ink"
                >
                  {s}
                </motion.li>
              ))}
            </motion.ul>
          </motion.div>
        )}

        {study.externalLink && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="mt-10"
          >
            <motion.a
              href={study.externalLink.href}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.97 }}
              transition={{ type: "spring", stiffness: 320, damping: 18 }}
              className="group relative inline-flex items-center gap-2 rounded-pill bg-ink px-6 py-3 text-sm font-semibold text-cream-50 transition-colors hover:bg-taupe-500"
            >
              {study.externalLink.label}
              <span className="inline-flex w-4 overflow-hidden">
                <span
                  aria-hidden
                  className="inline-block transition-transform duration-300 group-hover:translate-x-1"
                >
                  →
                </span>
              </span>
            </motion.a>
          </motion.div>
        )}
      </header>

      {/* MAIN — two column with sticky TOC */}
      <div className="relative mx-auto mt-20 w-full max-w-[1500px] px-6 sm:px-10 lg:px-14 xl:px-24">
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
                      <span className="font-mono text-[0.7rem] tracking-wider text-taupe-400 transition-colors group-hover:text-blush-500">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <span className="leading-snug transition-transform duration-300 group-hover:translate-x-1">{s.heading}</span>
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
                      <span className="font-mono text-[0.7rem] tracking-wider text-taupe-400 transition-colors group-hover:text-blush-500">
                        {String(study.sections.length + 1).padStart(2, "0")}
                      </span>
                      <span className="leading-snug transition-transform duration-300 group-hover:translate-x-1">Final screens</span>
                    </button>
                  </li>
                )}
                {(study.endSections ?? []).map((s, i) => {
                  const number =
                    study.sections.length + (study.gallery.length > 0 ? 2 : 1) + i;
                  return (
                    <li key={s.heading}>
                      <button
                        type="button"
                        onClick={() => scrollToId(endSectionIds[i])}
                        className="group flex w-full items-baseline gap-3 text-left transition-colors hover:text-ink"
                      >
                        <span className="font-mono text-[0.7rem] tracking-wider text-taupe-400 transition-colors group-hover:text-blush-500">
                          {String(number).padStart(2, "0")}
                        </span>
                        <span className="leading-snug transition-transform duration-300 group-hover:translate-x-1">
                          {s.heading}
                        </span>
                      </button>
                    </li>
                  );
                })}
              </ol>
            </div>
          </aside>

          <div className="flex min-w-0 flex-col gap-24 sm:gap-28">
            {study.sections.map((s, i) => (
              <SectionBlock
                key={s.heading}
                id={sectionIds[i]}
                index={i}
                label={s.label}
                heading={s.heading}
                body={s.body}
                bullets={s.bullets}
                media={s.media}
                extraMedia={s.extraMedia}
                onOpenMedia={(localIndex) =>
                  setLightboxIndex(sectionMediaStartIndex[i] + localIndex)
                }
              />
            ))}

            {study.gallery.length > 0 && (
              <GallerySection
                heading={study.galleryHeading ?? "Final screens"}
                note={study.galleryNote}
                items={study.gallery}
                flows={study.galleryFlows}
                title={study.title}
                number={study.sections.length + 1}
                featuredNote={study.featuredNote}
                onOpen={(localIndex) => setLightboxIndex(galleryStartIndex + localIndex)}
              />
            )}

            {(study.endSections ?? []).map((s, i) => (
              <SectionBlock
                key={s.heading}
                id={endSectionIds[i]}
                index={
                  study.sections.length + (study.gallery.length > 0 ? 1 : 0) + i
                }
                label={s.label}
                heading={s.heading}
                body={s.body}
                bullets={s.bullets}
                media={s.media}
                extraMedia={s.extraMedia}
                onOpenMedia={(localIndex) =>
                  setLightboxIndex(endSectionMediaStartIndex[i] + localIndex)
                }
              />
            ))}
          </div>
        </div>
      </div>

      {lightboxIndex !== null && (
        <Lightbox
          items={lightboxItems}
          index={lightboxIndex}
          onClose={() => setLightboxIndex(null)}
          onChange={setLightboxIndex}
        />
      )}
    </article>
  );
}

function countSectionMediaItems(media?: SectionMedia): number {
  if (!media) return 0;
  if (media.layout === "single") return 1;
  return media.items.length;
}

function flattenSectionMedia(media?: SectionMedia): SectionMediaItem[] {
  if (!media) return [];
  if (media.layout === "single") return [media.item];
  return media.items;
}

function sectionItemToEntry(item: SectionMediaItem): LightboxEntry {
  if (item.kind === "video") {
    return { kind: "video", src: item.src, poster: item.poster, caption: item.caption };
  }
  return { kind: "image", src: item.src, caption: item.caption };
}

function DesignMetaGrid({ meta }: { meta: CaseStudy["meta"] }) {
  const fields: Array<{ label: string; value?: string }> = [];
  if (meta.variations !== undefined) fields.push({ label: "Variation(s)", value: meta.variations });
  if (meta.fonts !== undefined) fields.push({ label: "Font(s)", value: meta.fonts });
  if (meta.size !== undefined) fields.push({ label: "Size", value: meta.size });
  fields.push({ label: "Duration", value: meta.duration });
  fields.push({ label: "Timeline", value: meta.timeline });
  fields.push({ label: "Tool(s)", value: meta.tools });

  const colsByCount: Record<number, string> = {
    3: "grid-cols-3",
    4: "grid-cols-2 sm:grid-cols-4",
    5: "grid-cols-2 sm:grid-cols-3 lg:grid-cols-5",
    6: "grid-cols-2 sm:grid-cols-3 lg:grid-cols-6",
  };
  const cols = colsByCount[fields.length] ?? "grid-cols-2 sm:grid-cols-3";

  return (
    <motion.dl
      initial="hidden"
      animate="show"
      variants={{
        hidden: {},
        show: { transition: { staggerChildren: 0.05, delayChildren: 0.25 } },
      }}
      className={`mt-10 grid w-full gap-x-8 gap-y-6 border-t border-taupe-200/60 pt-8 ${cols}`}
    >
      {fields.map((f) => (
        <MetaRow key={f.label} label={f.label} value={f.value} />
      ))}
    </motion.dl>
  );
}

function MetaRow({ label, value }: { label: string; value?: string }) {
  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 8 },
        show: { opacity: 1, y: 0, transition: { duration: 0.4 } },
      }}
    >
      <dt className="text-[0.68rem] font-semibold uppercase tracking-[0.22em] text-taupe-400">
        {label}
      </dt>
      <dd className="mt-1.5 text-[0.95rem] text-ink">{value || " "}</dd>
    </motion.div>
  );
}

function SectionBlock({
  id,
  index,
  label,
  heading,
  body,
  bullets,
  media,
  extraMedia,
  onOpenMedia,
}: {
  id: string;
  index: number;
  label: string;
  heading: string;
  body: string;
  bullets?: string[];
  media?: SectionMedia;
  extraMedia?: SectionMedia;
  onOpenMedia: (localIndex: number) => void;
}) {
  const mediaCount = countSectionMediaItems(media);

  return (
    <motion.section
      id={id}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.15 }}
      variants={{
        hidden: { opacity: 0, y: 18 },
        show: {
          opacity: 1,
          y: 0,
          transition: { duration: 0.55, when: "beforeChildren", staggerChildren: 0.05 },
        },
      }}
      className="relative scroll-mt-28"
    >
      <div className="flex items-baseline gap-4">
        <motion.span
          aria-hidden
          initial={{ opacity: 0, scale: 0.6 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ type: "spring", stiffness: 220, damping: 14, delay: 0.1 }}
          className="font-display text-5xl font-medium leading-none text-blush-300 sm:text-6xl"
        >
          {String(index + 1).padStart(2, "0")}
        </motion.span>
        <span className="text-[0.7rem] font-semibold uppercase tracking-[0.28em] text-taupe-400">
          {label.split("/")[1]?.trim() ?? label}
        </span>
      </div>

      <h2 className="mt-6 font-display text-[2rem] font-medium leading-[1.15] text-ink sm:text-[2.6rem]">
        {heading}
      </h2>

      <div className="mt-6 space-y-5 text-base leading-relaxed text-taupe-500 sm:text-[1.05rem] sm:leading-[1.75]">
        {body.split("\n\n").map((paragraph, i) => (
          <p key={i}>{paragraph}</p>
        ))}
      </div>

      {bullets && (
        <motion.ul
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.1 }}
          variants={{
            hidden: {},
            show: { transition: { staggerChildren: 0.06, delayChildren: 0.1 } },
          }}
          className="mt-10 grid gap-4 sm:grid-flow-col sm:grid-cols-2"
          style={{
            gridTemplateRows: `repeat(${Math.ceil(bullets.length / 2)}, auto)`,
          }}
        >
          {bullets.map((b, i) => (
            <motion.li
              key={b}
              variants={{
                hidden: { opacity: 0, y: 12 },
                show: { opacity: 1, y: 0, transition: { duration: 0.45 } },
              }}
              whileHover={{ y: -3 }}
              transition={{ type: "spring", stiffness: 260, damping: 18 }}
              className="relative rounded-2xl border border-taupe-200/50 bg-cream-50 p-5 transition-shadow hover:shadow-soft"
            >
              <span className="font-mono text-[0.7rem] tracking-wider text-blush-500">
                {String(i + 1).padStart(2, "0")}
              </span>
              <p className="mt-2 text-[0.95rem] leading-relaxed text-ink">{b}</p>
            </motion.li>
          ))}
        </motion.ul>
      )}

      {media && <SectionMediaBlock media={media} onOpen={onOpenMedia} />}
      {extraMedia && (
        <SectionMediaBlock
          media={extraMedia}
          onOpen={(localIndex) => onOpenMedia(mediaCount + localIndex)}
        />
      )}
    </motion.section>
  );
}

function SectionMediaBlock({
  media,
  onOpen,
}: {
  media: SectionMedia;
  onOpen: (localIndex: number) => void;
}) {
  if (media.layout === "single") {
    return (
      <div className="mt-10">
        <MediaTile
          item={media.item}
          frame={media.frame ?? "auto"}
          tone={media.tone ?? "light"}
          onOpen={() => onOpen(0)}
        />
      </div>
    );
  }

  if (media.layout === "phones") {
    return (
      <div className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-3 sm:gap-5 lg:grid-cols-4 lg:gap-6">
        {media.items.map((item, i) => (
          <MediaTile
            key={`${item.src}-${i}`}
            item={item}
            frame="phone"
            tone={media.tone ?? "light"}
            onOpen={() => onOpen(i)}
          />
        ))}
      </div>
    );
  }

  const cols = media.cols ?? 2;
  const colsClass =
    cols === 4
      ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-4"
      : cols === 3
      ? "grid-cols-1 sm:grid-cols-3"
      : "grid-cols-1 sm:grid-cols-2";

  return (
    <div className={`mt-10 grid gap-5 sm:gap-6 ${colsClass}`}>
      {media.items.map((item, i) => (
        <MediaTile
          key={`${item.src}-${i}`}
          item={item}
          frame={media.frame ?? "auto"}
          tone={media.tone ?? "light"}
          onOpen={() => onOpen(i)}
        />
      ))}
    </div>
  );
}

function MediaTile({
  item,
  frame,
  tone,
  onOpen,
}: {
  item: SectionMediaItem;
  frame: "phone" | "iphone" | "wide" | "square" | "auto";
  tone: "light" | "dark";
  onOpen: () => void;
}) {
  if (frame === "iphone") {
    return <IPhoneFrame item={item} onOpen={onOpen} />;
  }

  const isVideo = item.kind === "video";
  const aspectClass =
    frame === "phone"
      ? "aspect-[9/19]"
      : frame === "square"
      ? "aspect-square"
      : frame === "wide"
      ? "aspect-[16/9]"
      : "";
  const bgClass = tone === "dark" ? "bg-ink" : "bg-cream-50";
  const fitClass = frame === "phone" ? "object-cover" : "object-contain";

  return (
    <figure className="group flex flex-col">
      <motion.button
        type="button"
        onClick={onOpen}
        aria-label={isVideo ? "Play video" : item.alt ?? item.caption ?? "Expand image"}
        whileHover={{ y: -3 }}
        whileTap={{ scale: 0.99 }}
        transition={{ type: "spring", stiffness: 260, damping: 20 }}
        className={`relative block w-full overflow-hidden rounded-2xl ring-1 ring-taupe-200/60 shadow-card transition-shadow hover:shadow-soft ${bgClass} ${aspectClass}`}
      >
        {isVideo ? (
          <>
            <video
              src={`${item.src}#t=0.1`}
              poster={item.poster}
              muted
              playsInline
              preload="metadata"
              className={`${aspectClass ? "absolute inset-0 h-full w-full" : "block h-auto w-full"} ${fitClass} transition-transform duration-500 group-hover:scale-[1.02]`}
            />
            <div className="pointer-events-none absolute inset-0 grid place-items-center bg-ink/15 transition-colors group-hover:bg-ink/25">
              <motion.span
                className="grid h-16 w-16 place-items-center rounded-full bg-cream-50/90 text-ink"
                animate={{ scale: [1, 1.06, 1] }}
                transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
              >
                <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                  <path d="M8 5v14l11-7z" />
                </svg>
              </motion.span>
            </div>
          </>
        ) : (
          <img
            src={item.src}
            alt={item.alt ?? item.caption ?? "Project image"}
            loading="lazy"
            className={`${aspectClass ? "absolute inset-0 h-full w-full" : "block h-auto w-full"} ${fitClass} transition-transform duration-500 group-hover:scale-[1.02]`}
          />
        )}
      </motion.button>
      {item.caption && (
        <figcaption className="mt-3 text-[0.7rem] uppercase tracking-[0.22em] text-taupe-400">
          {item.caption}
        </figcaption>
      )}
    </figure>
  );
}

function IPhoneFrame({
  item,
  onOpen,
}: {
  item: SectionMediaItem;
  onOpen: () => void;
}) {
  const isVideo = item.kind === "video";
  const [isPlaying, setIsPlaying] = useState(false);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  const startVideo = () => {
    const v = videoRef.current;
    if (!v) return;
    setIsPlaying(true);
    v.currentTime = 0;
    void v.play().catch(() => setIsPlaying(false));
  };

  return (
    <figure className="group flex flex-col items-center">
      <motion.div
        whileHover={{ y: -4 }}
        transition={{ type: "spring", stiffness: 260, damping: 20 }}
        className="relative block w-[min(280px,72vw)] sm:w-[min(320px,52vw)] md:w-[min(340px,38vw)] lg:w-[320px]"
      >
        {/* Outer bezel */}
        <div className="relative rounded-[2.6rem] bg-ink p-[10px] shadow-[0_30px_60px_-15px_rgba(31,28,28,0.45),0_0_0_1px_rgba(255,255,255,0.05)_inset] sm:rounded-[3rem] sm:p-[12px]">
          {/* Side buttons */}
          <span
            aria-hidden
            className="pointer-events-none absolute -left-[2px] top-[88px] h-10 w-[3px] rounded-l-sm bg-taupe-500/60 sm:top-[110px] sm:h-14"
          />
          <span
            aria-hidden
            className="pointer-events-none absolute -left-[2px] top-[148px] h-16 w-[3px] rounded-l-sm bg-taupe-500/60 sm:top-[180px] sm:h-20"
          />
          <span
            aria-hidden
            className="pointer-events-none absolute -right-[2px] top-[124px] h-20 w-[3px] rounded-r-sm bg-taupe-500/60 sm:top-[150px] sm:h-24"
          />

          {/* Screen */}
          <div className="relative aspect-[1320/2868] w-full overflow-hidden rounded-[2.1rem] bg-ink sm:rounded-[2.5rem]">
            {isVideo ? (
              <>
                <video
                  ref={videoRef}
                  src={item.src}
                  poster={item.poster}
                  playsInline
                  preload="metadata"
                  controls={isPlaying}
                  onEnded={() => setIsPlaying(false)}
                  className="absolute inset-0 h-full w-full object-cover"
                />
                {!isPlaying && (
                  <motion.button
                    type="button"
                    onClick={startVideo}
                    aria-label="Play video"
                    whileTap={{ scale: 0.97 }}
                    className="absolute inset-0 z-20 grid place-items-center bg-ink/10 transition-colors group-hover:bg-ink/25"
                  >
                    <motion.span
                      className="grid h-16 w-16 place-items-center rounded-full bg-cream-50/90 text-ink shadow-soft"
                      animate={{ scale: [1, 1.06, 1] }}
                      transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
                    >
                      <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                        <path d="M8 5v14l11-7z" />
                      </svg>
                    </motion.span>
                  </motion.button>
                )}
              </>
            ) : (
              <motion.button
                type="button"
                onClick={onOpen}
                aria-label={item.alt ?? item.caption ?? "Expand image"}
                whileTap={{ scale: 0.99 }}
                className="absolute inset-0"
              >
                <img
                  src={item.src}
                  alt={item.alt ?? item.caption ?? "Project image"}
                  loading="lazy"
                  className="absolute inset-0 h-full w-full object-cover"
                />
              </motion.button>
            )}

            {/* Dynamic Island */}
            <span
              aria-hidden
              className="pointer-events-none absolute left-1/2 top-[10px] z-30 h-[22px] w-[88px] -translate-x-1/2 rounded-full bg-ink sm:top-[14px] sm:h-[26px] sm:w-[104px]"
            />
          </div>
        </div>
      </motion.div>
      {item.caption && (
        <figcaption className="mt-4 text-[0.7rem] uppercase tracking-[0.22em] text-taupe-400">
          {item.caption}
        </figcaption>
      )}
    </figure>
  );
}

function GallerySection({
  heading,
  note,
  items,
  flows,
  title,
  number,
  featuredNote,
  onOpen,
}: {
  heading: string;
  note?: string;
  items: GalleryItem[];
  flows?: GalleryFlow[];
  title: string;
  number: number;
  featuredNote?: string;
  onOpen: (i: number) => void;
}) {
  const featuredIdx = items.findIndex((g) => g.aspect === "square");
  const featured = featuredIdx >= 0 ? items[featuredIdx] : null;

  // When flows are provided, render one labeled strip per flow with
  // running offsets so each thumb opens the correct lightbox index.
  let runningOffset = 0;
  const renderedFlows =
    flows && flows.length > 0
      ? flows.map((flow) => {
          const startIndex = runningOffset;
          runningOffset += flow.items.length;
          return { ...flow, startIndex };
        })
      : null;

  return (
    <section id="final-screens" className="relative scroll-mt-28">
      <div className="flex items-baseline gap-4">
        <span
          aria-hidden
          className="font-display text-5xl font-medium leading-none text-blush-300 sm:text-6xl"
        >
          {String(number).padStart(2, "0")}
        </span>
        <span className="text-[0.7rem] font-semibold uppercase tracking-[0.28em] text-taupe-400">
          Final screens
        </span>
      </div>
      <h2 className="mt-6 font-display text-[2rem] font-medium leading-[1.15] text-ink sm:text-[2.6rem]">
        {heading}
      </h2>
      {note && (
        <p className="mt-6 text-base leading-relaxed text-taupe-500 sm:text-[1.05rem] sm:leading-[1.75]">
          {note}
        </p>
      )}

      {/* Featured brand mark */}
      {featured && featured.kind !== "video" && (
        <motion.button
          type="button"
          onClick={() => onOpen(featuredIdx)}
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6 }}
          whileHover={{ y: -4 }}
          whileTap={{ scale: 0.99 }}
          className="group mt-10 flex w-full items-center gap-8 rounded-3xl border border-taupe-200/60 bg-cream-50 p-6 text-left transition-shadow hover:shadow-soft sm:p-10"
        >
          <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-2xl border border-taupe-200/50 bg-cream-50 sm:h-32 sm:w-32">
            <img
              src={featured.src}
              alt={`${title} brand mark`}
              className="h-full w-full object-contain p-3 transition-transform duration-500 group-hover:scale-105"
            />
          </div>
          <div>
            <p className="text-[0.7rem] font-semibold uppercase tracking-[0.22em] text-taupe-400">
              Identity, click to expand
            </p>
            <p className="mt-2 font-display text-2xl text-ink sm:text-3xl">
              {featured.caption ?? "Brand mark"}
            </p>
            {featuredNote && (
              <p className="mt-2 max-w-sm text-sm text-taupe-500">
                {featuredNote}
              </p>
            )}
          </div>
        </motion.button>
      )}

      {renderedFlows ? (
        <div className="mt-10 space-y-12">
          {renderedFlows.map((flow) => (
            <GalleryStrip
              key={flow.label}
              label={flow.label}
              items={flow.items}
              title={title}
              onOpen={(localIndex) => onOpen(flow.startIndex + localIndex)}
            />
          ))}
        </div>
      ) : (
        <div className="mt-10">
          <GalleryStrip
            items={items
              .map((g, i) => ({ g, i }))
              .filter(({ i }) => i !== featuredIdx)
              .map(({ g }) => g)}
            indexMap={items
              .map((_, i) => i)
              .filter((i) => i !== featuredIdx)}
            title={title}
            onOpen={onOpen}
          />
        </div>
      )}
    </section>
  );
}

function GalleryStrip({
  label,
  items,
  indexMap,
  title,
  onOpen,
}: {
  label?: string;
  items: GalleryItem[];
  indexMap?: number[];
  title: string;
  onOpen: (i: number) => void;
}) {
  const scrollerRef = useRef<HTMLDivElement>(null);
  const [pos, setPos] = useState({ atStart: true, atEnd: false });

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
    <div className="relative">
      <div className="mb-4 flex items-center justify-between gap-4 text-[0.7rem] uppercase tracking-[0.22em] text-taupe-400">
        <span className="flex items-center gap-3">
          {label && (
            <span className="font-semibold tracking-[0.28em] text-ink">
              {label}
            </span>
          )}
          <span className="hidden sm:inline">Drag, scroll, or use the arrows</span>
        </span>
        <div className="flex items-center gap-2">
          <motion.button
            type="button"
            onClick={() => scrollBy(-1)}
            disabled={pos.atStart}
            aria-label="Scroll previous"
            whileHover={pos.atStart ? undefined : { x: -3, scale: 1.05 }}
            whileTap={pos.atStart ? undefined : { scale: 0.9 }}
            transition={{ type: "spring", stiffness: 320, damping: 18 }}
            className="grid h-9 w-9 place-items-center rounded-full border border-taupe-200/70 text-taupe-500 transition-colors hover:bg-blush-100 hover:text-ink disabled:cursor-not-allowed disabled:opacity-30"
          >
            <span aria-hidden>←</span>
          </motion.button>
          <motion.button
            type="button"
            onClick={() => scrollBy(1)}
            disabled={pos.atEnd}
            aria-label="Scroll next"
            whileHover={pos.atEnd ? undefined : { x: 3, scale: 1.05 }}
            whileTap={pos.atEnd ? undefined : { scale: 0.9 }}
            transition={{ type: "spring", stiffness: 320, damping: 18 }}
            className="grid h-9 w-9 place-items-center rounded-full border border-taupe-200/70 text-taupe-500 transition-colors hover:bg-blush-100 hover:text-ink disabled:cursor-not-allowed disabled:opacity-30"
          >
            <span aria-hidden>→</span>
          </motion.button>
        </div>
      </div>

      <div
        ref={scrollerRef}
        className="flex snap-x snap-mandatory gap-5 overflow-x-auto pb-6"
        style={{ scrollbarColor: "rgba(139,111,92,0.35) transparent" }}
      >
        {items.map((g, i) => (
          <GalleryThumb
            key={`${g.src}-${i}`}
            item={g}
            title={title}
            onClick={() => onOpen(indexMap ? indexMap[i] : i)}
          />
        ))}
      </div>
    </div>
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
      whileHover={{ y: -4 }}
      className={`group relative flex-shrink-0 snap-center ${widthClass}`}
    >
      <button
        type="button"
        onClick={onClick}
        className={`relative block w-full overflow-hidden rounded-[2rem] ring-1 ring-taupe-200/60 transition-transform duration-300 hover:scale-[1.02] hover:ring-blush-300/70 ${aspectClass} ${
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
              className="absolute inset-0 h-full w-full object-contain transition-transform duration-500 group-hover:scale-105"
            />
            <div className="pointer-events-none absolute inset-0 grid place-items-center bg-ink/15">
              <motion.span
                className="grid h-16 w-16 place-items-center rounded-full bg-cream-50/90 text-ink"
                animate={{ scale: [1, 1.06, 1] }}
                transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
              >
                <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                  <path d="M8 5v14l11-7z" />
                </svg>
              </motion.span>
            </div>
          </>
        ) : (
          <img
            src={item.src}
            alt={item.caption ?? `${title} screen`}
            loading="lazy"
            className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        )}
      </button>
      <figcaption className="mt-4 text-[0.7rem] uppercase tracking-[0.22em] text-taupe-400">
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
  items: LightboxEntry[];
  index: number;
  onClose: () => void;
  onChange: (i: number) => void;
}) {
  const item = items[index];
  const [zoomed, setZoomed] = useState(false);
  const [zoomOrigin, setZoomOrigin] = useState({ x: 50, y: 50 });

  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, []);

  useEffect(() => {
    setZoomed(false);
    setZoomOrigin({ x: 50, y: 50 });
  }, [index]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") onChange((index + 1) % items.length);
      if (e.key === "ArrowLeft") onChange((index - 1 + items.length) % items.length);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [index, items.length, onChange, onClose]);

  const handleImageClick = (e: ReactMouseEvent<HTMLImageElement>) => {
    e.stopPropagation();
    if (zoomed) {
      setZoomed(false);
      return;
    }
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setZoomOrigin({ x, y });
    setZoomed(true);
  };

  if (!item) return null;

  return (
    <motion.div
      role="dialog"
      aria-modal="true"
      onClick={onClose}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      className="fixed inset-0 z-[100] flex flex-col bg-ink/90 backdrop-blur-sm"
    >
      <div className="flex items-center justify-between p-5 text-cream-50">
        <span className="font-mono text-xs tracking-[0.22em] text-cream-50/70">
          {String(index + 1).padStart(2, "0")} / {String(items.length).padStart(2, "0")}
        </span>
        <motion.button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            onClose();
          }}
          aria-label="Close"
          whileHover={{ rotate: 90, scale: 1.08 }}
          whileTap={{ scale: 0.92 }}
          transition={{ type: "spring", stiffness: 280, damping: 16 }}
          className="grid h-10 w-10 place-items-center rounded-full border border-cream-50/20 transition-colors hover:bg-cream-50/10"
        >
          <span aria-hidden className="text-lg">×</span>
        </motion.button>
      </div>

      <div className="relative flex min-h-0 flex-1 items-center justify-center px-16 pb-4 sm:px-20">
        <motion.button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            onChange((index - 1 + items.length) % items.length);
          }}
          aria-label="Previous"
          initial={{ x: 0, y: "-50%" }}
          whileHover={{ x: -3, y: "-50%", scale: 1.05 }}
          whileTap={{ y: "-50%", scale: 0.92 }}
          transition={{ type: "spring", stiffness: 320, damping: 18 }}
          className="absolute left-4 top-1/2 z-10 grid h-12 w-12 place-items-center rounded-full border border-cream-50/20 text-cream-50 transition-colors hover:bg-cream-50/10 sm:left-8"
        >
          <span aria-hidden>←</span>
        </motion.button>

        {item.kind === "video" ? (
          <motion.video
            key={item.src}
            src={item.src}
            poster={item.poster}
            controls
            autoPlay
            playsInline
            onClick={(e) => e.stopPropagation()}
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
            className="h-auto max-h-full w-auto max-w-full rounded-xl"
          />
        ) : (
          <motion.img
            key={item.src}
            src={item.src}
            alt={item.caption ?? "Expanded design"}
            onClick={handleImageClick}
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: zoomed ? 2 : 1 }}
            transition={{ duration: 0.3 }}
            style={{
              transformOrigin: `${zoomOrigin.x}% ${zoomOrigin.y}%`,
              cursor: zoomed ? "zoom-out" : "zoom-in",
            }}
            className="h-auto max-h-full w-auto max-w-full rounded-xl object-contain"
          />
        )}

        <motion.button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            onChange((index + 1) % items.length);
          }}
          aria-label="Next"
          initial={{ x: 0, y: "-50%" }}
          whileHover={{ x: 3, y: "-50%", scale: 1.05 }}
          whileTap={{ y: "-50%", scale: 0.92 }}
          transition={{ type: "spring", stiffness: 320, damping: 18 }}
          className="absolute right-4 top-1/2 z-10 grid h-12 w-12 place-items-center rounded-full border border-cream-50/20 text-cream-50 transition-colors hover:bg-cream-50/10 sm:right-8"
        >
          <span aria-hidden>→</span>
        </motion.button>
      </div>

      {item.caption && (
        <p className="flex-shrink-0 px-5 pb-6 text-center text-sm text-cream-50/70">
          {item.caption}
        </p>
      )}
    </motion.div>
  );
}

function slugify(s: string) {
  return s
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}
