import type { SiteSettings } from "./types";

/**
 * PLACEHOLDER CLINIC DETAILS — replace every value here with the real practice's
 * information before launch. The phone number uses the reserved 555 range so it
 * cannot dial a real line by accident.
 *
 * Nothing in this file states a statistic, award, review count or years in
 * practice. Do not add any unless the clinic can back it up.
 */
export const siteSettings: SiteSettings = {
  clinicName: "Northside Family Chiropractic",
  legalName: "Northside Family Chiropractic, PLLC",
  tagline: "Chiropractic care for back pain, neck pain and everyday movement",
  shortDescription:
    "A neighbourhood chiropractic clinic in Riverton offering hands-on care for back pain, neck pain, headaches, sports injuries and posture support.",
  phone: "(555) 010-2400",
  phoneHref: "+15550102400",
  email: "hello@northsidefamilychiro.example",
  primaryCtaLabel: "Request an appointment",
  secondaryCtaLabel: "Call the clinic",

  trustPoints: [
    {
      label: "Licensed chiropractors",
      description: "Care is provided by state-licensed Doctors of Chiropractic.",
      icon: "shield",
    },
    {
      label: "Evening appointments",
      description: "We stay open until 7pm on Tuesdays and Thursdays.",
      icon: "clock",
    },
    {
      label: "Free on-site parking",
      description: "Ground-floor entrance with step-free access.",
      icon: "map",
    },
    {
      label: "We explain before we treat",
      description: "You'll know what we found and what we recommend, in plain language.",
      icon: "heart",
    },
  ],

  whatToExpect: [
    {
      step: 1,
      title: "We listen first",
      description:
        "Your first visit starts with a conversation about what's bothering you, when it started and what makes it better or worse.",
    },
    {
      step: 2,
      title: "A hands-on assessment",
      description:
        "We check how you move, test the joints and muscles involved, and look for anything that needs a referral rather than chiropractic care.",
    },
    {
      step: 3,
      title: "A clear explanation",
      description:
        "We tell you what we found, whether we think we can help, and what a course of care would involve — including how much it costs.",
    },
    {
      step: 4,
      title: "Care that fits your day",
      description:
        "Most visits include an adjustment or soft-tissue work plus a couple of simple things to do at home between appointments.",
    },
  ],

  social: [
    { platform: "facebook", label: "Facebook", href: "https://facebook.com/" },
    { platform: "instagram", label: "Instagram", href: "https://instagram.com/" },
    { platform: "google", label: "Google Business Profile", href: "https://google.com/maps" },
  ],

  seo: {
    defaultTitle: "Northside Family Chiropractic | Chiropractor in Riverton",
    titleTemplate: "%s | Northside Family Chiropractic",
    defaultDescription:
      "Chiropractic care in Riverton for back pain, neck pain, headaches, sports injuries and posture support. Request an appointment or call (555) 010-2400.",
    ogImage: null,
  },

  formConsentText:
    "By sending this form you agree that the clinic may contact you about your enquiry. We don't share your details with anyone else, and we won't add you to a marketing list without asking.",
};
