import type { Metadata } from "next";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { CTASection } from "@/components/CTASection";
import { PageHeader } from "@/components/PageHeader";
import { WhatToExpect } from "@/components/WhatToExpect";
import { ConditionCard, ServicePhotoCard } from "@/components/cards";
import { ButtonLink } from "@/components/ui/Button";
import { SectionHeading } from "@/components/ui/Section";
import { getConditions, getServices, getSiteSettings } from "@/lib/content";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Chiropractic Services in Riverton",
  description:
    "Chiropractic services in Riverton: back pain care, neck pain care, adjustments, sports injuries, posture support and headache-related care.",
  path: "/services",
});

export default async function ServicesPage() {
  const [settings, services, conditions] = await Promise.all([
    getSiteSettings(),
    getServices(),
    getConditions(),
  ]);

  return (
    <>
      <Breadcrumbs
        items={[
          { name: "Home", href: "/" },
          { name: "Services", href: "/services" },
        ]}
      />

      <PageHeader
        eyebrow="Our services"
        title="Chiropractic care at the clinic"
        description="Whatever brings you in, the process is the same: assess first, explain what we found, then treat what we can actually help with."
      >
        <div className="flex flex-col gap-3 sm:flex-row">
          <ButtonLink href="/request-appointment" icon="calendar">
            {settings.primaryCtaLabel}
          </ButtonLink>
          <ButtonLink
            href={`tel:${settings.phoneHref}`}
            variant="secondary"
            icon="phone"
          >
            {settings.phone}
          </ButtonLink>
        </div>
      </PageHeader>

      <section className="py-16 lg:py-20">
        <div className="container-page">
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {services.map((service) => (
              <ServicePhotoCard key={service.slug} service={service} />
            ))}
          </div>
        </div>
      </section>

      {conditions.length > 0 ? (
        <section id="conditions" className="border-t border-shell-200 bg-shell-100 py-16 lg:py-20">
          <div className="container-page">
            <SectionHeading
              eyebrow="Conditions we help with"
              title="Start from your symptoms instead"
              description="If you'd rather not guess which service fits, these pages describe what people commonly experience and how we assess it."
            />

            <ul className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {conditions.map((condition) => (
                <ConditionCard key={condition.slug} condition={condition} />
              ))}
            </ul>
          </div>
        </section>
      ) : null}

      <WhatToExpect steps={settings.whatToExpect} />

      <CTASection
        settings={settings}
        title="Not sure which service you need?"
        description="Describe what's bothering you when you send your request, or call the clinic — we'll point you at the right appointment, even if that turns out to be with someone else."
      />
    </>
  );
}
