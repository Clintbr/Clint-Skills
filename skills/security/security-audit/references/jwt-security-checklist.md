# JWT (JSON Web Token) Security Checklist

## 1. Algorithmen-Einschränkung (Algorithm Whitelisting)
- **Gefahr**: Header Manipulation (`{"alg": "none"}` oder Vertauschung von RSA mit HMAC `HS256`).
- **Best Practice**: Algorithmus in der Verifikation explizit festlegen:
```typescript
jwt.verify(token, publicKey, {
  algorithms: ['RS256'], // Verhindert 'none' und HMAC-Downgrades
  issuer: 'https://auth.company.com',
  audience: 'https://api.company.com'
});
```

## 2. Token-Speicherung im Client
- **Schlecht**: `localStorage` oder `sessionStorage` (anfällig für XSS; jedes Third-Party-Script kann das Token stehlen).
- **Gut**: `HttpOnly`, `Secure`, `SameSite=Strict` Cookie. Schützt effektiv gegen XSS-Token-Diebstahl.

## 3. Token-Lebensdauer & Rotation
- Access Tokens kurzlebig halten (10 bis 15 Minuten).
- Refresh Tokens mit Rotation (Refresh Token Rotation - RTR) und Einmalverwendung (Single-Use Detection).
- Serverseitige Revocation-Liste für sofortigen Ausschluss kompromittierter Sessions.

