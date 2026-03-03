# web-designer — Agentic Website Creation Plugin

## About

A Claude Code plugin for agentic website creation workflows. Inspired by impeccable's design knowledge but built as a proper workflow system — agents that chain, remember context, verify results, and orchestrate multi-step design + build processes.

**What this is:** A publishable Claude Code plugin that gives any developer an opinionated, high-quality website creation pipeline powered by coordinated agents.

**What this isn't:** A prompt library. Every agent has identity, memory, and orchestration rules. They work together, not in isolation.

## Core Philosophy

1. **Agents over commands** — Instead of 17 isolated `/commands`, coordinated agents that know when to hand off to each other
2. **Memory across steps** — Design decisions made in step 1 persist through step 10
3. **Visual verification** — Screenshot → review → iterate loops, not blind trust
4. **Project awareness** — Agents know your stack, tokens, components, and conventions
5. **Opinionated defaults** — Ship fast with strong defaults, customize when needed

## Problem Statement

Impeccable has excellent design knowledge (anti-patterns, typography rules, color theory) but ships it as isolated commands with no chaining, no memory, and no verification. The result:

- User manually orchestrates: audit → normalize → polish → optimize (4 separate invocations)
- Each command re-analyzes from scratch (no shared state)
- No visual validation (trust that the LLM followed instructions)
- No project context (doesn't know your stack or design system)
- Context window bloat (full skill loaded even for small tasks)

**web-designer** solves this by wrapping design knowledge into an agentic system where agents chain automatically, share context, and verify their own output.

## Architecture

### Agent Structure (per agent)
```
agents/[name]/
├── SOUL.md       — Who the agent is (role, personality, philosophy)
├── IDENTITY.md   — What it knows (expertise, checklists, tools, output format)
└── HEARTBEAT.md  — How it operates (triggers, workflow, rules, handoffs)
```

### Agent Pipeline
```
User request ("build me a landing page")
    │
    ▼
  Director ──→ understands intent, plans the pipeline
    │
    ▼
  Strategist ──→ design direction, tokens, layout decisions
    │
    ▼
  Builder ──→ creates components and pages
    │
    ▼
  Critic ──→ visual review, design quality audit
    │
    ▼
  Hardener ──→ accessibility, edge cases, error states
    │
    ▼
  Optimizer ──→ performance, bundle size, loading
    │
    ▼
  Polisher ──→ final pass, pixel-level refinement
    │
    ▼
  Shipped.
```

### Proposed Agents

| Agent | Role | Inherits from Impeccable |
|-------|------|--------------------------|
| **director** | Orchestrator — understands intent, plans pipeline, dispatches agents | `/teach-impeccable` (project context gathering) |
| **strategist** | Design direction — typography, color, spacing, tokens, anti-patterns | `frontend-design` skill + all 7 reference docs |
| **builder** | Component & page creation — writes actual code | New (impeccable has no builder) |
| **critic** | Design quality review — visual hierarchy, UX, consistency | `/audit` + `/critique` |
| **hardener** | Production readiness — a11y, i18n, error handling, edge cases | `/harden` |
| **optimizer** | Performance — loading, rendering, bundle, animations | `/optimize` |
| **polisher** | Final refinement — spacing, alignment, animation timing, detail | `/polish` + `/delight` + `/animate` |
| **writer** | Content & copy — microcopy, labels, error messages, empty states | `/clarify` + `/onboard` |

### Key Differentiators from Impeccable

| Feature | Impeccable | web-designer |
|---------|------------|-------------------|
| Execution model | Isolated commands | Chained agent pipeline |
| Memory | None between commands | Shared context via project memory |
| Verification | None (trust LLM) | Screenshot → review → iterate |
| Project awareness | Manual (`/teach-impeccable`) | Director gathers context automatically |
| Customization | One-size-fits-all | Agents adapt to detected stack |
| Output | Code changes | Code changes + design rationale |
| Scope control | Full analysis every time | Diff-aware, targeted analysis |

## Project Structure

```
web-designer/
├── CLAUDE.md                 # This file — project context
├── agents/                   # Agent definitions (SOUL/IDENTITY/HEARTBEAT)
│   ├── director/
│   ├── strategist/
│   ├── builder/
│   ├── critic/
│   ├── hardener/
│   ├── optimizer/
│   ├── polisher/
│   └── writer/
├── source/
│   ├── skills/               # Design knowledge (from impeccable, extended)
│   │   └── design-system/    # Typography, color, spatial, motion, etc.
│   └── commands/             # User-facing slash commands (thin wrappers)
├── scripts/
│   └── build.js              # Build system for multi-provider output
├── docs/
│   └── architecture.md       # Detailed architecture documentation
├── .gitignore
├── LICENSE                   # Apache 2.0 (same as impeccable)
└── package.json
```

## Design Knowledge Sources

Carry forward impeccable's best content, restructured for agent consumption:

| Domain | Source | Agent Consumer |
|--------|--------|----------------|
| Typography | impeccable `typography.md` | strategist |
| Color & Contrast | impeccable `color-and-contrast.md` | strategist |
| Spatial Design | impeccable `spatial-design.md` | strategist, builder |
| Motion Design | impeccable `motion-design.md` | polisher |
| Interaction Design | impeccable `interaction-design.md` | builder, hardener |
| Responsive Design | impeccable `responsive-design.md` | builder, critic |
| UX Writing | impeccable `ux-writing.md` | writer |
| Anti-Patterns | impeccable `SKILL.md` | All agents (shared) |

## Publishing Target

- **GitHub**: Public repo, Apache 2.0 license
- **Claude Code Plugin**: Installable via plugin marketplace
- **Agent Skills Standard**: Compatible with agentskills.io spec
- **Multi-provider**: Claude Code primary, Cursor/Gemini/Codex secondary

## Development Rules

- Read this CLAUDE.md before starting any work session
- One agent at a time — finish and validate before moving to the next
- Design knowledge files are reference material, not code — keep them clear and scannable
- Test agent handoffs explicitly (does director correctly dispatch to strategist?)
- Keep agents focused — if an agent's IDENTITY.md exceeds 200 lines, it's doing too much
- Commands are thin wrappers that invoke agents, not standalone logic

## Next Steps

1. Build the 8 agents (SOUL/IDENTITY/HEARTBEAT for each)
2. Port impeccable's design knowledge into source/skills/
3. Create user-facing commands that invoke the agent pipeline
4. Build the multi-provider build system
5. Test end-to-end: "build me a landing page" → shipped result
6. Publish to GitHub
