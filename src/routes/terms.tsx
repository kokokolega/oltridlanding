import { createFileRoute } from "@tanstack/react-router";
import { InfoPage } from "@/components/InfoPage";

export const Route = createFileRoute("/terms")({
  component: Terms,
  head: () => ({
    meta: [
      { title: "Terms & Conditions | Oltrid AI" },
      { name: "description", content: "Terms and conditions for using Oltrid AI and attending the Oltrid AI Summit." },
      { property: "og:title", content: "Terms & Conditions | Oltrid AI" },
      { property: "og:description", content: "Terms and conditions for using Oltrid AI and attending the Oltrid AI Summit." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
});

function Terms() {
  return (
    <InfoPage title="Terms & Conditions" intro="Last updated: January 2026">
      <p>By purchasing a ticket, subscribing to updates, or using Oltrid AI, you agree to these terms.</p>
      <h2 className="font-display font-bold text-2xl">Tickets</h2>
      <p>Tickets are for a single attendee and non-transferable except through our support team. Refunds are available up to 30 days before the event.</p>
      <h2 className="font-display font-bold text-2xl">Conduct</h2>
      <p>All attendees agree to our code of conduct. We reserve the right to remove anyone whose behavior disrupts the event, with no refund.</p>
      <h2 className="font-display font-bold text-2xl">Media</h2>
      <p>Sessions may be photographed or recorded. By attending, you consent to appearing in event media.</p>
      <h2 className="font-display font-bold text-2xl">Liability</h2>
      <p>Oltrid AI is not liable for personal injury, loss, or damage occurring at the venue except where required by law.</p>
    </InfoPage>
  );
}
