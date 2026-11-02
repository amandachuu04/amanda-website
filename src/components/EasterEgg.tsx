import { useEffect, useLayoutEffect, useRef, useState, useSyncExternalStore } from "react";
import { AnimatePresence, motion } from "framer-motion";

const EGGS: Record<string, string> = {
  home: "I'm into boba, concerts, shopping, and music.",
  about: "I speak English, Cantonese, and Mandarin.",
  projects: "My Linking Narratives project turns “Sweet Dreams” by J-Hope and Miguel into a story you click through.",
  contact: "Hi from Virginia! I'm open to internships, freelance design, and collaborative projects.",
  floraflow: "Most students I surveyed said they only stay focused for 20 to 30 minutes. That's a big part of why FloraFlow exists.",
};
export const EGG_COUNT = Object.keys(EGGS).length;

type EggState = { found: string[]; open: string | null; anchor: HTMLElement | null; openedAt: number };

// Lives in memory only, so finding flowers starts over on refresh.
let state: EggState = { found: [], open: null, anchor: null, openedAt: 0 };
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

function discover(id: string, anchor: HTMLElement) {
  const found = state.found.includes(id) ? state.found : [...state.found, id];
  const finished = found.length === EGG_COUNT && state.found.length < EGG_COUNT;
  setState({ found, open: finished ? "all" : id, anchor, openedAt: performance.now() });
  const box = anchor.getBoundingClientRect();
  window.dispatchEvent(new CustomEvent("flower-burst", { detail: { x: box.left + box.width / 2, y: box.top + box.height / 2, count: finished ? 40 : 14 } }));
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
      onClick={(e) => discover(id, e.currentTarget)}
      className={`inline-flex h-7 w-7 items-center justify-center text-base leading-none transition-opacity ${isFound ? "text-blush-500" : "text-blush-400 opacity-60 hover:opacity-100"} ${className}`}
    >
      <span aria-hidden>✿</span>
    </motion.button>
  );
}

const NOTE_SECONDS = 5;
const NOTE_GAP = 14; // px between the flower and the note
const NAV_HEIGHT = 84;
const EDGE = 12;

/** The note that pops out of a flower when it's found. */
export function EggNote() {
  const { found, open, anchor, openedAt } = useEggs();
  const all = open === "all";
  const note = useRef<HTMLDivElement>(null);
  const [spot, setSpot] = useState<{ left: number; top: number; pointer: number; below: boolean } | null>(null);
  const close = () => setState({ ...state, open: null, anchor: null });

  useEffect(() => {
    if (!open) return;
    const id = setTimeout(close, NOTE_SECONDS * 1000);
    return () => clearTimeout(id);
  }, [open, openedAt]);

  useLayoutEffect(() => {
    if (!open || !anchor) return;
    const place = () => {
      if (!note.current) return;
      if (!anchor.isConnected) return close();
      const box = anchor.getBoundingClientRect();
      const { offsetWidth: width, offsetHeight: height } = note.current;
      const center = box.left + box.width / 2;
      const left = Math.min(Math.max(center - width / 2, EDGE), window.innerWidth - width - EDGE);
      const below = box.top - height - NOTE_GAP < NAV_HEIGHT;
      setSpot({ left, top: below ? box.bottom + NOTE_GAP : box.top - height - NOTE_GAP, pointer: Math.min(Math.max(center - left, 28), width - 28), below });
    };
    place();
    window.addEventListener("scroll", place, true);
    window.addEventListener("resize", place);
    return () => {
      window.removeEventListener("scroll", place, true);
      window.removeEventListener("resize", place);
    };
  }, [open, anchor]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          key={open}
          ref={note}
          role="status"
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.7 }}
          transition={{ type: "spring", stiffness: 340, damping: 24 }}
          className="fixed z-[35] w-[min(330px,calc(100vw-24px))] rounded-[1.5rem] border border-taupe-200/60 bg-cream-50 p-5 shadow-soft"
          style={{
            left: spot?.left ?? 0,
            top: spot?.top ?? 0,
            visibility: spot ? "visible" : "hidden",
            transformOrigin: spot ? `${spot.pointer}px ${spot.below ? "0%" : "100%"}` : undefined,
          }}
        >
          {spot && (
            <span
              aria-hidden
              className={`absolute h-3.5 w-3.5 rotate-45 bg-cream-50 ${spot.below ? "-top-[8px] border-l border-t" : "-bottom-[8px] border-b border-r"} border-taupe-200/60`}
              style={{ left: spot.pointer - 7 }}
            />
          )}
          <button type="button" aria-label="Close" onClick={close} className="absolute right-4 top-3 text-xl leading-none text-taupe-400 transition-colors hover:text-ink">
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
            <a href="/contact" onClick={close} className="mt-3 inline-block rounded-pill bg-blush-100 px-4 py-2 text-sm font-semibold text-ink transition-colors hover:bg-blush-200">
              Say hello →
            </a>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
