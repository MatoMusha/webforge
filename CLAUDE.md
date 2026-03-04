# webforge — Agentic Website Creation

## About

AI-powered design agents that interview you about look and feel, generate design systems, and build production-grade code. Works with any AI coding tool — Claude Code, Cursor, Windsurf, Codex, and more.

## How It Works

Just prompt naturally:
- "Build me a landing page for a coffee brand"
- "Create a pricing section"
- "I need a portfolio site"

The agents auto-trigger, interview you about design preferences, and build.

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
  │     Asks: purpose, audience, mood, colors, typography, theme
  │     Generates: OKLCH palette, type scale, spacing, motion tokens
  │     User approves
  │     ▼
  └── Director presents design brief → User approves
        ▼
      Builder
        Creates production code using tokens, adapts to stack
        ▼
      Files created
```

## Project Structure

```
webforge/
├── .claude-plugin/              # Plugin manifest (Claude Code)
├── source/skills/               # Source — edit these
│   ├── director/SKILL.md        # Orchestrator agent
│   ├── strategist/SKILL.md      # Design system architect
│   ├── builder/                 # Code creator + references
│   └── design-system/           # Shared knowledge (7 refs)
├── .claude/skills/              # Built: Claude Code output
├── dist/                        # Built: all providers
│   ├── claude-code/skills/      #   Claude Code (skill dirs)
│   ├── cursor/.cursorrules      #   Cursor (single file)
│   ├── windsurf/.windsurfrules  #   Windsurf (single file)
│   ├── gemini-cli/GEMINI.md     #   Gemini CLI (single file)
│   ├── codex/AGENTS.md          #   Codex (single file)
│   └── generic/webforge-instructions.md
├── scripts/
│   ├── build.js                 # Multi-provider build
│   ├── providers.js             # Provider configurations
│   └── lib/utils.js             # Utilities
├── CLAUDE.md
├── package.json
└── LICENSE
```

## Multi-Model Support

The build system outputs to 6 providers from a single source:

| Provider | Format | Output |
|----------|--------|--------|
| Claude Code | Skill directories | `dist/claude-code/skills/` |
| Cursor | .mdc rule files | `dist/cursor/.cursor/rules/` |
| Windsurf | Single rules file | `dist/windsurf/.windsurfrules` |
| Gemini CLI | GEMINI.md | `dist/gemini-cli/GEMINI.md` |
| Codex | Agent instructions | `dist/codex/AGENTS.md` |
| Generic | Markdown | `dist/generic/webforge-instructions.md` |

Use `{{model}}` in source files — replaced with provider-specific model name during build.

## Development

```bash
node scripts/build.js     # Build all providers
npm run rebuild            # Clean + build
```

- Edit `source/skills/`, never `.claude/` or `dist/` directly
- Run build after every change
- Add providers in `scripts/providers.js`

## Skills

| Skill | Auto-triggers when... |
|-------|----------------------|
| **director** | User wants to build/design/create web interfaces |
| **strategist** | No design system exists, needs to create one |
| **builder** | Creating frontend components, pages, or layouts |
| **design-system** | Any design/build task (shared reference library) |

## Future Agents
- **critic** — Visual quality review, design audit
- **hardener** — Accessibility, i18n, error handling
- **optimizer** — Performance, bundle size, loading
- **polisher** — Spacing, alignment, animation timing
- **writer** — Microcopy, labels, error messages
