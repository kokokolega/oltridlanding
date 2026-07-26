import { createFileRoute } from "@tanstack/react-router";
import { InfoPage } from "@/components/InfoPage";

export const Route = createFileRoute("/venue")({
  component: Venue,
  head: () => ({
    meta: [
      { title: "Venue | Oltrid AI Summit" },
      { name: "description", content: "Venue details, travel, and accommodation for the Oltrid AI Summit." },
      { property: "og:title", content: "Venue | Oltrid AI Summit" },
      { property: "og:description", content: "Venue details, travel, and accommodation for the Oltrid AI Summit." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
});

function Venue() {
  return (
    <InfoPage title="Venue" intro="Everything you need to plan your trip.">
      <section>
        <h2 className="font-display font-bold text-2xl">Location</h2>
        <p>Moscone West, 800 Howard St, San Francisco, CA. The main stage, workshop rooms, and networking lounge are all on the same floor.</p>
      </section>
      <section>
        <h2 className="font-display font-bold text-2xl">Getting there</h2>
        <p>10 minutes from SFO by BART (Powell Street stop, 3-minute walk). Ride-share drop-off on Howard Street.</p>
      </section>
      <section>
        <h2 className="font-display font-bold text-2xl">Where to stay</h2>
        <p>We've partnered with nearby hotels for discounted rates — details are sent with your ticket confirmation.</p>
      </section>
    </InfoPage>
  );
}
