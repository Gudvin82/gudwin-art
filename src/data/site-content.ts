export type Lang = 'ru' | 'en';
export type Mode = 'pets' | 'humans';

export interface StylePreset {
  id: string;
  mode: Mode;
  title: Record<Lang, string>;
  description: Record<Lang, string>;
  preview: string;
  promptTemplate: string;
}

export interface LegalDoc {
  slug: string;
  title: Record<Lang, string>;
  version: string;
  effectiveFrom: string;
  body: Record<Lang, string[]>;
}

export interface PricingPack {
  id: 'digital' | 'starter';
  title: Record<Lang, string>;
  subtitle: Record<Lang, string>;
  stars: number;
  features: Record<Lang, string[]>;
}

export const translations = {
  ru: {
    brand: 'GudWin BookS',
    navHome: 'Главная',
    navCreate: 'Создать',
    navPricing: 'Цены',
    navAbout: 'О нас',
    navAccount: 'Кабинет',
    heroTitlePets: 'Создавайте сказки и комиксы с ИИ',
    heroTitleHumans: 'Пишите волшебные истории с иллюстрациями',
    heroSubtitle: 'Текст, картинки и озвучка сказок голосом в одном кабинете.',
    ctaCreate: 'Создать историю',
    ctaPricing: 'Смотреть тарифы',
    howTitle: 'Как это работает',
    howStep1: 'Загрузите идею или короткий синопсис',
    howStep2: 'Выберите стиль и оформление',
    howStep3: 'Запустите генерацию текста и иллюстраций',
    howStep4: 'Оплатите Telegram Stars и сохраните результат',
    generatorTitle: 'Генератор историй и комиксов',
    stepUpload: '1. Загрузка',
    stepCrop: '2. Кадрирование',
    stepStyle: '3. Стиль',
    stepGenerate: '4. Генерация',
    stepResult: '5. Результат',
    uploadHint: 'JPG, PNG, WEBP. Минимум 700x700.',
    pickStyle: 'Выберите стиль',
    startGenerate: 'Запустить генерацию',
    paidDownload: 'Скачать',
    payAndDownload: 'Оплатить Stars',
    resultReady: 'Проект готов',
    progressTitle: 'Обработка изображения',
    pricingTitle: 'Тарифы',
    pricingSingle: 'Генерации сказок и комиксов',
    pricingSingleDesc: 'Лимиты, озвучка и экспорт зависят от выбранного тарифа.',
    pricingPrice: 'Только Telegram Stars',
    aboutTitle: 'О проекте GudWin BookS',
    accountGenerations: 'Мои генерации',
    accountSettings: 'Настройки аккаунта',
    loginTelegram: 'Войти через Telegram',
    tgAuthHint: 'Используйте официальный Telegram Login Widget. Backend проверяет подпись данных Telegram.',
    tgStarsHint: 'Оплата выполняется только в Telegram Stars через бот/mini app.',
    linkedProviders: 'Авторизация',
    deleteAccount: 'Удалить аккаунт',
    legal: 'Документы',
    footerRights: '© 2026 GudWin BookS (ГудВин Букс). Все права защищены.',
    cookieTitle: 'Мы используем cookie для аналитики и стабильной работы.',
    cookieAccept: 'Принять',
    cookieReject: 'Отклонить',
    switchPets: 'Сказки',
    switchHumans: 'Комиксы',
    cropZoom: 'Зум',
    cropX: 'Смещение X',
    cropY: 'Смещение Y',
    noFile: 'Сначала загрузите изображение.',
    statusPaid: 'Оплачено',
    statusUnpaid: 'Не оплачено',
    style: 'Стиль',
    mode: 'Режим',
    date: 'Дата',
    actions: 'Действия',
  },
  en: {
    brand: 'GudWin BookS',
    navHome: 'Home',
    navCreate: 'Create',
    navPricing: 'Pricing',
    navAbout: 'About',
    navAccount: 'Account',
    heroTitlePets: 'Create fairy tales and comics with AI',
    heroTitleHumans: 'Build magical stories with illustrations',
    heroSubtitle: 'Text, images and voice narration in one workflow.',
    ctaCreate: 'Create Story',
    ctaPricing: 'View Pricing',
    howTitle: 'How it works',
    howStep1: 'Provide your idea or synopsis',
    howStep2: 'Choose visual style',
    howStep3: 'Generate story and illustrations',
    howStep4: 'Pay with Telegram Stars and export',
    generatorTitle: 'Story & Comics Generator',
    stepUpload: '1. Upload',
    stepCrop: '2. Crop',
    stepStyle: '3. Style',
    stepGenerate: '4. Generation',
    stepResult: '5. Result',
    uploadHint: 'JPG, PNG, WEBP. Minimum 700x700.',
    pickStyle: 'Pick a style',
    startGenerate: 'Generate Portrait',
    paidDownload: 'Download',
    payAndDownload: 'Pay with Stars',
    resultReady: 'Project ready',
    progressTitle: 'Image processing',
    pricingTitle: 'Pricing',
    pricingSingle: 'Story and comics generations',
    pricingSingleDesc: 'Limits, TTS and exports depend on selected plan.',
    pricingPrice: 'Telegram Stars only',
    aboutTitle: 'About GudWin BookS',
    accountGenerations: 'My generations',
    accountSettings: 'Account settings',
    loginTelegram: 'Sign in with Telegram',
    tgAuthHint: 'Use official Telegram Login Widget. Backend verifies Telegram signature.',
    tgStarsHint: 'Payment goes through Telegram Stars via bot/mini app.',
    linkedProviders: 'Authentication',
    deleteAccount: 'Delete account',
    legal: 'Legal',
    footerRights: '© 2026 GudWin BookS. All rights reserved.',
    cookieTitle: 'We use cookies for analytics and stable operation.',
    cookieAccept: 'Accept',
    cookieReject: 'Reject',
    switchPets: 'Fairy Tales',
    switchHumans: 'Comics',
    cropZoom: 'Zoom',
    cropX: 'Offset X',
    cropY: 'Offset Y',
    noFile: 'Upload an image first.',
    statusPaid: 'Paid',
    statusUnpaid: 'Unpaid',
    style: 'Style',
    mode: 'Mode',
    date: 'Date',
    actions: 'Actions',
  },
};

