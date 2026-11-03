# REST API Design & Guidelines

## 1. URL Konventionen
- Ressourcen als Substantive im Plural: `/api/v1/orders`, `/api/v1/users/{userId}/addresses`.
- Niemals Verben in Pfaden verwenden (vermeide `/api/v1/createOrder` oder `/api/v1/deleteUser`).
- Filterung, Sortierung und Paginierung gehören in Query-Parameter:
  `GET /api/v1/invoices?status=PAID&page=0&size=20&sort=createdAt,desc`

## 2. HTTP-Methoden & Idempotenz
| Methode | Bedeutung | Idempotent | Safe | Erwarteter Statuscode |
|---|---|---|---|---|
| `GET` | Ressource abrufen | Ja | Ja | 200 OK |
| `POST` | Neue Unterressource erstellen | Nein | Nein | 201 Created (mit `Location` Header) |
| `PUT` | Vollständige Ersetzung | Ja | Nein | 200 OK / 204 No Content |
| `PATCH`| Partielle Änderung | Nein (meist) | Nein | 200 OK |
| `DELETE`| Ressource löschen | Ja | Nein | 204 No Content |

## 3. RFC 7807 / RFC 9457 Problem Details for HTTP APIs
Antwort bei Fehlern (`Content-Type: application/problem+json`):
```json
{
  "type": "https://api.example.com/errors/insufficient-funds",
  "title": "Insufficient Funds",
  "status": 402,
  "detail": "Your account balance is 40.00 EUR, but the order total is 99.50 EUR.",
  "instance": "/api/v1/accounts/123/transactions/789",
  "timestamp": "2026-03-15T10:30:00Z"
}
```

