import { createFileRoute, Link } from "@tanstack/react-router";
import { PageIntro } from "@/components/shared/Breadcrumbs";

export const Route = createFileRoute("/faq")({
  head: () => ({ meta: [{ title: "FAQ — Form & Still" }, { name: "description", content: "Orders ship in 2–5 working days across India. Returns are accepted within 14 days of delivery." }, { property: "og:title", content: "FAQ — Form & Still" }, { property: "og:description", content: "Orders ship in 2–5 working days across India. Returns are accepted within 14 days of delivery." }] }),
  component: () => (
    <div className="pb-24">
      <PageIntro title="FAQ">Orders ship in 2–5 working days across India. Returns are accepted within 14 days of delivery.</PageIntro>
      <div className="container-page"><Link to="/shop/$category" params={{ category: "all" }} className="btn btn-outline">Explore the collection</Link></div>
    </div>
  ),
});
