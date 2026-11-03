# Test Doubles & Mocking Guidelines

## 1. Wann mocken und wann nicht?
- **Mocke**:
  - Externe Services (Payment Provider wie Stripe, Email-Services, SMS-Gateways).
  - Zeit und Zufall (`Date.now()`, `Math.random()`, `crypto.randomUUID()`).
  - Nicht-deterministische I/O-Netzwerkverbindungen.
- **Mocke NICHT**:
  - Reine Domain-Logik, Entities oder Value Objects.
  - Standard-Bibliotheken (z.B. Lodash, Date-fns).
  - Alles, was schnell und deterministisch im Speicher läuft.

## 2. Mocking mit Vitest / Jest
```typescript
import { vi, describe, it, expect, beforeEach } from 'vitest';
import { UserService } from './userService';
import type { MailClient } from './mailClient';

describe('UserService', () => {
  let mailClientMock: MailClient;
  let service: UserService;

  beforeEach(() => {
    mailClientMock = {
      sendWelcomeEmail: vi.fn().mockResolvedValue({ messageId: 'msg-123' })
    };
    service = new UserService(mailClientMock);
  });

  it('should trigger welcome email upon successful user registration', async () => {
    await service.register('dev@example.com', 'SecurePass123!');

    expect(mailClientMock.sendWelcomeEmail).toHaveBeenCalledTimes(1);
    expect(mailClientMock.sendWelcomeEmail).toHaveBeenCalledWith('dev@example.com');
  });
});
```

