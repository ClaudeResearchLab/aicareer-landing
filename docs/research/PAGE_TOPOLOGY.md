# ellipsus.com — Page Topology

Extracted 2026-04-20 from the live site (desktop 1440, mobile 390 cross-checked). All computed values came after `document.fonts.ready` resolved. 22 font faces enumerated; two active families: **Manrope** (body) and **Roslindale Display Narrow** (display).

The page is built with Next.js (pages router) + Sanity CMS. All section content comes from `__NEXT_DATA__.props.pageProps.homepage`. The full home document is one `<main class="styles_homepage__eeR7K">` with 6 inline `<section>`s, followed by two top-level siblings (signup banner + footer) living in a sibling `<div>` outside `<main>`.

## Document Shape

```
<body>
  <div id="__next">
    <nav.styles_navigation__IcBDd>         ← sticky, z-200, h=74 desktop / 64 mobile
    <nav.styles_mobileMenu__9SdAh>         ← hidden overlay (h=0 when closed)
    <div>                                   ← wraps <main>
      <main.styles_homepage__eeR7K>
        <section.styles_hero__997X7>
        <section.styles_devices__bM_PM>
        <section>                           ← "Introduction / Paragraphs" (no section class)
        <section.styles_showcase__Wv3HS>
        <section.styles_statement__b69_h>
        <section.styles_counter__3J6Jl>
      </main>
    </div>
    <div>                                   ← wraps banner + footer
      <section.styles_signupBanner__bEbju>
      <section.styles_footer__v_hzj>
    </div>
  </div>
</body>
```

Page height at 1440: **7562 px**. At 390: **7237 px**. Background `rgb(244, 244, 242)` (`--color-surface-primary: #f4f4f2`).

## Section Map (desktop 1440)

| # | Component              | DOM anchor                              | Top  | Height | Interaction model               |
|---|------------------------|-----------------------------------------|------|--------|---------------------------------|
| 0 | Navigation             | `nav.styles_navigation__IcBDd`          |   0  |    74  | static sticky + hover dropdowns |
| 0b| MobileMenu (overlay)   | `nav.styles_mobileMenu__9SdAh`          |   0  |     0  | open/close triggered by hamburger |
| 1 | Hero                   | `section.styles_hero__997X7`            |  74  |   844  | decorative letter scatter (static) |
| 2 | Devices                | `section.styles_devices__bM_PM`         | 918  |   781  | scroll-reveal + device mockups  |
| 3 | Introduction           | `main > section:nth-child(3)`           | 1699 |  1545  | **rotating word** + scroll-reveal paragraphs + avatars/books |
| 4 | Showcase               | `section.styles_showcase__Wv3HS`        | 3244 |  1128  | **Swiper carousel** (3 slides, click prev/next) + looping video per slide |
| 5 | Statement              | `section.styles_statement__b69_h`       | 4372 |  1206  | scroll-reveal captions + decorative ornaments (lamp, cup, robot) |
| 6 | Counter                | `section.styles_counter__3J6Jl`         | 5578 |   676  | scroll-reveal + static count "400,000" + CTA + wave SVG divider |
| 7 | SignupBanner           | `section.styles_signupBanner__bEbju`    | 6398 |   499  | scroll-reveal + CTA (inert link stub) |
| 8 | Footer                 | `section.styles_footer__v_hzj`          | 6897 |   666  | static; 24 links, 15 inline SVG icons, quote |

## Section Map (mobile 390)

| # | Component     | Top  | Height | Notes                                                  |
|---|---------------|------|--------|--------------------------------------------------------|
| 0 | Navigation    |   0  |   64   | smaller nav; hamburger replaces links                  |
| 1 | Hero          |  64  |  844   | letter scatter scales; title likely stacks             |
| 2 | Devices       | 908  |  223   | collapses — device mockups likely hidden or simplified |
| 3 | Introduction  | 1131 | 1892   | grows (paragraphs stack)                               |
| 4 | Showcase      | 3023 | 1222   |                                                        |
| 5 | Statement     | 4245 |  800   | shorter — decorative ornaments adjust                  |
| 6 | Counter       | 5045 |  346   |                                                        |
| 7 | SignupBanner  | 5517 |  569   |                                                        |
| 8 | Footer        | 6085 | 1152   | stacks vertically                                      |

