"use client";

import clsx from "clsx";
import { useReveal } from "@/hooks/useReveal";
import {
  BlueskyIcon,
  DiscordIcon,
  EllipsusLogo,
  InstagramIcon,
  LinkedInIcon,
  MailIcon,
  TikTokIcon,
  TumblrIcon,
} from "@/components/icons";

const LINKS = [
  { label: "What's new", href: "https://noukash.com" },
  { label: "Blog", href: "https://noukash.com" },
  { label: "Help center", href: "https://noukash.com" },
  { label: "Who we are", href: "https://noukash.com" },
  { label: "Our stance on AI", href: "https://noukash.com" },
  { label: "Merch store", href: "https://noukash.com" },
  { label: "Status", href: "https://noukash.com" },
  { label: "Contact us", href: "mailto:support@noukash.com" },
];

const SOCIALS = [
  { label: "Email", href: "mailto:support@noukash.com", Icon: MailIcon },
  { label: "Tumblr", href: "https://noukash.com", Icon: TumblrIcon },
  { label: "Discord", href: "https://noukash.com", Icon: DiscordIcon },
  { label: "Instagram", href: "https://noukash.com", Icon: InstagramIcon },
  { label: "TikTok", href: "https://noukash.com", Icon: TikTokIcon },
  { label: "LinkedIn", href: "https://noukash.com", Icon: LinkedInIcon },
  { label: "Bluesky", href: "https://noukash.com", Icon: BlueskyIcon },
];

const LEGAL = [
  { label: "Terms of service", href: "https://noukash.com" },
  { label: "Privacy policy", href: "https://noukash.com" },
];

export function Footer() {
  const left = useReveal<HTMLDivElement>();
  const quote = useReveal<HTMLDivElement>();
  const bottom = useReveal<HTMLDivElement>();

  return (
    <footer className="relative w-full bg-surface-inverted px-5 md:px-20">
      <div className="mx-auto w-full max-w-[1312px]">
        <section className="flex flex-col gap-16 px-0 py-[72px] text-surface-light md:flex-row md:justify-between md:py-[110px]">
          {/* Left column */}
          <div
            ref={left.ref}
            className={clsx(
              "reveal flex flex-col items-start md:mr-10 md:w-[240px]",
              left.isVisible && "is-visible",
            )}
          >
            <EllipsusLogo className="mb-10 h-[37px] w-[164px] text-surface-light" />
            <ul className="m-0 mb-[74px] w-[122px] list-none p-0">
              {LINKS.map((l) => (
                <li key={l.label} className="h-[39px] font-body text-[16px] leading-[19px]">
                  <a href={l.href} className="transition-opacity hover:opacity-70">
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
            <ul className="m-0 flex w-full list-none gap-3 p-0 md:w-[240px]">
              {SOCIALS.map(({ label, href, Icon }) => (
                <li key={label} className="h-[29px] w-6">
                  <a
                    href={href}
                    aria-label={label}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex h-full w-full items-center justify-center text-surface-light transition-opacity hover:opacity-70"
                  >
                    <Icon className="h-auto max-h-[25px] w-auto max-w-full" />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Right column */}
          <div className="flex flex-col justify-between md:w-[640px] md:items-end">
            <div
              ref={quote.ref}
              className={clsx("reveal mb-5", quote.isVisible && "is-visible")}
              style={{ "--reveal-delay": "100ms" } as React.CSSProperties}
            >
              <div className="mb-5 font-display text-[28px] font-light leading-[1.2] text-surface-light md:text-[40px] md:leading-[48px]">
                <p className="m-0">
                  &ldquo;Your work is going to fill a large part of your life. The only way
                  to be truly satisfied is to do what you believe is great work.&rdquo;
                </p>
              </div>
              <span className="font-body text-[20px] font-normal text-surface-light md:text-right">
                Steve Jobs
              </span>
            </div>

            <div
              ref={bottom.ref}
              className={clsx(
                "reveal mt-10 flex w-full flex-col gap-6 md:mt-0 md:flex-row md:items-center md:justify-between",
                bottom.isVisible && "is-visible",
              )}
              style={{ "--reveal-delay": "200ms" } as React.CSSProperties}
            >
              <ul className="m-0 flex list-none gap-[72px] p-0 font-body text-[16px] leading-[19px] text-surface-light">
                {LEGAL.map((l) => (
                  <li key={l.label}>
                    <a href={l.href} className="transition-opacity hover:opacity-70">
                      {l.label}
                    </a>
                  </li>
                ))}
              </ul>
              <span className="block w-[160px] font-body text-[14px] leading-[19px] text-surface-light">
                123 Career Way San Francisco, CA 94103
              </span>
            </div>
          </div>
        </section>
      </div>
    </footer>
  );
}
