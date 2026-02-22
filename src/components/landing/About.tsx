import { motion } from 'framer-motion';
import { CheckCircle2 } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

const About = () => {
  const { t } = useLanguage();

  const skills = [
    t('expertise.skill.1'),
    t('expertise.skill.2'),
    t('expertise.skill.3'),
    t('expertise.skill.4'),
    t('expertise.skill.5'),
    t('expertise.skill.6'),
  ];

  const stats = [
    { value: t('hero.metric.1.value'), label: t('hero.metric.1.label') },
    { value: t('hero.metric.2.value'), label: t('hero.metric.2.label') },
    { value: t('hero.metric.3.value'), label: t('hero.metric.3.label') },
  ];

  return (
    <section id="expertise" className="py-20 md:py-28">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid gap-8 lg:grid-cols-[1.05fr_0.95fr]">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="rounded-3xl border border-border/70 bg-card/75 p-8 backdrop-blur"
          >
            <p className="text-xs uppercase tracking-[0.2em] text-primary">Profile</p>
            <h2 className="mt-3 font-display text-3xl md:text-4xl">{t('expertise.title')}</h2>
            <p className="mt-5 leading-relaxed text-muted-foreground">{t('expertise.intro')}</p>

            <div className="mt-8 grid gap-4 sm:grid-cols-3">
              {stats.map((item) => (
                <div key={item.label} className="rounded-2xl border border-border/70 bg-background/70 p-4">
                  <p className="font-display text-2xl text-primary">{item.value}</p>
                  <p className="mt-1 text-xs text-muted-foreground">{item.label}</p>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="rounded-3xl border border-border/70 bg-card/75 p-8"
          >
            <h3 className="font-display text-2xl">{t('expertise.skills.title')}</h3>
            <ul className="mt-6 space-y-4">
              {skills.map((skill) => (
                <li key={skill} className="flex items-start gap-3 text-sm text-muted-foreground">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 flex-shrink-0 text-primary" />
                  <span>{skill}</span>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About;
