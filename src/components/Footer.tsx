import Link from "next/link";
import { Logo } from "@/components/Logo";
import { BusinessHours } from "@/components/BusinessHours";
import { Icon, type IconName } from "@/components/ui/Icon";
import { getPrimaryLocation, getSiteSettings } from "@/lib/content";
import { formatAddress } from "@/lib/format";
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

  return (
    <footer className="border-t border-shell-200 bg-white">
      <div className="container-page py-14">
        <div className="grid gap-10 lg:grid-cols-[1.4fr_repeat(3,1fr)]">
          <div>
            <Logo clinicName={settings.clinicName} />
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-ink-600">
              {settings.shortDescription}
            </p>

            <div className="mt-5 space-y-2 text-sm">
              <a
                href={`tel:${settings.phoneHref}`}
                className="flex items-center gap-2 font-semibold text-ink-800 hover:text-brand-700"
              >
                <Icon name="phone" size={16} className="text-brand-600" />
                {settings.phone}
              </a>
              <a
                href={`mailto:${settings.email}`}
                className="flex items-start gap-2 text-ink-600 hover:text-brand-700"
              >
                <Icon name="mail" size={16} className="mt-0.5 shrink-0 text-brand-600" />
                <span className="wrap-anywhere">{settings.email}</span>
              </a>
              <p className="flex items-start gap-2 text-ink-600">
                <Icon name="map" size={16} className="mt-0.5 shrink-0 text-brand-600" />
                <span>{formatAddress(location)}</span>
              </p>
            </div>

            {settings.social.length > 0 ? (
              <ul className="mt-5 flex items-center gap-2">
                {settings.social.map((link) => (
                  <li key={link.platform}>
                    <a
                      href={link.href}
                      target="_blank"
                      rel="noreferrer noopener"
                      className="inline-flex size-9 items-center justify-center rounded-full border border-shell-300 text-ink-600 transition-colors hover:border-brand-300 hover:text-brand-700"
                    >
                      <Icon
                        name={SOCIAL_ICONS[link.platform] ?? "external"}
                        size={17}
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
              <h2 className="font-sans text-xs font-semibold tracking-[0.14em] text-ink-900 uppercase">
                {group.heading}
              </h2>
              <ul className="mt-4 space-y-2.5 text-sm">
                {group.items.map((item) => (
                  <li key={item.href}>
                    <Link href={item.href} className="text-ink-600 hover:text-brand-700">
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>

        <div className="mt-12 grid gap-8 border-t border-shell-200 pt-8 lg:grid-cols-[1.4fr_2fr]">
          <div>
            <h2 className="font-sans text-xs font-semibold tracking-[0.14em] text-ink-900 uppercase">
              Opening hours
            </h2>
            <BusinessHours hours={location.hours} className="mt-4 max-w-xs" />
          </div>

          <div className="rounded-card border border-shell-200 bg-shell-50 p-5 text-sm leading-relaxed text-ink-600">
            <p className="flex items-start gap-2">
              <Icon name="info" size={17} className="mt-0.5 shrink-0 text-brand-600" />
              <span>
                The information on this site is general and isn&apos;t a substitute for
                individual advice from a clinician. If you have severe or worsening
                symptoms, numbness, weakness, or any loss of bladder or bowel control,
                seek urgent medical care rather than booking an appointment.
              </span>
            </p>
          </div>
        </div>

        <div className="mt-10 flex flex-col gap-3 border-t border-shell-200 pt-6 text-xs text-ink-500 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {year} {settings.legalName}. All rights reserved.
          </p>
          <ul className="flex flex-wrap gap-x-5 gap-y-2">
            <li>
              <Link href="/privacy" className="hover:text-brand-700">
                Privacy notice
              </Link>
            </li>
            <li>
              <Link href="/contact" className="hover:text-brand-700">
                Contact
              </Link>
            </li>
            <li>
              <Link href="/request-appointment" className="hover:text-brand-700">
                Request an appointment
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
}
