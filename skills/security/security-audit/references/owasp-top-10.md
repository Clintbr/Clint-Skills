# OWASP Top 10 Vulnerability Matrix & Remediation

## A01:2021 - Broken Access Control
- **Beschreibung**: Nutzer können auf Daten oder Aktionen außerhalb ihrer Berechtigung zugreifen (z.B. IDOR/BOLA).
- **Abhilfe**: Rollen- und Attribut-basierte Zugriffskontrolle (RBAC/ABAC) auf Service-Ebene. Niemals Objekt-IDs ungeprüft aus dem Request zur Abfrage verwenden.
```typescript
// Sicher: Prüft Besitzer-ID in der Abfrage
const document = await db.documents.findFirst({
  where: { id: documentId, organizationId: currentUser.orgId }
});
if (!document) throw new NotFoundException();
```

## A02:2021 - Cryptographic Failures
- **Beschreibung**: Übertragung oder Speicherung sensibler Daten in Klartext, veraltete Hash-Algorithmen (MD5, SHA1).
- **Abhilfe**: TLS 1.3 erzwingen, HSTS konfigurieren, Passwörter mit Argon2id oder bcrypt (Work Factor $\ge 12$) hashen, AES-256-GCM für symmetrische Datenverschlüsselung.

## A03:2021 - Injection
- **Beschreibung**: Nutzereingaben verändern die Semantik von SQL-, LDAP- oder OS-Befehlen.
- **Abhilfe**: Immer parametrisierte Queries / Prepared Statements verwenden.
```typescript
// Unsicher:
const query = `SELECT * FROM users WHERE email = '${email}'`;
// Sicher:
const query = `SELECT * FROM users WHERE email = $1`;
await client.query(query, [email]);
```

## A07:2021 - Identification and Authentication Failures
- **Beschreibung**: Fehlender Brute-Force-Schutz, schwache Passwortrichtlinien, unzureichende Session-Invalidierung.
- **Abhilfe**: Rate Limiting pro IP/Account, Multi-Faktor-Authentifizierung (MFA), sichere Cookie-Attribute (`SameSite=Strict`, `Secure`, `HttpOnly`).

