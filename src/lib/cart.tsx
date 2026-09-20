"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";

type CartLine = { id: string; name: string; price: number; qty: number };

type CartContextValue = {
  lines: CartLine[];
  count: number;
  total: number;
  lastAdded: string | null;
  add: (item: Omit<CartLine, "qty">) => void;
};

const CartContext = createContext<CartContextValue | null>(null);

export function CartProvider({ children }: { children: ReactNode }) {
  const [lines, setLines] = useState<CartLine[]>([]);
  const [lastAdded, setLastAdded] = useState<string | null>(null);

  const add = useCallback((item: Omit<CartLine, "qty">) => {
    setLines((current) => {
      const existing = current.find((line) => line.id === item.id);
      if (existing) {
        return current.map((line) =>
          line.id === item.id ? { ...line, qty: line.qty + 1 } : line,
        );
      }
      return [...current, { ...item, qty: 1 }];
    });
    setLastAdded(item.name);
  }, []);

  const value = useMemo<CartContextValue>(() => {
    const count = lines.reduce((sum, line) => sum + line.qty, 0);
    const total = lines.reduce((sum, line) => sum + line.qty * line.price, 0);
    return { lines, count, total, lastAdded, add };
  }, [lines, lastAdded, add]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) throw new Error("useCart precisa estar dentro de <CartProvider>");
  return context;
}
