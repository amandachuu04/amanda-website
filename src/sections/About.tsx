import { motion } from "framer-motion";
import { site } from "../lib/site";

export default function About() {
  return (
    <section
      id="about"
      className="relative w-full overflow-hidden bg-blush-100 py-24 sm:py-32"
    >
      <div aria-hidden className="absolute inset-0 grain opacity-50" />
      {/* sticky side label */}
      <div
        aria-hidden
        className="pointer-events-none absolute left-0 top-1/2 hidden -translate-y-1/2 -rotate-90 origin-left pl-6 font-display text-sm uppercase tracking-[0.3em] text-taupe-300 xl:block"
      >
        about · about · about
      </div>

      <div className="relative mx-auto grid max-w-[1500px] grid-cols-1 gap-12 px-6 sm:px-10 lg:grid-cols-12 lg:gap-16 lg:px-14 xl:px-24">
        <div className="lg:col-span-5 lg:col-start-1">
          <motion.div
            initial={{ opacity: 0, scale: 0.92, rotate: -3 }}
            whileInView={{ opacity: 1, scale: 1, rotate: -3 }}
            viewport={{ once: true, margin: "-120px" }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="relative mx-auto aspect-[4/5] w-full max-w-md"
          >
            {/* decorative offset card */}
            <div
              aria-hidden
              className="absolute -inset-3 -z-10 rounded-[2.2rem] bg-cream-100 shadow-card"
              style={{ transform: "rotate(4deg)" }}
            />
            <div className="relative h-full w-full overflow-hidden rounded-[2rem] border-2 border-cream-50 bg-cream-100 shadow-soft">
              <img
                src={site.avatar}
                alt="Avatar of Amanda Chu"
                loading="lazy"
                className="h-full w-full object-cover"
              />
            </div>
          </motion.div>
        </div>

        <div className="lg:col-span-6 lg:col-start-7">
          <motion.span
            initial={{ opacity: 0, x: -8 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5 }}
            className="section-eyebrow"
          >
            <span aria-hidden className="inline-block h-1.5 w-6 rounded-full bg-taupe-300" />
            About me
          </motion.span>

          <motion.h2
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="mt-4 font-display text-display-md font-medium text-ink"
          >
            A{" "}
            <span className="italic text-taupe-500">designer-developer</span>
            <br />
            who loves turning ideas into thoughtful digital experiences.
          </motion.h2>

          <div className="mt-8 space-y-5 text-base text-taupe-600 sm:text-lg">
            {site.about.map((p, i) => (
              <motion.p
                key={i}
                initial={{ opacity: 0, y: 8 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.5, delay: 0.05 * i }}
              >
                {p}
              </motion.p>
            ))}
          </div>

          <dl className="mt-10 grid grid-cols-2 gap-x-6 gap-y-5 sm:grid-cols-3">
            <Fact label="Based in" value="Virginia, US" />
            <Fact label="Status" value="Available" dot />
            <Fact label="Focus" value="UX · Web Dev" />
            <Fact label="School" value="George Mason" />
            <Fact label="Languages" value="EN · 粵 · 中" />
            <Fact label="Likes" value="Design + Boba" />
          </dl>
        </div>
      </div>
    </section>
  );
}

function Fact({ label, value, dot }: { label: string; value: string; dot?: boolean }) {
  return (
    <div className="border-l-2 border-taupe-200/60 pl-4">
      <dt className="text-[10px] font-semibold uppercase tracking-[0.18em] text-taupe-400">
        {label}
      </dt>
      <dd className="mt-1 inline-flex items-center gap-2 font-display text-base font-medium text-ink">
        {dot && (
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-blush-300 opacity-75" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-blush-400" />
          </span>
        )}
        {value}
      </dd>
    </div>
  );
}
