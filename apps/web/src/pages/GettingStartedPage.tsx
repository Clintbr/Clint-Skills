import React from 'react';
import { Link } from 'react-router-dom';
import {
  BookOpen,
  Terminal,
  Package
} from 'lucide-react';

export const GettingStartedPage: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
      {/* Page Header */}
      <div>
        <div className="flex items-center gap-2 text-primary text-sm font-semibold mb-1">
          <BookOpen className="h-4 w-4" />
          <span>Documentation</span>
        </div>
        <h1 className="text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl">
          Getting Started with Clint-Skills
        </h1>
        <p className="mt-2 text-base text-muted-foreground leading-relaxed">
          Learn how to install, manage, and execute curated AI skills directly inside your Claude Code workflows.
        </p>
      </div>

      {/* What is a Claude Code Skill? */}
      <section className="rounded-2xl border border-border bg-card p-6 sm:p-8 space-y-4">
        <h2 className="text-xl font-bold text-foreground flex items-center gap-2">
          <Terminal className="h-5 w-5 text-primary" />
          What is a Claude Code Skill?
        </h2>
        <p className="text-sm text-muted-foreground leading-relaxed">
          A <strong>Skill</strong> in Claude Code is a self-contained, modular instruction set packaged with valid YAML frontmatter in a <code className="text-primary font-mono text-xs">SKILL.md</code> file. Unlike simple chat prompts, skills provide:
        </p>
        <ul className="space-y-2 text-sm text-muted-foreground pl-4 list-disc">
          <li><strong>Domain Specialization:</strong> High-precision technical guidelines, architectural matrices, and testing principles.</li>
          <li><strong>Progressive Disclosure:</strong> High-level system rules in <code className="font-mono text-xs text-primary">SKILL.md</code> with in-depth references in <code className="font-mono text-xs text-primary">references/</code> loaded on-demand.</li>
          <li><strong>Reproducible Workflows:</strong> Step-by-step diagnostic chains that keep Claude focused on standards rather than guessing.</li>
        </ul>
      </section>

      {/* Step by step installation */}
      <section className="space-y-6">
        <h2 className="text-xl font-bold text-foreground">
          Step-by-Step Installation
        </h2>

        {/* Step 1 */}
        <div className="rounded-xl border border-border bg-card p-6 space-y-3">
          <div className="flex items-center gap-3">
            <span className="flex items-center justify-center h-7 w-7 rounded-full bg-primary text-primary-foreground font-bold text-xs">
              1
            </span>
            <h3 className="font-bold text-base text-foreground">
              Select and Download Your Skill
            </h3>
          </div>
          <p className="text-sm text-muted-foreground pl-10">
            Browse our <Link to="/skills" className="text-primary font-semibold hover:underline">Skill Catalog</Link> and pick the skill tailored to your needs. You can download either the single <code className="font-mono text-xs">SKILL.md</code> or the complete ZIP package with all reference guidelines.
          </p>
        </div>

        {/* Step 2 */}
        <div className="rounded-xl border border-border bg-card p-6 space-y-3">
          <div className="flex items-center gap-3">
            <span className="flex items-center justify-center h-7 w-7 rounded-full bg-primary text-primary-foreground font-bold text-xs">
              2
            </span>
            <h3 className="font-bold text-base text-foreground">
              Place the Skill in your Project or User Directory
            </h3>
          </div>
          <div className="pl-10 space-y-4">
            <p className="text-sm text-muted-foreground">
              Claude Code automatically scans skills in two scopes:
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 rounded-lg bg-muted/60 border border-border space-y-2">
                <span className="text-xs font-bold uppercase tracking-wider text-primary">
                  A. Project Scope (Recommended)
                </span>
                <p className="text-xs text-muted-foreground">
                  Shared with your team via git repository.
                </p>
                <pre className="p-2.5 rounded bg-slate-950 text-slate-200 font-mono text-xs overflow-x-auto">
{`.claude/
  └── skills/
        └── <skill-slug>/
              └── SKILL.md`}
                </pre>
              </div>

              <div className="p-4 rounded-lg bg-muted/60 border border-border space-y-2">
                <span className="text-xs font-bold uppercase tracking-wider text-indigo-500">
                  B. Personal User Scope
                </span>
                <p className="text-xs text-muted-foreground">
                  Available globally in all projects on your machine.
                </p>
                <pre className="p-2.5 rounded bg-slate-950 text-slate-200 font-mono text-xs overflow-x-auto">
{`~/.claude/
  └── skills/
        └── <skill-slug>/
              └── SKILL.md`}
                </pre>
              </div>
            </div>
          </div>
        </div>

        {/* Step 3 */}
        <div className="rounded-xl border border-border bg-card p-6 space-y-3">
          <div className="flex items-center gap-3">
            <span className="flex items-center justify-center h-7 w-7 rounded-full bg-primary text-primary-foreground font-bold text-xs">
              3
            </span>
            <h3 className="font-bold text-base text-foreground">
              Launch Claude Code and Trigger the Skill
            </h3>
          </div>
          <div className="pl-10 space-y-3">
            <p className="text-sm text-muted-foreground">
              Run Claude Code in your project directory:
            </p>
            <pre className="p-3 rounded-lg bg-slate-950 text-emerald-400 font-mono text-xs">
claude
            </pre>
            <p className="text-sm text-muted-foreground">
              Claude Code will detect the skill from <code className="font-mono text-xs text-primary">.claude/skills/</code> and automatically activate it whenever you ask related questions or run tasks matching the skill's criteria!
            </p>
          </div>
        </div>
      </section>

      {/* Plugin Ecosystem & Extensibility */}
      <section id="plugin-ecosystem" className="rounded-2xl border border-border bg-card p-6 sm:p-8 space-y-4">
        <div className="flex items-center gap-2">
          <Package className="h-5 w-5 text-indigo-500" />
          <h2 className="text-xl font-bold text-foreground">
            Future-Ready Plugin Architecture
          </h2>
        </div>
        <p className="text-sm text-muted-foreground leading-relaxed">
          Clint-Skills is engineered with an extensible modular structure. While the MVP provides seamless file-based and ZIP-based distribution, all metadata and folder schemas are designed to be 100% compatible with future Claude Code Plugin Marketplaces and package registries.
        </p>
      </section>
    </div>
  );
};
