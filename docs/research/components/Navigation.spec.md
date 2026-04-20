# Navigation Specification

## Overview
- **Target file:** `src/components/Navigation.tsx`
- **Screenshot:** `docs/design-references/nav-desktop.png`
- **Interaction model:** static sticky bar + hover-driven submenus (desktop). Mobile handled by `MobileMenu.tsx` (separate spec).
- **Behavior source:** `docs/research/BEHAVIORS.md` §Navigation.

## DOM Structure (desktop)

```
<nav .styles_navigation__IcBDd>          position: sticky; top: 0; z-index: 200
  <a .styles_logoAnchor__IJL_y href="/"> display: flex
    <svg .styles_logo__0HEWk>             147 × 32.9 px, fill=currentColor
  <ul .styles_entriesWide__cKsWF>        flex; gap: 40px; margin: 0 40px
    <li> × 3                              position: relative; height: 58px
      <a .styles_navigationEntry__dcfPy> padding: 16px 0
        <span .styles_navigationEntryContent__kpuW2> position: relative; display: flex
          <svg .styles_activeMark__M5ega>  coral squiggle, absolute, opacity:0 idle
          { label text }
          <div .styles_chevronContainer__2rI0r> margin: 4px 0 0 8px; 16×22
            <svg .styles_chevron__e0Ujw>
      <div .styles_subMenu__dnT3w>         absolute; top:58; w:600; h:220; opacity:0
        <ul .styles_subEntries__keXaz>    margin: 24px 40px; w:220
          <li .styles_subEntryContainer__7DDtu> × 2–3
            <a>
              { sub-label }
              <svg .styles_subItemUnderline__YNp9r> (appears on hover)
        <div .styles_imageContainer__UHaFF> w:300; h:220
          <img .styles_image__yrrXW>       default preview
  <div .styles_actions__2m6Px>            flex; gap: 8px
    <div .styles_actionsWide__n7PcJ>      desktop only (display:none < md)
      <a .styles_button__dr0t2.styles_secondary__fu8iC href="https://write.ellipsus.com/">Log in
      <a .styles_button__dr0t2.styles_primary__pwZzd href="https://account.ellipsus.com/sign-up">Sign up
    <div .styles_actionsNarrow__bX3ln>    mobile only; hamburger
```

## Computed Styles

### Root `<nav>`
- `position: sticky; top: 0; z-index: 200`
- `background: rgb(244, 244, 242)` (— `--color-surface-primary`)
- `color: rgb(40, 40, 37)` (— `--color-content-primary`)
- `height: 74px` (desktop) / 64px (mobile)
- `padding: 0 64px` (desktop) / `0 24px` (mobile — est, verify)
- `display: flex; align-items: center; justify-content: space-between`
- `font-family: Manrope…; font-size: 16px; font-weight: 400`
- **No shadow, no border, no scroll-morph.**

### Logo
- Inline SVG, `viewBox="0 0 344 77"`, `width: 147px; height: 32.9px`
- Single `<path fill="currentColor">` — see `icons.tsx :: EllipsusLogo` for the raw `d`.

### Desktop menu `<ul>`
- `display: flex; gap: 40px; margin: 0 40px`

### Menu trigger `<a>` (Features / Library / About)
- `padding: 16px 0`, `height: 58px`
- `color: rgb(40, 40, 37)`, `font-size: 16px`, `font-weight: 400`
- `display: flex; align-items: center`
- Hrefs: `/features`, `https://help.ellipsus.com/`, `/about` (anchor — click navigates; submenu is hover only)

### Coral highlight SVG inside trigger (`.styles_activeMark__M5ega`)
- `position: absolute; inset: -4px -14px -6px -10px` (top, right, bottom, left)
- `width: 113.2px; height: 36px`
- `color: rgb(235, 91, 85)` (— `--color-brand-coral`)
- `opacity: 0` idle → `1` when `<li>` is hovered or the route is active.
- Path: see `icons.tsx :: NavHighlight`.

