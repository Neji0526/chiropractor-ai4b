import type { Testimonial } from "./types";

/**
 * ⚠️ EXAMPLE COPY — NOT REAL PATIENT REVIEWS.
 *
 * These entries exist so the testimonial layouts can be reviewed before launch.
 * They are illustrative writing, not reviews from real patients, and publishing
 * them as genuine would be misleading (and in many places a regulatory problem).
 *
 * Before going live, do one of two things:
 *   1. Replace every entry with a real, consented patient review, or
 *   2. Empty this array — every testimonial section handles the empty state and
 *      disappears cleanly, including the /testimonials page and its nav link.
 *
 * Never write a review on a patient's behalf, and never attribute one to a
 * named person who hasn't agreed to it.
 */
export const testimonials: Testimonial[] = [
  {
    id: "t1",
    displayName: "Sarah M.",
    quote:
      "I'd had low back pain for months and had mostly given up on it. What I appreciated was being told exactly what they'd found and what the plan was, instead of just being booked in for another twelve visits.",
    rating: 5,
    context: "Back pain care",
    featured: true,
    status: "published",
  },
  {
    id: "t2",
    displayName: "James T.",
    quote:
      "I came in with a stiff neck that had been getting worse all week from work. They looked at my desk setup as well as my neck, which nobody had done before.",
    rating: 5,
    context: "Neck pain care",
    featured: true,
    status: "published",
  },
  {
    id: "t3",
    displayName: "Meera K.",
    quote:
      "Honest and straightforward. I was told my problem probably needed a scan first, and they helped me get referred rather than treating me anyway.",
    rating: 5,
    context: "First consultation",
    featured: true,
    status: "published",
  },
  {
    id: "t4",
    displayName: "Tom B.",
    quote:
      "I've been running for years and always had a calf that flared up. The exercises were short enough that I actually did them, which probably explains why it worked.",
    rating: 4,
    context: "Sports injury care",
    featured: false,
    status: "published",
  },
  {
    id: "t5",
    displayName: "Dawn R.",
    quote:
      "Gentle, clear and never rushed. My appointments start on time, which as a shift worker makes a real difference.",
    rating: 5,
    context: "Ongoing care",
    featured: false,
    status: "published",
  },
  {
    id: "t6",
    displayName: "Chris L.",
    quote:
      "Explained what was happening with my headaches in a way that finally made sense, and was upfront that the neck was only part of it.",
    rating: 5,
    context: "Headache-related care",
    featured: false,
    status: "published",
  },
];
