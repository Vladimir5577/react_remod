import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Check } from 'lucide-react';
import AnimateIn from '../ui/AnimateIn.jsx';
import { api } from '../../lib/api.js';

export default function PackagesSection() {
  const [packages, setPackages] = useState([]);

  useEffect(() => {
    api.getPackages().then(setPackages).catch(console.error);
  }, []);

  if (packages.length === 0) return null;

  return (
    <section className="section-py bg-bg-secondary border-y border-border">
      <div className="max-w-container mx-auto container-px">
        <AnimateIn preset="fade-up" className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <p className="text-label font-semibold text-accent uppercase tracking-widest mb-3">Пакеты отделки</p>
            <h2 className="text-display-md font-bold text-ink text-balance">Готовые решения —<br />выбирайте своё</h2>
          </div>
          <p className="text-body text-ink-muted max-w-[380px] md:text-right">Упрощаем выбор: три понятных пакета с чётким составом работ. Цена фиксируется до старта.</p>
        </AnimateIn>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {packages.map((pkg, i) => (
            <AnimateIn key={pkg.id} preset="fade-up" delay={i * 0.1}>
              <div className={`relative flex flex-col rounded-xl border p-7 hover-lift transition-all h-full ${
                pkg.featured ? 'bg-featured text-white border-featured shadow-elevated' : 'bg-bg-tertiary border-border hover:border-border-strong'
              }`}>
                <div className="mb-5">
                  <span className={`inline-flex text-caption font-semibold px-2.5 py-1 rounded border ${
                    pkg.featured ? 'text-bg bg-accent border-accent/50' : 'text-ink-muted bg-bg-secondary border-border'
                  }`}>{pkg.sub}</span>
                </div>
                <h3 className={`text-heading font-bold mb-3 ${pkg.featured ? 'text-white' : 'text-ink'}`}>{pkg.name}</h3>
                <p className={`text-body-sm mb-5 leading-relaxed ${pkg.featured ? 'text-white/60' : 'text-ink-muted'}`}>{pkg.description}</p>
                {pkg.levels && pkg.levels.length > 0 && (
                  <div className="flex gap-2 mb-5 flex-wrap">
                    {pkg.levels.map((level) => (
                      <span key={level} className={`text-caption px-2.5 py-1 rounded-pill border font-medium ${
                        pkg.featured ? 'border-accent/30 text-accent bg-accent/10' : 'border-border text-ink-muted'
                      }`}>{level}</span>
                    ))}
                  </div>
                )}
                <ul className="flex flex-col gap-2 mb-8 flex-1">
                  {pkg.includes.map((item) => (
                    <li key={item} className="flex items-start gap-2.5">
                      <Check size={14} className="flex-shrink-0 mt-0.5 text-accent" />
                      <span className={`text-body-sm ${pkg.featured ? 'text-white/70' : 'text-ink-muted'}`}>{item}</span>
                    </li>
                  ))}
                </ul>
                <Link to="/pakety" className={`inline-flex items-center justify-center gap-2 text-body-sm font-semibold px-5 py-3 rounded-lg transition-colors ${
                  pkg.featured ? 'bg-white text-black hover:bg-white/90' : 'bg-accent text-black hover:bg-accent-hover'
                }`}>
                  Получить смету <ArrowRight size={15} />
                </Link>
              </div>
            </AnimateIn>
          ))}
        </div>
      </div>
    </section>
  );
}
