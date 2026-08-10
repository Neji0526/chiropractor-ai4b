import type { Metadata } from "next";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { CTASection } from "@/components/CTASection";
import { LocationSection } from "@/components/LocationSection";
import { PageHeader } from "@/components/PageHeader";
import { TrustBar } from "@/components/TrustBar";
import { WhatToExpect } from "@/components/WhatToExpect";
import { PractitionerCard } from "@/components/cards";
import { ButtonLink } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import { MediaPanel } from "@/components/ui/MediaPanel";
import { SectionHeading } from "@/components/ui/Section";
import { getPractitioners, getPrimaryLocation, getSiteSettings } from "@/lib/content";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "About the Clinic",
  description:
    "About our chiropractic clinic in Riverton — how we work, what a course of care looks like, and what you can expect from your first appointment.",
  path: "/about",
});

const PRINCIPLES = [
  {
    title: "Assess before treating",
    body: "Every new patient gets a proper examination. If we can't find something specific to aim treatment at, we say so rather than treating anyway.",
    icon: "shield" as const,
  },
  {
    title: "Explain it properly",
    body: "You should leave your first visit able to explain your own problem to someone else — including the parts we're uncertain about.",
    icon: "info" as const,
  },
  {
    title: "Care that has an end point",
    body: "We give an honest estimate of how many visits we'd expect to review things over, and we don't sell blocks of appointments up front.",
    icon: "calendar" as const,
  },
  {
    title: "Refer when it's not us",
    body: "Some problems need a GP, imaging or a specialist. Recognising those quickly is part of the job, not an admission of failure.",
    icon: "heart" as const,
  },
];

export default async function AboutPage() {
  const [settings, location, practitioners] = await Promise.all([
    getSiteSettings(),
    getPrimaryLocation(),
    getPractitioners(),
  ]);

  return (
    <>
      <Breadcrumbs
        items={[
          { name: "Home", href: "/" },
          { name: "About", href: "/about" },
        ]}
      />

      <PageHeader
        eyebrow="About us"
        title={`A neighbourhood chiropractic clinic in ${location.city}`}
        description={`${settings.clinicName} is a small practice treating the everyday problems people actually come in with: backs that have seized up, necks that won't turn, injuries from training, and aches that build over a working week.`}
      >
        <div className="flex flex-col gap-3 sm:flex-row">
          <ButtonLink href="/request-appointment" icon="calendar">
            {settings.primaryCtaLabel}
          </ButtonLink>
          <ButtonLink href="/team" variant="secondary" icon="arrow-right" iconAfter>
            Meet the team
          </ButtonLink>
        </div>
      </PageHeader>

      <TrustBar points={settings.trustPoints} />

      <section className="py-16 lg:py-24">
        <div className="container-page grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
          <div>
            <SectionHeading
              eyebrow="How we work"
              title="Straightforward care, explained as we go"
            />
            <div className="prose-clinic mt-6">
              <p>
                Most people who come to see us have been putting up with something for a
                while. They&apos;ve tried resting it, stretching it, or waiting for it to
                settle, and it hasn&apos;t. What they usually want first isn&apos;t
                treatment — it&apos;s an explanation.
              </p>
              <p>
                So that&apos;s where we start. We take a proper history, examine how you
                move, and test the joints and muscles involved. Then we tell you what we
                found, what we think is driving it, and what we&apos;d suggest doing about
                it. If chiropractic care isn&apos;t the right answer, we&apos;ll say so and
                point you somewhere more useful.
              </p>
              <p>
                Care itself is hands-on — adjustment or gentle mobilisation, soft-tissue
                work — combined with a short list of things to do between visits. We keep
                that list deliberately short, because a programme you&apos;ll actually
                follow beats a printed sheet you won&apos;t.
              </p>
            </div>
          </div>

          <MediaPanel
            image={null}
            ratio="aspect-[4/3]"
            placeholderLabel="Photo of the clinic reception or treatment room"
          />
        </div>
      </section>

      <section className="border-y border-shell-200 bg-shell-100 py-16 lg:py-24">
        <div className="container-page">
          <SectionHeading
            eyebrow="What we stand by"
            title="Four things you can hold us to"
            align="center"
          />

          <ul className="mt-10 grid gap-5 sm:grid-cols-2">
            {PRINCIPLES.map((principle) => (
              <li
                key={principle.title}
                className="rounded-card border border-shell-200 bg-white p-6"
              >
                <span className="flex size-10 items-center justify-center rounded-full bg-brand-50 text-brand-700">
                  <Icon name={principle.icon} size={19} />
                </span>
                <h3 className="mt-4 text-lg">{principle.title}</h3>
                <p className="mt-2 text-[0.9375rem] leading-relaxed text-ink-600">
                  {principle.body}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <WhatToExpect steps={settings.whatToExpect} />

      {practitioners.length > 0 ? (
        <section className="py-16 lg:py-24">
          <div className="container-page">
            <div className="flex flex-wrap items-end justify-between gap-6">
              <SectionHeading eyebrow="Our team" title="Who you'll see" />
              <ButtonLink href="/team" variant="secondary" icon="arrow-right" iconAfter>
                Full profiles
              </ButtonLink>
            </div>
            <div className="mt-10 grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
              {practitioners.map((practitioner) => (
                <PractitionerCard key={practitioner.slug} practitioner={practitioner} />
              ))}
            </div>
          </div>
        </section>
      ) : null}

      <LocationSection location={location} settings={settings} />

      <CTASection settings={settings} />
    </>
  );
}
