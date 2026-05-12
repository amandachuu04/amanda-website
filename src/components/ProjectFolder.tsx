import { useState } from "react";
import { motion } from "framer-motion";
import type { Project, ProjectFolder as Folder } from "../lib/site";
import { projectsHref } from "../lib/route";

type Props = {
  folder: Folder;
  previews: Project[];
  active?: boolean;
  onSelect?: (slug: Folder["slug"]) => void;
};

const THUMB_W = 100;
const THUMB_H = 80;

const SLOT_TRANSFORMS: { rotate: number; x: number; y: number }[] = [
  { rotate: -11, x: -56, y: 8 },
  { rotate: 3, x: 0, y: -10 },
  { rotate: 11, x: 56, y: 10 },
];

export default function ProjectFolder({
  folder,
  previews,
  active = false,
  onSelect,
}: Props) {
  const slots = previews.slice(0, 3);
  const [hovered, setHovered] = useState(false);

  return (
    <a
      href={projectsHref(folder.slug)}
      onClick={(e) => {
        if (onSelect) {
          e.preventDefault();
          onSelect(folder.slug);
        }
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onFocus={() => setHovered(true)}
      onBlur={() => setHovered(false)}
      className={`group relative flex flex-col items-center rounded-3xl border bg-cream-50 px-6 pb-7 pt-10 text-center shadow-card transition-all sm:px-8 sm:pb-8 sm:pt-12 ${
        active
          ? "border-blush-300 shadow-soft"
          : "border-taupe-200/40 hover:-translate-y-1 hover:shadow-soft"
      }`}
      aria-label={`${folder.label} projects`}
    >
      <div className="relative h-52 w-full sm:h-56">
        {/* z-0: back of folder (tab + back wall) */}
        <BackOfFolder />

        {/* z-10: file thumbnails, peeking out of the pocket */}
        <div className="pointer-events-none absolute inset-0 z-10">
          {slots.map((p, i) => {
            const t = SLOT_TRANSFORMS[i];
            return (
              <motion.div
                key={p.title}
                initial={false}
                animate={
                  hovered
                    ? {
                        x: t.x,
                        y: t.y,
                        rotate: t.rotate,
                        opacity: 1,
                        scale: 1,
                      }
                    : {
                        x: 0,
                        y: 28,
                        rotate: 0,
                        opacity: 0,
                        scale: 0.92,
                      }
                }
                transition={{
                  type: "spring",
                  stiffness: 220,
                  damping: 22,
                  delay: hovered ? 0.04 * i : 0,
                }}
                style={{
                  zIndex: i + 1,
                  left: `calc(50% - ${THUMB_W / 2}px)`,
                  top: "18%",
                  width: THUMB_W,
                  height: THUMB_H,
                }}
                className="absolute overflow-hidden rounded-lg ring-1 ring-cream-50/90 shadow-sticker"
              >
                <div
                  className={`h-full w-full bg-gradient-to-br ${p.swatch}`}
                >
                  {p.image ? (
                    <img
                      src={p.image}
                      alt=""
                      loading="lazy"
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center font-display text-3xl text-taupe-500/70">
                      {p.emoji}
                    </div>
                  )}
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* z-20: front pocket — covers lower portion of thumbnails */}
        <FrontOfFolder hovered={hovered} />
      </div>

      <div className="mt-5 flex flex-col items-center gap-1">
        <h3 className="font-display text-lg font-medium text-ink sm:text-xl">
          {folder.label}
        </h3>
        <p className="text-xs text-taupe-400">
          {previews.length === 0
            ? "No projects yet"
            : `${previews.length} project${previews.length === 1 ? "" : "s"}`}
        </p>
      </div>
    </a>
  );
}

function BackOfFolder() {
  return (
    <div className="pointer-events-none absolute inset-x-[2%] top-[6%] bottom-[6%] z-0">
      {/* tab */}
      <div className="absolute -top-[1px] left-[6%] h-[22%] w-[42%]">
        <div className="absolute inset-0 rounded-tl-[14px] rounded-tr-[18px] bg-blush-200" />
      </div>
      {/* back body */}
      <div className="absolute inset-x-0 top-[17%] bottom-0 rounded-2xl bg-blush-200" />
      {/* soft drop shadow behind */}
      <div className="absolute inset-x-[8%] -bottom-2 h-3 rounded-full bg-taupe-400/20 blur-md" />
    </div>
  );
}

function FrontOfFolder({ hovered }: { hovered: boolean }) {
  return (
    <motion.div
      initial={false}
      animate={{ y: hovered ? 3 : 0 }}
      transition={{ type: "spring", stiffness: 200, damping: 24 }}
      className="pointer-events-none absolute inset-x-[2%] bottom-[6%] top-[46%] z-20 overflow-hidden rounded-2xl"
    >
      <div className="absolute inset-0 bg-blush-300" />
      {/* top lip of pocket — clear shadow to separate from back */}
      <div className="absolute inset-x-0 top-0 h-[3px] bg-taupe-500/20" />
    </motion.div>
  );
}
