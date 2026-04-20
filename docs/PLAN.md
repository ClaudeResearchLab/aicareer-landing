# AICareer v2 Landing — Port Plan

Almost-pixel-perfect port of **https://ellipsus.com/** (live site) into a modern Next.js 16 codebase. This document is the authoritative source for scope, strategy, and success criteria.

> **Read this before opening any other file.**

---

## 1. Goals & Non-Goals

**Goals**
- Visual parity with the live site: ≤1% pixel diff at desktop 1440 and mobile 390
- All images, fonts, videos, and SVG icons used by the live site ported into `public/`
- All scroll/hover/click behaviors documented in `docs/research/BEHAVIORS.md` reproduced
- Clean Next.js 16 codebase with minimal dependencies (safety > stack)
- Repository is ready to hand off to a redesigner (likely merging into the sister `AICareer_v2/` monorepo) who will mutate the design in place

**Non-goals (explicitly out of scope)**
- Real form submission, real backend, authentication, session state
- Analytics, pixels, tracking (strip all third-party scripts — see §6)
- SEO optimization beyond copying the existing meta tags (update OG URL to a placeholder; redesigner finalises)
- Accessibility audit (a11y improvements are a redesign-pass concern)
- Building for Docker / standalone deploy

---

## 2. Source Overview

Target: `https://ellipsus.com/` — live production site. There is no local export.

Known surface from initial recon (to be expanded in Phase 1):
- Product: Ellipsus — collaborative writing software for creative writers
- Approximate section count: ~8 (navigation header, hero, value prop, collaboration feature, differentiator, social proof, CTA, footer)
- CMS: **Sanity** — images and some content served from `cdn.sanity.io`
- Rendering: server-rendered (not a pure SPA)
- Known absence: no obvious heavy animations, no visible autoplay video (confirm during Phase 1)
- Language: English

