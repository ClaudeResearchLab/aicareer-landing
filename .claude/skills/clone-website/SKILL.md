---
name: clone-website
description: Reverse-engineer and rebuild the Ellipsus landing page section-by-section, writing spec files and dispatching builder agents. Use whenever the user wants to continue or restart the ellipsus.com port. This skill takes no arguments — the target is hardcoded to https://ellipsus.com/.
user-invocable: true
---

# Clone Website (Ellipsus port edition)

You are about to continue the reverse-engineering and rebuild of **ellipsus.com** as an almost-pixel-perfect clone (≤1% pixel diff).

**Before touching anything, read `docs/PLAN.md` in full.** It contains the scope decisions (form policy, font policy, video policy, analytics policy, etc.) that every phase must honor. This file only describes *how* to clone; PLAN.md says *what* to clone.

You are a **foreman walking the job site** — as you inspect each section, you write a detailed specification to a file, then hand that file to a specialist builder agent with everything they need. Extraction and construction happen in parallel; extraction is meticulous and produces auditable artifacts.

## Scope Defaults

Target: `https://ellipsus.com/` (live site). Do not accept a different URL unless the user explicitly overrides for a specific reason. The authoritative list of policy decisions lives in `docs/PLAN.md` § "Scope decisions". Honor it literally. If PLAN.md and this file disagree, **PLAN.md wins**.

- **Fidelity level:** Almost pixel-perfect — target ≤1% pixel diff at 1440 and 390
- **In scope:** Visual layout, component structure, scroll/hover/click interactions, responsive design, real English content, extracted assets
- **Out of scope:** Real backend, real form submission, analytics, accessibility audit
- **Customization:** None during emulation — redesign pass happens later (likely in the sister `AICareer_v2/` monorepo)

## Pre-Flight

Run every check below IN ORDER. If any fails, stop and surface it to the user.

1. **Browser MCP connected.** This project uses `chrome-devtools-mcp` pinned in `.mcp.json`. Verify the MCP is loaded in this Claude Code session. If it is not, tell the user to restart Claude Code from the repo root (so `.mcp.json` is picked up) — do NOT fall back to static HTML parsing for computed styles.
2. **Internet is reachable.** The target is the live `https://ellipsus.com/`. Without network, nothing works. Test with the MCP by navigating to the URL and confirming a non-empty DOM.
3. **The base project builds.** Run `npm run build`. If it fails, fix the scaffold before extracting anything — a broken build means you won't know mid-clone whether you introduced a regression or inherited one.
4. **Output directories exist.** Create if missing: `docs/research/`, `docs/research/components/`, `docs/design-references/`, `scripts/`.
5. **Resume from PROGRESS.md.** Read `docs/research/PROGRESS.md`. If it has entries, it is the authoritative log of which sections are specced / built / merged. Continue from where the previous session stopped; do NOT re-extract already-specced sections. If it is empty, start Phase 1.
6. **Fonts loaded.** After navigating to the target URL, run this extraction guard and abort if it fails:
   ```javascript
   // Must be run via browser MCP before any getComputedStyle call
   await document.fonts.ready;
   const loaded = [...document.fonts].map(f => f.family);
   // Log all families — you don't yet know which ones are custom,
   // so the first sweep just enumerates and you verify they're non-empty
   if (loaded.length === 0) throw new Error('No fonts loaded — extraction would return fallback metrics');
   ```
   Every computed-style call downstream depends on this guard. If it ever fails, stop and diagnose — do not continue extracting with fallback font metrics.

## Forbidden actions

These shortcuts look tempting and will waste hours. Don't take them.

- **Never download the full HTML and Read it in the AI context** — it blasts the context window. Use browser MCP `evaluate_script` with a precise selector instead.
- **Never import a third-party site's production JavaScript into the Next app.** Read the *behavior* via MCP and reimplement it in React.
- **Never bypass `document.fonts.ready`.** No "quick" computed-style reads before the fonts guard passes.
- **Never install a new package without pinning it and verifying its release date is ≥3 days old.** `.npmrc` has `min-release-age=3` but do not rely on it — pin in `package.json` too.
- **Never load analytics, widgets, or tag managers into the clone.** See PLAN.md §4.5.

## Guiding Principles

These are the truths that separate a successful clone from a "close enough" mess.

### 1. Completeness Beats Speed

