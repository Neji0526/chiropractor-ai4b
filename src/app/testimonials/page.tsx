import type { Metadata } from "next";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { CTASection } from "@/components/CTASection";
import { PageHeader } from "@/components/PageHeader";
import { TestimonialCard } from "@/components/cards";
import { ButtonLink } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import { getSiteSettings, getTestimonials } from "@/lib/content";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Patient Stories",
  description:
    "What patients say about being treated at our Riverton chiropractic clinic, in their own words.",
  path: "/testimonials",
});

export default async function TestimonialsPage() {
  const [settings, testimonials] = await Promise.all([
    getSiteSettings(),
    getTestimonials(),
  ]);

  return (
    <>
      <Breadcrumbs
        items={[
          { name: "Home", href: "/" },
          { name: "Patient stories", href: "/testimonials" },
        ]}
      />

      <PageHeader
        eyebrow="Patient stories"
        title="What patients say"
        description="Reviews shared with us by patients who agreed to have them published. We don't edit them beyond shortening for length, and we don't publish anything without permission."
      />

      <section className="py-14 lg:py-20">
        <div className="container-page">
          {testimonials.length === 0 ? (
            /* Empty state — reached when the clinic hasn't published any reviews yet. */
            <div className="mx-auto max-w-xl rounded-card border border-shell-200 bg-white p-8 text-center shadow-card">
              <span className="mx-auto flex size-11 items-center justify-center rounded-full bg-brand-50 text-brand-700">
                <Icon name="quote" size={20} />
              </span>
              <h2 className="mt-4 text-xl">We&apos;re collecting reviews</h2>
              <p className="mt-2 text-[0.9375rem] leading-relaxed text-ink-600">
                We&apos;d rather show nothing here than publish reviews we can&apos;t
                verify. In the meantime, the team is happy to talk through what care
                involves before you book.
              </p>
              <div className="mt-6 flex flex-col justify-center gap-3 sm:flex-row">
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
            </div>
          ) : (
            <>
              <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                {testimonials.map((testimonial) => (
                  <TestimonialCard key={testimonial.id} testimonial={testimonial} />
                ))}
              </div>

              <p className="mt-8 flex items-start gap-2 text-sm leading-relaxed text-ink-500">
                <Icon name="info" size={16} className="mt-0.5 shrink-0 text-brand-600" />
                Individual experiences vary. What worked for one person isn&apos;t a
                prediction of what will happen for you — that depends on your own
                assessment.
              </p>
            </>
          )}
        </div>
      </section>

      <CTASection settings={settings} />
    </>
  );
}
