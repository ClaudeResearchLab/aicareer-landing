#!/usr/bin/env node
// One-shot download of every remote asset ellipsus.com uses on the homepage.
// Enumerated during Phase 1 reconnaissance; see docs/research/PAGE_TOPOLOGY.md.
//
// Usage: node scripts/download-assets.mjs
//
// Skips files that already exist locally so reruns are idempotent.

import { mkdir, writeFile, stat } from "node:fs/promises";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const root = fileURLToPath(new URL("..", import.meta.url));

const concurrency = 4;

// ------- FONTS -------
// Only the families + weights actually rendered on the homepage (from document.fonts status === 'loaded').
const fonts = [
  // Roslindale Display Narrow — display font (title, accents)
  ["https://ellipsus.com/fonts/roslindale/full/RoslindaleDisplayNarrow-Regular.woff2",    "public/fonts/roslindale/RoslindaleDisplayNarrow-Regular.woff2"],
  ["https://ellipsus.com/fonts/roslindale/full/RoslindaleDisplayNarrow-Regular.woff",     "public/fonts/roslindale/RoslindaleDisplayNarrow-Regular.woff"],
  ["https://ellipsus.com/fonts/roslindale/full/RoslindaleDisplayNarrow-Italic.woff2",     "public/fonts/roslindale/RoslindaleDisplayNarrow-Italic.woff2"],
  ["https://ellipsus.com/fonts/roslindale/full/RoslindaleDisplayNarrow-Italic.woff",      "public/fonts/roslindale/RoslindaleDisplayNarrow-Italic.woff"],
  ["https://ellipsus.com/fonts/roslindale/full/RoslindaleDisplayNarrow-Light.woff2",      "public/fonts/roslindale/RoslindaleDisplayNarrow-Light.woff2"],
  ["https://ellipsus.com/fonts/roslindale/full/RoslindaleDisplayNarrow-Light.woff",       "public/fonts/roslindale/RoslindaleDisplayNarrow-Light.woff"],
  ["https://ellipsus.com/fonts/roslindale/full/RoslindaleDisplayNarrow-LightItalic.woff2","public/fonts/roslindale/RoslindaleDisplayNarrow-LightItalic.woff2"],
  ["https://ellipsus.com/fonts/roslindale/full/RoslindaleDisplayNarrow-LightItalic.woff", "public/fonts/roslindale/RoslindaleDisplayNarrow-LightItalic.woff"],
  // Manrope — body font
  ["https://ellipsus.com/fonts/manrope/Manrope-Regular.woff2", "public/fonts/manrope/Manrope-Regular.woff2"],
  ["https://ellipsus.com/fonts/manrope/Manrope-Regular.woff",  "public/fonts/manrope/Manrope-Regular.woff"],
  ["https://ellipsus.com/fonts/manrope/Manrope-Medium.woff2",  "public/fonts/manrope/Manrope-Medium.woff2"],
  ["https://ellipsus.com/fonts/manrope/Manrope-Medium.woff",   "public/fonts/manrope/Manrope-Medium.woff"],
  ["https://ellipsus.com/fonts/manrope/Manrope-Bold.woff2",    "public/fonts/manrope/Manrope-Bold.woff2"],
  ["https://ellipsus.com/fonts/manrope/Manrope-Bold.woff",     "public/fonts/manrope/Manrope-Bold.woff"],
];

// ------- FAVICONS + OG + MANIFEST -------
const seo = [
  ["https://ellipsus.com/favicon.ico",             "public/seo/favicon.ico"],
  ["https://ellipsus.com/favicon-16x16.png",       "public/seo/favicon-16x16.png"],
  ["https://ellipsus.com/favicon-32x32.png",       "public/seo/favicon-32x32.png"],
  ["https://ellipsus.com/apple-touch-icon.png",    "public/seo/apple-touch-icon.png"],
  ["https://ellipsus.com/safari-pinned-tab.svg",   "public/seo/safari-pinned-tab.svg"],
  ["https://ellipsus.com/site.webmanifest",        "public/seo/site.webmanifest"],
  ["https://cdn.sanity.io/images/3sx2q15i/production/16946ebaac688424eb7eb7ca51b39e70af9e92b3-1200x630.jpg?w=1200&q=80&auto=format", "public/seo/og-image.jpg"],
];

// ------- DECORATIVE SVG BACKGROUNDS -------
const decorativeSvgs = [
  ["https://ellipsus.com/images/svg/ui/homepage/introduction/wiggle.svg",    "public/images/decor/introduction/wiggle.svg"],
  ["https://ellipsus.com/images/svg/ui/homepage/introduction/underline.svg", "public/images/decor/introduction/underline.svg"],
  ["https://ellipsus.com/images/svg/ui/homepage/introduction/circle.svg",    "public/images/decor/introduction/circle.svg"],
  ["https://ellipsus.com/images/svg/ui/homepage/statement/wiggle.svg",       "public/images/decor/statement/wiggle.svg"],
  ["https://ellipsus.com/images/svg/ui/homepage/statement/circle.svg",       "public/images/decor/statement/circle.svg"],
];