## Section Content Summary

Raw content sourced from `__NEXT_DATA__.props.pageProps.homepage` (Sanity response). Verbatim copy preserved for builder prompts.

### 1. Hero
- **Title:** `Write like a human.`
- **Intro:** `Ellipsus is a collaborative writing tool made for creativity.`
- **CTA:** `Join for free` → `https://write.ellipsus.com?utm_medium=website&utm_source=home_hero&utm_campaign=5569_join-for-free`
- **Decoration:** Large background SVG of pretty, randomly-translated letterform paths (`span.styles_letters__ZJjUj svg`), opacity 0.2.

### 2. Devices
- **Caption words:** `on`, `any`, `device`
- **Assets (from CMS):**
  - desktopImage — `Ellipsus on Desktop`, 2340×1462 PNG
  - phone1Image  — `Ellipsus on Android`, 527×1113 PNG
  - phone2Image  — `Ellipsus on iPhone`, 429×871 PNG
  - tabletImage  — `Ellipsus on Tablet`, 694×1056 PNG
- **Decoration:** its own letter scatter (`styles_letters__l2kwU`).

### 3. Introduction
- **Rotating sentence:** `Made for [creative|fan|disorganized|aspiring|passionate] writers`
  - Colors per word — `#2173BE`, `#529A6A`, `#C455EB`, `#EB5B55`, `#F09236`
  - Cycles every ~1.5 s (swap appears instant in computed styles; likely keyframe fade handled via child opacity)
- **Paragraph 1:** `Plenty of tools are made for memos, notes, and to-do lists.` **`That's not us.`** *(bold italic)*
- **Paragraph 2:** `Ellipsus is here to help you build worlds, wrench hearts, raise eyebrows, and ` _`celebrate creativity`_ ` in` **` all its forms.`**
  - `celebrate creativity` → underlined; `all its forms.` → bold
- Scroll-reveal container class: `.styles_appearOnScroll__I4os0`; decorative origami + book SVGs alongside.

### 4. Showcase
- **Title:** `One place for drafts, edits, and discussions`
- **Intro:** `Your bespoke Docs-to-Discord-to-DM-to-Docs-to-??? process isn't polishing that prose any faster. (And to be honest, it sounds pretty stressful.) Streamline the way you write, edit, and manage feedback with Ellipsus.`
- **Collaborators chip:** `That's us, collaborating!`
  - Avatars: `Mary Shelley's avatar`, `P's avatar`, `Lord Byron's avatar`
- **Slides (3):**
  1. `Stay in control with connected drafts` — webm `88e6b9ec…`, mp4 `beb61354…`, poster `b93fdb2c…`
  2. `Keep feedback focused with comments + drafts` — webm `4e3a33d7…`, mp4 `18f006c0…`, poster `bf9f03e3…`
  3. `Write, draft, merge, repeat` — webm `167c5fb4…`, mp4 `264509701…`, poster `87c57f09…`
- **Mechanism:** Swiper v10-style carousel (`swiper-initialized swiper-horizontal`, peek-centered with prev/active/next visible). Prev / next arrows. 4 arrow buttons total (wide + narrow variants — desktop and mobile). Videos loop muted+playsinline; they play when in view.

### 5. Statement
- **Title:** `A principled alternative—by writers, for writers`
- **Intro:** `We think writers should be free to ` _`express their creative vision`_ `—away from aggressive censorship and the ` **`prying eyes of AI`** `.`
- **Caption 1:** `Your content is ` **`YOURS`** `.`
- **Caption 2:** `No generative AI—` **`ever`** `.`
- Decorative ornaments: `styles_lamp__vW0n2`, `styles_cup__8RT01`, `styles_robot__zRLMW` + at least one additional container.

### 6. Counter
- **Sentence:** `Trusted by [400,000] (human) writers, and counting...`
  - Number is a plain `<span>` with text `400,000` — static, not animated counter
  - Container has `styles_appearOnScroll__I4os0` so it fades/translates on enter
