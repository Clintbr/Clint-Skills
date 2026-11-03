# Security Audit Case Study: API Authentication & IDOR Remediation

## Audit Befund 1: Broken Object Level Authorization (IDOR)
- **Schweregrad**: `CRITICAL`
- **CWE**: CWE-639 / OWASP A01:2021
- **Fundort**: `src/controllers/invoiceController.ts:34`

### Verwundbarer Code:
```typescript
app.get('/api/v1/invoices/:id', async (req, res) => {
  const { id } = req.params;
  // SCHWACHSTELLE: Jeder authentifizierte Nutzer kann beliebige Rechnungen abrufen!
  const invoice = await db.query('SELECT * FROM invoices WHERE id = $1', [id]);
  if (!invoice.rows[0]) return res.status(404).json({ error: 'Not found' });
  res.json(invoice.rows[0]);
});
```

### Behebung (Remediated Code):
```typescript
app.get('/api/v1/invoices/:id', authenticateToken, async (req: AuthenticatedRequest, res) => {
  const { id } = req.params;
  const userId = req.user.id;
  const tenantId = req.user.tenantId;

  // SICHER: Prüfung auf Mandanten- und Nutzerberechtigung
  const invoice = await db.query(
    'SELECT * FROM invoices WHERE id = $1 AND tenant_id = $2 AND (user_id = $3 OR $4 = ANY(roles))',
    [id, tenantId, userId, 'ADMIN']
  );

  if (!invoice.rows[0]) {
    // 404 verhindert auch User Enumeration
    return res.status(404).json({
      type: 'https://example.com/errors/not-found',
      title: 'Invoice Not Found',
      status: 404
    });
  }

  res.json(invoice.rows[0]);
});
```

