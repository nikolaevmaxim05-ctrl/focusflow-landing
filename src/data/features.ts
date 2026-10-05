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
  autoplaySeconds: 6,
  items: [
    {
      icon: Timer,
      title: "Smart focus timers",
      description:
        "Customizable focus sessions with quick switching between work and breaks.",
      background: { type: "illustration", name: "timer" },
    },
    {
      icon: Sparkles,
      title: "Distraction-free design",
      description:
        "A clean, minimal interface that keeps your attention on the task.",
      background: { type: "illustration", name: "minimal" },
    },
    {
      icon: ChartColumn,
      title: "History and stats",
      description:
        "Session history and focus time statistics show where your hours go.",
      background: { type: "illustration", name: "stats" },
    },
    {
      icon: Headphones,
      title: "Focus sounds",
      description:
        "Layer built-in sounds to create the background that helps you concentrate.",
      background: { type: "illustration", name: "sounds" },
    },
    {
      icon: Flame,
      title: "Points and streaks",
      description: "Earn points for every session and keep your streak alive.",
      background: { type: "illustration", name: "streak" },
    },
    {
      icon: Palette,
      title: "Personal themes",
      description: "Adjust settings and the app theme to fit the way you work.",
      background: { type: "illustration", name: "themes" },
    },
  ],
};
