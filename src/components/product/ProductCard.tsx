import { Link } from "@tanstack/react-router";
import { Heart, Plus } from "lucide-react";
import { useState } from "react";
import type { Product } from "@/data/products";
import { formatINR } from "@/lib/brand";
import { useStore } from "@/state/store";

export function ProductCard({ p, eager }: { p: Product; eager?: boolean }) {
  const { add, toggleWish, wishlist } = useStore();
  const [color, setColor] = useState(p.colors[0]?.name);
  const wished = wishlist.includes(p.id);
  return (
    <article className="group relative">
      <div className="relative aspect-[4/5] overflow-hidden bg-secondary">
        <Link to="/product/$slug" params={{ slug: p.slug }} aria-label={p.name} className="block h-full">
          <img src={p.images[0]} alt={p.name} loading={eager ? "eager" : "lazy"} width={1024} height={1280} className="absolute inset-0 h-full w-full object-cover img-zoom group-hover:scale-[1.04]" />
          {p.images[1] && (
            <img src={p.images[1]} alt="" aria-hidden loading="lazy" className="absolute inset-0 h-full w-full object-cover opacity-0 transition-opacity duration-700 group-hover:opacity-100" />
          )}
        </Link>
        {(p.badge || !p.inStock) && (
          <span className="absolute left-3 top-3 bg-background px-2 py-1 text-[10px] tracking-[0.14em] uppercase">
            {!p.inStock ? "Sold out" : p.badge}
          </span>
        )}
        <button
          onClick={() => toggleWish(p.id)}
          aria-label={wished ? `Remove ${p.name} from wishlist` : `Save ${p.name} to wishlist`}
          aria-pressed={wished}
          className={`absolute right-3 top-3 p-1.5 transition-opacity ${wished ? "opacity-100" : "opacity-0 group-hover:opacity-100 focus:opacity-100"}`}
        >
          <Heart className={`size-[18px] ${wished ? "fill-terracotta text-terracotta" : ""}`} strokeWidth={1.4} />
        </button>
        {p.inStock && (
          <button
            onClick={() => add(p, color)}
            className="absolute inset-x-3 bottom-3 flex h-10 translate-y-2 items-center justify-center gap-2 bg-background text-xs font-semibold tracking-wide opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100 focus:translate-y-0 focus:opacity-100 max-md:hidden"
          >
            <Plus className="size-3.5" /> Quick add{color ? ` — ${color}` : ""}
          </button>
        )}
      </div>
      <div className="mt-4 flex items-start justify-between gap-3">
        <div>
          <Link to="/product/$slug" params={{ slug: p.slug }} className="text-sm font-medium">{p.name}</Link>
          {p.colors.length > 1 && (
            <div className="mt-2 flex gap-1.5" role="radiogroup" aria-label="Finish">
              {p.colors.map((c) => (
                <button
                  key={c.name}
                  role="radio"
                  aria-checked={color === c.name}
                  aria-label={c.name}
                  onClick={() => setColor(c.name)}
                  className={`size-3.5 rounded-full border ${color === c.name ? "ring-1 ring-foreground ring-offset-2 ring-offset-background" : ""}`}
                  style={{ backgroundColor: c.hex }}
                />
              ))}
            </div>
          )}
        </div>
        <p className="text-sm tabular-nums text-muted-foreground">{formatINR(p.price)}</p>
      </div>
      {p.inStock && (
        <button onClick={() => add(p, color)} className="mt-3 text-xs link-underline md:hidden">+ Add to bag</button>
      )}
    </article>
  );
}
