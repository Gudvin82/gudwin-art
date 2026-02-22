import { motion } from 'framer-motion';
import { TrendingUp, Factory, Code, Utensils, Truck, ShoppingBag } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

const Cases = () => {
  const { t } = useLanguage();

  const cases = [
    { icon: Factory, title: t('cases.1.title'), description: t('cases.1.desc'), result: '+25%', resultLabel: 'маржинальность', gradient: 'from-orange-500 to-red-500' },
    { icon: Code, title: t('cases.2.title'), description: t('cases.2.desc'), result: '-40%', resultLabel: 'расходы', gradient: 'from-purple-500 to-pink-500' },
    { icon: Utensils, title: t('cases.3.title'), description: t('cases.3.desc'), result: '2+ млн', resultLabel: 'экономия', gradient: 'from-amber-500 to-orange-500' },
    { icon: Truck, title: t('cases.4.title'), description: t('cases.4.desc'), result: '+60%', resultLabel: 'выручка', gradient: 'from-blue-500 to-cyan-500' },
    { icon: ShoppingBag, title: t('cases.5.title'), description: t('cases.5.desc'), result: '+35%', resultLabel: 'конверсия', gradient: 'from-green-500 to-emerald-500' },
  ];

  return (
    <section id="cases" className="py-20 md:py-32">
      <div className="container mx-auto px-4 md:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12 md:mb-16"
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">{t('cases.title')}</h2>
          <div className="w-20 h-1 bg-gradient-to-r from-primary to-secondary mx-auto rounded-full" />
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {cases.map((caseItem, index) => {
            const Icon = caseItem.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group relative"
              >
                <div className="h-full p-6 md:p-8 rounded-2xl bg-card border border-border/50 hover:border-primary/50 transition-all duration-300 overflow-hidden">
                  <div className={`absolute inset-0 bg-gradient-to-br ${caseItem.gradient} opacity-0 group-hover:opacity-5 transition-opacity`} />

                  <div className="relative z-10">
                    <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${caseItem.gradient} p-0.5 mb-6`}>
                      <div className="w-full h-full rounded-xl bg-card flex items-center justify-center">
                        <Icon className="w-6 h-6" />
                      </div>
                    </div>

                    <h3 className="text-xl font-bold mb-3">{caseItem.title}</h3>
                    <p className="text-muted-foreground text-sm mb-6">{caseItem.description}</p>

                    <div className="flex items-center gap-2 pt-4 border-t border-border/50">
                      <TrendingUp className="w-5 h-5 text-primary" />
                      <span className={`text-2xl font-bold bg-gradient-to-r ${caseItem.gradient} bg-clip-text text-transparent`}>
                        {caseItem.result}
                      </span>
                      <span className="text-sm text-muted-foreground">{caseItem.resultLabel}</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Cases;
