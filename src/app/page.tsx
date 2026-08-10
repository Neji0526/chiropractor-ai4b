import Link from "next/link";
import { CTASection } from "@/components/CTASection";
import { FAQAccordion } from "@/components/FAQAccordion";
import { Hero } from "@/components/Hero";
import { LocationSection } from "@/components/LocationSection";
import { TrustBar } from "@/components/TrustBar";
import { WhatToExpect } from "@/components/WhatToExpect";
import {
  BlogCard,
  ConditionCard,
  PractitionerCard,
  ServiceCard,
  TestimonialCard,
} from "@/components/cards";
import { ButtonLink } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import { JsonLd } from "@/components/ui/JsonLd";
import { MediaPanel } from "@/components/ui/MediaPanel";
import { SectionHeading } from "@/components/ui/Section";
import {
  getBlogPosts,
  getConditions,
  getFeaturedTestimonials,
  getPractitioners,
  getPrimaryLocation,
  getServices,
  getSiteSettings,
  getTopFaqs,
} from "@/lib/content";
import { faqSchema } from "@/lib/structured-data";

/**
 * Homepage.
 *
 * Section order follows the conversion path in the brief:
 * hero → trust → services → conditions → practitioners → what to expect →
 * testimonials → FAQ → location → final CTA.
 */
