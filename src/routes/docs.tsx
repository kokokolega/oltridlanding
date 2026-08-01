import { createFileRoute } from "@tanstack/react-router";
import { InfoPage } from "@/components/InfoPage";

export const Route = createFileRoute("/docs")({
  head: () => ({
    meta: [
      { title: "Documentation — Oltrid AI" },
      { name: "description", content: "Learn how Oltrid memory, documents, presentations, workflows and canvas work together in one chat." },
      { property: "og:title", content: "Documentation — Oltrid AI" },
      { property: "og:description", content: "Guides for memory, documents, workflows and everything Oltrid can create." },
    ],
  }),
  component: Docs,
});

function Docs() {
  return (
    <InfoPage title="Documentation" intro="Everything you need to get productive with Oltrid.">
      <h2>Getting started</h2>
      <p>Create an account, open the chat window, and describe what you want. Oltrid picks the right output — a document, a presentation, a spreadsheet, a website or a workflow — and builds it in the conversation.</p>
      <h2>Memory</h2>
      <p>Every conversation, file and decision is stored in your workspace memory. You never need to re-upload a file or re-explain a project. Ask "continue the roadmap" days later and Oltrid resumes with full context.</p>
      <h2>Creating things</h2>
      <p>Supported outputs include chat, documents, presentations, mind maps, websites, workflows, canvas boards and spreadsheets. Each artifact stays editable and linked to the conversation that created it.</p>
      <h2>Workflows and automation</h2>
      <p>Describe a repeatable process in plain language and Oltrid turns it into a workflow you can trigger on demand or on a schedule.</p>
      <h2>Support</h2>
      <p>Need help? Reach us through the contact page or the community channels.</p>
    </InfoPage>
  );
}
