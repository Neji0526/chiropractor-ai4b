import type { Condition } from "./types";

/**
 * Condition pages describe what people commonly experience and what an
 * assessment looks like. They deliberately avoid diagnosing the reader,
 * promising relief, or suggesting chiropractic care replaces medical advice.
 */
export const conditions: Condition[] = [
  {
    slug: "back-pain",
    title: "Back pain",
    shortDescription:
      "Low back and mid-back pain, whether it came on suddenly or built up over time.",
    body: [
      "Back pain is common and most of it isn't caused by anything sinister. That doesn't make it any less disruptive when you can't lift your child, sit through a meeting or sleep on your usual side.",
      "When you come in, we want to understand the pattern: where it is, what started it, what makes it worse, and how it behaves through the day. Then we examine how your spine and hips move and test the structures involved.",
      "That assessment tells us two things — whether we think chiropractic care is a reasonable option for you, and whether anything suggests you need a medical opinion first. We'll tell you either way before any treatment starts.",
    ],
    commonSigns: [
      "Pain across the low back that's worse first thing or after sitting",
      "Stiffness bending forward, putting on shoes or getting out of the car",
      "An ache between the shoulder blades that builds through the day",
      "Pain that eases when you walk and returns when you stop",
    ],
    featuredImage: null,
    relatedServices: ["back-pain-care", "chiropractic-adjustments"],
    sortOrder: 1,
    status: "published",
    seoTitle: "Back Pain — Chiropractic Assessment in Riverton",
    seoDescription:
      "What to expect from a chiropractic assessment for low back and mid-back pain in Riverton, and when back pain needs a medical opinion instead.",
  },
  {
    slug: "neck-pain",
    title: "Neck pain and stiffness",
    shortDescription:
      "Restricted, aching necks — including desk-related tension and stiffness after sleeping awkwardly.",
    body: [
      "Neck pain often shows up as a restriction rather than a sharp pain: you notice it reversing the car, or that turning one way feels shorter than the other.",
      "We check how far your neck moves in each direction, which segments are stiff, and how the muscles across your shoulders and upper back are involved. Long screen hours and phone use come up in almost every one of these conversations, so we look at those too.",
      "Some neck symptoms — particularly pain following a significant accident, or pain with numbness, weakness or dizziness — need careful assessment before any hands-on care. We screen for those as a matter of routine.",
    ],
    commonSigns: [
      "Turning your head noticeably further one way than the other",
      "Tightness at the base of the skull and across the shoulders",
      "Waking with a stiff neck that loosens through the morning",
      "Aching that builds over a working week and settles at weekends",
    ],
    featuredImage: null,
    relatedServices: ["neck-pain-care", "posture-and-desk-support"],
    sortOrder: 2,
    status: "published",
    seoTitle: "Neck Pain and Stiffness — Chiropractor in Riverton",
    seoDescription:
      "How a Riverton chiropractor assesses neck pain and stiffness, what care involves, and which neck symptoms need medical review first.",
  },
  {
    slug: "sciatica",
    title: "Sciatica and referred leg pain",
    shortDescription:
      "Pain, pins and needles or heaviness travelling from the back into the buttock or leg.",
    body: [
      "\"Sciatica\" is a description rather than a diagnosis — it means pain following the path of the sciatic nerve, from the low back through the buttock and down the leg. Several different problems can produce it, which is why the assessment matters more here than almost anywhere else.",
      "We test movement, reflexes, sensation and strength to work out where the irritation is likely coming from and how the nerve is responding. That shapes both whether we treat you and how gently we do it.",
      "Progressive weakness, numbness around the groin, or changes to bladder or bowel control are not things to wait on — they need urgent medical attention, and we will send you straight on if we see them.",
    ],
    commonSigns: [
      "Pain travelling from the low back or buttock into the leg",
      "Pins and needles or a burning line down the back of the thigh",
      "Symptoms worse with sitting, coughing or bending forward",
      "A leg that feels heavy or tires quickly when walking",
    ],
    featuredImage: null,
    relatedServices: ["back-pain-care", "chiropractic-adjustments"],
    sortOrder: 3,
    status: "published",
    seoTitle: "Sciatica and Leg Pain — Chiropractic Assessment in Riverton",
    seoDescription:
      "Chiropractic assessment for sciatica and referred leg pain in Riverton, including the symptoms that need urgent medical attention.",
  },
  {
    slug: "headaches",
    title: "Neck-related headaches",
    shortDescription:
      "Headaches that appear to come from the joints and muscles of the upper neck.",
    body: [
      "Not all headaches are the same, and only some of them involve the neck. The ones that do tend to start at the base of the skull, sit on one side more than the other, and travel over the head or behind the eye.",
      "Our assessment focuses on whether your neck is part of the picture: how the upper cervical joints move, how the surrounding muscles respond to pressure, and whether that reproduces a familiar pattern.",
      "Migraine, medication-related headaches and headaches with other medical causes need different management. If that's what we suspect, we'll say so and recommend you speak to your doctor. A sudden, severe or unusual headache should always be assessed medically first.",
    ],
    commonSigns: [
      "Head pain beginning at the back of the skull or neck",
      "Headaches alongside neck stiffness or shoulder tension",
      "Pain that's usually on the same side each time",
      "Onset after long desk days or poor sleep",
    ],
    featuredImage: null,
    relatedServices: ["headache-related-care", "neck-pain-care"],
    sortOrder: 4,
    status: "published",
    seoTitle: "Neck-Related Headaches — Chiropractor in Riverton",
    seoDescription:
      "How we assess whether a headache is coming from your neck, what care involves in Riverton, and when to see your doctor instead.",
  },
  {
    slug: "sports-injuries",
    title: "Sports and training injuries",
    shortDescription:
      "Strains, sprains and overuse problems from running, lifting, team sport and getting back into training.",
    body: [
      "Most training injuries fall into one of two groups: something that happened in a moment, or something that crept up as your training load went past what your body was ready for.",
      "We assess the injured tissue and the joints either side of it, because a stiff ankle, hip or shoulder often explains why the same calf, hamstring or elbow keeps flaring up.",
      "Care combines hands-on treatment with loading — the exercises that rebuild the tissue's tolerance — and a realistic conversation about training. Sometimes the honest answer is that you need imaging or a sports medicine opinion, and we'd rather say that at visit one.",
    ],
    commonSigns: [
      "A muscle that tightens at the same point in every run",
      "Shoulder or elbow pain that's worse the day after training",
      "A joint that swelled after a match and hasn't fully settled",
      "Pain that returns each time you increase training volume",
    ],
    featuredImage: null,
    relatedServices: ["sports-injury-care", "chiropractic-adjustments"],
    sortOrder: 5,
    status: "published",
    seoTitle: "Sports Injuries — Chiropractic Care in Riverton",
    seoDescription:
      "Chiropractic assessment and care for sports and training injuries in Riverton, with return-to-training advice and onward referral when needed.",
  },
  {
    slug: "posture-strain",
    title: "Posture-related strain",
    shortDescription:
      "Neck, shoulder and back symptoms that track with long hours of sitting or repetitive work.",
    body: [
      "If your symptoms are predictable — fine in the morning, sore by 4pm, better on holiday — the way you spend your day is worth examining as closely as your spine.",
      "We look at how your neck, mid-back and hips move, treat the areas that have become stiff, and then go through your workstation or work task in practical detail.",
      "The aim isn't a perfect posture. It's more variety: a setup that doesn't force you into one shape, and a couple of movement breaks that are realistic to actually do.",
    ],
    commonSigns: [
      "Symptoms that follow the working week",
      "Shoulder and neck tension after long screen sessions",
      "Low back stiffness on standing up from a chair",
      "Discomfort that eases within a day or two of a break",
    ],
    featuredImage: null,
    relatedServices: ["posture-and-desk-support", "neck-pain-care"],
    sortOrder: 6,
    status: "published",
    seoTitle: "Posture-Related Neck and Back Strain in Riverton",
    seoDescription:
      "Chiropractic care and desk setup advice for posture-related neck, shoulder and back strain in Riverton. Request an appointment.",
  },
];
