import idTranslations from './id.json';
import enTranslations from './en.json';

export type Locale = 'id' | 'en';

const translations: Record<Locale, Record<string, unknown>> = {
  id: idTranslations as Record<string, unknown>,
  en: enTranslations as Record<string, unknown>,
};

export function getLocale(pathname: string): Locale {
  return pathname.startsWith('/en') ? 'en' : 'id';
}

export function getLocalizedPath(path: string, locale: Locale): string {
  const cleanPath = path.replace(/^\/en/, '') || '/';
  return locale === 'en' ? `/en${cleanPath === '/' ? '' : cleanPath}` : cleanPath;
}

export function getAlternatePath(pathname: string): string {
  const locale = getLocale(pathname);
  const targetLocale: Locale = locale === 'id' ? 'en' : 'id';
  return getLocalizedPath(pathname, targetLocale);
}

function getNestedValue(obj: Record<string, unknown>, path: string): unknown {
  return path.split('.').reduce<unknown>((acc, key) => {
    if (acc && typeof acc === 'object' && key in (acc as Record<string, unknown>)) {
      return (acc as Record<string, unknown>)[key];
    }
    return undefined;
  }, obj);
}

export function t(key: string, locale: Locale): string {
  const value = getNestedValue(translations[locale], key);
  if (typeof value === 'string') return value;
  return key;
}

export function tArray(key: string, locale: Locale): Array<Record<string, string>> {
  const value = getNestedValue(translations[locale], key);
  if (Array.isArray(value)) return value as Array<Record<string, string>>;
  return [];
}

export function tNumber(key: string, locale: Locale): number {
  const value = getNestedValue(translations[locale], key);
  if (typeof value === 'number') return value;
  return 0;
}

export function formatPrice(amount: number): string {
  return new Intl.NumberFormat('id-ID').format(amount);
}