Every builder agent must receive **everything** it needs to do its job perfectly: screenshot, exact CSS values, downloaded assets with local paths, real text content, component structure. If a builder has to guess anything — a color, a font size, a padding value — you have failed at extraction. Take the extra minute to extract one more property rather than shipping an incomplete brief.

### 2. Small Tasks, Perfect Results

When an agent gets "build the entire features section," it glosses over details — it approximates spacing, guesses font sizes, and produces something "close enough" but clearly wrong. When it gets a single focused component with exact CSS values, it nails it every time.

Look at each section and judge its complexity. A simple banner with a heading and a button? One agent. A complex section with 3 different card variants, each with unique hover states and internal layouts? One agent per card variant plus one for the section wrapper. When in doubt, make it smaller.

**Complexity budget rule:** If a builder prompt exceeds ~150 lines of spec content, the section is too complex for one agent. Break it into smaller pieces.

### 3. Real Content, Real Assets

Extract the actual text, images, videos, and SVGs from the live site. This is a clone, not a mockup. Use `element.textContent`, download every `<img>` and `<video>`, extract inline `<svg>` elements as React components. The only time you generate content is when something is clearly server-generated and unique per session.

**Layered assets matter.** A section that looks like one image is often multiple layers — a background gradient, a foreground UI mockup PNG, an overlay icon. Inspect each container's full DOM tree and enumerate ALL `<img>` elements and background images within it, including absolutely-positioned overlays.

**Sanity CDN notes:** ellipsus.com uses Sanity for images. URLs look like `https://cdn.sanity.io/images/<projectId>/<dataset>/<assetId>-<dims>.<fmt>?auto=format&fit=max&w=...`. These URLs carry their own variants — download the highest-resolution variant that actually appears in the DOM (check `srcset`), not the raw asset, to stay faithful to what users see.

### 4. Foundation First

Nothing can be built until the foundation exists: global CSS with the target site's design tokens (colors, fonts, spacing), TypeScript types for the content structures, and global assets (fonts, favicons). This is sequential and non-negotiable. Everything after this can be parallel.

### 5. Extract How It Looks AND How It Behaves

A website is not a screenshot — it's a living thing. Elements move, change, appear, and disappear in response to scrolling, hovering, clicking, resizing, and time. If you only extract the static CSS of each element, your clone will look right in a screenshot but feel dead when someone actually uses it.

For every element, extract its **appearance** (exact computed CSS via `getComputedStyle()`) AND its **behavior** (what changes, what triggers the change, and how the transition happens). Not "it looks like 16px" — extract the actual computed value. Not "the nav changes on scroll" — document the exact trigger (scroll position, IntersectionObserver threshold, viewport intersection), the before and after states (both sets of CSS values), and the transition (duration, easing, CSS transition vs. JS-driven vs. CSS `animation-timeline`).

Examples of behaviors to watch for:
- A navbar that shrinks, changes background, or gains a shadow after scrolling past a threshold
- Elements that animate into view when they enter the viewport (fade-up, slide-in, stagger delays)
- Sections that snap into place on scroll (`scroll-snap-type`)
- Parallax layers that move at different rates than the scroll
- Hover states that animate (not just change — the transition duration and easing matter)
- Dropdowns, modals, accordions with enter/exit animations
- **Tabbed/pill content that cycles** — buttons that switch visible card sets with transitions
- **Scroll-driven tab/accordion switching** — sidebars where the active item auto-changes as content scrolls past
- **Smooth scroll libraries** (Lenis, Locomotive Scroll) — check for `.lenis` class or scroll container wrappers

### 6. Identify the Interaction Model Before Building

This is the single most expensive mistake in cloning: building a click-based UI when the original is scroll-driven, or vice versa. Before writing any builder prompt for an interactive section, you must definitively answer: **Is this section driven by clicks, scrolls, hovers, time, or some combination?**

How to determine this:
1. **Don't click first.** Scroll through the section slowly and observe if things change on their own as you scroll.
2. If they do, it's scroll-driven. Extract the mechanism: `IntersectionObserver`, `scroll-snap`, `position: sticky`, `animation-timeline`, or JS scroll listeners.
3. If nothing changes on scroll, THEN click/hover to test for click/hover-driven interactivity.
4. Document the interaction model explicitly in the component spec: "INTERACTION MODEL: scroll-driven with IntersectionObserver" or "INTERACTION MODEL: click-to-switch with opacity transition."

