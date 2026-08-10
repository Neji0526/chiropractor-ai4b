# Chiropractor Lead Generation Website — Frontend

Next.js 15 (App Router) + TypeScript + Tailwind CSS v4. **Frontend only** — there is no
Supabase, no database and no admin panel in this build, by request. Content is served
from typed local files and the enquiry form is validated server-side but not persisted.

## Running it

```bash
npm install
npm run dev        # http://localhost:3000
npm run build      # production build (all pages prerender statically)
npm run typecheck  # tsc --noEmit
npm run lint
```

Copy `.env.example` to `.env.local` and set `NEXT_PUBLIC_SITE_URL` to the real domain
before deploying — canonical URLs, Open Graph tags and the sitemap all derive from it.

## Pages

| Route | Notes |
| --- | --- |
| `/` | Hero → trust → services → conditions → why us → team → what to expect → testimonials → FAQ → resources → location → CTA |
| `/about` | How the clinic works, principles, team, location |
| `/services`, `/services/[slug]` | Service pages with an inline appointment form preset to that service |
| `/conditions`, `/conditions/[slug]` | Symptom-first entry points, cross-linked to services |
| `/team`, `/team/[slug]` | Practitioner profiles |
| `/testimonials` | Patient stories, with a proper empty state |
| `/faq` | Grouped questions + FAQPage structured data |
| `/blog`, `/blog/[slug]` | Resource articles + Article structured data |
| `/contact` | Contact details, enquiry form, hours, directions |
| `/request-appointment` | The primary conversion page |
| `/privacy` | Placeholder privacy notice (website forms only) |
| `/sitemap.xml`, `/robots.txt`, `404` | Generated from the content layer |

## Editing content

Everything niche-specific lives in [`src/content/`](src/content/) as typed data, shaped
to match the CMS tables this site is meant to read from later:

| File | What it holds |
| --- | --- |
| `site.ts` | Clinic name, phone, email, CTA labels, trust points, what-to-expect steps, SEO defaults, form consent text |
| `locations.ts` | Address, map links, opening hours |
| `services.ts` | Service pages |
| `conditions.ts` | Condition pages |
| `practitioners.ts` | Team profiles |
| `testimonials.ts` | Patient reviews |
| `faqs.ts` | FAQs (also feed FAQ structured data) |
| `blog.ts` | Articles, as simple content blocks |

Pages never import these files directly — they go through
[`src/lib/content.ts`](src/lib/content.ts), which filters drafts and sorts records.
When a backend is added, rewrite the bodies of those functions (they are already async)
and no component needs to change.

Every record has a `status` of `"draft"` or `"published"`; drafts are hidden from
listings, direct URLs and the sitemap.

### Before launch — placeholders to replace

- `site.ts`, `locations.ts` — clinic name, phone (currently a reserved `555` number),
  email, address, hours, social links.
- `practitioners.ts` — **names, schools and credentials are invented placeholders.**
  Never publish a qualification a clinician doesn't hold.
- `testimonials.ts` — **example copy, not real reviews.** Replace with consented patient
  reviews or empty the array; every testimonial section handles the empty state.
- `faqs.ts` — prices, insurers and appointment lengths are placeholders.
- `/privacy` — template covering the web forms only; needs a real notice.
- Photography — see `public/images/README.md`.

## Images

Image fields are `null` by default and render a neutral placeholder panel rather than
stock photography, so layouts look finished before a shoot. Drop real files into
`public/images/…` and set the field to `{ src, alt, width, height }`. Practitioners
without a photo show their initials.

## The lead form

One component, [`src/components/forms/LeadForm.tsx`](src/components/forms/LeadForm.tsx),
used on `/request-appointment`, `/contact` and every service page.

- Fields: name, phone, email, area of interest, preferred contact method, message,
  consent. It deliberately does **not** ask for medical history.
- Captures `sourcePage` and `utm_source` / `utm_medium` / `utm_campaign`.
- Validated server-side with Zod in
  [`src/app/actions/lead.ts`](src/app/actions/lead.ts); browser validation is only a
  convenience layer.
- Spam controls: off-screen honeypot field, a minimum fill-time trap, and an in-memory
  per-IP rate limit (5 per 10 minutes) in `src/lib/leads/rate-limit.ts`.
- Accessible states: inline field errors, an error summary that takes focus, a pending
  state, and a success panel that also takes focus.

**No persistence.** `recordLead()` logs the submission and returns. To make it live,
replace that one function with a database insert plus a notification email, and keep any
credentials in server-only env vars (never `NEXT_PUBLIC_*`).

## SEO

- Per-page titles, meta descriptions, canonical URLs, Open Graph and Twitter tags via
  `buildMetadata()` in `src/lib/seo.ts`.
- `sitemap.xml` and `robots.txt` generated from published content.
- Structured data in `src/lib/structured-data.ts`: `Chiropractic` (LocalBusiness) in the
  root layout, plus `BreadcrumbList`, `FAQPage`, `MedicalWebPage`, `Person` and
  `Article`. Properties are only emitted when the underlying fact is configured — there
  is deliberately no `aggregateRating`.

## Design and accessibility notes

- Light theme only: warm off-white grounds, one blue-teal for actions, muted sage for
  support. Tokens are defined in `@theme` in `src/app/globals.css`.
- Fonts via `next/font` (Inter + Source Serif 4), self-hosted at build time.
- Server Components throughout; the only client components are the mobile nav, the
  active nav link, the sticky mobile CTA and the lead form.
- FAQs use native `<details>`/`<summary>` — accessible with zero client JavaScript, and
  answers stay in the HTML for crawlers.
- Skip link, one `h1` per page, labelled form controls, visible focus rings,
  `prefers-reduced-motion` respected, and a sticky call/book bar on small screens.

### Verified in-browser

No horizontal overflow on any route from 320px to 1920px; form validation, value
preservation after an error, UTM capture, rate limiting, the spam traps, the mobile
drawer (Escape + focus handling) and a clean console were all checked with a real
browser against the running app.

## Content and claims policy

The copy avoids invented statistics, awards, years in practice and review counts, makes
no promise of outcomes, and doesn't diagnose the reader. Several pages point readers to
urgent medical care for red-flag symptoms. Keep that standard when editing — for a
healthcare practice it's both an ethical and a regulatory matter.

## Not included (backend was out of scope)

- Supabase / PostgreSQL, RLS policies, storage buckets
- Supabase Auth and the `/admin` CMS (leads inbox, content editors, settings)
- Lead persistence and notification email

The content layer, form action and types are shaped so these can be added without
reworking the UI.
