import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { CTASection } from "@/components/CTASection";
import { FAQAccordion } from "@/components/FAQAccordion";
import { LeadForm } from "@/components/forms/LeadForm";
import { ServiceCard } from "@/components/cards";
import { ButtonLink } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import { JsonLd } from "@/components/ui/JsonLd";
import { MediaPanel } from "@/components/ui/MediaPanel";
import { SectionHeading } from "@/components/ui/Section";
import {
  getConditions,
  getPrimaryLocation,
  getService,
  getServiceTitles,
  getServices,
  getSiteSettings,
  getTopFaqs,
} from "@/lib/content";
import { buildMetadata } from "@/lib/seo";
import { serviceSchema } from "@/lib/structured-data";

type PageProps = { params: Promise<{ slug: string }> };

/** Pre-render every published service at build time. */
export async function generateStaticParams() {
  const services = await getServices();
  return services.map((service) => ({ slug: service.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const service = await getService(slug);

  if (!service) {
    return buildMetadata({
      title: "Service not found",
      description: "This service page could not be found.",
      path: `/services/${slug}`,
      noIndex: true,
    });
  }

  return buildMetadata({
    title: service.seoTitle ?? service.title,
    description: service.seoDescription ?? service.shortDescription,
    path: `/services/${service.slug}`,
    image: service.featuredImage?.src ?? null,
  });
}

export default async function ServicePage({ params }: PageProps) {
  const { slug } = await params;
  const service = await getService(slug);

  if (!service) notFound();

  const [settings, location, allConditions, allServices, serviceOptions, faqs] =
    await Promise.all([
      getSiteSettings(),
      getPrimaryLocation(),
      getConditions(),
      getServices(),
      getServiceTitles(),
      getTopFaqs(4),
    ]);

  const relatedConditions = allConditions.filter((condition) =>
    service.relatedConditions.includes(condition.slug),
  );

  const otherServices = allServices
    .filter((item) => item.slug !== service.slug)
    .slice(0, 3);

  return (
    <>
      <Breadcrumbs
        items={[
          { name: "Home", href: "/" },
          { name: "Services", href: "/services" },
          { name: service.title, href: `/services/${service.slug}` },
        ]}
      />

      {/* Intro + inline booking form: the answer and the action on one screen. */}
      <section className="border-b border-shell-200 bg-white">
        <div className="container-page grid gap-10 py-12 lg:grid-cols-[1.15fr_1fr] lg:gap-16 lg:py-16">
          <div>
            <p className="text-xs font-semibold tracking-[0.14em] text-brand-600 uppercase">
              Service
            </p>
            <h1 className="mt-3 text-[2rem] leading-[1.15] sm:text-4xl">
              {service.title} in {location.city}
            </h1>
            <p className="mt-4 text-lg leading-relaxed text-ink-600">
              {service.shortDescription}
            </p>

            <div className="mt-7 flex flex-col gap-3 sm:flex-row">
              <ButtonLink href="#request" icon="calendar">
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

            {service.goodFitFor.length > 0 ? (
              <div className="mt-9 rounded-card border border-shell-200 bg-shell-50 p-5">
                <h2 className="text-sm font-semibold text-ink-900">
                  People often book this when they have
                </h2>
                <ul className="mt-3 space-y-2">
                  {service.goodFitFor.map((item) => (
                    <li key={item} className="flex gap-2.5 text-[0.9375rem] text-ink-600">
                      <Icon
                        name="check"
                        size={16}
                        className="mt-1 shrink-0 text-sage-600"
                      />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ) : null}
          </div>

          <MediaPanel
            image={service.featuredImage}
            ratio="aspect-[4/3] lg:aspect-[4/5]"
            placeholderLabel={`Photo — ${service.title}`}
            priority
            sizes="(min-width: 1024px) 40vw, 100vw"
          />
        </div>
      </section>

      {/* Body copy and benefits */}
      <section className="py-14 lg:py-20">
        <div className="container-page grid gap-10 lg:grid-cols-[1.4fr_1fr] lg:gap-16">
          <div className="prose-clinic">
            <h2 className="sr-only">About {service.title}</h2>
            {service.body.map((paragraph) => (
              <p key={paragraph.slice(0, 40)}>{paragraph}</p>
            ))}
          </div>

          <aside className="space-y-6">
            {service.benefits.length > 0 ? (
              <div className="rounded-card border border-shell-200 bg-white p-6 shadow-card">
                <h2 className="text-base font-semibold">What this involves</h2>
                <ul className="mt-4 space-y-3">
                  {service.benefits.map((benefit) => (
                    <li key={benefit} className="flex gap-2.5 text-sm leading-relaxed text-ink-600">
                      <Icon name="check" size={15} className="mt-1 shrink-0 text-brand-600" />
                      {benefit}
                    </li>
                  ))}
                </ul>
              </div>
            ) : null}

            {relatedConditions.length > 0 ? (
              <div className="rounded-card border border-shell-200 bg-shell-50 p-6">
                <h2 className="text-base font-semibold">Related conditions</h2>
                <ul className="mt-3 space-y-2">
                  {relatedConditions.map((condition) => (
                    <li key={condition.slug}>
                      <Link
                        href={`/conditions/${condition.slug}`}
                        className="inline-flex items-center gap-1.5 text-sm font-medium text-brand-700 hover:underline"
                      >
                        {condition.title}
                        <Icon name="arrow-right" size={14} />
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ) : null}

            <div className="rounded-card border border-shell-200 bg-white p-6">
              <h2 className="text-base font-semibold">Visiting the clinic</h2>
              <p className="mt-2 text-sm leading-relaxed text-ink-600">
                {location.addressLine1}
                {location.addressLine2 ? `, ${location.addressLine2}` : ""},{" "}
                {location.city}, {location.state} {location.postalCode}
              </p>
              <Link
                href="/contact#hours"
                className="mt-3 inline-flex items-center gap-1.5 text-sm font-medium text-brand-700 hover:underline"
              >
                Opening hours and directions
                <Icon name="arrow-right" size={14} />
              </Link>
            </div>
          </aside>
        </div>
      </section>

      {/* Inline lead capture, pre-set to this service */}
      <section id="request" className="scroll-mt-28 border-y border-shell-200 bg-shell-100 py-16 lg:py-20">
        <div className="container-page grid gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
          <div>
            <SectionHeading
              eyebrow="Request an appointment"
              title={`Book ${service.title.toLowerCase()}`}
              description="Send a request and we'll come back to you with a time. Tell us the days that work and we'll do our best to fit around them."
            />
            <p className="mt-6 flex items-start gap-2 text-sm leading-relaxed text-ink-600">
              <Icon name="info" size={17} className="mt-0.5 shrink-0 text-brand-600" />
              This form is for appointment requests only. If your symptoms are severe or
              getting rapidly worse, please seek urgent medical care instead.
            </p>
          </div>

          <LeadForm
            services={serviceOptions}
            consentText={settings.formConsentText}
            phone={settings.phone}
            phoneHref={settings.phoneHref}
            defaultServiceSlug={service.slug}
          />
        </div>
      </section>

      {faqs.length > 0 ? (
        <section className="py-16 lg:py-20">
          <div className="container-page grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
            <SectionHeading
              eyebrow="Before you book"
              title="Common questions"
              description="More answers on the FAQ page, or just call and ask."
            />
            <FAQAccordion items={faqs} groupName="service-faq" />
          </div>
        </section>
      ) : null}

      {otherServices.length > 0 ? (
        <section className="border-t border-shell-200 bg-white py-16 lg:py-20">
          <div className="container-page">
            <SectionHeading eyebrow="Also at the clinic" title="Other services" />
            <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {otherServices.map((item) => (
                <ServiceCard key={item.slug} service={item} />
              ))}
            </div>
          </div>
        </section>
      ) : null}

      <CTASection
        settings={settings}
        title={`Questions about ${service.title.toLowerCase()}?`}
        description="Call the clinic and describe what's going on. We'll tell you honestly whether this is the right appointment for you."
      />

      <JsonLd data={serviceSchema(service, settings, location)} />
    </>
  );
}
