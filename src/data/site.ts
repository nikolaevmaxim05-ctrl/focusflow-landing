import type { SiteConfig } from "./types";

export const site: SiteConfig = {
  name: "FocusFlow",
  title: "FocusFlow — Stay focused, get more done",
  description:
    "FocusFlow is your focus engine: customizable focus timers, session history, real-time stats and focus sounds that keep you on track. Get it on Google Play.",
  logo: {
    src: "/logo-mark.png",
    alt: "FocusFlow logo",
    width: 192,
    height: 192,
  },
  cta: {
    label: "Get Started",
    href: "https://play.google.com/store/apps/details?id=xyz.mmkcode.focusflow",
  },
  nav: [
    { label: "Features", href: "#features" },
    { label: "How it works", href: "#how-it-works" },
    { label: "Pricing", href: "#pricing" },
    { label: "Testimonials", href: "#testimonials" },
    { label: "Contact", href: "#contact" },
  ],
};
