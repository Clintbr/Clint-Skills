import React from 'react';
import { Search, X, SlidersHorizontal, ArrowUpDown } from 'lucide-react';
import { CATEGORIES } from '@claude-skills/core';

interface FilterBarProps {
  search: string;
  onSearchChange: (val: string) => void;
  selectedCategory: string;
  onCategoryChange: (val: string) => void;
  selectedDifficulty: string;
  onDifficultyChange: (val: string) => void;
  selectedTag: string;
  onTagChange: (val: string) => void;
  sortBy: string;
  onSortByChange: (val: 'name' | 'lastUpdated' | 'difficulty') => void;
  availableTags: string[];
  totalResults: number;
  onReset: () => void;
}

export const FilterBar: React.FC<FilterBarProps> = ({
  search,
  onSearchChange,
  selectedCategory,
  onCategoryChange,
  selectedDifficulty,
  onDifficultyChange,
  selectedTag,
  onTagChange,
  sortBy,
  onSortByChange,
  availableTags,
  totalResults,
  onReset
}) => {
  const hasActiveFilters =
    search.trim() !== '' ||
    selectedCategory !== 'all' ||
    selectedDifficulty !== 'all' ||
    selectedTag !== 'all';

  return (
    <div className="w-full space-y-4 rounded-xl border border-border bg-card p-4 sm:p-5 shadow-sm">
      {/* Top row: Search input & Sorting */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <input
            type="text"
            value={search}
            onChange={e => onSearchChange(e.target.value)}
            placeholder="Search skills by name, keywords, concepts..."
            className="w-full rounded-lg border border-border bg-background pl-10 pr-9 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-shadow"
          />
          {search && (
            <button
              onClick={() => onSearchChange('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
              aria-label="Clear search"
            >
              <X className="h-4 w-4" />
            </button>
          )}
        </div>

        {/* Sort selector */}
        <div className="flex items-center gap-2">
          <div className="relative inline-flex items-center">
            <ArrowUpDown className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground pointer-events-none" />
            <select
              value={sortBy}
              onChange={e =>
                onSortByChange(e.target.value as 'name' | 'lastUpdated' | 'difficulty')
              }
              className="appearance-none rounded-lg border border-border bg-background pl-9 pr-8 py-2 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 cursor-pointer"
            >
              <option value="name">Sort by Name (A-Z)</option>
              <option value="lastUpdated">Sort by Recently Updated</option>
              <option value="difficulty">Sort by Difficulty</option>
            </select>
          </div>
        </div>
      </div>

      {/* Middle row: Category pills */}
      <div className="flex flex-wrap items-center gap-1.5 pt-1">
        <span className="text-xs font-semibold text-muted-foreground mr-1.5 flex items-center gap-1">
          <SlidersHorizontal className="h-3 w-3" />
          Category:
        </span>
        <button
          onClick={() => onCategoryChange('all')}
          className={`px-3 py-1 rounded-md text-xs font-medium transition-colors ${
            selectedCategory === 'all'
              ? 'bg-primary text-primary-foreground font-semibold shadow-xs'
              : 'bg-muted/70 text-muted-foreground hover:text-foreground hover:bg-muted'
          }`}
        >
          All Categories
        </button>
        {CATEGORIES.map(cat => (
          <button
            key={cat.id}
            onClick={() => onCategoryChange(cat.name)}
            className={`px-3 py-1 rounded-md text-xs font-medium transition-colors ${
              selectedCategory.toLowerCase() === cat.name.toLowerCase()
                ? 'bg-primary text-primary-foreground font-semibold shadow-xs'
                : 'bg-muted/70 text-muted-foreground hover:text-foreground hover:bg-muted'
            }`}
          >
            {cat.name}
          </button>
        ))}
      </div>

      {/* Bottom row: Difficulty, Tags, and Active Filters summary */}
      <div className="flex flex-wrap items-center justify-between gap-3 pt-2 border-t border-border/60 text-xs">
        <div className="flex flex-wrap items-center gap-3">
          {/* Difficulty dropdown */}
          <div className="flex items-center gap-1.5">
            <span className="text-muted-foreground">Difficulty:</span>
            <select
              value={selectedDifficulty}
              onChange={e => onDifficultyChange(e.target.value)}
              className="rounded-md border border-border bg-background px-2.5 py-1 text-xs text-foreground focus:outline-none focus:ring-1 focus:ring-primary cursor-pointer"
            >
              <option value="all">All Levels</option>
              <option value="Beginner">Beginner</option>
              <option value="Intermediate">Intermediate</option>
              <option value="Advanced">Advanced</option>
            </select>
          </div>

          {/* Tag filter */}
          {availableTags.length > 0 && (
            <div className="flex items-center gap-1.5">
              <span className="text-muted-foreground">Tag:</span>
              <select
                value={selectedTag}
                onChange={e => onTagChange(e.target.value)}
                className="rounded-md border border-border bg-background px-2.5 py-1 text-xs text-foreground focus:outline-none focus:ring-1 focus:ring-primary cursor-pointer"
              >
                <option value="all">All Tags</option>
                {availableTags.map(tag => (
                  <option key={tag} value={tag}>
                    #{tag}
                  </option>
                ))}
              </select>
            </div>
          )}
        </div>

        {/* Results count & Clear */}
        <div className="flex items-center gap-3">
          <span className="text-muted-foreground">
            Found <span className="font-semibold text-foreground">{totalResults}</span>{' '}
            {totalResults === 1 ? 'skill' : 'skills'}
          </span>
          {hasActiveFilters && (
            <button
              onClick={onReset}
              className="inline-flex items-center gap-1 text-rose-500 hover:text-rose-600 font-medium transition-colors"
            >
              <X className="h-3 w-3" />
              Reset filters
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

