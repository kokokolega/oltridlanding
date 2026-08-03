import { createFileRoute } from "@tanstack/react-router";
import { InfoPage } from "@/components/InfoPage";

export const Route = createFileRoute("/register")({
  component: Register,
  head: () => ({
    meta: [
      { title: "Register | Oltrid AI Summit" },
      { name: "description", content: "Reserve your seat at the Oltrid AI Summit - early-bird, standard, and team tickets." },
      { property: "og:title", content: "Register | Oltrid AI Summit" },
      { property: "og:description", content: "Reserve your seat at the Oltrid AI Summit - early-bird, standard, and team tickets." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
});

const tiers = [
  { name: "Early Bird", price: "$299", perks: ["All 3 days", "Workshops", "Welcome reception"] },
  { name: "Standard", price: "$499", perks: ["All 3 days", "Workshops", "Attendee dinner", "Networking lounge"] },
  { name: "Team of 5", price: "$1,999", perks: ["5 attendees", "Reserved seating", "Private meet & greet"] },
];

function Register() {
  return (
    <InfoPage title="Register" intro="Choose a ticket and we'll email you the confirmation and access details.">
      <div className="grid sm:grid-cols-3 gap-4">
        {tiers.map((t) => (
          <div key={t.name} className="rounded-2xl bg-surface p-6 flex flex-col">
            <div className="font-semibold">{t.name}</div>
            <div className="mt-2 font-display font-bold text-3xl">{t.price}</div>
            <ul className="mt-4 space-y-1 text-sm text-muted-foreground flex-1">
              {t.perks.map((p) => <li key={p}>• {p}</li>)}
            </ul>
            <a href="https://app.oltrid.com/auth" className="mt-6 inline-flex justify-center rounded-full bg-primary text-primary-foreground px-4 py-2.5 text-sm font-medium">
              Get ticket
            </a>
          </div>
        ))}
      </div>
    </InfoPage>
  );
}
