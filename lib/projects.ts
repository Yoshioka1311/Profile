export function getNextProject<T extends { slug: string }>(items: readonly T[], slug: string): T | null {
  const index = items.findIndex((item) => item.slug === slug);
  if (index < 0 || items.length < 2) return null;
  return items[(index + 1) % items.length];
}

export function getProjectUrl(value: string): string | null {
  try {
    const url = new URL(value);
    if (!/^https?:$/.test(url.protocol) || url.username || url.password) return null;
    return url.href;
  } catch {
    return null;
  }
}
