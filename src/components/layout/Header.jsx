import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Sun, Moon, House, BriefcaseBusiness, Layers3, Info, PhoneCall } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext.jsx';
import Logo from '../ui/Logo.jsx';

const navLinks = [
  { href: '/pakety', label: 'Решения' },
  { href: '/kejsy', label: 'Кейсы' },
  { href: '/o-kompanii', label: 'О нас' },
  { href: '/kontakty', label: 'Контакты' },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const { theme, setTheme } = useTheme();
  const location = useLocation();
  const mobileNavLinks = [
    { href: '/', label: 'Главная', icon: House },
    { href: '/kejsy', label: 'Кейсы', icon: BriefcaseBusiness },
    { href: '/pakety', label: 'Решения', icon: Layers3 },
    { href: '/o-kompanii', label: 'О нас', icon: Info },
    { href: '/kontakty', label: 'Контакты', icon: PhoneCall },
  ];

  const isLinkActive = (href) => {
    if (href === '/') return location.pathname === '/';
    return location.pathname === href || location.pathname.startsWith(`${href}/`);
  };

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 32);
    window.addEventListener('scroll', handler, { passive: true });
    return () => window.removeEventListener('scroll', handler);
  }, []);

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled ? 'bg-bg/95 backdrop-blur-md border-b border-border' : 'bg-transparent'
        }`}
      >
        <div className="max-w-container mx-auto container-px">
          <div className="flex items-center justify-between h-16 md:h-18">
            <Link to="/" className="flex items-center group" aria-label="Remod — на главную">
              <Logo className="text-[1.35rem]" />
            </Link>

            <nav className="hidden md:flex items-center gap-1" aria-label="Основная навигация">
              {navLinks.map((link) => {
                const isActive = location.pathname === link.href;
                return (
                  <Link
                    key={link.href}
                    to={link.href}
                    className={`relative px-4 py-2 text-body-sm font-medium transition-colors duration-150 ${
                      isActive ? 'text-ink' : 'text-ink-muted hover:text-ink'
                    }`}
                  >
                    {link.label}
                    {isActive && (
                      <span className="absolute bottom-0 left-4 right-4 h-0.5 bg-accent header-tab-indicator rounded-full" />
                    )}
                  </Link>
                );
              })}
            </nav>

            <div className="hidden md:flex items-center gap-3">
              <button
                onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                className="p-2 text-ink-muted hover:text-ink rounded-md hover:bg-ink/5 transition-colors duration-150"
                aria-label="Переключить тему"
              >
                {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
              </button>
              <Link
                to="/ocenka"
                className="inline-flex items-center px-5 py-2.5 bg-accent text-black text-body-sm font-black rounded-pill hover:bg-accent-hover transition-colors duration-150 active:scale-[0.98]"
              >
                Оставить заявку
              </Link>
            </div>

            <div className="md:hidden flex items-center gap-1">
              <button
                onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                className="p-2 text-ink-muted hover:text-ink rounded-md hover:bg-ink/5 transition-colors"
                aria-label="Переключить тему"
              >
                {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
              </button>
            </div>
          </div>
        </div>
      </header>

      <nav
        className="md:hidden fixed bottom-0 left-0 right-0 z-50 border-t border-border bg-bg/80 backdrop-blur-md rounded-t-2xl pb-[env(safe-area-inset-bottom)]"
        aria-label="Мобильная навигация"
      >
        <div className="grid grid-cols-5">
          {mobileNavLinks.map(({ href, label, icon: Icon }) => {
            const isActive = isLinkActive(href);
            return (
              <Link
                key={href}
                to={href}
                className={`flex flex-col items-center justify-center gap-1 py-2.5 text-[11px] font-medium transition-colors ${
                  isActive ? 'text-accent' : 'text-ink-muted'
                }`}
              >
                <Icon size={18} strokeWidth={isActive ? 2.2 : 1.9} />
                <span>{label}</span>
              </Link>
            );
          })}
        </div>
      </nav>
    </>
  );
}
