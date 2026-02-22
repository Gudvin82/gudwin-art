import { useEffect, useMemo, useRef } from 'react';

type TelegramUser = {
  id: number;
  first_name?: string;
  last_name?: string;
  username?: string;
  photo_url?: string;
  auth_date: number;
  hash: string;
};

declare global {
  interface Window {
    [key: string]: unknown;
  }
}

interface Props {
  onAuth: (user: TelegramUser) => void;
  size?: 'large' | 'medium' | 'small';
  radius?: number;
}

export function TelegramLoginWidget({ onAuth, size = 'large', radius = 999 }: Props) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const configuredBot = import.meta.env.VITE_TELEGRAM_BOT_USERNAME;
  const botName = useMemo(() => configuredBot ?? 'gudwinbooks_bot', [configuredBot]);

  useEffect(() => {
    if (!containerRef.current || !configuredBot) {
      return;
    }

    const callbackName = `tgAuthCb_${Math.random().toString(36).slice(2)}`;

    (window as Record<string, unknown>)[callbackName] = (user: TelegramUser) => {
      onAuth(user);
    };

    const script = document.createElement('script');
    script.src = 'https://telegram.org/js/telegram-widget.js?22';
    script.async = true;
    script.setAttribute('data-telegram-login', botName);
    script.setAttribute('data-size', size);
    script.setAttribute('data-radius', String(radius));
    script.setAttribute('data-onauth', `${callbackName}(user)`);
    script.setAttribute('data-request-access', 'write');

    containerRef.current.innerHTML = '';
    containerRef.current.appendChild(script);

    return () => {
      delete (window as Record<string, unknown>)[callbackName];
    };
  }, [botName, configuredBot, onAuth, radius, size]);

  return (
    <div className="flex flex-col items-center gap-2">
      <div ref={containerRef} />
      <a
        href={`https://t.me/${botName}`}
        target="_blank"
        rel="noreferrer"
        className="inline-flex rounded-full border border-white/20 px-4 py-2 text-sm text-muted-foreground hover:text-foreground"
      >
        Войти через Telegram
      </a>
    </div>
  );
}
