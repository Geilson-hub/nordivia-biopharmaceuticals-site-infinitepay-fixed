"use client";

import * as React from "react";

export type CartItem = {
  productId: string;
  slug: string;
  name: string;
  concentration: string;
  imagePath: string;
  unitCents: number;
  qty: number;
};

type CartState = {
  items: CartItem[];
  add: (item: Omit<CartItem, "qty">, qty?: number) => void;
  setQty: (productId: string, qty: number) => void;
  remove: (productId: string) => void;
  clear: () => void;
};

const CartContext = React.createContext<CartState | null>(null);
const KEY = "nordivia_cart_v1";

function load(): CartItem[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    return parsed;
  } catch {
    return [];
  }
}

function save(items: CartItem[]) {
  if (typeof window === "undefined") return;
  localStorage.setItem(KEY, JSON.stringify(items));
}

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = React.useState<CartItem[]>([]);

  React.useEffect(() => {
    setItems(load());
  }, []);

  const api: CartState = React.useMemo(() => {
    return {
      items,
      add: (item, qty = 1) => {
        setItems((prev) => {
          const idx = prev.findIndex((x) => x.productId === item.productId);
          const next = [...prev];
          if (idx >= 0) {
            next[idx] = { ...next[idx], qty: next[idx].qty + qty };
          } else {
            next.push({ ...item, qty });
          }
          save(next);
          return next;
        });
      },
      setQty: (productId, qty) => {
        setItems((prev) => {
          const next = prev.map((x) => (x.productId === productId ? { ...x, qty: Math.max(1, qty) } : x));
          save(next);
          return next;
        });
      },
      remove: (productId) => {
        setItems((prev) => {
          const next = prev.filter((x) => x.productId !== productId);
          save(next);
          return next;
        });
      },
      clear: () => {
        setItems([]);
        save([]);
      },
    };
  }, [items]);

  return <CartContext.Provider value={api}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = React.useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
}
