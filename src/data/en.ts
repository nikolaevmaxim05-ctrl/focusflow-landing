import {
  ChartColumn,
  Flame,
  Headphones,
  Palette,
  Sparkles,
  Timer,
} from "lucide-react";
import {
  CONTACT_EMAIL,
  CURRENCY,
  DEMO_TIMER,
  FEATURE_IMAGES,
  FEATURES_AUTOPLAY_SECONDS,
  GOOGLE_PLAY_URL,
  HERO_MEDIA,
  LEGAL_LINKS,
  LOGO,
  PORTRAITS,
  PRICES,
  SOCIAL_LINKS,
  STEP_IMAGES,
} from "./shared";
import type { SiteContent } from "./types";

/** English texts of the site. */
export const en: SiteContent = {
  site: {
    name: "FocusFlow",
    title: "FocusFlow — Stay focused, get more done",
    description:
      "FocusFlow is your focus engine: customizable focus timers, session history, real-time stats and focus sounds that keep you on track. Get it on Google Play.",
    logo: { ...LOGO, alt: "FocusFlow logo" },
    cta: { label: "Get Started", href: GOOGLE_PLAY_URL },
    nav: [
      { label: "Features", href: "#features" },
      { label: "How it works", href: "#how-it-works" },
      { label: "Pricing", href: "#pricing" },
      { label: "Testimonials", href: "#testimonials" },
      { label: "Contact", href: "#contact" },
    ],
  },

  ui: {
    mainNavigation: "Main",
    language: "Language",
    openMenu: "Open menu",
    closeMenu: "Close menu",
    sessionOf: "Session {current} of {total}",
    pauseTimer: "Pause timer",
    resumeTimer: "Resume timer",
    storiesHint: "Tap right — next · left — back · hold — pause",
  },

  hero: {
    title: "Deep focus, one session at a time",
    description:
      "Set a timer, pick a focus sound and get to work. FocusFlow tracks your sessions, streaks and stats so you can see your progress.",
    primaryCta: { label: "Get it on Google Play", href: GOOGLE_PLAY_URL },
    secondaryCta: { label: "See how it works", href: "#how-it-works" },
    backgroundVideo: HERO_MEDIA.defaultVideo,
    mockup: {
      ...DEMO_TIMER,
      label: "FocusFlow demo: focus timer and focus sounds",
      sessionLabel: "Focus session",
      soundsLabel: "Focus sounds",
      sounds: [
        { name: "Rain", ...HERO_MEDIA.rain },
        { name: "Forest", ...HERO_MEDIA.forest },
        { name: "Cafe", ...HERO_MEDIA.cafe },
      ],
    },
  },

  features: {
    intro: {
      title: "Everything you need to stay focused",
      subtitle:
        "Simple tools that help you start, keep going and see your progress.",
    },
    autoplaySeconds: FEATURES_AUTOPLAY_SECONDS,
    items: [
      {
        icon: Timer,
        title: "Smart focus timers",
        bullets: [
          "Customizable session length",
          "Quick session switching when plans change",
          "Clear countdown you can read at a glance",
        ],
        image: { ...FEATURE_IMAGES.timers, alt: "Hourglass on a wooden table" },
      },
      {
        icon: Sparkles,
        title: "Distraction-free design",
        bullets: [
          "Clean, minimal interface",
          "Nothing on screen competes for your attention",
          "Start a session in two taps",
        ],
        image: {
          ...FEATURE_IMAGES.design,
          alt: "Tidy white desk with books and a vase",
        },
      },
      {
        icon: ChartColumn,
        title: "History and stats",
        bullets: [
          "Full session history",
          "Focus time statistics by day",
          "Watch your total hours grow",
        ],
        image: {
          ...FEATURE_IMAGES.stats,
          alt: "Analytics charts on a laptop screen",
        },
      },
      {
        icon: Headphones,
        title: "Focus sounds",
        bullets: [
          "Built-in ambient sounds",
          "Custom sound layers for deeper concentration",
          "Pick a mood for every session",
        ],
        image: {
          ...FEATURE_IMAGES.sounds,
          alt: "Headphones surrounded by string lights",
        },
      },
      {
        icon: Flame,
        title: "Points and streaks",
        bullets: [
          "Points system for your productivity",
          "Track your streaks day by day",
          "Progress you can see, not just feel",
        ],
        image: {
          ...FEATURE_IMAGES.streaks,
          alt: "High scores list on a retro arcade screen",
        },
      },
      {
        icon: Palette,
        title: "Personal themes",
        bullets: [
          "Personalize the app theme",
          "Adjust settings to the way you work",
          "Your focus space, your rules",
        ],
        image: {
          ...FEATURE_IMAGES.themes,
          alt: "Fan deck of colorful paper swatches",
        },
      },
    ],
  },

  howItWorks: {
    intro: { title: "Get focused in three steps" },
    steps: [
      {
        title: "Set your timer",
        description: "Choose how long you want to focus and start a session.",
        image: { ...STEP_IMAGES.timer, alt: "Hourglass on a wooden table" },
      },
      {
        title: "Pick your sound",
        description: "Add a focus sound that helps you tune out distractions.",
        image: {
          ...STEP_IMAGES.sound,
          alt: "Headphones surrounded by string lights",
        },
      },
      {
        title: "Track your progress",
        description:
          "Check your history, stats and streaks after every session.",
        image: {
          ...STEP_IMAGES.progress,
          alt: "Analytics charts on a laptop screen",
        },
      },
    ],
  },

  pricing: {
    intro: {
      title: "Simple pricing for every focus goal",
      subtitle: "Start free. Upgrade when you want more.",
    },
    currency: CURRENCY,
    period: "/ month",
    plans: [
      {
        name: "Free",
        price: PRICES.free,
        features: [
          "Focus timer",
          "Session history",
          "Basic stats",
          "Contains ads",
        ],
        cta: { label: "Get started", href: GOOGLE_PLAY_URL },
      },
      {
        name: "Plus",
        price: PRICES.plus,
        badge: "Most popular",
        features: [
          "Everything in Free",
          "Focus sounds",
          "Points and streaks",
          "No ads",
        ],
        cta: { label: "Get Plus", href: GOOGLE_PLAY_URL },
      },
      {
        name: "Pro",
        price: PRICES.pro,
        features: [
          "Everything in Plus",
          "Custom sound layers",
          "Detailed stats",
          "Personal themes",
        ],
        cta: { label: "Get Pro", href: GOOGLE_PLAY_URL },
      },
    ],
  },

  testimonials: {
    intro: { title: "What people say" },
    items: [
      {
        quote:
          "I finally finish my study sessions instead of scrolling my phone. The timer and the rain sound are all I need.",
        name: "Emma Larsen",
        role: "Medical student",
        photo: { ...PORTRAITS.emma, alt: "Portrait of Emma Larsen" },
      },
      {
        quote:
          "The streaks got me hooked. I haven't missed a day of deep work in two months.",
        name: "Daniel Ortiz",
        role: "Freelance designer",
        photo: { ...PORTRAITS.daniel, alt: "Portrait of Daniel Ortiz" },
      },
      {
        quote:
          "Clean, simple and out of the way. I open it, press start and get to work.",
        name: "Priya Nair",
        role: "Software engineer",
        photo: { ...PORTRAITS.priya, alt: "Portrait of Priya Nair" },
      },
    ],
  },

  footer: {
    columns: [
      {
        title: "Product",
        links: [
          { label: "Features", href: "#features" },
          { label: "How it works", href: "#how-it-works" },
          { label: "Pricing", href: "#pricing" },
          { label: "Testimonials", href: "#testimonials" },
          {
            label: "Get it on Google Play",
            href: GOOGLE_PLAY_URL,
            external: true,
          },
        ],
      },
      {
        title: "Legal",
        links: [
          { label: "Privacy Policy", href: LEGAL_LINKS.privacy },
          { label: "Terms of Service", href: LEGAL_LINKS.terms },
        ],
      },
    ],
    contact: {
      title: "Contact",
      text: "Questions or feedback? Write to us.",
      email: CONTACT_EMAIL,
      copiedMessage: "Email address copied",
    },
    socials: [
      { network: "x", label: "FocusFlow on X", href: SOCIAL_LINKS.x },
      {
        network: "instagram",
        label: "FocusFlow on Instagram",
        href: SOCIAL_LINKS.instagram,
      },
      {
        network: "youtube",
        label: "FocusFlow on YouTube",
        href: SOCIAL_LINKS.youtube,
      },
    ],
    copyright: "FocusFlow. All rights reserved.",
  },
};
