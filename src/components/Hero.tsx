import { HeroCursorLeftIcon, HeroCursorRightIcon } from "./icons";
import { LettersScatter } from "./LettersScatter";

const CTA_HREF =
  "https://write.ellipsus.com?utm_medium=website&utm_source=home_hero&utm_campaign=5569_join-for-free";

export function Hero() {
  return (
    <section className="relative flex min-h-[900px] w-full items-center justify-center overflow-hidden bg-surface-hero text-surface-light py-20">
      <LettersScatter className="pointer-events-none absolute inset-0 h-full w-full" />

      <span
        aria-hidden="true"
        className="pointer-events-none absolute top-[129px] left-[160px] hidden h-[134px] w-[120px] md:block"
      >
        <HeroCursorLeftIcon className="h-full w-full" />
      </span>

      <span
        aria-hidden="true"
        className="pointer-events-none absolute top-[107px] right-[86px] hidden h-[76px] w-[60px] md:block"
      >
        <HeroCursorRightIcon className="h-full w-full" />
      </span>

      <div className="relative w-full px-6 md:px-20">
        <div className="mx-auto flex w-full max-w-[1312px] flex-col items-center">
          <h1 className="hero-title m-0 mb-[50px] text-center font-display text-[56px] font-light leading-[1.05] text-surface-light md:text-[96px]">
            Write like a human.
          </h1>

          <p className="m-0 mb-10 max-w-[420px] text-center font-body text-xl font-normal text-surface-light md:text-2xl">
            Ellipsus is a collaborative writing tool made for creativity.
          </p>

          <a
            target="_blank"
            rel="noopener noreferrer"
            href={CTA_HREF}
            className="group relative inline-flex h-[42px] items-center justify-center overflow-hidden rounded-m bg-white px-4 font-body text-[16px] font-medium text-content-primary"
          >
            <span className="pointer-events-none absolute inset-0 rounded-m border border-content-primary transition-colors duration-300 group-hover:bg-content-primary" />
            <span className="relative transition-colors duration-300 group-hover:text-content-inverted">
              Join for free
            </span>
          </a>
        </div>
      </div>
    </section>
  );
}
