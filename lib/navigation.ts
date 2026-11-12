function normalizePathname(pathname: string): string {
  const basePath = (process.env.NEXT_PUBLIC_DEPLOY_BASE_PATH ?? "").replace(/\/+$/, "");
  const withoutBasePath = basePath && (pathname === basePath || pathname.startsWith(`${basePath}/`))
    ? pathname.slice(basePath.length) || "/"
    : pathname;
  return withoutBasePath.replace(/\/+$/, "") || "/";
}

export function isSameDestination(href: string, currentHref: string): boolean {
  try {
    const current = new URL(currentHref);
    const destination = new URL(href, current);
    if (!/^https?:$/.test(destination.protocol) || destination.origin !== current.origin) return false;
    if (destination.username || destination.password) return false;
    return normalizePathname(destination.pathname) === normalizePathname(current.pathname)
      && destination.search === current.search
      && destination.hash === current.hash;
  } catch {
    return false;
  }
}

export function getTransitionDestination(href: string, currentHref: string): string | null {
  try {
    const current = new URL(currentHref);
    const destination = new URL(href, current);
    if (!/^https?:$/.test(destination.protocol) || destination.origin !== current.origin) return null;
    const pathname = normalizePathname(destination.pathname);
    const currentPathname = normalizePathname(current.pathname);
    if (destination.username || destination.password || pathname === currentPathname) return null;
    return `${pathname}${destination.search}${destination.hash}`;
  } catch {
    return null;
  }
}
