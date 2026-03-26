import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import CaseCardSlider from '../cases/CaseCardSlider.jsx';
import { api } from '../../lib/api.js';

export default function CasesSection() {
  const [cases, setCases] = useState([]);

  useEffect(() => {
    api.getCases()
      .then((data) => setCases(data.slice(0, 3)))
      .catch(console.error);
  }, []);

  if (cases.length === 0) return null;

  return (
    <section className="section-py bg-bg-secondary border-y border-border">
      <div className="max-w-container mx-auto container-px">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-5 mb-12">
          <div>
            <p className="text-label font-semibold text-accent uppercase tracking-widest mb-3">Наши работы</p>
            <h2 className="text-display-md font-bold text-ink text-balance">Реальные кейсы,<br />реальные квартиры</h2>
          </div>
          <Link to="/kejsy" className="inline-flex items-center gap-2 text-body-sm font-semibold text-ink-muted hover:text-ink transition-colors group shrink-0">
            Все кейсы <ArrowRight size={15} className="group-hover:translate-x-0.5 transition-transform" />
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {cases.map((c) => (
            <CaseCardSlider
              key={c.id}
              id={c.slug}
              title={c.title}
              area={c.area}
              pkg={c.pkg}
              duration={`${c.days} дней`}
              desc={c.summary}
              imgBefore={c.imgBefore}
              imgAfter={c.imgAfter}
              href={`/kejsy/${c.slug}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
