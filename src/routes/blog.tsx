import { createFileRoute } from "@tanstack/react-router";
import { InfoPage } from "@/components/InfoPage";

export const Route = createFileRoute("/blog")({
  head: () => ({
    meta: [
      { title: "Blog — Oltrid AI" },
      { name: "description", content: "Notes on AI memory, agentic workflows and building an AI workspace that actually finishes work." },
      { property: "og:title", content: "Blog — Oltrid AI" },
      { property: "og:description", content: "Notes on AI memory, agentic workflows and product updates from the Oltrid team." },
    ],
  }),
  component: Blog,
});

const posts = [
  { title: "Why context is the real AI bottleneck", date: "Jul 2026", excerpt: "Most AI tools forget you the moment you close the tab. Here's how persistent memory changes the way work gets done." },
  { title: "From prompt to deliverable", date: "Jun 2026", excerpt: "Chat is the interface, but documents, decks and workflows are the output. A look at how Oltrid ships artifacts." },
  { title: "Killing the six-tool stack", date: "May 2026", excerpt: "ChatGPT, Docs, Canva, Notion, Drive, Zapier — what happens when one workspace absorbs all of them." },
];

function Blog() {
  return (
    <InfoPage title="Blog" intro="Product updates and thinking on memory-first AI workspaces.">
      <div className="space-y-5 not-prose">
        {posts.map((p) => (
          <article key={p.title} className="rounded-2xl border border-border bg-card p-6">
            <p className="text-xs font-mono text-muted-foreground">{p.date}</p>
            <h2 className="mt-1 font-display font-bold text-xl">{p.title}</h2>
            <p className="mt-2 text-sm text-muted-foreground">{p.excerpt}</p>
          </article>
        ))}
      </div>
    </InfoPage>
  );
}
