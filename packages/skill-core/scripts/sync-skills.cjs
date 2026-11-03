const fs = require('fs');
const path = require('path');

const ROOT_DIR = path.resolve(__dirname, '../../..');
const SKILLS_DIR = path.join(ROOT_DIR, 'skills');
const OUTPUT_WEB_DATA_DIR = path.join(ROOT_DIR, 'apps/web/src/data');
const OUTPUT_CORE_DATA_DIR = path.join(ROOT_DIR, 'packages/skill-core/src/data');
const PUBLIC_SKILLS_DIR = path.join(ROOT_DIR, 'apps/web/public/skills');

// Ensure output directories exist
[OUTPUT_WEB_DATA_DIR, OUTPUT_CORE_DATA_DIR, PUBLIC_SKILLS_DIR].forEach(dir => {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
});

function parseSimpleYaml(yamlText) {
  const result = {};
  const lines = yamlText.split(/\r?\n/);
  let currentKey = '';
  let inArray = false;
  let arrayValues = [];

  for (let i = 0; i < lines.length; i++) {
    const rawLine = lines[i];
    const trimmed = rawLine.trim();

    if (!trimmed || trimmed.startsWith('#')) continue;

    if (trimmed.startsWith('- ')) {
      const val = trimmed.slice(2).trim().replace(/^['"](.*)['"]$/, '$1');
      if (inArray && currentKey) {
        arrayValues.push(val);
      }
      continue;
    }

    const colonIndex = trimmed.indexOf(':');
    if (colonIndex !== -1) {
      if (inArray && currentKey) {
        result[currentKey] = arrayValues;
        inArray = false;
        arrayValues = [];
      }

      const key = trimmed.slice(0, colonIndex).trim();
      const rawVal = trimmed.slice(colonIndex + 1).trim();

      if (rawVal === '') {
        currentKey = key;
        inArray = true;
        arrayValues = [];
      } else {
        currentKey = key;
        let val = rawVal.replace(/^['"](.*)['"]$/, '$1');
        if (val === 'true') val = true;
        else if (val === 'false') val = false;
        else if (/^\d+$/.test(val)) val = parseInt(val, 10);
        result[key] = val;
      }
    }
  }

  if (inArray && currentKey) {
    result[currentKey] = arrayValues;
  }

  return result;
}

function extractToc(markdown) {
  const lines = markdown.split(/\r?\n/);
  const toc = [];
  for (const line of lines) {
    const match = line.match(/^(#{1,4})\s+(.+)$/);
    if (match) {
      const level = match[1].length;
      const cleanTitle = match[2]
        .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')
        .replace(/[`*_~]/g, '')
        .trim();
      const id = cleanTitle
        .toLowerCase()
        .replace(/[^a-z0-9\s-]/g, '')
        .replace(/\s+/g, '-');
      toc.push({ id, title: cleanTitle, level });
    }
  }
  return toc;
}

function collectFiles(dirPath, baseSkillDir, type) {
  if (!fs.existsSync(dirPath)) return [];
  const entries = fs.readdirSync(dirPath, { withFileTypes: true });
  let files = [];

  for (const entry of entries) {
    const fullPath = path.join(dirPath, entry.name);
    const relPath = path.relative(baseSkillDir, fullPath).replace(/\\/g, '/');

    if (entry.isDirectory()) {
      files = files.concat(collectFiles(fullPath, baseSkillDir, type));
    } else if (entry.isFile() && entry.name.endsWith('.md')) {
      const content = fs.readFileSync(fullPath, 'utf-8');
      files.push({
        path: relPath,
        name: entry.name,
        content,
        size: Buffer.byteLength(content, 'utf-8'),
        type
      });
    }
  }
  return files;
}

function scanSkills() {
  console.log(`Scanning skills in ${SKILLS_DIR}...`);
  const skills = [];

  const categoryFolders = fs.readdirSync(SKILLS_DIR, { withFileTypes: true });

  for (const catEntry of categoryFolders) {
    if (!catEntry.isDirectory()) continue;
    const catPath = path.join(SKILLS_DIR, catEntry.name);
    const skillFolders = fs.readdirSync(catPath, { withFileTypes: true });

    for (const skillEntry of skillFolders) {
      if (!skillEntry.isDirectory()) continue;
      const skillPath = path.join(catPath, skillEntry.name);
      const skillMdPath = path.join(skillPath, 'SKILL.md');

      if (!fs.existsSync(skillMdPath)) {
        console.warn(`[WARN] Skipping ${skillPath}: Missing SKILL.md`);
        continue;
      }

      const rawContent = fs.readFileSync(skillMdPath, 'utf-8');
      const normalized = rawContent.replace(/\r\n/g, '\n');

      let frontmatterText = '';
      let body = normalized;

      if (normalized.startsWith('---')) {
        const match = normalized.match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/);
        if (match) {
          frontmatterText = match[1];
          body = match[2].trim();
        }
      }

      const meta = parseSimpleYaml(frontmatterText);
      const toc = extractToc(body);

      // Collect references and examples
      const references = collectFiles(path.join(skillPath, 'references'), skillPath, 'reference');
      const examples = collectFiles(path.join(skillPath, 'examples'), skillPath, 'example');

      const skillFile = {
        path: 'SKILL.md',
        name: 'SKILL.md',
        content: rawContent,
        size: Buffer.byteLength(rawContent, 'utf-8'),
        type: 'skill'
      };

      const allFiles = [skillFile, ...references, ...examples];

      const skillRecord = {
        id: meta.slug || skillEntry.name,
        slug: meta.slug || skillEntry.name,
        name: meta.name || skillEntry.name,
        description: meta.description || '',
        category: meta.category || 'Backend Development',
        difficulty: meta.difficulty || 'Intermediate',
        version: meta.version ? String(meta.version) : '1.0.0',
        author: meta.author || 'Clint-Skills Team',
        lastUpdated: meta.lastUpdated ? String(meta.lastUpdated) : new Date().toISOString().split('T')[0],
        featured: meta.featured === true,
        technologies: Array.isArray(meta.technologies) ? meta.technologies : [],
        tags: Array.isArray(meta.tags) ? meta.tags : [],
        content: body,
        rawSkillMd: rawContent,
        toc,
        files: allFiles,
        references,
        examples
      };

      skills.push(skillRecord);
      console.log(`✓ Loaded skill: ${skillRecord.name} (${skillRecord.slug}) [${skillRecord.category}]`);
    }
  }

  // Sort by name
  skills.sort((a, b) => a.name.localeCompare(b.name));

  // Write JSON registry
  const jsonContent = JSON.stringify(skills, null, 2);
  fs.writeFileSync(path.join(OUTPUT_WEB_DATA_DIR, 'skills-registry.json'), jsonContent);
  fs.writeFileSync(path.join(OUTPUT_CORE_DATA_DIR, 'skills-registry.json'), jsonContent);

  // Write TypeScript export
  const tsContentWeb = `// Auto-generated by sync-skills.cjs - DO NOT EDIT MANUALLY
import type { Skill } from '@claude-skills/core';

export const SKILLS_REGISTRY: Skill[] = ${jsonContent} as unknown as Skill[];

export default SKILLS_REGISTRY;
`;

  const tsContentCore = `// Auto-generated by sync-skills.cjs - DO NOT EDIT MANUALLY
import type { Skill } from '../types.js';

export const SKILLS_REGISTRY: Skill[] = ${jsonContent} as unknown as Skill[];

export default SKILLS_REGISTRY;
`;
  fs.writeFileSync(path.join(OUTPUT_WEB_DATA_DIR, 'skills.ts'), tsContentWeb);
  fs.writeFileSync(path.join(OUTPUT_CORE_DATA_DIR, 'skills.ts'), tsContentCore);

  console.log(`\nSuccessfully synced ${skills.length} skills to registry!`);
  return skills;
}

scanSkills();
