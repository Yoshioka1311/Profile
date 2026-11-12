import { copy, site } from "@/data/content";
import { getLocale } from "@/lib/i18n";
import { isContactEmail } from "@/lib/contact";
import { RevealText } from "@/components/motion/reveal-text";
import { ContactForm } from "@/components/contact-form";
import { SocialIcon } from "@/components/social-icon";
import { SocialLinks } from "@/components/social-links";
import { pageMetadata } from "@/lib/seo";

export async function generateMetadata() {
  return pageMetadata(await getLocale(), "contact");
}

export default async function ContactPage() {
  const locale = await getLocale();
  const labels = copy[locale].contact;
  const email = site.socials.email;

  return (
    <div className="container-wide profile-page contact-page">
      <RevealText as="h1" className="profile-title" locale={locale}>{labels.title}</RevealText>
      <div className="contact-layout grid-editorial">
        <section className="contact-details" aria-labelledby="contact-email-heading">
          <h2 id="contact-email-heading"><SocialIcon kind="email" />{labels.email}</h2>
          {isContactEmail(email)
            ? <a className="contact-address text-link" href={`mailto:${encodeURIComponent(email).replace("%40", "@")}`}>{email}</a>
            : <p className="contact-address">{email}</p>}
          <SocialLinks locale={locale} className="contact-socials" />
        </section>

        <section className="contact-form-section" aria-labelledby="contact-form-heading">
          <h2 id="contact-form-heading">{labels.form}</h2>
          <p id="contact-preview-note" className="contact-preview-note">{labels.preview}</p>
          <ContactForm labels={labels} />
        </section>
      </div>
    </div>
  );
}
