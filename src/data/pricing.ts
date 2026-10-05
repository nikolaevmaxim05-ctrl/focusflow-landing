import { site } from "./site";
import type { PricingContent } from "./types";

export const pricing: PricingContent = {
  intro: {
    title: "Simple pricing for every focus goal",
    subtitle: "Start free. Upgrade when you want more.",
  },
  currency: "$",
  period: "/ month",
  plans: [
    {
      name: "Free",
      price: 0,
      features: [
        "Focus timer",
        "Session history",
        "Basic stats",
        "Contains ads",
      ],
      cta: { label: "Get started", href: site.cta.href },
    },
    {
      name: "Plus",
      price: 2.99,
      badge: "Most popular",
      features: [
        "Everything in Free",
        "Focus sounds",
        "Points and streaks",
        "No ads",
      ],
      cta: { label: "Get Plus", href: site.cta.href },
    },
    {
      name: "Pro",
      price: 4.99,
      features: [
        "Everything in Plus",
        "Custom sound layers",
        "Detailed stats",
        "Personal themes",
      ],
      cta: { label: "Get Pro", href: site.cta.href },
    },
  ],
};
