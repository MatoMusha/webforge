#!/usr/bin/env node

import { readFile, mkdir, writeFile, rm, stat as fsStat } from 'node:fs/promises';
import { join, dirname, basename } from 'node:path';
import { fileURLToPath } from 'node:url';
import { readSourceFiles, parseFrontmatter, safePath } from './lib/utils.js';
import { providers } from './providers.js';

const ROOT = dirname(dirname(fileURLToPath(import.meta.url)));
const SOURCE = join(ROOT, 'source');
const CLAUDE_OUT = join(ROOT, '.claude');
const DIST_OUT = join(ROOT, 'dist');

async function ensureDir(dir) {
  await mkdir(dir, { recursive: true });
}

async function clean() {
  // Clean Claude Code local output
  await rm(join(CLAUDE_OUT, 'skills'), { recursive: true, force: true });
  await ensureDir(join(CLAUDE_OUT, 'skills'));

  // Clean all dist outputs
  await rm(DIST_OUT, { recursive: true, force: true });
  await ensureDir(DIST_OUT);
}

/**
 * Validate provider configurations before building.
 */
function validateProviders() {
  for (const [key, p] of Object.entries(providers)) {
    if (!p.name || !p.outputDir || !p.model || !p.structure) {
      throw new Error(`Provider "${key}" missing required fields (name, outputDir, model, structure)`);
    }
    if (p.structure === 'single-file' && !p.outputFile) {
      throw new Error(`Provider "${key}" with single-file structure requires outputFile`);
    }
  }
}

/**
 * Safely read a file with a clear error on failure.
 */
async function safeReadFile(filePath) {
  try {
    return await readFile(filePath, 'utf-8');
  } catch (err) {
    throw new Error(`Failed to read ${filePath}: ${err.message}`);
  }
}

/**
 * Replace {{model}} placeholders with provider-specific values.
 */
function applyPlaceholders(content, provider) {
  return content.replace(/\{\{model\}\}/g, provider.model);
}

/**
 * Strip YAML frontmatter from content.
 */
function stripFrontmatter(content) {
  const { content: body } = parseFrontmatter(content);
  return body;
}

/**
 * Strip relative markdown links that point to .md files.
 * In single-file outputs these are dead links since all content is inlined.
 */
function stripDeadLinks(content) {
  // Replace markdown links like [Typography](../design-system/reference/typography.md)
  // with just the link text: Typography
  return content.replace(/\[([^\]]+)\]\([^)]*\.md\)/g, '$1');
}

/**
 * Build for Claude Code — skills-dir structure.
 * Each skill gets its own directory with SKILL.md + reference files.
 */
async function buildClaudeCode(files, provider) {
  const providerDir = join(DIST_OUT, provider.outputDir);
  let count = 0;

  for (const file of files) {
    const content = await safeReadFile(file.path);
    const transformed = applyPlaceholders(content, provider);

    // Validate output paths stay within expected directories
    const localDest = safePath(join(CLAUDE_OUT, 'skills'), file.relativePath);
    await ensureDir(dirname(localDest));
    await writeFile(localDest, transformed);

    const distDest = safePath(join(providerDir, 'skills'), file.relativePath);
    await ensureDir(dirname(distDest));
    await writeFile(distDest, transformed);

    count++;
  }

  return count;
}

/**
 * Build for single-file providers (Cursor, Windsurf, Codex, Generic).
 * Merges all skills + references into one file.
 */
