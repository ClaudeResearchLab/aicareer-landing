# SignupBanner Specification

## Overview
- **Target file:** `src/components/SignupBanner.tsx`
- **Interaction model:** Scroll-reveal title + CTA + decor.

## DOM / Layout (desktop 1440)
- Outer `<div>` bg `#1D1E20` (`--color-surface-inverted-2`), padding `144px 80px 0`
- `.inner { max-width: 1312px }`, width 1280, height 499
- Two `<div class="appearOnScroll">` blocks inside:
  1. Text block (143 tall):
     - `<h3 class="title">` max-w 50%, font 64/Roslindale 300 `#FBFBF9`, mb 24: "Get started–write away."
     - `<a class="button secondary cta">` bg `#FFFFFF`, color `#282825`, radius 12, padding 12/16. Label "Sign up—it's free". href likely to write.ellipsus.com signup (use write.ellipsus.com signup URL).
  2. Decor block (356 tall) with big SVG decor (`/images/signup/decor.svg`): 1280w x 591h, margin-top -240px.

## Assets
- `public/images/signup/decor.svg`
