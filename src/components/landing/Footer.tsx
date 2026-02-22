import { useLanguage } from '@/contexts/LanguageContext';

const Footer = () => {
  const { t } = useLanguage();

  return (
    <footer className="border-t border-border/70 bg-card/40 py-10">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid gap-8 md:grid-cols-2">
          <div className="space-y-2 text-sm text-muted-foreground">
            <img src="/gudwin-logo.png" alt="GudWin AI Agency logo" className="h-14 w-full max-w-[300px] rounded-lg border border-border/70 object-cover" />
            <p className="font-semibold text-foreground">{t('footer.company')}</p>
            <p>{t('footer.desc')}</p>
            <p>{t('footer.requisites')}</p>
            <p>{t('footer.address')}</p>
            <p>{t('footer.hours')}</p>
            <a
              href="https://t.me/malishev_bot"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex text-primary underline"
            >
              Telegram: @malishev_bot
            </a>
          </div>

          <div className="space-y-3 text-sm">
            <p className="font-semibold text-foreground">{t('footer.legal')}</p>
            <a href="/legal/privacy-policy.html" target="_blank" rel="noopener noreferrer" className="block text-muted-foreground underline hover:text-primary">
              {t('footer.policy')}
            </a>
            <a href="/legal/consent.html" target="_blank" rel="noopener noreferrer" className="block text-muted-foreground underline hover:text-primary">
              {t('footer.consent')}
            </a>
            <a href="/legal/terms.html" target="_blank" rel="noopener noreferrer" className="block text-muted-foreground underline hover:text-primary">
              {t('footer.terms')}
            </a>
          </div>
        </div>

        <div className="mt-8 border-t border-border/70 pt-4 text-xs text-muted-foreground">
          © 2026 «{t('footer.company')}». {t('footer.rights')}
        </div>
      </div>
    </footer>
  );
};

export default Footer;