export const stylePresets: StylePreset[] = [
  {
    id: 'storybook',
    mode: 'pets',
    title: { ru: 'Акварельная сказка', en: 'Watercolor Fairy Tale' },
    description: { ru: 'Мягкие текстуры старинной книги и магии.', en: 'Soft old-book textures and magic.' },
    preview: '/examples/pet-1.jpg',
    promptTemplate: 'children fairy tale illustration, watercolor, old storybook style',
  },
  {
    id: 'engraving',
    mode: 'pets',
    title: { ru: 'Старинная гравюра', en: 'Vintage Engraving' },
    description: { ru: 'Контрастные линии в духе старых изданий.', en: 'High-contrast lines inspired by old prints.' },
    preview: '/examples/pet-2.jpg',
    promptTemplate: 'vintage engraving fairy scene, intricate line art, classic print',
  },
  {
    id: 'golden-book',
    mode: 'pets',
    title: { ru: 'Золотая книга', en: 'Golden Book' },
    description: { ru: 'Тёплая палитра и иллюстрации для детей.', en: 'Warm palette and child-friendly art.' },
    preview: '/examples/pet-3.jpg',
    promptTemplate: 'gold embossed fantasy storybook art, warm tones, magical night',
  },
  {
    id: 'comic-classic',
    mode: 'humans',
    title: { ru: 'Классический комикс', en: 'Classic Comic' },
    description: { ru: 'Панели, реплики и динамичная подача.', en: 'Panels, speech bubbles and dynamic pacing.' },
    preview: '/examples/human-1.jpg',
    promptTemplate: 'classic comic page, clean inks, dynamic composition, speech bubbles',
  },
  {
    id: 'manga-lite',
    mode: 'humans',
    title: { ru: 'Манга лайт', en: 'Manga Lite' },
    description: { ru: 'Выразительные персонажи и крупные эмоции.', en: 'Expressive characters and emotional beats.' },
    preview: '/examples/human-2.jpg',
    promptTemplate: 'manga style comic, expressive characters, cinematic framing',
  },
  {
    id: 'graphic-novel',
    mode: 'humans',
    title: { ru: 'Графический роман', en: 'Graphic Novel' },
    description: { ru: 'Серьёзный тон и атмосферные сцены.', en: 'Cinematic dark palette and deeper atmosphere.' },
    preview: '/examples/human-3.jpg',
    promptTemplate: 'graphic novel page, atmospheric lighting, detailed backgrounds',
  },
];

