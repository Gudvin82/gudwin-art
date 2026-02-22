import { motion } from 'framer-motion';
import { Award, Brain, Layers, TrendingUp, Users, BookOpen } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

const Advantages = () => {
  const { t } = useLanguage();

  const advantages = [
    { icon: Award, title: t('advantages.1.title'), desc: t('advantages.1.desc'), gradient: 'from-amber-500 to-orange-500' },
    { icon: Brain, title: t('advantages.2.title'), desc: t('advantages.2.desc'), gradient: 'from-purple-500 to-pink-500' },
    { icon: Layers, title: t('advantages.3.title'), desc: t('advantages.3.desc'), gradient: 'from-blue-500 to-cyan-500' },
    { icon: TrendingUp, title: t('advantages.4.title'), desc: t('advantages.4.desc'), gradient: 'from-green-500 to-emerald-500' },
    { icon: Users, title: t('advantages.5.title'), desc: t('advantages.5.desc'), gradient: 'from-indigo-500 to-violet-500' },
    { icon: BookOpen, title: t('advantages.6.title'), desc: t('advantages.6.desc'), gradient: 'from-rose-500 to-red-500' },
  ];

  return (
    <section id="advantages" className="py-20 md:py-32 bg-muted/30">
      <div className="container mx-auto px-4 md:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12 md:mb-16"
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">{t('advantages.title')}</h2>
          <div className="w-20 h-1 bg-gradient-to-r from-primary to-secondary mx-auto rounded-full" />
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {advantages.map((item, index) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group relative p-6 rounded-2xl bg-card border border-border/50 hover:border-primary/50 transition-all duration-300 overflow-hidden"
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${item.gradient} opacity-0 group-hover:opacity-5 transition-opacity`} />
                <div className="relative z-10">
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${item.gradient} p-0.5 mb-4`}>
                    <div className="w-full h-full rounded-xl bg-card flex items-center justify-center">
                      <Icon className="w-5 h-5 text-foreground" />
                    </div>
                  </div>
                  <h3 className="text-lg font-bold mb-2 group-hover:text-primary transition-colors">{item.title}</h3>
                  <p className="text-sm text-muted-foreground">{item.desc}</p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Advantages;
