<p align="center">
  <strong>webflo</strong><br>
  <em>Design agents that interview you, generate design systems, and build production-grade code.</em>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/Cursor-supported-black?logo=cursor" alt="Cursor">
  <img src="https://img.shields.io/badge/Claude_Code-supported-cc785c" alt="Claude Code">
  <img src="https://img.shields.io/badge/Gemini_CLI-supported-4285F4?logo=google" alt="Gemini CLI">
  <img src="https://img.shields.io/badge/Codex_CLI-supported-000?logo=openai" alt="Codex CLI">
  <img src="https://img.shields.io/badge/Copilot-supported-000?logo=github" alt="Copilot">
  <img src="https://img.shields.io/badge/Antigravity-supported-4285F4?logo=google" alt="Antigravity">
  <img src="https://img.shields.io/badge/license-Apache_2.0-blue" alt="License">
</p>

---

## How it works

You prompt naturally. Webflo's agents handle the rest — interviewing you about aesthetics, generating a token system, building the code, and reviewing it before you see anything.

```
You:        "build me a landing page for a coffee brand"

Director:    Scanning project... no design system found.
Strategist:  What mood are you going for?
You:         warm, organic, earthy
Strategist:  Generated palette — terracotta + warm cream + sage. Approve?
You:         yes
Builder:     Creating pages with your tokens...
Reviewer:    All files pass. Clean code, no security issues.
             Dev server running at localhost:5173
```

---

## The pipeline

```
                    ┌─────────────────────────────┐
                    │         You prompt           │
                    └──────────────┬──────────────┘
                                   │
                    ┌──────────────▼──────────────┐
                    │      Director  (scan)        │
                    │  detects project context,    │
                    │  design system status        │
                    └──────────────┬──────────────┘
                                   │
                 ┌─── has design system? ───┐
                 │ no                       │ yes
     ┌───────────▼──────────┐              │
     │   Strategist          │              │
     │   interviews you,     │              │
     │   generates tokens    │              │
     │   ⛔ waits for        │              │
     │     your approval     │              │
     └───────────┬──────────┘              │
                 │                          │
                 └──────────┬───────────────┘
                            │
             ┌──────────────▼──────────────┐
             │  Design brief presented      │
             │  ⛔ waits for your approval  │
             └──────────────┬──────────────┘
                            │
             ┌──────────────▼──────────────┐
             │       Builder  (code)        │
             │  Vite + vanilla HTML/CSS/JS  │
             └──────────────┬──────────────┘
                            │
             ┌──────────────▼──────────────┐
             │      Reviewer  (quality)     │
             │  simplicity, security, a11y  │
             └──────────────┬──────────────┘
                            │
                    ┌───────▼───────┐
                    │  Dev server   │
                    │   launched    │
                    └───────────────┘
```

Every ⛔ is a hard stop — no code is written until you approve the direction.

---

## What it generates

| Category | Details |
|:---------|:--------|
| **Color** | OKLCH palette, tinted neutrals, semantic colors, dark mode |
| **Typography** | Distinctive fonts, fluid `clamp()` scale, proper line-heights |
| **Spacing** | 4pt grid with semantic token names |
| **Motion** | Duration tiers, exponential easing, `prefers-reduced-motion` |
| **Layout** | Clean/safe or bold/experimental — grids, scroll effects, clip-path |
| **Components** | Semantic HTML, 8 interaction states, keyboard nav, WCAG AA |
| **Output** | Vite dev server — vanilla HTML + CSS + JS with hot reload |

---

## Installation

<details>
<summary><strong>Cursor</strong></summary>

```bash
git clone https://github.com/MatoMusha/webflo.git
cd webflo && node scripts/build.js

cp -r dist/cursor/.cursor/ /path/to/your-project/.cursor/
```

Outputs `.mdc` rule files to `.cursor/rules/` — includes a phase-locked enforcer that prevents the model from skipping approval gates.

</details>

<details>
<summary><strong>Claude Code</strong></summary>

**Plugin install (recommended):**

```bash
claude /plugin install MatoMusha/webflo
```

**Or copy skills manually:**

```bash
git clone https://github.com/MatoMusha/webflo.git
cd webflo && node scripts/build.js

cp -r .claude/skills/ /path/to/your-project/.claude/skills/
```

</details>

<details>
<summary><strong>Gemini CLI</strong></summary>

```bash
git clone https://github.com/MatoMusha/webflo.git
cd webflo && node scripts/build.js

cp dist/gemini-cli/GEMINI.md /path/to/your-project/GEMINI.md
```

</details>

<details>
<summary><strong>Codex CLI</strong></summary>

```bash
git clone https://github.com/MatoMusha/webflo.git
cd webflo && node scripts/build.js

cp dist/codex/AGENTS.md /path/to/your-project/AGENTS.md
```

</details>

<details>
<summary><strong>Copilot</strong></summary>

```bash
git clone https://github.com/MatoMusha/webflo.git
cd webflo && node scripts/build.js

mkdir -p /path/to/your-project/.github
cp dist/copilot/.github/copilot-instructions.md /path/to/your-project/.github/copilot-instructions.md
```

</details>

<details>
<summary><strong>Antigravity</strong></summary>

```bash
git clone https://github.com/MatoMusha/webflo.git
cd webflo && node scripts/build.js

cp -r dist/antigravity/skills/ /path/to/your-project/.agent/skills/
```

</details>

<details>
<summary><strong>Any other AI tool</strong></summary>

