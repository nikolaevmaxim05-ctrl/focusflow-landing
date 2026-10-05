import type { LucideIcon } from "lucide-react";

export interface NavItem {
  label: string;
  /** In-page anchor, e.g. "#features". */
  href: string;
}

export interface ImageAsset {
  /** Path relative to the /public folder, e.g. "/logo-mark.png". */
  src: string;
  alt: string;
  width: number;
  height: number;
}

export interface CallToAction {
  label: string;
  href: string;
}

export interface SiteConfig {
  name: string;
  /** Browser tab title and search result headline. */
  title: string;
  /** Meta description shown in search results. */
  description: string;
  logo: ImageAsset;
  /** Main call-to-action button, shared by the header and other sections. */
  cta: CallToAction;
  nav: NavItem[];
}

/** Short interface texts that are not part of any section. */
export interface UiStrings {
  mainNavigation: string;
  language: string;
  openMenu: string;
  closeMenu: string;
  previousSlide: string;
  nextSlide: string;
  /** Slide position; {current} and {total} are replaced with numbers. */
  slideOf: string;
  /** Demo timer caption; {current} and {total} are replaced with numbers. */
  sessionOf: string;
  pauseTimer: string;
  resumeTimer: string;
}

export interface FocusSound {
  name: string;
  /** Looping audio file from /public, played while the sound is selected. */
  audio: string;
  /** Background video from /public, shown while the sound is selected. */
  video: string;
}

export interface PhoneMockupContent {
  /** Accessible name of the interactive demo. */
  label: string;
  sessionLabel: string;
  /** Length of one focus session on the demo timer. */
  sessionMinutes: number;
  /** Session number shown when the page loads. */
  firstSession: number;
  sessionsTotal: number;
  soundsLabel: string;
  sounds: FocusSound[];
}

export interface HeroContent {
  title: string;
  description: string;
  primaryCta: CallToAction;
  secondaryCta: CallToAction;
  /** Background video from /public, shown while no focus sound is selected. */
  backgroundVideo: string;
  mockup: PhoneMockupContent;
}

export interface SectionIntro {
  title: string;
  subtitle?: string;
}

export interface Feature {
  /** Any icon exported by lucide-react (https://lucide.dev/icons). */
  icon: LucideIcon;
  title: string;
  description: string;
  /** Background picture shown behind the slide, from /public. */
  image: ImageAsset;
}

export interface FeaturesContent {
  intro: SectionIntro;
  /** Seconds between automatic slides of the carousel. */
  autoplaySeconds: number;
  items: Feature[];
}

export interface Step {
  title: string;
  description: string;
  image: ImageAsset;
}

export interface HowItWorksContent {
  intro: SectionIntro;
  steps: Step[];
}

export interface Plan {
  name: string;
  /** Price per period; 0 is shown as a free plan price. */
  price: number;
  /** Label of the highlighted plan, e.g. "Most popular". Omit for regular plans. */
  badge?: string;
  features: string[];
  cta: CallToAction;
}

export interface PricingContent {
  intro: SectionIntro;
  /** Currency sign placed before every price. */
  currency: string;
  /** Billing period placed after every price. */
  period: string;
  plans: Plan[];
}

export interface Testimonial {
  quote: string;
  name: string;
  role: string;
  /** Square portrait from /public. Without it the initials are shown. */
  photo?: ImageAsset;
}

export interface TestimonialsContent {
  intro: SectionIntro;
  items: Testimonial[];
}

export type SocialNetwork = "x" | "instagram" | "youtube";

export interface SocialLink {
  network: SocialNetwork;
  /** Accessible name of the link, e.g. "FocusFlow on Instagram". */
  label: string;
  href: string;
}

export interface FooterColumn {
  title: string;
  links: { label: string; href: string; external?: boolean }[];
}

export interface FooterContent {
  columns: FooterColumn[];
  contact: {
    title: string;
    text: string;
    email: string;
    /** Shown for a moment after the address is copied. */
    copiedMessage: string;
  };
  socials: SocialLink[];
  /** Shown after the copyright sign and the current year. */
  copyright: string;
}

/** Everything shown on the page in one language. */
export interface SiteContent {
  site: SiteConfig;
  ui: UiStrings;
  hero: HeroContent;
  features: FeaturesContent;
  howItWorks: HowItWorksContent;
  pricing: PricingContent;
  testimonials: TestimonialsContent;
  footer: FooterContent;
}
