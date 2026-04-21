"use client";

import type { ComponentType, SVGProps } from "react";
import clsx from "clsx";
import { useReveal } from "@/hooks/useReveal";
import {
  BellIcon,
  CalendarIcon,
  CalendarXIcon,
  FileTextIcon,
  GhostIcon,
  HourglassIcon,
  InboxIcon,
  KeyboardIcon,
  LayersIcon,
  MoonIcon,
  PenIcon,
  PhoneOffIcon,
  TableIcon,
  TargetIcon,
  TrendingDownIcon,
  ZapIcon,
} from "./icons";

type IconCmp = ComponentType<SVGProps<SVGSVGElement>>;
type Pain = { Icon: IconCmp; text: string; tilt: number; anim: string };

const PAINS: Pain[] = [
  { Icon: GhostIcon,         text: "Ghosted for the fifth time?",                    tilt: -1.5, anim: "ghost" },
  { Icon: PhoneOffIcon,      text: "Zero callbacks this month?",                     tilt:  1.2, anim: "phone" },
  { Icon: CalendarIcon,      text: "Another Sunday lost to applications?",           tilt: -0.8, anim: "calendar" },
  { Icon: FileTextIcon,      text: "CV at version 38?",                              tilt:  1.8, anim: "paper" },
  { Icon: InboxIcon,         text: "Inbox full of \u201Cunfortunately\u201D?",       tilt: -1.2, anim: "inbox" },
  { Icon: HourglassIcon,     text: "Still waiting after 3 weeks?",                   tilt:  0.9, anim: "hourglass" },
  { Icon: LayersIcon,        text: "40 tabs open, 0 submitted?",                     tilt: -1.6, anim: "layers" },
  { Icon: CalendarXIcon,     text: "Interview calendar: empty again?",               tilt:  1.4, anim: "calX" },
  { Icon: ZapIcon,           text: "Auto-rejected in 8 seconds?",                    tilt: -0.7, anim: "zap" },
  { Icon: KeyboardIcon,      text: "Re-typing the same info on 10 sites?",           tilt:  1.7, anim: "keyboard" },
  { Icon: MoonIcon,          text: "Tailored all night, heard nothing?",             tilt: -1.3, anim: "moon" },
  { Icon: TargetIcon,        text: "Missed the perfect role overnight?",             tilt:  0.6, anim: "target" },
  { Icon: GhostIcon,         text: "Forgot which company ghosted you?",              tilt: -1.9, anim: "ghost" },
  { Icon: TrendingDownIcon,  text: "Three rounds, then silence?",                    tilt:  1.0, anim: "trend" },
  { Icon: PenIcon,           text: "\u201CDear Hiring Manager\u201D for the 50th time?", tilt: -0.5, anim: "pen" },
  { Icon: CalendarIcon,      text: "Weekend gone, no offers?",                       tilt:  1.3, anim: "calendar" },
  { Icon: BellIcon,          text: "Job alerts piling up, 0 relevant?",              tilt: -1.1, anim: "bell" },
  { Icon: TableIcon,         text: "Spreadsheet row 147 and counting?",              tilt:  0.8, anim: "table" },
];

