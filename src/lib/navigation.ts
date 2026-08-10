export interface NavItem {
  href: string;
  label: string;
}

/** Main navigation, used by the header and the mobile drawer. */
export const primaryNav: NavItem[] = [
  { href: "/services", label: "Services" },
  { href: "/about", label: "About" },
  { href: "/team", label: "Our team" },
  { href: "/testimonials", label: "Patient stories" },
  { href: "/faq", label: "FAQs" },
  { href: "/blog", label: "Resources" },
  { href: "/contact", label: "Contact" },
];

export const footerNav: { heading: string; items: NavItem[] }[] = [
  {
    heading: "Care",
    items: [
      { href: "/services", label: "All services" },
      { href: "/services/back-pain-care", label: "Back pain care" },
      { href: "/services/neck-pain-care", label: "Neck pain care" },
      { href: "/services/sports-injury-care", label: "Sports injury care" },
      { href: "/services/posture-and-desk-support", label: "Posture support" },
    ],
  },
  {
    heading: "The clinic",
    items: [
      { href: "/about", label: "About us" },
      { href: "/team", label: "Our team" },
      { href: "/testimonials", label: "Patient stories" },
      { href: "/blog", label: "Resources" },
    ],
  },
  {
    heading: "Visiting",
    items: [
      { href: "/request-appointment", label: "Request an appointment" },
      { href: "/contact", label: "Contact and directions" },
      { href: "/faq", label: "Common questions" },
    ],
  },
];

/** `true` when `pathname` is the given route or one of its children. */
export function isActivePath(pathname: string, href: string): boolean {
  if (href === "/") return pathname === "/";
  return pathname === href || pathname.startsWith(`${href}/`);
}
