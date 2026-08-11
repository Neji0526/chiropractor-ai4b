import Link from "next/link";
import { Logo } from "@/components/Logo";
import { Icon, type IconName } from "@/components/ui/Icon";
import { getPrimaryLocation, getSiteSettings } from "@/lib/content";
import { formatHoursRange, sortHoursForDisplay } from "@/lib/format";
import { footerNav } from "@/lib/navigation";

const SOCIAL_ICONS: Record<string, IconName> = {
  facebook: "facebook",
  instagram: "instagram",
  google: "google",
  youtube: "youtube",
  linkedin: "linkedin",
};

export async function Footer() {
  const [settings, location] = await Promise.all([
    getSiteSettings(),
    getPrimaryLocation(),
  ]);

  const year = new Date().getFullYear();
  const hours = sortHoursForDisplay(location.hours);
  const openDays = hours.filter((h) => !h.isClosed);
  const weekdays = openDays.filter((h) => h.dayOfWeek >= 1 && h.dayOfWeek <= 5);
  const weekend = openDays.filter((h) => h.dayOfWeek === 6 || h.dayOfWeek === 0);

  return (
    <footer className="bg-brand-900 text-brand-100">
      <div className="container-page py-14">
        <div className="grid gap-10 lg:grid-cols-[1.4fr_1fr_1fr_1.2fr]">
          <div>
            <Logo
              clinicName={settings.clinicName}
              tagline={settings.logoTagline}
              onDark
            />
            <p className="mt-5 max-w-xs text-sm leading-relaxed text-brand-200">
              {settings.shortDescription}
            </p>

            {settings.social.length > 0 ? (
              <ul className="mt-6 flex items-center gap-2.5">
                {settings.social.map((link) => (
                  <li key={link.platform}>
                    <a
                      href={link.href}
                      target="_blank"
                      rel="noreferrer noopener"
                      className="inline-flex size-9 items-center justify-center rounded-full border border-white/20 text-white transition-colors hover:border-white/60 hover:bg-white/10"
                    >
                      <Icon
                        name={SOCIAL_ICONS[link.platform] ?? "external"}
                        size={16}
                        title={link.label}
                      />
                    </a>
                  </li>
                ))}
              </ul>
            ) : null}
          </div>

          {footerNav.map((group) => (
            <nav key={group.heading} aria-label={group.heading}>
              <h2 className="font-sans text-sm font-semibold text-white">
                {group.heading}
              </h2>
              <ul className="mt-4 space-y-2.5 text-sm">
                {group.items.map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className="text-brand-200 transition-colors hover:text-white"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}

          <div>
            <h2 className="font-sans text-sm font-semibold text-white">Contact Us</h2>
            <ul className="mt-4 space-y-3 text-sm">
              <li>
                <a
                  href={`tel:${settings.phoneHref}`}
                  className="flex items-start gap-2.5 text-brand-200 transition-colors hover:text-white"
                >
                  <Icon name="phone" size={16} className="mt-0.5 shrink-0" />
                  {settings.phone}
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${settings.email}`}
                  className="flex items-start gap-2.5 text-brand-200 transition-colors hover:text-white"
                >
                  <Icon name="mail" size={16} className="mt-0.5 shrink-0" />
                  <span className="wrap-anywhere">{settings.email}</span>
                </a>
              </li>
              <li className="flex items-start gap-2.5 text-brand-200">
                <Icon name="map" size={16} className="mt-0.5 shrink-0" />
                <span>
                  {location.addressLine1}
                  {location.addressLine2 ? `, ${location.addressLine2}` : ""}
                  <br />
                  {location.city}, {location.state} {location.postalCode}
                </span>
              </li>
              {weekdays.length > 0 ? (
                <li className="flex items-start gap-2.5 text-brand-200">
                  <Icon name="clock" size={16} className="mt-0.5 shrink-0" />
                  <span>
                    Mon – Fri: {formatHoursRange(weekdays[0])}
                    {weekend.length > 0 ? (
                      <>
                        <br />
                        {weekend
                          .map(
                            (day) =>
                              `${["Sun", "", "", "", "", "", "Sat"][day.dayOfWeek]}: ${formatHoursRange(day)}`,
                          )
                          .join(" · ")}
                      </>
                    ) : null}
                  </span>
                </li>
              ) : null}
            </ul>
          </div>
        </div>

        {/* Standing safety note — kept in the footer so it appears on every page. */}
        <p className="mt-12 border-t border-white/10 pt-8 text-xs leading-relaxed text-brand-200/90">
          The information on this site is general and isn&apos;t a substitute for
          individual advice from a clinician. If you have severe or worsening symptoms,
          numbness, weakness, or any loss of bladder or bowel control, seek urgent medical
          care rather than booking an appointment.
        </p>

        <div className="mt-8 flex flex-col gap-3 border-t border-white/10 pt-6 text-xs text-brand-200 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {year} {settings.legalName}. All rights reserved.
          </p>
          <ul className="flex flex-wrap gap-x-6 gap-y-2">
            <li>
              <Link href="/privacy" className="transition-colors hover:text-white">
                Privacy Policy
              </Link>
            </li>
            <li>
              <Link href="/contact" className="transition-colors hover:text-white">
                Contact
              </Link>
            </li>
            <li>
              <Link
                href="/request-appointment"
                className="transition-colors hover:text-white"
              >
                Book an Appointment
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
}
