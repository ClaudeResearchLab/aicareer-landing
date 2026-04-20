"use client";

import clsx from "clsx";
import { useReveal } from "@/hooks/useReveal";

export function Counter() {
  const reveal = useReveal<HTMLDivElement>();

  return (
    <section className="sticky top-[74px] w-full bg-surface-light py-[120px] md:py-[200px]">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/images/counter/wave.svg"
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
            <p className="m-0 w-full max-w-[1100px] text-center font-display text-[40px] font-light leading-[1.1] text-content-primary md:text-[80px] md:leading-[97px]">
              <span>Trusted by </span>
              <span>50,000 </span>
              <span>(real) careerists, and counting...</span>
            </p>
            <a
              href="https://write.ellipsus.com/?utm_medium=website&utm_source=home_writers-count&utm_campaign=5569_join-for-free"
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
