# Personal profile

The owner's portfolio introduces their work to potential collaborators and employers. All personal details remain explicit placeholders until the owner supplies them.

Use Next.js App Router, React, TypeScript, Tailwind CSS, Framer Motion, GSAP ScrollTrigger, Lenis, next/font and next/image. Keep all editable copy in data/content.ts.

The site supports English and Thai. Circular UK and Thai flag controls select the language, with no visible language-name text. Each control has an accessible name, a keyboard focus indicator and a selected ring. GitHub Pages hosts English at the repository root and Thai under `/th/`; each route sets the document language and matching typography at build time.

Routes to build in later phases: /, /work, /work/[slug], /about, /contact and a custom 404.

Home, Work, case studies, About, Contact and the custom 404 support English and Thai. The static GitHub Pages build exports both languages and includes a deployment workflow. Contact validation runs in the browser and does not store or send messages.

No contact delivery service, analytics, external account changes or deployment is configured.
