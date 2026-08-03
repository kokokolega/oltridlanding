import { createFileRoute } from "@tanstack/react-router";
import { InfoPage } from "@/components/InfoPage";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact - Oltrid AI" },
      { name: "description", content: "Get in touch with the Oltrid AI team about early access, partnerships, support or press." },
      { property: "og:title", content: "Contact - Oltrid AI" },
      { property: "og:description", content: "Reach the Oltrid team about early access, partnerships, support or press." },
    ],
  }),
  component: Contact,
});

function Contact() {
  return (
    <InfoPage title="Contact" intro="We reply to every message from early access users.">
      <h2>General & support</h2>
      <p>Email us at <a href="mailto:hello@oltrid.com">hello@oltrid.com</a> for questions about your workspace, billing or memory settings.</p>
      <h2>Partnerships</h2>
      <p>Building something on top of Oltrid or want to integrate? Write to <a href="mailto:partners@oltrid.com">partners@oltrid.com</a>.</p>
      <h2>Press</h2>
      <p>For media requests and brand assets, contact <a href="mailto:press@oltrid.com">press@oltrid.com</a>.</p>
      <h2>Social</h2>
      <p>You can also reach us on LinkedIn, Instagram and YouTube - see the community page for links.</p>
    </InfoPage>
  );
}
