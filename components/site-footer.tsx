import { copy, isPlaceholder, site, type Locale } from "@/data/content";
import { BackToTop } from "./back-to-top";
import { SocialIcon } from "./social-icon";
import { SocialLinks } from "./social-links";

export function SiteFooter({ locale }: { locale: Locale }) {
  const email = site.socials.email;
  const emailReady = !isPlaceholder(email) && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  return (
    <footer className="site-footer">
      <div className="container-wide">
        <div className="footer-main">
          <div className="footer-contact">
            <p className="footer-caption"><SocialIcon kind="email" />{copy[locale].contact.email}</p>
            {emailReady ? <a className="footer-email text-link" href={`mailto:${email}`}>{email}</a> : <span className="footer-email">{email}</span>}
          </div>
          <SocialLinks locale={locale} className="footer-socials" />
        </div>
        <div className="footer-bottom">
          <p>{site.name[locale]}<span className="footer-separator" aria-hidden="true">/</span>{copy[locale].profile}</p>
          <BackToTop label={copy[locale].footer.backToTop} />
        </div>
      </div>
    </footer>
  );
}