### 7. Extract Every State, Not Just the Default

Many components have multiple visual states — a tab bar shows different cards per tab, a header looks different at scroll position 0 vs 100, a card has hover effects. You must extract ALL states, not just whatever is visible on page load.

For tabbed/stateful content:
- Click each tab/button via browser MCP
- Extract the content, images, and card data for EACH state
- Record which content belongs to which state
- Note the transition animation between states (opacity, slide, fade, etc.)

For scroll-dependent elements:
- Capture computed styles at scroll position 0 (initial state)
- Scroll past the trigger threshold and capture computed styles again (scrolled state)
- Diff the two to identify exactly which CSS properties change
- Record the transition CSS (duration, easing, properties)

### 8. Spec Files Are the Source of Truth

Every component gets a specification file in `docs/research/components/` BEFORE any builder is dispatched. This file is the contract between your extraction work and the builder agent.

### 9. Build Must Always Compile

Every builder agent must verify `npx tsc --noEmit` passes before finishing. After merging worktrees, you verify `npm run build` passes. A broken build is never acceptable, even temporarily.

## Phase 1: Reconnaissance

Navigate to `https://ellipsus.com/` with browser MCP.

### Screenshots
- Take **full-page screenshots** at desktop (1440px) and mobile (390px) viewports
- Save to `docs/design-references/` with descriptive names
- These are your master reference — builders will receive section-specific crops/screenshots later

### Global Extraction
Extract these from the page before doing anything else:

**Fonts** — Inspect `<link>` tags for Google Fonts or self-hosted fonts. Check `document.fonts` and computed `font-family` on key elements (headings, body, labels). Document every family, weight, and style actually used. Configure them in `src/app/layout.tsx` using `next/font/google` or `next/font/local`.

**Colors** — Extract the site's color palette from computed styles across the page. Update `src/app/globals.css` with the target's actual colors as CSS variables in `@theme`.

**Favicons & Meta** — Download favicons, apple-touch-icons, OG images, webmanifest to `public/seo/`. Update `layout.tsx` metadata verbatim from the live `<head>`.

**Global UI patterns** — Identify any site-wide CSS or JS: custom scrollbar hiding, scroll-snap on the page container, global keyframe animations, backdrop filters, gradients used as overlays, **smooth scroll libraries** (Lenis, Locomotive Scroll). Add these to `globals.css` and note any libraries that need to be installed.

### Mandatory Interaction Sweep

This is a dedicated pass AFTER screenshots and BEFORE anything else.

**Scroll sweep:** Scroll the page slowly from top to bottom via browser MCP. At each section, pause and observe:
- Does the header change appearance? Record the scroll position where it triggers.
- Do elements animate into view? Record which ones and the animation type.
- Does a sidebar or tab indicator auto-switch as you scroll?
- Are there scroll-snap points?
- Is there a smooth scroll library active?

**Click sweep:** Click every element that looks interactive:
- Every button, tab, pill, link, card
- For tabs/pills: click EACH ONE and record the content per state

**Hover sweep:** Hover over every element that might have hover states.

**Responsive sweep:** Test at 3 viewport widths via browser MCP:
- Desktop: 1440px
- Tablet: 768px
- Mobile: 390px

Save all findings to `docs/research/BEHAVIORS.md`.

### Page Topology
Map out every distinct section of the page from top to bottom. Give each a working name. Document:
- Their visual order
- Which are fixed/sticky overlays vs. flow content
- The overall page layout (scroll container, column structure, z-index layers)
- Dependencies between sections (e.g., a floating nav that overlays everything)
- **The interaction model** of each section (static, click-driven, scroll-driven, time-driven)

Save this as `docs/research/PAGE_TOPOLOGY.md`.

## Phase 2: Foundation Build

Sequential, not delegated:

1. **Update fonts** in `layout.tsx` to match the target's actual fonts
2. **Update globals.css** with the target's color tokens, spacing values, keyframe animations, utility classes
3. **Create TypeScript interfaces** in `src/types/` for the content structures you've observed
4. **Extract SVG icons** — find all inline `<svg>` elements on the page, deduplicate them, save as named React components in `src/components/icons.tsx`
5. **Download global assets** — write and run a Node.js script (`scripts/download-assets.mjs`) that downloads all images, videos, fonts, favicons from the live site to `public/`. Preserve meaningful directory structure. For Sanity-CDN images, prefer the highest resolution variant that appears in the DOM (`srcset`).
6. Verify: `npm run build` passes

