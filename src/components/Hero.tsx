import type { SiteSettings, TrustIcon } from "@/content/types";
import { ButtonLink } from "@/components/ui/Button";
import { Icon, type IconName } from "@/components/ui/Icon";
import { MediaPanel } from "@/components/ui/MediaPanel";

const FEATURE_ICONS: Record<TrustIcon, IconName> = {
  clock: "clock",
  map: "map",
  phone: "phone",
  shield: "shield",
  heart: "heart",
  users: "users",
  sparkle: "sparkle",
  sliders: "sliders",
};

/**
 * Homepage hero.
 *
 * The first screen has four jobs: say what the clinic does, who it helps, where
 * it is, and how to book. Everything else is below the fold.
 */
export function Hero({ settings }: { settings: SiteSettings }) {
  const offer = settings.newPatientOffer;

  return (
    <section className="hero-wash relative overflow-hidden">
      <div className="container-page grid items-center gap-12 py-12 lg:grid-cols-[1.02fr_1fr] lg:gap-16 lg:py-16">
        <div>
          {settings.heroBadge ? (
            <p className="inline-flex items-center rounded-full bg-brand-100 px-3.5 py-1.5 text-[0.8125rem] font-medium text-brand-700">
              {settings.heroBadge}
            </p>
          ) : null}

          <h1 className="mt-5 text-[2rem] leading-[1.14] sm:text-[2.5rem] lg:text-[2.875rem]">
            {settings.hero.heading}
          </h1>

          <p className="mt-5 max-w-xl leading-relaxed text-ink-600">
            {settings.hero.body}
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
            <ButtonLink href="/request-appointment" size="lg" icon="calendar" iconAfter>
              {settings.primaryCtaLabel}
            </ButtonLink>
            <ButtonLink href="#what-to-expect" size="lg" variant="secondary" icon="info">
              What to Expect
            </ButtonLink>
          </div>

          {/* Four short reassurances. Icon plus label only — the fuller wording
              lives on the About page. */}
          {settings.trustPoints.length > 0 ? (
            <ul className="mt-9 grid grid-cols-2 gap-x-4 gap-y-5 sm:grid-cols-4">
              {settings.trustPoints.map((point) => (
                <li key={point.label} className="flex items-start gap-2">
                  <Icon
                    name={FEATURE_ICONS[point.icon]}
                    size={17}
                    className="mt-px shrink-0 text-brand-600"
                  />
                  <span className="text-[0.8125rem] leading-snug font-medium text-ink-700">
                    {point.label}
                  </span>
                </li>
              ))}
            </ul>
          ) : null}
        </div>

        <div className="relative">
          {/* Decoration: soft circle behind the image and a dotted grid above it. */}
          <div
            aria-hidden
            className="absolute -top-6 -right-6 hidden size-40 rounded-full bg-brand-200/40 lg:block"
          />
          <div
            aria-hidden
            className="absolute -top-4 right-2 hidden size-28 lg:block"
            style={{
              backgroundImage:
                "radial-gradient(var(--color-brand-300) 1.5px, transparent 1.6px)",
              backgroundSize: "12px 12px",
            }}
          />

          <MediaPanel
            image={settings.hero.image}
            ratio="aspect-[4/3] lg:aspect-[7/6]"
            placeholderLabel="Clinic or treatment photo"
            priority
            rounded="rounded-xl"
            className="relative"
            sizes="(min-width: 1024px) 46vw, 100vw"
          />

          {offer ? (
            /* Offer card. Prices are regulated advertising in many places —
               verify the wording, or clear `newPatientOffer` to remove it. */
            <div className="mt-4 rounded-xl border border-shell-200 bg-white p-5 shadow-raised sm:absolute sm:-bottom-8 sm:-left-6 sm:mt-0 sm:w-56">
              <p className="text-[0.8125rem] font-medium text-ink-600">{offer.label}</p>
              <p className="mt-1 font-serif text-3xl font-semibold text-ink-900">
                {offer.price}
              </p>
              <p className="mt-1.5 text-[0.8125rem] leading-snug font-medium text-brand-700">
                {offer.description}
              </p>
              {offer.note ? (
                <p className="mt-2 text-xs text-ink-500">{offer.note}</p>
              ) : null}
            </div>
          ) : null}
        </div>
      </div>

    </section>
  );
}
