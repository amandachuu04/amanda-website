import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { site } from "../lib/site";

const label = "text-[10px] font-semibold uppercase tracking-[0.2em] text-taupe-400";
const link = "transition-colors hover:text-ink";

export default function Footer() {
  const [pet, setPet] = useState(0);
  return (
    <footer className="relative w-full bg-blush-100 text-taupe-500">
      <div className="mx-auto grid w-full max-w-[1400px] grid-cols-1 gap-8 px-4 py-12 sm:px-8 sm:py-14 md:grid-cols-[minmax(0,1fr)_auto_auto] md:gap-14 lg:px-12 lg:pr-24">
        <div className="flex items-center gap-5">
          <img src={site.avatar} alt="" className="h-20 w-20 shrink-0 object-contain sm:h-24 sm:w-24" />
          <div>
            <p className="font-display text-[clamp(1.6rem,3vw,2.3rem)] font-bold leading-tight text-ink">
              Thanks for stopping by!
            </p>
            <p className="mt-1 text-sm">Designed by Amanda Chu · © 2026</p>
          </div>
        </div>

        <div>
          <p className={label}>Pages</p>
          <ul className="mt-3 space-y-1.5 text-sm">
            <li><a href="/" className={link}>Home</a></li>
            <li><a href="/about" className={link}>About</a></li>
            <li><a href="/projects" className={link}>Projects</a></li>
            <li><a href="/contact" className={link}>Contact</a></li>
          </ul>
        </div>

        <div>
          <p className={label}>Elsewhere</p>
          <ul className="mt-3 space-y-1.5 text-sm">
            <li><a href={site.linkedin} target="_blank" rel="noopener noreferrer" className={link}>LinkedIn ↗</a></li>
            <li><a href={site.github} target="_blank" rel="noopener noreferrer" className={link}>GitHub ↗</a></li>
            <li><a href={site.cvFile} download className={link}>Download CV</a></li>
          </ul>
          <div className="mt-4 text-sm">
            <motion.button
          type="button"
          onClick={() => setPet((p) => p + 1)}
          aria-label="Pet the flower"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="group relative inline-flex items-center gap-2 rounded-pill border border-taupe-200/60 px-3 py-1.5 transition-colors hover:bg-cream-50"
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
