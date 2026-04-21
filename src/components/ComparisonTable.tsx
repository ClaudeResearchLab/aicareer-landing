"use client";

import clsx from "clsx";
import { useReveal } from "@/hooks/useReveal";

type Cell = { ok: boolean; note?: string; scale?: 1 | 2 | 3 };
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
    us:     { ok: true,  note: "A few seconds", scale: 1 },
    ai:     { ok: true,  note: "A few minutes", scale: 2 },
    manual: { ok: false, note: "15+ minutes",   scale: 3 },
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

type ColumnKey = "us" | "ai" | "manual";
type Column = {
  key: ColumnKey;
  name: string;
  subtitle: string;
  accent?: boolean;
  badge?: string;
};

const COLUMNS: Column[] = [
  { key: "us",     name: "AICareer",    subtitle: "End-to-end AI recruiter",    accent: true, badge: "Recommended" },
  { key: "ai",     name: "AI tools",    subtitle: "ChatGPT, Claude, Gemini…" },
  { key: "manual", name: "Traditional", subtitle: "Spreadsheets & job boards" },
];

const DOT_COLORS: Record<1 | 2 | 3, string> = {
  1: "bg-brand-green",
  2: "bg-brand-orange",
  3: "bg-brand-coral",
};

const GRID_COLS = "grid-cols-[minmax(140px,1.2fr)_1.3fr_1fr_1fr]";

function TimeDots({
  level,
  className,
}: {
  level: 1 | 2 | 3;
  className?: string;
}) {
  const color = DOT_COLORS[level];
  return (
    <span
      aria-hidden="true"
      className={clsx("inline-flex items-center gap-1", className)}
    >
      {[1, 2, 3].map((i) => (
        <span
          key={i}
          className={clsx(
            "block h-[5px] w-[5px] rounded-full",
            i <= level ? color : "bg-border-tertiary",
          )}
        />
      ))}
    </span>
  );
}

function CheckCircle({
  ok,
  accent,
  className,
}: {
  ok: boolean;
  accent?: boolean;
  className?: string;
}) {
  return (
    <span
      aria-hidden="true"
      className={clsx(
        "flex h-5 w-5 shrink-0 items-center justify-center rounded-full text-[12px] font-medium",
        ok
          ? accent
            ? "bg-brand-green text-surface-light"
            : "bg-highlight-green-idle text-content-success"
          : "bg-surface-dim text-content-secondary",
        className,
      )}
    >
      {ok ? "✓" : "✕"}
    </span>
  );
}

