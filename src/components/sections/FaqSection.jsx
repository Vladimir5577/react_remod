import { useState, useEffect } from 'react';
import { Plus, Minus } from 'lucide-react';
import { api } from '../../lib/api.js';

export default function FaqSection() {
  const [faqs, setFaqs] = useState([]);
  const [openIdx, setOpenIdx] = useState(null);

  useEffect(() => {
    api.getFaqs().then(setFaqs).catch(console.error);
  }, []);

  if (faqs.length === 0) return null;

  return (
    <section className="section-py bg-bg-secondary border-y border-border">
      <div className="max-w-container mx-auto container-px">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_2fr] gap-12 lg:gap-20">
          <div className="lg:sticky lg:top-28 lg:self-start">
            <p className="text-label font-semibold text-accent uppercase tracking-widest mb-3">Частые вопросы</p>
            <h2 className="text-display-md font-bold text-ink text-balance mb-5">Вопросы и ответы</h2>
            <p className="text-body text-ink-muted">Не нашли ответ? Напишите нам в мессенджер или позвоните — ответим честно.</p>
          </div>
          <div className="flex flex-col divide-y divide-border">
            {faqs.map((faq, i) => (
              <div key={faq.id} className="py-5">
                <button
                  className="flex items-start justify-between gap-4 w-full text-left group"
                  onClick={() => setOpenIdx(openIdx === i ? null : i)}
                  aria-expanded={openIdx === i}
                >
                  <span className="text-body font-medium text-ink group-hover:text-ink-muted transition-colors">{faq.question}</span>
                  <span className="flex-shrink-0 mt-0.5 w-6 h-6 rounded-full border border-border flex items-center justify-center text-ink-muted">
                    {openIdx === i ? <Minus size={13} /> : <Plus size={13} />}
                  </span>
                </button>
                {openIdx === i && (
                  <p className="mt-4 text-body text-ink-muted leading-relaxed max-w-prose animate-slide-up">{faq.answer}</p>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
