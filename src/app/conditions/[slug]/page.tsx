import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { CTASection } from "@/components/CTASection";
import { PageHeader } from "@/components/PageHeader";
import { WhatToExpect } from "@/components/WhatToExpect";
import { ServiceCard } from "@/components/cards";
import { ButtonLink } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import { SectionHeading } from "@/components/ui/Section";
import {
  getCondition,
  getConditions,
  getServices,
  getSiteSettings,
} from "@/lib/content";
import { buildMetadata } from "@/lib/seo";

type PageProps = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  const conditions = await getConditions();
  return conditions.map((condition) => ({ slug: condition.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const condition = await getCondition(slug);

  if (!condition) {
    return buildMetadata({
      title: "Condition not found",
      description: "This page could not be found.",
      path: `/conditions/${slug}`,
      noIndex: true,
    });
  }

  return buildMetadata({
    title: condition.seoTitle ?? condition.title,
    description: condition.seoDescription ?? condition.shortDescription,
    path: `/conditions/${condition.slug}`,
    image: condition.featuredImage?.src ?? null,
  });
}

export default async function ConditionPage({ params }: PageProps) {
  const { slug } = await params;
  const condition = await getCondition(slug);

  if (!condition) notFound();

  const [settings, allServices] = await Promise.all([
    getSiteSettings(),
    getServices(),
  ]);

  const relatedServices = allServices.filter((service) =>
    condition.relatedServices.includes(service.slug),
  );

  return (
    <>
      <Breadcrumbs
        items={[
          { name: "Home", href: "/" },
          { name: "Conditions", href: "/conditions" },
          { name: condition.title, href: `/conditions/${condition.slug}` },
        ]}
      />

      <PageHeader
        eyebrow="Conditions we help with"
        title={condition.title}
        description={condition.shortDescription}
      >
        <div className="flex flex-col gap-3 sm:flex-row">
          <ButtonLink href="/request-appointment" icon="calendar">
            {settings.primaryCtaLabel}
          </ButtonLink>
          <ButtonLink href={`tel:${settings.phoneHref}`} variant="secondary" icon="phone">
            {settings.phone}
          </ButtonLink>
        </div>
      </PageHeader>

      <section className="py-14 lg:py-20">
        <div className="container-page grid gap-10 lg:grid-cols-[1.4fr_1fr] lg:gap-16">
          <div className="prose-clinic">
            {condition.body.map((paragraph) => (
              <p key={paragraph.slice(0, 40)}>{paragraph}</p>
            ))}
          </div>

          <aside className="space-y-6">
            {condition.commonSigns.length > 0 ? (
              <div className="rounded-card border border-shell-200 bg-white p-6 shadow-card">
                <h2 className="text-base font-semibold">
                  What people often describe
                </h2>
                <ul className="mt-4 space-y-3">
                  {condition.commonSigns.map((sign) => (
                    <li
                      key={sign}
                      className="flex gap-2.5 text-sm leading-relaxed text-ink-600"
                    >
                      <Icon name="check" size={15} className="mt-1 shrink-0 text-brand-600" />
                      {sign}
                    </li>
                  ))}
                </ul>
                <p className="mt-4 border-t border-shell-200 pt-4 text-xs leading-relaxed text-ink-500">
                  This list is here to help you decide whether to get assessed. It
                  isn&apos;t a diagnosis, and you don&apos;t need to match all of it.
                </p>
              </div>
            ) : null}

            {relatedServices.length > 0 ? (
              <div className="rounded-card border border-shell-200 bg-shell-50 p-6">
                <h2 className="text-base font-semibold">Services that may apply</h2>
                <ul className="mt-3 space-y-2">
                  {relatedServices.map((service) => (
                    <li key={service.slug}>
                      <Link
                        href={`/services/${service.slug}`}
                        className="inline-flex items-center gap-1.5 text-sm font-medium text-brand-700 hover:underline"
                      >
                        {service.title}
                        <Icon name="arrow-right" size={14} />
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ) : null}
          </aside>
        </div>
      </section>

      <WhatToExpect steps={settings.whatToExpect} />

      {relatedServices.length > 0 ? (
        <section className="py-16 lg:py-20">
          <div className="container-page">
            <SectionHeading
              eyebrow="How we'd approach it"
              title="Services related to this"
            />
            <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {relatedServices.map((service) => (
                <ServiceCard key={service.slug} service={service} />
              ))}
            </div>
          </div>
        </section>
      ) : null}

      <CTASection
        settings={settings}
        title={`Get ${condition.title.toLowerCase()} assessed`}
        description="Send an appointment request or call the clinic. If what you describe needs a doctor rather than a chiropractor, we'll tell you that up front."
      />
    </>
  );
}