// ------- SANITY IMAGES -------
// We download at the *rendered* variant (what currentSrc returned at 1440).
// Pattern: <assetId>-<origDims>.png?w=<renderWidth>&q=<q>&auto=format
const sanity = [
  // Devices (hero-adjacent mockups) — full resolution rendered variants
  ["https://cdn.sanity.io/images/3sx2q15i/production/450ac062cd64174d10ed6ba5913a13dd96626ea4-2340x1462.png?w=2400&q=90&auto=format", "public/images/devices/desktop.png"],
  ["https://cdn.sanity.io/images/3sx2q15i/production/694238f8b656a0388ba41dfb115e5d5c1d2a7f0a-694x1056.png?w=1400&q=90&auto=format", "public/images/devices/tablet.png"],
  ["https://cdn.sanity.io/images/3sx2q15i/production/26c671394737e51631fe24dd4d7dcf6ccecd3016-527x1113.png?w=800&q=90&auto=format",  "public/images/devices/phone-android.png"],
  ["https://cdn.sanity.io/images/3sx2q15i/production/0bdb71d651109150d2b0477e055409c3a74b27aa-429x871.png?w=800&q=90&auto=format",   "public/images/devices/phone-ios.png"],

  // Showcase collaborator avatars
  ["https://cdn.sanity.io/images/3sx2q15i/production/7357ccb78fa35f7dc4746a15644e3802a4740b76-92x94.png?w=128&q=80&auto=format",  "public/images/avatars/mary-shelley.png"],
  ["https://cdn.sanity.io/images/3sx2q15i/production/49d3e027c7b3d443ab1a727672b81cc4145c15df-95x95.png?w=128&q=80&auto=format",  "public/images/avatars/p.png"],
  ["https://cdn.sanity.io/images/3sx2q15i/production/29bef938e7756c3462b91aae085859b4e21a13d3-96x95.png?w=128&q=80&auto=format",  "public/images/avatars/lord-byron.png"],

  // Showcase video posters
  ["https://cdn.sanity.io/images/3sx2q15i/production/b93fdb2c4c96c8c0f049623fb8899b3018519881-2108x980.png?w=2108&q=85&auto=format", "public/images/showcase/poster-1-connected-drafts.png"],
  ["https://cdn.sanity.io/images/3sx2q15i/production/bf9f03e3bb543b7f4707779fa6458de71f7e5f29-2108x980.png?w=2108&q=85&auto=format", "public/images/showcase/poster-2-comments-drafts.png"],
  ["https://cdn.sanity.io/images/3sx2q15i/production/87c57f097ba9d3e36d534f3eb2571c6ef80a20e4-2108x980.png?w=2108&q=85&auto=format", "public/images/showcase/poster-3-merge.png"],

  // Navigation submenu icons (48x48) — 7 entries
  ["https://cdn.sanity.io/images/3sx2q15i/production/07472112212378212c79540d26594cb6cefc7b44-49x48.png?w=96&q=80&auto=format", "public/images/nav/sub-icon-1.png"],
  ["https://cdn.sanity.io/images/3sx2q15i/production/258c0644533726aeb73202df733cc01e7fbd7293-49x48.png?w=96&q=80&auto=format", "public/images/nav/sub-icon-2.png"],
  ["https://cdn.sanity.io/images/3sx2q15i/production/9ddce598f60e08e1520c64c20686a4f7c68faf1a-49x48.png?w=96&q=80&auto=format", "public/images/nav/sub-icon-3.png"],
  ["https://cdn.sanity.io/images/3sx2q15i/production/e7026200c61973fdf4cc819d40955f485f9122fe-49x48.png?w=96&q=80&auto=format", "public/images/nav/sub-icon-4.png"],
  ["https://cdn.sanity.io/images/3sx2q15i/production/453cc55695a478b9ca915042081c1fbd021608b8-48x48.png?w=96&q=80&auto=format", "public/images/nav/sub-icon-5.png"],
  ["https://cdn.sanity.io/images/3sx2q15i/production/179eb999ee46f1b4430036174b0a25d564ed6dc9-48x48.png?w=96&q=80&auto=format", "public/images/nav/sub-icon-6.png"],
  ["https://cdn.sanity.io/images/3sx2q15i/production/77c460141a5306c9c8fb8689b76314ea20ce97b3-48x48.png?w=96&q=80&auto=format", "public/images/nav/sub-icon-7.png"],

  // Navigation submenu preview cards (600x440 + 598x504)
  ["https://cdn.sanity.io/images/3sx2q15i/production/3edd54f66c48b42de97e6c281ecaa4fdfa527ee6-600x440.png?w=600&q=85&auto=format", "public/images/nav/sub-card-1.png"],
  ["https://cdn.sanity.io/images/3sx2q15i/production/ec190ddb557c1deb5f9b8bd27ff811696f888240-600x440.png?w=600&q=85&auto=format", "public/images/nav/sub-card-2.png"],
  ["https://cdn.sanity.io/images/3sx2q15i/production/5e48a97e46e617e8ad1c3b83a7081e813007362c-600x440.png?w=600&q=85&auto=format", "public/images/nav/sub-card-3.png"],
  ["https://cdn.sanity.io/images/3sx2q15i/production/b7b9e5e014537d83a1d59660a5fa063f9e478fe1-600x440.png?w=600&q=85&auto=format", "public/images/nav/sub-card-4.png"],
  ["https://cdn.sanity.io/images/3sx2q15i/production/ad06ad971a86de34f43acadc1f998a7097da3871-600x440.png?w=600&q=85&auto=format", "public/images/nav/sub-card-5.png"],
  ["https://cdn.sanity.io/images/3sx2q15i/production/e2f1ae8be04bb9e9c0f0433304e162391e3fe8c0-598x504.png?w=600&q=85&auto=format", "public/images/nav/sub-card-6.png"],
  ["https://cdn.sanity.io/images/3sx2q15i/production/4ff31e3912e6158c418419587e5f9794524f4eb2-600x440.png?w=600&q=85&auto=format", "public/images/nav/sub-card-7.png"],
  ["https://cdn.sanity.io/images/3sx2q15i/production/fddd3bc6bdfd484125cbdceb09568cb20ecc9df4-600x440.png?w=600&q=85&auto=format", "public/images/nav/sub-card-8.png"],
  ["https://cdn.sanity.io/images/3sx2q15i/production/eb55b68ceea2b2c4fedf8b195513b37bd496db93-600x440.png?w=600&q=85&auto=format", "public/images/nav/sub-card-9.png"],
  ["https://cdn.sanity.io/images/3sx2q15i/production/d62def5c6699f5e9d60002ebff99dc7d8cf527e8-600x440.png?w=600&q=85&auto=format", "public/images/nav/sub-card-10.png"],
];

