import { describe, it, expect } from 'vitest';
import { SKILLS_REGISTRY } from '../packages/skill-core/src/data/skills.js';
import { extractTableOfContents } from '../packages/skill-core/src/parser.js';

describe('Skills Catalog Integrity & Slug Loading', () => {
  const expectedSlugs = [
    'backend-architecture-expert',
    'security-audit',
    'rag-engineering-expert',
    'test-engineering'
  ];

  it('6. correctly loads each skill by its unique slug', () => {
    expect(SKILLS_REGISTRY.length).toBe(4);

    for (const slug of expectedSlugs) {
      const skill = SKILLS_REGISTRY.find(s => s.slug === slug);
      expect(skill).toBeDefined();
      expect(skill?.slug).toBe(slug);
      expect(skill?.name.length).toBeGreaterThan(3);
      expect(skill?.description.length).toBeGreaterThan(15);
      expect(skill?.content.length).toBeGreaterThan(50);
      expect(skill?.files.length).toBeGreaterThanOrEqual(1);
    }
  });

  it('7. verifies that SKILL.md contents and Headings (TOC) are structured properly', () => {
    for (const skill of SKILLS_REGISTRY) {
      // Must contain instructions
      expect(skill.content).toContain('#');

      // Check Table of Contents extraction
      const toc = extractTableOfContents(skill.content);
      expect(toc.length).toBeGreaterThan(0);
      expect(toc[0].title.length).toBeGreaterThan(0);
      expect(toc[0].id.length).toBeGreaterThan(0);

      // Check that all files have valid paths and non-empty content
      for (const file of skill.files) {
        expect(file.path).not.toContain('..');
        expect(file.size).toBeGreaterThan(0);
        expect(file.content.length).toBeGreaterThan(0);
      }

      // Check references exist
      expect(skill.references.length).toBeGreaterThan(0);
      expect(skill.examples.length).toBeGreaterThan(0);
    }
  });
});

