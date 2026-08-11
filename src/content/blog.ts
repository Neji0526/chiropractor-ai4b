import type { BlogPost } from "./types";

/**
 * Resource articles. These are written as general education, not medical advice,
 * and each page renders a standing note pointing readers to a clinician for
 * anything specific to them.
 *
 * `publishedAt` uses ISO dates. Posts with `status: "draft"` are hidden from the
 * blog index, the sitemap and direct URLs.
 */
export const blogPosts: BlogPost[] = [
  {
    slug: "what-happens-at-your-first-chiropractic-appointment",
    title: "What happens at your first chiropractic appointment",
    excerpt:
      "A walk through a first visit from start to finish, so there are no surprises on the day.",
    body: [
      {
        type: "paragraph",
        text: "If you've never seen a chiropractor before, the not-knowing is often the off-putting part. Here's what a first appointment at the clinic actually involves.",
      },
      { type: "heading", text: "Before anything else, a conversation" },
      {
        type: "paragraph",
        text: "We start by asking about the problem: where it is, when it started, what makes it better or worse, and how it's affecting your work, sleep and training. We'll also ask about your general health, any medication you take, and any past injuries or surgery. It isn't paperwork for its own sake — those answers change what we examine and which techniques are appropriate for you.",
      },
      { type: "heading", text: "A physical assessment" },
      {
        type: "paragraph",
        text: "Next we look at how you move. That typically means watching you bend, turn and walk, testing specific joints by hand, and checking the muscles around the area. Depending on your symptoms we may test reflexes, sensation and strength as well.",
      },
      {
        type: "paragraph",
        text: "Part of this assessment is screening: a small proportion of back and neck pain is caused by problems that need medical investigation rather than chiropractic care. Looking for that is a routine part of the job.",
      },
      { type: "heading", text: "An explanation you can repeat to someone else" },
      {
        type: "paragraph",
        text: "We'll then tell you what we found, whether we think we can help, what care would involve, roughly how many visits we'd expect to review it over, and what it costs. If we don't think chiropractic care is the right answer for you, we'll say that and point you somewhere more useful.",
      },
      { type: "heading", text: "Usually, treatment the same day" },
      {
        type: "paragraph",
        text: "If the assessment shows it's appropriate, we'll treat you at the same visit. That often means an adjustment or gentle mobilisation, some soft-tissue work, and two or three things to do at home.",
      },
      { type: "heading", text: "Practical things worth knowing" },
      {
        type: "list",
        items: [
          "Allow about 45 minutes for a first visit.",
          "Wear something you can move in — leggings or shorts and a t-shirt are ideal.",
          "Bring a list of any medication, and any scan reports you already have.",
          "You're welcome to bring someone into the room with you, and you can ask for a chaperone.",
          "You can stop or change anything at any point. Say so and we will.",
        ],
      },
    ],
    featuredImage: {
      src: "/images/blog/first-visit-assessment.jpg",
      alt: "A clinician gently testing a seated patient's arm and shoulder movement during an assessment",
      width: 1200,
      height: 900,
    },
    authorSlug: "alex-moreno",
    publishedAt: "2026-06-18",
    readingMinutes: 4,
    tags: ["First visit", "What to expect"],
    status: "published",
    seoTitle: "What Happens at Your First Chiropractic Appointment",
    seoDescription:
      "A step-by-step walk through a first chiropractic visit: the questions, the assessment, the explanation and what to wear.",
  },
  {
    slug: "desk-setup-checklist-for-neck-and-shoulder-pain",
    title: "A desk setup checklist for neck and shoulder pain",
    excerpt:
      "Six changes worth making if your neck and shoulders are worse by the end of a working day.",
    body: [
      {
        type: "paragraph",
        text: "If your symptoms follow the working week — fine on Monday morning, sore by Thursday afternoon, better on holiday — your desk is worth half an hour of attention.",
      },
      {
        type: "paragraph",
        text: "There's no single correct posture, and sitting up straight for eight hours isn't the goal. What helps most people is a setup that doesn't force one fixed shape, plus regular changes of position.",
      },
      { type: "heading", text: "Start with the chair, not the screen" },
      {
        type: "paragraph",
        text: "Set the chair height so your feet are flat and your hips are level with or slightly above your knees. Then bring the desk and screen to you, rather than reaching up or hunching down to meet them.",
      },
      { type: "heading", text: "The checklist" },
      {
        type: "list",
        items: [
          "Screen top roughly at eyebrow height, about an arm's length away.",
          "Laptop on a stand with a separate keyboard and mouse — a laptop alone forces your head down.",
          "Elbows at roughly 90 degrees, forearms supported, shoulders relaxed rather than shrugged.",
          "Keyboard and mouse close enough that you aren't reaching forward.",
          "Phone off your shoulder — use a headset if you're on calls a lot.",
          "Something that makes you move: a drink you have to refill, calls taken standing, a reminder every 30–40 minutes.",
        ],
      },
      { type: "heading", text: "Movement beats posture" },
      {
        type: "paragraph",
        text: "The best setup in the world still involves sitting still. Two minutes of moving every half hour — standing, rolling the shoulders, turning the neck gently each way, walking to the kettle — tends to do more for desk-related aching than any single equipment change.",
      },
      {
        type: "paragraph",
        text: "If symptoms persist despite sorting out your setup, or you have pins and needles, numbness or weakness in an arm, get it looked at properly rather than working around it.",
      },
    ],
    featuredImage: {
      src: "/images/blog/desk-setup.jpg",
      alt: "A person leaning forward over a laptop at an office desk, with a second monitor pushed to one side",
      width: 1200,
      height: 900,
    },
    authorSlug: "priya-raman",
    publishedAt: "2026-05-27",
    readingMinutes: 4,
    tags: ["Posture", "Neck pain", "Desk work"],
    status: "published",
    seoTitle: "Desk Setup Checklist for Neck and Shoulder Pain",
    seoDescription:
      "Six practical desk changes for neck and shoulder pain that gets worse through the working week, from a Riverton chiropractor.",
  },
  {
    slug: "back-pain-when-to-see-someone",
    title: "Back pain: when to wait it out and when to get it looked at",
    excerpt:
      "Most back pain settles on its own. Here's how to tell when it's worth booking in, and which symptoms need urgent attention.",
    body: [
      {
        type: "paragraph",
        text: "A lot of back pain gets better by itself within a few weeks, especially the kind that follows an obvious trigger like lifting something awkwardly. Staying reasonably active, keeping moving within comfort and giving it a little time is sensible first-line management.",
      },
      { type: "heading", text: "Reasons to book an appointment" },
      {
        type: "list",
        items: [
          "It's been more than two or three weeks with no real improvement.",
          "It keeps coming back — several episodes a year is a pattern worth examining.",
          "It's stopping you sleeping, working or training.",
          "You're avoiding movement because you're worried about causing damage.",
          "You'd simply rather know what's going on than keep guessing.",
        ],
      },
      { type: "heading", text: "Symptoms that need medical attention now" },
      {
        type: "paragraph",
        text: "Some symptoms shouldn't wait for a chiropractic appointment. Seek urgent medical care — the emergency department or your doctor the same day — if you have any of the following alongside back pain.",
      },
      {
        type: "list",
        items: [
          "Loss of bladder or bowel control, or difficulty passing urine.",
          "Numbness around the groin, buttocks or inner thighs.",
          "Weakness in one or both legs that is getting worse.",
          "Back pain following a significant fall or accident.",
          "Back pain with fever, unexplained weight loss or a history of cancer.",
        ],
      },
      {
        type: "paragraph",
        text: "These are uncommon, but they matter enough to be worth knowing. If you're unsure whether what you have is worth an appointment, call the clinic and describe it — we'll tell you honestly whether we're the right people to see.",
      },
    ],
    featuredImage: {
      src: "/images/blog/back-pain-assessment.jpg",
      alt: "A patient pointing to a spot on their lower back while a clinician's hands rest either side of it",
      width: 1200,
      height: 900,
    },
    authorSlug: "alex-moreno",
    publishedAt: "2026-04-14",
    readingMinutes: 3,
    tags: ["Back pain", "When to get help"],
    status: "published",
    seoTitle: "Back Pain: When to Wait and When to Get It Looked At",
    seoDescription:
      "How to tell whether back pain needs an appointment, plus the symptoms that need urgent medical attention rather than chiropractic care.",
  },
  {
    slug: "getting-back-into-running-without-a-flare-up",
    title: "Getting back into running without a flare-up",
    excerpt:
      "Why most return-to-running injuries come down to load, and a simple way to build up.",
    body: [
      {
        type: "paragraph",
        text: "The injuries we see in returning runners are rarely mysterious. Someone who ran regularly a few years ago picks it back up at the pace and distance they remember, and three weeks later a calf, shin or knee objects.",
      },
      { type: "heading", text: "It's usually load, not form" },
      {
        type: "paragraph",
        text: "Tissue adapts to what you ask of it, but slowly. Tendons in particular take weeks, not days. Most early-return injuries come from the gap between what your fitness allows and what your tissues are currently prepared for — and cardiovascular fitness returns faster than tendon tolerance.",
      },
      { type: "heading", text: "A build-up that usually works" },
      {
        type: "list",
        items: [
          "Start with run-walk intervals, even if they feel far too easy.",
          "Increase either duration or intensity in a given week, not both.",
          "Keep a couple of easy weeks in every month rather than climbing continuously.",
          "Add two short strength sessions a week — calves, hamstrings, glutes.",
          "Judge a run by how you feel the next morning, not during it.",
        ],
      },
      { type: "heading", text: "When a niggle is worth attention" },
      {
        type: "paragraph",
        text: "Mild soreness that settles within 24 hours is usually fine to work with. Pain that worsens run by run, wakes you at night, or makes you limp is a signal to change something. If a niggle keeps returning to the same spot every time you build up, there's often a movement restriction somewhere nearby worth assessing.",
      },
    ],
    featuredImage: {
      src: "/images/blog/return-to-running.jpg",
      alt: "A runner in a jacket running along an empty road under a clear sky",
      width: 1200,
      height: 900,
    },
    authorSlug: "daniel-hoffmann",
    publishedAt: "2026-03-09",
    readingMinutes: 3,
    tags: ["Running", "Sports injuries", "Training"],
    status: "published",
    seoTitle: "Getting Back Into Running Without a Flare-Up",
    seoDescription:
      "Why returning runners pick up calf, shin and knee injuries, and a simple load-based build-up that reduces the risk.",
  },
];
