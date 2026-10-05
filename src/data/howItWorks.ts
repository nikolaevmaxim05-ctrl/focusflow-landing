import type { HowItWorksContent } from "./types";

export const howItWorks: HowItWorksContent = {
  intro: {
    title: "Get focused in three steps",
  },
  steps: [
    {
      title: "Set your timer",
      description: "Choose how long you want to focus and start a session.",
      image: {
        src: "/features/timers.webp",
        alt: "Hourglass on a wooden table",
        width: 1600,
        height: 1067,
      },
    },
    {
      title: "Pick your sound",
      description: "Add a focus sound that helps you tune out distractions.",
      image: {
        src: "/features/sounds.webp",
        alt: "Headphones surrounded by string lights",
        width: 1600,
        height: 1067,
      },
    },
    {
      title: "Track your progress",
      description: "Check your history, stats and streaks after every session.",
      image: {
        src: "/features/stats.webp",
        alt: "Analytics charts on a laptop screen",
        width: 1600,
        height: 1067,
      },
    },
  ],
};
