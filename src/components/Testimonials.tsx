"use client";

import clsx from "clsx";
import { useReveal } from "@/hooks/useReveal";

type Tag = { icon: string; label: string };

type Story = {
  status: "OFFER ACCEPTED" | "MULTIPLE INTERVIEWS";
  quote: string;
  tags: Tag[];
  name: string;
  role: string;
  tint: "coral" | "blue" | "green" | "purple" | "orange";
  company: { name: string; className?: string };
};

const STORIES: Story[] = [
  {
    status: "OFFER ACCEPTED",
    quote:
      "This platform completely transformed my job search. The personalized coaching and interview prep helped me land my dream role at a top tech company.",
    tags: [
      { icon: "▣", label: "Barclays" },
      { icon: "✦", label: "Finance" },
      { icon: "➤", label: "Internship" },
    ],
    name: "Augustine B.",
    role: "Operations Analyst",
    tint: "coral",
    company: { name: "Barclays", className: "font-display italic tracking-tight" },
  },
  {
    status: "OFFER ACCEPTED",
    quote:
      "Accepted an offer during a brutal market. Juggling other responsibilities made the search painful. AICareer made the whole process so much easier, week over week.",
    tags: [
      { icon: "▣", label: "Capital One" },
      { icon: "✦", label: "Full time" },
    ],
    name: "Michelle I.",
    role: "Strategy & Analytics",
    tint: "blue",
    company: {
      name: "CapitalOne",
      className: "font-body font-semibold tracking-tight",
    },
  },
  {
    status: "MULTIPLE INTERVIEWS",
    quote:
      "I\u2019ve gotten some amazing interviews and I\u2019m shocked by how many I\u2019ve received since joining. Landed screens at Condé Nast, T-Mobile, and multiple AI companies I wouldn\u2019t have discovered otherwise.",
    tags: [
      { icon: "▣", label: "T-Mobile" },
      { icon: "◎", label: "Multiple companies" },
    ],
    name: "Brooke D.",
    role: "Active job seeker",
    tint: "purple",
    company: {
      name: "·T··",
      className: "font-body font-bold tracking-[0.3em] text-[22px]",
    },
  },
];

const LOGOS: { label: string; className: string }[] = [
  { label: "Meta",   className: "font-body font-black italic tracking-tight" },
  { label: "TESLA",  className: "font-body font-semibold tracking-[0.32em]" },
  { label: "SPACEX", className: "font-body font-bold tracking-[0.18em]" },
  { label: "Google", className: "font-display font-medium tracking-tight" },
  { label: "\uF8FF", className: "font-body text-[30px] leading-none" },
  { label: "airbnb", className: "font-body font-semibold lowercase tracking-tight" },
];

