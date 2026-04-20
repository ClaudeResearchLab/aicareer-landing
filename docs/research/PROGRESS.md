# AICareer v2 Landing — Clone Progress Log

Authoritative log of which sections are specced, built, and merged. Updated at every section boundary. Read this first on session resume; do not re-extract specced sections unless flagged "revisit".

## Session Log

- **2026-04-20 (bootstrap)** — Repo scaffolded from the Noukash port template. No extraction yet.
- **2026-04-20 (Phase 1)** — Full reconnaissance done. Screenshots captured, topology mapped (9 sections), behaviors recorded, global design tokens extracted, CMS content model retrieved via `__NEXT_DATA__`. Ready for Phase 2.
- **2026-04-20 (Phase 2)** — Foundation built: 59 assets downloaded (14 fonts, 7 SEO, 5 decorative SVGs, 28 Sanity images, 6 videos), `next/font/local` wired in `layout.tsx` with verbatim Ellipsus meta + theme-color + icons, `globals.css` holds full `@theme` token set and `.reveal` utility, `useReveal` + `useRotatingWord` hooks created, `icons.tsx` seeded with 5 placeholder primitives (Phase 3 will replace with extracted SVGs), `HomepageData` types defined. `npm run check` passes clean. Ready for Phase 3.
- **2026-04-20 (Phase 3 · Navigation)** — `Navigation.tsx` built to spec; hover dropdowns with coral squiggle highlight + submenu tilt; sub-item underline on hover; external link handling; `Navigation.spec.md` written.
- **2026-04-20 (Phase 3 · Hero)** — Hero extracted and built: section bg `#292A2E` added as `--color-surface-hero` token; `LettersScatter.tsx` (50-path decorative SVG, 40KB) extracted verbatim from SSR; `HeroCursorLeftIcon` + `HeroCursorRightIcon` added to `icons.tsx`; white pill CTA with dark-outline hover-fill; `Hero.spec.md` written. `Hero` wired into `src/app/page.tsx`. `npm run check` passes clean.
- **2026-04-20 (Phase 3 · Devices)** — Devices built: `position: sticky; top: 0; h-[781px]` section with 4 absolutely-positioned device mockups (desktop, tablet -20°, phone-android, phone-ios +10°) rendered in pre-reveal state (inline `translate...(150px)` transforms). Reuses `LettersScatter` at light opacity. Mobile layout deferred (`hidden md:block`). `Devices.spec.md` written and wired into `src/app/page.tsx`. `npm run check` passes clean.
- **2026-04-20 (Phase 3 · Introduction)** — Introduction built: two-half section (sticky stone `#E5E5E1` top with rotating-word sentence + origami crane decor, paragraphs half on `#F4F4F2` with books + composition illustrations). Rotating word cycles 5 entries via `useRotatingWord`. 3 decorative text backgrounds (wiggle.svg under "That's not us.", underline.svg under "celebrate creativity", circle.svg around "all its forms."). 3 large SVG decor files saved to `public/images/decor/introduction/` (origami 63KB, books 91KB, composition 722KB — xmlns added for browser rendering). New `--color-surface-stone` token. Top/bottom waves inlined. `Introduction.spec.md` written; wired into `src/app/page.tsx`. `npm run check` passes clean.
- **2026-04-20 (Animation sweep · Hero)** — Confirmed Ellipsus h1 has two layered effects: `opacity 0 → 1` fade-in via `styles_isReady__QX2_z` class (added on mount) and a blinking typewriter cursor `::after` ("|", `animation: styles_blink 0.6s infinite`, keyframes `0,49% → 0` / `50,99% → 1` / `100 → 0`). Added `.hero-title` + `@keyframes hero-blink` + `@keyframes hero-ready` to `globals.css` (pure CSS, no client component needed — one-shot fade-in animation on mount + infinite blink on pseudo). Both respect `prefers-reduced-motion`. Verified blink cycles 0→1→0 with ~0.6s period in clone. Devices has no scroll-reveal on live site (static transforms) — clone already matches. Remaining keyframes on live site (`sprinkle1..5`, `lampRays`, `vapor1..3`) belong to unbuilt Statement/Counter sections.
- **2026-04-20 (Phase 3 · Showcase)** — Built pinning showcase of 4 stacked example-doc cards (min-h 900px, sticky interior); reveal groups for left title column and right card stack; real Sanity assets wired.
- **2026-04-20 (Phase 3 · Statement)** — Built: bg `#F4F4F2`, 80/300 Roslindale h2, flex-end intro w/ underlined `<span>` + `<strong>`, two absolutely-positioned captions (green `#529A6A` + coral brand) with caption arrows, robot illustration anchored `left:-40 top:380 w:690 h:668`, 7 bouncing sparkle balls with per-ball rotations (30°, 210°, -50°, -30°, 40°). `useReveal` on title/intro/robot.
- **2026-04-20 (Phase 3 · Counter)** — Built: `sticky top-[74px]` light-bg section with wave.svg divider (63.08h, negative translate), 40/80px Roslindale "Trusted by 400,000 (human) writers, and counting..." centered max-w 1100, dark pill CTA "Join for free" → write.ellipsus.com.
- **2026-04-20 (Phase 3 · SignupBanner)** — Built: dark `bg-surface-inverted-2` section (later made `relative` so it paints above sticky Counter — see layering note below), 64px Roslindale h3 "Get started–write away.", white CTA "Sign up—it's free" → account.ellipsus.com/sign-up, decor.svg (door w/ sparkles) pulled up via `-mt-[240px]`.
- **2026-04-20 (Phase 3 · Footer)** — Built: `bg-surface-inverted` (#0C0D0D), two-column 240/640 layout; left column EllipsusLogo + 8 nav links + 7 social icons (Mail/Tumblr/Discord/Instagram/TikTok/LinkedIn/Bluesky, all added to `icons.tsx`); right column quote block + bottomRight legal links + Berlin address. Outer `<footer>` also made `relative` to paint above sticky Counter.
- **2026-04-20 (Layering fix · Counter stacking)** — Counter is `position: sticky`, which paints it as a positioned element above any static siblings. Adding `relative` to SignupBanner's outer div and Footer's outer `<footer>` restores tree-order painting so the sticky Counter scrolls *under* them. Verified visually at 1440: SignupBanner and Footer both render cleanly over the pinned Counter.

## Pre-flight Status

- [x] Repo scaffolded: package.json (pinned), tsconfig, next.config, eslint, postcss, .mcp.json, .npmrc, .nvmrc
- [x] `.claude/skills/clone-website/SKILL.md` adapted for ellipsus.com
- [x] AGENTS.md, CLAUDE.md, docs/PLAN.md written for Ellipsus target
- [x] `npm install` run
- [x] `npm run build` passes on empty scaffold
- [x] chrome-devtools-mcp connected
- [x] `https://ellipsus.com/` reachable from the MCP
- [x] `document.fonts.ready` guard passes on page load (22 faces enumerated)

## Phase 1 — Reconnaissance

- [x] Full-page 1440 screenshot → `docs/design-references/target-desktop-1440.png`
- [x] Full-page 390 screenshot → `docs/design-references/target-mobile-390.png`
- [x] Interaction sweep (scroll / click / hover / responsive) → `docs/research/BEHAVIORS.md`
- [x] `docs/research/PAGE_TOPOLOGY.md` — every distinct section mapped in order with interaction model
- [x] Global design tokens extracted → `docs/research/DESIGN_TOKENS.md`
- [x] Font discovery — 22 faces: Roslindale Display Narrow (display), Manrope (body). CourierPrime / Quentin / slick / Roslindale Condensed loaded but not actively rendered on home
- [x] CMS content retrieved from `__NEXT_DATA__` — verbatim copy captured in PAGE_TOPOLOGY

## Phase 2 — Foundation

- [x] `scripts/download-assets.mjs` — single script that downloads fonts, images, videos, favicons
- [x] Fonts in `public/fonts/` (Roslindale Display Narrow × {300, 400 + italics}, Manrope × {400, 500, 700})
- [x] 28 Sanity images downloaded to `public/images/` (4 devices, 3 avatars, 3 video posters, 7 nav icons, 10 nav cards, 1 counter-bg)
- [x] 3 videos (webm + mp4) downloaded to `public/videos/`
- [x] 5 decorative SVGs (wiggle, underline, circle, statement/wiggle, statement/circle) in `public/images/`
- [x] Favicons + OG images in `public/seo/`
- [x] `src/app/layout.tsx` — `next/font/local` wired, verbatim SEO metadata, `<html lang="en">`, theme-color `#f5f5f1`, metadataBase set
- [~] `src/components/icons.tsx` — seeded with 5 placeholder primitives (ChevronDown, Hamburger, Close, ArrowLeft, ArrowRight). Phase 3 replaces these with verbatim extracted SVGs per section.
- [x] `src/app/globals.css` — full token set (`@theme`), base layer, `.reveal` utility. `@font-face` replaced by `next/font/local` var aliasing.
- [x] `src/types/homepage.ts` — types for HomepageData (navigation, hero, devices, introduction, showcase, statement, counter, signup, footer)
- [x] `src/hooks/useReveal.ts` — IntersectionObserver one-shot reveal
- [x] `src/hooks/useRotatingWord.ts` — setInterval(1500) word+color cycler, respects prefers-reduced-motion
- [x] `npm run check` passes

## Phase 3 — Sections

| # | Component          | Spec | Built | Wired | QA'd |
|---|--------------------|------|-------|-------|------|
| 1 | Navigation         |  ✔   |  ✔    |  ✔    |      |
| 2 | MobileMenu         |      |       |       |      |
| 3 | Hero               |  ✔   |  ✔    |  ✔    |      |
| 4 | Devices            |  ✔   |  ✔    |  ✔    |      |
| 5 | Introduction       |  ✔   |  ✔    |  ✔    |      |
| 6 | Showcase           |  ✔   |  ✔    |  ✔    |      |
| 7 | Statement          |  ✔   |  ✔    |  ✔    |      |
| 8 | Counter            |  ✔   |  ✔    |  ✔    |      |
| 9 | SignupBanner       |  ✔   |  ✔    |  ✔    |      |
|10 | Footer             |  ✔   |  ✔    |  ✔    |      |

Shared primitives (Phase 2):
- LettersScatter.tsx (used by Hero + Devices)
- Button (CTA styles already available in the design tokens)

## Phase 4 — Assembly

- [ ] `src/app/page.tsx` wired
- [ ] Page-level behaviors implemented (IntersectionObserver reveal hook, rotating-word cycle)
- [ ] `npm run check` passes clean

## Phase 5 — Visual QA

- [ ] Desktop 1440 pixel diff ≤1%
- [ ] Mobile 390 pixel diff ≤1%
- [ ] All behaviors from BEHAVIORS.md verified in clone
