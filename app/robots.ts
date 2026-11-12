import type { MetadataRoute } from "next";
import { siteIndexable, siteOrigin } from "@/lib/seo";

export const dynamic = "force-dynamic";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: siteIndexable && siteOrigin ? new URL("/sitemap.xml", siteOrigin).href : undefined,
  };
}
