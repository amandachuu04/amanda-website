import { ReactNode } from "react";
import { motion } from "framer-motion";
import { caseStudies } from "../lib/site";
import { projectsHref } from "../lib/route";

const study = caseStudies.floraflow;

const reveal = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-60px" },
  transition: { duration: 0.55, ease: "easeOut" as const },
};

function Card({ className = "", children, delay = 0 }: { className?: string; children: ReactNode; delay?: number }) {
  return (
    <motion.div
      {...reveal}
      transition={{ ...reveal.transition, delay }}
      className={`relative overflow-hidden rounded-[1.75rem] border border-taupe-200/40 bg-cream-50 shadow-card ${className}`}
    >
      {children}
    </motion.div>
  );
}

function Label({ n, children }: { n?: string; children: ReactNode }) {
  return (
    <span className="section-eyebrow">
      {n ? <span className="font-display text-base text-blush-400">{n}</span> : <span aria-hidden className="inline-block h-1.5 w-6 rounded-full bg-blush-300" />}
      {children}
    </span>
  );
}

function SectionHead({ n, label, title, note }: { n?: string; label: string; title: ReactNode; note?: string }) {
  return (
    <motion.div {...reveal} className="mb-6 max-w-3xl">
      <Label n={n}>{label}</Label>
      <h2 className="mt-3 font-display text-[clamp(1.9rem,3.6vw,2.9rem)] font-bold leading-tight text-ink">{title}</h2>
      {note && <p className="mt-3 text-base text-taupe-500 sm:text-lg">{note}</p>}
    </motion.div>
  );
}

