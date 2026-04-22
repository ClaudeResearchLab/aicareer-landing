import type { ComponentType, SVGProps } from "react";

type IconCmp = ComponentType<SVGProps<SVGSVGElement>>;
type Cell = {
  ok: boolean;
  title: string;
  note: string;
};
type Row = {
  Icon: IconCmp;
  label: string;
  caption: string;
  us: Cell;
  ai: Cell;
  traditional: Cell;
};

function StrategyIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" {...props}>
      <circle cx="12" cy="12" r="7.25" stroke="currentColor" strokeWidth="1.25" />
      <path
        d="M12 2.75v5M12 16.25v5M2.75 12h5M16.25 12h5"
        stroke="currentColor"
        strokeLinecap="round"
        strokeWidth="1.25"
      />
    </svg>
  );
}

function BriefcaseIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" {...props}>
      <path
        d="M8.25 7V5.75c0-.69.56-1.25 1.25-1.25h5c.69 0 1.25.56 1.25 1.25V7"
        stroke="currentColor"
        strokeLinecap="round"
        strokeWidth="1.25"
      />
      <path
        d="M4.5 8.75h15c.69 0 1.25.56 1.25 1.25v7.75c0 .69-.56 1.25-1.25 1.25h-15c-.69 0-1.25-.56-1.25-1.25V10c0-.69.56-1.25 1.25-1.25Z"
        stroke="currentColor"
        strokeWidth="1.25"
      />
      <path d="M3.25 12.25h17.5" stroke="currentColor" strokeLinecap="round" strokeWidth="1.25" />
    </svg>
  );
}

function DocumentIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" {...props}>
      <path
        d="M7.75 3.75h6.8l3.7 3.76v12.74c0 .55-.45 1-1 1h-9.5c-.55 0-1-.45-1-1v-15.5c0-.55.45-1 1-1Z"
        stroke="currentColor"
        strokeWidth="1.25"
      />
      <path
        d="M14.5 3.9v3.35c0 .55.45 1 1 1h3.2M9.25 12h5.5M9.25 15.5h5.5"
        stroke="currentColor"
        strokeLinecap="round"
        strokeWidth="1.25"
      />
    </svg>
  );
}

function ChatIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" {...props}>
      <path
        d="M5.25 5.25h13.5c.83 0 1.5.67 1.5 1.5v8.5c0 .83-.67 1.5-1.5 1.5H10l-4 3v-3H5.25c-.83 0-1.5-.67-1.5-1.5v-8.5c0-.83.67-1.5 1.5-1.5Z"
        stroke="currentColor"
        strokeLinejoin="round"
        strokeWidth="1.25"
      />
      <path d="M8.5 10.25h7M8.5 13.25h4.5" stroke="currentColor" strokeLinecap="round" strokeWidth="1.25" />
    </svg>
  );
}

function GrowthIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" {...props}>
      <path
        d="m4.5 16.5 4.25-4.25 3.5 3.5 6-7M16.5 5.25h2.75V8"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.25"
      />
    </svg>
  );
}

function ShieldIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" {...props}>
      <path
        d="M12 3.75c2.12 1.54 4.5 2.3 7.25 2.45v5.83c0 4.53-2.48 7.2-7.25 8.97-4.77-1.77-7.25-4.44-7.25-8.97V6.2c2.75-.15 5.13-.91 7.25-2.45Z"
        stroke="currentColor"
        strokeWidth="1.25"
      />
    </svg>
  );
}

