"use client";

import clsx from "clsx";
import { withBase } from "@/lib/basePath";
import { useReveal } from "@/hooks/useReveal";

const BALLS = [
  { src: "/images/statement/ball1.svg", top: 1084.64, left: 640, w: 100, h: 91.36, innerH: 86.36, rotate: "" },
  { src: "/images/statement/ball2.svg", top: 901.77, left: 819.2, w: 100, h: 84.23, innerH: 79.23, rotate: "" },
  { src: "/images/statement/ball3.svg", top: 718.73, left: 844.8, w: 130, h: 117.27, innerH: 112.27, rotate: "rotate(30deg)" },
  { src: "/images/statement/ball4.svg", top: 963.27, left: 1024, w: 90, h: 82.73, innerH: 77.73, rotate: "rotate(210deg)" },
  { src: "/images/statement/ball5.svg", top: 797.37, left: 1020, w: 120, h: 108.63, innerH: 103.63, rotate: "rotate(-50deg)" },
  { src: "/images/statement/ball6.svg", top: 1111.91, left: 1150, w: 80, h: 74.09, innerH: 69.09, rotate: "rotate(-30deg)" },
  { src: "/images/statement/ball7.svg", top: 957.37, left: 1280, w: 120, h: 108.63, innerH: 103.63, rotate: "rotate(40deg)" },
];

export function Statement() {
  const title = useReveal<HTMLHeadingElement>();
  const intro = useReveal<HTMLDivElement>();
  const robot = useReveal<HTMLDivElement>();

  return (
    <section className="relative w-full bg-surface-primary">
      <div className="overflow-hidden px-5 md:px-20">
        <div className="relative mx-auto w-full max-w-[1312px] pt-[64px] pb-[120px] md:pt-[86px] md:pb-[680px]">
          <h2
            ref={title.ref}
            className={clsx(
              "reveal m-0 mb-[50px] font-display text-[40px] font-light leading-[1.1] text-content-primary md:max-w-[740px] md:text-[80px] md:leading-[97px]",
              title.isVisible && "is-visible",
            )}
          >
            Less grind. More offers.
          </h2>

          <div
            ref={intro.ref}
            className={clsx(
              "reveal relative flex justify-end",
              intro.isVisible && "is-visible",
            )}
            style={{ "--reveal-delay": "150ms" } as React.CSSProperties}
          >
            <div className="w-full font-body text-[20px] leading-[30px] text-content-primary md:max-w-[500px] md:text-right md:text-[28px] md:leading-[42px]">
              <p className="m-0">
                Landing a job shouldn&rsquo;t feel like a second job. Skip the spam,
                the pay-to-play boards, the endless copy-paste.{" "}
                <span className="underline">Your skills do the talking</span>.{" "}
                <strong>AI handles the rest.</strong>
              </p>
            </div>
          </div>

          {/* Caption 1 — green, with arrow */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute top-[194px] left-[532px] hidden w-[192px] text-right md:block"
          >
            <p className="m-0 font-body text-[18px] leading-[24.5px] text-[#529A6A]">
              Skills <strong>&gt;</strong> keywords.
            </p>
          </div>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={withBase("/images/statement/caption-arrow-1.svg")}
            alt=""
            aria-hidden="true"
            className="pointer-events-none absolute top-[160px] left-[740px] hidden h-[51px] w-[80px] md:block"
          />

          {/* Caption 2 — coral, with arrow */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute top-[314.5px] left-[1088.62px] hidden w-[192px] md:block"
          >
            <p className="m-0 font-body text-[18px] leading-[24.5px] text-brand-coral">
              No pay-to-play. <strong>Ever</strong>.
            </p>
          </div>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={withBase("/images/statement/caption-arrow-2.svg")}
            alt=""
            aria-hidden="true"
            className="pointer-events-none absolute top-[261.5px] left-[1160px] hidden h-[45px] w-[40px] md:block"
          />

          {/* Robot */}
          <div
            ref={robot.ref}
            className={clsx(
              "reveal pointer-events-none absolute top-[380px] -left-[40px] mt-[60px] hidden h-[668px] w-[690px] md:block",
              robot.isVisible && "is-visible",
            )}
            style={{ "--reveal-delay": "200ms" } as React.CSSProperties}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={withBase("/images/statement/robot.svg")}
              alt=""
              aria-hidden="true"
              className="h-auto w-full"
            />
          </div>

          {/* Balls */}
          <div className="pointer-events-none hidden md:block">
            {BALLS.map((b) => (
              <div
                key={b.src}
                className="absolute"
                style={{
                  top: `${b.top}px`,
                  left: `${b.left}px`,
                  width: `${b.w}px`,
                  height: `${b.h}px`,
                }}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={withBase(b.src)}
                  alt=""
                  aria-hidden="true"
                  style={{
                    width: `${b.w}px`,
                    height: `${b.innerH}px`,
                    transform: b.rotate || undefined,
                  }}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
