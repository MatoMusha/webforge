# Webforge

AI-powered design agents that interview you about look and feel, generate complete design systems, and build production-grade frontend code — from a single prompt.

Works with **Claude Code**, **Cursor**, **Windsurf**, **Codex**, and any AI coding tool.

## What It Does

Instead of manually piecing together color palettes, type scales, spacing systems, and components, webforge coordinates specialized agents that handle the full pipeline:

1. **Director** scans your project — detects existing styles, tokens, and conventions
2. **Strategist** interviews you about aesthetic preferences — mood, colors, typography, theme — then generates a complete OKLCH token system
3. **Builder** creates static, production-grade pages using your tokens — HTML, CSS, and vanilla JS that work by opening in a browser

```
You: "build me a landing page for a coffee brand"

Director: Scanning project... No design system found.
Strategist: What mood are you going for?
You: warm, organic, earthy
Strategist: Generated palette: terracotta + warm cream + sage. Approve?
You: yes
Builder: Creating hero, menu section, location card... Done. 4 static files created.
```

## Human-in-the-Loop

Webforge never makes design decisions for you. Every agent has mandatory approval checkpoints:

- **Strategist** asks questions in small groups and waits for your answers — it won't assume your preferences
- **Strategist** presents the generated token system and waits for your explicit approval before creating files
- **Director** presents the design brief and waits for your "go ahead" before the Builder starts

No code is written until you've approved the direction. If you want changes, just say so — the agents will adjust and re-present.

## Static Output

All generated code is **static by default** — HTML, CSS, and vanilla JavaScript. No frameworks, no build steps, no npm dependencies. Every page works by opening the HTML file directly in a browser.

If your project already uses a framework (React, Vue, etc.), the agents will adapt to it. But the default is always zero-dependency static output.

## Installation

### Claude Code

**Option 1: Clone and use directly**

```bash
git clone https://github.com/MatoMusha/webforge.git
cd webforge
node scripts/build.js
```

The build outputs skills to `.claude/skills/` which Claude Code auto-discovers when you work in the project directory. Just start Claude Code in the webforge directory and prompt naturally.

**Option 2: Copy skills into your project**

```bash
# Clone webforge
git clone https://github.com/MatoMusha/webforge.git

# Build
cd webforge && node scripts/build.js

# Copy the built skills into your project
cp -r .claude/skills/ /path/to/your-project/.claude/skills/
```

Now start Claude Code in your project directory. The agents will auto-trigger when you ask to build something.

**Option 3: Use pre-built distribution files**

```bash
git clone https://github.com/MatoMusha/webforge.git
cd webforge && node scripts/build.js

# Copy the distribution output
cp -r dist/claude-code/skills/ /path/to/your-project/.claude/skills/
```

### Cursor

```bash
git clone https://github.com/MatoMusha/webforge.git
cd webforge && node scripts/build.js

# Copy the rules into your project
cp -r dist/cursor/.cursor/ /path/to/your-project/.cursor/
```

Webforge outputs individual `.mdc` rule files to `.cursor/rules/`. Cursor auto-loads the pipeline rules (which enforce the approval gates) and pulls in agent-specific rules as needed. This split format ensures the model gives proper attention to each instruction.

### Windsurf

```bash
git clone https://github.com/MatoMusha/webforge.git
cd webforge && node scripts/build.js

# Copy the rules file into your project root
cp dist/windsurf/.windsurfrules /path/to/your-project/.windsurfrules
```

### Codex (OpenAI)

```bash
git clone https://github.com/MatoMusha/webforge.git
cd webforge && node scripts/build.js

# Copy the agents file into your project root
cp dist/codex/AGENTS.md /path/to/your-project/AGENTS.md
```

### Any Other AI Tool

```bash
git clone https://github.com/MatoMusha/webforge.git
cd webforge && node scripts/build.js

# Use the generic instructions file
cat dist/generic/webforge-instructions.md
```

Copy the contents of `webforge-instructions.md` into your AI tool's system prompt, project instructions, or custom rules file.

## Usage

Once installed, just prompt naturally. No slash commands needed.

### Build from scratch (no existing design system)

```
"Build me a landing page for a SaaS product"
```

The Director detects no design system exists and triggers the Strategist, which will ask you:

1. **Purpose & audience** — What is this for? Who uses it?
2. **Mood** — Pick 3 words (bold, playful, refined, minimal, warm, etc.)
3. **Colors** — Brand colors or generate a palette? Warm, cool, monochrome?
4. **Typography** — Serif, sans-serif, mono, or mixed?
5. **Theme** — Light, dark, or both?

After you answer, the Strategist generates a complete token system (OKLCH color palette, type scale, spacing, motion, border radius) and asks you to approve. Then the Builder creates your components.

### Build with existing design system

```
"Add a pricing section to the marketing page"
```

The Director detects your existing tokens (CSS custom properties, stylesheets) and skips the Strategist interview. It creates a design brief based on your existing system, presents it for your approval, then passes it to the Builder.

### What the agents generate

| Output | Details |
|--------|---------|
| **Color palette** | OKLCH tokens, tinted neutrals, semantic colors, dark mode |
| **Typography** | Distinctive fonts, fluid type scale with `clamp()`, proper line-heights |
| **Spacing** | 4pt grid system with semantic token names |
| **Motion** | Duration tiers, exponential easing curves, reduced motion support |
| **Components** | Semantic HTML, all 8 interaction states, keyboard navigation, WCAG AA |
| **Output** | Static HTML + CSS + vanilla JS — no frameworks, no build steps |