- **CTA:** `Join for free` → `https://write.ellipsus.com?utm_medium=website&utm_source=home_writers-count&utm_campaign=5569_join-for-free`
- **Decoration:** SVG wave divider (`class=styles_wave__5WcLS`, fill `#fbfbf9`, giant decorative curve spanning the section width — viewBox `0 0 1849 81`).

### 7. SignupBanner
- **Heading:** `Get started–write away.`
- **CTA:** `Sign up—it's free` (external write.ellipsus.com link, inert per PLAN §4.3)
- One decorative SVG.

### 8. Footer
- **Columns (3 desktop):**
  - col A: `What's new`, `Blog`, `Help center`
  - col B: `Who we are`, `Our stance on AI`
  - col C: `Merch store`, `Status`, `Contact us`
- **Social row (extracted count: 15 inline SVGs total in footer)** — enumerate exactly per-spec.
- **Quote:** `"More than any other single invention, writing has transformed human consciousness."` — `Walter J. Ong`
- **Legal row:** `Terms of service`, `Privacy policy`
- **Address:** `Jägerstraße 54-55 10117 Berlin Germany`

## Logical Component Plan

```
src/components/
  Navigation.tsx       # sticky top bar (desktop menu + hamburger)
  MobileMenu.tsx       # fullscreen overlay opened by hamburger
  Hero.tsx             # letters SVG scatter + headline + intro + CTA
  Devices.tsx          # "on any device" caption + 4 device mockups
  Introduction.tsx     # "Made for [rotating] writers" + 2 paragraphs + decorative origami/books
  Showcase.tsx         # carousel container; delegates slides to <ShowcaseSlide/>
    ShowcaseSlide.tsx  # video card with title
    ShowcaseArrows.tsx # prev/next arrow buttons (wide + narrow variants)
    CollaboratorsChip.tsx # "That's us, collaborating!" + 3 avatars
  Statement.tsx        # title + intro + 2 captions + ornaments (lamp/cup/robot)
  Counter.tsx          # sentence with inline count + CTA + wave SVG
  SignupBanner.tsx     # heading + CTA
  Footer.tsx           # columns + quote + legal + address
  LettersScatter.tsx   # shared decorative letterform SVG (hero + devices)
  icons.tsx            # all reusable inline SVG icons
```

### Parallelization plan

- **Sequential on `main`**: Navigation, Hero, Devices, Introduction, Statement, Counter, SignupBanner, Footer. Each is self-contained, single-file, spec likely < 100 lines.
- **Worktree candidates**: Showcase (spec will exceed 100 lines: Swiper-style carousel, 3 video slides, collaborators chip, 2 arrow-button variants, mobile vs desktop layouts).
- All shared primitives (icons, LettersScatter, globals.css tokens) land in Phase 2 before any section builder runs.

## Known Third-Party Libraries

- **Swiper** — in use on the Showcase section (`swiper swiper-initialized swiper-horizontal` classes + adjacent `swiper-slide-active`/`prev`/`next`). Decision: port behavior with a small custom React carousel (no Swiper dependency) to keep the dep set minimal per PLAN §5. Swiper's behavior is reproducible with CSS transforms + a state index.

## Scripts & Analytics

No third-party analytics observed. All `<script>` tags are self-hosted under `ellipsus.com`. We still don't mirror any of the live site's `_next/static/*`.

## Remote Asset Hosts

- `cdn.sanity.io/images/3sx2q15i/production/*` — 31 images (icons + cards + posters + og)
- `ellipsus.com/videos/*` — 6 video files (3 unique pairs of webm+mp4; duplicated in DOM for mobile/desktop variants)
- `ellipsus.com/images/svg/ui/homepage/...` — 5 decorative wiggle/underline/circle background SVGs
- `ellipsus.com/favicon*.png|ico|svg`, `apple-touch-icon.png`, `safari-pinned-tab.svg`, `site.webmanifest`
- `cdn.sanity.io/.../16946ebaac68…-1200x630.jpg` — OG share image

All of the above are downloadable in Phase 2 via a `scripts/download-assets.mjs` that reads this topology.
