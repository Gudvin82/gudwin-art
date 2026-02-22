import { useState } from 'react';
import { motion } from 'framer-motion';
import { Bot, Brain, Shield, Check } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

const Services = () => {
  const { t } = useLanguage();
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const services = [
    {
      icon: Bot,
      title: t('services.ai_auto.title'),
      desc: t('services.ai_auto.desc'),
      items: [
        t('services.ai_auto.1'),
        t('services.ai_auto.2'),
        t('services.ai_auto.3'),
        t('services.ai_auto.4'),
      ],
      gradient: 'from-purple-500 to-pink-500',
    },
    {
      icon: Brain,
      title: t('services.ai_consult.title'),
      desc: t('services.ai_consult.desc'),
      items: [
        t('services.ai_consult.1'),
        t('services.ai_consult.2'),
        t('services.ai_consult.3'),
        t('services.ai_consult.4'),
      ],
      gradient: 'from-blue-500 to-cyan-500',
    },
    {
      icon: Shield,
      title: t('services.crisis.title'),
      desc: t('services.crisis.desc'),
      items: [
        t('services.crisis.1'),
        t('services.crisis.2'),
        t('services.crisis.3'),
        t('services.crisis.4'),
      ],
      gradient: 'from-orange-500 to-red-500',
    },
  ];

  return (
    <section id="services" className="py-20 md:py-32">
      <div className="container mx-auto px-4 md:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12 md:mb-16"
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">{t('services.title')}</h2>
          <div className="w-20 h-1 bg-gradient-to-r from-primary to-secondary mx-auto rounded-full" />
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {services.map((service, index) => {
            const Icon = service.icon;
            const isHovered = hoveredIndex === index;

            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.15 }}
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
                className="group relative"
              >
                <motion.div
                  className="relative h-full p-6 md:p-8 rounded-2xl bg-card border border-border/50 overflow-hidden transition-all duration-500"
                  whileHover={{
                    scale: 1.02,
                    boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
                  }}
                >
                  <div className={`absolute inset-0 bg-gradient-to-br ${service.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-500`} />

                  {/* Icon */}
                  <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${service.gradient} p-0.5 mb-6`}>
                    <div className="w-full h-full rounded-xl bg-card flex items-center justify-center">
                      <Icon className="w-6 h-6 text-foreground" />
                    </div>
                  </div>

                  {/* Title */}
                  <h3 className="text-xl font-bold mb-3 group-hover:text-primary transition-colors">
                    {service.title}
                  </h3>

                  {/* Description */}
                  <p className="text-sm text-muted-foreground mb-5">{service.desc}</p>

                  {/* Items */}
                  <ul className="space-y-3">
                    {service.items.map((item, itemIndex) => (
                      <motion.li
                        key={itemIndex}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: isHovered ? itemIndex * 0.1 : 0 }}
                        className="flex items-start gap-3 text-sm text-muted-foreground"
                      >
                        <Check className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </motion.li>
                    ))}
                  </ul>

                  {/* Decorative corner */}
                  <div className={`absolute -bottom-10 -right-10 w-32 h-32 bg-gradient-to-br ${service.gradient} rounded-full opacity-10 blur-2xl group-hover:opacity-20 transition-opacity`} />
                </motion.div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Services;