export default function FloraFlowPage() {
  const [problem, opportunity, ideate, audience, research] = study.sections;
  const brand = study.gallery[0];
  const screens = study.gallery.filter((g) => g.aspect === "phone" && g.kind !== "video");
  const video = study.gallery.find((g) => g.kind === "video");
  const meta: [string, string | undefined][] = [
    ["Role", study.meta.role],
    ["Timeline", study.meta.timeline],
    ["Duration", study.meta.duration],
    ["Tools", study.meta.tools],
    ["Font", study.meta.fonts],
  ];

  return (
    <div className="relative w-full bg-cream-100 pb-24 pt-28 sm:pt-32">
      <div aria-hidden className="pointer-events-none absolute inset-0 grain opacity-50" />
      <div className="relative mx-auto w-full max-w-[1400px] space-y-20 px-4 sm:space-y-24 sm:px-8 lg:px-12">
        {/* ---------- hero ---------- */}
        <section className="grid grid-cols-1 items-center gap-8 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)] lg:gap-14">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <a href={projectsHref()} className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-taupe-400 hover:text-taupe-500">
              ← All projects
            </a>
            <div className="mt-6 flex flex-wrap gap-2">
              <span className="pill">UX/UI &amp; Branding</span>
              <span className="pill">Product concept</span>
            </div>
            <h1 className="mt-6 font-display text-[clamp(3.2rem,8vw,6.5rem)] font-bold leading-[0.95] tracking-tight text-ink">
              Flora<span className="italic text-taupe-500">Flow</span>
            </h1>
            <p className="mt-6 max-w-xl text-lg text-taupe-500 sm:text-xl">{study.tagline}</p>
            <div className="mt-8 flex flex-wrap gap-3">
              {study.externalLink && (
                <a href={study.externalLink.href} target="_blank" rel="noopener noreferrer" className="btn-primary">
                  {study.externalLink.label} ↗
                </a>
              )}
              {video && (
                <a href="#demo" className="btn-secondary">
                  Watch the lamp ↓
                </a>
              )}
            </div>
          </motion.div>
          <motion.figure
            initial={{ opacity: 0, scale: 0.96, rotate: 1.5 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="overflow-hidden rounded-[2rem] border border-taupe-200/40 shadow-soft"
            style={{ aspectRatio: "3208 / 3306" }}
          >
            <img src={study.cover} alt="The FloraFlow lamp, a glowing purple flower on a 3D printed base" className="h-full w-full object-cover" />
          </motion.figure>
        </section>

        {/* ---------- details ---------- */}
        <section className="grid grid-cols-2 gap-4 md:grid-cols-5 lg:gap-5">
          {meta.filter(([, v]) => v).map(([k, v], i) => (
            <Card key={k} delay={0.04 * i} className={`p-5 ${k === "Role" ? "col-span-2 md:col-span-1" : ""}`}>
              <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-taupe-400">{k}</p>
              <p className="mt-2 font-display text-lg font-bold leading-snug text-ink">{v}</p>
            </Card>
          ))}
          <Card delay={0.2} className="col-span-2 flex flex-wrap items-center gap-2 p-5 md:col-span-5">
            <p className="mr-2 text-[10px] font-semibold uppercase tracking-[0.2em] text-taupe-400">Skills applied</p>
            {study.skills.map((s) => (
              <span key={s} className="rounded-pill bg-blush-100 px-3.5 py-1.5 text-sm font-semibold text-taupe-500">{s}</span>
            ))}
          </Card>
        </section>

        {/* ---------- problem / opportunity ---------- */}
        <section className="grid grid-cols-1 gap-4 lg:grid-cols-2 lg:gap-5">
          <Card className="p-7 sm:p-10">
            <Label n="01">Problem</Label>
            <h2 className="mt-4 font-display text-[clamp(1.7rem,3vw,2.4rem)] font-bold leading-tight text-ink">{problem.heading}</h2>
            <p className="mt-5 text-base leading-relaxed text-taupe-600">{problem.body}</p>
          </Card>
          <Card delay={0.08} className="flex flex-col bg-blush-100 p-7 sm:p-10">
            <Label n="02">Opportunity</Label>
            <h2 className="mt-4 font-display text-[clamp(2.2rem,4.4vw,3.6rem)] font-bold leading-[1.02] text-ink">
              Plan once.
              <br />
              <span className="italic text-taupe-500">Then look away.</span>
            </h2>
            <p className="mt-auto pt-6 text-base leading-relaxed text-taupe-600">{opportunity.body}</p>
          </Card>
        </section>

        {/* ---------- key features ---------- */}
        <section>
          <SectionHead n="03" label="Ideate" title={ideate.heading} note={ideate.body} />
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 lg:gap-5">
            {ideate.bullets?.map((b, i) => (
              <Card key={b} delay={0.05 * i} className={`flex flex-col gap-6 p-6 ${i === 0 ? "bg-blush-100" : ""}`}>
                <span className="font-display text-4xl font-bold text-blush-300">{String(i + 1).padStart(2, "0")}</span>
                <p className="text-base font-medium leading-relaxed text-ink">{b}</p>
              </Card>
            ))}
          </div>
        </section>

        {/* ---------- audience + research ---------- */}
        <section className="grid grid-cols-1 gap-4 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.15fr)] lg:gap-5">
          <Card className="p-7 sm:p-10">
            <Label n="04">Audience</Label>
            <h2 className="mt-4 font-display text-[clamp(1.7rem,3vw,2.4rem)] font-bold text-ink">{audience.heading}</h2>
            <p className="mt-4 inline-flex rounded-pill bg-blush-100 px-4 py-1.5 font-display text-sm font-bold text-taupe-500">
              Students &amp; early career learners · ages 16–30
            </p>
            <p className="mt-5 text-base leading-relaxed text-taupe-600">{audience.body}</p>
          </Card>
          <Card delay={0.08} className="p-7 sm:p-10">
            <Label n="05">Research</Label>
            <h2 className="mt-4 font-display text-[clamp(1.7rem,3vw,2.4rem)] font-bold text-ink">{research.heading}</h2>
            <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-[auto_minmax(0,1fr)] sm:items-center">
              <div className="rounded-3xl bg-taupe-50 px-6 py-5">
                <p className="font-display text-5xl font-bold leading-none text-ink">
                  20–30<span className="text-2xl text-taupe-400"> min</span>
                </p>
                <p className="mt-2 text-xs text-taupe-500">How long most respondents stay focused before getting distracted</p>
              </div>
              <div>
                <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-taupe-400">Tools students already use</p>
                <div className="mt-2 flex flex-wrap gap-2">
                  {["Notion", "Google Calendar", "Todoist", "Quizlet"].map((t) => (
                    <span key={t} className="rounded-pill border border-taupe-200/60 px-3 py-1 text-sm text-taupe-600">{t}</span>
                  ))}
                </div>
              </div>
            </div>
            <p className="mt-6 text-base leading-relaxed text-taupe-600">{research.body}</p>
          </Card>
        </section>

        {/* ---------- lamp demo + brand ---------- */}
        <section id="demo" className="scroll-mt-28">
          <SectionHead label="The lamp" title={<>See it <span className="italic text-taupe-500">in action</span></>} note={study.intro} />
          <div className="grid grid-cols-1 gap-4 md:grid-cols-[minmax(0,320px)_minmax(0,1fr)] lg:gap-5">
            {video && video.kind === "video" && (
              <Card className="mx-auto w-full max-w-[320px] p-0">
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
                <p className="px-5 py-3 text-center font-display text-sm italic text-taupe-500">{video.caption}</p>
              </Card>
            )}
            <div className="grid grid-cols-1 gap-4 lg:gap-5">
              <Card delay={0.08} className="flex flex-col items-start gap-5 p-7 sm:flex-row sm:items-center sm:p-10">
                <img src={brand.src} alt="FloraFlow brand mark" className="h-32 w-32 shrink-0 rounded-3xl border border-taupe-200/40 bg-white object-contain p-3" />
                <div>
                  <Label>Identity</Label>
                  <p className="mt-2 font-display text-2xl font-bold text-ink">Brand mark</p>
                  <p className="mt-2 text-base text-taupe-600">{study.featuredNote}</p>
                </div>
              </Card>
              <Card delay={0.12} className="flex flex-col justify-center bg-blush-100 p-7 sm:p-10">
                <p className="font-display text-[clamp(1.5rem,2.6vw,2.1rem)] font-bold leading-snug text-ink">
                  Set up a session on your phone, then put it away. <span className="italic text-taupe-500">The lamp takes it from there.</span>
                </p>
                <div className="mt-6 flex flex-wrap gap-2">
                  {["Reading", "Studying", "Homework"].map((m) => (
                    <span key={m} className="rounded-pill bg-cream-50 px-3.5 py-1.5 text-sm font-semibold text-taupe-500">{m} mode</span>
                  ))}
                </div>
              </Card>
            </div>
          </div>
        </section>

        {/* ---------- final screens ---------- */}
        <section>
          <SectionHead n="06" label="Final screens" title={<>The companion <span className="italic text-taupe-500">app</span></>} note={study.galleryNote} />
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6 lg:gap-5">
            {screens.map((g, i) => (
              <motion.figure key={g.src} {...reveal} transition={{ ...reveal.transition, delay: 0.05 * i }} whileHover={{ y: -6 }} className="m-0">
                <div className="overflow-hidden rounded-[1.6rem] border border-taupe-200/40 bg-cream-50 p-1.5 shadow-card">
                  <img src={g.src} alt={g.caption ?? ""} loading="lazy" className="block w-full rounded-[1.2rem]" style={{ aspectRatio: "440 / 956" }} />
                </div>
                <figcaption className="mt-3 text-center text-[10px] font-semibold uppercase tracking-[0.18em] text-taupe-400">{g.caption}</figcaption>
              </motion.figure>
            ))}
          </div>
        </section>

        {/* ---------- next ---------- */}
        <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:gap-5">
          <a href={projectsHref()} className="group flex items-center justify-between rounded-[1.75rem] border border-taupe-200/40 bg-cream-50 p-7 shadow-card transition-shadow hover:shadow-soft">
            <span>
              <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-taupe-400">Keep exploring</span>
              <span className="mt-1 block font-display text-2xl font-bold text-ink">All projects</span>
            </span>
            <span className="text-2xl text-taupe-400 transition-transform group-hover:translate-x-1">→</span>
          </a>
          {study.externalLink && (
            <a href={study.externalLink.href} target="_blank" rel="noopener noreferrer" className="group flex items-center justify-between rounded-[1.75rem] bg-blush-100 p-7 shadow-card transition-shadow hover:shadow-soft">
              <span>
                <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-taupe-400">Figma</span>
                <span className="mt-1 block font-display text-2xl font-bold text-ink">{study.externalLink.label}</span>
              </span>
              <span className="text-2xl text-taupe-400 transition-transform group-hover:-translate-y-1 group-hover:translate-x-1">↗</span>
            </a>
          )}
        </section>
      </div>
    </div>
  );
}
