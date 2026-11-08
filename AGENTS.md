# Project guidance

For visual or interaction changes, read [DESIGN.md](./DESIGN.md) first. It records
NovaRey's identity, typography, theme pairs, navigation icon treatment, and the
AI Strategy pilot. Apply its project-specific choices when using general design
skills; do not mechanically impose a reference's aesthetic across every page.

Keep existing original artwork, routes, and working controls unless the user
requests a change. Prefer component-owned semantic styles and theme variables
over adding global utility overrides. Keep keyboard focus, accessible names,
and reduced-motion behavior when modifying navigation or animation.

Validate affected flows in the rendered app, including light/dark themes and a
phone-sized layout. Use the existing `npm run build` and `npm test` checks when
appropriate to the scope. Document meaningful limitations rather than claiming
a complete accessibility or security certification.
