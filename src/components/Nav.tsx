import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { navLinks, site } from "../lib/site";
import { Route, useRoute } from "../lib/route";

function isActive(label: string, route: Route) {
  if (label === "Home") return route.name === "home";
  if (label === "About") return route.name === "about";
  if (label === "Contact") return route.name === "contact";
  if (label === "Projects") return route.name === "projects" || route.name === "work";
  return false;
}

export default function Nav() {
  const route = useRoute();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [route]);

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
        className={`fixed left-0 right-0 top-0 z-40 border-b bg-cream-100 transition-colors ${
          scrolled || open ? "border-taupe-200/60" : "border-transparent"
        }`}
      >
        <nav aria-label="Primary" className="flex h-[4.5rem] w-full items-center justify-between px-4 sm:px-6 lg:px-8">
          <motion.a
            href="#hero"
            className="flex items-center"
            aria-label="Home"
            whileHover={{ rotate: [0, -8, 8, -5, 5, 0] }}
            whileTap={{ scale: 0.95 }}
            transition={{ duration: 0.55, ease: "easeInOut" }}
          >
            <img src="/amanda-chu-logo.png" alt="" aria-hidden className="h-8 w-auto sm:h-9" />
          </motion.a>

          <div className="hidden items-center gap-9 lg:flex">
            <ul className="flex items-center gap-8">
              {navLinks.map((l) => {
                const active = isActive(l.label, route);
                return (
                  <li key={l.label}>
                    <a
                      href={l.href}
                      aria-current={active ? "page" : undefined}
                      className={`relative block py-2 text-base font-semibold transition-colors hover:text-ink ${active ? "text-ink" : "text-taupe-500"}`}
                    >
                      {l.label}
                      {active && <motion.span layoutId="nav-underline" aria-hidden className="absolute -bottom-0.5 left-0 right-0 h-[3px] rounded-full bg-blush-300" />}
                    </a>
                  </li>
                );
              })}
            </ul>
            <a
              href={site.cvFile}
              download
              className="whitespace-nowrap rounded-pill bg-blush-100 px-5 py-2.5 text-sm font-semibold text-ink transition-colors hover:bg-blush-200"
            >
              Download CV
            </a>
          </div>

          <button
            onClick={() => setOpen((v) => !v)}
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            className="inline-flex h-10 w-10 items-center justify-center text-ink lg:hidden"
          >
            <span className="sr-only">Menu</span>
            <svg width="20" height="14" viewBox="0 0 18 14" fill="none" aria-hidden>
              <path d={open ? "M3 2 L15 12 M15 2 L3 12" : "M2 2 H16 M2 7 H16 M2 12 H16"} stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            </svg>
          </button>
        </nav>

        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ height: 0 }}
              animate={{ height: "auto" }}
              exit={{ height: 0 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
              className="overflow-hidden lg:hidden"
            >
              <ul className="flex flex-col gap-1 px-4 pb-6 pt-2 sm:px-6">
                {navLinks.map((l) => (
                  <li key={l.label}>
                    <a
                      onClick={() => setOpen(false)}
                      href={l.href}
                      className={`block py-2 font-display text-3xl font-bold ${isActive(l.label, route) ? "text-ink" : "text-taupe-500"}`}
                    >
                      {l.label}
                    </a>
                  </li>
                ))}
                <li className="mt-3">
                  <a
                    onClick={() => setOpen(false)}
                    href={site.cvFile}
                    download
                    className="inline-block rounded-pill bg-blush-100 px-5 py-2.5 text-sm font-semibold text-ink"
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
