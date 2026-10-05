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

export interface PhoneMockupContent {
  /** Text alternative read by screen readers instead of the drawing. */
  alt: string;
  sessionLabel: string;
  time: string;
  sessionProgress: string;
  /** Share of the timer ring that is filled, from 0 to 1. */
  ringProgress: number;
  soundsLabel: string;
  sounds: { name: string; active: boolean }[];
}

export interface HeroContent {
  title: string;
  description: string;
  primaryCta: CallToAction;
  secondaryCta: CallToAction;
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
