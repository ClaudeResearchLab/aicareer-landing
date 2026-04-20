# Introduction Specification

## Overview
- **Target file:** `src/components/Introduction.tsx`
- **Shared assets:** 3 decorative SVGs saved to `public/images/decor/introduction/` (origami.svg 63 KB, books.svg 91 KB, composition.svg 722 KB). 3 small SVGs inlined: topWave, bottomWave, arrow.
- **Screenshot:** `docs/design-references/target-desktop-1440.png` (section 3, y≈1699–3244)
- **Interaction model:** **scroll-reveal** (IntersectionObserver → `.reveal.is-visible`) + **time-rotating word** (setInterval 1500ms). Top half is `position: sticky` pinned below the nav, staggering behind the paragraph block as the user scrolls.
- **Behavior source:** `docs/research/BEHAVIORS.md` §Introduction and `docs/research/PAGE_TOPOLOGY.md` §3.

## DOM Structure (desktop)
```
<section>
  <div .styles_introduction__6dDcv>                     // sticky top:74, h:600, bg #E5E5E1, flex align-items:center
    <svg .styles_topWave__dCtV1 />                      // absolute wave divider, fill #E5E5E1, viewBox 0 0 1451 96
    <div .styles_container__NSLBw.styles_container__7mRkm>  // px-20
      <div .styles_inner__AmD3Z.styles_containerInner__wAZVq>  // relative, w:1280, h:600, flex items-center
        <div .styles_origami>                           // absolute, appearOnScroll --delay:500ms
          <svg .styles_origamiSvg />                    // 280×255.6 (file: origami.svg, 63KB)
        </div>
        <p .styles_sentence>                            // static, font 84px Roslindale 300, appearOnScroll --delay:0ms
          <span .styles_word>Made for</span>
          <span .styles_word style={{color}}>{rotating}</span>
          <span .styles_word>writers</span>
        </p>
      </div>
    </div>
  </div>
  <div .styles_paragraphs__uVF_l>                       // relative, h:945, padding-top:200, bg #F4F4F2
    <svg .styles_bottomWave__qC_W3 />                   // absolute wave divider, fill #F4F4F2, viewBox 0 0 1532 103
    <div .styles_container__NSLBw>                      // px-20
      <div .styles_inner__AmD3Z>                        // relative, w:1280, h:425
        <div .styles_books>                             // absolute, appearOnScroll --delay:200ms
          <svg .styles_booksSvg />                      // 280×268.5 (file: books.svg, 91KB)
        </div>
        <div .styles_paragraphContainer__4sXjM>         // appearOnScroll --delay:0ms
          <div .paragraph1>
            <p>Plenty of tools are made for memos, notes, and to-do lists. <strong><em>That’s not us.</em></strong></p>
          </div>
        </div>
        <div .styles_paragraphContainer__4sXjM>         // appearOnScroll --delay:0ms
          <div .paragraph2>
            <p>Ellipsus is here to help you build worlds, wrench hearts, raise eyebrows, and <span style="text-decoration:underline">celebrate creativity</span> in<strong> all its forms.</strong></p>
          </div>
        </div>
      </div>
    </div>
    <div .styles_container__NSLBw.styles_illustrationContainer__BsehT>  // h:440, px-20, mt:-180, overflow:hidden
      <div .styles_inner__AmD3Z.styles_illustrationContainerInner__CGCjw>  // relative, h:440
        <div .styles_illustration>                      // absolute, 400×402.6, bottom:37.4
          <svg .styles_arrow />                         // absolute, 60×32.6, top:120, fill #529A6A
          <svg .styles_composition />                   // 400×397.6 (file: composition.svg, 722KB)
        </div>
      </div>
    </div>
  </div>
</section>
```

## Computed styles (at 1440, before reveal)

### Top half `.styles_introduction__6dDcv`
- `display: flex; position: sticky; top: 74px`
- `width: 1440px; height: 600px`
- `background-color: rgb(229, 229, 225)` → `--color-surface-stone` (new)
- `align-items: center`

### topWave
- `position: absolute; bottom: 504.734px`; `width: 1440px; height: 95.27px`
- `transform: translateY(-60.97px)`; `overflow: hidden`
- `viewBox: 0 0 1451 96`; `preserveAspectRatio: none`; contains 2 paths, both `fill: #E5E5E1`
- Placed visually at the top edge of the section, curving the transition from Devices' #F4F4F2 into the intro #E5E5E1.

### `.styles_container__7mRkm` → `.styles_containerInner__wAZVq`
- Container: `padding: 0 80px`; inner: `w: 1280; h: 600; max-w: 1312px; position: relative; flex align-items:center`.

### `.styles_origami`
- `position: absolute; left: 1040px; right: -40px; bottom: 339.4px; width: 280px; height: 260.6px; z-index: 1`
- `.reveal` utility (`--reveal-delay: 500ms`) — starts at `opacity: 0; translateY(40px)`.
- SVG: `public/images/decor/introduction/origami.svg` (viewBox 0 0 264 241).

### `.styles_sentence`
- `width: 895.8px; height: 102px; font: 84px Roslindale Display Narrow 300`
- `.reveal` utility (`--reveal-delay: 0ms`).
- Three `<span class="styles_word">` inline-blocks. Middle span gets inline `style={{ color }}`.

