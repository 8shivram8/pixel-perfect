import { createFileRoute, Link } from "@tanstack/react-router";
import { PageIntro } from "@/components/shared/Breadcrumbs";

export const Route = createFileRoute("/contact")({
  head: () => ({ meta: [{ title: "Contact — Form & Still" }, { name: "description", content: "Write to hello@formandstill.example. This is a design prototype; messages are not delivered." }, { property: "og:title", content: "Contact — Form & Still" }, { property: "og:description", content: "Write to hello@formandstill.example. This is a design prototype; messages are not delivered." }] }),
  component: () => (
    <div className="pb-24">
      <PageIntro title="Contact">Write to hello@formandstill.example. This is a design prototype; messages are not delivered.</PageIntro>
      <div className="container-page"><Link to="/shop/$category" params={{ category: "all" }} className="btn btn-outline">Explore the collection</Link></div>
    </div>
  ),
});
