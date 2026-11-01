import { ReactNode, useEffect, useState } from "react";
import { motion } from "framer-motion";
import { caseStudies } from "../lib/site";
import { projectsHref } from "../lib/route";

const study = caseStudies.floraflow;

const SECTIONS = [
  { id: "overview", label: "Overview" },
  { id: "problem", label: "Problem" },
  { id: "opportunity", label: "Opportunity" },
  { id: "features", label: "Key features" },
  { id: "audience", label: "Audience" },
  { id: "research", label: "Research" },
  { id: "demo", label: "The lamp" },
  { id: "screens", label: "Final screens" },
];

function useActiveSection() {
  const [active, setActive] = useState(SECTIONS[0].id);
  useEffect(() => {
    const els = SECTIONS.map((s) => document.getElementById(s.id)).filter(Boolean) as HTMLElement[];
    const io = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting).sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible[0]) setActive(visible[0].target.id);
      },
      { rootMargin: "-35% 0px -55% 0px" }
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);
  return active;
}

function Block({ id, eyebrow, title, children }: { id: string; eyebrow: string; title: ReactNode; children: ReactNode }) {
  return (
    <section id={id} className="scroll-mt-28 border-t border-taupe-200/50 py-14 first:border-t-0 first:pt-0 sm:py-16">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.5 }}
      >
        <span className="section-eyebrow">
          <span aria-hidden className="inline-block h-1.5 w-6 rounded-full bg-blush-300" />
          {eyebrow}
        </span>
        <h2 className="mt-3 font-display text-[clamp(1.9rem,3.4vw,2.8rem)] font-bold leading-tight text-ink">{title}</h2>
      </motion.div>
      <div className="mt-8">{children}</div>
    </section>
  );
}

