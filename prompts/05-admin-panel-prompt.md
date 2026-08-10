# Chiropractor Website — Admin Panel Prompt

Build a secure, easy-to-use CMS/admin dashboard for a chiropractic practice.

The admin panel should be niche-specific rather than a generic AI dashboard.

## Routes
- /admin/login
- /admin
- /admin/leads
- /admin/services
- /admin/conditions
- /admin/practitioners
- /admin/testimonials
- /admin/faqs
- /admin/blog
- /admin/locations
- /admin/settings

## Dashboard
Show useful operational information:
- New leads
- Leads awaiting contact
- Recent inquiries
- Lead source summary
- Recently edited content

## Lead Management
Provide:
- Search
- Filters
- Status filtering
- Lead detail view
- Status updates
- Internal notes
- Source/UTM information

Statuses:
- New
- Contacted
- Qualified
- Appointment Scheduled
- Closed

## Content Management
Provide create/edit/publish/unpublish/delete workflows for:
- Services
- Conditions
- Practitioners
- Testimonials
- FAQs
- Blog posts

Use niche-specific labels such as Services, Conditions We Help With, Practitioners, and Patient Stories.

## Settings
Allow clinic staff to edit:
- Clinic name
- Phone
- Email
- Address
- Hours
- Main CTA text
- Social links
- SEO defaults

## UX
Use a light, clean admin interface.

Make forms understandable for non-technical clinic staff.

Include:
- Validation
- Confirmation for destructive actions
- Save states
- Empty states
- Error states
- Success feedback

Protect every admin route and mutation.