## Agents

### Director

The orchestrator. Scans your project to detect:
- Existing HTML/CSS files and page structure
- Design system status (tokens, palette, fonts)
- Styling approach (CSS custom properties, linked stylesheets)

Then routes the pipeline: Strategist (if no design system) → presents design brief for your approval → Builder.

### Strategist

The design system architect. Interviews you about look and feel, then generates:
- Complete OKLCH color palette (primary, neutrals, semantic, surfaces)
- Typography system (distinctive fonts, fluid scale, line-heights)
- Spacing scale (4pt base with semantic names)
- Motion tokens (durations, easing curves)
- Border radius (mapped to mood)

Outputs as CSS custom properties. Waits for your approval before generating any files.

### Builder

The code creator. Takes the approved design brief and tokens, then builds:
- Static HTML, CSS, and vanilla JS — no build steps, works in any browser
- Semantic HTML with all interactive states (hover, focus-visible, active, disabled)
- Responsive layouts (mobile-first)
- Accessibility (WCAG AA contrast, keyboard navigation, screen reader support)
- Motion with `prefers-reduced-motion` support
- Will not start until the design brief has been approved by you

### Design System (Knowledge Library)

Shared reference material that all agents consult. Covers 7 domains:

| Domain | What it covers |
|--------|---------------|
| Typography | Type scales, font selection, loading, hierarchy, OpenType features |
| Color | OKLCH, palette building, contrast, dark mode, tinted neutrals |
| Spatial | Spacing systems, grids, visual hierarchy, container queries, depth |
| Motion | Duration rules, easing curves, reduced motion, perceived performance |
| Interaction | 8 interactive states, focus rings, forms, modals, keyboard navigation |
| Responsive | Mobile-first, breakpoints, input detection, safe areas, images |
| Writing | Button labels, error messages, empty states, voice, translation |

## Anti-Patterns (What It Avoids)

Webforge is trained to avoid common AI-generated design patterns:

- Cyan-on-dark, purple-to-blue gradients, neon accents
- Gradient text on headings
- Cards nested in cards, identical card grids everywhere
- Glassmorphism without purpose
- Big rounded-corner icons above every heading
- Everything centered, same spacing everywhere
- Bounce/elastic easing
- Pure black (#000) or pure white (#fff)
- Inter, Roboto, Open Sans as defaults
- Hero metric layouts (big number + gradient accent)
- Generic lorem ipsum content

## Project Structure

```
webforge/
├── source/skills/               # Source files (edit these)
│   ├── director/SKILL.md        # Orchestrator agent
│   ├── strategist/SKILL.md      # Design system architect
│   ├── builder/                 # Code creator
│   │   ├── SKILL.md
│   │   └── reference/
│   │       ├── component-patterns.md
│   │       └── code-quality.md
│   └── design-system/           # Shared knowledge library
│       ├── SKILL.md
│       └── reference/
│           ├── typography.md
│           ├── color.md
│           ├── spatial.md
│           ├── motion.md
│           ├── interaction.md
│           ├── responsive.md
│           └── writing.md
├── .claude-plugin/              # Claude Code plugin manifest
├── .claude/skills/              # Built output (Claude Code)
├── dist/                        # Built output (all providers)
├── scripts/
│   ├── build.js                 # Multi-provider build system
│   ├── providers.js             # Provider configurations
│   └── lib/utils.js             # Frontmatter parser, file discovery
├── site/                        # Landing page
├── CLAUDE.md                    # Project context for Claude Code
├── package.json
├── LICENSE                      # Apache 2.0
└── README.md                    # This file
```

## Building from Source

Requires Node.js 18+.

```bash
git clone https://github.com/MatoMusha/webforge.git
cd webforge
node scripts/build.js
```

Output:
```
webforge build
==============

Source: 4 skills, 9 reference files

Building providers:
  Claude Code    → dist/claude-code/skills/ (13 files)
  Cursor         → dist/cursor/.cursor/rules/ (5 files)
  Windsurf       → dist/windsurf/.windsurfrules
  Codex          → dist/codex/AGENTS.md
  Generic        → dist/generic/webforge-instructions.md

  + .claude/skills/ (local Claude Code use)
```

To rebuild after editing source files:

```bash
npm run rebuild
```

## Adding a New Provider

Edit `scripts/providers.js`:

```js
export const providers = {
  // ... existing providers ...

  'my-tool': {
    name: 'My Tool',
    model: 'the AI model',
    outputDir: 'my-tool',
    structure: 'single-file',      // or 'skills-dir'
    outputFile: '.my-tool-rules',
    keepFrontmatter: false,
  },
};
```

Run `node scripts/build.js` and find your output in `dist/my-tool/`.

## Contributing

Webforge is open source under the Apache 2.0 license.

To add or modify agents:

1. Edit the SKILL.md in `source/skills/<agent-name>/`
2. Add reference files in `reference/` if the agent needs domain knowledge
3. Update the Director's routing logic if adding a new agent
4. Run `node scripts/build.js` and test
5. Submit a PR

## Roadmap

Agents planned but not yet built:

- **Critic** — Visual quality review, design consistency audit
- **Hardener** — Accessibility deep-dive, i18n, error handling, edge cases
- **Optimizer** — Performance, bundle size, loading strategy
- **Polisher** — Final refinement pass (spacing, alignment, animation timing)
- **Writer** — Content and microcopy (labels, error messages, empty states)

## License

Apache 2.0 — see [LICENSE](LICENSE) for details.