### Known remote dependencies that will surface during extraction
These are expected — Phase 1 confirms, Phase 2 downloads locally:
- Fonts (inspected via computed-style / `document.fonts`)
- Images + responsive image variants from Sanity CDN
- Favicons, apple-touch-icons, OG images
- Possibly a webmanifest, sitemap, robots.txt (reference only — we don't mirror those)

### Expected stripped at port time
- Any analytics / tag manager scripts
- Any third-party chat / email-capture widgets
- Any telemetry pixels

The redesign pass can re-add whichever of these are business-critical via `next/third-parties`.

---

## 3. Sources of Truth

### Live URL (canonical)
`https://ellipsus.com/` — the ONLY source. Every extraction session re-verifies current production state.

### Local cache (not authoritative)
If we ever snapshot the HTML for offline inspection, we write it to `docs/research/snapshots/<date>.html` and date-stamp it. The snapshot is for archaeology, not extraction.

### Design references (Phase 1 artifacts)
`docs/design-references/*.png` — full-page screenshots captured during Phase 1 at 1440 and 390. These are the pixel-diff ground truth for Phase 5.

---

## 4. Scope Decisions

These are the non-negotiable choices that every phase honors. Changing one of these is a plan-level event, not an implementation detail.

### 4.1 Layout strategy — semantic responsive ✅
Ellipsus is a standard responsive React-style landing, not a Tilda absolute-positioned artboard. Port every section with Flex / Grid / Tailwind utilities. Inline `style={}` is reserved for computed values that genuinely can't be expressed as utility classes (rare on this site).

No `useArtboardScale`, no `zoom` hack. This is a big simplification vs the Noukash port.

### 4.2 Fonts — self-host ✅
In Phase 1, read `document.fonts` to enumerate exactly which families / weights / styles are used. If the site uses Google Fonts, port via `next/font/google` with the exact subsets that appear on the page. If it ships custom woff/woff2, download them to `public/fonts/` in Phase 2 and load via `next/font/local`.

Licensing note: if Ellipsus ships font files publicly, self-hosting for this clone inherits the same license posture. If a font is behind an auth wall, stop and flag it — do not work around the license.

### 4.3 Forms — inert UI stubs ✅
**Do not** load any third-party form/widget scripts. CTAs that would submit or open a third-party form render as visual stubs (same position, same styling, same label) that either stay inert or open a plain `<dialog>` with a "form coming soon" message. Document the original endpoint/widget ID in a comment near the stub so the redesigner can wire it.

### 4.4 Videos — self-host if any ✅
If Phase 1 finds autoplay / looping `<video>` tags, download the sources into `public/videos/` via a Phase 2 Node script (`scripts/download-videos.mjs`). Embedded iframes (YouTube, Vimeo) — keep as iframes pointing at the original URL; they behave correctly out of the box. All `<video>` tags inherit the original attributes: `preload`, `playsinline`, `autoplay`, `loop`, `muted`.

### 4.5 Analytics / tracking — strip ✅
Remove any GTM, GA, Segment, Amplitude, Hotjar, Intercom, HubSpot, etc. entirely. Do not render the container, do not add `dataLayer`, do not add ENV var placeholders. A redesigner who needs analytics can add it themselves.

### 4.6 Preloader / grain / global overlays — only if the original has one
Only port these if Phase 1 actually finds them on Ellipsus. Don't invent. The Noukash port had a Tilda-specific preloader + grain overlay; Ellipsus almost certainly does not.

### 4.7 SEO & meta — verbatim copy ✅
`src/app/layout.tsx` `metadata` object holds:
- `title`, `description` — copied verbatim from the live `<head>`
- `openGraph.url`, `title`, `description`, `type`, `images`
- `twitter.card`, `title`, `description`, `images`, and `site` if present
- `alternates.canonical` — initially the ellipsus.com URL; redesigner updates to the new domain
- `icons.icon` pointing at `public/seo/favicon.*` (downloaded in Phase 2)

The redesigner will rewrite these when the domain changes.

### 4.8 Branch strategy ✅
Everything lives on `main` for now. A feature branch will be cut for the redesign pass. Do not push to origin unless the user explicitly asks.

### 4.9 Checkpoint & resume ✅
- `docs/research/PROGRESS.md` is the authoritative log of what's specced, built, and merged. Update it at every section boundary.
- When context usage exceeds ~70%, stop cleanly: finish the current spec/builder, write the state to PROGRESS.md, and surface "context budget exceeded, resume with /clone-website" to the user.
- On resume, the SKILL reads PROGRESS.md and picks up where the previous session stopped.
- **Do not re-extract already-specced sections** unless the previous spec is flagged "revisit" in PROGRESS.md.

### 4.10 Section grouping for parallel builders
Ellipsus looks like ~8 sections at desktop. Final grouping is set at the end of Phase 1 in `docs/research/PAGE_TOPOLOGY.md`. Worktree rule: spin up a git worktree only when a section's spec exceeds ~100 lines or contains ≥5 distinct sub-components. Otherwise build sequentially on `main`.

---

## 5. Tools

### Claude Code
Orchestrator for the entire pipeline. Uses `/clone-website` from `.claude/skills/clone-website/SKILL.md`.

### `chrome-devtools-mcp@0.21.0`
Configured in `.mcp.json`, pinned to `0.21.0`. Picked up on Claude Code startup — if you opened Claude Code before `.mcp.json` existed, restart it.

### `/clone-website` skill
Located at `.claude/skills/clone-website/SKILL.md`. Its target is hardcoded to `https://ellipsus.com/` with the live-site extraction workflow. Adapts the Noukash skill for a modern live site (no Tilda, no local export, no Zero Blocks).

### Next.js scaffold (minimal)
Dependencies exactly matching the Noukash port baseline — every version has been in the wild long enough to clear the 72-hour quarantine:
```
next@16.2.2
react@19.2.4
react-dom@19.2.4
clsx@2.1.1
```
Dev:
```
typescript@5.9.3
@types/node@24.12.2
@types/react@19.2.14
@types/react-dom@19.2.3
eslint@9.39.4
eslint-config-next@16.2.2
tailwindcss@4.2.2
@tailwindcss/postcss@4.2.2
```

**Deliberately NOT installed:** `lucide-react`, `@base-ui/react`, `shadcn`, `class-variance-authority`, `tailwind-merge`, `tw-animate-css`, Framer Motion. If Phase 1 proves the site uses motion that can't be reproduced in CSS, we re-evaluate Framer Motion or GSAP individually — pinned, verified, never as a default.

---

## 6. How to Start a Clone Session

```bash
# 1. Open the project
cd /Users/temp/Desktop/Antigravity/AICareer_v2_Landing
git status                    # expect main, clean

# 2. Check Node version
node -v                       # expect v24.x — .nvmrc pins 24
nvm use                       # if you have nvm

# 3. Install deps (first time only)
#    .npmrc has min-release-age=3 so the global security hook passes
npm install

# 4. Sanity check the target + MCP
curl -sI https://ellipsus.com/ | head -1
# expect: HTTP/2 200

# 5. Open Claude Code in the repo directory
cd /Users/temp/Desktop/Antigravity/AICareer_v2_Landing
claude
# on startup, check that chrome-devtools-mcp is listed as connected

# 6. Inside Claude Code:
/clone-website
```

---

## 7. Pipeline (Five Phases)

Full procedure lives in `.claude/skills/clone-website/SKILL.md`. This is the executive summary.

### Phase 1 — Reconnaissance (via chrome-devtools-mcp)
1. Navigate to `https://ellipsus.com/`
2. **`await document.fonts.ready` + verify every custom font is loaded** (pre-flight guard)
3. Full-page screenshots at 1440 and 390 → `docs/design-references/`
4. Extract global design tokens (colors, fonts, radii, shadows, spacing scale) → scratchpad
5. **Interaction sweep**: scroll / click / hover / responsive at each section → `docs/research/BEHAVIORS.md`
6. Map every distinct section in order → `docs/research/PAGE_TOPOLOGY.md`, grouping into logical React components

### Phase 2 — Foundation (sequential, orchestrator)
1. Download custom fonts (if any) to `public/fonts/` via `scripts/download-fonts.mjs`
2. Download any video assets to `public/videos/` via `scripts/download-videos.mjs`
3. Crawl and download images (including Sanity CDN variants) to `public/images/` via `scripts/download-images.mjs`
4. Download favicons and OG images to `public/seo/`
5. Wire `next/font/google` and/or `next/font/local` in `src/app/layout.tsx`
6. Replace placeholder SEO metadata in `src/app/layout.tsx` with verbatim Ellipsus meta (§4.7)
7. Set `<html lang="en">` (confirm from `<html>` in Phase 1)
8. Extract all inline SVG icons from the source → `src/components/icons.tsx`
9. Write `src/app/globals.css` with design tokens extracted during Phase 1
10. `npm run check` must pass

### Phase 3 — Section Spec + Dispatch (per logical section, top to bottom)
For each section from `PAGE_TOPOLOGY.md`:
1. **Extract** the section's DOM subtree via `evaluate_script` — one call, returning the element tree with styles. Never download the full HTML.
2. **Write the spec** to `docs/research/components/<SectionName>.spec.md`. Exact computed CSS values, states, behaviors, content, responsive rules. Pre-dispatch checklist in SKILL.md.
3. **Dispatch the builder**:
   - Sequential (on `main` directly) if spec < 100 lines and the section has ≤4 sub-components
   - Parallel worktree otherwise — one `git worktree` per sub-component, merged back when the builder finishes
4. Update `PROGRESS.md`: mark the section "specced" after step 2, "built" after merge, "QA'd" after Phase 5

### Phase 4 — Page Assembly
- Wire all merged sections into `src/app/page.tsx` in order
- Implement page-level behaviors (smooth scroll if present, IntersectionObserver triggers, sticky nav, etc.)
- `npm run check` must pass clean

### Phase 5 — Visual QA Diff
- Side-by-side screenshot comparison at 1440 and 390 using chrome-devtools-mcp
- Pixel diff via `odiff` or `pixelmatch` (installed ad-hoc, pinned, not added to package.json)
- Target: ≤1% pixel diff per section, ≤0.5% per design token (color/spacing)
- Any discrepancy → re-check the spec (was the value wrong?) or the component (was the value right but the code wrong?) → fix → re-diff
- Test every behavior from `BEHAVIORS.md`

---

## 8. Success Criteria (testable)

The port is done when ALL of these are true. Every item is a mechanical check, not a subjective judgment.

- [ ] `npm run check` passes (lint + typecheck + build), zero warnings
- [ ] `document.fonts.ready` resolves with every font actually used by Ellipsus present in `document.fonts`
- [ ] Desktop 1440 full-page pixel diff ≤1% vs `docs/design-references/target-desktop-1440.png` (captured in Phase 1)
- [ ] Mobile 390 full-page pixel diff ≤1% vs `docs/design-references/target-mobile-390.png`
- [ ] Every section in `PAGE_TOPOLOGY.md` has a built component wired into `src/app/page.tsx`
- [ ] All source images downloaded to `public/images/` OR explicitly marked unused in `PAGE_TOPOLOGY.md`
- [ ] `public/fonts/` contains every self-hosted font family used by the site
- [ ] `public/seo/` contains favicons + OG images
- [ ] Every behavior listed in `BEHAVIORS.md` has a corresponding implementation and works in the built page
- [ ] Every form CTA is rendered as an inert stub with the correct label and original endpoint documented in a comment
- [ ] No analytics / tracking scripts in any rendered page source
- [ ] `<html lang="en">` (or whatever the live site uses), English meta tags verbatim
- [ ] `PROGRESS.md` shows every section as "QA'd"
- [ ] `main` branch committed locally; not pushed

---

## 9. What Not To Do

- **Don't download the full HTML** of the mirror without extracting — use the MCP with selectors.
- **Don't bypass `document.fonts.ready`.** Extraction without it produces wrong CSS values silently.
- **Don't build click-driven tabs when the original is scroll-driven** (or vice versa). Scroll first, click second — determine the interaction model before writing a spec.
- **Don't paraphrase the site's copy.** Verbatim, always.
- **Don't install any npm package updated in the last 72 hours.** `.npmrc` enforces this, and the global PreToolUse hook will block `npm install` without it.
- **Don't add caret `^` or tilde `~` ranges to `package.json`.** Pin to exact versions.
- **Don't push to origin** without being explicitly asked.
- **Don't add features, redesign elements, or "improve" anything.** This branch is emulation-only.
- **Don't reinstall `lucide-react`, `@base-ui/react`, `shadcn`, `class-variance-authority`, `tailwind-merge`, or `tw-animate-css`.** They were dropped from the baseline for supply-chain hygiene.
- **Don't load third-party scripts at runtime** (analytics, widgets, tag managers). Stub everything.
