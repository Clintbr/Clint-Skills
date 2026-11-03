import { Skill, SkillFilterOptions } from './types.js';

const DIFFICULTY_WEIGHT: Record<string, number> = {
  Beginner: 1,
  Intermediate: 2,
  Advanced: 3
};

/**
 * Filters and sorts skills according to the specified options.
 */
export function filterSkills(skills: Skill[], options: SkillFilterOptions = {}): Skill[] {
  const {
    search,
    category,
    difficulty,
    tag,
    technology,
    sortBy = 'name',
    sortDirection = 'asc',
    featuredOnly = false
  } = options;

  let filtered = [...skills];

  // 1. Featured only filter
  if (featuredOnly) {
    filtered = filtered.filter(s => s.featured);
  }

  // 2. Category filter
  if (category && category !== 'all') {
    filtered = filtered.filter(
      s => s.category.toLowerCase() === category.toLowerCase()
    );
  }

  // 3. Difficulty filter
  if (difficulty && difficulty !== 'all') {
    filtered = filtered.filter(
      s => s.difficulty.toLowerCase() === difficulty.toLowerCase()
    );
  }

  // 4. Tag filter
  if (tag && tag !== 'all') {
    const targetTag = tag.toLowerCase();
    filtered = filtered.filter(s =>
      s.tags.some(t => t.toLowerCase() === targetTag)
    );
  }

  // 5. Technology filter
  if (technology && technology !== 'all') {
    const targetTech = technology.toLowerCase();
    filtered = filtered.filter(s =>
      s.technologies.some(tech => tech.toLowerCase() === targetTech)
    );
  }

  // 6. Full-text search with relevance scoring
  if (search && search.trim().length > 0) {
    const query = search.trim().toLowerCase();
    const queryTerms = query.split(/\s+/).filter(Boolean);

    // Calculate score for each skill
    const scored = filtered.map(skill => {
      let score = 0;
      const name = skill.name.toLowerCase();
      const desc = skill.description.toLowerCase();
      const cat = skill.category.toLowerCase();
      const tags = skill.tags.map(t => t.toLowerCase());
      const techs = skill.technologies.map(t => t.toLowerCase());
      const content = skill.content.toLowerCase();

      for (const term of queryTerms) {
        if (name === term) score += 50;
        else if (name.includes(term)) score += 30;

        if (tags.includes(term)) score += 25;
        if (techs.includes(term)) score += 20;

        if (desc.includes(term)) score += 15;
        if (cat.includes(term)) score += 10;
        if (content.includes(term)) score += 5;
      }

      return { skill, score };
    });

    filtered = scored
      .filter(item => item.score > 0)
      .sort((a, b) => b.score - a.score)
      .map(item => item.skill);

    // If sorting was set to relevance, return scored order directly
    if (sortBy === 'relevance') {
      return filtered;
    }
  }

  // 7. Sort
  filtered.sort((a, b) => {
    let comp = 0;
    switch (sortBy) {
      case 'name':
        comp = a.name.localeCompare(b.name);
        break;
      case 'lastUpdated':
        comp = new Date(b.lastUpdated).getTime() - new Date(a.lastUpdated).getTime();
        // Default lastUpdated sort is newest first
        if (sortDirection === 'desc') return comp;
        return -comp;
      case 'difficulty':
        comp =
          (DIFFICULTY_WEIGHT[a.difficulty] || 0) -
          (DIFFICULTY_WEIGHT[b.difficulty] || 0);
        break;
      default:
        comp = a.name.localeCompare(b.name);
    }

    return sortDirection === 'desc' ? -comp : comp;
  });

  return filtered;
}

