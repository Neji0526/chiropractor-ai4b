import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { CTASection } from "@/components/CTASection";
import { BlogCard, PractitionerCard } from "@/components/cards";
import { ButtonLink } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import { JsonLd } from "@/components/ui/JsonLd";
import { Avatar } from "@/components/ui/MediaPanel";
import { SectionHeading } from "@/components/ui/Section";
import {
  getBlogPosts,
  getPractitioner,
  getPractitioners,
  getSiteSettings,
} from "@/lib/content";
import { buildMetadata, truncateForMeta } from "@/lib/seo";
import { practitionerSchema } from "@/lib/structured-data";

type PageProps = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  const practitioners = await getPractitioners();
  return practitioners.map((practitioner) => ({ slug: practitioner.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const practitioner = await getPractitioner(slug);

  if (!practitioner) {
    return buildMetadata({
      title: "Practitioner not found",
      description: "This profile could not be found.",
      path: `/team/${slug}`,
      noIndex: true,
    });
  }

  return buildMetadata({
    title: `${practitioner.name} — ${practitioner.title}`,
    description: truncateForMeta(practitioner.bio[0] ?? practitioner.title),
    path: `/team/${practitioner.slug}`,
    image: practitioner.photo?.src ?? null,
  });
}

export default async function PractitionerPage({ params }: PageProps) {
  const { slug } = await params;
  const practitioner = await getPractitioner(slug);

  if (!practitioner) notFound();

  const [settings, allPractitioners, posts] = await Promise.all([
    getSiteSettings(),
    getPractitioners(),
    getBlogPosts(),
  ]);

  const colleagues = allPractitioners.filter((item) => item.slug !== practitioner.slug);
  const authored = posts.filter((post) => post.authorSlug === practitioner.slug);

  const details: { heading: string; items: string[] }[] = [
    { heading: "Credentials", items: practitioner.credentials },
    { heading: "Education and training", items: practitioner.education },
    { heading: "Areas of focus", items: practitioner.specialties },
  ].filter((group) => group.items.length > 0);

  return (
    <>
      <Breadcrumbs
        items={[
          { name: "Home", href: "/" },
          { name: "Our team", href: "/team" },
          { name: practitioner.name, href: `/team/${practitioner.slug}` },
        ]}
      />

      <section className="border-b border-shell-200 bg-white">
        <div className="container-page grid gap-10 py-12 lg:grid-cols-[0.65fr_1.35fr] lg:gap-16 lg:py-16">
          <Avatar
            image={practitioner.photo}
            name={practitioner.name}
            sizes="(min-width: 1024px) 26rem, 100vw"
          />

          <div>
            <p className="text-xs font-semibold tracking-[0.14em] text-brand-600 uppercase">
              {practitioner.title}
            </p>
            <h1 className="mt-3 text-[2rem] leading-tight sm:text-4xl">
              {practitioner.name}
            </h1>

            <div className="prose-clinic mt-5">
              {practitioner.bio.map((paragraph) => (
                <p key={paragraph.slice(0, 40)}>{paragraph}</p>
              ))}
            </div>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <ButtonLink href="/request-appointment" icon="calendar">
                Request an appointment
              </ButtonLink>
              <ButtonLink
                href={`tel:${settings.phoneHref}`}
                variant="secondary"
                icon="phone"
              >
                {settings.phone}
              </ButtonLink>
            </div>
            <p className="mt-3 text-sm text-ink-500">
              Mention {practitioner.name.split(" ").slice(-1)[0]} in your request and
              we&apos;ll book you in with them where possible.
            </p>
          </div>
        </div>
      </section>

      {details.length > 0 ? (
        <section className="py-14 lg:py-20">
          <div className="container-page grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {details.map((group) => (
              <div
                key={group.heading}
                className="rounded-card border border-shell-200 bg-white p-6 shadow-card"
              >
                <h2 className="text-base font-semibold">{group.heading}</h2>
                <ul className="mt-4 space-y-2.5">
                  {group.items.map((item) => (
                    <li
                      key={item}
                      className="flex gap-2.5 text-sm leading-relaxed text-ink-600"
                    >
                      <Icon name="check" size={15} className="mt-1 shrink-0 text-brand-600" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>
      ) : null}

      {authored.length > 0 ? (
        <section className="border-t border-shell-200 bg-shell-100 py-16 lg:py-20">
          <div className="container-page">
            <SectionHeading
              eyebrow="Resources"
              title={`Articles by ${practitioner.name}`}
            />
            <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {authored.map((post) => (
                <BlogCard key={post.slug} post={post} />
              ))}
            </div>
          </div>
        </section>
      ) : null}

      {colleagues.length > 0 ? (
        <section className="py-16 lg:py-20">
          <div className="container-page">
            <SectionHeading eyebrow="Also at the clinic" title="The rest of the team" />
            <div className="mt-10 grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
              {colleagues.map((colleague) => (
                <PractitionerCard key={colleague.slug} practitioner={colleague} />
              ))}
            </div>
          </div>
        </section>
      ) : null}

      <CTASection settings={settings} />

      <JsonLd data={practitionerSchema(practitioner, settings)} />
    </>
  );
}
