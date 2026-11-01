import StoryPage, { FeatureList, ScreensBand, Section, body } from "./StoryPage";
import { caseStudies } from "../lib/site";

const study = caseStudies.floraflow;

export default function FloraFlowPage() {
  const [problem, opportunity, ideate, audience, research] = study.sections;
  const screens = study.gallery.filter((g) => g.aspect === "phone" && g.kind !== "video");
  const video = study.gallery.find((g) => g.kind === "video");

  return (
    <StoryPage
      study={study}
      brand={{ src: study.gallery[0].src, note: study.featuredNote }}
      band={
        <ScreensBand
          title={<>The companion <span className="italic text-taupe-500">app</span></>}
          note={study.galleryNote}
          groups={[{ items: screens }]}
          grid="lg:grid-cols-6"
        />
      }
      media={[
        { src: study.cover, ratio: 3208 / 3306, alt: "The FloraFlow lamp, a glowing flower on a 3D printed base" },
        ...(video?.kind === "video" ? [{ src: video.src, ratio: 430 / 888, video: true, poster: video.poster, caption: video.caption }] : []),
      ]}
    >
      {/* ---------- problem ---------- */}
      <Section title={problem.heading} eyebrow="The problem">
        <p className={body}>{problem.body}</p>
      </Section>

      {/* ---------- opportunity ---------- */}
      <Section title={opportunity.heading} eyebrow="The opportunity">
        <p className={body}>{opportunity.body}</p>
      </Section>

      {/* ---------- key features ---------- */}
      <Section title={ideate.heading} eyebrow="Ideate">
        <p className={body}>{ideate.body}</p>
        <FeatureList items={ideate.bullets} />
      </Section>

      {/* ---------- research stat ---------- */}
      <Section
        eyebrow={research.heading}
        title={
          <span className="whitespace-nowrap text-[clamp(4rem,10vw,8.5rem)] leading-[0.85] tracking-tight">
            20–30
            <span className="ml-2 align-baseline text-[0.3em] italic text-taupe-500">min</span>
          </span>
        }
      >
        <p className="mb-6 font-display text-lg font-bold text-taupe-500">
          is how long most students said they stay focused before getting distracted.
        </p>
        <p className={body}>{research.body}</p>
        <div className="mt-6 flex flex-wrap gap-2">
          {["Notion", "Google Calendar", "Todoist", "Quizlet"].map((t) => (
            <span key={t} className="rounded-pill bg-blush-100 px-4 py-1.5 text-sm font-semibold text-taupe-500">{t}</span>
          ))}
        </div>
      </Section>

      {/* ---------- audience ---------- */}
      <Section
        eyebrow={audience.heading}
        title={
          <>
            Students &amp; early career learners, <span className="italic text-taupe-500">ages 16–30.</span>
          </>
        }
      >
        <p className={body}>{audience.body}</p>
      </Section>
    </StoryPage>
  );
}
