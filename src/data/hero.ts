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
  backgroundVideo: "/hero/default.mp4",
  mockup: {
    label: "FocusFlow demo: focus timer and focus sounds",
    sessionLabel: "Focus session",
    sessionMinutes: 25,
    firstSession: 2,
    sessionsTotal: 4,
    soundsLabel: "Focus sounds",
    sounds: [
      {
        name: "Rain",
        audio: "/hero/rain.mp3",
        video: "/hero/rain.mp4",
      },
      {
        name: "Forest",
        audio: "/hero/forest.mp3",
        video: "/hero/forest.mp4",
      },
      {
        name: "Cafe",
        audio: "/hero/cafe.mp3",
        video: "/hero/cafe.mp4",
      },
    ],
  },
};
