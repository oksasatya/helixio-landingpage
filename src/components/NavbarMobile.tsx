import { useState, useEffect } from 'react';

interface NavLink {
  label: string;
  href: string;
  active?: boolean;
}

interface Props {
  links: NavLink[];
  ctaLabel: string;
  ctaHref: string;
}

export default function NavbarMobile({ links, ctaLabel, ctaHref }: Props) {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  return (
    <>
      {/* Hamburger / Close */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="relative w-9 h-9 flex items-center justify-center rounded-full text-white/80 hover:text-white transition-colors"
        aria-label="Toggle menu"
        aria-expanded={isOpen}
      >
        <i className={`fas ${isOpen ? 'fa-times' : 'fa-bars'} text-base`} />
      </button>

      {/* Backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[99]"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Expanded Dynamic Island Menu */}
      <div
        className={`fixed top-3 left-3 right-3 z-[100] transition-all duration-500 ease-[cubic-bezier(0.4,0,0.2,1)] ${
          isOpen
            ? 'opacity-100 pointer-events-auto'
            : 'opacity-0 pointer-events-none'
        }`}
        style={{
          background: 'rgba(10, 10, 15, 0.95)',
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
          border: '1px solid rgba(255, 255, 255, 0.08)',
          borderRadius: isOpen ? '24px' : '9999px',
          boxShadow: '0 8px 40px rgba(0, 0, 0, 0.5)',
          maxWidth: '400px',
          margin: '0 auto',
          transform: isOpen ? 'scale(1)' : 'scale(0.9)',
          transformOrigin: 'top right',
        }}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-5 pt-5 pb-3">
          <img
            src="https://cdn.helixio.id/assets/img/public/logo.png"
            alt="Helixio"
            className="h-6 w-auto"
          />
          <button
            onClick={() => setIsOpen(false)}
            className="w-8 h-8 flex items-center justify-center rounded-full bg-white/10 text-white/80 hover:text-white transition-colors"
            aria-label="Close menu"
          >
            <i className="fas fa-times text-sm" />
          </button>
        </div>

        {/* Nav Links */}
        <div className="px-5 py-4 space-y-1">
          {links.map((link, i) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setIsOpen(false)}
              className={`block py-3 px-4 rounded-xl text-base font-medium transition-all ${
                link.active
                  ? 'text-white bg-white/5'
                  : 'text-white/60 hover:text-white hover:bg-white/5'
              }`}
              style={{
                transitionDelay: isOpen ? `${(i + 1) * 50}ms` : '0ms',
              }}
            >
              <span className="flex items-center gap-3">
                {link.active && (
                  <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-primary)]" />
                )}
                {link.label}
              </span>
            </a>
          ))}
        </div>

        {/* CTA */}
        <div className="px-5 pb-5">
          <a
            href={ctaHref}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary w-full text-center justify-center !rounded-xl !text-sm"
          >
            <i className="fas fa-rocket" />
            {ctaLabel}
          </a>
        </div>
      </div>
    </>
  );
}
