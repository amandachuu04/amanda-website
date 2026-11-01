import StoryPage, { FeatureList, ScreensBand, Section, Zoomable, body } from "./StoryPage";
import { CaseStudySection, SectionMedia, SectionMediaItem, caseStudies } from "../lib/site";

const study = caseStudies.nextrip;

const caption = "mt-3 text-[10px] font-semibold uppercase tracking-[0.16em] text-taupe-500";
const COLS = { 2: "sm:grid-cols-2", 3: "sm:grid-cols-3", 4: "sm:grid-cols-2 lg:grid-cols-4" };

function Tile({ item }: { item: SectionMediaItem }) {
  return (
    <figure className="m-0">
      {item.kind === "video" ? (
        <video
          src={item.src}
          poster={item.poster}
          controls
          muted
          playsInline
          preload="metadata"
          className="block w-full rounded-[1.5rem] bg-ink object-cover shadow-card"
          style={{ aspectRatio: "1320 / 2868" }}
        />
      ) : (
        <Zoomable src={item.src} alt={item.alt ?? item.caption} caption={item.caption} className="block h-auto w-full rounded-[1.5rem] shadow-card" />
      )}
      {item.caption && <figcaption className={caption}>{item.caption}</figcaption>}
    </figure>
  );
}

function Media({ media }: { media: SectionMedia }) {
  if (media.layout === "single") return <Tile item={media.item} />;
  if (media.layout === "phones") {
    return (
      <div className="grid grid-cols-3 gap-3 sm:grid-cols-4 sm:gap-5 lg:grid-cols-7">
        {media.items.map((item) => (
          <Tile key={item.src} item={item} />
        ))}
      </div>
    );
  }
  const phones = media.frame === "iphone";
  return (
    <div className={`grid grid-cols-1 gap-5 ${COLS[media.cols ?? 2]} ${phones ? "max-w-[680px]" : ""}`}>
      {media.items.map((item) => (
        <Tile key={item.src} item={item} />
      ))}
    </div>
  );
}

function Block({ section }: { section: CaseStudySection }) {
  const eyebrow = section.label.split(" / ").pop() ?? section.label;
  return (
    <Section eyebrow={eyebrow} title={section.heading}>
      {section.body && <p className={body}>{section.body}</p>}
      {section.bullets && <FeatureList items={section.bullets} />}
      {section.media && (
        <div className="mt-10">
          <Media media={section.media} />
        </div>
      )}
      {section.extraMedia && (
        <div className="mt-8">
          <Media media={section.extraMedia} />
        </div>
      )}
    </Section>
  );
}

export default function NexTripPage() {
  return (
    <StoryPage
      study={study}
      media={[{ src: study.cover, ratio: 4 / 3, alt: "NexTrip app screens on phones" }]}
      band={
        <ScreensBand
          title="The final app"
          note={study.galleryNote}
          groups={study.galleryFlows ?? []}
          grid="sm:grid-cols-4 lg:grid-cols-7"
        />
      }
      after={study.endSections?.map((s) => <Block key={s.heading} section={s} />)}
    >
      {study.sections.map((s) => (
        <Block key={s.heading} section={s} />
      ))}
    </StoryPage>
  );
}
