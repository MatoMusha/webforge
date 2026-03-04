/**
 * Provider configurations for multi-model output.
 * Each provider defines how skills get transformed and where they go.
 */

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
  },

  cursor: {
    name: 'Cursor',
    model: 'the AI model',
    outputDir: 'cursor',
    // Split into .cursor/rules/*.mdc files for better attention
    structure: 'mdc-rules',
    keepFrontmatter: false,
  },

  windsurf: {
    name: 'Windsurf',
    model: 'the AI model',
    outputDir: 'windsurf',
    // All skills merged into .windsurfrules
    structure: 'single-file',
    outputFile: '.windsurfrules',
    keepFrontmatter: false,
  },

  codex: {
    name: 'Codex',
    model: 'the AI model',
    outputDir: 'codex',
    // All skills merged into AGENTS.md
    structure: 'single-file',
    outputFile: 'AGENTS.md',
    keepFrontmatter: false,
  },

  generic: {
    name: 'Generic',
    model: 'the AI model',
    outputDir: 'generic',
    // All skills merged into a single webforge-instructions.md
    structure: 'single-file',
    outputFile: 'webforge-instructions.md',
    keepFrontmatter: false,
  },
};
