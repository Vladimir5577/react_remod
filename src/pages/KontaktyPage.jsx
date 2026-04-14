import { Link } from 'react-router-dom';
import { Phone, MessageCircle, MapPin, Clock, ArrowRight } from 'lucide-react';
import { useEffect, useMemo, useState } from 'react';
import { api } from '../lib/api.js';
import { maxMessengerHref } from '../lib/maxMessengerHref.js';
import { MaxMessengerIcon } from '../components/ui/MaxMessengerIcon.jsx';

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
    const maxHref = maxMessengerHref(contacts?.max);

    const telegramHref = contacts?.telegram
      ? contacts.telegram.startsWith('http')
        ? contacts.telegram
        : `https://t.me/${contacts.telegram.replace('@', '')}`
      : 'https://t.me/remodpro';

    const phoneLabel = contacts?.phone || '+7 (999) 123-45-67';
    const phoneHref = `tel:${phoneLabel.replace(/\s/g, '')}`;

    return [
      {
        label: 'Max',
        sub: 'Ответим в течение 15 минут',
        href: maxHref,
        icon: MaxMessengerIcon,
        bg: 'bg-max-bg border-max/30 hover:bg-max hover:border-max',
        iconColor: 'text-max',
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
          <p className="text-body-lg text-ink-muted max-w-prose">Ответим на вопросы по срокам и объёму работ. Детальную смету подготовим после бесплатного замера.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
          <div>
            <p className="text-label font-semibold text-ink-muted uppercase tracking-widest mb-5">Мессенджеры и телефон</p>
            <div className="flex flex-col gap-3 mb-10">
              {messengers.map((m) => { const Icon = m.icon; return (
                <a key={m.label} href={m.href} target={m.href.startsWith('http') ? '_blank' : undefined} rel={m.href.startsWith('http') ? 'noopener noreferrer' : undefined} className={`flex items-center gap-4 p-4 rounded-xl border transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg ${m.bg}`}>
                  <div className={`w-10 h-10 rounded-lg border flex items-center justify-center flex-shrink-0 transition-colors duration-300 ${m.bg.includes('max-bg') ? 'bg-white border-max/30 group-hover:bg-max' : m.bg.includes('telegram') ? 'bg-white border-telegram/30 group-hover:bg-telegram' : 'bg-bg-secondary border-border'}`}><Icon size={18} className={m.iconColor} /></div>
                  <div><p className="text-body font-semibold text-ink">{m.label}</p><p className="text-body-sm text-ink-muted">{m.sub}</p></div>
                </a>
              ); })}
            </div>
            <div className="p-6 rounded-xl bg-bg-secondary border border-border">
              <h3 className="text-body font-bold text-ink mb-2">Нужна смета?</h3>
              <p className="text-body-sm text-ink-muted mb-4">Пройдите короткий опрос — менеджер свяжется с вами, уточнит детали и вышлет детальную смету удобным способом.</p>
              <Link to="/ocenka" className="inline-flex items-center gap-2 px-5 py-2.5 bg-accent text-black text-body-sm font-semibold rounded-pill hover:bg-accent-hover transition-colors group">
                Оставить заявку <ArrowRight size={14} className="group-hover:translate-x-0.5 transition-transform" />
              </Link>
            </div>
          </div>

          <div className="flex flex-col gap-6">
            <div className="rounded-xl border border-border bg-bg-secondary aspect-[4/3] overflow-hidden">
              <div id="yandex-map-container" style={{width: '100%', height: '100%'}}></div>
            </div>
            <div className="flex flex-col p-5 rounded-xl border border-border bg-bg-secondary">
              {contacts && (contacts.city || contacts.address) ? (
                <div className="flex items-start gap-3 pb-5 mb-5 border-b border-border">
                  <div className="w-9 h-9 rounded-md bg-bg border border-border flex items-center justify-center flex-shrink-0 mt-0.5">
                    <MapPin size={16} className="text-ink-muted" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-body font-semibold text-ink mb-1">Адрес</p>
                    {contacts.city ? <p className="text-body-sm text-ink-muted">{contacts.city}</p> : null}
                    {contacts.address ? <p className="text-body-sm text-ink-muted">{contacts.address}</p> : null}
                  </div>
                </div>
              ) : null}
              <div className="flex items-start gap-3">
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
    </div>
  );
}
