import React from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowRight,
  Terminal,
  Sparkles,
  ShieldCheck,
  CheckCircle2,
  Workflow,
  BookOpen,
  Code2,
  Server,
  ShieldAlert,
  Cpu,
  Download
} from 'lucide-react';
import { SKILLS_REGISTRY } from '../data/skills';
import { CATEGORIES } from '@claude-skills/core';
import { SkillCard } from '../components/SkillCard';

export const HomePage: React.FC = () => {
  const featuredSkills = SKILLS_REGISTRY.slice(0, 4);

  return (
    <div className="space-y-20 pb-16">
      {/* 1. Hero Section */}
      <section className="relative overflow-hidden pt-12 pb-16 lg:pt-20 lg:pb-24 border-b border-border/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Column: Headlines & CTAs */}
            <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-indigo-500/10 text-indigo-500 border border-indigo-500/20">
                <Sparkles className="h-3.5 w-3.5" />
                <span>Next-Gen Agentic Engineering</span>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-foreground leading-[1.15]">
                Give <span className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 bg-clip-text text-transparent">Claude Code</span> the skills to build better software.
              </h1>

              <p className="text-lg sm:text-xl text-muted-foreground leading-relaxed max-w-2xl mx-auto lg:mx-0">
                Discover curated AI skills designed to improve your development workflow, strengthen code quality, and accelerate engineering tasks with precision.
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
                <Link
                  to="/skills"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-primary text-primary-foreground font-semibold text-base shadow-lg shadow-primary/25 hover:bg-primary/90 transition-all hover:scale-[1.02]"
                >
                  <span>Explore Skills</span>
                  <ArrowRight className="h-4 w-4" />
                </Link>

                <Link
                  to="/getting-started"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl border border-border bg-card/80 hover:bg-muted font-medium text-base text-foreground transition-all"
                >
                  <BookOpen className="h-4 w-4 text-muted-foreground" />
                  <span>Getting Started</span>
                </Link>
              </div>

              {/* Trust Badges */}
              <div className="pt-6 flex flex-wrap items-center justify-center lg:justify-start gap-6 text-xs text-muted-foreground">
                <span className="flex items-center gap-1.5">
                  <ShieldCheck className="h-4 w-4 text-emerald-500" />
                  Defensive & Authorized
                </span>
                <span>•</span>
                <span className="flex items-center gap-1.5">
                  <Workflow className="h-4 w-4 text-indigo-500" />
                  Production Ready Workflows
                </span>
                <span>•</span>
                <span className="flex items-center gap-1.5">
                  <Code2 className="h-4 w-4 text-sky-500" />
                  Zero Mock Data
                </span>
              </div>
            </div>

            {/* Right Column: Code Snippet Visual */}
            <div className="lg:col-span-5">
              <div className="rounded-2xl border border-border bg-slate-950 shadow-2xl p-4 sm:p-5 text-slate-200 font-mono text-xs overflow-hidden">
                {/* Terminal Window Header */}
                <div className="flex items-center justify-between pb-3 mb-3 border-b border-slate-800 text-slate-400">
                  <div className="flex items-center gap-2">
                    <div className="h-3 w-3 rounded-full bg-rose-500/80" />
                    <div className="h-3 w-3 rounded-full bg-amber-500/80" />
                    <div className="h-3 w-3 rounded-full bg-emerald-500/80" />
                    <span className="ml-2 text-[11px] text-slate-500">claude-code session</span>
                  </div>
                  <span className="text-[10px] bg-slate-800 px-2 py-0.5 rounded text-indigo-400">
                    skill activated
                  </span>
                </div>

                {/* Simulated Dialog */}
                <div className="space-y-3 leading-relaxed">
                  <p className="text-slate-400">
                    <span className="text-emerald-400">user@dev</span>:<span className="text-sky-400">~/app</span>$ claude
                  </p>
                  <p className="text-indigo-300">
                    &gt; "Audit our Spring Boot order controller for architecture smells and security."
                  </p>
                  <div className="p-3 rounded bg-slate-900 border border-slate-800 space-y-1.5">
                    <div className="flex items-center gap-1.5 text-emerald-400 font-semibold text-[11px]">
                      <Terminal className="h-3 w-3" />
                      [Skill: Backend Architecture Expert]
                    </div>
                    <p className="text-slate-300 text-[11px]">
                      Identified 2 violations:
                    </p>
                    <p className="text-rose-400 text-[11px]">
                      • Direct JPA Entity exposure in POST /orders
                    </p>
                    <p className="text-amber-400 text-[11px]">
                      • Repository called directly in web layer (bypassing service boundary)
                    </p>
                    <p className="text-slate-400 text-[11px] pt-1 border-t border-slate-800">
                      Generating DTO records and transactional service refactoring...
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Featured Skills */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-primary">
              Hand-Picked
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground mt-1">
              Featured Skills
            </h2>
            <p className="text-sm text-muted-foreground mt-1">
              The four foundational AI skills for mission-critical software engineering.
            </p>
          </div>

          <Link
            to="/skills"
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary hover:text-primary/80 transition-colors"
          >
            <span>View All Skills</span>
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {featuredSkills.map(skill => (
            <SkillCard key={skill.slug} skill={skill} />
          ))}
        </div>
      </section>

      {/* 3. Categories Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-primary">
            Taxonomy
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground mt-1">
            Browse by Engineering Domain
          </h2>
          <p className="text-sm text-muted-foreground mt-1">
            Specialized toolsets divided cleanly into distinct technical disciplines.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {CATEGORIES.map(category => {
            const icons: Record<string, React.ComponentType<{ className?: string }>> = {
              Server,
              ShieldAlert,
              Cpu,
              CheckCircle2
            };
            const Icon = icons[category.icon] || Server;
            const skillCount = SKILLS_REGISTRY.filter(
              s => s.category.toLowerCase() === category.name.toLowerCase()
            ).length;

            return (
              <Link
                key={category.id}
                to={`/skills?category=${encodeURIComponent(category.name)}`}
                className="group p-6 rounded-xl border border-border bg-card hover:bg-card/90 hover:border-primary/50 transition-all hover:-translate-y-1 shadow-sm flex flex-col justify-between"
              >
                <div>
                  <div className="p-3 rounded-lg bg-primary/10 text-primary w-fit mb-4 group-hover:scale-110 transition-transform">
                    <Icon className="h-6 w-6" />
                  </div>
                  <h3 className="font-bold text-base text-foreground group-hover:text-primary transition-colors">
                    {category.name}
                  </h3>
                  <p className="text-xs text-muted-foreground mt-2 leading-relaxed">
                    {category.description}
                  </p>
                </div>

                <div className="mt-6 pt-3 border-t border-border/60 flex items-center justify-between text-xs text-muted-foreground">
                  <span>{skillCount} {skillCount === 1 ? 'Skill' : 'Skills'}</span>
                  <ArrowRight className="h-3.5 w-3.5 text-primary group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      {/* 4. Why this library? */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-2xl border border-border bg-gradient-to-b from-card to-muted/40 p-8 sm:p-12 space-y-8">
          <div className="max-w-2xl">
            <span className="text-xs font-bold uppercase tracking-wider text-primary">
              Architectural Standards
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground mt-1">
              Why Clint-Skills?
            </h2>
            <p className="text-sm text-muted-foreground mt-2 leading-relaxed">
              Standard AI prompt collections fail because they lack technical context and progressive disclosure. Clint-Skills provides structured, versioned engineering playbooks.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-5 rounded-xl border border-border/80 bg-background/80 space-y-2.5">
              <div className="p-2 rounded-md bg-indigo-500/10 text-indigo-500 w-fit">
                <Workflow className="h-5 w-5" />
              </div>
              <h4 className="font-bold text-sm text-foreground">Curated Skills</h4>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Every skill is written and vetted by senior software engineers with valid YAML frontmatter, strict evaluation criteria, and reproducible steps.
              </p>
            </div>

            <div className="p-5 rounded-xl border border-border/80 bg-background/80 space-y-2.5">
              <div className="p-2 rounded-md bg-emerald-500/10 text-emerald-500 w-fit">
                <Code2 className="h-5 w-5" />
              </div>
              <h4 className="font-bold text-sm text-foreground">Practical Examples & References</h4>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Skills follow progressive disclosure: lightweight system prompts with deep markdown references and real Before/After refactorings loaded on demand.
              </p>
            </div>

            <div className="p-5 rounded-xl border border-border/80 bg-background/80 space-y-2.5">
              <div className="p-2 rounded-md bg-purple-500/10 text-purple-500 w-fit">
                <Download className="h-5 w-5" />
              </div>
              <h4 className="font-bold text-sm text-foreground">1-Click Integration</h4>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Download single files or full ZIP bundles configured for your project's <code className="text-primary font-mono text-[11px]">.claude/skills/</code> directory or personal environment.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 5. Getting Started Teaser */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-2xl border border-border bg-card p-8 sm:p-10 flex flex-col md:flex-row items-center justify-between gap-6 shadow-sm">
          <div className="space-y-2 text-center md:text-left">
            <h3 className="text-xl sm:text-2xl font-bold tracking-tight text-foreground">
              Ready to elevate your Claude Code experience?
            </h3>
            <p className="text-sm text-muted-foreground max-w-xl">
              Integrate your first skill in less than 30 seconds. No external accounts or API keys required.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-3 w-full md:w-auto">
            <Link
              to="/skills"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-lg bg-primary text-primary-foreground font-semibold text-sm hover:bg-primary/90 transition-colors"
            >
              Browse Skills
            </Link>
            <Link
              to="/getting-started"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-lg border border-border bg-background hover:bg-muted font-medium text-sm text-foreground transition-colors"
            >
              Read Getting Started
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};
