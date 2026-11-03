# Full-Featured Vitest Test Suite Example

```typescript
import { describe, it, expect, vi, beforeEach } from 'vitest';

// Das Domain-Modell
class ShoppingCart {
  private items: { id: string; price: number; quantity: number }[] = [];

  addItem(id: string, price: number, quantity: number) {
    if (price < 0 || quantity <= 0) {
      throw new Error('Invalid item parameters');
    }
    const existing = this.items.find(i => i.id === id);
    if (existing) {
      existing.quantity += quantity;
    } else {
      this.items.push({ id, price, quantity });
    }
  }

  getTotal(): number {
    return this.items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  }

  getItemCount(): number {
    return this.items.reduce((sum, item) => sum + item.quantity, 0);
  }
}

describe('ShoppingCart Unit Tests', () => {
  let cart: ShoppingCart;

  beforeEach(() => {
    cart = new ShoppingCart();
  });

  describe('Happy Paths', () => {
    it('should start with an empty cart and total of 0', () => {
      expect(cart.getTotal()).toBe(0);
      expect(cart.getItemCount()).toBe(0);
    });

    it('should correctly sum prices when multiple items are added', () => {
      cart.addItem('item-1', 19.99, 2);
      cart.addItem('item-2', 5.00, 1);

      expect(cart.getTotal()).toBeCloseTo(44.98, 2);
      expect(cart.getItemCount()).toBe(3);
    });

    it('should aggregate quantities when duplicate items are added', () => {
      cart.addItem('item-1', 10.00, 1);
      cart.addItem('item-1', 10.00, 2);

      expect(cart.getItemCount()).toBe(3);
      expect(cart.getTotal()).toBe(30.00);
    });
  });

  describe('Edge Cases & Error Handling', () => {
    it('should throw an error when quantity is zero or negative', () => {
      expect(() => cart.addItem('bad-item', 10, 0)).toThrow('Invalid item parameters');
      expect(() => cart.addItem('bad-item', 10, -5)).toThrow('Invalid item parameters');
    });

    it('should throw an error when price is negative', () => {
      expect(() => cart.addItem('bad-item', -1.5, 1)).toThrow('Invalid item parameters');
    });
  });
});
```

