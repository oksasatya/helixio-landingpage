import { useState, createContext, useContext } from 'react';
import type { ReactNode } from 'react';

export type BillingCycle = 'monthly' | 'sixMonths' | 'yearly';

interface PricingContextType {
  cycle: BillingCycle;
  setCycle: (c: BillingCycle) => void;
}

const PricingContext = createContext<PricingContextType>({
  cycle: 'monthly',
  setCycle: () => {},
});

export function usePricingCycle() {
  return useContext(PricingContext);
}

interface Props {
  labels: { monthly: string; sixMonths: string; yearly: string; save: string };
  children: ReactNode;
}

export default function PricingToggle({ labels, children }: Readonly<Props>) {
  const [cycle, setCycle] = useState<BillingCycle>('monthly');

  const buttons: { key: BillingCycle; label: string; badge?: string }[] = [
    { key: 'monthly', label: labels.monthly },
    { key: 'sixMonths', label: labels.sixMonths, badge: `${labels.save} 10%` },
    { key: 'yearly', label: labels.yearly, badge: `${labels.save} 20%` },
  ];

  return (
    <PricingContext.Provider value={{ cycle, setCycle }}>
      {/* Toggle */}
      <div className="flex justify-center mb-8 md:mb-12">
        <div className="inline-flex rounded-xl bg-card border border-border p-1 w-full sm:w-auto">
          {buttons.map((btn) => (
            <button
              key={btn.key}
              onClick={() => setCycle(btn.key)}
              className={`relative flex-1 sm:flex-none px-3 sm:px-6 py-2.5 rounded-lg text-xs sm:text-sm font-medium transition-all ${
                cycle === btn.key
                  ? 'bg-linear-to-r from-primary to-secondary text-white shadow-md'
                  : 'text-muted hover:text-foreground'
              }`}
            >
              {btn.label}
              {btn.badge && cycle !== btn.key && (
                <span className="absolute -top-2 -right-1 sm:-right-2 px-1.5 py-0.5 text-[9px] sm:text-[10px] font-bold rounded-full bg-success text-white whitespace-nowrap">
                  {btn.badge}
                </span>
              )}
            </button>
          ))}
        </div>
      </div>

      {children}
    </PricingContext.Provider>
  );
}
