"use client";

import { useEffect, useRef, useState } from "react";
import clsx from "clsx";
import { withBase } from "@/lib/basePath";
import { useReveal } from "@/hooks/useReveal";

type Slide = {
  caption: string;
  webm: string;
  mp4: string;
  poster: string;
};

const SLIDES: Slide[] = [
  {
    caption: "Swipe a feed matched to your real skills",
    webm: "/videos/showcase-1-connected-drafts.webm",
    mp4: "/videos/showcase-1-connected-drafts.mp4",
    poster: "/images/showcase/poster-1-connected-drafts.png",
  },
  {
    caption: "AI tailors your CV to every role",
    webm: "/videos/showcase-2-comments-drafts.webm",
    mp4: "/videos/showcase-2-comments-drafts.mp4",
    poster: "/images/showcase/poster-2-comments-drafts.png",
  },
  {
    caption: "Auto-apply, track, follow up. All in one place.",
    webm: "/videos/showcase-3-merge.webm",
    mp4: "/videos/showcase-3-merge.mp4",
    poster: "/images/showcase/poster-3-merge.png",
  },
];

const SLIDE_W = 809.45;
const SLIDE_GAP = 36;

function NavArrow({ direction }: { direction: "left" | "right" }) {
  return (
    <svg
      viewBox="0 0 42 12"
      fill="none"
      aria-hidden="true"
      className={clsx(
        "h-[10px] w-[36px] overflow-visible transition-transform duration-300 ease-out",
        direction === "left"
          ? "-scale-x-100 group-hover:-translate-x-[4px] group-disabled:group-hover:translate-x-0"
          : "group-hover:translate-x-[4px] group-disabled:group-hover:translate-x-0",
      )}
    >
      <path
        d="M1 6 Q 10 4.5, 20 6 T 40 6"
        stroke="currentColor"
        strokeWidth="1.25"
        strokeLinecap="round"
      />
      <path
        d="M34.5 1.5 L 40 6 L 34.5 10.5"
        stroke="currentColor"
        strokeWidth="1.25"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function Showcase() {
  const [index, setIndex] = useState(0);
  const videoRefs = useRef<Array<HTMLVideoElement | null>>([]);
  const title = useReveal<HTMLHeadingElement>();
  const intro = useReveal<HTMLParagraphElement>();
  const cup = useReveal<HTMLSpanElement>();
  const lamp = useReveal<HTMLSpanElement>();
  const sliderReveal = useReveal<HTMLDivElement>();

  useEffect(() => {
    videoRefs.current.forEach((v, i) => {
      if (!v) return;
      if (i === index) {
        v.play().catch(() => {});
      } else {
        v.pause();
      }
    });
  }, [index]);

  const prev = () => setIndex((i) => Math.max(0, i - 1));
  const next = () => setIndex((i) => Math.min(SLIDES.length - 1, i + 1));

  return (
    <section className="relative w-full bg-surface-inverted-2 [display:flow-root]">
      {/* Top wave divider */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={withBase("/images/showcase/decor/wave-top.svg")}
        alt=""
        aria-hidden="true"
        className="pointer-events-none absolute top-0 left-0 -translate-y-[54px] h-[93px] w-full"
      />

      <div className="relative">
        {/* Title wrapper */}
        <div className="relative pt-[90px] px-5 md:px-20">
          <div className="relative mx-auto flex w-full max-w-[1312px] justify-center">
            <div className="relative flex w-full max-w-[700px] flex-col items-center">
              <span
                ref={cup.ref}
                aria-hidden="true"
                className={clsx(
                  "reveal pointer-events-none absolute -top-[20px] -left-[410px] hidden h-[400px] w-[400px] md:block",
                  cup.isVisible && "is-visible",
                )}
                style={{ "--reveal-delay": "200ms" } as React.CSSProperties}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={withBase("/images/showcase/decor/robo.png")}
                  alt=""
                  className="h-full w-full object-contain"
                />
              </span>

              <h2
                ref={title.ref}
                className={clsx(
                  "reveal m-0 mb-[36px] text-balance text-center font-display text-[48px] font-light leading-[1.1] text-surface-light md:text-[80px] md:leading-[96px]",
                  title.isVisible && "is-visible",
                )}
              >
                An AI job hunter that never sleeps.
              </h2>

              <p
                ref={intro.ref}
                className={clsx(
                  "reveal my-[18px] text-center font-body text-[18px] leading-[25.2px] font-normal text-surface-light",
                  intro.isVisible && "is-visible",
                )}
                style={{ "--reveal-delay": "150ms" } as React.CSSProperties}
              >
                Stop juggling LinkedIn, spreadsheets, PDF resumes, and recruiter DMs.
                Upload your CV once. Swipe right. AICareer does the rest: matching
                roles, tailoring your CV, submitting applications, following up.
                While you sleep.
              </p>

              <span
                ref={lamp.ref}
                aria-hidden="true"
                className={clsx(
                  "reveal pointer-events-none absolute -top-[125px] -right-[405px] hidden h-[460px] w-[460px] md:block",
                  lamp.isVisible && "is-visible",
                )}
                style={{ "--reveal-delay": "200ms" } as React.CSSProperties}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={withBase("/images/showcase/decor/coffee.png")}
                  alt=""
                  className="h-full w-full object-contain"
                />
              </span>
            </div>
          </div>
        </div>

        {/* 3) Slider */}
        <div
          ref={sliderReveal.ref}
          className={clsx(
            "reveal relative mt-[72px] overflow-hidden pb-[100px]",
            sliderReveal.isVisible && "is-visible",
          )}
        >
          {/* Slider track — centered by margin */}
          <div className="relative mx-auto w-full max-w-[1054px] px-5 md:px-0">
            <div className="relative overflow-hidden">
              <div
                className="flex transition-transform duration-500 ease-out will-change-transform"
                style={{ transform: `translateX(calc(${-index} * (min(${SLIDE_W}px, 100%) + ${SLIDE_GAP}px)))` }}
              >
                {SLIDES.map((s, i) => (
                  <div
                    key={s.mp4}
                    className="relative shrink-0 overflow-hidden rounded-[20px]"
                    style={{
                      width: `min(${SLIDE_W}px, 100%)`,
                      marginRight: `${SLIDE_GAP}px`,
                      aspectRatio: `${SLIDE_W} / 376.3`,
                    }}
                  >
                    <video
                      ref={(el) => {
                        videoRefs.current[i] = el;
                      }}
                      className="absolute inset-0 h-full w-full object-cover"
                      poster={withBase(s.poster)}
                      muted
                      loop
                      playsInline
                      preload="metadata"
                      autoPlay={i === 0}
                    >
                      <source src={withBase(s.webm)} type="video/webm" />
                      <source src={withBase(s.mp4)} type="video/mp4" />
                    </video>
                  </div>
                ))}
              </div>
            </div>

          </div>

          {/* Editorial nav: serif index + hand-drawn prev/next */}
          <div className="mx-auto mt-10 flex w-full max-w-[1054px] items-end justify-between px-5 md:px-0">
            <div className="flex items-baseline gap-2 text-surface-light">
              <span className="relative font-display text-[56px] leading-none font-light italic md:text-[72px]">
                {String(index + 1).padStart(2, "0")}
                <svg
                  viewBox="0 0 80 6"
                  preserveAspectRatio="none"
                  aria-hidden="true"
                  className="pointer-events-none absolute -bottom-[6px] left-0 h-[5px] w-full text-brand-coral"
                >
                  <path
                    d="M1 3.5 Q 20 1, 40 3 T 79 3"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    fill="none"
                  />
                </svg>
              </span>
              <span className="font-body text-[16px] opacity-40 md:text-[18px]">
                / {String(SLIDES.length).padStart(2, "0")}
              </span>
            </div>

            <div className="flex items-center gap-6 md:gap-10">
              <button
                type="button"
                aria-label="Previous slide"
                onClick={prev}
                disabled={index === 0}
                className={clsx(
                  "group flex items-center gap-3 font-body text-[13px] font-medium uppercase tracking-[0.18em] text-surface-light transition-opacity",
                  "disabled:cursor-not-allowed disabled:opacity-30",
                  "not-disabled:hover:opacity-80",
                )}
              >
                <NavArrow direction="left" />
                <span>Prev</span>
              </button>
              <button
                type="button"
                aria-label="Next slide"
                onClick={next}
                disabled={index === SLIDES.length - 1}
                className={clsx(
                  "group flex items-center gap-3 font-body text-[13px] font-medium uppercase tracking-[0.18em] text-surface-light transition-opacity",
                  "disabled:cursor-not-allowed disabled:opacity-30",
                  "not-disabled:hover:opacity-80",
                )}
              >
                <span>Next</span>
                <NavArrow direction="right" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
