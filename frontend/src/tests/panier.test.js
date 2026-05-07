import { describe, it, expect } from "vitest";
// Tests unitaires frontend — logique du panier

// Test 1 — addToCart ajoute un nouvel item
describe("addToCart", () => {
  it("devrait ajouter un nouvel item au panier", () => {
    const cart = [];
    const addToCart = (name, price) => {
      const existing = cart.find((item) => item.name === name);
      if (existing) {
        return cart.map((item) =>
          item.name === name ? { ...item, amount: item.amount + 1 } : item,
        );
      }
      return [...cart, { name, price, amount: 1 }];
    };

    const result = addToCart("Gâteau Vanille", 19.99);
    expect(result).toHaveLength(1);
    expect(result[0].name).toBe("Gâteau Vanille");
    expect(result[0].amount).toBe(1);
  });

  // Test 2 — addToCart incrémente si item existe
  it("devrait incrémenter la quantité si l'item existe déjà", () => {
    const cart = [{ name: "Gâteau Vanille", price: 19.99, amount: 1 }];
    const addToCart = (name, price) => {
      const existing = cart.find((item) => item.name === name);
      if (existing) {
        return cart.map((item) =>
          item.name === name ? { ...item, amount: item.amount + 1 } : item,
        );
      }
      return [...cart, { name, price, amount: 1 }];
    };

    const result = addToCart("Gâteau Vanille", 19.99);
    expect(result[0].amount).toBe(2);
  });

  // Test 3 — calcul du total
  it("devrait calculer le total correctement", () => {
    const cart = [
      { name: "Gâteau Vanille", price: 19.99, amount: 2 },
      { name: "Gâteau Chocolat", price: 24.99, amount: 1 },
    ];
    const LIVRAISON = 5.99;
    const TAXE = 0.15;

    const sousTotal = cart.reduce(
      (total, item) => total + item.price * item.amount,
      0,
    );
    const livraison = cart.length > 0 ? LIVRAISON : 0;
    const taxe = sousTotal * TAXE;
    const total = sousTotal + livraison + taxe;

    expect(sousTotal).toBeCloseTo(64.97);
    expect(total).toBeCloseTo(80.68, 1);
  });
});
