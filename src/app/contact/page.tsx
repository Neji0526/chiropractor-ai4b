import type { Metadata } from "next";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { BusinessHours } from "@/components/BusinessHours";
import { LeadForm } from "@/components/forms/LeadForm";
import { PageHeader } from "@/components/PageHeader";
import { ButtonLink } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import { MediaPanel } from "@/components/ui/MediaPanel";
import { getPrimaryLocation, getServiceTitles, getSiteSettings } from "@/lib/content";
import { formatAddress } from "@/lib/format";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Contact the Clinic",
  description:
    "Contact our Riverton chiropractic clinic — phone, email, address, opening hours and directions, or send an enquiry online.",
  path: "/contact",
});

export default async function ContactPage() {
  const [settings, location, services] = await Promise.all([
    getSiteSettings(),
    getPrimaryLocation(),
    getServiceTitles(),
  ]);

  return (
    <>
      <Breadcrumbs
        items={[
          { name: "Home", href: "/" },
          { name: "Contact", href: "/contact" },
        ]}
      />

      <PageHeader
        eyebrow="Contact us"
        title="Get in touch with the clinic"
        description="Call us during opening hours for the quickest answer, or send a message and we'll come back to you on the next working day."
      >
        <div className="flex flex-col gap-3 sm:flex-row">
          <ButtonLink href={`tel:${settings.phoneHref}`} icon="phone">
            {settings.phone}
          </ButtonLink>
          <ButtonLink
            href="/request-appointment"
            variant="secondary"
            icon="calendar"
          >
            {settings.primaryCtaLabel}
          </ButtonLink>
        </div>
      </PageHeader>

      {/* Contact details */}
      <section className="py-14 lg:py-20">
        <div className="container-page grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {[
            {
              icon: "phone" as const,
              heading: "Phone",
              body: settings.phone,
              href: `tel:${settings.phoneHref}`,
              note: "During opening hours",
            },
            {
              icon: "mail" as const,
              heading: "Email",
              body: settings.email,
              href: `mailto:${settings.email}`,
              note: "Replies on working days",
            },
            {
              icon: "map" as const,
              heading: "Address",
              body: formatAddress(location),
              href: location.mapUrl || undefined,
              note: location.parkingNote ? "Free on-site parking" : undefined,
            },
            {
              icon: "calendar" as const,
              heading: "Appointments",
              body: "Request online",
              href: "/request-appointment",
              note: "Confirmed by phone or email",
            },
          ].map((card) => (
            <div
              key={card.heading}
              className="rounded-card border border-shell-200 bg-white p-6 shadow-card"
            >
              <span aria-hidden className="icon-tile size-10 rounded-full">
                <Icon name={card.icon} size={19} />
              </span>
              <h2 className="mt-4 font-sans text-sm font-semibold tracking-wide text-ink-900 uppercase">
                {card.heading}
              </h2>
              {/* `wrap-anywhere` (not `break-words`) so a long email address also
                  shrinks the grid track's min-content width on narrow screens. */}
              {card.href ? (
                <a
                  href={card.href}
                  className="mt-1.5 block text-[0.9375rem] leading-relaxed font-medium wrap-anywhere text-brand-700 hover:underline"
                >
                  {card.body}
                </a>
              ) : (
                <p className="mt-1.5 text-[0.9375rem] leading-relaxed wrap-anywhere text-ink-700">
                  {card.body}
                </p>
              )}
              {card.note ? (
                <p className="mt-1 text-xs text-ink-500">{card.note}</p>
              ) : null}
            </div>
          ))}
        </div>
      </section>

      {/* Enquiry form + hours/map */}
      <section className="border-t border-shell-200 bg-shell-100 py-14 lg:py-20">
        <div className="container-page grid gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16">
          <div>
            <h2 className="text-2xl sm:text-3xl">Send us a message</h2>
            <p className="mt-3 text-[1.0625rem] leading-relaxed text-ink-600">
              Ask a question, check whether we can help, or request a call back. If
              you&apos;d rather book straight in, use the{" "}
              <a
                href="/request-appointment"
                className="font-medium text-brand-700 hover:underline"
              >
                appointment request form
              </a>
              .
            </p>

            <LeadForm
              className="mt-8"
              variant="enquiry"
              services={services}
              consentText={settings.formConsentText}
              phone={settings.phone}
              phoneHref={settings.phoneHref}
            />
          </div>

          <aside className="space-y-6">
            <div id="hours" className="scroll-mt-28 rounded-card border border-shell-200 bg-white p-6 shadow-card">
              <h2 className="text-lg">Opening hours</h2>
              <BusinessHours hours={location.hours} className="mt-3" />
              <p className="mt-4 border-t border-shell-200 pt-4 text-sm leading-relaxed text-ink-600">
                Messages sent outside these hours are answered on the next working day.
              </p>
            </div>

            <div className="rounded-card border border-shell-200 bg-white p-6 shadow-card">
              <h2 className="text-lg">Getting here</h2>
              <address className="mt-2 text-[0.9375rem] leading-relaxed text-ink-700 not-italic">
                {location.addressLine1}
                {location.addressLine2 ? <br /> : null}
                {location.addressLine2}
                <br />
                {location.city}, {location.state} {location.postalCode}
              </address>

              {location.parkingNote ? (
                <p className="mt-3 text-sm leading-relaxed text-ink-600">
                  {location.parkingNote}
                </p>
              ) : null}

              {location.mapUrl ? (
                <a
                  href={location.mapUrl}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-brand-700 hover:underline"
                >
                  Open in maps
                  <Icon name="external" size={15} />
                </a>
              ) : null}

              <div className="mt-5">
                {location.mapEmbedUrl ? (
                  <iframe
                    title={`Map showing ${location.name}`}
                    src={location.mapEmbedUrl}
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    className="aspect-[4/3] w-full rounded-xl border border-shell-200"
                  />
                ) : (
                  <MediaPanel
                    image={null}
                    ratio="aspect-[4/3]"
                    rounded="rounded-xl"
                    placeholderLabel="Map — add a map embed URL in the location settings"
                  />
                )}
              </div>
            </div>
          </aside>
        </div>
      </section>
    </>
  );
}
