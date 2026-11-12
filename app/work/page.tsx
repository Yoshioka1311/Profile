import { copy, projects } from "@/data/content";
import { getLocale } from "@/lib/i18n";
import { RevealText } from "@/components/motion/reveal-text";
import { WorkList } from "@/components/work/work-list";
import { pageMetadata } from "@/lib/seo";

export async function generateMetadata() {
  return pageMetadata(await getLocale(), "work");
}

export default async function WorkPage() {
  const locale = await getLocale();
  const labels = copy[locale].work;
  return (
    <div className="work-page container-wide" lang={locale}>
      <header className="work-page-heading"><RevealText as="h1" locale={locale} className="work-title">{labels.title}</RevealText></header>
      <WorkList items={projects.map((project) => ({ slug: project.slug, title: project.title[locale], summary: project.summary[locale], links: project.links, cover: { src: project.cover.src, alt: project.cover.alt[locale] } }))} viewLabel={labels.live} sourceLabel={labels.source} cursorLabel={labels.cursor} />
    </div>
  );
}
