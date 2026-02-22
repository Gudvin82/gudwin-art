import { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { useAppContext } from '@/contexts/AppContext';
import { TelegramLoginWidget } from '@/components/telegram/TelegramLoginWidget';

export function SiteHeader() {
  const { t, lang, setLang, mode, setMode, isAuthorized, telegramUser, loginWithTelegram, logout } = useAppContext();
  const [open, setOpen] = useState(false);

  return (
    <>
      <header className="sticky top-0 z-40 border-b border-white/10 bg-background/90 backdrop-blur-xl">
        <div className="mx-auto flex w-full max-w-7xl items-center justify-between gap-4 px-4 py-3 md:px-8">
          <Link to="/" className="font-display text-2xl font-semibold tracking-tight text-foreground">
            {t('brand')}
          </Link>

          <div className="hidden rounded-full border border-white/20 bg-black/20 p-1 md:flex">
            <button
              type="button"
              onClick={() => setMode('pets')}
              className={`rounded-full px-4 py-1.5 text-sm ${mode === 'pets' ? 'bg-emerald-400 text-black' : 'text-muted-foreground'}`}
            >
              {t('switchPets')}
            </button>
            <button
              type="button"
              onClick={() => setMode('humans')}
              className={`rounded-full px-4 py-1.5 text-sm ${mode === 'humans' ? 'bg-emerald-400 text-black' : 'text-muted-foreground'}`}
            >
              {t('switchHumans')}
            </button>
          </div>

          <nav className="hidden items-center gap-4 text-sm text-muted-foreground lg:flex">
            <NavLink to="/">{t('navHome')}</NavLink>
            <NavLink to="/create">{t('navCreate')}</NavLink>
            <NavLink to="/pricing">{t('navPricing')}</NavLink>
            <NavLink to="/about">{t('navAbout')}</NavLink>
            <NavLink to="/account/generations">{t('navAccount')}</NavLink>

            <div className="ml-1">
              {isAuthorized ? (
                <button type="button" onClick={logout} className="rounded-full border border-white/20 px-3 py-1 text-xs text-emerald-200">
                  @{telegramUser?.username ?? 'telegram'}
                </button>
              ) : (
                <TelegramLoginWidget
                  size="small"
                  onAuth={(user) => {
                    loginWithTelegram(user);
                  }}
                />
              )}
            </div>
          </nav>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setLang(lang === 'ru' ? 'en' : 'ru')}
              className="rounded-full border border-white/15 bg-card px-3 py-1.5 text-xs text-foreground"
            >
              {lang.toUpperCase()}
            </button>
            <button
              type="button"
              onClick={() => setOpen(true)}
              className="rounded-full border border-white/15 bg-card p-2 text-muted-foreground"
              aria-label="Open menu"
            >
              <Menu size={16} />
            </button>
          </div>
        </div>
      </header>

      <div className={`fixed inset-0 z-50 bg-black/60 transition ${open ? 'opacity-100' : 'pointer-events-none opacity-0'}`} onClick={() => setOpen(false)} />
      <aside
        className={`fixed right-0 top-0 z-[60] h-full w-[320px] border-l border-white/10 bg-[#09090b] p-5 transition-transform ${open ? 'translate-x-0' : 'translate-x-full'}`}
      >
        <div className="mb-6 flex items-center justify-between">
          <div className="font-display text-2xl">{t('brand')}</div>
          <button type="button" onClick={() => setOpen(false)} className="rounded-full border border-white/15 p-2 text-muted-foreground">
            <X size={16} />
          </button>
        </div>

        <div className="mb-5">
          {isAuthorized ? (
            <button type="button" onClick={logout} className="rounded-full border border-white/20 px-3 py-2 text-xs text-emerald-200">
              @{telegramUser?.username ?? 'telegram'}
            </button>
          ) : (
            <TelegramLoginWidget
              size="small"
              onAuth={(user) => {
                loginWithTelegram(user);
              }}
            />
          )}
        </div>

        <nav className="space-y-3 text-sm text-muted-foreground">
          <NavLink to="/" onClick={() => setOpen(false)} className="block border-b border-white/10 pb-2">
            {t('navHome')}
          </NavLink>
          <NavLink to="/create" onClick={() => setOpen(false)} className="block border-b border-white/10 pb-2">
            {t('navCreate')}
          </NavLink>
          <NavLink to="/pricing" onClick={() => setOpen(false)} className="block border-b border-white/10 pb-2">
            {t('navPricing')}
          </NavLink>
          <NavLink to="/about" onClick={() => setOpen(false)} className="block border-b border-white/10 pb-2">
            {t('navAbout')}
          </NavLink>
          <NavLink to="/account/generations" onClick={() => setOpen(false)} className="block border-b border-white/10 pb-2">
            {t('navAccount')}
          </NavLink>
        </nav>
      </aside>
    </>
  );
}
