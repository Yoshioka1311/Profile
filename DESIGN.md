# Design direction

A visitor studies the owner's projects on a laptop in subdued evening light. Near-black sections, white type and slow, measured motion create the intimate mood the owner requested.

## Colour

Use the owner's strict grayscale palette. Background #050505, elevated background #0d0d0d, graphite #141414 and #1f1f1f, white headings, body white at 72% opacity, muted text #9a9a9a, dividers #2a2a2a. Store tokens in app/globals.css and expose them through tailwind.config.ts. Preserve the original colours in national flags, project screenshots, and the requested university logo. The university logo uses a white backing for contrast.

## Typography

Oswald provides the heading look defined by Nocturna's current stylesheet. Source Sans 3 has open, readable body text that contrasts with Oswald's condensed headings. Noto Sans Thai supplies Thai glyphs, full mark clearance and natural word wrapping. next/font hosts the files through the app. Do not squeeze or letter-space Thai headings.

The owner requested oversized display type. The display token therefore exceeds Impeccable's general 96px ceiling. Use balanced line breaks, a 12-column grid and responsive gutters. Preserve the name in data/content.ts as the only editable identity source.

## Interaction and motion

Use actual local SVG flags, never emoji. Flag artwork is 36px inside 48px buttons with an 8px gap. Selected controls have a white ring. Provide accessible language names even though no text appears beside the flags. Keep content visible without animation.

The menu and route curtain use Framer Motion's DOM animation features. The intro uses CSS keyframes for the letters, progress line and lift. Lenis and GSAP ScrollTrigger load on fine-pointer devices without reduced motion. Lenis attaches to the GSAP ticker during smooth scrolling and detaches on settle. The provider destroys Lenis and removes its listeners on unmount or preference changes. Scroll locks stop Lenis and restore native overflow when the last lock releases.

The mobile menu is a native modal dialog with focus wrapping, Escape dismissal and focus restoration. It closes when resized to desktop. The cursor uses animation frames while its ring approaches the pointer, stops when settled, and restores the native cursor during keyboard input, touch input and scroll locks. The first-session intro is decorative, respects Thai grapheme clusters, takes about 1.3 seconds and has a 1.55-second release timer. Content stays available if the optional animation code fails to load.

## Scope and references

Home uses an asymmetric 12-column composition with the owner's name on two lines in the left columns and a portrait frame on the right. Portraits stack below the name on phones. Projects appear on Work. Empty portrait paths render grayscale gradient frames until the owner supplies real images. The Nocturna reference informed the heading typeface. Preserve the owner's other references for later design work.

## Page transitions

Phase 3 keeps PageTransitionProvider in the root layout, outside the changing page template. AnimatePresence owns the overlay rather than retaining old App Router page trees. Internal links use Next Link's onNavigate event. Modified clicks, external links, same-page queries and fragments retain their normal browser behaviour.

The gradient curtain enters over 0.46 seconds, then requests the route beneath it. RouteReady in app/template.tsx reports committed pages, including changes within /work. The curtain exits over 0.5 seconds. New-page scroll resets happen while covered, and focus moves to main content after the overlay releases. Browser history uses an incoming curtain over the committed destination without adding history entries or resetting restored scroll positions. Reduced motion uses short opacity fades with no vertical travel.

The overlay uses the existing scroll-lock hook and temporarily makes the site shell inert. A six-second watchdog starts its release if route arrival fails. This releases the visual cover, not the underlying router request. Destination titles and the accessible navigation status come from data/content.ts. No route transition runs on initial load or a language-only change.

The local Impeccable installation includes its entrypoint only. Its helper scripts and referenced workflows are unavailable. UI/UX Pro Max's search returned a generic layout and a blue accent that conflict with this brief. Use its verified focus, contrast, font and responsive guidance; retain the owner's layout, typography and palette.

## Home scroll sequences

Reusable text reveals measure wrapped lines after fonts load. Each line rises through a mask with an 80ms stagger. Thai uses word segmentation with mark clearance. Screen readers receive a single intact string. Media reveals use a clipped inset and a slow scale from 1.15 to 1; project hover zoom reaches 1.05 as requested in the owner's brief. Reveal playback waits until the intro or route cover releases its scroll lock.

On fine-pointer screens at least 1024px wide and 700px tall, the statement changes words from 45% to full opacity for readable contrast. Shorter screens, touch layouts and reduced motion keep a vertical flow. Resizing and route departure revert pin spacers, transforms and listeners. Home has no featured project section or horizontal project animation.

Subtle section washes follow desktop scroll progress. Hero parallax and an ambient gradient add depth. The ambient animation pauses outside the viewport and in hidden tabs. On touch devices, one-shot CSS reveals run when content enters the viewport. Default markup is visible before motion initializes, and reduced motion leaves the text and media static.

## Work archive and case studies

Work uses a single column of large project backgrounds with titles, short summaries and an Open website action over each screenshot. Layered dark overlays keep the text readable. The main link covers the background, and the separate GitHub link remains accessible by keyboard and touch. Work shows no Project archive caption, project count, years or role labels.

The project backgrounds are visible on desktop and touch layouts before motion starts. On smaller screens the text uses the full width with a stronger bottom overlay. Real previews are stored locally in public/images/projects.

Case-study headings span the grid, with an offset summary and a full-width cover. Tools remain sticky alongside the story on tall desktop screens. The story alternates readable paragraphs and large image frames, then ends with a viewport-sized next-project link. On smaller screens tools sit above the story. Link placeholders remain plain text until valid web addresses are added.

Motion Principles' available entrypoint informed restraint, animation-frame pointer updates and keyboard dismissal. Its supporting cookbook and designer/accessibility references are unavailable locally; no claims of reading those missing resources are made. The UI/UX Pro Max archive search matched scroll storytelling and keyboard/touch guidance. Its generic brutalist typography, colours and instant transitions were not adopted because the owner's existing design system takes precedence.
