import { useState } from 'react';

type BillingCycle = 'monthly' | 'sixMonths' | 'yearly';

interface PlanFeature {
  label: string;
  included: boolean;
  value?: string;
}

interface Plan {
  name: string;
  description: string;
  priceMonthly: number;
  priceSixMonths: number;
  priceYearly: number;
  isFree?: boolean;
  isPopular?: boolean;
  features: PlanFeature[];
  ctaLabel: string;
  ctaHref: string;
  icon?: string;
}

interface Props {
  plans: Plan[];
  labels: {
    monthly: string;
    sixMonths: string;
    yearly: string;
    save: string;
    perMonth: string;
    forever: string;
    popular: string;
  };
}

function formatPrice(amount: number): string {
  return new Intl.NumberFormat('id-ID').format(amount);
}

function PricingCardInner({
  plan,
  cycle,
  labels,
}: {
  plan: Plan;
  cycle: BillingCycle;
  labels: Props['labels'];
}) {
  let displayPrice = plan.priceMonthly;
  let monthlyEquivalent = plan.priceMonthly;
  let savePercent = 0;
  let periodLabel = '';

  if (!plan.isFree) {
    if (cycle === 'sixMonths') {
      displayPrice = plan.priceSixMonths;
      monthlyEquivalent = Math.round(plan.priceSixMonths / 6);
      savePercent = Math.round((1 - plan.priceSixMonths / (plan.priceMonthly * 6)) * 100);
      periodLabel = '6 bulan';
    } else if (cycle === 'yearly') {
      displayPrice = plan.priceYearly;
      monthlyEquivalent = Math.round(plan.priceYearly / 12);
      savePercent = Math.round((1 - plan.priceYearly / (plan.priceMonthly * 12)) * 100);
      periodLabel = 'tahun';
    }
  }

  return (
    <div
      className={`pricing-card group relative flex flex-col rounded-2xl overflow-hidden transition-all duration-300 ${
        plan.isPopular
          ? 'pricing-card--popular lg:scale-105 z-10'
          : 'hover:translate-y-[-4px]'
      }`}
    >
      {/* Gradient border wrapper */}
      <div
        className={`absolute inset-0 rounded-2xl ${
          plan.isPopular
            ? 'bg-linear-to-b from-primary via-secondary/50 to-primary/20'
            : 'bg-border'
        }`}
      />

      {/* Inner card */}
      <div className="relative m-[1px] rounded-[15px] bg-card flex flex-col flex-1 overflow-hidden">
        {/* Shine effect on hover */}
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
          <div className="absolute -inset-full bg-linear-to-r from-transparent via-white/[0.03] to-transparent rotate-12 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
        </div>

        {/* Popular badge */}
        {plan.isPopular && (
          <div className="bg-linear-to-r from-primary to-secondary py-2 text-center">
            <span className="text-xs font-bold text-white tracking-wide uppercase">
              <i className="fas fa-star mr-1.5 text-[10px]" />
              {labels.popular}
            </span>
          </div>
        )}

        <div className={`p-6 lg:p-7 flex flex-col flex-1 ${plan.isPopular ? '' : 'pt-8'}`}>
          {/* Plan header */}
          <div className="mb-5">
            <h3 className="text-lg font-bold text-foreground mb-1.5">
              {plan.name}
            </h3>
            <p className="text-xs text-muted leading-relaxed">{plan.description}</p>
          </div>

          {/* Price display */}
          <div className="mb-6 min-h-[80px]">
            {plan.isFree ? (
              <div>
                <div className="flex items-baseline gap-1">
                  <span className="text-4xl lg:text-5xl font-extrabold text-foreground tracking-tight">
                    Rp 0
                  </span>
                </div>
                <p className="text-sm text-muted mt-1">{labels.forever}</p>
              </div>
            ) : (
              <div>
                <div className="flex items-baseline gap-1">
                  <span className="text-3xl lg:text-4xl font-extrabold text-foreground tracking-tight transition-all duration-300">
                    Rp {formatPrice(cycle === 'monthly' ? plan.priceMonthly : monthlyEquivalent)}
                  </span>
                  <span className="text-sm text-muted">{labels.perMonth}</span>
                </div>

                {cycle !== 'monthly' && (
                  <div className="mt-2 space-y-1 transition-all duration-300">
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-muted line-through">
                        Rp {formatPrice(plan.priceMonthly)}
                      </span>
                      <span className="inline-flex items-center px-2 py-0.5 text-[10px] font-bold rounded-full bg-success/15 text-success border border-success/20">
                        -{savePercent}%
                      </span>
                    </div>
                    <p className="text-[11px] text-muted">
                      Rp {formatPrice(displayPrice)} / {periodLabel}
                    </p>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* CTA button */}
          <a
            href={plan.ctaHref}
            target="_blank"
            rel="noopener noreferrer"
            className={`w-full text-center py-3 rounded-xl font-semibold text-sm transition-all duration-200 mb-6 block ${
              plan.isPopular
                ? 'bg-linear-to-r from-primary to-secondary text-white shadow-lg shadow-primary/20 hover:shadow-xl hover:shadow-primary/30 hover:brightness-110'
                : plan.isFree
                  ? 'bg-white/5 text-foreground border border-border hover:bg-white/10 hover:border-primary/50'
                  : 'bg-white/5 text-foreground border border-border hover:bg-white/10 hover:border-primary/50'
            }`}
          >
            {plan.ctaLabel}
          </a>

          {/* Divider */}
          <div className="h-px bg-border mb-5" />

          {/* Features list */}
          <ul className="space-y-3 flex-1">
            {plan.features.map((f, i) => (
              <li key={f.label} className="flex items-start gap-2.5 text-sm">
                {f.included ? (
                  <span className="flex items-center justify-center w-4 h-4 mt-0.5 rounded-full bg-success/15 shrink-0">
                    <i className="fas fa-check text-success text-[8px]" />
                  </span>
                ) : (
                  <span className="flex items-center justify-center w-4 h-4 mt-0.5 rounded-full bg-white/5 shrink-0">
                    <i className="fas fa-times text-muted/40 text-[8px]" />
                  </span>
                )}
                <span
                  className={
                    f.included
                      ? 'text-foreground/90'
                      : 'text-muted/50 line-through'
                  }
                >
                  {f.label}
                  {f.value && (
                    <span className="text-primary font-medium ml-1">
                      {f.value}
                    </span>
                  )}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default function PricingWidget({ plans, labels }: Props) {
  const [cycle, setCycle] = useState<BillingCycle>('monthly');

  const buttons: { key: BillingCycle; label: string; badge?: string }[] = [
    { key: 'monthly', label: labels.monthly },
    { key: 'sixMonths', label: labels.sixMonths, badge: `${labels.save} 10%` },
    { key: 'yearly', label: labels.yearly, badge: `${labels.save} 20%` },
  ];

  return (
    <div>
      {/* Billing toggle */}
      <div className="flex justify-center mb-10 lg:mb-14">
        <div className="inline-flex rounded-2xl bg-card border border-border p-1.5 w-full sm:w-auto shadow-lg shadow-black/20">
          {buttons.map((btn) => (
            <button
              key={btn.key}
              onClick={() => setCycle(btn.key)}
              className={`relative flex-1 sm:flex-none px-4 sm:px-7 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all duration-300 ${
                cycle === btn.key
                  ? 'bg-linear-to-r from-primary to-secondary text-white shadow-md shadow-primary/25'
                  : 'text-muted hover:text-foreground'
              }`}
            >
              {btn.label}
              {btn.badge && cycle !== btn.key && (
                <span className="absolute -top-2.5 -right-1 sm:-right-2 px-2 py-0.5 text-[9px] sm:text-[10px] font-bold rounded-full bg-success text-white whitespace-nowrap shadow-sm">
                  {btn.badge}
                </span>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Plan cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 lg:gap-4 xl:gap-5 items-start">
        {plans.map((plan, i) => (
          <PricingCardInner key={plan.name} plan={plan} cycle={cycle} labels={labels} />
        ))}
      </div>
    </div>
  );
}
