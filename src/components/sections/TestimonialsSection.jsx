import { useRef, useEffect, useState } from 'react';
import { Star, Quote, ChevronLeft, ChevronRight } from 'lucide-react';
import { api } from '../../lib/api.js';

export default function TestimonialsSection() {
  const scrollRef = useRef(null);
  const [testimonials, setTestimonials] = useState([]);

  useEffect(() => {
    api.getTestimonials().then(setTestimonials).catch(console.error);
  }, []);

  const scroll = (dir) => {
    if (!scrollRef.current) return;
    scrollRef.current.scrollBy({ left: dir * 340, behavior: 'smooth' });
  };

  if (testimonials.length === 0) return null;

  return (
    <section id="reviews" className="py-24 bg-bg-secondary border-y border-border">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-end justify-between mb-12">
          <div>
            <p className="text-label font-semibold text-accent uppercase tracking-widest mb-3">Отзывы</p>
            <h2 className="text-display-md font-bold text-ink text-balance">Что говорят клиенты</h2>
          </div>
          <div className="flex gap-2">
            <button onClick={() => scroll(-1)} className="w-10 h-10 rounded-full border border-border flex items-center justify-center text-ink-muted hover:border-ink hover:text-ink transition">
              <ChevronLeft size={18} />
            </button>
            <button onClick={() => scroll(1)} className="w-10 h-10 rounded-full border border-border flex items-center justify-center text-ink-muted hover:border-ink hover:text-ink transition">
              <ChevronRight size={18} />
            </button>
          </div>
        </div>

        <div ref={scrollRef} className="flex gap-5 overflow-x-auto scrollbar-hide pb-4" style={{ scrollSnapType: 'x mandatory' }}>
          {testimonials.map((t) => (
            <div key={t.id} className="min-w-[320px] max-w-[320px] bg-bg border border-border rounded-2xl p-6 flex flex-col gap-4" style={{ scrollSnapAlign: 'start' }}>
              <Quote size={24} className="text-ink-faint" />
              <p className="text-body text-ink-muted leading-relaxed flex-1">{t.quote}</p>
              <div className="flex items-center gap-1 mt-2">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} size={14} className={i < t.stars ? 'text-yellow-400 fill-yellow-400' : 'text-border'} />
                ))}
              </div>
              <div className="flex items-center gap-3 mt-2">
                <div className="w-9 h-9 rounded-full bg-bg-secondary border border-border flex items-center justify-center text-ink text-sm font-bold">{t.name?.[0] ?? '?'}</div>
                <div>
                  <p className="text-body font-semibold text-ink">{t.name}</p>
                  <p className="text-caption text-ink-muted">{t.obj}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
