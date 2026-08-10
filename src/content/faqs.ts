import type { Faq } from "./types";

/**
 * FAQs feed both the /faq page and the homepage accordion, and are used to build
 * FAQPage structured data. Keep answers factual and specific to the clinic —
 * Google's guidance is that FAQ markup should reflect genuine questions with
 * genuine answers, and vague filler answers help nobody.
 *
 * Prices, insurance details and appointment lengths are PLACEHOLDERS. Update
 * them to the clinic's real policy before launch.
 */
export const faqs: Faq[] = [
  {
    id: "f1",
    question: "Do I need a referral to see a chiropractor?",
    answer:
      "No. You can book directly with us. If you'd rather speak to your doctor first, that's completely fine — and if your insurance plan requires a referral, check with them before your visit.",
    category: "Appointments",
    sortOrder: 1,
    status: "published",
  },
  {
    id: "f2",
    question: "How soon can I be seen?",
    answer:
      "We usually have appointments within a few days, and we keep some slots free for people in acute pain. Call the clinic on (555) 010-2400 and we'll find you the earliest suitable time.",
    category: "Appointments",
    sortOrder: 2,
    status: "published",
  },
  {
    id: "f3",
    question: "What happens if I need to cancel?",
    answer:
      "Just let us know at least 24 hours ahead and there's no charge. Things come up — if you're unwell or stuck, call us and we'll rebook you.",
    category: "Appointments",
    sortOrder: 3,
    status: "published",
  },
  {
    id: "f4",
    question: "How long is a first appointment?",
    answer:
      "Allow about 45 minutes. That covers a conversation about your history, a physical assessment, an explanation of what we found, and usually treatment on the same visit. Follow-up appointments are shorter, around 20 minutes.",
    category: "Your first visit",
    sortOrder: 4,
    status: "published",
  },
  {
    id: "f5",
    question: "What should I wear?",
    answer:
      "Comfortable clothes you can move in — leggings or shorts and a t-shirt work well. We need to see how you move, and gowns are available if you'd prefer to change.",
    category: "Your first visit",
    sortOrder: 5,
    status: "published",
  },
  {
    id: "f6",
    question: "Can I bring someone with me?",
    answer:
      "Yes, always. You're welcome to bring a partner, friend, family member or carer into the room with you, and you can ask for a chaperone at any point.",
    category: "Your first visit",
    sortOrder: 6,
    status: "published",
  },
  {
    id: "f7",
    question: "Will you treat me on the first visit?",
    answer:
      "Usually, yes — as long as the assessment shows chiropractic care is appropriate for you. If we think you need imaging or a medical opinion first, we'll explain why and help you take that step instead.",
    category: "Treatment",
    sortOrder: 7,
    status: "published",
  },
  {
    id: "f8",
    question: "Does an adjustment hurt?",
    answer:
      "Most people find it uncomfortable at most, and often not at all. Some feel a bit sore or tired for a day afterwards, much like after exercise. Tell us if anything is painful and we'll change what we're doing or use a gentler technique.",
    category: "Treatment",
    sortOrder: 8,
    status: "published",
  },
  {
    id: "f9",
    question: "How many visits will I need?",
    answer:
      "It depends on the problem, how long you've had it and how it responds — so we won't quote a number before assessing you. After your first visit we'll give you an honest estimate and review it as we go. We don't ask anyone to pay for a long block of visits up front.",
    category: "Treatment",
    sortOrder: 9,
    status: "published",
  },
  {
    id: "f10",
    question: "Is chiropractic care suitable for older adults or during pregnancy?",
    answer:
      "Often, with techniques adapted accordingly — gentler, low-force methods and different positioning. Tell us about your health history, any medication and any bone-density concerns, and we'll talk through whether it's a sensible option for you.",
    category: "Treatment",
    sortOrder: 10,
    status: "published",
  },
  {
    id: "f11",
    question: "How much does it cost?",
    answer:
      "A first consultation is $[amount] and follow-up visits are $[amount]. We'll always tell you the cost before treatment, and there's no charge for the brief phone conversation if you're not sure we're the right people to see.",
    category: "Payment & insurance",
    sortOrder: 11,
    status: "published",
  },
  {
    id: "f12",
    question: "Do you take insurance?",
    answer:
      "We can provide itemised receipts for you to claim, and we work with [insurers to be listed]. Coverage varies a lot between plans, so please check what yours includes before your visit.",
    category: "Payment & insurance",
    sortOrder: 12,
    status: "published",
  },
];
