import { copy, site, type Locale } from "@/data/content";
import { getProjectUrl } from "@/lib/projects";
import { SocialIcon } from "./social-icon";

export function SocialLinks({ locale, className }: { locale: Locale; className: string }) {
  const links = [
    { kind: "github", label: "GitHub", value: site.socials.github },
    { kind: "linkedin", label: "LinkedIn", value: site.socials.linkedin },
  ] as const;

  return <ul className={className} aria-label={copy[locale].footer.socials}>
    {links.map(({ kind, label, value }) => {
      const href = getProjectUrl(value);
      const content = <><SocialIcon kind={kind} /><span>{label}</span></>;
      return <li key={kind}>{href
        ? <a href={href} className="text-link social-channel" target="_blank" rel="noreferrer">{content}<span aria-hidden="true">↗</span></a>
        : <span className="social-channel footer-placeholder">{content}</span>}
      </li>;
    })}
  </ul>;
}
