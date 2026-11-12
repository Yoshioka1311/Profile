const deployBasePath = process.env.NEXT_PUBLIC_DEPLOY_BASE_PATH ?? "";

export function publicPath(path: string): string {
  if (!path.startsWith("/") || path.startsWith("//")) return path;
  return `${deployBasePath}${path}`;
}
