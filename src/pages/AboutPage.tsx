import { useAppContext } from '@/contexts/AppContext';

export default function AboutPage() {
  const { t } = useAppContext();

  return (
    <div className="mx-auto w-full max-w-4xl px-4 py-10 md:px-8">
      <h1 className="font-display text-4xl">{t('aboutTitle')}</h1>
      <div className="mt-6 space-y-4 rounded-3xl border border-white/10 bg-card p-8 text-muted-foreground">
        <p>
          GudWin BookS (ГудВин Букс) - сервис ИИ-генерации сказок и комиксов: сценарий, иллюстрации и озвучка в одном личном кабинете.
        </p>
        <p>
          Архитектура спроектирована под масштабирование: Telegram-авторизация, Telegram Stars биллинг, очереди генерации текста/изображений/TTS,
          хранение проектов и юридические документы под требования РФ 2026 года.
        </p>
      </div>
    </div>
  );
}
