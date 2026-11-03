# Getting Started Guide

Dieser Leitfaden führt dich durch die Nutzung der **Clint-Skills** Plattform und erklärt, wie du AI-Skills in deinen täglichen Entwicklungsalltag mit Claude Code integrierst.

---

## 1. Was ist Clint-Skills?

Clint-Skills ist eine kuratierte Bibliothek von Experten-Modulen für **Claude Code**. Anstatt Claude bei jeder Sitzung mühsam lange Prompts zu schreiben, installierst du einen Skill einmalig in deinem Projekt.

Sobald der Skill in deinem Projekt liegt, erkennt Claude Code die Anweisungen automatisch und wendet die entsprechenden Architekturregeln, Sicherheitschecks oder Teststandards an.

---

## 2. Einen Skill finden und auswählen

1. Navigiere auf der Plattform zur [Explore Skills](/skills) Seite.
2. Nutze die Volltextsuche oder filtere nach:
   - **Kategorie** (z.B. *Backend Development*, *Cyber Security*)
   - **Schwierigkeitsgrad** (*Beginner*, *Intermediate*, *Advanced*)
   - **Tags & Technologien** (z.B. *OWASP*, *RAG*, *Vitest*, *Spring Boot*)
3. Klicke auf eine Skill-Karte, um die dynamische Detailseite zu öffnen.

---

## 3. Den Skill in dein Projekt integrieren

Auf der Skill-Detailseite hast du mehrere Optionen:

### Option A: ZIP-Bundle herunterladen (Empfohlen)
1. Klicke auf **Download ZIP**.
2. Entpacke das Archiv in das Verzeichnis deines Projekts.
3. Die Verzeichnisstruktur sieht wie folgt aus:
   ```
   mein-projekt/
     └── .claude/
           └── skills/
                 └── backend-architecture-expert/
                       ├── SKILL.md
                       ├── references/
                       └── examples/
   ```

### Option B: Schnelle Terminal-Installation
Kopiere den generierten Befehl aus dem Reiter **Installation Guide** in dein Terminal:
```bash
mkdir -p .claude/skills/backend-architecture-expert
curl -sSL -o .claude/skills/backend-architecture-expert/SKILL.md "http://localhost:3000/skills/backend-architecture-expert/SKILL.md"
```

---

## 4. Den Skill in Claude Code anwenden

Starte Claude Code in deinem Projekt:
```bash
claude
```

Stelle Claude nun eine Aufgabe im Fachbereich des Skills:
> "Überprüfe unseren UserController auf Schichtenreinheit und schlage ein Refactoring vor."

Claude Code erkennt automatisch den installierten `Backend Architecture Expert` Skill, lädt bei Bedarf die Referenzen und wendet die definierten Standards exakt an.

