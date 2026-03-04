# Typography

## Type Scale

Use fewer sizes with more contrast. A 5-size system covers most needs:

| Role | Ratio | Use |
|------|-------|-----|
| xs | 0.75rem | Captions, legal |
| sm | 0.875rem | Secondary UI, metadata |
| base | 1rem | Body text |
| lg | 1.25–1.5rem | Subheadings, lead |
| xl+ | 2–4rem | Headlines, hero |

Pick a ratio (1.25 major third, 1.333 perfect fourth, 1.5 perfect fifth) and commit. Use `clamp(min, preferred, max)` for fluid sizing — add a rem offset so it doesn't collapse to 0.

## Vertical Rhythm

Line-height is the base unit for ALL vertical spacing. Body at `line-height: 1.5` on 16px = 24px. Spacing values should be multiples of that rhythm unit.

## Font Selection

**Avoid**: Inter, Roboto, Open Sans, Lato, Montserrat — invisible defaults.

**Better alternatives**:
- Sans: Instrument Sans, Plus Jakarta Sans, Outfit, Onest, Figtree, Urbanist, DM Sans
- Editorial/premium: Fraunces, Newsreader, Lora

**System fonts** are underrated for apps where performance > personality.

You often don't need a second font. One family in multiple weights creates cleaner hierarchy than two competing typefaces. When pairing, contrast on multiple axes (serif+sans, geometric+humanist, condensed+wide).

## Font Loading

```css
@font-face {
  font-family: 'CustomFont';
  src: url('font.woff2') format('woff2');
  font-display: swap;
}
```

Use metric-matched fallbacks (`size-adjust`, `ascent-override`) to minimize layout shift.

## OpenType Features

- `font-variant-numeric: tabular-nums` — data alignment
- `font-variant-numeric: diagonal-fractions` — proper fractions
- `font-variant-caps: all-small-caps` — abbreviations
- `font-variant-ligatures: none` — code blocks
- `font-kerning: normal` — enable kerning

## Accessibility

- Never `user-scalable=no`
- Use rem/em for font sizes (respects browser settings)
- Minimum 16px body text
- 44px+ tap targets for text links
- Increase line-height for light-on-dark text (+0.05–0.1)
- `max-width: 65ch` for readable measure

## Token Architecture

Name tokens semantically (`--text-body`, `--text-heading`), not by value (`--font-size-16`). Include font stacks, size scale, weights, line-heights, letter-spacing.
