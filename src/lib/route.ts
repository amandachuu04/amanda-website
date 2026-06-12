import { useEffect, useState } from "react";

export type Route =
  | { name: "home" }
  | { name: "projects"; slug: "all" | "design" | "programming" | "both" }
  | { name: "work"; slug: string };

const VALID_SLUGS = ["all", "design", "programming", "both"] as const;

function parse(pathname: string): Route {
  const path = pathname.replace(/\/+$/, "") || "/";
  if (path === "/" || path === "") return { name: "home" };

  if (path.startsWith("/work/")) {
    const slug = path.slice("/work/".length);
    if (slug) return { name: "work", slug };
    return { name: "home" };
  }

  if (path === "/projects") return { name: "projects", slug: "all" };
  if (path.startsWith("/projects/")) {
    const slug = path.slice("/projects/".length) as (typeof VALID_SLUGS)[number];
    if (VALID_SLUGS.includes(slug)) return { name: "projects", slug };
    return { name: "projects", slug: "all" };
  }

  return { name: "home" };
}

export function useRoute(): Route {
  const [route, setRoute] = useState<Route>(() => parse(window.location.pathname));
  useEffect(() => {
    const handler = () => setRoute(parse(window.location.pathname));
    window.addEventListener("popstate", handler);
    return () => window.removeEventListener("popstate", handler);
  }, []);
  return route;
}

export function navigate(href: string, replace = false) {
  if (replace) {
    window.history.replaceState({}, "", href);
  } else {
    window.history.pushState({}, "", href);
  }
  window.dispatchEvent(new PopStateEvent("popstate"));
}

export function projectsHref(slug?: "all" | "design" | "programming" | "both") {
  return slug && slug !== "all" ? `/projects/${slug}` : "/projects";
}

export function workHref(slug: string) {
  return `/work/${slug}`;
}
