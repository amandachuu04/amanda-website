import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export default function Nav() {
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
          className={`mx-auto flex max-w-7xl items-center justify-center rounded-pill border border-taupe-200/50 px-3 py-2 transition-all sm:px-5 ${
            scrolled
              ? "bg-cream-50/85 backdrop-blur-md shadow-soft"
              : "bg-cream-50/55 backdrop-blur"
          }`}
        >
          <a
            href="#hero"
            className="flex items-center rounded-pill px-3 py-1.5"
            aria-label="Home"
          >
            <img
              src="/amanda-chu-logo.png"
              alt=""
              aria-hidden
              className="h-6 w-auto sm:h-7"
            />
          </a>
        </nav>
      </motion.header>
    </>
  );
}
