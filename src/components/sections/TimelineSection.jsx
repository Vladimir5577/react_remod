import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import AnimateIn from '../ui/AnimateIn.jsx';

const steps = [
  { n: '01', title: 'Замеры и консультация', desc: 'Приезжаем, смотрим объект, отвечаем на вопросы. Фиксируем состояние и пожелания.', days: 'День 1–3' },
  { n: '02', title: 'Смета и договор', desc: 'Готовим детальную смету. Согласовываем пакет, опции и итоговую цену. Подписываем договор.', days: 'День 3–7' },
  { n: '03', title: 'Закупка материалов', desc: 'Берём закупку на себя: знаем где выгодно, без лишнего. Вы не ездите по строительным рынкам.', days: 'День 7–14' },
  { n: '04', title: 'Ремонтные работы', desc: 'Команда работает по графику. Еженедельные фото-отчёты. Вы не прораб — мы берём контроль.', days: 'День 14–80' },
  { n: '05', title: 'Проверка и сдача', desc: 'Проходим объект вместе по чеклисту. Фиксируем замечания и устраняем до сдачи.', days: 'День 80–88' },
  { n: '06', title: 'Клининг и переезд', desc: 'Финальная уборка входит в работу. Забираете ключи и заезжаете.', days: 'День 88–90' },
];

export default function TimelineSection() {
  return (
    <section className="section-py bg-bg">
      <div className="max-w-container mx-auto container-px">
        <AnimateIn preset="fade-up" className="max-w-[680px] mb-14">
          <h2 className="text-display-md font-bold text-ink mb-5 text-balance">90 дней от замера до переезда</h2>
          <p className="text-body-lg text-ink-muted">Клиент не прораб. Мы берём на себя всё — от замеров до клининга. Вы просто приезжаете в готовую квартиру.</p>
        </AnimateIn>
        <AnimateIn preset="fade-up" delay={0.1}>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-px bg-border border border-border rounded-xl overflow-hidden">
            {steps.map((step, i) => (
              <div key={step.n} className={`bg-bg-secondary p-7 flex flex-col gap-4 ${i === steps.length - 1 ? 'sm:col-span-2 lg:col-span-1' : ''}`}>
                <div className="flex items-center justify-between">
                  <span className="text-display-lg font-black text-border-strong leading-none select-none">{step.n}</span>
                  <span className="text-caption text-ink-faint font-medium px-2.5 py-1 bg-bg-secondary border border-border rounded-pill">{step.days}</span>
                </div>
                <div>
                  <h3 className="text-body font-semibold text-ink mb-2">{step.title}</h3>
                  <p className="text-body-sm text-ink-muted leading-relaxed">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </AnimateIn>
        <AnimateIn preset="fade-up" delay={0.15} className="mt-10 flex flex-col sm:flex-row items-center gap-4">
          <Link to="/ocenka" className="inline-flex items-center gap-2 px-7 py-3.5 bg-accent text-black text-body-sm font-black rounded-pill hover:bg-accent-hover transition-colors group">
            Проверить срок для моей квартиры
            <ArrowRight size={15} className="group-hover:translate-x-0.5 transition-transform" />
          </Link>
          <p className="text-body-sm text-ink-muted">Уточним сроки после первого звонка — обычно укладываемся в 90 дней.</p>
        </AnimateIn>
      </div>
    </section>
  );
}
