import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { site } from "../lib/site";

const link = "transition-colors hover:text-ink";

export default function Footer() {
  const [pet, setPet] = useState(0);
  return (
    <footer className="relative w-full bg-cream-100 text-taupe-500">
      <div className="mx-auto w-full max-w-[1400px] px-4 sm:px-8 lg:px-12">
        <div className="flex flex-col gap-6 border-t border-taupe-200/50 py-8 lg:flex-row lg:items-center lg:justify-between">
          <p className="font-display text-base text-ink">
            Designed by <span className="italic text-taupe-500">Amanda Chu</span> · © 2026
          </p>

          <nav aria-label="Footer" className="flex flex-wrap gap-x-6 gap-y-2 text-sm">
            <a href="/" className={link}>Home</a>
            <a href="/about" className={link}>About</a>
            <a href="/projects" className={link}>Projects</a>
            <a href="#contact" className={link}>Contact</a>
            <a href={site.linkedin} target="_blank" rel="noopener noreferrer" className={link}>LinkedIn ↗</a>
            <a href={site.github} target="_blank" rel="noopener noreferrer" className={link}>GitHub ↗</a>
            <a href={site.cvFile} download className={link}>Download CV</a>
          </nav>

          <div className="text-sm lg:mr-16">
        <motion.button
          type="button"
          onClick={() => setPet((p) => p + 1)}
          aria-label="Pet the flower"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="group relative inline-flex items-center gap-2 rounded-pill border border-taupe-200/60 px-3 py-1.5 transition-colors hover:bg-blush-100"
        >
          <motion.span
            className="relative inline-block"
            aria-hidden
            animate={{ rotate: pet * 20 }}
            transition={{ type: "spring", stiffness: 220, damping: 12 }}
          >
            ✿
            <AnimatePresence>
              {pet > 0 && (
                <motion.span
                  key={pet}
                  initial={{ opacity: 1, y: 0, scale: 0.6 }}
                  animate={{ opacity: 0, y: -18, scale: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.7, ease: "easeOut" }}
                  className="pointer-events-none absolute left-1/2 top-0 -translate-x-1/2 text-blush-300"
                >
                  ♡
                </motion.span>
              )}
            </AnimatePresence>
          </motion.span>
          <span className="text-xs">
            {pet === 0 ? "pet the flower" : `petted ×${pet}`}
          </span>
        </motion.button>
          </div>
        </div>
      </div>
    </footer>
  );
}
