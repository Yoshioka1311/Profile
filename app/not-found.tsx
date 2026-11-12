import { TransitionLink } from "@/components/transition-link";
import { copy } from "@/data/content";
import { getLocale } from "@/lib/i18n";

export default async function NotFound() {
  const locale = await getLocale();
  return <div className="container-wide route-preview"><h1>{copy[locale].notFound.title}</h1><TransitionLink href="/" className="text-link">{copy[locale].notFound.back}<span aria-hidden="true">↗</span></TransitionLink></div>;
}
