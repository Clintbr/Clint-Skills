import React, { useState } from 'react';
import { Copy, Check, Terminal, FolderCheck, Download, Archive } from 'lucide-react';
import type { Skill } from '@claude-skills/core';
import { copyToClipboard, downloadFile, downloadSkillZip } from '../utils/download';

interface InstallationGuideProps {
  skill: Skill;
}

export const InstallationGuide: React.FC<InstallationGuideProps> = ({ skill }) => {
  const [copiedType, setCopiedType] = useState<string | null>(null);
  const [installMode, setInstallMode] = useState<'project' | 'global'>('project');
  const [os, setOs] = useState<'posix' | 'windows'>('posix');

  const projectCmdPosix = `mkdir -p .claude/skills/${skill.slug}
curl -sSL -o .claude/skills/${skill.slug}/SKILL.md "${window.location.origin}/skills/${skill.slug}/SKILL.md"`;

  const projectCmdWindows = `New-Item -ItemType Directory -Force -Path ".claude\\skills\\${skill.slug}"
Invoke-WebRequest -Uri "${window.location.origin}/skills/${skill.slug}/SKILL.md" -OutFile ".claude\\skills\\${skill.slug}\\SKILL.md"`;

  const globalCmdPosix = `mkdir -p ~/.claude/skills/${skill.slug}
curl -sSL -o ~/.claude/skills/${skill.slug}/SKILL.md "${window.location.origin}/skills/${skill.slug}/SKILL.md"`;

  const globalCmdWindows = `New-Item -ItemType Directory -Force -Path "$HOME\\.claude\\skills\\${skill.slug}"
Invoke-WebRequest -Uri "${window.location.origin}/skills/${skill.slug}/SKILL.md" -OutFile "$HOME\\.claude\\skills\\${skill.slug}\\SKILL.md"`;

  const currentCmd =
    installMode === 'project'
      ? os === 'posix'
        ? projectCmdPosix
        : projectCmdWindows
      : os === 'posix'
      ? globalCmdPosix
      : globalCmdWindows;

  const handleCopy = async (cmd: string, type: string) => {
    const ok = await copyToClipboard(cmd);
    if (ok) {
      setCopiedType(type);
      setTimeout(() => setCopiedType(null), 2000);
    }
  };

  return (
    <div className="space-y-6">
      {/* Quick Action Download Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <button
          onClick={() => downloadFile(`${skill.slug}-SKILL.md`, skill.rawSkillMd || skill.content)}
          className="flex items-start gap-3 p-4 rounded-xl border border-border bg-card hover:border-primary/50 transition-all text-left group"
        >
          <div className="p-2.5 rounded-lg bg-primary/10 text-primary group-hover:scale-105 transition-transform">
            <Download className="h-5 w-5" />
          </div>
          <div>
            <h4 className="font-semibold text-sm text-foreground">Download Single SKILL.md</h4>
            <p className="text-xs text-muted-foreground mt-0.5">
              The primary instruction file with valid YAML frontmatter.
            </p>
          </div>
        </button>

        <button
          onClick={() => downloadSkillZip(skill)}
          className="flex items-start gap-3 p-4 rounded-xl border border-border bg-card hover:border-primary/50 transition-all text-left group"
        >
          <div className="p-2.5 rounded-lg bg-indigo-500/10 text-indigo-500 group-hover:scale-105 transition-transform">
            <Archive className="h-5 w-5" />
          </div>
          <div>
            <h4 className="font-semibold text-sm text-foreground">Download Complete ZIP Bundle</h4>
            <p className="text-xs text-muted-foreground mt-0.5">
              Includes SKILL.md, {skill.references?.length || 0} references & {skill.examples?.length || 0} examples.
            </p>
          </div>
        </button>
      </div>

      {/* Terminal Command Generator */}
      <div className="rounded-xl border border-border bg-card p-5 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h3 className="font-bold text-base text-foreground">Quick CLI Installation</h3>
            <p className="text-xs text-muted-foreground mt-0.5">
              Run this command in your terminal to set up the skill immediately.
            </p>
          </div>

          {/* Toggle Switches */}
          <div className="flex flex-wrap items-center gap-2">
            {/* Project vs Global */}
            <div className="inline-flex rounded-lg border border-border p-0.5 bg-muted text-xs">
              <button
                onClick={() => setInstallMode('project')}
                className={`px-2.5 py-1 rounded-md font-medium transition-colors ${
                  installMode === 'project'
                    ? 'bg-background text-foreground shadow-xs font-semibold'
                    : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                Project (.claude/)
              </button>
              <button
                onClick={() => setInstallMode('global')}
                className={`px-2.5 py-1 rounded-md font-medium transition-colors ${
                  installMode === 'global'
                    ? 'bg-background text-foreground shadow-xs font-semibold'
                    : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                Global (~/.claude/)
              </button>
            </div>

            {/* OS selector */}
            <div className="inline-flex rounded-lg border border-border p-0.5 bg-muted text-xs">
              <button
                onClick={() => setOs('posix')}
                className={`px-2 py-1 rounded-md font-medium transition-colors ${
                  os === 'posix'
                    ? 'bg-background text-foreground shadow-xs font-semibold'
                    : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                macOS / Linux
              </button>
              <button
                onClick={() => setOs('windows')}
                className={`px-2 py-1 rounded-md font-medium transition-colors ${
                  os === 'windows'
                    ? 'bg-background text-foreground shadow-xs font-semibold'
                    : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                PowerShell
              </button>
            </div>
          </div>
        </div>

        {/* Command Output Block */}
        <div className="relative rounded-lg border border-border bg-slate-950 p-4 text-slate-100 font-mono text-xs overflow-x-auto">
          <div className="flex items-center justify-between pb-2 mb-2 border-b border-slate-800 text-slate-400">
            <span className="flex items-center gap-1.5 text-[11px]">
              <Terminal className="h-3 w-3 text-indigo-400" />
              {installMode === 'project' ? 'Project Scope' : 'User Scope'} ({os === 'posix' ? 'bash/zsh' : 'pwsh'})
            </span>
            <button
              onClick={() => handleCopy(currentCmd, 'cli')}
              className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[11px] bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors"
            >
              {copiedType === 'cli' ? (
                <>
                  <Check className="h-3 w-3 text-emerald-400" />
                  <span className="text-emerald-400">Copied!</span>
                </>
              ) : (
                <>
                  <Copy className="h-3 w-3" />
                  <span>Copy Command</span>
                </>
              )}
            </button>
          </div>
          <pre className="text-emerald-400 whitespace-pre-wrap">{currentCmd}</pre>
        </div>
      </div>

      {/* Directory Structure Visualization */}
      <div className="rounded-xl border border-border bg-card p-5 space-y-3">
        <h4 className="font-semibold text-sm text-foreground flex items-center gap-2">
          <FolderCheck className="h-4 w-4 text-primary" />
          Expected Folder Layout in your Repository
        </h4>
        <pre className="p-3 rounded-lg bg-muted border border-border/80 font-mono text-xs text-foreground overflow-x-auto leading-relaxed">
{`my-project/
  ├── src/
  ├── package.json
  └── .claude/
        └── skills/
              └── ${skill.slug}/
                    ├── SKILL.md                 # Primary instructions with YAML frontmatter
                    ├── references/              # Detailed guidelines & standards
                    └── examples/                # Real-world code refactorings & cases`}
        </pre>
        <p className="text-xs text-muted-foreground">
          Claude Code automatically scans <code className="text-xs text-primary font-mono">.claude/skills/</code> at startup and makes the skill available during conversation whenever matching tasks are detected.
        </p>
      </div>
    </div>
  );
};
