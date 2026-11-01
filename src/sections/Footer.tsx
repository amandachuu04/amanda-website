import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { site } from "../lib/site";

export default function Footer() {
  const [pet, setPet] = useState(0);
  return (
    <footer className="relative w-full overflow-hidden bg-taupe-400 pt-14 text-cream-100">
      <div className="mx-auto w-full max-w-[1400px] px-4 sm:px-8 lg:px-12">
        <div className="flex flex-wrap items-start justify-between gap-8 border-b border-cream-100/20 pb-10">
          <div>
            <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-cream-100/60">Pages</p>
            <ul className="mt-3 space-y-1.5 text-sm">
              <li><a href="/" className="hover:underline">Home</a></li>
              <li><a href="/about" className="hover:underline">About</a></li>
              <li><a href="/projects" className="hover:underline">Projects</a></li>
              <li><a href="#contact" className="hover:underline">Contact</a></li>
            </ul>
          </div>
          <div>
            <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-cream-100/60">Elsewhere</p>
            <ul className="mt-3 space-y-1.5 text-sm">
              <li><a href={site.linkedin} target="_blank" rel="noopener noreferrer" className="hover:underline">LinkedIn ↗</a></li>
              <li><a href={site.github} target="_blank" rel="noopener noreferrer" className="hover:underline">GitHub ↗</a></li>
              <li><a href={site.cvFile} download className="hover:underline">Download CV</a></li>
            </ul>
          </div>
        </div>
        <p aria-hidden className="select-none whitespace-nowrap pt-6 font-display text-[clamp(3.5rem,15vw,13rem)] font-bold leading-[0.85] tracking-tight text-cream-100/90">
          Amanda Chu
        </p>
      </div>
      <div className="mx-auto flex w-full max-w-[1400px] flex-col items-start justify-between gap-4 px-4 py-6 sm:flex-row sm:items-center sm:px-8 lg:px-12">
        <p className="font-display text-base">
          Designed by <span className="italic">Amanda Chu</span> · © 2026
        </p>

        <div className="flex items-center gap-5 text-sm">
          <motion.button
            type="button"
            onClick={() => setPet((p) => p + 1)}
            aria-label="Pet the flower"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="group relative inline-flex items-center gap-2 rounded-pill border border-cream-100/30 px-3 py-1.5 transition-colors hover:bg-cream-100/10"
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
    </footer>
  );
}
