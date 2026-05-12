import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { navLinks, site } from "../lib/site";

export default function Nav() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded-pill focus:bg-taupe-400 focus:px-4 focus:py-2 focus:text-cream-100"
      >
        Skip to content
      </a>

      <motion.header
        initial={{ y: -40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="fixed left-0 right-0 top-0 z-40 px-4 pt-4 sm:px-6 sm:pt-6"
      >
        <nav
          aria-label="Primary"
          className={`mx-auto flex max-w-7xl items-center justify-between rounded-pill border border-taupe-200/50 px-3 py-2 transition-all sm:px-5 ${
            scrolled
              ? "bg-cream-50/85 backdrop-blur-md shadow-soft"
              : "bg-cream-50/55 backdrop-blur"
          }`}
        >
          <a
            href="#hero"
            className="flex items-center gap-2 whitespace-nowrap rounded-pill px-3 py-1.5 font-display text-lg font-semibold text-ink"
          >
            <span
              aria-hidden
              className="inline-block h-2.5 w-2.5 rounded-full bg-blush-300"
            />
            {site.name}
          </a>

          <ul className="hidden items-center gap-1 lg:flex">
            {navLinks.map((l) => (
              <li key={l.id}>
                <a
                  href={`#${l.id}`}
                  className="rounded-pill px-4 py-2 text-sm font-medium text-taupe-500 transition-colors hover:bg-blush-100 hover:text-ink"
                >
                  {l.label}
                </a>
              </li>
            ))}
          </ul>

          <a
            href={site.cvFile}
            download
            className="hidden whitespace-nowrap rounded-pill bg-taupe-400 px-4 py-2 text-sm font-semibold text-cream-100 transition-all hover:bg-taupe-500 hover:-translate-y-0.5 lg:inline-flex"
          >
            Download CV
          </a>

          <button
            onClick={() => setOpen((v) => !v)}
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            className="inline-flex h-10 w-10 items-center justify-center rounded-pill border border-taupe-200/60 bg-cream-50 text-taupe-500 lg:hidden"
          >
            <span className="sr-only">Menu</span>
            <svg width="18" height="14" viewBox="0 0 18 14" fill="none" aria-hidden>
              <path
                d={open ? "M3 3 L15 11 M15 3 L3 11" : "M2 2 H16 M2 7 H16 M2 12 H10"}
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
          </button>
        </nav>

        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.2 }}
              className="mx-auto mt-2 max-w-7xl overflow-hidden rounded-3xl border border-taupe-200/50 bg-cream-50/95 p-3 shadow-soft backdrop-blur lg:hidden"
            >
              <ul className="flex flex-col">
                {navLinks.map((l) => (
                  <li key={l.id}>
                    <a
                      onClick={() => setOpen(false)}
                      href={`#${l.id}`}
                      className="block rounded-2xl px-4 py-3 text-base font-medium text-taupe-500 hover:bg-blush-100 hover:text-ink"
                    >
                      {l.label}
                    </a>
                  </li>
                ))}
                <li>
                  <a
                    onClick={() => setOpen(false)}
                    href={site.cvFile}
                    download
                    className="mt-1 block rounded-2xl bg-taupe-400 px-4 py-3 text-center text-base font-semibold text-cream-100"
                  >
                    Download CV
                  </a>
                </li>
              </ul>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.header>
    </>
  );
}
