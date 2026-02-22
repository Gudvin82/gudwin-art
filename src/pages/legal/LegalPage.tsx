import { useMemo } from 'react';
import { useParams } from 'react-router-dom';
import { legalDocs } from '@/data/site-content';
import { useAppContext } from '@/contexts/AppContext';

export default function LegalPage() {
  const { slug } = useParams();
  const { lang } = useAppContext();

  const doc = useMemo(() => legalDocs.find((item) => item.slug === slug) ?? legalDocs[0], [slug]);

  return (
    <div className="mx-auto w-full max-w-4xl px-4 py-10 md:px-8">
      <h1 className="font-display text-4xl">{doc.title[lang]}</h1>
      <p className="mt-3 text-sm text-muted-foreground">
        Версия: {doc.version} | Дата вступления: {doc.effectiveFrom}
      </p>
      <div className="mt-6 rounded-2xl border border-white/10 bg-card p-6 text-muted-foreground">
        {doc.body[lang].map((paragraph) => (
          <p key={paragraph} className="mb-4 last:mb-0">
            {paragraph}
          </p>
        ))}
      </div>
    </div>
  );
}
