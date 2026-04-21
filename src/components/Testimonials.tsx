"use client";

import clsx from "clsx";
import { useReveal } from "@/hooks/useReveal";

type Quote = {
  name: string;
  role: string;
  tint: "coral" | "blue" | "green" | "purple" | "orange";
  text: string;
};

// 9 quotes split across three columns — middle column is one longer than
// the sides so the grid breathes.
const COLUMNS: Quote[][] = [
  [
    {
      name: "Al-Hajj M.",
      role: "Mid-career, fintech",
      tint: "coral",
      text: "The platform is seamless and intuitive. I feel confident I'll land my next role much faster.",
    },
    {
      name: "Kaylena R.",
      role: "Student · first job",
      tint: "blue",
      text: "I get anxious opening job boards, but AICareer made the process manageable. I'm finally applying consistently.",
    },
    {
      name: "Jranan A.",
      role: "New graduate",
      tint: "green",
      text: "Within a couple weeks I landed multiple screens. Feels unreal compared to the old copy-paste grind.",
    },
  ],
  [
    {
      name: "Jordan S.",
      role: "Active job seeker",
      tint: "purple",
      text: "Applying used to feel exhausting. With AICareer I started getting callbacks again — three in a few weeks.",
    },
    {
      name: "Myra C.",
      role: "Early-career, design",
      tint: "orange",
      text: "For the first time, companies actually responded. Two interview emails came through after weeks of silence.",
    },
    {
      name: "Nanilish H.",
      role: "College graduate",
      tint: "coral",
      text: "I applied to ~200 roles and landed a handful of interviews in days. Huge time saver, far less burnout.",
    },
    {
      name: "Augustine B.",
      role: "Operations analyst",
      tint: "blue",
      text: "The personalized coaching and interview prep helped me land my dream role at a top tech company.",
    },
  ],
  [
    {
      name: "Jordynn K.",
      role: "International student",
      tint: "green",
      text: "Within the first three days I had five interview requests. Applying finally feels fast — and actually works.",
    },
    {
      name: "Alex W.",
      role: "College student · new grad",
      tint: "purple",
      text: "From download to first interview in five days. Never going back to scrolling job boards myself.",
    },
    {
      name: "Michelle I.",
      role: "Strategy & analytics",
      tint: "orange",
      text: "Accepted an offer through AICareer during a brutal market. It made the process so much easier week over week.",
    },
  ],
];

const TINT_RING: Record<Quote["tint"], string> = {
  coral:  "bg-highlight-coral-idle  text-brand-coral",
  blue:   "bg-highlight-blue-idle   text-brand-blue",
  green:  "bg-highlight-green-idle  text-brand-green",
  purple: "bg-highlight-purple-idle text-brand-purple",
  orange: "bg-highlight-orange-idle text-brand-orange",
};

function initials(name: string): string {
  return name
    .split(/\s+/)
    .map((w) => w[0])
    .filter(Boolean)
    .slice(0, 2)
    .join("")
    .toUpperCase();
}

function Card({ quote, delay }: { quote: Quote; delay: number }) {
  return (
    <figure
      className="rounded-l border border-border-tertiary bg-surface-light p-6 shadow-s-primary transition-[transform,box-shadow,border-color] duration-300 hover:-translate-y-1 hover:border-border-secondary hover:shadow-m-primary"
      style={{ "--reveal-delay": `${delay}ms` } as React.CSSProperties}
    >
      <div className="mb-4 flex items-center gap-3">
        <span
          aria-hidden="true"
          className={clsx(
            "flex h-10 w-10 items-center justify-center rounded-full font-display text-[15px] font-medium",
            TINT_RING[quote.tint],
          )}
        >
          {initials(quote.name)}
        </span>
        <figcaption className="flex flex-col leading-tight">
          <span className="font-body text-[15px] font-medium text-content-primary">
            {quote.name}
          </span>
          <span className="font-body text-[13px] text-content-secondary">
            {quote.role}
          </span>
        </figcaption>
      </div>
      <blockquote className="m-0 font-body text-[15px] leading-[1.55] text-content-primary md:text-[16px]">
        &ldquo;{quote.text}&rdquo;
      </blockquote>
    </figure>
  );
}

export function Testimonials() {
  const heading = useReveal<HTMLDivElement>();
  const grid = useReveal<HTMLDivElement>();

  return (
    <section className="relative w-full overflow-hidden bg-surface-primary px-5 py-[100px] md:px-20 md:py-[160px]">
      <div className="mx-auto flex w-full max-w-[1312px] flex-col items-center">
        <div
          ref={heading.ref}
          className={clsx(
            "reveal flex flex-col items-center text-center",
            heading.isVisible && "is-visible",
          )}
        >
          <span className="mb-6 inline-flex items-center gap-2 rounded-full border border-brand-coral/30 bg-highlight-coral-idle px-4 py-1.5 font-body text-[13px] font-medium text-brand-coral">
            <span aria-hidden="true">♡</span>
            <span>Real results</span>
          </span>
          <h2 className="m-0 max-w-[880px] font-display text-[40px] font-light leading-[1.1] text-content-primary md:text-[64px] md:leading-[1.05]">
            Real people. Real offers. How careerists use AICareer to land jobs
            faster.
          </h2>
        </div>

        <div
          ref={grid.ref}
          className={clsx(
            "reveal relative mt-14 w-full md:mt-20",
            grid.isVisible && "is-visible",
          )}
          style={{ "--reveal-delay": "120ms" } as React.CSSProperties}
        >
          <div className="grid grid-cols-1 gap-4 md:grid-cols-3 md:gap-6">
            {COLUMNS.map((col, ci) => (
              <div key={ci} className="flex flex-col gap-4 md:gap-6">
                {col.map((q, qi) => (
                  <Card key={q.name} quote={q} delay={(ci * 120) + qi * 90} />
                ))}
              </div>
            ))}
          </div>

          {/* Soft fade at top/bottom to suggest there's more than what's shown */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-surface-primary to-transparent"
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-surface-primary to-transparent"
          />
        </div>

        <div className="mt-12 flex flex-wrap items-center justify-center gap-4 font-body text-[13px] text-content-secondary md:text-[14px]">
          <span className="inline-flex items-center gap-2 rounded-m border border-border-tertiary bg-surface-light px-3 py-2 shadow-xs-primary">
            <span aria-hidden="true" className="text-brand-orange">★★★★★</span>
            <span className="font-medium text-content-primary">4.8</span>
            <span>/5 · 40k+ App Store reviews</span>
          </span>
          <span className="inline-flex items-center gap-2 rounded-m border border-border-tertiary bg-surface-light px-3 py-2 shadow-xs-primary">
            <span aria-hidden="true" className="text-brand-orange">★★★★½</span>
            <span className="font-medium text-content-primary">4.4</span>
            <span>/5 · 25k+ Play Store reviews</span>
          </span>
        </div>
      </div>
    </section>
  );
}
