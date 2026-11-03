# Backend Code Smells & Antipatterns

## 1. Fat Controller / Anemic Service
- **Symptom**: Controller enthält Hunderte Zeilen Validierungs-, Business- und Mappinglogik; Services sind reine Pass-Through-Wrapper.
- **Gefahr**: Unmöglich zu isolieren und zu testen; keine Wiederverwendbarkeit in CLI, Job-Schedulern oder Event-Listenern.
- **Lösung**: Verschiebe Business-Entscheidungen in den Service- oder Domain-Layer.

## 2. Leaky Domain Models (Entity-Exposure)
- **Symptom**: Controller akzeptiert direkt `@RequestBody User userEntity` und speichert diese mit `userRepository.save(userEntity)`.
- **Gefahr**: Mass Assignment Vulnerabilities (Angreifer sendet `isAdmin: true` mit), Bruch der Kapselung, Zirkelbezüge in JSON-Serialisierung.
- **Lösung**: Separate `CreateUserRequest` Records/DTOs und Validierung mittels Bean Validation (`@Valid`, `@NotNull`, `@Email`).

## 3. N+1 Database Query Problem
- **Symptom**: Eine Schleife über $N$ Einträge feuert jeweils eine separate SQL-Abfrage ab (`SELECT * FROM items WHERE order_id = ?`).
- **Gefahr**: Datenbanküberlastung, Latenzanstieg von Millisekunden auf Sekunden.
- **Lösung**: Verwende `JOIN FETCH` (JPA), `include` (Prisma/TypeORM) oder Batch-Fetching.

