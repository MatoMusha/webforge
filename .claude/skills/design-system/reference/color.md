# Color & Contrast

## Use OKLCH

OKLCH is perceptually uniform — equal lightness steps look equal (unlike HSL). Format: `oklch(lightness% chroma hue)`.

```css
--color-primary: oklch(60% 0.15 250);
--color-primary-light: oklch(85% 0.08 250);  /* reduce chroma at extremes */
--color-primary-dark: oklch(35% 0.12 250);
```

**Key**: Reduce chroma as you approach white/black. High chroma at extreme lightness looks garish.

## Fallbacks

Always provide hex/rgb fallbacks before OKLCH values. The browser uses the last value it understands (CSS cascade):

```css
--color-primary: #4a7cf5;              /* fallback for older browsers */
--color-primary: oklch(60% 0.15 250);  /* modern browsers */
```

Alternatively, use `@supports`:
```css
:root { --color-primary: #4a7cf5; }
@supports (color: oklch(0% 0 0)) {
  :root { --color-primary: oklch(60% 0.15 250); }
}
```

## Tinted Neutrals

Never use pure gray. Add a hint of brand hue (chroma ~0.01):

```css
--gray-100: oklch(95% 0.01 250);  /* cool hint */
--gray-900: oklch(15% 0.01 250);
```

Never use pure black (#000) or pure white (#fff) — tint everything.

## Palette Structure

| Role | Purpose |
|------|---------|
| Primary | Brand, CTAs, key actions — 1 color, 3–5 shades |
| Neutral | Text, backgrounds, borders — 9–11 shade scale |
| Semantic | Success, error, warning, info — 4 colors, 2–3 shades each |
| Surface | Cards, modals, overlays — 2–3 elevation levels |

Skip secondary/tertiary unless needed. The 60-30-10 rule: 60% neutral, 30% secondary, 10% accent. Accent works because it's rare — overuse kills impact.

## Contrast & Accessibility

| Content | AA Min | AAA |
|---------|--------|-----|
| Body text | 4.5:1 | 7:1 |
| Large text (18px+) | 3:1 | 4.5:1 |
| UI components | 3:1 | 4.5:1 |

**Dangerous combos**: gray on colored backgrounds (use a shade of the bg instead), red on green, blue on red, yellow on white, thin light text on images.

## Dark Mode

Dark mode is NOT inverted light mode:

| Light | Dark |
|-------|------|
| Shadows for depth | Lighter surfaces for depth |
| Dark text on light | Light text (reduce font weight) |
| Vibrant accents | Desaturate slightly |
| White backgrounds | Dark gray (oklch 12–18%), never #000 |

Use two token layers: primitives (`--blue-500`) and semantic (`--color-primary: var(--blue-500)`). Only redefine semantic layer for dark mode.

## Avoid

- Color alone to convey information
- Heavy alpha/transparency (design smell — define explicit colors)
- Pure gray or pure black for large areas
- Skipping color blindness testing (8% of men affected)
