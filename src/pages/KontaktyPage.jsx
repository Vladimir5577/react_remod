import { Link } from 'react-router-dom';
import { Phone, MessageCircle, MapPin, Clock, ArrowRight } from 'lucide-react';

const messengers = [
  { label: 'WhatsApp', sub: 'Ответим в течение 15 минут', href: 'https://wa.me/79991234567', icon: MessageCircle, bg: 'bg-green-50 border-green-200 hover:bg-green-100', iconColor: 'text-green-600' },
  { label: 'Telegram', sub: '@remodpro', href: 'https://t.me/remodpro', icon: MessageCircle, bg: 'bg-sky-50 border-sky-200 hover:bg-sky-100', iconColor: 'text-sky-500' },
  { label: '+7 (999) 123-45-67', sub: 'Позвонить менеджеру', href: 'tel:+79991234567', icon: Phone, bg: 'bg-bg-secondary border-border hover:bg-accent-light', iconColor: 'text-ink' },
];

export default function KontaktyPage() {
  return (
    <div className="min-h-screen bg-bg pt-24 pb-16">
      <div className="max-w-container mx-auto container-px">
        <div className="mb-14">
          <p className="text-label font-semibold text-ink-muted uppercase tracking-widest mb-3">Контакты</p>
          <h1 className="text-display-md font-bold text-ink text-balance mb-5 max-w-2xl">Свяжитесь удобным способом</h1>
          <p className="text-body-lg text-ink-muted max-w-prose">Ответим на вопросы, оценим сроки и стоимость по описанию. Для точной сметы нужен замер — это бесплатно.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
          <div>
            <p className="text-label font-semibold text-ink-muted uppercase tracking-widest mb-5">Мессенджеры и телефон</p>
            <div className="flex flex-col gap-3 mb-10">
              {messengers.map((m) => { const Icon = m.icon; return (
                <a key={m.label} href={m.href} target={m.href.startsWith('http') ? '_blank' : undefined} rel={m.href.startsWith('http') ? 'noopener noreferrer' : undefined} className={`flex items-center gap-4 p-4 rounded-xl border transition-colors ${m.bg}`}>
                  <div className="w-10 h-10 rounded-lg bg-white border border-border/60 flex items-center justify-center flex-shrink-0"><Icon size={18} className={m.iconColor} /></div>
                  <div><p className="text-body font-semibold text-ink">{m.label}</p><p className="text-body-sm text-ink-muted">{m.sub}</p></div>
                </a>
              ); })}
            </div>
            <div className="p-6 rounded-xl bg-bg-secondary border border-border">
              <h3 className="text-body font-bold text-ink mb-2">Хотите быструю оценку?</h3>
              <p className="text-body-sm text-ink-muted mb-4">Пройдите короткий опрос — менеджер перезвонит с предварительной стоимостью.</p>
              <Link to="/ocenka" className="inline-flex items-center gap-2 px-5 py-2.5 bg-ink text-bg text-body-sm font-semibold rounded-pill hover:bg-accent-hover transition-colors group">
                Получить оценку <ArrowRight size={14} className="group-hover:translate-x-0.5 transition-transform" />
              </Link>
            </div>
          </div>

          <div className="flex flex-col gap-6">
            <div className="rounded-xl border border-border bg-bg-secondary aspect-[4/3] flex items-center justify-center overflow-hidden relative">
              <div className="dot-grid absolute inset-0 opacity-80" />
              <div className="relative flex flex-col items-center gap-3 text-center p-8">
                <div className="w-12 h-12 rounded-full bg-ink flex items-center justify-center"><MapPin size={20} className="text-bg" /></div>
                <div>
                  <p className="text-body font-semibold text-ink">Москва и Московская область</p>
                  <p className="text-body-sm text-ink-muted mt-1">Офис: ул. Примерная, 1 — по договорённости</p>
                </div>
              </div>
            </div>
            <div className="flex items-start gap-3 p-5 rounded-xl border border-border bg-bg-secondary">
              <div className="w-9 h-9 rounded-md bg-bg border border-border flex items-center justify-center flex-shrink-0 mt-0.5"><Clock size={16} className="text-ink-muted" /></div>
              <div>
                <p className="text-body font-semibold text-ink mb-1">Режим работы</p>
                <p className="text-body-sm text-ink-muted">Пн–Пт: 9:00–20:00</p>
                <p className="text-body-sm text-ink-muted">Сб: 10:00–18:00</p>
                <p className="text-body-sm text-ink-muted">Вс: по договорённости</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
