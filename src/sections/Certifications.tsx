import { motion } from "framer-motion";
import { certifications } from "../lib/site";

export default function Certifications() {
  return (
    <section
      id="certifications"
      className="relative w-full overflow-hidden bg-cream-100 pb-24 sm:pb-32"
    >
      <div className="mx-auto w-full max-w-[1500px] px-6 sm:px-10 lg:px-14 xl:px-24">
        <div className="rounded-[2rem] border border-taupe-200/40 bg-gradient-to-br from-cream-50 to-blush-100 p-8 sm:p-12">
          <div className="grid grid-cols-1 items-center gap-8 lg:grid-cols-12">
            <div className="lg:col-span-4">
              <motion.span
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.5 }}
                className="section-eyebrow"
              >
                <motion.span
                  aria-hidden
                  className="inline-block h-1.5 rounded-full bg-blush-300"
                  initial={{ width: 0 }}
                  whileInView={{ width: "1.5rem" }}
                  viewport={{ once: true, margin: "-80px" }}
                  transition={{ duration: 0.6, delay: 0.15, ease: "easeOut" }}
                />
                Certifications
              </motion.span>
              <h2 className="mt-3 font-display text-3xl font-medium text-ink sm:text-4xl">
                Officially{" "}
                <span className="italic text-taupe-500">certified.</span>
              </h2>
            </div>

            <ul className="lg:col-span-8 grid grid-cols-1 gap-3 sm:grid-cols-3">
              {certifications.map((c, i) => (
                <motion.li
                  key={c.name}
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true, margin: "-80px" }}
                  transition={{ duration: 0.4, delay: 0.05 * i }}
                  whileHover={{ y: -3, scale: 1.02 }}
                  className="group flex items-center justify-between gap-3 rounded-2xl border border-taupe-200/40 bg-cream-50/90 px-5 py-4 shadow-sm backdrop-blur transition-colors hover:border-blush-300/60 hover:bg-cream-50"
                >
                  <div>
                    <p className="font-display text-base font-medium text-ink">
                      {c.name}
                    </p>
                    <p className="text-xs text-taupe-400">{c.year}</p>
                  </div>
                  <span aria-hidden className="text-taupe-300 transition-colors group-hover:text-blush-400">
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
                      <motion.path
                        d="m5 12 4 4 10-10"
                        stroke="currentColor"
                        strokeWidth="2.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        initial={{ pathLength: 0 }}
                        whileInView={{ pathLength: 1 }}
                        viewport={{ once: true, margin: "-80px" }}
                        transition={{ duration: 0.6, delay: 0.05 * i + 0.15, ease: "easeOut" }}
                      />
                    </svg>
                  </span>
                </motion.li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
