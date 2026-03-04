# SETE Sushi

## Current State
Full-stack sushi ordering platform with Motoko backend and React/TypeScript frontend. Backend handles products, orders, and blob storage for image uploads. Frontend has public menu/cart/checkout flow and admin panel for product management and order viewing.

## Requested Changes (Diff)

### Add
- Nothing new added.

### Modify
- **Backend state persistence fix**: Changed all mutable actor state variables from `var` to `stable var` so they survive canister upgrades. Without `stable var`, all products, orders, and counters were wiped on every deploy.
  - `stable var products`
  - `stable var orders`
  - `stable var nextProductId`
  - `stable var nextOrderNum` (also corrected start value from 1 to 100)
  - `stable var seeded`

### Remove
- Nothing removed.

## Implementation Plan
1. Patch `src/backend/main.mo`: prefix all top-level actor state with `stable var` and set `nextOrderNum` initial value to 100.
2. Validate frontend order submit flow (CheckoutPage → actor.submitOrder → success modal) — no changes needed, logic was already correct.
3. Validate admin orders page reads from backend via actor.getOrders() — no changes needed.
4. Validate admin product image upload flow (upload → blob URL → actor.updateProduct → stored in stable products) — no changes needed in frontend, persists now because backend is stable.
5. Build and deploy.
