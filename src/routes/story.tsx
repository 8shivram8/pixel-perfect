import { createFileRoute, Link } from "@tanstack/react-router";
import { PageIntro } from "@/components/shared/Breadcrumbs";

export const Route = createFileRoute("/story")({
  head: () => ({ meta: [{ title: "Our Story — Form & Still" }, { name: "description", content: "We make considered objects for desks, shelves and everyday rituals — designed to earn their place." }, { property: "og:title", content: "Our Story — Form & Still" }, { property: "og:description", content: "We make considered objects for desks, shelves and everyday rituals — designed to earn their place." }] }),
  component: () => (
    <div className="pb-24">
      <PageIntro title="Our Story">We make considered objects for desks, shelves and everyday rituals — designed to earn their place.</PageIntro>
      <div className="container-page"><Link to="/shop/$category" params={{ category: "all" }} className="btn btn-outline">Explore the collection</Link></div>
    </div>
  ),
});
