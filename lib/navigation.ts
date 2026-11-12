export function getTransitionDestination(href: string, currentHref: string): string | null {
  try {
    const current = new URL(currentHref);
    const destination = new URL(href, current);
    if (!/^https?:$/.test(destination.protocol) || destination.origin !== current.origin) return null;
    const pathname = destination.pathname.replace(/\/+$/, "") || "/";
    const currentPathname = current.pathname.replace(/\/+$/, "") || "/";
    if (destination.username || destination.password || pathname === currentPathname) return null;
    return `${pathname}${destination.search}${destination.hash}`;
  } catch {
    return null;
  }
}
