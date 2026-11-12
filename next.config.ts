import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  poweredByHeader: false,
  reactStrictMode: true,
  output: "export",
  trailingSlash: true,
  basePath: process.env.NEXT_PUBLIC_DEPLOY_BASE_PATH ?? "",
  assetPrefix: process.env.NEXT_PUBLIC_DEPLOY_BASE_PATH ?? "",
  distDir: process.env.NEXT_DIST_DIR ?? ".next",
  images: { unoptimized: true },
};

export default nextConfig;
