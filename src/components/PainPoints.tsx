"use client";

import clsx from "clsx";
import { useReveal } from "@/hooks/useReveal";

type Pain = { icon: string; text: string; tilt: number };

const PAINS: Pain[] = [
  { icon: "✉︎",  text: "Forgot to follow up?",            tilt: -1.5 },
  { icon: "⌛",  text: "Hours applying, no replies?",      tilt:  1.2 },
  { icon: "↻",  text: "Reapplying by accident?",          tilt: -0.8 },
  { icon: "⌨",  text: "Re-entering the same info again?", tilt:  1.8 },
  { icon: "☷",  text: "Lost track of applications?",      tilt: -1.2 },
  { icon: "✎",  text: "Copy-pasting cover letters?",      tilt:  0.9 },
  { icon: "◔",  text: "No idea if anyone saw it?",        tilt: -1.6 },
  { icon: "✦",  text: "Rewriting resumes nonstop?",       tilt:  1.4 },
  { icon: "❒",  text: "Duplicate apps on every site?",    tilt: -0.7 },
  { icon: "∞",  text: "Endless scrolling for jobs?",      tilt:  1.7 },
  { icon: "☺",  text: 'Writing "Dear Hiring Manager" again?', tilt: -1.3 },
  { icon: "⚑",  text: "Job hunt feels like a job?",       tilt:  0.6 },
  { icon: "☰",  text: "Manual spreadsheet tracking?",     tilt: -1.9 },
  { icon: "◎",  text: "Others landing faster than you?",  tilt:  1.0 },
  { icon: "♨",  text: "Feeling burnt out?",               tilt: -0.5 },
  { icon: "◫",  text: "Job search feels endless?",        tilt:  1.3 },
  { icon: "◉",  text: "Too many job sites to check?",     tilt: -1.1 },
  { icon: "☁",  text: "Can't remember last app?",         tilt:  0.8 },
  { icon: "◐",  text: "Tired of job board spam?",         tilt: -1.4 },
  { icon: "≡",  text: "Stuck using spreadsheets?",        tilt:  1.6 },
];

export function PainPoints() {
  const heading = useReveal<HTMLDivElement>();
  const cloud = useReveal<HTMLDivElement>();

  return (
    <section className="relative w-full bg-[#F6EFE9] px-5 py-[100px] md:px-20 md:py-[160px]">
      <div className="mx-auto flex w-full max-w-[1312px] flex-col items-center">
        <div
          ref={heading.ref}
          className={clsx(
            "reveal flex flex-col items-center text-center",
            heading.isVisible && "is-visible",
          )}
        >
          <span className="mb-6 inline-flex items-center gap-2 rounded-full border border-brand-coral/30 bg-highlight-coral-idle px-4 py-1.5 font-body text-[13px] font-medium text-brand-coral">
            <span aria-hidden="true">✦</span>
            <span>Sound familiar?</span>
          </span>
          <h2 className="m-0 max-w-[840px] font-display text-[40px] font-light leading-[1.1] text-content-primary md:text-[72px] md:leading-[1.05]">
            Tired of endless job searching? Here&rsquo;s what&rsquo;s really
            holding you back.
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
          {PAINS.map((p, i) => (
            <span
              key={p.text}
              className="pain-chip inline-flex items-center gap-2 rounded-full border border-border-tertiary bg-surface-light px-4 py-2 font-body text-[14px] font-normal text-content-primary shadow-xs-primary transition-[transform,box-shadow,border-color] duration-300 hover:border-brand-coral hover:text-brand-coral hover:shadow-m-primary md:text-[15px]"
              style={{
                transform: `rotate(${p.tilt}deg)`,
                animationDelay: `${(i % 7) * 180}ms`,
              }}
            >
              <span
                aria-hidden="true"
                className="text-[16px] leading-none text-content-secondary md:text-[17px]"
              >
                {p.icon}
              </span>
              <span>{p.text}</span>
            </span>
          ))}
        </div>

        <p className="mt-14 max-w-[520px] text-center font-body text-[16px] text-content-secondary md:mt-20 md:text-[18px]">
          You didn&rsquo;t sign up for any of that.
          <br />
          AICareer does the busywork so you can just&hellip; apply.
        </p>
      </div>

      <style>{`
        @keyframes painFloat {
          0%, 100% { translate: 0 0; }
          50%      { translate: 0 -3px; }
        }
        .pain-chip {
          animation: painFloat 6s ease-in-out infinite;
          will-change: transform, translate;
        }
        .pain-chip:hover {
          animation-play-state: paused;
        }
        @media (prefers-reduced-motion: reduce) {
          .pain-chip { animation: none; }
        }
      `}</style>
    </section>
  );
}
