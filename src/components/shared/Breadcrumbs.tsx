import { Link } from "@tanstack/react-router";

export function Breadcrumbs({ items }: { items: { label: string; to?: string; params?: Record<string, string> }[] }) {
  return (
    <nav aria-label="Breadcrumb" className="text-xs text-muted-foreground">
      <ol className="flex flex-wrap items-center gap-2">
        <li><Link to="/" className="link-underline">Home</Link></li>
        {items.map((it, i) => (
          <li key={i} className="flex items-center gap-2">
            <span aria-hidden>/</span>
            {it.to ? (
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              <Link to={it.to as any} params={it.params as any} className="link-underline">{it.label}</Link>
            ) : (
              <span aria-current="page" className="text-foreground">{it.label}</span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}

export function PageIntro({ eyebrow, title, children }: { eyebrow?: string; title: string; children?: React.ReactNode }) {
  return (
    <div className="container-page pt-14 pb-12 md:pt-20">
      {eyebrow && <p className="eyebrow text-muted-foreground mb-4">{eyebrow}</p>}
      <h1 className="display text-5xl md:text-7xl max-w-4xl">{title}</h1>
      {children && <div className="mt-6 max-w-xl text-muted-foreground leading-relaxed">{children}</div>}
    </div>
  );
}