const TINT_RING: Record<Story["tint"], string> = {
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

function Card({ story, delay }: { story: Story; delay: number }) {
  return (
    <figure
      className="flex h-full flex-col rounded-l border border-border-tertiary bg-surface-light p-7 shadow-l-primary transition-[transform,box-shadow,border-color] duration-300 hover:-translate-y-1 hover:border-border-secondary hover:shadow-xl-primary md:p-8"
      style={{ "--reveal-delay": `${delay}ms` } as React.CSSProperties}
    >
      <span className="mb-5 inline-block font-body text-[11px] font-semibold uppercase tracking-[0.18em] text-content-tertiary md:text-[12px]">
        {story.status}
      </span>

      <blockquote className="m-0 flex-1 font-display text-[20px] font-light leading-[1.4] text-content-primary md:text-[22px]">
        &ldquo;{story.quote}&rdquo;
      </blockquote>

      <ul className="mt-6 flex flex-wrap gap-2">
        {story.tags.map((t) => (
          <li
            key={t.label}
            className="inline-flex items-center gap-1.5 rounded-full border border-border-tertiary bg-surface-primary px-3 py-1 font-body text-[12px] text-content-primary md:text-[13px]"
          >
            <span aria-hidden="true" className="text-content-secondary">{t.icon}</span>
            <span>{t.label}</span>
          </li>
        ))}
      </ul>

      <div className="mt-7 flex items-center justify-between gap-4 border-t border-border-tertiary pt-5">
        <figcaption className="flex items-center gap-3">
          <span
            aria-hidden="true"
            className={clsx(
              "flex h-11 w-11 items-center justify-center rounded-full font-display text-[15px] font-medium",
              TINT_RING[story.tint],
            )}
          >
            {initials(story.name)}
          </span>
          <span className="flex flex-col leading-tight">
            <span className="font-body text-[15px] font-medium text-content-primary">
              {story.name}
            </span>
            <span className="font-body text-[13px] text-content-secondary">
              {story.role}
            </span>
          </span>
        </figcaption>
        <span
          aria-hidden="true"
          className={clsx(
            "shrink-0 text-[18px] text-content-tertiary md:text-[20px]",
            story.company.className,
          )}
        >
          {story.company.name}
        </span>
      </div>
    </figure>
  );
}

export function Testimonials() {
  const heading = useReveal<HTMLDivElement>();
  const logos = useReveal<HTMLDivElement>();
  const grid = useReveal<HTMLDivElement>();

  return (
    <section className="relative w-full overflow-hidden bg-surface-primary px-5 pt-[56px] pb-[100px] md:px-20 md:pt-[80px] md:pb-[160px]">
      <div className="mx-auto flex w-full max-w-[1312px] flex-col items-center">
        <div
          ref={heading.ref}
          className={clsx(
            "reveal flex flex-col items-center text-center",
            heading.isVisible && "is-visible",
          )}
        >
          <h2 className="m-0 max-w-[960px] text-balance font-display text-[40px] font-light leading-[1.1] text-content-primary md:text-[64px] md:leading-[1.05]">
            Real <em className="not-italic text-brand-blue">job</em> seekers.
            Real <em className="not-italic text-brand-coral">offers</em>.
            <br />
            Landed at top{" "}
            <em className="not-italic text-brand-green">companies</em>{" "}
            worldwide.
          </h2>
          <p className="mt-5 font-body text-[17px] text-content-secondary md:text-[19px]">
            From first jobs to senior moves. We do the heavy lifting.
          </p>
        </div>

        <div
          ref={logos.ref}
          className={clsx(
            "reveal logo-marquee mt-12 w-full md:mt-16",
            logos.isVisible && "is-visible",
          )}
          style={{ "--reveal-delay": "120ms" } as React.CSSProperties}
        >
          <div className="logo-marquee-track">
            {[0, 1].map((copy) => (
              <div key={copy} className="logo-marquee-row" aria-hidden={copy === 1}>
                {LOGOS.map((logo) => (
                  <span
                    key={`${copy}-${logo.label}`}
                    aria-hidden="true"
                    className={clsx(
                      "text-[22px] text-content-tertiary transition-colors duration-300 hover:text-content-secondary md:text-[26px]",
                      logo.className,
                    )}
                  >
                    {logo.label}
                  </span>
                ))}
              </div>
            ))}
          </div>
        </div>

        <div className="mt-14 h-px w-full max-w-[1100px] bg-border-tertiary md:mt-20" aria-hidden="true" />

        <div
          ref={grid.ref}
          className={clsx(
            "reveal mt-14 grid w-full grid-cols-1 gap-6 md:mt-16 md:grid-cols-3 md:gap-8",
            grid.isVisible && "is-visible",
          )}
          style={{ "--reveal-delay": "200ms" } as React.CSSProperties}
        >
          {STORIES.map((s, i) => (
            <Card key={s.name} story={s} delay={i * 120} />
          ))}
        </div>
      </div>

      <style>{`
        .logo-marquee {
          overflow: hidden;
          -webkit-mask-image: linear-gradient(
            to right,
            transparent 0,
            black 10%,
            black 90%,
            transparent 100%
          );
                  mask-image: linear-gradient(
            to right,
            transparent 0,
            black 10%,
            black 90%,
            transparent 100%
          );
        }
        .logo-marquee-track {
          display: flex;
          width: max-content;
          animation: logoMarquee 32s linear infinite;
        }
        .logo-marquee-row {
          display: flex;
          align-items: center;
          gap: 64px;
          padding-right: 64px;
          flex-shrink: 0;
        }
        @media (min-width: 768px) {
          .logo-marquee-row {
            gap: 96px;
            padding-right: 96px;
          }
        }
        .logo-marquee:hover .logo-marquee-track {
          animation-play-state: paused;
        }
        @keyframes logoMarquee {
          from { transform: translate3d(0, 0, 0); }
          to   { transform: translate3d(-50%, 0, 0); }
        }
        @media (prefers-reduced-motion: reduce) {
          .logo-marquee-track { animation: none; }
        }
      `}</style>
    </section>
  );
}
