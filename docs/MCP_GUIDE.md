# MCP Guide — chrome-devtools against a live site

This project clones a live site (`https://ellipsus.com/`) — no local static export. This guide covers how to use `chrome-devtools-mcp` for extraction and the gotchas that cost prior sessions.

## Setup

`.mcp.json` pins `chrome-devtools-mcp@0.21.0`. If you opened Claude Code before the file existed, restart Claude Code from this directory so the MCP is picked up. Verify on startup that `chrome-devtools-mcp` is listed as connected.

## Target

Always `https://ellipsus.com/`. Do NOT extract from a staging URL, a mirrored HTML snapshot, or `web.archive.org` — those can drift from production and silently wreck the spec.

## The fonts guard

Every `getComputedStyle()` call reads whatever fonts happen to be loaded at that moment. If the custom fonts are still mid-fetch, you get fallback metrics — `font-family` reads `Helvetica`, `line-height` reads the wrong value, spacing is wrong, every spec is wrong.

**Before any per-element extraction, always:**

```javascript
await document.fonts.ready;
const loaded = [...document.fonts].map(f => `${f.family} ${f.weight} ${f.style}`);
if (loaded.length === 0) throw new Error('No fonts loaded yet');
// Log `loaded` so the session record has evidence the guard passed
```

Do NOT skip this because "the page looked loaded." The Sanity-CDN images finish well before the fonts sometimes do.

## Per-element extraction template

See `.claude/skills/clone-website/SKILL.md` — the per-component extraction script dumps the full subtree with computed styles. Use it as-is. Don't hand-measure individual properties.

## State capture

For stateful components (tabs, scroll-triggered headers, hover states), capture EVERY state:

```javascript
// State A
await page.evaluate_script(extractionScriptForSelector);

// Trigger state change — click a tab, scroll past a threshold, hover
await page.click(tabSelector);
// Wait for any CSS transition to complete (look up transition-duration first)
await new Promise(r => setTimeout(r, 500));

// State B
await page.evaluate_script(extractionScriptForSelector);

// Diff A vs B in the spec — that diff IS the behavior
```

## Sanity CDN images

`ellipsus.com` images come from `cdn.sanity.io/images/...`. Each image has variants accessed by URL parameters (`?w=800&fit=max&auto=format`). The browser picks a variant from `srcset`. When downloading:

1. Enumerate every `<img>` on the page and read `img.currentSrc` (the variant the browser chose) rather than `img.src` (the default).
2. Also check `img.srcset` — the builder may want a 2x variant for retina.
3. Save the file under a semantic path in `public/images/` (e.g., `public/images/hero/mockup-desktop.webp`).
4. Include the original asset ID in a manifest (`scripts/images.manifest.json`) so Phase 5 re-verification can reproduce the download.

## Viewport sweeps

Always test at THREE widths:
- 1440 (desktop canonical)
- 768 (tablet — many sites switch layout here)
- 390 (mobile canonical — iPhone SE width)

At each width, screenshot + note what changed. Don't assume mobile is a linear shrink of desktop; the layout almost certainly re-flows.

## What NOT to do

- Don't Read the full HTML of the page into Claude context. Use `evaluate_script` with a precise selector.
- Don't assume the site's JS is portable — read behavior via MCP, reimplement in React.
- Don't extract before the fonts guard passes.
- Don't skip the click sweep — you will miss hidden tab/accordion content.
- Don't skip the scroll sweep — you will miss IntersectionObserver-driven effects.

## If the MCP feels wrong

- `evaluate_script` returns `undefined` → missing `return` statement inside the IIFE, or selector doesn't match
- `take_screenshot` returns a tiny image → you forgot to set the viewport size first via `resize_page`
- CSS values look like `rgba(0, 0, 0, 0)` or `auto` → fonts aren't loaded yet, or the element isn't visible
- Computed `font-family` reads `Helvetica` but the site uses a custom font → fonts guard failed, re-await `document.fonts.ready`
