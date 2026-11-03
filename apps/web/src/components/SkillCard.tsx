import React from 'react';
import { Link } from 'react-router-dom';
import {
  Server,
  ShieldAlert,
  Cpu,
  CheckCircle2,
  ArrowRight,
  Sparkles,
  Calendar
} from 'lucide-react';
import type { Skill, SkillCategory, SkillDifficulty } from '@claude-skills/core';

interface SkillCardProps {
  skill: Skill;
}

const CATEGORY_THEME: Record<
  SkillCategory,
  { icon: React.ComponentType<{ className?: string }>; badgeClass: string }
> = {
  'Backend Development': {
    icon: Server,
    badgeClass: 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20'
  },
  'Cyber Security': {
    icon: ShieldAlert,
    badgeClass: 'bg-rose-500/10 text-rose-600 dark:text-rose-400 border-rose-500/20'
  },
  'AI Engineering': {
    icon: Cpu,
    badgeClass: 'bg-purple-500/10 text-purple-600 dark:text-purple-400 border-purple-500/20'
  },
  'Testing & Quality Assurance': {
    icon: CheckCircle2,
    badgeClass: 'bg-sky-500/10 text-sky-600 dark:text-sky-400 border-sky-500/20'
  }
};

const DIFFICULTY_THEME: Record<SkillDifficulty, string> = {
  Beginner: 'bg-teal-500/10 text-teal-600 dark:text-teal-400 border-teal-500/20',
  Intermediate: 'bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20',
  Advanced: 'bg-red-500/10 text-red-600 dark:text-red-400 border-red-500/20'
};

export const SkillCard: React.FC<SkillCardProps> = ({ skill }) => {
  const theme = CATEGORY_THEME[skill.category] || CATEGORY_THEME['Backend Development'];
  const Icon = theme.icon;

  return (
    <div className="group relative flex flex-col justify-between rounded-xl border border-border bg-card/80 hover:bg-card p-6 shadow-sm hover:shadow-md transition-all duration-200 hover:-translate-y-0.5 hover:border-primary/40">
      <div>
        {/* Top badges: Category & Difficulty */}
        <div className="flex items-center justify-between gap-2 mb-3">
          <span
            className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-medium border ${theme.badgeClass}`}
          >
            <Icon className="h-3.5 w-3.5" />
            <span>{skill.category}</span>
          </span>

          <span
            className={`px-2 py-0.5 rounded text-[11px] font-semibold border ${
              DIFFICULTY_THEME[skill.difficulty] || DIFFICULTY_THEME.Intermediate
            }`}
          >
            {skill.difficulty}
          </span>
        </div>

        {/* Skill Name */}
        <h3 className="text-lg font-bold tracking-tight text-foreground group-hover:text-primary transition-colors flex items-center justify-between">
          <Link to={`/skills/${skill.slug}`} className="focus:outline-none">
            <span className="absolute inset-0" aria-hidden="true" />
            {skill.name}
          </Link>
          {skill.featured && (
            <span className="z-10 inline-flex items-center gap-1 text-[11px] text-amber-500 font-medium bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/20">
              <Sparkles className="h-3 w-3" />
              Featured
            </span>
          )}
        </h3>

        {/* Description */}
        <p className="mt-2 text-sm text-muted-foreground line-clamp-3 leading-relaxed">
          {skill.description}
        </p>

        {/* Technologies Pills */}
        {skill.technologies && skill.technologies.length > 0 && (
          <div className="mt-4 flex flex-wrap gap-1.5 z-10 relative">
            {skill.technologies.slice(0, 4).map(tech => (
              <span
                key={tech}
                className="inline-block text-[11px] font-mono px-2 py-0.5 rounded bg-muted text-muted-foreground border border-border/60"
              >
                {tech}
              </span>
            ))}
            {skill.technologies.length > 4 && (
              <span className="text-[11px] text-muted-foreground self-center px-1">
                +{skill.technologies.length - 4}
              </span>
            )}
          </div>
        )}
      </div>

      {/* Card Footer: Metadata and Action Link */}
      <div className="mt-6 pt-4 border-t border-border/60 flex items-center justify-between text-xs text-muted-foreground z-10 relative">
        <div className="flex items-center gap-1.5">
          <Calendar className="h-3.5 w-3.5" />
          <span>{skill.lastUpdated}</span>
        </div>

        <Link
          to={`/skills/${skill.slug}`}
          className="inline-flex items-center gap-1 font-medium text-primary hover:text-primary/80 transition-colors"
        >
          <span>View Skill</span>
          <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>
    </div>
  );
};
