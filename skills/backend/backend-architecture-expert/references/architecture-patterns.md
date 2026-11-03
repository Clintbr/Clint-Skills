# Backend Architecture Patterns & Schichtenreinheit

## 1. Layered Architecture (N-Tier)
Die klassische Drei- bzw. Vierschichten-Architektur:
```
┌────────────────────────────────────────┐
│ Presentation / API Layer               │ (Controller, Route Handlers, DTOs)
└───────────────────┬────────────────────┘
                    │ ruft auf
┌───────────────────▼────────────────────┐
│ Application / Service Layer            │ (Transaktionsgrenzen, Orchestrierung)
└───────────────────┬────────────────────┘
                    │ ruft auf
┌───────────────────▼────────────────────┐
│ Domain Layer                           │ (Geschäftsregeln, Entities, Value Objects)
└───────────────────┬────────────────────┘
                    │ ruft auf
┌───────────────────▼────────────────────┐
│ Persistence / Infrastructure Layer     │ (Repositories, Database Drivers, External APIs)
└────────────────────────────────────────┘
```

### Typische Schichten-Verstöße und deren Behebung:
- **Verstoß 1**: Controller greift direkt auf Repository zu.
  *Problem*: Umgeht Transaktionsverwaltung, Security-Checks und Wiederverwendbarkeit.
  *Lösung*: Striktes Routing über `OrderService`.
- **Verstoß 2**: Entity wird als Return-Type im Controller deklariert.
  *Problem*: LazyInitializationException bei JPA, unbeabsichtigtes Offenlegen interner Spalten (z.B. `passwordHash`).
  *Lösung*: Mapping in `OrderResponseDTO` mit MapStruct oder manuellem Mapper.

## 2. Hexagonal Architecture (Ports and Adapters)
Empfohlen bei hoher Domänenkomplexität und häufig wechselnden Infrastrukturkomponenten:
- **Core / Domain**: Keine Abhängigkeiten zu Frameworks (weder Spring noch TypeORM noch Express).
- **Inbound Ports**: Interfaces, die von Controllern aufgerufen werden (z.B. `CreateOrderUseCase`).
- **Outbound Ports**: Interfaces für Datenzugriff oder Messaging (z.B. `OrderPersistencePort`).
- **Adapters**: Konkrete Implementierungen (JPA-Adapter, Kafka-Producer, REST-Controller).

## 3. Package-by-Feature vs. Package-by-Layer
- **Small Apps (< 15 Klassen)**: Package-by-Layer akzeptabel (`controllers`, `services`, `models`).
- **Mid-to-Large Apps**: Package-by-Feature bevorzugt (`users/`, `billing/`, `catalog/`), um Modularität und spätere Service-Auslagerung vorzubereiten.

