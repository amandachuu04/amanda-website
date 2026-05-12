import { motion } from "framer-motion";
import { ReactNode } from "react";

export default function SectionHeader({
  eyebrow,
  title,
  intro,
}: {
  eyebrow: string;
  title: ReactNode;
  intro?: ReactNode;
}) {
  return (
    <div className="max-w-3xl">
      <motion.span
        initial={{ opacity: 0, x: -10 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.5 }}
        className="section-eyebrow"
      >
        <span aria-hidden className="inline-block h-1.5 w-6 rounded-full bg-blush-300" />
        {eyebrow}
      </motion.span>
      <motion.h2
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.6, delay: 0.05 }}
        className="mt-4 font-display text-display-md font-medium text-ink"
      >
        {title}
      </motion.h2>
      {intro && (
        <motion.p
          initial={{ opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mt-5 text-base text-taupe-500 sm:text-lg"
        >
          {intro}
        </motion.p>
      )}
    </div>
  );
}
