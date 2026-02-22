import type { ReactNode } from 'react';
import { useAppContext } from '@/contexts/AppContext';
import { TelegramLoginWidget } from '@/components/telegram/TelegramLoginWidget';

export function AccountAuthGate({ children }: { children: ReactNode }) {
  const { isAuthorized, loginWithTelegram, t } = useAppContext();

  if (isAuthorized) {
    return <>{children}</>;
  }

  return (
    <div className="mx-auto w-full max-w-3xl px-4 py-12 md:px-8">
      <div className="renaissance-frame rounded-2xl bg-card p-8 text-center">
        <h1 className="font-display text-4xl">{t('navAccount')}</h1>
        <p className="mt-3 text-sm text-muted-foreground">Для входа в кабинет авторизуйтесь через Telegram.</p>
        <div className="mt-6 flex justify-center">
          <TelegramLoginWidget
            onAuth={(user) => {
              loginWithTelegram(user);
            }}
          />
        </div>
      </div>
    </div>
  );
}
