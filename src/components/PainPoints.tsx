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
type Pain = { Icon: IconCmp; text: string; fix: string; tilt: number; anim: string };

const PAINS: Pain[] = [
  { Icon: GhostIcon,         text: "Ghosted for the fifth time?",                    fix: "We follow up \u2014 always.",       tilt: -1.5, anim: "ghost" },
  { Icon: PhoneOffIcon,      text: "Zero callbacks this month?",                     fix: "We chase every recruiter.",         tilt:  1.2, anim: "phone" },
  { Icon: CalendarIcon,      text: "Another Sunday lost to applications?",           fix: "You rest. We apply.",               tilt: -0.8, anim: "calendar" },
  { Icon: FileTextIcon,      text: "CV at version 38?",                              fix: "Tuned per job.",                    tilt:  1.8, anim: "paper" },
  { Icon: InboxIcon,         text: "Inbox full of \u201Cunfortunately\u201D?",       fix: "Only \u201Cyes\u201D lands here.",  tilt: -1.2, anim: "inbox" },
  { Icon: HourglassIcon,     text: "Still waiting after 3 weeks?",                   fix: "We nudge for you.",                 tilt:  0.9, anim: "hourglass" },
  { Icon: LayersIcon,        text: "40 tabs open, 0 submitted?",                     fix: "All jobs, one tab.",                tilt: -1.6, anim: "layers" },
  { Icon: CalendarXIcon,     text: "Interview calendar: empty again?",               fix: "Interviews, booked.",               tilt:  1.4, anim: "calX" },
  { Icon: ZapIcon,           text: "Auto-rejected in 8 seconds?",                    fix: "Keyword-perfect, always.",          tilt: -0.7, anim: "zap" },
  { Icon: KeyboardIcon,      text: "Re-typing the same info on 10 sites?",           fix: "One profile. Every site.",          tilt:  1.7, anim: "keyboard" },
  { Icon: MoonIcon,          text: "Tailored all night, heard nothing?",             fix: "We tailor. You sleep.",             tilt: -1.3, anim: "moon" },
  { Icon: TargetIcon,        text: "Missed the perfect role overnight?",             fix: "We watch 24/7.",                    tilt:  0.6, anim: "target" },
  { Icon: GhostIcon,         text: "Forgot which company ghosted you?",              fix: "Every thread, tracked.",            tilt: -1.9, anim: "ghost" },
  { Icon: TrendingDownIcon,  text: "Three rounds, then silence?",                    fix: "We chase every round.",             tilt:  1.0, anim: "trend" },
  { Icon: PenIcon,           text: "\u201CDear Hiring Manager\u201D for the 50th time?", fix: "Personal, every time.",         tilt: -0.5, anim: "pen" },
  { Icon: CalendarIcon,      text: "Weekend gone, no offers?",                       fix: "Offers by Monday.",                 tilt:  1.3, anim: "calendar" },
  { Icon: BellIcon,          text: "Job alerts piling up, 0 relevant?",              fix: "Only real matches.",                tilt: -1.1, anim: "bell" },
  { Icon: TableIcon,         text: "Spreadsheet row 147 and counting?",              fix: "Zero spreadsheets. Ever.",          tilt:  0.8, anim: "table" },
];

