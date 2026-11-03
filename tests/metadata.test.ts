import { describe, it, expect } from 'vitest';
import {
  parseYamlFrontmatter,
  extractFrontmatter,
  validateSkillMetadata,
  VALID_CATEGORIES,
  VALID_DIFFICULTIES
} from '../packages/skill-core/src/index.js';

describe('Skill Metadata Parsing & Validation', () => {
  it('1. correctly extracts YAML frontmatter and body from markdown', () => {
    const raw = `---
name: Backend Architecture Expert
slug: backend-architecture-expert
category: Backend Development
difficulty: Advanced
version: 1.0.0
---

# Main Heading
This is the markdown body.`;

    const { frontmatterText, body } = extractFrontmatter(raw);
    expect(frontmatterText).toContain('name: Backend Architecture Expert');
    expect(frontmatterText).toContain('slug: backend-architecture-expert');
    expect(body).toBe('# Main Heading\nThis is the markdown body.');

    const parsed = parseYamlFrontmatter(frontmatterText);
    expect(parsed.name).toBe('Backend Architecture Expert');
    expect(parsed.slug).toBe('backend-architecture-expert');
    expect(parsed.category).toBe('Backend Development');
    expect(parsed.difficulty).toBe('Advanced');
  });

  it('2. detects and rejects invalid or incomplete skill metadata', () => {
    // Missing required fields
    const invalidMeta1 = {
      name: '',
      slug: 'invalid_slug_with_underscore',
      category: 'NonExistentCategory'
    };

    const result1 = validateSkillMetadata(invalidMeta1);
    expect(result1.valid).toBe(false);
    expect(result1.errors.length).toBeGreaterThan(0);
    expect(result1.errors.some(e => e.includes('name'))).toBe(true);
    expect(result1.errors.some(e => e.includes('slug'))).toBe(true);
    expect(result1.errors.some(e => e.includes('category'))).toBe(true);

    // Non-object input
    const result2 = validateSkillMetadata(null);
    expect(result2.valid).toBe(false);
    expect(result2.errors).toContain('Metadata must be a non-null object');
  });

  it('3. validates that categories and difficulties match the defined taxonomy', () => {
    expect(VALID_CATEGORIES).toContain('Backend Development');
    expect(VALID_CATEGORIES).toContain('Cyber Security');
    expect(VALID_CATEGORIES).toContain('AI Engineering');
    expect(VALID_CATEGORIES).toContain('Testing & Quality Assurance');

    expect(VALID_DIFFICULTIES).toEqual(['Beginner', 'Intermediate', 'Advanced']);

    const validMeta = {
      name: 'Valid Skill',
      slug: 'valid-skill',
      category: 'Cyber Security',
      difficulty: 'Advanced',
      description: 'A detailed defensive security audit skill with more than 10 characters',
      technologies: ['OWASP', 'JWT'],
      tags: ['security', 'audit']
    };

    const result = validateSkillMetadata(validMeta);
    expect(result.valid).toBe(true);
    expect(result.errors).toEqual([]);
  });
});

