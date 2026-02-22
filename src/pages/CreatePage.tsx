import { useEffect, useMemo, useState } from 'react';
import { useAppContext } from '@/contexts/AppContext';
import { pricingPacks, statusMessages, stylePresets, type StylePreset } from '@/data/site-content';
import { startTelegramStarsPayment } from '@/lib/telegram';
import { generatePortraitViaApi } from '@/lib/ai';

type Step = 'upload' | 'crop' | 'style' | 'generation' | 'result';

interface CropConfig {
  zoom: number;
  x: number;
  y: number;
}

const baseCrop: CropConfig = { zoom: 1, x: 0, y: 0 };

function applyCrop(imageUrl: string, crop: CropConfig): Promise<string> {
  return new Promise((resolve, reject) => {
    const image = new Image();
    image.crossOrigin = 'anonymous';
    image.onload = () => {
      const canvas = document.createElement('canvas');
      const size = 1024;
      canvas.width = size;
      canvas.height = size;
      const ctx = canvas.getContext('2d');
      if (!ctx) {
        reject(new Error('Canvas context unavailable'));
        return;
      }
      const drawW = image.naturalWidth * crop.zoom;
      const drawH = image.naturalHeight * crop.zoom;
      const dx = (size - drawW) / 2 + crop.x;
      const dy = (size - drawH) / 2 + crop.y;
      ctx.drawImage(image, dx, dy, drawW, drawH);
      resolve(canvas.toDataURL('image/jpeg', 0.92));
    };
    image.onerror = () => reject(new Error('Image load error'));
    image.src = imageUrl;
  });
}

