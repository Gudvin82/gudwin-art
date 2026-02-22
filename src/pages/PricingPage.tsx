import { useNavigate } from 'react-router-dom';
import { pricingPacks } from '@/data/site-content';
import { useAppContext } from '@/contexts/AppContext';

export default function PricingPage() {
  const { t, lang, selectedPack, setSelectedPack } = useAppContext();
  const navigate = useNavigate();

  return (
    <div className="mx-auto w-full max-w-6xl px-4 py-10 md:px-8">
      <h1 className="font-display text-4xl">{t('pricingTitle')}</h1>
      <p className="mt-3 max-w-2xl text-sm text-muted-foreground">
        Выберите пакет и оплачивайте Telegram Stars. Цены привязаны к реальному flow оплаты и использованию в генераторе.
      </p>

      <div className="mt-8 grid gap-5 md:grid-cols-2">
        {pricingPacks.map((pack) => (
          <article key={pack.id} className={`renaissance-frame rounded-3xl bg-card p-6 ${selectedPack === pack.id ? 'ring-1 ring-amber-300/40' : ''}`}>
            <p className="text-xs uppercase tracking-[0.18em] text-amber-200/80">{pack.title[lang]}</p>
            <h2 className="mt-2 text-3xl font-semibold text-amber-100">{pack.stars} Stars</h2>
            <p className="mt-2 text-sm text-muted-foreground">{pack.subtitle[lang]}</p>

            <ul className="mt-5 space-y-2 text-sm text-muted-foreground">
              {pack.features[lang].map((feature) => (
                <li key={feature} className="rounded-md border border-white/10 bg-black/20 px-3 py-2">
                  {feature}
                </li>
              ))}
            </ul>

            <button
              type="button"
              className="mt-6 inline-flex rounded-full bg-emerald-400 px-6 py-3 text-sm font-semibold text-black"
              onClick={() => {
                setSelectedPack(pack.id);
                navigate('/create');
              }}
            >
              {pack.id === 'digital' ? 'Выбрать Digital Pack' : 'Выбрать Starter Pack'}
            </button>
          </article>
        ))}
      </div>
    </div>
  );
}
