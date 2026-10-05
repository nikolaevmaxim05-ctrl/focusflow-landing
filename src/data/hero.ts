import { site } from "./site";
import type { HeroContent } from "./types";

// TEMPORARY: videos and sounds are hot-linked stock candidates until the
// final files are chosen and saved under /public.
const pexelsVideo = (file: string) =>
  `https://videos.pexels.com/video-files/${file}`;
const mixkitSound = (id: number) =>
  `https://assets.mixkit.co/active_storage/sfx/${id}/${id}-preview.mp3`;

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
  backgroundVideo: pexelsVideo("6543215/6543215-sd_960_464_30fps.mp4"),
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
        audio: mixkitSound(2394),
        video: pexelsVideo("4786522/4786522-sd_640_360_30fps.mp4"),
      },
      {
        name: "Forest",
        audio: mixkitSound(1210),
        video: pexelsVideo("5744473/5744473-sd_640_360_24fps.mp4"),
      },
      {
        name: "Cafe",
        audio: mixkitSound(444),
        video: pexelsVideo("6828710/6828710-sd_640_360_25fps.mp4"),
      },
    ],
  },
};
