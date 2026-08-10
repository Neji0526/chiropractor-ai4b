import { z } from "zod";

export const PREFERRED_CONTACT_METHODS = ["phone", "email", "either"] as const;
export type PreferredContactMethod = (typeof PREFERRED_CONTACT_METHODS)[number];

export const CONTACT_METHOD_LABELS: Record<PreferredContactMethod, string> = {
  phone: "Phone call",
  email: "Email",
  either: "Either is fine",
};

/**
 * Validation for the appointment request and general enquiry forms.
 *
 * Deliberately minimal: name, contact details, area of interest and a short
 * message. It does not collect date of birth, medical history, medication or
 * anything else clinical — that belongs in the clinic's own patient records
 * system, not a marketing form.
 */
export const leadSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "Please enter your full name.")
    .max(120, "That name is longer than we can store."),

  email: z
    .string()
    .trim()
    .max(200, "That email address is too long.")
    .pipe(z.email("Please enter a valid email address.")),

  phone: z
    .string()
    .trim()
    .min(7, "Please enter a phone number we can reach you on.")
    .max(30, "That phone number is too long.")
    .regex(/^[0-9+()\-.\s]+$/, "Please use digits, spaces and + ( ) - only."),

  /** A service slug, or "not-sure" when the visitor doesn't know yet. */
  serviceSlug: z
    .string()
    .trim()
    .max(80)
    .default("not-sure"),

  preferredContactMethod: z.enum(PREFERRED_CONTACT_METHODS, {
    message: "Please choose how you'd like us to reply.",
  }),

  /** Free text about availability or what's bothering them. */
  message: z
    .string()
    .trim()
    .max(1500, "Please keep your message under 1500 characters.")
    .default(""),

  consent: z
    .string()
    .optional()
    .refine((value) => value === "on" || value === "true", {
      message: "Please confirm you're happy for us to contact you.",
    }),

  /* --- tracking, populated by the form rather than typed by the visitor --- */
  sourcePage: z.string().trim().max(300).default("/"),
  utmSource: z.string().trim().max(120).default(""),
  utmMedium: z.string().trim().max(120).default(""),
  utmCampaign: z.string().trim().max(120).default(""),

  /* ----------------------------- spam controls ---------------------------- */
  /** Honeypot: hidden from real users, so any value means a bot filled it. */
  companyWebsite: z.string().max(200).default(""),
  /** Epoch ms the form was rendered, used to reject instant submissions. */
  renderedAt: z.string().default(""),
});

export type LeadInput = z.infer<typeof leadSchema>;

export const LEAD_STATUSES = [
  "new",
  "contacted",
  "qualified",
  "appointment_scheduled",
  "closed",
] as const;
export type LeadStatus = (typeof LEAD_STATUSES)[number];

/** Shape returned by the form server action and read by `useActionState`. */
export type LeadFormState = {
  status: "idle" | "success" | "error";
  message: string;
  /** Field-level messages keyed by input name. */
  fieldErrors: Partial<Record<keyof LeadInput, string>>;
};

export const initialLeadFormState: LeadFormState = {
  status: "idle",
  message: "",
  fieldErrors: {},
};
