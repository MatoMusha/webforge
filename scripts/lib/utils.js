import { readFile, readdir } from 'node:fs/promises';
import { join, relative, resolve } from 'node:path';

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
 * Validate that a resolved path stays within the expected base directory.
 * Throws on path traversal attempts.
 */
export function safePath(base, untrusted) {
  const resolvedBase = resolve(base);
  const resolved = resolve(base, untrusted);
  if (!resolved.startsWith(resolvedBase + '/') && resolved !== resolvedBase) {
    throw new Error(`Path traversal detected: ${untrusted}`);
  }
  return resolved;
}

/**
 * Recursively discover all files in a directory.
 * Uses withFileTypes to skip symlinks and avoid extra stat() calls.
 * Returns array of { path, relativePath }
 */
export async function readSourceFiles(dir, basePath = dir) {
  const files = [];
  let entries;
  try {
    entries = await readdir(dir, { withFileTypes: true });
  } catch {
    return files;
  }

  for (const entry of entries) {
    const fullPath = join(dir, entry.name);

    // Skip symlinks to prevent reading outside the source tree
    if (entry.isSymbolicLink()) continue;

    if (entry.isDirectory()) {
      files.push(...await readSourceFiles(fullPath, basePath));
    } else {
      const rel = relative(basePath, fullPath);
      // Validate no path traversal
      safePath(basePath, rel);
      files.push({ path: fullPath, relativePath: rel });
    }
  }

  return files;
}
