import { Quiz } from '../components/quiz/Quiz.jsx';

export default function OcenkaPage() {
  return (
    <div className="min-h-screen bg-bg pt-24 pb-16">
      <div className="max-w-container mx-auto container-px">
        <div className="max-w-[680px] mx-auto">
          <div className="text-center mb-10">
            <p className="text-label font-semibold text-ink-muted uppercase tracking-widest mb-3">Предварительная оценка</p>
            <h1 className="text-display-md font-bold text-ink mb-4 text-balance">Узнайте стоимость вашего ремонта</h1>
            <p className="text-body text-ink-muted max-w-[440px] mx-auto">4 вопроса — и вы увидите ориентировочный бюджет. Менеджер свяжется с детальной сметой.</p>
          </div>
          <div className="bg-bg-secondary border border-border rounded-2xl p-8 md:p-10">
            <Quiz />
          </div>
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-6 text-center sm:text-left">
            {['Звонок — в течение 30 минут', 'Замер бесплатно', 'Без обязательств'].map((note) => (
              <div key={note} className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-green-500 shrink-0" />
                <span className="text-body-sm text-ink-muted">{note}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
