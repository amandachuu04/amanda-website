import { FormEvent, useEffect, useMemo, useRef, useState } from "react";
import { useReducedMotion } from "framer-motion";
import { caseStudies, certifications, education, experiences, projectPages, projects, site, toolGroups, type Experience } from "../lib/site";
import { workHref } from "../lib/route";

type Tab = "Skills" | "Education" | "Experience" | "Projects" | "About";

type Result = {
  title: string;
  where: string;
  tab: Tab;
  href: string;
  text: string;
  tags: string;
};

const CARDS = [
  { title: "Skills", question: "What are your skills?" },
  { title: "Education", question: "Where do you go to school?" },
  { title: "Experience", question: "What experience do you have?" },
  { title: "Projects", question: "What projects have you made?" },
];
const TRY_ASKING = ["What do you do at Nexus 8?", "When do you graduate?", "What's your GPA?", "Do you know Figma?", "What languages do you speak?", "How can I contact you?"];
const IGNORED = new Set(["a", "about", "amanda", "amandas", "an", "and", "are", "chu", "did", "do", "does", "for", "go", "has", "have", "her", "how", "i", "in", "is", "know", "me", "my", "of", "on", "she", "tell", "the", "to", "what", "where", "which", "who", "with", "you", "your"]);

function buildIndex(): Result[] {
  const about: Result[] = [
    { title: "About me", where: "About", tab: "About", href: "/about#about", text: site.about.join(" "), tags: "bio background who intro summary" },
    { title: "Languages I speak", where: "About", tab: "About", href: "/about#about", text: "I speak English, Cantonese, and Mandarin.", tags: "languages speak bilingual chinese" },
    { title: "Interests", where: "About", tab: "About", href: "/about#about", text: "Outside of work, I like boba, concerts, shopping, and music.", tags: "hobbies fun likes personal" },
    { title: "Get in touch", where: "Contact", tab: "About", href: "/contact", text: `Email ${site.email}. Based in ${site.location}. Open to internships, freelance design, and collaborative projects.`, tags: "contact email hire available location linkedin github" },
    { title: "Resume", where: "About", tab: "About", href: site.cvFile, text: "Download my CV as a PDF.", tags: "cv resume download pdf" },
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

/** The sentence that best shows why this result matched. */
function snippetOf(text: string, terms: string[]) {
  const sentences = text.match(/[^.!?]+(?:[.!?]+(?=\s|$)|$)/g)?.map((s) => s.trim()) ?? [text];
  const best = sentences.find((s) => terms.some((t) => wordsOf(s).some((w) => w.startsWith(t)))) ?? sentences[0];
  return best.length > 190 ? `${best.slice(0, 190).trimEnd()}…` : best;
}

type Item = { title: string; href: string; note?: string };
type Message = { role: "user" | "amanda"; text: string; bullets?: string[]; items?: Item[] };

const PROJECT_WORDS = new Set(["best", "built", "created", "favorite", "have", "latest", "made", "portfolio", "project", "projects", "recent", "show"]);

// How people might refer to each job, by company or by position.
const JOB_NAMES: Record<string, RegExp> = {
  "Nexus 8 International, LLC": /\bnexus\b|\bu[ix]([\s/&-]+(and\s+)?u[ix])?\s+(designer|design intern|intern)\b/,
  "Running Name LLC": /running name|graphic designer|graphic design intern/,
  "George Mason University": /\btutor(ing)?\b|\b(mason|gmu)\b.*\b(work|job|role|position|responsib|do at|did at|doing at|do for|did for)|\b(work|job|role|position|do at|did at|doing at|do for|did for)\b.*\b(mason|gmu)\b/,
  "PCCI Inc.": /\bpcci\b/,
};

function jobReply(job: Experience): Message {
  const current = job.dates.includes("Present");
  const article = /^[aeio]/i.test(job.role) || job.role.startsWith("Intern") ? "an" : "a";
  return {
    role: "amanda",
    text: `At ${job.company}, ${current ? "I'm" : "I was"} ${article} ${job.role} (${job.dates}, ${job.location}). Here's what ${current ? "I do" : "I did"}:`,
    bullets: job.bullets,
    items: [{ title: "See all my experience", href: "/about#experience" }],
  };
}

/** Answers from the site's own info; there is no AI model behind this. */
function reply(question: string, index: Result[]): Message {
  const q = question.toLowerCase();
  const terms = termsOf(question);
  const items = (tab: Tab, n = 6) => index.filter((r) => r.tab === tab).slice(0, n).map(({ title, href }) => ({ title, href }));
  const answer = (text: string, list?: Item[]): Message => ({ role: "amanda", text, items: list });
  const [masters, bachelors] = education;

  const job = experiences.find((e) => JOB_NAMES[e.company]?.test(q));
  if (job && !/\b(stud(y|ied|ying)|major|degree|gpa|graduat)/.test(q)) return jobReply(job);
  if (/\bcurrent(ly)? (job|role|position)|\bdo(ing)? (right )?now\b/.test(q)) return jobReply(experiences[0]);

  if (/\b(gpa|grades?)\b/.test(q)) return answer(`My GPA is ${bachelors.note?.match(/GPA ([\d.]+)/)?.[1]}.`, items("Education", 2));
  if (/graduat/.test(q)) return answer(`I'm expected to finish my B.S. in ${bachelors.dates.split("Expected ")[1]} and my M.S. in ${masters.dates.split("Expected ")[1]}, through George Mason's accelerated master's program.`, items("Education", 2));
  if (/\bspeak\b|\blanguages?\b/.test(q) && !/program|cod(e|ing)/.test(q)) return answer("I speak English, Cantonese, and Mandarin.");
  if (/educat|school|college|university|degree|major|minor|stud(y|ied|ying)|attend|master|bachelor/.test(q)) return answer(`I'm at ${bachelors.school} in ${bachelors.location}, working on a ${bachelors.degree.replace(" — ", " with a ")}. ${bachelors.note?.split(" · ")[0].replace("Minor in", "I'm minoring in")}, and I'm in the accelerated program for an ${masters.degree.replace(" — ", " focused on ")}.`, items("Education"));
  if (/experience|\bjobs?\b|intern|worked|career|employ/.test(q)) return answer(`Right now I'm a ${experiences[0].role} at ${experiences[0].company}. Here's where I've worked so far:`, experiences.map((e) => ({ title: `${e.role} at ${e.company}`, href: "/about#experience", note: e.dates })));
  if (/skills?\b|tools?\b|software|good at|programming|cod(e|ing)/.test(q)) return answer("Here's what I work with, from design to code:", toolGroups.map((g) => ({ title: g.title, href: "/about#tools", note: g.items.join(", ") })));
  if (terms.length && terms.every((t) => PROJECT_WORDS.has(t))) return answer(`I have ${projects.length} projects across design and programming. Here are the most recent ones:`, items("Projects"));
  if (/contact|e-?mail|reach|hire|available|linkedin|github/.test(q)) return answer(`The best way to reach me is ${site.email}. I'm open to internships, freelance design, and collaborative projects.`, [{ title: "Contact me", href: "/contact" }, { title: "LinkedIn", href: site.linkedin }, { title: "GitHub", href: site.github }]);
  if (/\b(live|based|from|located|location)\b/.test(q)) return answer(`I'm based in ${site.location}.`);
  if (/hobb|interest|\bfun\b|\blikes?\b|boba/.test(q)) return answer("Outside of work, I like boba, concerts, shopping, and music.");
  if (/resume|\bcv\b/.test(q)) return answer("You can download my CV here:", [{ title: "Download CV", href: site.cvFile }]);
  if (/who are you|about you|yourself|background|^hi\b|^hello\b|^hey\b/.test(q)) return answer(`Hi, I'm Amanda! ${site.about[0]}`, [{ title: "More about me", href: "/about" }]);

  const found = index
    .map((r) => ({ r, s: terms.length ? score(r, terms) : 0 }))
    .filter((x) => x.s > 0)
    .sort((a, b) => b.s - a.s)
    .slice(0, 4)
    .map(({ r }) => ({ title: r.title, href: r.href, note: snippetOf(r.text, terms) }));
  if (found.length) return answer("Here's what I found on that:", found);
  return answer("I don't have an answer for that here. Try asking about my skills, education, experience, or projects.");
}

function Avatar({ size = "h-8 w-8" }: { size?: string }) {
  return <img src={site.avatar} alt="" className={`${size} shrink-0 rounded-full border-2 border-blush-300 bg-cream-50 object-contain p-0.5`} />;
}

function AmandaMessage({ message, shown }: { message: Message; shown: number }) {
  const words = message.text.split(" ");
  const done = shown >= words.length;
  return (
    <div className="flex gap-3">
      <Avatar />
      <div className="min-w-0 flex-1 pt-1">
        <p className="text-base leading-relaxed text-ink">{words.slice(0, shown).join(" ")}</p>
        {done && message.bullets && (
          <ul className="mt-3 list-disc space-y-2 pl-5 text-base leading-relaxed text-ink marker:text-blush-400">
            {message.bullets.map((b) => (
              <li key={b}>{b}</li>
            ))}
          </ul>
        )}
        {done && message.items && (
          <ul className="mt-3 space-y-2">
            {message.items.map((item) => (
              <li key={item.title}>
                <a href={item.href} target={item.href.startsWith("http") ? "_blank" : undefined} rel="noopener noreferrer" className="block rounded-2xl border border-taupe-200/60 px-4 py-2.5 transition-colors hover:bg-blush-100">
                  <span className="block text-sm font-semibold text-ink">{item.title}</span>
                  {item.note && <span className="mt-0.5 block text-sm text-taupe-500">{item.note}</span>}
                </a>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export default function AskAmanda() {
  const index = useMemo(buildIndex, []);
  const reduced = useReducedMotion();
  const pane = useRef<HTMLDivElement>(null);
  const [draft, setDraft] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [thinking, setThinking] = useState(false);
  const [shown, setShown] = useState(0);

  const last = messages[messages.length - 1];
  const lastWords = last?.role === "amanda" ? last.text.split(" ").length : 0;
  const busy = thinking || shown < lastWords;

  useEffect(() => {
    if (shown >= lastWords) return;
    const id = setTimeout(() => setShown(reduced ? lastWords : (n) => n + 1), 28);
    return () => clearTimeout(id);
  }, [shown, lastWords, reduced]);

  useEffect(() => {
    if (pane.current) pane.current.scrollTop = pane.current.scrollHeight;
  }, [messages, thinking, shown]);

  const send = (text: string) => {
    const question = text.trim();
    if (!question || busy) return;
    setDraft("");
    setMessages((m) => [...m, { role: "user", text: question }]);
    setThinking(true);
    setTimeout(() => {
      setThinking(false);
      setShown(0);
      setMessages((m) => [...m, reply(question, index)]);
    }, reduced ? 0 : 550);
  };
  const submit = (e: FormEvent) => {
    e.preventDefault();
    send(draft);
  };

  return (
    <section id="ask" className="relative w-full scroll-mt-24 bg-cream-100 pb-12 sm:pb-16">
      <div className="mx-auto w-full max-w-[1560px] px-4 sm:px-8 lg:px-10">
        <div className="pb-8">
          <span className="section-eyebrow">
            <span aria-hidden className="inline-block h-1.5 w-6 rounded-full bg-blush-300" />
            Ask Amanda
          </span>
          <h2 className="mt-3 font-display text-display-md font-bold text-ink">
            Get to know <span className="italic text-taupe-500">me</span>
          </h2>
          <p className="mt-3 text-base text-taupe-500">Curious about my skills, education, or experience? Ask here and get an answer right away.</p>
        </div>

        <div className="flex h-[720px] max-h-[calc(100vh-16.5rem)] min-h-[560px] overflow-hidden rounded-[1.75rem] border border-taupe-200/60 bg-cream-50 shadow-soft">
          <aside className="hidden w-[280px] shrink-0 flex-col bg-blush-100 p-4 lg:flex">
            <div className="flex items-center gap-3 px-2 py-1">
              <Avatar />
              <span className="font-display text-lg font-bold text-ink">Ask Amanda</span>
            </div>
            <button type="button" disabled={busy} onClick={() => setMessages([])} className="mt-4 rounded-2xl px-3 py-2.5 text-left text-sm font-semibold text-ink transition-colors hover:bg-blush-200">
              + New chat
            </button>
            <p className="mt-5 px-3 text-[10px] font-semibold uppercase tracking-[0.2em] text-taupe-400">Try asking</p>
            <ul className="mt-2 flex-1 space-y-0.5 overflow-y-auto">
              {TRY_ASKING.map((q) => (
                <li key={q}>
                  <button type="button" onClick={() => send(q)} className="w-full rounded-2xl px-3 py-2 text-left text-sm text-taupe-500 transition-colors hover:bg-blush-200 hover:text-ink">
                    {q}
                  </button>
                </li>
              ))}
            </ul>
            <div className="flex items-center gap-3 border-t border-taupe-200/60 px-2 pt-4">
              <Avatar size="h-10 w-10" />
              <div>
                <p className="text-sm font-semibold text-ink">{site.name}</p>
                <p className="text-xs text-taupe-500">Available for work</p>
              </div>
            </div>
          </aside>

          <div className="flex min-w-0 flex-1 flex-col">
            <div className="flex items-center justify-between border-b border-taupe-200/50 px-5 py-3.5">
              <p className="font-display text-lg font-bold text-ink">Ask Amanda</p>
              {messages.length > 0 && (
                <button type="button" disabled={busy} onClick={() => setMessages([])} className="text-sm font-semibold text-taupe-500 transition-colors hover:text-ink lg:hidden">
                  + New chat
                </button>
              )}
            </div>

            <div ref={pane} className="min-h-0 flex-1 overflow-y-auto px-4 py-6 sm:px-8">
              {messages.length === 0 ? (
                <div className="mx-auto flex min-h-full max-w-[760px] flex-col items-center justify-center">
                  <Avatar size="h-14 w-14" />
                  <p className="mt-5 text-center font-display text-[clamp(1.8rem,3.4vw,2.6rem)] font-bold leading-tight text-ink">What would you like to know?</p>
                  <div className="mt-8 grid w-full grid-cols-1 gap-3 sm:grid-cols-2">
                    {CARDS.map((c) => (
                      <button key={c.title} type="button" onClick={() => send(c.question)} className="rounded-2xl border border-taupe-200/60 px-4 py-3 text-left transition-colors hover:bg-blush-100">
                        <span className="block text-sm font-semibold text-ink">{c.title}</span>
                        <span className="mt-0.5 block text-sm text-taupe-500">{c.question}</span>
                      </button>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="mx-auto max-w-[760px] space-y-6">
                  {messages.map((m, i) =>
                    m.role === "user" ? (
                      <p key={i} className="ml-auto w-fit max-w-[80%] rounded-3xl bg-blush-100 px-4 py-2.5 text-base text-ink">{m.text}</p>
                    ) : (
                      <AmandaMessage key={i} message={m} shown={i === messages.length - 1 ? shown : Infinity} />
                    )
                  )}
                  {thinking && (
                    <div className="flex items-center gap-3" aria-label="Amanda is typing">
                      <Avatar />
                      <span className="animate-pulse text-xl leading-none tracking-widest text-taupe-400">•••</span>
                    </div>
                  )}
                </div>
              )}
            </div>

            <div className="px-4 pb-3 sm:px-8">
              <form onSubmit={submit} className="mx-auto max-w-[760px]">
                <label htmlFor="ask-amanda" className="sr-only">Ask Amanda a question</label>
                <div className="flex items-center gap-2 rounded-3xl border border-taupe-200/70 bg-cream-100 py-2 pl-5 pr-2 shadow-card transition-shadow focus-within:shadow-soft">
                  <input
                    id="ask-amanda"
                    value={draft}
                    onChange={(e) => setDraft(e.target.value)}
                    placeholder="Ask anything about me"
                    autoComplete="off"
                    className="h-11 min-w-0 flex-1 bg-transparent text-base text-ink outline-none placeholder:text-taupe-300"
                  />
                  <button type="submit" aria-label="Send" disabled={!draft.trim() || busy} className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-blush-300 text-ink transition-opacity disabled:opacity-40">
                    ↑
                  </button>
                </div>
                <p aria-live="polite" className="mt-2 text-center text-xs text-taupe-400">Automated answers from this site&apos;s info, not a live chat with Amanda.</p>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
