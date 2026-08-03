import { createFileRoute } from "@tanstack/react-router";
import { InfoPage } from "@/components/InfoPage";

export const Route = createFileRoute("/community")({
  head: () => ({
    meta: [
      { title: "Community - Oltrid AI" },
      { name: "description", content: "Join the Oltrid community on LinkedIn, Instagram and YouTube to share workflows and shape the roadmap." },
      { property: "og:title", content: "Community - Oltrid AI" },
      { property: "og:description", content: "Share workflows, give feedback and shape the Oltrid roadmap." },
    ],
  }),
  component: Community,
});

const channels = [
  { name: "LinkedIn", href: "https://www.linkedin.com/company/oltrid/?viewAsMember=true", desc: "Product news and company updates." },
  { name: "Instagram", href: "https://www.instagram.com/oltridai", desc: "Behind the scenes and short demos." },
  { name: "YouTube", href: "https://youtube.com/@oltrid", desc: "Walkthroughs and feature deep dives." },
];

function Community() {
  return (
    <InfoPage title="Community" intro="Build with us - early users shape what ships next.">
      <div className="grid sm:grid-cols-3 gap-5 not-prose">
        {channels.map((c) => (
          <a
            key={c.name}
            href={c.href}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-2xl border border-border bg-card p-6 hover:border-lime transition"
          >
            <h2 className="font-display font-bold text-lg">{c.name}</h2>
            <p className="mt-2 text-sm text-muted-foreground">{c.desc}</p>
          </a>
        ))}
      </div>
      <p className="text-sm text-muted-foreground">
        Early access members get direct feedback channels with the team and early builds of new capabilities.
      </p>
    </InfoPage>
  );
}
