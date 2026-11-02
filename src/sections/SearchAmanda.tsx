import { FormEvent, ReactNode, useMemo, useRef, useState } from "react";
import { caseStudies, certifications, education, experiences, projectPages, projects, site, toolGroups } from "../lib/site";
import { workHref } from "../lib/route";

type Result = {
  title: string;
  where: string;
  href: string;
  text: string;
  tags: string;
};

const SUGGESTIONS = ["Figma", "Python", "Education", "UX Research", "Internships", "Branding", "GPA", "Languages"];
const IGNORED = new Set(["a", "about", "amanda", "amandas", "an", "and", "are", "chu", "did", "do", "does", "for", "go", "has", "have", "her", "how", "i", "in", "is", "know", "me", "my", "of", "on", "she", "tell", "the", "to", "what", "where", "which", "who", "with"]);
const PAGE_SIZE = 6;

function buildIndex(): Result[] {
  const about: Result[] = [
    { title: "About Amanda", where: "About", href: "/about#about", text: site.about.join(" "), tags: "bio background who intro summary" },
    { title: "Languages Amanda speaks", where: "About", href: "/about#about", text: "Amanda speaks English, Cantonese, and Mandarin.", tags: "languages speak bilingual chinese" },
    { title: "Interests", where: "About", href: "/about#about", text: "Outside of work, Amanda likes boba, concerts, shopping, and music.", tags: "hobbies fun likes personal" },
    { title: "Get in touch", where: "Contact", href: "/contact", text: `Email ${site.email}. Based in ${site.location}. Open to internships, freelance design, and collaborative projects.`, tags: "contact email hire available location linkedin github" },
    { title: "Resume", where: "About", href: site.cvFile, text: "Download Amanda's CV as a PDF.", tags: "cv resume download pdf" },
  ];
  const jobs = experiences.map((e) => ({
    title: `${e.role} at ${e.company}`,
    where: "Experience",
    href: "/about#experience",
    text: `${e.dates} · ${e.location}. ${e.bullets.join(" ")}`,
    tags: "experience work job jobs internship internships employment career",
  }));
  const schools = education.map((e) => ({
    title: e.degree,
    where: "Education",
    href: "/about#education",
    text: `${e.school}, ${e.location}. ${e.dates}.${e.note ? ` ${e.note}.` : ""}`,
    tags: "education school college university degree major study",
  }));
  const certs = certifications.map((c) => ({
    title: `${c.name} certification`,
    where: "Certifications",
    href: "/about#certifications",
    text: `Certified in ${c.name}, ${c.year}.`,
    tags: "certifications certificate certified license",
  }));
  const tools = toolGroups.map((g) => ({
    title: `${g.title} tools & skills`,
    where: "Tools",
    href: "/about#tools",
    text: `${g.items.join(", ")}.`,
    tags: "tools skills software technology",
  }));
  const work = projects.filter((p) => p.slug).map((p) => {
    const study = caseStudies[p.slug!] ?? projectPages[p.slug!];
    return {
      title: p.title,
      where: `Projects › ${p.kind}`,
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
  const [limit, setLimit] = useState(PAGE_SIZE);

  const terms = termsOf(query);
  const results = index
    .map((r) => ({ r, s: terms.length ? score(r, terms) : 0 }))
    .filter((x) => x.s > 0)
    .sort((a, b) => b.s - a.s)
    .map((x) => x.r);

  const search = (q: string) => {
    setQuery(q);
    setLimit(PAGE_SIZE);
  };
  const submit = (e: FormEvent) => {
    e.preventDefault();
    input.current?.blur();
  };
  const curious = () => search(SUGGESTIONS[Math.floor(Math.random() * SUGGESTIONS.length)]);

  return (
    <section id="search" className="relative w-full scroll-mt-24 bg-cream-100 pb-20 pt-4 sm:pb-28">
      <div className="mx-auto w-full max-w-[1560px] px-4 sm:px-8 lg:px-10">
        <div className="border-t border-taupe-200/60 pt-16 sm:pt-20">
          <div className="mx-auto max-w-[720px]">
            <h2 className="text-center font-display text-[clamp(3rem,7vw,5rem)] font-bold leading-none tracking-tight">
              {[..."Amanda"].map((c, i) => (
                <span key={i} className={["text-ink", "text-taupe-400", "text-blush-400"][i % 3]}>{c}</span>
              ))}
            </h2>
            <p className="mt-4 text-center text-base text-taupe-500">Search my skills, education, experience, projects, or anything else about me.</p>

            <form role="search" onSubmit={submit} className="mt-8">
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
                  placeholder="Try “Figma” or “where did she study?”"
                  autoComplete="off"
                  className="h-14 min-w-0 flex-1 bg-transparent text-base text-ink outline-none placeholder:text-taupe-300 [&::-webkit-search-cancel-button]:hidden"
                />
                {query && (
                  <button type="button" aria-label="Clear search" onClick={() => { search(""); input.current?.focus(); }} className="shrink-0 text-xl leading-none text-taupe-400 transition-colors hover:text-ink">
                    ×
                  </button>
                )}
              </div>

              {!query && (
                <div className="mt-6 flex flex-wrap justify-center gap-3">
                  <button type="button" onClick={() => input.current?.focus()} className="rounded-pill bg-blush-100 px-5 py-2.5 text-sm font-semibold text-ink transition-colors hover:bg-blush-200">Search Amanda</button>
                  <button type="button" onClick={curious} className="rounded-pill bg-blush-100 px-5 py-2.5 text-sm font-semibold text-ink transition-colors hover:bg-blush-200">I&apos;m Feeling Curious</button>
                </div>
              )}
            </form>

            {query.trim() ? (
              <div className="mt-8">
                <p aria-live="polite" className="text-sm text-taupe-400">
                  {results.length} {results.length === 1 ? "result" : "results"}
                </p>
                {results.length ? (
                  <ol className="mt-6 space-y-8">
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
                  <p className="mt-4 text-base text-taupe-500">Nothing matched “{query.trim()}”. Try one of these:</p>
                )}
                {results.length > limit && (
                  <button type="button" onClick={() => setLimit((n) => n + PAGE_SIZE)} className="mt-8 rounded-pill bg-blush-100 px-5 py-2.5 text-sm font-semibold text-ink transition-colors hover:bg-blush-200">
                    More results
                  </button>
                )}
              </div>
            ) : null}

            {(!query.trim() || !results.length) && (
              <div className="mt-6 flex flex-wrap justify-center gap-2">
                {SUGGESTIONS.map((s) => (
                  <button key={s} type="button" onClick={() => search(s)} className="rounded-pill border border-taupe-200/60 px-4 py-1.5 text-sm font-semibold text-taupe-500 transition-colors hover:bg-blush-100">
                    {s}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
