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

## Common Component Structures

### Page Layout
```
<Layout>
  <Header />         — nav, logo, actions
  <main>
    <Hero />          — primary message + CTA
    <Section />       — content blocks with varied layouts
    <Section />
    <CTA />           — conversion section
  </main>
  <Footer />          — links, legal, secondary nav
</Layout>
```

### Section Patterns
- **Split**: text + media side by side, alternating direction
- **Feature grid**: auto-fit grid, vary card sizes for hierarchy
- **Testimonial**: single quote with attribution, or carousel
- **Stats**: key numbers with context (not the hero metric template)
- **FAQ**: `<details>/<summary>` accordion

### Navigation
- Mobile: hamburger → slide drawer or full-screen overlay
- Desktop: horizontal with clear active states
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
