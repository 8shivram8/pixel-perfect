import { Link, useNavigate } from "@tanstack/react-router";
import { Heart, Menu, Search, ShoppingBag, User, X } from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";
import { BRAND, formatINR } from "@/lib/brand";
import { categories, images, products } from "@/data/products";
import { useStore } from "@/state/store";
import { Sheet, SheetContent, SheetTitle } from "@/components/ui/sheet";

const nav = [
  { label: "Shop", cat: "all" },
  { label: "Desk", cat: "desk" },
  { label: "Living", cat: "living" },
  { label: "Stationery", cat: "stationery" },
  { label: "Gifts", cat: "gifts" },
] as const;

export function Header() {
  const { count, setBagOpen, wishlist } = useStore();
  const [mega, setMega] = useState(false);
  const [search, setSearch] = useState(false);
  const [mobile, setMobile] = useState(false);

  return (
    <>
      <div className="bg-ink text-ink-foreground">
        <div className="container-page flex h-9 items-center justify-between text-[11px] tracking-[0.12em] uppercase">
          <span className="hidden md:inline text-ink-muted">Complimentary gift wrapping</span>
          <span className="mx-auto md:mx-0">{BRAND.tagline}</span>
          <span className="hidden md:inline text-ink-muted">Free shipping over ₹2,500</span>
        </div>
      </div>
      <header className="sticky top-0 z-40 border-b bg-background/95 backdrop-blur" onMouseLeave={() => setMega(false)}>
        <div className="container-page grid h-16 grid-cols-[1fr_auto_1fr] items-center">
          <nav className="flex items-center gap-7" aria-label="Primary">
            <button className="lg:hidden -ml-2 p-2" aria-label="Open menu" onClick={() => setMobile(true)}>
              <Menu className="size-5" strokeWidth={1.4} />
            </button>
            {nav.map((n) => (
              <Link
                key={n.cat}
                to="/shop/$category"
                params={{ category: n.cat }}
                onMouseEnter={() => setMega(n.cat === "all")}
                className="hidden lg:inline text-[13px] link-underline"
                activeProps={{ className: "hidden lg:inline text-[13px] link-underline font-semibold" }}
              >
                {n.label}
              </Link>
            ))}
            <Link to="/story" onMouseEnter={() => setMega(false)} className="hidden lg:inline text-[13px] link-underline">Our Story</Link>
          </nav>
          <Link to="/" className="font-sans text-[15px] font-bold tracking-[0.32em]" aria-label={`${BRAND.name} home`}>
            {BRAND.name}
          </Link>
          <div className="flex items-center justify-end gap-1">
            <IconBtn label="Search" onClick={() => setSearch(true)}><Search className="size-[18px]" strokeWidth={1.4} /></IconBtn>
            <Link to="/account" className="hidden sm:inline-flex p-2" aria-label="Account"><User className="size-[18px]" strokeWidth={1.4} /></Link>
            <Link to="/wishlist" className="relative hidden sm:inline-flex p-2" aria-label={`Wishlist, ${wishlist.length} items`}>
              <Heart className="size-[18px]" strokeWidth={1.4} />
              {wishlist.length > 0 && <span className="absolute right-1 top-1 size-1.5 rounded-full bg-terracotta" />}
            </Link>
            <button onClick={() => setBagOpen(true)} className="flex items-center gap-1.5 p-2 text-[13px]" aria-label={`Shopping bag, ${count} items`}>
              <ShoppingBag className="size-[18px]" strokeWidth={1.4} />
              <span className="tabular-nums">{count}</span>
            </button>
          </div>
        </div>
        {mega && <MegaMenu onClose={() => setMega(false)} />}
      </header>
      {search && <SearchOverlay onClose={() => setSearch(false)} />}
      <Sheet open={mobile} onOpenChange={setMobile}>
        <SheetContent side="left" className="w-[88vw] max-w-sm bg-background p-0">
          <SheetTitle className="sr-only">Menu</SheetTitle>
          <div className="px-6 pt-8 pb-6 text-[13px] font-bold tracking-[0.3em]">{BRAND.name}</div>
          <nav className="flex flex-col border-t">
            {categories.map((c) => (
              <Link key={c.slug} to="/shop/$category" params={{ category: c.slug }} onClick={() => setMobile(false)} className="border-b px-6 py-4 display text-2xl">
                {c.name}
              </Link>
            ))}
            {[["/story", "Our Story"], ["/wishlist", "Wishlist"], ["/account", "Account"], ["/contact", "Contact"]].map(([to, l]) => (
              <Link key={to} to={to} onClick={() => setMobile(false)} className="border-b px-6 py-3.5 text-sm text-muted-foreground">{l}</Link>
            ))}
          </nav>
        </SheetContent>
      </Sheet>
    </>
  );
}

