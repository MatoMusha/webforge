# Motion Design

## Duration Rules

| Duration | Use Case |
|----------|----------|
| 100–150ms | Instant feedback (button press, toggle, color) |
| 200–300ms | State changes (menu, tooltip, hover) |
| 300–500ms | Layout changes (accordion, modal, drawer) |
| 500–800ms | Entrance animations (page load, hero reveals) |

Exit animations: ~75% of enter duration.

## Easing

Don't use `ease`. Use purpose-matched curves:

| Curve | Use | CSS |
|-------|-----|-----|
| ease-out | Elements entering | `cubic-bezier(0.16, 1, 0.3, 1)` |
| ease-in | Elements leaving | `cubic-bezier(0.7, 0, 0.84, 0)` |
| ease-in-out | State toggles | `cubic-bezier(0.65, 0, 0.35, 1)` |

Recommended defaults for micro-interactions:
```css
--ease-out-quart: cubic-bezier(0.25, 1, 0.5, 1);
--ease-out-expo: cubic-bezier(0.16, 1, 0.3, 1);
```

**Never use bounce or elastic** — dated, tacky. Real objects decelerate smoothly.

## Animate Only Transform & Opacity

Everything else causes layout recalculation. For height animations: `grid-template-rows: 0fr → 1fr`.

## Staggered Animations

```css
animation-delay: calc(var(--i, 0) * 50ms);
```

Cap total stagger time — 10 items at 50ms = 500ms max.

## Reduced Motion (Required)

```css
@media (prefers-reduced-motion: reduce) {
  .card { animation: fade-in 200ms ease-out; }
}
```

Preserve functional animations (progress bars, spinners, focus indicators) — just remove spatial movement.

## Perceived Performance

- Under 80ms feels instant
- Optimistic UI: update immediately, sync later (low-stakes only)
- Skeleton screens > spinners
- Show content progressively, don't wait for everything
- Ease-in toward task completion compresses perceived time

Don't use `will-change` preemptively. Use Intersection Observer for scroll-triggered animations.
