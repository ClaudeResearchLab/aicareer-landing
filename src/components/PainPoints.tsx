"use client";

import clsx from "clsx";
import { useReveal } from "@/hooks/useReveal";

type Pain = { icon: string; text: string; tilt: number };

const PAINS: Pain[] = [
  { icon: "◔",  text: "Ghosted for the fifth time?",              tilt: -1.5 },
  { icon: "◎",  text: "Zero callbacks this month?",               tilt:  1.2 },
  { icon: "⚑",  text: "Another Sunday lost to applications?",     tilt: -0.8 },
  { icon: "✦",  text: "CV at version 38?",                        tilt:  1.8 },
  { icon: "✉︎",  text: "Inbox full of \u201Cunfortunately\u201D?", tilt: -1.2 },
  { icon: "⌛",  text: "Still waiting after 3 weeks?",             tilt:  0.9 },
  { icon: "❒",  text: "40 tabs open, 0 submitted?",               tilt: -1.6 },
  { icon: "☰",  text: "Interview calendar: empty again?",         tilt:  1.4 },
  { icon: "↻",  text: "Auto-rejected in 8 seconds?",              tilt: -0.7 },
  { icon: "⌨",  text: "Re-typing the same info on 10 sites?",     tilt:  1.7 },
  { icon: "✎",  text: "Tailored all night, heard nothing?",       tilt: -1.3 },
  { icon: "∞",  text: "Missed the perfect role overnight?",       tilt:  0.6 },
  { icon: "☁",  text: "Forgot which company ghosted you?",        tilt: -1.9 },
  { icon: "◫",  text: "Three rounds, then silence?",              tilt:  1.0 },
  { icon: "☺",  text: "\u201CDear Hiring Manager\u201D for the 50th time?", tilt: -0.5 },
  { icon: "♨",  text: "Weekend gone, no offers?",                 tilt:  1.3 },
  { icon: "◐",  text: "Job alerts piling up, 0 relevant?",        tilt: -1.1 },
  { icon: "≡",  text: "Spreadsheet row 147 and counting?",        tilt:  0.8 },
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
          <h2 className="m-0 max-w-[840px] font-display text-[40px] font-light leading-[1.1] text-content-primary md:text-[72px] md:leading-[1.05]">
            Job hunting shouldn&rsquo;t feel like this.
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
