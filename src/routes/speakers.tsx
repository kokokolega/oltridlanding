import { createFileRoute } from "@tanstack/react-router";
import { InfoPage } from "@/components/InfoPage";

export const Route = createFileRoute("/speakers")({
  component: Speakers,
  head: () => ({
    meta: [
      { title: "Speakers | Oltrid AI Summit" },
      { name: "description", content: "Meet the researchers, founders, and operators speaking at the Oltrid AI Summit." },
      { property: "og:title", content: "Speakers | Oltrid AI Summit" },
      { property: "og:description", content: "Meet the researchers, founders, and operators speaking at the Oltrid AI Summit." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
});

const speakers = [
  { name: "Mark Vandenberg", role: "CTO, NeuralTech", topic: "Scaling agent infrastructure" },
  { name: "Elena Rojas", role: "AI Researcher, DeepMind", topic: "Memory-centric assistants" },
  { name: "David Laurent", role: "CEO, FutureAI Labs", topic: "The next decade of AI" },
  { name: "Priya Shah", role: "Head of AI, Northwind", topic: "AI in the enterprise" },
  { name: "Tomás Álvarez", role: "Founder, LatentOps", topic: "Evaluations & guardrails" },
  { name: "Aisha Bello", role: "Principal PM, Meridian", topic: "Designing for AI-native UX" },
];

function Speakers() {
  return (
    <InfoPage title="Speakers" intro="A curated lineup of AI leaders, researchers, and builders.">
      <div className="grid sm:grid-cols-2 gap-4">
        {speakers.map((s) => (
          <div key={s.name} className="rounded-2xl bg-surface p-5">
            <div className="font-semibold">{s.name}</div>
            <div className="text-sm text-muted-foreground">{s.role}</div>
            <div className="mt-3 text-sm">Talk: <span className="font-medium">{s.topic}</span></div>
          </div>
        ))}
      </div>
    </InfoPage>
  );
}
