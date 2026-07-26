import { createFileRoute } from "@tanstack/react-router";
import { InfoPage } from "@/components/InfoPage";

export const Route = createFileRoute("/privacy")({
  component: Privacy,
  head: () => ({
    meta: [
      { title: "Privacy Policy | Oltrid AI" },
      { name: "description", content: "How Oltrid AI collects, uses, and protects your personal information." },
      { property: "og:title", content: "Privacy Policy | Oltrid AI" },
      { property: "og:description", content: "How Oltrid AI collects, uses, and protects your personal information." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
});

function Privacy() {
  return (
    <InfoPage title="Privacy Policy" intro="Last updated: January 2026">
      <p>We collect only what we need to run the event and give you a great experience with Oltrid AI.</p>
      <h2 className="font-display font-bold text-2xl">What we collect</h2>
      <p>Name and email when you register or subscribe; billing details processed by our payment provider; basic analytics about how the site is used.</p>
      <h2 className="font-display font-bold text-2xl">How we use it</h2>
      <p>To send you event updates, confirmations, and product news you opted into. We do not sell personal data.</p>
      <h2 className="font-display font-bold text-2xl">Your rights</h2>
      <p>You can request access, correction, or deletion of your data at any time by contacting privacy@oltrid.com.</p>
    </InfoPage>
  );
}
