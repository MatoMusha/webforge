# Spatial Design

## Spacing System

Use 4pt base (not 8pt — too coarse): 4, 8, 12, 16, 24, 32, 48, 64, 96px. Name tokens semantically (`--space-sm`, `--space-lg`), not by value. Use `gap` instead of margins for sibling spacing.

## Grid Systems

Self-adjusting grid: `repeat(auto-fit, minmax(280px, 1fr))` — responsive without breakpoints. For complex layouts, use named `grid-template-areas` and redefine at breakpoints.

## Visual Hierarchy

**Squint test**: Blur your eyes. Can you identify the most important element, second most important, and clear groupings? If everything looks the same weight, hierarchy is broken.

Combine multiple dimensions — don't rely on size alone:

| Tool | Strong | Weak |
|------|--------|------|
| Size | 3:1+ ratio | <2:1 |
| Weight | Bold vs Regular | Medium vs Regular |
| Color | High contrast | Similar tones |
| Position | Top/left | Bottom/right |
| Space | Generous whitespace | Crowded |

Best hierarchy uses 2–3 dimensions at once.

## Cards

Cards are overused. Spacing and alignment create grouping naturally. Use cards only when content is truly distinct/actionable or needs comparison in a grid. **Never nest cards inside cards.**

## Container Queries

Viewport queries = page layouts. Container queries = components:

```css
.container { container-type: inline-size; }
@container (min-width: 400px) {
  .card { grid-template-columns: 120px 1fr; }
}
```

## Optical Adjustments

- Text at `margin-left: 0` looks indented — use negative margin (`-0.05em`) to align optically
- Play icons shift right, arrows shift toward direction
- Touch targets: 44px minimum via padding or `::before` pseudo-elements

## Depth & Elevation

Semantic z-index scale (dropdown → sticky → modal-backdrop → modal → toast → tooltip). Shadows should be subtle — if clearly visible, too strong. Create elevation scale (sm → md → lg → xl).
