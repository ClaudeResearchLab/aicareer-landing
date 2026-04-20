# AICareer v2 Landing — Session Resume Notes

Handoff notes between clone sessions. Prior sessions append a dated block here with anything that would help the next one avoid re-learning.

## 2026-04-20 — Bootstrap

**Intent:** clone https://ellipsus.com/ into this repo as a faithful base before the real redesign for the AICareer v2 product landing.

**Repo scaffold is based on** the sibling `/Users/temp/Desktop/Antigravity/NoukashZeroToOffer/` port. Same dep pins, same package-security posture, same skill structure, same phase pipeline — but retargeted from a local Tilda export to a live React/SSR site with Sanity CMS.

**Key differences from Noukash:**
- Target is `https://ellipsus.com/` (live), not a local static server
- No Tilda Zero Blocks → no `useArtboardScale` hook, no artboard pixel positioning
- Images come from Sanity CDN — prefer `img.currentSrc` (the variant the browser picked from `srcset`) over `img.src` when downloading
- English content — `<html lang="en">`, no Cyrillic subsets needed for fonts
- No preloader / grain overlay unless Phase 1 proves Ellipsus has them
- Forms (if any) are stubbed per PLAN.md §4.3; the endpoint/widget ID goes in an inline comment

**First-session TODO checklist:**
1. `npm install` from the repo root
2. `npm run build` — confirm scaffold builds clean (blank page is fine)
3. Start a fresh Claude Code session from this directory so `.mcp.json` is picked up
4. Run `/clone-website` — it will handle Phase 1 onward
5. First real deliverables: `docs/design-references/target-desktop-1440.png`, `docs/design-references/target-mobile-390.png`, `docs/research/PAGE_TOPOLOGY.md`, `docs/research/BEHAVIORS.md`

**Known pitfalls (from the Noukash port, still relevant):**
- Always `await document.fonts.ready` before any `getComputedStyle` call
- Never Read the full page HTML into context — use MCP `evaluate_script` with selectors
- Click EACH tab/pill before writing its spec — default state isn't enough
- Scroll before clicking — determine interaction model (scroll-driven vs click-driven) first
- Package security: `.npmrc` has `min-release-age=3`, pin exact versions in package.json
