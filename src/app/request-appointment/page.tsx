import type { Metadata } from "next";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { BusinessHours } from "@/components/BusinessHours";
import { FAQAccordion } from "@/components/FAQAccordion";
import { LeadForm } from "@/components/forms/LeadForm";
import { Icon } from "@/components/ui/Icon";
import {
  getPrimaryLocation,
  getServiceTitles,
  getSiteSettings,
  getTopFaqs,
} from "@/lib/content";
import { formatAddress } from "@/lib/format";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Request an Appointment",
  description:
    "Request a chiropractic appointment at our Riverton clinic. Send the days that suit you and we'll come back to you with a time, or call (555) 010-2400.",
  path: "/request-appointment",
});

export default async function RequestAppointmentPage() {
  const [settings, location, services, faqs] = await Promise.all([
    getSiteSettings(),
    getPrimaryLocation(),
    getServiceTitles(),
    getTopFaqs(4),
  ]);

  return (
    <>
      <Breadcrumbs
        items={[
          { name: "Home", href: "/" },
          { name: "Request an appointment", href: "/request-appointment" },
        ]}
      />

      <section className="bg-white py-12 lg:py-16">
        <div className="container-page grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16">
          {/* Form first on every screen size — it's why the page exists. */}
          <div className="order-2 lg:order-1">
            <p className="text-xs font-semibold tracking-[0.14em] text-brand-600 uppercase">
              Request an appointment
            </p>
            <h1 className="mt-3 text-[2rem] leading-tight sm:text-4xl">
              Tell us what&apos;s going on
            </h1>
            <p className="mt-4 text-lg leading-relaxed text-ink-600">
              Fill in the form and a member of the team will get back to you to confirm a
              time — usually the same working day. Prefer to speak to someone?{" "}
              <a
                href={`tel:${settings.phoneHref}`}
                className="font-medium text-brand-700 hover:underline"
              >
                Call {settings.phone}
              </a>
              .
            </p>

            <LeadForm
              className="mt-8"
              variant="appointment"
              services={services}
              consentText={settings.formConsentText}
              phone={settings.phone}
              phoneHref={settings.phoneHref}
            />
          </div>

          {/* Reassurance column */}
          <aside className="order-1 space-y-6 lg:order-2">
            <div className="rounded-card border border-brand-100 bg-brand-50 p-6">
              <h2 className="text-lg">What happens after you send this</h2>
              <ol className="mt-4 space-y-3 text-[0.9375rem] leading-relaxed text-ink-700">
                {[
                  "We read your request and check the diary.",
                  "We call or email you — whichever you asked for — with a time.",
                  "You get a short confirmation with what to bring and where to park.",
                ].map((step, index) => (
                  <li key={step} className="flex gap-3">
                    <span
                      aria-hidden
                      className="flex size-6 shrink-0 items-center justify-center rounded-full bg-white text-xs font-semibold text-brand-700"
                    >
                      {index + 1}
                    </span>
                    {step}
                  </li>
                ))}
              </ol>
              <p className="mt-4 border-t border-brand-100 pt-4 text-sm text-ink-600">
                Sending this form doesn&apos;t book an appointment on its own — we&apos;ll
                confirm the time with you first.
              </p>
            </div>

            <div className="rounded-card border border-shell-200 bg-white p-6 shadow-card">
              <h2 className="font-sans text-base font-semibold">Opening hours</h2>
              <BusinessHours hours={location.hours} className="mt-3" />
            </div>

            <div className="rounded-card border border-shell-200 bg-shell-50 p-6">
              <h2 className="font-sans text-base font-semibold">Where we are</h2>
              <address className="mt-2 text-sm leading-relaxed text-ink-600 not-italic">
                {formatAddress(location)}
              </address>
              {location.parkingNote ? (
                <p className="mt-3 text-sm leading-relaxed text-ink-600">
                  {location.parkingNote}
                </p>
              ) : null}
            </div>

            <div className="flex items-start gap-2.5 rounded-card border border-amber-200 bg-amber-50 p-5 text-sm leading-relaxed text-amber-900">
              <Icon name="info" size={18} className="mt-0.5 shrink-0" />
              <p>
                This form isn&apos;t monitored outside opening hours and isn&apos;t for
                urgent problems. If you have severe or rapidly worsening symptoms,
                numbness, weakness, or any loss of bladder or bowel control, seek urgent
                medical care.
              </p>
            </div>
          </aside>
        </div>
      </section>

      {faqs.length > 0 ? (
        <section className="border-t border-shell-200 bg-shell-100 py-14 lg:py-20">
          <div className="container-page grid gap-8 lg:grid-cols-[0.7fr_1.3fr] lg:gap-16">
            <div>
              <h2 className="text-2xl">Before your first visit</h2>
              <p className="mt-3 text-[0.9375rem] leading-relaxed text-ink-600">
                A few things people usually want to know before booking.
              </p>
            </div>
            <FAQAccordion items={faqs} groupName="appointment-faq" />
          </div>
        </section>
      ) : null}
    </>
  );
}
