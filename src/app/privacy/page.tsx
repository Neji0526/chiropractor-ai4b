import type { Metadata } from "next";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { PageHeader } from "@/components/PageHeader";
import { Icon } from "@/components/ui/Icon";
import { getPrimaryLocation, getSiteSettings } from "@/lib/content";
import { formatAddress } from "@/lib/format";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Privacy Notice",
  description:
    "How the clinic handles the information you send through this website, and who to contact about it.",
  path: "/privacy",
});

/**
 * PLACEHOLDER PRIVACY NOTICE.
 *
 * This describes what the website itself does with form submissions. It is not
 * legal advice and it is not a complete privacy policy — the clinic's own notice
 * must cover patient records, retention periods and the applicable regime
 * (HIPAA, GDPR/UK GDPR or local equivalent). Have it reviewed before launch.
 */
export default async function PrivacyPage() {
  const [settings, location] = await Promise.all([
    getSiteSettings(),
    getPrimaryLocation(),
  ]);

  return (
    <>
      <Breadcrumbs
        items={[
          { name: "Home", href: "/" },
          { name: "Privacy notice", href: "/privacy" },
        ]}
      />

      <PageHeader
        eyebrow="Privacy"
        title="Privacy notice"
        description="What happens to the information you send us through this website."
      />

      <section className="py-14 lg:py-20">
        <div className="container-page">
          <div className="mb-8 flex items-start gap-3 rounded-card border border-amber-200 bg-amber-50 p-5 text-sm leading-relaxed text-amber-900">
            <Icon name="info" size={18} className="mt-0.5 shrink-0" />
            <p>
              <strong className="font-semibold">Template content.</strong> This page is a
              starting point covering the website forms only. Replace it with the
              clinic&apos;s own privacy notice, reviewed against the data protection rules
              that apply to your practice, before going live.
            </p>
          </div>

          <div className="prose-clinic max-w-3xl">
            <h2>What we collect</h2>
            <p>
              When you send an appointment request or enquiry, we collect your name, phone
              number, email address, the service you selected, how you&apos;d like us to
              reply and anything you write in the message box. We also record which page
              you submitted the form from and any campaign parameters in the link you
              arrived through, so we know which parts of the site are useful.
            </p>

            <h2>What we don&apos;t ask for</h2>
            <p>
              Our web forms don&apos;t ask for medical history, medication, date of birth
              or insurance details. Please don&apos;t send detailed health information
              through the website — we&apos;ll collect what&apos;s clinically relevant in
              person, where it can be recorded properly.
            </p>

            <h2>Why we use it</h2>
            <ul>
              <li>To contact you about the appointment or question you sent.</li>
              <li>To keep a record of enquiries so nothing gets missed.</li>
              <li>
                To understand which pages and campaigns bring people to the clinic, in
                aggregate.
              </li>
            </ul>
            <p>
              We don&apos;t sell your details, and we don&apos;t add you to a marketing
              list without asking you first.
            </p>

            <h2>How long we keep it</h2>
            <p>
              Website enquiries are kept for [retention period] and then deleted. If you
              become a patient, your clinical records are held separately under the
              retention rules that apply to health records.
            </p>

            <h2>Your choices</h2>
            <p>
              You can ask us what we hold about you, ask for it to be corrected, or ask us
              to delete a website enquiry. Contact{" "}
              <a href={`mailto:${settings.email}`}>{settings.email}</a> or call{" "}
              <a href={`tel:${settings.phoneHref}`}>{settings.phone}</a>.
            </p>

            <h2>Cookies and analytics</h2>
            <p>
              This website sets no advertising or tracking cookies as built. If the clinic
              later adds analytics or advertising tools, this section must be updated and a
              consent mechanism added where the law requires one.
            </p>

            <h2>Who to contact</h2>
            <p>
              {settings.legalName}
              <br />
              {formatAddress(location)}
              <br />
              <a href={`mailto:${settings.email}`}>{settings.email}</a>
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
