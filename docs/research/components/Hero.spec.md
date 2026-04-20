# Hero Specification

## Overview
- **Target file:** `src/components/Hero.tsx`
- **Shared asset:** `src/components/LettersScatter.tsx` (50-path decorative SVG, reused by Devices)
- **Screenshot:** `docs/design-references/target-desktop-1440.png` (section 1)
- **Interaction model:** static (decorative SVGs + one CTA link). Live site also fades content in via the reveal hook; not yet wired for Hero in the clone.
- **Behavior source:** `docs/research/BEHAVIORS.md` §Hero and `docs/research/PAGE_TOPOLOGY.md` §1.

## DOM Structure (desktop)
```
<section .styles_hero__997X7>             bg #292A2E, min-height 900, overflow hidden
  <span .styles_letters__ZJjUj>            absolute inset 0; 1440×900 decorative SVG
    <svg viewBox="0 0 1492 1032">          two <g opacity="0.2"> groups, 25 paths each, fill #FBFBF9
  <div .styles_container__NSLBw>           padding 0 80px (desktop) / 0 24px (mobile-est)
    <div .styles_inner__AmD3Z>             max-width 1312px
      <h1 .styles_title__cjQkN>            Roslindale Display Narrow 96px/300, mb 50px
      <p  .styles_intro__YVOxp>            Manrope 24px/400, max-width 420px, mb 50px
      <div>                                wrapper around CTA
        <a .styles_button__dr0t2 .styles_secondary__fu8iC>   height 42, padding 12 16, radius 12, bg white
          <span .styles_background__LCUws>  absolute inset 0, 1px solid #282825, radius 12 (outline)
          <span .styles_label__d6_8L>       "Join for free", color #282825, weight 500
      <span .styles_cursorLeft__z90xh>      absolute top 129, left ~160, 120×134 cursor svg, stroke #FBFBF9
      <span .styles_cursorRight__Zy2zN>     absolute top 107, right 86, 60×76 purple cursor svg (fill+stroke #DC78FF)
</section>
```

## Computed Styles (exact values from getComputedStyle at 1440×900 viewport)

### Root `<section>`
- `background-color: rgb(41, 42, 46)` → `--color-surface-hero: #292a2e` (added to @theme)
- `color: rgb(251, 251, 249)` → `--color-surface-light` (used for the inverted foreground here)
- `min-height: 900px; height: 900px`
- `padding: 80px 0`
- `display: flex; flex-direction: row; align-items: center; justify-content: center`
- `overflow: hidden`
- `position: static` (in the clone we make it relative so the absolute children anchor to it)

### `.styles_container__NSLBw`
- `width: 100% (1440px at viewport)`
- `padding: 0 80px` (desktop) → `px-20` in Tailwind
- `display: block`

### `.styles_inner__AmD3Z`
- `max-width: 1312px`
- `margin: 0 auto`
- `width: auto` (grows to parent inner width)

### `<h1>`
- `font-family: "Roslindale Display Narrow"` → `font-display`
- `font-size: 96px; font-weight: 300`
- `line-height: normal`
- `text-align: center`
- `margin: 0 0 50px`
- `color: rgb(251, 251, 249)`

### `<p>`
- `font-family: Manrope` → `font-body`
- `font-size: 24px; font-weight: 400`
- `line-height: normal`
- `text-align: center`
- `max-width: 420px`
- `margin: 0 430px 50px` (auto-centered via remaining container width)
- `color: rgb(251, 251, 249)`

### CTA `<a>` ("Join for free")
- `href: https://write.ellipsus.com?utm_medium=website&utm_source=home_hero&utm_campaign=5569_join-for-free`
- `display: inline-flex; align-items: center; justify-content: center`
- `height: 42px`
- `padding: 12px 16px`
- `border-radius: 12px` → `rounded-m`
- `background-color: rgb(255, 255, 255)` (white pill)
- `color: rgb(40, 40, 37)` → `text-content-primary`
- `position: relative; overflow: visible`

### CTA inner `<span class=styles_background>`
- `position: absolute; inset: 0`
- `border: 1px solid rgb(40, 40, 37)` (dark outline ring on white fill)
- `border-radius: 12px`
- `background-color: rgba(0, 0, 0, 0)` (transparent — it's a border overlay)
- `transition: border-color 0.3s, background-color 0.3s, box-shadow 0.3s` (fills dark on hover)

### CTA inner `<span class=styles_label>`
- `position: static; color: rgb(40, 40, 37); font-size: 16px; font-weight: 500`

### `.styles_letters` container
- `position: absolute; inset: 0`
- `width: 1440px; height: 900px`
- `opacity: 1` (inner `<g opacity="0.2">` provides the fade)
- `z-index: auto` (render order = before content, so it sits behind due to source order)

### `.styles_cursorLeft`
- `position: absolute`
- `top: 129.195px; right: 1160px; left: 0; bottom: 60px` — computed at 1440. We position as `top-[129px] left-[160px]` (1440−1160−120 = 160) for a cleaner mapping
- `width: 120px; height: 133.805px`
- SVG: stroke `#FBFBF9`, stroke-width 1.801, stroke-linecap round

### `.styles_cursorRight`
- `position: absolute`
- `top: 107px; right: 86px; left: 1134px; bottom: 140px`
- `width: 60px; height: 76px`
- SVG: fill + stroke `#DC78FF` (brand-purple-inverted)

## Content (verbatim)
- **H1:** `Write like a human.`
- **Intro:** `Ellipsus is a collaborative writing tool made for creativity.`
- **CTA:** `Join for free` → `https://write.ellipsus.com?utm_medium=website&utm_source=home_hero&utm_campaign=5569_join-for-free`

## Responsive
- `< md (768px)`: H1 shrinks significantly (clone approximation: 56px); cursors hidden; letters scatter stays (scales via viewBox).
- `>= md (768px)`: desktop layout as above.

## Assets
- `src/components/LettersScatter.tsx` — 50-path decorative SVG, 40KB, exported as `<LettersScatter />` with `className` prop for positioning. Paths carry verbatim inline `translate3d` transforms.
- `src/components/icons.tsx` — adds `HeroCursorLeftIcon` and `HeroCursorRightIcon`.
- No raster images for this section.

## Implementation notes
- The live site SSR ships the `<h1>` empty (`<h1> </h1>`); the text is populated client-side, likely by a letter-reveal animation. For the clone we render the full text server-side because the reveal is purely decorative.
- Original content has `opacity:0;transform:translateY(10px)` inline on letters/intro/CTA wrapper plus `translateX(±40px) translateY(40px)` on the cursors — these are reveal-hook start states. Not yet wired in the clone; they should be attached via `useReveal()` in a follow-up when we migrate the other sections' reveal behavior.
- The CTA is the shared "secondary" Button pattern: white fill + 1px dark border + dark text. Same visual pill as the nav "Log in" button (they share `styles_button__dr0t2 styles_secondary__fu8iC`). Hover inverts the ring to filled dark.
- Hero background `#292A2E` does NOT match any existing token — added as `--color-surface-hero` in `@theme`.
