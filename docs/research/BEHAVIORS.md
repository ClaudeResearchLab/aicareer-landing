# ellipsus.com — Interaction Sweep Findings

Extracted 2026-04-20 via browser MCP at 1440 × 900 (cross-checked at 390 × 844). All computed-style reads were gated on `document.fonts.ready`.

## Global behaviors

- **No smooth-scroll library** in use. `html { scroll-behavior: auto }` on the root. No Lenis / Locomotive markers in the DOM.
- **No `scroll-snap`** on the root container — normal native scrolling.
- **Global scroll-reveal pattern**. Any element marked `.styles_appearOnScroll__I4os0` renders with:
  - initial: `opacity: 0; transform: matrix(1,0,0,1,0,40)` (= `translateY(40px)`)
  - transition: `opacity 0.4s linear [delay]s, transform 0.5s cubic-bezier(0.19, 1, 0.22, 1) [delay]s`
  - reveal: adding `.styles_isVisible__TsX_p` drops the transform + opacity to 1
  - stagger delays observed: `0, 0.2s, 0.4s, 0.5s, 0.6s`
  - implementation: IntersectionObserver (toggles `isVisible` once the element crosses a threshold) — reimplement with `useInView()` hook firing once, then leave `isVisible` set.
- **No custom scroll-bar styling** (no `::-webkit-scrollbar` overrides detected).
- **No global keyframe animations** at body level.
- **Color scheme**: single light theme. No `prefers-color-scheme` dark variant.

## Navigation

- **Sticky top bar**: `position: sticky; top: 0; z-index: 200`.
- **No scroll morph**. Background `rgb(244,244,242)` at `scrollY=0`, `scrollY=400`, and `scrollY=1500` — identical. No shadow, no border, no height change, no backdrop filter added on scroll. Treat the nav as visually static.
- **Desktop (≥ ~900 px)**: logo left, menu `<ul>` center, `Log in` + `Sign up` right. Menu entries have three dropdowns with an invisible hover trigger:
  - `Features` → `Features`, `What's new`
  - `Library` → `Blog`, `Help center`, `Merch`
  - `About` → `Who we are`, `Our stance on AI`
  - Each entry is wrapped in `.styles_navigationEntry__dcfPy` with an adjacent `.styles_subMenu__dnT3w` that appears on hover (mouseenter on parent `<li>`).
- **Mobile (< breakpoint, 390 shows 64-px nav)**: menu list hidden; hamburger `button.styles_iconButton__ri7S5` appears instead. Tapping it opens the companion `<nav class="styles_mobileMenu__9SdAh">` overlay (fullscreen; `h=0` when closed, covers viewport when open).
- Nav height: **74 px desktop / 64 px mobile** (CSS token `--navigation-height: 4.625rem` = 74 px).

## Hero

- **Static content** — no enter-animation observed at desktop (title/intro/CTA already at `opacity:1, transform:none` on load).
- **Decorative layer**: `<span class="styles_letters__ZJjUj">` holds a big inline SVG (viewBox `0 0 1492 1032`) whose `<path>` glyphs each carry an inline `style="transform: translate3d(Xpx, Ypx, 0)"` with unique random-looking offsets. The container `<g>` has `opacity="0.2"`. Appearance is static — transforms were identical across multiple reads.
- **CTA** links out to `write.ellipsus.com?utm_medium=website&utm_source=home_hero…` — treat as an inert `<a>` stub that just renders the correct label/href per PLAN §4.3.

## Devices

- The same "letters" scatter motif (`span.styles_letters__l2kwU`) repeats.
- Four `<img>` mockups (desktopImage, phone1Image, phone2Image, tabletImage) — collage.
- Scroll-reveal via `appearOnScroll` for the mockups themselves and the `on / any / device` caption words.
- Mobile collapse is dramatic (781 px → 223 px) — likely the mockups hide or stack into a compact arrangement. **Pending in-depth spec extraction.**

## Introduction ("Made for … writers")

