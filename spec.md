# SETE Sushi

## Current State
The app has a working Motoko backend with a `Product` type that includes:
`id, name, price, image, pieceCount, peopleRecommended, category, enabled`

The frontend `AdminProductsPage` calls `actor.addProduct(name, price, image, pieceCount, peopleRecommended, category)` — which matches the current backend signature.

**Known bugs causing "Failed to save product" and empty menu:**
1. The backend `seeded` flag is `true` from a prior deploy, so the Motoko seed block never re-runs — products array may be empty after upgrade.
2. The frontend `seedIfEmpty` and `useProductSeed` hooks both call `getAllProducts()` — but `getProducts()` (used in MenuPage) only returns `enabled=true` products. If these are broken at the actor level (e.g. IDL mismatch after a prior failed deploy), the menu shows "Ēdienkarte nav pieejama".
3. The requested product structure adds `description` and removes `pieceCount`/`peopleRecommended`, creating a type mismatch between the frontend and backend.

## Requested Changes (Diff)

### Add
- `description` field to `Product` type (Motoko + IDL + frontend types)
- Seed products matching the requested 5-item list: SETE 01, SETE 02, SETE 04, Spicy Tuna Roll, Pepsi
- Empty menu fallback message "Pašlaik ēdienkarte tiek gatavota."

### Modify
- `Product` type in `main.mo`: remove `pieceCount`, remove `peopleRecommended`, add `description`
- `addProduct` Motoko function signature: `(name, price, image, description, category) -> Product`
- `updateProduct` Motoko function signature: updated to match
- Backend seed data: replace old seed with new 5-product seed
- `backend.js` IDL: update Product record and all function signatures
- `store/types.ts`: update `Product` interface
- `utils/seedProducts.ts`: update seed list and `addProduct` call signature
- `hooks/useProductSeed.ts`: update seed list and `addProduct` call signature
- `pages/AdminProductsPage.tsx`: replace `pieceCount`/`peopleRecommended` fields with `description`, update save/edit logic
- `pages/MenuPage.tsx`: update product card rendering, show "Pašlaik ēdienkarte tiek gatavota." when empty
- `components/ProductCard.tsx`: update to use `description` instead of `pieceCount`/`peopleRecommended`
- Menu categories: SUSHI KOMPLEKTI (category=set), ROLI (category=addon), DZĒRIENI (category=drink)

### Remove
- `pieceCount` field from all Product types and forms
- `peopleRecommended` field from all Product types and forms

## Implementation Plan
1. Update `main.mo`: new Product type (id, name, description, price, category, image, enabled), update addProduct/updateProduct signatures, update seed data with 5 products
2. Update `backend.js` IDL to match new Product record and function signatures
3. Update `store/types.ts` Product interface
4. Update `utils/seedProducts.ts` seed data and addProduct call
5. Update `hooks/useProductSeed.ts` seed data and addProduct call
6. Update `pages/AdminProductsPage.tsx`: swap pieceCount/peopleRecommended for description
7. Update `pages/MenuPage.tsx`: update category labels, empty fallback message
8. Update `components/ProductCard.tsx` if it references pieceCount/peopleRecommended
