# Statement Specification

## Overview
- **Target file:** `src/components/Statement.tsx`
- **Screenshot:** `docs/design-references/target-desktop-1440.png` (section 5)
- **Interaction model:** Scroll-revealed title, intro, robot, caption1/caption2 (all `.reveal` with stagger).

## DOM / Layout (desktop 1440)
- `<section>` bg `#F4F4F2` (`--color-surface-primary`), position relative, h ≈1206
- `.container { padding: 0 80px; overflow: hidden }`
- `.inner { position: relative; max-width: 1312px; padding: 86px 0 680px }`
  - `<h2>` 80/300 Roslindale `#282825` max-w 740, mb 50: "A principled alternative—by writers, for writers"
  - `.introContainer { display:flex; justify-content:flex-end }`
    - `.richText.intro` 500w, font-size 28, lh 42, right-aligned, color `#282825`: `<p>We think writers should be free to <span style="text-decoration:underline">express their creative vision</span>—away from aggressive censorship and the <strong>prying eyes of AI</strong>.</p>`
    - `.caption1` absolute top:108 left:532 w:192 h:42 color `#529A6A` (green) text-right: `<p>Your content is <strong>YOURS</strong>.</p>` font 18/24.5
    - caption-arrow-1 svg absolute top:74 left:740 w:80 h:51
    - `.caption2` absolute top:228.5 left:1088 w:191 color `#EB5B55` (coral): `<p>No generative AI—<strong>ever</strong>.</p>`
    - caption-arrow-2 svg absolute top:175.5 left:1160 w:40 h:45
  - `.robot` absolute top:380 left:-40 w:690 h:668, contains robot.svg
  - `<div>` relative container for balls (7 balls absolute):
    - ball1 top:1084.64 left:640 w:100 h:91
    - ball2 top:901.77 left:819.19 w:100 h:84
    - ball3 top:718.73 left:844.79 w:130 h:117 (inner svg rotate 30°)
    - ball4 top:963.27 left:1024 w:90 h:82 (inner svg rotate 210°)
    - ball5 top:797.36 left:1020 w:120 h:108 (inner svg rotate -50°)
    - ball6 top:1111.91 left:1150 w:80 h:74 (inner svg rotate -30°)
    - ball7 top:957.36 left:1280 w:120 h:108 (inner svg rotate 40°)

## Assets
- `public/images/statement/robot.svg`
- `public/images/statement/ball{1..7}.svg`
- `public/images/statement/caption-arrow-1.svg`
- `public/images/statement/caption-arrow-2.svg`
