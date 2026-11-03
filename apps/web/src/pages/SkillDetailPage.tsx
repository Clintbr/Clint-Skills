import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import {
  ArrowLeft,
  Download,
  Archive,
  Copy,
  Check,
  Calendar,
  Sparkles,
  FileText,
  Terminal,
  BookOpen,
  FolderTree,
  AlertCircle,
  ChevronRight
} from 'lucide-react';
import type { SkillFile, TableOfContentsItem } from '@claude-skills/core';
import { SKILLS_REGISTRY } from '../data/skills';
import { MarkdownRenderer } from '../components/MarkdownRenderer';
import { InstallationGuide } from '../components/InstallationGuide';
import { downloadFile, downloadSkillZip, copyToClipboard } from '../utils/download';

export const SkillDetailPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const [activeTab, setActiveTab] = useState<'guide' | 'source' | 'files' | 'install'>('guide');
  const [selectedFileIndex, setSelectedFileIndex] = useState<number>(0);
  const [copiedMd, setCopiedMd] = useState(false);

  const skill = SKILLS_REGISTRY.find(s => s.slug === slug);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  if (!skill) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-20 text-center">
        <div className="inline-flex p-4 rounded-full bg-rose-500/10 text-rose-500 mb-4">
          <AlertCircle className="h-8 w-8" />
        </div>
        <h1 className="text-2xl font-bold text-foreground">Skill Not Found</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          The requested skill <code className="font-mono text-primary">{slug}</code> does not exist in the Clint-Skills library.
        </p>
        <Link
          to="/skills"
          className="mt-6 inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-primary text-primary-foreground font-medium text-sm hover:bg-primary/90 transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Skill Catalog
        </Link>
      </div>
    );
  }

  const handleCopyMarkdown = async () => {
    const ok = await copyToClipboard(skill.rawSkillMd || skill.content);
    if (ok) {
      setCopiedMd(true);
      setTimeout(() => setCopiedMd(false), 2000);
    }
  };

  const currentReferenceFile: SkillFile | undefined = skill.files[selectedFileIndex] || skill.files[0];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Breadcrumb Navigation */}
      <nav className="flex items-center gap-2 text-xs text-muted-foreground mb-6">
        <Link to="/" className="hover:text-foreground transition-colors">Home</Link>
        <ChevronRight className="h-3 w-3" />
        <Link to="/skills" className="hover:text-foreground transition-colors">Skills</Link>
        <ChevronRight className="h-3 w-3" />
        <Link
          to={`/skills?category=${encodeURIComponent(skill.category)}`}
          className="hover:text-foreground transition-colors"
        >
          {skill.category}
        </Link>
        <ChevronRight className="h-3 w-3" />
        <span className="text-foreground font-medium truncate">{skill.name}</span>
      </nav>

      {/* Header Banner */}
      <div className="rounded-2xl border border-border bg-card/90 p-6 sm:p-8 shadow-sm mb-8">
        <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-6">
          <div className="space-y-4 max-w-3xl">
            {/* Badges */}
            <div className="flex flex-wrap items-center gap-2">
              <span className="px-2.5 py-1 rounded-md text-xs font-semibold bg-primary/10 text-primary border border-primary/20">
                {skill.category}
              </span>
              <span className="px-2.5 py-1 rounded-md text-xs font-semibold bg-muted text-muted-foreground border border-border">
                {skill.difficulty}
              </span>
              <span className="px-2 py-0.5 rounded text-[11px] font-mono bg-muted text-muted-foreground border border-border">
                v{skill.version}
              </span>
              {skill.featured && (
                <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-amber-500 bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/20">
                  <Sparkles className="h-3 w-3" />
                  Featured
                </span>
              )}
            </div>

            {/* Title */}
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-foreground">
              {skill.name}
            </h1>

            {/* Description */}
            <p className="text-base text-muted-foreground leading-relaxed">
              {skill.description}
            </p>

            {/* Technologies */}
            {skill.technologies && skill.technologies.length > 0 && (
              <div className="flex flex-wrap items-center gap-1.5 pt-1">
                <span className="text-xs text-muted-foreground mr-1 font-medium">Stack:</span>
                {skill.technologies.map((tech: string) => (
                  <span
                    key={tech}
                    className="text-xs font-mono px-2.5 py-0.5 rounded bg-muted/80 text-foreground border border-border/70"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            )}

            {/* Tags */}
            {skill.tags && skill.tags.length > 0 && (
              <div className="flex flex-wrap items-center gap-1.5">
                <span className="text-xs text-muted-foreground mr-1 font-medium">Tags:</span>
                {skill.tags.map((tag: string) => (
                  <Link
                    key={tag}
                    to={`/skills?tag=${encodeURIComponent(tag)}`}
                    className="text-xs text-primary/90 hover:text-primary transition-colors bg-primary/5 hover:bg-primary/10 px-2 py-0.5 rounded"
                  >
                    #{tag}
                  </Link>
                ))}
              </div>
            )}

            {/* Meta info */}
            <div className="flex items-center gap-4 text-xs text-muted-foreground pt-2 border-t border-border/60">
              <span className="flex items-center gap-1">
                <Calendar className="h-3.5 w-3.5" />
                Updated: {skill.lastUpdated}
              </span>
              <span>•</span>
              <span>Author: {skill.author}</span>
              <span>•</span>
              <span>Files: {skill.files?.length || 1}</span>
            </div>
          </div>

          {/* Action Download Buttons */}
          <div className="flex flex-col sm:flex-row lg:flex-col gap-2.5 min-w-[200px]">
            <button
              onClick={() => downloadSkillZip(skill)}
              className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg bg-primary text-primary-foreground font-semibold text-sm shadow-sm hover:bg-primary/90 transition-all cursor-pointer"
            >
              <Archive className="h-4 w-4" />
              <span>Download ZIP</span>
            </button>

            <button
              onClick={() => downloadFile(`${skill.slug}-SKILL.md`, skill.rawSkillMd || skill.content)}
              className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg border border-border bg-background hover:bg-muted font-medium text-sm text-foreground transition-colors cursor-pointer"
            >
              <Download className="h-4 w-4" />
              <span>Download SKILL.md</span>
            </button>

            <button
              onClick={handleCopyMarkdown}
              className="inline-flex items-center justify-center gap-2 px-4 py-2 rounded-lg border border-border bg-muted/60 hover:bg-muted font-medium text-xs text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
            >
              {copiedMd ? (
                <>
                  <Check className="h-3.5 w-3.5 text-emerald-500" />
                  <span className="text-emerald-500 font-semibold">Markdown Copied</span>
                </>
              ) : (
                <>
                  <Copy className="h-3.5 w-3.5" />
                  <span>Copy Raw Markdown</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Tabs Bar */}
      <div className="border-b border-border mb-8 flex items-center justify-between">
        <div className="flex items-center gap-2 sm:gap-4 overflow-x-auto">
          <button
            onClick={() => setActiveTab('guide')}
            className={`flex items-center gap-2 px-4 py-3 text-sm font-semibold border-b-2 transition-all whitespace-nowrap cursor-pointer ${
              activeTab === 'guide'
                ? 'border-primary text-primary'
                : 'border-transparent text-muted-foreground hover:text-foreground'
            }`}
          >
            <BookOpen className="h-4 w-4" />
            <span>Overview & Instructions</span>
          </button>

          <button
            onClick={() => setActiveTab('source')}
            className={`flex items-center gap-2 px-4 py-3 text-sm font-semibold border-b-2 transition-all whitespace-nowrap cursor-pointer ${
              activeTab === 'source'
                ? 'border-primary text-primary'
                : 'border-transparent text-muted-foreground hover:text-foreground'
            }`}
          >
            <FileText className="h-4 w-4" />
            <span>SKILL.md Source</span>
          </button>

          <button
            onClick={() => setActiveTab('files')}
            className={`flex items-center gap-2 px-4 py-3 text-sm font-semibold border-b-2 transition-all whitespace-nowrap cursor-pointer ${
              activeTab === 'files'
                ? 'border-primary text-primary'
                : 'border-transparent text-muted-foreground hover:text-foreground'
            }`}
          >
            <FolderTree className="h-4 w-4" />
            <span>References & Examples ({skill.files?.length || 1})</span>
          </button>

          <button
            onClick={() => setActiveTab('install')}
            className={`flex items-center gap-2 px-4 py-3 text-sm font-semibold border-b-2 transition-all whitespace-nowrap cursor-pointer ${
              activeTab === 'install'
                ? 'border-primary text-primary'
                : 'border-transparent text-muted-foreground hover:text-foreground'
            }`}
          >
            <Terminal className="h-4 w-4" />
            <span>Installation Guide</span>
          </button>
        </div>
      </div>

      {/* Tab Content Areas */}
      {activeTab === 'guide' && (
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Main Markdown Guide */}
          <div className="lg:col-span-3 rounded-xl border border-border bg-card p-6 sm:p-8 shadow-sm">
            <MarkdownRenderer content={skill.content} />
          </div>

          {/* Sticky Table of Contents Sidebar */}
          <div className="hidden lg:block lg:col-span-1">
            <div className="sticky top-24 rounded-xl border border-border bg-card p-5 space-y-3">
              <h4 className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                Table of Contents
              </h4>
              {skill.toc && skill.toc.length > 0 ? (
                <nav className="space-y-1.5 text-xs">
                  {skill.toc.map((item: TableOfContentsItem, idx: number) => (
                    <a
                      key={idx}
                      href={`#${item.id}`}
                      className={`block py-1 text-muted-foreground hover:text-foreground transition-colors ${
                        item.level === 1
                          ? 'font-semibold text-foreground'
                          : item.level === 2
                          ? 'pl-2.5 font-medium'
                          : 'pl-5 text-[11px]'
                      }`}
                    >
                      {item.title}
                    </a>
                  ))}
                </nav>
              ) : (
                <p className="text-xs text-muted-foreground">No headings found.</p>
              )}

              <div className="pt-4 border-t border-border space-y-2">
                <span className="text-[11px] font-semibold text-muted-foreground block">Quick Export</span>
                <button
                  onClick={() => downloadSkillZip(skill)}
                  className="w-full inline-flex items-center justify-center gap-1.5 px-3 py-1.5 rounded-md bg-muted hover:bg-muted/80 text-xs font-medium text-foreground transition-colors cursor-pointer"
                >
                  <Archive className="h-3.5 w-3.5" />
                  <span>Download ZIP Bundle</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'source' && (
        <div className="rounded-xl border border-border bg-card p-6 shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-sm font-mono text-muted-foreground">
              <FileText className="h-4 w-4 text-primary" />
              <span>SKILL.md</span>
            </div>
            <button
              onClick={handleCopyMarkdown}
              className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-primary/10 text-primary hover:bg-primary/20 text-xs font-semibold transition-colors cursor-pointer"
            >
              {copiedMd ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />}
              <span>{copiedMd ? 'Copied!' : 'Copy Code'}</span>
            </button>
          </div>
          <pre className="p-4 rounded-lg bg-slate-950 text-slate-100 font-mono text-xs overflow-x-auto leading-relaxed border border-border">
            <code>{skill.rawSkillMd || skill.content}</code>
          </pre>
        </div>
      )}

      {activeTab === 'files' && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* File list tree */}
          <div className="md:col-span-1 rounded-xl border border-border bg-card p-4 space-y-2">
            <h4 className="text-xs font-bold uppercase tracking-wider text-muted-foreground px-2 mb-2">
              Package Structure
            </h4>
            <div className="space-y-1">
              {skill.files.map((file: SkillFile, idx: number) => (
                <button
                  key={file.path}
                  onClick={() => setSelectedFileIndex(idx)}
                  className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-xs font-mono transition-colors text-left cursor-pointer ${
                    selectedFileIndex === idx
                      ? 'bg-primary/10 text-primary font-bold border border-primary/20'
                      : 'text-muted-foreground hover:bg-muted hover:text-foreground'
                  }`}
                >
                  <span className="truncate">{file.path}</span>
                  <span className="text-[10px] opacity-70 ml-2">
                    {(file.size / 1024).toFixed(1)} KB
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Selected File Viewer */}
          <div className="md:col-span-2 rounded-xl border border-border bg-card p-6 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-border">
              <div className="flex items-center gap-2">
                <FileText className="h-4 w-4 text-primary" />
                <span className="font-mono text-sm font-semibold text-foreground">
                  {currentReferenceFile?.path}
                </span>
              </div>
              <button
                onClick={() =>
                  downloadFile(
                    currentReferenceFile?.name || 'file.md',
                    currentReferenceFile?.content || ''
                  )
                }
                className="inline-flex items-center gap-1 text-xs text-primary hover:text-primary/80 font-medium cursor-pointer"
              >
                <Download className="h-3.5 w-3.5" />
                <span>Download file</span>
              </button>
            </div>

            <div className="pt-2">
              <MarkdownRenderer content={currentReferenceFile?.content || ''} />
            </div>
          </div>
        </div>
      )}

      {activeTab === 'install' && (
        <div className="max-w-4xl mx-auto">
          <InstallationGuide skill={skill} />
        </div>
      )}
    </div>
  );
};
