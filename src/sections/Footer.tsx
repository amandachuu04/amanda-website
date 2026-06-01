import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

export default function Footer() {
  const [pet, setPet] = useState(0);
  return (
    <footer className="relative w-full bg-taupe-400 py-10 text-cream-100">
      <div className="mx-auto flex w-full max-w-[1500px] flex-col items-start justify-between gap-6 px-6 sm:flex-row sm:items-center sm:px-10 lg:px-14 xl:px-24">
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
