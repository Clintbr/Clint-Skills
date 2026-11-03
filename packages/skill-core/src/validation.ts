import { SkillCategory, SkillDifficulty } from './types.js';

export const VALID_CATEGORIES: SkillCategory[] = [
  'Backend Development',
  'Cyber Security',
  'AI Engineering',
  'Testing & Quality Assurance'
];

export const VALID_DIFFICULTIES: SkillDifficulty[] = [
  'Beginner',
  'Intermediate',
  'Advanced'
];

export interface ValidationResult {
  valid: boolean;
  errors: string[];
}

/**
 * Validates skill metadata against the schema.
 */
export function validateSkillMetadata(raw: unknown): ValidationResult {
  const errors: string[] = [];

  if (!raw || typeof raw !== 'object') {
    return { valid: false, errors: ['Metadata must be a non-null object'] };
  }

  const obj = raw as Record<string, unknown>;

  if (!obj.name || typeof obj.name !== 'string' || obj.name.trim().length === 0) {
    errors.push('Missing or invalid property: "name" (must be non-empty string)');
  }

  if (!obj.slug || typeof obj.slug !== 'string' || !/^[a-z0-9]+(-[a-z0-9]+)*$/.test(obj.slug)) {
    errors.push('Missing or invalid property: "slug" (must be kebab-case, e.g. "backend-architecture-expert")');
  }

  if (!obj.category || !VALID_CATEGORIES.includes(obj.category as SkillCategory)) {
    errors.push(
      `Invalid category: "${obj.category}". Expected one of: ${VALID_CATEGORIES.join(', ')}`
    );
  }

  if (!obj.difficulty || !VALID_DIFFICULTIES.includes(obj.difficulty as SkillDifficulty)) {
    errors.push(
      `Invalid difficulty: "${obj.difficulty}". Expected one of: ${VALID_DIFFICULTIES.join(', ')}`
    );
  }

  if (!obj.description || typeof obj.description !== 'string' || obj.description.trim().length < 10) {
    errors.push('Missing or invalid property: "description" (must be at least 10 characters)');
  }

  if (obj.technologies && !Array.isArray(obj.technologies)) {
    errors.push('Property "technologies" must be an array of strings');
  }

  if (obj.tags && !Array.isArray(obj.tags)) {
    errors.push('Property "tags" must be an array of strings');
  }

  return {
    valid: errors.length === 0,
    errors
  };
}

/**
 * Security: Validates that a file path contains no path traversal (../) or malicious patterns.
 */
export function isPathSafe(filePath: string): boolean {
  if (!filePath || typeof filePath !== 'string') return false;
  // Disallow null bytes
  if (filePath.includes('\0')) return false;
  // Disallow directory traversal
  const normalized = filePath.replace(/\\/g, '/');
  if (normalized.includes('../') || normalized.includes('..\\') || normalized.startsWith('/')) {
    return false;
  }
  // Disallow absolute drive letters on Windows (e.g. C:)
  if (/^[a-zA-Z]:/.test(normalized)) {
    return false;
  }
  return true;
}