export default function FloraFlowPage() {
  const active = useActiveSection();
  const [problem, opportunity, ideate, audience, research] = study.sections;
  const brand = study.gallery[0];
  const screens = study.gallery.filter((g) => g.aspect === "phone" && g.kind !== "video");
  const video = study.gallery.find((g) => g.kind === "video");
  const facts: [string, string | undefined][] = [
    ["Role", study.meta.role],
    ["Timeline", study.meta.timeline],
    ["Duration", study.meta.duration],
    ["Tools", study.meta.tools],
    ["Font", study.meta.fonts],
  ];

  return (
    <div className="relative w-full bg-cream-100 pb-16 pt-28 sm:pt-32">
      <div aria-hidden className="pointer-events-none absolute inset-0 grain opacity-50" />
      <div className="relative mx-auto grid w-full max-w-[1400px] grid-cols-1 gap-10 px-4 sm:px-8 lg:grid-cols-[360px_minmax(0,1fr)] lg:gap-16 lg:px-12">
        {/* ---------- sticky project card ---------- */}
        <aside className="lg:sticky lg:top-28 lg:max-h-[calc(100vh-8rem)] lg:self-start lg:overflow-y-auto lg:rounded-[1.75rem]">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="rounded-[1.75rem] border border-taupe-200/40 bg-cream-50 p-5 shadow-card"
          >
            <a href={projectsHref()} className="text-[10px] font-semibold uppercase tracking-[0.18em] text-taupe-400 hover:text-taupe-500">
              ← All projects
            </a>
            <div className="mt-4 flex items-center gap-4">
              <img src={brand.src} alt="FloraFlow brand mark" className="h-16 w-16 shrink-0 rounded-2xl border border-taupe-200/40 bg-white object-contain p-1.5" />
              <div>
                <p className="font-display text-2xl font-bold text-ink">
                  Flora<span className="italic text-taupe-500">Flow</span>
                </p>
                <p className="mt-0.5 text-sm text-taupe-500">UX/UI &amp; Branding</p>
              </div>
            </div>

            <dl className="mt-5 grid grid-cols-2 gap-x-4 gap-y-3 border-t border-taupe-200/50 pt-5">
              {facts.filter(([, v]) => v).map(([k, v]) => (
                <div key={k} className={k === "Role" || k === "Tools" ? "col-span-2" : ""}>
                  <dt className="text-[10px] font-semibold uppercase tracking-[0.18em] text-taupe-400">{k}</dt>
                  <dd className="mt-0.5 font-display text-sm font-bold text-ink">{v}</dd>
                </div>
              ))}
            </dl>

            <nav aria-label="On this page" className="mt-5 hidden border-t border-taupe-200/50 pt-4 lg:block">
              <ul className="space-y-0.5">
                {SECTIONS.map((s) => (
                  <li key={s.id}>
                    <a
                      href={`#${s.id}`}
                      className={`flex items-center gap-3 rounded-xl px-3 py-1.5 text-sm transition-colors ${
                        active === s.id ? "bg-blush-100 font-semibold text-ink" : "text-taupe-500 hover:bg-cream-100"
                      }`}
                    >
                      <span
                        aria-hidden
                        className={`h-1.5 rounded-full transition-all duration-300 ${active === s.id ? "w-5 bg-blush-400" : "w-1.5 bg-taupe-200"}`}
                      />
                      {s.label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>

            {study.externalLink && (
              <a href={study.externalLink.href} target="_blank" rel="noopener noreferrer" className="btn-primary mt-5 w-full">
                {study.externalLink.label} ↗
              </a>
            )}
          </motion.div>
        </aside>

        {/* ---------- scrolling story ---------- */}
        <div className="min-w-0 pb-8">
          <Block
            id="overview"
            eyebrow="Overview"
            title={
              <>
                A calming, <span className="italic text-taupe-500">screen free</span> focus system.
              </>
            }
          >
            <p className="max-w-2xl text-lg text-ink sm:text-xl">{study.intro}</p>
            <figure className="mt-8 overflow-hidden rounded-[1.75rem] border border-taupe-200/40 shadow-card" style={{ aspectRatio: "3208 / 3306", maxWidth: "36rem" }}>
              <img src={study.cover} alt="The FloraFlow lamp, a glowing purple flower on a 3D printed base" className="h-full w-full object-cover" />
            </figure>
            <div className="mt-6 flex flex-wrap gap-2">
              {study.skills.map((s) => (
                <span key={s} className="rounded-pill border border-taupe-200/60 bg-cream-50 px-4 py-2 text-sm font-medium text-taupe-600">
                  {s}
                </span>
              ))}
            </div>
          </Block>

          <Block id="problem" eyebrow="Problem" title={problem.heading}>
            <p className="max-w-2xl text-base leading-relaxed text-taupe-600 sm:text-lg">{problem.body}</p>
          </Block>

          <Block id="opportunity" eyebrow="Opportunity" title={<>Plan once. <span className="italic text-taupe-500">Then look away.</span></>}>
            <p className="max-w-2xl text-base leading-relaxed text-taupe-600 sm:text-lg">{opportunity.body}</p>
          </Block>

          <Block id="features" eyebrow="Ideate" title={ideate.heading}>
            {ideate.body && <p className="-mt-2 mb-6 max-w-2xl text-base text-taupe-500">{ideate.body}</p>}
            <ol className="grid grid-cols-1 gap-3 md:grid-cols-2">
              {ideate.bullets?.map((b, i) => (
                <li key={b} className="flex gap-4 rounded-3xl border border-taupe-200/40 bg-cream-50 p-5 shadow-card">
                  <span className="font-display text-2xl font-bold leading-none text-blush-300">{String(i + 1).padStart(2, "0")}</span>
                  <span className="text-sm text-taupe-600 sm:text-base">{b}</span>
                </li>
              ))}
            </ol>
          </Block>

          <Block id="audience" eyebrow="Audience" title={audience.heading}>
            <p className="mb-5 inline-flex rounded-pill bg-blush-100 px-4 py-1.5 font-display text-sm font-bold text-taupe-500">
              Students &amp; early career learners · ages 16–30
            </p>
            <p className="max-w-2xl text-base leading-relaxed text-taupe-600 sm:text-lg">{audience.body}</p>
          </Block>

          <Block id="research" eyebrow="Research" title={research.heading}>
            <div className="mb-6 grid grid-cols-1 gap-3 sm:grid-cols-2">
              <div className="rounded-3xl bg-blush-100 p-6">
                <p className="font-display text-5xl font-bold leading-none text-ink">
                  20–30<span className="text-2xl text-taupe-400"> min</span>
                </p>
                <p className="mt-2 text-sm text-taupe-500">How long most respondents stay focused before getting distracted</p>
              </div>
              <div className="rounded-3xl border border-taupe-200/40 bg-cream-50 p-6">
                <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-taupe-400">Tools students already use</p>
                <div className="mt-3 flex flex-wrap gap-2">
                  {["Notion", "Google Calendar", "Todoist", "Quizlet"].map((t) => (
                    <span key={t} className="rounded-pill border border-taupe-200/60 px-3 py-1 text-sm text-taupe-600">{t}</span>
                  ))}
                </div>
              </div>
            </div>
            <p className="max-w-2xl text-base leading-relaxed text-taupe-600 sm:text-lg">{research.body}</p>
          </Block>

          <Block id="demo" eyebrow="The lamp" title={<>See it <span className="italic text-taupe-500">in action</span></>}>
            <div className="grid grid-cols-1 items-start gap-6 md:grid-cols-[minmax(0,280px)_minmax(0,1fr)]">
              {video && video.kind === "video" && (
                <figure className="mx-auto w-full max-w-[280px] overflow-hidden rounded-[1.75rem] border border-taupe-200/40 bg-cream-50 shadow-card">
                  <video
                    src={video.src}
                    poster={video.poster}
                    controls
                    muted
                    loop
                    playsInline
                    preload="metadata"
                    className="block w-full bg-ink object-cover"
                    style={{ aspectRatio: "430 / 888" }}
                  />
                  <figcaption className="px-5 py-3 text-center font-display text-sm italic text-taupe-500">{video.caption}</figcaption>
                </figure>
              )}
              <div className="flex flex-col gap-4 rounded-3xl border border-taupe-200/40 bg-cream-50 p-6 shadow-card sm:flex-row sm:items-center">
                <img src={brand.src} alt="FloraFlow brand mark" className="h-28 w-28 shrink-0 rounded-2xl border border-taupe-200/40 bg-white object-contain p-2" />
                <div>
                  <p className="font-display text-xl font-bold text-ink">Brand mark</p>
                  <p className="mt-1 text-base text-taupe-600">{study.featuredNote}</p>
                </div>
              </div>
            </div>
          </Block>

          <Block id="screens" eyebrow="Final screens" title={<>The companion <span className="italic text-taupe-500">app</span></>}>
            {study.galleryNote && <p className="-mt-2 mb-6 max-w-2xl text-base text-taupe-500">{study.galleryNote}</p>}
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
              {screens.map((g) => (
                <figure key={g.src} className="m-0">
                  <div className="overflow-hidden rounded-[1.6rem] border border-taupe-200/40 bg-cream-50 p-1.5 shadow-card">
                    <img src={g.src} alt={g.caption ?? ""} loading="lazy" className="block w-full rounded-[1.2rem]" style={{ aspectRatio: "440 / 956" }} />
                  </div>
                  <figcaption className="mt-3 text-center text-[10px] font-semibold uppercase tracking-[0.18em] text-taupe-400">{g.caption}</figcaption>
                </figure>
              ))}
            </div>
            <a href={projectsHref()} className="btn-secondary mt-10">
              ← Back to all projects
            </a>
          </Block>
        </div>
      </div>
    </div>
  );
}
