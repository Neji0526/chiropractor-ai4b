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
  clinicName: "Northstar Family Chiropractic",
  legalName: "Northstar Family Chiropractic, PLLC",
  logoTagline: "Move Better. Live Better.",
  tagline: "Chiropractic care for back pain, neck pain and everyday movement",
  shortDescription:
    "Compassionate, personalized chiropractic care for you and your family — back pain, neck pain, headaches, sports injuries and posture support in Riverton.",
  phone: "(555) 010-2400",
  phoneHref: "+15550102400",
  email: "info@northstarchiro.example",
  primaryCtaLabel: "Book an Appointment",
  secondaryCtaLabel: "Call Us Today",

  heroBadge: "Gentle. Effective. Personalized.",

  hero: {
    heading: "Chiropractic care for back pain, neck pain and getting back to normal",
    // The city is named here on purpose: the design has no separate location line
    // on the first screen, and local visitors need to see where the clinic is.
    body: "At Northstar Family Chiropractic in Riverton we help you move better and feel better, without surgery or medication. We assess what's driving your pain, explain what we find in plain language, and tell you honestly whether we can help.",
    /**
     * STOCK PHOTOGRAPHY — licensed for commercial use (see
     * public/images/CREDITS.md). It shows a treatment room that is not this
     * clinic's, so replace it with real photos of the practice before launch.
     */
    image: {
      src: "/images/clinic/hero-treatment.jpg",
      alt: "A chiropractor working on a patient's mid-back while they lie face down on a treatment table",
      width: 1600,
      height: 1200,
    },
  },

  whoWeHelpImage: {
    src: "/images/clinic/neck-assessment.jpg",
    alt: "A clinician in light blue scrubs assessing the neck and shoulder of a seated patient",
    width: 900,
    height: 1200,
  },

  photos: {
    about: {
      src: "/images/clinic/consultation.jpg",
      alt: "A chiropractor talking with a patient sitting on the edge of a treatment table",
      width: 1400,
      height: 1050,
    },
    team: {
      src: "/images/clinic/treatment-room.jpg",
      alt: "A bright treatment room with a padded table, desk and chair",
      width: 1600,
      height: 900,
    },
  },

  /**
   * PLACEHOLDER OFFER — this price is made up. Replace it with the clinic's real
   * new-patient pricing, or set `newPatientOffer: null` to remove the card from
   * the hero entirely. Advertised health pricing is regulated in many places, so
   * check the wording before publishing it.
   */
  newPatientOffer: {
    label: "New Patient Special",
    price: "$49",
    description: "Comprehensive Exam & Consultation",
    note: "Limited time offer",
  },

  whyChooseUs: [
    "Personalized care plans",
    "Upfront pricing and clear explanations",
    "Evidence-based treatments",
    "Support for long-term wellness",
  ],

  trustPoints: [
    {
      label: "Experienced Chiropractors",
      description: "Care is provided by state-licensed Doctors of Chiropractic.",
      icon: "users",
    },
    {
      label: "Personalized Treatment",
      description: "Your plan follows your assessment, not a fixed programme.",
      icon: "sliders",
    },
    {
      label: "Modern Techniques",
      description: "Hands-on adjustment, low-force options and rehab exercise.",
      icon: "sparkle",
    },
    {
      label: "Insurance Friendly",
      description: "Itemised receipts for claims, and costs explained up front.",
      icon: "shield",
    },
  ],

  whatToExpect: [
    {
      step: 1,
      title: "We listen",
      description:
        "Your visit starts with a conversation about your pain, your goals and your health history.",
      icon: "notes",
    },
    {
      step: 2,
      title: "We assess",
      description:
        "We check how you move and test the joints and muscles involved to find what's driving it.",
      icon: "sliders",
    },
    {
      step: 3,
      title: "We create a plan",
      description:
        "We explain what we found and what we'd recommend — including what it costs.",
      icon: "calendar",
    },
    {
      step: 4,
      title: "We help you heal",
      description:
        "Hands-on care plus a couple of simple things to do at home between visits.",
      icon: "heart",
    },
  ],

  social: [
    { platform: "facebook", label: "Facebook", href: "https://facebook.com/" },
    { platform: "instagram", label: "Instagram", href: "https://instagram.com/" },
    { platform: "google", label: "Google Business Profile", href: "https://google.com/maps" },
  ],

  seo: {
    defaultTitle: "Northstar Family Chiropractic | Chiropractor in Riverton",
    titleTemplate: "%s | Northstar Family Chiropractic",
    defaultDescription:
      "Chiropractic care in Riverton for back pain, neck pain, headaches, sports injuries and posture support. Book an appointment or call (555) 010-2400.",
    ogImage: null,
  },

  formConsentText:
    "By sending this form you agree that the clinic may contact you about your enquiry. We don't share your details with anyone else, and we won't add you to a marketing list without asking.",
};
