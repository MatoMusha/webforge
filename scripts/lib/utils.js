import { readFile, readdir, stat } from 'node:fs/promises';
import { join, relative } from 'node:path';

/**
 * Parse YAML-style frontmatter from a markdown file.
 * Returns { data: {}, content: string }
 */
export function parseFrontmatter(source) {
  const match = source.match(/^---\n([\s\S]*?)\n---\n?([\s\S]*)$/);
  if (!match) return { data: {}, content: source };

  const data = {};
  for (const line of match[1].split('\n')) {
    const colonIdx = line.indexOf(':');
    if (colonIdx === -1) continue;
    const key = line.slice(0, colonIdx).trim();
    let value = line.slice(colonIdx + 1).trim();
    if (value === 'true') value = true;
    else if (value === 'false') value = false;
    data[key] = value;
  }

  return { data, content: match[2] };
}

/**
 * Recursively discover all files in a directory.
 * Returns array of { path, relativePath }
 */
export async function readSourceFiles(dir, basePath = dir) {
  const files = [];
  let entries;
  try {
    entries = await readdir(dir);
  } catch {
    return files;
  }

  for (const entry of entries) {
    const fullPath = join(dir, entry);
    const s = await stat(fullPath);
    if (s.isDirectory()) {
      files.push(...await readSourceFiles(fullPath, basePath));
    } else {
      files.push({
        path: fullPath,
        relativePath: relative(basePath, fullPath),
      });
    }
  }

  return files;
}
