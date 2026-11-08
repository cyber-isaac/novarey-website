# NovaRey design direction

Creative studio with operational precision. Lead with Isaac's actual artwork,
films, projects, and process. Make the surrounding interface quiet enough for
that work to be memorable. Existing project requirements take precedence over
general design guidance.

## How to use this brief

For future design work, read this file before changing a page. Use Anthropic's
[frontend-design guidance](https://github.com/anthropics/skills/blob/main/skills/frontend-design/SKILL.md)
to critique hierarchy, specificity, layout, copy, and motion. Use Hallmark's
review principles to spot repetition and decorative filler. These are authoring
and review references, not runtime dependencies or global assistant installs.
Finish with browser checks; neither reference replaces functional testing.

## Visual system

- Keep Inter Tight for display headings and Inter for readable body and controls.
  Reserve JetBrains Mono for real codes or process numbers, not all interface text.
- AI Strategy pilot palette: dark ground #0b1118, surface #101b26, ink #f2f6fb,
  secondary #afbfce, accent #8fd3ff, rule #314353. Light: ground/surface #ffffff,
  ink #101827, secondary #475569, accent #155e75, rule #cbd5e1.
  Amber retains a warm ground with readable ivory ink and warm accent.
- Use semantic CSS variables local to a component or page. Declare theme pairs
  at their source. Avoid fixing new components with broad utility overrides.
- Keep copy to approximately 65 characters per line. Give headings space, avoid
  clipped text, and use sentence case in navigation and actions.
- Prefer open editorial compositions, useful lists, and process rows. Cards
  should group meaningful content, not be the default wrapper for every item.
- Preserve the homepage film, About globe, Aether, original artwork, and existing
  routes. Do not invent metrics, testimonials, project outcomes, or provider claims.

## AI Strategy pilot

Keep the existing offer and destinations. Feature an explicitly illustrative creative workflow in the hero,
then explain task-based tools, human creative direction, a numbered four-step
production flow, and client-owned deliverables. Use one clear contact action and
a secondary portfolio action. Keep captions outside images. Remove decorative
badges, ambient grids, sweeping lights, and repeated reveal effects.

The AI Strategy hero uses native text and a numbered workflow, with no invented
outputs or live-product claims. Original promotional artwork is retained in the
work collection. Captions remain outside media. Tool/process rows stay static;
only real destinations use link affordances. Layout follows the available content
width beside the sidebar.

## Navigation icons

- Use the existing Lucide outline family: 20px glyph, 1.75px stroke, round caps,
  32px icon area, and at least 44px interactive row. Keep the same size in all groups.
- Use clear metaphors: person for About, open book for research, connected workflow
  for AI Strategy, and waves for the visualizer. Keep visible route labels expanded
  and accessible names plus native titles collapsed.
- Inactive icons stay neutral. Selected links combine an accent icon, persistent
  edge marker, background, font weight, and aria-current. Color is supplementary.
- Adapt the phosphor character of [Cuvii Raster Pulse](https://labs.cuvii.dev/volume/phosphor?look=raster-pulse)
  as one brief scan confined to the icon on hover or keyboard focus. Keep labels
  sharp. Use original CSS; do not embed remote effects, scripts, or brand logos.
- Choose dark accent ink for light mode independently of the pale dark-mode accent.
  Reduced motion disables the scan and glow animation. No automatic looping.

## Verification

Check light, dark, and amber; expanded and collapsed rail; mobile drawer; keyboard
focus, Escape and focus return; reduced motion; contact and portfolio destinations.
Verify meaningful content on first load and on navigation, no horizontal overflow,
no broken artwork, no runtime errors, and text contrast at least 4.5:1 (3:1 for
large text and essential interface graphics). Review desktop and phone screenshots.

## Credibility cleanup — November 2026

Use `/work` as the sole public portfolio destination. `/portfolio` redirects there;
URLs below `/portfolio/` remain available for images and the PDF. Work appears in
this order: selected website/industrial examples, visual studies, original motion,
heritage, shop/PDF, contact. Do not restore stock-video projects, unverified website
entries, unsupported client/output counts, roadmap filler, or duplicate sales sections.

Quick help is navigation, with four ordinary site links. Never imply a live model,
vault connection, online operator, or fabricated conversation. Research uses one
dated chronological list with search/topic/tag filters. Contact details belong in
one concise sentence. Service examples and deliverables should match the service.

Keep meaningful interactions and signature media. Remove decorative telemetry,
hero badges, route flashes, repeated entrance reveals, and movement on static
content. The AI Strategy hero uses a labeled illustrative workflow; the original
promotional poster remains in the visual studies collection.
