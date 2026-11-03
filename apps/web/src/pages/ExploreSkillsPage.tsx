import React, { useState, useMemo, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Compass, FilterX } from 'lucide-react';
import { SKILLS_REGISTRY } from '../data/skills';
import { filterSkills } from '@claude-skills/core';
import { SkillCard } from '../components/SkillCard';
import { FilterBar } from '../components/FilterBar';

export const ExploreSkillsPage: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const [search, setSearch] = useState<string>(searchParams.get('q') || '');
  const [category, setCategory] = useState<string>(searchParams.get('category') || 'all');
  const [difficulty, setDifficulty] = useState<string>(searchParams.get('difficulty') || 'all');
  const [tag, setTag] = useState<string>(searchParams.get('tag') || 'all');
  const [sortBy, setSortBy] = useState<'name' | 'lastUpdated' | 'difficulty'>('name');

  // Keep search params in sync with state
  useEffect(() => {
    const q = searchParams.get('q');
    const cat = searchParams.get('category');
    const diff = searchParams.get('difficulty');
    const t = searchParams.get('tag');

    if (q !== null) setSearch(q);
    if (cat !== null) setCategory(cat);
    if (diff !== null) setDifficulty(diff);
    if (t !== null) setTag(t);
  }, [searchParams]);

  const updateFilters = (newParams: Record<string, string>) => {
    const nextParams = new URLSearchParams(searchParams);
    Object.entries(newParams).forEach(([key, val]) => {
      if (!val || val === 'all') {
        nextParams.delete(key);
      } else {
        nextParams.set(key, val);
      }
    });
    setSearchParams(nextParams);
  };

  // Extract all distinct tags from registry
  const availableTags = useMemo(() => {
    const set = new Set<string>();
    SKILLS_REGISTRY.forEach(s => s.tags?.forEach((t: string) => set.add(t)));
    return Array.from(set).sort();
  }, []);

  // Filter skills
  const filteredSkills = useMemo(() => {
    return filterSkills(SKILLS_REGISTRY, {
      search,
      category,
      difficulty,
      tag,
      sortBy,
      sortDirection: sortBy === 'lastUpdated' ? 'desc' : 'asc'
    });
  }, [search, category, difficulty, tag, sortBy]);

  const handleReset = () => {
    setSearch('');
    setCategory('all');
    setDifficulty('all');
    setTag('all');
    setSortBy('name');
    setSearchParams({});
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Page Title */}
      <div>
        <div className="flex items-center gap-2 text-primary text-sm font-semibold mb-1">
          <Compass className="h-4 w-4" />
          <span>Curated Repository</span>
        </div>
        <h1 className="text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl">
          Explore AI Skills
        </h1>
        <p className="mt-2 text-base text-muted-foreground max-w-2xl">
          Discover specialized, production-ready capabilities for Claude Code. Every skill comes complete with verified prompts, system instructions, and concrete reference implementations.
        </p>
      </div>

      {/* Filter and Search Bar */}
      <FilterBar
        search={search}
        onSearchChange={val => {
          setSearch(val);
          updateFilters({ q: val });
        }}
        selectedCategory={category}
        onCategoryChange={val => {
          setCategory(val);
          updateFilters({ category: val });
        }}
        selectedDifficulty={difficulty}
        onDifficultyChange={val => {
          setDifficulty(val);
          updateFilters({ difficulty: val });
        }}
        selectedTag={tag}
        onTagChange={val => {
          setTag(val);
          updateFilters({ tag: val });
        }}
        sortBy={sortBy}
        onSortByChange={setSortBy}
        availableTags={availableTags}
        totalResults={filteredSkills.length}
        onReset={handleReset}
      />

      {/* Skills Grid */}
      {filteredSkills.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
          {filteredSkills.map(skill => (
            <SkillCard key={skill.slug} skill={skill} />
          ))}
        </div>
      ) : (
        <div className="rounded-xl border border-dashed border-border bg-card/50 p-12 text-center space-y-4">
          <div className="inline-flex p-3 rounded-full bg-muted text-muted-foreground">
            <FilterX className="h-6 w-6" />
          </div>
          <h3 className="text-lg font-semibold text-foreground">No matching skills found</h3>
          <p className="text-sm text-muted-foreground max-w-md mx-auto">
            We couldn't find any skills matching your search query and filters. Try adjusting your search term or clearing the active filters.
          </p>
          <button
            onClick={handleReset}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-primary text-primary-foreground text-sm font-medium hover:bg-primary/90 transition-colors"
          >
            Clear All Filters
          </button>
        </div>
      )}
    </div>
  );
};
