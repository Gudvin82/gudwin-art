import { useState } from 'react';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { Send, MessageCircle, Phone, Mail, Loader2, CheckCircle2 } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

interface FormData {
  name: string;
  phone: string;
  email: string;
  message: string;
}

const Contact = () => {
  const { t } = useLanguage();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>();

  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true);
    try {
      const { error } = await supabase.functions.invoke('send-telegram', {
        body: data,
      });

      if (error) throw error;

      setIsSuccess(true);
      toast.success(t('contact.success'));
      reset();
      setTimeout(() => setIsSuccess(false), 3000);
    } catch (error) {
      console.error('Error sending message:', error);
      toast.error(t('contact.error'));
    } finally {
      setIsSubmitting(false);
    }
  };

  const contacts = [
    {
      icon: MessageCircle,
      label: 'Telegram',
      value: '@a_malishev',
      href: 'https://t.me/a_malishev',
      gradient: 'from-blue-500 to-cyan-500',
    },
    {
      icon: Phone,
      label: 'WhatsApp',
      value: '+7 (921) 999-09-91',
      href: 'https://wa.me/79219990991',
      gradient: 'from-green-500 to-emerald-500',
    },
    {
      icon: Mail,
      label: 'Email',
      value: '9990991@mail.ru',
      href: 'mailto:9990991@mail.ru',
      gradient: 'from-purple-500 to-pink-500',
    },
  ];

  return (
    <section id="contact" className="py-20 md:py-32 bg-muted/30">
      <div className="container mx-auto px-4 md:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12 md:mb-16"
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
            {t('contact.title')}
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            {t('contact.subtitle')}
          </p>
          <div className="w-20 h-1 bg-gradient-to-r from-primary to-secondary mx-auto rounded-full mt-6" />
        </motion.div>

        <div className="max-w-5xl mx-auto grid lg:grid-cols-2 gap-8 md:gap-12">
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div>
                <input
                  {...register('name', { required: true })}
                  placeholder={t('contact.name')}
                  className={`w-full px-6 py-4 rounded-xl bg-card border transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-primary/50 ${
                    errors.name ? 'border-destructive' : 'border-border/50 focus:border-primary'
                  }`}
                />
              </div>

              <div>
                <input
                  {...register('phone', { required: true })}
                  placeholder={t('contact.phone')}
                  className={`w-full px-6 py-4 rounded-xl bg-card border transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-primary/50 ${
                    errors.phone ? 'border-destructive' : 'border-border/50 focus:border-primary'
                  }`}
                />
              </div>

              <div>
                <input
                  {...register('email', {
                    required: true,
                    pattern: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  })}
                  placeholder={t('contact.email')}
                  className={`w-full px-6 py-4 rounded-xl bg-card border transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-primary/50 ${
                    errors.email ? 'border-destructive' : 'border-border/50 focus:border-primary'
                  }`}
                />
              </div>

              <div>
                <textarea
                  {...register('message')}
                  placeholder={t('contact.message')}
                  rows={4}
                  className="w-full px-6 py-4 rounded-xl bg-card border border-border/50 focus:border-primary transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-primary/50 resize-none"
                />
              </div>

              <motion.button
                type="submit"
                disabled={isSubmitting || isSuccess}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className={`w-full py-4 px-8 rounded-xl font-semibold flex items-center justify-center gap-2 transition-all duration-300 ${
                  isSuccess
                    ? 'bg-green-500 text-white'
                    : 'bg-gradient-to-r from-primary to-accent text-primary-foreground hover:shadow-lg hover:shadow-primary/25'
                }`}
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    <span>Отправка...</span>
                  </>
                ) : isSuccess ? (
                  <>
                    <CheckCircle2 className="w-5 h-5" />
                    <span>Отправлено!</span>
                  </>
                ) : (
                  <>
                    <Send className="w-5 h-5" />
                    <span>{t('contact.submit')}</span>
                  </>
                )}
              </motion.button>
            </form>
          </motion.div>

          {/* Contact Links */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-6"
          >
            {contacts.map((contact, index) => {
              const Icon = contact.icon;
              return (
                <motion.a
                  key={index}
                  href={contact.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  whileHover={{ scale: 1.02, x: 10 }}
                  className="group flex items-center gap-6 p-6 rounded-2xl bg-card border border-border/50 hover:border-primary/50 transition-all duration-300"
                >
                  <div
                    className={`w-14 h-14 rounded-xl bg-gradient-to-br ${contact.gradient} flex items-center justify-center flex-shrink-0`}
                  >
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <div className="text-sm text-muted-foreground mb-1">{contact.label}</div>
                    <div className="font-semibold text-lg group-hover:text-primary transition-colors">
                      {contact.value}
                    </div>
                  </div>
                </motion.a>
              );
            })}

            {/* Location */}
            <div className="p-6 rounded-2xl bg-card border border-border/50">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-3 h-3 rounded-full bg-primary animate-pulse" />
                <span className="font-medium">Санкт-Петербург, Россия</span>
              </div>
              <p className="text-sm text-muted-foreground">
                Консультации проводятся онлайн по всему миру и оффлайн в Санкт-Петербурге
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
