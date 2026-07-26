import { createFileRoute } from "@tanstack/react-router";
import { InfoPage } from "@/components/InfoPage";

export const Route = createFileRoute("/faq")({
  component: FAQ,
  head: () => ({
    meta: [
      { title: "FAQ | Oltrid AI Summit" },
      { name: "description", content: "Common questions about tickets, refunds, workshops, and access at the Oltrid AI Summit." },
      { property: "og:title", content: "FAQ | Oltrid AI Summit" },
      { property: "og:description", content: "Common questions about tickets, refunds, workshops, and access at the Oltrid AI Summit." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
});

const qas = [
  ["Who should attend?", "Founders, engineers, researchers, and product leaders building with or around AI."],
  ["What's included in the ticket?", "Access to all talks, workshops, the networking lounge, and daily lunch."],
  ["Can I get a refund?", "Full refunds up to 30 days before the event. After that, tickets are transferable to a colleague."],
  ["Are talks recorded?", "Yes — recordings are shared with attendees within two weeks."],
  ["Is there a code of conduct?", "Yes. Be respectful, be curious, no harassment of any kind. Full policy shared with your ticket."],
];

function FAQ() {
  return (
    <InfoPage title="FAQ" intro="Quick answers to the most common questions.">
      <div className="space-y-4">
        {qas.map(([q, a]) => (
          <details key={q} className="rounded-2xl bg-surface p-5 group">
            <summary className="cursor-pointer font-semibold list-none flex justify-between items-center">
              {q}
              <span className="text-muted-foreground group-open:rotate-45 transition-transform">+</span>
            </summary>
            <p className="mt-3 text-sm text-muted-foreground">{a}</p>
          </details>
        ))}
      </div>
    </InfoPage>
  );
}
