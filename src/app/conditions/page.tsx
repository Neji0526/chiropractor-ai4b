import type { Metadata } from "next";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { CTASection } from "@/components/CTASection";
import { PageHeader } from "@/components/PageHeader";
import { ConditionCard } from "@/components/cards";
import { Icon } from "@/components/ui/Icon";
import { getConditions, getSiteSettings } from "@/lib/content";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Conditions We Help With",
  description:
    "Back pain, neck pain, sciatica, neck-related headaches, sports injuries and posture strain — how we assess each one at our Riverton clinic.",
  path: "/conditions",
});

export default async function ConditionsPage() {
  const [settings, conditions] = await Promise.all([
    getSiteSettings(),
    getConditions(),
  ]);

  return (
    <>
      <Breadcrumbs
        items={[
          { name: "Home", href: "/" },
          { name: "Conditions", href: "/conditions" },
        ]}
      />

      <PageHeader
        eyebrow="Conditions we help with"
        title="Start with what you're experiencing"
        description="These pages describe what people commonly notice, what an assessment involves, and — just as importantly — when a symptom needs a medical opinion rather than chiropractic care."
      />

      <section className="py-14 lg:py-20">
        <div className="container-page">
          <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {conditions.map((condition) => (
              <ConditionCard key={condition.slug} condition={condition} />
            ))}
          </ul>

          <div className="mt-10 flex items-start gap-3 rounded-card border border-shell-300 bg-shell-100 p-5 text-sm leading-relaxed text-ink-600">
            <Icon name="info" size={18} className="mt-0.5 shrink-0 text-brand-600" />
            <p>
              Nothing on these pages is a diagnosis. If you&apos;re unsure whether
              we&apos;re the right people to see, call the clinic on{" "}
              <a
                href={`tel:${settings.phoneHref}`}
                className="font-medium text-brand-700 hover:underline"
              >
                {settings.phone}
              </a>{" "}
              and describe what&apos;s happening — there&apos;s no charge for that
              conversation.
            </p>
          </div>
        </div>
      </section>

      <CTASection settings={settings} />
    </>
  );
}
