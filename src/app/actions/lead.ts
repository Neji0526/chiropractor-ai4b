"use server";

import { headers } from "next/headers";
import { z } from "zod";
import { checkRateLimit } from "@/lib/leads/rate-limit";
import {
  type LeadFormState,
  type LeadInput,
  leadSchema,
} from "@/lib/leads/schema";

/** Submissions faster than this are almost certainly automated. */
const MIN_FILL_MS = 2000;

/**
 * Handles appointment requests and general enquiries.
 *
 * ── Frontend-only build ─────────────────────────────────────────────────────
 * This project intentionally ships without a database or email provider, so a
 * validated submission is logged on the server and reported back to the visitor
 * as received. Everything up to persistence is real: validation, spam controls,
 * rate limiting and the source/UTM capture.
 *
 * To make it live, replace the `recordLead` call below with the real integration
 * (insert the row, send the notification email) and nothing else in the UI has
 * to change. Any credentials for that belong in server-only environment
 * variables — never in a `NEXT_PUBLIC_*` variable.
 * ────────────────────────────────────────────────────────────────────────────
 */
export async function submitLead(
  _prevState: LeadFormState,
  formData: FormData,
): Promise<LeadFormState> {
  const submitted = echoValues(formData);

  const parsed = leadSchema.safeParse({
    name: formData.get("name") ?? "",
    email: formData.get("email") ?? "",
    phone: formData.get("phone") ?? "",
    serviceSlug: formData.get("serviceSlug") ?? "not-sure",
    preferredContactMethod: formData.get("preferredContactMethod") ?? "",
    message: formData.get("message") ?? "",
    consent: formData.get("consent") ?? undefined,
    sourcePage: formData.get("sourcePage") ?? "/",
    utmSource: formData.get("utmSource") ?? "",
    utmMedium: formData.get("utmMedium") ?? "",
    utmCampaign: formData.get("utmCampaign") ?? "",
    companyWebsite: formData.get("companyWebsite") ?? "",
    renderedAt: formData.get("renderedAt") ?? "",
  });

  if (!parsed.success) {
    const { fieldErrors } = z.flattenError(parsed.error);
    const firstErrors: LeadFormState["fieldErrors"] = {};
    for (const [field, messages] of Object.entries(fieldErrors)) {
      if (messages && messages.length > 0) {
        firstErrors[field as keyof LeadInput] = messages[0];
      }
    }

    return {
      status: "error",
      message: "Please check the highlighted fields and try again.",
      fieldErrors: firstErrors,
      values: submitted,
    };
  }

  const lead = parsed.data;
  const now = Date.now();

  // Honeypot and time-trap. Bots get a success response so they learn nothing,
  // but nothing is recorded.
  const renderedAt = Number(lead.renderedAt);
  const filledTooFast =
    Number.isFinite(renderedAt) && renderedAt > 0 && now - renderedAt < MIN_FILL_MS;

  if (lead.companyWebsite.trim() !== "" || filledTooFast) {
    return successState(lead, submitted);
  }

  const requestHeaders = await headers();
  const clientKey =
    requestHeaders.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    requestHeaders.get("x-real-ip") ||
    "unknown";

  if (!checkRateLimit(clientKey, now).allowed) {
    return {
      status: "error",
      message:
        "We've had a few submissions from your connection already. Please call the clinic on (555) 010-2400 and we'll help you straight away.",
      fieldErrors: {},
      values: submitted,
    };
  }

  await recordLead(lead, now);

  return successState(lead, submitted);
}

function successState(
  lead: LeadInput,
  values: LeadFormState["values"],
): LeadFormState {
  const firstName = lead.name.split(/\s+/)[0] ?? "";
  return {
    status: "success",
    message: firstName
      ? `Thanks ${firstName} — your request has been sent.`
      : "Thanks — your request has been sent.",
    fieldErrors: {},
    values,
  };
}

/** The submitted strings, so the form can restore itself after React resets it. */
function echoValues(formData: FormData): LeadFormState["values"] {
  const keys = [
    "name",
    "email",
    "phone",
    "serviceSlug",
    "preferredContactMethod",
    "message",
    "consent",
    "sourcePage",
    "utmSource",
    "utmMedium",
    "utmCampaign",
    "renderedAt",
  ] as const;

  const values: LeadFormState["values"] = {};
  for (const key of keys) {
    const value = formData.get(key);
    if (typeof value === "string") values[key] = value;
  }
  return values;
}

/**
 * Stand-in for persistence. Swap the body for a real insert + notification.
 * Deliberately does not log the visitor's message body, so free-text health
 * details don't end up in server logs.
 */
async function recordLead(lead: LeadInput, receivedAt: number): Promise<void> {
  const record = {
    receivedAt: new Date(receivedAt).toISOString(),
    name: lead.name,
    email: lead.email,
    phone: lead.phone,
    serviceSlug: lead.serviceSlug,
    preferredContactMethod: lead.preferredContactMethod,
    messageLength: lead.message.length,
    sourcePage: lead.sourcePage,
    utm: {
      source: lead.utmSource || null,
      medium: lead.utmMedium || null,
      campaign: lead.utmCampaign || null,
    },
    status: "new" as const,
  };

  console.info("[lead] received (not persisted — no backend configured)", record);
}
