/**
 * Seed initial products into the backend if products storage is empty.
 * Called on app startup from MenuPage and AdminProductsPage.
 */

export const INITIAL_PRODUCTS = [
  // Sets
  {
    name: "Veg Set",
    price: 27.0,
    pieceCount: "32 gab",
    peopleRecommended: "Ideāli 1–2 cilvēkiem",
    category: "set",
  },
  {
    name: "Classic Set",
    price: 39.0,
    pieceCount: "48 gab",
    peopleRecommended: "Ideāli 2–3 cilvēkiem",
    category: "set",
  },
  {
    name: "Premium Set",
    price: 52.0,
    pieceCount: "64 gab",
    peopleRecommended: "Ideāli 3–4 cilvēkiem",
    category: "set",
  },
  {
    name: "Tempura Set",
    price: 45.0,
    pieceCount: "48 gab",
    peopleRecommended: "Ideāli 2–3 cilvēkiem",
    category: "set",
  },
  {
    name: "Family Set",
    price: 69.0,
    pieceCount: "80 gab",
    peopleRecommended: "Ideāli 4–6 cilvēkiem",
    category: "set",
  },
  {
    name: "Chef Special",
    price: 59.0,
    pieceCount: "64 gab",
    peopleRecommended: "Ideāli 3–4 cilvēkiem",
    category: "set",
  },
  {
    name: "Party Set",
    price: 89.0,
    pieceCount: "96 gab",
    peopleRecommended: "Ideāli 6–8 cilvēkiem",
    category: "set",
  },
  // Addons
  {
    name: "Spicy Tuna Roll",
    price: 9.0,
    pieceCount: "8 gab",
    peopleRecommended: "Pielikums",
    category: "addon",
  },
  {
    name: "Salmon Roll",
    price: 8.0,
    pieceCount: "8 gab",
    peopleRecommended: "Pielikums",
    category: "addon",
  },
  {
    name: "Crunch Roll",
    price: 10.0,
    pieceCount: "8 gab",
    peopleRecommended: "Pielikums",
    category: "addon",
  },
  // Drinks
  {
    name: "Pepsi",
    price: 2.5,
    pieceCount: "0.5L",
    peopleRecommended: "Dzēriens",
    category: "drink",
  },
  {
    name: "Pepsi Max",
    price: 2.5,
    pieceCount: "0.5L",
    peopleRecommended: "Dzēriens",
    category: "drink",
  },
  {
    name: "Mirinda",
    price: 2.5,
    pieceCount: "0.5L",
    peopleRecommended: "Dzēriens",
    category: "drink",
  },
  {
    name: "Water",
    price: 2.0,
    pieceCount: "0.5L",
    peopleRecommended: "Dzēriens",
    category: "drink",
  },
] as const;

export async function seedIfEmpty(
  actor: Record<string, (...args: unknown[]) => Promise<unknown[]>>,
): Promise<boolean> {
  try {
    const existing = await actor.getAllProducts();
    if (existing && existing.length > 0) return false;

    // Storage is empty — seed all initial products
    for (const p of INITIAL_PRODUCTS) {
      await actor.addProduct(
        p.name,
        p.price,
        "", // image will be uploaded via admin
        p.pieceCount,
        p.peopleRecommended,
        p.category,
      );
    }
    return true;
  } catch (err) {
    console.error("seedIfEmpty failed:", err);
    return false;
  }
}
