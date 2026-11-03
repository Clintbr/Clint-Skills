import React from 'react';
import { Link } from 'react-router-dom';
import { Terminal, Shield, ExternalLink } from 'lucide-react';
import { GithubIcon } from './GithubIcon';

export const Footer: React.FC = () => {
  return (
    <footer className="w-full border-t border-border bg-card/60 transition-colors mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand and Description */}
          <div className="md:col-span-2 space-y-4">
            <div className="flex items-center gap-2">
              <div className="h-7 w-7 rounded-md bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white">
                <Terminal className="h-4 w-4" />
              </div>
              <span className="font-bold text-base tracking-tight">Clint-Skills</span>
              <span className="text-xs text-muted-foreground border border-border px-1.5 py-0.5 rounded">
                v1.0.0
              </span>
            </div>
            <p className="text-sm text-muted-foreground max-w-md leading-relaxed">
              Curated, battle-tested AI skills library for Claude Code. Designed to empower developers with structured architecture audits, security assessments, RAG engineering, and robust test suites.
            </p>
            <div className="flex items-center gap-4 text-xs text-muted-foreground pt-2">
              <span className="flex items-center gap-1">
                <Shield className="h-3.5 w-3.5 text-emerald-500" />
                MIT Licensed
              </span>
              <span>•</span>
              <span>Built for Developers</span>
              <span>•</span>
              <span>100% Client-Side Ready</span>
            </div>
          </div>

          {/* Navigation Links */}
          <div className="space-y-3">
            <h4 className="text-sm font-semibold tracking-wide text-foreground">Exploration</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <Link to="/skills" className="hover:text-foreground transition-colors">
                  All Skills
                </Link>
              </li>
              <li>
                <Link to="/categories" className="hover:text-foreground transition-colors">
                  Skill Categories
                </Link>
              </li>
              <li>
                <Link to="/getting-started" className="hover:text-foreground transition-colors">
                  Getting Started Guide
                </Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-foreground transition-colors">
                  Architecture & Vision
                </Link>
              </li>
            </ul>
          </div>

          {/* Resources & Integration */}
          <div className="space-y-3">
            <h4 className="text-sm font-semibold tracking-wide text-foreground">Resources</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <a
                  href="https://github.com/anthropics/claude-code"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-foreground transition-colors flex items-center gap-1.5"
                >
                  <GithubIcon className="h-3.5 w-3.5" />
                  <span>Claude Code CLI</span>
                  <ExternalLink className="h-3 w-3" />
                </a>
              </li>
              <li>
                <Link to="/getting-started#plugin-ecosystem" className="hover:text-foreground transition-colors">
                  Plugin Marketplace Ready
                </Link>
              </li>
              <li>
                <Link to="/about#contributing" className="hover:text-foreground transition-colors">
                  Contribution Guidelines
                </Link>
              </li>
              <li>
                <Link to="/about#privacy" className="hover:text-foreground transition-colors">
                  Defensive & Safe AI
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-border mt-8 pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-muted-foreground gap-4">
          <p>© {new Date().getFullYear()} Clint-Skills Library. Open-source under MIT License.</p>
          <div className="flex items-center gap-6">
            <span>Free & Open Source</span>
            <span>Independent Community Tool</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
