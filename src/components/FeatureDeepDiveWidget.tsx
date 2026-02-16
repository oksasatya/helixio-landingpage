import { useEffect, useRef, useState } from 'react';

interface DeepDiveFeature {
  icon: string;
  name: string;
  highlights: string[];
  badge?: string;
  limits?: { plan: string; value: string }[];
  accent: string;
}

interface Props {
  features: DeepDiveFeature[];
}

export default function FeatureDeepDiveWidget({ features }: Props) {
  const containerRef = useRef<HTMLDivElement>(null);
  const panelsRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    const checkDesktop = () => setIsDesktop(window.innerWidth >= 1024);
    checkDesktop();
    window.addEventListener('resize', checkDesktop);
    return () => window.removeEventListener('resize', checkDesktop);
  }, []);

  useEffect(() => {
    if (!isDesktop) return;

    let gsapInstance: typeof import('gsap').gsap;
    let ScrollTriggerPlugin: typeof import('gsap/ScrollTrigger').ScrollTrigger;
    let ctx: ReturnType<typeof import('gsap').gsap.context>;

    const initGSAP = async () => {
      const gsapModule = await import('gsap');
      const stModule = await import('gsap/ScrollTrigger');
      gsapInstance = gsapModule.gsap;
      ScrollTriggerPlugin = stModule.ScrollTrigger;
      gsapInstance.registerPlugin(ScrollTriggerPlugin);

      if (!containerRef.current || !panelsRef.current) return;

      ctx = gsapInstance.context(() => {
        const panels = panelsRef.current!.querySelectorAll('.dd-panel');
        const totalPanels = panels.length;

        const tl = gsapInstance.timeline({
          scrollTrigger: {
            trigger: containerRef.current!,
            pin: true,
            start: 'top top',
            end: `+=${totalPanels * 100}%`,
            scrub: 1,
            snap: {
              snapTo: 1 / (totalPanels - 1),
              duration: { min: 0.2, max: 0.6 },
              delay: 0.1,
              ease: 'power2.inOut',
            },
            onUpdate: (self) => {
              const progress = self.progress;
              const idx = Math.round(progress * (totalPanels - 1));
              setActiveIndex(idx);
            },
          },
        });

        panels.forEach((panel, i) => {
          const content = panel.querySelector('.dd-content');
          const visual = panel.querySelector('.dd-visual');
          const items = panel.querySelectorAll('.dd-highlight');
          const badge = panel.querySelector('.dd-badge');
          const limitsBox = panel.querySelector('.dd-limits');

          if (i === 0) {
            // First panel starts visible
            gsapInstance.set(panel, { opacity: 1, visibility: 'visible' });
            gsapInstance.set(content, { x: 0, opacity: 1 });
            gsapInstance.set(visual, { x: 0, opacity: 1, scale: 1 });
            gsapInstance.set(items, { y: 0, opacity: 1 });
            if (badge) gsapInstance.set(badge, { scale: 1, opacity: 1 });
            if (limitsBox) gsapInstance.set(limitsBox, { y: 0, opacity: 1 });
          } else {
            gsapInstance.set(panel, { opacity: 0, visibility: 'hidden' });
            gsapInstance.set(content, { x: 60, opacity: 0 });
            gsapInstance.set(visual, { x: -60, opacity: 0, scale: 0.92 });
            gsapInstance.set(items, { y: 20, opacity: 0 });
            if (badge) gsapInstance.set(badge, { scale: 0.8, opacity: 0 });
            if (limitsBox) gsapInstance.set(limitsBox, { y: 30, opacity: 0 });
          }

          if (i > 0) {
            // Fade out previous panel
            const prevPanel = panels[i - 1];
            const prevContent = prevPanel.querySelector('.dd-content');
            const prevVisual = prevPanel.querySelector('.dd-visual');

            tl.to(prevContent, { x: -60, opacity: 0, duration: 0.3, ease: 'power2.in' }, `panel${i}`)
              .to(prevVisual, { x: 60, opacity: 0, scale: 0.92, duration: 0.3, ease: 'power2.in' }, `panel${i}`)
              .to(prevPanel, { opacity: 0, visibility: 'hidden', duration: 0.1 }, `panel${i}+=0.25`);

            // Fade in current panel
            tl.to(panel, { opacity: 1, visibility: 'visible', duration: 0.1 }, `panel${i}+=0.3`)
              .to(visual, { x: 0, opacity: 1, scale: 1, duration: 0.4, ease: 'power2.out' }, `panel${i}+=0.35`)
              .to(content, { x: 0, opacity: 1, duration: 0.4, ease: 'power2.out' }, `panel${i}+=0.4`)
              .to(items, { y: 0, opacity: 1, duration: 0.25, stagger: 0.06, ease: 'power2.out' }, `panel${i}+=0.5`);

            if (badge) {
              tl.to(badge, { scale: 1, opacity: 1, duration: 0.3, ease: 'back.out(1.7)' }, `panel${i}+=0.55`);
            }
            if (limitsBox) {
              tl.to(limitsBox, { y: 0, opacity: 1, duration: 0.3, ease: 'power2.out' }, `panel${i}+=0.6`);
            }
          }
        });
      }, containerRef);
    };

    initGSAP();

    return () => {
      if (ctx) ctx.revert();
    };
  }, [isDesktop, features.length]);

  const scrollToPanel = (index: number) => {
    if (!containerRef.current) return;
    const st = (window as any).__gsapST;
    if (!st) return;
  };

  return (
    <div ref={containerRef} className="relative">
      {/* Background decorations */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#FD8406]/[0.02] to-transparent pointer-events-none" aria-hidden="true" />
      <div className="absolute left-1/2 top-0 bottom-0 w-px pointer-events-none hidden lg:block" aria-hidden="true"
        style={{ backgroundImage: 'linear-gradient(to bottom, transparent, rgba(253,132,6,0.1) 20%, rgba(253,219,18,0.1) 80%, transparent)' }} />

      {/* Desktop: Pinned panels */}
      {isDesktop ? (
        <div className="h-screen flex items-center justify-center">
          {/* Side navigation dots */}
          <div className="fixed right-6 xl:right-10 top-1/2 -translate-y-1/2 z-50 flex flex-col items-center gap-3"
            style={{ pointerEvents: 'auto' }}>
            <div className="deep-dive-progress h-24 rounded-full">
              <div className="deep-dive-progress-fill rounded-full"
                style={{ height: `${((activeIndex + 1) / features.length) * 100}%` }} />
            </div>
            {features.map((f, i) => (
              <button
                key={i}
                className={`deep-dive-dot ${i === activeIndex ? 'active' : ''}`}
                aria-label={f.name}
                title={f.name}
              />
            ))}
          </div>

          {/* Panel container */}
          <div ref={panelsRef} className="relative w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-16"
            style={{ minHeight: '70vh' }}>
            {features.map((feature, i) => (
              <div key={i} className="dd-panel absolute inset-0 flex items-center">
                <div className="grid grid-cols-2 gap-12 lg:gap-16 items-center w-full">
                  {/* Visual */}
                  <div className={`dd-visual ${i % 2 !== 0 ? 'order-2' : ''}`}>
                    <div className="rounded-2xl overflow-hidden border border-[#1F1F2E] shadow-2xl relative group">
                      {/* Accent glow */}
                      <div className="absolute -inset-1 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl"
                        style={{ background: `radial-gradient(circle, ${feature.accent}15, transparent)` }} />
                      <div className="aspect-[4/3] bg-gradient-to-br from-[#111118] to-[#1F1F2E] flex items-center justify-center relative overflow-hidden">
                        {/* Decorative grid inside */}
                        <div className="absolute inset-0 opacity-[0.03]"
                          style={{ backgroundImage: `linear-gradient(${feature.accent}40 1px, transparent 1px), linear-gradient(90deg, ${feature.accent}40 1px, transparent 1px)`, backgroundSize: '32px 32px' }} />
                        {/* Large icon */}
                        <div className="relative z-10 text-center">
                          <div className="w-20 h-20 rounded-2xl mx-auto mb-4 flex items-center justify-center"
                            style={{ background: `linear-gradient(135deg, ${feature.accent}20, ${feature.accent}08)` }}>
                            <i className={`${feature.icon} text-4xl`} style={{ color: feature.accent }} />
                          </div>
                          <p className="text-[#9CA3AF] text-xs tracking-widest uppercase">Screenshot</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Content */}
                  <div className={`dd-content ${i % 2 !== 0 ? 'order-1' : ''}`}>
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-11 h-11 rounded-xl flex items-center justify-center shrink-0"
                        style={{ background: `linear-gradient(135deg, ${feature.accent}18, ${feature.accent}08)` }}>
                        <i className={`${feature.icon} text-lg`} style={{ color: feature.accent }} />
                      </div>
                      <h3 className="text-2xl lg:text-3xl font-bold text-[#F5F5F7]" style={{ fontFamily: 'var(--font-heading)' }}>
                        {feature.name}
                      </h3>
                    </div>

                    {feature.badge && (
                      <span className="dd-badge inline-block px-3 py-1 text-xs font-semibold rounded-full text-white mb-5"
                        style={{ background: `linear-gradient(135deg, ${feature.accent}, ${feature.accent}CC)` }}>
                        {feature.badge}
                      </span>
                    )}

                    <ul className="space-y-3 mb-6">
                      {feature.highlights.map((h, hi) => (
                        <li key={hi} className="dd-highlight flex items-center gap-3 text-[#F5F5F7]">
                          <span className="w-6 h-6 rounded-full flex items-center justify-center shrink-0"
                            style={{ background: `${feature.accent}15` }}>
                            <i className="fas fa-check text-xs" style={{ color: feature.accent }} />
                          </span>
                          <span className="text-base">{h}</span>
                        </li>
                      ))}
                    </ul>

                    {feature.limits && (
                      <div className="dd-limits rounded-xl bg-[#111118]/80 border border-[#1F1F2E] p-4 backdrop-blur-sm">
                        <div className="grid grid-cols-4 gap-3 text-center">
                          {feature.limits.map((limit, li) => (
                            <div key={li}>
                              <p className="text-xs text-[#9CA3AF] mb-1">{limit.plan}</p>
                              <p className="text-sm font-semibold text-[#F5F5F7]">{limit.value}</p>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        /* Mobile: Simple scroll-triggered reveal per panel */
        <div className="space-y-0">
          {features.map((feature, i) => (
            <MobilePanel key={i} feature={feature} index={i} />
          ))}
        </div>
      )}
    </div>
  );
}

function MobilePanel({ feature, index }: { feature: DeepDiveFeature; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!ref.current) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.15, rootMargin: '0px 0px -30px 0px' }
    );
    observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref} className="py-12 md:py-16 px-4 sm:px-6 max-w-7xl mx-auto">
      <div
        className="transition-all duration-700 ease-out"
        style={{
          opacity: visible ? 1 : 0,
          transform: visible ? 'translateY(0)' : 'translateY(40px)',
        }}
      >
        {/* Visual */}
        <div className="rounded-xl overflow-hidden border border-[#1F1F2E] shadow-lg mb-6">
          <div className="aspect-[4/3] bg-gradient-to-br from-[#111118] to-[#1F1F2E] flex items-center justify-center relative overflow-hidden">
            <div className="absolute inset-0 opacity-[0.03]"
              style={{ backgroundImage: `linear-gradient(${feature.accent}40 1px, transparent 1px), linear-gradient(90deg, ${feature.accent}40 1px, transparent 1px)`, backgroundSize: '32px 32px' }} />
            <div className="relative z-10 text-center">
              <div className="w-16 h-16 rounded-xl mx-auto mb-3 flex items-center justify-center"
                style={{ background: `linear-gradient(135deg, ${feature.accent}20, ${feature.accent}08)` }}>
                <i className={`${feature.icon} text-3xl`} style={{ color: feature.accent }} />
              </div>
              <p className="text-[#9CA3AF] text-xs tracking-widest uppercase">Screenshot</p>
            </div>
          </div>
        </div>

        {/* Content */}
        <div>
          <div className="flex items-center gap-3 mb-3">
            <div className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0"
              style={{ background: `linear-gradient(135deg, ${feature.accent}18, ${feature.accent}08)` }}>
              <i className={`${feature.icon} text-base`} style={{ color: feature.accent }} />
            </div>
            <h3 className="text-xl font-bold text-[#F5F5F7]" style={{ fontFamily: 'var(--font-heading)' }}>
              {feature.name}
            </h3>
          </div>

          {feature.badge && (
            <span className="inline-block px-3 py-1 text-xs font-semibold rounded-full text-white mb-4"
              style={{ background: `linear-gradient(135deg, ${feature.accent}, ${feature.accent}CC)` }}>
              {feature.badge}
            </span>
          )}

          <ul className="space-y-3 mb-5">
            {feature.highlights.map((h, hi) => (
              <li key={hi} className="flex items-center gap-3 text-[#F5F5F7]"
                style={{
                  opacity: visible ? 1 : 0,
                  transform: visible ? 'translateY(0)' : 'translateY(12px)',
                  transition: `all 0.5s ease-out ${0.3 + hi * 0.1}s`,
                }}>
                <span className="w-6 h-6 rounded-full flex items-center justify-center shrink-0"
                  style={{ background: `${feature.accent}15` }}>
                  <i className="fas fa-check text-xs" style={{ color: feature.accent }} />
                </span>
                <span className="text-sm">{h}</span>
              </li>
            ))}
          </ul>

          {feature.limits && (
            <div className="rounded-xl bg-[#111118]/80 border border-[#1F1F2E] p-4"
              style={{
                opacity: visible ? 1 : 0,
                transform: visible ? 'translateY(0)' : 'translateY(16px)',
                transition: 'all 0.5s ease-out 0.7s',
              }}>
              <div className="grid grid-cols-2 gap-3 text-center">
                {feature.limits.map((limit, li) => (
                  <div key={li}>
                    <p className="text-xs text-[#9CA3AF] mb-1">{limit.plan}</p>
                    <p className="text-sm font-semibold text-[#F5F5F7]">{limit.value}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
