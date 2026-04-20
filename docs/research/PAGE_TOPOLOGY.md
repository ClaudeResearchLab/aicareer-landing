# Ellipsus — Page Topology

Every distinct section of `https://ellipsus.com/` mapped in visual order, with its interaction model and asset inventory. Populated during Phase 1.

Empty until Phase 1 runs.

## Approximate section inventory (from initial recon — verify during Phase 1)

| # | Working name | Likely type | Interaction model | Assets |
|---|--------------|-------------|-------------------|--------|
| 1 | Navigation header | sticky/static nav bar | static or scroll-triggered | logo, dropdown chevrons |
| 2 | Hero | headline + device mockup | static or fade-in-on-view | multi-device mockup images |
| 3 | Value Prop | "Made for creative writers" | static | headline + body |
| 4 | Collaboration | unified editing workflow | possibly scroll-driven panel | UI screenshots |
| 5 | Differentiator | "A principled alternative" | static | headline block |
| 6 | Social proof | "Trusted by 400,000 writers" | static | counter/logos |
| 7 | CTA | "Get started–write away" | static with button | headline + CTA |
| 8 | Footer | links, socials, legal, address | static with hover states | social icons |

## Interaction-model legend

- **static** — no state change; just renders
- **click-driven** — user clicks to toggle state
- **scroll-driven** — IntersectionObserver or scroll listener changes state
- **hover-driven** — hover changes appearance
- **time-driven** — carousel, typewriter, auto-cycling

## Asset inventory (to be populated)

- [ ] All `<img>` on the page
- [ ] All background images
- [ ] All `<video>` and iframe embeds
- [ ] All inline `<svg>` (deduplicated)
- [ ] All fonts loaded (families, weights, styles)
- [ ] Favicons, apple-touch-icons, OG images
