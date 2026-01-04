import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, TrendingUp, Factory, Code, Utensils, Truck, ShoppingBag, Hospital, Building2 } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

const Cases = () => {
  const { t } = useLanguage();
  const [currentIndex, setCurrentIndex] = useState(0);

  const cases = [
    {
      icon: Factory,
      title: t('cases.1.title'),
      description: t('cases.1.desc'),
      result: '+25%',
      resultLabel: 'маржинальность',
      gradient: 'from-orange-500 to-red-500',
    },
    {
      icon: Code,
      title: t('cases.2.title'),
      description: t('cases.2.desc'),
      result: '-40%',
      resultLabel: 'расходы',
      gradient: 'from-purple-500 to-pink-500',
    },
    {
      icon: Utensils,
      title: t('cases.3.title'),
      description: t('cases.3.desc'),
      result: '2+ млн',
      resultLabel: 'экономия',
      gradient: 'from-amber-500 to-orange-500',
    },
    {
      icon: Truck,
      title: t('cases.4.title'),
      description: t('cases.4.desc'),
      result: '+60%',
      resultLabel: 'выручка',
      gradient: 'from-blue-500 to-cyan-500',
    },
    {
      icon: ShoppingBag,
      title: t('cases.5.title'),
      description: t('cases.5.desc'),
      result: '+35%',
      resultLabel: 'конверсия',
      gradient: 'from-green-500 to-emerald-500',
    },
    {
      icon: Hospital,
      title: t('cases.6.title'),
      description: t('cases.6.desc'),
      result: '-50%',
      resultLabel: 'время обслуживания',
      gradient: 'from-teal-500 to-cyan-500',
    },
    {
      icon: Building2,
      title: t('cases.7.title'),
      description: t('cases.7.desc'),
      result: '3',
      resultLabel: 'новых региона',
      gradient: 'from-indigo-500 to-violet-500',
    },
  ];

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % cases.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + cases.length) % cases.length);
  };

  const visibleCases = () => {
    const result = [];
    for (let i = 0; i < 3; i++) {
      result.push(cases[(currentIndex + i) % cases.length]);
    }
    return result;
  };

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
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
            {t('cases.title')}
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-primary to-secondary mx-auto rounded-full" />
        </motion.div>

        {/* Desktop Slider */}
        <div className="hidden md:block relative">
          <div className="grid grid-cols-3 gap-6">
            <AnimatePresence mode="popLayout">
              {visibleCases().map((caseItem, index) => {
                const Icon = caseItem.icon;
                return (
                  <motion.div
                    key={`${currentIndex}-${index}`}
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -50 }}
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
            </AnimatePresence>
          </div>

          {/* Navigation */}
          <div className="flex justify-center gap-4 mt-8">
            <motion.button
              onClick={prevSlide}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="p-3 rounded-full bg-muted hover:bg-muted/80 transition-colors"
            >
              <ChevronLeft className="w-5 h-5" />
            </motion.button>
            <div className="flex items-center gap-2">
              {cases.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className={`w-2 h-2 rounded-full transition-all ${
                    index === currentIndex ? 'w-6 bg-primary' : 'bg-muted-foreground/30'
                  }`}
                />
              ))}
            </div>
            <motion.button
              onClick={nextSlide}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="p-3 rounded-full bg-muted hover:bg-muted/80 transition-colors"
            >
              <ChevronRight className="w-5 h-5" />
            </motion.button>
          </div>
        </div>

        {/* Mobile Cards */}
        <div className="md:hidden space-y-4">
          {cases.map((caseItem, index) => {
            const Icon = caseItem.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="p-6 rounded-2xl bg-card border border-border/50"
              >
                <div className="flex items-start gap-4">
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${caseItem.gradient} p-0.5 flex-shrink-0`}>
                    <div className="w-full h-full rounded-xl bg-card flex items-center justify-center">
                      <Icon className="w-5 h-5" />
                    </div>
                  </div>
                  <div className="flex-1">
                    <h3 className="font-bold mb-2">{caseItem.title}</h3>
                    <p className="text-sm text-muted-foreground mb-3">{caseItem.description}</p>
                    <div className="flex items-center gap-2">
                      <span className={`text-xl font-bold bg-gradient-to-r ${caseItem.gradient} bg-clip-text text-transparent`}>
                        {caseItem.result}
                      </span>
                      <span className="text-xs text-muted-foreground">{caseItem.resultLabel}</span>
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
