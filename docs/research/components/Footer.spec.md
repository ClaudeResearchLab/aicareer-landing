# Footer Specification

## Overview
- **Target file:** `src/components/Footer.tsx`
- **Interaction model:** Scroll-reveal on left column, quote block, bottomRight.

## DOM / Layout (desktop 1440)
- Outer `<div>` bg `#0C0D0D` (`--color-surface-inverted`), padding `0 80px`
- `.inner { max-width: 1312px }`
- `<section class="footer">` display flex, justify-between, padding `110px 0 64px`, color `#FBFBF9`
  - **Left (240w)** flex column items-start, mr 40:
    - `<EllipsusLogo>` 164×37, mb 40
    - `<ul class="links">` 122w, mb 74 — 8 items (19h each, stacked):
      1. What's new → ellipsus.com/blog/whats-new
      2. Blog → ellipsus.com/blog
      3. Help center → help.ellipsus.com
      4. Who we are → ellipsus.com/about
      5. Our stance on AI → ellipsus.com/generative-ai
      6. Merch store → merch.ellipsus.com
      7. Status → status.ellipsus.com
      8. Contact us → mailto:support@ellipsus.com
    - `<ul class="socials">` 240w, flex row gap 12, 7 items (24w×29h each):
      1. Mail → mailto:dotdotdot@ellipsus.com
      2. Tumblr → tumblr.com/ellipsus-writes
      3. Discord → discord.gg/ellipsus
      4. Instagram → instagram.com/ellipsuswrites
      5. TikTok → tiktok.com/@ellipsus_writes
      6. LinkedIn → linkedin.com/company/ellipsus
      7. Bluesky → bsky.app/profile/ellipsus.com
  - **Right (640w)** flex column justify-between items-end:
    - `<div class="quote">`:
      - `.richText.quoteText` 40/300 Roslindale `#FBFBF9`: "More than any other single invention, writing has transformed human consciousness." (quoted)
      - `<span class="author">` 20/400 Manrope: "Walter J. Ong"
    - `<div class="bottomRight">` flex row justify-between items-center:
      - `<ul class="legalLinks">` flex row gap 72:
        - Terms of service → ellipsus.com/terms-of-service
        - Privacy policy → ellipsus.com/privacy-policy
      - `<span class="address">` 14px 160w: "Jägerstraße 54-55 10117 Berlin Germany"
