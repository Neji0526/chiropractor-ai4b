# Images

This folder is empty on purpose. The site renders a neutral placeholder panel wherever a
photo is missing, so nothing is broken and no stock photography is passed off as the
clinic's own.

## Adding real photography

Suggested layout:

```
public/images/
  clinic/      reception, treatment rooms, exterior, street view
  team/        one portrait per practitioner
  services/    optional, one per service page
  blog/        optional, one per article
```

Then point the content record at the file. For example, in `src/content/practitioners.ts`:

```ts
photo: {
  src: "/images/team/alex-moreno.jpg",
  alt: "Dr. Alex Moreno, chiropractor at Northside Family Chiropractic",
  width: 1200,
  height: 1500,
},
```

`width` and `height` are the file's intrinsic dimensions — `next/image` uses them to
reserve space and avoid layout shift.

## Practical notes

- Real photos of the clinic and team outperform stock imagery for local trust. Shoot the
  actual reception, rooms and street entrance if you can.
- Portraits: ~4:5, at least 1200px wide. Hero and service images: ~4:3 or 5:4.
- Write meaningful `alt` text describing what's in the shot.
- Never publish a patient's photo without written consent.
- Compress before committing (aim under ~300 KB per image); `next/image` handles
  resizing and modern formats from there.
- If images will be served from a CDN or media library rather than this folder, add the
  host to `images.remotePatterns` in `next.config.ts`.