export default async function HomePage() {
  const [
    settings,
    location,
    services,
    conditions,
    practitioners,
    testimonials,
    faqs,
    posts,
  ] = await Promise.all([
    getSiteSettings(),
    getPrimaryLocation(),
    getServices(),
    getConditions(),
    getPractitioners(),
    getFeaturedTestimonials(3),
    getTopFaqs(5),
    getBlogPosts(),
  ]);

  const quickLinks = services.slice(0, 4).map(({ slug, title }) => ({ slug, title }));
  const recentPosts = posts.slice(0, 3);

  return (
    <>
      <Hero settings={settings} location={location} quickLinks={quickLinks} />

      <TrustBar points={settings.trustPoints} />

      {/* Services */}
      <section className="py-16 lg:py-24">
        <div className="container-page">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <SectionHeading
              eyebrow="How we can help"
              title="Chiropractic care, matched to what's actually bothering you"
              description="Every course of care starts with an assessment, so what happens next depends on what we find rather than a fixed programme."
            />
            <ButtonLink href="/services" variant="secondary" icon="arrow-right" iconAfter>
              See all services
            </ButtonLink>
          </div>

          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {services.slice(0, 6).map((service) => (
              <ServiceCard key={service.slug} service={service} />
            ))}
          </div>
        </div>
      </section>

      {/* Conditions */}
      {conditions.length > 0 ? (
        <section id="conditions" className="border-y border-shell-200 bg-shell-100 py-16 lg:py-24">
          <div className="container-page">
            <SectionHeading
              eyebrow="Conditions we help with"
              title="Not sure which service you need?"
              description="Start with what you're experiencing. Each page explains how we assess it and when it needs a medical opinion instead."
            />

            <ul className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {conditions.map((condition) => (
                <ConditionCard key={condition.slug} condition={condition} />
              ))}
            </ul>
          </div>
        </section>
      ) : null}

      {/* Why this clinic */}
      <section className="py-16 lg:py-24">
        <div className="container-page grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
          <MediaPanel
            image={null}
            ratio="aspect-[4/3]"
            placeholderLabel="Photo of the clinic or treatment room"
          />

          <div>
            <SectionHeading
              eyebrow={`Why ${settings.clinicName}`}
              title="A clinic that tells you what it actually thinks"
              description="We'd rather be straight with you than book you in for a course of care you don't need."
            />

            <ul className="mt-8 space-y-5">
              {[
                {
                  title: "An assessment before any treatment",
                  body: "We examine how you move and test what's involved, so care is aimed at something specific.",
                },
                {
                  title: "Plain-language explanations",
                  body: "You'll leave able to describe your own problem to someone else — including what we're not sure about.",
                },
                {
                  title: "No long pre-paid packages",
                  body: "We'll estimate how many visits we expect to review things over, and revisit it as we go.",
                },
                {
                  title: "Referral when that's the right answer",
                  body: "If your symptoms need imaging, a GP or another specialist, we'll say so at the first visit.",
                },
              ].map((item) => (
                <li key={item.title} className="flex gap-3.5">
                  <span className="mt-0.5 flex size-6 shrink-0 items-center justify-center rounded-full bg-sage-100 text-sage-700">
                    <Icon name="check" size={14} />
                  </span>
                  <div>
                    <h3 className="text-base font-semibold">{item.title}</h3>
                    <p className="mt-1 text-[0.9375rem] leading-relaxed text-ink-600">
                      {item.body}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Team */}
      {practitioners.length > 0 ? (
        <section className="border-t border-shell-200 bg-white py-16 lg:py-24">
          <div className="container-page">
            <div className="flex flex-wrap items-end justify-between gap-6">
              <SectionHeading
                eyebrow="Meet the team"
                title="The chiropractors you'll see"
                description="You can ask to see a specific practitioner when you book, and you're welcome to bring someone with you to any appointment."
              />
              <ButtonLink href="/team" variant="secondary" icon="arrow-right" iconAfter>
                Read full profiles
              </ButtonLink>
            </div>

            <div className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {practitioners.map((practitioner) => (
                <PractitionerCard key={practitioner.slug} practitioner={practitioner} />
              ))}
            </div>
          </div>
        </section>
      ) : null}

      <WhatToExpect steps={settings.whatToExpect} />

      {/* Testimonials */}
      {testimonials.length > 0 ? (
        <section className="py-16 lg:py-24">
          <div className="container-page">
            <div className="flex flex-wrap items-end justify-between gap-6">
              <SectionHeading
                eyebrow="Patient stories"
                title="What patients say about coming here"
              />
              <ButtonLink href="/testimonials" variant="secondary" icon="arrow-right" iconAfter>
                Read more stories
              </ButtonLink>
            </div>

            <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {testimonials.map((testimonial) => (
                <TestimonialCard key={testimonial.id} testimonial={testimonial} />
              ))}
            </div>
          </div>
        </section>
      ) : null}

      {/* FAQ */}
      {faqs.length > 0 ? (
        <section className="border-y border-shell-200 bg-shell-100 py-16 lg:py-24">
          <div className="container-page grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
            <div>
              <SectionHeading
                eyebrow="Common questions"
                title="Questions people ask before booking"
                description="If yours isn't here, call the clinic and ask — there's no charge for a quick conversation about whether we can help."
              />
              <ButtonLink
                href="/faq"
                variant="secondary"
                icon="arrow-right"
                iconAfter
                className="mt-6"
              >
                All frequently asked questions
              </ButtonLink>
            </div>

            <FAQAccordion items={faqs} groupName="home-faq" />
          </div>
        </section>
      ) : null}

      {/* Resources */}
      {recentPosts.length > 0 ? (
        <section className="py-16 lg:py-24">
          <div className="container-page">
            <div className="flex flex-wrap items-end justify-between gap-6">
              <SectionHeading
                eyebrow="Resources"
                title="Practical reading from the clinic"
                description="Short, useful articles written by the team — not medical advice for your specific situation."
              />
              <Link
                href="/blog"
                className="inline-flex items-center gap-1.5 text-sm font-medium text-brand-700 hover:underline"
              >
                All resources
                <Icon name="arrow-right" size={16} />
              </Link>
            </div>

            <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {recentPosts.map((post) => (
                <BlogCard key={post.slug} post={post} />
              ))}
            </div>
          </div>
        </section>
      ) : null}

      <LocationSection location={location} settings={settings} />

      <CTASection settings={settings} />

      {faqs.length > 0 ? <JsonLd data={faqSchema(faqs)} /> : null}
    </>
  );
}