function BranchSketch(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 430 295" fill="none" aria-hidden="true" {...props}>
      <path
        d="M437 17c-34 11-63 28-85 48-23 22-36 46-49 76-11 27-26 50-49 72-18 17-34 34-51 55"
        stroke="currentColor"
        strokeLinecap="round"
        strokeWidth="1.05"
      />
      <path
        d="M401 0c-3 17 1 33 13 49M371 24c-5 14-3 28 6 42M337 56c-6 16-5 31 5 47M307 90c-6 17-5 34 3 49M271 135c-4 18-2 34 5 48"
        stroke="currentColor"
        strokeLinecap="round"
        strokeWidth="0.95"
      />
      <path
        d="M351 44c-10-6-22-8-35-8 5 13 15 23 29 29M322 71c-13-4-25-4-37 1 8 11 19 18 33 20M292 114c-13-4-25-4-37 2 8 11 18 17 31 19M262 154c-11-2-22 0-32 5 8 8 18 13 30 14"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="0.95"
      />
      <path
        d="M387 74c10-8 22-13 37-15-7 12-17 21-31 28M354 103c12-8 24-13 38-14-7 12-18 20-32 27M317 143c11-8 24-12 38-12-8 11-19 19-32 25M277 191c9-7 20-10 32-10-6 10-15 17-27 22"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="0.95"
      />
      <path
        d="M318 15c11 8 23 13 37 14M281 34c9 8 20 12 32 13M241 68c10 7 20 11 31 12"
        stroke="currentColor"
        strokeLinecap="round"
        strokeWidth="0.95"
      />
    </svg>
  );
}

function LandscapeSketch(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 520 260" fill="none" aria-hidden="true" {...props}>
      <path
        d="M2 180c24-25 43-50 57-76 18-33 37-56 58-70 12 7 24 21 38 44 15 24 28 39 42 48 15 10 35 17 58 20 30 4 62 16 97 36"
        stroke="currentColor"
        strokeLinecap="round"
        strokeWidth="1.02"
      />
      <path
        d="M1 210c46-18 90-29 133-33 48-5 98 0 151 15 24 7 54 20 88 38M8 229c57-17 115-24 171-22 49 2 102 10 159 24"
        stroke="currentColor"
        strokeLinecap="round"
        strokeWidth="0.95"
      />
      <path
        d="M10 168c16-17 27-35 34-54 8-20 21-38 37-53 11 18 16 37 14 58M29 151c19-17 32-37 40-61 5 15 10 31 13 49"
        stroke="currentColor"
        strokeLinecap="round"
        strokeWidth="0.95"
      />
      <path
        d="M68 127c15-12 30-21 46-28M97 112c13-11 29-18 46-22M131 103c16-11 33-17 52-20M174 101c15-8 29-12 42-12"
        stroke="currentColor"
        strokeLinecap="round"
        strokeWidth="0.95"
      />
      <path
        d="M182 184c-3 16-10 29-20 40-12 13-22 27-30 42M205 181c-1 19 5 35 17 48 15 16 27 30 35 42M140 197c12 4 24 10 35 19 11 9 21 19 28 30"
        stroke="currentColor"
        strokeLinecap="round"
        strokeWidth="0.95"
      />
      <path
        d="M243 227c9-4 17-10 24-20 11-15 25-25 42-30 16-4 33-3 53 3"
        stroke="currentColor"
        strokeLinecap="round"
        strokeWidth="0.95"
      />
      <path
        d="M53 223c20 3 34 8 43 16M95 229c13 4 24 10 33 18M124 221c-6 8-8 18-7 31M25 225c-6 9-8 18-7 28"
        stroke="currentColor"
        strokeLinecap="round"
        strokeWidth="0.88"
      />
    </svg>
  );
}

function AccentUnderline(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 120 18" fill="none" aria-hidden="true" {...props}>
      <path
        d="M7.5 10.5c22-4.7 42.1-6.3 60.3-4.6 17 1.6 31.8 2.7 44.7 1.4"
        stroke="currentColor"
        strokeLinecap="round"
        strokeWidth="1.8"
      />
    </svg>
  );
}

function StatusMark({ ok }: { ok: boolean }) {
  const colorClass = ok ? "text-brand-green" : "text-brand-coral";

  return (
    <svg
      viewBox="0 0 26 26"
      fill="none"
      aria-hidden="true"
      className={`h-[23px] w-[23px] shrink-0 ${colorClass}`}
    >
      <circle cx="13" cy="13" r="11" stroke="currentColor" strokeOpacity="0.8" strokeWidth="1.15" />
      {ok ? (
        <path
          d="m8.7 13.3 2.6 2.7 6-6.5"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1.3"
        />
      ) : (
        <path
          d="m9.2 9.2 7.6 7.6m0-7.6-7.6 7.6"
          stroke="currentColor"
          strokeLinecap="round"
          strokeWidth="1.3"
        />
      )}
    </svg>
  );
}

function ArrowRightIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" {...props}>
      <path
        d="M4.5 12h14m0 0-4.9-4.9M18.5 12l-4.9 4.9"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.55"
      />
    </svg>
  );
}

const ROWS: Row[] = [
  {
    Icon: StrategyIcon,
    label: "Career strategy",
    caption: "Plans aligned to your goals",
    us: {
      ok: true,
      title: "AI-powered career copilot",
      note: "Long-term roadmap, not one-off answers",
    },
    ai: {
      ok: false,
      title: "One-shot answers",
      note: "No context, no strategy",
    },
    traditional: {
      ok: false,
      title: "Outdated advice",
      note: "One-size-fits-all guidance",
    },
  },
  {
    Icon: BriefcaseIcon,
    label: "Job opportunities",
    caption: "AI-matched, high-quality roles",
    us: {
      ok: true,
      title: "Curated roles that fit you",
      note: "Not random listings",
    },
    ai: {
      ok: false,
      title: "No access to real roles",
      note: "You still have to search",
    },
    traditional: {
      ok: false,
      title: "Limited networks",
      note: "Few or outdated openings",
    },
  },
  {
    Icon: DocumentIcon,
    label: "Application materials",
    caption: "Tailored, recruiter-ready docs",
    us: {
      ok: true,
      title: "Documents that tell your story",
      note: "Built to pass human & ATS",
    },
    ai: {
      ok: false,
      title: "Generic outputs",
      note: "You do the heavy lifting",
    },
    traditional: {
      ok: false,
      title: "Manual & time-consuming",
      note: "Templates fall short",
    },
  },
  {
    Icon: ChatIcon,
    label: "Interview preparation",
    caption: "Personalized practice & feedback",
    us: {
      ok: true,
      title: "Real interview readiness",
      note: "Role-specific + adaptive",
    },
    ai: {
      ok: false,
      title: "No interview context",
      note: "No role-specific prep",
    },
    traditional: {
      ok: false,
      title: "Generic prep",
      note: "Not tailored to you",
    },
  },
  {
    Icon: GrowthIcon,
    label: "Results you can measure",
    caption: "Progress that compounds",
    us: {
      ok: true,
      title: "Track growth that matters",
      note: "Applications, interviews, offers",
    },
    ai: {
      ok: false,
      title: "No tracking",
      note: "Hard to know what's working",
    },
    traditional: {
      ok: false,
      title: "No visibility",
      note: "Hard to measure impact",
    },
  },
  {
    Icon: ShieldIcon,
    label: "Data & privacy",
    caption: "Your career data stays yours",
    us: {
      ok: true,
      title: "Private by design",
      note: "We never sell your data",
    },
    ai: {
      ok: false,
      title: "Unclear data use",
      note: "You don’t control it",
    },
    traditional: {
      ok: false,
      title: "Data scattered",
      note: "Multiple platforms, no control",
    },
  },
];

