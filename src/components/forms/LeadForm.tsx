"use client";

import { usePathname } from "next/navigation";
import { useActionState, useEffect, useId, useRef } from "react";
import { submitLead } from "@/app/actions/lead";
import { Button, ButtonLink } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import {
  SelectField,
  TextAreaField,
  TextField,
} from "@/components/forms/FormField";
import { cn } from "@/lib/cn";
import {
  CONTACT_METHOD_LABELS,
  PREFERRED_CONTACT_METHODS,
  initialLeadFormState,
} from "@/lib/leads/schema";

interface LeadFormProps {
  /** Appointment requests ask about availability; enquiries ask a general question. */
  variant?: "appointment" | "enquiry";
  services: { slug: string; title: string }[];
  consentText: string;
  phone: string;
  phoneHref: string;
  /** Preselect a service — used on individual service pages. */
  defaultServiceSlug?: string;
  className?: string;
}

/**
 * The site's lead capture form.
 *
 * Kept intentionally short: name, contact details, what they're interested in,
 * how they'd like to be contacted and a free-text note. It never asks for medical
 * history — that belongs in the clinic's patient records, not a web form.
 *
 * Validation runs server-side in `submitLead`; the browser's own constraints are
 * a convenience layer on top, not the source of truth.
 */
export function LeadForm({
  variant = "appointment",
  services,
  consentText,
  phone,
  phoneHref,
  defaultServiceSlug,
  className,
}: LeadFormProps) {
  const [state, formAction, isPending] = useActionState(
    submitLead,
    initialLeadFormState,
  );
  const pathname = usePathname();
  const uid = useId();
  const formRef = useRef<HTMLFormElement>(null);
  const renderedAtRef = useRef<HTMLInputElement>(null);
  const utmRefs = {
    source: useRef<HTMLInputElement>(null),
    medium: useRef<HTMLInputElement>(null),
    campaign: useRef<HTMLInputElement>(null),
  };
  const summaryRef = useRef<HTMLDivElement>(null);
  const successRef = useRef<HTMLDivElement>(null);

  // Stamp the render time and read campaign parameters on the client. Doing this
  // after mount keeps the server-rendered HTML identical for every visitor, so
  // these pages stay statically cacheable.
  useEffect(() => {
    if (renderedAtRef.current) {
      renderedAtRef.current.value = String(Date.now());
    }

    const params = new URLSearchParams(window.location.search);
    if (utmRefs.source.current) {
      utmRefs.source.current.value = params.get("utm_source") ?? "";
    }
    if (utmRefs.medium.current) {
      utmRefs.medium.current.value = params.get("utm_medium") ?? "";
    }
    if (utmRefs.campaign.current) {
      utmRefs.campaign.current.value = params.get("utm_campaign") ?? "";
    }
    // Refs are stable; this only ever needs to run once per mount.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Move focus to whichever message replaced the form, so screen reader and
  // keyboard users aren't left at the submit button wondering what happened.
  useEffect(() => {
    if (state.status === "success") {
      successRef.current?.focus();
      formRef.current?.reset();
    } else if (state.status === "error") {
      summaryRef.current?.focus();
    }
  }, [state]);

  const fieldId = (name: string) => `${uid}-${name}`;
  const errors = state.fieldErrors;

  if (state.status === "success") {
    return (
      <div
        ref={successRef}
        tabIndex={-1}
        className={cn(
          "rounded-card border border-sage-200 bg-sage-50 p-6 sm:p-8",
          className,
        )}
      >
        <span className="flex size-11 items-center justify-center rounded-full bg-sage-500 text-white">
          <Icon name="check" size={22} />
        </span>
        <h3 className="mt-4 text-xl">{state.message}</h3>
        <p className="mt-2 text-[0.9375rem] leading-relaxed text-ink-600">
          A member of the team will get back to you to confirm a time — usually the
          same working day. If you need to be seen sooner, please call us and
          we&apos;ll find the earliest slot.
        </p>
        <div className="mt-5 flex flex-col gap-3 sm:flex-row">
          <ButtonLink href={`tel:${phoneHref}`} icon="phone" variant="secondary">
            {phone}
          </ButtonLink>
          <ButtonLink href="/faq" variant="ghost" icon="arrow-right" iconAfter>
            Read what to expect at your first visit
          </ButtonLink>
        </div>
      </div>
    );
  }

  return (
    <form
      ref={formRef}
      action={formAction}
      noValidate
      className={cn(
        "rounded-card border border-shell-200 bg-white p-6 shadow-card sm:p-8",
        className,
      )}
    >
      {state.status === "error" ? (
        <div
          ref={summaryRef}
          tabIndex={-1}
          role="alert"
          className="mb-6 flex items-start gap-2.5 rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-800"
        >
          <Icon name="info" size={18} className="mt-0.5 shrink-0" />
          <p>{state.message}</p>
        </div>
      ) : null}

      <div className="grid gap-5 sm:grid-cols-2">
        <TextField
          id={fieldId("name")}
          name="name"
          label="Full name"
          autoComplete="name"
          required
          error={errors.name}
          className="sm:col-span-2"
        />

        <TextField
          id={fieldId("phone")}
          name="phone"
          label="Phone"
          type="tel"
          autoComplete="tel"
          inputMode="tel"
          required
          error={errors.phone}
        />

        <TextField
          id={fieldId("email")}
          name="email"
          label="Email"
          type="email"
          autoComplete="email"
          inputMode="email"
          required
          error={errors.email}
        />

        <SelectField
          id={fieldId("serviceSlug")}
          name="serviceSlug"
          label="What can we help with?"
          defaultValue={defaultServiceSlug ?? "not-sure"}
          error={errors.serviceSlug}
          options={[
            { value: "not-sure", label: "I'm not sure yet" },
            ...services.map((service) => ({
              value: service.slug,
              label: service.title,
            })),
          ]}
        />

        <SelectField
          id={fieldId("preferredContactMethod")}
          name="preferredContactMethod"
          label="How should we reply?"
          defaultValue="phone"
          required
          error={errors.preferredContactMethod}
          options={PREFERRED_CONTACT_METHODS.map((method) => ({
            value: method,
            label: CONTACT_METHOD_LABELS[method],
          }))}
        />

        <TextAreaField
          id={fieldId("message")}
          name="message"
          label={variant === "appointment" ? "Anything else we should know?" : "Your message"}
          hint={
            variant === "appointment"
              ? "Days and times that suit you are the most useful thing to include. Please don't send detailed medical information through this form."
              : "Tell us what you'd like to know. Please don't send detailed medical information through this form."
          }
          error={errors.message}
          rows={4}
          maxLength={1500}
          className="sm:col-span-2"
        />
      </div>

      {/* Consent */}
      <div className="mt-6">
        <label
          htmlFor={fieldId("consent")}
          className="flex items-start gap-3 text-sm leading-relaxed text-ink-600"
        >
          <input
            id={fieldId("consent")}
            name="consent"
            type="checkbox"
            required
            aria-invalid={errors.consent ? true : undefined}
            aria-describedby={errors.consent ? `${fieldId("consent")}-error` : undefined}
            className="mt-0.5 size-4.5 shrink-0 rounded border-shell-400 text-brand-600 accent-brand-600"
          />
          <span>{consentText}</span>
        </label>
        {errors.consent ? (
          <p id={`${fieldId("consent")}-error`} className="mt-1.5 text-sm text-red-700">
            {errors.consent}
          </p>
        ) : null}
      </div>

      {/* Hidden tracking fields, populated on the client. */}
      <input type="hidden" name="sourcePage" value={pathname} />
      <input ref={utmRefs.source} type="hidden" name="utmSource" defaultValue="" />
      <input ref={utmRefs.medium} type="hidden" name="utmMedium" defaultValue="" />
      <input ref={utmRefs.campaign} type="hidden" name="utmCampaign" defaultValue="" />
      <input ref={renderedAtRef} type="hidden" name="renderedAt" defaultValue="" />

      {/* Honeypot: positioned off-screen rather than display:none, which some bots skip. */}
      <div aria-hidden className="pointer-events-none absolute -left-[9999px] h-0 w-0 overflow-hidden">
        <label htmlFor={fieldId("companyWebsite")}>Company website</label>
        <input
          id={fieldId("companyWebsite")}
          name="companyWebsite"
          type="text"
          tabIndex={-1}
          autoComplete="off"
          defaultValue=""
        />
      </div>

      <div className="mt-7 flex flex-col gap-4 border-t border-shell-200 pt-6 sm:flex-row sm:items-center sm:justify-between">
        <Button type="submit" size="lg" disabled={isPending} icon={isPending ? undefined : "calendar"}>
          {isPending ? (
            <span className="flex items-center gap-2">
              <Spinner />
              Sending…
            </span>
          ) : variant === "appointment" ? (
            "Send appointment request"
          ) : (
            "Send enquiry"
          )}
        </Button>

        <p className="text-sm text-ink-500">
          Prefer to talk?{" "}
          <a href={`tel:${phoneHref}`} className="font-medium text-brand-700 hover:underline">
            Call {phone}
          </a>
        </p>
      </div>

      <p aria-live="polite" className="sr-only">
        {isPending ? "Sending your request" : ""}
      </p>
    </form>
  );
}

function Spinner() {
  return (
    <svg
      aria-hidden
      viewBox="0 0 24 24"
      width={18}
      height={18}
      className="animate-spin"
    >
      <circle
        cx="12"
        cy="12"
        r="9"
        fill="none"
        stroke="currentColor"
        strokeOpacity={0.3}
        strokeWidth={2.5}
      />
      <path
        d="M21 12a9 9 0 0 0-9-9"
        fill="none"
        stroke="currentColor"
        strokeWidth={2.5}
        strokeLinecap="round"
      />
    </svg>
  );
}
