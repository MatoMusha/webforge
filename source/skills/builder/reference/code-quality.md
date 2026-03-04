# Code Quality

## Production Standards

### HTML
- Use semantic elements (`<header>`, `<nav>`, `<main>`, `<section>`, `<article>`, `<aside>`, `<footer>`)
- Include `lang` attribute on `<html>`
- Proper heading hierarchy (h1 → h2 → h3, no skipping)
- `alt` on all images (empty `alt=""` for decorative)
- `<button>` for actions, `<a>` for navigation — never the reverse

### CSS
- Custom properties for all design tokens (colors, spacing, typography)
- Logical properties where appropriate (`margin-inline`, `padding-block`)
- Container queries for component responsiveness
- `prefers-reduced-motion` and `prefers-color-scheme` support
- No `!important` except for utility overrides
- Avoid `z-index` wars — use a semantic scale

### JavaScript/TypeScript
- Type props and events (TypeScript projects)
- Handle loading, error, and empty states
- Clean up event listeners and observers
- Use `ResizeObserver` / `IntersectionObserver` over scroll/resize events
- Debounce user input handlers

## Performance Patterns

### Loading
- Lazy load images below the fold (`loading="lazy"`)
- Preload critical fonts and above-fold images
- Use `<link rel="preconnect">` for external domains
- `font-display: swap` on all custom fonts
- Avoid layout shift (reserve space for async content)

### Rendering
- Only animate `transform` and `opacity`
- Use `content-visibility: auto` for long pages
- Minimize DOM depth — flat is better than nested
- Avoid forced synchronous layouts (read then write, not interleaved)

### Images
- Use modern formats (WebP, AVIF) with `<picture>` fallbacks
- Provide responsive `srcset` with width descriptors
- Set explicit `width` and `height` attributes to prevent CLS
- SVG for icons and logos (inline for styling, `<img>` for decoration)

## Accessibility Checklist

### Keyboard
- [ ] All interactive elements reachable via Tab
- [ ] Escape closes overlays/modals
- [ ] Enter/Space activates buttons
- [ ] Arrow keys navigate within groups (tabs, menus)
- [ ] Focus visible on all interactive elements
- [ ] Skip link to main content

### Screen Readers
- [ ] Semantic HTML structure
- [ ] ARIA labels on icon-only buttons
- [ ] `aria-live` regions for dynamic content
- [ ] `aria-describedby` for form validation
- [ ] Heading hierarchy makes sense read linearly

### Visual
- [ ] 4.5:1 contrast for body text
- [ ] 3:1 contrast for large text and UI elements
- [ ] Information not conveyed by color alone
- [ ] Text resizable to 200% without loss
- [ ] Reduced motion alternative for all animations

## Error Handling

- Show helpful error messages (what happened, how to fix)
- Provide fallback UI for failed loads (not blank screens)
- Handle network errors gracefully (retry with backoff, offline state)
- Log errors for debugging, show user-friendly messages
- Never expose stack traces or internal details to users
