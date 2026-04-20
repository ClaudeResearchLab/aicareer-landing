# Devices Specification

## Overview
- **Target file:** `src/components/Devices.tsx`
- **Shared asset:** `src/components/LettersScatter.tsx` (reused from Hero)
- **Screenshot:** `docs/design-references/target-desktop-1440.png` (section 2)
- **Interaction model:** `position: sticky` scroll-driven parallax. The section pins to the top of the viewport; as the user scrolls past, four absolutely-positioned device mockups animate from their inline "pre-reveal" transforms into their final resting positions. The clone renders the **pre-reveal** state statically for now; Phase 4 wires the scroll-driven transition.
- **Behavior source:** `docs/research/BEHAVIORS.md` §Devices and `docs/research/PAGE_TOPOLOGY.md` §2.

## DOM Structure (desktop)
```
<section .styles_devices__bM_PM>            position: sticky; top: 0; overflow: hidden
  <span .styles_letters__ZJjUj .styles_letters__l2kwU> absolute inset 0; 1440×780 LettersScatter
  <div .styles_container__NSLBw>            padding 0 80px
    <div .styles_inner__AmD3Z .styles_devicesContainerInner__kvxhx> max-width 1312px
      <div .styles_images__t0FcI>           position: relative; w 1280; h 780.797
        <img .styles_image__yrrXW .styles_desktop__unFH4>  absolute top 0 left 0, 1241.59×775.99, transform: translateY(150px)
        <img .styles_image__yrrXW .styles_tablet__0Yoid>   absolute top 305.9 left 0, 384×584.156, transform: translateX(-50px) translateY(150px) rotate(-20deg)
        <img .styles_image__yrrXW .styles_phone1__31yFl>   absolute top 275.4 left 870.4, 268.8×567.828, transform: translateX(50px) translateY(150px)
        <img .styles_image__yrrXW .styles_phone2__8S654>   absolute top 359.94 left 1049.6, 230.4×467.703, transform: translateX(50px) translateY(150px) rotate(10deg)
</section>
```

## Computed Styles (at 1440×900 viewport, scroll position 0)

### Section
- `position: sticky; top: 0; overflow: hidden`
- `background-color: transparent` (inherits `--color-surface-primary`)
- `color: rgb(40, 40, 37)` → `--color-content-primary`
- `height: 780.797px` (≈781)
- `padding: 0`

### `.styles_container__NSLBw`
- `width: 100%`
- `padding: 0 80px` (desktop) → `px-20`

### `.styles_inner__AmD3Z.styles_devicesContainerInner__kvxhx`
- `margin: 0 auto`
- `max-width: 1312px`

### `.styles_images__t0FcI`
- `position: relative`
- `width: 1280px (full inner width)`
- `height: 780.797px`
- Contains 4 absolutely-positioned `<img>` elements.

### Image: Desktop (`.styles_desktop__unFH4`)
- `position: absolute; top: 0; left: 0`
- `width: 1241.59px; height: 775.99px`
- Inline style (SSR "pre-reveal"): `opacity: 1; transform: translateY(150px)`
- `alt="Ellipsus on Desktop"` — `public/images/devices/desktop.png`

### Image: Tablet (`.styles_tablet__0Yoid`)
- `position: absolute; top: 305.945px; left: 0`
- `width: 384px; height: 584.156px`
- Inline style: `opacity: 1; transform: translateX(-50px) translateY(150px) rotate(-20deg)`
- `alt="Ellipsus on Tablet"` — `public/images/devices/tablet.png`

### Image: Phone 1 — Android (`.styles_phone1__31yFl`)
- `position: absolute; top: 275.43px; left: 870.406px`
- `width: 268.797px; height: 567.828px`
- Inline style: `opacity: 1; transform: translateX(50px) translateY(150px)`
- `alt="Ellipsus on Android"` — `public/images/devices/phone-android.png`

### Image: Phone 2 — iPhone (`.styles_phone2__8S654`)
- `position: absolute; top: 359.938px; left: 1049.6px`
- `width: 230.398px; height: 467.703px`
- Inline style: `opacity: 1; transform: translateX(50px) translateY(150px) rotate(10deg)`
- `alt="Ellipsus on iPhone"` — `public/images/devices/phone-ios.png`

### Letters backdrop
- Absolute full section (`inset: 0`); same `LettersScatter` as Hero but at light opacity on surface-primary.

## Content
- No visible text in this section (no captions, no headings). Purely device mockups + decorative letters. PAGE_TOPOLOGY.md had speculated caption words (`on`, `any`, `device`) but the SSR DOM confirms there are none here — those words live in the Introduction section's rotating sentence.

## Responsive
- `< md (768px)` per topology: section collapses to ~223px — device mockups simplified or layered differently. Deferred to a follow-up; clone renders desktop layout only for now, hidden on mobile via `hidden md:block` wrapper.
- `>= md (768px)`: desktop layout as described.

## Assets
- `public/images/devices/desktop.png` — Ellipsus on Desktop (2340×1462 source)
- `public/images/devices/tablet.png` — Ellipsus on Tablet (694×1056 source)
- `public/images/devices/phone-android.png` — Ellipsus on Android (527×1113 source)
- `public/images/devices/phone-ios.png` — Ellipsus on iPhone (429×871 source)

## Implementation notes
- Uses `next/image` with `fill` or explicit width/height. For faithful positioning the clone uses explicit `width`/`height` props matching the rendered sizes.
- The tablet is rotated -20deg; the iPhone is rotated +10deg. These transforms include the translate offsets that are removed once the section is scrolled past (scroll-timeline or IntersectionObserver-based). For this pass we render the pre-reveal composite.
- `position: sticky` on the section requires the parent `<main>` to NOT have `overflow: hidden` — `layout.tsx` respects this.
