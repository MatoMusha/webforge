---
name: design-system
description: Shared design knowledge library for web-designer agents. Not user-invocable — referenced by director, builder, and future agents for typography, color, spatial, motion, interaction, responsive, and writing decisions.
user_invocable: false
---

# Design System Knowledge

This skill contains the design knowledge that web-designer agents reference when making aesthetic and implementation decisions. It distills production-grade frontend design principles into actionable guidance.

## Core Principles

1. **Bold direction over safe defaults** — Commit to a clear aesthetic. Maximalism and minimalism both work; timidity doesn't.
2. **Cohesion over variety** — One palette, one type scale, one spacing system, applied consistently.
3. **Hierarchy through contrast** — Size, weight, color, and space working together, not just one dimension.
4. **Motion with purpose** — Animate state changes and entrances, not decoration.
5. **Accessibility by default** — Contrast ratios, focus management, semantic HTML, reduced motion support.

## Anti-Patterns (The AI Slop Test)

If someone would immediately say "AI made this," the design has failed. Avoid these fingerprints:

- Cyan-on-dark, purple-to-blue gradients, neon accents on dark backgrounds
- Gradient text on headings or metrics
- Cards nested in cards, identical card grids everywhere
- Glassmorphism used decoratively (blur/glow without purpose)
- Big icons with rounded corners above every heading
- Bounce/elastic easing, overused micro-interactions
- Hero metric layouts (big number + small label + gradient accent)
- Monospace typography as shorthand for "technical"
- Inter, Roboto, Open Sans as default font choices
- Pure black (#000) or pure white (#fff)
- Center-aligning everything

## Reference Files

Agents should consult these for specific domain decisions:

- [Typography](reference/typography.md) — Type scales, font selection, loading, hierarchy
- [Color](reference/color.md) — OKLCH, palettes, dark mode, contrast requirements
- [Spatial](reference/spatial.md) — Grid systems, spacing rhythm, containers, depth
- [Motion](reference/motion.md) — Duration, easing, reduced motion, performance
- [Interaction](reference/interaction.md) — States, forms, focus, loading, keyboard navigation
- [Responsive](reference/responsive.md) — Breakpoints, fluid design, input detection, images
- [Writing](reference/writing.md) — Microcopy, errors, empty states, voice, accessibility

## Implementation Principles

- Match code complexity to the aesthetic vision
- Make unexpected, creative choices — never converge on the same defaults
- Vary between light/dark themes, different fonts, different aesthetics per project
- Production-grade: functional, accessible, performant
