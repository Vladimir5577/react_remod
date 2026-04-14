import { Link } from 'react-router-dom';
import Logo from '../ui/Logo.jsx';
import { MaxMessengerIcon } from '../ui/MaxMessengerIcon.jsx';
import { DEFAULT_MAX_MESSENGER_URL } from '../../lib/maxMessengerHref.js';

const links = {
  услуги: [
    { href: '/pakety', label: 'Пакеты отделки' },
    { href: '/pakety', label: 'White Box' },
    { href: '/pakety', label: 'Белый пакет' },
    { href: '/pakety', label: 'Серый пакет' },
  ],
  компания: [
    { href: '/o-kompanii', label: 'О нас' },
    { href: '/kejsy', label: 'Кейсы' },
    { href: '/kontakty', label: 'Контакты' },
  ],
  клиентам: [
    { href: '/ocenka', label: 'Оставить заявку' },
    { href: '/o-kompanii', label: 'Гарантии' },
    { href: '/o-kompanii', label: 'Как мы работаем' },
    { href: '/politika', label: 'Политика конфиденциальности' },
  ],
};

const messengers = [
  { href: DEFAULT_MAX_MESSENGER_URL, label: 'Max', kind: 'max' },
  { href: 'https://t.me/remodpro', label: 'Telegram', kind: 'tg' },
];

export default function Footer() {
  return (
    <footer className="bg-bg-secondary text-ink">
      <div className="max-w-container mx-auto container-px">
        <div className="py-14 grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12 border-b border-border">
          <div className="col-span-2 md:col-span-1">
            <Link to="/" className="inline-flex items-center mb-4">
              <Logo className="text-[1.25rem]" />
            </Link>
            <p className="text-body-sm text-ink-muted max-w-[220px] leading-relaxed">
              Ремонт под ключ за 90 дней. Цена — в договоре.
            </p>
            <div className="flex gap-3 mt-5">
              {messengers.map((m) => (
                <a
                  key={m.label}
                  href={m.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={m.label}
                  className="w-9 h-9 rounded-md bg-bg-tertiary border border-border hover:border-accent hover:text-accent flex items-center justify-center text-caption font-bold transition-colors"
                >
                  {m.kind === 'max' ? <MaxMessengerIcon className="text-current" size={17} /> : 'TG'}
                </a>
              ))}
            </div>
          </div>

          <div>
            <p className="text-label font-semibold text-accent uppercase mb-4 tracking-widest">Услуги</p>
            <ul className="flex flex-col gap-2.5">
              {links.услуги.map((l) => (
                <li key={l.label}>
                  <Link to={l.href} className="text-body-sm text-ink-muted hover:text-ink transition-colors">{l.label}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="text-label font-semibold text-accent uppercase mb-4 tracking-widest">Компания</p>
            <ul className="flex flex-col gap-2.5">
              {links.компания.map((l) => (
                <li key={l.label}>
                  <Link to={l.href} className="text-body-sm text-ink-muted hover:text-ink transition-colors">{l.label}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="text-label font-semibold text-accent uppercase mb-4 tracking-widest">Клиентам</p>
            <ul className="flex flex-col gap-2.5">
              {links.клиентам.map((l) => (
                <li key={l.label}>
                  <Link to={l.href} className="text-body-sm text-ink-muted hover:text-ink transition-colors">{l.label}</Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="py-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <p className="text-caption text-ink-faint">© {new Date().getFullYear()} Remod. Все права защищены.</p>
          <p className="text-caption text-ink-faint">ИП Иванов И.И. · ОГРНИП 123456789012345</p>
        </div>
      </div>
    </footer>
  );
}
