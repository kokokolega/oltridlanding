import { createFileRoute } from "@tanstack/react-router";
import { InfoPage } from "@/components/InfoPage";

export const Route = createFileRoute("/cookies")({
  component: Cookies,
  head: () => ({
    meta: [
      { title: "Cookie Policy | Oltrid AI" },
      { name: "description", content: "How Oltrid AI uses cookies and similar technologies." },
      { property: "og:title", content: "Cookie Policy | Oltrid AI" },
      { property: "og:description", content: "How Oltrid AI uses cookies and similar technologies." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
});

function Cookies() {
  return (
    <InfoPage title="Cookie Policy" intro="Last updated: January 2026">
      <p>We use a small number of cookies to keep the site working and to understand what people find useful.</p>
      <h2 className="font-display font-bold text-2xl">Essential</h2>
      <p>Used for security, authentication, and remembering your preferences. These cannot be turned off.</p>
      <h2 className="font-display font-bold text-2xl">Analytics</h2>
      <p>Anonymous usage data to understand which pages and sections are useful. You can disable these in your browser.</p>
      <h2 className="font-display font-bold text-2xl">Managing cookies</h2>
      <p>Most browsers let you view, delete, or block cookies. Blocking essential cookies may break parts of the site.</p>
    </InfoPage>
  );
}
