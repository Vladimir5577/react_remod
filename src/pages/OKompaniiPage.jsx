import { Link } from 'react-router-dom';
import { ArrowRight, Shield, Clock, FileText, CheckCircle } from 'lucide-react';

const guarantees = [
  { icon: Shield, title: 'Фиксированная цена', desc: 'Цена прописана в договоре до начала работ. Никаких доплат в процессе.' },
  { icon: Clock, title: 'Гарантия сроков', desc: 'Дату сдачи фиксируем в договоре. Если опаздываем — компенсируем из собственных средств.' },
  { icon: FileText, title: 'Прозрачный договор', desc: 'Договор со спецификацией работ и материалов. Не начинаем ни одного этапа без вашей подписи.' },
];

const qualitySteps = [
  { step: '01', title: 'Приёмка этапов', desc: 'Каждый этап принимаем вместе с вами: черновые работы, чистовая отделка, финальная приёмка.' },
  { step: '02', title: 'Фото-отчёты', desc: 'Еженедельные отчёты с фотографиями прогресса.' },
  { step: '03', title: 'Гарантия на год', desc: 'После сдачи объекта — 12 месяцев гарантийного обслуживания.' },
];

export default function OKompaniiPage() {
  return (
    <div className="min-h-screen bg-bg pt-24 pb-16">
      <div className="max-w-container mx-auto container-px">
        <div className="mb-20">
          <p className="text-label font-semibold text-ink-muted uppercase tracking-widest mb-3">О компании</p>
          <h1 className="text-display-md font-bold text-ink text-balance mb-6 max-w-2xl">Ремонт, который не превращается в стройку на годы</h1>
          <p className="text-body-lg text-ink-muted max-w-prose leading-relaxed">Remod — команда мастеров и менеджеров, которые делают ремонт предсказуемым. Мы работаем с 2019 года, сдали более 120 объектов в Москве и Подмосковье.</p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-5 mb-20">
          {[{ value: '120+', label: 'объектов сдано' }, { value: '5 лет', label: 'на рынке' }, { value: '94%', label: 'клиентов рекомендуют' }, { value: '12 мес', label: 'гарантия' }].map((s) => (
            <div key={s.label} className="p-6 rounded-xl border border-border bg-bg-secondary">
              <p className="text-display-sm font-bold text-ink mb-1">{s.value}</p>
              <p className="text-body-sm text-ink-muted">{s.label}</p>
            </div>
          ))}
        </div>

        <div id="garantii" className="mb-20">
          <p className="text-label font-semibold text-ink-muted uppercase tracking-widest mb-3">Гарантии</p>
          <h2 className="text-display-sm font-bold text-ink mb-10 text-balance">Три принципа, от которых мы не отступаем</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {guarantees.map((g) => { const Icon = g.icon; return (
              <div key={g.title} className="p-7 rounded-xl border border-border bg-bg">
                <div className="w-11 h-11 rounded-lg bg-bg-secondary border border-border flex items-center justify-center mb-5"><Icon size={20} className="text-ink" /></div>
                <h3 className="text-body font-bold text-ink mb-3">{g.title}</h3>
                <p className="text-body-sm text-ink-muted leading-relaxed">{g.desc}</p>
              </div>
            ); })}
          </div>
        </div>

        <div id="process" className="mb-20">
          <p className="text-label font-semibold text-ink-muted uppercase tracking-widest mb-3">Контроль качества</p>
          <h2 className="text-display-sm font-bold text-ink mb-10 text-balance">Как мы контролируем каждый этап</h2>
          <div className="flex flex-col gap-5">
            {qualitySteps.map((q) => (
              <div key={q.step} className="flex items-start gap-6 p-7 rounded-xl border border-border bg-bg">
                <span className="text-display-sm font-bold text-ink-faint tabular-nums leading-none mt-0.5 min-w-[3ch]">{q.step}</span>
                <div><h3 className="text-body font-bold text-ink mb-2">{q.title}</h3><p className="text-body-sm text-ink-muted leading-relaxed">{q.desc}</p></div>
              </div>
            ))}
          </div>
        </div>

        <div className="mb-20 p-8 md:p-12 rounded-2xl bg-bg-secondary border border-border">
          <div className="max-w-prose">
            <div className="flex items-center gap-3 mb-5">
              <div className="w-10 h-10 rounded-lg bg-bg border border-border flex items-center justify-center"><FileText size={18} className="text-ink" /></div>
              <p className="text-label font-semibold text-ink-muted uppercase tracking-widest">Договор</p>
            </div>
            <h2 className="text-display-sm font-bold text-ink mb-5 text-balance">Всё прозрачно с первого дня</h2>
            <p className="text-body text-ink-muted mb-6 leading-relaxed">До начала работ вы получаете договор с детальной спецификацией.</p>
            <ul className="flex flex-col gap-3 mb-8">
              {['Смета с разбивкой по видам работ', 'График этапов с датами', 'Спецификация материалов', 'Акты приёмки после каждого этапа'].map((item) => (
                <li key={item} className="flex items-center gap-3 text-body-sm text-ink-muted">
                  <CheckCircle size={15} className="text-green-600 flex-shrink-0" />{item}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="flex flex-col items-center text-center gap-4 p-10 rounded-2xl border border-border bg-accent text-black">
          <h2 className="text-heading font-bold">Готовы обсудить ваш проект?</h2>
          <p className="text-body text-black/70 max-w-[400px]">Расскажите о квартире — менеджер уточнит детали и вышлет детальную смету удобным способом.</p>
          <Link to="/ocenka" className="inline-flex items-center gap-2 px-7 py-3.5 bg-black text-accent text-body-sm font-semibold rounded-pill hover:bg-black/90 transition-colors group">
            Оставить заявку <ArrowRight size={15} className="group-hover:translate-x-0.5 transition-transform" />
          </Link>
        </div>
      </div>
    </div>
  );
}