export default function CreatePage() {
  const { mode, lang, t, addGeneration, markPaid, selectedPack, setSelectedPack } = useAppContext();
  const modeStyles = useMemo(() => stylePresets.filter((item) => item.mode === mode), [mode]);
  const selectedPackMeta = useMemo(() => pricingPacks.find((pack) => pack.id === selectedPack) ?? pricingPacks[0], [selectedPack]);

  const [step, setStep] = useState<Step>('upload');
  const [fileUrl, setFileUrl] = useState<string>('');
  const [cropUrl, setCropUrl] = useState<string>('');
  const [style, setStyle] = useState<StylePreset | null>(modeStyles[0] ?? null);
  const [crop, setCrop] = useState<CropConfig>(baseCrop);
  const [progress, setProgress] = useState(0);
  const [progressText, setProgressText] = useState('');
  const [resultUrl, setResultUrl] = useState('');
  const [recordId, setRecordId] = useState('');
  const [paid, setPaid] = useState(false);
  const [paying, setPaying] = useState(false);
  const [aiInfo, setAiInfo] = useState('');

  useEffect(() => {
    setStyle(modeStyles[0] ?? null);
  }, [modeStyles]);

  useEffect(() => {
    if (step !== 'generation') return;

    let current = 0;
    const statuses = statusMessages[lang];
    setProgressText(statuses[0]);

    const timer = setInterval(() => {
      current += 25;
      setProgress(current);
      setProgressText(statuses[Math.min(Math.floor(current / 25), statuses.length - 1)]);
      if (current >= 100) {
        clearInterval(timer);
        setStep('result');
      }
    }, 800);

    return () => clearInterval(timer);
  }, [step, lang]);

  const onFile = (file?: File) => {
    if (!file) return;
    const url = URL.createObjectURL(file);
    setFileUrl(url);
    setCropUrl(url);
    setCrop(baseCrop);
    setResultUrl('');
    setPaid(false);
    setStep('crop');
  };

  const onGenerate = async () => {
    if (!cropUrl || !style) return;
    setStep('generation');
    setProgress(0);
    const croppedImage = await applyCrop(cropUrl, crop);
    let finalImage = croppedImage;
    setAiInfo('');

    try {
      const aiGenerated = await generatePortraitViaApi({
        imageBase64: croppedImage,
        mode,
        stylePrompt: style.promptTemplate,
      });
      if (aiGenerated) {
        finalImage = aiGenerated;
        setAiInfo('AI API generation enabled.');
      } else {
        setAiInfo('AI API not configured yet. Showing local preview.');
      }
    } catch {
      setAiInfo('AI API request failed. Showing local preview.');
    }

    setResultUrl(finalImage);
    const id = crypto.randomUUID();
    setRecordId(id);
    addGeneration({
      id,
      mode,
      styleName: style.title[lang],
      createdAt: new Date().toISOString(),
      imageUrl: finalImage,
      paid: false,
      status: 'succeeded',
      packId: selectedPackMeta.id,
      packStars: selectedPackMeta.stars,
    });
  };

  const onPay = async () => {
    if (!recordId) return;
    setPaying(true);
    const isPaid = await startTelegramStarsPayment(recordId, selectedPackMeta.stars);
    if (isPaid) {
      setPaid(true);
      markPaid(recordId);
    }
    setPaying(false);
  };

  return (
    <div className="mx-auto w-full max-w-7xl px-4 py-8 md:px-8">
      <h1 className="font-display text-3xl md:text-4xl">{t('generatorTitle')}</h1>

      <div className="mt-6 grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
        <section className="renaissance-frame rounded-2xl bg-card p-4 md:p-6">
          <div className="mb-4 flex flex-wrap gap-2 text-xs text-muted-foreground">
            {[t('stepUpload'), t('stepCrop'), t('stepStyle'), t('stepGenerate'), t('stepResult')].map((item) => (
              <span key={item} className="rounded-full border border-white/10 px-3 py-1">
                {item}
              </span>
            ))}
          </div>

          {step === 'upload' && (
            <label className="flex min-h-[320px] cursor-pointer flex-col items-center justify-center rounded-xl border border-dashed border-white/20 p-6 text-center">
              <p className="font-medium">{t('stepUpload')}</p>
              <p className="mt-2 text-sm text-muted-foreground">{t('uploadHint')}</p>
              <input
                type="file"
                accept="image/png,image/jpeg,image/webp"
                className="hidden"
                onChange={(event) => onFile(event.target.files?.[0])}
              />
            </label>
          )}

          {step === 'crop' && cropUrl && (
            <div>
              <div className="relative h-[360px] overflow-hidden rounded-xl border border-white/10 bg-black">
                <img
                  src={cropUrl}
                  alt="source"
                  className="absolute left-1/2 top-1/2 max-h-none max-w-none -translate-x-1/2 -translate-y-1/2"
                  style={{ transform: `translate(-50%, -50%) translate(${crop.x}px, ${crop.y}px) scale(${crop.zoom})` }}
                />
                <div className="pointer-events-none absolute inset-8 border border-dashed border-white/40" />
              </div>
              <div className="mt-4 grid gap-3">
                <label className="text-sm text-muted-foreground">
                  {t('cropZoom')}
                  <input
                    type="range"
                    min={1}
                    max={2.5}
                    step={0.1}
                    value={crop.zoom}
                    onChange={(event) => setCrop((prev) => ({ ...prev, zoom: Number(event.target.value) }))}
                    className="mt-1 w-full"
                  />
                </label>
                <label className="text-sm text-muted-foreground">
                  {t('cropX')}
                  <input
                    type="range"
                    min={-180}
                    max={180}
                    step={1}
                    value={crop.x}
                    onChange={(event) => setCrop((prev) => ({ ...prev, x: Number(event.target.value) }))}
                    className="mt-1 w-full"
                  />
                </label>
                <label className="text-sm text-muted-foreground">
                  {t('cropY')}
                  <input
                    type="range"
                    min={-180}
                    max={180}
                    step={1}
                    value={crop.y}
                    onChange={(event) => setCrop((prev) => ({ ...prev, y: Number(event.target.value) }))}
                    className="mt-1 w-full"
                  />
                </label>
              </div>
            </div>
          )}

          {step === 'style' && style && (
            <div className="grid gap-4 md:grid-cols-2">
              {modeStyles.map((item) => (
                <button key={item.id} type="button" onClick={() => setStyle(item)} className={`overflow-hidden rounded-xl border text-left ${style.id === item.id ? 'border-emerald-400' : 'border-white/10'}`}>
                  <div className="aspect-[4/5] w-full bg-black/40 p-2">
                    <img src={item.preview} alt={item.title[lang]} className="h-full w-full rounded-md object-contain object-center" />
                  </div>
                  <div className="p-3">
                    <div className="font-medium">{item.title[lang]}</div>
                    <p className="text-sm text-muted-foreground">{item.description[lang]}</p>
                  </div>
                </button>
              ))}
            </div>
          )}

          {step === 'generation' && (
            <div className="flex min-h-[320px] flex-col items-center justify-center text-center">
              <h2 className="text-xl font-medium">{t('progressTitle')}</h2>
              <div className="mt-4 h-2 w-full max-w-md rounded-full bg-white/10">
                <div className="h-2 rounded-full bg-emerald-400 transition-all" style={{ width: `${progress}%` }} />
              </div>
              <p className="mt-4 text-sm text-muted-foreground">{progressText}</p>
            </div>
          )}

          {step === 'result' && resultUrl && (
            <div>
              <img
                src={resultUrl}
                alt="result"
                className={`h-[420px] w-full rounded-xl border border-white/10 object-cover ${paid ? '' : 'blur-sm'}`}
              />
              <p className="mt-3 text-sm text-muted-foreground">{t('resultReady')}</p>
              {aiInfo && <p className="mt-1 text-xs text-muted-foreground">{aiInfo}</p>}
              {!paid && <p className="mt-1 text-xs text-muted-foreground">Telegram Stars: {selectedPackMeta.stars} Stars за выбранный пакет.</p>}
              <div className="mt-4 flex flex-wrap gap-2">
                {!paid ? (
                  <button
                    type="button"
                    className="rounded-full bg-emerald-400 px-5 py-2.5 text-sm font-semibold text-black disabled:opacity-60"
                    onClick={() => void onPay()}
                    disabled={paying}
                  >
                    {paying ? 'Opening Telegram...' : `Оплатить ${selectedPackMeta.stars} Stars`}
                  </button>
                ) : (
                  <a href={resultUrl} download="gudwin-art-hd.jpg" className="rounded-full bg-emerald-400 px-5 py-2.5 text-sm font-semibold text-black">
                    {t('paidDownload')}
                  </a>
                )}
                <button type="button" className="rounded-full border border-white/20 px-5 py-2.5 text-sm" onClick={() => setStep('style')}>
                  {t('pickStyle')}
                </button>
              </div>
            </div>
          )}
        </section>

        <aside className="renaissance-frame rounded-2xl bg-card p-4 md:p-6">
          <div className="mb-4 rounded-xl border border-amber-300/30 bg-amber-300/10 p-3 text-xs text-amber-200">
            Оплата: {selectedPackMeta.stars} Telegram Stars за пакет.
          </div>
          <div className="mb-4 space-y-2 rounded-xl border border-white/10 bg-black/20 p-3">
            <p className="text-xs uppercase tracking-wide text-muted-foreground">Пакет</p>
            <div className="grid grid-cols-2 gap-2">
              {pricingPacks.map((pack) => (
                <button
                  key={pack.id}
                  type="button"
                  onClick={() => setSelectedPack(pack.id)}
                  className={`rounded-lg border px-3 py-2 text-left text-xs ${selectedPack === pack.id ? 'border-amber-300/60 bg-amber-300/10 text-amber-100' : 'border-white/15 text-muted-foreground'}`}
                >
                  <p className="font-medium">{pack.title[lang]}</p>
                  <p>{pack.stars} Stars</p>
                </button>
              ))}
            </div>
          </div>
          <h2 className="text-sm uppercase tracking-wide text-muted-foreground">{t('pickStyle')}</h2>
          <div className="mt-4 space-y-3">
            {modeStyles.map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() => {
                  setStyle(item);
                  if (step === 'upload') {
                    setStep('crop');
                  }
                }}
                className={`flex w-full items-center gap-3 rounded-lg border px-2 py-2 text-left ${style?.id === item.id ? 'border-emerald-400' : 'border-white/10'}`}
              >
                <img src={item.preview} alt={item.title[lang]} className="h-12 w-12 rounded-md object-cover" />
                <div>
                  <p className="text-sm font-medium">{item.title[lang]}</p>
                  <p className="text-xs text-muted-foreground">{item.description[lang]}</p>
                </div>
              </button>
            ))}
          </div>

          <div className="mt-6 flex flex-wrap gap-2">
            <label className="cursor-pointer rounded-full border border-white/20 px-3 py-2 text-xs">
              {t('stepUpload')}
              <input type="file" accept="image/*" className="hidden" onChange={(event) => onFile(event.target.files?.[0])} />
            </label>
            <button type="button" className="rounded-full border border-white/20 px-3 py-2 text-xs" onClick={() => setStep('style')}>
              {t('stepStyle')}
            </button>
            <button
              type="button"
              className="rounded-full bg-emerald-400 px-3 py-2 text-xs font-medium text-black"
              onClick={() => {
                if (!fileUrl) {
                  alert(t('noFile'));
                  return;
                }
                setStep('style');
                setTimeout(() => {
                  void onGenerate();
                }, 150);
              }}
            >
              {t('startGenerate')}
            </button>
          </div>
        </aside>
      </div>
    </div>
  );
}
