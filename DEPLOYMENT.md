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

Put photos and screenshots under `public/images/`. Enter paths such as `/images/portrait.webp` in the content file. Match file-name case exactly so the paths work on GitHub Pages. Use reasonably sized, compressed originals. Reserve the largest files for full-width covers and use compact exports for smaller gallery images. Describe meaningful images in both languages.

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

## Deploy on GitHub Pages

The site builds twice so both languages can be hosted as static files: English is at the repository root and Thai is under `/th/`. The circular flag controls switch between the matching routes. `npm run build` creates the complete Pages site in `out/`.

1. Keep the GitHub repository public. GitHub Pages is available for public repositories on GitHub Free.
2. Push the source and `.github/workflows/deploy-pages.yml` to the `main` branch. GitHub Actions builds both language versions and publishes the `out/` directory.
3. In the repository, open **Settings → Pages** and verify **Build and deployment → Source** is **GitHub Actions**.
4. Wait for the **Deploy portfolio to GitHub Pages** workflow to finish, then open `https://<owner>.github.io/<repository>/`.
5. Check Home, Work, each case study, About, Contact, image URLs, both language flags, `/robots.txt`, `/sitemap.xml`, and the share image at `/share-card.png`.

GitHub Pages serves static files only. Language selection and contact-form checks therefore run in the browser; the contact form validates its fields but does not send or store messages. The build script adds the repository base path to internal links and assets and emits a `.nojekyll` file so Next.js assets are served correctly.
