import { useAppContext } from '@/contexts/AppContext';
import { sanitizeUrl } from '@/lib/security';

export default function GenerationsPage() {
  const { generations, t } = useAppContext();

  return (
    <div className="mx-auto w-full max-w-6xl px-4 py-10 md:px-8">
      <h1 className="font-display text-4xl">{t('accountGenerations')}</h1>
      <div className="mt-6 overflow-hidden rounded-2xl border border-white/10">
        <table className="w-full text-left text-sm">
          <thead className="bg-card text-muted-foreground">
            <tr>
              <th className="px-4 py-3">{t('date')}</th>
              <th className="px-4 py-3">{t('mode')}</th>
              <th className="px-4 py-3">{t('style')}</th>
              <th className="px-4 py-3">Pack</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3">{t('actions')}</th>
            </tr>
          </thead>
          <tbody>
            {generations.length === 0 ? (
              <tr>
                <td colSpan={6} className="px-4 py-6 text-muted-foreground">
                  Пока нет генераций.
                </td>
              </tr>
            ) : (
              generations.map((item) => (
                <tr key={item.id} className="border-t border-white/10">
                  <td className="px-4 py-3 text-muted-foreground">{new Date(item.createdAt).toLocaleString()}</td>
                  <td className="px-4 py-3">{item.mode}</td>
                  <td className="px-4 py-3">{item.styleName}</td>
                  <td className="px-4 py-3 text-muted-foreground">
                    {item.packId ? `${item.packId} · ${item.packStars ?? 0} Stars` : '-'}
                  </td>
                  <td className="px-4 py-3">{item.paid ? t('statusPaid') : t('statusUnpaid')}</td>
                  <td className="px-4 py-3">
                    {item.paid && sanitizeUrl(item.imageUrl) ? (
                      <a href={sanitizeUrl(item.imageUrl) ?? '#'} download className="text-emerald-300 hover:underline">
                        {t('paidDownload')}
                      </a>
                    ) : (
                      <span className="text-muted-foreground">{t('payAndDownload')}</span>
                    )}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
