import { FormEvent, useState } from "react";
import { motion } from "framer-motion";
import LocalClock from "../components/LocalClock";
import { site } from "../lib/site";

const WEB3FORMS_ACCESS_KEY = "8deecd1c-a55c-486d-80d2-fc6dbb91ee66";

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
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          access_key: WEB3FORMS_ACCESS_KEY,
          subject: `Hello from ${name || "your portfolio"}`,
          from_name: name || "Portfolio contact form",
          name,
          email,
          message,
        }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok || !data.success) {
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
      className="relative w-full overflow-hidden bg-cream-100 pb-5 pt-24 sm:pt-32"
    >
      <div className="relative mx-auto w-full max-w-[1400px] px-4 sm:px-8 lg:px-12">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className="grid overflow-hidden rounded-[2rem] border border-taupe-200/40 shadow-soft lg:grid-cols-[minmax(0,1fr)_minmax(0,1.25fr)]"
        >
          <div className="relative flex flex-col bg-blush-100 p-7 text-ink sm:p-10 lg:p-12">
            <span className="inline-flex w-fit items-center gap-2 rounded-pill border border-taupe-200/70 bg-cream-50/70 px-3 py-1.5 text-xs font-semibold text-taupe-500">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-blush-300 opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-blush-400" />
              </span>
              Available for work
            </span>
            <h2 className="mt-8 font-display text-[clamp(3rem,7vw,5.5rem)] font-bold leading-[0.95]">
              Let&apos;s <span className="italic text-taupe-500">talk.</span>
            </h2>
            <p className="mt-5 max-w-sm text-base text-taupe-500 sm:text-lg">
              Open to internships, freelance design, and collaborative projects.
            </p>

            <motion.dl
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: "-80px" }}
              variants={{ hidden: {}, show: { transition: { staggerChildren: 0.06 } } }}
              className="mt-10 divide-y divide-taupe-200/60 border-y border-taupe-200/60"
            >
              <ContactRow label="Email" value={site.email} href={`mailto:${site.email}`} />
              <ContactRow label="Phone" value={site.phone} href={`tel:${site.phone.replace(/-/g, "")}`} />
              <ContactRow label="GitHub" value="@amandachuu04" href={site.github} />
              <ContactRow label="LinkedIn" value="amandaachu" href={site.linkedin} />
            </motion.dl>

            <p className="mt-auto pt-8 text-sm text-taupe-500">
              <LocalClock />
            </p>
          </div>

        <motion.form
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          onSubmit={onSubmit}
          className="relative flex flex-col bg-cream-50 p-7 sm:p-10 lg:p-12"
        >
          <div className="flex flex-1 flex-col">
            <p className="section-eyebrow">Send a message</p>
            <p className="mb-8 mt-3 font-display text-2xl font-bold text-ink sm:text-3xl">Tell me what you&apos;re working on.</p>
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
              <Field label="Name" id="name">
                <input
                  id="name"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Your name"
                  className="input-soft w-full rounded-2xl border border-taupe-200/60 bg-cream-100 px-4 py-3 text-base text-ink placeholder:text-taupe-300 focus:border-taupe-400 focus:outline-none"
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
                  className="input-soft w-full rounded-2xl border border-taupe-200/60 bg-cream-100 px-4 py-3 text-base text-ink placeholder:text-taupe-300 focus:border-taupe-400 focus:outline-none"
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
                  className="input-soft w-full resize-none rounded-2xl lg:min-h-[17rem] border border-taupe-200/60 bg-cream-100 px-4 py-3 text-base text-ink placeholder:text-taupe-300 focus:border-taupe-400 focus:outline-none"
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
              <motion.button
                type="submit"
                disabled={status === "sending"}
                whileHover={status === "sending" ? undefined : { y: -2 }}
                whileTap={status === "sending" ? undefined : { y: 0, scale: 0.97 }}
                transition={{ type: "spring", stiffness: 320, damping: 18 }}
                className="btn-primary group relative disabled:cursor-not-allowed disabled:opacity-60"
              >
                {status === "sending" ? "Sending…" : "Send message"}
                <span className="inline-flex w-4 overflow-hidden">
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    aria-hidden
                    className="transition-transform duration-300 group-hover:translate-x-1"
                  >
                    <path d="M5 12h14m0 0-5-5m5 5-5 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </span>
              </motion.button>
            </div>
          </div>
        </motion.form>
        </motion.div>
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
    <motion.div
      variants={{
        hidden: { opacity: 0, x: -8 },
        show: { opacity: 1, x: 0, transition: { duration: 0.45 } },
      }}
    >
      <a href={href} className="group grid grid-cols-[minmax(0,1fr)_auto] items-center gap-x-4 gap-y-1 py-4 transition-colors hover:text-taupe-500 sm:grid-cols-[5rem_minmax(0,1fr)_auto]">
        <dt className="col-span-2 text-[10px] sm:col-span-1 font-semibold uppercase tracking-[0.2em] text-taupe-400">{label}</dt>
        <dd className="min-w-0 break-words font-display text-lg">{value}</dd>
        <span aria-hidden className="transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1">↗</span>
      </a>
    </motion.div>
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
