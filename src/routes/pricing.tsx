import { createFileRoute } from "@tanstack/react-router";
import { InfoPage } from "@/components/InfoPage";

export const Route = createFileRoute("/pricing")({
  head: () => ({
    meta: [
      { title: "Pricing - Oltrid AI" },
      { name: "description", content: "Simple plans for Oltrid AI: start free, upgrade for unlimited memory, automations and team workspaces." },
      { property: "og:title", content: "Pricing - Oltrid AI" },
      { property: "og:description", content: "Start free. Upgrade for unlimited memory, automations and team workspaces." },
    ],
  }),
  component: Pricing,
});

const plans = [
  { name: "Free", price: "$0", desc: "For trying Oltrid.", items: ["100 messages / month", "7-day memory", "Documents & chat"] },
  { name: "Pro", price: "$20/mo", desc: "For daily work.", items: ["Unlimited messages", "Persistent memory", "Docs, decks, sheets, sites", "Workflows & automation"] },
  { name: "Team", price: "Custom", desc: "For companies.", items: ["Shared team memory", "Admin controls", "Priority support", "SSO"] },
];

function Pricing() {
  return (
    <InfoPage title="Pricing" intro="Start free. Upgrade when Oltrid becomes part of your daily workflow.">
      <div className="grid sm:grid-cols-3 gap-5 not-prose">
        {plans.map((p) => (
          <div key={p.name} className="rounded-2xl border border-border bg-card p-6 flex flex-col">
            <h2 className="font-display font-bold text-xl">{p.name}</h2>
            <p className="mt-1 text-2xl font-display font-bold">{p.price}</p>
            <p className="mt-2 text-sm text-muted-foreground">{p.desc}</p>
            <ul className="mt-4 space-y-2 text-sm">
              {p.items.map((i) => (
                <li key={i}>• {i}</li>
              ))}
            </ul>
            <a
              href="https://app.oltrid.com/auth"
              className="mt-6 inline-flex justify-center rounded-full bg-primary text-primary-foreground px-5 py-2.5 text-sm font-medium hover:opacity-90 transition"
            >
              Get started
            </a>
          </div>
        ))}
      </div>
      <p className="text-sm text-muted-foreground">
        All plans include memory-centric actions, so nothing you create is ever lost between sessions.
      </p>
    </InfoPage>
  );
}
