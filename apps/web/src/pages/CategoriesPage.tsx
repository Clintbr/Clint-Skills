import React from 'react';
import { Link } from 'react-router-dom';
import {
  Layers,
  Server,
  ShieldAlert,
  Cpu,
  CheckCircle2,
  ArrowRight
} from 'lucide-react';
import { CATEGORIES } from '@claude-skills/core';
import { SKILLS_REGISTRY } from '../data/skills';
import { SkillCard } from '../components/SkillCard';

const CATEGORY_ICONS: Record<string, React.ComponentType<{ className?: string }>> = {
  Server,
  ShieldAlert,
  Cpu,
  CheckCircle2
};

export const CategoriesPage: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
      {/* Page Header */}
      <div>
        <div className="flex items-center gap-2 text-primary text-sm font-semibold mb-1">
          <Layers className="h-4 w-4" />
          <span>Disciplines & Categories</span>
        </div>
        <h1 className="text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl">
          Skill Categories
        </h1>
        <p className="mt-2 text-base text-muted-foreground max-w-2xl">
          Explore specialized engineering categories tailored to specific roles, workflows, and production requirements.
        </p>
      </div>

      {/* Categories Sections */}
      <div className="space-y-12">
        {CATEGORIES.map(category => {
          const Icon = CATEGORY_ICONS[category.icon] || Server;
          const skillsInCategory = SKILLS_REGISTRY.filter(
            s => s.category.toLowerCase() === category.name.toLowerCase()
          );

          return (
            <div
              key={category.id}
              className="rounded-2xl border border-border bg-card/60 p-6 sm:p-8 space-y-6"
            >
              {/* Category Header */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-border/70">
                <div className="flex items-start sm:items-center gap-4">
                  <div className="p-3 rounded-xl bg-primary/10 text-primary">
                    <Icon className="h-6 w-6" />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-foreground">
                      {category.name}
                    </h2>
                    <p className="text-xs sm:text-sm text-muted-foreground mt-0.5">
                      {category.description}
                    </p>
                  </div>
                </div>

                <Link
                  to={`/skills?category=${encodeURIComponent(category.name)}`}
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-primary hover:text-primary/80 transition-colors self-start sm:self-auto"
                >
                  <span>Filter in Explore</span>
                  <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              </div>

              {/* Skills Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {skillsInCategory.map(skill => (
                  <SkillCard key={skill.slug} skill={skill} />
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
