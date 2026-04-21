"use client";

import clsx from "clsx";
import { useReveal } from "@/hooks/useReveal";

type Cell = { ok: boolean; note?: string };
type Row = { icon: string; feature: string; us: Cell; ai: Cell; manual: Cell };

const ROWS: Row[] = [
  {
    icon: "◉",
    feature: "Fully integrated experience",
    us:     { ok: true,  note: "All in one" },
    ai:     { ok: false },
    manual: { ok: false },
  },
  {
    icon: "✎",
    feature: "End-to-end application",
    us:     { ok: true,  note: "Review, then apply with your profile" },
    ai:     { ok: false },
    manual: { ok: false },
  },
  {
    icon: "⏱",
    feature: "Time spent per job",
    us:     { ok: true,  note: "A few seconds" },
    ai:     { ok: true,  note: "A few minutes" },
    manual: { ok: false, note: "15+ minutes" },
  },
  {
    icon: "✦",
    feature: "AI resume optimization",
    us:     { ok: true,  note: "Tailored resume for each job" },
    ai:     { ok: true,  note: "Requires manual prompting" },
    manual: { ok: false },
  },
  {
    icon: "✉︎",
    feature: "AI-generated cover letter",
    us:     { ok: true,  note: "Tailored letter per job" },
    ai:     { ok: true,  note: "Prompts + copy-paste" },
    manual: { ok: false },
  },
  {
    icon: "☷",
    feature: "Real-time job listings built in",
    us:     { ok: true,  note: "Curated & updated daily" },
    ai:     { ok: false },
    manual: { ok: true,  note: "Job boards only" },
  },
  {
    icon: "◎",
    feature: "Smart job matching",
    us:     { ok: true,  note: "Matches roles to your experience" },
    ai:     { ok: false },
    manual: { ok: false },
  },
  {
    icon: "≡",
    feature: "Automatic application tracking",
    us:     { ok: true,  note: "Tracks every application & status" },
    ai:     { ok: false },
    manual: { ok: false },
  },
  {
    icon: "✧",
    feature: "Consistent, professional output",
    us:     { ok: true,  note: "Polished tone & formatting" },
    ai:     { ok: true },
    manual: { ok: true,  note: "Manual and slow" },
  },
  {
    icon: "▢",
    feature: "Mobile + web access",
    us:     { ok: true,  note: "Fully supported on web & mobile" },
    ai:     { ok: true },
    manual: { ok: true,  note: "Depends on job board" },
  },
  {
    icon: "☑",
    feature: "User control & review",
    us:     { ok: true,  note: "Review + edit before submitting" },
    ai:     { ok: false },
    manual: { ok: false },
  },
];

function Mark({ cell, accent }: { cell: Cell; accent?: boolean }) {
  return (
    <div className="flex min-h-[44px] items-start gap-2">
      <span
        aria-hidden="true"
        className={clsx(
          "mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full text-[12px] font-medium",
          cell.ok
            ? accent
              ? "bg-brand-coral text-surface-light"
              : "bg-highlight-green-idle text-content-success"
            : "bg-surface-dim text-content-secondary",
        )}
      >
        {cell.ok ? "✓" : "✕"}
      </span>
      {cell.note && (
        <span
          className={clsx(
            "font-body text-[13px] leading-[1.4] md:text-[14px]",
            cell.ok ? "text-content-primary" : "text-content-secondary",
          )}
        >
          {cell.note}
        </span>
      )}
    </div>
  );
}