export const legalDocs: LegalDoc[] = [
  {
    slug: 'offer',
    title: { ru: 'Публичная оферта', en: 'Public Offer' },
    version: '1.0',
    effectiveFrom: '2026-02-22',
    body: {
      ru: [
        'Настоящий документ является публичной офертой сервиса GudWin BookS на оказание услуг генерации сказок, комиксов и озвучки.',
        'Оплата услуги означает полное и безусловное принятие условий оферты.',
      ],
      en: [
        'This document is a public offer of GudWin BookS for fairy tale and comics generation services.',
        'Payment confirms full acceptance of the offer terms.',
      ],
    },
  },
  {
    slug: 'privacy',
    title: { ru: 'Политика конфиденциальности', en: 'Privacy Policy' },
    version: '1.0',
    effectiveFrom: '2026-02-22',
    body: {
      ru: [
        'Мы обрабатываем персональные данные только в объёме, необходимом для авторизации, оплаты и работы сервиса.',
        'Пользователь имеет право запросить удаление данных в личном кабинете.',
      ],
      en: [
        'We process personal data only as required for login, payment and service operations.',
        'Users can request account deletion from the account settings page.',
      ],
    },
  },
  {
    slug: 'personal-data',
    title: { ru: 'Политика обработки ПДн (152-ФЗ)', en: 'Personal Data Policy (152-FZ)' },
    version: '1.0',
    effectiveFrom: '2026-02-22',
    body: {
      ru: [
        'Оператор обеспечивает обработку и защиту персональных данных в соответствии с 152-ФЗ.',
        'Согласие на обработку ПДн запрашивается в явной форме при использовании сервиса.',
      ],
      en: [
        'The operator processes and protects personal data according to applicable data protection requirements.',
        'Explicit consent is requested when using the service.',
      ],
    },
  },
  {
    slug: 'cookie',
    title: { ru: 'Cookie Policy', en: 'Cookie Policy' },
    version: '1.0',
    effectiveFrom: '2026-02-22',
    body: {
      ru: ['Cookie используются для стабильной работы сайта и аналитики только после согласия пользователя.'],
      en: ['Cookies are used for website stability and analytics only after user consent.'],
    },
  },
  {
    slug: 'refund',
    title: { ru: 'Политика возвратов', en: 'Refund Policy' },
    version: '1.0',
    effectiveFrom: '2026-02-22',
    body: {
      ru: ['Для цифрового товара возврат возможен при технической невозможности оказания услуги.'],
      en: ['For digital goods, refunds are possible if the service cannot be delivered due to technical issues.'],
    },
  },
  {
    slug: 'requisites',
    title: { ru: 'Реквизиты', en: 'Company Details' },
    version: 'template',
    effectiveFrom: '2026-02-22',
    body: {
      ru: ['Заполните реквизиты юрлица/ИП перед запуском платежей.'],
      en: ['Fill legal entity details before launching payments.'],
    },
  },
];

export const pricingPacks: PricingPack[] = [
  {
    id: 'digital',
    title: { ru: 'GudWin Light', en: 'GudWin Light' },
    subtitle: { ru: 'Для семейных сказок и коротких комиксов', en: 'For family stories and short comics' },
    stars: 500,
    features: {
      ru: [
        'До 20 коротких сказок в месяц',
        'До 6 комиксов (4 страницы)',
        'Озвучка до 10 сказок',
        'Поддержка в Telegram',
      ],
      en: ['Up to 20 short stories monthly', 'Up to 6 comics (4 pages)', 'Voiceover up to 10 stories', 'Telegram support'],
    },
  },
  {
    id: 'starter',
    title: { ru: 'GudWin Pro', en: 'GudWin Pro' },
    subtitle: { ru: 'Расширенные лимиты и приоритетная очередь', en: 'Higher limits and priority queue' },
    stars: 1000,
    features: {
      ru: [
        'До 80 сказок в месяц',
        'До 30 комиксов (до 12 страниц)',
        'Озвучка и экспорт без водяных знаков',
        'Приоритетная обработка и быстрый саппорт',
      ],
      en: ['Up to 80 stories monthly', 'Up to 30 comics (up to 12 pages)', 'Voiceover and watermark-free export', 'Priority queue and support'],
    },
  },
];

export const statusMessages: Record<Lang, string[]> = {
  ru: ['Собираем сюжет...', 'Генерируем текстовые главы...', 'Создаём иллюстрации...', 'Проверяем качество результата...'],
  en: ['Building story outline...', 'Generating story chapters...', 'Creating illustrations...', 'Running quality checks...'],
};