async function buildSingleFile(files, provider) {
  const providerDir = join(DIST_OUT, provider.outputDir);
  await ensureDir(providerDir);

  // Determine merge order: design-system first, then director, strategist, builder
  const order = ['design-system', 'director', 'strategist', 'builder'];

  // Group files by skill name
  const grouped = {};
  for (const file of files) {
    const skillName = file.relativePath.split('/')[0];
    if (!grouped[skillName]) grouped[skillName] = [];
    grouped[skillName].push(file);
  }

  const sections = [];

  // Header
  sections.push(`# Webforge — AI Design Agents\n`);
  sections.push(`You have access to webforge's coordinated design agents. When the user asks to build, design, or create web interfaces, follow the agent pipeline below.\n`);
  sections.push(`## ⛔ CRITICAL RULE: Human-in-the-Loop\n`);
  sections.push(`**You MUST get explicit user approval at every decision point marked with ⛔. DO NOT skip approval steps, assume user preferences, or make design decisions autonomously. When you see "STOP: Wait for the user", you must literally stop generating and wait for the user's response. This applies to:**\n- Design system interview questions (ask, then wait for answers)\n- Token/palette approval (present, then wait for approval)\n- Design brief approval (present, then wait for approval)\n\n**Violating this rule produces outputs the user didn't ask for. Always confirm before building.**\n`);
  sections.push(`---\n`);

  // Process skills in order
  for (const skillName of order) {
    const skillFiles = grouped[skillName];
    if (!skillFiles) continue;

    // SKILL.md first
    const skillMd = skillFiles.find(f => basename(f.path) === 'SKILL.md');
    if (skillMd) {
      let content = await safeReadFile(skillMd.path);
      content = stripFrontmatter(content);
      content = applyPlaceholders(content, provider);
      content = stripDeadLinks(content);
      sections.push(content.trim());
      sections.push('\n---\n');
    }

    // Then reference files
    const refs = skillFiles.filter(f => basename(f.path) !== 'SKILL.md');
    for (const ref of refs) {
      let content = await safeReadFile(ref.path);
      content = applyPlaceholders(content, provider);
      content = stripDeadLinks(content);
      sections.push(content.trim());
      sections.push('\n---\n');
    }
  }

  // Add any skills not in the explicit order
  for (const [skillName, skillFiles] of Object.entries(grouped)) {
    if (order.includes(skillName)) continue;
    for (const file of skillFiles) {
      let content = await safeReadFile(file.path);
      content = basename(file.path) === 'SKILL.md' ? stripFrontmatter(content) : content;
      content = applyPlaceholders(content, provider);
      content = stripDeadLinks(content);
      sections.push(content.trim());
      sections.push('\n---\n');
    }
  }

  const merged = sections.join('\n').replace(/\n{3,}/g, '\n\n').trim() + '\n';
  const outPath = join(providerDir, provider.outputFile);
  await writeFile(outPath, merged);

  return 1;
}

async function build() {
  console.log('webforge build');
  console.log('==============\n');

  // Validate provider configs
  validateProviders();

  await clean();

  // Verify source directory exists
  const skillsDir = join(SOURCE, 'skills');
  try {
    await fsStat(skillsDir);
  } catch {
    console.error(`Source directory not found: ${skillsDir}`);
    process.exit(1);
  }

  // Discover all source files
  const files = (await readSourceFiles(skillsDir)).filter(f => f.path.endsWith('.md'));

  if (files.length === 0) {
    console.error('No source files found. Check source/skills/ directory.');
    process.exit(1);
  }

  const skillCount = files.filter(f => basename(f.path) === 'SKILL.md').length;
  const refCount = files.length - skillCount;

  console.log(`Source: ${skillCount} skills, ${refCount} reference files\n`);
  console.log('Building providers:');

  // Build each provider
  for (const [key, provider] of Object.entries(providers)) {
    if (provider.structure === 'skills-dir') {
      const count = await buildClaudeCode(files, provider);
      console.log(`  ${provider.name.padEnd(14)} → dist/${provider.outputDir}/skills/ (${count} files)`);
    } else {
      await buildSingleFile(files, provider);
      console.log(`  ${provider.name.padEnd(14)} → dist/${provider.outputDir}/${provider.outputFile}`);
    }
  }

  console.log(`\n  + .claude/skills/ (local Claude Code use)`);
  console.log('\nDone.');
}

build().catch((err) => {
  console.error('Build failed:', err);
  process.exit(1);
});
