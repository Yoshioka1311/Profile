import "server-only";
import { cache } from "react";
import { cookies } from "next/headers";
import { locales, site, type Locale } from "@/data/content";

export const languageCookie = "profile-language";

export function isLocale(value: unknown): value is Locale {
  return typeof value === "string" && locales.some((locale) => locale === value);
}

export const getLocale = cache(async (): Promise<Locale> => {
  const value = (await cookies()).get(languageCookie)?.value;
  return isLocale(value) ? value : site.defaultLocale;
});
