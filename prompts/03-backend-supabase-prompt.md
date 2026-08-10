# Chiropractor Website — Supabase Backend Prompt

Act as a senior Supabase backend engineer.

Design a secure backend for a chiropractor lead-generation website and its content-management admin panel.

## Services
Use:
- Supabase PostgreSQL
- Supabase Auth
- Supabase Storage
- Row Level Security
- Next.js server-side Supabase integration

## Authentication
Public visitors do not need accounts.

Admin users authenticate through Supabase Auth.

Create an admin profile/role system and protect all admin operations.

## Public Access
Public users may:
- Read published website content
- Submit lead/appointment inquiry forms

They must not:
- Read leads
- Modify CMS content
- Access unpublished content
- Access admin information

## Admin Access
Authorized admins may:
- Manage services
- Manage conditions
- Manage practitioners
- Manage testimonials
- Manage FAQs
- Manage blog posts
- Manage locations/settings
- Review and update leads

## Storage
Create appropriate buckets for:
- Practitioner images
- Service images
- Blog images
- General site media

Validate file type and size.

## Lead Submission
Lead creation must be server-validated.

Capture:
- Name
- Email
- Phone
- Service
- Message
- Preferred contact method
- Source page
- UTM fields when available
- Status
- Created timestamp

Add a spam-prevention/rate-limiting strategy at the application layer.

## Security
- Enable RLS on application tables
- Use least-privilege policies
- Keep service role key server-only
- Validate and sanitize inputs
- Do not store unnecessary sensitive medical information in general marketing lead forms

## Content Publishing
CMS records should support draft/published state so admins can prepare content before publication.

Use slugs for public content and enforce uniqueness where needed.
