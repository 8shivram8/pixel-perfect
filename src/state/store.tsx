import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import { toast } from "sonner";
import { getById, type Product } from "@/data/products";

export type CartLine = { id: string; color?: string; qty: number };
export type Order = {
  number: string;
  date: string;
  email: string;
  name: string;
  address: string;
  lines: { name: string; color?: string; qty: number; price: number }[];
  subtotal: number;
  discount: number;
  shipping: number;
  total: number;
  delivery: string;
  payment: string;
};

type Store = {
  cart: CartLine[];
  wishlist: string[];
  recent: string[];
  discountCode: string | null;
  bagOpen: boolean;
  setBagOpen: (v: boolean) => void;
  add: (p: Product, color?: string, qty?: number, silent?: boolean) => void;
  setQty: (id: string, color: string | undefined, qty: number) => void;
  remove: (id: string, color?: string) => void;
  clearCart: () => void;
  toggleWish: (id: string) => void;
  viewed: (id: string) => void;
  setDiscountCode: (c: string | null) => void;
  count: number;
  subtotal: number;
  saveOrder: (o: Order) => void;
  orders: Order[];
};

const Ctx = createContext<Store | null>(null);

function load<T>(key: string, fallback: T): T {
  try {
    const v = localStorage.getItem(key);
    return v ? (JSON.parse(v) as T) : fallback;
  } catch {
    return fallback;
  }
}

export function StoreProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<CartLine[]>([]);
  const [wishlist, setWishlist] = useState<string[]>([]);
  const [recent, setRecent] = useState<string[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [discountCode, setDiscountCode] = useState<string | null>(null);
  const [bagOpen, setBagOpen] = useState(false);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    setCart(load("fs-cart", []));
    setWishlist(load("fs-wish", []));
    setRecent(load("fs-recent", []));
    setOrders(load("fs-orders", []));
    setDiscountCode(load("fs-code", null));
    setReady(true);
  }, []);

  useEffect(() => {
    if (!ready) return;
    localStorage.setItem("fs-cart", JSON.stringify(cart));
    localStorage.setItem("fs-wish", JSON.stringify(wishlist));
    localStorage.setItem("fs-recent", JSON.stringify(recent));
    localStorage.setItem("fs-orders", JSON.stringify(orders));
    localStorage.setItem("fs-code", JSON.stringify(discountCode));
  }, [cart, wishlist, recent, orders, discountCode, ready]);

  const add = useCallback((p: Product, color?: string, qty = 1, silent = false) => {
    setCart((c) => {
      const i = c.findIndex((l) => l.id === p.id && l.color === color);
      if (i >= 0) return c.map((l, j) => (j === i ? { ...l, qty: Math.min(10, l.qty + qty) } : l));
      return [...c, { id: p.id, color, qty }];
    });
    if (!silent) {
      toast(`${p.name} added to bag`, {
        description: [color, `Qty ${qty}`].filter(Boolean).join(" · "),
        action: { label: "View bag", onClick: () => setBagOpen(true) },
      });
    }
  }, []);

  const setQty = useCallback((id: string, color: string | undefined, qty: number) => {
    setCart((c) => (qty <= 0 ? c.filter((l) => !(l.id === id && l.color === color)) : c.map((l) => (l.id === id && l.color === color ? { ...l, qty: Math.min(10, qty) } : l))));
  }, []);
  const remove = useCallback((id: string, color?: string) => setCart((c) => c.filter((l) => !(l.id === id && l.color === color))), []);
  const toggleWish = useCallback((id: string) => {
    setWishlist((w) => {
      const has = w.includes(id);
      toast(has ? "Removed from wishlist" : "Saved to wishlist", { description: getById(id)?.name });
      return has ? w.filter((x) => x !== id) : [...w, id];
    });
  }, []);
  const viewed = useCallback((id: string) => setRecent((r) => [id, ...r.filter((x) => x !== id)].slice(0, 8)), []);

  const count = cart.reduce((s, l) => s + l.qty, 0);
  const subtotal = cart.reduce((s, l) => s + (getById(l.id)?.price ?? 0) * l.qty, 0);

  const value = useMemo<Store>(
    () => ({
      cart, wishlist, recent, discountCode, bagOpen, setBagOpen, add, setQty, remove,
      clearCart: () => { setCart([]); setDiscountCode(null); },
      toggleWish, viewed, setDiscountCode, count, subtotal, orders,
      saveOrder: (o) => setOrders((os) => [o, ...os]),
    }),
    [cart, wishlist, recent, discountCode, bagOpen, add, setQty, remove, toggleWish, viewed, count, subtotal, orders],
  );
  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function useStore() {
  const s = useContext(Ctx);
  if (!s) throw new Error("useStore outside provider");
  return s;
}
