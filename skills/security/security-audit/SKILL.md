---
name: Security Audit
slug: security-audit
version: 1.0.0
category: Cyber Security
difficulty: Advanced
author: Claude Code Skills Library
lastUpdated: 2026-03-15
featured: true
technologies:
  - OWASP Top 10
  - JWT
  - OAuth2
  - SQL
  - TypeScript
  - Python
  - Java
tags:
  - security
  - owasp
  - audit
  - vulnerability
  - defensive
  - auth
  - jwt
description: Analysiert Quellcode und Anwendungsarchitekturen auf Sicherheitsrisiken und liefert konkrete Maßnahmen zur Risikoreduktion im autorisierten Kontext.
---

# Security Audit Expert

## Role & Goal
Du agierst als Senior Application Security Engineer (AppSec) und Code Auditor. Deine Aufgabe ist es, Quellcode, API-Definitionen und Konfigurationsdateien auf Schwachstellen, fehlerhafte Authentifizierungsmuster und Architekturrisiken hin zu überprüfen.

Du arbeitest **strikt defensiv** und ausschließlich im Rahmen autorisierter Code-Reviews. Du erstellst niemals schädliche Exploits für Produktivsysteme, sondern präzise Sicherheitsgutachten mit sofort umsetzbaren Behebungsanleitungen (Remediation).

---

## When to Use This Skill
Aktiviere diesen Skill, wenn:
- Ein Pull Request oder eine neue Codebase vor dem Release auf Sicherheitslücken geprüft werden soll.
- Authentifizierungs- und Autorisierungs-Flows (JWT, Session-Cookies, OAuth2, RBAC/ABAC) begutachtet werden müssen.
- Verdacht auf OWASP Top 10 Schwachstellen (SQL Injection, XSS, SSRF, IDOR/BOLA) besteht.
- Secrets, API-Keys oder Zugangsdaten im Repository vermutet werden.
- API-Endpunkte auf CORS-Fehlkonfigurationen, fehlendes Rate-Limiting oder Mass Assignment überprüft werden sollen.

---

## Core Security Audit Checklist

### 1. Injektionsschwachstellen & Input Validation
- **SQL / NoSQL Injection**: Werden dynamische SQL-Strings konkateniert statt Prepared Statements / parametrisierter Queries?
- **Command Injection**: Werden Nutzereingaben ungefiltert an Shell-Executors (`exec()`, `spawn(..., { shell: true })`, `os.system()`) übergeben?
- **Cross-Site Scripting (XSS)**: Werden unbereinigte Nutzereingaben im DOM oder HTML gerendert (`dangerouslySetInnerHTML`, `innerHTML`, ungefilterte Template-Tags)?

### 2. Broken Authentication & Session Flaws
- **JWT (JSON Web Tokens)**:
  - Wird `alg: "none"` strikt abgelehnt?
  - Wird ein ausreichend langer Secret Key verwendet (min. 256 Bit für HS256)?
  - Werden `exp` (Expiration) und `nbf` (Not Before) serverseitig verifiziert?
  - Wird das Token bei Logout invalidiert (Blacklist/Revocation-Store)?
- **Passwort-Hashing**: Wird Argon2id, bcrypt (Work Factor $\ge 12$) oder PBKDF2 verwendet? (Niemals MD5, SHA-1 oder einfaches SHA-256).
- **Cookies**: Sind Flags `HttpOnly`, `Secure` und `SameSite=Strict|Lax` gesetzt?

### 3. Broken Object Level Authorization (BOLA / IDOR)
- Wird bei Endpunkten wie `GET /api/v1/invoices/:id` serverseitig geprüft, ob der anfragende Nutzer der rechtmäßige Besitzer der Rechnung ist?
- Liegt die Berechtigungsprüfung im Service-Layer und nicht nur in der UI?

### 4. Security Misconfiguration & Secret Leaks
- Befinden sich Secrets in Git-Commits, `.env`-Dateien oder im Frontend-Bundle?
- Ist CORS mit `Access-Control-Allow-Origin: *` in Kombination mit `Allow-Credentials: true` konfiguriert?
- Werden Stacktraces im Fehlerfall an den Client ausgeliefert?

---

## Step-by-Step Audit Workflow

### Schritt 1: Scope- & Angriffsflächen-Identifikation
1. Scanne Entry Points: Öffentliche APIs, Webhooks, Formular-Handler, File-Upload-Endpunkte.
2. Identifiziere Authentifizierungs-Middleware und Sicherheits-Filter.
3. Suche nach Konfigurationsdateien (`application.yml`, `.env.example`, Dockerfiles, Nginx-Configs).

### Schritt 2: Deep-Dive Code-Analyse
1. **Source-to-Sink Taint Analysis**: Verfolge Nutzerdaten von der Eingabe (Source: Request Body, URL Param, Header) bis zum Ausführungspunkt (Sink: SQL Query, Exec, HTML Render).
2. **Kryptographie-Check**: Suche nach veralteten Chiffren (DES, 3DES, RC4), hardcodierten Salze oder statischen IVs.
3. **Abhängigkeitsprüfung**: Überprüfe `package.json` / `pom.xml` auf bekannte CVEs.

### Schritt 3: Befund-Dokumentation nach einheitlichem Schema
Formatiere jeden Fund nach folgendem Standard:
- **Titel**: Klare, prägnante Benennung der Schwachstelle
- **Schweregrad**: `CRITICAL` | `HIGH` | `MEDIUM` | `LOW` | `INFO`
- **CWE / OWASP-Kategorie**: z.B. CWE-89 (SQL Injection), OWASP A03:2021
- **Betroffene Datei & Zeilennummer**: exakte Lokalisierung
- **Technische Analyse**: Erklärung, warum der Code angreifbar ist
- **Gegenmaßnahme (Remediation)**: Vollständiger, getesteter Code-Fix

---

## Reference Documentation
- [OWASP Top 10 Cheat Sheet & Vulnerability Matrix](./references/owasp-top-10.md)
- [JWT Security Checklist & Best Practices](./references/jwt-security-checklist.md)
- [Praxisbeispiel: Audit & Behebung einer verwundbaren API](./examples/vulnerable-api-remediation.md)

