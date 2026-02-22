import { Link } from 'react-router-dom';
import { stylePresets } from '@/data/site-content';
import { useAppContext } from '@/contexts/AppContext';

export default function HomePage() {
  const { t, mode, lang } = useAppContext();
  const gallery = stylePresets.filter((item) => item.mode === mode).slice(0, 3);

  return (
    <div className="mx-auto w-full max-w-7xl px-4 py-10 md:px-8 md:py-14">
      <section className="renaissance-frame rounded-3xl bg-gradient-to-b from-[#1f1612] to-[#0d0908] px-6 py-12 text-center md:px-12">
        <h1 className="font-display text-4xl leading-tight md:text-6xl">
          {mode === 'pets' ? t('heroTitlePets') : t('heroTitleHumans')}
        </h1>
        <p className="mx-auto mt-5 max-w-3xl text-base text-muted-foreground md:text-lg">{t('heroSubtitle')}</p>
        <div className="mt-8 flex justify-center gap-3">
          <Link to="/create" className="rounded-full bg-emerald-400 px-6 py-3 text-sm font-semibold text-black">
            {t('ctaCreate')}
          </Link>
          <Link to="/pricing" className="rounded-full border border-white/20 px-6 py-3 text-sm text-foreground">
            {t('ctaPricing')}
          </Link>
        </div>
      </section>

      <section className="mt-14">
        <h2 className="font-display text-3xl">{t('howTitle')}</h2>
        <div className="mt-6 grid gap-4 md:grid-cols-4">
          {[t('howStep1'), t('howStep2'), t('howStep3'), t('howStep4')].map((step) => (
            <div key={step} className="rounded-2xl border border-white/10 bg-card p-4 text-sm text-muted-foreground">
              {step}
            </div>
          ))}
        </div>
      </section>

      <section className="mt-14">
        <h2 className="font-display text-3xl">{t('pickStyle')}</h2>
        <div className="mt-6 grid gap-4 md:grid-cols-3">
          {gallery.map((item) => (
            <article key={item.id} className="renaissance-frame overflow-hidden rounded-2xl bg-card">
              <div className="aspect-[4/5] w-full bg-black/40 p-2">
                <img src={item.preview} alt={item.title[lang]} className="h-full w-full rounded-md object-contain object-center" />
              </div>
              <div className="p-4">
                <h3 className="font-medium">{item.title[lang]}</h3>
                <p className="mt-1 text-sm text-muted-foreground">{item.description[lang]}</p>
              </div>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}