### Rotating words (cycle 1500ms; freezes under `prefers-reduced-motion`):
| Word | Color |
|------|-------|
| creative | `#2173BE` (brand-blue) |
| fan | `#529A6A` (brand-green) |
| disorganized | `#C455EB` (brand-purple) |
| aspiring | `#EB5B55` (brand-coral) |
| passionate | `#F09236` (brand-orange) |

SSR renders the first entry (`creative`, blue). Client-side cycle via `useRotatingWord()` hook.

### Bottom half `.styles_paragraphs__uVF_l`
- `position: relative; width: 1440px; height: 945px; padding: 200px 0 0`
- `background-color: rgb(244, 244, 242)` → `--color-surface-primary`

### bottomWave
- `position: absolute; bottom: 848.2px`; `width: 1440px; height: 96.8px`; `transform: translateY(-58.09px)`
- `viewBox 0 0 1532 103`; `fill: #F4F4F2`; `preserveAspectRatio: none`
- Placed at the top of the paragraphs container, bridging #E5E5E1 above into #F4F4F2 below.

### `.styles_container__NSLBw` (paragraphs) + inner
- Container `padding: 0 80`, `h: 425`. Inner `w: 1280, max-w:1312, relative`.

### `.styles_books`
- `position: absolute; top: -340px; left: -80px; right: 1080px; bottom: 491.5px; width: 280px; height: 273.5px; z-index: 1`
- `.reveal` utility (`--reveal-delay: 200ms`)
- SVG: `public/images/decor/introduction/books.svg` (viewBox 0 0 219 210).

### paragraphContainer1 / paragraphContainer2
- Both `position: relative; width: 1280`, `.reveal` (`--reveal-delay: 0ms`).
- Child `.paragraph1/paragraph2`: `width: 900; max-width: 900; font: 60px Roslindale Display Narrow 300`.
- h of paragraph1: 146 (2 lines). h of paragraph2: 219 (3 lines).
- Paragraph2 starts 206px below paragraph1's top (so ~60px gap between them).

### `.styles_illustrationContainer__BsehT`
- `width: 1440; padding: 0 80; margin: -180 0 0; height: 440; overflow: hidden`
- Inner `w: 1280; h: 440; position: relative`.

### `.styles_illustration`
- `position: absolute; left: 1008; right: -128; bottom: 37.4; width: 400; height: 402.6; z-index: 1`
- Contains 2 SVGs:
  - `.styles_arrow` — `position: absolute; top: 120; left: -80; width: 60; height: 32.6`; green #529A6A; inline (small, 4KB).
  - `.styles_composition` — static, 400×397.6; PNG-sized decorative illustration; file: `composition.svg` (722 KB).
- **Not wrapped in `.reveal`** — composition stays visible; only the textual blocks and books/origami animate.

## States & behaviors

### Scroll reveal (all appearOnScroll elements)
- Initial: `opacity: 0; transform: translateY(40px)`
- `transition: opacity 0.4s linear var(--reveal-delay), transform 0.5s var(--ease-reveal) var(--reveal-delay)`
- On `is-visible`: `opacity: 1; transform: none`
- Delays: origami 500ms, sentence 0, books 200ms, paragraphs 0 (per inline `--delay:` on original).

### Rotating word
- `useRotatingWord([...5 entries], 1500)` → `{ word, color }`. Render middle `<span>` with `style={{ color }}`.
- Under `prefers-reduced-motion: reduce`, the hook freezes on the first entry (SSR parity).

### Sticky top
- Top half sticks to `top: 74px` as the user scrolls. The paragraph section slides up over it. No JS needed — pure `position: sticky`.

## Content (verbatim)

- Sentence prefix: `Made for`
- Sentence suffix: `writers`
- Paragraph 1 HTML: `Plenty of tools are made for memos, notes, and to-do lists. <strong><em>That’s not us.</em></strong>`
- Paragraph 2 HTML: `Ellipsus is here to help you build worlds, wrench hearts, raise eyebrows, and <span style="text-decoration:underline">celebrate creativity</span> in<strong> all its forms.</strong>`

## Assets
- `public/images/decor/introduction/origami.svg` — saved 2026-04-20, 63 KB
- `public/images/decor/introduction/books.svg` — saved 2026-04-20, 91 KB
- `public/images/decor/introduction/composition.svg` — saved 2026-04-20, 722 KB
- Inlined in `Introduction.tsx`: topWave, bottomWave, arrow (small decorative SVGs).

## Responsive
- `< md (768px)`: layout stacks, section height grows to ~1892px per topology. Deferred to a follow-up; clone renders desktop layout only for now, hidden on mobile via `hidden md:block` on the positioned decorations.

## Implementation notes
- Sticky top half requires parent `<main>` to NOT have `overflow: hidden` — already respected by `layout.tsx`.
- Decorative SVGs use `<Image>` (next/image) with explicit width/height. Only the small decorative waves + arrow are inlined.
- The `useReveal` hook is applied to origami, sentence, books, and each paragraphContainer (not the wraps).
- Composition SVG at 722 KB is the heaviest single asset on the page — leave as `next/image` `priority={false}` so it only loads when near-viewport.
