import { useEffect, useMemo, useState, type MouseEvent as ReactMouseEvent } from "react";
import { motion } from "framer-motion";
import { getProjectPage, type ProjectPage } from "../lib/site";
type ProjectMeta = ProjectPage["meta"];
import { projectsHref } from "../lib/route";

type LightboxItem =
  | { kind: "image"; src: string; alt: string; caption?: string }
  | { kind: "video"; src: string; poster?: string; caption?: string };

export default function ProjectDetailPage({ slug }: { slug: string }) {
  const project = getProjectPage(slug);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "auto" });
  }, [slug]);

  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const lightboxItems = useMemo<LightboxItem[]>(() => {
    if (!project) return [];
    const items: LightboxItem[] = [];
    if (project.iterations) {
      for (const it of project.iterations) {
        for (const img of it.images) {
          items.push({
            kind: "image",
            src: img.src,
            alt: img.caption ?? `${project.title} — ${it.heading ?? it.label}`,
            caption: img.caption,
          });
        }
      }
    } else {
      items.push({ kind: "image", src: project.cover, alt: `${project.title} cover` });
    }
    if (project.video) {
      items.push({
        kind: "video",
        src: project.video.src,
        poster: project.video.poster,
        caption: project.video.caption,
      });
    }
    return items;
  }, [project]);

  const iterationFirstIndex = useMemo<number[]>(() => {
    if (!project?.iterations) return [];
    const result: number[] = [];
    let running = 0;
    for (const it of project.iterations) {
      result.push(running);
      running += it.images.length;
    }
    return result;
  }, [project]);

  const videoLightboxIndex = useMemo(() => {
    if (!project?.video) return -1;
    if (project.iterations) {
      return project.iterations.reduce((sum, it) => sum + it.images.length, 0);
    }
    return 1;
  }, [project]);

  if (!project) {
    return (
      <section className="relative min-h-screen bg-cream-100 pb-24 pt-40">
        <div className="mx-auto w-full max-w-[900px] px-6">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-taupe-400">
            404
          </p>
          <h1 className="mt-4 font-display text-display-md text-ink">
            Project not found
          </h1>
          <p className="mt-4 text-taupe-500">
            That project doesn&rsquo;t have a page yet.
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

      <Header project={project} />

      <Description description={project.description} />

      {project.iterations ? (
        <IterationsSection
          iterations={project.iterations}
          onOpen={(itIdx, imgIdx) =>
            setLightboxIndex(iterationFirstIndex[itIdx] + imgIdx)
          }
        />
      ) : (
        <ClickableCover
          cover={project.cover}
          title={project.title}
          onOpen={() => setLightboxIndex(0)}
        />
      )}

      {project.video && (
        <ClickableVideo
          video={project.video}
          onOpen={() => setLightboxIndex(videoLightboxIndex)}
        />
      )}

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

function Header({ project }: { project: ProjectPage }) {
  return (
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
        {project.title}
      </motion.h1>
      <motion.p
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.15 }}
        className="mt-6 text-lg leading-relaxed text-taupe-500 sm:text-xl"
      >
        {project.tagline}
      </motion.p>

      {project.category === "design" ? (
        <DesignMetaGrid meta={project.meta} />
      ) : (
        <motion.dl
          initial="hidden"
          animate="show"
          variants={{
            hidden: {},
            show: { transition: { staggerChildren: 0.06, delayChildren: 0.25 } },
          }}
          className="mt-10 grid w-full grid-cols-3 gap-x-8 gap-y-6 border-t border-taupe-200/60 pt-8"
        >
          <MetaRow label="Language" value={project.meta.language ?? project.meta.tools} />
          <MetaRow label="Duration" value={project.meta.duration} />
          <MetaRow label="Timeline" value={project.meta.timeline} />
        </motion.dl>
      )}

      {project.skills.length > 0 && (
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
            {project.skills.map((s) => (
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

      {project.externalLink && (
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mt-10"
        >
          <motion.a
            href={project.externalLink.href}
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ y: -2 }}
            whileTap={{ scale: 0.97 }}
            transition={{ type: "spring", stiffness: 320, damping: 18 }}
            className="group relative inline-flex items-center gap-2 rounded-pill bg-ink px-6 py-3 text-sm font-semibold text-cream-50 transition-colors hover:bg-taupe-500"
          >
            {project.externalLink.label}
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
  );
}

function ClickableCover({
  cover,
  title,
  onOpen,
}: {
  cover: string;
  title: string;
  onOpen: () => void;
}) {
  return (
    <motion.figure
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="relative mx-auto mt-16 w-full max-w-[1500px] px-6 sm:mt-20 sm:px-10 lg:px-14 xl:px-24"
    >
      <motion.button
        type="button"
        onClick={onOpen}
        aria-label={`Expand ${title} cover`}
        whileHover={{ y: -4 }}
        whileTap={{ scale: 0.99 }}
        transition={{ type: "spring", stiffness: 260, damping: 20 }}
        className="group block w-full overflow-hidden rounded-[2rem] bg-gradient-to-br from-blush-200 to-cream-200 shadow-card transition-shadow hover:shadow-soft"
      >
        <img
          src={cover}
          alt={`${title} cover`}
          className="block h-auto w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
        />
      </motion.button>
    </motion.figure>
  );
}

function IterationsSection({
  iterations,
  onOpen,
}: {
  iterations: NonNullable<ProjectPage["iterations"]>;
  onOpen: (iterationIndex: number, imageIndex: number) => void;
}) {
  return (
    <div className="relative mx-auto mt-20 flex w-full max-w-[1500px] flex-col gap-20 px-6 sm:mt-24 sm:gap-24 sm:px-10 lg:px-14 xl:px-24">
      {iterations.map((it, i) => (
        <motion.section
          key={`${it.label}-${i}`}
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 0.6 }}
        >
          <p className="text-[0.7rem] font-semibold uppercase tracking-[0.28em] text-taupe-400">
            {it.label}
          </p>
          {it.heading && (
            <h2 className="mt-3 font-display text-[clamp(1.5rem,3.5vw,2.25rem)] font-medium leading-tight tracking-[-0.01em] text-ink">
              {it.heading}
            </h2>
          )}
          <div
            className={`mt-8 grid gap-6 sm:gap-8 ${
              it.images.length > 1 ? "sm:grid-cols-2" : "grid-cols-1"
            }`}
          >
            {it.images.map((img, j) => (
              <figure key={img.src}>
                <motion.button
                  type="button"
                  onClick={() => onOpen(i, j)}
                  aria-label={`Expand ${it.heading ?? it.label} image ${j + 1}`}
                  whileHover={{ y: -4 }}
                  whileTap={{ scale: 0.99 }}
                  transition={{ type: "spring", stiffness: 260, damping: 20 }}
                  className="group block w-full overflow-hidden rounded-[1.5rem] bg-cream-50 shadow-card transition-shadow hover:shadow-soft"
                >
                  <img
                    src={img.src}
                    alt={img.caption ?? `${it.heading ?? it.label} ${j + 1}`}
                    className="block h-auto w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                  />
                </motion.button>
                {img.caption && (
                  <figcaption className="mt-3 text-[0.7rem] uppercase tracking-[0.22em] text-taupe-400">
                    {img.caption}
                  </figcaption>
                )}
              </figure>
            ))}
          </div>
        </motion.section>
      ))}
    </div>
  );
}

function Description({ description }: { description: string[] }) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.55 }}
      className="relative mx-auto mt-20 w-full max-w-[1500px] px-6 sm:mt-24 sm:px-10 lg:px-14 xl:px-24"
    >
      <p className="text-[0.7rem] font-semibold uppercase tracking-[0.28em] text-taupe-400">
        About the project
      </p>
      <motion.div
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-60px" }}
        variants={{
          hidden: {},
          show: { transition: { staggerChildren: 0.07, delayChildren: 0.1 } },
        }}
        className="mt-6 flex flex-col gap-6 text-base leading-relaxed text-taupe-500 sm:text-[1.05rem] sm:leading-[1.85]"
      >
        {description.map((p, i) => (
          <motion.p
            key={i}
            variants={{
              hidden: { opacity: 0, y: 8 },
              show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
            }}
          >
            {p}
          </motion.p>
        ))}
      </motion.div>
    </motion.section>
  );
}

