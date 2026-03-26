import { useEffect, useState } from 'react';
import { Phone, MessageCircle, MapPin, Clock } from 'lucide-react';
import { api } from '../../lib/api.js';

export default function ContactsSection() {
  const [contacts, setContacts] = useState(null);

  useEffect(() => {
    api.getContacts().then(setContacts).catch(console.error);
  }, []);

  const messengers = contacts ? [
    contacts.whatsapp && {
      label: 'WhatsApp',
      sub: 'Ответим в течение 15 минут',
      href: contacts.whatsapp.startsWith('http') ? contacts.whatsapp : `https://wa.me/${contacts.whatsapp.replace(/\D/g, '')}`,
      icon: MessageCircle,
    },
    contacts.telegram && {
      label: 'Telegram',
      sub: contacts.telegram,
      href: contacts.telegram.startsWith('http') ? contacts.telegram : `https://t.me/${contacts.telegram.replace('@', '')}`,
      icon: MessageCircle,
    },
    contacts.phone && {
      label: contacts.phone,
      sub: 'Позвонить менеджеру',
      href: `tel:${contacts.phone.replace(/\s/g, '')}`,
      icon: Phone,
    },
  ].filter(Boolean) : [];

  return (
    <section className="section-py bg-bg">
      <div className="max-w-container mx-auto container-px">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
          <div>
            <p className="text-label font-semibold text-accent uppercase tracking-widest mb-3">Контакты</p>
            <h2 className="text-display-md font-bold text-ink mb-5 text-balance">Свяжитесь удобным способом</h2>
            <p className="text-body text-ink-muted mb-10 max-w-prose">Ответим на вопросы, оценим сроки и стоимость по описанию. Для точной сметы нужен замер — это бесплатно.</p>
            <div className="flex flex-col gap-3">
              {messengers.map((m) => {
                const Icon = m.icon;
                return (
                  <a key={m.label} href={m.href} target={m.href.startsWith('http') ? '_blank' : undefined} rel={m.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                    className="flex items-center gap-4 p-4 rounded-xl border border-border bg-bg-secondary hover:border-accent transition-colors">
                    <div className="w-10 h-10 rounded-lg bg-bg-tertiary border border-border flex items-center justify-center flex-shrink-0">
                      <Icon size={18} className="text-accent" />
                    </div>
                    <div>
                      <p className="text-body font-semibold text-ink">{m.label}</p>
                      <p className="text-body-sm text-ink-muted">{m.sub}</p>
                    </div>
                  </a>
                );
              })}
            </div>
          </div>
          <div className="flex flex-col gap-6">
            <div className="rounded-xl border border-border bg-bg-secondary aspect-[4/3] flex items-center justify-center overflow-hidden relative">
              <div className="dot-grid absolute inset-0 opacity-80" />
              <div className="relative flex flex-col items-center gap-3 text-center p-8">
                <div className="w-12 h-12 rounded-full bg-accent flex items-center justify-center">
                  <MapPin size={20} className="text-black" />
                </div>
                <div>
                  <p className="text-body font-semibold text-ink">{contacts?.city ?? 'Москва и Московская область'}</p>
                  {contacts?.address && <p className="text-body-sm text-ink-muted mt-1">{contacts.address}</p>}
                </div>
              </div>
            </div>
            {contacts && (contacts.hoursWeekday || contacts.hoursSaturday || contacts.hoursSunday) && (
              <div className="flex items-start gap-3 p-5 rounded-xl border border-border bg-bg-secondary">
                <div className="w-9 h-9 rounded-md bg-bg-tertiary border border-border flex items-center justify-center flex-shrink-0 mt-0.5">
                  <Clock size={16} className="text-accent" />
                </div>
                <div>
                  <p className="text-body font-semibold text-ink mb-1">Режим работы</p>
                  {contacts.hoursWeekday && <p className="text-body-sm text-ink-muted">Пн–Пт: {contacts.hoursWeekday}</p>}
                  {contacts.hoursSaturday && <p className="text-body-sm text-ink-muted">Сб: {contacts.hoursSaturday}</p>}
                  {contacts.hoursSunday && <p className="text-body-sm text-ink-muted">Вс: {contacts.hoursSunday}</p>}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
