import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { ArrowLeft, ArrowRight, CheckCircle } from 'lucide-react';
import BeforeAfterSlider from '../components/cases/BeforeAfterSlider.jsx';
import { api } from '../lib/api.js';

export default function CaseDetailPage() {
  const { slug } = useParams();
  const [c, setC] = useState(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    api.getCase(slug)
      .then(setC)
      .catch(() => setNotFound(true))
      .finally(() => setLoading(false));
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-screen bg-bg pt-32 pb-16 flex items-center justify-center">
        <p className="text-body text-ink-muted">Загрузка...</p>
      </div>
    );
  }

  if (notFound || !c) {
    return (
      <div className="min-h-screen bg-bg pt-32 pb-16 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-heading font-bold text-ink mb-4">Кейс не найден</h1>
          <Link to="/kejsy" className="text-body-sm text-ink-muted underline">← Все кейсы</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-bg pt-24 pb-16">
      <div className="max-w-container mx-auto container-px">
        <Link to="/kejsy" className="inline-flex items-center gap-2 text-body-sm text-ink-muted hover:text-ink transition-colors mb-8 group">
          <ArrowLeft size={15} className="group-hover:-translate-x-0.5 transition-transform" /> Все кейсы
        </Link>

        <div className="mb-10">
          <div className="flex flex-wrap gap-2 mb-4">
            {[c.type, c.area, c.pkg, `${c.days} дней`].map((tag) => (
              <span key={tag} className="text-caption px-2.5 py-1 bg-bg-secondary border border-border rounded-pill text-ink-muted font-medium">{tag}</span>
            ))}
          </div>
          <h1 className="text-display-md font-bold text-ink mb-4">{c.title}</h1>
          <p className="text-body-lg text-ink-muted max-w-prose">{c.summary}</p>
        </div>

        {c.imgBefore && c.imgAfter && (
          <div className="mb-12">
            <p className="text-label font-semibold text-ink-muted uppercase tracking-widest mb-4">До и после — перетащите слайдер</p>
            <BeforeAfterSlider
              imgBefore={c.imgBefore}
              imgAfter={c.imgAfter}
              altBefore={`До ремонта — ${c.title}`}
              altAfter={`После ремонта — ${c.title}`}
            />
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          <div className="lg:col-span-2">
            {c.gallery && c.gallery.length > 0 && (
              <>
                <p className="text-label font-semibold text-ink-muted uppercase tracking-widest mb-5">Фотографии после</p>
                <div className="grid grid-cols-2 gap-3">
                  {c.gallery.map((src, i) => (
                    <div key={i} className="relative aspect-[4/3] rounded-lg overflow-hidden">
                      <img src={src} alt={`${c.title} — фото ${i + 1}`} className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" />
                    </div>
                  ))}
                </div>
              </>
            )}
          </div>

          <div>
            {c.challenges && c.challenges.length > 0 && (
              <>
                <p className="text-label font-semibold text-ink-muted uppercase tracking-widest mb-5">Сложности и решения</p>
                <ul className="flex flex-col gap-4">
                  {c.challenges.map((ch, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <CheckCircle size={16} className="text-green-600 flex-shrink-0 mt-0.5" />
                      <p className="text-body-sm text-ink-muted leading-relaxed">{ch}</p>
                    </li>
                  ))}
                </ul>
              </>
            )}
            <div className="mt-10 p-6 rounded-xl bg-bg-secondary border border-border">
              <h3 className="text-body font-bold text-ink mb-2">Хочу так же</h3>
              <p className="text-body-sm text-ink-muted mb-5">Расскажите о своей квартире — оценим стоимость и сроки.</p>
              <Link to="/ocenka" className="inline-flex items-center gap-2 w-full justify-center py-3 bg-ink text-bg text-body-sm font-semibold rounded-lg hover:bg-accent-hover transition-colors group">
                Получить оценку <ArrowRight size={14} className="group-hover:translate-x-0.5 transition-transform" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
