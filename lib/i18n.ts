import "server-only";
import { locales, site, type Locale } from "@/data/content";

export function isLocale(value: unknown): value is Locale {
  return typeof value === "string" && locales.some((locale) => locale === value);
}

export function getLocale(): Locale {
  const value = process.env.SITE_LOCALE;
  return isLocale(value) ? value : site.defaultLocale;
}
