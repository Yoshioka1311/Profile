import type { MetadataRoute } from "next";
import { projects } from "@/data/content";
import { siteIndexable, siteOrigin } from "@/lib/seo";

export const dynamic = "force-dynamic";

export default function sitemap(): MetadataRoute.Sitemap {
  if (!siteIndexable || !siteOrigin) return [];
  const paths = ["/", "/work", "/about", "/contact", ...projects.map(({ slug }) => `/work/${slug}`)];
  return paths.map((path) => ({ url: new URL(path, siteOrigin).href }));
}
