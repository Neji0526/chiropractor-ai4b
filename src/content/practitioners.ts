import type { Practitioner } from "./types";

/**
 * PLACEHOLDER TEAM PROFILES.
 *
 * Names, schools and registration details here are invented placeholders and
 * MUST be replaced with the real practitioners' details before launch. Never
 * publish a credential, qualification or licence the clinician does not hold.
 *
 * `photo: null` renders a neutral initials panel, so profiles look finished
 * before real photography is shot. Drop files into /public/images/team and set
 * `photo` to use them.
 */
export const practitioners: Practitioner[] = [
  {
    slug: "alex-moreno",
    name: "Dr. Alex Moreno",
    title: "Chiropractor and clinic director",
    credentials: ["Doctor of Chiropractic (D.C.)", "State licensed"],
    education: [
      "Doctor of Chiropractic — [chiropractic college]",
      "B.Sc. Human Biology — [university]",
    ],
    specialties: ["Low back pain", "Sciatica", "Sports injuries"],
    bio: [
      "Alex opened the Riverton clinic to run the kind of practice he'd want to be a patient in: a proper assessment, a plain explanation, and no pressure to sign up for a year of visits.",
      "Most of his week is spent with people whose back pain has been going on too long, and with runners and lifters who want to keep training while an injury settles. He's happiest when someone leaves understanding their own problem well enough to manage it themselves.",
      "Outside the clinic he runs — slowly, he says — and coaches a junior football side at the weekend.",
    ],
    photo: null,
    sortOrder: 1,
    status: "published",
  },
  {
    slug: "priya-raman",
    name: "Dr. Priya Raman",
    title: "Chiropractor",
    credentials: ["Doctor of Chiropractic (D.C.)", "State licensed"],
    education: [
      "Doctor of Chiropractic — [chiropractic college]",
      "Post-graduate training in soft-tissue therapy",
    ],
    specialties: ["Neck pain", "Neck-related headaches", "Desk-related strain"],
    bio: [
      "Priya sees a lot of necks. Between long screen days, laptops on kitchen tables and phones held at chest height, it's the area she's asked about most.",
      "She works gently and explains as she goes, which patients who are nervous about having their neck treated tend to appreciate. Where a firm adjustment isn't the right choice, she uses low-force techniques and soft-tissue work instead.",
      "She's also the person to ask about desk setup — she'll happily go through your actual workstation photos with you.",
    ],
    photo: null,
    sortOrder: 2,
    status: "published",
  },
  {
    slug: "daniel-hoffmann",
    name: "Dr. Daniel Hoffmann",
    title: "Chiropractor",
    credentials: ["Doctor of Chiropractic (D.C.)", "State licensed"],
    education: [
      "Doctor of Chiropractic — [chiropractic college]",
      "Certificate in rehabilitation and exercise prescription",
    ],
    specialties: ["Rehabilitation exercise", "Shoulder and hip pain", "Older adults"],
    bio: [
      "Daniel's appointments usually involve as much movement as treatment. He believes hands-on care opens a window, and the exercises are what keep it open.",
      "He works with a lot of people in their sixties, seventies and beyond, where gentle techniques and steady strength work matter more than anything forceful.",
      "He keeps home programmes deliberately short — two or three things you'll actually do beats a printed sheet of twelve.",
    ],
    photo: null,
    sortOrder: 3,
    status: "published",
  },
];
