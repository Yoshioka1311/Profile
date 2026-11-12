import type { MetadataRoute } from "next";
import { siteBasePath, siteIndexable, siteOrigin } from "@/lib/seo";

export const dynamic = "force-static";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: siteIndexable && siteOrigin ? new URL(`${siteBasePath}/sitemap.xml`, siteOrigin).href : undefined,
  };
}
