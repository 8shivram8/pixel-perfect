import { Link } from "@tanstack/react-router";
import { Minus, Plus } from "lucide-react";
import { Sheet, SheetContent, SheetTitle } from "@/components/ui/sheet";
import { useStore } from "@/state/store";
import { getById } from "@/data/products";
import { SHIPPING, formatINR } from "@/lib/brand";
import { totals } from "@/lib/pricing";

export function BagDrawer() {
  const { bagOpen, setBagOpen, cart, subtotal, discountCode } = useStore();
  const t = totals(subtotal, discountCode);
  const close = () => setBagOpen(false);
  return (
    <Sheet open={bagOpen} onOpenChange={setBagOpen}>
      <SheetContent side="right" className="flex w-full flex-col gap-0 bg-background p-0 sm:max-w-md">
        <div className="border-b px-6 py-5">
          <SheetTitle className="eyebrow">Your bag ({cart.reduce((s, l) => s + l.qty, 0)})</SheetTitle>
        </div>
        {cart.length === 0 ? (
          <div className="flex flex-1 flex-col items-center justify-center gap-5 px-8 text-center">
            <p className="display text-3xl">Your bag is quiet.</p>
            <p className="text-sm text-muted-foreground">Start with something small — a mug, a notebook.</p>
            <Link to="/shop/$category" params={{ category: "all" }} onClick={close} className="btn btn-primary">Explore the collection</Link>
          </div>
        ) : (
          <>
            <div className="border-b px-6 py-4">
              <p className="text-xs text-muted-foreground">
                {t.remainingForFree > 0 ? <>Add {formatINR(t.remainingForFree)} more for free shipping</> : <>You’ve unlocked free shipping</>}
              </p>
              <div className="mt-2 h-px bg-border"><div className="h-px bg-foreground transition-all duration-700" style={{ width: `${Math.min(100, ((SHIPPING.freeThreshold - t.remainingForFree) / SHIPPING.freeThreshold) * 100)}%` }} /></div>
            </div>
            <ul className="flex-1 divide-y overflow-y-auto px-6">
              {cart.map((l) => <BagLine key={l.id + l.color} id={l.id} color={l.color} qty={l.qty} onNav={close} />)}
            </ul>
            <div className="border-t px-6 py-5 space-y-4">
              <div className="flex justify-between text-sm"><span>Subtotal</span><span className="tabular-nums">{formatINR(subtotal)}</span></div>
              <p className="text-xs text-muted-foreground">Shipping and discounts calculated in your bag.</p>
              <div className="grid grid-cols-2 gap-2">
                <Link to="/bag" onClick={close} className="btn btn-outline">View bag</Link>
                <Link to="/checkout" onClick={close} className="btn btn-primary">Checkout</Link>
              </div>
            </div>
          </>
        )}
      </SheetContent>
    </Sheet>
  );
}

export function BagLine({ id, color, qty, onNav, large }: { id: string; color?: string | undefined; qty: number; onNav?: () => void; large?: boolean }) {
  const { setQty, remove } = useStore();
  const p = getById(id);
  if (!p) return null;
  return (
    <li className="flex gap-4 py-5">
      <Link to="/product/$slug" params={{ slug: p.slug }} onClick={onNav} className={`${large ? "w-28 md:w-36" : "w-20"} shrink-0 aspect-[4/5] bg-secondary overflow-hidden`}>
        <img src={p.images[0]} alt={p.name} className="h-full w-full object-cover" loading="lazy" />
      </Link>
      <div className="flex flex-1 flex-col">
        <div className="flex justify-between gap-3">
          <div>
            <Link to="/product/$slug" params={{ slug: p.slug }} onClick={onNav} className="text-sm font-medium">{p.name}</Link>
            {color && <p className="text-xs text-muted-foreground mt-0.5">{color}</p>}
          </div>
          <p className="text-sm tabular-nums">{formatINR(p.price * qty)}</p>
        </div>
        <div className="mt-auto flex items-center justify-between pt-3">
          <div className="flex items-center border">
            <button aria-label="Decrease quantity" onClick={() => setQty(id, color, qty - 1)} className="p-2"><Minus className="size-3" /></button>
            <span className="w-7 text-center text-xs tabular-nums" aria-live="polite">{qty}</span>
            <button aria-label="Increase quantity" onClick={() => setQty(id, color, qty + 1)} className="p-2"><Plus className="size-3" /></button>
          </div>
          <button onClick={() => remove(id, color)} className="text-xs text-muted-foreground link-underline">Remove</button>
        </div>
      </div>
    </li>
  );
}
