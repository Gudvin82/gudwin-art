import { motion } from 'framer-motion';
import { Heart } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

const Footer = () => {
  const { t } = useLanguage();

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const links = [
    { href: '#services', label: t('nav.services') },
    { href: '#about', label: t('nav.about') },
    { href: '#cases', label: t('nav.cases') },
    { href: '#pricing', label: t('nav.pricing') },
    { href: '#contact', label: t('nav.contacts') },
  ];

  return (
    <footer className="py-12 border-t border-border/50">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid md:grid-cols-3 gap-8 mb-8">
          {/* Logo */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <a href="#" className="inline-block mb-4">
              <span className="text-2xl font-bold bg-gradient-to-r from-primary via-accent to-secondary bg-clip-text text-transparent">
                AM
              </span>
              <span className="ml-2 text-base font-medium text-foreground">
                Анатолий Малышев
              </span>
            </a>
            <p className="text-sm text-muted-foreground max-w-xs">
              Бизнес-консультант с 20+ летним опытом. Помогаю компаниям выходить из кризиса и масштабироваться.
            </p>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <h4 className="font-semibold mb-4">Навигация</h4>
            <ul className="space-y-2">
              {links.map((link) => (
                <li key={link.href}>
                  <button
                    onClick={() => scrollToSection(link.href)}
                    className="text-sm text-muted-foreground hover:text-primary transition-colors"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Social Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h4 className="font-semibold mb-4">Контакты</h4>
            <ul className="space-y-2">
              <li>
                <a
                  href="https://t.me/a_malishev"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-muted-foreground hover:text-primary transition-colors"
                >
                  Telegram: @a_malishev
                </a>
              </li>
              <li>
                <a
                  href="https://wa.me/79219990991"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-muted-foreground hover:text-primary transition-colors"
                >
                  WhatsApp: +7 (921) 999-09-91
                </a>
              </li>
              <li>
                <a
                  href="mailto:9990991@mail.ru"
                  className="text-sm text-muted-foreground hover:text-primary transition-colors"
                >
                  Email: 9990991@mail.ru
                </a>
              </li>
            </ul>
          </motion.div>
        </div>

        {/* Bottom */}
        <div className="pt-8 border-t border-border/50 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-muted-foreground flex items-center gap-1">
            © {new Date().getFullYear()} Анатолий Малышев. {t('footer.rights')}
          </p>
          <p className="text-sm text-muted-foreground flex items-center gap-1">
            Сделано с <Heart className="w-4 h-4 text-red-500 fill-red-500" /> в Санкт-Петербурге
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
