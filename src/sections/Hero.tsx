import { motion } from "framer-motion";
import Blobs from "../components/Blobs";
import Polaroids from "../components/Polaroids";
import { site } from "../lib/site";

export default function Hero() {
  return (
    <section
      id="hero"
      className="relative isolate min-h-[100svh] w-full overflow-hidden bg-cream-100 pt-28 sm:pt-32"
    >
      <div className="hero-gradient absolute inset-0 animate-gradient-pan" aria-hidden />
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-1/2 h-[150vmax] w-[150vmax] animate-gradient-spin rounded-full opacity-40 blur-3xl"
        style={{
          background:
            "conic-gradient(from 0deg, #F8C8C8, #FDF3EA, #FBDADA, #E5D8CC, #FDEDED, #F8C8C8)",
        }}
      />
      <Blobs />
      <div className="absolute inset-0 grain opacity-70" aria-hidden />

      <div className="relative mx-auto grid w-full max-w-[1600px] grid-cols-1 gap-10 px-6 pb-24 pt-8 sm:px-10 lg:grid-cols-[1.05fr_1fr] lg:gap-16 lg:px-14 lg:pt-12 xl:px-20">
        <div className="flex flex-col justify-center">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex flex-wrap items-center gap-3"
          >
            <span className="pill">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-blush-300 opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-blush-400" />
              </span>
              Available for work
            </span>
            <span className="pill">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden>
                <path
                  d="M12 22s7-7.58 7-13a7 7 0 1 0-14 0c0 5.42 7 13 7 13Z"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinejoin="round"
                />
                <circle cx="12" cy="9" r="2.5" stroke="currentColor" strokeWidth="2" />
              </svg>
              {site.location}
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.05 }}
            className="mt-6 font-display text-display-xl font-medium text-ink"
          >
            Hi, I&apos;m Amanda
            <br />
            <span className="text-taupe-500">I design &amp;</span>
            <br />
            <span className="italic text-taupe-500">build things.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="mt-7 max-w-xl text-base text-taupe-500 sm:text-lg"
          >
            Designing thoughtful digital experiences through code, creativity,
            and user-centered thinking.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.25 }}
            className="mt-9 flex flex-wrap items-center gap-3"
          >
            <a href={site.cvFile} download className="btn-primary">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden>
                <path d="M12 4v12m0 0 4-4m-4 4-4-4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M4 20h16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              </svg>
              Download CV
            </a>
            <a href="#contact" className="btn-secondary">
              Let&apos;s talk
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden>
                <path d="M5 12h14m0 0-5-5m5 5-5 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mt-10 flex items-center gap-5 text-sm text-taupe-400"
          >
            <span className="inline-flex items-center gap-2">
              <span className="h-px w-8 bg-taupe-200" />
              scroll for more
            </span>
            <motion.span
              animate={{ y: [0, 4, 0] }}
              transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
              aria-hidden
            >
              ↓
            </motion.span>
          </motion.div>
        </div>

        <div className="relative">
          <Polaroids />
        </div>
      </div>
    </section>
  );
}
