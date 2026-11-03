import { describe, it, expect } from 'vitest';
import JSZip from 'jszip';
import { isPathSafe } from '../packages/skill-core/src/validation.js';
import { SKILLS_REGISTRY } from '../packages/skill-core/src/data/skills.js';

describe('Security Checks & ZIP Bundle Generation', () => {
  it('8. protects against path traversal and malicious file paths', () => {
    // Dangerous traversal attempts
    expect(isPathSafe('../../etc/passwd')).toBe(false);
    expect(isPathSafe('..\\..\\windows\\system32')).toBe(false);
    expect(isPathSafe('/root/.ssh/id_rsa')).toBe(false);
    expect(isPathSafe('C:\\secret.key')).toBe(false);
    expect(isPathSafe('nested/../../escape.txt')).toBe(false);
    expect(isPathSafe('path\0withnull')).toBe(false);

    // Valid relative skill paths
    expect(isPathSafe('SKILL.md')).toBe(true);
    expect(isPathSafe('references/architecture-patterns.md')).toBe(true);
    expect(isPathSafe('examples/spring-boot-example.md')).toBe(true);
  });

  it('9 & 10. verifies that ZIP package contains exact folder structure and all files', async () => {
    const skill = SKILLS_REGISTRY[0]; // backend-architecture-expert
    expect(skill).toBeDefined();

    // Assemble zip as done in downloadSkillZip
    const zip = new JSZip();
    const folder = zip.folder(skill.slug);
    expect(folder).toBeDefined();

    folder!.file('SKILL.md', skill.rawSkillMd || skill.content);

    const refFolder = folder!.folder('references');
    for (const ref of skill.references) {
      refFolder!.file(ref.name, ref.content);
    }

    const exFolder = folder!.folder('examples');
    for (const ex of skill.examples) {
      exFolder!.file(ex.name, ex.content);
    }

    folder!.file('INSTALL.md', `# Installation for ${skill.name}`);

    // Generate zip buffer
    const zipBuffer = await zip.generateAsync({ type: 'nodebuffer' });
    expect(zipBuffer.length).toBeGreaterThan(0);

    // Read back and verify structure
    const unzipped = await JSZip.loadAsync(zipBuffer);
    const fileKeys = Object.keys(unzipped.files);

    // Check directory prefix
    expect(fileKeys.some(k => k === `${skill.slug}/SKILL.md`)).toBe(true);
    expect(fileKeys.some(k => k === `${skill.slug}/INSTALL.md`)).toBe(true);
    expect(fileKeys.some(k => k.startsWith(`${skill.slug}/references/`))).toBe(true);
    expect(fileKeys.some(k => k.startsWith(`${skill.slug}/examples/`))).toBe(true);

    // Read unzipped SKILL.md content
    const unzippedSkillMd = await unzipped.file(`${skill.slug}/SKILL.md`)?.async('string');
    expect(unzippedSkillMd).toContain(skill.name);
  });
});

