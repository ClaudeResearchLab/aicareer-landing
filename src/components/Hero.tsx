import { HeroCursorLeftIcon, HeroCursorRightIcon } from "./icons";
import { LettersScatter } from "./LettersScatter";

const CTA_HREF =
  "https://write.ellipsus.com?utm_medium=website&utm_source=home_hero&utm_campaign=5569_join-for-free";

export function Hero() {
  return (
    <section className="hero-scatter-root relative flex min-h-[900px] w-full items-center justify-center overflow-hidden bg-surface-hero text-surface-light py-20">
      <span
        aria-hidden="true"
        className="hero-cursor-a pointer-events-none absolute top-[129px] left-[160px] hidden h-[134px] w-[120px] md:block"
      >
        <HeroCursorLeftIcon className="h-full w-full" />
      </span>

      <span
        aria-hidden="true"
        className="hero-cursor-b pointer-events-none absolute top-[107px] right-[86px] hidden h-[76px] w-[60px] md:block"
      >
        <HeroCursorRightIcon className="h-full w-full" />
      </span>

      <div className="relative w-full px-6 md:px-20">
        <div className="mx-auto flex w-full max-w-[1312px] flex-col items-center">
          <a
            href="#whats-new"
            className="group relative z-20 mb-8 inline-flex items-center gap-2 rounded-full border border-surface-light/25 bg-surface-light/5 px-4 py-1.5 font-body text-[13px] font-normal text-surface-light/85 backdrop-blur-sm transition-colors hover:border-surface-light/50 hover:text-surface-light"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-brand-coral" aria-hidden="true" />
            <span>AICareer for Web is here</span>
            <span
              aria-hidden="true"
              className="ml-1 transition-transform duration-300 group-hover:translate-x-0.5"
            >
              →
            </span>
          </a>

          <h1 className="hero-title m-0 mb-[50px] text-center font-display text-[56px] font-light leading-[1.05] text-surface-light md:text-[96px]">
            Your dream job, found.
          </h1>

          <p className="m-0 mb-10 max-w-[520px] text-center font-body text-xl font-normal text-surface-light md:text-2xl">
            AICareer is your AI recruiter. Swipe through jobs matched to your skills. We tailor your CV, apply for you, and track every response.
          </p>

          <a
            target="_blank"
            rel="noopener noreferrer"
            href={CTA_HREF}
            className="hero-cta group relative inline-flex h-[42px] items-center justify-center overflow-hidden rounded-m bg-white px-4 font-body text-[16px] font-medium text-content-primary"
          >
            <span className="pointer-events-none absolute inset-0 rounded-m border border-content-primary transition-colors duration-300 group-hover:bg-content-primary" />
            <span className="relative transition-colors duration-300 group-hover:text-content-inverted">
              Join for free
            </span>
          </a>

          <ul className="relative z-20 mt-8 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 font-body text-[13px] text-surface-light/75 md:text-[14px]">
            <li className="inline-flex items-center gap-1.5">
              <span aria-hidden="true" className="text-[15px] leading-none">★</span>
              <span>Rated 4.8/5 on the App Store</span>
            </li>
            <li aria-hidden="true" className="h-3 w-px bg-surface-light/20" />
            <li className="inline-flex items-center gap-1.5">
              <span aria-hidden="true" className="text-[15px] leading-none">◆</span>
              <span>50,000+ careerists hired</span>
            </li>
            <li aria-hidden="true" className="h-3 w-px bg-surface-light/20" />
            <li className="inline-flex items-center gap-1.5">
              <span aria-hidden="true" className="text-[15px] leading-none">◴</span>
              <span>Saves 20+ hours every week</span>
            </li>
          </ul>
        </div>
      </div>

      <LettersScatter className="pointer-events-none absolute inset-0 z-10 h-full w-full" />
    </section>
  );
}
