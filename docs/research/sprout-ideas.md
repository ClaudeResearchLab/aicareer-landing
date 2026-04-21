# usesprout.com — features worth porting

Survey date: 2026-04-21. Source: https://www.usesprout.com/.
Full-page screenshot at `docs/design-references/sprout-full-desktop.png`.
Per-section crops: `sprout-hero.jpg`, `sprout-02.jpg` … `sprout-12.jpg`.

## Site profile
- AI job-search product. Very close category match to AICareer.
- Fonts: Nunito Sans 400/500/600/700/900 + Geist Mono (accent) + Inter (body fallback).
- Palette: near-black text on ivory; single brand green (#1F5C3A-ish) for CTAs/pills/checks.
- Layout is conventional (centered column, ~1200px max-width). Style is clean/neutral — very different from our handwritten scribbly Ellipsus base.

## Ideas (ranked by signal for our landing)

### 1. Pain-point chip cloud — HIGH value, cheap to build
Screenshot: `sprout-03.jpg` (top half).
A grid of ~20 pill chips, each "<icon> <short question>?": "Forgot to follow up?", "Hours applying, no replies?", "Copy-pasting cover letters?", "Rewriting resumes nonstop?", "Job hunt feels like a job?".
Why it works: reads like a diagnostic checklist — every visitor sees their own pain labeled. Much stronger than a generic "problems we solve" paragraph.
Port plan: drop in above our current `Statement` section. Keep our hand-drawn vibe (wobbly borders, Caveat/handwriting accent font for the questions instead of their Nunito). Chips render in 4 rows × 4-5 chips, wrapped with slight rotation jitter like our scattered letters.

### 2. Dual feature card — HIGH value
Screenshot: `sprout-04.jpg`.
Two side-by-side big cards with: small label ("Personalization" / "AI Apply") + bold 2-line headline + a fake UI mock inside the card showing the feature in action (AI generating a cover letter; AI submitting an app).
Why it works: a fake product screenshot inside a card sells the feature far better than any copy.
Port plan: our `Showcase` already has a similar instinct but the content is generic — steal the "label / headline / fake-UI-mock" pattern and adapt with our accent colours (coral / cream) instead of their green.

### 3. "Sprout vs ChatGPT vs Traditional" comparison table — HIGH value
Screenshot: `sprout-07.jpg`.
11-row feature table with 3 columns (us / AI tools / no-AI). ✓ vs × with short captions like "Tailored resume for each job", "Few seconds vs Few minutes vs ×". Ends with a green CTA button at the bottom.
Why it works: crushes objections ("can't I just use ChatGPT?") in one glance. Strong pre-pricing section.
Port plan: build as `src/components/ComparisonTable.tsx`. Keep our ivory + coral rule lines. This is a fast win because it's mostly data.

### 4. Pricing with weekly/monthly toggle + "Popular" highlight — MEDIUM
Screenshot: `sprout-10.jpg`.
3 plan cards. Weekly/Monthly toggle at top with "25% off" mini-pill. "Popular" badge and tinted background on the middle-right plan. Big type prices with "$" superscript. Bottom block lists the features included in every plan.
Why it works: reduces anxiety ("everything is included"), toggle gives agency, Popular nudges choice.
Port plan: only build if/when we actually have pricing. For now bookmark.

### 5. Testimonial card grid — MEDIUM
Screenshot: `sprout-08.jpg`.
Masonry-ish grid of 9+ quote cards, each: round avatar, name, short role, 2-3 line quote. Some cards fade at the edges (mask-image) to signal "more exists".
Why it works: social proof feels more real than a carousel, and the soft fade gives depth.
Port plan: we already have `Counter` for stats — add a slimmer quote-card grid below it. Reuse our existing `reveal` hook.

### 6. Logo wall as scattered bubbles — LOW/MEDIUM
Screenshot: `sprout-09.jpg`.
Company logos in rounded square tiles scattered at different vertical offsets — NOT a marquee, just a staggered grid with subtle drop shadows. Verified: no animation keyframes, no transforms — static layout.
Why it works: reads as "candidates land everywhere" without the cliché horizontally-scrolling logo belt.
Port plan: can replace a traditional "as seen in" strip if we want one. Low priority.

### 7. Announcement pill above the hero headline — LOW
Screenshot: `sprout-hero.jpg`.
Small green-outlined pill "Sprout for Web is here →" sitting above the H1. Links to a blog post/changelog.
Why it works: gives the page a "shipping product" pulse and a secondary CTA.
Port plan: 15 minutes. Add a tiny `HeroAnnouncement` component above our hero title when we have something to announce.

### 8. Trust row under the CTA — LOW
Screenshot: `sprout-hero.jpg`.
Three inline trust pills below the hero button: "👥 Used by 750,000+ job seekers · ⏱ Saves 20+ hours every week · ⭐ Rated 4.8/5 on the App Store".
Why it works: compresses all the social proof that usually needs its own section into three chips.
Port plan: we could swap our hero description for these three chips once we have real numbers, or add them as a row below the `Join for free` button.

## Not worth porting
- Two-tone headline (grey-out first clause, bold second clause) — our custom display font + scattered-letters already carry the hero visual weight; layering another emphasis pattern would fight them.
- FAQ accordion (`sprout-11.jpg`) — standard, nothing distinctive.
- Big logo bubbles near the bottom — feels redundant if we also add the testimonial grid.

## Suggested shortlist (what I'd build next, in order)
1. **Pain-point chip cloud** → huge payoff, tiny code, fits our scribbly aesthetic perfectly.
2. **Comparison table** (us vs ChatGPT vs manual) → strong objection-crusher before the CTA.
3. **Announcement pill** in the hero → 15 min, gives us a second CTA surface.
4. **Testimonial card grid** → if we have real quotes; skip placeholders.

Everything adapted to our existing palette (ivory / coral / ink) and hand-drawn accents — no green, no Nunito. The ideas are structural, not stylistic.
