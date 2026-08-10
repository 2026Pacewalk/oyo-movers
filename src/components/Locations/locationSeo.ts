import type { Metadata } from "next";
import type { Suburb } from "./suburbs";

const BASE_URL = "https://oyomovers.com.au";

export const locationHref = (s: Suburb) => `/removalists/${s.slug}`;

export function locationMetadata(s: Suburb): Metadata {
  const url = `${BASE_URL}${locationHref(s)}`;
  const pc = s.postcode ? ` ${s.postcode}` : "";
  const title = `Removalists ${s.name}${pc} | Affordable Movers — OYO Movers`;
  const description = `Looking for trusted removalists in ${s.name}? OYO Movers offers affordable, same-day house & furniture removals across ${s.name} and ${s.region}. Verified movers, upfront pricing, no hidden fees. Get a quote in 60 seconds.`;
  return {
    title,
    description,
    keywords: `removalists ${s.name}, movers ${s.name}, furniture removalists ${s.name}, house movers ${s.name}, cheap removalists ${s.name}, removals ${s.region}`,
    alternates: { canonical: url },
    openGraph: { title, description, url, type: "website", siteName: "OYO Movers" },
  };
}

export function locationFaqs(s: Suburb) {
  return [
    {
      q: `How much do removalists cost in ${s.name}?`,
      a: `Local removals in ${s.name} with OYO Movers typically start from around $76–$150 for a few items, while a 2-bedroom move is roughly $672–$840. Your price depends on the number of movers, truck size, distance and access — and you'll always see an upfront estimate before you book, with no hidden fees.`,
    },
    {
      q: `Do you offer same-day removals in ${s.name}?`,
      a: `Yes. OYO operates seven days a week and, subject to availability, can often have movers at your ${s.name} address the same day. Booking a little ahead gives you the widest choice of time slots.`,
    },
    {
      q: `What can OYO movers move in ${s.name}?`,
      a: `Everything from a single couch to a whole house. In ${s.name} we handle house and apartment moves, office relocations, furniture and appliance delivery, storage runs, junk removal and marketplace pickups — with movers and the right-sized truck.`,
    },
    {
      q: `Are your ${s.name} removalists verified and careful?`,
      a: `Absolutely. Every mover on the OYO platform is ID-checked and experienced, and each job includes moving blankets, trolleys and straps as standard so your belongings are protected the whole way.`,
    },
    {
      q: `Which areas near ${s.name} do you cover?`,
      a: `As well as ${s.name}${s.postcode ? ` (${s.postcode})` : ""}, we cover nearby suburbs including ${s.nearby.join(", ")}, and right across ${s.region} and greater Melbourne.`,
    },
  ];
}

export function locationJsonLd(s: Suburb) {
  const url = `${BASE_URL}${locationHref(s)}`;
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "MovingCompany",
        name: `OYO Movers — Removalists ${s.name}`,
        image: `${BASE_URL}/images/footer-logo.png`,
        telephone: "+61 1300 013 131",
        priceRange: "$$",
        url,
        address: {
          "@type": "PostalAddress",
          streetAddress: "Level 1/454 Collins St",
          addressLocality: "Melbourne",
          addressRegion: "VIC",
          postalCode: "3000",
          addressCountry: "AU",
        },
        areaServed: {
          "@type": "Place",
          name: `${s.name}${s.postcode ? ` VIC ${s.postcode}` : ", Victoria"}`,
        },
        aggregateRating: {
          "@type": "AggregateRating",
          ratingValue: "4.9",
          reviewCount: "196",
        },
      },
      {
        "@type": "FAQPage",
        mainEntity: locationFaqs(s).map((f) => ({
          "@type": "Question",
          name: f.q,
          acceptedAnswer: { "@type": "Answer", text: f.a },
        })),
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: BASE_URL },
          { "@type": "ListItem", position: 2, name: "Areas We Cover", item: `${BASE_URL}/#areas` },
          { "@type": "ListItem", position: 3, name: `Removalists ${s.name}`, item: url },
        ],
      },
    ],
  };
}
