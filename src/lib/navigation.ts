export interface NavItem {
  href: string;
  label: string;
}

/**
 * Main navigation, used by the header and the mobile drawer.
 *
 * Labels follow the approved design. "Our Team" stands in for the design's "New
 * Patients" item, since the team page exists and a new-patients page doesn't —
 * what a new patient needs to know lives on /faq and the homepage's "what
 * happens at your first visit" section, both linked from the footer.
 */
export const primaryNav: NavItem[] = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About Us" },
  { href: "/services", label: "Services" },
  { href: "/conditions", label: "Conditions" },
  { href: "/team", label: "Our Team" },
  { href: "/blog", label: "Resources" },
  { href: "/contact", label: "Contact" },
];

export const footerNav: { heading: string; items: NavItem[] }[] = [
  {
    heading: "Quick Links",
    items: [
      { href: "/", label: "Home" },
      { href: "/about", label: "About Us" },
      { href: "/team", label: "Our Team" },
      { href: "/testimonials", label: "Patient Stories" },
      { href: "/faq", label: "FAQs" },
      { href: "/blog", label: "Resources" },
    ],
  },
  {
    heading: "Services",
    items: [
      { href: "/services/back-pain-care", label: "Back Pain Care" },
      { href: "/services/neck-pain-care", label: "Neck Pain Care" },
      { href: "/services/sports-injury-care", label: "Sports Injury Care" },
      { href: "/services/headache-related-care", label: "Headaches & Migraines" },
      { href: "/services/posture-and-desk-support", label: "Posture Support" },
      { href: "/services", label: "All Services" },
    ],
  },
];

/** `true` when `pathname` is the given route or one of its children. */
export function isActivePath(pathname: string, href: string): boolean {
  if (href === "/") return pathname === "/";
  return pathname === href || pathname.startsWith(`${href}/`);
}