function ClickableVideo({
  video,
  onOpen,
}: {
  video: NonNullable<ProjectPage["video"]>;
  onOpen: () => void;
}) {
  return (
    <motion.figure
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.6 }}
      className="relative mx-auto mt-20 w-full max-w-[1500px] px-6 sm:mt-24 sm:px-10 lg:px-14 xl:px-24"
    >
      <motion.button
        type="button"
        onClick={onOpen}
        aria-label="Expand demo video"
        whileHover={{ y: -4 }}
        whileTap={{ scale: 0.99 }}
        transition={{ type: "spring", stiffness: 260, damping: 20 }}
        className="group relative block w-full overflow-hidden rounded-[2rem] bg-ink shadow-card transition-shadow hover:shadow-soft"
      >
        <video
          src={`${video.src}#t=0.1`}
          poster={video.poster}
          muted
          playsInline
          preload="metadata"
          className="block h-auto w-full"
        />
        <div className="pointer-events-none absolute inset-0 grid place-items-center bg-ink/15 transition-colors group-hover:bg-ink/25">
          <motion.span
            className="grid h-20 w-20 place-items-center rounded-full bg-cream-50/90 text-ink"
            initial={false}
            whileHover={{ scale: 1.12 }}
            animate={{ scale: [1, 1.06, 1] }}
            transition={{
              scale: { duration: 2.4, repeat: Infinity, ease: "easeInOut" },
            }}
          >
            <svg width="26" height="26" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
              <path d="M8 5v14l11-7z" />
            </svg>
          </motion.span>
        </div>
      </motion.button>
      {video.caption && (
        <figcaption className="mt-4 text-[0.7rem] uppercase tracking-[0.22em] text-taupe-400">
          {video.caption}
        </figcaption>
      )}
    </motion.figure>
  );
}

