# AICareer v2 Landing — Clone Progress Log

Authoritative log of which sections are specced, built, and merged. Updated at every section boundary. Read this first on session resume; do not re-extract specced sections unless flagged "revisit".

## Session Log

- **2026-04-20 (bootstrap)** — Repo scaffolded from the Noukash port template. No extraction yet.

## Pre-flight Status

- [x] Repo scaffolded: package.json (pinned), tsconfig, next.config, eslint, postcss, .mcp.json, .npmrc, .nvmrc
- [x] `.claude/skills/clone-website/SKILL.md` adapted for ellipsus.com
- [x] AGENTS.md, CLAUDE.md, docs/PLAN.md written for Ellipsus target
- [ ] `npm install` run (first-time setup by user)
- [ ] `npm run build` passes on empty scaffold
- [ ] chrome-devtools-mcp connected in a fresh Claude Code session
- [ ] `https://ellipsus.com/` reachable from the MCP
- [ ] `document.fonts.ready` guard passes on page load

## Phase 1 — Reconnaissance

- [ ] Full-page 1440 screenshot → `docs/design-references/target-desktop-1440.png`
- [ ] Full-page 390 screenshot → `docs/design-references/target-mobile-390.png`
- [ ] Interaction sweep (scroll / click / hover / responsive) → `docs/research/BEHAVIORS.md`
- [ ] `docs/research/PAGE_TOPOLOGY.md` — every distinct section mapped in order with interaction model
- [ ] Global design tokens extracted (colors, fonts, spacing, radii, shadows)
- [ ] Font discovery — enumerate every family / weight / style actually used on the page

## Phase 2 — Foundation

- [ ] `scripts/download-fonts.mjs` + fonts in `public/fonts/`
- [ ] `scripts/download-images.mjs` + images in `public/images/`
- [ ] `scripts/download-videos.mjs` + videos in `public/videos/` (if any)
- [ ] Favicons + OG images in `public/seo/`
- [ ] `src/app/layout.tsx` — `next/font` wired, verbatim SEO metadata, `<html lang="en">`
- [ ] `src/components/icons.tsx` — all inline SVG icons extracted
- [ ] `src/app/globals.css` — full token set (`@theme`), any `@font-face` rules, base layer
- [ ] `npm run check` passes

## Phase 3 — Sections

Sections discovered and their build state. Populate after Phase 1 topology is done.

| # | Component | Spec | Built | Wired | QA'd |
|---|-----------|------|-------|-------|------|
|   |           |      |       |       |      |

## Phase 4 — Assembly

- [ ] `src/app/page.tsx` wired
- [ ] Page-level behaviors implemented
- [ ] `npm run check` passes clean

## Phase 5 — Visual QA

- [ ] Desktop 1440 pixel diff ≤1%
- [ ] Mobile 390 pixel diff ≤1%
- [ ] All behaviors from BEHAVIORS.md verified in clone
