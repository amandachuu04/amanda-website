import { useEffect, useState } from "react";

export type Route =
  | { name: "home" }
  | { name: "projects"; slug: "all" | "design" | "programming" | "both" }
  | { name: "work"; slug: string };

const VALID_SLUGS = ["all", "design", "programming", "both"] as const;

function parse(hash: string): Route {
  if (hash.startsWith("#/work/")) {
    const slug = hash.slice("#/work/".length).replace(/\/$/, "");
    if (slug) return { name: "work", slug };
    return { name: "home" };
  }
  if (!hash.startsWith("#/projects")) return { name: "home" };
  const rest = hash.slice("#/projects".length).replace(/^\//, "");
  if (!rest) return { name: "projects", slug: "all" };
  const slug = rest as (typeof VALID_SLUGS)[number];
  if (VALID_SLUGS.includes(slug)) return { name: "projects", slug };
  return { name: "projects", slug: "all" };
}

export function useRoute(): Route {
  const [route, setRoute] = useState<Route>(() => parse(window.location.hash));
  useEffect(() => {
    const handler = () => setRoute(parse(window.location.hash));
    window.addEventListener("hashchange", handler);
    return () => window.removeEventListener("hashchange", handler);
  }, []);
  return route;
}

export function projectsHref(slug?: "all" | "design" | "programming" | "both") {
  return slug && slug !== "all" ? `#/projects/${slug}` : "#/projects";
}

export function workHref(slug: string) {
  return `#/work/${slug}`;
}
