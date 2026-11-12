import { TransitionLink } from "@/components/transition-link";
import { RevealMedia } from "@/components/motion/reveal-media";
import { SocialIcon } from "@/components/social-icon";
import { getProjectUrl } from "@/lib/projects";

type WorkItem = {
  slug: string;
  title: string;
  summary: string;
  links: { live: string; github: string };
  cover: { src: string; alt: string };
};

type Props = { items: WorkItem[]; viewLabel: string; sourceLabel: string; cursorLabel: string };

export function WorkList({ items, viewLabel, sourceLabel, cursorLabel }: Props) {
  return (
    <div className="work-list">
      <ul className="work-projects">
        {items.map((item) => {
          const website = getProjectUrl(item.links.live);
          const source = getProjectUrl(item.links.github);
          return (
            <li key={item.slug} className="work-project">
              <TransitionLink
                href={website ?? `/work/${item.slug}`}
                target={website ? "_blank" : undefined}
                rel="noreferrer"
                transitionTitle={item.title}
                className="work-row media-hover-target"
                aria-label={`${viewLabel}: ${item.title}`}
                aria-describedby={`summary-${item.slug}`}
                data-cursor-label={cursorLabel}
              >
                <RevealMedia src={item.cover.src} alt="" className="work-background" sizes="90vw" />
                <div className="work-row-heading">
                  <h2>{item.title}</h2>
                  <p id={`summary-${item.slug}`}>{item.summary}</p>
                  <span className="work-visit">{viewLabel}<span aria-hidden="true">↗</span></span>
                </div>
              </TransitionLink>
              {source ? (
                <a href={source} className="text-link work-source" target="_blank" rel="noreferrer" aria-label={`${sourceLabel}: ${item.title}`}>
                  <SocialIcon kind="github" />{sourceLabel}<span aria-hidden="true">↗</span>
                </a>
              ) : null}
            </li>
          );
        })}
      </ul>
    </div>
  );
}
