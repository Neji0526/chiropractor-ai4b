import { Logo } from "@/components/Logo";
import { MobileNavigation } from "@/components/MobileNavigation";
import { NavLink } from "@/components/NavLink";
import { ButtonLink } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import { getSiteSettings } from "@/lib/content";
import { primaryNav } from "@/lib/navigation";

/** Sticky site header: wordmark, centred navigation and the booking CTA. */
export async function Header() {
  const settings = await getSiteSettings();

  return (
    <header className="sticky top-0 z-40 border-b border-shell-200 bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/85">
      <div className="container-page flex items-center justify-between gap-6 py-3">
        <Logo clinicName={settings.clinicName} tagline={settings.logoTagline} />

        <nav aria-label="Main" className="hidden xl:block">
          <ul className="flex items-center gap-7">
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
              iconAfter
              size="sm"
              className="whitespace-nowrap"
            >
              {settings.primaryCtaLabel}
            </ButtonLink>
          </span>

          {/* One-tap call on the breakpoints where the full CTA doesn't fit. */}
          <a
            href={`tel:${settings.phoneHref}`}
            aria-label={`Call the clinic on ${settings.phone}`}
            className="inline-flex size-10 items-center justify-center rounded-lg bg-brand-800 text-white md:hidden"
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
