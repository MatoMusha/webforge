#!/usr/bin/env node

import { mkdir, copyFile, rm } from 'node:fs/promises';
import { join, dirname, basename } from 'node:path';
import { readSourceFiles } from './lib/utils.js';

const ROOT = new URL('..', import.meta.url).pathname.replace(/\/$/, '');
const SOURCE = join(ROOT, 'source');
const CLAUDE_OUT = join(ROOT, '.claude');
const DIST_OUT = join(ROOT, 'dist', 'claude-code');

async function ensureDir(dir) {
  await mkdir(dir, { recursive: true });
}

async function clean() {
  for (const dir of [join(CLAUDE_OUT, 'skills'), DIST_OUT]) {
    await rm(dir, { recursive: true, force: true });
    await ensureDir(dir);
  }
  // Clean legacy commands dir if it exists
  await rm(join(CLAUDE_OUT, 'commands'), { recursive: true, force: true });
}

async function buildSkills() {
  const skillsDir = join(SOURCE, 'skills');
  const files = await readSourceFiles(skillsDir);
  let skillCount = 0;
  let refCount = 0;

  for (const file of files) {
    if (!file.path.endsWith('.md')) continue;

    // Copy to .claude/skills/
    const dest = join(CLAUDE_OUT, 'skills', file.relativePath);
    await ensureDir(dirname(dest));
    await copyFile(file.path, dest);

    // Copy to dist/claude-code/skills/
    const distDest = join(DIST_OUT, 'skills', file.relativePath);
    await ensureDir(dirname(distDest));
    await copyFile(file.path, distDest);

    if (basename(file.path) === 'SKILL.md') {
      skillCount++;
    } else {
      refCount++;
    }
  }

  return { skillCount, refCount };
}

async function build() {
  console.log('webd-designer build');
  console.log('===================\n');

  await clean();

  const { skillCount, refCount } = await buildSkills();

  console.log(`Skills:    ${skillCount}`);
  console.log(`Reference: ${refCount}`);
  console.log(`\nOutput:`);
  console.log(`  .claude/skills/    (local use)`);
  console.log(`  dist/claude-code/  (distribution)\n`);
  console.log('Done.');
}

build().catch((err) => {
  console.error('Build failed:', err);
  process.exit(1);
});
