# Leitfaden für die Skill-Erstellung

Dieser Leitfaden definiert den Qualitätsstandard für alle in Clint-Skills aufgenommenen Fähigkeiten.

---

## 1. Aufbau einer `SKILL.md`

Jede `SKILL.md` muss folgender Struktur folgen:

```markdown
---
name: Skill Name
slug: skill-slug
version: 1.0.0
category: [Backend Development | Cyber Security | AI Engineering | Testing & Quality Assurance]
difficulty: [Beginner | Intermediate | Advanced]
author: Autor Name
lastUpdated: YYYY-MM-DD
featured: [true | false]
technologies:
  - Tech 1
  - Tech 2
tags:
  - tag1
  - tag2
description: Prägnante Zusammenfassung (mindestens 10 Zeichen, maximal 200 Zeichen)
---

# Skill Name

## Role & Goal
Definiert die Persona (z.B. "Senior Backend Architect") und das primäre Ziel des Agenten.

## When to Use This Skill
Konkrete Kriterien und Trigger, wann dieser Skill zum Einsatz kommen soll.

## Core Principles & Evaluation Matrix
Die fachlichen Grundlagen, Qualitätsmetriken oder Bewertungsmatrizen.

## Step-by-Step Workflow
Schrittweise Vorgehensweise, die Claude Code abarbeitet (z.B. Analyse -> Befund -> Refactoring).

## Reference Documentation
Verlinkung auf mitgelieferte Markdown-Dateien im Ordner `references/`.
```

---

## 2. Progressive Disclosure

Das wichtigste Prinzip für Claude Code Skills:
- **`SKILL.md`**: Leichtgewichtig halten. Enthält die Entscheidungslogik und den Workflow.
- **`references/`**: Vertiefende Cheatsheets, API-Richtlinien und theoretische Hintergründe. Claude liest diese erst, wenn eine spezifische Frage danach verlangt.
- **`examples/`**: Konkrete Code-Ausschnitte mit Vorher/Nachher-Gegenüberstellungen.

---

## 3. Sicherheits- und Ethikstandards

- **Defensive Ausrichtung**: Skills dürfen keine Angriffswerkzeuge für unautorisierte Systeme sein.
- **Keine Zerstörung**: Skripte dürfen niemals zerstörerische Befehle (`rm -rf /`, `DROP DATABASE`) ohne explizite Sicherheitswarnungen enthalten.
- **Reproduzierbarkeit**: Befunde müssen durch genaue Code-Zeilen und nachvollziehbare Erklärungen untermauert werden.

