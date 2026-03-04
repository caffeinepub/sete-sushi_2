import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { CartItem, Order, Product } from "./types";
import { INITIAL_PRODUCTS } from "./types";

// ── Products store ─────────────────────────────────────────────
interface ProductsState {
  products: Product[];
  setProducts: (products: Product[]) => void;
  updateProduct: (product: Product) => void;
  addProduct: (product: Product) => void;
  toggleProduct: (id: number) => void;
}

export const useProductsStore = create<ProductsState>()(
  persist(
    (set) => ({
      products: INITIAL_PRODUCTS,
      setProducts: (products) => set({ products }),
      updateProduct: (updated) =>
        set((state) => ({
          products: state.products.map((p) =>
            p.id === updated.id ? updated : p,
          ),
        })),
      addProduct: (product) =>
        set((state) => ({ products: [...state.products, product] })),
      toggleProduct: (id) =>
        set((state) => ({
          products: state.products.map((p) =>
            p.id === id ? { ...p, enabled: !p.enabled } : p,
          ),
        })),
    }),
    {
      name: "sete_products",
      // Only seed if never stored before
      merge: (persisted, current) => {
        const p = persisted as Partial<ProductsState>;
        if (p.products && p.products.length > 0) {
          return { ...current, products: p.products };
        }
        return current;
      },
    },
  ),
);

// ── Cart store ─────────────────────────────────────────────────
interface CartState {
  items: CartItem[];
  addItem: (item: Omit<CartItem, "quantity">) => void;
  removeItem: (productId: number) => void;
  updateQuantity: (productId: number, quantity: number) => void;
  clearCart: () => void;
  itemCount: () => number;
  totalPrice: () => number;
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      addItem: (newItem) =>
        set((state) => {
          const existing = state.items.find(
            (i) => i.productId === newItem.productId,
          );
          if (existing) {
            return {
              items: state.items.map((i) =>
                i.productId === newItem.productId
                  ? { ...i, quantity: i.quantity + 1 }
                  : i,
              ),
            };
          }
          return { items: [...state.items, { ...newItem, quantity: 1 }] };
        }),
      removeItem: (productId) =>
        set((state) => ({
          items: state.items.filter((i) => i.productId !== productId),
        })),
      updateQuantity: (productId, quantity) =>
        set((state) => {
          if (quantity <= 0) {
            return {
              items: state.items.filter((i) => i.productId !== productId),
            };
          }
          return {
            items: state.items.map((i) =>
              i.productId === productId ? { ...i, quantity } : i,
            ),
          };
        }),
      clearCart: () => set({ items: [] }),
      itemCount: () => get().items.reduce((sum, i) => sum + i.quantity, 0),
      totalPrice: () =>
        get().items.reduce((sum, i) => sum + i.price * i.quantity, 0),
    }),
    { name: "sete_cart" },
  ),
);

// ── Orders store ───────────────────────────────────────────────
interface OrdersState {
  orders: Order[];
  nextOrderNumber: number;
  addOrder: (order: Omit<Order, "orderNumber" | "createdAt">) => Order;
}

export const useOrdersStore = create<OrdersState>()(
  persist(
    (set, get) => ({
      orders: [],
      nextOrderNumber: 1,
      addOrder: (orderData) => {
        const orderNumber = get().nextOrderNumber;
        const order: Order = {
          ...orderData,
          orderNumber,
          createdAt: Date.now(),
        };
        set((state) => ({
          orders: [order, ...state.orders],
          nextOrderNumber: state.nextOrderNumber + 1,
        }));
        return order;
      },
    }),
    { name: "sete_orders" },
  ),
);

// ── Admin session (sessionStorage) ────────────────────────────
interface AdminState {
  isAdmin: boolean;
  login: (password: string) => boolean;
  logout: () => void;
}

export const useAdminStore = create<AdminState>()((set) => ({
  isAdmin:
    typeof window !== "undefined"
      ? sessionStorage.getItem("sete_admin") === "true"
      : false,
  login: (password) => {
    if (password === "1234") {
      sessionStorage.setItem("sete_admin", "true");
      set({ isAdmin: true });
      return true;
    }
    return false;
  },
  logout: () => {
    sessionStorage.removeItem("sete_admin");
    set({ isAdmin: false });
  },
}));
