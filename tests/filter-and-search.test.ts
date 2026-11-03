import { describe, it, expect } from 'vitest';
import { filterSkills } from '../packages/skill-core/src/filter.js';
import { SKILLS_REGISTRY } from '../packages/skill-core/src/data/skills.js';

describe('Skill Search & Multi-filter Engine', () => {
  it('4. performs full-text search across titles, descriptions, and tags', () => {
    // Search for 'architecture'
    const resultsArch = filterSkills(SKILLS_REGISTRY, { search: 'architecture' });
    expect(resultsArch.length).toBeGreaterThan(0);
    expect(resultsArch.some(s => s.slug === 'backend-architecture-expert')).toBe(true);

    // Search for 'OWASP'
    const resultsSec = filterSkills(SKILLS_REGISTRY, { search: 'owasp' });
    expect(resultsSec.length).toBeGreaterThan(0);
    expect(resultsSec[0].slug).toBe('security-audit');

    // Search for 'vector'
    const resultsRag = filterSkills(SKILLS_REGISTRY, { search: 'vector' });
    expect(resultsRag.length).toBeGreaterThan(0);
    expect(resultsRag.some(s => s.slug === 'rag-engineering-expert')).toBe(true);

    // Search for non-existent keyword
    const resultsNone = filterSkills(SKILLS_REGISTRY, { search: 'xyznonexistentword999' });
    expect(resultsNone.length).toBe(0);
  });

  it('5. correctly combines multiple filters: category, difficulty, tag and search', () => {
    // Filter by Category only
    const backendOnly = filterSkills(SKILLS_REGISTRY, { category: 'Backend Development' });
    expect(backendOnly.every(s => s.category === 'Backend Development')).toBe(true);
    expect(backendOnly.length).toBe(1);

    // Filter by Category AND Difficulty
    const advancedSecurity = filterSkills(SKILLS_REGISTRY, {
      category: 'Cyber Security',
      difficulty: 'Advanced'
    });
    expect(advancedSecurity.length).toBe(1);
    expect(advancedSecurity[0].slug).toBe('security-audit');

    // Filter by Category AND incompatible Difficulty -> returns empty
    const beginnerSecurity = filterSkills(SKILLS_REGISTRY, {
      category: 'Cyber Security',
      difficulty: 'Beginner'
    });
    expect(beginnerSecurity.length).toBe(0);

    // Filter by Tag
    const testingSkills = filterSkills(SKILLS_REGISTRY, { tag: 'unit-tests' });
    expect(testingSkills.length).toBe(1);
    expect(testingSkills[0].slug).toBe('test-engineering');

    // Combined: Category + Search + Difficulty
    const combined = filterSkills(SKILLS_REGISTRY, {
      category: 'AI Engineering',
      search: 'rag',
      difficulty: 'Advanced'
    });
    expect(combined.length).toBe(1);
    expect(combined[0].slug).toBe('rag-engineering-expert');
  });

  it('sorts skills by name and lastUpdated', () => {
    const sortedByName = filterSkills(SKILLS_REGISTRY, { sortBy: 'name', sortDirection: 'asc' });
    const names = sortedByName.map(s => s.name);
    const sortedNames = [...names].sort();
    expect(names).toEqual(sortedNames);
  });
});

