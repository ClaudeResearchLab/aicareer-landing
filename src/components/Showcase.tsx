"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
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

const AVATARS = [
  { src: "/images/avatars/mary-shelley.png", alt: "Avatar of a careerist named Alex" },
  { src: "/images/avatars/p.png", alt: "Avatar of a careerist named Priya" },
  { src: "/images/avatars/lord-byron.png", alt: "Avatar of a careerist named Jordan" },
];

const SLIDE_W = 809.45;
const SLIDE_GAP = 36;
const STEP = SLIDE_W + SLIDE_GAP;

export function Showcase() {
  const [index, setIndex] = useState(0);
  const videoRefs = useRef<Array<HTMLVideoElement | null>>([]);
  const collab = useReveal<HTMLDivElement>();
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
        {/* 1) Collaborators row */}
        <div className="px-5 md:px-20">
          <div className="mx-auto w-full max-w-[1312px]">
            <div
              ref={collab.ref}
              className={clsx(
                "reveal mt-[90px] flex h-12 items-center gap-3 md:gap-5",
                collab.isVisible && "is-visible",
              )}
            >
              <div className="flex">
                {AVATARS.map((a, i) => (
                  <Image
                    key={a.src}
                    src={withBase(a.src)}
                    alt={a.alt}
                    width={48}
                    height={48}
                    className={clsx(
                      "h-12 w-12 rounded-full border-2 border-surface-inverted-2 object-cover",
                      i > 0 && "-ml-3",
                    )}
                  />
                ))}
              </div>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={withBase("/images/showcase/decor/collab-arrow.svg")}
                alt=""
                aria-hidden="true"
                className="hidden h-[29px] w-[73px] md:block"
              />
              <p className="font-body text-[20px] text-surface-light">
                That&apos;s us, landing offers!
              </p>
            </div>
          </div>
        </div>

        {/* 2) Title wrapper */}
        <div className="relative mt-16 px-5 md:px-20">
          <div className="relative mx-auto flex w-full max-w-[1312px] justify-center">
            <div className="relative flex w-full max-w-[700px] flex-col items-center">
              <span
                ref={cup.ref}
                aria-hidden="true"
                className={clsx(
                  "reveal pointer-events-none absolute top-[29.5px] -left-[320px] hidden h-[310px] w-[320px] md:block",
                  cup.isVisible && "is-visible",
                )}
                style={{ "--reveal-delay": "200ms" } as React.CSSProperties}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={withBase("/images/showcase/decor/cup.svg")}
                  alt=""
                  className="h-full w-full"
                />
              </span>

              <h2
                ref={title.ref}
                className={clsx(
                  "reveal m-0 mb-[36px] text-center font-display text-[48px] font-light leading-[1.1] text-surface-light md:text-[80px] md:leading-[96px]",
                  title.isVisible && "is-visible",
                )}
              >
                An AI recruiter that never sleeps.
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
                  "reveal pointer-events-none absolute -top-[10px] -right-[320px] hidden h-[361px] w-[320px] md:block",
                  lamp.isVisible && "is-visible",
                )}
                style={{ "--reveal-delay": "200ms" } as React.CSSProperties}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={withBase("/images/showcase/decor/lamp.svg")}
                  alt=""
                  className="h-full w-full"
                />
              </span>
            </div>
          </div>
        </div>

        {/* 3) Slider */}
        <div
          ref={sliderReveal.ref}
          className={clsx(
            "reveal relative mt-[72px] overflow-hidden",
            sliderReveal.isVisible && "is-visible",
          )}
        >
          {/* Slider track — centered by margin */}
          <div className="relative mx-auto w-full max-w-[1054px] px-5 md:px-0 pb-[72px]">
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

            {/* Wide (desktop) arrow buttons — absolute, flanking slider */}
            <button
              type="button"
              aria-label="Previous slide"
              onClick={prev}
              disabled={index === 0}
              className={clsx(
                "absolute top-1/2 -left-[104px] hidden h-[84px] w-[84px] -translate-y-1/2 items-center justify-center md:flex",
                "transition-opacity",
                index === 0 ? "opacity-40" : "opacity-100 hover:opacity-80",
              )}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={withBase("/images/showcase/decor/slide-arrow.svg")}
                alt=""
                className="h-full w-full rotate-180"
              />
            </button>
            <button
              type="button"
              aria-label="Next slide"
              onClick={next}
              disabled={index === SLIDES.length - 1}
              className={clsx(
                "absolute top-1/2 -right-[104px] hidden h-[84px] w-[84px] -translate-y-1/2 items-center justify-center md:flex",
                "transition-opacity",
                index === SLIDES.length - 1
                  ? "opacity-40"
                  : "opacity-100 hover:opacity-80",
              )}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={withBase("/images/showcase/decor/slide-arrow.svg")}
                alt=""
                className="h-full w-full"
              />
            </button>
          </div>

          {/* Captions + narrow arrows (mobile gets narrow arrows) */}
          <div className="relative mx-auto mt-10 flex w-full max-w-[894px] items-center justify-center px-5 md:px-0">
            <button
              type="button"
              aria-label="Previous slide"
              onClick={prev}
              disabled={index === 0}
              className={clsx(
                "mr-3 flex h-[84px] w-[84px] shrink-0 items-center justify-center md:hidden",
                index === 0 ? "opacity-40" : "opacity-100",
              )}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={withBase("/images/showcase/decor/slide-arrow.svg")}
                alt=""
                className="h-full w-full rotate-180"
              />
            </button>

            <div className="relative h-[24.5px] w-full">
              {SLIDES.map((s, i) => (
                <div
                  key={s.caption}
                  className="absolute inset-0 flex items-center justify-center text-center font-body text-[18px] font-bold leading-[24.5px] text-surface-light transition-opacity duration-300"
                  style={{
                    opacity: i === index ? 1 : 0,
                    transitionDelay: i === index ? "0.3s" : "0s",
                  }}
                  aria-hidden={i !== index}
                >
                  {s.caption}
                </div>
              ))}
            </div>

            <button
              type="button"
              aria-label="Next slide"
              onClick={next}
              disabled={index === SLIDES.length - 1}
              className={clsx(
                "ml-3 flex h-[84px] w-[84px] shrink-0 items-center justify-center md:hidden",
                index === SLIDES.length - 1 ? "opacity-40" : "opacity-100",
              )}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={withBase("/images/showcase/decor/slide-arrow.svg")}
                alt=""
                className="h-full w-full"
              />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
