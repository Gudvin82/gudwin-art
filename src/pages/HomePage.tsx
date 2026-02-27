import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { stylePresets } from '@/data/site-content';
import { useAppContext } from '@/contexts/AppContext';

type EpochId = 'renaissance' | 'medieval' | 'ancient' | 'baroque';

export default function HomePage() {
  const { t, mode, lang } = useAppContext();
  const modeStyles = stylePresets.filter((item) => item.mode === mode);
  const epochCards = [
    {
      id: 'renaissance' as EpochId,
      title: { ru: 'Ренессанс', en: 'Renaissance' },
      text: { ru: 'Музейный свет и классическая живопись.', en: 'Museum lighting and classic painting style.' },
      bg: 'from-amber-900/50 to-rose-900/30',
    },
    {
      id: 'medieval' as EpochId,
      title: { ru: 'Средневековье', en: 'Medieval' },
      text: { ru: 'Готика, замковая атмосфера и гербовые детали.', en: 'Gothic mood, castle atmosphere, heraldic details.' },
      bg: 'from-slate-900/70 to-indigo-900/40',
    },
    {
      id: 'ancient' as EpochId,
      title: { ru: 'Древний мир', en: 'Ancient World' },
      text: { ru: 'Античные мотивы, мрамор и тёплые тона.', en: 'Classical motifs, marble and warm tones.' },
      bg: 'from-yellow-900/50 to-orange-900/40',
    },
    {
      id: 'baroque' as EpochId,
      title: { ru: 'Барокко', en: 'Baroque' },
      text: { ru: 'Роскошные детали и драматичный контраст света.', en: 'Ornate details and dramatic lighting contrast.' },
      bg: 'from-zinc-900/80 to-amber-950/50',
    },
  ].filter((epoch) => modeStyles.some((item) => item.epoch === epoch.id));
  const [selectedEpoch, setSelectedEpoch] = useState<EpochId>(epochCards[0]?.id ?? 'renaissance');
  const selectedEpochLabel = epochCards.find((item) => item.id === selectedEpoch)?.title[lang] ?? '';

  const gallery = useMemo(() => {
    const base = mode === 'pets' ? '/examples/pet' : '/examples/human';
    const examplesByEpoch: Record<EpochId, { src: string; alt: string }[]> = {
      renaissance: [
        { src: `${base}-1.jpg`, alt: lang === 'ru' ? 'Пример эпохи Ренессанса' : 'Renaissance example' },
        { src: `${base}-2.jpg`, alt: lang === 'ru' ? 'Портрет в стиле Ренессанса' : 'Renaissance portrait style' },
        { src: `${base}-3.jpg`, alt: lang === 'ru' ? 'Классический ренессансный образ' : 'Classic renaissance look' },
      ],
      medieval: [
        { src: `${base}-2.jpg`, alt: lang === 'ru' ? 'Пример эпохи Средневековья' : 'Medieval example' },
        { src: `${base}-3.jpg`, alt: lang === 'ru' ? 'Готический исторический портрет' : 'Gothic historical portrait' },
        { src: `${base}-1.jpg`, alt: lang === 'ru' ? 'Средневековый антураж' : 'Medieval atmosphere' },
      ],
      ancient: [
        { src: `${base}-3.jpg`, alt: lang === 'ru' ? 'Пример Древнего мира' : 'Ancient world example' },
        { src: `${base}-1.jpg`, alt: lang === 'ru' ? 'Античный стиль портрета' : 'Ancient portrait style' },
        { src: `${base}-2.jpg`, alt: lang === 'ru' ? 'Классическая античная композиция' : 'Classical ancient composition' },
      ],
      baroque: [
        { src: `${base}-1.jpg`, alt: lang === 'ru' ? 'Пример эпохи Барокко' : 'Baroque example' },
        { src: `${base}-3.jpg`, alt: lang === 'ru' ? 'Парадный барочный портрет' : 'Ceremonial baroque portrait' },
        { src: `${base}-2.jpg`, alt: lang === 'ru' ? 'Барочный контраст света' : 'Baroque dramatic contrast' },
      ],
    };

    return examplesByEpoch[selectedEpoch] ?? [];
  }, [selectedEpoch, mode, lang]);

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
        <div className="mb-6 flex items-end justify-between gap-4">
          <h2 className="font-display text-3xl">{t('pickEpoch')}</h2>
          <Link to="/create" className="text-sm text-emerald-300 hover:text-emerald-200">
            {lang === 'ru' ? 'Выбрать эпоху в генераторе ->' : 'Choose era in generator ->'}
          </Link>
        </div>
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {epochCards.map((epoch) => (
            <button
              key={epoch.id}
              type="button"
              onClick={() => setSelectedEpoch(epoch.id)}
              className={`rounded-2xl border bg-gradient-to-br p-5 text-left transition ${selectedEpoch === epoch.id ? `border-emerald-300 ${epoch.bg}` : `border-white/10 ${epoch.bg} hover:border-white/25`}`}
            >
              <p className="text-lg font-semibold text-white">{epoch.title[lang]}</p>
              <p className="mt-2 text-sm text-zinc-200">{epoch.text[lang]}</p>
            </button>
          ))}
        </div>
      </section>

      <section className="mt-14">
        <h2 className="font-display text-3xl">
          {lang === 'ru' ? `Примеры: ${selectedEpochLabel}` : `Examples: ${selectedEpochLabel}`}
        </h2>
        <div className="mt-6 grid gap-4 md:grid-cols-3">
          {gallery.map((item) => (
            <article key={`${selectedEpoch}-${item.src}`} className="renaissance-frame overflow-hidden rounded-2xl bg-card">
              <div className="aspect-[4/5] w-full bg-black/40 p-2">
                <img src={item.src} alt={item.alt} className="h-full w-full rounded-md object-contain object-center" />
              </div>
              <div className="p-4">
                <h3 className="font-medium">{selectedEpochLabel}</h3>
                <p className="mt-1 text-sm text-muted-foreground">{item.alt}</p>
              </div>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}
