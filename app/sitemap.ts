import type { MetadataRoute } from "next";
import { projects } from "@/data/content";
import { siteBasePath, siteIndexable, siteOrigin } from "@/lib/seo";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  if (!siteIndexable || !siteOrigin) return [];
  const routes = ["/", "/work", "/about", "/contact", ...projects.map(({ slug }) => `/work/${slug}`)];
  const paths = [...routes.map((route) => route), ...routes.map((route) => `/th${route === "/" ? "" : route}`)];
  return paths.map((path) => {
    const route = `${siteBasePath}${path || "/"}`;
    return { url: new URL(route.endsWith("/") ? route : `${route}/`, siteOrigin).href };
  });
}
