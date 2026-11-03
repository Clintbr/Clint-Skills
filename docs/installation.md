# Installation & Distribution Guide

Dieses Dokument beschreibt die technischen Details der Installation von Skills in Claude Code und die Verteilungsstrategie von Clint-Skills.

---

## 1. Installationsmodi in Claude Code

Claude Code unterstützt zwei Hauptorte für die Ablage von Skills:

### Modus 1: Projektbezogene Installation (`.claude/skills/`)
Dies ist der empfohlene Weg für Entwicklungsteams.

- **Ort**: `<project-root>/.claude/skills/<skill-slug>/`
- **Vorteile**:
  - Wird mit Git versioniert und steht allen Teammitgliedern zur Verfügung.
  - Gewährleistet einheitliche Architektur- und Teststandards im Projekt.
  - Ermöglicht projektspezifische Anpassungen in den Referenzdokumenten.

### Modus 2: Benutzerbezogene globale Installation (`~/.claude/skills/`)
Für individuelle Entwickler, die ihre Lieblings-Skills in jedem beliebigen Projekt zur Verfügung haben möchten.

- **macOS / Linux**: `~/.claude/skills/<skill-slug>/`
- **Windows**: `%USERPROFILE%\.claude\skills\<skill-slug>\`
- **Vorteile**:
  - Steht in jedem Verzeichnis automatisch bereit, auch wenn das Projekt kein eigenes `.claude/`-Verzeichnis besitzt.

---

## 2. ZIP-Paket Aufbau

Beim Klick auf **Download ZIP** in der Web-Oberfläche generiert die Anwendung dynamisch ein Archiv mit folgender interner Struktur:

```
<skill-slug>/
  ├── SKILL.md                 # Hauptanweisungen mit YAML-Frontmatter
  ├── INSTALL.md               # Lokale Schritt-für-Schritt Installationshilfe
  ├── references/              # Technische Leitfäden & Checklisten
  │     ├── guideline-1.md
  │     └── guideline-2.md
  └── examples/                # Realistische Codebeispiele
        └── example-1.md
```

Durch das Entpacken direkt in `.claude/skills/` ist der Skill sofort einsatzbereit.

---

## 3. Plugin Marketplace Zukunft

Das Design von Clint-Skills ist vorbereitet auf das Claude Code Plugin System. Zukünftige Releases können ein `plugin.json` Manifest pro Skill generieren:

```json
{
  "name": "backend-architecture-expert",
  "version": "1.0.0",
  "description": "Backend architecture analysis and refactoring skill",
  "author": "Clint-Skills",
  "skills": ["SKILL.md"]
}
```
Damit können Skills künftig mit einem einzigen Befehl wie `claude plugin install @clint-skills/backend-architecture-expert` installiert werden.

