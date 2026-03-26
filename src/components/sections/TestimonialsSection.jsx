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
    <section id="reviews" className="py-24 bg-neutral-950">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-end justify-between mb-12">
          <div>
            <p className="text-xs uppercase tracking-widest text-neutral-500 mb-2">Отзывы</p>
            <h2 className="text-3xl md:text-4xl font-bold text-white">Что говорят клиенты</h2>
          </div>
          <div className="flex gap-2">
            <button onClick={() => scroll(-1)} className="w-10 h-10 rounded-full border border-neutral-700 flex items-center justify-center text-neutral-400 hover:border-white hover:text-white transition">
              <ChevronLeft size={18} />
            </button>
            <button onClick={() => scroll(1)} className="w-10 h-10 rounded-full border border-neutral-700 flex items-center justify-center text-neutral-400 hover:border-white hover:text-white transition">
              <ChevronRight size={18} />
            </button>
          </div>
        </div>

        <div ref={scrollRef} className="flex gap-5 overflow-x-auto scrollbar-hide pb-4" style={{ scrollSnapType: 'x mandatory' }}>
          {testimonials.map((t) => (
            <div key={t.id} className="min-w-[320px] max-w-[320px] bg-neutral-900 border border-neutral-800 rounded-2xl p-6 flex flex-col gap-4" style={{ scrollSnapAlign: 'start' }}>
              <Quote size={24} className="text-neutral-600" />
              <p className="text-neutral-300 text-sm leading-relaxed flex-1">{t.quote}</p>
              <div className="flex items-center gap-1 mt-2">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} size={14} className={i < t.stars ? 'text-yellow-400 fill-yellow-400' : 'text-neutral-700'} />
                ))}
              </div>
              <div className="flex items-center gap-3 mt-2">
                <div className="w-9 h-9 rounded-full bg-neutral-700 flex items-center justify-center text-white text-sm font-bold">{t.name?.[0] ?? '?'}</div>
                <div>
                  <p className="text-white text-sm font-medium">{t.name}</p>
                  <p className="text-neutral-500 text-xs">{t.obj}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
