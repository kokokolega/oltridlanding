import { createFileRoute } from "@tanstack/react-router";
import { InfoPage } from "@/components/InfoPage";

export const Route = createFileRoute("/agenda")({
  component: Agenda,
  head: () => ({
    meta: [
      { title: "Agenda | Oltrid AI Summit" },
      { name: "description", content: "Full agenda of talks, workshops, and networking sessions at the Oltrid AI Summit." },
      { property: "og:title", content: "Agenda | Oltrid AI Summit" },
      { property: "og:description", content: "Full agenda of talks, workshops, and networking sessions at the Oltrid AI Summit." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
});

const days = [
  {
    day: "Day 1 - Foundations",
    date: "March 12, 2026",
    items: [
      ["09:00", "Opening keynote: The State of AI in 2026"],
      ["10:30", "Panel: Building agents that actually ship"],
      ["12:00", "Lunch & networking"],
      ["14:00", "Workshop: RAG at production scale"],
      ["16:00", "Fireside chat with founding AI researchers"],
      ["19:00", "Welcome reception"],
    ],
  },
  {
    day: "Day 2 - Applied AI",
    date: "March 13, 2026",
    items: [
      ["09:00", "Keynote: Memory-centric assistants"],
      ["10:30", "Workshop: Evaluations & guardrails"],
      ["12:00", "Lunch & startup showcase"],
      ["14:00", "Track: AI for productivity teams"],
      ["16:00", "Track: Voice, vision & multimodal"],
      ["20:00", "Attendee dinner"],
    ],
  },
  {
    day: "Day 3 - Future",
    date: "March 14, 2026",
    items: [
      ["09:00", "Keynote: The next 10 years of AI"],
      ["10:30", "Investor & founder roundtables"],
      ["12:00", "Closing remarks"],
      ["13:00", "Community lunch"],
    ],
  },
];

function Agenda() {
  return (
    <InfoPage title="Agenda" intro="Three days of talks, workshops, and networking with the people shaping AI.">
      {days.map((d) => (
        <section key={d.day}>
          <h2 className="font-display font-bold text-2xl">{d.day}</h2>
          <p className="text-sm text-muted-foreground">{d.date}</p>
          <ul className="mt-4 divide-y divide-border rounded-2xl bg-surface">
            {d.items.map(([time, title]) => (
              <li key={time} className="flex gap-4 px-5 py-3 text-sm">
                <span className="font-mono text-muted-foreground w-16 shrink-0">{time}</span>
                <span>{title}</span>
              </li>
            ))}
          </ul>
        </section>
      ))}
    </InfoPage>
  );
}
