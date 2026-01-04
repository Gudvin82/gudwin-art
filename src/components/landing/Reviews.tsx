import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Star, Quote } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

const Reviews = () => {
  const { t, language } = useLanguage();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [autoPlay, setAutoPlay] = useState(true);

  const reviews = language === 'ru' ? [
    {
      name: 'Александр К.',
      position: 'Генеральный директор',
      company: 'Производственная компания',
      text: 'За 3 месяца работы с Анатолием мы полностью перестроили бизнес-процессы. Выручка выросла на 40%, а операционные расходы сократились на 25%.',
      rating: 5,
      avatar: 'АК',
    },
    {
      name: 'Мария В.',
      position: 'Основатель',
      company: 'IT-стартап',
      text: 'Внедрение AI и автоматизация рутинных процессов освободили команду для творческой работы. Теперь мы успеваем в 2 раза больше при том же составе.',
      rating: 5,
      avatar: 'МВ',
    },
    {
      name: 'Дмитрий П.',
      position: 'Владелец',
      company: 'Сеть ресторанов',
      text: 'Благодаря реструктуризации кредитов удалось сохранить бизнес в сложный период. Сэкономили более 2 млн рублей на процентах.',
      rating: 5,
      avatar: 'ДП',
    },
    {
      name: 'Елена С.',
      position: 'Коммерческий директор',
      company: 'Логистическая компания',
      text: 'Анатолий помог выстроить систему продаж с нуля. За 6 месяцев выручка выросла на 60%. Рекомендую всем, кто хочет масштабироваться.',
      rating: 5,
      avatar: 'ЕС',
    },
    {
      name: 'Игорь Н.',
      position: 'Управляющий партнёр',
      company: 'Розничная сеть',
      text: 'Профессиональный подход и глубокое понимание бизнеса. Внедрение CRM увеличило конверсию на 35%. Отличный результат!',
      rating: 5,
      avatar: 'ИН',
    },
    {
      name: 'Ольга М.',
      position: 'Главный врач',
      company: 'Медицинский центр',
      text: 'Оптимизация процессов позволила сократить время обслуживания пациентов вдвое. Клиенты довольны, персонал работает эффективнее.',
      rating: 5,
      avatar: 'ОМ',
    },
    {
      name: 'Сергей Л.',
      position: 'CEO',
      company: 'Строительная компания',
      text: 'С помощью Анатолия вышли на 3 новых региона за год. Франчайзинговая модель работает как часы. Превзошли все ожидания!',
      rating: 5,
      avatar: 'СЛ',
    },
  ] : [
    {
      name: 'Alexander K.',
      position: 'CEO',
      company: 'Manufacturing Company',
      text: 'In 3 months of working with Anatoly, we completely rebuilt our business processes. Revenue grew by 40%, and operating costs decreased by 25%.',
      rating: 5,
      avatar: 'AK',
    },
    {
      name: 'Maria V.',
      position: 'Founder',
      company: 'IT Startup',
      text: 'AI implementation and routine automation freed the team for creative work. Now we accomplish 2 times more with the same team.',
      rating: 5,
      avatar: 'MV',
    },
    {
      name: 'Dmitry P.',
      position: 'Owner',
      company: 'Restaurant Chain',
      text: 'Thanks to credit restructuring, we managed to save the business during a difficult period. Saved over 2 million rubles on interest.',
      rating: 5,
      avatar: 'DP',
    },
    {
      name: 'Elena S.',
      position: 'Commercial Director',
      company: 'Logistics Company',
      text: 'Anatoly helped build a sales system from scratch. In 6 months, revenue grew by 60%. I recommend to everyone who wants to scale.',
      rating: 5,
      avatar: 'ES',
    },
    {
      name: 'Igor N.',
      position: 'Managing Partner',
      company: 'Retail Chain',
      text: 'Professional approach and deep business understanding. CRM implementation increased conversion by 35%. Excellent result!',
      rating: 5,
      avatar: 'IN',
    },
    {
      name: 'Olga M.',
      position: 'Chief Physician',
      company: 'Medical Center',
      text: 'Process optimization reduced patient service time by half. Customers are satisfied, staff works more efficiently.',
      rating: 5,
      avatar: 'OM',
    },
    {
      name: 'Sergey L.',
      position: 'CEO',
      company: 'Construction Company',
      text: 'With Anatoly\'s help, we expanded to 3 new regions in a year. The franchise model works like clockwork. Exceeded all expectations!',
      rating: 5,
      avatar: 'SL',
    },
  ];

  useEffect(() => {
    if (!autoPlay) return;
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % reviews.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [autoPlay, reviews.length]);

  const nextSlide = () => {
    setAutoPlay(false);
    setCurrentIndex((prev) => (prev + 1) % reviews.length);
  };

  const prevSlide = () => {
    setAutoPlay(false);
    setCurrentIndex((prev) => (prev - 1 + reviews.length) % reviews.length);
  };

  return (
    <section id="reviews" className="py-20 md:py-32 bg-muted/30 overflow-hidden">
      <div className="container mx-auto px-4 md:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12 md:mb-16"
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
            {t('reviews.title')}
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-primary to-secondary mx-auto rounded-full" />
        </motion.div>

        <div className="relative max-w-4xl mx-auto">
          {/* Main Review Card */}
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.5 }}
              className="relative"
            >
              <div className="p-8 md:p-12 rounded-3xl bg-card border border-border/50 shadow-xl">
                {/* Quote icon */}
                <div className="absolute -top-4 left-8 w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                  <Quote className="w-4 h-4 text-primary-foreground" />
                </div>

                {/* Stars */}
                <div className="flex gap-1 mb-6">
                  {[...Array(reviews[currentIndex].rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-yellow-500 fill-yellow-500" />
                  ))}
                </div>

                {/* Text */}
                <p className="text-lg md:text-xl leading-relaxed mb-8 text-foreground/90">
                  "{reviews[currentIndex].text}"
                </p>

                {/* Author */}
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-primary-foreground font-bold text-lg">
                    {reviews[currentIndex].avatar}
                  </div>
                  <div>
                    <div className="font-semibold">{reviews[currentIndex].name}</div>
                    <div className="text-sm text-muted-foreground">
                      {reviews[currentIndex].position}, {reviews[currentIndex].company}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Navigation */}
          <div className="flex justify-center items-center gap-4 mt-8">
            <motion.button
              onClick={prevSlide}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="p-3 rounded-full bg-card border border-border/50 hover:border-primary/50 transition-colors"
            >
              <ChevronLeft className="w-5 h-5" />
            </motion.button>

            <div className="flex gap-2">
              {reviews.map((_, index) => (
                <button
                  key={index}
                  onClick={() => {
                    setAutoPlay(false);
                    setCurrentIndex(index);
                  }}
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
              className="p-3 rounded-full bg-card border border-border/50 hover:border-primary/50 transition-colors"
            >
              <ChevronRight className="w-5 h-5" />
            </motion.button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Reviews;