function DesktopComparison() {
  return (
    <div className="hidden md:block">
      <div className="relative mx-auto max-w-[1242px]">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute left-[350px] top-[4px] h-[calc(100%-4px)] w-[332px] rounded-[28px] border border-brand-green/28 bg-[linear-gradient(180deg,rgba(247,246,239,0.76),rgba(244,242,234,0.54))]"
        />

        <table className="relative z-[1] w-full table-fixed border-separate border-spacing-0">
          <colgroup>
            <col className="w-[350px]" />
            <col className="w-[332px]" />
            <col className="w-[280px]" />
            <col className="w-[280px]" />
          </colgroup>

          <thead>
            <tr>
              <th className="pb-[18px] pl-[34px] text-left align-bottom font-display text-[20px] font-normal italic leading-none text-content-primary">
                What matters
              </th>
              <th className="pb-[12px] pt-[24px] text-center align-bottom font-normal">
                <div className="flex translate-y-[5px] flex-col items-center justify-end">
                  <span className="font-display text-[27px] font-light leading-none tracking-[-0.02em] text-brand-green/90">
                    AICareer
                  </span>
                  <AccentUnderline className="mt-[4px] h-[9px] w-[77px] text-brand-green/80" />
                </div>
              </th>
              <th className="pb-[18px] text-center align-bottom font-display text-[20px] font-normal leading-none text-content-primary">
                AI tools
              </th>
              <th className="pb-[18px] text-center align-bottom font-display text-[20px] font-normal leading-none text-content-primary">
                Traditional
              </th>
            </tr>
          </thead>

          <tbody>
            {ROWS.map((row) => (
              <tr key={row.label}>
                <td className="border-t border-border-tertiary/70 pl-[30px] pr-[24px]">
                  <div className="flex min-h-[71px] items-center gap-[18px]">
                    <span
                      aria-hidden="true"
                      className="flex h-[26px] w-[26px] shrink-0 items-center justify-center text-brand-green/72"
                    >
                      <row.Icon className="h-[23px] w-[23px]" />
                    </span>
                    <div>
                      <div className="font-display text-[16px] leading-[1.06] text-content-primary">
                        {row.label}
                      </div>
                      <div className="mt-[4px] font-body text-[13px] leading-[1.28] text-content-secondary">
                        {row.caption}
                      </div>
                    </div>
                  </div>
                </td>

                <td className="border-t border-border-tertiary/70 px-[40px]">
                  <div className="flex min-h-[71px] items-center gap-[16px]">
                    <StatusMark ok />
                    <div>
                      <div className="font-display text-[16px] leading-[1.05] text-content-primary">
                        {row.us.title}
                      </div>
                      <div className="mt-[4px] max-w-[220px] font-body text-[13px] leading-[1.25] text-content-secondary">
                        {row.us.note}
                      </div>
                    </div>
                  </div>
                </td>

                <td className="border-t border-border-tertiary/70 px-[34px]">
                  <div className="flex min-h-[71px] items-center gap-[16px]">
                    <StatusMark ok={false} />
                    <div>
                      <div className="font-display text-[16px] leading-[1.05] text-content-primary">
                        {row.ai.title}
                      </div>
                      <div className="mt-[4px] max-w-[192px] font-body text-[13px] leading-[1.25] text-content-secondary">
                        {row.ai.note}
                      </div>
                    </div>
                  </div>
                </td>

                <td className="border-l border-t border-border-tertiary/70 px-[34px]">
                  <div className="flex min-h-[71px] items-center gap-[16px]">
                    <StatusMark ok={false} />
                    <div>
                      <div className="font-display text-[16px] leading-[1.05] text-content-primary">
                        {row.traditional.title}
                      </div>
                      <div className="mt-[4px] max-w-[196px] font-body text-[13px] leading-[1.25] text-content-secondary">
                        {row.traditional.note}
                      </div>
                    </div>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function MobileComparison() {
  return (
    <div className="flex flex-col gap-5 md:hidden">
      <div className="rounded-[28px] border border-brand-green/28 bg-[linear-gradient(180deg,rgba(248,247,242,0.98),rgba(244,242,233,0.94))] px-5 pb-4 pt-5">
        <div className="mb-4 flex flex-col items-center justify-center">
          <span className="font-display text-[34px] font-light leading-none tracking-[-0.02em] text-brand-green/90">
            AICareer
          </span>
          <AccentUnderline className="mt-[4px] h-[12px] w-[98px] text-brand-green/80" />
        </div>

        <div className="divide-y divide-border-tertiary/60">
          {ROWS.map((row) => (
            <div key={`mobile-us-${row.label}`} className="flex gap-3 py-4 first:pt-2 last:pb-2">
              <StatusMark ok />
              <div>
                <div className="font-display text-[18px] leading-[1.08] text-content-primary">
                  {row.us.title}
                </div>
                <div className="mt-1 font-body text-[12px] leading-[1.4] text-content-secondary">
                  {row.us.note}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="rounded-[32px] border border-border-tertiary/75 bg-surface-neutral px-5 pb-4 pt-5">
        <div className="mb-4 text-center font-display text-[30px] leading-none text-content-primary">
          AI tools
        </div>

        <div className="divide-y divide-border-tertiary/60">
          {ROWS.map((row) => (
            <div key={`mobile-ai-${row.label}`} className="flex gap-3 py-4 first:pt-2 last:pb-2">
              <StatusMark ok={false} />
              <div>
                <div className="font-display text-[18px] leading-[1.08] text-content-primary">
                  {row.ai.title}
                </div>
                <div className="mt-1 font-body text-[12px] leading-[1.4] text-content-secondary">
                  {row.ai.note}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="rounded-[32px] border border-border-tertiary/75 bg-surface-neutral px-5 pb-4 pt-5">
        <div className="mb-4 text-center font-display text-[30px] leading-none text-content-primary">
          Traditional
        </div>

        <div className="divide-y divide-border-tertiary/60">
          {ROWS.map((row) => (
            <div key={`mobile-traditional-${row.label}`} className="flex gap-3 py-4 first:pt-2 last:pb-2">
              <StatusMark ok={false} />
              <div>
                <div className="font-display text-[18px] leading-[1.08] text-content-primary">
                  {row.traditional.title}
                </div>
                <div className="mt-1 font-body text-[12px] leading-[1.4] text-content-secondary">
                  {row.traditional.note}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export function ComparisonTable() {
  return (
    <section className="relative overflow-hidden bg-surface-light px-5 pb-[94px] pt-[84px] md:px-6 md:pb-[74px] md:pt-[44px]">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 hidden h-[320px] bg-[radial-gradient(circle_at_50%_0%,rgba(255,255,255,0.7),transparent_70%)] md:block"
      />
      <BranchSketch className="pointer-events-none absolute right-[-6px] top-[-2px] hidden w-[368px] text-content-disabled/45 md:block" />
      <LandscapeSketch className="pointer-events-none absolute bottom-[-2px] left-[-12px] hidden w-[370px] text-content-disabled/38 md:block" />

      <div className="relative mx-auto w-full max-w-[1280px]">
        <div className="mx-auto mb-8 flex max-w-[1020px] flex-col items-center text-center md:mb-[28px]">
          <span className="inline-flex font-body text-[12px] font-medium uppercase tracking-[0.28em] text-brand-green md:text-[13px]">
            The clear choice
          </span>

          <h2 className="mt-[24px] text-balance font-display text-[48px] font-light leading-[0.95] tracking-[-0.038em] text-content-primary md:text-[78px] lg:text-[86px]">
            <span className="block">AICareer isn&rsquo;t another tool.</span>
            <span className="block">
              It&rsquo;s your <em className="italic">career copilot.</em>
            </span>
          </h2>

          <p className="mt-[16px] max-w-[720px] text-balance font-body text-[17px] leading-[1.42] text-content-secondary md:text-[18px]">
            Generic AI tools generate content. AICareer advances your entire
            career with personalized strategy, real opportunities, and proven
            outcomes.
          </p>
        </div>

        <DesktopComparison />
        <MobileComparison />

        <div className="mt-6 flex flex-col items-center md:mt-[112px]">
          <a
            href="https://noukash.com"
            className="inline-flex h-[60px] items-center justify-center rounded-[16px] bg-surface-inverted px-[28px] font-display text-[18px] font-light text-content-inverted shadow-m-primary transition-opacity hover:opacity-90 md:min-w-[350px] md:text-[20px]"
          >
            Start advancing your career
            <ArrowRightIcon className="ml-[18px] h-[22px] w-[22px] shrink-0" />
          </a>

          <p className="mt-[12px] text-center font-body text-[15px] leading-[1.4] text-content-secondary">
            Join thousands already moving forward with AICareer.
          </p>
        </div>
      </div>
    </section>
  );
}
