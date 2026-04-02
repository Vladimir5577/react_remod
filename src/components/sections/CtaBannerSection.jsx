import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import AnimateIn from '../ui/AnimateIn.jsx';

export default function CtaBannerSection() {
  return (
    <section className="section-py-sm bg-accent overflow-hidden relative">
      <div className="absolute inset-0 dot-grid opacity-[0.06] pointer-events-none" />
      <div className="relative max-w-container mx-auto container-px">
        <AnimateIn preset="fade-up">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="text-center md:text-left">
              <h2 className="text-display-md font-bold text-black mb-3 text-balance">Готовы обсудить вашу квартиру?</h2>
              <p className="text-body text-black/80 max-w-[500px]">Расскажите о задаче — ответим в течение 30 минут в рабочее время. Точная оценка — после бесплатного замера.</p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3 shrink-0">
              <Link to="/ocenka" className="inline-flex items-center justify-center gap-2 px-7 py-4 bg-black text-accent text-body font-black rounded-pill hover:bg-black/80 transition-colors group">
                Узнать стоимость
                <ArrowRight size={16} className="group-hover:translate-x-0.5 transition-transform" />
              </Link>
              <a href="https://wa.me/79991234567" target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 px-7 py-4 border border-black/30 text-black text-body font-semibold rounded-pill hover:bg-black/10 transition-colors">
                Написать в WhatsApp
              </a>
            </div>
          </div>
        </AnimateIn>
      </div>
    </section>
  );
}