function IconBtn({ label, onClick, children }: { label: string; onClick: () => void; children: React.ReactNode }) {
  return <button aria-label={label} onClick={onClick} className="p-2">{children}</button>;
}

function MegaMenu({ onClose }: { onClose: () => void }) {
  return (
    <div className="absolute inset-x-0 top-full hidden border-b bg-background lg:block fade-up" style={{ animationDuration: "0.4s" }}>
      <div className="container-page grid grid-cols-12 gap-10 py-10">
        <div className="col-span-3">
          <p className="eyebrow text-muted-foreground mb-5">Categories</p>
          <ul className="space-y-2.5">
            {categories.map((c) => (
              <li key={c.slug}>
                <Link to="/shop/$category" params={{ category: c.slug }} onClick={onClose} className="display text-[22px] hover:text-terracotta transition-colors">{c.name}</Link>
              </li>
            ))}
          </ul>
        </div>
        <div className="col-span-3">
          <p className="eyebrow text-muted-foreground mb-5">Rituals</p>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li><Link to="/shop/$category" params={{ category: "drinkware" }} onClick={onClose} className="link-underline">The morning coffee</Link></li>
            <li><Link to="/shop/$category" params={{ category: "workspace" }} onClick={onClose} className="link-underline">The focused workday</Link></li>
            <li><Link to="/shop/$category" params={{ category: "living" }} onClick={onClose} className="link-underline">The evening reset</Link></li>
          </ul>
        </div>
        <Link to="/shop/$category" params={{ category: "gifts" }} onClick={onClose} className="col-span-3 group">
          <div className="aspect-[4/5] overflow-hidden bg-secondary"><img src={images.editorial} alt="" className="h-full w-full object-cover img-zoom group-hover:scale-105" /></div>
          <p className="mt-3 text-sm">Thoughtful Gifting →</p>
        </Link>
        <Link to="/product/$slug" params={{ slug: "form-laptop-stand" }} onClick={onClose} className="col-span-3 group">
          <div className="aspect-[4/5] overflow-hidden bg-secondary"><img src={images.stand} alt="" className="h-full w-full object-cover img-zoom group-hover:scale-105" /></div>
          <p className="mt-3 text-sm">New — Form Laptop Stand</p>
        </Link>
      </div>
    </div>
  );
}

function SearchOverlay({ onClose }: { onClose: () => void }) {
  const [q, setQ] = useState("");
  const ref = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();
  useEffect(() => {
    ref.current?.focus();
    const k = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", k);
    return () => window.removeEventListener("keydown", k);
  }, [onClose]);
  const results = useMemo(() => searchProducts(q).slice(0, 5), [q]);
  return (
    <div className="fixed inset-0 z-50 bg-foreground/30" onClick={onClose}>
      <div className="bg-background border-b fade-up" style={{ animationDuration: "0.35s" }} onClick={(e) => e.stopPropagation()} role="dialog" aria-label="Search">
        <form
          className="container-page flex items-center gap-4 py-8"
          onSubmit={(e) => { e.preventDefault(); navigate({ to: "/search", search: { q } }); onClose(); }}
        >
          <Search className="size-5 text-muted-foreground" strokeWidth={1.4} />
          <input ref={ref} value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search mugs, candles, notebooks…" className="flex-1 bg-transparent display text-3xl md:text-4xl outline-none placeholder:text-muted-foreground/50" aria-label="Search products" />
          <button type="button" onClick={onClose} aria-label="Close search" className="p-2"><X className="size-5" strokeWidth={1.4} /></button>
        </form>
        <div className="container-page pb-8">
          {q && results.length === 0 && <p className="text-sm text-muted-foreground">Nothing matches “{q}”. Try “mug” or “desk”.</p>}
          {!q && (
            <div className="flex flex-wrap gap-2 text-sm">
              <span className="text-muted-foreground mr-2">Popular:</span>
              {["Mug", "Candle", "Desk mat", "Notebook", "Gift"].map((s) => (
                <button key={s} onClick={() => setQ(s)} className="border px-3 py-1 hover:border-foreground">{s}</button>
              ))}
            </div>
          )}
          <ul className="divide-y">
            {results.map((p) => (
              <li key={p.id}>
                <Link to="/product/$slug" params={{ slug: p.slug }} onClick={onClose} className="flex items-center gap-4 py-3 hover:bg-muted/60">
                  <img src={p.images[0]} alt="" className="size-14 object-cover bg-secondary" />
                  <span className="flex-1 text-sm">{p.name}</span>
                  <span className="text-sm text-muted-foreground">{formatINR(p.price)}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export function searchProducts(q: string) {
  const t = q.trim().toLowerCase();
  if (!t) return [];
  const words = t.split(/\s+/);
  return products.filter((p) => {
    const hay = `${p.name} ${p.short} ${p.category} ${p.material}`.toLowerCase();
    return words.every((w) => hay.includes(w.replace(/s$/, "")));
  });
}
