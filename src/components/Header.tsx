import { Logo } from "@/components/Logo";
import { MobileNavigation } from "@/components/MobileNavigation";
import { NavLink } from "@/components/NavLink";
import { ButtonLink } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import { getPrimaryLocation, getSiteSettings } from "@/lib/content";
import { formatHoursRange, sortHoursForDisplay } from "@/lib/format";
import { primaryNav } from "@/lib/navigation";

/** Sticky site header. The phone number and appointment CTA stay reachable at every breakpoint. */
export async function Header() {
  const [settings, location] = await Promise.all([
    getSiteSettings(),
    getPrimaryLocation(),
  ]);

  const weekdayHours = sortHoursForDisplay(location.hours)[0];

  return (
    <header className="sticky top-0 z-40 border-b border-shell-200 bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/85">
      {/* Utility bar — address and opening hours, desktop only. */}
      <div className="hidden border-b border-shell-200 bg-shell-100 lg:block">
        <div className="container-page flex items-center justify-between gap-6 py-1.5 text-[0.8125rem] text-ink-600">
          <p className="flex items-center gap-1.5 whitespace-nowrap">
            <Icon name="map" size={15} className="text-brand-600" />
            {location.addressLine1}, {location.city}, {location.state}{" "}
            {location.postalCode}
          </p>

          <div className="flex items-center gap-5 whitespace-nowrap">
            {weekdayHours ? (
              <p className="flex items-center gap-1.5">
                <Icon name="clock" size={15} className="text-brand-600" />
                Open Monday {formatHoursRange(weekdayHours)} ·{" "}
                <a href="/contact#hours" className="underline hover:text-brand-700">
                  all opening hours
                </a>
              </p>
            ) : null}

            <a
              href={`tel:${settings.phoneHref}`}
              className="flex items-center gap-1.5 font-semibold text-ink-800 hover:text-brand-700"
            >
              <Icon name="phone" size={15} className="text-brand-600" />
              {settings.phone}
            </a>
          </div>
        </div>
      </div>

      <div className="container-page flex items-center justify-between gap-6 py-3.5">
        <Logo clinicName={settings.clinicName} />

        <nav aria-label="Main" className="hidden xl:block">
          <ul className="flex items-center gap-5 xl:gap-7">
            {primaryNav.map((item) => (
              <li key={item.href} className="whitespace-nowrap">
                <NavLink href={item.href} label={item.label} />
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-2 sm:gap-3">
          {/* Wrapped rather than given `hidden md:inline-flex`: the button's own
              `inline-flex` sits in the same CSS layer and would win the conflict. */}
          <span className="hidden md:block">
            <ButtonLink
              href="/request-appointment"
              icon="calendar"
              size="sm"
              className="whitespace-nowrap"
            >
              {settings.primaryCtaLabel}
            </ButtonLink>
          </span>

          {/* One-tap call below the desktop breakpoint, where the utility bar
              (which carries the number in full) isn't shown. */}
          <a
            href={`tel:${settings.phoneHref}`}
            aria-label={`Call the clinic on ${settings.phone}`}
            className="inline-flex size-10 items-center justify-center rounded-full bg-brand-600 text-white lg:hidden"
          >
            <Icon name="phone" size={19} />
          </a>

          <MobileNavigation
            items={primaryNav}
            phone={settings.phone}
            phoneHref={settings.phoneHref}
            primaryCtaLabel={settings.primaryCtaLabel}
          />
        </div>
      </div>
    </header>
  );
}
