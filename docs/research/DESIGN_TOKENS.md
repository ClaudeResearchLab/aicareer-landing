# ellipsus.com — Design Tokens

Extracted 2026-04-20 from `:root` custom properties. These are the values to seed `src/app/globals.css` (`@theme`) with in Phase 2.

## Surface / Content / Border

| Token                              | Value     |
|------------------------------------|-----------|
| `--color-surface-primary`          | `#f4f4f2` |
| `--color-surface-light`            | `#fbfbf9` |
| `--color-surface-dim`              | `#ecece9` |
| `--color-surface-neutral`          | `#ffffff` |
| `--color-surface-inverted`         | `#0c0d0d` |
| `--color-surface-inverted-2`       | `#1d1e20` |
| `--color-surface-alt`              | `#1d1e20` |
| `--color-surface-success`          | `#e6f2ec` |
| `--color-surface-error`            | `#f6ebea` |
| `--color-surface-active`           | `#e1edfe` |
| `--color-content-primary`          | `#282825` |
| `--color-content-secondary`        | `#64645e` |
| `--color-content-tertiary`         | `#d6d6cf` |
| `--color-content-inverted`         | `#fbfbf9` |
| `--color-content-disabled`         | `#8f8f89` |
| `--color-content-success`          | `#057b40` |
| `--color-content-error`            | `#b81a14` |
| `--color-border-primary`           | `#282825` |
| `--color-border-secondary`         | `#64645e` |
| `--color-border-tertiary`          | `#d6d6cf` |
| `--color-border-disabled`          | `#c5c5ba` |
| `--color-border-success`           | `#057b40` |
| `--color-border-error`             | `#b81a14` |

## Brand

| Token                              | Value     |
|------------------------------------|-----------|
| `--color-brand-coral`              | `#eb5b55` |
| `--color-brand-coral-inverted`     | `#fe6862` |
| `--color-brand-blue`               | `#2173be` |
| `--color-brand-blue-inverted`      | `#2c8ee8` |
| `--color-brand-green`              | `#529a6a` |
| `--color-brand-green-inverted`     | `#56c87c` |
| `--color-brand-orange`             | `#f09236` |
| `--color-brand-orange-inverted`    | `#ffad5c` |
| `--color-brand-purple`             | `#c455eb` |
| `--color-brand-purple-inverted`    | `#dc78ff` |

## Highlights (pastels)

| Token                              | Value     |
|------------------------------------|-----------|
| `--color-highlight-coral-idle`     | `#fdeeed` |
| `--color-highlight-coral-active`   | `#fbc8c5` |
| `--color-highlight-blue-idle`      | `#e1edfe` |
| `--color-highlight-blue-active`    | `#b8d5ff` |
| `--color-highlight-green-idle`     | `#e7f4eb` |
| `--color-highlight-green-active`   | `#b5e3c4` |
| `--color-highlight-orange-idle`    | `#fdeee0` |
| `--color-highlight-orange-active`  | `#faca9e` |
| `--color-highlight-purple-idle`    | `#f6e6fc` |
| `--color-highlight-purple-active`  | `#edc6fb` |
| `--color-highlight-yellow-idle`    | `#ffe81a` |
| `--color-highlight-yellow-active`  | `#f8b76d` |
| `--color-highlight-neutral-idle`   | `#ecece9` |
| `--color-highlight-neutral-active` | `#d6d6cf` |

## Spacing (rem-based, 16 px root)

| Token                        | rem       | px   |
|------------------------------|-----------|------|
| `--spacing-xxs`              | `0.125`   | 2    |
| `--spacing-xs`               | `0.25`    | 4    |
| `--spacing-s`                | `0.5`     | 8    |
| `--spacing-m`                | `0.75`    | 12   |
| `--spacing-l`                | `1`       | 16   |
| `--spacing-xl`               | `1.5`     | 24   |
| `--spacing-xxl`              | `2`       | 32   |
| `--spacing-jumbo`            | `2.5`     | 40   |
| `--spacing-jumbo-m`          | `3.5`     | 56   |
| `--spacing-jumbo-l`          | `4`       | 64   |
| `--spacing-jumbo-xl`         | `5`       | 80   |
| `--spacing-negative-*`       | (mirror)  |      |

## Radii

| Token              | Value   |
|--------------------|---------|
| `--radius-xs`      | `4px`   |
| `--radius-s`       | `8px`   |
| `--radius-m`       | `12px`  |
| `--radius-l`       | `16px`  |
| `--radius-jumbo-xl`| `80px`  |

## Shadows

| Token                 | Value |
|-----------------------|-------|
| `--shadow-xs`         | `0 0 8px rgb(0 0 0/8%)` |
| `--shadow-s`          | `0 0 12px rgb(0 0 0/8%)` |
| `--shadow-m`          | `0 2px 14px rgb(0 0 0/5%), 0 2px 8px rgb(0 0 0/5%)` |
| `--shadow-l`          | `0 0 48px rgb(0 0 0/5%), 0 6px 16px rgb(0 0 0/5%)` |
| `--shadow-xl`         | `0 -7px 64px rgb(0 0 0/5%), 0 8px 32px rgb(0 0 0/6%)` |
| `--shadow-xs-primary` | `2px 2px 8px 0px rgba(236,236,233,0.75)` |
| `--shadow-s-primary`  | `0px 0px 16px 0px rgba(236,236,233,0.75)` |
| `--shadow-m-primary`  | `0px 4px 8px 0px rgba(143,143,137,0.16), 0px 0px 24px 0px rgba(143,143,137,0.16)` |
| `--shadow-l-primary`  | `0px 8px 8px 0px rgba(143,143,137,0.16), 0px 0px 30px 0px rgba(143,143,137,0.16)` |
| `--shadow-xl-primary` | `0px 8px 16px 0px rgba(143,143,137,0.24), 0px 0px 40px 0px rgba(143,143,137,0.24)` |

## Layout

| Token                 | Value    |
|-----------------------|----------|
| `--navigation-height` | `4.625rem` = 74 px |

## Button palette (ported as CSS vars; used inside `.Button` component)

All of the `--button-*` properties (primary/error/surface/border/content variants + disabled + inverted) from the source are preserved verbatim in the full token set captured in `docs/research/tokens-raw.json` — load all of them via `@theme` in `globals.css`.

## Typography

| Role     | Family                        | Weights observed          | Style        |
|----------|-------------------------------|----------------------------|--------------|
| Display  | `Roslindale Display Narrow`   | 300, 400                   | normal, italic |
| Body     | `Manrope`                     | 400, 500, 700              | normal       |
| Numeric accent | `CourierPrime`          | 400, 700 (italic variants present but unloaded) | normal/italic |
| Script   | `Quentin`                     | 400                        | — (not actively rendered; loaded defensively) |
| Legacy   | `slick`                       | 400                        | — (tied to Swiper icons; we can skip) |
| Condensed| `Roslindale Condensed`        | 200–600                    | — (not actively rendered) |

Root `font-size: 16px`. Body font-family chain (fallback):

```
Manrope, "system-ui", "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell,
"Fira Sans", "Droid Sans", "Helvetica Neue", sans-serif
```

## Implementation note

Not every token is used on the home page. Phase 2 will still define the full surface/content/border/brand/spacing/radius/shadow palette in `@theme` so that section builders can reach for any of them. The button tokens can be dropped into a smaller scope (`:root`) since they're only used by the `Button` primitive.
