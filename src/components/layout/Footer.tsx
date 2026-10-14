import { Link } from "@tanstack/react-router";
import { BRAND } from "@/lib/brand";
import { categories } from "@/data/products";

export function Footer() {
  return (
    <footer className="border-t bg-card">
      <div className="container-page grid gap-12 py-20 md:grid-cols-12">
        <div className="md:col-span-4">
          <p className="text-[15px] font-bold tracking-[0.32em]">{BRAND.name}</p>
          <p className="mt-5 max-w-xs text-sm leading-relaxed text-muted-foreground">
            Considered objects for desks, shelves and the small rituals in between. Designed to earn their place.
          </p>
        </div>
        <Col title="Shop">
          {categories.map((c) => (
            <li key={c.slug}><Link to="/shop/$category" params={{ category: c.slug }} className="link-underline">{c.name}</Link></li>
          ))}
        </Col>
        <Col title="Support">
          <li><Link to="/shipping" className="link-underline">Shipping & Returns</Link></li>
          <li><Link to="/faq" className="link-underline">FAQ</Link></li>
          <li><Link to="/contact" className="link-underline">Contact</Link></li>
          <li><Link to="/account" className="link-underline">Account</Link></li>
        </Col>
        <Col title="Brand">
          <li><Link to="/story" className="link-underline">Our Story</Link></li>
          <li><a href="https://instagram.com" target="_blank" rel="noreferrer" className="link-underline">Instagram</a></li>
          <li><Link to="/" hash="newsletter" className="link-underline">Newsletter</Link></li>
        </Col>
      </div>
      <div className="container-page flex flex-col gap-3 border-t py-6 text-xs text-muted-foreground md:flex-row md:justify-between">
        <p>© {new Date().getFullYear()} {BRAND.short}. A design prototype — no real orders are taken.</p>
        <div className="flex gap-6">
          <Link to="/privacy" className="link-underline">Privacy</Link>
          <Link to="/terms" className="link-underline">Terms</Link>
        </div>
      </div>
    </footer>
  );
}

function Col({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="md:col-span-2 md:col-start-auto">
      <p className="eyebrow mb-5 text-muted-foreground">{title}</p>
      <ul className="space-y-2.5 text-sm">{children}</ul>
    </div>
  );
}
