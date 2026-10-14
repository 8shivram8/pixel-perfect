import { createFileRoute, Link } from "@tanstack/react-router";
import { PageIntro } from "@/components/shared/Breadcrumbs";

export const Route = createFileRoute("/account")({
  head: () => ({ meta: [{ title: "Account — Form & Still" }, { name: "description", content: "Accounts are not part of this prototype. Your bag and wishlist are saved on this device." }, { property: "og:title", content: "Account — Form & Still" }, { property: "og:description", content: "Accounts are not part of this prototype. Your bag and wishlist are saved on this device." }] }),
  component: () => (
    <div className="pb-24">
      <PageIntro title="Account">Accounts are not part of this prototype. Your bag and wishlist are saved on this device.</PageIntro>
      <div className="container-page"><Link to="/shop/$category" params={{ category: "all" }} className="btn btn-outline">Explore the collection</Link></div>
    </div>
  ),
});