### Asset Discovery Script Pattern

Use browser MCP to enumerate all assets on the page:

```javascript
// Run this via browser MCP to discover all assets
JSON.stringify({
  images: [...document.querySelectorAll('img')].map(img => ({
    src: img.src || img.currentSrc,
    srcset: img.srcset,
    alt: img.alt,
    width: img.naturalWidth,
    height: img.naturalHeight,
    parentClasses: img.parentElement?.className,
    position: getComputedStyle(img).position,
    zIndex: getComputedStyle(img).zIndex
  })),
  videos: [...document.querySelectorAll('video')].map(v => ({
    src: v.src || v.querySelector('source')?.src,
    poster: v.poster,
    autoplay: v.autoplay,
    loop: v.loop,
    muted: v.muted
  })),
  backgroundImages: [...document.querySelectorAll('*')].filter(el => {
    const bg = getComputedStyle(el).backgroundImage;
    return bg && bg !== 'none';
  }).map(el => ({
    url: getComputedStyle(el).backgroundImage,
    element: el.tagName + '.' + el.className?.split(' ')[0]
  })),
  svgCount: document.querySelectorAll('svg').length,
  fonts: [...new Set([...document.querySelectorAll('*')].slice(0, 200).map(el => getComputedStyle(el).fontFamily))],
  favicons: [...document.querySelectorAll('link[rel*="icon"]')].map(l => ({ href: l.href, sizes: l.sizes?.toString() }))
});
```

Then write a download script that fetches everything to `public/`. Use batched parallel downloads (4 at a time) with proper error handling.

## Phase 3: Component Specification & Dispatch

For each section in your page topology (top to bottom): **extract**, **write the spec file**, then **dispatch builders**.

### Step 1: Extract

1. **Screenshot** the section in isolation → `docs/design-references/`
2. **Extract CSS** for every element using the per-component extraction script:

```javascript
(function(selector) {
  const el = document.querySelector(selector);
  if (!el) return JSON.stringify({ error: 'Element not found: ' + selector });
  const props = [
    'fontSize','fontWeight','fontFamily','lineHeight','letterSpacing','color',
    'textTransform','textDecoration','backgroundColor','background',
    'padding','paddingTop','paddingRight','paddingBottom','paddingLeft',
    'margin','marginTop','marginRight','marginBottom','marginLeft',
    'width','height','maxWidth','minWidth','maxHeight','minHeight',
    'display','flexDirection','justifyContent','alignItems','gap',
    'gridTemplateColumns','gridTemplateRows',
    'borderRadius','border','borderTop','borderBottom','borderLeft','borderRight',
    'boxShadow','overflow','overflowX','overflowY',
    'position','top','right','bottom','left','zIndex',
    'opacity','transform','transition','cursor',
    'objectFit','objectPosition','mixBlendMode','filter','backdropFilter',
    'whiteSpace','textOverflow','WebkitLineClamp'
  ];
  function extractStyles(element) {
    const cs = getComputedStyle(element);
    const styles = {};
    props.forEach(p => { const v = cs[p]; if (v && v !== 'none' && v !== 'normal' && v !== 'auto' && v !== '0px' && v !== 'rgba(0, 0, 0, 0)') styles[p] = v; });
    return styles;
  }
  function walk(element, depth) {
    if (depth > 4) return null;
    const children = [...element.children];
    return {
      tag: element.tagName.toLowerCase(),
      classes: element.className?.toString().split(' ').slice(0, 5).join(' '),
      text: element.childNodes.length === 1 && element.childNodes[0].nodeType === 3 ? element.textContent.trim().slice(0, 200) : null,
      styles: extractStyles(element),
      images: element.tagName === 'IMG' ? { src: element.src, alt: element.alt, naturalWidth: element.naturalWidth, naturalHeight: element.naturalHeight } : null,
      childCount: children.length,
      children: children.slice(0, 20).map(c => walk(c, depth + 1)).filter(Boolean)
    };
  }
  return JSON.stringify(walk(el, 0), null, 2);
})('SELECTOR');
```

