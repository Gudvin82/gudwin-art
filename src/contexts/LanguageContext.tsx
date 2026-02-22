import React, { createContext, useContext, useEffect, useState } from 'react';

type Language = 'ru' | 'en' | 'zh';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const translations: Record<Language, Record<string, string>> = {
  ru: {
    'brand.name': 'GudWin AI Agency',
    'brand.short': 'GW',

    'nav.offer': 'Решения',
    'nav.pricing': 'Цены',
    'nav.expertise': 'О компании',
    'nav.contact': 'Связаться',

    'hero.badge': 'Антикризисное управление + AI агентство полного цикла',
    'hero.title': 'Стабилизируем бизнес и строим AI-систему',
    'hero.subtitle': 'Превращаем хаос в управляемую систему: антикризисные решения, AI-автоматизация и рост прибыли на языке конкретных цифр.',
    'hero.cta.primary': 'Получить стратегический разбор',
    'hero.cta.secondary': 'Смотреть решения и цены',
    'hero.metric.1.value': '20+',
    'hero.metric.1.label': 'лет управленческой практики',
    'hero.metric.2.value': 'TEAM',
    'hero.metric.2.label': 'команда профессионалов',
    'hero.metric.3.value': '50+',
    'hero.metric.3.label': 'проектов трансформации',
    'hero.chip.1': 'Антикризисное управление',
    'hero.chip.2': 'AI агентство полного цикла',
    'hero.chip.3': 'Системный рост компании',

    'offer.title': 'Решения, которые дают деньги, а не отчеты',
    'offer.subtitle': 'Подключаемся как операционный AI-партнер: быстро снимаем риски, запускаем систему роста и закрепляем результат на KPI.',

    'offer.crisis.title': 'Антикризисный контур',
    'offer.crisis.desc': 'Вытаскиваем бизнес из турбулентности: закрываем кассовые разрывы, наводим управленческий порядок и возвращаем контроль собственнику.',
    'offer.crisis.1': 'Экспресс-диагностика узких мест',
    'offer.crisis.2': 'План стабилизации на 14 дней',
    'offer.crisis.3': 'Операционная и финансовая реструктуризация',
    'offer.crisis.4': 'Выход в стабильный денежный поток',

    'offer.ai.title': 'AI-контур полного цикла',
    'offer.ai.desc': 'Собираем AI-контур под ключ: от стратегии и архитектуры до работающих агентов, которые экономят ресурсы и ускоряют продажи.',
    'offer.ai.1': 'AI-аудит процессов и ролей',
    'offer.ai.2': 'Проектирование воронки автоматизаций',
    'offer.ai.3': 'Запуск AI-агентов в продажах, сервисе и аналитике',
    'offer.ai.4': 'Масштабирование и обучение команды',

    'offer.path.title': 'Как идем к результату',
    'offer.path.1.title': 'Шаг 1. Диагностика',
    'offer.path.1.desc': 'Выявляем точки потерь денег, времени и качества решений.',
    'offer.path.2.title': 'Шаг 2. Архитектура решения',
    'offer.path.2.desc': 'Фиксируем план с KPI, этапами и зонами ответственности.',
    'offer.path.3.title': 'Шаг 3. Внедрение',
    'offer.path.3.desc': 'Запускаем, донастраиваем и закрепляем результат на метриках.',

    'expertise.title': 'О компании и экспертизе',
    'expertise.intro': 'GudWin AI Agency основано на практическом опыте антикризисного управления и глубокой AI-компетенции. В основе подхода - жесткая управленческая дисциплина, системная аналитика и фокус на измеримую прибыль клиента.',
    'expertise.skills.title': 'Ключевые компетенции',
    'expertise.skill.1': 'Антикризисное управление в высокорисковых сценариях',
    'expertise.skill.2': 'Стратегическая и операционная трансформация',
    'expertise.skill.3': 'Финансовая стабилизация и реструктуризация',
    'expertise.skill.4': 'AI-агенты, автоматизация и интеграция в процессы',
    'expertise.skill.5': 'Рост продаж и повышение эффективности команд',
    'expertise.skill.6': 'Управление изменениями на уровне собственника и C-level',

    'contact.title': 'Запросить стратегическую сессию и план роста',
    'contact.subtitle': 'Опишите цель бизнеса и точку боли. Вернемся с сильным планом действий, сроками и фокусом на деньги.',
    'contact.name': 'Ваше имя',
    'contact.phone': 'Телефон',
    'contact.telegram': 'Ваш Telegram (@username)',
    'contact.message': 'Кратко опишите задачу',
    'contact.consent': 'Я согласен(а) на обработку персональных данных и принимаю условия документов.',
    'contact.submit': 'Отправить запрос',
    'contact.sending': 'Отправка...',
    'contact.sent': 'Отправлено',
    'contact.success': 'Запрос отправлен. Мы свяжемся с вами в Telegram.',
    'contact.error': 'Ошибка отправки. Попробуйте еще раз.',

    'footer.desc': 'GudWin AI Agency - антикризисное управление и AI агентство полного цикла.',
    'footer.rights': 'Все права защищены',
    'footer.company': 'Самозанятый: Малышев А. Н. (НПД)',
    'footer.requisites': 'Все чеки формируются через приложение "Мой налог"',
    'footer.address': 'Адрес: Российская Федерация, г. Санкт-Петербург',
    'footer.hours': 'Режим работы: Пн-Пт 10:00-19:00 (МСК)',
    'footer.legal': 'Юридические документы',
    'footer.policy': 'Политика обработки персональных данных',
    'footer.consent': 'Согласие на обработку персональных данных',
    'footer.terms': 'Пользовательское соглашение',
  },
  en: {
    'brand.name': 'GudWin AI Agency',
    'brand.short': 'GW',

    'nav.offer': 'Solutions',
    'nav.pricing': 'Pricing',
    'nav.expertise': 'Company',
    'nav.contact': 'Contact',

    'hero.badge': 'Crisis Management + Full-Cycle AI Agency',
    'hero.title': 'GudWin AI Agency: stabilize operations and launch AI-driven growth',
    'hero.subtitle': 'We step into critical situations, restore control quickly, and deploy AI agents that produce measurable business outcomes.',
    'hero.cta.primary': 'Request Audit',
    'hero.cta.secondary': 'Explore Solutions',
    'hero.metric.1.value': '20+',
    'hero.metric.1.label': 'years of management practice',
    'hero.metric.2.value': 'TEAM',
    'hero.metric.2.label': 'team of professionals',
    'hero.metric.3.value': '50+',
    'hero.metric.3.label': 'transformation projects',
    'hero.chip.1': 'Crisis Management',
    'hero.chip.2': 'Full-Cycle AI Agency',
    'hero.chip.3': 'Systemic Business Growth',

    'offer.title': 'What We Do',
    'offer.subtitle': 'Two integrated tracks: anti-crisis execution and technology acceleration with AI.',

    'offer.crisis.title': 'Crisis Track',
    'offer.crisis.desc': 'We identify risks, close cash gaps, and restore operational and financial control.',
    'offer.crisis.1': 'Rapid bottleneck diagnostics',
    'offer.crisis.2': '14-day stabilization plan',
    'offer.crisis.3': 'Operational and financial restructuring',
    'offer.crisis.4': 'Transition to stable cash flow',

    'offer.ai.title': 'Full-Cycle AI Track',
    'offer.ai.desc': 'We design and implement AI architecture for your business model and optimize it against KPIs.',
    'offer.ai.1': 'AI audit of workflows and roles',
    'offer.ai.2': 'Automation funnel architecture',
    'offer.ai.3': 'AI agents for sales, service, and analytics',
    'offer.ai.4': 'Scale-up and team enablement',

    'offer.path.title': 'Execution Model',
    'offer.path.1.title': 'Step 1. Diagnostics',
    'offer.path.1.desc': 'Find where money, time, and decision quality are lost.',
    'offer.path.2.title': 'Step 2. Solution Architecture',
    'offer.path.2.desc': 'Build a KPI-linked roadmap with clear ownership.',
    'offer.path.3.title': 'Step 3. Implementation',
    'offer.path.3.desc': 'Launch, tune, and lock outcomes into performance metrics.',

    'expertise.title': 'About Company and Expertise',
    'expertise.intro': 'GudWin AI Agency combines hands-on crisis leadership with deep AI execution. The approach is built on management discipline, systems thinking, and measurable client profitability.',
    'expertise.skills.title': 'Core Competencies',
    'expertise.skill.1': 'Crisis management in high-risk environments',
    'expertise.skill.2': 'Strategic and operational transformation',
    'expertise.skill.3': 'Financial stabilization and restructuring',
    'expertise.skill.4': 'AI agents, automation, and process integration',
    'expertise.skill.5': 'Sales acceleration and team efficiency',
    'expertise.skill.6': 'Change execution with owners and C-level teams',

    'contact.title': 'Request a Strategy Session',
    'contact.subtitle': 'Share your task and Telegram contact. We will return with an action plan.',
    'contact.name': 'Your name',
    'contact.phone': 'Phone',
    'contact.telegram': 'Your Telegram (@username)',
    'contact.message': 'Briefly describe your challenge',
    'contact.consent': 'I agree to personal data processing and accept the legal documents.',
    'contact.submit': 'Send Request',
    'contact.sending': 'Sending...',
    'contact.sent': 'Sent',
    'contact.success': 'Request sent. We will contact you in Telegram.',
    'contact.error': 'Failed to send. Please try again.',

    'footer.desc': 'GudWin AI Agency - crisis management and full-cycle AI implementation.',
    'footer.rights': 'All rights reserved',
    'footer.company': 'Self-employed: Malyshev A. N. (NPD)',
    'footer.requisites': 'All receipts are issued via the "My Tax" app',
    'footer.address': 'Address: Saint Petersburg, Russian Federation',
    'footer.hours': 'Working hours: Mon-Fri 10:00-19:00 (MSK)',
    'footer.legal': 'Legal Documents',
    'footer.policy': 'Personal Data Processing Policy',
    'footer.consent': 'Personal Data Processing Consent',
    'footer.terms': 'Terms of Use',
  },
  zh: {
    'brand.name': 'GudWin AI Agency',
    'brand.short': 'GW',

    'nav.offer': '解决方案',
    'nav.pricing': '价格',
    'nav.expertise': '公司介绍',
    'nav.contact': '联系',

    'hero.badge': '危机管理 + 全流程 AI 机构',
    'hero.title': 'GudWin AI Agency：稳住经营并启动 AI 增长系统',
    'hero.subtitle': '我们在关键节点介入，快速恢复企业控制力，并部署可产生可量化结果的 AI 智能体。',
    'hero.cta.primary': '申请审计',
    'hero.cta.secondary': '查看方案',
    'hero.metric.1.value': '20+',
    'hero.metric.1.label': '年管理实战经验',
    'hero.metric.2.value': 'TEAM',
    'hero.metric.2.label': '专业团队',
    'hero.metric.3.value': '50+',
    'hero.metric.3.label': '转型项目',
    'hero.chip.1': '危机管理',
    'hero.chip.2': '全流程 AI 机构',
    'hero.chip.3': '系统化增长',

    'offer.title': '我们的工作内容',
    'offer.subtitle': '双引擎并行：危机稳定化 + AI 技术加速。',

    'offer.crisis.title': '危机管理模块',
    'offer.crisis.desc': '识别风险，修复现金流缺口，恢复运营与财务可控性。',
    'offer.crisis.1': '快速识别核心瓶颈',
    'offer.crisis.2': '14天稳定化计划',
    'offer.crisis.3': '运营与财务重组',
    'offer.crisis.4': '进入稳定现金流阶段',

    'offer.ai.title': '全流程 AI 模块',
    'offer.ai.desc': '基于业务模型设计并落地 AI 架构，以 KPI 为导向持续优化。',
    'offer.ai.1': '业务流程与岗位 AI 审计',
    'offer.ai.2': '自动化漏斗架构设计',
    'offer.ai.3': '销售/服务/分析 AI 智能体上线',
    'offer.ai.4': '规模化复制与团队赋能',

    'offer.path.title': '执行路径',
    'offer.path.1.title': '步骤1：诊断',
    'offer.path.1.desc': '定位资金、时间和决策质量的损耗点。',
    'offer.path.2.title': '步骤2：方案架构',
    'offer.path.2.desc': '制定KPI、里程碑与责任矩阵。',
    'offer.path.3.title': '步骤3：落地执行',
    'offer.path.3.desc': '上线、调优并固化到可见指标。',

    'expertise.title': '公司与专业能力',
    'expertise.intro': 'GudWin AI Agency 将危机管理实战与 AI 落地能力结合，强调管理纪律、系统分析与客户利润提升。',
    'expertise.skills.title': '核心能力',
    'expertise.skill.1': '高风险场景危机管理',
    'expertise.skill.2': '战略与运营转型',
    'expertise.skill.3': '财务稳定与重组',
    'expertise.skill.4': 'AI 智能体、自动化与流程集成',
    'expertise.skill.5': '销售增长与团队效率提升',
    'expertise.skill.6': '与股东和管理层协同推动变革',

    'contact.title': '预约战略会谈',
    'contact.subtitle': '请留下任务描述与 Telegram 联系方式，我们将返回可执行方案。',
    'contact.name': '姓名',
    'contact.phone': '电话',
    'contact.telegram': 'Telegram（@username）',
    'contact.message': '请简述你的需求',
    'contact.consent': '我同意个人数据处理并接受法律文件条款。',
    'contact.submit': '提交请求',
    'contact.sending': '发送中...',
    'contact.sent': '已发送',
    'contact.success': '提交成功，我们将通过 Telegram 联系你。',
    'contact.error': '发送失败，请稍后重试。',

    'footer.desc': 'GudWin AI Agency - 危机管理与全流程 AI 落地。',
    'footer.rights': '版权所有',
    'footer.company': '个体纳税人：Малышев А. Н.（NPD）',
    'footer.requisites': '所有收据均通过“Мой налог”应用生成',
    'footer.address': '地址：俄罗斯联邦 圣彼得堡',
    'footer.hours': '工作时间：周一至周五 10:00-19:00（莫斯科时间）',
    'footer.legal': '法律文件',
    'footer.policy': '个人数据处理政策',
    'footer.consent': '个人数据处理同意书',
    'footer.terms': '用户协议',
  },
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const isLanguage = (value: string | null): value is Language => value === 'ru' || value === 'en' || value === 'zh';

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<Language>(() => {
    const saved = localStorage.getItem('language');
    return isLanguage(saved) ? saved : 'ru';
  });

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem('language', lang);
  };

  const t = (key: string): string => translations[language][key] || key;

  useEffect(() => {
    document.documentElement.lang = language === 'zh' ? 'zh-CN' : language;
  }, [language]);

  return <LanguageContext.Provider value={{ language, setLanguage, t }}>{children}</LanguageContext.Provider>;
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
