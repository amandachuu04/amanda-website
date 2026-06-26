import { useEffect } from "react";
import Nav from "./components/Nav";
import BackToTop from "./components/BackToTop";
import Hero from "./sections/Hero";
import About from "./sections/About";
import Projects from "./sections/Projects";
import Experience from "./sections/Experience";
import Education from "./sections/Education";
import Certifications from "./sections/Certifications";
import Tools from "./sections/Tools";
import Contact from "./sections/Contact";
import Footer from "./sections/Footer";
import ProjectsPage from "./sections/ProjectsPage";
import WorkDetailPage from "./sections/WorkDetailPage";
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
    if (route.name !== "home") return;
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
        if (window.location.pathname === "/") return;
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
            {getCaseStudy(route.slug) ? (
              <WorkDetailPage slug={route.slug} />
            ) : (
              <ProjectDetailPage slug={route.slug} />
            )}
          </main>
          <Footer />
        </>
      ) : (
        <>
          <main id="main">
            <Hero />
            <About />
            <Projects />
            <Experience />
            <Education />
            <Certifications />
            <Tools />
            <Contact />
          </main>
          <Footer />
        </>
      )}
    </div>
  );
}
