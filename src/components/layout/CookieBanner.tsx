import { useEffect, useState } from 'react';
import { useAppContext } from '@/contexts/AppContext';

export function CookieBanner() {
  const [visible, setVisible] = useState(false);
  const { t } = useAppContext();

  useEffect(() => {
    const consent = localStorage.getItem('gwa_cookie_consent');
    if (!consent) {
      setVisible(true);
    }
  }, []);

  const choose = (decision: 'accepted' | 'rejected') => {
    localStorage.setItem('gwa_cookie_consent', decision);
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div className="fixed bottom-4 left-1/2 z-50 w-[94%] max-w-3xl -translate-x-1/2 rounded-2xl border border-white/15 bg-black/95 p-4 shadow-2xl">
      <p className="text-sm text-muted-foreground">{t('cookieTitle')}</p>
      <div className="mt-3 flex gap-2">
        <button onClick={() => choose('accepted')} className="rounded-full bg-emerald-400 px-4 py-2 text-sm font-medium text-black" type="button">
          {t('cookieAccept')}
        </button>
        <button onClick={() => choose('rejected')} className="rounded-full border border-white/20 px-4 py-2 text-sm text-foreground" type="button">
          {t('cookieReject')}
        </button>
      </div>
    </div>
  );
}
