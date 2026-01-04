import { motion } from 'framer-motion';
import { MessageSquare, FileText, Cog, BarChart3 } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

const Process = () => {
  const { t } = useLanguage();

  const steps = [
    {
      icon: MessageSquare,
      title: t('process.1.title'),
      description: t('process.1.desc'),
      gradient: 'from-blue-500 to-cyan-500',
    },
    {
      icon: FileText,
      title: t('process.2.title'),
      description: t('process.2.desc'),
      gradient: 'from-purple-500 to-pink-500',
    },
    {
      icon: Cog,
      title: t('process.3.title'),
      description: t('process.3.desc'),
      gradient: 'from-amber-500 to-orange-500',
    },
    {
      icon: BarChart3,
      title: t('process.4.title'),
      description: t('process.4.desc'),
      gradient: 'from-green-500 to-emerald-500',
    },
  ];

  return (
    <section className="py-20 md:py-32 bg-muted/30">
      <div className="container mx-auto px-4 md:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12 md:mb-16"
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
            {t('process.title')}
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-primary to-secondary mx-auto rounded-full" />
        </motion.div>

        <div className="max-w-4xl mx-auto">
          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-6 md:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary via-secondary to-accent transform md:-translate-x-1/2" />

            {steps.map((step, index) => {
              const Icon = step.icon;
              const isEven = index % 2 === 0;

              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: isEven ? -30 : 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.2 }}
                  className={`relative flex items-center mb-8 last:mb-0 ${
                    isEven ? 'md:flex-row' : 'md:flex-row-reverse'
                  }`}
                >
                  {/* Step number */}
                  <div className="absolute left-6 md:left-1/2 w-12 h-12 bg-background border-4 border-primary rounded-full flex items-center justify-center font-bold text-primary transform -translate-x-1/2 z-10">
                    {index + 1}
                  </div>

                  {/* Content */}
                  <div className={`ml-16 md:ml-0 md:w-1/2 ${isEven ? 'md:pr-16 md:text-right' : 'md:pl-16'}`}>
                    <motion.div
                      whileHover={{ scale: 1.02 }}
                      className="group p-6 rounded-2xl bg-card border border-border/50 hover:border-primary/50 transition-all duration-300"
                    >
                      <div className={`flex items-center gap-4 mb-4 ${isEven ? 'md:flex-row-reverse' : ''}`}>
                        <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${step.gradient} p-0.5 flex-shrink-0`}>
                          <div className="w-full h-full rounded-xl bg-card flex items-center justify-center">
                            <Icon className="w-5 h-5" />
                          </div>
                        </div>
                        <h3 className="text-xl font-bold">{step.title}</h3>
                      </div>
                      <p className="text-muted-foreground">{step.description}</p>
                    </motion.div>
                  </div>

                  {/* Empty space for alignment */}
                  <div className="hidden md:block md:w-1/2" />
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Process;
