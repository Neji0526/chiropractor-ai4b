# Chiropractor Website — PostgreSQL Database Structure Prompt

Design a normalized PostgreSQL schema for a chiropractor lead-generation website powered by Supabase.

## Core Tables

### profiles
- id uuid PK referencing auth.users
- full_name
- role
- created_at
- updated_at

### services
- id uuid PK
- title
- slug unique
- short_description
- description
- featured_image
- benefits
- sort_order
- status
- seo_title
- seo_description
- created_at
- updated_at

### conditions
- id uuid PK
- title
- slug unique
- short_description
- content
- featured_image
- status
- seo_title
- seo_description
- created_at
- updated_at

### practitioners
- id uuid PK
- name
- slug unique
- title
- photo
- bio
- education
- credentials
- specialties
- sort_order
- status
- created_at
- updated_at

### testimonials
- id uuid PK
- display_name
- quote
- rating
- featured
- status
- created_at
- updated_at

### faqs
- id uuid PK
- question
- answer
- category
- sort_order
- status
- created_at
- updated_at

### blog_posts
- id uuid PK
- title
- slug unique
- excerpt
- content
- featured_image
- author_id
- status
- published_at
- seo_title
- seo_description
- created_at
- updated_at

### locations
- id uuid PK
- name
- address_line_1
- address_line_2
- city
- state
- postal_code
- phone
- email
- map_url
- created_at
- updated_at

### business_hours
- id uuid PK
- location_id FK
- day_of_week
- open_time
- close_time
- is_closed

### leads
- id uuid PK
- name
- email
- phone
- service_id nullable FK
- preferred_contact_method
- message
- source_page
- utm_source
- utm_medium
- utm_campaign
- status
- admin_notes
- created_at
- updated_at

### site_settings
- id uuid PK
- key unique
- value jsonb
- updated_at

## Requirements
Generate production-ready SQL including:
- UUID defaults
- Foreign keys
- Useful indexes
- CHECK constraints/enums where appropriate
- created_at/updated_at handling
- RLS enablement
- Public read policies for published content
- Public insert-only policy or secure server strategy for leads
- Admin CRUD policies

Do not allow anonymous users to SELECT lead records.
