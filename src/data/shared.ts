/**
 * Values that are the same in every language: links, file paths, prices and
 * timings. Texts live in the language files next to this one.
 */

export const GOOGLE_PLAY_URL =
  "https://play.google.com/store/apps/details?id=xyz.mmkcode.focusflow";

// Placeholder: replace with the real support address.
export const CONTACT_EMAIL = "hello@example.com";

// Placeholders: replace "#" with the real profile links.
export const SOCIAL_LINKS = {
  x: "#",
  instagram: "#",
  youtube: "#",
};

// Placeholders: these pages do not exist yet.
export const LEGAL_LINKS = {
  privacy: "#",
  terms: "#",
};

export const LOGO = { src: "/logo-mark.png", width: 192, height: 192 };

/** Hero demo: background videos and looping sounds. */
export const HERO_MEDIA = {
  defaultVideo: "/hero/default.mp4",
  rain: { audio: "/hero/rain.mp3", video: "/hero/rain.mp4" },
  forest: { audio: "/hero/forest.mp3", video: "/hero/forest.mp4" },
  cafe: { audio: "/hero/cafe.mp3", video: "/hero/cafe.mp4" },
};

/** Hero demo timer. */
export const DEMO_TIMER = {
  sessionMinutes: 25,
  firstSession: 2,
  sessionsTotal: 4,
};

/** Seconds between automatic slides of the Features carousel. */
export const FEATURES_AUTOPLAY_SECONDS = 4;

const photo = (src: string) => ({ src, width: 1600, height: 1067 });

/** Background photos of the Features carousel. */
export const FEATURE_IMAGES = {
  timers: photo("/features/timers.webp"),
  design: photo("/features/design.webp"),
  stats: photo("/features/stats.webp"),
  sounds: photo("/features/sounds.webp"),
  streaks: photo("/features/streaks.webp"),
  themes: photo("/features/themes.webp"),
};

/** Photos of the How it works steps. Placeholders: they repeat the carousel photos. */
export const STEP_IMAGES = {
  timer: photo("/features/timers.webp"),
  sound: photo("/features/sounds.webp"),
  progress: photo("/features/stats.webp"),
};

const portrait = (src: string) => ({ src, width: 200, height: 200 });

export const PORTRAITS = {
  emma: portrait("/testimonials/emma.webp"),
  daniel: portrait("/testimonials/daniel.webp"),
  priya: portrait("/testimonials/priya.webp"),
};

/** Monthly plan prices in the pricing currency. */
export const PRICES = { free: 0, plus: 2.99, pro: 4.99 };

export const CURRENCY = "$";
