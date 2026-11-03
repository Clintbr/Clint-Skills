# Architektur-Dokumentation: Clint-Skills

## 1. Systemübersicht & Designphilosophie

Clint-Skills wurde als skalierbare, datengetriebene Plattform konzipiert, die von vier initialen Skills nahtlos auf Hunderte Skills anwachsen kann, ohne dass UI-Komponenten oder Datenmodelle refaktorisiert werden müssen.

```
┌────────────────────────────────────────────────────────┐
│ Canonical Skill Source on Disk (skills/**/*.md)        │
└───────────────────────────┬────────────────────────────┘
                            │
               ┌────────────▼────────────┐
               │ Ingestion & Sync Scanner│ (packages/skill-core/scripts/sync-skills.cjs)
               └────────────┬────────────┘
                            │ Validiert Frontmatter, File Trees & TOC
               ┌────────────▼────────────┐
               │ Typed Registry Manifest │ (skills-registry.json / skills.ts)
               └────────────┬────────────┘
                            │
         ┌──────────────────┴──────────────────┐
         │                                     │
┌────────▼──────────────┐            ┌─────────▼─────────────┐
│ @claude-skills/core   │            │ @claude-skills/web    │
│ Typen, Validierung,   │            │ Vite + React + Tailwind│
│ Filter & Such-Engine  │            │ Client-Side ZIP Export│
└───────────────────────┘            └───────────────────────┘
```

---

## 2. Architekturentscheidungen (ADR)

### ADR-001: Dateibasierte Datenhaltung mit Build-Time Ingestion
- **Entscheidung**: Die Skills werden als kanonische Markdown-Dateien in Git versioniert. Zur Build-Zeit parst ein Synchronisations-Script alle Metadaten und erzeugt ein typisiertes Manifest.
- **Begründung**:
  - Keine redundante Datenhaltung zwischen Markdown-Inhalten und Metadaten.
  - Vollständige Unabhängigkeit von externen Datenbanken oder Cloud-Diensten im MVP.
  - Ermöglicht 100% statisches Hosting (z.B. GitHub Pages, Vercel, Netlify, Docker).
  - Versionierung aller Skills direkt über Git Pull Requests.

### ADR-002: Monorepo-Workspace-Struktur
- **Entscheidung**: Aufteilung in `packages/skill-core` und `apps/web`.
- **Begründung**:
  - Ermöglicht die spätere Wiederverwendung der Parsing- und Validierungslogik in einer CLI, einem Server oder einem GitHub Action Workflow.
  - Klare Trennung von Domänenlogik und Präsentationsschicht.

### ADR-003: Client-Side ZIP Packaging via JSZip
- **Entscheidung**: ZIP-Archive für den Download werden clientseitig im Browser generiert.
- **Begründung**:
  - Eliminiert Server-Kosten und Backend-Bottlenecks.
  - Funktioniert offline und garantiert dem Nutzer vollständige Privatsphäre.

---

## 3. Datenmodell

Das zentrale Typmodell in `packages/skill-core/src/types.ts`:

```typescript
export type SkillCategory =
  | 'Backend Development'
  | 'Cyber Security'
  | 'AI Engineering'
  | 'Testing & Quality Assurance';

export type SkillDifficulty = 'Beginner' | 'Intermediate' | 'Advanced';

export interface SkillFile {
  path: string;
  name: string;
  content: string;
  size: number;
  type: 'skill' | 'reference' | 'example';
}

export interface SkillMetadata {
  id: string;
  slug: string;
  name: string;
  description: string;
  category: SkillCategory;
  difficulty: SkillDifficulty;
  version: string;
  author: string;
  lastUpdated: string;
  featured: boolean;
  technologies: string[];
  tags: string[];
}

export interface Skill extends SkillMetadata {
  content: string;
  rawSkillMd?: string;
  files: SkillFile[];
  references: SkillFile[];
  examples: SkillFile[];
  toc: TableOfContentsItem[];
}
```

---

## 4. Zukünftige Erweiterungspunkte (Roadmap)

1. **PostgreSQL & REST API**:
   - Die Schnittstelle `filterSkills(skills, options)` kann direkt durch ein Backend-Repository mit SQL-Statements oder Prisma ersetzt werden.
2. **Benutzerkonten & Favoriten**:
   - Erweiterbar über Supabase oder Auth0 zur Speicherung persönlicher Skill-Sammlungen.
3. **Bewertungen & Metriken**:
   - Community-Sterne und Download-Zähler können über ein schlankes Backend aggregiert werden.
4. **Claude Code Plugin Marketplace**:
   - Automatisierte Veröffentlichung von Skills in ein zentrales Anthropic Plugin Registry Format.

