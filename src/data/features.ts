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
  items: [
    {
      icon: Timer,
      title: "Smart focus timers",
      description:
        "Customizable focus sessions with quick switching between work and breaks.",
    },
    {
      icon: Sparkles,
      title: "Distraction-free design",
      description:
        "A clean, minimal interface that keeps your attention on the task.",
    },
    {
      icon: ChartColumn,
      title: "History and stats",
      description:
        "Session history and focus time statistics show where your hours go.",
    },
    {
      icon: Headphones,
      title: "Focus sounds",
      description:
        "Layer built-in sounds to create the background that helps you concentrate.",
    },
    {
      icon: Flame,
      title: "Points and streaks",
      description: "Earn points for every session and keep your streak alive.",
    },
    {
      icon: Palette,
      title: "Personal themes",
      description:
        "Adjust settings and the app theme to fit the way you work.",
    },
  ],
};
