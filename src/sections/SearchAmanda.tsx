import { FormEvent, ReactNode, useMemo, useRef, useState } from "react";
import { caseStudies, certifications, education, experiences, projectPages, projects, site, toolGroups } from "../lib/site";
import { workHref } from "../lib/route";

const TABS = ["All", "Skills", "Education", "Experience", "Projects", "About"] as const;
type Tab = (typeof TABS)[number];

type Result = {
  title: string;
  where: string;
  tab: Tab;
  href: string;
  text: string;
  tags: string;
};

const SUGGESTIONS = ["Figma", "Python", "UX Research", "Internships", "Branding", "GPA"];
const IGNORED = new Set(["a", "about", "amanda", "amandas", "an", "and", "are", "chu", "did", "do", "does", "for", "go", "has", "have", "her", "how", "i", "in", "is", "know", "me", "my", "of", "on", "she", "tell", "the", "to", "what", "where", "which", "who", "with"]);
const PAGE_SIZE = 5;
const FACTS: [string, string][] = [
  ["Based in", site.location],
  ["School", "George Mason University"],
  ["Focus", "UX/UI · Web Dev"],
  ["Languages", "English, Cantonese, Mandarin"],
  ["Status", "Available for work"],
];

function buildIndex(): Result[] {
  const about: Result[] = [
    { title: "About Amanda", where: "About", tab: "About", href: "/about#about", text: site.about.join(" "), tags: "bio background who intro summary" },
    { title: "Languages Amanda speaks", where: "About", tab: "About", href: "/about#about", text: "Amanda speaks English, Cantonese, and Mandarin.", tags: "languages speak bilingual chinese" },
    { title: "Interests", where: "About", tab: "About", href: "/about#about", text: "Outside of work, Amanda likes boba, concerts, shopping, and music.", tags: "hobbies fun likes personal" },
    { title: "Get in touch", where: "Contact", tab: "About", href: "/contact", text: `Email ${site.email}. Based in ${site.location}. Open to internships, freelance design, and collaborative projects.`, tags: "contact email hire available location linkedin github" },
    { title: "Resume", where: "About", tab: "About", href: site.cvFile, text: "Download Amanda's CV as a PDF.", tags: "cv resume download pdf" },
  ];
  const jobs = experiences.map((e) => ({
    title: `${e.role} at ${e.company}`,
    where: "Experience",
    tab: "Experience" as Tab,
    href: "/about#experience",
    text: `${e.dates} · ${e.location}. ${e.bullets.join(" ")}`,
    tags: "experience work job jobs internship internships employment career",
  }));
  const schools = education.map((e) => ({
    title: e.degree,
    where: "Education",
    tab: "Education" as Tab,
    href: "/about#education",
    text: `${e.school}, ${e.location}. ${e.dates}.${e.note ? ` ${e.note}.` : ""}`,
    tags: "education school college university degree major study",
  }));
  const certs = certifications.map((c) => ({
    title: `${c.name} certification`,
    where: "Certifications",
    tab: "Education" as Tab,
    href: "/about#certifications",
    text: `Certified in ${c.name}, ${c.year}.`,
    tags: "certifications certificate certified license",
  }));
  const tools = toolGroups.map((g) => ({
    title: `${g.title} tools & skills`,
    where: "Tools",
    tab: "Skills" as Tab,
    href: "/about#tools",
    text: `${g.items.join(", ")}.`,
    tags: "tools skills software technology",
  }));
  const work = projects.filter((p) => p.slug).map((p) => {
    const study = caseStudies[p.slug!] ?? projectPages[p.slug!];
    return {
      title: p.title,
      where: `Projects › ${p.kind}`,
      tab: "Projects" as Tab,
      href: workHref(p.slug!),
      text: `${study?.tagline ?? ""} ${p.meta ?? ""}. Skills: ${study?.skills.join(", ") ?? ""}.`,
      tags: `project projects portfolio work ${p.category ?? ""}`,
    };
  });
  return [...tools, ...schools, ...jobs, ...work, ...certs, ...about];
}

