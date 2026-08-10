import type { Service } from "./types";

/**
 * Service pages. Copy is written to describe chiropractic care in plain terms —
 * it makes no claim about outcomes, cure rates or timeframes. Keep it that way
 * when editing: describe what happens in a visit, not what results to expect.
 */
export const services: Service[] = [
  {
    slug: "chiropractic-adjustments",
    title: "Chiropractic adjustments",
    shortDescription:
      "Hands-on joint adjustment to help stiff, restricted areas of the spine move more freely.",
    body: [
      "A chiropractic adjustment is a controlled movement applied to a specific joint, usually in the spine. The goal is straightforward: help a joint that isn't moving well move more normally, and reduce the guarding in the muscles around it.",
      "We work out which joints to treat by examining how you move, not by guesswork. Some people feel or hear a small release during an adjustment; others don't, and that's normal either way. If a firm adjustment isn't appropriate for you — because of your age, bone health or a recent injury — we use gentler, low-force techniques instead.",
      "Adjustments are usually combined with soft-tissue work and a couple of simple exercises so the change holds between visits.",
    ],
    benefits: [
      "Aimed at restoring movement in specific stiff joints",
      "Adapted to your comfort, including low-force options",
      "Usually combined with soft-tissue work and home exercises",
      "Explained before anything is done, so nothing is a surprise",
    ],
    goodFitFor: [
      "Stiffness through the low back or mid-back",
      "A neck that feels locked or restricted turning one way",
      "Aches that settle when you move and return when you sit still",
    ],
    featuredImage: null,
    relatedConditions: ["back-pain", "neck-pain"],
    sortOrder: 1,
    status: "published",
    seoTitle: "Chiropractic Adjustments in Riverton",
    seoDescription:
      "Hands-on chiropractic adjustments in Riverton, including gentle low-force options. Find out what an adjustment involves and request an appointment.",
  },
  {
    slug: "back-pain-care",
    title: "Back pain care",
    shortDescription:
      "Assessment and hands-on care for low back and mid-back pain, from recent strains to long-running aches.",
    body: [
      "Back pain is the most common reason people come to see us. It can start with an obvious moment — lifting a box, a long drive, a bad night's sleep — or build up quietly over months of sitting.",
      "We start by working out what's driving it. That means asking how it behaves through the day, checking how your back and hips move, and testing the joints and muscles involved. Part of that assessment is looking for the small number of back problems that need a medical referral rather than chiropractic care; if we see one, we'll tell you and help you get to the right place.",
      "Care usually combines adjustment or mobilisation of stiff segments, work on the surrounding muscles, and specific advice about sitting, lifting and movement so the same thing is less likely to keep recurring.",
    ],
    benefits: [
      "A proper assessment before any treatment",
      "Hands-on care for the joints and muscles involved",
      "Practical advice for sitting, lifting and sleeping",
      "A clear referral if your pain needs medical investigation",
    ],
    goodFitFor: [
      "Low back pain after lifting, gardening or a long drive",
      "A dull mid-back ache that worsens by the end of a desk day",
      "Recurring back pain that keeps coming back every few months",
    ],
    featuredImage: null,
    relatedConditions: ["back-pain", "sciatica"],
    sortOrder: 2,
    status: "published",
    seoTitle: "Back Pain Chiropractor in Riverton",
    seoDescription:
      "Chiropractic care for low back and mid-back pain in Riverton. Assessment, hands-on treatment and practical advice. Request an appointment today.",
  },
  {
    slug: "neck-pain-care",
    title: "Neck pain care",
    shortDescription:
      "Care for stiff, painful necks — including the kind that builds up over a week at a desk.",
    body: [
      "Necks get stiff for all sorts of reasons: sleeping awkwardly, hours at a screen, carrying tension through the shoulders, or an old injury that never quite settled.",
      "We check how far your neck moves in each direction, which joints are restricted, and how the muscles across your shoulders and upper back are contributing. Where it's appropriate we use adjustment or gentle mobilisation, along with soft-tissue work through the neck and shoulder muscles.",
      "Because most neck pain is influenced by what you do all day, we also look at your desk setup, screen height and phone habits, and give you two or three things to do between visits rather than a long list you'll never keep up.",
    ],
    benefits: [
      "Movement testing to find the restricted segments",
      "Gentle mobilisation where a firm adjustment isn't suitable",
      "Soft-tissue work for neck and shoulder muscles",
      "Desk and screen setup advice you can actually apply",
    ],
    goodFitFor: [
      "A stiff neck that's hard to turn to one side",
      "Aching between the shoulder blades by mid-afternoon",
      "Neck tightness that builds through a working week",
    ],
    featuredImage: null,
    relatedConditions: ["neck-pain", "headaches", "posture-strain"],
    sortOrder: 3,
    status: "published",
    seoTitle: "Neck Pain Chiropractor in Riverton",
    seoDescription:
      "Chiropractic care for neck pain and stiffness in Riverton, including desk-related tension. Book an assessment or call (555) 010-2400.",
  },
  {
    slug: "sports-injury-care",
    title: "Sports injury care",
    shortDescription:
      "Support for training niggles and recovery from strains, sprains and overuse injuries.",
    body: [
      "Whether you run, lift, play weekend league or you've just started training again, injuries tend to come from the same places: doing too much too soon, or a joint that isn't moving well making another one work too hard.",
      "We assess the injured area and the joints above and below it, then treat what we find — usually a mix of joint work, soft-tissue treatment and loading exercises. Just as importantly, we talk about your training: what to keep doing, what to scale back, and how to build it up again.",
      "If an injury needs imaging or a sports medicine opinion, we'll say so early rather than treating around it.",
    ],
    benefits: [
      "Assessment of the injured area and the joints around it",
      "Hands-on treatment plus progressive loading exercises",
      "Honest advice on training through or resting from an injury",
      "Onward referral when imaging or a specialist opinion is needed",
    ],
    goodFitFor: [
      "A hamstring or calf that keeps tightening up on runs",
      "Shoulder pain that shows up on overhead lifts",
      "A joint that's been niggling since a match or a heavy session",
    ],
    featuredImage: null,
    relatedConditions: ["sports-injuries", "back-pain"],
    sortOrder: 4,
    status: "published",
    seoTitle: "Sports Injury Chiropractor in Riverton",
    seoDescription:
      "Chiropractic care for sports injuries and training niggles in Riverton. Assessment, hands-on treatment and return-to-training advice.",
  },
  {
    slug: "posture-and-desk-support",
    title: "Posture and desk support",
    shortDescription:
      "Practical help for people whose neck, shoulders or back complain after a day at a desk.",
    body: [
      "There's no single perfect posture — but sitting in one position for hours will make most bodies ache. If your neck, shoulders or low back are worse by the end of the working day and better at the weekend, your desk setup is probably part of the story.",
      "We assess how your spine and hips move, find the areas that have got stiff, and treat them hands-on. Then we go through your actual setup: chair height, screen height, keyboard position, laptop use, and how often you get up.",
      "You'll leave with a short list of changes worth making and a couple of movements to break up long sitting — not a lecture about sitting up straight.",
    ],
    benefits: [
      "Assessment of the areas that stiffen up with sitting",
      "Hands-on care for the neck, mid-back and hips",
      "Specific, workable changes to your desk setup",
      "Short movement breaks that fit into a working day",
    ],
    goodFitFor: [
      "Aching shoulders and neck after long screen days",
      "Low back stiffness when you stand up from your chair",
      "Working from a laptop at a kitchen table",
    ],
    featuredImage: null,
    relatedConditions: ["posture-strain", "neck-pain"],
    sortOrder: 5,
    status: "published",
    seoTitle: "Posture and Desk Pain Help in Riverton",
    seoDescription:
      "Chiropractic care and desk setup advice for posture-related neck, shoulder and back strain in Riverton. Request an appointment.",
  },
  {
    slug: "headache-related-care",
    title: "Headache-related care",
    shortDescription:
      "Care for headaches that come from the neck, and honest advice when they don't.",
    body: [
      "Some headaches are driven by the joints and muscles of the upper neck. They often sit at the back of the head, sometimes spreading behind one eye, and they tend to come with a stiff neck or tender shoulders.",
      "Those are the headaches chiropractic care may be able to help with, and our first job is working out whether yours fits that pattern. We examine your neck movement, test the upper cervical joints and check the muscles that commonly refer pain into the head.",
      "Headaches have many other causes, some of which need medical assessment. If your headache doesn't look like it's coming from your neck — or if anything about it concerns us — we'll tell you plainly and recommend you see your doctor.",
    ],
    benefits: [
      "Assessment of whether your neck is involved at all",
      "Hands-on care for the upper neck joints and muscles",
      "Advice on the everyday triggers that keep them coming back",
      "A clear recommendation to see your GP when that's the right step",
    ],
    goodFitFor: [
      "Headaches that start at the base of the skull",
      "Head pain that arrives alongside a stiff neck",
      "Tension-type headaches after long desk days",
    ],
    featuredImage: null,
    relatedConditions: ["headaches", "neck-pain"],
    sortOrder: 6,
    status: "published",
    seoTitle: "Headache and Neck-Related Care in Riverton",
    seoDescription:
      "Chiropractic assessment and care for neck-related headaches in Riverton, with honest referral when a headache needs medical review.",
  },
  {
    slug: "wellness-and-maintenance-care",
    title: "Wellness and maintenance care",
    shortDescription:
      "Occasional check-ins for people who'd rather stay on top of a recurring problem.",
    body: [
      "Some people finish a course of care and don't need to come back. Others have a long-standing problem that flares up a few times a year and prefer to be seen occasionally rather than wait for it to become a bad week.",
      "Maintenance care is a choice, not a requirement, and we'll always be straight with you about it. If you're not getting anything from a visit, we'd rather say so than book you in again.",
      "Appointments are typically shorter than a first consultation and focus on the areas that have caused you trouble before, plus a review of your exercises and anything that's changed at work or in training.",
    ],
    benefits: [
      "Flexible spacing — you decide how often",
      "Focused on the areas that have flared up before",
      "A review of your home exercises at each visit",
      "No pressure to book a long course of care",
    ],
    goodFitFor: [
      "A recurring problem that flares a few times a year",
      "Physically demanding work that keeps aggravating an old injury",
      "Wanting to keep on top of things between busier seasons",
    ],
    featuredImage: null,
    relatedConditions: ["posture-strain", "back-pain"],
    sortOrder: 7,
    status: "published",
    seoTitle: "Ongoing and Maintenance Chiropractic Care in Riverton",
    seoDescription:
      "Occasional check-in chiropractic appointments in Riverton for recurring back and neck problems. Flexible, no long courses required.",
  },
];
