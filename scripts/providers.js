/**
 * Provider configurations for multi-model output.
 * Each provider defines how skills get transformed and where they go.
 */

/**
 * HITL enforcement text — provider-specific mechanisms.
 * Each provider gets the strongest blocking mechanism available to it.
 */

const HITL_CLAUDE_CODE = `At every ⛔ checkpoint, you MUST call the \`AskUserQuestion\` tool. This creates a blocking tool call — you physically cannot continue until the user responds.
- **Approval gates**: Use \`AskUserQuestion\` with options like "Approve, proceed" and "I want changes"
- **Interview questions**: Use \`AskUserQuestion\` to ask the interview questions directly with suggested answers as options (users can select "Other" for custom answers). Up to 4 questions per call.
- Never generate text or call other tools past a ⛔ without first receiving a response from \`AskUserQuestion\``;

const HITL_GEMINI = `At every ⛔ checkpoint, you MUST call the \`ask_user\` tool to present the checkpoint question. This creates a blocking tool call — you physically cannot continue until the user responds.
- **Approval gates**: Use \`ask_user\` to present the question and wait for the user's response.
- **Interview questions**: Use \`ask_user\` to ask each group of questions, then wait for answers before continuing.
- If \`ask_user\` is unavailable, you MUST completely stop generating at the ⛔ checkpoint. End your response at the question and wait for the user's next message.`;

const HITL_CURSOR = `This workflow is divided into PHASES. You may only execute ONE PHASE per response.

**Phase structure:**
1. STRATEGIST INTERVIEW — Each question group (1–5) is a separate phase. Ask the questions, then end your response.
2. TOKEN APPROVAL — Present the generated tokens. End your response.
3. DESIGN BRIEF — Present the brief. End your response.
4. BUILD — Create the code. End your response.
5. REVIEW & LAUNCH — Review code quality, start dev server. End your response.

**Every response MUST start with a phase declaration on the first line:**
\`[PHASE X — PHASE NAME]\`

If the previous phase was not completed and explicitly approved by the user, start with:
\`[BLOCKED — waiting for user approval of Phase X]\`
then stop. Write nothing else.

**Rules:**
- ONE phase per response. Never two.
- At every ⛔ checkpoint, you have reached the END of the current phase.
- If \`ask_followup_question\` is available, call it to present the ⛔ question and block until the user responds.
- Otherwise, output the ⛔ question as the LAST line of your response, then STOP. Do not write anything after it.
- Do NOT begin the next phase in the same response. The user must reply first.
- Before starting any phase, check that the previous phase was completed AND the user replied with approval.
- If you find yourself writing code and you have not yet received explicit user approval for the design brief, STOP IMMEDIATELY — you have skipped phases.
- Writing code without an approved design brief is a critical failure. If you detect this, stop, delete what you wrote, and output \`[BLOCKED — design brief was never approved]\`.`;


const HITL_CODEX = `This workflow is divided into PHASES. You may only execute ONE PHASE per response.

**Phase structure:**
1. STRATEGIST INTERVIEW — Each question group (1–5) is a separate phase. Ask the questions, then end your response.
2. TOKEN APPROVAL — Present the generated tokens. End your response.
3. DESIGN BRIEF — Present the brief. End your response.
4. BUILD — Create the code. End your response.
5. REVIEW & LAUNCH — Review code quality, start dev server. End your response.

**Every response MUST start with a phase declaration on the first line:**
\`[PHASE X — PHASE NAME]\`

If the previous phase was not completed and explicitly approved by the user, start with:
\`[BLOCKED — waiting for user approval of Phase X]\`
then stop. Write nothing else.

**At every ⛔ checkpoint, output this block and nothing after it:**
\`\`\`approval-required
phase: <current phase name>
question: <the approval question>
options: ["Approve", "Request changes"]
\`\`\`

**Rules:**
- ONE phase per response. Never two.
- At every ⛔ checkpoint, output the approval-required block as the LAST thing in your response, then STOP.
- Do NOT begin the next phase in the same response. The user must reply first.
- Before starting any phase, verify the previous phase was completed AND the user replied with explicit approval.
- If you find yourself writing code without an approved design brief, STOP IMMEDIATELY — output \`[BLOCKED — design brief was never approved]\` and nothing else.
- Writing code before design brief approval is a critical failure.`;

const HITL_STOP_GENERATING = `At every ⛔ checkpoint, you MUST completely stop generating. End your response at the ⛔ question. Do NOT output any text, code, or content past it. Wait for the user's next message before continuing.`;

export const providers = {
  'claude-code': {
    name: 'Claude Code',
    model: 'Claude',
    outputDir: 'claude-code',
    // Skills go into .claude/skills/<name>/SKILL.md
    structure: 'skills-dir',
    skillFileName: 'SKILL.md',
    // Frontmatter is kept as-is (YAML)
    keepFrontmatter: true,
    hitlMechanism: HITL_CLAUDE_CODE,
  },

  cursor: {
    name: 'Cursor',
    model: 'the AI model',
    outputDir: 'cursor',
    // Split into .cursor/rules/*.mdc files for better attention
    structure: 'mdc-rules',
    keepFrontmatter: false,
    hitlMechanism: HITL_CURSOR,
  },

  'gemini-cli': {
    name: 'Gemini CLI',
    model: 'Gemini',
    outputDir: 'gemini-cli',
    // All skills merged into GEMINI.md
    structure: 'single-file',
    outputFile: 'GEMINI.md',
    keepFrontmatter: false,
    hitlMechanism: HITL_GEMINI,
  },

  codex: {
    name: 'Codex',
    model: 'the AI model',
    outputDir: 'codex',
    // All skills merged into AGENTS.md
    structure: 'single-file',
    outputFile: 'AGENTS.md',
    keepFrontmatter: false,
    hitlMechanism: HITL_CODEX,
  },

  copilot: {
    name: 'Copilot',
    model: 'the AI model',
    outputDir: 'copilot',
    // All skills merged into .github/copilot-instructions.md
    structure: 'single-file',
    outputFile: '.github/copilot-instructions.md',
    keepFrontmatter: false,
    hitlMechanism: HITL_STOP_GENERATING,
  },

  antigravity: {
    name: 'Antigravity',
    model: 'Gemini',
    outputDir: 'antigravity',
    // Skills go into .agent/skills/<name>/SKILL.md
    structure: 'skills-dir',
    skillFileName: 'SKILL.md',
    keepFrontmatter: true,
    hitlMechanism: HITL_STOP_GENERATING,
  },

  generic: {
    name: 'Generic',
    model: 'the AI model',
    outputDir: 'generic',
    // All skills merged into a single sitechain-instructions.md
    structure: 'single-file',
    outputFile: 'sitechain-instructions.md',
    keepFrontmatter: false,
    hitlMechanism: HITL_STOP_GENERATING,
  },
};
