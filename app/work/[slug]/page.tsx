import { notFound } from "next/navigation";
import { TransitionLink } from "@/components/transition-link";
import { copy, projects } from "@/data/content";
import { getLocale } from "@/lib/i18n";
import { getNextProject, getProjectUrl } from "@/lib/projects";
import { RevealText } from "@/components/motion/reveal-text";
import { RevealMedia } from "@/components/motion/reveal-media";
import { pageMetadata, siteTitle } from "@/lib/seo";

export const dynamicParams = false;

export function generateStaticParams() {
  return projects.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps<"/work/[slug]">) {
  const [{ slug }, locale] = await Promise.all([params, getLocale()]);
  const project = projects.find((item) => item.slug === slug);
  if (!project) return { title: `${copy[locale].notFound.title} | ${siteTitle(locale)}`, robots: { index: false } };
  return pageMetadata(locale, project);
}

export default async function ProjectPage({ params }: { params: Promise<{ slug: string }> }) {
  const [{ slug }, locale] = await Promise.all([params, getLocale()]);
  const project = projects.find((item) => item.slug === slug);
  if (!project) notFound();
  const next = getNextProject(projects, slug);
  const labels = copy[locale].work;
  const links = [{ label: labels.live, value: project.links.live }, { label: labels.source, value: project.links.github }].filter(({ value }) => value.trim());
  return (
    <div className="case-page" lang={locale}>
      <header className="container-wide case-heading grid-editorial">
        <TransitionLink href="/work" className="text-link case-back"><span aria-hidden="true">↖</span>{labels.back}</TransitionLink>
        <RevealText as="h1" locale={locale} className="case-title">{project.title[locale]}</RevealText>
        <RevealText locale={locale} paragraph className="case-summary">{project.summary[locale]}</RevealText>
      </header>
      <RevealMedia src={project.cover.src} alt={project.cover.alt[locale]} className="case-hero media-tone-hero" preload sizes="100vw" />
      <div className="container-wide case-body grid-editorial">
        <aside className="case-meta">
          <dl>
            <div><dt>{labels.tools}</dt><dd><ul>{project.tools[locale].map((tool, index) => <li key={index}>{tool}</li>)}</ul></dd></div>
          </dl>
          <div className="case-links">{links.map(({ label, value }) => {
            const href = getProjectUrl(value);
            return href ? <a key={label} href={href} className="text-link" target="_blank" rel="noreferrer">{label}<span aria-hidden="true">↗</span></a> : <div key={label} className="case-link-placeholder"><span>{label}</span><span>{value}</span></div>;
          })}</div>
        </aside>
        <article className="case-story" aria-labelledby="case-story-title">
          <RevealText as="h2" id="case-story-title" locale={locale} className="case-story-title">{labels.overview}</RevealText>
          <div className="case-paragraphs">{project.details[locale].slice(0, 2).map((paragraph, index) => <RevealText key={index} locale={locale} paragraph>{paragraph}</RevealText>)}</div>
          {project.gallery[0] ? <RevealMedia src={project.gallery[0].src} alt={project.gallery[0].alt[locale]} className="case-story-image media-tone-1" sizes="(max-width: 899px) 90vw, 60vw" /> : null}
          <div className="case-paragraphs">{project.details[locale].slice(2).map((paragraph, index) => <RevealText key={index} locale={locale} paragraph>{paragraph}</RevealText>)}</div>
          {project.gallery.slice(1).map((image, index) => <RevealMedia key={index} src={image.src} alt={image.alt[locale]} className={`case-story-image case-story-image-secondary media-tone-${(index + 1) % 3 + 1}`} sizes="(max-width: 899px) 80vw, 40vw" />)}
        </article>
      </div>
      {next ? <section className="case-next" aria-labelledby="next-project-title">
        <TransitionLink href={`/work/${next.slug}`} transitionTitle={next.title[locale]} className="case-next-link media-hover-target" aria-label={`${labels.next}: ${next.title[locale]}`} data-cursor-label={labels.cursor}>
          <RevealMedia src={next.cover.src} alt="" className="case-next-image media-tone-3" sizes="100vw" />
          <div className="container-wide case-next-content"><p>{labels.next}</p><h2 id="next-project-title">{next.title[locale]}</h2><span className="case-next-arrow" aria-hidden="true">↗</span></div>
        </TransitionLink>
      </section> : null}
    </div>
  );
}
