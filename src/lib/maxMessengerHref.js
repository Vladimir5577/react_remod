/** Default when ссылка не задана или в БД лежит только телефон (как раньше для WhatsApp). */
export const DEFAULT_MAX_MESSENGER_URL = 'https://max.ru/';

/**
 * @param {string | null | undefined} raw — полный URL, путь (@bot, u/…) или устаревший только номер
 * @returns {string}
 */
export function maxMessengerHref(raw) {
  const s = (raw ?? '').trim();
  if (!s) return DEFAULT_MAX_MESSENGER_URL;
  if (/^https?:\/\//i.test(s)) return s;
  const compact = s.replace(/\s+/g, '');
  if (/^\+?\d[\d\s()-]{8,}$/.test(compact)) return DEFAULT_MAX_MESSENGER_URL;
  let path = s.replace(/^\/+/, '');
  if (/^max\.ru\/?/i.test(path)) return `https://${path}`;
  return `https://max.ru/${path}`;
}
