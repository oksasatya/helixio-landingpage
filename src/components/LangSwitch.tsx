interface Props {
  pathname: string;
}

export default function LangSwitch({ pathname }: Props) {
  const isEn = pathname.startsWith('/en');
  const currentLocale = isEn ? 'en' : 'id';

  const cleanPath = pathname.replace(/^\/en/, '') || '/';
  const targetPath = currentLocale === 'id'
    ? `/en${cleanPath === '/' ? '' : cleanPath}`
    : cleanPath;

  return (
    <div className="flag-toggle">
      {currentLocale === 'id' ? (
        <>
          <span className="flag-toggle-btn flag-toggle-btn--active">
            <span className="text-sm leading-none">🇮🇩</span>
          </span>
          <a href={targetPath} className="flag-toggle-btn" title="Switch to English">
            <span className="text-sm leading-none">🇬🇧</span>
          </a>
        </>
      ) : (
        <>
          <a href={targetPath} className="flag-toggle-btn" title="Ganti ke Bahasa Indonesia">
            <span className="text-sm leading-none">🇮🇩</span>
          </a>
          <span className="flag-toggle-btn flag-toggle-btn--active">
            <span className="text-sm leading-none">🇬🇧</span>
          </span>
        </>
      )}
    </div>
  );
}
