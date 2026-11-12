# Prepare and publish the portfolio

## Replace the sample content

Edit `data/content.ts`. For each translated value, fill in both `en` and `th`.

| Where | What to replace |
| --- | --- |
| `site.name`, `site.role`, `site.bio` | Your name, role and short introduction |
| `site.home.statement`, `site.home.aboutTeaser` | The large scroll statement and the short About preview |
| `site.home.heroImage`, `site.home.aboutImage` | Portrait paths and bilingual image descriptions |
| `site.story`, `site.experience`, `site.skills`, `site.interests` | About paragraphs, dated experience, and your lists |
| `projects` | A unique slug, title, year, role, tools, summary, story paragraphs, cover, gallery and links for each project |
| `site.socials` | Your public email address and absolute HTTPS social URLs |
| `copy.en.seo`, `copy.th.seo` | Search descriptions and share-card alt text where the defaults need editing |

Each existing `project("project-one")` call creates one placeholder entry. Replace each call with a complete object that follows the `Project` type in the same file. Keep slugs unique and stable, for example `gesture-recognition`. The first three entries marked `featured: true` appear on Home. Use `gallery: []` for a case study with no supporting images.

Put photos and screenshots under `public/images/`. Enter paths such as `/images/portrait.webp` in the content file. Match file-name case exactly so the paths work on Vercel. Use reasonably sized, compressed originals. Reserve the largest files for full-width covers and use compact exports for smaller gallery images. Describe meaningful images in both languages.

The Contact form validates input in preview mode. Publish a public email address if you want visitors to reach you directly. Connecting form submissions to a delivery provider is a separate change.

## Check the production build locally

Run these commands from the project folder with Node.js 24.

```powershell
npm ci
npm run lint
npm test
npm run typecheck
npm run build
npm run start
```

- Open Home, Work, each case study, About and Contact. Check a missing URL and a missing project slug.
- Switch both circular flags and refresh. Check Thai text and each layout at 360, 768, 1024 and 1440 pixels.
- Open and close the mobile menu with the keyboard. Use the Home gallery arrows and Tab through the project links. Enable reduced motion and confirm Home uses vertical projects and Work uses inline covers.
- Check the intro on a fresh browser session. Check that browser Back restores your place. Try the Contact form with invalid and valid sample input.
- Verify every image, description and external link. Open `/share-card` and confirm its preview image matches the portfolio.
- Repeat a mobile and desktop Lighthouse audit with the real images. Test the gallery scroll and hover previews in a browser Performance recording to look for dropped frames on the devices you care about.

## Deploy on Vercel

1. Put the source in a Git repository you control and push it to your Git provider. Keep `package-lock.json` in Git. The included ignore rules exclude local builds, generated reports, installed dependencies and environment files.
2. In the Vercel dashboard, choose **Add New → Project**, import the repository and use the **Next.js** framework preset. Select the folder containing `package.json` as the root. Choose Node.js **24.x** in the project settings. Keep the preset build settings, or use `npm run build` for the build command. [Vercel Git deployments](https://vercel.com/docs/git) · [Node.js versions](https://vercel.com/docs/functions/runtimes/node-js/node-js-versions)
3. Build and open the deployment URL. Keep `SITE_INDEXABLE` unset or `false` during review. Use a non-production branch for later preview deployments.
4. When the public address is ready, open **Settings → Environment Variables**. Add `SITE_URL` with the final HTTPS origin, such as `https://your-portfolio.vercel.app`. Scope it to **Production**. Add `SITE_INDEXABLE=true` to **Production** when the copy, links and images are ready to be indexed. Redeploy after changing environment variables. [Vercel environment variables](https://vercel.com/docs/environment-variables/managing-environment-variables)
5. On the live address, check that `/robots.txt` references `/sitemap.xml`, the sitemap contains your public routes, and page source shows canonical and share image URLs on your final domain. Open the share image URL directly and repeat the Contact validation and language checks.

The app uses the Next.js server runtime for language cookies and form validation. Use the Next.js preset rather than a static export.
