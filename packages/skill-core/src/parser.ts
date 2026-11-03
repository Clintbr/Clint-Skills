import { TableOfContentsItem } from './types.js';

/**
 * Extracts YAML frontmatter and markdown body from a raw Markdown file.
 */
export function extractFrontmatter(rawContent: string): {
  frontmatterText: string;
  body: string;
} {
  const normalized = rawContent.replace(/\r\n/g, '\n');
  if (!normalized.startsWith('---')) {
    return { frontmatterText: '', body: normalized };
  }

  const match = normalized.match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/);
  if (!match) {
    return { frontmatterText: '', body: normalized };
  }

  return {
    frontmatterText: match[1],
    body: match[2].trim()
  };
}

/**
 * Robust lightweight YAML parser for skill frontmatter metadata.
 * Works deterministically without external C-bindings or runtime dependencies.
 */
export function parseYamlFrontmatter(yamlText: string): Record<string, unknown> {
  const result: Record<string, unknown> = {};
  const lines = yamlText.split('\n');

  let currentKey = '';
  let inArray = false;
  let arrayValues: string[] = [];

  for (let i = 0; i < lines.length; i++) {
    const rawLine = lines[i];
    const trimmed = rawLine.trim();

    if (!trimmed || trimmed.startsWith('#')) {
      continue;
    }

    // Array item: - value
    if (trimmed.startsWith('- ')) {
      const val = trimmed.slice(2).trim().replace(/^['"](.*)['"]$/, '$1');
      if (inArray && currentKey) {
        arrayValues.push(val);
      }
      continue;
    }

    // Key-value line: key: value or key:
    const colonIndex = trimmed.indexOf(':');
    if (colonIndex !== -1) {
      // Save previous array if any
      if (inArray && currentKey) {
        result[currentKey] = arrayValues;
        inArray = false;
        arrayValues = [];
      }

      const key = trimmed.slice(0, colonIndex).trim();
      const rawVal = trimmed.slice(colonIndex + 1).trim();

      if (rawVal === '') {
        // Starts a multi-line array or nested block
        currentKey = key;
        inArray = true;
        arrayValues = [];
      } else {
        // Scalar value
        currentKey = key;
        let val: unknown = rawVal.replace(/^['"](.*)['"]$/, '$1');
        if (val === 'true') val = true;
        else if (val === 'false') val = false;
        else if (/^\d+$/.test(val as string)) val = parseInt(val as string, 10);
        result[key] = val;
      }
    }
  }

  // Final array flush
  if (inArray && currentKey) {
    result[currentKey] = arrayValues;
  }

  return result;
}

/**
 * Extracts Table of Contents headings from Markdown content.
 */
export function extractTableOfContents(markdown: string): TableOfContentsItem[] {
  const lines = markdown.split('\n');
  const toc: TableOfContentsItem[] = [];

  for (const line of lines) {
    const match = line.match(/^(#{1,4})\s+(.+)$/);
    if (match) {
      const level = match[1].length;
      const rawTitle = match[2].trim();
      // Remove inline links and formatting
      const cleanTitle = rawTitle
        .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')
        .replace(/[`*_~]/g, '')
        .trim();

      const id = cleanTitle
        .toLowerCase()
        .replace(/[^a-z0-9\s-]/g, '')
        .replace(/\s+/g, '-');

      toc.push({
        id,
        title: cleanTitle,
        level
      });
    }
  }

  return toc;
}

