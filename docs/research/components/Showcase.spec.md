# Showcase Specification

## Overview
- **Target file:** `src/components/Showcase.tsx`
- **Screenshot:** `docs/design-references/target-desktop-1440.png` (section 4, y≈3244)
- **Interaction model:** Click-driven carousel (prev/next) with 3 video slides. Each slide's `<video>` autoplays muted+looped when active.

## DOM / Layout (desktop 1440)
- `<section>` bg `#1d1e20` (`--color-surface-inverted-2`), relative, h ≈1128
- Top-edge decorative wave svg (fill `#1d1e20`, bridging Introduction `#F4F4F2` → dark section)
- `.showcaseContent` wraps 3 containers:
  1. Collaborators row — width 1280 centered, margin-top 90, flex row, 48h. Avatars (overlapping) + decorative arrow SVG + caption "That's us, collaborating!" (20px 400 `#FBFBF9`)
  2. Title wrapper — relative. Cup SVG absolute (`left:-320 top:29.5 w:320 h:310`). H2 80/96 Roslindale 300 `#FBFBF9` centered, 700 wide, mb 36. Intro p 18/25.2 Manrope 400, 700 wide, centered, my 18. Lamp SVG absolute (`right:-320 top:-10 w:320 h:361`).
  3. Slider wrapper — 1054 wide, centered with `margin 0 193px`, padding `0 80 72`. Track shifts left by 845px per slide (slide width 809.45 + margin 36). Each slide 809.45×376.3 radius 20, contains a `<video>` (autoplay muted loop playsinline, with mp4 + webm sources, poster PNG). Desktop: 2 wide arrow buttons (84×84) absolute positioned flanking slider. Below slider: captions row (absolute stacked, 894w, only active at opacity 1, 0.3s fade).

## Content
- Collaborators: "That's us, collaborating!" + avatars for Mary Shelley, P, Lord Byron.
- H2: "One place for drafts, edits, and discussions"
- Intro: "Your bespoke Docs-to-Discord-to-DM-to-Docs-to-??? process isn't polishing that prose any faster. (And to be honest, it sounds pretty stressful.) Streamline the way you write, edit, and manage feedback with Ellipsus."
- Slides + captions:
  1. "Stay in control with connected drafts" — showcase-1-connected-drafts.{webm,mp4}, poster-1
  2. "Keep feedback focused with comments + drafts" — showcase-2-comments-drafts.{webm,mp4}, poster-2
  3. "Write, draft, merge, repeat" — showcase-3-merge.{webm,mp4}, poster-3

## Assets
- `public/videos/showcase-{1,2,3}-*.{webm,mp4}`
- `public/images/showcase/poster-{1,2,3}-*.png`
- `public/images/avatars/{mary-shelley,p,lord-byron}.png`
- `public/images/showcase/decor/{cup,lamp,wave-top,slide-arrow,collab-arrow}.svg`

## Behavior
- Slides appear on scroll via `.reveal` utility.
- Carousel: state `activeIndex ∈ {0,1,2}`. Prev button disabled at 0; Next disabled at 2. Transform: `translateX(calc(var(--slide-step) * -1 * activeIndex))` with `transition: transform 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)`. Slide width 809.45, step 845 on desktop (slide + 36 gap).
- Active `<video>` plays; non-active pause.
- Caption opacity 1 for active, 0 otherwise; tight 0.3s fade.
