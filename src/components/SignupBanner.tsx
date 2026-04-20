"use client";

import clsx from "clsx";
import { useReveal } from "@/hooks/useReveal";

export function SignupBanner() {
  const text = useReveal<HTMLDivElement>();
  const decor = useReveal<HTMLDivElement>();

  return (
    <div className="relative w-full bg-surface-inverted-2 px-5 pt-[72px] md:px-20 md:pt-[144px]">
      <div className="relative mx-auto w-full max-w-[1312px]">
        <section className="relative">
          <div
            ref={text.ref}
            className={clsx("reveal", text.isVisible && "is-visible")}
          >
            <h3 className="m-0 mb-6 font-display text-[40px] font-light leading-[1.2] text-surface-light md:max-w-[50%] md:text-[64px] md:leading-[77px]">
              Get started&mdash;your way.
            </h3>
            <a
              href="https://account.ellipsus.com/sign-up"
              className="relative inline-flex h-[42px] items-center rounded-[12px] bg-white px-4 font-body text-[16px] font-medium leading-[18px] text-content-primary transition-opacity hover:opacity-80"
            >
              Sign up&mdash;it&rsquo;s free
            </a>
          </div>

          <div
            ref={decor.ref}
            className={clsx(
              "reveal pointer-events-none -mt-[120px] md:-mt-[240px]",
              decor.isVisible && "is-visible",
            )}
            style={{ "--reveal-delay": "150ms" } as React.CSSProperties}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/images/signup/decor.svg"
              alt=""
              aria-hidden="true"
              className="h-auto w-full"
            />
          </div>
        </section>
      </div>
    </div>
  );
}
