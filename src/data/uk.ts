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

/** Ukrainian texts of the site. */
export const uk: SiteContent = {
  site: {
    name: "FocusFlow",
    title: "FocusFlow — зосередьтеся та встигайте більше",
    description:
      "FocusFlow — ваш двигун концентрації: гнучкі таймери фокусу, історія сесій, статистика в реальному часі та звуки для зосередження. Завантажте в Google Play.",
    logo: { ...LOGO, alt: "Логотип FocusFlow" },
    cta: { label: "Почати", href: GOOGLE_PLAY_URL },
    nav: [
      { label: "Можливості", href: "#features" },
      { label: "Як це працює", href: "#how-it-works" },
      { label: "Тарифи", href: "#pricing" },
      { label: "Відгуки", href: "#testimonials" },
      { label: "Контакти", href: "#contact" },
    ],
  },

  ui: {
    mainNavigation: "Головне меню",
    language: "Мова",
    openMenu: "Відкрити меню",
    closeMenu: "Закрити меню",
    previousSlide: "Попередній слайд",
    nextSlide: "Наступний слайд",
    slideOf: "{current} з {total}",
    sessionOf: "Сесія {current} з {total}",
    pauseTimer: "Поставити таймер на паузу",
    resumeTimer: "Продовжити таймер",
  },

  hero: {
    title: "Глибокий фокус — сесія за сесією",
    description:
      "Увімкніть таймер, оберіть звук для концентрації та беріться до справи. FocusFlow відстежує ваші сесії, серії та статистику, щоб ви бачили свій прогрес.",
    primaryCta: { label: "Завантажити в Google Play", href: GOOGLE_PLAY_URL },
    secondaryCta: { label: "Як це працює", href: "#how-it-works" },
    backgroundVideo: HERO_MEDIA.defaultVideo,
    mockup: {
      ...DEMO_TIMER,
      label: "Демо FocusFlow: таймер фокусу та звуки для концентрації",
      sessionLabel: "Сесія фокусу",
      soundsLabel: "Звуки для фокусу",
      sounds: [
        { name: "Дощ", ...HERO_MEDIA.rain },
        { name: "Ліс", ...HERO_MEDIA.forest },
        { name: "Кафе", ...HERO_MEDIA.cafe },
      ],
    },
  },

  features: {
    intro: {
      title: "Усе, що потрібно для концентрації",
      subtitle:
        "Прості інструменти, які допомагають почати, не зупинятися та бачити прогрес.",
    },
    autoplaySeconds: FEATURES_AUTOPLAY_SECONDS,
    items: [
      {
        icon: Timer,
        title: "Розумні таймери фокусу",
        description:
          "Гнучкі сесії фокусу зі швидким перемиканням між роботою та перервами.",
        image: {
          ...FEATURE_IMAGES.timers,
          alt: "Пісковий годинник на дерев'яному столі",
        },
      },
      {
        icon: Sparkles,
        title: "Дизайн без відволікань",
        description:
          "Чистий мінімалістичний інтерфейс, що тримає увагу на завданні.",
        image: {
          ...FEATURE_IMAGES.design,
          alt: "Охайний білий стіл із книгами та вазою",
        },
      },
      {
        icon: ChartColumn,
        title: "Історія та статистика",
        description:
          "Історія сесій і статистика часу фокусу показують, куди йдуть ваші години.",
        image: {
          ...FEATURE_IMAGES.stats,
          alt: "Графіки аналітики на екрані ноутбука",
        },
      },
      {
        icon: Headphones,
        title: "Звуки для фокусу",
        description:
          "Поєднуйте вбудовані звуки та створюйте фон, який допомагає зосередитися.",
        image: {
          ...FEATURE_IMAGES.sounds,
          alt: "Навушники серед вогників гірлянди",
        },
      },
      {
        icon: Flame,
        title: "Бали та серії",
        description: "Отримуйте бали за кожну сесію та не переривайте серію.",
        image: {
          ...FEATURE_IMAGES.streaks,
          alt: "Таблиця рекордів на екрані ретроавтомата",
        },
      },
      {
        icon: Palette,
        title: "Персональні теми",
        description:
          "Налаштуйте параметри й тему застосунку під свій стиль роботи.",
        image: {
          ...FEATURE_IMAGES.themes,
          alt: "Віяло кольорових паперових зразків",
        },
      },
    ],
  },

  howItWorks: {
    intro: { title: "Зосередьтеся за три кроки" },
    steps: [
      {
        title: "Увімкніть таймер",
        description: "Оберіть, скільки хочете працювати, і запустіть сесію.",
        image: {
          ...STEP_IMAGES.timer,
          alt: "Пісковий годинник на дерев'яному столі",
        },
      },
      {
        title: "Оберіть звук",
        description:
          "Додайте звук, який допомагає відсторонитися від відволікань.",
        image: {
          ...STEP_IMAGES.sound,
          alt: "Навушники серед вогників гірлянди",
        },
      },
      {
        title: "Стежте за прогресом",
        description:
          "Переглядайте історію, статистику та серії після кожної сесії.",
        image: {
          ...STEP_IMAGES.progress,
          alt: "Графіки аналітики на екрані ноутбука",
        },
      },
    ],
  },

  pricing: {
    intro: {
      title: "Прості тарифи для будь-якої мети",
      subtitle:
        "Почніть безплатно. Переходьте на платний тариф, коли захочеться більшого.",
    },
    currency: CURRENCY,
    period: "/ міс.",
    plans: [
      {
        name: "Free",
        price: PRICES.free,
        features: [
          "Таймер фокусу",
          "Історія сесій",
          "Базова статистика",
          "Містить рекламу",
        ],
        cta: { label: "Почати", href: GOOGLE_PLAY_URL },
      },
      {
        name: "Plus",
        price: PRICES.plus,
        badge: "Найпопулярніший",
        features: [
          "Усе з Free",
          "Звуки для фокусу",
          "Бали та серії",
          "Без реклами",
        ],
        cta: { label: "Обрати Plus", href: GOOGLE_PLAY_URL },
      },
      {
        name: "Pro",
        price: PRICES.pro,
        features: [
          "Усе з Plus",
          "Власні шари звуків",
          "Детальна статистика",
          "Персональні теми",
        ],
        cta: { label: "Обрати Pro", href: GOOGLE_PLAY_URL },
      },
    ],
  },

  testimonials: {
    intro: { title: "Що кажуть користувачі" },
    items: [
      {
        quote:
          "Я нарешті доводжу навчальні сесії до кінця, а не гортаю телефон. Таймер і звук дощу — усе, що мені потрібно.",
        name: "Emma Larsen",
        role: "Студентка-медик",
        photo: { ...PORTRAITS.emma, alt: "Портрет Emma Larsen" },
      },
      {
        quote:
          "Серії мене затягнули. За два місяці я не пропустив жодного дня глибокої роботи.",
        name: "Daniel Ortiz",
        role: "Дизайнер-фрілансер",
        photo: { ...PORTRAITS.daniel, alt: "Портрет Daniel Ortiz" },
      },
      {
        quote:
          "Чисто, просто й не заважає. Відкриваю, натискаю старт і працюю.",
        name: "Priya Nair",
        role: "Розробниця",
        photo: { ...PORTRAITS.priya, alt: "Портрет Priya Nair" },
      },
    ],
  },

  footer: {
    columns: [
      {
        title: "Продукт",
        links: [
          { label: "Можливості", href: "#features" },
          { label: "Як це працює", href: "#how-it-works" },
          { label: "Тарифи", href: "#pricing" },
          { label: "Відгуки", href: "#testimonials" },
          {
            label: "Завантажити в Google Play",
            href: GOOGLE_PLAY_URL,
            external: true,
          },
        ],
      },
      {
        title: "Правова інформація",
        links: [
          { label: "Політика конфіденційності", href: LEGAL_LINKS.privacy },
          { label: "Умови використання", href: LEGAL_LINKS.terms },
        ],
      },
    ],
    contact: {
      title: "Контакти",
      text: "Є запитання чи відгук? Напишіть нам.",
      email: CONTACT_EMAIL,
      copiedMessage: "Адресу скопійовано",
    },
    socials: [
      { network: "x", label: "FocusFlow в X", href: SOCIAL_LINKS.x },
      {
        network: "instagram",
        label: "FocusFlow в Instagram",
        href: SOCIAL_LINKS.instagram,
      },
      {
        network: "youtube",
        label: "FocusFlow на YouTube",
        href: SOCIAL_LINKS.youtube,
      },
    ],
    copyright: "FocusFlow. Усі права захищено.",
  },
};
