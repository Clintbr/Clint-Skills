export type SkillCategory =
  | 'Backend Development'
  | 'Cyber Security'
  | 'AI Engineering'
  | 'Testing & Quality Assurance';

export type SkillDifficulty = 'Beginner' | 'Intermediate' | 'Advanced';

export interface CategoryInfo {
  id: string;
  name: SkillCategory;
  slug: string;
  description: string;
  icon: string;
  color: string;
}

export interface SkillFile {
  path: string;
  name: string;
  content: string;
  size: number;
  type: 'skill' | 'reference' | 'example';
}

export interface TableOfContentsItem {
  id: string;
  title: string;
  level: number;
}

export interface SkillMetadata {
  id: string;
  slug: string;
  name: string;
  description: string;
  category: SkillCategory;
  difficulty: SkillDifficulty;
  version: string;
  author: string;
  lastUpdated: string;
  featured: boolean;
  technologies: string[];
  tags: string[];
}

export interface Skill extends SkillMetadata {
  content: string;
  rawSkillMd?: string;
  files: SkillFile[];
  references: SkillFile[];
  examples: SkillFile[];
  toc: TableOfContentsItem[];
}

export interface SkillFilterOptions {
  search?: string;
  category?: string;
  difficulty?: string;
  tag?: string;
  technology?: string;
  sortBy?: 'name' | 'lastUpdated' | 'difficulty' | 'relevance';
  sortDirection?: 'asc' | 'desc';
  featuredOnly?: boolean;
}