```bash
git clone https://github.com/MatoMusha/webflo.git
cd webflo && node scripts/build.js

cat dist/generic/webflo-instructions.md
```

Copy the contents into your AI tool's system prompt, project instructions, or custom rules file.

</details>

---

## Usage

Just prompt. No slash commands.

> "Build me a landing page for a SaaS product"

The Strategist asks you about purpose, mood, colors, typography, layout style, and theme — then generates a complete token system for your approval.

> "Build me a portfolio site with home, work, about, and contact pages"

The Director detects multi-page structure — shared nav via JS module, `aria-current="page"` states, per-page meta, Vite multi-page config.

> "Add a pricing section to the marketing page"

Existing tokens detected — skips the interview, builds on your design system.

---

## Human-in-the-loop enforcement

Every tool gets the strongest blocking mechanism available to it:

| Tool | How it blocks |
|:-----|:--------------|
| **Claude Code** | `AskUserQuestion` — hard tool-call block |
| **Gemini CLI** | `ask_user` — hard tool-call block |
| **Cursor** | Phase declarations `[PHASE X]` + `ask_followup_question` |
| **Codex CLI** | Phase declarations + structured `approval-required` blocks |
| **Copilot / Antigravity** | Stops generating, waits for your next message |

**What requires your approval:**

- Design system interview answers (asked in small groups)
- Token/palette sign-off
- Design brief before any code is written
- Security issues flagged by the reviewer

---

## Agents

<table>
<tr>
<td width="140"><strong>Director</strong></td>
<td>The orchestrator. Scans your project — framework, tokens, fonts, existing styles. Routes to Strategist if no design system exists. Presents the design brief for your approval before anything gets built.</td>
</tr>
<tr>
<td><strong>Strategist</strong></td>
<td>The design system architect. Interviews you about look and feel, then generates OKLCH palette, type scale, spacing, motion tokens, and border radius. Waits for your approval before writing any files.</td>
</tr>
<tr>
<td><strong>Builder</strong></td>
<td>The code creator. Takes approved brief + tokens, builds a Vite project with vanilla HTML/CSS/JS. Handles single or multi-page, clean or bold layouts, all interactive states, responsive, accessible.</td>
</tr>
<tr>
<td><strong>Reviewer</strong></td>
<td>The quality gate. Checks every file for simplicity (no dead code, minimal JS), cleanliness (semantic HTML, tokens used), and security (no innerHTML, no eval, CSP ready). Fixes issues directly.</td>
</tr>
<tr>
<td><strong>Design System</strong></td>
<td>Shared knowledge library. 7 reference files covering typography, color, spatial, motion, interaction, responsive, and writing. All agents consult this for implementation decisions.</td>
</tr>
</table>

---

## Anti-patterns it avoids

Webflo is trained to reject common AI-generated design fingerprints:

> Cyan-on-dark · purple-to-blue gradients · gradient text on headings · cards in cards · glassmorphism without purpose · big icons above every heading · everything centered · bounce easing · pure black/white · Inter/Roboto/Open Sans as defaults · hero metric layouts · lorem ipsum

---

## Project structure

```
webflo/
├── source/skills/            ← edit these
│   ├── director/
│   ├── strategist/
│   ├── builder/              (+ reference/)
│   ├── reviewer/
│   ├── enforcer/
│   └── design-system/        (+ reference/ × 7)
├── scripts/
│   ├── build.js              multi-provider build
│   ├── providers.js          provider configs
│   └── lib/utils.js
├── dist/                     ← built output per provider
├── .claude-plugin/           plugin manifest
├── .claude/skills/           built: Claude Code
├── skills/                   built: plugin distribution
└── package.json
```

---

## Building from source

```bash
git clone https://github.com/MatoMusha/webflo.git
cd webflo
node scripts/build.js
```

```
Source: 6 skills, 9 reference files

Building providers:
  Claude Code    → dist/claude-code/skills/ (15 files)
  Cursor         → dist/cursor/.cursor/rules/ (7 files)
  Gemini CLI     → dist/gemini-cli/GEMINI.md
  Codex          → dist/codex/AGENTS.md
  Copilot        → dist/copilot/.github/copilot-instructions.md
  Antigravity    → dist/antigravity/skills/ (15 files)
  Generic        → dist/generic/webflo-instructions.md
```

Rebuild after edits: `npm run rebuild`

---

## Adding a provider

Edit `scripts/providers.js`:

```js
'my-tool': {
  name: 'My Tool',
  model: 'the AI model',
  outputDir: 'my-tool',
  structure: 'single-file',       // or 'skills-dir', 'mdc-rules'
  outputFile: '.my-tool-rules',
  keepFrontmatter: false,
  hitlMechanism: HITL_STOP_GENERATING,
},
```

Run `node scripts/build.js` → output in `dist/my-tool/`.

---

## Roadmap

| Agent | Purpose |
|:------|:--------|
| **Critic** | Visual quality review, design consistency audit |
| **Hardener** | Accessibility deep-dive, i18n, error handling |
| **Optimizer** | Performance, bundle size, loading strategy |
| **Polisher** | Spacing, alignment, animation timing |
| **Writer** | Content and microcopy |

---

## Contributing

1. Edit `source/skills/<agent>/SKILL.md`
2. Add references in `reference/` if needed
3. Update Director routing for new agents
4. `node scripts/build.js` and test
5. Submit a PR

---

<sub>Apache 2.0 — see <a href="LICENSE">LICENSE</a></sub>
