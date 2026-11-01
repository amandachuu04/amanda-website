import { useEffect, useState, type MouseEvent as ReactMouseEvent } from "react";
import { motion } from "framer-motion";

export type LightboxItem =
  | { kind: "image"; src: string; alt: string; caption?: string }
  | { kind: "video"; src: string; poster?: string; caption?: string };

export default function Lightbox({
  items,
  index,
  onClose,
  onChange,
}: {
  items: LightboxItem[];
  index: number;
  onClose: () => void;
  onChange: (i: number) => void;
}) {
  const item = items[index];
  const [zoomed, setZoomed] = useState(false);
  const [zoomOrigin, setZoomOrigin] = useState({ x: 50, y: 50 });

  useEffect(() => {
    // Pin the page in place so opening and closing keeps the scroll position.
    const y = window.scrollY;
    const { style } = document.body;
    const prev = { position: style.position, top: style.top, width: style.width };
    style.position = "fixed";
    style.top = `-${y}px`;
    style.width = "100%";
    return () => {
      Object.assign(style, prev);
      window.scrollTo({ top: y, behavior: "instant" });
    };
  }, []);

  useEffect(() => {
    setZoomed(false);
    setZoomOrigin({ x: 50, y: 50 });
  }, [index]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight" && items.length > 1)
        onChange((index + 1) % items.length);
      if (e.key === "ArrowLeft" && items.length > 1)
        onChange((index - 1 + items.length) % items.length);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [index, items.length, onChange, onClose]);

  const handleImageClick = (e: ReactMouseEvent<HTMLImageElement>) => {
    e.stopPropagation();
    if (zoomed) {
      setZoomed(false);
      return;
    }
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setZoomOrigin({ x, y });
    setZoomed(true);
  };

  if (!item) return null;

  const showNav = items.length > 1;

  return (
    <motion.div
      role="dialog"
      aria-modal="true"
      onClick={onClose}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      className="fixed inset-0 z-[100] flex flex-col bg-ink/90 backdrop-blur-sm"
    >
      <div className="flex items-center justify-between p-5 text-cream-50">
        <span className="font-sans text-xs tracking-[0.22em] text-cream-50/70">
          {String(index + 1).padStart(2, "0")} /{" "}
          {String(items.length).padStart(2, "0")}
        </span>
        <motion.button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            onClose();
          }}
          aria-label="Close"
          whileHover={{ rotate: 90, scale: 1.08 }}
          whileTap={{ scale: 0.92 }}
          transition={{ type: "spring", stiffness: 280, damping: 16 }}
          className="grid h-10 w-10 place-items-center rounded-full border border-cream-50/20 transition-colors hover:bg-cream-50/10"
        >
          <span aria-hidden className="text-lg">
            ×
          </span>
        </motion.button>
      </div>

      <div className="relative flex min-h-0 flex-1 items-center justify-center overflow-hidden px-16 pb-4 sm:px-20">
        {showNav && (
          <motion.button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onChange((index - 1 + items.length) % items.length);
            }}
            aria-label="Previous"
            initial={{ x: 0, y: "-50%" }}
            whileHover={{ x: -3, y: "-50%", scale: 1.05 }}
            whileTap={{ y: "-50%", scale: 0.92 }}
            transition={{ type: "spring", stiffness: 320, damping: 18 }}
            className="absolute left-4 top-1/2 z-10 grid h-12 w-12 place-items-center rounded-full border border-cream-50/20 text-cream-50 transition-colors hover:bg-cream-50/10 sm:left-8"
          >
            <span aria-hidden>←</span>
          </motion.button>
        )}

        {item.kind === "video" ? (
          <motion.video
            key={item.src}
            src={item.src}
            poster={item.poster}
            controls
            autoPlay
            playsInline
            onClick={(e) => e.stopPropagation()}
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
            className="h-auto max-h-full w-auto max-w-full rounded-xl"
          />
        ) : (
          <motion.img
            key={item.src}
            src={item.src}
            alt={item.alt}
            onClick={handleImageClick}
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: zoomed ? 2 : 1 }}
            transition={{ duration: 0.3 }}
            style={{
              transformOrigin: `${zoomOrigin.x}% ${zoomOrigin.y}%`,
              cursor: zoomed ? "zoom-out" : "zoom-in",
              willChange: "transform",
              backfaceVisibility: "hidden",
              WebkitBackfaceVisibility: "hidden",
            }}
            className="h-auto max-h-full w-auto max-w-full rounded-xl object-contain"
          />
        )}

        {showNav && (
          <motion.button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onChange((index + 1) % items.length);
            }}
            aria-label="Next"
            initial={{ x: 0, y: "-50%" }}
            whileHover={{ x: 3, y: "-50%", scale: 1.05 }}
            whileTap={{ y: "-50%", scale: 0.92 }}
            transition={{ type: "spring", stiffness: 320, damping: 18 }}
            className="absolute right-4 top-1/2 z-10 grid h-12 w-12 place-items-center rounded-full border border-cream-50/20 text-cream-50 transition-colors hover:bg-cream-50/10 sm:right-8"
          >
            <span aria-hidden>→</span>
          </motion.button>
        )}
      </div>

      {item.caption && (
        <p className="flex-shrink-0 px-5 pb-6 text-center text-sm text-cream-50/70">
          {item.caption}
        </p>
      )}
    </motion.div>
  );
}
