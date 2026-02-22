import { motion } from 'framer-motion';
import { ArrowRight, Sparkles, Zap } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

const Hero = () => {
  const { t } = useLanguage();

  const metrics = [
    { value: t('hero.metric.1.value'), label: t('hero.metric.1.label') },
    { value: t('hero.metric.2.value'), label: t('hero.metric.2.label') },
    { value: t('hero.metric.3.value'), label: t('hero.metric.3.label') },
  ];

  const chips = [t('hero.chip.1'), t('hero.chip.2'), t('hero.chip.3')];

  const scrollTo = (selector: string) => {
    const node = document.querySelector(selector);
    if (node) node.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative overflow-hidden pb-20 pt-36 md:pb-28 md:pt-40">
      <div className="pointer-events-none absolute inset-0">
        <div className="aurora-orb absolute -left-24 top-6 h-72 w-72 rounded-full" />
        <div className="aurora-orb-delayed absolute right-[-80px] top-1/4 h-80 w-80 rounded-full" />
        <div className="scan-beam absolute left-1/2 top-0 h-full w-[520px] -translate-x-1/2" />
        <div className="tech-grid absolute inset-0 opacity-70" />
      </div>

      <div className="container relative z-10 mx-auto px-4 md:px-6">
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="mb-8 text-center"
        >
          <motion.p
            className="hero-brand hero-brand-3d mx-auto inline-block font-display text-4xl font-semibold sm:text-6xl lg:text-7xl"
            animate={{ scale: [1, 1.02, 1], filter: ['drop-shadow(0 0 10px rgba(255,196,64,.45))', 'drop-shadow(0 0 24px rgba(0,232,255,.55))', 'drop-shadow(0 0 10px rgba(255,196,64,.45))'] }}
            transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
          >
            GudWin AI Agency
          </motion.p>
        </motion.div>

        <div className="mx-auto grid max-w-6xl items-center gap-8 lg:grid-cols-[1.05fr_0.95fr]">
          <div>
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="mb-6 inline-flex items-center gap-2 rounded-full border border-primary/40 bg-primary/15 px-4 py-2 text-sm shadow-[0_0_30px_hsl(var(--primary)/0.2)]"
            >
              <Sparkles className="h-4 w-4 text-primary" />
              <span className="text-primary">{t('hero.badge')}</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.65, delay: 0.1 }}
              className="max-w-4xl text-balance font-display text-4xl leading-tight md:text-6xl"
            >
              {t('hero.title')}
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.65, delay: 0.2 }}
              className="mt-6 max-w-2xl text-lg leading-relaxed text-muted-foreground"
            >
              {t('hero.subtitle')}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.3 }}
              className="mt-8 flex flex-wrap gap-3"
            >
              {chips.map((chip) => (
                <span
                  key={chip}
                  className="rounded-full border border-border/80 bg-card/80 px-4 py-2 text-sm text-muted-foreground backdrop-blur"
                >
                  {chip}
                </span>
              ))}
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.4 }}
              className="mt-10 flex flex-wrap gap-3"
            >
              <button
                onClick={() => scrollTo('#contact')}
                className="group inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-primary to-secondary px-6 py-3 font-medium text-primary-foreground shadow-[0_0_40px_hsl(var(--primary)/0.35)]"
                type="button"
              >
                {t('hero.cta.primary')}
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </button>
              <button
                onClick={() => scrollTo('#offer')}
                className="rounded-xl border border-border/80 bg-card/80 px-6 py-3 font-medium text-foreground"
                type="button"
              >
                {t('hero.cta.secondary')}
              </button>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="mt-12 grid gap-4 sm:grid-cols-3"
            >
              {metrics.map((metric, index) => (
                <motion.div
                  key={metric.label}
                  className="rounded-2xl border border-border/70 bg-card/75 p-5 backdrop-blur"
                  animate={{ y: [0, index % 2 === 0 ? -8 : 8, 0] }}
                  transition={{ duration: 4 + index, repeat: Infinity, ease: 'easeInOut' }}
                >
                  <p className="font-display text-3xl text-primary">{metric.value}</p>
                  <p className="mt-1 text-sm text-muted-foreground">{metric.label}</p>
                </motion.div>
              ))}
            </motion.div>
          </div>

          <motion.aside
            initial={{ opacity: 0, x: 22 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="relative hidden overflow-hidden rounded-3xl border border-border/70 bg-card/70 p-6 backdrop-blur lg:block"
          >
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,hsl(var(--primary)/0.18),transparent_45%),radial-gradient(circle_at_80%_80%,hsl(var(--secondary)/0.20),transparent_45%)]" />
            <div className="relative space-y-5">
              <img src="/gudwin-logo.png" alt="GudWin AI Agency logo" className="h-24 w-full rounded-2xl border border-border/70 object-cover" />
              <div className="rounded-2xl border border-border/70 bg-background/65 p-5">
                <p className="text-xs uppercase tracking-[0.2em] text-primary">AI Operating Layer</p>
                <p className="mt-3 text-sm text-muted-foreground">
                  Единый контур: антикризисная стратегия + AI-инфраструктура + ежедневная управленческая аналитика.
                </p>
              </div>
              <div className="grid gap-3 sm:grid-cols-2">
                {[
                  'Аудит и карта рисков',
                  'AI-автоматизация под KPI',
                  'Быстрый запуск пилота',
                  'Масштабирование под бизнес',
                ].map((item) => (
                  <div key={item} className="rounded-xl border border-border/70 bg-background/70 p-3 text-xs text-muted-foreground">
                    <Zap className="mb-2 h-4 w-4 text-primary" />
                    {item}
                  </div>
                ))}
              </div>
            </div>
          </motion.aside>
        </div>
      </div>
    </section>
  );
};

export default Hero;
