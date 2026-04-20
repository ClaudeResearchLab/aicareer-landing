# Counter Specification

## Overview
- **Target file:** `src/components/Counter.tsx`
- **Interaction model:** Static sentence + CTA. Outer `<section>` has `position:sticky; top:74px` which produces a parallax/pin effect as the page scrolls past.

## DOM / Layout (desktop 1440)
- `<section>` sticky top 74px, bg `#FBFBF9` (`--color-surface-light`), padding `200px 0`.
- Decorative wave svg (`/images/counter/wave.svg`) absolute bottom:612.92 w:1440 h:63 `transform: translateY(-31.54px)` — decorative divider above content.
- `.container { padding: 0 80px }` → `.inner { max-width: 1312px }` → `.content { display:flex; flex-direction:column; align-items:center; gap:40px }`.
  - `<p class="sentenceParts">` 1100w, text-align center, font 80/Roslindale 300: 3 `<span>`s:
    1. "Trusted by"
    2. "400,000"
    3. "(human) writers, and counting..."
  - `<a class="button primary">` href `https://write.ellipsus.com/?utm_medium=website&utm_source=home_writers-count&utm_campaign=5569_join-for-free`, label "Join for free". Bg `#0C0D0D`, color white, radius 12, padding 12/16, font 16/18 Manrope 500.

## Assets
- `public/images/counter/wave.svg`
