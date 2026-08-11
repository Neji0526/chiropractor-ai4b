import { CTASection } from "@/components/CTASection";
import { FAQAccordion } from "@/components/FAQAccordion";
import { Hero } from "@/components/Hero";
import { WhatToExpect } from "@/components/WhatToExpect";
import { WhoWeHelp } from "@/components/WhoWeHelp";
import {
  BlogCardWide,
  PractitionerCard,
  ServiceCard,
  TestimonialCard,
} from "@/components/cards";
import { ButtonLink } from "@/components/ui/Button";
import { JsonLd } from "@/components/ui/JsonLd";
import { SectionHeading } from "@/components/ui/Section";
import {
  getBlogPosts,
  getConditions,
  getFeaturedTestimonials,
  getPractitioners,
  getServices,
  getSiteSettings,
  getTopFaqs,
} from "@/lib/content";
import { faqSchema } from "@/lib/structured-data";

/**
 * Homepage.
 *
 * Section order follows the approved design:
 * hero → services → who we help → team → how it works → reviews → FAQ →
 * resources → closing CTA.
 *
 * The design has no location/map band here — the clinic's address, hours and
 * phone sit in the footer on every page, and in full on /contact.
 */
export default async function HomePage() {
  const [
    settings,
    services,
    conditions,
    practitioners,
    testimonials,
    faqs,
    posts,
  ] = await Promise.all([
    getSiteSettings(),
    getServices(),
    getConditions(),
    getPractitioners(),
    getFeaturedTestimonials(3),
    getTopFaqs(5),
    getBlogPosts(),
  ]);

  const recentPosts = posts.slice(0, 3);

  return (
    <>
      <Hero settings={settings} />

      {/* Services */}
      <section className="bg-white py-14 lg:py-20">
        <div className="container-page">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <SectionHeading
              eyebrow="Our services"
              title="Chiropractic care, matched to what's actually bothering you"
              description="We offer a range of services designed to help you heal, move better and live pain-free."
            />
            <ButtonLink href="/services" variant="secondary" size="sm" icon="arrow-right" iconAfter>
              View All Services
            </ButtonLink>
          </div>

          <div className="mt-9 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {services.slice(0, 6).map((service) => (
              <ServiceCard key={service.slug} service={service} />
            ))}
          </div>
        </div>
      </section>

      <WhoWeHelp conditions={conditions} settings={settings} />

      {/* Team */}
      {practitioners.length > 0 ? (
        <section className="bg-white py-14 lg:py-20">
          <div className="container-page">
            <div className="flex flex-wrap items-end justify-between gap-6">
              <SectionHeading
                eyebrow="Our chiropractors"
                title="The chiropractors you'll see"
                description="Our experienced team is here to help you feel your best. You can ask for a particular practitioner when you book."
              />
              <ButtonLink href="/team" variant="secondary" size="sm" icon="arrow-right" iconAfter>
                Meet The Team
              </ButtonLink>
            </div>

            <div className="mt-9 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {practitioners.map((practitioner) => (
                <PractitionerCard key={practitioner.slug} practitioner={practitioner} />
              ))}
            </div>
          </div>
        </section>
      ) : null}

      <WhatToExpect steps={settings.whatToExpect} />

      {/* Reviews */}
      {testimonials.length > 0 ? (
        <section className="bg-white py-14 lg:py-20">
          <div className="container-page">
            <div className="flex flex-wrap items-end justify-between gap-6">
              <SectionHeading
                eyebrow="Patient reviews"
                title="What patients say about coming here"
              />
              <ButtonLink
                href="/testimonials"
                variant="secondary"
                size="sm"
                icon="arrow-right"
                iconAfter
              >
                Read More Reviews
              </ButtonLink>
            </div>

            <div className="mt-9 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {testimonials.map((testimonial) => (
                <TestimonialCard key={testimonial.id} testimonial={testimonial} />
              ))}
            </div>
          </div>
        </section>
      ) : null}

      {/* FAQ */}
      {faqs.length > 0 ? (
        <section className="border-y border-shell-200 bg-shell-100 py-14 lg:py-20">
          <div className="container-page grid gap-10 lg:grid-cols-[0.75fr_1.25fr] lg:gap-14">
            <div>
              <SectionHeading
                eyebrow="Questions?"
                title="Questions people ask before booking"
                description="Find quick answers to the most common questions — or call the clinic and ask."
              />
              <ButtonLink
                href="/faq"
                variant="secondary"
                size="sm"
                icon="arrow-right"
                iconAfter
                className="mt-6"
              >
                See All FAQs
              </ButtonLink>
            </div>

            <FAQAccordion items={faqs} groupName="home-faq" />
          </div>
        </section>
      ) : null}

      {/* Resources */}
      {recentPosts.length > 0 ? (
        <section className="bg-white py-14 lg:py-20">
          <div className="container-page">
            <div className="flex flex-wrap items-end justify-between gap-6">
              <SectionHeading
                eyebrow="Resources"
                title="Practical reading from the clinic"
                description="Tips, guides and helpful information to support your health — general information, not advice for your situation."
              />
              <ButtonLink href="/blog" variant="secondary" size="sm" icon="arrow-right" iconAfter>
                View All Articles
              </ButtonLink>
            </div>

            <div className="mt-9 grid gap-4 lg:grid-cols-3">
              {recentPosts.map((post) => (
                <BlogCardWide key={post.slug} post={post} />
              ))}
            </div>
          </div>
        </section>
      ) : null}

      <CTASection settings={settings} />

      {faqs.length > 0 ? <JsonLd data={faqSchema(faqs)} /> : null}
    </>
  );
}
