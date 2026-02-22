import { motion } from 'framer-motion';
import { Bot, ShieldAlert, Workflow } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

const Services = () => {
  const { t, language } = useLanguage();

  const cards = [
    {
      icon: ShieldAlert,
      title: t('offer.crisis.title'),
      desc: t('offer.crisis.desc'),
      points: [
        t('offer.crisis.1'),
        t('offer.crisis.2'),
        t('offer.crisis.3'),
        t('offer.crisis.4'),
      ],
      glow: 'from-orange-500/30 to-red-500/5',
    },
    {
      icon: Bot,
      title: t('offer.ai.title'),
      desc: t('offer.ai.desc'),
      points: [
        t('offer.ai.1'),
        t('offer.ai.2'),
        t('offer.ai.3'),
        t('offer.ai.4'),
      ],
      glow: 'from-primary/35 to-secondary/5',
    },
  ];

  const path = [
    { title: t('offer.path.1.title'), desc: t('offer.path.1.desc') },
    { title: t('offer.path.2.title'), desc: t('offer.path.2.desc') },
    { title: t('offer.path.3.title'), desc: t('offer.path.3.desc') },
  ];

  const useCases =
    language === 'ru'
      ? [
          { title: 'Продажи и лидогенерация', desc: 'AI-скрипты, квалификация лидов и контроль конверсии по этапам.' },
          { title: 'Клиентский сервис 24/7', desc: 'Telegram/сайт-боты закрывают типовые обращения и ускоряют SLA.' },
          { title: 'Управленческая аналитика', desc: 'Единый контур метрик для собственника и C-level в реальном времени.' },
        ]
      : language === 'zh'
      ? [
          { title: '销售与获客', desc: '通过 AI 脚本和线索分级提升转化效率。' },
          { title: '7x24 客户服务', desc: '网站与 Telegram 机器人自动处理高频请求。' },
          { title: '管理层数据看板', desc: '为股东和管理层提供实时经营指标。' },
        ]
      : [
          { title: 'Sales and Lead Flow', desc: 'AI scripts, lead qualification, and conversion control across the funnel.' },
          { title: '24/7 Customer Service', desc: 'Telegram and website bots handle repetitive requests and improve SLA.' },
          { title: 'Executive Analytics Layer', desc: 'A single KPI cockpit for founders and C-level teams in real time.' },
        ];

  return (
    <section id="offer" className="py-20 md:py-28">
      <div className="container mx-auto px-4 md:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55 }}
          className="mx-auto max-w-3xl text-center"
        >
          <h2 className="font-display text-3xl md:text-5xl">{t('offer.title')}</h2>
          <p className="mt-4 text-muted-foreground">{t('offer.subtitle')}</p>
        </motion.div>

        <div className="mt-10 grid gap-6 lg:grid-cols-2">
          {cards.map((card, i) => {
            const Icon = card.icon;
            return (
              <motion.article
                key={card.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                className="relative overflow-hidden rounded-3xl border border-border/70 bg-card/75 p-7"
              >
                <div className={`pointer-events-none absolute inset-0 bg-gradient-to-br ${card.glow} opacity-70`} />
                <div className="relative z-10">
                  <div className="mb-4 inline-flex rounded-xl border border-border/70 bg-background/70 p-2">
                    <Icon className="h-5 w-5 text-primary" />
                  </div>
                  <h3 className="font-display text-2xl">{card.title}</h3>
                  <p className="mt-3 text-sm text-muted-foreground">{card.desc}</p>
                  <ul className="mt-5 space-y-3 text-sm text-muted-foreground">
                    {card.points.map((point) => (
                      <li key={point} className="flex items-start gap-3">
                        <span className="mt-2 h-1.5 w-1.5 rounded-full bg-primary" />
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.article>
            );
          })}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55, delay: 0.1 }}
          className="mt-10 rounded-3xl border border-border/70 bg-card/75 p-7"
        >
          <div className="mb-6 flex items-center gap-2">
            <Workflow className="h-5 w-5 text-primary" />
            <h3 className="font-display text-2xl">{t('offer.path.title')}</h3>
          </div>
          <div className="grid gap-4 md:grid-cols-3">
            {path.map((step) => (
              <div key={step.title} className="rounded-2xl border border-border/70 bg-background/70 p-5">
                <h4 className="text-sm font-semibold">{step.title}</h4>
                <p className="mt-2 text-sm text-muted-foreground">{step.desc}</p>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55, delay: 0.15 }}
          className="mt-8 grid gap-4 md:grid-cols-3"
        >
          {useCases.map((item) => (
            <article key={item.title} className="rounded-2xl border border-border/70 bg-card/70 p-5">
              <p className="text-xs uppercase tracking-[0.16em] text-primary">Use case</p>
              <h4 className="mt-2 font-display text-xl">{item.title}</h4>
              <p className="mt-2 text-sm text-muted-foreground">{item.desc}</p>
            </article>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Services;
