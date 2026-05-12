import { useEffect } from "react";
import Nav from "./components/Nav";
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
import { useRoute } from "./lib/route";

export default function App() {
  const route = useRoute();

  useEffect(() => {
    if (route.name === "home") {
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
    }
  }, [route]);

  return (
    <div className="relative min-h-screen overflow-x-clip bg-cream-100">
      <Nav />
      {route.name === "projects" ? (
        <main id="main">
          <ProjectsPage initialSlug={route.slug} />
        </main>
      ) : route.name === "work" ? (
        <>
          <main id="main">
            <WorkDetailPage slug={route.slug} />
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
