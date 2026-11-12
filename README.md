# Personal profile

Use Node.js 22.18 or newer for the application and its TypeScript tests. This workspace uses Node.js 24. Built with Next.js App Router and React.

```powershell
Set-Location 'C:\Solid Snake\Project\Profile'
npm ci
npm run dev
```

Open http://localhost:3000. Fonts are fetched by next/font during development or build and are served locally by the app to visitors. The first build therefore needs access to Google Fonts.

## Edit content

Edit data/content.ts. Each translated field has en and th entries. Replace [MY NAME], [MY ROLE], [MY BIO], project details, skills, images and links there. Use local public image paths such as /images/portrait.jpg. Placeholder paths render gradient frames, so the app never requests [IMAGE PATH]. Remote images are not configured.

The project entries are ordered Arduino Workbench, HandPrint, and CheckOn. Website previews open each project's website, with separate GitHub links for HandPrint and CheckOn. Arduino currently opens the local workbench at http://127.0.0.1:5173/workbench and requires that app to be running. Replace its live URL in data/content.ts when a hosted website is available. The GitHub repositories may require account access.

## Language controls

Click the circular UK flag for English or Thai flag for Thai. The white ring marks the selected language. Navigation, menu, footer and route headings have both translations. English is served at the repository root and Thai at `/th/`; switching languages keeps the current route when available. The document language and font match each static route.

## Shared layout and motion

The header links to Work, About and Contact through folder artwork adapted from Hairline's Riffle figure. Hover or focus a folder to reveal its destination. Touch layouts show the names alongside the folders. The current page has a white underline, and the language flags remain beside the navigation. Below 900px, the folders appear in the full-screen menu. The menu traps focus, closes with Escape and restores focus to its button. Switching languages inside the menu keeps it open. See [Hairline's MIT license](licenses/Hairline-MIT.txt).

Fine-pointer desktop devices use Lenis with a 0.08 interpolation value, GSAP's ticker and ScrollTrigger updates. The Lenis ticker callback runs while smooth scrolling is active and detaches when it settles. Touch devices and reduced-motion preferences use native scrolling. The desktop cursor has a white dot and a trailing ring. Add data-cursor-label to a future project link to give its ring a short label. The cursor restores native behaviour for keyboard navigation and while overlays lock scrolling.

The name intro runs once per browser-tab session. It uses sessionStorage, a timed progress line and a lift transition lasting about 1.3 seconds. Reduced motion skips it. A 1.55-second release timer restores the page if the animation callback fails. The line shows intro timing.

The footer displays contact placeholders as text. Real valid email and social addresses become links after you replace them in data/content.ts. Back to top also moves keyboard focus to the wordmark.

Home, Work, About and Contact are implemented with placeholder personal content. Unknown projects and unmatched URLs use the custom 404.

## Route transitions

Use components/transition-link.tsx for links to another page. It keeps normal Next Link prefetching and browser link behaviour. A normal click or Enter starts the title curtain, requests the route while covered and then reveals the new page. The configured animation takes about 0.96 seconds plus any wait for the destination. Reduced motion uses opacity fades.

The provider lives in the root layout, so the outgoing overlay can complete while the route template changes. The app template reports route commits, including case-study slug changes. Browser back and forward use an incoming reveal and preserve native scroll restoration. Language switches and same-page links do not start a route curtain. A six-second watchdog releases a stalled cover, while the router request may still complete afterward.

TransitionLink accepts the usual link attributes with a string href. Optional transitionTitle overrides the label shown by the curtain. The replace and scroll options are preserved. Query strings and fragments are kept. If a new-page fragment identifies an element, it is positioned below the sticky header while the curtain covers the page.

## Home

The Home page contains a two-line name, bio, statement, About teaser and Contact link. Projects are shown on the Work page. Edit site.home for the statement, teaser and portrait paths. All labels and project text remain in data/content.ts.

The statement scene highlights words as you scroll on larger fine-pointer screens. Reduced motion disables reveal travel, parallax and magnetic movement. The portrait paths are ready for the owner's photographs.

## Work and case studies

The Work index uses each website preview as a full background behind its title and summary. A dark overlay maintains readable text. Each background opens the project's website, with a separate GitHub link where supplied. Project years and role labels are omitted.

Case studies render the cover full width, then a tools column beside the project story and gallery images. The tools return to normal flow below 900px or on short desktop windows. The full-height Next project link follows the projects array in data/content.ts and wraps from the last project to the first. It is omitted when there is only one project.

Replace each project's cover, gallery image paths and translated alt text in data/content.ts. Empty gallery arrays are supported. Live and GitHub placeholders stay visible as plain text until you replace them with valid absolute HTTP or HTTPS URLs. Valid links open in a new tab. No remote image hosts are configured.

## About and Contact

About uses the portrait at `site.home.aboutImage` and the bio, education, experience, skills and languages in `data/content.ts`. Experience entries appear in the order provided. The Mahidol ICT logo is sourced from the [Faculty of ICT website](https://www.ict.mahidol.ac.th/wp-content/uploads/2022/05/MUICT-LOGO-en-768x156.png) and retains its original proportions and colours.

Contact reads the email and social links from `site.socials`. Valid addresses become links. Replace the placeholder email to let visitors open an email draft in their own mail app.

The message form runs in preview mode. Browser-side validation checks required fields, email format and length limits. It returns field errors or a confirmation without storing or delivering the message. On an invalid submission, entries stay in the form and focus moves to the first invalid field. Successful validation clears the fields.

## Metadata and indexing

Page titles, descriptions and social previews follow the selected language. English routes live at the repository root; Thai routes are under `/th/`. The share card is a 1200 × 630 PNG at `/share-card.png`.

Set `SITE_URL` to the public origin, such as `https://portfolio.example.com`, to supply canonical URLs and absolute share image URLs. Set `SITE_INDEXABLE=true` when the public site and content are ready. Before opting in, pages send `noindex, follow` and the sitemap is empty. Opting in lists the public pages and projects in `/sitemap.xml` and links to it from `/robots.txt`.

## Checks

```powershell
npm run lint
npm test
npm run typecheck
npm run build
```

Test at 360, 768, 1024 and 1440 pixels. Check keyboard access to both flags, a visible focus ring, language persistence after refresh and correct Thai glyph rendering after adding Thai content.

## Deployment

See [DEPLOYMENT.md](DEPLOYMENT.md) for the content checklist, GitHub Pages setup, and production checks. The Phase 8 lab reports and before-and-after measurements are in the local outputs folder.
