import type { Metadata } from "next";
import { copy, site } from "@/data/content";
import { bodyFont, displayFont, thaiFont } from "@/lib/fonts";
import { getLocale } from "@/lib/i18n";
import { siteRobots, siteTitle } from "@/lib/seo";
import { SmoothScrollProvider } from "@/components/smooth-scroll-provider";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { Preloader } from "@/components/preloader";
import Script from "next/script";
import { CustomCursor } from "@/components/custom-cursor";
import { PageTransitionProvider } from "@/components/page-transition-provider";
import "./globals.css";
import "./home.css";
import "./work.css";
import "./profile.css";

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale();
  return { title: siteTitle(locale), robots: siteRobots };
}

export default async function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const locale = await getLocale();

  return (
    <html lang={locale} className={`${displayFont.variable} ${bodyFont.variable} ${thaiFont.variable}`} suppressHydrationWarning>
      <body>
        <Script id="intro-visibility" strategy="beforeInteractive">
          {`try{if(sessionStorage.getItem("profile-intro-seen-v1")||window.matchMedia("(prefers-reduced-motion: reduce)").matches||document.hidden)document.documentElement.dataset.introSeen="true"}catch{}`}
        </Script>
        <SmoothScrollProvider>
          <PageTransitionProvider locale={locale}>
          <div id="site-shell">
            <a className="skip-link" href="#main-content">{copy[locale].skipToContent}</a>
            <SiteHeader locale={locale} />
            <main id="main-content" tabIndex={-1}>{children}</main>
            <SiteFooter locale={locale} />
          </div>
          <Preloader name={site.name[locale]} locale={locale} />
          <CustomCursor />
          </PageTransitionProvider>
        </SmoothScrollProvider>
      </body>
    </html>
  );
}
