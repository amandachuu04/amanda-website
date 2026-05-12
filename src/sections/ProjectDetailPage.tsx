import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import { getProjectPage, type ProjectPage } from "../lib/site";
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
    const items: LightboxItem[] = [
      { kind: "image", src: project.cover, alt: `${project.title} cover` },
    ];
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
            className="mt-8 inline-flex items-center gap-2 rounded-pill border border-taupe-300/60 px-5 py-2.5 text-sm font-semibold text-taupe-500 transition-colors hover:bg-blush-100"
          >
            <span aria-hidden>←</span> Browse all projects
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

      <ClickableCover
        cover={project.cover}
        title={project.title}
        onOpen={() => setLightboxIndex(0)}
      />

      <Description description={project.description} />

      {project.video && (
        <ClickableVideo
          video={project.video}
          onOpen={() => setLightboxIndex(1)}
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
      <a
        href={projectsHref()}
        className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.22em] text-taupe-400 transition-colors hover:text-taupe-500"
      >
        <span aria-hidden>←</span> All projects
      </a>

      <h1 className="mt-10 font-display text-[clamp(2.5rem,7vw,5.5rem)] font-medium leading-[1.02] tracking-[-0.02em] text-ink">
        {project.title}
      </h1>
      <p className="mt-6 text-lg leading-relaxed text-taupe-500 sm:text-xl">
        {project.tagline}
      </p>

      <dl className="mt-10 grid grid-cols-2 gap-x-8 gap-y-6 border-t border-taupe-200/60 pt-8 sm:grid-cols-4">
        <MetaRow label="Role" value={project.meta.role} />
        <MetaRow label="Duration" value={project.meta.duration} />
        <MetaRow label="Timeline" value={project.meta.timeline} />
        <MetaRow label="Toolkit" value={project.meta.tools} />
      </dl>

      {project.skills.length > 0 && (
        <div className="mt-8">
          <p className="text-[0.68rem] font-semibold uppercase tracking-[0.22em] text-taupe-400">
            Skills applied
          </p>
          <ul className="mt-3 flex flex-wrap gap-2">
            {project.skills.map((s) => (
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

      {project.externalLink && (
        <div className="mt-10">
          <a
            href={project.externalLink.href}
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-2 rounded-pill bg-ink px-6 py-3 text-sm font-semibold text-cream-50 transition-colors hover:bg-taupe-500"
          >
            {project.externalLink.label}
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
      <button
        type="button"
        onClick={onOpen}
        aria-label={`Expand ${title} cover`}
        className="group block w-full overflow-hidden rounded-[2rem] bg-gradient-to-br from-blush-200 to-cream-200 shadow-card transition-transform hover:scale-[1.005]"
      >
        <img
          src={cover}
          alt={`${title} cover`}
          className="block h-auto w-full object-cover transition-transform duration-500 group-hover:scale-[1.02]"
        />
      </button>
    </motion.figure>
  );
}

function Description({ description }: { description: string[] }) {
  return (
    <section className="relative mx-auto mt-20 w-full max-w-[1500px] px-6 sm:mt-24 sm:px-10 lg:px-14 xl:px-24">
      <p className="text-[0.7rem] font-semibold uppercase tracking-[0.28em] text-taupe-400">
        About the project
      </p>
      <div className="mt-6 flex flex-col gap-6 text-base leading-relaxed text-taupe-500 sm:text-[1.05rem] sm:leading-[1.85]">
        {description.map((p, i) => (
          <p key={i}>{p}</p>
        ))}
      </div>
    </section>
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
      <button
        type="button"
        onClick={onOpen}
        aria-label="Expand demo video"
        className="group relative block w-full overflow-hidden rounded-[2rem] bg-ink shadow-card transition-transform hover:scale-[1.005]"
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
          <span className="grid h-20 w-20 place-items-center rounded-full bg-cream-50/90 text-ink transition-transform group-hover:scale-110">
            <svg width="26" height="26" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
              <path d="M8 5v14l11-7z" />
            </svg>
          </span>
        </div>
      </button>
      {video.caption && (
        <figcaption className="mt-4 text-[0.7rem] uppercase tracking-[0.22em] text-taupe-400">
          {video.caption}
        </figcaption>
      )}
    </motion.figure>
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
      if (e.key === "ArrowRight" && items.length > 1)
        onChange((index + 1) % items.length);
      if (e.key === "ArrowLeft" && items.length > 1)
        onChange((index - 1 + items.length) % items.length);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [index, items.length, onChange, onClose]);

  if (!item) return null;

  const showNav = items.length > 1;

  return (
    <div
      role="dialog"
      aria-modal="true"
      onClick={onClose}
      className="fixed inset-0 z-[100] flex flex-col bg-ink/90 backdrop-blur-sm"
    >
      <div className="flex items-center justify-between p-5 text-cream-50">
        <span className="font-mono text-xs tracking-[0.22em] text-cream-50/70">
          {String(index + 1).padStart(2, "0")} /{" "}
          {String(items.length).padStart(2, "0")}
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
          <span aria-hidden className="text-lg">
            ×
          </span>
        </button>
      </div>

      <div className="relative flex min-h-0 flex-1 items-center justify-center px-16 pb-4 sm:px-20">
        {showNav && (
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
        )}

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
            alt={item.alt}
            onClick={(e) => e.stopPropagation()}
            className="h-auto max-h-full w-auto max-w-full rounded-xl object-contain"
          />
        )}

        {showNav && (
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
        )}
      </div>

      {item.caption && (
        <p className="flex-shrink-0 px-5 pb-6 text-center text-sm text-cream-50/70">
          {item.caption}
        </p>
      )}
    </div>
  );
}
