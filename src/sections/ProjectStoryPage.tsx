import { CSSProperties } from "react";
import { motion } from "framer-motion";
import StoryPage, { Eyebrow, Section, StoryMedia, Wrap, Zoomable, body, reveal } from "./StoryPage";
import { ProjectPage } from "../lib/site";

const COVER_RATIOS: Record<string, number> = {
  "paws-and-care": 3 / 2,
  "linking-narratives": 4 / 3,
  "name-logo-design": 799 / 1200,
  "dungeon-cube-caesar": 4 / 3,
  "lane-scheduling-system": 4 / 3,
  "federicos-menu": 4 / 3,
  "banana-bread-recipe": 3 / 2,
  "choco-cake-recipe": 3 / 2,
  "hierarchy-ad": 16 / 9,
  "modular-grid": 5500 / 3667,
  "grade-management-system": 4 / 3,
};

const VIDEO_RATIOS: Record<string, number> = {
  "paws-and-care": 3342 / 2160,
  "linking-narratives": 1920 / 958,
};

// Natural image shapes, for rows where images should share one height.
const SHAPES: Record<string, number> = {
  "/name-logo-design/img-1.webp": 1978 / 1061,
  "/name-logo-design/img-2.webp": 2018 / 1053,
  "/name-logo-design/img-3.webp": 1979 / 2129,
  "/name-logo-design/img-4.webp": 1740 / 1913,
  "/name-logo-design/img-5.webp": 1625 / 1850,
  "/name-logo-design/img-6.webp": 1805 / 1721,
  "/name-logo-design/img-7.webp": 1753 / 1705,
  "/name-logo-design.avif": 799 / 1200,
  "/choco-cake-recipe/img-final-spread.jpg": 1224 / 792,
  "/choco-cake-recipe/img-mockup.jpg": 2000 / 1333,
  "/choco-cake-recipe/img-2.png": 5000 / 6429,
};

// Pages where the cover is shown later instead of above the story.
const NO_TOP_IMAGE = ["name-logo-design"];

function SharedHeightRows({ images, label }: { images: { src: string; caption?: string }[]; label: string }) {
  const rows = images.reduce<{ src: string; caption?: string }[][]>((all, img, i) => (i % 2 ? all.slice(0, -1).concat([[...all[all.length - 1], img]]) : [...all, [img]]), []);
  return (
    <div className="space-y-5">
      {rows.map((row) => (
        <div key={row[0].src} className="flex flex-col gap-5 sm:flex-row">
          {row.map((img, i) => (
            <div key={img.src} className="min-w-0 sm:[flex:var(--f)_1_0%]" style={{ "--f": SHAPES[img.src] } as CSSProperties}>
              <Zoomable src={img.src} alt={`${label} ${i + 1}`} caption={img.caption} className="block h-auto w-full rounded-[1.5rem] shadow-card" />
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}

// Tall single-image steps that read better side by side: [first index, count].
const ROWS: Record<string, [number, number][]> = {
  "modular-grid": [[0, 3]],
  "banana-bread-recipe": [[0, 4]],
  "choco-cake-recipe": [[0, 4], [5, 2]],
  "name-logo-design": [[2, 2]],
};

type Iteration = NonNullable<ProjectPage["iterations"]>[number];

function IterationRow({ items }: { items: Iteration[] }) {
  const shared = items.every((it) => SHAPES[it.images[0].src]);
  return (
    <Wrap className="relative">
      <div
        className={
          shared
            ? "flex flex-col gap-x-5 gap-y-12 border-t border-taupe-200/60 py-16 sm:flex-row sm:py-20"
            : `grid grid-cols-1 gap-x-5 gap-y-12 border-t border-taupe-200/60 py-16 sm:grid-cols-2 sm:py-20 ${items.length === 3 ? "lg:grid-cols-3" : "lg:grid-cols-4"}`
        }
      >
        {items.map((it) => (
          <motion.div
            key={it.label}
            {...reveal}
            className={`flex min-w-0 flex-col ${shared ? "sm:[flex:var(--f)_1_0%]" : ""}`}
            style={shared ? ({ "--f": SHAPES[it.images[0].src] } as CSSProperties) : undefined}
          >
            <Eyebrow>{it.label}</Eyebrow>
            <h3 className="mb-5 mt-3 font-display text-2xl font-bold leading-tight text-ink">{it.heading}</h3>
            <div className="mt-auto">
              <Zoomable src={it.images[0].src} alt={it.heading} className="block h-auto w-full rounded-[1.5rem] shadow-card" />
            </div>
          </motion.div>
        ))}
      </div>
    </Wrap>
  );
}

export default function ProjectStoryPage({ project }: { project: ProjectPage }) {
  const iterations = project.iterations ?? [];
  const rows = ROWS[project.slug] ?? [];
  const media: StoryMedia[] = NO_TOP_IMAGE.includes(project.slug) ? [] : [{ src: project.cover, ratio: COVER_RATIOS[project.slug] ?? 3 / 2, alt: `${project.title} cover` }];
  if (project.video) {
    media.push({
      src: project.video.src,
      ratio: VIDEO_RATIOS[project.slug] ?? 16 / 9,
      video: true,
      poster: project.video.poster,
      caption: project.video.caption,
    });
  }

  return (
    <StoryPage study={project} media={media}>
      <Section eyebrow="Overview" title="About the project">
        <div className="space-y-5">
          {project.description.map((p) => (
            <p key={p} className={body}>{p}</p>
          ))}
        </div>
      </Section>

      {iterations.map((it, i) => {
        const row = rows.find(([first]) => first === i);
        if (row) return <IterationRow key={it.label} items={iterations.slice(row[0], row[0] + row[1])} />;
        if (rows.some(([first, count]) => i > first && i < first + count)) return null;
        return (
        <Section key={`${it.label}-${i}`} eyebrow={it.label} title={it.heading ?? it.label}>
          {it.images.every((img) => SHAPES[img.src]) ? (
            <SharedHeightRows images={it.images} label={it.heading ?? it.label} />
          ) : it.images.length === 1 ? (
            <figure className="m-0 w-fit max-w-full">
              <Zoomable
                src={it.images[0].src}
                alt={it.images[0].caption ?? it.heading ?? it.label}
                caption={it.images[0].caption}
                className="block h-auto max-h-[85vh] w-auto max-w-full rounded-[1.5rem] shadow-card"
              />
              {it.images[0].caption && <figcaption className="mt-3 text-[10px] font-semibold uppercase tracking-[0.16em] text-taupe-500">{it.images[0].caption}</figcaption>}
            </figure>
          ) : (
            <div className={`grid grid-cols-1 gap-5 sm:grid-cols-2 ${it.images.length > 4 ? "lg:grid-cols-3" : ""}`}>
              {it.images.map((img, j) => (
                <figure key={img.src} className="m-0">
                  <Zoomable src={img.src} alt={img.caption ?? `${it.heading ?? it.label} ${j + 1}`} caption={img.caption} className="block h-auto w-full rounded-[1.5rem] shadow-card" />
                  {img.caption && <figcaption className="mt-3 text-[10px] font-semibold uppercase tracking-[0.16em] text-taupe-500">{img.caption}</figcaption>}
                </figure>
              ))}
            </div>
          )}
        </Section>
        );
      })}
    </StoryPage>
  );
}
