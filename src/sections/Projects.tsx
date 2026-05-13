import { motion } from "framer-motion";
import SectionHeader from "../components/SectionHeader";
import { projects } from "../lib/site";
import { workHref } from "../lib/route";

export default function Projects() {
  return (
    <section
      id="projects"
      className="relative w-full overflow-hidden bg-cream-100 py-24 sm:py-32"
    >
      <div className="mx-auto w-full max-w-[1500px] px-6 sm:px-10 lg:px-14 xl:px-24">
        <div className="flex flex-col gap-8 sm:flex-row sm:items-end sm:justify-between">
          <SectionHeader
            eyebrow="Latest projects"
            title={
              <>
                Things I&apos;ve{" "}
                <span className="italic text-taupe-500">made lately</span>
              </>
            }
            intro="A growing collection of my latest projects. More on the way."
          />
          <a
            href="#/projects"
            className="group inline-flex items-center gap-2 self-start rounded-pill border border-taupe-300/60 px-5 py-2.5 text-sm font-semibold text-taupe-500 transition-colors hover:bg-blush-100 sm:self-end"
          >
            View all
            <span aria-hidden className="transition-transform group-hover:translate-x-1">
              →
            </span>
          </a>
        </div>

        <div className="mt-14 grid grid-cols-1 gap-6 md:grid-cols-2 xl:gap-8">
          {projects.slice(0, 4).map((p, i) => (
            <motion.a
              key={p.title}
              href={p.slug ? workHref(p.slug) : p.href ?? "#"}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.5, delay: 0.05 * i }}
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
                    <motion.span
                      aria-hidden
                      className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 font-display text-7xl text-taupe-500/80 sm:text-8xl"
                      whileHover={{ rotate: 12, scale: 1.1 }}
                      transition={{ type: "spring", stiffness: 200, damping: 12 }}
                    >
                      {p.emoji}
                    </motion.span>
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
                  <h3 className="font-display text-2xl font-medium text-ink">
                    {p.title}
                  </h3>
                  {p.meta && (
                    <p className="mt-1 text-xs text-taupe-400">{p.meta}</p>
                  )}
                </div>
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
}
