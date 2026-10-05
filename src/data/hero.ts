import { site } from "./site";
import type { HeroContent } from "./types";

export const hero: HeroContent = {
  title: "Deep focus, one session at a time",
  description:
    "Set a timer, pick a focus sound and get to work. FocusFlow tracks your sessions, streaks and stats so you can see your progress.",
  primaryCta: {
    label: "Get it on Google Play",
    href: site.cta.href,
  },
  secondaryCta: {
    label: "See how it works",
    href: "#how-it-works",
  },
  mockup: {
    alt: "FocusFlow app screen showing a 25-minute focus timer and a choice of focus sounds",
    sessionLabel: "Focus session",
    time: "25:00",
    sessionProgress: "Session 2 of 4",
    ringProgress: 0.7,
    soundsLabel: "Focus sounds",
    sounds: [
      { name: "Rain", active: true },
      { name: "Forest", active: false },
      { name: "Cafe", active: false },
    ],
  },
};
