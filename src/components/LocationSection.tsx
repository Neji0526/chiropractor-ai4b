import type { Location, SiteSettings } from "@/content/types";
import { BusinessHours } from "@/components/BusinessHours";
import { Icon } from "@/components/ui/Icon";
import { MediaPanel } from "@/components/ui/MediaPanel";
import { SectionHeading } from "@/components/ui/Section";
import { formatAddress } from "@/lib/format";

/**
 * Address, hours and contact details in one block.
 *
 * The map is only rendered when `mapEmbedUrl` is set in the location record, so
 * an unconfigured site shows a neutral panel instead of a map pointing at the
 * wrong address.
 */
export function LocationSection({
  location,
  settings,
  heading = "Where to find us",
}: {
  location: Location;
  settings: SiteSettings;
  heading?: string;
}) {
  return (
    <section id="location" className="border-t border-shell-200 bg-white py-14 lg:py-20">
      <div className="container-page">
        <SectionHeading
          eyebrow="Visit the clinic"
          title={heading}
          description={`${location.name}, ${location.city} — with free parking and step-free access.`}
        />

        <div className="mt-10 grid gap-8 lg:grid-cols-[1fr_1.1fr] lg:gap-12">
          <div className="space-y-8">
            <div>
              <h3 className="font-sans text-base font-semibold">Address</h3>
              <address className="mt-2 text-[0.9375rem] leading-relaxed text-ink-600 not-italic">
                {formatAddress(location)}
              </address>

              {location.parkingNote ? (
                <p className="mt-3 flex items-start gap-2 text-sm leading-relaxed text-ink-600">
                  <Icon name="info" size={16} className="mt-0.5 shrink-0 text-brand-600" />
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
                  Get directions
                  <Icon name="external" size={15} />
                </a>
              ) : null}
            </div>

            <div>
              <h3 className="font-sans text-base font-semibold">Get in touch</h3>
              <div className="mt-2 space-y-2 text-[0.9375rem]">
                <a
                  href={`tel:${settings.phoneHref}`}
                  className="flex items-center gap-2 font-semibold text-ink-800 hover:text-brand-700"
                >
                  <Icon name="phone" size={17} className="text-brand-600" />
                  {settings.phone}
                </a>
                <a
                  href={`mailto:${settings.email}`}
                  className="flex items-center gap-2 text-ink-600 hover:text-brand-700"
                >
                  <Icon name="mail" size={17} className="text-brand-600" />
                  {settings.email}
                </a>
              </div>
            </div>

            <div id="hours" className="scroll-mt-28">
              <h3 className="font-sans text-base font-semibold">Opening hours</h3>
              <BusinessHours hours={location.hours} className="mt-2 max-w-sm" />
            </div>
          </div>

          <div>
            {location.mapEmbedUrl ? (
              <iframe
                title={`Map showing ${location.name}`}
                src={location.mapEmbedUrl}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="aspect-[4/3] w-full rounded-card border border-shell-200"
              />
            ) : (
              <MediaPanel
                image={null}
                ratio="aspect-[4/3]"
                placeholderLabel="Map — add a map embed URL in the location settings"
              />
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
