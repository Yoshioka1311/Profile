import "server-only";
import type { Metadata } from "next";
import { copy, isPlaceholder, projects, site, type Locale, type Project } from "@/data/content";

function configuredOrigin(): URL | undefined {
  const url = URL.parse(process.env.SITE_URL ?? "");
  if (!url || !["http:", "https:"].includes(url.protocol)) return;
  if (url.username || url.password || url.pathname !== "/" || url.search || url.hash) return;
  return url;
}

export const siteOrigin = configuredOrigin();
export const siteIndexable = Boolean(siteOrigin && process.env.SITE_INDEXABLE === "true");
export const siteRobots: Metadata["robots"] = siteIndexable
  ? { index: true, follow: true }
  : { index: false, follow: true };

const previewOrigin = new URL("http://127.0.0.1:3000");

export function siteTitle(locale: Locale): string {
  return isPlaceholder(site.name[locale]) ? copy[locale].profile : site.name[locale];
}

function projectTitle(project: Project, locale: Locale): string {
  const title = project.title[locale];
  if (projects.filter((item) => item.title[locale] === title).length < 2) return title;
  const number = String(projects.indexOf(project) + 1).padStart(2, "0");
  return `${title} (${number})`;
}

export function pageMetadata(
  locale: Locale,
  route: "home" | "work" | "about" | "contact" | Project,
): Metadata {
  const labels = copy[locale];
  const name = siteTitle(locale);
  const project = typeof route === "object" ? route : undefined;
  const pathname = typeof route === "object" ? `/work/${route.slug}` : route === "home" ? "/" : `/${route}`;
  const label = typeof route === "object" ? projectTitle(route, locale) : labels.nav[route];
  const title = route === "home" ? name : `${label} | ${name}`;
  const suppliedDescription = project?.summary[locale] ?? (route === "home" || route === "about" ? site.bio[locale] : "");
  const description = suppliedDescription.trim() && !isPlaceholder(suppliedDescription)
    ? suppliedDescription
    : labels.seo[typeof route === "object" ? "project" : route];
  const canonical = siteOrigin ? new URL(pathname, siteOrigin) : undefined;
  const image = new URL("/share-card", siteOrigin ?? previewOrigin);

  return {
    title,
    description,
    alternates: canonical ? { canonical } : undefined,
    openGraph: {
      title,
      description,
      siteName: name,
      type: "website",
      locale: locale === "th" ? "th_TH" : "en_GB",
      url: canonical,
      images: [{ url: image, width: 1200, height: 630, alt: labels.seo.imageAlt }],
    },
    twitter: { card: "summary_large_image", title, description, images: [{ url: image, alt: labels.seo.imageAlt }] },
  };
}
