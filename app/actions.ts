"use server";

import { cookies } from "next/headers";
import { isLocale, languageCookie } from "@/lib/i18n";
import { validateContact, type ContactResult } from "@/lib/contact";

export async function checkContactMessage(formData: FormData): Promise<ContactResult> {
  return validateContact(formData);
}

export async function changeLanguage(formData: FormData): Promise<void> {
  const locale = formData.get("locale");
  if (!isLocale(locale)) return;

  (await cookies()).set(languageCookie, locale, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 60 * 60 * 24 * 365,
  });
}
