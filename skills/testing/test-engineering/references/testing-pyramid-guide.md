# Testing Pyramid & Test Architecture

## Die Schichten der Testpyramide

```
             / \
            /   \
           / E2E \       10% (Playwright / Cypress) - End-to-End User Journeys
          /-------\
         / Integr. \     20% (Testcontainers / Supertest) - Modulgrenzen & DB
        /-----------\
       /    Unit     \   70% (Vitest / JUnit) - Geschäftsregeln & Algorithmen
      /---------------\
```

### Warum die Pyramide wichtig ist:
- **Geschwindigkeit**: Unit-Tests laufen in Millisekunden. Wenn CI-Pipelines länger als 5 Minuten dauern, sinkt die Entwicklerproduktivität drastisch.
- **Fehlerlokalisierung**: Schlägt ein Unit-Test fehl, kennt man sofort Zeile und Bedingung. Schlägt ein E2E-Test fehl, ist die Ursachenforschung oft zeitaufwendig.
- **Wartungskosten**: E2E-Tests sind am anfälligsten für UI-Änderungen und Netzwerk-Latenzen (Flakiness).

## Vermeidung von Flaky Tests
1. Keine `sleep(1000)` oder festen Delays verwenden! Verwende polling / `waitFor`.
2. Saubere Isolation pro Testfall (`beforeEach` / `afterEach` Daten-Reset).
3. Eindeutige Testdaten: Verwende Zufallswerte oder Zeitstempel in Test-IDs (z.B. `test-user-${Date.now()}@example.com`).

