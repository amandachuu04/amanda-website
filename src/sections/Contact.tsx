import { FormEvent, useState } from "react";
import { motion } from "framer-motion";
import LocalClock from "../components/LocalClock";
import { site } from "../lib/site";

type Status = "idle" | "sending" | "success" | "error";

export default function Contact() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setStatus("sending");
    setErrorMessage("");
    try {
      const res = await fetch(`https://formsubmit.co/ajax/${site.email}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          name,
          email,
          message,
          _subject: `Hello from ${name || "your portfolio"}`,
          _template: "table",
          _captcha: "false",
        }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok || data.success === "false") {
        throw new Error(data.message || "Something went wrong. Please try again.");
      }
      setStatus("success");
      setName("");
      setEmail("");
      setMessage("");
    } catch (err) {
      setStatus("error");
      setErrorMessage(err instanceof Error ? err.message : "Something went wrong.");
    }
  };

  return (
    <section
      id="contact"
      className="relative w-full overflow-hidden bg-cream-100 py-24 sm:py-32"
    >
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div
          className="absolute left-1/2 top-1/3 h-[36rem] w-[36rem] -translate-x-1/2 rounded-full opacity-40 blur-3xl"
          style={{ background: "radial-gradient(circle, #F8C8C8 0%, transparent 70%)" }}
        />
      </div>

      <div className="relative mx-auto grid w-full max-w-[1500px] grid-cols-1 gap-12 px-6 sm:px-10 lg:grid-cols-12 lg:gap-16 lg:px-14 xl:px-24">
        <div className="lg:col-span-5">
          <span className="section-eyebrow">
            <span aria-hidden className="inline-block h-1.5 w-6 rounded-full bg-blush-300" />
            Contact
          </span>
          <h2 className="mt-4 font-display text-display-md font-medium text-ink">
            Let&apos;s{" "}
            <span className="italic text-taupe-500">talk.</span>
          </h2>
          <p className="mt-5 max-w-md text-base text-taupe-500 sm:text-lg">
            Open to internships, freelance design, and collaborative projects. The
            inbox is always tidy.
          </p>

          <dl className="mt-10 space-y-5 text-sm">
            <ContactRow label="Email" value={site.email} href={`mailto:${site.email}`} />
            <ContactRow label="Phone" value={site.phone} href={`tel:${site.phone.replace(/-/g, "")}`} />
            <ContactRow label="GitHub" value="@amandachuu04" href={site.github} />
            <ContactRow label="LinkedIn" value="amandaachu" href={site.linkedin} />
            <div className="border-t border-taupe-200/50 pt-5 text-sm text-taupe-500">
              <LocalClock />
            </div>
          </dl>
        </div>

        <motion.form
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          onSubmit={onSubmit}
          className="relative lg:col-span-7"
        >
          <div className="rounded-[2rem] border border-taupe-200/40 bg-cream-50 p-7 shadow-card sm:p-10">
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
              <Field label="Name" id="name">
                <input
                  id="name"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Your name"
                  className="w-full rounded-2xl border border-taupe-200/60 bg-cream-100 px-4 py-3 text-base text-ink placeholder:text-taupe-300 focus:border-taupe-400 focus:outline-none"
                />
              </Field>
              <Field label="Email" id="email">
                <input
                  id="email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@email.com"
                  className="w-full rounded-2xl border border-taupe-200/60 bg-cream-100 px-4 py-3 text-base text-ink placeholder:text-taupe-300 focus:border-taupe-400 focus:outline-none"
                />
              </Field>
            </div>
            <div className="mt-5">
              <Field label="Message" id="message">
                <textarea
                  id="message"
                  required
                  rows={6}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Tell me about your project, role, or idea…"
                  className="w-full resize-none rounded-2xl border border-taupe-200/60 bg-cream-100 px-4 py-3 text-base text-ink placeholder:text-taupe-300 focus:border-taupe-400 focus:outline-none"
                />
              </Field>
            </div>
            <div className="mt-7 flex flex-wrap items-center justify-between gap-4">
              <p
                className={`text-xs ${
                  status === "success"
                    ? "text-taupe-600"
                    : status === "error"
                    ? "text-red-500"
                    : "text-taupe-400"
                }`}
                role={status === "error" ? "alert" : undefined}
                aria-live="polite"
              >
                {status === "success"
                  ? "Thanks! Your message is on its way."
                  : status === "error"
                  ? errorMessage || "Something went wrong. Please try again."
                  : status === "sending"
                  ? "Sending…"
                  : "Pressing send will deliver your message straight to my inbox."}
              </p>
              <button
                type="submit"
                disabled={status === "sending"}
                className="btn-primary disabled:cursor-not-allowed disabled:opacity-60"
              >
                {status === "sending" ? "Sending…" : "Send message"}
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden>
                  <path d="M5 12h14m0 0-5-5m5 5-5 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
            </div>
          </div>
        </motion.form>
      </div>
    </section>
  );
}

function ContactRow({
  label,
  value,
  href,
}: {
  label: string;
  value: string;
  href: string;
}) {
  return (
    <div className="flex items-center gap-6">
      <dt className="w-20 text-[10px] font-semibold uppercase tracking-[0.2em] text-taupe-400">
        {label}
      </dt>
      <dd className="flex-1">
        <a
          href={href}
          className="group inline-flex items-center gap-2 font-display text-lg text-ink transition-colors hover:text-taupe-500"
        >
          {value}
          <span
            aria-hidden
            className="opacity-0 transition-all group-hover:translate-x-1 group-hover:opacity-100"
          >
            ↗
          </span>
        </a>
      </dd>
    </div>
  );
}

function Field({
  label,
  id,
  children,
}: {
  label: string;
  id: string;
  children: React.ReactNode;
}) {
  return (
    <label htmlFor={id} className="block">
      <span className="mb-2 block text-[10px] font-semibold uppercase tracking-[0.2em] text-taupe-400">
        {label}
      </span>
      {children}
    </label>
  );
}