### Chevron (`.styles_chevron__e0Ujw`)
- 16×24 viewBox, stroke currentColor, stroke-width 1.5, round caps.
- Container margin: `4px 0 0 8px`.

### Submenu `<div>`
- `position: absolute; top: 58px; right: -510px` (so left edge extends to the left of the trigger)
- `width: 600px; height: 220px`
- `background: rgb(251, 251, 249)` (— `--color-surface-light`)
- `border-radius: 16px` (— `--radius-l`)
- `display: flex`
- Idle: `opacity: 0; transform: perspective(...) rotateX(8deg)` (computed as matrix3d — reproduce as `rotateX(8deg) translateZ(0)` for simplicity)
- Hover (parent `<li>:hover`): `opacity: 1; transform: none`
- Transition: `opacity 0.3s ease, transform 0.3s ease` (not extracted, assumed reasonable)
- Will include a shadow — use `--shadow-l`.

### Submenu sub-item `<li>`
- `width: 220px; height: 56px`
- `font-family: Manrope; font-size: 16px; font-weight: 400`
- `display: flex; align-items: center`
- Underline SVG (`.styles_subItemUnderline__YNp9r`) appears beneath the label on hover — use coral color.

### Submenu preview image
- `width: 300px; height: 220px (219.75)`
- `border-radius: 16px`
- Sanity CDN URLs captured — downloaded by `scripts/download-assets.mjs` to:
  - `/images/nav/features-preview.png` (`ellipsus.com/product-tour` / `/features`)
  - `/images/nav/library-preview.png` (`help.ellipsus.com`)
  - `/images/nav/about-preview.png` (`about`)

### CTA buttons
Shared wrapper `<a class="Button">` with:
- `display: flex; align-items: center; justify-content: center`
- `padding: 12px 16px`
- `border-radius: 12px` (— `--radius-m`)
- `font-family: Manrope; font-size: 16px; font-weight: 500`
- `position: relative`

Secondary ("Log in"):
- `color: rgb(40, 40, 37)`; transparent bg; `border: 1px solid rgb(40, 40, 37)`
- Height: 42px

Primary ("Sign up"):
- `color: rgb(255, 255, 255)`; `background: rgb(12, 13, 13)` (— `--color-surface-inverted`)
- No border.

## Content (verbatim)

Menu entries:
| Label       | Href                           | Sub-items |
|-------------|--------------------------------|-----------|
| Features    | `/features`                    | Features → `/product-tour`  ·  What's new → `/blog/whats-new` |
| Library     | `https://help.ellipsus.com/`   | Blog → `/blog`  ·  Help center → `https://help.ellipsus.com/`  ·  Merch → `https://merch.ellipsus.com/` |
| About       | `/about`                       | Who we are → `/about`  ·  Our stance on AI → `/generative-ai` |

CTAs:
- Log in → `https://write.ellipsus.com/`
- Sign up → `https://account.ellipsus.com/sign-up`

## Responsive
- `< 768px` (md): `<ul class="styles_entriesWide">` is hidden; `<div class="styles_actionsWide">` is hidden; hamburger inside `.styles_actionsNarrow` is shown; nav height drops to 64px; padding becomes `0 24px`.
- `>= 768px`: desktop layout as described.

## Implementation notes
- Pure CSS hover (`:hover > submenu`) — no React state for submenu toggling.
- Submenu stays open while cursor is over it (no gap between trigger padding and submenu top).
- Per-item hover-image swap is **deferred** to a follow-up (the spec captures only the default preview; wiring per-item data-image mapping is a Phase 3 polish task).
- Use `Link` from Next where href is internal (`/features`, `/about`, `/product-tour`, `/blog/...`, `/generative-ai`) and plain `<a>` for external subdomains.
- Bucket the icons (`EllipsusLogo`, `NavHighlight`, `NavChevron`, `NavSubUnderline`) into `icons.tsx`.
