import { useAppContext } from '@/contexts/AppContext';

export default function AboutPage() {
  const { t } = useAppContext();

  return (
    <div className="mx-auto w-full max-w-4xl px-4 py-10 md:px-8">
      <h1 className="font-display text-4xl">{t('aboutTitle')}</h1>
      <div className="mt-6 space-y-4 rounded-3xl border border-white/10 bg-card p-8 text-muted-foreground">
        <p>
          GudWin Art - сервис ИИ-портретов для русскоязычной аудитории: от загрузки фото до оплаты и скачивания HD результата.
        </p>
        <p>
          Архитектура проекта спроектирована под масштабирование: авторизация Google/Telegram, генерация через серверные адаптеры AI,
          платежные провайдеры Stripe/ЮKassa/CloudPayments и админ-панель для управления стилями, заказами и юридическими документами.
        </p>
      </div>
    </div>
  );
}
