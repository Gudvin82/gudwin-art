import React, { createContext, useContext, useState, useEffect } from 'react';

type Language = 'ru' | 'en';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const translations: Record<Language, Record<string, string>> = {
  ru: {
    // Header
    'nav.services': 'Услуги',
    'nav.about': 'Обо мне',
    'nav.cases': 'Кейсы',
    'nav.pricing': 'Тарифы',
    'nav.reviews': 'Отзывы',
    'nav.contacts': 'Контакты',
    
    // Hero
    'hero.title': 'Выведу ваш бизнес из кризиса за 90 дней',
    'hero.subtitle': '20+ лет управленческого опыта • AI-технологии • Готовая команда',
    'hero.cta': 'Получить бесплатную консультацию',
    
    // Problems
    'problems.title': 'Знакомые ситуации?',
    'problems.1': 'Бизнес работает, но прибыль не растёт',
    'problems.2': 'Команда саботирует изменения',
    'problems.3': 'Рутина съедает всё время',
    'problems.4': 'Кассовые разрывы каждый месяц',
    'problems.5': 'Кредитная нагрузка душит бизнес',
    
    // Services
    'services.title': 'Услуги',
    'services.crisis.title': 'Антикризисное управление',
    'services.crisis.1': 'Диагностика за 14 дней',
    'services.crisis.2': 'План выхода из кризиса',
    'services.crisis.3': 'Устранение кассовых разрывов',
    'services.crisis.4': 'Вывод на рентабельность',
    
    'services.ai.title': 'Внедрение AI и автоматизация',
    'services.ai.1': 'Аудит бизнес-процессов',
    'services.ai.2': 'Интеграция нейросетей',
    'services.ai.3': 'Автоматизация рутины',
    'services.ai.4': 'Внедрение CRM систем',
    
    'services.marketing.title': 'Маркетинг под ключ',
    'services.marketing.1': 'Готовая команда маркетологов',
    'services.marketing.2': 'SMM и таргетированная реклама',
    'services.marketing.3': 'SEO продвижение',
    'services.marketing.4': 'Лидогенерация и воронки',
    
    'services.finance.title': 'Финансовый консалтинг',
    'services.finance.1': 'Помощь в получении кредитов',
    'services.finance.2': 'Лизинг на выгодных условиях',
    'services.finance.3': 'Реструктуризация долгов',
    'services.finance.4': 'Списание безнадёжных кредитов',
    
    'services.consulting.title': 'Бизнес-консалтинг',
    'services.consulting.1': 'Стратегическое планирование',
    'services.consulting.2': 'Оптимизация процессов',
    'services.consulting.3': 'Масштабирование бизнеса',
    'services.consulting.4': 'Франчайзинг',
    
    'services.team.title': 'Командная трансформация',
    'services.team.1': 'HR-аудит',
    'services.team.2': 'Построение эффективной команды',
    'services.team.3': 'Внедрение Agile/Scrum',
    'services.team.4': 'Обучение персонала',
    
    // About
    'about.title': 'Почему я',
    'about.experience': 'лет опыта',
    'about.employees': 'сотрудников под управлением',
    'about.projects': 'успешных проектов',
    'about.books': 'книг по бизнесу',
    'about.expert': 'Эксперт в AI-технологиях',
    'about.music': 'Создаю музыку',
    'about.games': 'Делаю игры для детей',
    'about.booksLink': 'Мои книги',
    'about.musicLink': 'Моя музыка',
    'about.gamesLink': 'Мои игры',
    
    // Cases
    'cases.title': 'Кейсы и результаты',
    'cases.1.title': 'Производственная компания',
    'cases.1.desc': 'Вывод из убытков за 90 дней. Оптимизация расходов и увеличение маржинальности на 25%',
    'cases.2.title': 'IT-стартап',
    'cases.2.desc': 'Автоматизация процессов снизила операционные расходы на 40%',
    'cases.3.title': 'Сеть ресторанов',
    'cases.3.desc': 'Реструктуризация кредитов сэкономила более 2 млн рублей',
    'cases.4.title': 'Логистическая компания',
    'cases.4.desc': 'Рост выручки на 60% за 6 месяцев после внедрения новой стратегии',
    'cases.5.title': 'Розничная сеть',
    'cases.5.desc': 'Внедрение CRM увеличило конверсию продаж на 35%',
    'cases.6.title': 'Медицинский центр',
    'cases.6.desc': 'Оптимизация процессов сократила время обслуживания пациентов на 50%',
    'cases.7.title': 'Строительная компания',
    'cases.7.desc': 'Успешное масштабирование на 3 новых региона за 1 год',
    
    // Process
    'process.title': 'Процесс работы',
    'process.1.title': 'Бесплатная диагностика',
    'process.1.desc': '30-минутный созвон для анализа текущей ситуации',
    'process.2.title': 'План действий',
    'process.2.desc': 'Составление детального плана с конкретными шагами',
    'process.3.title': 'Внедрение решений',
    'process.3.desc': 'Работа с моей командой экспертов над реализацией',
    'process.4.title': 'Контроль результатов',
    'process.4.desc': 'Мониторинг KPI и корректировка стратегии',
    
    // Pricing
    'pricing.title': 'Тарифы',
    'pricing.consultation.title': 'Консультация',
    'pricing.consultation.subtitle': 'Разовая сессия',
    'pricing.consultation.price': 'от 10 000 ₽',
    'pricing.consultation.1': 'Диагностика проблем',
    'pricing.consultation.2': 'Рекомендации по решению',
    'pricing.consultation.3': 'План первых шагов',
    'pricing.consultation.4': '3 часа онлайн/оффлайн',
    
    'pricing.support.title': 'Сопровождение',
    'pricing.support.subtitle': '3 месяца работы',
    'pricing.support.price': 'от 150 000 ₽/мес',
    'pricing.support.1': 'Еженедельные сессии',
    'pricing.support.2': 'Доступ к команде экспертов',
    'pricing.support.3': 'Внедрение решений',
    'pricing.support.4': 'Поддержка 24/7',
    
    'pricing.full.title': 'Под ключ',
    'pricing.full.subtitle': 'Полный аутсорс',
    'pricing.full.price': 'по договорённости',
    'pricing.full.1': 'Полное управление проектом',
    'pricing.full.2': 'Выделенная команда',
    'pricing.full.3': 'Гарантия результата',
    'pricing.full.4': 'Отчётность для собственника',
    
    'pricing.cta': 'Выбрать',
    'pricing.popular': 'Популярный',
    
    // Reviews
    'reviews.title': 'Отзывы клиентов',
    
    // FAQ
    'faq.title': 'Частые вопросы',
    'faq.1.q': 'Как быстро можно увидеть первые результаты?',
    'faq.1.a': 'Первые улучшения заметны уже в течение первого месяца. Значимые результаты — через 2-3 месяца системной работы.',
    'faq.2.q': 'Работаете ли вы с малым бизнесом?',
    'faq.2.a': 'Да, работаю с компаниями любого размера. Подход и инструменты адаптируются под масштаб бизнеса.',
    'faq.3.q': 'Можно ли работать удалённо?',
    'faq.3.a': 'Конечно! Большинство консультаций проходит онлайн. При необходимости возможны выезды в Санкт-Петербурге.',
    'faq.4.q': 'Что включает бесплатная диагностика?',
    'faq.4.a': 'За 30 минут мы разберём ключевые проблемы бизнеса и определим приоритетные направления для работы.',
    'faq.5.q': 'Есть ли гарантия результата?',
    'faq.5.a': 'В тарифе "Под ключ" предусмотрена гарантия достижения согласованных KPI.',
    'faq.6.q': 'Как начать сотрудничество?',
    'faq.6.a': 'Оставьте заявку на сайте или напишите в Telegram. Я свяжусь с вами в течение 24 часов.',
    
    // Contact
    'contact.title': 'Готовы начать?',
    'contact.subtitle': 'Оставьте заявку и получите бесплатную 30-минутную консультацию',
    'contact.name': 'Ваше имя',
    'contact.phone': 'Телефон',
    'contact.email': 'Email',
    'contact.message': 'Сообщение',
    'contact.submit': 'Отправить заявку',
    'contact.success': 'Заявка отправлена! Свяжусь с вами в ближайшее время.',
    'contact.error': 'Ошибка отправки. Попробуйте позже.',
    
    // Footer
    'footer.rights': 'Все права защищены',
    'footer.privacy': 'Политика конфиденциальности',
  },
  en: {
    // Header
    'nav.services': 'Services',
    'nav.about': 'About',
    'nav.cases': 'Cases',
    'nav.pricing': 'Pricing',
    'nav.reviews': 'Reviews',
    'nav.contacts': 'Contact',
    
    // Hero
    'hero.title': 'I will get your business out of crisis in 90 days',
    'hero.subtitle': '20+ years of management experience • AI technologies • Ready team',
    'hero.cta': 'Get a free consultation',
    
    // Problems
    'problems.title': 'Sound familiar?',
    'problems.1': 'Business is running, but profits are not growing',
    'problems.2': 'Team sabotages changes',
    'problems.3': 'Routine eats up all time',
    'problems.4': 'Cash gaps every month',
    'problems.5': 'Credit burden is choking the business',
    
    // Services
    'services.title': 'Services',
    'services.crisis.title': 'Crisis Management',
    'services.crisis.1': 'Diagnostics in 14 days',
    'services.crisis.2': 'Crisis exit plan',
    'services.crisis.3': 'Eliminating cash gaps',
    'services.crisis.4': 'Profitability recovery',
    
    'services.ai.title': 'AI Implementation & Automation',
    'services.ai.1': 'Business process audit',
    'services.ai.2': 'Neural network integration',
    'services.ai.3': 'Routine automation',
    'services.ai.4': 'CRM implementation',
    
    'services.marketing.title': 'Turnkey Marketing',
    'services.marketing.1': 'Ready marketing team',
    'services.marketing.2': 'SMM and targeted advertising',
    'services.marketing.3': 'SEO promotion',
    'services.marketing.4': 'Lead generation and funnels',
    
    'services.finance.title': 'Financial Consulting',
    'services.finance.1': 'Loan assistance',
    'services.finance.2': 'Favorable leasing terms',
    'services.finance.3': 'Debt restructuring',
    'services.finance.4': 'Bad loan write-offs',
    
    'services.consulting.title': 'Business Consulting',
    'services.consulting.1': 'Strategic planning',
    'services.consulting.2': 'Process optimization',
    'services.consulting.3': 'Business scaling',
    'services.consulting.4': 'Franchising',
    
    'services.team.title': 'Team Transformation',
    'services.team.1': 'HR audit',
    'services.team.2': 'Building an effective team',
    'services.team.3': 'Agile/Scrum implementation',
    'services.team.4': 'Staff training',
    
    // About
    'about.title': 'Why me',
    'about.experience': 'years of experience',
    'about.employees': 'employees managed',
    'about.projects': 'successful projects',
    'about.books': 'business books',
    'about.expert': 'AI technology expert',
    'about.music': 'I create music',
    'about.games': 'I make games for kids',
    'about.booksLink': 'My books',
    'about.musicLink': 'My music',
    'about.gamesLink': 'My games',
    
    // Cases
    'cases.title': 'Cases & Results',
    'cases.1.title': 'Manufacturing Company',
    'cases.1.desc': 'Exit from losses in 90 days. Cost optimization and 25% margin increase',
    'cases.2.title': 'IT Startup',
    'cases.2.desc': 'Process automation reduced operational costs by 40%',
    'cases.3.title': 'Restaurant Chain',
    'cases.3.desc': 'Credit restructuring saved over 2 million rubles',
    'cases.4.title': 'Logistics Company',
    'cases.4.desc': '60% revenue growth in 6 months after new strategy implementation',
    'cases.5.title': 'Retail Chain',
    'cases.5.desc': 'CRM implementation increased sales conversion by 35%',
    'cases.6.title': 'Medical Center',
    'cases.6.desc': 'Process optimization reduced patient service time by 50%',
    'cases.7.title': 'Construction Company',
    'cases.7.desc': 'Successful scaling to 3 new regions in 1 year',
    
    // Process
    'process.title': 'Work Process',
    'process.1.title': 'Free Diagnostics',
    'process.1.desc': '30-minute call to analyze the current situation',
    'process.2.title': 'Action Plan',
    'process.2.desc': 'Creating a detailed plan with specific steps',
    'process.3.title': 'Solution Implementation',
    'process.3.desc': 'Working with my team of experts on implementation',
    'process.4.title': 'Results Control',
    'process.4.desc': 'KPI monitoring and strategy adjustment',
    
    // Pricing
    'pricing.title': 'Pricing',
    'pricing.consultation.title': 'Consultation',
    'pricing.consultation.subtitle': 'One-time session',
    'pricing.consultation.price': 'from 10,000 ₽',
    'pricing.consultation.1': 'Problem diagnostics',
    'pricing.consultation.2': 'Solution recommendations',
    'pricing.consultation.3': 'First steps plan',
    'pricing.consultation.4': '3 hours online/offline',
    
    'pricing.support.title': 'Support',
    'pricing.support.subtitle': '3 months of work',
    'pricing.support.price': 'from 150,000 ₽/mo',
    'pricing.support.1': 'Weekly sessions',
    'pricing.support.2': 'Access to expert team',
    'pricing.support.3': 'Solution implementation',
    'pricing.support.4': '24/7 support',
    
    'pricing.full.title': 'Turnkey',
    'pricing.full.subtitle': 'Full outsourcing',
    'pricing.full.price': 'by agreement',
    'pricing.full.1': 'Full project management',
    'pricing.full.2': 'Dedicated team',
    'pricing.full.3': 'Result guarantee',
    'pricing.full.4': 'Owner reporting',
    
    'pricing.cta': 'Choose',
    'pricing.popular': 'Popular',
    
    // Reviews
    'reviews.title': 'Client Reviews',
    
    // FAQ
    'faq.title': 'FAQ',
    'faq.1.q': 'How quickly can I see the first results?',
    'faq.1.a': 'First improvements are visible within the first month. Significant results — after 2-3 months of systematic work.',
    'faq.2.q': 'Do you work with small businesses?',
    'faq.2.a': 'Yes, I work with companies of all sizes. The approach and tools are adapted to the scale of the business.',
    'faq.3.q': 'Is it possible to work remotely?',
    'faq.3.a': 'Of course! Most consultations are held online. If necessary, visits in St. Petersburg are possible.',
    'faq.4.q': 'What does the free diagnostics include?',
    'faq.4.a': 'In 30 minutes, we will analyze the key business problems and identify priority areas for work.',
    'faq.5.q': 'Is there a result guarantee?',
    'faq.5.a': 'The "Turnkey" tariff provides a guarantee of achieving agreed KPIs.',
    'faq.6.q': 'How to start cooperation?',
    'faq.6.a': 'Leave a request on the website or write to Telegram. I will contact you within 24 hours.',
    
    // Contact
    'contact.title': 'Ready to start?',
    'contact.subtitle': 'Leave a request and get a free 30-minute consultation',
    'contact.name': 'Your name',
    'contact.phone': 'Phone',
    'contact.email': 'Email',
    'contact.message': 'Message',
    'contact.submit': 'Send request',
    'contact.success': 'Request sent! I will contact you soon.',
    'contact.error': 'Sending error. Try again later.',
    
    // Footer
    'footer.rights': 'All rights reserved',
    'footer.privacy': 'Privacy Policy',
  },
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<Language>(() => {
    const saved = localStorage.getItem('language');
    return (saved as Language) || 'ru';
  });

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem('language', lang);
  };

  const t = (key: string): string => {
    return translations[language][key] || key;
  };

  useEffect(() => {
    document.documentElement.lang = language;
  }, [language]);

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
