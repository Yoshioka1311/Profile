import { copy, site } from "@/data/content";
import { getLocale } from "@/lib/i18n";
import { RevealText } from "@/components/motion/reveal-text";
import { RevealMedia } from "@/components/motion/reveal-media";
import { MagneticLink } from "@/components/motion/magnetic-link";
import { ProfileCredentials } from "@/components/profile-credentials";
import { pageMetadata } from "@/lib/seo";

export async function generateMetadata() {
  return pageMetadata(await getLocale(), "about");
}

export default async function AboutPage() {
  const locale = await getLocale();
  const labels = copy[locale].about;
  const portrait = site.home.aboutImage;
  const { thai, english } = site.languages;

  return (
    <div className="container-wide profile-page">
      <header className="about-heading grid-editorial">
        <RevealText as="h1" className="profile-title" locale={locale}>{labels.title}</RevealText>
        <RevealMedia src={portrait.src} alt={portrait.alt[locale]} sizes="(max-width: 767px) 90vw, 42vw" className="about-portrait media-tone-about" />
        <div className="about-intro">
          <p className="about-name">{site.name[locale]}</p>
          <p className="about-role">{site.role[locale]}</p>
          <RevealText paragraph className="about-bio" locale={locale}>{site.bio[locale]}</RevealText>
        </div>
      </header>

      <ProfileCredentials locale={locale} />

      <div className="about-notes grid-editorial">
        <section className="about-skills" aria-labelledby="about-skills">
          <RevealText as="h2" id="about-skills" className="profile-section-title" locale={locale}>{labels.skills}</RevealText>
          <dl className="about-detail-list">
            {site.skills.map(({ category, tools }) => (
              <div key={category.en}>
                <dt>{category[locale]}</dt>
                <dd>{tools}</dd>
              </div>
            ))}
          </dl>
        </section>
        <section className="about-languages" aria-labelledby="about-languages">
          <RevealText as="h2" id="about-languages" className="profile-section-title" locale={locale}>{labels.languages}</RevealText>
          <dl className="about-detail-list">
            <div>
              <dt>{thai.name[locale]}</dt>
              <dd>{thai.detail[locale]}</dd>
            </div>
            <div>
              <dt>{english.name[locale]}</dt>
              <dd>{english.test} <strong>{english.score}</strong></dd>
            </div>
          </dl>
        </section>
      </div>

      <div className="about-contact">
        <MagneticLink href="/contact">{copy[locale].home.contact}</MagneticLink>
      </div>
    </div>
  );
}
