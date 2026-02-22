import { Link } from 'react-router-dom';
import { useAppContext } from '@/contexts/AppContext';

const legalRoutes = [
  { slug: 'offer', labelRu: 'Публичная оферта', labelEn: 'Public Offer' },
  { slug: 'privacy', labelRu: 'Конфиденциальность', labelEn: 'Privacy Policy' },
  { slug: 'personal-data', labelRu: 'ПДн (152-ФЗ)', labelEn: 'Personal Data' },
  { slug: 'cookie', labelRu: 'Cookie Policy', labelEn: 'Cookie Policy' },
  { slug: 'refund', labelRu: 'Возвраты', labelEn: 'Refund Policy' },
  { slug: 'requisites', labelRu: 'Реквизиты', labelEn: 'Company Details' },
];

export function SiteFooter() {
  const { lang, t } = useAppContext();

  return (
    <footer className="mt-16 border-t border-white/10 bg-card/70">
      <div className="mx-auto grid w-full max-w-7xl gap-8 px-4 py-10 md:grid-cols-3 md:px-8">
        <div>
          <h3 className="font-display text-xl">{t('brand')}</h3>
          <p className="mt-3 max-w-md text-sm text-muted-foreground">{t('footerRights')}</p>
        </div>
        <div>
          <h4 className="mb-3 text-sm font-medium text-foreground">{t('legal')}</h4>
          <ul className="space-y-2 text-sm text-muted-foreground">
            {legalRoutes.map((route) => (
              <li key={route.slug}>
                <Link to={`/legal/${route.slug}`} className="hover:text-foreground">
                  {lang === 'ru' ? route.labelRu : route.labelEn}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h4 className="mb-3 text-sm font-medium text-foreground">Contacts</h4>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li>Telegram: @gudwinart</li>
            <li>Email: support@gudwin.art</li>
            <li>Support: 10:00-19:00 (MSK)</li>
          </ul>
        </div>
      </div>
    </footer>
  );
}
