import {
  ChartColumn,
  Flame,
  Headphones,
  Palette,
  Sparkles,
  Timer,
} from "lucide-react";
import type { FeaturesContent } from "./types";

export const features: FeaturesContent = {
  intro: {
    title: "Everything you need to stay focused",
    subtitle:
      "Simple tools that help you start, keep going and see your progress.",
  },
  autoplaySeconds: 4,
  items: [
    {
      icon: Timer,
      title: "Smart focus timers",
      description:
        "Customizable focus sessions with quick switching between work and breaks.",
      image: {
          src: "/features/timers.webp",
          alt: "Hourglass on a wooden table",
          width: 1600,
          height: 1067,
        },
    },
    {
      icon: Sparkles,
      title: "Distraction-free design",
      description:
        "A clean, minimal interface that keeps your attention on the task.",
      image: {
          src: "/features/design.webp",
          alt: "Tidy white desk with books and a vase",
          width: 1600,
          height: 1067,
        },
    },
    {
      icon: ChartColumn,
      title: "History and stats",
      description:
        "Session history and focus time statistics show where your hours go.",
      image: {
          src: "/features/stats.webp",
          alt: "Analytics charts on a laptop screen",
          width: 1600,
          height: 1067,
        },
    },
    {
      icon: Headphones,
      title: "Focus sounds",
      description:
        "Layer built-in sounds to create the background that helps you concentrate.",
      image: {
          src: "/features/sounds.webp",
          alt: "Headphones surrounded by string lights",
          width: 1600,
          height: 1067,
        },
    },
    {
      icon: Flame,
      title: "Points and streaks",
      description: "Earn points for every session and keep your streak alive.",
      image: {
        src: "/features/streaks.webp",
        alt: "High scores list on a retro arcade screen",
        width: 1600,
        height: 1067,
      },
    },
    {
      icon: Palette,
      title: "Personal themes",
      description: "Adjust settings and the app theme to fit the way you work.",
      image: {
          src: "/features/themes.webp",
          alt: "Fan deck of colorful paper swatches",
          width: 1600,
          height: 1067,
        },
    },
  ],
};
