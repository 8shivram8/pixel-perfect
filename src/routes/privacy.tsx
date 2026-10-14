import { createFileRoute, Link } from "@tanstack/react-router";
import { PageIntro } from "@/components/shared/Breadcrumbs";

export const Route = createFileRoute("/privacy")({
  head: () => ({ meta: [{ title: "Privacy Policy — Form & Still" }, { name: "description", content: "Placeholder privacy policy. This prototype stores your bag and wishlist only in your browser." }, { property: "og:title", content: "Privacy Policy — Form & Still" }, { property: "og:description", content: "Placeholder privacy policy. This prototype stores your bag and wishlist only in your browser." }] }),
  component: () => (
    <div className="pb-24">
      <PageIntro title="Privacy Policy">Placeholder privacy policy. This prototype stores your bag and wishlist only in your browser.</PageIntro>
      <div className="container-page"><Link to="/shop/$category" params={{ category: "all" }} className="btn btn-outline">Explore the collection</Link></div>
    </div>
  ),
});
