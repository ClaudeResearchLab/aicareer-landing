import Link from "next/link";
import Image from "next/image";
import { withBase } from "@/lib/basePath";
import {
  EllipsusLogo,
  NavChevronIcon,
  NavHighlightIcon,
  NavSubUnderlineIcon,
} from "./icons";

type SubItem = {
  label: string;
  href: string;
  external?: boolean;
};

type Entry = {
  label: string;
  href: string;
  external?: boolean;
  subItems: SubItem[];
  previewImage: { src: string; alt: string };
};

const ENTRIES: Entry[] = [
  {
    label: "Features",
    href: "/features",
    subItems: [
      { label: "Features", href: "/product-tour" },
      { label: "What's new", href: "/blog/whats-new" },
    ],
    previewImage: {
      src: "/images/nav/sub-card-1.png",
      alt: "Preview of the AICareer features page",
    },
  },
  {
    label: "Resources",
    href: "https://help.ellipsus.com/",
    external: true,
    subItems: [
      { label: "Blog", href: "/blog" },
      { label: "Help center", href: "https://help.ellipsus.com/", external: true },
      { label: "Merch", href: "https://merch.ellipsus.com/", external: true },
    ],
    previewImage: {
      src: "/images/nav/sub-card-4.png",
      alt: "Preview of the AICareer resources page",
    },
  },
  {
    label: "About",
    href: "/about",
    subItems: [
      { label: "Who we are", href: "/about" },
      { label: "Our stance on AI", href: "/generative-ai" },
    ],
    previewImage: {
      src: "/images/nav/sub-card-7.png",
      alt: "Preview of the AICareer about page",
    },
  },
];

function NavLink({
  href,
  external,
  children,
  className,
}: {
  href: string;
  external?: boolean;
  children: React.ReactNode;
  className?: string;
}) {
  if (external) {
    return (
      <a
        href={href}
        className={className}
        target="_blank"
        rel="noopener noreferrer"
      >
        {children}
      </a>
    );
  }
  return (
    <Link href={href} className={className}>
      {children}
    </Link>
  );
}

export function Navigation() {
  return (
    <nav className="sticky top-0 z-[200] h-[64px] md:h-[74px] bg-surface-primary flex items-center justify-between px-6 md:px-16">
      <NavLink href="/" className="flex items-center text-content-primary">
        <EllipsusLogo className="h-7 md:h-[33px] w-auto" />
        <span className="sr-only">AICareer</span>
      </NavLink>

      <ul className="hidden md:flex mx-10 gap-10 h-[58px]">
        {ENTRIES.map((entry) => (
          <li key={entry.label} className="group relative flex">
            <NavLink
              href={entry.href}
              external={entry.external}
              className="flex items-center py-4 text-[16px] font-normal text-content-primary font-body"
            >
              <span className="relative flex items-center">
                <NavHighlightIcon
                  className="absolute -top-1 -left-2.5 -right-3.5 -bottom-1.5 w-[calc(100%+24px)] h-9 text-brand-coral opacity-0 transition-opacity duration-300 group-hover:opacity-100 pointer-events-none"
                />
                <span className="relative">{entry.label}</span>
                <span className="relative ml-2 mt-1 w-4 h-[22px] flex items-center justify-center">
                  <NavChevronIcon className="w-4 h-4" />
                </span>
              </span>
            </NavLink>

            <div
              className="pointer-events-none absolute top-[58px] right-[-510px] w-[600px] h-[220px] bg-surface-light rounded-l flex opacity-0 [transform:perspective(800px)_rotateX(8deg)] transition-[opacity,transform] duration-300 group-hover:opacity-100 group-hover:[transform:perspective(800px)_rotateX(0deg)] group-hover:pointer-events-auto shadow-l"
            >
              <ul className="my-6 mx-10 flex flex-col w-[220px]">
                {entry.subItems.map((sub) => (
                  <li key={sub.label} className="h-14 flex items-center">
                    <NavLink
                      href={sub.href}
                      external={sub.external}
                      className="group/sub relative inline-flex flex-col text-[16px] font-normal text-content-primary font-body"
                    >
                      <span>{sub.label}</span>
                      <NavSubUnderlineIcon className="absolute left-0 right-0 -bottom-1 w-full h-1.5 text-brand-coral opacity-0 transition-opacity duration-200 group-hover/sub:opacity-100 pointer-events-none" />
                    </NavLink>
                  </li>
                ))}
              </ul>

              <div className="relative w-[300px] h-[220px] overflow-hidden rounded-l">
                <Image
                  src={withBase(entry.previewImage.src)}
                  alt={entry.previewImage.alt}
                  fill
                  sizes="300px"
                  className="object-cover"
                />
              </div>
            </div>
          </li>
        ))}
      </ul>

      <div className="flex items-center gap-2">
        <div className="hidden md:flex items-center gap-2">
          <a
            href="https://write.ellipsus.com/"
            className="relative inline-flex items-center justify-center h-[42px] px-4 rounded-m text-[16px] font-medium text-content-primary font-body border border-content-primary transition-colors hover:bg-content-primary hover:text-content-inverted"
          >
            Log in
          </a>
          <a
            href="https://account.ellipsus.com/sign-up"
            className="relative inline-flex items-center justify-center h-[42px] px-4 rounded-m text-[16px] font-medium text-content-inverted font-body bg-surface-inverted transition-opacity hover:opacity-90"
          >
            Sign up
          </a>
        </div>
      </div>
    </nav>
  );
}