function Mark({
  cell,
  accent,
  divider,
}: {
  cell: Cell;
  accent?: boolean;
  divider?: boolean;
}) {
  return (
    <div
      className={clsx(
        "flex min-h-[44px] items-start gap-2",
        accent &&
          "self-stretch -my-4 py-4 -mx-2 px-2 bg-highlight-green-idle/55 border-l border-r border-border-tertiary",
        !accent &&
          divider &&
          "self-stretch -my-4 py-4 -mr-2 pr-2 border-r border-border-tertiary",
      )}
    >
      {cell.scale ? (
        <TimeDots level={cell.scale} className="mt-[9px]" />
      ) : (
        <CheckCircle ok={cell.ok} accent={accent} className="mt-0.5" />
      )}
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
  const mobile = useReveal<HTMLDivElement>();

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

        {/* Desktop table */}
        <div
          ref={table.ref}
          className={clsx(
            "reveal relative mt-14 hidden w-full md:mt-20 md:block",
            table.isVisible && "is-visible",
          )}
          style={{ "--reveal-delay": "120ms" } as React.CSSProperties}
        >
          {/* AICareer column frame — lifted card floating behind/around the table */}
          <div
            aria-hidden="true"
            className={clsx(
              "pointer-events-none absolute inset-0 grid gap-4 px-5 md:px-8",
              GRID_COLS,
            )}
          >
            <div />
            <div className="-mx-2 -my-4 rounded-l border border-brand-green/25 bg-highlight-green-idle/55 shadow-l-primary" />
            <div />
            <div />
          </div>

          {/* Table */}
          <div className="relative overflow-hidden rounded-l border border-border-tertiary bg-surface-primary shadow-l-primary">
            {/* Header */}
            <div
              className={clsx(
                "grid items-stretch gap-4 border-b border-border-tertiary bg-surface-light px-5 py-6 md:px-8",
                GRID_COLS,
              )}
            >
              <div />
              <div className="flex flex-col justify-between self-stretch -my-6 py-6 -mx-2 px-3 bg-highlight-green-idle/55 border-l border-r border-border-tertiary">
                <span className="inline-flex self-start items-center gap-1.5 rounded-full bg-brand-green/15 px-2.5 py-0.5 font-body text-[11px] font-semibold uppercase tracking-[0.14em] text-content-success">
                  <span aria-hidden="true">✦</span>
                  Recommended
                </span>
                <div className="mt-4 flex flex-col gap-1">
                  <span className="font-display text-[18px] font-medium text-content-success md:text-[22px]">
                    AICareer
                  </span>
                  <span className="font-body text-[11px] font-semibold uppercase tracking-[0.14em] text-content-secondary">
                    End-to-end AI recruiter
                  </span>
                </div>
              </div>
              <div className="flex flex-col justify-end self-stretch -my-6 py-6 -mr-2 pr-2 border-r border-border-tertiary">
                <div className="flex flex-col gap-1">
                  <span className="font-display text-[18px] font-medium text-content-primary md:text-[22px]">
                    AI tools
                  </span>
                  <span className="font-body text-[11px] font-semibold uppercase tracking-[0.14em] text-content-secondary">
                    ChatGPT, Claude, Gemini…
                  </span>
                </div>
              </div>
              <div className="flex flex-col justify-end self-stretch -my-6 py-6">
                <div className="flex flex-col gap-1">
                  <span className="font-display text-[18px] font-medium text-content-primary md:text-[22px]">
                    Traditional
                  </span>
                  <span className="font-body text-[11px] font-semibold uppercase tracking-[0.14em] text-content-secondary">
                    Spreadsheets & job boards
                  </span>
                </div>
              </div>
            </div>

            {/* Rows */}
            {ROWS.map((row, i) => (
              <div
                key={row.feature}
                className={clsx(
                  "grid items-start gap-4 px-5 py-4 transition-colors duration-200 md:px-8",
                  GRID_COLS,
                  i !== ROWS.length - 1 && "border-b border-border-tertiary",
                  i % 2 === 1 && "bg-surface-light/60",
                  "hover:bg-surface-light",
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
                <Mark cell={row.ai} divider />
                <Mark cell={row.manual} />
              </div>
            ))}
          </div>
        </div>

        {/* Mobile stack — 3 cards, AICareer first and lifted */}
        <div
          ref={mobile.ref}
          className={clsx(
            "reveal mt-10 flex w-full flex-col gap-5 md:hidden",
            mobile.isVisible && "is-visible",
          )}
          style={{ "--reveal-delay": "120ms" } as React.CSSProperties}
        >
          {COLUMNS.map((col) => (
            <div
              key={col.key}
              className={clsx(
                "rounded-l border p-5",
                col.accent
                  ? "border-brand-green/25 bg-highlight-green-idle/55 shadow-l-primary"
                  : "border-border-tertiary bg-surface-primary shadow-s-primary",
              )}
            >
              {col.badge && (
                <span className="mb-3 inline-flex items-center gap-1.5 rounded-full bg-brand-green/15 px-2.5 py-0.5 font-body text-[11px] font-semibold uppercase tracking-[0.14em] text-content-success">
                  <span aria-hidden="true">✦</span>
                  {col.badge}
                </span>
              )}
              <div className="flex flex-col gap-1">
                <h3
                  className={clsx(
                    "font-display text-[22px] font-medium",
                    col.accent ? "text-content-success" : "text-content-primary",
                  )}
                >
                  {col.name}
                </h3>
                <p className="font-body text-[11px] font-semibold uppercase tracking-[0.14em] text-content-secondary">
                  {col.subtitle}
                </p>
              </div>
              <ul
                className={clsx(
                  "mt-5 flex flex-col gap-3 border-t pt-4",
                  col.accent ? "border-brand-green/20" : "border-border-tertiary/60",
                )}
              >
                {ROWS.map((row) => {
                  const cell = row[col.key];
                  return (
                    <li key={row.feature} className="flex flex-col gap-1">
                      <div className="flex items-start justify-between gap-3">
                        <div className="flex min-w-0 items-start gap-2.5">
                          <span
                            aria-hidden="true"
                            className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-s bg-surface-light text-[13px] text-content-secondary shadow-xs-primary"
                          >
                            {row.icon}
                          </span>
                          <span className="font-body text-[14px] font-medium leading-[1.3] text-content-primary">
                            {row.feature}
                          </span>
                        </div>
                        <div className="shrink-0 pt-1">
                          {cell.scale ? (
                            <TimeDots level={cell.scale} />
                          ) : (
                            <CheckCircle ok={cell.ok} accent={col.accent} />
                          )}
                        </div>
                      </div>
                      {cell.note && (
                        <p className="pl-[34px] font-body text-[12px] leading-[1.4] text-content-secondary">
                          {cell.note}
                        </p>
                      )}
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}
        </div>

        <a
          href="https://noukash.com"
          className="group mt-12 inline-flex h-[50px] items-center gap-2 rounded-m bg-surface-inverted px-6 font-body text-[16px] font-medium text-content-inverted transition-opacity hover:opacity-90 md:mt-16"
        >
          <span>Try AICareer today</span>
          <span
            aria-hidden="true"
            className="transition-transform duration-300 group-hover:translate-x-0.5"
          >
            →
          </span>
        </a>
      </div>
    </section>
  );
}
