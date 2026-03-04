# SETE Sushi

## Current State

Full-stack sushi ordering website (Motoko backend + React frontend) already exists with:
- `/home`, `/menu`, `/cart`, `/checkout`, `/admin`, `/admin/products`, `/admin/orders` routes
- 14 seeded products (7 sets, 3 addons, 4 drinks)
- Cart persisted in localStorage via Zustand
- Orders saved to backend canister with `submitOrder()` / `getOrders()`
- Admin panel with product CRUD, image upload via blob storage, enable/disable toggle
- Sticky cart bar, success modal, order form with consent checkbox

## Requested Changes (Diff)

### Add

1. **Two hero buttons** — "Pasūtīt tagad" (primary gold, links to `/menu`) and "Apskatīt piedāvājumu" (secondary outlined, links to `/menu`) replacing current single CTA.
2. **Featured product card on homepage** — a highlighted card below the two CTA buttons, labeled "⭐ Populārākais komplekts – SETE 04" (maps to Tempura Set, 45€), linking to `/menu`.
3. **SEO paragraph on homepage** — static text "Sushi piegāde Rīgā – svaigi sushi komplekti no SETE." in the hero or feature section.
4. **Upsell modal** — when a "set" category product is added to cart, show a modal "Bieži pievieno kopā" with quick-add cards for Spicy Tuna Roll (+9€), Salmon Roll (+8€), and Pepsi (+2.50€). Each card has an "Add" button; the modal has a "Turpināt" (close) button.
5. **Orders Kanban board in admin** — replace the current expandable list on `/admin/orders` with a 4-column board: NEW | PREPARING | READY | COMPLETED. Each order card shows: order number, phone, items summary, total price, time. Admin can drag or use buttons to move cards between columns. Order status field needs to be wired to backend via new `updateOrderStatus(orderNumber, status)` function.
6. **Sticky cart bar format update** — change label from "X preces grozā" to "X produkti | Y€" and button text stays "SKATĪT GROZU".

### Modify

1. **Menu categories** — rename/restructure the category display labels and order:
   - `set` → shown in two sections:
     - "KOMBO" (show sets with id ≤ 4 or a new `isKombo` flag, for now use first 4 sets)
     - "SUSHI KOMPLEKTI" (remaining sets)
   - New section "POPULĀRĀKAIS" — show the single product marked as SETE 04 / Tempura Set highlighted
   - `addon` → "ROLI (+9€)"
   - `drink` → "DZĒRIENI"
   - Category order: KOMBO → POPULĀRĀKAIS → SUSHI KOMPLEKTI → ROLI → DZĒRIENI
2. **Homepage hero** — update title from "SETE" to "SETE – Premium sushi Rīgā" as the subtitle/supporting text combination; keep SETE as the giant gold logo. Add both CTA buttons. Add featured product card.
3. **StickyCartBar label** — update format to "X produkti | Y€".
4. **AdminOrdersPage** — replace flat list with Kanban column board layout. Each column displays orders of that status. Add status-change controls on each card.

### Remove

- Nothing removed. Existing functionality preserved.

## Implementation Plan

1. **HomePage.tsx** — Add second CTA button "Pasūtīt tagad" (gold filled) + "Apskatīt piedāvājumu" (outlined). Add featured product card section. Add SEO text paragraph.
2. **MenuPage.tsx** — Remap category display logic: split `set` into KOMBO (first 4) and SUSHI KOMPLEKTI (rest), add POPULĀRĀKAIS section (Tempura Set), rename `addon` → ROLI, `drink` → DZĒRIENI. Update category order.
3. **ProductCard.tsx** + new **UpsellModal.tsx** — after adding a set to cart, open upsell modal with 3 quick-add items. Modal closes on "Turpināt" or outside click.
4. **StickyCartBar.tsx** — change label format to "X produkti | Y€".
5. **AdminOrdersPage.tsx** — rewrite to Kanban board with 4 columns. Add `updateOrderStatus` actor call on status change buttons.
6. **backend/main.mo** — Add `updateOrderStatus(orderNum: Nat, status: Text): async Bool` function. Add `status` field to Order type (default "new"). Update `getOrders` to return status field.
7. **backend.js IDL** — add `updateOrderStatus` to IDL factory.
