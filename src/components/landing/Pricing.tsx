import { motion } from 'framer-motion';
import { Check, Star } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

const Pricing = () => {
  const { t } = useLanguage();

  const plans = [
    {
      title: t('pricing.consultation.title'),
      subtitle: t('pricing.consultation.subtitle'),
      price: t('pricing.consultation.price'),
      features: [
        t('pricing.consultation.1'),
        t('pricing.consultation.2'),
        t('pricing.consultation.3'),
        t('pricing.consultation.4'),
      ],
      popular: false,
      gradient: 'from-blue-500 to-cyan-500',
    },
    {
      title: t('pricing.support.title'),
      subtitle: t('pricing.support.subtitle'),
      price: t('pricing.support.price'),
      features: [
        t('pricing.support.1'),
        t('pricing.support.2'),
        t('pricing.support.3'),
        t('pricing.support.4'),
      ],
      popular: true,
      gradient: 'from-primary to-accent',
    },
    {
      title: t('pricing.full.title'),
      subtitle: t('pricing.full.subtitle'),
      price: t('pricing.full.price'),
      features: [
        t('pricing.full.1'),
        t('pricing.full.2'),
        t('pricing.full.3'),
        t('pricing.full.4'),
      ],
      popular: false,
      gradient: 'from-amber-500 to-orange-500',
    },
  ];

  const scrollToContact = () => {
    const element = document.querySelector('#contact');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="pricing" className="py-20 md:py-32">
      <div className="container mx-auto px-4 md:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12 md:mb-16"
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
            {t('pricing.title')}
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-primary to-secondary mx-auto rounded-full" />
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6 md:gap-8 max-w-5xl mx-auto">
          {plans.map((plan, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -10 }}
              className={`relative group ${plan.popular ? 'md:-mt-4 md:mb-4' : ''}`}
            >
              {/* Popular badge */}
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 z-10">
                  <div className="flex items-center gap-1 px-4 py-1 rounded-full bg-gradient-to-r from-primary to-accent text-primary-foreground text-sm font-medium">
                    <Star className="w-4 h-4 fill-current" />
                    {t('pricing.popular')}
                  </div>
                </div>
              )}

              <div
                className={`h-full p-6 md:p-8 rounded-2xl border transition-all duration-300 overflow-hidden ${
                  plan.popular
                    ? 'bg-gradient-to-br from-primary/10 to-accent/10 border-primary/50 shadow-xl shadow-primary/10'
                    : 'bg-card border-border/50 hover:border-primary/50'
                }`}
              >
                {/* Background decoration */}
                <div
                  className={`absolute -bottom-20 -right-20 w-40 h-40 bg-gradient-to-br ${plan.gradient} rounded-full opacity-10 blur-3xl group-hover:opacity-20 transition-opacity`}
                />

                <div className="relative z-10">
                  {/* Title */}
                  <div className="mb-6">
                    <h3 className="text-2xl font-bold mb-1">{plan.title}</h3>
                    <p className="text-muted-foreground">{plan.subtitle}</p>
                  </div>

                  {/* Price */}
                  <div className="mb-8">
                    <span
                      className={`text-3xl md:text-4xl font-bold bg-gradient-to-r ${plan.gradient} bg-clip-text text-transparent`}
                    >
                      {plan.price}
                    </span>
                  </div>

                  {/* Features */}
                  <ul className="space-y-4 mb-8">
                    {plan.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-start gap-3">
                        <div
                          className={`w-5 h-5 rounded-full bg-gradient-to-br ${plan.gradient} flex items-center justify-center flex-shrink-0 mt-0.5`}
                        >
                          <Check className="w-3 h-3 text-white" />
                        </div>
                        <span className="text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  {/* CTA Button */}
                  <motion.button
                    onClick={scrollToContact}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className={`w-full py-3 px-6 rounded-xl font-semibold transition-all duration-300 ${
                      plan.popular
                        ? 'bg-gradient-to-r from-primary to-accent text-primary-foreground hover:shadow-lg hover:shadow-primary/25'
                        : 'bg-muted hover:bg-muted/80 text-foreground'
                    }`}
                  >
                    {t('pricing.cta')}
                  </motion.button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Pricing;
