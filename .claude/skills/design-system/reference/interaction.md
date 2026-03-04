# Interaction Design

## Eight Interactive States

Every interactive element needs all eight:

| State | Visual Treatment |
|-------|------------------|
| Default | Base styling |
| Hover | Subtle lift, color shift (pointer only) |
| Focus | Visible ring (keyboard — see below) |
| Active | Pressed in, darker |
| Disabled | Reduced opacity, no pointer |
| Loading | Spinner or skeleton |
| Error | Red border, icon, message |
| Success | Green check, confirmation |

Design hover AND focus separately — keyboard users never see hover.

## Focus Rings

Never `outline: none` without replacement. Use `:focus-visible`:

```css
button:focus { outline: none; }
button:focus-visible {
  outline: 2px solid var(--color-accent);
  outline-offset: 2px;
}
```

Requirements: 3:1 contrast, 2–3px thick, offset from element, consistent everywhere.

## Forms

- Placeholders aren't labels — always use visible `<label>`
- Validate on blur, not keystroke (exception: password strength)
- Errors below fields with `aria-describedby`
- Inline validation shows immediately after field loses focus

## Loading States

- Optimistic updates for low-stakes actions (likes, follows)
- Skeleton screens > spinners (preview content shape)
- Progressive loading — show what's ready

## Modals

Use native `<dialog>` with `showModal()` for focus trapping and Escape dismissal. Use `inert` on background content. Consider whether a modal is truly necessary — often it's not.

## Popovers

Native `popover` attribute for tooltips, dropdowns, menus:
```html
<button popovertarget="menu">Open</button>
<div id="menu" popover>...</div>
```
Light-dismiss, proper stacking, accessible by default.

## Keyboard Navigation

- Roving tabindex for component groups (tabs, menus, radios)
- Arrow keys move within, Tab moves to next component
- Skip links for keyboard users (`<a href="#main-content">Skip to content</a>`)

## Destructive Actions

Undo > confirmation dialogs. Users click through confirmations mindlessly. Show undo toast, delete after expiry. Reserve confirmation for truly irreversible or high-cost actions.

## Gestures

Swipe and similar gestures are invisible. Always provide visible fallbacks. Hint at gesture existence with partial reveals or onboarding.
