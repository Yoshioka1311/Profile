"use client";

import Image from "next/image";
import { useFormStatus } from "react-dom";
import { changeLanguage } from "@/app/actions";
import { copy, languageOptions, type Locale } from "@/data/content";

function Flags({ locale }: { locale: Locale }) {
  const { pending } = useFormStatus();

  return languageOptions.map((option) => (
    <button
      key={option.locale}
      type="submit"
      name="locale"
      value={option.locale}
      className="language-button"
      aria-label={copy[locale].languageNames[option.locale]}
      aria-pressed={locale === option.locale}
      title={option.name}
      aria-disabled={pending}
      onClick={(event) => { if (pending) event.preventDefault(); }}
    >
      <span className="flag-disc" aria-hidden="true">
        <Image src={option.flag} alt="" width={36} height={36} />
      </span>
    </button>
  ));
}

export function LanguageSwitcher({ locale }: { locale: Locale }) {
  return (
    <form action={changeLanguage} aria-label={copy[locale].language}>
      <div className="language-switcher" role="group" aria-label={copy[locale].language}>
        <Flags locale={locale} />
      </div>
    </form>
  );
}
