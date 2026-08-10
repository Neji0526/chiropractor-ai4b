import type { Location, SiteSettings } from "@/content/types";
import { ButtonLink } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import { MediaPanel } from "@/components/ui/MediaPanel";
import { formatHoursRange, sortHoursForDisplay } from "@/lib/format";

/**
 * Homepage hero.
 *
 * The first screen has four jobs: say what the clinic does, who it helps, where
 * it is, and how to book. Everything else is below the fold.
 */
export function Hero({
  settings,
  location,
  quickLinks,
}: {
  settings: SiteSettings;
  location: Location;
  quickLinks: { slug: string; title: string }[];
}) {
  const hours = sortHoursForDisplay(location.hours);
  const saturday = hours.find((h) => h.dayOfWeek === 6);

  return (
    <section className="border-b border-shell-200 bg-white">
      <div className="container-page grid items-center gap-10 py-12 lg:grid-cols-[1.05fr_1fr] lg:gap-16 lg:py-20">
        <div>
          <p className="inline-flex items-center gap-2 rounded-full border border-shell-300 bg-shell-100 px-3 py-1 text-[0.8125rem] font-medium text-ink-600">
            <Icon name="map" size={15} className="text-brand-600" />
            {location.city}, {location.state} · {location.name}
          </p>

          <h1 className="mt-5 text-[2rem] leading-[1.12] sm:text-[2.5rem] lg:text-[3rem]">
            Chiropractic care for back pain, neck pain and getting back to normal
          </h1>

          <p className="mt-5 max-w-xl text-lg leading-relaxed text-ink-600">
            {settings.clinicName} is a family chiropractic clinic in {location.city}.
            We assess what&apos;s causing your pain, explain what we find in plain
            language, and tell you honestly whether we can help.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
            <ButtonLink href="/request-appointment" size="lg" icon="calendar">
              {settings.primaryCtaLabel}
            </ButtonLink>
            <ButtonLink
              href={`tel:${settings.phoneHref}`}
              size="lg"
              variant="secondary"
              icon="phone"
            >
              {settings.phone}
            </ButtonLink>
          </div>

          <p className="mt-4 text-sm text-ink-500">
            No referral needed. Appointments usually available within a few days
            {saturday && !saturday.isClosed
              ? `, including Saturday mornings (${formatHoursRange(saturday)})`
              : ""}
            .
          </p>

          {quickLinks.length > 0 ? (
            <div className="mt-8 border-t border-shell-200 pt-6">
              <p className="text-xs font-semibold tracking-[0.14em] text-ink-500 uppercase">
                Common reasons people come in
              </p>
              <ul className="mt-3 flex flex-wrap gap-2">
                {quickLinks.map((link) => (
                  <li key={link.slug}>
                    <a
                      href={`/services/${link.slug}`}
                      className="inline-flex items-center gap-1.5 rounded-full border border-shell-300 bg-white px-3.5 py-1.5 text-sm text-ink-700 transition-colors hover:border-brand-300 hover:text-brand-700"
                    >
                      {link.title}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ) : null}
        </div>

        <div className="relative">
          <MediaPanel
            image={null}
            ratio="aspect-[4/5] sm:aspect-[5/4] lg:aspect-[4/5]"
            placeholderLabel="Clinic or practitioner photo"
            priority
            sizes="(min-width: 1024px) 42vw, 100vw"
          />

          {/* Address and hours card — "where are you" answered on the first screen. */}
          <div className="mt-4 rounded-card border border-shell-200 bg-shell-50 p-5 lg:absolute lg:-bottom-8 lg:-left-8 lg:mt-0 lg:w-64 lg:bg-white lg:shadow-raised">
            <p className="text-xs font-semibold tracking-[0.14em] text-ink-500 uppercase">
              Find us
            </p>
            <address className="mt-2 text-sm leading-relaxed text-ink-700 not-italic">
              {location.addressLine1}
              {location.addressLine2 ? <br /> : null}
              {location.addressLine2}
              <br />
              {location.city}, {location.state} {location.postalCode}
            </address>
            <a
              href="/contact#hours"
              className="mt-3 inline-flex items-center gap-1.5 text-sm font-medium text-brand-700 hover:underline"
            >
              Opening hours and directions
              <Icon name="arrow-right" size={15} />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