// ------- VIDEOS -------
const videos = [
  ["https://ellipsus.com/videos/88e6b9ecd6bed67899c9da27dc0f742aefc552c2.webm", "public/videos/showcase-1-connected-drafts.webm"],
  ["https://ellipsus.com/videos/beb61354c0486517a6fcd960d816f8acc10f0657.mp4",  "public/videos/showcase-1-connected-drafts.mp4"],
  ["https://ellipsus.com/videos/4e3a33d735155b1ca9193b1cdfaec4ed83887d02.webm", "public/videos/showcase-2-comments-drafts.webm"],
  ["https://ellipsus.com/videos/18f006c0d99bb45990fd4cdfaad5ffcbfd7cae1a.mp4",  "public/videos/showcase-2-comments-drafts.mp4"],
  ["https://ellipsus.com/videos/167c5fb4b1f258c7e6b6d070c2bb9d79a3b7f39f.webm", "public/videos/showcase-3-merge.webm"],
  ["https://ellipsus.com/videos/264509701d2529aba07db1dbc24a5c45d3574c3d.mp4",  "public/videos/showcase-3-merge.mp4"],
];

const all = [...fonts, ...seo, ...decorativeSvgs, ...sanity, ...videos];

async function ensureDir(path) {
  await mkdir(dirname(path), { recursive: true });
}

async function exists(path) {
  try { await stat(path); return true; } catch { return false; }
}

async function download([remoteUrl, relPath]) {
  const localPath = join(root, relPath);
  if (await exists(localPath)) return { skipped: true, relPath };
  await ensureDir(localPath);
  const res = await fetch(remoteUrl, {
    headers: {
      "User-Agent": "ellipsus-clone/1.0 (local dev archive)",
      "Referer": "https://ellipsus.com/",
    },
  });
  if (!res.ok) throw new Error(`${remoteUrl} → HTTP ${res.status}`);
  const buf = Buffer.from(await res.arrayBuffer());
  await writeFile(localPath, buf);
  return { bytes: buf.length, relPath };
}

async function runPool(tasks) {
  const results = [];
  let i = 0;
  async function worker() {
    while (i < tasks.length) {
      const mine = tasks[i++];
      try {
        const r = await download(mine);
        const tag = r.skipped ? "skip" : `${(r.bytes/1024).toFixed(1)} KB`;
        results.push({ ok: true, tag, path: r.relPath });
        console.log(`✓ [${tag.padStart(10)}] ${r.relPath}`);
      } catch (e) {
        results.push({ ok: false, error: e.message, path: mine[1] });
        console.error(`✗ ${mine[1]}: ${e.message}`);
      }
    }
  }
  await Promise.all(Array.from({ length: concurrency }, () => worker()));
  return results;
}

console.log(`Downloading ${all.length} assets with concurrency=${concurrency}…\n`);
const results = await runPool(all);
const okCount = results.filter(r => r.ok).length;
const skippedCount = results.filter(r => r.ok && r.tag === "skip").length;
const failCount = results.length - okCount;
console.log(`\nDone: ${okCount} ok (${skippedCount} already present), ${failCount} failed.`);
if (failCount) process.exit(1);
