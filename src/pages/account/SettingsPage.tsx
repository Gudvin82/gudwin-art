import { useAppContext } from '@/contexts/AppContext';

export default function SettingsPage() {
  const { t, telegramUser, logout } = useAppContext();

  return (
    <div className="mx-auto w-full max-w-4xl px-4 py-10 md:px-8">
      <h1 className="font-display text-4xl">{t('accountSettings')}</h1>

      <div className="mt-6 grid gap-4">
        <div className="rounded-2xl border border-white/10 bg-card p-6">
          <h2 className="text-lg font-medium">Telegram</h2>
          <p className="mt-2 text-sm text-muted-foreground">{t('tgAuthHint')}</p>
          <div className="mt-4 text-sm text-emerald-200">@{telegramUser?.username ?? 'telegram_user'}</div>
          <button type="button" onClick={logout} className="mt-4 rounded-full border border-white/20 px-4 py-2 text-sm">
            Выйти
          </button>
        </div>

        <div className="rounded-2xl border border-white/10 bg-card p-6">
          <h2 className="text-lg font-medium">Telegram Stars</h2>
          <p className="mt-2 text-sm text-muted-foreground">{t('tgStarsHint')}</p>
        </div>

        <div className="rounded-2xl border border-rose-400/30 bg-rose-400/10 p-6">
          <h2 className="text-lg font-medium text-rose-100">{t('deleteAccount')}</h2>
          <p className="mt-2 text-sm text-rose-100/70">Удаление запускает процесс очистки персональных данных в соответствии с 152-ФЗ.</p>
          <button type="button" className="mt-4 rounded-full bg-rose-400 px-4 py-2 text-sm font-medium text-black">
            {t('deleteAccount')}
          </button>
        </div>
      </div>
    </div>
  );
}
