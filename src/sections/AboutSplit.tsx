import { ReactNode, useEffect, useState } from "react";
import { motion } from "framer-motion";
import { certifications, education, experiences, site, toolGroups } from "../lib/site";
import { EasterEgg } from "../components/EasterEgg";

const SECTIONS = [
  { id: "about", label: "About me" },
  { id: "experience", label: "Experience" },
  { id: "education", label: "Education" },
  { id: "certifications", label: "Certifications" },
  { id: "tools", label: "Tools" },
  { id: "contact", label: "Contact" },
];

const FACTS: [string, string][] = [
  ["Based in", "Virginia, US"],
  ["Status", "Available"],
  ["Focus", "UX · Web Dev"],
  ["School", "George Mason"],
  ["Languages", "EN · 粵 · 中"],
  ["Likes", "Boba, Concerts, Shopping, Music"],
];

function useActiveSection() {
  const [active, setActive] = useState("about");
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

export default function AboutSplit() {
  const active = useActiveSection();

  return (
    <div className="relative w-full bg-cream-100 pt-28 sm:pt-32">
      <div aria-hidden className="pointer-events-none absolute inset-0 grain opacity-50" />
      <div className="relative mx-auto grid w-full max-w-[1560px] grid-cols-1 gap-10 px-4 sm:px-8 lg:grid-cols-[360px_minmax(0,1fr)] lg:gap-16 lg:px-12">
        {/* ---------- sticky profile card ---------- */}
        <aside className="lg:sticky lg:top-28 lg:max-h-[calc(100vh-8rem)] lg:self-start lg:overflow-y-auto lg:rounded-[1.75rem]">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="rounded-[1.75rem] border border-taupe-200/40 bg-cream-50 p-5 shadow-card"
          >
            <div className="flex flex-col items-center gap-4 text-center lg:block">
              <div className="h-24 w-24 shrink-0 overflow-hidden rounded-2xl lg:aspect-[16/9] lg:h-auto lg:w-full">
                <img src={site.avatar} alt="Avatar of Amanda Chu" className="h-full w-full object-contain p-2" />
              </div>
              <div className="lg:mt-5">
                <p className="font-display text-2xl font-bold text-ink">{site.name}</p>
                <p className="mt-1 text-sm text-taupe-500">UX/UI Designer &amp; Developer</p>
              </div>
            </div>

            <dl className="mt-5 grid grid-cols-2 gap-x-4 gap-y-3 border-t border-taupe-200/50 pt-5">
              {FACTS.map(([k, v]) => (
                <div key={k} className={k === "Likes" ? "col-span-2" : ""}>
                  <dt className="text-[10px] font-semibold uppercase tracking-[0.18em] text-taupe-400">{k}</dt>
                  <dd className="mt-0.5 inline-flex items-center gap-2 font-display text-sm font-bold text-ink">
                    {k === "Status" && (
                      <span className="relative flex h-2 w-2">
                        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-blush-300 opacity-75" />
                        <span className="relative inline-flex h-2 w-2 rounded-full bg-blush-400" />
                      </span>
                    )}
                    {v}
                    {k === "Languages" && <EasterEgg id="about" className="-my-1" />}
                  </dd>
                </div>
              ))}
            </dl>

            <nav aria-label="On this page" className="mt-5 hidden border-t border-taupe-200/50 pt-4 lg:block">
              <ul className="space-y-0.5">
                {SECTIONS.map((s) => (
                  <li key={s.id}>
                    <a
                      href={`#${s.id}`}
                      className={`flex items-center gap-3 rounded-xl px-3 py-2 text-sm transition-colors ${
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

            <a href={site.cvFile} download className="btn-primary mt-5 w-full">
              Download CV
            </a>
          </motion.div>
        </aside>

        {/* ---------- scrolling content ---------- */}
        <div className="min-w-0 pb-8">
          <Block
            id="about"
            eyebrow="About me"
            title={
              <>
                A <span className="italic text-taupe-500">designer-developer</span> who loves turning ideas into thoughtful digital experiences.
              </>
            }
          >
            <div className="space-y-5 text-base text-taupe-600 sm:text-lg">
              {site.about.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </div>
          </Block>

          <Block id="experience" eyebrow="Experience" title={<>Where I&apos;ve <span className="italic text-taupe-500">spent my time</span></>}>
            <ol className="relative space-y-4 border-l-2 border-blush-200 pl-6 sm:pl-8">
              {experiences.map((e, i) => (
                <motion.li
                  key={e.company + e.dates}
                  initial={{ opacity: 0, x: 16 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{ duration: 0.45, delay: 0.04 * i }}
                  className="relative"
                >
                  <span aria-hidden className="absolute -left-[33px] top-6 h-3 w-3 rounded-full border-2 border-cream-100 bg-blush-400 sm:-left-[41px]" />
                  <article className="rounded-3xl border border-taupe-200/40 bg-cream-50 p-6 shadow-card transition-shadow hover:shadow-soft">
                    <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                      <h3 className="font-display text-xl font-bold text-ink">{e.role}</h3>
                      <span className="text-xs font-semibold uppercase tracking-[0.16em] text-taupe-400">{e.dates}</span>
                    </div>
                    <p className="mt-1 text-sm text-taupe-500">
                      {e.company} · {e.location}
                    </p>
                    <ul className="mt-4 space-y-2.5 text-sm text-taupe-600 sm:text-base">
                      {e.bullets.map((b, j) => (
                        <li key={j} className="flex gap-3">
                          <span aria-hidden className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-blush-300" />
                          <span>{b}</span>
                        </li>
                      ))}
                    </ul>
                  </article>
                </motion.li>
              ))}
            </ol>
          </Block>

          <Block id="education" eyebrow="Education" title={<>School &amp; <span className="italic text-taupe-500">study</span></>}>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              {education.map((e, i) => (
                <motion.article
                  key={e.degree}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{ duration: 0.45, delay: 0.05 * i }}
                  className={`rounded-3xl border border-taupe-200/40 p-6 shadow-card ${i === 0 ? "bg-blush-100 md:col-span-2" : "bg-cream-50"}`}
                >
                  <span className="section-eyebrow">{e.dates}</span>
                  <h3 className="mt-3 font-display text-xl font-bold text-ink sm:text-2xl">{e.degree}</h3>
                  <p className="mt-1 text-sm text-taupe-500">
                    {e.school} · {e.location}
                  </p>
                  {e.note && <p className="mt-4 inline-flex rounded-pill bg-cream-50/80 px-3 py-1.5 text-xs font-medium text-taupe-500">{e.note}</p>}
                </motion.article>
              ))}
            </div>
          </Block>

          <Block id="certifications" eyebrow="Certifications" title={<>Officially <span className="italic text-taupe-500">certified.</span></>}>
            <ul className="flex flex-wrap gap-3">
              {certifications.map((c) => (
                <li key={c.name} className="inline-flex items-center gap-3 rounded-2xl border border-taupe-200/40 bg-cream-50 px-5 py-3 shadow-sm">
                  <span aria-hidden className="grid h-7 w-7 place-items-center rounded-full bg-blush-100 text-taupe-500">✓</span>
                  <span>
                    <span className="block font-display text-base font-bold text-ink">{c.name}</span>
                    <span className="text-xs text-taupe-400">{c.year}</span>
                  </span>
                </li>
              ))}
            </ul>
          </Block>

          <Block id="tools" eyebrow="Tools" title={<>What I <span className="italic text-taupe-500">work with</span></>}>
            <p className="-mt-4 mb-8 text-base text-taupe-500">The tools I use to design, develop, and refine digital experiences.</p>
            <div className="space-y-6">
              {toolGroups.map((g) => (
                <div key={g.title} className="grid grid-cols-1 gap-3 sm:grid-cols-[140px_minmax(0,1fr)] sm:items-start">
                  <p className="section-eyebrow pt-2">{g.title}</p>
                  <ul className="flex flex-wrap gap-2">
                    {g.items.map((t) => (
                      <motion.li
                        key={t}
                        whileHover={{ y: -2 }}
                        className="rounded-pill border border-taupe-200/60 bg-cream-50 px-4 py-2 text-sm font-medium text-taupe-600 transition-colors hover:border-blush-300 hover:bg-blush-100"
                      >
                        {t}
                      </motion.li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </Block>
        </div>
      </div>
    </div>
  );
}
