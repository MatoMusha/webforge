# Responsive Design

## Mobile-First

Start with base styles for mobile, use `min-width` queries to layer complexity. Desktop-first means mobile loads unnecessary styles.

## Breakpoints

Content-driven, not device-driven. Start narrow, stretch until design breaks, add breakpoint. Three usually suffice (~640, 768, 1024px). Prefer `clamp()` for fluid values without breakpoints.

## Input Detection

Screen size ≠ input method. Use pointer and hover queries:

```css
@media (pointer: fine) { .button { padding: 8px 16px; } }
@media (pointer: coarse) { .button { padding: 12px 20px; } }
@media (hover: hover) { .card:hover { transform: translateY(-2px); } }
@media (hover: none) { /* no hover states for touch */ }
```

Never rely on hover for functionality.

## Safe Areas

```css
body {
  padding: env(safe-area-inset-top) env(safe-area-inset-right)
           env(safe-area-inset-bottom) env(safe-area-inset-left);
}
```

Enable with `<meta name="viewport" content="..., viewport-fit=cover">`.

## Responsive Images

```html
<img src="hero-800.jpg"
  srcset="hero-400.jpg 400w, hero-800.jpg 800w, hero-1200.jpg 1200w"
  sizes="(max-width: 768px) 100vw, 50vw"
  alt="Hero image">
```

Use `<picture>` for art direction (different crops, not just resolutions).

## Layout Adaptation

- **Navigation**: hamburger → horizontal compact → full with labels
- **Tables**: transform to cards on mobile with `data-label` attributes
- **Progressive disclosure**: `<details>/<summary>` for collapsible content
- Don't hide critical functionality on mobile — adapt, don't amputate

## Testing

DevTools emulation misses touch interactions, real CPU constraints, network latency, font rendering. Test on at least one real iPhone and one real Android.
