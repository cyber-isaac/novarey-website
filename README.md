# NovaRey Ventures

Design & Venture Studio website.

## Tech Stack
- React
- Vite
- Tailwind CSS
- Framer Motion

## Getting Started
1. `npm install`
2. `npm run dev`

## Production build and checks

Use Node 20 or later. Run `npm ci`, `npm run build`, then `npm test`.
`npm run preview -- --host 127.0.0.1` serves the production build locally.
The build prerenders the public marketing pages with page-specific metadata and
content. Interactive lab routes use `app.html` as the SPA fallback.

## Deployment configuration

- Publish `dist` on Netlify with the build command `npm run build`.
- Enable **Forms > Form detection** before deploying, then confirm the
  `project-inquiry` form appears after deployment. Configure submission email
  notifications in Netlify if desired. The former email plugin is not required
  for Netlify Forms.
- Test a real submission after deployment and verify it appears in the Netlify
  Forms dashboard. Local preview tests validate error handling; they do not
  prove live delivery.
- Until the custom domain is connected, the canonical origin defaults to
  `https://novarey.netlify.app`. Once both apex and www are correctly connected
  to this Netlify project, choose the primary domain, set `VITE_SITE_URL` to its
  HTTPS origin, and rebuild. Netlify should redirect secondary domains to the
  primary one. Preserve existing mail DNS records when changing website DNS.
- Set `VITE_BOOKING_URL` to a real availability-based appointment schedule.
  Without it, the site offers a call request through the project brief.

The portfolio PDF is assembled from the 22 existing `DesignPortfolio*.png`
pages. Its artwork is preserved, including the contact details in the originals.
WebP versions replace source images that the build prunes. The build checks
verify that rendered media and document links point to files actually shipped.
