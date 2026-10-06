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

/** Russian texts of the site. */
export const ru: SiteContent = {
  site: {
    name: "FocusFlow",
    title: "FocusFlow — сосредоточьтесь и успевайте больше",
    description:
      "FocusFlow — ваш двигатель концентрации: гибкие таймеры фокуса, история сессий, статистика в реальном времени и звуки для сосредоточенности. Скачайте в Google Play.",
    logo: { ...LOGO, alt: "Логотип FocusFlow" },
    cta: { label: "Начать", href: GOOGLE_PLAY_URL },
    nav: [
      { label: "Возможности", href: "#features" },
      { label: "Как это работает", href: "#how-it-works" },
      { label: "Тарифы", href: "#pricing" },
      { label: "Отзывы", href: "#testimonials" },
      { label: "Контакты", href: "#contact" },
    ],
  },

  ui: {
    mainNavigation: "Главное меню",
    language: "Язык",
    openMenu: "Открыть меню",
    closeMenu: "Закрыть меню",
    sessionOf: "Сессия {current} из {total}",
    pauseTimer: "Поставить таймер на паузу",
    resumeTimer: "Продолжить таймер",
    storiesHint: "Тап справа — дальше · слева — назад · удержание — пауза",
  },

  hero: {
    title: "Глубокий фокус — сессия за сессией",
    description:
      "Поставьте таймер, выберите звук для концентрации и приступайте к работе. FocusFlow отслеживает ваши сессии, серии и статистику, чтобы вы видели свой прогресс.",
    primaryCta: { label: "Скачать в Google Play", href: GOOGLE_PLAY_URL },
    secondaryCta: { label: "Как это работает", href: "#how-it-works" },
    backgroundVideo: HERO_MEDIA.defaultVideo,
    mockup: {
      ...DEMO_TIMER,
      label: "Демо FocusFlow: таймер фокуса и звуки для концентрации",
      sessionLabel: "Сессия фокуса",
      soundsLabel: "Звуки для фокуса",
      sounds: [
        { name: "Дождь", ...HERO_MEDIA.rain },
        { name: "Лес", ...HERO_MEDIA.forest },
        { name: "Кафе", ...HERO_MEDIA.cafe },
      ],
    },
  },

  features: {
    intro: {
      title: "Всё, что нужно для концентрации",
      subtitle:
        "Простые инструменты, которые помогают начать, не останавливаться и видеть прогресс.",
    },
    autoplaySeconds: FEATURES_AUTOPLAY_SECONDS,
    items: [
      {
        icon: Timer,
        title: "Умные таймеры фокуса",
        bullets: [
          "Настраиваемая длина сессии",
          "Быстрое переключение сессий, когда планы меняются",
          "Понятный обратный отсчёт, читаемый с одного взгляда",
        ],
        image: {
          ...FEATURE_IMAGES.timers,
          alt: "Песочные часы на деревянном столе",
        },
      },
      {
        icon: Sparkles,
        title: "Дизайн без отвлечений",
        bullets: [
          "Чистый минималистичный интерфейс",
          "Ничто на экране не борется за ваше внимание",
          "Запуск сессии в два касания",
        ],
        image: {
          ...FEATURE_IMAGES.design,
          alt: "Аккуратный белый стол с книгами и вазой",
        },
      },
      {
        icon: ChartColumn,
        title: "История и статистика",
        bullets: [
          "Полная история сессий",
          "Статистика времени фокуса по дням",
          "Смотрите, как растут суммарные часы",
        ],
        image: {
          ...FEATURE_IMAGES.stats,
          alt: "Графики аналитики на экране ноутбука",
        },
      },
      {
        icon: Headphones,
        title: "Звуки для фокуса",
        bullets: [
          "Встроенные фоновые звуки",
          "Свои слои звуков для более глубокой концентрации",
          "Выбирайте настроение под каждую сессию",
        ],
        image: {
          ...FEATURE_IMAGES.sounds,
          alt: "Наушники среди огоньков гирлянды",
        },
      },
      {
        icon: Flame,
        title: "Очки и серии",
        bullets: [
          "Система очков за продуктивность",
          "Следите за сериями день за днём",
          "Прогресс, который видно, а не только чувствуется",
        ],
        image: {
          ...FEATURE_IMAGES.streaks,
          alt: "Таблица рекордов на экране ретро-автомата",
        },
      },
      {
        icon: Palette,
        title: "Персональные темы",
        bullets: [
          "Персонализируйте тему приложения",
          "Настройте параметры под свой стиль работы",
          "Ваше пространство фокуса — ваши правила",
        ],
        image: {
          ...FEATURE_IMAGES.themes,
          alt: "Веер цветных бумажных образцов",
        },
      },
    ],
  },

  howItWorks: {
    intro: { title: "Сосредоточьтесь за три шага" },
    steps: [
      {
        title: "Поставьте таймер",
        description: "Выберите, сколько хотите работать, и запустите сессию.",
        image: {
          ...STEP_IMAGES.timer,
          alt: "Песочные часы с тёмным песком на столе перед монитором",
        },
      },
      {
        title: "Выберите звук",
        description:
          "Добавьте звук, который помогает отключиться от отвлекающих факторов.",
        image: {
          ...STEP_IMAGES.sound,
          alt: "Наушники среди огоньков гирлянды",
        },
      },
      {
        title: "Следите за прогрессом",
        description:
          "Смотрите историю, статистику и серии после каждой сессии.",
        image: {
          ...STEP_IMAGES.progress,
          alt: "Графики аналитики на экране ноутбука",
        },
      },
    ],
  },

  pricing: {
    intro: {
      title: "Простые тарифы под любую цель",
      subtitle:
        "Начните бесплатно. Переходите на платный тариф, когда захочется большего.",
    },
    currency: CURRENCY,
    period: "/ мес.",
    plans: [
      {
        name: "Free",
        price: PRICES.free,
        features: [
          "Таймер фокуса",
          "История сессий",
          "Базовая статистика",
          "Содержит рекламу",
        ],
        cta: { label: "Начать", href: GOOGLE_PLAY_URL },
      },
      {
        name: "Plus",
        price: PRICES.plus,
        badge: "Самый популярный",
        features: [
          "Всё из Free",
          "Звуки для фокуса",
          "Очки и серии",
          "Без рекламы",
        ],
        cta: { label: "Выбрать Plus", href: GOOGLE_PLAY_URL },
      },
      {
        name: "Pro",
        price: PRICES.pro,
        features: [
          "Всё из Plus",
          "Свои слои звуков",
          "Подробная статистика",
          "Персональные темы",
        ],
        cta: { label: "Выбрать Pro", href: GOOGLE_PLAY_URL },
      },
    ],
  },

  testimonials: {
    intro: { title: "Что говорят пользователи" },
    items: [
      {
        quote:
          "Я наконец-то довожу учебные сессии до конца, а не листаю телефон. Таймер и звук дождя — всё, что мне нужно.",
        name: "Emma Larsen",
        role: "Студентка-медик",
        photo: { ...PORTRAITS.emma, alt: "Портрет Emma Larsen" },
      },
      {
        quote:
          "Серии меня затянули. За два месяца я не пропустил ни дня глубокой работы.",
        name: "Daniel Ortiz",
        role: "Дизайнер-фрилансер",
        photo: { ...PORTRAITS.daniel, alt: "Портрет Daniel Ortiz" },
      },
      {
        quote: "Чисто, просто и не мешает. Открываю, нажимаю старт и работаю.",
        name: "Priya Nair",
        role: "Разработчица",
        photo: { ...PORTRAITS.priya, alt: "Портрет Priya Nair" },
      },
    ],
  },

  footer: {
    columns: [
      {
        title: "Продукт",
        links: [
          { label: "Возможности", href: "#features" },
          { label: "Как это работает", href: "#how-it-works" },
          { label: "Тарифы", href: "#pricing" },
          { label: "Отзывы", href: "#testimonials" },
          {
            label: "Скачать в Google Play",
            href: GOOGLE_PLAY_URL,
            external: true,
          },
        ],
      },
      {
        title: "Правовая информация",
        links: [
          { label: "Политика конфиденциальности", href: LEGAL_LINKS.privacy },
          { label: "Условия использования", href: LEGAL_LINKS.terms },
        ],
      },
    ],
    contact: {
      title: "Контакты",
      text: "Есть вопросы или отзыв? Напишите нам.",
      email: CONTACT_EMAIL,
      copiedMessage: "Адрес скопирован",
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
    copyright: "FocusFlow. Все права защищены.",
  },
};