const wordsOf = (text: string) => text.toLowerCase().match(/[a-z0-9+#.]+/g)?.map((w) => w.replace(/\.+$/, "")).filter(Boolean) ?? [];

/** Search words, dropping filler so "what does she know about Figma" still finds Figma. */
function termsOf(query: string) {
  const all = wordsOf(query);
  const kept = all.filter((w) => !IGNORED.has(w));
  return kept.length ? kept : all;
}

function score(r: Result, terms: string[]) {
  const fields: [string[], number][] = [[wordsOf(r.title), 4], [wordsOf(r.tags), 3], [wordsOf(r.text), 1]];
  let total = 0;
  for (const term of terms) {
    const hit = Math.max(...fields.map(([words, weight]) => (words.some((w) => w === term) ? weight * 2 : term.length > 1 && words.some((w) => w.startsWith(term)) ? weight : 0)));
    if (!hit) return 0;
    total += hit;
  }
  return total;
}

function escaped(term: string) {
  return term.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function Highlight({ text, terms }: { text: string; terms: string[] }) {
  if (!terms.length) return <>{text}</>;
  const pattern = new RegExp(`\\b(${terms.map(escaped).join("|")})`, "gi");
  const parts: ReactNode[] = text.split(pattern).map((part, i) => (i % 2 ? <mark key={i} className="rounded bg-blush-100 px-0.5 font-semibold text-ink">{part}</mark> : part));
  return <>{parts}</>;
}

/** The sentence that best shows why this result matched. */
function snippetOf(text: string, terms: string[]) {
  const sentences = text.match(/[^.!?]+(?:[.!?]+(?=\s|$)|$)/g)?.map((s) => s.trim()) ?? [text];
  const best = sentences.find((s) => terms.some((t) => wordsOf(s).some((w) => w.startsWith(t)))) ?? sentences[0];
  return best.length > 190 ? `${best.slice(0, 190).trimEnd()}…` : best;
}

export default function SearchAmanda() {
  const index = useMemo(buildIndex, []);
  const input = useRef<HTMLInputElement>(null);
  const [query, setQuery] = useState("");
  const [tab, setTab] = useState<Tab>("All");
  const [limit, setLimit] = useState(PAGE_SIZE);

  const terms = termsOf(query);
  const matches = terms.length
    ? index
        .map((r) => ({ r, s: score(r, terms) }))
        .filter((x) => x.s > 0)
        .sort((a, b) => b.s - a.s)
        .map((x) => x.r)
    : index;
  const countOf = (t: Tab) => (t === "All" ? matches.length : matches.filter((r) => r.tab === t).length);
  // With nothing typed, "All" opens on one result from each tab.
  const opening = TABS.slice(1).flatMap((t) => matches.find((r) => r.tab === t) ?? []);
  const results = tab !== "All" ? matches.filter((r) => r.tab === tab) : terms.length ? matches : [...opening, ...matches.filter((r) => !opening.includes(r))];

  const search = (q: string) => {
    setQuery(q);
    setLimit(PAGE_SIZE);
  };
  const pick = (t: Tab) => {
    setTab(t);
    setLimit(PAGE_SIZE);
  };
  const submit = (e: FormEvent) => {
    e.preventDefault();
    input.current?.blur();
  };

  return (
    <section id="search" className="relative w-full scroll-mt-24 bg-cream-100 pb-20 pt-4 sm:pb-28">
      <div className="mx-auto w-full max-w-[1560px] px-4 sm:px-8 lg:px-10">
        <div className="border-t border-taupe-200/60 pt-12 sm:pt-16">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:gap-8">
            <h2 className="shrink-0 font-display text-4xl font-bold leading-none tracking-tight">
              {[..."Amanda"].map((c, i) => (
                <span key={i} className={["text-ink", "text-taupe-400", "text-blush-400"][i % 3]}>{c}</span>
              ))}
            </h2>
            <form role="search" onSubmit={submit} className="min-w-0 flex-1 lg:max-w-[820px]">
              <label htmlFor="amanda-search" className="sr-only">Search Amanda</label>
              <div className="flex items-center gap-3 rounded-pill border border-taupe-200/70 bg-cream-50 px-5 shadow-card transition-shadow focus-within:shadow-soft">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden className="shrink-0 text-taupe-400">
                  <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="2" />
                  <path d="m20 20-3.5-3.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                </svg>
                <input
                  ref={input}
                  id="amanda-search"
                  type="search"
                  value={query}
                  onChange={(e) => search(e.target.value)}
                  placeholder="Search my skills, education, experience…"
                  autoComplete="off"
                  className="h-12 min-w-0 flex-1 bg-transparent text-base text-ink outline-none placeholder:text-taupe-300 [&::-webkit-search-cancel-button]:hidden"
                />
                {query && (
                  <button type="button" aria-label="Clear search" onClick={() => { search(""); input.current?.focus(); }} className="shrink-0 text-xl leading-none text-taupe-400 transition-colors hover:text-ink">
                    ×
                  </button>
                )}
              </div>
            </form>
          </div>

          <div className="mt-6 flex gap-6 overflow-x-auto border-b border-taupe-200/60 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden" aria-label="Filter results">
            {TABS.map((t) => (
              <button
                key={t}
                type="button"
                aria-pressed={tab === t}
                onClick={() => pick(t)}
                className={`relative shrink-0 pb-3 text-sm font-semibold transition-colors hover:text-ink ${tab === t ? "text-ink" : "text-taupe-400"}`}
              >
                {t}
                {terms.length > 0 && <span className="ml-1 font-normal text-taupe-300">{countOf(t)}</span>}
                {tab === t && <span aria-hidden className="absolute inset-x-0 bottom-0 h-[3px] rounded-full bg-blush-300" />}
              </button>
            ))}
          </div>

          <div className="mt-8 grid grid-cols-1 gap-10 lg:grid-cols-[minmax(0,1fr)_380px] lg:gap-16">
            <div>
              <p aria-live="polite" className="text-sm text-taupe-400">
                {terms.length ? `${results.length} ${results.length === 1 ? "result" : "results"}` : "Search anything, or browse by tab"}
              </p>
              {results.length ? (
                <ol className="mt-6 space-y-7">
                  {results.slice(0, limit).map((r) => (
                    <li key={r.title}>
                      <a href={r.href} className="group block" {...(r.href === site.cvFile ? { download: true } : {})}>
                        <span className="block text-xs text-taupe-400">Amanda Chu › {r.where}</span>
                        <span className="mt-1 block font-display text-xl font-bold text-ink underline-offset-4 group-hover:underline">
                          <Highlight text={r.title} terms={terms} />
                        </span>
                      </a>
                      <p className="mt-1 text-sm leading-relaxed text-taupe-500">
                        <Highlight text={snippetOf(r.text, terms)} terms={terms} />
                      </p>
                    </li>
                  ))}
                </ol>
              ) : (
                <div className="mt-4">
                  <p className="text-base text-taupe-500">Nothing here for “{query.trim()}”. Try one of these:</p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {SUGGESTIONS.map((q) => (
                      <button key={q} type="button" onClick={() => { pick("All"); search(q); }} className="rounded-pill border border-taupe-200/60 px-4 py-1.5 text-sm font-semibold text-taupe-500 transition-colors hover:bg-blush-100">
                        {q}
                      </button>
                    ))}
                  </div>
                </div>
              )}
              {results.length > limit && (
                <button type="button" onClick={() => setLimit((n) => n + PAGE_SIZE)} className="mt-8 rounded-pill bg-blush-100 px-5 py-2.5 text-sm font-semibold text-ink transition-colors hover:bg-blush-200">
                  More results
                </button>
              )}
            </div>

            <aside aria-label="About Amanda" className="self-start overflow-hidden rounded-[1.75rem] border border-taupe-200/40 bg-cream-50 shadow-card">
              <div className="flex h-52 items-end justify-center bg-blush-100 pt-4">
                <img src={site.avatar} alt="Illustrated portrait of Amanda Chu" loading="lazy" className="h-full w-auto object-contain" />
              </div>
              <div className="p-6">
                <p className="font-display text-2xl font-bold text-ink">{site.name}</p>
                <p className="mt-1 text-sm text-taupe-500">UX/UI Designer &amp; Developer</p>
                <dl className="mt-5 space-y-2.5 border-t border-taupe-200/50 pt-5 text-sm">
                  {FACTS.map(([k, v]) => (
                    <div key={k} className="flex gap-2">
                      <dt className="shrink-0 font-semibold text-ink">{k}:</dt>
                      <dd className="text-taupe-500">{v}</dd>
                    </div>
                  ))}
                </dl>
                <div className="mt-5 flex flex-wrap gap-x-5 gap-y-2 border-t border-taupe-200/50 pt-5 text-sm font-semibold text-taupe-500">
                  <a href={site.linkedin} target="_blank" rel="noopener noreferrer" className="transition-colors hover:text-ink">LinkedIn ↗</a>
                  <a href={site.github} target="_blank" rel="noopener noreferrer" className="transition-colors hover:text-ink">GitHub ↗</a>
                  <a href="/contact" className="transition-colors hover:text-ink">Contact</a>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </div>
    </section>
  );
}
