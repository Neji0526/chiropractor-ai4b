import type { Metadata } from "next";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { CTASection } from "@/components/CTASection";
import { PageHeader } from "@/components/PageHeader";
import { PractitionerCard } from "@/components/cards";
import { MediaPanel } from "@/components/ui/MediaPanel";
import { getPractitioners, getSiteSettings } from "@/lib/content";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Our Chiropractors",
  description:
    "Meet the chiropractors at our Riverton clinic, what each of them focuses on, and how to book with a specific practitioner.",
  path: "/team",
});

export default async function TeamPage() {
  const [settings, practitioners] = await Promise.all([
    getSiteSettings(),
    getPractitioners(),
  ]);

  return (
    <>
      <Breadcrumbs
        items={[
          { name: "Home", href: "/" },
          { name: "Our team", href: "/team" },
        ]}
      />

      <PageHeader
        eyebrow="Our team"
        title="The chiropractors you'll see"
        description="You can ask for a particular practitioner when you book. If you'd rather we matched you to whoever has the most relevant experience, say so in your request and we'll do that."
      />

      {/* A photo of the clinic rather than of the team: the cards below use
          initials on purpose, because a stock portrait must never stand in for a
          named clinician. Swap both once real photography exists. */}
      {settings.photos.team ? (
        <div className="container-page pt-10 lg:pt-14">
          <MediaPanel
            image={settings.photos.team}
            ratio="aspect-[16/9] lg:aspect-[21/9]"
            rounded="rounded-xl"
            sizes="(min-width: 1280px) 72rem, 100vw"
            placeholderLabel="Photo of the clinic"
          />
        </div>
      ) : null}

      <section className="py-14 lg:py-20">
        <div className="container-page">
          {practitioners.length === 0 ? (
            <p className="text-ink-600">
              Practitioner profiles are being updated. Please call the clinic on{" "}
              {settings.phone} and we&apos;ll tell you who&apos;s available.
            </p>
          ) : (
            <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
              {practitioners.map((practitioner) => (
                <PractitionerCard key={practitioner.slug} practitioner={practitioner} />
              ))}
            </div>
          )}
        </div>
      </section>

      <CTASection
        settings={settings}
        title="Book with the team"
        description="Send a request with the practitioner you'd like to see, or call the clinic and we'll tell you who has availability this week."
      />
    </>
  );
}
