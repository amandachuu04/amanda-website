import { useEffect } from "react";
import Nav from "./components/Nav";
import BackToTop from "./components/BackToTop";
import HomeBento from "./sections/HomeBento";
import AboutSplit from "./sections/AboutSplit";
import Contact from "./sections/Contact";
import Footer from "./sections/Footer";
import ProjectsPage from "./sections/ProjectsPage";
import MagTrackerPage from "./sections/MagTrackerPage";
import NexTripPage from "./sections/NexTripPage";
import ProjectStoryPage from "./sections/ProjectStoryPage";
import FloraFlowPage from "./sections/FloraFlowPage";
import ProjectDetailPage from "./sections/ProjectDetailPage";
import { navigate, useRoute } from "./lib/route";
import { getCaseStudy, getProjectPage } from "./lib/site";
import BubbleCursor from "./components/BubbleCursor";

const DEFAULT_TITLE = "Amanda Chu | Portfolio";

export default function App() {
  const route = useRoute();

  useEffect(() => {
    if (route.name === "projects") {
      document.title = "Projects";
    } else if (route.name === "about") {
      document.title = "About | Amanda Chu";
    } else if (route.name === "contact") {
      document.title = "Contact | Amanda Chu";
    } else if (route.name === "work") {
      document.title =
        getCaseStudy(route.slug)?.title ??
        getProjectPage(route.slug)?.title ??
        DEFAULT_TITLE;
    } else {
      document.title = DEFAULT_TITLE;
    }
  }, [route]);

  useEffect(() => {
    if (route.name !== "home" && route.name !== "about") return;
    const id = window.location.hash.replace("#", "");
    if (!id) return;
    const tryScroll = (attempt = 0) => {
      const el = document.getElementById(id);
      if (el) {
        el.scrollIntoView({ behavior: "instant" as ScrollBehavior, block: "start" });
      } else if (attempt < 10) {
        setTimeout(() => tryScroll(attempt + 1), 50);
      }
    };
    requestAnimationFrame(() => tryScroll());
  }, [route]);

  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (e.defaultPrevented) return;
      if (e.button !== 0) return;
      if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;

      const anchor = (e.target as HTMLElement | null)?.closest("a");
      if (!anchor) return;
      if (anchor.target && anchor.target !== "_self") return;
      if (anchor.hasAttribute("download")) return;

      const hrefAttr = anchor.getAttribute("href");
      if (!hrefAttr) return;

      if (hrefAttr.startsWith("#")) {
        if (
          window.location.pathname === "/" ||
          document.getElementById(hrefAttr.slice(1))
        )
          return;
        e.preventDefault();
        navigate("/" + hrefAttr);
        return;
      }

      if (!hrefAttr.startsWith("/") || hrefAttr.startsWith("//")) return;

      e.preventDefault();
      navigate(hrefAttr);
      window.scrollTo({ top: 0, behavior: "auto" });
    };

    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, []);

  return (
    <div className="relative min-h-screen overflow-x-clip bg-cream-100">
      <BubbleCursor />
      <Nav />
      <BackToTop />
      {route.name === "projects" ? (
        <main id="main">
          <ProjectsPage initialSlug={route.slug} />
        </main>
      ) : route.name === "work" ? (
        <>
          <main id="main">
            {route.slug === "magtracker" ? (
              <MagTrackerPage />
            ) : route.slug === "floraflow" ? (
              <FloraFlowPage />
            ) : route.slug === "nextrip" ? (
              <NexTripPage />
            ) : getProjectPage(route.slug) ? (
              <ProjectStoryPage project={getProjectPage(route.slug)!} />
            ) : (
              <ProjectDetailPage slug={route.slug} />
            )}
          </main>
          <Footer />
        </>
      ) : route.name === "contact" ? (
        <>
          <main id="main">
            <Contact />
          </main>
          <Footer />
        </>
      ) : route.name === "about" ? (
        <>
          <main id="main">
            <AboutSplit />
            <Contact />
          </main>
          <Footer />
        </>
      ) : (
        <>
          <main id="main">
            <HomeBento />
            <Contact />
          </main>
          <Footer />
        </>
      )}
    </div>
  );
}
