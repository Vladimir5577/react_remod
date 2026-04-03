import { Link } from 'react-router-dom';
import { Phone, MessageCircle, MapPin, Clock, ArrowRight } from 'lucide-react';
import { useEffect, useMemo, useState } from 'react';
import { api } from '../lib/api.js';

export default function KontaktyPage() {
  const [contacts, setContacts] = useState(null);

  useEffect(() => {
    // Удаляем предыдущий скрипт если есть
    const existingScript = document.querySelector('script[src*="api-maps.yandex.ru"]');
    if (existingScript) existingScript.remove();

    const script = document.createElement('script');
    script.src = 'https://api-maps.yandex.ru/services/constructor/1.0/js/?um=constructor%3Aedb06e2411d6fb1faaf1aedff5216b9b0e050d37c54eec41bf449811b508eb8c&amp;width=100%25&amp;height=100%25&amp;lang=ru_RU&amp;scroll=true';
    script.async = true;
    document.getElementById('yandex-map-container')?.appendChild(script);

    return () => {
      script.remove();
    };
  }, []);

  useEffect(() => {
    api.getContacts().then(setContacts).catch(console.error);
  }, []);

  const messengers = useMemo(() => {
    const whatsappHref = contacts?.whatsapp
      ? contacts.whatsapp.startsWith('http')
        ? contacts.whatsapp
        : `https://wa.me/${contacts.whatsapp.replace(/\D/g, '')}`
      : 'https://wa.me/79991234567';

    const telegramHref = contacts?.telegram
      ? contacts.telegram.startsWith('http')
        ? contacts.telegram
        : `https://t.me/${contacts.telegram.replace('@', '')}`
      : 'https://t.me/remodpro';

    const phoneLabel = contacts?.phone || '+7 (999) 123-45-67';
    const phoneHref = `tel:${phoneLabel.replace(/\s/g, '')}`;

    return [
      {
        label: 'WhatsApp',
        sub: 'Ответим в течение 15 минут',
        href: whatsappHref,
        icon: MessageCircle,
        bg: 'bg-whatsapp-bg border-whatsapp/30 hover:bg-whatsapp hover:border-whatsapp',
        iconColor: 'text-whatsapp',
      },
      {
        label: 'Telegram',
        sub: contacts?.telegram || '@remodpro',
        href: telegramHref,
        icon: MessageCircle,
        bg: 'bg-telegram-bg border-telegram/30 hover:bg-telegram hover:border-telegram',
        iconColor: 'text-telegram',
      },
      {
        label: phoneLabel,
        sub: 'Позвонить менеджеру',
        href: phoneHref,
        icon: Phone,
        bg: 'bg-bg-secondary border-border hover:bg-accent-light',
        iconColor: 'text-ink',
      },
    ];
  }, [contacts]);

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
                <a key={m.label} href={m.href} target={m.href.startsWith('http') ? '_blank' : undefined} rel={m.href.startsWith('http') ? 'noopener noreferrer' : undefined} className={`flex items-center gap-4 p-4 rounded-xl border transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg ${m.bg}`}>
                  <div className={`w-10 h-10 rounded-lg border flex items-center justify-center flex-shrink-0 transition-colors duration-300 ${m.bg.includes('whatsapp') ? 'bg-white border-whatsapp/30 group-hover:bg-whatsapp' : m.bg.includes('telegram') ? 'bg-white border-telegram/30 group-hover:bg-telegram' : 'bg-bg-secondary border-border'}`}><Icon size={18} className={m.iconColor} /></div>
                  <div><p className="text-body font-semibold text-ink">{m.label}</p><p className="text-body-sm text-ink-muted">{m.sub}</p></div>
                </a>
              ); })}
            </div>
            <div className="p-6 rounded-xl bg-bg-secondary border border-border">
              <h3 className="text-body font-bold text-ink mb-2">Хотите быструю оценку?</h3>
              <p className="text-body-sm text-ink-muted mb-4">Пройдите короткий опрос — менеджер перезвонит с предварительной стоимостью.</p>
              <Link to="/ocenka" className="inline-flex items-center gap-2 px-5 py-2.5 bg-accent text-black text-body-sm font-semibold rounded-pill hover:bg-accent-hover transition-colors group">
                Получить оценку <ArrowRight size={14} className="group-hover:translate-x-0.5 transition-transform" />
              </Link>
            </div>
          </div>

          <div className="flex flex-col gap-6">
            <div className="rounded-xl border border-border bg-bg-secondary aspect-[4/3] overflow-hidden">
              <div id="yandex-map-container" style={{width: '100%', height: '100%'}}></div>
            </div>
            <div className="flex items-start gap-3 p-5 rounded-xl border border-border bg-bg-secondary">
              <div className="w-9 h-9 rounded-md bg-bg border border-border flex items-center justify-center flex-shrink-0 mt-0.5"><Clock size={16} className="text-ink-muted" /></div>
              <div>
                <p className="text-body font-semibold text-ink mb-1">Режим работы</p>
                <p className="text-body-sm text-ink-muted">Пн–Пт: {contacts?.hoursWeekday || '9:00-20:00'}</p>
                <p className="text-body-sm text-ink-muted">Сб: {contacts?.hoursSaturday || '10:00-18:00'}</p>
                <p className="text-body-sm text-ink-muted">Вс: {contacts?.hoursSunday || 'по договоренности'}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
