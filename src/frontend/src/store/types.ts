export type ProductCategory = "set" | "addon" | "drink";

export interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
  pieceCount: string;
  peopleRecommended: string;
  category: ProductCategory;
  enabled: boolean;
}

export interface CartItem {
  productId: number;
  name: string;
  price: number;
  quantity: number;
  image: string;
}

export interface Order {
  orderNumber: number;
  items: CartItem[];
  totalPrice: number;
  phone: string;
  customerName: string;
  address: string;
  deliveryType: "delivery" | "pickup";
  deliveryTime: string;
  createdAt: number;
}

export const INITIAL_PRODUCTS: Product[] = [
  {
    id: 1,
    name: "Veg Set",
    price: 27,
    pieceCount: "32 gab",
    peopleRecommended: "Ideāli 1–2 cilvēkiem",
    category: "set",
    enabled: true,
    image: "",
  },
  {
    id: 2,
    name: "Classic Set",
    price: 39,
    pieceCount: "48 gab",
    peopleRecommended: "Ideāli 2–3 cilvēkiem",
    category: "set",
    enabled: true,
    image: "",
  },
  {
    id: 3,
    name: "Premium Set",
    price: 52,
    pieceCount: "64 gab",
    peopleRecommended: "Ideāli 3–4 cilvēkiem",
    category: "set",
    enabled: true,
    image: "",
  },
  {
    id: 4,
    name: "Tempura Set",
    price: 45,
    pieceCount: "48 gab",
    peopleRecommended: "Ideāli 2–3 cilvēkiem",
    category: "set",
    enabled: true,
    image: "",
  },
  {
    id: 5,
    name: "Family Set",
    price: 69,
    pieceCount: "80 gab",
    peopleRecommended: "Ideāli 4–6 cilvēkiem",
    category: "set",
    enabled: true,
    image: "",
  },
  {
    id: 6,
    name: "Chef Special",
    price: 59,
    pieceCount: "64 gab",
    peopleRecommended: "Ideāli 3–4 cilvēkiem",
    category: "set",
    enabled: true,
    image: "",
  },
  {
    id: 7,
    name: "Party Set",
    price: 89,
    pieceCount: "96 gab",
    peopleRecommended: "Ideāli 6–8 cilvēkiem",
    category: "set",
    enabled: true,
    image: "",
  },
  {
    id: 8,
    name: "Spicy Tuna Roll",
    price: 9,
    pieceCount: "8 gab",
    peopleRecommended: "Pielikums",
    category: "addon",
    enabled: true,
    image: "",
  },
  {
    id: 9,
    name: "Salmon Roll",
    price: 8,
    pieceCount: "8 gab",
    peopleRecommended: "Pielikums",
    category: "addon",
    enabled: true,
    image: "",
  },
  {
    id: 10,
    name: "Crunch Roll",
    price: 10,
    pieceCount: "8 gab",
    peopleRecommended: "Pielikums",
    category: "addon",
    enabled: true,
    image: "",
  },
  {
    id: 11,
    name: "Pepsi",
    price: 2.5,
    pieceCount: "0.5L",
    peopleRecommended: "Dzēriens",
    category: "drink",
    enabled: true,
    image: "",
  },
  {
    id: 12,
    name: "Pepsi Max",
    price: 2.5,
    pieceCount: "0.5L",
    peopleRecommended: "Dzēriens",
    category: "drink",
    enabled: true,
    image: "",
  },
  {
    id: 13,
    name: "Mirinda",
    price: 2.5,
    pieceCount: "0.5L",
    peopleRecommended: "Dzēriens",
    category: "drink",
    enabled: true,
    image: "",
  },
  {
    id: 14,
    name: "Water",
    price: 2.0,
    pieceCount: "0.5L",
    peopleRecommended: "Dzēriens",
    category: "drink",
    enabled: true,
    image: "",
  },
];
