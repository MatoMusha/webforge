# webd-designer — Agentic Website Creation Plugin

## About

A Claude Code plugin for agentic website creation. No slash commands — just prompt naturally. Agents auto-trigger based on context, interview you about design preferences, generate design systems, and build production-grade code.

## How It Works

Just prompt:
- "Build me a landing page for a coffee brand"
- "Create a pricing section"
- "I need a portfolio site"

Claude auto-loads the right agents and runs the pipeline.

## Agent Pipeline

```
User: "build me a landing page"
  │
  ▼
Director (auto-triggered)
  │  Scans project → framework, tokens, design system status
  │
  ├── Design system MISSING
  │     ▼
  │   Strategist
  │     Asks: purpose, audience, mood (3 words),
  │           color preferences, typography feel, light/dark
  │     Generates: full token system (OKLCH palette, type scale,
  │                spacing, motion, radius)
  │     User approves tokens
  │     ▼
  └── Director presents design brief
        User approves brief
        ▼
      Builder
        Creates production code using tokens
        Adapts to project stack
        ▼
      Files created
```

## Project Structure

```
webd-designer/
├── .claude-plugin/
│   ├── plugin.json              # Plugin registration
│   └── marketplace.json         # Distribution metadata
│
├── source/skills/               # Source files — edit these
│   ├── director/                # Agent: Orchestrator
│   │   └── SKILL.md             #   Scans project, routes pipeline
│   ├── strategist/              # Agent: Design System Architect
│   │   └── SKILL.md             #   Interviews user, generates tokens
│   ├── builder/                 # Agent: Code Creator
│   │   ├── SKILL.md             #   Builds production code
│   │   └── reference/
│   │       ├── component-patterns.md
│   │       └── code-quality.md
│   └── design-system/           # Shared Knowledge Library
│       ├── SKILL.md             #   Principles + anti-patterns
│       └── reference/
│           ├── typography.md
│           ├── color.md
│           ├── spatial.md
│           ├── motion.md
│           ├── interaction.md
│           ├── responsive.md
│           └── writing.md
│
├── .claude/skills/              # Built output (auto-generated, committed)
│
├── scripts/
│   ├── build.js                 # Copies source/ → .claude/ + dist/
│   └── lib/utils.js             # Frontmatter parser, file discovery
│
├── site/                        # Landing page
│   ├── index.html
│   └── styles.css
│
├── dist/claude-code/            # Distribution output (gitignored)
│
├── CLAUDE.md                    # This file
├── package.json
├── LICENSE
└── .gitignore
```

## Skills

| Skill | Type | Auto-triggers when... |
|-------|------|----------------------|
| `director` | Agent | User wants to build/design/create web interfaces |
| `strategist` | Agent | No design system exists, needs to create one |
| `builder` | Agent | Creating frontend components, pages, or layouts |
| `design-system` | Knowledge | Any design/build task (shared reference library) |

## Development

```bash
node scripts/build.js     # Build source → .claude/skills/
npm run rebuild            # Clean + build
```

- Edit `source/skills/`, never `.claude/` directly
- Run build after every change
- Keep SKILL.md files focused and under 200 lines
- Agent skills auto-trigger — no slash commands needed

### Adding a New Agent
1. Create `source/skills/<name>/SKILL.md`
2. Write a clear `description` in frontmatter (Claude uses this to auto-trigger)
3. Add `reference/` files if the agent needs domain knowledge
4. Update the Director's routing logic to include the new agent
5. Run build

## Future Agents (not yet built)
- **critic** — Visual quality review, design audit
- **hardener** — Accessibility, i18n, error handling, edge cases
- **optimizer** — Performance, bundle size, loading strategy
- **polisher** — Final refinement, spacing, alignment, animation timing
- **writer** — Content, microcopy, labels, error messages, empty states
