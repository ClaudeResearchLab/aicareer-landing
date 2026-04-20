# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.

# AICareer v2 Landing — Pixel-Perfect Port of ellipsus.com

## Project Goal
Produce an almost-pixel-perfect port of **https://ellipsus.com/** (live site) into a modern Next.js 16 codebase. This repository is emulation-only: no redesign, no "improvements". A later pass (likely in the sister `AICareer_v2/` monorepo) will mutate this landing into the AICareer product landing on top of a faithful base.

**Read in this order before doing anything:**
1. `docs/PLAN.md` — authoritative plan (scope, success criteria, decisions)
2. `docs/MCP_GUIDE.md` — how to use chrome-devtools MCP against a live site (extraction workflow, known pitfalls)
3. `docs/research/PROGRESS.md` — per-section checklist: what is extracted, built, QA'd
4. `docs/research/RESUME.md` — notes from prior sessions, handoff details

## Source of Truth

**The target is the LIVE site** `https://ellipsus.com/`. There is no local export. Unlike a Tilda port, we extract directly from production.

Consequences:
- Every extraction session requires an internet connection.
- The live site can change between sessions — each session re-reads and re-verifies; spec files are dated.
- Heavy assets (images, videos, fonts) come from the origin and Sanity CDN (`cdn.sanity.io`). Phase 2 crawls and downloads them locally.
- `getComputedStyle()` is the source of truth for every CSS value. Do not hand-measure.

**Always gate extraction on `await document.fonts.ready`** and verify the site's custom font families are present in `document.fonts` before reading a single CSS value. If the guard fails, every spec gets fallback-font metrics and the clone breaks silently.

## How to Inspect the Source
```bash
# No local static server — target is the live URL
# Just open it in chrome-devtools-mcp:
#   https://ellipsus.com/
```

## Browser MCP
`chrome-devtools-mcp` is configured in `.mcp.json` at the repo root, pinned to `0.21.0` for supply-chain safety. `.mcp.json` is picked up on Claude Code startup — if you opened Claude Code before the file existed, restart it from this directory.

## Branch
Everything lives on `main` for now. A feature branch will be cut for the redesign pass. Do not push to origin unless explicitly asked.

## Package Security (safety > stack)
- Global rule: never install any package updated in the last 72h. `.npmrc` has `min-release-age=3`. A global PreToolUse hook blocks `npm install` without this file present — **do not bypass it**.
- Every dependency in `package.json` is **pinned to an exact version** (no `^`, no `~`) that was published ≥3 days ago. Whenever you add or bump a dep, you MUST re-verify the release date and keep it pinned.
- We intentionally ship only the minimum: `next`, `react`, `clsx`, `tailwindcss`. No `lucide-react`, no `@base-ui/react`, no `shadcn`, no `class-variance-authority`, no `tailwind-merge`. Icons are extracted as inline SVG React components from the Ellipsus markup. If an extracted section genuinely needs a new dep, verify its release date ≥3 days and pin exactly.

## Tech Stack (minimal)
- **Framework:** Next.js 16 (App Router, React 19, TypeScript strict)
- **Styling:** Tailwind CSS v4 (no shadcn, no Radix, no Headless UI — write plain components)
- **Fonts:** `next/font/local` pointing at self-hosted woff/woff2 in `public/fonts/` after Phase 2 download, or `next/font/google` if Ellipsus uses a Google-hosted family.
- **Icons:** extracted as inline SVG React components from the live markup (no icon library)
- **Animations:** CSS keyframes + IntersectionObserver hooks. Add Framer Motion or GSAP ONLY if Phase 1 reconnaissance proves the original uses motion that can't be reproduced in CSS.

## Commands
- `npm run dev` — Start dev server
- `npm run build` — Production build
- `npm run lint` — ESLint check
- `npm run typecheck` — TypeScript check
- `npm run check` — Run lint + typecheck + build

## Code Style
- TypeScript strict mode, no `any`
- Named exports, PascalCase components, camelCase utils
- Tailwind utility classes; inline `style={}` allowed only for computed values that cannot cleanly be expressed as utilities (e.g., dynamically-scaled artboards)
- 2-space indentation
- Responsive: mobile-first (Ellipsus is a modern responsive site, not an absolute-positioned Tilda artboard — semantic flex/grid is the default)

## Design Principles
- **Almost pixel-perfect** — ≤1% pixel-diff vs the live site at 1440 and 390
- **No aesthetic changes during emulation phase** — match 1:1 first, redesign later
- **Real content** — verbatim English copy from the live site, no paraphrasing, no placeholders
- **Safety over stack** — prefer fewer dependencies over richer tooling

## Project Structure
```
src/
  app/              # Next.js routes (layout.tsx, page.tsx, globals.css)
  components/       # React components (extracted Ellipsus sections + shared pieces)
    icons.tsx       # Inline SVG React components extracted from the live markup
  lib/
    utils.ts        # cn() utility — just clsx
  types/            # TypeScript interfaces for content shapes
  hooks/            # Custom React hooks (IntersectionObserver, scroll, etc.)
public/
  images/           # Downloaded from ellipsus.com + Sanity CDN in Phase 2
  videos/           # Downloaded from the live site in Phase 2 (if any)
  fonts/            # Self-hosted web fonts downloaded in Phase 2
  seo/              # Favicons, OG images, webmanifest
docs/
  PLAN.md                ← authoritative plan, read FIRST
  MCP_GUIDE.md           # how to use chrome-devtools MCP against a live site
  research/              # Phase 1 outputs
    BEHAVIORS.md         # Interaction sweep findings
    PAGE_TOPOLOGY.md     # Section-by-section map
    PROGRESS.md          # Checkpoint log (resume across sessions)
    RESUME.md            # Handoff notes
    components/          # Per-section *.spec.md files
  design-references/     # Screenshots at 1440 + 390
scripts/                 # Asset download scripts (created in Phase 2)
```

## MOST IMPORTANT NOTES
- **Checkpoint before context fills.** Any time you are about to lose context mid-clone, write the current state to `docs/research/PROGRESS.md` and stop. Do not blindly continue if context is >70% full.
- **Worktree parallelism is a tool, not a dogma.** For small sections, build sequentially. Spin up a git worktree only when a section's spec file is longer than ~100 lines or has ≥5 distinct sub-components.
- **Never download the full HTML of a page mirror.** Use browser MCP `evaluate_script` with a precise selector to extract only the DOM subtree you need.
- **Always `await document.fonts.ready`** before any `getComputedStyle()` call. This is non-negotiable for extraction fidelity.
- **Never load third-party scripts at runtime.** The live site may ship analytics, heatmaps, chat widgets. We strip all of them during the port — the redesign pass can re-add whatever it needs.
- This project is Claude-Code-only — we do NOT sync rules to other agent toolchains.

@docs/PLAN.md
