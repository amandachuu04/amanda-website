import StoryPage, { Section, StoryMedia, Zoomable, body } from "./StoryPage";
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

export default function ProjectStoryPage({ project }: { project: ProjectPage }) {
  const media: StoryMedia[] = [{ src: project.cover, ratio: COVER_RATIOS[project.slug] ?? 3 / 2, alt: `${project.title} cover` }];
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

      {project.iterations?.map((it, i) => (
        <Section key={`${it.label}-${i}`} eyebrow={it.label} title={it.heading ?? it.label}>
          {it.images.length === 1 ? (
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
      ))}
    </StoryPage>
  );
}
