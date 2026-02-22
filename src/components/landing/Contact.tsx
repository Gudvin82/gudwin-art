import { useState } from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2, Loader2, MessageCircle, Send, ShieldCheck, TimerReset } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { useLanguage } from '@/contexts/LanguageContext';
import { supabase } from '@/integrations/supabase/client';

interface FormData {
  name: string;
  phone: string;
  telegram: string;
  message: string;
  consent: boolean;
  website?: string;
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
        body: {
          name: data.name.trim(),
          phone: data.phone.trim(),
          telegram: data.telegram.trim(),
          message: data.message.trim(),
          consent: data.consent,
          website: data.website || '',
        },
      });

      if (error) throw error;

      setIsSuccess(true);
      toast.success(t('contact.success'));
      reset();
      setTimeout(() => setIsSuccess(false), 3000);
    } catch (error) {
      console.error(error);
      toast.error(t('contact.error'));
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-20 md:py-28">
      <div className="container mx-auto px-4 md:px-6">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="font-display text-3xl md:text-5xl">{t('contact.title')}</h2>
          <p className="mt-4 text-muted-foreground">{t('contact.subtitle')}</p>
        </div>

        <div className="mx-auto mt-10 grid max-w-6xl gap-8 lg:grid-cols-[1.1fr_0.9fr]">
          <motion.form
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            onSubmit={handleSubmit(onSubmit)}
            className="rounded-3xl border border-border/70 bg-card/75 p-7 shadow-[0_0_32px_hsl(var(--primary)/0.12)]"
          >
            <h3 className="mb-4 font-display text-2xl">Форма заявки</h3>
            <div className="space-y-4">
              <input
                {...register('name', { required: true, maxLength: 80 })}
                placeholder={t('contact.name')}
                className={`w-full rounded-xl border bg-background/80 px-4 py-3 text-sm outline-none transition ${
                  errors.name ? 'border-destructive' : 'border-border/70 focus:border-primary'
                }`}
              />
              <input
                {...register('phone', {
                  required: true,
                  pattern: /^[+0-9()\-\s]{7,25}$/,
                })}
                placeholder={t('contact.phone')}
                className={`w-full rounded-xl border bg-background/80 px-4 py-3 text-sm outline-none transition ${
                  errors.phone ? 'border-destructive' : 'border-border/70 focus:border-primary'
                }`}
              />
              <input
                {...register('telegram', {
                  required: true,
                  pattern: /^@?[a-zA-Z0-9_]{5,32}$/,
                })}
                placeholder={t('contact.telegram')}
                className={`w-full rounded-xl border bg-background/80 px-4 py-3 text-sm outline-none transition ${
                  errors.telegram ? 'border-destructive' : 'border-border/70 focus:border-primary'
                }`}
              />
              <textarea
                {...register('message', { required: true, minLength: 10, maxLength: 2000 })}
                placeholder={t('contact.message')}
                rows={4}
                className={`w-full resize-none rounded-xl border bg-background/80 px-4 py-3 text-sm outline-none transition ${
                  errors.message ? 'border-destructive' : 'border-border/70 focus:border-primary'
                }`}
              />
              <input
                {...register('website')}
                autoComplete="off"
                tabIndex={-1}
                className="hidden"
                aria-hidden="true"
              />

              <label className="flex items-start gap-3 text-xs text-muted-foreground">
                <input
                  type="checkbox"
                  {...register('consent', { required: true })}
                  className="mt-0.5 h-4 w-4 rounded border-border text-primary"
                />
                <span>
                  {t('contact.consent')} <a href="/legal/privacy-policy.html" className="text-primary underline">{t('footer.policy')}</a>{' '}
                  / <a href="/legal/terms.html" className="text-primary underline">{t('footer.terms')}</a>
                </span>
              </label>
            </div>

            <button
              type="submit"
              disabled={isSubmitting || isSuccess}
              className={`mt-5 inline-flex w-full items-center justify-center gap-2 rounded-xl px-5 py-3 font-medium text-primary-foreground transition ${
                isSuccess ? 'bg-green-600' : 'bg-gradient-to-r from-primary to-secondary hover:brightness-110'
              }`}
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  {t('contact.sending')}
                </>
              ) : isSuccess ? (
                <>
                  <CheckCircle2 className="h-4 w-4" />
                  {t('contact.sent')}
                </>
              ) : (
                <>
                  <Send className="h-4 w-4" />
                  {t('contact.submit')}
                </>
              )}
            </button>
          </motion.form>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="space-y-5"
          >
            <div className="rounded-3xl border border-border/70 bg-card/75 p-6">
              <h3 className="mb-4 font-display text-2xl">Telegram-бот</h3>
              <a
                href="https://t.me/malishev_bot"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-4 rounded-2xl border border-border/70 bg-background/60 p-5 transition hover:border-primary/70"
              >
                <span className="rounded-xl border border-border/70 bg-background/70 p-2">
                  <MessageCircle className="h-5 w-5 text-primary" />
                </span>
                <span>
                  <p className="text-xs uppercase tracking-wide text-muted-foreground">Telegram Bot</p>
                  <p className="text-sm font-medium">@malishev_bot</p>
                </span>
              </a>
              <p className="mt-4 text-sm text-muted-foreground">
                Быстрый канал связи для первого контакта, уточнения запроса и назначения стратегической сессии.
              </p>
            </div>

            <div className="rounded-3xl border border-border/70 bg-card/75 p-6">
              <h4 className="mb-3 text-sm font-semibold uppercase tracking-wide text-muted-foreground">Почему через бота</h4>
              <div className="space-y-3 text-sm text-muted-foreground">
                <div className="flex items-start gap-3">
                  <TimerReset className="mt-0.5 h-4 w-4 text-primary" />
                  <span>Обычно отвечаем в течение 15-60 минут в рабочее время.</span>
                </div>
                <div className="flex items-start gap-3">
                  <ShieldCheck className="mt-0.5 h-4 w-4 text-primary" />
                  <span>Фиксируем запрос структурно и сразу передаем в рабочий контур команды.</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
