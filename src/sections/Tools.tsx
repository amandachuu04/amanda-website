import { motion } from "framer-motion";
import SectionHeader from "../components/SectionHeader";
import { toolGroups } from "../lib/site";

export default function Tools() {
  return (
    <section
      id="tools"
      className="relative w-full overflow-hidden bg-blush-100 py-24 sm:py-32"
    >
      <div aria-hidden className="absolute inset-0 grain opacity-50" />
      <div className="relative mx-auto w-full max-w-[1500px] px-6 sm:px-10 lg:px-14 xl:px-24">
        <SectionHeader
          eyebrow="Tools"
          title={
            <>
              What I{" "}
              <span className="italic text-taupe-500">work with</span>
            </>
          }
          intro="The tools I use to design, develop, and refine digital experiences."
        />

        <div className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {toolGroups.map((g, i) => (
            <motion.div
              key={g.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.5, delay: 0.05 * i }}
              className="flex flex-col rounded-3xl border border-taupe-200/40 bg-cream-50 p-6 shadow-card"
            >
              <p className="section-eyebrow">{g.title}</p>
              <ul className="mt-5 flex flex-col gap-2.5">
                {g.items.map((item) => (
                  <li
                    key={item}
                    className="flex items-center gap-3 text-sm font-medium text-taupe-600"
                  >
                    <span
                      aria-hidden
                      className="inline-block h-1.5 w-1.5 rounded-full bg-blush-300"
                    />
                    {item}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
