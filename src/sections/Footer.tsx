import { useState } from "react";

export default function Footer() {
  const [pet, setPet] = useState(0);
  return (
    <footer className="relative w-full bg-taupe-400 py-10 text-cream-100">
      <div className="mx-auto flex w-full max-w-[1500px] flex-col items-start justify-between gap-6 px-6 sm:flex-row sm:items-center sm:px-10 lg:px-14 xl:px-24">
        <p className="font-display text-base">
          Designed by <span className="italic">Amanda Chu</span> · © 2026
        </p>

        <div className="flex items-center gap-5 text-sm">
          <button
            type="button"
            onClick={() => setPet((p) => p + 1)}
            aria-label="Pet the flower"
            className="group inline-flex items-center gap-2 rounded-pill border border-cream-100/30 px-3 py-1.5 transition-colors hover:bg-cream-100/10"
          >
            <span
              className="inline-block transition-transform group-active:scale-90"
              aria-hidden
              style={{ transform: `rotate(${pet * 20}deg)` }}
            >
              ✿
            </span>
            <span className="text-xs">
              {pet === 0 ? "pet the flower" : `petted ×${pet}`}
            </span>
          </button>
        </div>
      </div>
    </footer>
  );
}
