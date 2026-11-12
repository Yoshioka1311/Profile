export function isLocalImagePath(src: string): boolean {
  return src.length > 1 && src.startsWith("/") && !src.startsWith("//") && !src.includes("[") && !src.includes("]");
}
