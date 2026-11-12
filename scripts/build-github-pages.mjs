import { spawnSync } from "node:child_process";
import { cp, mkdir, rename, rm, writeFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import path from "node:path";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const [owner = "Yoshioka1311", repository = "Profile"] = (process.env.GITHUB_REPOSITORY ?? "Yoshioka1311/Profile").split("/");
const repositoryPath = `/${repository}`;
const siteUrl = process.env.SITE_URL ?? `https://${owner}.github.io${repositoryPath}`;
const nextCli = path.join(root, "node_modules", "next", "dist", "bin", "next");
const exports = { en: path.join(root, ".ghpages-export-en"), th: path.join(root, ".ghpages-export-th") };

await Promise.all([
  rm(path.join(root, "out"), { recursive: true, force: true }),
  rm(path.join(root, ".next"), { recursive: true, force: true }),
  rm(exports.en, { recursive: true, force: true }),
  rm(exports.th, { recursive: true, force: true }),
  rm(path.join(root, ".next-ghpages-en"), { recursive: true, force: true }),
  rm(path.join(root, ".next-ghpages-th"), { recursive: true, force: true }),
]);

for (const locale of ["en", "th"]) {
  const deployBasePath = `${repositoryPath}${locale === "th" ? "/th" : ""}`;
  const result = spawnSync(process.execPath, [nextCli, "build"], {
    cwd: root,
    stdio: "inherit",
    env: {
      ...process.env,
      SITE_LOCALE: locale,
      SITE_URL: siteUrl,
      SITE_INDEXABLE: process.env.SITE_INDEXABLE ?? "true",
      NEXT_PUBLIC_DEPLOY_BASE_PATH: deployBasePath,
      NEXT_DIST_DIR: `.next-ghpages-${locale}`,
    },
  });

  if (result.error) throw result.error;
  if (result.status !== 0) process.exit(result.status ?? 1);
  await rename(path.join(root, `.next-ghpages-${locale}`), exports[locale]);
}

const output = path.join(root, "out");
await mkdir(output, { recursive: true });
await cp(exports.en, output, { recursive: true });
await cp(exports.th, path.join(output, "th"), { recursive: true });
await writeFile(path.join(output, ".nojekyll"), "");
await Promise.all([
  rm(exports.en, { recursive: true, force: true }),
  rm(exports.th, { recursive: true, force: true }),
  rm(path.join(root, ".next-ghpages-en"), { recursive: true, force: true }),
  rm(path.join(root, ".next-ghpages-th"), { recursive: true, force: true }),
]);
