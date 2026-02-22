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
    brand: 'GudWin Art',
    navHome: 'Главная',
    navCreate: 'Создать',
    navPricing: 'Цены',
    navAbout: 'О нас',
    navAccount: 'Кабинет',
    heroTitlePets: 'Превратите питомца в портрет эпохи Ренессанса',
    heroTitleHumans: 'Сделайте семейный портрет в музейном стиле',
    heroSubtitle: 'Загрузка фото, выбор стиля, генерация и скачивание HD после оплаты.',
    ctaCreate: 'Создать портрет',
    ctaPricing: 'Смотреть тариф',
    howTitle: 'Как это работает',
    howStep1: 'Загрузите одно или несколько фото',
    howStep2: 'Выберите стиль и кадрирование',
    howStep3: 'Запустите генерацию',
    howStep4: 'Оплатите 100 Stars и скачайте HD',
    generatorTitle: 'Генератор портретов',
    stepUpload: '1. Загрузка',
    stepCrop: '2. Кадрирование',
    stepStyle: '3. Стиль',
    stepGenerate: '4. Генерация',
    stepResult: '5. Результат',
    uploadHint: 'JPG, PNG, WEBP. Минимум 700x700.',
    pickStyle: 'Выберите стиль',
    startGenerate: 'Запустить генерацию',
    paidDownload: 'Скачать HD',
    payAndDownload: 'Оплатить 100 Stars',
    resultReady: 'Портрет готов',
    progressTitle: 'Обработка изображения',
    pricingTitle: 'Тарифы',
    pricingSingle: '1 HD портрет',
    pricingSingleDesc: 'Одна генерация, скачивание без водяного знака, коммерческое использование.',
    pricingPrice: '100 Telegram Stars',
    aboutTitle: 'О проекте GudWin Art',
    accountGenerations: 'Мои генерации',
    accountSettings: 'Настройки аккаунта',
    loginTelegram: 'Войти через Telegram',
    tgAuthHint: 'Используйте официальный Telegram Login Widget. Backend проверяет подпись данных Telegram.',
    tgStarsHint: 'Оплата выполняется в Telegram Stars через бот/mini app. Цена: 100 Stars за изображение.',
    linkedProviders: 'Авторизация',
    deleteAccount: 'Удалить аккаунт',
    legal: 'Документы',
    footerRights: '© 2026 GudWin Art. Все права защищены.',
    cookieTitle: 'Мы используем cookie для аналитики и стабильной работы.',
    cookieAccept: 'Принять',
    cookieReject: 'Отклонить',
    switchPets: 'Питомцы',
    switchHumans: 'Люди',
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
    brand: 'GudWin Art',
    navHome: 'Home',
    navCreate: 'Create',
    navPricing: 'Pricing',
    navAbout: 'About',
    navAccount: 'Account',
    heroTitlePets: 'Turn your pet into a Renaissance portrait',
    heroTitleHumans: 'Create a family portrait in museum style',
    heroSubtitle: 'Upload photo, choose style, generate and unlock HD after payment.',
    ctaCreate: 'Create Portrait',
    ctaPricing: 'View Pricing',
    howTitle: 'How it works',
    howStep1: 'Upload one or more photos',
    howStep2: 'Choose style and crop',
    howStep3: 'Start generation',
    howStep4: 'Pay 100 Stars and download HD',
    generatorTitle: 'Portrait Generator',
    stepUpload: '1. Upload',
    stepCrop: '2. Crop',
    stepStyle: '3. Style',
    stepGenerate: '4. Generation',
    stepResult: '5. Result',
    uploadHint: 'JPG, PNG, WEBP. Minimum 700x700.',
    pickStyle: 'Pick a style',
    startGenerate: 'Generate Portrait',
    paidDownload: 'Download HD',
    payAndDownload: 'Pay 100 Stars',
    resultReady: 'Portrait ready',
    progressTitle: 'Image processing',
    pricingTitle: 'Pricing',
    pricingSingle: '1 HD portrait',
    pricingSingleDesc: 'One generation, no watermark download, commercial use included.',
    pricingPrice: '100 Telegram Stars',
    aboutTitle: 'About GudWin Art',
    accountGenerations: 'My generations',
    accountSettings: 'Account settings',
    loginTelegram: 'Sign in with Telegram',
    tgAuthHint: 'Use official Telegram Login Widget. Backend verifies Telegram signature.',
    tgStarsHint: 'Payment goes through Telegram Stars via bot/mini app. Price: 100 Stars per image.',
    linkedProviders: 'Authentication',
    deleteAccount: 'Delete account',
    legal: 'Legal',
    footerRights: '© 2026 GudWin Art. All rights reserved.',
    cookieTitle: 'We use cookies for analytics and stable operation.',
    cookieAccept: 'Accept',
    cookieReject: 'Reject',
    switchPets: 'Pets',
    switchHumans: 'Humans',
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
    id: 'renaissance-pet',
    mode: 'pets',
    title: { ru: 'Ренессанс', en: 'Renaissance' },
    description: { ru: 'Классический музейный свет и фактура.', en: 'Classic museum lighting and texture.' },
    preview: '/examples/pet-1.jpg',
    promptTemplate: 'renaissance royal pet portrait, oil painting details',
  },
  {
    id: 'royal-pet',
    mode: 'pets',
    title: { ru: 'Королевский', en: 'Royal' },
    description: { ru: 'Парадный стиль с акцентом на статус.', en: 'Ceremonial look with royal framing.' },
    preview: '/examples/pet-2.jpg',
    promptTemplate: 'royal pet portrait, velvet robe, dramatic painting',
  },
  {
    id: 'classic-pet',
    mode: 'pets',
    title: { ru: 'Классика', en: 'Classic' },
    description: { ru: 'Глубокие тени и богатые ткани.', en: 'Deep shadows and rich fabrics.' },
    preview: '/examples/pet-3.jpg',
    promptTemplate: 'classical pet portrait, dark background, detailed brushwork',
  },
  {
    id: 'family-classic',
    mode: 'humans',
    title: { ru: 'Семейная классика', en: 'Family Classic' },
    description: { ru: 'Групповой портрет в академическом стиле.', en: 'Group portrait in academic style.' },
    preview: '/examples/human-1.jpg',
    promptTemplate: 'classic family portrait, oil texture, warm tones',
  },
  {
    id: 'children-portrait',
    mode: 'humans',
    title: { ru: 'Детский портрет', en: 'Children Portrait' },
    description: { ru: 'Тёплая историческая палитра.', en: 'Warm historical palette.' },
    preview: '/examples/human-2.jpg',
    promptTemplate: 'children portrait, vintage painting style, warm details',
  },
  {
    id: 'couple-portrait',
    mode: 'humans',
    title: { ru: 'Семья и ребёнок', en: 'Family and Baby' },
    description: { ru: 'Постановочный портрет пары и ребёнка.', en: 'Staged portrait for couple and baby.' },
    preview: '/examples/human-3.jpg',
    promptTemplate: 'family portrait with baby, oil painting, elegant outfits',
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
        'Настоящий документ является публичной офертой сервиса GudWin Art на оказание услуг генерации цифровых портретов.',
        'Оплата услуги означает полное и безусловное принятие условий оферты.',
      ],
      en: [
        'This document is a public offer of GudWin Art for digital portrait generation services.',
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
    title: { ru: 'Digital Pack', en: 'Digital Pack' },
    subtitle: { ru: 'Идеально для цифрового использования', en: 'Best for digital usage' },
    stars: 500,
    features: {
      ru: [
        '1 HD-портрет без водяного знака',
        'Коммерческое использование',
        'Скачивание в высоком качестве',
        'Поддержка в Telegram',
      ],
      en: ['1 HD portrait without watermark', 'Commercial usage', 'High resolution download', 'Telegram support'],
    },
  },
  {
    id: 'starter',
    title: { ru: 'Starter Pack', en: 'Starter Pack' },
    subtitle: { ru: 'Для старта с расширенным набором', en: 'Great starter with extra value' },
    stars: 1000,
    features: {
      ru: [
        '3 HD-портрета в одном пакете',
        'Приоритетная обработка',
        'Коммерческое использование',
        'Поддержка в Telegram + быстрый ответ',
      ],
      en: ['3 HD portraits in one package', 'Priority processing', 'Commercial usage', 'Telegram priority support'],
    },
  },
];

export const statusMessages: Record<Lang, string[]> = {
  ru: ['Анализируем композицию...', 'Усиливаем стилизацию...', 'Рендерим финальный кадр...', 'Проверяем качество...'],
  en: ['Analyzing composition...', 'Boosting style features...', 'Rendering final image...', 'Quality checks in progress...'],
};
