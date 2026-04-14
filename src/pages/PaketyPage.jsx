import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Check } from 'lucide-react';
import { api } from '../lib/api.js';

export default function PaketyPage() {
  const [packages, setPackages] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.getPackages()
      .then(setPackages)
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="min-h-screen bg-bg pt-24 pb-16">
      <div className="max-w-container mx-auto container-px">
        <div className="max-w-[680px] mb-14">
          <p className="text-label font-semibold text-ink-muted uppercase tracking-widest mb-3">Пакеты отделки</p>
          <h1 className="text-display-md font-bold text-ink mb-5 text-balance">Готовые решения с фиксированным бюджетом</h1>
          <p className="text-body-lg text-ink-muted">Выберите пакет, который соответствует вашим ожиданиям и бюджету. Все цены фиксированы и не меняются в процессе работы.</p>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[1,2,3].map(i => (
              <div key={i} className="bg-surface rounded-2xl h-96 animate-pulse" />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {packages.map(pkg => {
              const includes = Array.isArray(pkg.includes)
                ? pkg.includes
                : typeof pkg.includes === 'string'
                  ? [pkg.includes]
                  : [];

              return (
              <div
                key={pkg.id}
                className={`relative flex flex-col rounded-2xl border overflow-hidden ${
                  pkg.featured
                    ? 'border-accent shadow-lg'
                    : 'border-border'
                }`}
              >
                {pkg.image && (
                  <div className="relative aspect-[16/9] overflow-hidden">
                    <img src={pkg.image} alt={pkg.name} className="w-full h-full object-cover" />
                    {pkg.featured && (
                      <span className="absolute top-3 left-3 bg-accent text-bg text-xs font-semibold px-3 py-1 rounded-full">
                        Популярный
                      </span>
                    )}
                  </div>
                )}

                <div className="p-8 flex flex-col flex-1">
                <div className="mb-6">
                  <p className="text-label font-semibold text-ink-muted uppercase tracking-widest mb-2">{pkg.name}</p>
                  <p className="text-display-sm font-bold text-ink">{pkg.price}</p>
                  {pkg.priceNote && (
                    <p className="text-sm text-ink-muted mt-1">{pkg.priceNote}</p>
                  )}
                </div>

                <ul className="flex flex-col gap-3 mb-8 flex-1">
                  {includes.map((feature, idx) => (
                    <li key={idx} className="flex items-start gap-3">
                      <Check className="w-4 h-4 text-accent mt-0.5 shrink-0" />
                      <span className="text-body text-ink-muted">{feature}</span>
                    </li>
                  ))}
                </ul>

                <Link
                  to="/ocenka"
                  className={`inline-flex items-center justify-center gap-2 rounded-xl px-6 py-3 text-sm font-semibold transition-colors ${
                    pkg.featured
                      ? 'bg-accent text-bg hover:bg-accent-hover'
                      : 'bg-bg-tertiary text-ink hover:bg-bg-tertiary/80'
                  }`}
                >
                  Выбрать пакет
                  <ArrowRight className="w-4 h-4" />
                </Link>
                </div>
              </div>
            );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
