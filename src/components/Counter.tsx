"use client";

import { useEffect, useState } from "react";
import clsx from "clsx";
import { withBase } from "@/lib/basePath";
import { useReveal } from "@/hooks/useReveal";

const COUNT_TARGET = 50000;
const COUNT_DURATION_MS = 1800;

function AnimatedCount({ active }: { active: boolean }) {
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!active) return;
    const start = performance.now();
    let raf = 0;
    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / COUNT_DURATION_MS);
      const eased = 1 - Math.pow(1 - t, 3);
      setValue(Math.round(COUNT_TARGET * eased));
      if (t < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [active]);

  const targetLabel = COUNT_TARGET.toLocaleString("en-US");
  return (
    <span
      className="count-up"
      aria-label={`${targetLabel}+`}
      role="text"
    >
      <span className="count-up-ghost" aria-hidden="true">
        {targetLabel}
      </span>
      <span className="count-up-value" aria-hidden="true">
        {value.toLocaleString("en-US")}
      </span>
      <style>{`
        .count-up {
          position: relative;
          display: inline-block;
          font-variant-numeric: tabular-nums;
          vertical-align: baseline;
        }
        .count-up-ghost {
          visibility: hidden;
        }
        .count-up-value {
          position: absolute;
          right: 0;
          top: 0;
        }
      `}</style>
    </span>
  );
}

export function Counter() {
  const reveal = useReveal<HTMLDivElement>();

  return (
    <section className="sticky top-[74px] w-full bg-surface-light py-[120px] md:py-[200px]">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={withBase("/images/counter/wave.svg")}
        alt=""
        aria-hidden="true"
        className="pointer-events-none absolute bottom-[612.92px] left-0 h-[63.08px] w-full -translate-y-[31.54px]"
      />
      <div className="px-5 md:px-20">
        <div
          ref={reveal.ref}
          className={clsx(
            "reveal mx-auto w-full max-w-[1312px]",
            reveal.isVisible && "is-visible",
          )}
        >
          <div className="flex flex-col items-center gap-10">
            <p className="m-0 w-full max-w-[1100px] text-balance text-center font-display text-[40px] font-light leading-[1.1] text-content-primary md:text-[80px] md:leading-[97px]">
              Trusted by <AnimatedCount active={reveal.isVisible} />+ job&nbsp;seekers. And we&rsquo;ve got their&nbsp;backs.
            </p>
            <a
              href="https://noukash.com"
              className="inline-flex h-[42px] items-center rounded-[12px] bg-surface-inverted px-4 font-body text-[16px] font-medium leading-[18px] text-white transition-opacity hover:opacity-80"
            >
              Join for free
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
