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
    'nav.about': 'Обо мне',
    'nav.services': 'Услуги',
    'nav.advantages': 'Преимущества',
    'nav.cases': 'Кейсы',
    'nav.contacts': 'Контакты',

    // Hero
    'hero.badge': 'AI & Антикризисный консалтинг',
    'hero.title': 'Антикризисное управление на базе AI-технологий',
    'hero.subtitle': 'Вывожу бизнес из кризиса, внедряю AI-автоматизацию и строю стратегии роста. 20+ лет управленческого опыта.',
    'hero.cta': 'Получить консультацию',
    'hero.stat1.value': '20+',
    'hero.stat1.label': 'лет опыта',
    'hero.stat2.value': '1000+',
    'hero.stat2.label': 'сотрудников',
    'hero.stat3.value': '50+',
    'hero.stat3.label': 'проектов',

    // About
    'about.title': 'Обо мне',
    'about.intro': 'Анатолий Малышев — бизнес-консультант, антикризисный управляющий, эксперт в AI-технологиях. Более 20 лет помогаю компаниям преодолевать кризисы, выстраивать процессы и внедрять инновации.',
    'about.experience': 'лет опыта',
    'about.employees': 'сотрудников под управлением',
    'about.projects': 'успешных проектов',
    'about.books': 'книг по бизнесу',

    'about.skills.title': 'Ключевые компетенции',
    'about.skill.1': 'Антикризисное управление',
    'about.skill.2': 'AI и нейросети (ChatGPT, Claude, MidJourney)',
    'about.skill.3': 'Стратегическое планирование',
    'about.skill.4': 'Автоматизация бизнес-процессов',
    'about.skill.5': 'Финансовая реструктуризация',
    'about.skill.6': 'Командная трансформация',

    'about.booksSection': 'Мои книги',
    'about.booksDesc': '25+ книг по бизнесу, управлению и личной эффективности',
    'about.booksLink': 'Перейти к книгам',
    'about.musicLink': 'Моя музыка',
    'about.gamesLink': 'Мои игры',

    // Services
    'services.title': 'Направления работы',
    'services.ai_auto.title': 'AI Автоматизация',
    'services.ai_auto.desc': 'Внедряю AI-решения для оптимизации бизнес-процессов, снижения издержек и повышения эффективности.',
    'services.ai_auto.1': 'Аудит и автоматизация процессов',
    'services.ai_auto.2': 'Интеграция нейросетей в workflow',
    'services.ai_auto.3': 'Внедрение AI-помощников и чат-ботов',
    'services.ai_auto.4': 'Оптимизация с помощью данных и аналитики',

    'services.ai_consult.title': 'AI Консалтинг',
    'services.ai_consult.desc': 'Разрабатываю стратегии внедрения AI в бизнес, обучаю команды и сопровождаю трансформацию.',
    'services.ai_consult.1': 'AI-стратегия для вашего бизнеса',
    'services.ai_consult.2': 'Выбор и внедрение инструментов',
    'services.ai_consult.3': 'Обучение команды работе с AI',
    'services.ai_consult.4': 'Сопровождение цифровой трансформации',

    'services.crisis.title': 'Антикризисное управление',
    'services.crisis.desc': 'Стабилизирую бизнес в кризис, восстанавливаю рентабельность и выстраиваю устойчивую модель роста.',
    'services.crisis.1': 'Экспресс-диагностика за 14 дней',
    'services.crisis.2': 'Устранение кассовых разрывов',
    'services.crisis.3': 'Реструктуризация долгов и расходов',
    'services.crisis.4': 'Вывод на прибыль за 90 дней',

    // Advantages
    'advantages.title': 'Почему выбирают меня',
    'advantages.1.title': 'Реальный опыт, а не теория',
    'advantages.1.desc': '20+ лет на руководящих позициях. Управлял командами до 1000 человек.',
    'advantages.2.title': 'AI-экспертиза',
    'advantages.2.desc': 'Не просто знаю об AI — внедряю нейросети в реальные бизнес-процессы.',
    'advantages.3.title': 'Комплексный подход',
    'advantages.3.desc': 'Работаю на стыке стратегии, технологий и управления людьми.',
    'advantages.4.title': 'Результат в цифрах',
    'advantages.4.desc': 'Каждый кейс — с измеримыми показателями. Средний ROI проектов — x3.',
    'advantages.5.title': 'Готовая команда',
    'advantages.5.desc': 'При необходимости привлекаю экспертов: маркетологов, финансистов, разработчиков.',
    'advantages.6.title': 'Автор 25+ книг',
    'advantages.6.desc': 'Системное мышление, подкреплённое глубокой экспертизой и практикой.',

    // Cases
    'cases.title': 'Кейсы и результаты',
    'cases.1.title': 'Производственная компания',
    'cases.1.desc': 'Вывод из убытков за 90 дней. Оптимизация расходов и увеличение маржинальности на 25%',
    'cases.2.title': 'IT-стартап',
    'cases.2.desc': 'Внедрение AI-автоматизации снизило операционные расходы на 40%',
    'cases.3.title': 'Сеть ресторанов',
    'cases.3.desc': 'Реструктуризация кредитов сэкономила более 2 млн рублей',
    'cases.4.title': 'Логистическая компания',
    'cases.4.desc': 'Рост выручки на 60% за 6 месяцев после внедрения AI-стратегии',
    'cases.5.title': 'Розничная сеть',
    'cases.5.desc': 'Внедрение AI-аналитики увеличило конверсию продаж на 35%',

    // Contact
    'contact.title': 'Готовы трансформировать бизнес?',
    'contact.subtitle': 'Оставьте заявку — проведу бесплатную 30-минутную диагностику вашего бизнеса',
    'contact.name': 'Ваше имя',
    'contact.phone': 'Телефон',
    'contact.email': 'Email',
    'contact.message': 'Опишите вашу задачу',
    'contact.submit': 'Отправить заявку',
    'contact.success': 'Заявка отправлена! Свяжусь с вами в ближайшее время.',
    'contact.error': 'Ошибка отправки. Попробуйте позже.',

    // Footer
    'footer.rights': 'Все права защищены',
    'footer.desc': 'Антикризисное управление и AI-консалтинг. Помогаю бизнесу расти с помощью технологий.',
  },
  en: {
    // Header
    'nav.about': 'About',
    'nav.services': 'Services',
    'nav.advantages': 'Advantages',
    'nav.cases': 'Cases',
    'nav.contacts': 'Contact',

    // Hero
    'hero.badge': 'AI & Crisis Management',
    'hero.title': 'Crisis Management Powered by AI Technologies',
    'hero.subtitle': 'I help businesses overcome crises, implement AI automation, and build growth strategies. 20+ years of management experience.',
    'hero.cta': 'Get a Consultation',
    'hero.stat1.value': '20+',
    'hero.stat1.label': 'years of experience',
    'hero.stat2.value': '1000+',
    'hero.stat2.label': 'employees managed',
    'hero.stat3.value': '50+',
    'hero.stat3.label': 'projects',

    // About
    'about.title': 'About Me',
    'about.intro': 'Anatoly Malyshev — business consultant, crisis manager, and AI technology expert. For over 20 years, I help companies overcome crises, build processes, and implement innovations.',
    'about.experience': 'years of experience',
    'about.employees': 'employees managed',
    'about.projects': 'successful projects',
    'about.books': 'business books',

    'about.skills.title': 'Core Competencies',
    'about.skill.1': 'Crisis Management',
    'about.skill.2': 'AI & Neural Networks (ChatGPT, Claude, MidJourney)',
    'about.skill.3': 'Strategic Planning',
    'about.skill.4': 'Business Process Automation',
    'about.skill.5': 'Financial Restructuring',
    'about.skill.6': 'Team Transformation',

    'about.booksSection': 'My Books',
    'about.booksDesc': '25+ books on business, management, and personal efficiency',
    'about.booksLink': 'View Books',
    'about.musicLink': 'My Music',
    'about.gamesLink': 'My Games',

    // Services
    'services.title': 'Services',
    'services.ai_auto.title': 'AI Automation',
    'services.ai_auto.desc': 'I implement AI solutions to optimize business processes, reduce costs, and improve efficiency.',
    'services.ai_auto.1': 'Process audit and automation',
    'services.ai_auto.2': 'Neural network integration into workflows',
    'services.ai_auto.3': 'AI assistants and chatbot deployment',
    'services.ai_auto.4': 'Data-driven optimization and analytics',

    'services.ai_consult.title': 'AI Consulting',
    'services.ai_consult.desc': 'I develop AI adoption strategies, train teams, and guide digital transformation.',
    'services.ai_consult.1': 'AI strategy for your business',
    'services.ai_consult.2': 'Tool selection and implementation',
    'services.ai_consult.3': 'Team AI training',
    'services.ai_consult.4': 'Digital transformation support',

    'services.crisis.title': 'Crisis Management',
    'services.crisis.desc': 'I stabilize businesses in crisis, restore profitability, and build sustainable growth models.',
    'services.crisis.1': 'Express diagnostics in 14 days',
    'services.crisis.2': 'Eliminating cash flow gaps',
    'services.crisis.3': 'Debt and expense restructuring',
    'services.crisis.4': 'Path to profitability in 90 days',

    // Advantages
    'advantages.title': 'Why Choose Me',
    'advantages.1.title': 'Real Experience, Not Theory',
    'advantages.1.desc': '20+ years in leadership roles. Managed teams of up to 1,000 people.',
    'advantages.2.title': 'AI Expertise',
    'advantages.2.desc': 'I don\'t just know about AI — I integrate neural networks into real business processes.',
    'advantages.3.title': 'Comprehensive Approach',
    'advantages.3.desc': 'Working at the intersection of strategy, technology, and people management.',
    'advantages.4.title': 'Results in Numbers',
    'advantages.4.desc': 'Every case with measurable KPIs. Average project ROI — x3.',
    'advantages.5.title': 'Ready Team',
    'advantages.5.desc': 'When needed, I bring in experts: marketers, financiers, developers.',
    'advantages.6.title': 'Author of 25+ Books',
    'advantages.6.desc': 'Systems thinking backed by deep expertise and practice.',

    // Cases
    'cases.title': 'Cases & Results',
    'cases.1.title': 'Manufacturing Company',
    'cases.1.desc': 'Exit from losses in 90 days. Cost optimization and 25% margin increase',
    'cases.2.title': 'IT Startup',
    'cases.2.desc': 'AI automation reduced operational costs by 40%',
    'cases.3.title': 'Restaurant Chain',
    'cases.3.desc': 'Credit restructuring saved over 2 million rubles',
    'cases.4.title': 'Logistics Company',
    'cases.4.desc': '60% revenue growth in 6 months after AI strategy implementation',
    'cases.5.title': 'Retail Chain',
    'cases.5.desc': 'AI analytics implementation increased sales conversion by 35%',

    // Contact
    'contact.title': 'Ready to Transform Your Business?',
    'contact.subtitle': 'Leave a request — I\'ll conduct a free 30-minute diagnostics of your business',
    'contact.name': 'Your name',
    'contact.phone': 'Phone',
    'contact.email': 'Email',
    'contact.message': 'Describe your challenge',
    'contact.submit': 'Send Request',
    'contact.success': 'Request sent! I will contact you soon.',
    'contact.error': 'Sending error. Try again later.',

    // Footer
    'footer.rights': 'All rights reserved',
    'footer.desc': 'Crisis management and AI consulting. Helping businesses grow through technology.',
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