function DesignMetaGrid({ meta }: { meta: ProjectMeta }) {
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
      <dd className="mt-1.5 text-[0.95rem] text-ink">{value || " "}</dd>
      </motion.div>
  );
}

function Lightbox({
  items,
  index,
  onClose,
  onChange,
}: {
  items: LightboxItem[];
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
      if (e.key === "ArrowRight" && items.length > 1)
        onChange((index + 1) % items.length);
      if (e.key === "ArrowLeft" && items.length > 1)
        onChange((index - 1 + items.length) % items.length);
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

  const showNav = items.length > 1;

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
          {String(index + 1).padStart(2, "0")} /{" "}
          {String(items.length).padStart(2, "0")}
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
          <span aria-hidden className="text-lg">
            ×
          </span>
        </motion.button>
      </div>

      <div className="relative flex min-h-0 flex-1 items-center justify-center px-16 pb-4 sm:px-20">
        {showNav && (
          <motion.button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onChange((index - 1 + items.length) % items.length);
            }}
            aria-label="Previous"
            whileHover={{ x: -3, scale: 1.05 }}
            whileTap={{ scale: 0.92 }}
            transition={{ type: "spring", stiffness: 320, damping: 18 }}
            className="absolute left-4 top-1/2 z-10 grid h-12 w-12 -translate-y-1/2 place-items-center rounded-full border border-cream-50/20 text-cream-50 transition-colors hover:bg-cream-50/10 sm:left-8"
          >
            <span aria-hidden>←</span>
          </motion.button>
        )}

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
            alt={item.alt}
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

        {showNav && (
          <motion.button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onChange((index + 1) % items.length);
            }}
            aria-label="Next"
            whileHover={{ x: 3, scale: 1.05 }}
            whileTap={{ scale: 0.92 }}
            transition={{ type: "spring", stiffness: 320, damping: 18 }}
            className="absolute right-4 top-1/2 z-10 grid h-12 w-12 -translate-y-1/2 place-items-center rounded-full border border-cream-50/20 text-cream-50 transition-colors hover:bg-cream-50/10 sm:right-8"
          >
            <span aria-hidden>→</span>
          </motion.button>
        )}
      </div>

      {item.caption && (
        <p className="flex-shrink-0 px-5 pb-6 text-center text-sm text-cream-50/70">
          {item.caption}
        </p>
      )}
    </motion.div>
  );
}
