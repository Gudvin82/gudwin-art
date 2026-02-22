import { useEffect, useMemo, useState } from 'react';

type CookiePrefs = {
  functional: true;
  analytics: boolean;
  marketing: boolean;
  decidedAt: number;
};

const STORAGE_KEY = 'cookie_preferences_v1';
const EXPIRY_DAYS = 90;

const isExpired = (timestamp: number) => {
  const age = Date.now() - timestamp;
  return age > EXPIRY_DAYS * 24 * 60 * 60 * 1000;
};

const CookieBanner = () => {
  const [visible, setVisible] = useState(false);
  const [analytics, setAnalytics] = useState(false);
  const [marketing, setMarketing] = useState(false);

  useEffect(() => {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      setVisible(true);
      return;
    }

    try {
      const saved = JSON.parse(raw) as CookiePrefs;
      if (!saved.decidedAt || isExpired(saved.decidedAt)) {
        localStorage.removeItem(STORAGE_KEY);
        setVisible(true);
        return;
      }
      setAnalytics(Boolean(saved.analytics));
      setMarketing(Boolean(saved.marketing));
    } catch {
      localStorage.removeItem(STORAGE_KEY);
      setVisible(true);
    }
  }, []);

  const save = (next: { analytics: boolean; marketing: boolean }) => {
    const payload: CookiePrefs = {
      functional: true,
      analytics: next.analytics,
      marketing: next.marketing,
      decidedAt: Date.now(),
    };

    localStorage.setItem(STORAGE_KEY, JSON.stringify(payload));
    setVisible(false);
  };

  const summary = useMemo(
    () => [
      'Функциональные: обеспечивают работу сайта',
      'Аналитические: помогают улучшать продукт (например, Яндекс.Метрика/Google Analytics при подключении)',
      'Маркетинговые: используются для рекламных сценариев и ретаргетинга',
    ],
    []
  );

  if (!visible) return null;

  return (
    <div className="fixed bottom-4 left-1/2 z-[70] w-[min(980px,calc(100%-1rem))] -translate-x-1/2 rounded-2xl border border-border/80 bg-background/95 p-4 shadow-[0_10px_40px_rgba(0,0,0,.35)] backdrop-blur">
      <p className="text-sm font-semibold">Используем cookies</p>
      <p className="mt-2 text-xs text-muted-foreground">
        Мы используем cookies для работы сайта, аналитики и маркетинга. Выберите категории и подтвердите выбор.
        Подробнее в <a href="/legal/privacy-policy.html" target="_blank" rel="noopener noreferrer" className="text-primary underline">Политике обработки персональных данных</a>.
      </p>

      <div className="mt-3 grid gap-2 text-xs text-muted-foreground">
        {summary.map((item) => (
          <p key={item}>• {item}</p>
        ))}
      </div>

      <div className="mt-3 flex flex-wrap gap-4 text-xs">
        <label className="inline-flex items-center gap-2">
          <input type="checkbox" checked readOnly />
          <span>Функциональные (обязательно)</span>
        </label>
        <label className="inline-flex items-center gap-2">
          <input type="checkbox" checked={analytics} onChange={(e) => setAnalytics(e.target.checked)} />
          <span>Аналитические</span>
        </label>
        <label className="inline-flex items-center gap-2">
          <input type="checkbox" checked={marketing} onChange={(e) => setMarketing(e.target.checked)} />
          <span>Маркетинговые</span>
        </label>
      </div>

      <div className="mt-4 flex flex-wrap gap-2">
        <button
          type="button"
          onClick={() => save({ analytics: true, marketing: true })}
          className="rounded-lg bg-primary px-3 py-2 text-xs font-medium text-primary-foreground"
        >
          Принять все
        </button>
        <button
          type="button"
          onClick={() => save({ analytics: false, marketing: false })}
          className="rounded-lg border border-border/80 px-3 py-2 text-xs"
        >
          Только обязательные
        </button>
        <button
          type="button"
          onClick={() => save({ analytics, marketing })}
          className="rounded-lg border border-border/80 px-3 py-2 text-xs"
        >
          Сохранить выбор
        </button>
      </div>
    </div>
  );
};

export default CookieBanner;
