import { copy, site } from "@/data/content";
import { getLocale } from "@/lib/i18n";
import { HomeExperience } from "@/components/home/home-experience";
import { ProfileCredentials } from "@/components/profile-credentials";
import { TransitionLink } from "@/components/transition-link";
import { pageMetadata } from "@/lib/seo";

export async function generateMetadata() {
  return pageMetadata(await getLocale(), "home");
}

export default async function HomePage() {
  const locale = await getLocale();
  const labels = copy[locale];

  return (
    <HomeExperience content={{
      locale, name: site.name[locale], role: site.role[locale], bio: site.bio[locale],
      statement: site.home.statement[locale],
      heroImage: { src: site.home.heroImage.src, alt: site.home.heroImage.alt[locale] },
      labels: { ...labels.home, profile: labels.profile },
    }}>
      <div className="container-wide">
        <ProfileCredentials locale={locale}>
          <TransitionLink href="/about" className="text-link">{labels.home.readAbout}<span aria-hidden="true">↗</span></TransitionLink>
        </ProfileCredentials>
      </div>
    </HomeExperience>
  );
}
