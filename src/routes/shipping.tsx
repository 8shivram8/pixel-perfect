import { createFileRoute, Link } from "@tanstack/react-router";
import { PageIntro } from "@/components/shared/Breadcrumbs";

export const Route = createFileRoute("/shipping")({
  head: () => ({ meta: [{ title: "Shipping & Returns — Form & Still" }, { name: "description", content: "Free shipping over ₹2,500, otherwise ₹149. Express delivery +₹249. Returns within 14 days." }, { property: "og:title", content: "Shipping & Returns — Form & Still" }, { property: "og:description", content: "Free shipping over ₹2,500, otherwise ₹149. Express delivery +₹249. Returns within 14 days." }] }),
  component: () => (
    <div className="pb-24">
      <PageIntro title="Shipping & Returns">Free shipping over ₹2,500, otherwise ₹149. Express delivery +₹249. Returns within 14 days.</PageIntro>
      <div className="container-page"><Link to="/shop/$category" params={{ category: "all" }} className="btn btn-outline">Explore the collection</Link></div>
    </div>
  ),
});
