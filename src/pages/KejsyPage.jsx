import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { api } from '../lib/api.js';

const filters = ['Все', 'Новостройка', 'Вторичка', 'Студия', 'White Box', 'Белый', 'Серый'];

function matchFilter(c, filter) {
  if (filter === 'Все') return true;
  if (['Новостройка', 'Вторичка', 'Студия'].includes(filter)) return c.type === filter;
  if (filter === 'White Box') return c.pkg.startsWith('White Box');
  if (filter === 'Белый') return c.pkg.startsWith('Белый');
  if (filter === 'Серый') return c.pkg.startsWith('Серый');
  return true;
}

export default function KejsyPage() {
  const [activeFilter, setActiveFilter] = useState('Все');
  const [cases, setCases] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.getCases()
      .then(setCases)
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  const visibleCases = cases.filter((c) => matchFilter(c, activeFilter));

  return (
    <div className="min-h-screen bg-bg pt-24 pb-16">
      <div className="max-w-container mx-auto container-px">
        <div className="mb-12">
          <p className="text-label font-semibold text-ink-muted uppercase tracking-widest mb-3">Кейсы</p>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-5">
            <h1 className="text-display-md font-bold text-ink text-balance">Реальные ремонты,<br />реальные результаты</h1>
            <p className="text-body text-ink-muted max-w-[360px]">Фото до и после, сроки, состав работ. Без постановочных съёмок.</p>
          </div>
        </div>

        <div className="flex gap-2 flex-wrap mb-10">
          {filters.map((f) => (
            <button key={f} onClick={() => setActiveFilter(f)}
              className={`px-4 py-2 rounded-pill border text-body-sm font-medium transition-colors ${
                activeFilter === f ? 'bg-ink text-bg border-ink' : 'border-border text-ink-muted hover:border-border-strong hover:text-ink'
              }`}>{f}</button>
          ))}
        </div>

        {loading ? (
          <div className="py-20 text-center"><p className="text-body text-ink-muted">Загрузка...</p></div>
        ) : visibleCases.length === 0 ? (
          <div className="py-20 text-center"><p className="text-body text-ink-muted">Нет кейсов по выбранному фильтру.</p></div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-12">
            {visibleCases.map((c) => (
              <Link key={c.id} to={`/kejsy/${c.slug}`} className="group flex flex-col rounded-xl border border-border bg-bg overflow-hidden hover:border-border-strong hover-lift">
                <div className="relative aspect-[4/3] overflow-hidden">
                  <div className="absolute left-0 inset-y-0 w-1/2 overflow-hidden">
                    {c.imgBefore
                      ? <img src={c.imgBefore} alt={`До — ${c.title}`} className="w-full h-full object-cover" />
                      : <div className="w-full h-full bg-bg-tertiary" />}
                    <span className="absolute bottom-2 left-2 text-caption font-semibold text-white bg-black/40 backdrop-blur-sm px-2 py-0.5 rounded">До</span>
                  </div>
                  <div className="absolute right-0 inset-y-0 w-1/2 overflow-hidden">
                    {c.imgAfter
                      ? <img src={c.imgAfter} alt={`После — ${c.title}`} className="w-full h-full object-cover" />
                      : <div className="w-full h-full bg-bg-secondary" />}
                    <span className="absolute bottom-2 right-2 text-caption font-semibold text-white bg-black/40 backdrop-blur-sm px-2 py-0.5 rounded">После</span>
                  </div>
                  <div className="absolute inset-y-0 left-1/2 -translate-x-px w-0.5 bg-white/80 z-10" />
                </div>
                <div className="p-5 flex flex-col gap-3">
                  <div className="flex justify-between items-start gap-2">
                    <h2 className="text-body font-semibold text-ink">{c.title}</h2>
                    <span className="text-caption text-ink-faint shrink-0">{c.days} дн.</span>
                  </div>
                  <div className="flex gap-2 flex-wrap">
                    <span className="text-caption px-2.5 py-1 bg-bg-secondary border border-border rounded-pill text-ink-muted font-medium">{c.type}</span>
                    <span className="text-caption px-2.5 py-1 bg-bg-secondary border border-border rounded-pill text-ink-muted font-medium">{c.pkg}</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-body-sm font-semibold text-ink mt-auto pt-2 group-hover:gap-2.5 transition-all">
                    Посмотреть кейс <ArrowRight size={14} className="group-hover:translate-x-0.5 transition-transform" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}

        <div className="flex flex-col items-center text-center gap-4 p-10 rounded-2xl bg-bg-secondary border border-border">
          <h2 className="text-heading font-bold text-ink">Хотите так же?</h2>
          <p className="text-body text-ink-muted max-w-[400px]">Расскажите о своей квартире — оценим сроки и стоимость за 10 минут.</p>
          <Link to="/ocenka" className="inline-flex items-center gap-2 px-7 py-3.5 bg-ink text-bg text-body-sm font-semibold rounded-pill hover:bg-accent-hover transition-colors group">
            Получить оценку <ArrowRight size={15} className="group-hover:translate-x-0.5 transition-transform" />
          </Link>
        </div>
      </div>
    </div>
  );
}