3. **Extract multi-state styles** — for any element with multiple states (scroll-triggered, hover, active tab), capture BOTH states.
4. **Extract real content** — all text, alt attributes, aria labels, placeholder text. For tabbed/stateful content, **click each tab and extract content per state**.
5. **Identify assets** this section uses.
6. **Assess complexity** — how many distinct sub-components does this section contain?

### Step 2: Write the Component Spec File

For each section, create a spec file in `docs/research/components/<component-name>.spec.md`. This is NOT optional.

**Template:**

```markdown
# <ComponentName> Specification

## Overview
- **Target file:** `src/components/<ComponentName>.tsx`
- **Screenshot:** `docs/design-references/<screenshot-name>.png`
- **Interaction model:** <static | click-driven | scroll-driven | time-driven>

## DOM Structure
<Describe the element hierarchy — what contains what>

## Computed Styles (exact values from getComputedStyle)

### Container
- display: ...
- padding: ...
- (every relevant property with exact values)

### <Child element 1..N>
- (every relevant property)

## States & Behaviors

### <Behavior name>
- **Trigger:** <exact mechanism>
- **State A (before):** ...
- **State B (after):** ...
- **Transition:** transition: all 0.3s ease
- **Implementation approach:** ...

## Per-State Content (if applicable)

## Assets
- Background image: `public/images/<file>.webp`
- Icons used: <ArrowIcon>, <SearchIcon> from icons.tsx

## Text Content (verbatim)
<All text content, copy-pasted from the live site>

## Responsive Behavior
- **Desktop (1440px):** ...
- **Tablet (768px):** ...
- **Mobile (390px):** ...
- **Breakpoint:** layout switches at ~<N>px
```

Fill every section. If a section doesn't apply, write "N/A".

### Step 3: Dispatch Builders

**Simple section** (1-2 sub-components): One builder agent gets the entire section.

**Complex section** (3+ distinct sub-components): Break it up. One agent per sub-component, plus one agent for the section wrapper.

**What every builder agent receives:**
- The full contents of its component spec file inline in the prompt
- Path to the section screenshot
- Which shared components to import (`icons.tsx`, `cn()`)
- The target file path
- Instruction to verify with `npx tsc --noEmit` before finishing

### Step 4: Merge

- Merge worktree branches back to `main`
- After each merge, verify `npm run build` passes
- Fix any type errors immediately

## Phase 4: Page Assembly

Wire everything together in `src/app/page.tsx`:
- Import all section components
- Implement page-level layout from topology doc
- Connect real content to component props
- Implement page-level behaviors (scroll snap, scroll-driven animations, smooth scroll)
- Verify: `npm run build` passes clean

## Phase 5: Visual QA Diff

1. Open the live site and your clone side-by-side
2. Compare section by section, top to bottom, at desktop (1440px)
3. Compare again at mobile (390px)
4. Fix discrepancies by updating spec → component
5. Test all interactive behaviors

## Pre-Dispatch Checklist

- [ ] Spec file written with ALL sections filled
- [ ] Every CSS value is from `getComputedStyle()`, not estimated
- [ ] Interaction model is identified and documented
- [ ] For stateful components: every state's content and styles are captured
- [ ] For scroll-driven components: trigger threshold, before/after styles, and transition are recorded
- [ ] All images in the section are identified (including overlays)
- [ ] Responsive behavior is documented for at least desktop and mobile
- [ ] Text content is verbatim
- [ ] The builder prompt is under ~150 lines

## What NOT to Do

- **Don't build click-based tabs when the original is scroll-driven (or vice versa).** Determine the interaction model FIRST by scrolling before clicking.
- **Don't extract only the default state.**
- **Don't miss overlay/layered images.**
- **Don't build mockup components for content that's actually videos/animations.**
- **Don't approximate CSS classes.**
- **Don't build everything in one monolithic commit.**
- **Don't reference docs from builder prompts.** Each builder gets the CSS spec inline.
- **Don't skip asset extraction.**
- **Don't give a builder agent too much scope.**
- **Don't bundle unrelated sections into one agent.**
- **Don't skip responsive extraction.**
- **Don't forget smooth scroll libraries.**
- **Don't dispatch builders without a spec file.**

## Completion

When done, report:
- Total sections built
- Total components created
- Total spec files written (should match components)
- Total assets downloaded (images, videos, SVGs, fonts)
- Build status (`npm run build` result)
- Visual QA results (any remaining discrepancies)
- Any known gaps or limitations
