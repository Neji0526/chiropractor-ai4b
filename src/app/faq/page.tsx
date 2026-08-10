import type { Metadata } from "next";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { CTASection } from "@/components/CTASection";
import { FAQAccordion } from "@/components/FAQAccordion";
import { PageHeader } from "@/components/PageHeader";
import { ButtonLink } from "@/components/ui/Button";
import { JsonLd } from "@/components/ui/JsonLd";
import { getFaqs, getFaqsByCategory, getSiteSettings } from "@/lib/content";
import { buildMetadata } from "@/lib/seo";
import { faqSchema } from "@/lib/structured-data";

export const metadata: Metadata = buildMetadata({
  title: "Frequently Asked Questions",
  description:
    "Answers about appointments, first visits, treatment, cost and insurance at our Riverton chiropractic clinic.",
  path: "/faq",
});

export default async function FaqPage() {
  const [settings, groups, allFaqs] = await Promise.all([
    getSiteSettings(),
    getFaqsByCategory(),
    getFaqs(),
  ]);

  return (
    <>
      <Breadcrumbs
        items={[
          { name: "Home", href: "/" },
          { name: "FAQs", href: "/faq" },
        ]}
      />

      <PageHeader
        eyebrow="Common questions"
        title="Frequently asked questions"
        description="The things people most often ask before booking. If yours isn't answered here, call the clinic — we're happy to talk it through before you commit to an appointment."
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
        <div className="container-page grid gap-10 lg:grid-cols-[0.3fr_1fr] lg:gap-14">
          {/* Category jump links */}
          <nav aria-label="Question categories" className="lg:sticky lg:top-32 lg:self-start">
            <h2 className="text-xs font-semibold tracking-[0.14em] text-ink-500 uppercase">
              Jump to
            </h2>
            <ul className="mt-3 space-y-1.5">
              {groups.map((group) => (
                <li key={group.category}>
                  <a
                    href={`#${slugify(group.category)}`}
                    className="text-[0.9375rem] text-brand-700 hover:underline"
                  >
                    {group.category}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="space-y-10">
            {groups.map((group) => (
              <div key={group.category} id={slugify(group.category)} className="scroll-mt-28">
                <h2 className="text-xl sm:text-2xl">{group.category}</h2>
                <FAQAccordion
                  items={group.items}
                  groupName={`faq-${slugify(group.category)}`}
                  className="mt-4"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      <CTASection
        settings={settings}
        title="Still have a question?"
        description="Call the clinic and ask. There's no charge for a short conversation about whether we're the right people to see."
      />

      {allFaqs.length > 0 ? <JsonLd data={faqSchema(allFaqs)} /> : null}
    </>
  );
}

function slugify(value: string): string {
  return value
    .toLowerCase()
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}
