import React from 'react';
import {
  Info,
  Layers,
  Sparkles,
  Lock,
  GitBranch
} from 'lucide-react';

export const AboutPage: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
      {/* Page Header */}
      <div>
        <div className="flex items-center gap-2 text-primary text-sm font-semibold mb-1">
          <Info className="h-4 w-4" />
          <span>About Clint-Skills</span>
        </div>
        <h1 className="text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl">
          Vision, Architecture & Standards
        </h1>
        <p className="mt-2 text-base text-muted-foreground leading-relaxed">
          Clint-Skills is an open-source, scalable library providing curated, production-ready AI skills for Claude Code.
        </p>
      </div>

      {/* Core Philosophy */}
      <section className="rounded-2xl border border-border bg-card p-6 sm:p-8 space-y-4">
        <h2 className="text-xl font-bold text-foreground flex items-center gap-2">
          <Sparkles className="h-5 w-5 text-indigo-500" />
          The Philosophy: Skills Over Generic Prompts
        </h2>
        <p className="text-sm text-muted-foreground leading-relaxed">
          Most prompt libraries treat LLMs like text generators that need a paragraph of instructions. In agentic coding with Claude Code, an agent reads files, inspects architectures, executes tests, and proposes diffs.
        </p>
        <p className="text-sm text-muted-foreground leading-relaxed">
          A true <strong>Skill</strong> must therefore act like an experienced Principal Engineer:
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
          <div className="p-4 rounded-xl bg-muted/60 border border-border space-y-1.5">
            <h4 className="font-semibold text-sm text-foreground">Defensive & Responsible</h4>
            <p className="text-xs text-muted-foreground">
              Security skills never run destructive attacks or produce exploit payloads; they audit code defensively in authorized contexts.
            </p>
          </div>
          <div className="p-4 rounded-xl bg-muted/60 border border-border space-y-1.5">
            <h4 className="font-semibold text-sm text-foreground">Progressive Disclosure</h4>
            <p className="text-xs text-muted-foreground">
              Core instructions live in <code className="text-primary font-mono text-[11px]">SKILL.md</code>, while in-depth cheatsheets and refactorings sit in <code className="text-primary font-mono text-[11px]">references/</code> to preserve context window tokens.
            </p>
          </div>
        </div>
      </section>

      {/* Architecture Highlights */}
      <section className="space-y-4">
        <h2 className="text-xl font-bold text-foreground flex items-center gap-2">
          <Layers className="h-5 w-5 text-primary" />
          Technical Architecture
        </h2>
        <div className="rounded-xl border border-border bg-card p-6 space-y-4 text-sm text-muted-foreground leading-relaxed">
          <p>
            The Clint-Skills platform is built from the ground up for high reliability and rapid scalability:
          </p>
          <ul className="space-y-2.5 pl-4 list-disc">
            <li>
              <strong>Monorepo Workspace:</strong> Decoupled core logic in <code className="text-primary font-mono text-xs">@claude-skills/core</code> and modern React 18 UI in <code className="text-primary font-mono text-xs">@claude-skills/web</code>.
            </li>
            <li>
              <strong>Single Source of Truth:</strong> Skills are stored strictly as markdown files in <code className="text-primary font-mono text-xs">skills/</code>. A build-time synchronization scanner extracts YAML frontmatter and file trees with zero manual duplication.
            </li>
            <li>
              <strong>Client-Side Resilience:</strong> Full-text search, multi-facet filtering, and dynamic ZIP generation happen entirely in the client without external backend dependencies or network tracking.
            </li>
            <li>
              <strong>Safe Markdown Rendering:</strong> React Markdown with Github Flavored Markdown (GFM) and XSS sanitization prevents injection attacks while rendering tables, blockquotes, and highlighted code snippets.
            </li>
          </ul>
        </div>
      </section>

      {/* Contributing & Guidelines */}
      <section id="contributing" className="rounded-2xl border border-border bg-card p-6 sm:p-8 space-y-4">
        <div className="flex items-center gap-2">
          <GitBranch className="h-5 w-5 text-emerald-500" />
          <h2 className="text-xl font-bold text-foreground">
            Contributing New Skills
          </h2>
        </div>
        <p className="text-sm text-muted-foreground leading-relaxed">
          We welcome community contributions! Every new skill must follow our standardized directory structure:
        </p>
        <pre className="p-4 rounded-lg bg-slate-950 text-slate-200 font-mono text-xs overflow-x-auto leading-relaxed">
{`skills/
  └── <category>/
        └── <skill-slug>/
              ├── SKILL.md                 # Required: YAML frontmatter + instructions
              ├── references/              # Required: In-depth technical guides
              │     └── ...
              └── examples/                # Required: Concrete before/after code
                    └── ...`}
        </pre>
        <p className="text-xs text-muted-foreground">
          See <code className="text-primary font-mono">CONTRIBUTING.md</code> and <code className="text-primary font-mono">docs/skill-guidelines.md</code> in the repository for complete formatting standards and validation checks.
        </p>
      </section>

      {/* Privacy and Security */}
      <section id="privacy" className="rounded-2xl border border-border bg-card p-6 sm:p-8 space-y-4">
        <div className="flex items-center gap-2">
          <Lock className="h-5 w-5 text-indigo-500" />
          <h2 className="text-xl font-bold text-foreground">
            Security & Zero-Tracking Guarantee
          </h2>
        </div>
        <p className="text-sm text-muted-foreground leading-relaxed">
          Clint-Skills collects no personal telemetry, requires no login credentials, and makes no calls to third-party tracking APIs. Your interaction with skills and downloads happens completely locally in your browser.
        </p>
      </section>
    </div>
  );
};
