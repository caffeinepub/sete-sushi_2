# SETE Sushi

## Current State
New project. No existing code.

## Requested Changes (Diff)

### Add
- Full sushi ordering website in Latvian for SETE restaurant in Rīga
- Routes: /home, /menu, /cart, /checkout
- Global layout with header (logo "SETE") and CartIcon with item count badge
- HeroSection: title "SETE", subtitle "Premium sushi Rīgā", CTA button "Apskatīt piedāvājumus"
- FeatureSection: 3 icon-based features (Sastāvdaļas, Meistarība, Sushi komplekti)
- Footer with working hours: Pirmdiena–Svētdiena 11:00–22:00
- ProductGrid and ProductCard components grouped by category (Sets → Addons → Drinks)
- ProductCard shows: image, name, pieceCount, peopleRecommended, price, "Pievienot grozam" button
- Cart state persisted across pages (localStorage); items: productId, name, price, quantity, image
- CartPage with quantity controls, remove item, order total
- StickyCartBar: appears when cart non-empty, shows item count + total, "SKATĪT GROZU" button
- Toast notification "Pievienots grozam" on add to cart
- CheckoutForm: phone (required), name (optional), deliveryType (delivery/pickup), address (required if delivery), deliveryTime (optional)
- Pickup address display: "Blaumaņa iela 34-2, Rīga"
- OrderSuccessModal: shown after submit, Latvian success text, clears cart only on modal close
- Backend: Product and Order storage; seeded with 14 initial products

### Modify
- Nothing (new project)

### Remove
- Nothing (new project)

## Implementation Plan
1. Backend canister with Product and Order types; seed initial products; getProducts, addOrder queries/updates
2. Frontend global state: cart (localStorage), products from backend
3. /home: HeroSection + FeatureSection + Footer
4. /menu: ProductGrid grouped by category (set/addon/drink)
5. /cart: CartPage with quantity controls and totals
6. /checkout: CheckoutForm with validation and order submission
7. OrderSuccessModal with cart-clear-on-close logic
8. StickyCartBar visible on all pages when cart non-empty
9. CartIcon in header with badge count
10. Premium dark design (#1b1412 bg, #d4af37 accent, #f5f5f5 text)
