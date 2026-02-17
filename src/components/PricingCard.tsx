import { usePricingCycle } from './PricingToggle';

interface PlanFeature {
  label: string;
  included: boolean;
  value?: string;
}

interface Props {
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
  popularLabel?: string;
  perMonthLabel: string;
  foreverLabel: string;
  saveLabel: string;
}

function formatPrice(amount: number): string {
  return new Intl.NumberFormat('id-ID').format(amount);
}

export default function PricingCard({
  name,
  description,
  priceMonthly,
  priceSixMonths,
  priceYearly,
  isFree = false,
  isPopular = false,
  features,
  ctaLabel,
  ctaHref,
  popularLabel,
  perMonthLabel,
  foreverLabel,
  saveLabel,
}: Readonly<Props>) {
  const { cycle } = usePricingCycle();

  let displayPrice = priceMonthly;
  let monthlyEquivalent = priceMonthly;
  let savePercent = 0;

  if (!isFree) {
    if (cycle === 'sixMonths') {
      displayPrice = priceSixMonths;
      monthlyEquivalent = Math.round(priceSixMonths / 6);
      savePercent = Math.round((1 - priceSixMonths / (priceMonthly * 6)) * 100);
    } else if (cycle === 'yearly') {
      displayPrice = priceYearly;
      monthlyEquivalent = Math.round(priceYearly / 12);
      savePercent = Math.round((1 - priceYearly / (priceMonthly * 12)) * 100);
    }
  }

  return (
    <div
      className={`relative rounded-2xl p-6 md:p-8 border transition-all flex flex-col ${
        isPopular
          ? 'border-primary shadow-lg shadow-primary/10 scale-[1.02]'
          : 'border-border'
      } bg-card`}
    >
      {/* Popular badge */}
      {isPopular && popularLabel && (
        <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
          <span className="px-4 py-1.5 text-xs font-bold rounded-full bg-linear-to-r from-primary to-secondary text-white shadow-md whitespace-nowrap">
            <i className="fas fa-star mr-1" />
            {popularLabel}
          </span>
        </div>
      )}

      {/* Plan name */}
      <h3 className="text-lg md:text-xl font-bold text-foreground mb-2">
        {name}
      </h3>
      <p className="text-xs md:text-sm text-muted mb-4 md:mb-6">{description}</p>

      {/* Price */}
      <div className="mb-4 md:mb-6">
        {isFree ? (
          <div>
            <span className="text-3xl md:text-4xl font-extrabold text-foreground">
              Rp 0
            </span>
            <span className="text-muted ml-1">/{foreverLabel}</span>
          </div>
        ) : (
          <div>
            {cycle === 'monthly' ? (
                <>
                <span className="text-3xl md:text-4xl font-extrabold text-foreground">
                  Rp {formatPrice(priceMonthly)}
                </span>
                  <span className="text-muted ml-1">{perMonthLabel}</span>
                </>
            ) : (
                <>
                <span className="text-3xl md:text-4xl font-extrabold text-foreground">
                  Rp {formatPrice(monthlyEquivalent)}
                </span>
                  <span className="text-muted ml-1">{perMonthLabel}</span>
                  <div className="mt-1 flex items-center gap-2">
                  <span className="text-xs text-muted line-through">
                    Rp {formatPrice(priceMonthly)}
                  </span>
                    <span className="text-xs font-semibold text-success">
                    {saveLabel} {savePercent}%
                  </span>
                  </div>
                  <p className="text-xs text-muted mt-1">
                    Rp {formatPrice(displayPrice)} / {cycle === 'sixMonths' ? '6 bulan' : 'tahun'}
                  </p>
                </>
            )}
          </div>
        )}
      </div>

      {/* CTA */}
      <a
        href={ctaHref}
        target="_blank"
        rel="noopener noreferrer"
        className={`w-full text-center py-3 rounded-xl font-semibold text-sm transition-all mb-6 inline-block ${
          isPopular || isFree
            ? 'btn-primary justify-center'
            : 'btn-secondary justify-center'
        }`}
      >
        {ctaLabel}
      </a>

      {/* Features list */}
      <ul className="space-y-3 flex-1">
        {features.map((f, i) => (
          <li key={f.label} className="flex items-start gap-2.5 text-sm">
            <i
              className={`fas ${f.included ? 'fa-check text-success' : 'fa-times text-muted opacity-40'} mt-0.5 text-xs`}
            />
            <span
              className={
                f.included
                  ? 'text-foreground'
                  : 'text-muted opacity-60'
              }
            >
              {f.label}
              {f.value && <span className="text-muted ml-1">({f.value})</span>}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
