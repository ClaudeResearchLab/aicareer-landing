/**
 * Content model for the Ellipsus homepage, extracted from __NEXT_DATA__
 * on 2026-04-20. Shapes mirror the Sanity CMS payload verbatim so that
 * future redesigner runs can swap in a live fetch without touching the
 * component signatures.
 */

export interface RotatingWord {
  word: string;
  color: string;
}

export interface HeroContent {
  title: string;
  intro: string;
  ctaLabel: string;
  ctaHref: string;
}

export interface DevicesContent {
  captionParts: [string, string, string];
  desktopImage: ImageAsset;
  phone1Image: ImageAsset;
  phone2Image: ImageAsset;
  tabletImage: ImageAsset;
}

export interface IntroductionContent {
  sentencePrefix: string;
  sentenceSuffix: string;
  rotatingWords: RotatingWord[];
  paragraphs: string[];
  collaboratorsLabel: string;
}

export interface ShowcaseSlide {
  title: string;
  videoWebm: string;
  videoMp4: string;
  poster: ImageAsset;
}

export interface ShowcaseContent {
  slides: ShowcaseSlide[];
}

export interface StatementContent {
  heading: string;
  body: string[];
}

export interface CounterContent {
  number: string;
  label: string;
}

export interface SignupBannerContent {
  heading: string;
  ctaLabel: string;
  ctaHref: string;
}

export interface FooterColumn {
  heading: string;
  links: { label: string; href: string }[];
}

export interface FooterContent {
  columns: FooterColumn[];
  tagline: string;
  copyright: string;
  socialLinks: { platform: string; href: string }[];
}

export interface NavMenuEntry {
  label: string;
  items?: {
    label: string;
    href: string;
    icon?: string;
    description?: string;
    image?: ImageAsset;
  }[];
  href?: string;
}

export interface NavigationContent {
  entries: NavMenuEntry[];
  loginHref: string;
  signupHref: string;
  signupLabel: string;
  loginLabel: string;
}

export interface ImageAsset {
  src: string;
  alt: string;
  width: number;
  height: number;
}

export interface HomepageData {
  navigation: NavigationContent;
  hero: HeroContent;
  devices: DevicesContent;
  introduction: IntroductionContent;
  showcase: ShowcaseContent;
  statement: StatementContent;
  counter: CounterContent;
  signup: SignupBannerContent;
  footer: FooterContent;
}
