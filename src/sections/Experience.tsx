import { motion } from "framer-motion";
import SectionHeader from "../components/SectionHeader";
import { experiences } from "../lib/site";

export default function Experience() {
  return (
    <section
      id="experience"
      className="relative w-full overflow-hidden bg-taupe-50 py-24 sm:py-32"
    >
      <div className="mx-auto w-full max-w-[1500px] px-6 sm:px-10 lg:px-14 xl:px-24">
        <SectionHeader
          eyebrow="Experience"
          title={
            <>
              Where I&apos;ve{" "}
              <span className="italic text-taupe-500">spent my time</span>
            </>
          }
        />

        <ol className="relative mt-16 grid grid-cols-1 gap-6 lg:grid-cols-12 lg:gap-10">
          {/* timeline rail */}
          <div
            aria-hidden
            className="absolute left-4 top-2 bottom-2 hidden w-px bg-gradient-to-b from-blush-300 via-taupe-200 to-cream-100 lg:block lg:left-[calc(33.333%-2px)]"
          />

          {experiences.map((e, i) => (
            <motion.li
              key={e.company + e.dates}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: "-80px" }}
              variants={{
                hidden: { opacity: 0, y: 24 },
                show: {
                  opacity: 1,
                  y: 0,
                  transition: {
                    duration: 0.55,
                    delay: 0.05 * i,
                    when: "beforeChildren",
                    staggerChildren: 0.05,
                  },
                },
              }}
              className="relative grid grid-cols-1 gap-4 lg:col-span-12 lg:grid-cols-12 lg:gap-10"
            >
              {/* date / role label */}
              <div className="relative lg:col-span-4 lg:pr-10">
                <motion.span
                  aria-hidden
                  className="absolute left-[-2px] top-2 hidden h-3 w-3 rounded-full border-2 border-cream-100 bg-blush-300 lg:block"
                  style={{ left: "calc(100% - 6px)" }}
                  initial={{ scale: 0 }}
                  whileInView={{ scale: [0, 1.4, 1] }}
                  viewport={{ once: true, margin: "-80px" }}
                  transition={{ duration: 0.6, delay: 0.05 * i + 0.1, ease: "easeOut" }}
                />
                <p className="font-display text-sm font-semibold uppercase tracking-[0.2em] text-taupe-400">
                  {e.dates}
                </p>
                <p className="mt-2 font-display text-xl font-medium text-ink">
                  {e.role}
                </p>
                <p className="mt-1 text-sm text-taupe-500">{e.location}</p>
              </div>

              <motion.article
                whileHover={{ y: -4 }}
                transition={{ type: "spring", stiffness: 240, damping: 18 }}
                className="relative rounded-3xl border border-taupe-200/40 bg-cream-50 p-6 shadow-card transition-shadow hover:shadow-soft sm:p-7 lg:col-span-8 lg:p-8"
              >
                <header className="flex flex-wrap items-baseline justify-between gap-2">
                  <h3 className="font-display text-2xl font-medium text-ink">
                    {e.company}
                  </h3>
                </header>
                <ul className="mt-4 space-y-3 text-sm text-taupe-600 sm:text-base">
                  {e.bullets.map((b, j) => (
                    <motion.li
                      key={j}
                      variants={{
                        hidden: { opacity: 0, x: -8 },
                        show: { opacity: 1, x: 0, transition: { duration: 0.4 } },
                      }}
                      className="flex gap-3"
                    >
                      <span
                        aria-hidden
                        className="mt-2 inline-block h-1.5 w-1.5 flex-shrink-0 rounded-full bg-blush-300"
                      />
                      <span>{b}</span>
                    </motion.li>
                  ))}
                </ul>
              </motion.article>
            </motion.li>
          ))}
        </ol>
      </div>
    </section>
  );
}
