# Contributing to Clint-Skills

Vielen Dank für dein Interesse, neue AI-Skills zur **Clint-Skills** Bibliothek beizutragen!

Unser Ziel ist es, eine exzellente, kuratierte und verlässliche Sammlung von Claude Code Skills bereitzustellen. Jeder Skill muss handwerklich sauber ausgearbeitet sein und strenge Qualitätskriterien erfüllen.

---

## 1. Verzeichnis- und Dateistruktur

Jeder neue Skill muss in einer passenden Kategorie unter `skills/<category>/<skill-slug>/` abgelegt werden:

```
skills/
  └── <category-folder>/
        └── <skill-slug>/
              ├── SKILL.md                 # Erforderlich: Hauptanweisungen mit YAML-Frontmatter
              ├── references/              # Erforderlich: Vertiefende Leitfäden und Standards
              │     ├── guideline-1.md
              │     └── ...
              └── examples/                # Erforderlich: Vorher/Nachher Praxisbeispiele
                    └── example-1.md
```

### Namenskonventionen:
- Der Ordnername `<skill-slug>` muss in Kleinbuchstaben mit Bindestrichen geschrieben sein (Kebab-Case, z.B. `performance-profiler`).
- Keine Leerzeichen oder Sonderzeichen.

---

## 2. Anforderungen an die `SKILL.md`

Jede `SKILL.md` **muss** mit einem gültigen YAML-Frontmatter beginnen:

```markdown
---
name: Performance Profiler Expert
slug: performance-profiler-expert
version: 1.0.0
category: Backend Development
difficulty: Advanced
author: Dein Name oder GitHub Handle
lastUpdated: 2026-03-15
featured: false
technologies:
  - Node.js
  - Go
  - Profiling
tags:
  - performance
  - cpu
  - memory-leak
description: Analysiert Speicherlecks, CPU-Spitzen und I/O-Engpässe in Serveranwendungen.
---

# Performance Profiler Expert

## Role & Goal
...

## When to Use This Skill
...

## Core Principles & Evaluation Matrix
...

## Step-by-Step Workflow
...

## Reference Documentation
- [Memory Leak Detection](./references/memory-leaks.md)
```

---

## 3. Die 5 goldenen Qualitätsregeln für Skills

1. **Keine oberflächlichen Prompts**: Ein Skill muss fundierte Softwareentwicklungs-Standards enthalten (z.B. Schichtenreinheit, RFC-Konformität, AAA-Testmuster).
2. **Defensiver Sicherheitsfokus**: Sicherheitsbezogene Skills agieren strikt defensiv im autorisierten Testkontext. Keine schädlichen Payloads oder destruktiven Befehle.
3. **Progressive Disclosure**: Halte die `SKILL.md` prägnant. Umfangreiche Code-Beispiele, Tabellen oder Cheat Sheets gehören in `references/` oder `examples/`.
4. **Technologische Begründung**: Skills sollen nicht blind starre Patterns aufzwingen, sondern Vor- und Nachteile abwägen.
5. **Autarke Lauffähigkeit**: Der Skill muss für Claude Code völlig unabhängig von der Web-UI funktionieren.

---

## 4. Testen deines neuen Skills

Führe nach dem Hinzufügen deines Skills folgende Befehle im Terminal aus:

```bash
# 1. Manifest neu synchronisieren
npm run sync-skills

# 2. Validierungs- und Integritätstests ausführen
npm test

# 3. Produktionsbuild testen
npm run build
```

Wenn alle Tests grün sind und der Build fehlerfrei durchläuft, reiche deinen Pull Request ein!

