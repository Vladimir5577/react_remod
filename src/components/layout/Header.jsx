import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Sun, Moon } from 'lucide-react';
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
  const [open, setOpen] = useState(false);
  const { theme, setTheme } = useTheme();
  const location = useLocation();

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 32);
    window.addEventListener('scroll', handler, { passive: true });
    return () => window.removeEventListener('scroll', handler);
  }, []);

  return (
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
              Узнать стоимость
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
            <button
              className="p-2 text-ink rounded-md hover:bg-ink/5 transition-colors"
              onClick={() => setOpen(!open)}
              aria-label={open ? 'Закрыть меню' : 'Открыть меню'}
            >
              {open ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </div>

      {open && (
        <div className="md:hidden bg-bg-secondary border-t border-border">
          <nav className="max-w-container mx-auto container-px py-4 flex flex-col gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                to={link.href}
                onClick={() => setOpen(false)}
                className="px-4 py-3 text-body font-medium text-ink-muted hover:text-ink hover:bg-ink/5 rounded-md transition-colors"
              >
                {link.label}
              </Link>
            ))}
            <div className="pt-3 border-t border-border mt-2">
              <Link
                to="/ocenka"
                onClick={() => setOpen(false)}
                className="flex items-center justify-center w-full px-5 py-3 bg-accent text-black text-body-sm font-black rounded-pill hover:bg-accent-hover transition-colors"
              >
                Узнать стоимость за 10 минут
              </Link>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