export function ComparisonTable() {
  const heading = useReveal<HTMLDivElement>();
  const table = useReveal<HTMLDivElement>();

  return (
    <section className="relative w-full bg-surface-light px-5 py-[100px] md:px-20 md:py-[160px]">
      <div className="mx-auto flex w-full max-w-[1312px] flex-col items-center">
        <div
          ref={heading.ref}
          className={clsx(
            "reveal flex flex-col items-center text-center",
            heading.isVisible && "is-visible",
          )}
        >
          <span className="mb-6 inline-flex items-center gap-2 rounded-full border border-brand-coral/30 bg-highlight-coral-idle px-4 py-1.5 font-body text-[13px] font-medium text-brand-coral">
            <span aria-hidden="true">⚖</span>
            <span>Why not just ChatGPT?</span>
          </span>
          <h2 className="m-0 max-w-[840px] text-balance font-display text-[40px] font-light leading-[1.1] text-content-primary md:text-[64px] md:leading-[1.05]">
            AICareer vs. everything else you&rsquo;ve&nbsp;tried.
          </h2>
          <p className="mx-auto mt-6 max-w-[620px] font-body text-[16px] text-content-secondary md:text-[18px]">
            An AI chat writes a cover letter. A spreadsheet tracks what you
            applied to. We do all of it, end-to-end, while you focus on the
            interview.
          </p>
        </div>

        <div
          ref={table.ref}
          className={clsx(
            "reveal mt-14 w-full overflow-hidden rounded-l border border-border-tertiary bg-surface-primary shadow-l-primary md:mt-20",
            table.isVisible && "is-visible",
          )}
          style={{ "--reveal-delay": "120ms" } as React.CSSProperties}
        >
          {/* Header row */}
          <div className="grid grid-cols-[minmax(160px,1.3fr)_1.2fr_1.2fr_1.2fr] items-center gap-4 border-b border-border-tertiary bg-surface-light px-5 py-5 md:px-8">
            <div />
            <div className="flex flex-col">
              <span className="inline-flex items-center gap-2 font-display text-[18px] font-medium text-brand-coral md:text-[22px]">
                <span
                  aria-hidden="true"
                  className="flex h-7 w-7 items-center justify-center rounded-full bg-brand-coral text-[12px] font-medium text-surface-light md:h-8 md:w-8 md:text-[13px]"
                >
                  AI
                </span>
                AICareer
              </span>
              <span className="mt-1 font-body text-[12px] text-content-secondary md:text-[13px]">
                End-to-end AI recruiter
              </span>
            </div>
            <div className="flex flex-col">
              <span className="font-display text-[18px] font-medium text-content-primary md:text-[22px]">
                AI tools
              </span>
              <span className="mt-1 font-body text-[12px] text-content-secondary md:text-[13px]">
                ChatGPT, Claude, Gemini&hellip;
              </span>
            </div>
            <div className="flex flex-col">
              <span className="font-display text-[18px] font-medium text-content-primary md:text-[22px]">
                Traditional
              </span>
              <span className="mt-1 font-body text-[12px] text-content-secondary md:text-[13px]">
                Spreadsheets & job boards
              </span>
            </div>
          </div>

          {/* Rows */}
          {ROWS.map((row, i) => (
            <div
              key={row.feature}
              className={clsx(
                "grid grid-cols-[minmax(160px,1.3fr)_1.2fr_1.2fr_1.2fr] items-start gap-4 px-5 py-4 md:px-8",
                i !== ROWS.length - 1 && "border-b border-border-tertiary",
                i % 2 === 1 && "bg-surface-light/60",
              )}
            >
              <div className="flex items-start gap-3 pt-0.5">
                <span
                  aria-hidden="true"
                  className="flex h-7 w-7 shrink-0 items-center justify-center rounded-s bg-surface-light text-[14px] text-content-secondary shadow-xs-primary md:h-8 md:w-8"
                >
                  {row.icon}
                </span>
                <span className="font-body text-[14px] font-medium leading-[1.35] text-content-primary md:text-[15px]">
                  {row.feature}
                </span>
              </div>
              <Mark cell={row.us} accent />
              <Mark cell={row.ai} />
              <Mark cell={row.manual} />
            </div>
          ))}
        </div>

        <a
          href="https://aircareer.com"
          className="mt-12 inline-flex h-[50px] items-center gap-2 rounded-m bg-surface-inverted px-6 font-body text-[16px] font-medium text-content-inverted transition-opacity hover:opacity-90 md:mt-16"
        >
          <span>Try AICareer today</span>
          <span aria-hidden="true" className="transition-transform duration-300 group-hover:translate-x-0.5">
            →
          </span>
        </a>
      </div>
    </section>
  );
}
