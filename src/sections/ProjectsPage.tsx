import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  projectFolders,
  projects as allProjects,
  projectsForFolder,
  type Project,
  type ProjectFolder as Folder,
} from "../lib/site";
import { projectsHref, workHref } from "../lib/route";
import ProjectFolder from "../components/ProjectFolder";

type Slug = Folder["slug"];

export default function ProjectsPage({ initialSlug }: { initialSlug: Slug }) {
  const [active, setActive] = useState<Slug>(initialSlug);

  useEffect(() => {
    setActive(initialSlug);
  }, [initialSlug]);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "auto" });
  }, []);

  const list = projectsForFolder(active);
  const activeFolder = projectFolders.find((f) => f.slug === active)!;

  const onSelect = (slug: Slug) => {
    setActive(slug);
    const newHash = projectsHref(slug);
    if (window.location.hash !== newHash) {
      window.history.replaceState({}, "", newHash);
    }
    const target = document.getElementById("filtered-projects");
    if (target) {
      target.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <section className="relative min-h-screen bg-cream-100 pb-24 pt-32 sm:pt-36">
      {/* soft background blobs to echo the rest of the site */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-24 -z-0 mx-auto h-72 max-w-4xl rounded-full bg-blush-200/50 blur-3xl"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute right-[-10%] top-[40%] -z-0 h-96 w-96 rounded-full bg-taupe-100/50 blur-3xl"
      />

      <div className="relative mx-auto w-full max-w-[1500px] px-6 sm:px-10 lg:px-14 xl:px-24">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <div className="max-w-3xl">
            <a
              href="#projects"
              onClick={(e) => {
                e.preventDefault();
                window.history.pushState({}, "", "#projects");
                window.dispatchEvent(new HashChangeEvent("hashchange"));
              }}
              className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-taupe-400 transition-colors hover:text-taupe-500"
            >
              <span aria-hidden>←</span> Back to home
            </a>
            <h1 className="mt-4 font-display text-display-md font-medium text-ink">
              Projects
            </h1>
            <p className="mt-4 text-base text-taupe-500 sm:text-lg">
              Browse my projects by folder. Hover to preview what&rsquo;s inside,
              then click to explore.
            </p>
          </div>
          <p className="text-sm text-taupe-400">
            {allProjects.length} project{allProjects.length === 1 ? "" : "s"} total
          </p>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6">
          {projectFolders.map((folder) => (
            <ProjectFolder
              key={folder.slug}
              folder={folder}
              previews={projectsForFolder(folder.slug)}
              active={active === folder.slug}
              onSelect={onSelect}
            />
          ))}
        </div>

        <div id="filtered-projects" className="mt-20 scroll-mt-32">
          <div className="flex items-baseline justify-between gap-4">
            <h2 className="font-display text-2xl font-medium text-ink sm:text-3xl">
              {activeFolder.label}
            </h2>
            <span className="text-xs uppercase tracking-[0.18em] text-taupe-400">
              {list.length} item{list.length === 1 ? "" : "s"}
            </span>
          </div>
          <p className="mt-2 text-sm text-taupe-400">{activeFolder.description}</p>

          <AnimatePresence mode="wait">
            <motion.div
              key={active}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.35 }}
              className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-2 xl:gap-8"
            >
              {list.length === 0 ? (
                <div className="col-span-full rounded-3xl border border-dashed border-taupe-200/70 bg-cream-50/60 p-10 text-center text-taupe-400">
                  Nothing here yet — check back soon.
                </div>
              ) : (
                list.map((p, i) => <ProjectCard key={p.title} project={p} index={i} />)
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}

function ProjectCard({ project: p, index }: { project: Project; index: number }) {
  return (
    <motion.a
      href={p.slug ? workHref(p.slug) : p.href ?? "#"}
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, delay: 0.05 * index }}
      whileHover={{ y: -6 }}
      className="group relative flex flex-col overflow-hidden rounded-3xl bg-cream-50 p-3 shadow-card transition-shadow hover:shadow-soft"
    >
      <div
        className={`relative aspect-[4/3] w-full overflow-hidden rounded-2xl bg-gradient-to-br ${p.swatch}`}
      >
        {p.image ? (
          <img
            src={p.image}
            alt={`${p.title} project preview`}
            loading="lazy"
            className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.04]"
          />
        ) : (
          <>
            <div className="absolute inset-0 grid-paper opacity-50" aria-hidden />
            <span
              aria-hidden
              className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 font-display text-7xl text-taupe-500/80 sm:text-8xl"
            >
              {p.emoji}
            </span>
          </>
        )}
        <span className="absolute left-4 top-4 inline-flex items-center gap-1.5 rounded-pill bg-cream-50/85 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-taupe-500 backdrop-blur">
          {p.kind}
        </span>
        <span className="absolute right-4 top-4 inline-flex items-center justify-center rounded-full bg-cream-50/85 px-2.5 py-2 text-taupe-500 backdrop-blur transition-all group-hover:bg-taupe-400 group-hover:text-cream-50">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden>
            <path
              d="M7 17 17 7M9 7h8v8"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </span>
      </div>

      <div className="flex items-end justify-between gap-4 p-4 pt-5">
        <div>
          <h3 className="font-display text-2xl font-medium text-ink">{p.title}</h3>
          {p.meta && <p className="mt-1 text-xs text-taupe-400">{p.meta}</p>}
        </div>
      </div>
    </motion.a>
  );
}
