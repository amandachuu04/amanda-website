import { useEffect, useSyncExternalStore } from "react";
import { AnimatePresence, motion } from "framer-motion";

const EGGS: Record<string, string> = {
  home: "I'm into boba, concerts, shopping, and music.",
  about: "I speak English, Cantonese, and Mandarin.",
  projects: "My Linking Narratives project turns “Sweet Dreams” by J-Hope and Miguel into a story you click through.",
  contact: "Hi from Virginia! I'm open to internships, freelance design, and collaborative projects.",
  floraflow: "Most students I surveyed said they only stay focused for 20 to 30 minutes. That's a big part of why FloraFlow exists.",
};
export const EGG_COUNT = Object.keys(EGGS).length;

const STORAGE_KEY = "hidden-flowers";

function loadFound(): string[] {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) ?? "[]");
  } catch {
    return [];
  }
}

type EggState = { found: string[]; open: string | null };

let state: EggState = { found: loadFound(), open: null };
const listeners = new Set<() => void>();

function setState(next: EggState) {
  state = next;
  listeners.forEach((l) => l());
}

export function useEggs() {
  return useSyncExternalStore(
    (l) => {
      listeners.add(l);
      return () => listeners.delete(l);
    },
    () => state
  );
}

function discover(id: string, x: number, y: number) {
  const found = state.found.includes(id) ? state.found : [...state.found, id];
  const finished = found.length === EGG_COUNT && state.found.length < EGG_COUNT;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(found));
  } catch {
    // Progress just won't carry over to the next visit.
  }
  setState({ found, open: finished ? "all" : id });
  window.dispatchEvent(new CustomEvent("flower-burst", { detail: { x, y, count: finished ? 40 : 14 } }));
}

/** A tiny flower hidden on a page. */
export function EasterEgg({ id, className = "" }: { id: keyof typeof EGGS; className?: string }) {
  const { found } = useEggs();
  const isFound = found.includes(id);
  return (
    <motion.button
      type="button"
      aria-label="Hidden flower"
      whileHover={{ rotate: 45, scale: 1.3 }}
      whileTap={{ scale: 0.8 }}
      onClick={(e) => discover(id, e.clientX, e.clientY)}
      className={`inline-flex h-7 w-7 items-center justify-center text-base leading-none transition-opacity ${isFound ? "text-blush-500" : "text-blush-400 opacity-60 hover:opacity-100"} ${className}`}
    >
      <span aria-hidden>✿</span>
    </motion.button>
  );
}

/** The note that appears when a flower is found. */
export function EggNote() {
  const { found, open } = useEggs();
  const all = open === "all";

  useEffect(() => {
    if (!open || all) return;
    const id = setTimeout(() => setState({ ...state, open: null }), 8000);
    return () => clearTimeout(id);
  }, [open, all]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          key={open}
          role="status"
          initial={{ opacity: 0, y: 24, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 12 }}
          transition={{ type: "spring", stiffness: 260, damping: 24 }}
          className="fixed bottom-4 left-4 right-4 z-50 rounded-[1.5rem] border border-taupe-200/60 bg-cream-50 p-5 shadow-soft sm:left-6 sm:right-auto sm:w-[360px]"
        >
          <button type="button" aria-label="Close" onClick={() => setState({ ...state, open: null })} className="absolute right-4 top-3 text-xl leading-none text-taupe-400 transition-colors hover:text-ink">
            ×
          </button>
          <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-taupe-400">
            ✿ {found.length} of {EGG_COUNT} flowers found
          </p>
          <p className="mt-2 font-display text-xl font-bold text-ink">{all ? "You found them all!" : "You found a hidden flower!"}</p>
          <p className="mt-1 text-sm leading-relaxed text-taupe-500">
            {all ? "Thanks for exploring my site so closely. I'd love to hear from you." : EGGS[open]}
          </p>
          {all && (
            <a href="/contact" onClick={() => setState({ ...state, open: null })} className="mt-3 inline-block rounded-pill bg-blush-100 px-4 py-2 text-sm font-semibold text-ink transition-colors hover:bg-blush-200">
              Say hello →
            </a>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
