import { createFileRoute, Link } from "@tanstack/react-router";
import { PageIntro } from "@/components/shared/Breadcrumbs";

export const Route = createFileRoute("/terms")({
  head: () => ({ meta: [{ title: "Terms — Form & Still" }, { name: "description", content: "Placeholder terms of service for the Form & Still design prototype." }, { property: "og:title", content: "Terms — Form & Still" }, { property: "og:description", content: "Placeholder terms of service for the Form & Still design prototype." }] }),
  component: () => (
    <div className="pb-24">
      <PageIntro title="Terms">Placeholder terms of service for the Form & Still design prototype.</PageIntro>
      <div className="container-page"><Link to="/shop/$category" params={{ category: "all" }} className="btn btn-outline">Explore the collection</Link></div>
    </div>
  ),
});