export function PainPoints() {
  const heading = useReveal<HTMLDivElement>();
  const cloud = useReveal<HTMLDivElement>();

  return (
    <section className="relative w-full bg-[#F6EFE9] px-5 pt-[120px] pb-[100px] md:px-20 md:pt-[50px] md:pb-[160px]">
      <div className="mx-auto flex w-full max-w-[1312px] flex-col items-center">
        <div
          ref={heading.ref}
          className={clsx(
            "reveal flex flex-col items-center text-center",
            heading.isVisible && "is-visible",
          )}
        >
          <h2 className="m-0 max-w-[840px] text-balance font-display text-[40px] font-light leading-[1.1] text-content-primary md:text-[72px] md:leading-[1.05]">
            Job hunting shouldn&rsquo;t feel like&nbsp;this.
          </h2>
        </div>

        <div
          ref={cloud.ref}
          className={clsx(
            "reveal mt-14 flex flex-wrap items-center justify-center gap-2.5 md:mt-20 md:gap-3",
            cloud.isVisible && "is-visible",
          )}
          style={{ "--reveal-delay": "120ms" } as React.CSSProperties}
        >
          {PAINS.map((p, i) => {
            const Icon = p.Icon;
            return (
              <span
                key={`${p.anim}-${i}`}
                className="pain-chip inline-flex cursor-pointer items-center gap-2 rounded-full border border-border-tertiary bg-surface-light px-4 py-2 font-body text-[14px] font-normal text-content-primary shadow-xs-primary transition-[transform,box-shadow,border-color] duration-300 hover:border-brand-coral hover:text-brand-coral hover:shadow-m-primary md:text-[15px]"
                style={{
                  transform: `rotate(${p.tilt}deg)`,
                  animationDelay: `${(i % 7) * 180}ms`,
                }}
              >
                <Icon
                  className={clsx(
                    "pain-icon h-[16px] w-[16px] shrink-0 text-content-secondary md:h-[17px] md:w-[17px]",
                    `pain-icon-${p.anim}`,
                  )}
                />
                <span className="pain-text">{p.text}</span>
              </span>
            );
          })}
        </div>

        <p className="mt-14 max-w-[520px] text-center font-body text-[16px] text-content-secondary md:mt-20 md:text-[18px]">
          You didn&rsquo;t sign up for any of that.
          <br />
          AICareer does the busywork so you can just&hellip; apply.
        </p>
      </div>

      <style>{`
        /* ── Idle float ──────────────────────────────────────────── */
        @keyframes painFloat {
          0%, 100% { translate: 0 0; }
          50%      { translate: 0 -3px; }
        }
        .pain-chip {
          animation: painFloat 6s ease-in-out infinite;
          will-change: transform, translate;
        }
        .pain-chip:hover { animation-play-state: paused; }

        /* ── Text + strike-through ───────────────────────────────── */
        .pain-text {
          position: relative;
          display: inline-block;
        }
        .pain-text::after {
          content: "";
          position: absolute;
          left: -2px;
          right: -2px;
          top: 50%;
          height: 1.5px;
          background: #EB5B55;
          transform: scaleX(0);
          transform-origin: left center;
          transition: transform 0.32s cubic-bezier(0.19, 1, 0.22, 1);
          border-radius: 2px;
          pointer-events: none;
        }
        .pain-chip:hover .pain-text::after {
          transform: scaleX(1);
          transition-delay: 0.08s;
        }

        /* ── Per-icon host rules ─────────────────────────────────── */
        .pain-icon {
          transform-box: fill-box;
          transform-origin: center;
          will-change: transform, opacity;
        }
        /* Children need fill-box too for path-level animations */
        .pain-icon .pain-xmark,
        .pain-icon .pain-layer-top,
        .pain-icon .pain-layer-mid,
        .pain-icon .pain-key,
        .pain-icon .pain-ring,
        .pain-icon .pain-cell {
          transform-box: fill-box;
          transform-origin: center;
        }

        /* GHOST — float up + fade, then settle */
        @keyframes painAnimGhost {
          0%   { transform: translateY(0) scale(1); opacity: 1; }
          45%  { transform: translateY(-4px) scale(1.03); opacity: 0.55; }
          70%  { transform: translateY(-2px) scale(1); opacity: 0.85; }
          100% { transform: translateY(0) scale(1); opacity: 1; }
        }
        .pain-chip:hover .pain-icon-ghost {
          animation: painAnimGhost 700ms cubic-bezier(0.19, 1, 0.22, 1);
        }

        /* PHONE — vibrate shake */
        @keyframes painAnimPhone {
          0%, 100% { transform: translate(0, 0) rotate(0deg); }
          10% { transform: translate(-1px, 0) rotate(-6deg); }
          25% { transform: translate(1px, 0) rotate(6deg); }
          40% { transform: translate(-1px, 0) rotate(-4deg); }
          55% { transform: translate(1px, 0) rotate(4deg); }
          70% { transform: translate(-1px, 0) rotate(-2deg); }
          85% { transform: translate(1px, 0) rotate(2deg); }
        }
        .pain-chip:hover .pain-icon-phone {
          animation: painAnimPhone 450ms linear;
        }

        /* CALENDAR — gentle wobble */
        @keyframes painAnimWobble {
          0%, 100% { transform: rotate(0deg); }
          25% { transform: rotate(-8deg); }
          55% { transform: rotate(6deg); }
          80% { transform: rotate(-3deg); }
        }
        .pain-chip:hover .pain-icon-calendar {
          animation: painAnimWobble 420ms cubic-bezier(0.19, 1, 0.22, 1);
        }

        /* PAPER — flip on Y */
        @keyframes painAnimFlipY {
          0%   { transform: perspective(200px) rotateY(0deg); }
          50%  { transform: perspective(200px) rotateY(180deg); }
          100% { transform: perspective(200px) rotateY(360deg); }
        }
        .pain-chip:hover .pain-icon-paper {
          animation: painAnimFlipY 500ms cubic-bezier(0.65, 0, 0.35, 1);
        }

        /* INBOX — lift as if opening */
        @keyframes painAnimLift {
          0%, 100% { transform: translateY(0) scale(1); }
          50%      { transform: translateY(-2.5px) scale(1.08); }
        }
        .pain-chip:hover .pain-icon-inbox {
          animation: painAnimLift 420ms cubic-bezier(0.19, 1, 0.22, 1);
        }

        /* HOURGLASS — flip on X (turning it over) */
        @keyframes painAnimFlipX {
          0%   { transform: perspective(200px) rotateX(0deg); }
          100% { transform: perspective(200px) rotateX(360deg); }
        }
        .pain-chip:hover .pain-icon-hourglass {
          animation: painAnimFlipX 480ms cubic-bezier(0.65, 0, 0.35, 1);
        }

        /* LAYERS — top/mid layers shift up, bottom stays */
        @keyframes painAnimLayerTop {
          0%, 100% { transform: translateY(0); }
          50%      { transform: translateY(-1.5px); }
        }
        @keyframes painAnimLayerMid {
          0%, 100% { transform: translateY(0); }
          50%      { transform: translateY(-0.75px); }
        }
        .pain-chip:hover .pain-icon-layers .pain-layer-top {
          animation: painAnimLayerTop 420ms cubic-bezier(0.19, 1, 0.22, 1);
        }
        .pain-chip:hover .pain-icon-layers .pain-layer-mid {
          animation: painAnimLayerMid 420ms cubic-bezier(0.19, 1, 0.22, 1) 40ms;
        }

        /* CAL-X — X pulses */
        @keyframes painAnimXPulse {
          0%, 100% { transform: scale(1); opacity: 1; }
          40%      { transform: scale(1.3); opacity: 0.75; }
          70%      { transform: scale(0.95); opacity: 1; }
        }
        .pain-chip:hover .pain-icon-calX .pain-xmark {
          animation: painAnimXPulse 440ms cubic-bezier(0.19, 1, 0.22, 1);
        }

        /* ZAP — flash scale + brightness */
        @keyframes painAnimZap {
          0%, 100% { transform: scale(1); filter: brightness(1); }
          30%      { transform: scale(1.18) rotate(-4deg); filter: brightness(1.4); }
          55%      { transform: scale(0.96) rotate(3deg); filter: brightness(1.1); }
          80%      { transform: scale(1.05); filter: brightness(1.2); }
        }
        .pain-chip:hover .pain-icon-zap {
          animation: painAnimZap 420ms cubic-bezier(0.19, 1, 0.22, 1);
        }

        /* KEYBOARD — staggered key-press dots */
        @keyframes painAnimKey {
          0%, 100% { transform: translateY(0); opacity: 1; }
          50%      { transform: translateY(-1.4px); opacity: 0.5; }
        }
        .pain-chip:hover .pain-icon-keyboard .pain-key-1 { animation: painAnimKey 260ms ease-out 0ms; }
        .pain-chip:hover .pain-icon-keyboard .pain-key-2 { animation: painAnimKey 260ms ease-out 40ms; }
        .pain-chip:hover .pain-icon-keyboard .pain-key-3 { animation: painAnimKey 260ms ease-out 80ms; }
        .pain-chip:hover .pain-icon-keyboard .pain-key-4 { animation: painAnimKey 260ms ease-out 120ms; }
        .pain-chip:hover .pain-icon-keyboard .pain-key-5 { animation: painAnimKey 260ms ease-out 60ms; }
        .pain-chip:hover .pain-icon-keyboard .pain-key-6 { animation: painAnimKey 260ms ease-out 100ms; }
        .pain-chip:hover .pain-icon-keyboard .pain-key-7 { animation: painAnimKey 260ms ease-out 140ms; }
        .pain-chip:hover .pain-icon-keyboard .pain-key-8 { animation: painAnimKey 260ms ease-out 180ms; }

        /* MOON — slow tilt with glow */
        @keyframes painAnimMoon {
          0%, 100% { transform: rotate(0deg); filter: drop-shadow(0 0 0 rgba(235, 91, 85, 0)); }
          50%      { transform: rotate(-22deg); filter: drop-shadow(0 0 2px rgba(235, 91, 85, 0.6)); }
        }
        .pain-chip:hover .pain-icon-moon {
          animation: painAnimMoon 500ms cubic-bezier(0.19, 1, 0.22, 1);
        }

        /* TARGET — concentric rings pulse outward */
        @keyframes painAnimRing {
          0%, 100% { transform: scale(1); opacity: 1; }
          50%      { transform: scale(1.18); opacity: 0.55; }
        }
        .pain-chip:hover .pain-icon-target .pain-ring-3 { animation: painAnimRing 360ms cubic-bezier(0.19, 1, 0.22, 1) 0ms; }
        .pain-chip:hover .pain-icon-target .pain-ring-2 { animation: painAnimRing 360ms cubic-bezier(0.19, 1, 0.22, 1) 70ms; }
        .pain-chip:hover .pain-icon-target .pain-ring-1 { animation: painAnimRing 360ms cubic-bezier(0.19, 1, 0.22, 1) 140ms; }

        /* TREND-DOWN — the line falls */
        @keyframes painAnimFall {
          0%   { transform: translateY(0); }
          60%  { transform: translateY(2.5px); }
          100% { transform: translateY(0); }
        }
        .pain-chip:hover .pain-icon-trend {
          animation: painAnimFall 500ms cubic-bezier(0.55, 0.1, 0.35, 1);
        }

        /* PEN — scribble (translate + rotate jitter) */
        @keyframes painAnimScribble {
          0%, 100% { transform: translate(0, 0) rotate(0deg); }
          20% { transform: translate(-1px, 1px) rotate(-6deg); }
          40% { transform: translate(1.5px, -0.5px) rotate(5deg); }
          60% { transform: translate(-1px, 0.5px) rotate(-4deg); }
          80% { transform: translate(1px, -1px) rotate(3deg); }
        }
        .pain-chip:hover .pain-icon-pen {
          animation: painAnimScribble 420ms cubic-bezier(0.19, 1, 0.22, 1);
        }

        /* BELL — ring shake */
        @keyframes painAnimBell {
          0%, 100% { transform: rotate(0deg); }
          15% { transform: rotate(-18deg); }
          35% { transform: rotate(14deg); }
          55% { transform: rotate(-10deg); }
          75% { transform: rotate(6deg); }
        }
        .pain-chip:hover .pain-icon-bell {
          animation: painAnimBell 480ms cubic-bezier(0.36, 0, 0.66, 1);
          transform-origin: 50% 20%;
        }

        /* TABLE — staggered cell flashes */
        @keyframes painAnimCell {
          0%, 100% { opacity: 0; }
          50%      { opacity: 0.45; }
        }
        .pain-chip:hover .pain-icon-table .pain-cell-1 { animation: painAnimCell 300ms ease-out 0ms; }
        .pain-chip:hover .pain-icon-table .pain-cell-2 { animation: painAnimCell 300ms ease-out 110ms; }
        .pain-chip:hover .pain-icon-table .pain-cell-3 { animation: painAnimCell 300ms ease-out 220ms; }

        @media (prefers-reduced-motion: reduce) {
          .pain-chip { animation: none; }
          .pain-icon,
          .pain-icon * {
            animation: none !important;
          }
          .pain-text::after {
            transition: none;
          }
        }
      `}</style>
    </section>
  );
}
