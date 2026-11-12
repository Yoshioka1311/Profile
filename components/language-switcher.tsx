"use client";

import Image from "next/image";
import { copy, languageOptions, type Locale } from "@/data/content";
import { publicPath } from "@/lib/public-path";

function Flags({ locale }: { locale: Locale }) {
  return languageOptions.map((option) => (
    <button
      key={option.locale}
      type="button"
      className="language-button"
      aria-label={copy[locale].languageNames[option.locale]}
      aria-pressed={locale === option.locale}
      title={option.name}
      onClick={() => {
        const basePath = process.env.NEXT_PUBLIC_DEPLOY_BASE_PATH ?? "";
        const pathname = window.location.pathname;
        const route = pathname.startsWith(basePath) ? pathname.slice(basePath.length) || "/" : pathname;
        const localeRoute = route === "/th" ? "/" : route.startsWith("/th/") ? route.slice(3) : route;
        const localizedRoute = option.locale === "th"
          ? `/th${localeRoute === "/" ? "" : localeRoute}`
          : localeRoute;
        window.location.assign(`${basePath}${localizedRoute}${window.location.search}${window.location.hash}`);
      }}
    >
      <span className="flag-disc" aria-hidden="true">
        <Image src={publicPath(option.flag)} alt="" width={36} height={36} />
      </span>
    </button>
  ));
}

export function LanguageSwitcher({ locale }: { locale: Locale }) {
  return (
    <div className="language-switcher" role="group" aria-label={copy[locale].language}>
      <Flags locale={locale} />
    </div>
  );
}
