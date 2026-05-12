import { motion } from "framer-motion";
import SectionHeader from "../components/SectionHeader";
import { education } from "../lib/site";

export default function Education() {
  return (
    <section
      id="education"
      className="relative w-full overflow-hidden bg-cream-100 py-24 sm:py-32"
    >
      <div className="mx-auto w-full max-w-[1500px] px-6 sm:px-10 lg:px-14 xl:px-24">
        <SectionHeader
          eyebrow="Education"
          title={
            <>
              School &{" "}
              <span className="italic text-taupe-500">study</span>
            </>
          }
        />

        <div className="mt-14 grid grid-cols-1 gap-6 md:grid-cols-2">
          {education.map((e, i) => (
            <motion.article
              key={e.degree}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.55, delay: 0.05 * i }}
              className="group relative overflow-hidden rounded-3xl border border-taupe-200/40 bg-blush-100 p-7 shadow-card sm:p-9"
            >
              <span className="section-eyebrow">{e.dates}</span>
              <h3 className="mt-4 font-display text-2xl font-medium text-ink sm:text-3xl">
                {e.degree}
              </h3>
              <p className="mt-2 text-base text-taupe-500">
                {e.school} · {e.location}
              </p>
              {e.note && (
                <p className="mt-5 inline-flex items-center gap-2 rounded-pill bg-cream-50/80 px-3 py-1.5 text-xs font-medium text-taupe-500 backdrop-blur">
                  <span aria-hidden className="h-1.5 w-1.5 rounded-full bg-blush-300" />
                  {e.note}
                </p>
              )}
              <span
                aria-hidden
                className="pointer-events-none absolute -right-10 -top-10 font-display text-[10rem] leading-none text-cream-50 opacity-80 transition-transform group-hover:rotate-12"
              >
                ✦
              </span>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
