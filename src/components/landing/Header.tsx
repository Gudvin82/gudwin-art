import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Globe, Menu, X } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { cn } from '@/lib/utils';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const { language, setLanguage, t } = useLanguage();

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 24);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const navItems = [
    { href: '#offer', label: t('nav.offer') },
    { href: '#pricing', label: t('nav.pricing') },
    { href: '#expertise', label: t('nav.expertise') },
    { href: '#contact', label: t('nav.contact') },
  ];

  const languages = [
    { code: 'ru' as const, label: 'RU' },
    { code: 'en' as const, label: 'EN' },
    { code: 'zh' as const, label: '中文' },
  ];

  const scrollTo = (href: string) => {
    const node = document.querySelector(href);
    if (node) node.scrollIntoView({ behavior: 'smooth' });
    setIsMobileOpen(false);
  };

  return (
    <header
      className={cn(
        'fixed inset-x-0 top-0 z-50 transition-all duration-500',
        isScrolled ? 'border-b border-border/70 bg-background/80 backdrop-blur-xl' : 'bg-transparent'
      )}
    >
      <div className="container mx-auto flex h-20 items-center justify-between px-4 md:px-6">
        <button onClick={() => scrollTo('#')} className="group flex items-center gap-3 text-left" type="button">
          <img
            src="/gudwin-logo.png"
            alt="GudWin AI Agency"
            className="h-10 w-[170px] rounded-lg border border-border/60 object-cover sm:h-12 sm:w-[210px]"
          />
        </button>

        <nav className="hidden items-center gap-1 lg:flex">
          {navItems.map((item) => (
            <motion.button
              key={item.href}
              onClick={() => scrollTo(item.href)}
              className="rounded-full px-4 py-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
              whileHover={{ y: -1 }}
              type="button"
            >
              {item.label}
            </motion.button>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <div className="hidden items-center gap-1 rounded-full border border-border/70 bg-card/70 p-1 sm:flex">
            <Globe className="ml-1 h-4 w-4 text-muted-foreground" />
            {languages.map((item) => (
              <button
                key={item.code}
                onClick={() => setLanguage(item.code)}
                className={cn(
                  'rounded-full px-2.5 py-1 text-xs transition-colors',
                  language === item.code ? 'bg-primary text-primary-foreground' : 'text-muted-foreground hover:text-foreground'
                )}
                type="button"
              >
                {item.label}
              </button>
            ))}
          </div>

          <button
            onClick={() => setIsMobileOpen((prev) => !prev)}
            className="rounded-full border border-border/70 bg-card/70 p-2 lg:hidden"
            type="button"
            aria-label="Toggle menu"
          >
            {isMobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {isMobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="border-b border-border/70 bg-background/95 backdrop-blur-xl lg:hidden"
          >
            <div className="container mx-auto space-y-3 px-4 py-4">
              <div className="flex items-center justify-between rounded-xl border border-border/70 bg-card/70 p-2">
                {languages.map((item) => (
                  <button
                    key={item.code}
                    onClick={() => setLanguage(item.code)}
                    className={cn(
                      'rounded-lg px-3 py-2 text-sm',
                      language === item.code ? 'bg-primary text-primary-foreground' : 'text-muted-foreground'
                    )}
                    type="button"
                  >
                    {item.label}
                  </button>
                ))}
              </div>

              {navItems.map((item) => (
                <button
                  key={item.href}
                  onClick={() => scrollTo(item.href)}
                  className="block w-full rounded-xl border border-border/70 bg-card/70 px-4 py-3 text-left text-sm font-medium"
                  type="button"
                >
                  {item.label}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Header;
