# Code Quality

## Production Standards

### HTML
- Use semantic elements (`<header>`, `<nav>`, `<main>`, `<section>`, `<article>`, `<aside>`, `<footer>`)
- Include `lang` attribute on `<html>`
- `<meta charset="utf-8">` as first element in `<head>`
- `<meta name="viewport" content="width=device-width, initial-scale=1">`
- `<title>` and `<meta name="description">` on every page
- Proper heading hierarchy (h1 → h2 → h3, no skipping)
- `alt` on all images (empty `alt=""` for decorative)
- `<button>` for actions, `<a>` for navigation — never the reverse
- Include Open Graph tags (`og:title`, `og:description`, `og:image`) for shareable pages
- Include a `<link rel="icon">` favicon reference

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
- Use `content-visibility: auto` for long pages (test that screen readers still access all content)
- Minimize DOM depth — flat is better than nested
- Avoid forced synchronous layouts (read then write, not interleaved)

### Images
- Use modern formats (WebP, AVIF) with `<picture>` fallbacks
- Provide responsive `srcset` with width descriptors
- Set explicit `width` and `height` attributes to prevent CLS
- SVG for icons and logos (inline for styling, `<img>` for decoration)
- Inline SVGs: `role="img"` + `aria-label` (or `<title>` element); decorative SVGs: `aria-hidden="true"`

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

## Security

### XSS Prevention
- Never use `innerHTML` with dynamic content — use `textContent` or DOM methods
- Escape all user-provided text in HTML output (`&` → `&amp;`, `<` → `&lt;`, `>` → `&gt;`, `"` → `&quot;`)
- No inline event handlers in generated HTML (`onclick`, `onerror`, `onload`, etc.)
- No `eval()`, `Function()`, or `setTimeout`/`setInterval` with string arguments

### Content Security Policy
- Include a CSP meta tag in generated HTML:
  ```html
  <meta http-equiv="Content-Security-Policy" content="default-src 'self'; style-src 'self' 'unsafe-inline' fonts.googleapis.com; font-src fonts.gstatic.com; img-src 'self' data:;">
  ```
- Adjust the policy for the specific page requirements (e.g., add domains for external images)

### External Resources
- All external URLs must use HTTPS — never HTTP
- Use `integrity` attributes (SRI) for CDN-hosted scripts or stylesheets where available
- Never include tracking scripts, analytics, or third-party JS unless explicitly requested by the user
- External resources (fonts, CDNs) should use `crossorigin` attribute when applicable

### Forms
- Default to no `action` attribute (client-side only) unless the user provides a specific endpoint
- Use `POST` method for forms that submit data
- Include a note about CSRF protection if the form targets a server
