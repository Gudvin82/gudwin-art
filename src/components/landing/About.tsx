import { useEffect, useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { BookOpen, Music, Gamepad2, ExternalLink, Check, Brain } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

interface CounterProps {
  end: number;
  suffix?: string;
  duration?: number;
}

const Counter = ({ end, suffix = '', duration = 2 }: CounterProps) => {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (!isInView) return;
    let startTime: number;
    const step = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / (duration * 1000), 1);
      setCount(Math.floor(progress * end));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [isInView, end, duration]);

  return <span ref={ref}>{count}{suffix}</span>;
};

const About = () => {
  const { t } = useLanguage();

  const stats = [
    { value: 20, suffix: '+', label: t('about.experience') },
    { value: 1000, suffix: '+', label: t('about.employees') },
    { value: 50, suffix: '+', label: t('about.projects') },
    { value: 25, suffix: '+', label: t('about.books') },
  ];

  const skills = [
    t('about.skill.1'),
    t('about.skill.2'),
    t('about.skill.3'),
    t('about.skill.4'),
    t('about.skill.5'),
    t('about.skill.6'),
  ];

  const links = [
    { icon: BookOpen, label: t('about.booksLink'), href: 'https://t.me/knigi_malishev', gradient: 'from-amber-500 to-orange-500' },
    { icon: Music, label: t('about.musicLink'), href: 'https://t.me/music_malishev', gradient: 'from-pink-500 to-rose-500' },
    { icon: Gamepad2, label: t('about.gamesLink'), href: 'https://t.me/Gudvin_Game_Bot', gradient: 'from-green-500 to-emerald-500' },
  ];

  return (
    <section id="about" className="py-20 md:py-32 bg-muted/30 overflow-hidden">
      <div className="container mx-auto px-4 md:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12 md:mb-16"
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">{t('about.title')}</h2>
          <div className="w-20 h-1 bg-gradient-to-r from-primary to-secondary mx-auto rounded-full" />
        </motion.div>

        {/* Intro */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-lg md:text-xl text-muted-foreground text-center max-w-3xl mx-auto mb-14"
        >
          {t('about.intro')}
        </motion.p>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 mb-16">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="relative group"
            >
              <div className="relative p-6 md:p-8 rounded-2xl bg-card border border-border/50 text-center overflow-hidden hover:border-primary/50 transition-all duration-300">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-secondary/5 opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="relative z-10">
                  <div className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent mb-2">
                    <Counter end={stat.value} suffix={stat.suffix} />
                  </div>
                  <div className="text-sm text-muted-foreground">{stat.label}</div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-8">
          {/* Skills */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="p-6 md:p-8 rounded-2xl bg-card border border-border/50"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
                <Brain className="w-5 h-5 text-white" />
              </div>
              <h3 className="text-xl font-bold">{t('about.skills.title')}</h3>
            </div>
            <ul className="space-y-3">
              {skills.map((skill, i) => (
                <li key={i} className="flex items-center gap-3 text-muted-foreground">
                  <Check className="w-4 h-4 text-primary flex-shrink-0" />
                  <span>{skill}</span>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Books & Links */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-4"
          >
            {/* Books highlight */}
            <div className="p-6 rounded-2xl bg-card border border-border/50 hover:border-primary/50 transition-all duration-300">
              <div className="flex items-center gap-4 mb-3">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-amber-500 to-orange-500 flex items-center justify-center">
                  <span className="text-2xl">📚</span>
                </div>
                <div>
                  <h4 className="font-semibold">{t('about.booksSection')}</h4>
                  <p className="text-sm text-muted-foreground">{t('about.booksDesc')}</p>
                </div>
              </div>
            </div>

            {/* Links */}
            {links.map((link, index) => {
              const Icon = link.icon;
              return (
                <motion.a
                  key={index}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.02, x: 5 }}
                  className="group flex items-center justify-between p-5 rounded-2xl bg-card border border-border/50 hover:border-primary/50 transition-all duration-300"
                >
                  <div className="flex items-center gap-4">
                    <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${link.gradient} flex items-center justify-center`}>
                      <Icon className="w-5 h-5 text-white" />
                    </div>
                    <span className="font-medium">{link.label}</span>
                  </div>
                  <ExternalLink className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors" />
                </motion.a>
              );
            })}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About;
