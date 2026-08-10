import Link from "next/link";
import { ButtonLink } from "@/components/ui/Button";
import { getServices, getSiteSettings } from "@/lib/content";

export default async function NotFound() {
  const [settings, services] = await Promise.all([getSiteSettings(), getServices()]);

  return (
    <section className="bg-white py-20 lg:py-28">
      <div className="container-page max-w-2xl text-center">
        <p className="text-xs font-semibold tracking-[0.14em] text-brand-600 uppercase">
          Page not found
        </p>
        <h1 className="mt-3 text-3xl sm:text-4xl">
          We couldn&apos;t find that page
        </h1>
        <p className="mt-4 text-lg leading-relaxed text-ink-600">
          The link may be out of date. You can start again from the homepage, or call the
          clinic and we&apos;ll point you in the right direction.
        </p>

        <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
          <ButtonLink href="/request-appointment" icon="calendar">
            {settings.primaryCtaLabel}
          </ButtonLink>
          <ButtonLink href={`tel:${settings.phoneHref}`} variant="secondary" icon="phone">
            {settings.phone}
          </ButtonLink>
        </div>

        {services.length > 0 ? (
          <div className="mt-12 border-t border-shell-200 pt-8 text-left">
            <h2 className="text-sm font-semibold tracking-wide text-ink-900 uppercase">
              Popular pages
            </h2>
            <ul className="mt-4 grid gap-2 sm:grid-cols-2">
              {[
                { href: "/services", label: "All services" },
                ...services.slice(0, 3).map((service) => ({
                  href: `/services/${service.slug}`,
                  label: service.title,
                })),
                { href: "/team", label: "Our team" },
                { href: "/contact", label: "Contact and directions" },
              ].map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-[0.9375rem] text-brand-700 hover:underline"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ) : null}
      </div>
    </section>
  );
}
