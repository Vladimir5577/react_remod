/** Приводит поле пакета (json-массив, объект с числовыми ключами, строка) к массиву непустых строк. */
export function normalizePackageList(value) {
  if (value == null) return [];
  if (Array.isArray(value)) {
    return value.map((v) => (v == null ? '' : String(v)).trim()).filter(Boolean);
  }
  if (typeof value === 'string') {
    const t = value.trim();
    if (!t) return [];
    if (
      (t.startsWith('[') && t.endsWith(']')) ||
      (t.startsWith('{') && t.endsWith('}'))
    ) {
      try {
        return normalizePackageList(JSON.parse(t));
      } catch {
        return [t];
      }
    }
    return [t];
  }
  if (typeof value === 'object') {
    return Object.values(value)
      .map((v) => (v == null ? '' : String(v)).trim())
      .filter(Boolean);
  }
  return [];
}

/** Список для галочек: «Что входит», иначе «Для кого» (если первое пусто в админке). */
export function packageIncludesList(pkg) {
  const inc = normalizePackageList(pkg?.includes);
  if (inc.length > 0) return inc;
  return normalizePackageList(pkg?.forWho);
}

export function packageLevelsList(pkg) {
  if (pkg?.levels == null) return [];
  return normalizePackageList(pkg.levels);
}
