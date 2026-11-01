import StoryPage, { FeatureList, ScreensBand, Section, body } from "./StoryPage";
import { caseStudies } from "../lib/site";

const study = caseStudies.magtracker;

export default function MagTrackerPage() {
  const [empathize, define, ideate, audience, test] = study.sections;
  const screens = study.gallery.filter((g) => g.aspect === "phone" && !g.caption?.startsWith("Prototype"));
  const bottle = study.gallery.find((g) => g.src.includes("bottle"));
  const backpack = study.gallery.find((g) => g.src.includes("backpack"));
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
          grid="lg:grid-cols-5"
        />
      }
      media={[
        { src: study.cover, ratio: 433 / 461, alt: "MagTracker QR code tags on clips" },
        { src: bottle!.src, ratio: 3 / 4, alt: "MagTracker tag clipped to a water bottle", caption: "Water bottle" },
        { src: backpack!.src, ratio: 3 / 4, alt: "MagTracker tag attached to a backpack", caption: "Backpack" },
        { src: video!.src, ratio: 484 / 916, video: true, caption: video!.caption },
      ]}
    >
      <Section eyebrow="Empathize" title={empathize.heading}>
        <p className={body}>{empathize.body}</p>
      </Section>

      <Section eyebrow="Define" title={define.heading}>
        <p className={body}>{define.body}</p>
      </Section>

      <Section eyebrow="Ideate" title={ideate.heading}>
        <p className={body}>{ideate.body}</p>
        <FeatureList items={ideate.bullets} />
      </Section>

      <Section
        eyebrow={audience.heading}
        title={
          <>
            Students &amp; young professionals, <span className="italic text-taupe-500">ages 20–25.</span>
          </>
        }
      >
        <p className={body}>{audience.body}</p>
      </Section>

      <Section eyebrow="Test" title={test.heading}>
        <p className={body}>{test.body}</p>
      </Section>
    </StoryPage>
  );
}
