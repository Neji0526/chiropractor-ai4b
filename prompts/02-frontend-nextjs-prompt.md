# Chiropractor Website — Next.js Frontend Prompt

Act as a senior Next.js frontend engineer and conversion-focused UI developer.

Build the public frontend and admin UI for a chiropractor lead-generation website.

## Technology
- Next.js 15 App Router
- TypeScript
- Tailwind CSS
- Supabase client/server utilities

## Requirements
Use Server Components by default. Use Client Components only when interactivity requires them.

Create reusable, typed components and keep business logic separate from presentation.

## Public Routes
- /
- /about
- /services
- /services/[slug]
- /team
- /team/[slug]
- /testimonials
- /faq
- /blog
- /blog/[slug]
- /contact
- /request-appointment

## Core Components
- Header
- MobileNavigation
- Footer
- Hero
- TrustBar
- ServiceCard
- ConditionCard
- PractitionerCard
- TestimonialCard
- FAQAccordion
- AppointmentForm
- ContactForm
- LocationSection
- BusinessHours
- CTASection
- Breadcrumbs

## Homepage UX
Prioritize conversion above decoration.

The first screen should clearly communicate:
- What the clinic does
- Who it helps
- Where it is located
- How to request an appointment

Use prominent Book/Request Appointment and Call buttons.

## Forms
Build accessible forms with:
- Validation
- Loading state
- Success state
- Error state
- Spam protection strategy
- Server-side submission handling

Never expose Supabase service-role credentials to the browser.

## Responsive Design
Optimize for:
- Mobile
- Tablet
- Desktop

Mobile should have an easy-to-reach call/appointment CTA.

## Accessibility
Use semantic HTML, labels, keyboard navigation, visible focus states, accessible contrast, alt text support, and appropriate ARIA only where necessary.

## Performance
Use:
- next/image
- next/font
- Server Components
- sensible caching/revalidation
- optimized images
- minimal client JavaScript

## Visual Direction
Light, clean, calm and local-professional.

Do not build a dark SaaS interface or generic AI landing page.