export function PainPoints() {
  const heading = useReveal<HTMLDivElement>();
  const cloud = useReveal<HTMLDivElement>();

  return (
    <section className="relative isolate w-full overflow-hidden px-5 pt-[120px] pb-[100px] md:px-20 md:pt-[50px] md:pb-[160px]">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,#f5f6f1_0%,#eff2ea_58%,#ecefe7_100%)]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-[220px] bg-[radial-gradient(circle_at_50%_0%,rgba(255,255,255,0.82),rgba(255,255,255,0)_72%)] md:h-[280px]"
      />

      <div className="relative z-10 mx-auto flex w-full max-w-[1312px] flex-col items-center">
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
                className="pain-chip"
                style={{
                  transform: `rotate(${p.tilt}deg)`,
                  animationDelay: `${(i % 7) * 180}ms`,
                }}
              >
                <span className="pain-chip-flipper">
                  <span className="pain-chip-face pain-chip-front">
                    <Icon className="pain-front-icon" />
                    <span>{p.text}</span>
                  </span>
                  <span className="pain-chip-face pain-chip-back">
                    <Icon className={clsx("pain-icon", `pain-icon-${p.anim}`)} />
                    <span>{p.fix}</span>
                  </span>
                </span>
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
        /* ── Chip shell (flip container) ─────────────────────────── */
        @keyframes painFloat {
          0%, 100% { translate: 0 0; }
          50%      { translate: 0 -3px; }
        }
        .pain-chip {
          display: inline-block;
          cursor: pointer;
          perspective: 900px;
          animation: painFloat 6s ease-in-out infinite;
          will-change: transform, translate;
        }
        .pain-chip:hover { animation-play-state: paused; }

        .pain-chip-flipper {
          position: relative;
          display: inline-block;
          transform-style: preserve-3d;
          transition: transform 0.6s cubic-bezier(0.6, 0.04, 0.3, 1.02) 0s;
        }
        .pain-chip:hover .pain-chip-flipper {
          transform: rotateY(180deg);
          transition-delay: 0.3s;
        }

        .pain-chip-face {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 8px 16px;
          border-radius: 9999px;
          font-family: var(--font-body);
          font-size: 14px;
          line-height: 1.3;
          font-weight: 400;
          white-space: nowrap;
          backface-visibility: hidden;
          -webkit-backface-visibility: hidden;
          box-shadow: var(--shadow-xs-primary);
        }
        @media (min-width: 768px) {
          .pain-chip-face { font-size: 15px; }
        }

        .pain-chip-front {
          position: relative;
          background: var(--color-surface-light);
          border: 1px solid var(--color-border-tertiary);
          color: var(--color-content-primary);
          transition: box-shadow 0.3s, border-color 0.3s, color 0.3s;
        }
        .pain-chip:hover .pain-chip-front {
          border-color: var(--color-brand-coral);
          color: var(--color-brand-coral);
          box-shadow: var(--shadow-m-primary);
        }

        /* Text strike-through — wipes in before the flip, retracts after the flip-back. */
        .pain-chip-front > span:last-child {
          position: relative;
        }
        .pain-chip-front > span:last-child::after {
          content: "";
          position: absolute;
          left: 0;
          right: 0;
          top: 55%;
          height: 1.5px;
          background: var(--color-brand-coral);
          transform: scaleX(0);
          transform-origin: left center;
          transition: transform 0.3s cubic-bezier(0.19, 1, 0.22, 1) 0.6s;
          pointer-events: none;
        }
        .pain-chip:hover .pain-chip-front > span:last-child::after {
          transform: scaleX(1);
          transition-delay: 0s;
        }

        /* Phone-off diagonal line: visible on the front (problem state),
           the back face hides it so the icon reads as "we answer". */
        .pain-chip-back .pain-phone-strike { display: none; }

        .pain-chip-back {
          position: absolute;
          left: 0;
          top: 0;
          width: 100%;
          height: 100%;
          justify-content: center;
          transform: rotateY(180deg);
          background: var(--color-highlight-green-idle);
          border: 1px solid var(--color-brand-green);
          color: var(--color-content-success);
          box-shadow: var(--shadow-m-primary);
        }

        .pain-front-icon {
          width: 16px;
          height: 16px;
          flex-shrink: 0;
          color: var(--color-content-secondary);
          transition: color 0.3s;
        }
        .pain-chip:hover .pain-front-icon {
          color: var(--color-brand-coral);
        }
        @media (min-width: 768px) {
          .pain-front-icon { width: 17px; height: 17px; }
        }
        .pain-chip-back .pain-icon {
          width: 16px;
          height: 16px;
          flex-shrink: 0;
          color: var(--color-content-success);
        }
        @media (min-width: 768px) {
          .pain-chip-back .pain-icon { width: 17px; height: 17px; }
        }

        /* ── Icon animation plumbing (transform-box so SVG children
             rotate around their own center, not the viewBox origin) ── */
        .pain-icon {
          transform-box: fill-box;
          transform-origin: center;
          will-change: transform, opacity;
        }
        .pain-icon .pain-xmark,
        .pain-icon .pain-layer-top,
        .pain-icon .pain-layer-mid,
        .pain-icon .pain-key,
        .pain-icon .pain-ring,
        .pain-icon .pain-cell {
          transform-box: fill-box;
          transform-origin: center;
        }

        /* ── Per-icon keyframes ──────────────────────────────────── */
        @keyframes painAnimGhost {
          0%   { transform: translateY(0) scale(1); opacity: 1; }
          45%  { transform: translateY(-4px) scale(1.03); opacity: 0.55; }
          70%  { transform: translateY(-2px) scale(1); opacity: 0.85; }
          100% { transform: translateY(0) scale(1); opacity: 1; }
        }
        @keyframes painAnimPhone {
          0%, 100% { transform: translate(0, 0) rotate(0deg); }
          10% { transform: translate(-1px, 0) rotate(-6deg); }
          25% { transform: translate(1px, 0) rotate(6deg); }
          40% { transform: translate(-1px, 0) rotate(-4deg); }
          55% { transform: translate(1px, 0) rotate(4deg); }
          70% { transform: translate(-1px, 0) rotate(-2deg); }
          85% { transform: translate(1px, 0) rotate(2deg); }
        }
        @keyframes painAnimWobble {
          0%, 100% { transform: rotate(0deg); }
          25% { transform: rotate(-8deg); }
          55% { transform: rotate(6deg); }
          80% { transform: rotate(-3deg); }
        }
        @keyframes painAnimFlipY {
          0%   { transform: perspective(200px) rotateY(0deg); }
          50%  { transform: perspective(200px) rotateY(180deg); }
          100% { transform: perspective(200px) rotateY(360deg); }
        }
        @keyframes painAnimLift {
          0%, 100% { transform: translateY(0) scale(1); }
          50%      { transform: translateY(-2.5px) scale(1.08); }
        }
        @keyframes painAnimFlipX {
          0%   { transform: perspective(200px) rotateX(0deg); }
          100% { transform: perspective(200px) rotateX(360deg); }
        }
        @keyframes painAnimLayerTop {
          0%, 100% { transform: translateY(0); }
          50%      { transform: translateY(-1.5px); }
        }
        @keyframes painAnimLayerMid {
          0%, 100% { transform: translateY(0); }
          50%      { transform: translateY(-0.75px); }
        }
        @keyframes painAnimXPulse {
          0%, 100% { transform: scale(1); opacity: 1; }
          40%      { transform: scale(1.3); opacity: 0.75; }
          70%      { transform: scale(0.95); opacity: 1; }
        }
        @keyframes painAnimZap {
          0%, 100% { transform: scale(1); filter: brightness(1); }
          30%      { transform: scale(1.18) rotate(-4deg); filter: brightness(1.4); }
          55%      { transform: scale(0.96) rotate(3deg); filter: brightness(1.1); }
          80%      { transform: scale(1.05); filter: brightness(1.2); }
        }
        @keyframes painAnimKey {
          0%, 100% { transform: translateY(0); opacity: 1; }
          50%      { transform: translateY(-1.4px); opacity: 0.5; }
        }
        @keyframes painAnimMoon {
          0%, 100% { transform: rotate(0deg); filter: drop-shadow(0 0 0 rgba(5, 123, 64, 0)); }
          50%      { transform: rotate(-22deg); filter: drop-shadow(0 0 2px rgba(5, 123, 64, 0.55)); }
        }
        @keyframes painAnimRing {
          0%, 100% { transform: scale(1); opacity: 1; }
          50%      { transform: scale(1.18); opacity: 0.55; }
        }
        @keyframes painAnimFall {
          0%   { transform: translateY(0); }
          60%  { transform: translateY(2.5px); }
          100% { transform: translateY(0); }
        }
        @keyframes painAnimScribble {
          0%, 100% { transform: translate(0, 0) rotate(0deg); }
          20% { transform: translate(-1px, 1px) rotate(-6deg); }
          40% { transform: translate(1.5px, -0.5px) rotate(5deg); }
          60% { transform: translate(-1px, 0.5px) rotate(-4deg); }
          80% { transform: translate(1px, -1px) rotate(3deg); }
        }
        @keyframes painAnimBell {
          0%, 100% { transform: rotate(0deg); }
          15% { transform: rotate(-18deg); }
          35% { transform: rotate(14deg); }
          55% { transform: rotate(-10deg); }
          75% { transform: rotate(6deg); }
        }
        @keyframes painAnimCell {
          0%, 100% { opacity: 0; }
          50%      { opacity: 0.45; }
        }

        /* ── Hover rules — animations fire on the BACK face only, delayed
             until the flip (300ms wait + 600ms flip) is past its midpoint
             (≈ 600ms from hover-start) so the icon plays in full view. ── */
        .pain-chip:hover .pain-chip-back .pain-icon-ghost {
          animation: painAnimGhost 700ms cubic-bezier(0.19, 1, 0.22, 1) 650ms;
        }
        .pain-chip:hover .pain-chip-back .pain-icon-phone {
          animation: painAnimPhone 450ms linear 650ms;
        }
        .pain-chip:hover .pain-chip-back .pain-icon-calendar {
          animation: painAnimWobble 420ms cubic-bezier(0.19, 1, 0.22, 1) 650ms;
        }
        .pain-chip:hover .pain-chip-back .pain-icon-paper {
          animation: painAnimFlipY 500ms cubic-bezier(0.65, 0, 0.35, 1) 650ms;
        }
        .pain-chip:hover .pain-chip-back .pain-icon-inbox {
          animation: painAnimLift 420ms cubic-bezier(0.19, 1, 0.22, 1) 650ms;
        }
        .pain-chip:hover .pain-chip-back .pain-icon-hourglass {
          animation: painAnimFlipX 480ms cubic-bezier(0.65, 0, 0.35, 1) 650ms;
        }
        .pain-chip:hover .pain-chip-back .pain-icon-layers .pain-layer-top {
          animation: painAnimLayerTop 420ms cubic-bezier(0.19, 1, 0.22, 1) 650ms;
        }
        .pain-chip:hover .pain-chip-back .pain-icon-layers .pain-layer-mid {
          animation: painAnimLayerMid 420ms cubic-bezier(0.19, 1, 0.22, 1) 690ms;
        }
        .pain-chip:hover .pain-chip-back .pain-icon-calX .pain-xmark {
          animation: painAnimXPulse 440ms cubic-bezier(0.19, 1, 0.22, 1) 650ms;
        }
        .pain-chip:hover .pain-chip-back .pain-icon-zap {
          animation: painAnimZap 420ms cubic-bezier(0.19, 1, 0.22, 1) 650ms;
        }
        .pain-chip:hover .pain-chip-back .pain-icon-keyboard .pain-key-1 { animation: painAnimKey 260ms ease-out 650ms; }
        .pain-chip:hover .pain-chip-back .pain-icon-keyboard .pain-key-2 { animation: painAnimKey 260ms ease-out 690ms; }
        .pain-chip:hover .pain-chip-back .pain-icon-keyboard .pain-key-3 { animation: painAnimKey 260ms ease-out 730ms; }
        .pain-chip:hover .pain-chip-back .pain-icon-keyboard .pain-key-4 { animation: painAnimKey 260ms ease-out 770ms; }
        .pain-chip:hover .pain-chip-back .pain-icon-keyboard .pain-key-5 { animation: painAnimKey 260ms ease-out 710ms; }
        .pain-chip:hover .pain-chip-back .pain-icon-keyboard .pain-key-6 { animation: painAnimKey 260ms ease-out 750ms; }
        .pain-chip:hover .pain-chip-back .pain-icon-keyboard .pain-key-7 { animation: painAnimKey 260ms ease-out 790ms; }
        .pain-chip:hover .pain-chip-back .pain-icon-keyboard .pain-key-8 { animation: painAnimKey 260ms ease-out 830ms; }
        .pain-chip:hover .pain-chip-back .pain-icon-moon {
          animation: painAnimMoon 500ms cubic-bezier(0.19, 1, 0.22, 1) 650ms;
        }
        .pain-chip:hover .pain-chip-back .pain-icon-target .pain-ring-3 { animation: painAnimRing 360ms cubic-bezier(0.19, 1, 0.22, 1) 650ms; }
        .pain-chip:hover .pain-chip-back .pain-icon-target .pain-ring-2 { animation: painAnimRing 360ms cubic-bezier(0.19, 1, 0.22, 1) 720ms; }
        .pain-chip:hover .pain-chip-back .pain-icon-target .pain-ring-1 { animation: painAnimRing 360ms cubic-bezier(0.19, 1, 0.22, 1) 790ms; }
        .pain-chip:hover .pain-chip-back .pain-icon-trend {
          animation: painAnimFall 500ms cubic-bezier(0.55, 0.1, 0.35, 1) 650ms;
        }
        .pain-chip:hover .pain-chip-back .pain-icon-pen {
          animation: painAnimScribble 420ms cubic-bezier(0.19, 1, 0.22, 1) 650ms;
        }
        .pain-chip:hover .pain-chip-back .pain-icon-bell {
          animation: painAnimBell 480ms cubic-bezier(0.36, 0, 0.66, 1) 650ms;
          transform-origin: 50% 20%;
        }
        .pain-chip:hover .pain-chip-back .pain-icon-table .pain-cell-1 { animation: painAnimCell 300ms ease-out 650ms; }
        .pain-chip:hover .pain-chip-back .pain-icon-table .pain-cell-2 { animation: painAnimCell 300ms ease-out 760ms; }
        .pain-chip:hover .pain-chip-back .pain-icon-table .pain-cell-3 { animation: painAnimCell 300ms ease-out 870ms; }

        @media (prefers-reduced-motion: reduce) {
          .pain-chip { animation: none; }
          .pain-chip-flipper { transition: none; }
          .pain-chip:hover .pain-chip-flipper { transform: none; }
          .pain-icon,
          .pain-icon * {
            animation: none !important;
          }
        }
      `}</style>
    </section>
  );
}