- **Rotating-word mechanism** (middle word of the sentence `Made for [X] writers`). The `.styles_word__JwW2N` span cycles through the CMS-provided list every ~1.5 s:
  - `creative` (#2173BE)
  - `fan` (#529A6A)
  - `disorganized` (#C455EB)
  - `aspiring` (#EB5B55)
  - `passionate` (#F09236)
- Computed `opacity`/`transform` on the middle word read `1 / none` at every poll — the swap is done via `setTimeout`/`setInterval` replacing textContent (and the CSS color custom property) in place, not a CSS fade. Reproduce with `useEffect` + `setInterval(1500)` cycling an index and mapping index → `{word, color}`.
- Paragraph containers (`.styles_paragraphContainer__4sXjM`) carry `appearOnScroll` with 0 s + 0.2 s stagger.
- The `collaborators` chip ("That's us, collaborating!") uses a 0.6 s delayed reveal.
- Decorative SVG elements (`.styles_origami__9A2Vl`, `.styles_books__9Kgo3`) have their own scroll-reveal timings (0.5 s and 0.2 s delays).

## Showcase (3-slide carousel)

- **Built with Swiper**. DOM shows `.swiper swiper-initialized swiper-horizontal styles_slider__wFWN3` with `swiper-slide-prev`, `swiper-slide-active`, `swiper-slide-next` classes on children (centered "peek" layout — prev + active + next all visible).
- **6 `.swiper-slide styles_slide__u0yHk`** entries total — Swiper clones the 3 real slides to implement wrap-around "loop" mode.
- **Prev/next arrows**: 4 `<button class="styles_arrowButton__j7Q_d …">` nodes total:
  - `.styles_buttonLeft__5yCS6 .styles_wideButton__6zsNV` (desktop left)
  - `.styles_buttonRight__yXx3f .styles_wideButton__6zsNV` (desktop right)
  - `.styles_buttonLeft__5yCS6 .styles_narrowButton__4pBz8` (mobile left)
  - `.styles_buttonRight__yXx3f .styles_narrowButton__4pBz8` (mobile right)
- **Slides**: each contains a `<video loop muted playsinline>` with `<source type="video/webm">` + `<source type="video/mp4">`, a poster image, and a title overlay.
- **Video behavior**: `loop muted playsinline`. Even though `autoplay` attribute reads `false` (React hydration artifact), the videos play visually because `muted+loop+playsinline+in-viewport` permits autostart in browsers; `autoplay` can safely be set true in our clone.
- **Interaction**: click left/right arrow to advance. No drag/swipe test captured — Swiper supports touch swipe by default; treat as click-only at desktop and swipe-or-click at mobile. Autoplay / auto-cycle NOT observed in a ~3 s window — prefer user-driven navigation. No visible pagination dots in this section.
- **Decision**: we will not install Swiper. Reimplement as a small React carousel with a `state index` and CSS transform on the track; render only real 3 slides (no loop clones) and wrap-around on click.

## Statement

- All content uses `appearOnScroll` with staggered delays.
- Decorative SVGs have individual classes: `.styles_lamp__vW0n2`, `.styles_cup__8RT01`, `.styles_robot__zRLMW`, plus a container div — each an inline SVG. Their scroll-reveals are individually timed.

## Counter

- `styles_container__NSLBw .styles_appearOnScroll__I4os0` wrapping the whole inner — whole block fades/translates together.
- `400,000` is literal text inside a `<span>` — **not** a rolling counter. Do not animate the digits.
- Decorative SVG `styles_wave__5WcLS` occupies the top edge (wave shape, fill `#fbfbf9`, viewBox `0 0 1849 81`).

## SignupBanner

- Scroll-reveal on content block.
- One decorative SVG (flower/orn.) — extract exactly during spec pass.

## Footer

- Entirely static.
- Links render in UPPERCASE via CSS (`text-transform`); source text is mixed-case — use source casing and style it via CSS.
- 15 inline SVGs (social icons + column row markers + small decorative accents). Enumerate during spec.

## Responsive breakpoints

- No CSS `@media` values introspected directly, but the observed layout switches:
  - Around **≈768 px**: desktop menu `<ul>` hides, hamburger appears (nav height drops 74 → 64). Showcase swaps wide arrow buttons for narrow. Devices collapse.
  - Around **≈1024 px** (likely): multi-column footer stacks.
- Treat `md (≥768)` and `lg (≥1024)` as the two breakpoints for the port. Use Tailwind's default `sm / md / lg / xl` scale; the exact pixel thresholds will be confirmed per-section during Phase 3 extraction.

## Autoplay / time-driven summary

| Where | Mechanism | Period |
|-------|-----------|--------|
| Introduction rotating word | `setInterval(~1500ms)` text swap | ~1.5 s |
| Showcase videos | `<video autoplay loop muted playsinline>` | video loop length |
| (no other) | — | — |

## Click-driven summary

| Where | Trigger | Effect |
|-------|---------|--------|
| Nav entry `<li>` | hover | show submenu (CSS-driven) |
| Nav hamburger (mobile) | click | open MobileMenu overlay |
| Showcase prev/next | click | advance carousel ±1 |
| All CTA links | click | external navigation to `write.ellipsus.com` (stub per PLAN §4.3) |

## Scroll-driven summary

| Where | Trigger | Effect |
|-------|---------|--------|
| `.styles_appearOnScroll__I4os0` everywhere | IntersectionObserver (~20–30% of viewport) | toggle `isVisible` → opacity 0→1 + translateY 40→0 with staggered delays |

No additional scroll-bound parallax or `animation-timeline: scroll()` was observed.
