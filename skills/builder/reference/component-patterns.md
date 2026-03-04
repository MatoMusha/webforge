# Component Patterns

## Composition Over Configuration

Prefer composable components with children/slots over prop-heavy monoliths:

```jsx
// Good: composable
<Card>
  <Card.Header>Title</Card.Header>
  <Card.Body>Content</Card.Body>
</Card>

// Avoid: prop-heavy
<Card title="Title" body="Content" headerClass="..." />
```

## Page Layout — Vary by Context

**CRITICAL: Every project should have a unique layout structure.** Do not reuse the same hero → features → CTA template. The layout should be driven by the content type and purpose.

### Layout Templates by Purpose

**Marketing / Landing page:**
- Split hero (text left, visual right) → social proof strip → feature deep-dives (alternating) → pricing → CTA
- Full-bleed hero with scroll-reveal → editorial content blocks → testimonial → footer CTA
- Video/animation hero → problem/solution narrative sections → demo → signup

**Portfolio / Creative:**
- Full-screen project grid (masonry or bento) → project detail pages with large images
- Horizontal scroll showcase → about section → contact
- Single-column editorial with large typography and inline media

**Documentation / Tool:**
- Sidebar navigation + content area with table of contents
- Tabbed interface with code examples and previews
- Dashboard-style grid with feature cards of varying sizes

**E-commerce / Product:**
- Product grid with filters → product detail (gallery + info split) → related items
- Single-product hero with sticky add-to-cart → feature sections → reviews

**Blog / Editorial:**
- Wide header with featured post → grid of recent posts → categories sidebar
- Magazine-style layout with mixed column widths and pull quotes

**Restaurant / Local business:**
- Full-bleed hero image → split sections (menu, hours, location) → gallery → reservations
- Parallax sections with large food photography → menu grid → contact

### Section Patterns
- **Split**: text + media side by side, alternating direction
- **Bento grid**: mixed-size tiles for visual interest (not uniform cards)
- **Feature deep-dive**: large visual + detailed text, one feature per section
- **Testimonial**: single quote with attribution, or carousel
- **Stats**: key numbers with context (not the hero metric template)
- **FAQ**: `<details>/<summary>` accordion
- **Timeline**: vertical or horizontal progression
- **Comparison**: side-by-side columns or table
- **Gallery**: masonry, grid, or lightbox

### Experimental Section Techniques (bold layout only)

Use these when `--layout-style: bold`. Each should simplify or degrade gracefully on mobile and with `prefers-reduced-motion`.

- **Broken grid**: Elements deliberately crossing grid column/row boundaries via `grid-column: span 2` + negative margins. Creates visual tension.
- **Giant typography as texture**: Oversized text (20vw+) as background/decorative element using low opacity or `mix-blend-mode`. Not for reading — purely visual.
- **Sticky reveal**: Section content that "peels" or reveals during scroll using `position: sticky` + `overflow: hidden` on the container.
- **Mixed-width sections**: Alternating between narrow text containers (`max-width: 65ch`) → full-bleed media → wide grid layouts. Breaks the monotony of uniform width.
- **Parallax layers**: CSS-only depth via `perspective` on parent + `translateZ` on children. No JS parallax libraries.
- **Clip-path transitions**: Angled (`polygon`) or curved (`ellipse`) section edges instead of straight horizontal dividers. Use `clip-path` on sections.

**Never use the same layout twice across different projects. Combine and remix these patterns to create something unique each time.**

### Navigation

**Single-page:**
- Mobile: hamburger → slide drawer or full-screen overlay
- Desktop: horizontal with clear active states

**Multi-page:**
- Shared nav injected via JS module (`scripts/shared.js`) on every page
- Active page marked with `aria-current="page"` — style distinctly (underline, bold, color)
- Logo always links to `/` (root/home page)
- Consistent footer with secondary page links and site info
- Optional: View Transitions API for smooth page-to-page navigation:
  ```js
  // In nav link click handler
  if (document.startViewTransition) {
    document.startViewTransition(() => {
      window.location.href = targetUrl;
    });
  } else {
    window.location.href = targetUrl;
  }
  ```
  Always provide `prefers-reduced-motion` fallback (instant navigation, no transition)

**Both:**
- Use `<nav>` with `aria-label` for multiple nav regions
- Skip link as first focusable element

### Forms
- Visible labels above inputs (not placeholders)
- Group related fields with `<fieldset>/<legend>`
- Inline validation on blur
- Descriptive submit buttons ("Create account", not "Submit")
- Error summary at top for multiple errors

## Naming Conventions

Match the project. Common patterns:
- **React**: PascalCase components, camelCase props
- **Vue**: PascalCase or kebab-case components
- **CSS**: BEM (`.block__element--modifier`) or utility-first
- **Files**: `ComponentName.tsx` or `component-name.vue`

## File Organization

```
components/
├── ui/              — primitives (Button, Input, Card)
├── layout/          — structural (Header, Footer, Section)
├── features/        — domain-specific (PricingTable, ContactForm)
└── pages/           — full page compositions
```

## Accessibility Defaults

Every component should include by default:
- Keyboard navigation (Tab, Enter, Escape, Arrow keys where appropriate)
- Focus management (visible focus rings via `:focus-visible`)
- Screen reader support (semantic HTML, ARIA when needed)
- Color contrast compliance (4.5:1 body text, 3:1 UI elements)
- Reduced motion support
