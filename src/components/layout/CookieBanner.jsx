import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const STORAGE_KEY = 'cookie_consent';

export default function CookieBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    try {
      if (!localStorage.getItem(STORAGE_KEY)) setVisible(true);
    } catch {}
  }, []);

  function accept() {
    try { localStorage.setItem(STORAGE_KEY, '1'); } catch {}
    setVisible(false);
  }

  if (!visible) return null;

  return (
    <div
      role="dialog"
      aria-label="Уведомление об использовании cookie"
      className="fixed bottom-4 left-4 right-4 z-50 md:left-auto md:right-6 md:max-w-sm"
    >
      <div className="flex flex-col gap-3 p-5 rounded-xl border border-border bg-bg shadow-elevated">
        <p className="text-body-sm text-ink-muted leading-relaxed">
          Мы используем файлы cookie для улучшения работы сайта. Подробнее —{' '}
          <Link to="/politika" className="text-ink underline hover:text-ink-muted transition-colors">
            политика конфиденциальности
          </Link>
          .
        </p>
        <button
          onClick={accept}
          className="w-full py-2.5 bg-accent text-black text-body-sm font-black rounded-lg hover:bg-accent-hover transition-colors"
        >
          Принять
        </button>
      </div>
    </div>
  );
}
