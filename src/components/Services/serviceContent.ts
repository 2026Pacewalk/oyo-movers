import type { Metadata } from "next";

export type FaqItem = { q: string; a: string };
export type ServiceContent = {
  slug: string;
  href: string;
  metaTitle: string;
  metaDescription: string;
  keywords: string;
  breadcrumb: string;
  heroImage?: string;
  hero: {
    badge: string;
    h1: string;
    intro: string;
    avgLabel: string;
    avgCost: string;
  };
  benefitsTitle: string;
  benefitsIntro: string;
  benefits: { title: string; text: string }[];
  whyTitle: string;
  why: { title: string; text: string }[];
  faqTitle: string;
  faqs: FaqItem[];
  ctaTitle: string;
  ctaText: string;
};

const BASE_URL = "https://oyomovers.com.au";

/* Melbourne suburbs for local/GEO relevance (shared). */
export const serviceAreas = [
  "Melbourne CBD", "Carlton", "Fitzroy", "Richmond", "South Yarra", "St Kilda",
  "Brunswick", "Footscray", "Docklands", "Southbank", "Prahran", "Hawthorn",
  "Box Hill", "Glen Waverley", "Dandenong", "Werribee", "Craigieburn", "Frankston",
];

export const serviceContent: Record<string, ServiceContent> = {
  "house-moving": {
    slug: "house-moving",
    href: "/house-moving",
    metaTitle: "House Moving Melbourne | Same-Day Removalists — OYO Movers",
    metaDescription:
      "Book affordable house removalists in Melbourne. From studios to 5-bedroom homes, OYO Movers gives you on-demand movers with a truck, upfront pricing and no hidden fees. Get a quote in 60 seconds.",
    keywords:
      "house moving Melbourne, house removalists Melbourne, home movers Melbourne, cheap removalists, same day movers, furniture removalists Melbourne",
    breadcrumb: "House Moving",
    hero: {
      badge: "House Moving",
      h1: "House Moving in Melbourne, Made Stress-Free",
      intro:
        "Moving house shouldn't cost you a fortune or a full weekend of stress. OYO Movers connects you with verified, professional removalists and a truck sized to your home — from a compact studio to a sprawling five-bedroom house. Transparent, pay-as-you-go pricing. No hidden fees. Ready when you are.",
      avgLabel: "2-Bedroom House Move (avg.)",
      avgCost: "$672 – $840",
    },
    benefitsTitle: "Everything You Need for a Smooth Move",
    benefitsIntro:
      "Whether you're upsizing to your forever home or shifting across the suburb, our movers handle the heavy lifting so you don't have to.",
    benefits: [
      { title: "Movers + Truck, Sorted", text: "Choose one or two movers with the right-sized truck for your home — no juggling separate hire and helpers." },
      { title: "We Move Everything", text: "Beds, wardrobes, fridges, washing machines, sofas, boxes and those awkward odds and ends. If it needs to move, we'll move it." },
      { title: "Upfront, Fair Pricing", text: "See your estimate before you book. Pay as you go, with no surprise call-out fees or fuel levies buried in the fine print." },
      { title: "Careful Handling", text: "Blankets, straps and shrink wrap come as standard, so your furniture arrives at your new place in the same shape it left." },
      { title: "Same-Day & 7 Days a Week", text: "Booked a place last minute? We run seven days a week and can often have movers at your door the same day." },
      { title: "Assembly & Disassembly", text: "Flat-pack beds, dining tables and wardrobes taken apart and put back together — just ask when you book." },
    ],
    whyTitle: "Why Melburnians Choose OYO for House Moving",
    why: [
      { title: "Rated 4.9 on Google", text: "Thousands of happy Melbourne households have trusted us with their move — and reviewed us to prove it." },
      { title: "Verified, Local Movers", text: "Every mover on the platform is ID-checked and experienced with Melbourne homes, streets and parking." },
      { title: "No Quote Runaround", text: "Get an instant price online in about 60 seconds. No waiting days for an inspector to call you back." },
    ],
    faqTitle: "House Moving FAQs",
    faqs: [
      { q: "How much does it cost to move a house in Melbourne?", a: "A typical 2-bedroom house move in Melbourne costs around $672–$840 with OYO Movers, depending on the number of movers, truck size, distance and access. You'll see a transparent estimate before you confirm, with no hidden fees." },
      { q: "How many movers do I need for a house move?", a: "As a rule of thumb, a studio or 1-bedroom suits a single mover, a 2–3 bedroom home suits two movers, and larger homes are best with two movers and a large truck. Not sure? Pick your home size when you book and we'll recommend the right crew." },
      { q: "Do OYO movers bring moving blankets and equipment?", a: "Yes. Our movers carry moving blankets, trolleys, straps and shrink wrap as standard so your furniture is protected throughout the move." },
      { q: "Can I book a same-day house move?", a: "Absolutely. OYO operates seven days a week and, subject to availability, can often get movers to you the same day. Booking a little ahead gives you the widest choice of time slots." },
      { q: "Do you move interstate or only within Melbourne?", a: "OYO specialises in fast, affordable moves across the greater Melbourne region. For local house moves — suburb to suburb — we're the quick, budget-friendly choice." },
      { q: "Will the movers disassemble and reassemble my furniture?", a: "Yes, our movers can dismantle beds, tables and flat-pack wardrobes and reassemble them at your new home. Just let us know when booking so we allow time for it." },
    ],
    ctaTitle: "Ready to move house?",
    ctaText: "Get an upfront quote in about 60 seconds and book movers with a truck — same day, seven days a week.",
  },

  "office-relocation": {
    slug: "office-relocation",
    href: "/office-relocation",
    metaTitle: "Office Relocation Melbourne | After-Hours Office Movers — OYO Movers",
    metaDescription:
      "Relocating your office in Melbourne? OYO Movers moves desks, chairs, workstations and IT with minimal downtime — after hours or on weekends. Upfront pricing, no hidden fees. Quote in 60 seconds.",
    keywords:
      "office relocation Melbourne, office movers Melbourne, commercial removalists, business relocation, workplace movers",
    breadcrumb: "Office Relocation",
    hero: {
      badge: "Office Relocation",
      h1: "Office Relocation in Melbourne, Without the Downtime",
      intro:
        "Move your workplace with as little disruption as possible. OYO Movers relocates desks, chairs, workstations, filing and IT equipment — small studio offices to large workplaces — after hours or on weekends so your team is back up and running fast. Transparent, pay-as-you-go pricing with no hidden fees.",
      avgLabel: "Small Office Move (avg.)",
      avgCost: "From $95/hr",
    },
    benefitsTitle: "Everything You Need for a Smooth Office Move",
    benefitsIntro:
      "From a single room to a full floor, our movers handle the heavy lifting so your business keeps moving.",
    benefits: [
      { title: "After-Hours & Weekends", text: "Move outside business hours so your team's day isn't interrupted and you're ready to work the next morning." },
      { title: "Desks, Chairs & Workstations", text: "We handle office furniture, partitions, filing cabinets and boxes — disassembled and reassembled where needed." },
      { title: "Careful with IT & Electronics", text: "Monitors, PCs and equipment moved with blankets and care so nothing arrives damaged." },
      { title: "Upfront, Fair Pricing", text: "See your estimate before you book. Pay as you go, with no surprise call-out or fuel fees." },
      { title: "Right Crew & Truck Size", text: "Choose the number of movers and truck size to match your office — no juggling separate hire and helpers." },
      { title: "Same-Day & 7 Days a Week", text: "Need to move fast? We run seven days a week and can often help the same day." },
    ],
    whyTitle: "Why Melbourne Businesses Choose OYO",
    why: [
      { title: "Rated 4.9 on Google", text: "Trusted by Melbourne businesses and reviewed to prove it." },
      { title: "Verified, Local Movers", text: "Every mover is ID-checked and experienced with Melbourne buildings, lifts and loading docks." },
      { title: "No Quote Runaround", text: "Get an instant price online in about 60 seconds — no waiting days for a site visit." },
    ],
    faqTitle: "Office Relocation FAQs",
    faqs: [
      { q: "Can you move our office after hours or on weekends?", a: "Yes. Most office moves are booked after hours or on weekends to avoid downtime, and OYO operates seven days a week." },
      { q: "Do you disassemble and reassemble desks and workstations?", a: "Yes — our movers can dismantle desks, workstations and shelving and reassemble them at the new office. Let us know when booking so we allow time." },
      { q: "How is office equipment protected?", a: "Movers carry blankets, straps and shrink wrap as standard so furniture, monitors and equipment are protected throughout the move." },
      { q: "How much does an office move cost in Melbourne?", a: "It depends on the number of movers, truck size, distance and access. You'll see a transparent estimate before you confirm, with no hidden fees." },
    ],
    ctaTitle: "Ready to relocate your office?",
    ctaText: "Get an upfront quote in about 60 seconds and book movers with a truck — after hours, weekends, seven days a week.",
  },

  "move-a-few-items": {
    slug: "move-a-few-items",
    href: "/move-a-few-items",
    metaTitle: "Move a Few Items Melbourne | Furniture Delivery — OYO Movers",
    metaDescription:
      "Just need a few items moved in Melbourne? OYO Movers delivers single items or a few pieces — couch, fridge, desk, bed — with a mover and the right van or truck. Upfront pricing, no hidden fees.",
    keywords:
      "move a few items Melbourne, furniture delivery Melbourne, single item movers, couch delivery, fridge delivery",
    breadcrumb: "Move a Few Items",
    hero: {
      badge: "Move a Few Items",
      h1: "Move a Few Items in Melbourne, the Easy Way",
      intro:
        "Don't need a whole truck? OYO Movers is perfect for moving a single item or a few pieces — a couch, fridge, desk, bed or that Marketplace bargain. Pick a mover and the right-sized van or truck, and pay only for what you need. Transparent pricing, no hidden fees.",
      avgLabel: "Few Items (avg.)",
      avgCost: "From $76/hr",
    },
    benefitsTitle: "The Simple Way to Shift a Few Things",
    benefitsIntro:
      "Whether it's one heavy item or a handful of pieces, our movers do the lifting and the driving.",
    benefits: [
      { title: "One Item or a Few", text: "Perfect for a fridge, couch, bed, desk or a small batch of items — no need to book a full house move." },
      { title: "Mover + Van or Truck", text: "Choose the right vehicle and one or two movers for the job so it's done quickly and safely." },
      { title: "Careful Handling", text: "Blankets, straps and shrink wrap come as standard so your items arrive in the same shape they left." },
      { title: "Upfront, Fair Pricing", text: "See your estimate before you book and pay as you go — no surprise call-out or fuel fees." },
      { title: "Same-Day & 7 Days a Week", text: "Grabbed a bargain that needs collecting today? We often move items the same day." },
      { title: "Pickup & Drop-Off Sorted", text: "Give us the addresses and details and we'll handle the pickup and delivery end to end." },
    ],
    whyTitle: "Why Melburnians Choose OYO for Small Moves",
    why: [
      { title: "Rated 4.9 on Google", text: "Thousands of quick, hassle-free small moves — and the reviews to show it." },
      { title: "Verified, Local Movers", text: "Every mover is ID-checked and knows Melbourne's streets, parking and access." },
      { title: "No Quote Runaround", text: "Get an instant price online in about 60 seconds — book in minutes." },
    ],
    faqTitle: "Move a Few Items FAQs",
    faqs: [
      { q: "Can I move just one item, like a couch or fridge?", a: "Yes. OYO is ideal for single items or a few pieces. Pick the item and vehicle when booking and you'll only pay for what you need." },
      { q: "How much does it cost to move a few items in Melbourne?", a: "Small moves start from around $76/hr depending on the mover, vehicle size, distance and access. You'll see a transparent estimate before you confirm." },
      { q: "Can you collect a Marketplace or store purchase?", a: "Absolutely — give us the pickup and drop-off addresses and item details and we'll handle collection and delivery." },
      { q: "Do the movers help carry items up stairs?", a: "Yes, our movers do the lifting including stairs and tight access. Let us know about access when booking so we allow time." },
    ],
    ctaTitle: "Need a few items moved?",
    ctaText: "Get an upfront quote in about 60 seconds and book a mover with a van or truck — same day, seven days a week.",
  },

  "donation-run": {
    slug: "donation-run",
    href: "/donation-run",
    metaTitle: "Donation Run Melbourne | Charity Pickup & Drop-Off — OYO Movers",
    metaDescription:
      "Donating unwanted items in Melbourne? OYO Movers collects your goods and drops them at your chosen charity or op-shop. A mover with a van or truck, upfront pricing and no hidden fees.",
    keywords:
      "donation run Melbourne, charity pickup Melbourne, op shop drop off, donate furniture Melbourne, goodwill pickup",
    breadcrumb: "Donation Run",
    hero: {
      badge: "Donation Run",
      h1: "Donation Runs in Melbourne, Done for You",
      intro:
        "Give your pre-loved furniture and goods a second home. OYO Movers collects the items you're donating and drops them at your chosen charity or op-shop — no heavy lifting, no borrowing a ute. Transparent, pay-as-you-go pricing with no hidden fees.",
      avgLabel: "Donation Run (avg.)",
      avgCost: "From $76/hr",
    },
    benefitsTitle: "Declutter for Good, the Easy Way",
    benefitsIntro:
      "We load, transport and drop off your donations so someone else can enjoy them.",
    benefits: [
      { title: "We Do the Lifting", text: "Furniture, boxes and bulky goods carried out and loaded for you — no strain, no ute hire." },
      { title: "Drop at Your Charity", text: "We deliver to your chosen op-shop or charity so your items go where you want them to." },
      { title: "Mover + Van or Truck", text: "Choose the right vehicle and crew for the amount you're donating." },
      { title: "Upfront, Fair Pricing", text: "See your estimate before you book and pay as you go — no surprise fees." },
      { title: "Careful Handling", text: "Items are handled with care so they arrive in good, donatable condition." },
      { title: "Same-Day & 7 Days a Week", text: "Clearing out this weekend? We run seven days and can often help the same day." },
    ],
    whyTitle: "Why Melburnians Choose OYO for Donation Runs",
    why: [
      { title: "Rated 4.9 on Google", text: "Trusted by Melbourne households clearing space for good." },
      { title: "Verified, Local Movers", text: "Every mover is ID-checked and knows local charities and op-shops." },
      { title: "No Quote Runaround", text: "Get an instant price online in about 60 seconds." },
    ],
    faqTitle: "Donation Run FAQs",
    faqs: [
      { q: "Can you drop my donations at a specific charity?", a: "Yes — tell us your preferred op-shop or charity and we'll deliver there. It helps to check they accept the items and their opening hours." },
      { q: "How much does a donation run cost in Melbourne?", a: "Donation runs start from around $76/hr depending on the crew, vehicle size and distance. You'll see a transparent estimate before you confirm." },
      { q: "Do I need to carry items out myself?", a: "No — our movers do the lifting and loading. Just point out what's going." },
      { q: "Can you help the same day?", a: "Often yes. OYO runs seven days a week and can usually arrange a same-day donation run subject to availability." },
    ],
    ctaTitle: "Ready to donate the easy way?",
    ctaText: "Get an upfront quote in about 60 seconds and book a mover with a van or truck — same day, seven days a week.",
  },

  "apartment-moves": {
    slug: "apartment-moves",
    href: "/apartment-moves",
    metaTitle: "Apartment Moving Melbourne | Stairs & Lift Movers — OYO Movers",
    metaDescription:
      "Moving apartments in Melbourne? OYO Movers handles stairs, lifts and tight corners with the right crew and truck. Studio, 1 or 2 bedroom. Upfront pricing, no hidden fees. Quote in 60 seconds.",
    keywords:
      "apartment moving Melbourne, apartment removalists, unit movers Melbourne, stairs movers, small move Melbourne",
    breadcrumb: "Apartment Moving",
    hero: {
      badge: "Apartment Moving",
      h1: "Apartment Moving in Melbourne, Stairs and All",
      intro:
        "Lifts, stairs, tight corners and narrow parking — apartment moves have their own challenges, and OYO Movers handles them every day. From a studio to a two-bedroom unit, get the right crew and truck for a fast, careful move. Transparent, pay-as-you-go pricing with no hidden fees.",
      avgLabel: "1-Bedroom Apartment (avg.)",
      avgCost: "$450 – $620",
    },
    benefitsTitle: "Built for Melbourne Apartments",
    benefitsIntro:
      "Our movers know buildings, lifts and loading zones — so your move goes smoothly from door to door.",
    benefits: [
      { title: "Stairs & Lifts Handled", text: "Multi-level walk-ups or lift access — our movers manage the tricky bits carefully." },
      { title: "Right Crew & Truck", text: "Choose one or two movers and the right van or truck for a studio, 1 or 2 bedroom." },
      { title: "We Move Everything", text: "Beds, sofas, fridges, wardrobes and boxes — all handled and protected." },
      { title: "Upfront, Fair Pricing", text: "See your estimate before you book and pay as you go — no hidden fees." },
      { title: "Careful Handling", text: "Blankets, straps and shrink wrap as standard so nothing gets marked in tight spaces." },
      { title: "Same-Day & 7 Days a Week", text: "Lease starting suddenly? We run seven days and can often move you the same day." },
    ],
    whyTitle: "Why Melburnians Choose OYO for Apartment Moves",
    why: [
      { title: "Rated 4.9 on Google", text: "Thousands of smooth apartment moves across Melbourne." },
      { title: "Verified, Local Movers", text: "Every mover is ID-checked and used to Melbourne apartment buildings and parking." },
      { title: "No Quote Runaround", text: "Get an instant price online in about 60 seconds." },
    ],
    faqTitle: "Apartment Moving FAQs",
    faqs: [
      { q: "Can you move me up or down several flights of stairs?", a: "Yes — our movers handle stairs and walk-ups. Tell us the floor and access when booking so we bring the right crew and allow time." },
      { q: "How much does an apartment move cost in Melbourne?", a: "A 1-bedroom apartment typically runs $450–$620 depending on movers, truck size, distance and access. You'll see a transparent estimate before you confirm." },
      { q: "Do you book loading zones or lifts?", a: "You'll need to reserve the building lift or loading dock where required; tell us the details and we'll plan the move around them." },
      { q: "Can I book a same-day apartment move?", a: "Often yes. OYO runs seven days a week and can usually arrange a same-day move subject to availability." },
    ],
    ctaTitle: "Ready to move apartments?",
    ctaText: "Get an upfront quote in about 60 seconds and book movers with a truck — same day, seven days a week.",
  },

  "storage-removals": {
    slug: "storage-removals",
    href: "/storage-removals",
    metaTitle: "Storage Removals Melbourne | Move Into or Out of Storage — OYO Movers",
    metaDescription:
      "Moving items into or out of storage in Melbourne? OYO Movers loads, transports and unloads your goods to or from any storage facility. Upfront pricing, no hidden fees. Quote in 60 seconds.",
    keywords:
      "storage removals Melbourne, storage movers, move into storage, self storage delivery Melbourne",
    breadcrumb: "Storage Removals",
    hero: {
      badge: "Storage Removals",
      h1: "Storage Removals in Melbourne, Into or Out",
      intro:
        "Putting things into storage or bringing them home? OYO Movers loads, transports and unloads your goods to or from any storage facility across Melbourne. The right crew and truck, careful handling, and transparent pay-as-you-go pricing with no hidden fees.",
      avgLabel: "Storage Move (avg.)",
      avgCost: "From $76/hr",
    },
    benefitsTitle: "Storage Moves Made Simple",
    benefitsIntro:
      "We handle the lifting and the drive so your belongings get to or from storage safely.",
    benefits: [
      { title: "Into or Out of Storage", text: "Moving items into a unit or bringing them back — we do both, to any facility." },
      { title: "Right Crew & Truck", text: "Choose the movers and vehicle to match the amount you're storing." },
      { title: "Careful Handling", text: "Blankets, straps and shrink wrap as standard so items are protected in transit and in the unit." },
      { title: "Upfront, Fair Pricing", text: "See your estimate before you book and pay as you go — no hidden fees." },
      { title: "We Move Everything", text: "Furniture, appliances, boxes and bulky items all handled with care." },
      { title: "Same-Day & 7 Days a Week", text: "Need access sorted this week? We run seven days and can often help the same day." },
    ],
    whyTitle: "Why Melburnians Choose OYO for Storage Moves",
    why: [
      { title: "Rated 4.9 on Google", text: "Trusted for quick, careful storage moves across Melbourne." },
      { title: "Verified, Local Movers", text: "Every mover is ID-checked and experienced with storage facilities and access." },
      { title: "No Quote Runaround", text: "Get an instant price online in about 60 seconds." },
    ],
    faqTitle: "Storage Removals FAQs",
    faqs: [
      { q: "Can you move items to any storage facility?", a: "Yes — give us the storage address and access details and we'll load, transport and unload into your unit." },
      { q: "How much does a storage move cost in Melbourne?", a: "Storage moves start from around $76/hr depending on the crew, truck size and distance. You'll see a transparent estimate before you confirm." },
      { q: "Do you provide the storage unit?", a: "We move your items to or from storage; the unit itself is arranged with your storage provider. Third-party storage terms and charges apply separately." },
      { q: "Can you help the same day?", a: "Often yes — OYO runs seven days a week and can usually arrange a same-day storage move subject to availability." },
    ],
    ctaTitle: "Ready to move to or from storage?",
    ctaText: "Get an upfront quote in about 60 seconds and book movers with a truck — same day, seven days a week.",
  },

  "junk-removal": {
    slug: "junk-removal",
    href: "/junk-removal",
    metaTitle: "Junk Removal Melbourne | Rubbish & Furniture Removal — OYO Movers",
    metaDescription:
      "Need junk removed in Melbourne? OYO Movers hauls away unwanted furniture, appliances and rubbish and disposes of it responsibly. Upfront pricing, no hidden fees. Quote in 60 seconds.",
    keywords:
      "junk removal Melbourne, rubbish removal Melbourne, furniture removal, hard rubbish pickup, waste removal Melbourne",
    breadcrumb: "Junk Removal",
    hero: {
      badge: "Junk Removal",
      h1: "Junk Removal in Melbourne, Hauled Away Fast",
      intro:
        "Clear the clutter without lifting a finger. OYO Movers removes unwanted furniture, appliances and general junk and disposes of it responsibly — recycling and donating where possible. Transparent, pay-as-you-go pricing with no hidden fees.",
      avgLabel: "Junk Removal (avg.)",
      avgCost: "From $76/hr",
    },
    benefitsTitle: "Clear the Clutter, Stress-Free",
    benefitsIntro:
      "We carry it out, load it up and dispose of it responsibly so you don't have to.",
    benefits: [
      { title: "We Do the Lifting", text: "Old furniture, whitegoods, mattresses and boxes carried out and loaded for you." },
      { title: "Responsible Disposal", text: "We recycle and donate where possible, so usable items don't go straight to landfill." },
      { title: "Right Crew & Truck", text: "Choose the movers and truck size to match the amount you're clearing." },
      { title: "Upfront, Fair Pricing", text: "See your estimate before you book and pay as you go — no hidden fees." },
      { title: "Any Junk, Sorted", text: "Household clear-outs, garage cleanups, end-of-lease rubbish — we handle it." },
      { title: "Same-Day & 7 Days a Week", text: "Need it gone today? We run seven days and can often help the same day." },
    ],
    whyTitle: "Why Melburnians Choose OYO for Junk Removal",
    why: [
      { title: "Rated 4.9 on Google", text: "Trusted for quick, tidy junk removal across Melbourne." },
      { title: "Verified, Local Movers", text: "Every mover is ID-checked and knows local disposal and recycling options." },
      { title: "No Quote Runaround", text: "Get an instant price online in about 60 seconds." },
    ],
    faqTitle: "Junk Removal FAQs",
    faqs: [
      { q: "What kind of junk can you remove?", a: "Furniture, whitegoods, mattresses, boxes and general household junk. Some hazardous materials can't be taken — ask us if you're unsure." },
      { q: "How much does junk removal cost in Melbourne?", a: "Junk removal starts from around $76/hr depending on the crew, truck size, volume and disposal. You'll see a transparent estimate before you confirm." },
      { q: "Do you recycle or donate items?", a: "Yes — we recycle and donate usable items where possible so less goes to landfill." },
      { q: "Can you remove junk the same day?", a: "Often yes. OYO runs seven days a week and can usually arrange same-day junk removal subject to availability." },
    ],
    ctaTitle: "Ready to clear the junk?",
    ctaText: "Get an upfront quote in about 60 seconds and book movers with a truck — same day, seven days a week.",
  },

  "store-delivery": {
    slug: "store-delivery",
    href: "/store-delivery",
    metaTitle: "Store Delivery Melbourne | Store & Marketplace Pickup — OYO Movers",
    metaDescription:
      "Bought something in Melbourne that won't fit the car? OYO Movers collects your store or Marketplace purchase and delivers it home. A mover with a van or truck, upfront pricing, no hidden fees.",
    keywords:
      "store delivery Melbourne, marketplace pickup Melbourne, furniture pickup, store pickup delivery, same day delivery Melbourne",
    breadcrumb: "Store Delivery",
    hero: {
      badge: "Store Delivery",
      h1: "Store Delivery in Melbourne, Straight to Your Door",
      intro:
        "Bought a couch, fridge or flat-pack that won't fit the car? OYO Movers collects your store or Marketplace purchase and delivers it home — with a mover to carry it in. Transparent, pay-as-you-go pricing and no hidden fees.",
      avgLabel: "Store Delivery (avg.)",
      avgCost: "From $76/hr",
    },
    benefitsTitle: "Get Your Purchase Home the Easy Way",
    benefitsIntro:
      "We pick up from the store or seller and deliver to your door — no borrowing a ute or wrangling a trailer.",
    benefits: [
      { title: "Store & Marketplace Pickup", text: "From furniture stores to Gumtree and Facebook Marketplace — we collect and deliver." },
      { title: "Mover + Van or Truck", text: "Choose the right vehicle and crew so your item gets home safely and is carried in." },
      { title: "Careful Handling", text: "Blankets, straps and shrink wrap as standard so your new purchase arrives in perfect shape." },
      { title: "Upfront, Fair Pricing", text: "See your estimate before you book and pay as you go — no hidden fees." },
      { title: "Carried Inside", text: "Not just dropped at the door — our movers bring it into the room you want." },
      { title: "Same-Day & 7 Days a Week", text: "Grabbed a bargain that needs collecting today? We often deliver the same day." },
    ],
    whyTitle: "Why Melburnians Choose OYO for Store Delivery",
    why: [
      { title: "Rated 4.9 on Google", text: "Thousands of quick, careful deliveries across Melbourne." },
      { title: "Verified, Local Movers", text: "Every mover is ID-checked and knows Melbourne's streets, parking and access." },
      { title: "No Quote Runaround", text: "Get an instant price online in about 60 seconds." },
    ],
    faqTitle: "Store Delivery FAQs",
    faqs: [
      { q: "Can you pick up from a store or a private seller?", a: "Yes — give us the pickup address (store, warehouse, or a Marketplace seller) and the drop-off, and we'll handle it." },
      { q: "How much does store delivery cost in Melbourne?", a: "Store delivery starts from around $76/hr depending on the mover, vehicle size and distance. You'll see a transparent estimate before you confirm." },
      { q: "Will the mover carry it inside?", a: "Yes — our movers bring your purchase into the room you want, not just to the front door. Let us know about stairs or access when booking." },
      { q: "Can you deliver the same day?", a: "Often yes. OYO runs seven days a week and can usually arrange same-day store delivery subject to availability." },
    ],
    ctaTitle: "Ready to get your purchase home?",
    ctaText: "Get an upfront quote in about 60 seconds and book a mover with a van or truck — same day, seven days a week.",
  },

  "college-moving": {
    slug: "college-moving",
    href: "/college-moving",
    metaTitle: "Student & College Moving Melbourne | Cheap Movers — OYO Movers",
    metaDescription:
      "Affordable student and uni moves across Melbourne. OYO Movers helps students shift dorms, share houses and apartments on a budget — movers with a truck, upfront pricing, same-day. Get a quote fast.",
    keywords:
      "student moving Melbourne, college moving, cheap movers for students, uni move Melbourne, dorm move, share house move Melbourne",
    breadcrumb: "Student Moving",
    hero: {
      badge: "Student Moving",
      h1: "Student & College Moving on a Budget",
      intro:
        "End of semester, a new share house, or moving closer to uni? OYO Movers makes student moves quick and genuinely affordable. Book one or two movers with a right-sized truck, pay only for what you need, and skip the stress of borrowing a mate's ute.",
      avgLabel: "Student Move (avg.)",
      avgCost: "$76 – $180",
    },
    benefitsTitle: "Made for Student Budgets",
    benefitsIntro:
      "You've got textbooks to buy and rent to pay. Our moves are priced so you keep more in your pocket.",
    benefits: [
      { title: "Pay As You Go", text: "Only pay for the movers and time you actually use — perfect for a room, a studio or a small share house." },
      { title: "Same-Day Moves", text: "Lease starting tomorrow? We run seven days a week and can often move you the same day." },
      { title: "Right-Sized Trucks", text: "From a single mover with a van to two movers with a truck, pick the option that fits your gear and your budget." },
      { title: "Beds & Desks Handled", text: "Flat-pack beds, desks and shelves disassembled and reassembled so your new room's ready to go." },
      { title: "Careful With Your Kit", text: "Monitors, consoles and boxes protected with blankets and straps as standard." },
      { title: "Book in Minutes", text: "Grab an instant price online and lock in your slot between lectures — no phone tag." },
    ],
    whyTitle: "Why Students Pick OYO",
    why: [
      { title: "Genuinely Affordable", text: "Transparent, pay-as-you-go pricing built for tight student budgets." },
      { title: "Fast & Flexible", text: "Seven days a week, same-day options, and slots that work around your timetable." },
      { title: "Trusted & Verified", text: "ID-checked local movers rated 4.9 on Google by Melburnians." },
    ],
    faqTitle: "Student Moving FAQs",
    faqs: [
      { q: "How much does a student move cost in Melbourne?", a: "Small student moves with OYO typically start around $76–$180, depending on how many movers you need, truck size and distance. You'll get an upfront estimate before booking, with no hidden fees." },
      { q: "Can you move just a bedroom or a few items?", a: "Definitely. OYO is ideal for moving a single room, a studio or a handful of items — book one mover with a van and only pay for what you use." },
      { q: "Do you move on weekends and public holidays?", a: "Yes, we operate seven days a week, which suits end-of-semester and weekend share-house moves." },
      { q: "Will movers help carry things up and down stairs?", a: "Yes — our movers handle stairs, lifts and tight walk-ups. Let us know about access when you book so we plan the right crew and time." },
    ],
    ctaTitle: "Moving for uni?",
    ctaText: "Get a student-friendly quote in about 60 seconds and book movers with a truck — same day, seven days a week.",
  },

  "labour-only": {
    slug: "labour-only",
    href: "/labour-only",
    metaTitle: "Labour Only Movers Melbourne | Loading & Unloading Help — OYO Movers",
    metaDescription:
      "Need muscle, not a truck? Book labour-only movers in Melbourne for loading, unloading, rearranging furniture and lifting heavy items. Verified helpers, upfront pricing, same-day. Get a quote now.",
    keywords:
      "labour only movers Melbourne, loading unloading help, furniture rearranging, moving helpers Melbourne, muscle only movers, helping hands movers",
    breadcrumb: "Labour Only",
    hero: {
      badge: "Labour Only",
      h1: "Labour-Only Movers — Muscle Without the Truck",
      intro:
        "Already have a truck, trailer or van? Book strong, experienced movers by the hour to do the heavy lifting. Perfect for loading and unloading, shifting furniture around the house, or getting bulky items up the stairs. You bring the vehicle — we bring the muscle.",
      avgLabel: "Labour-Only Help (avg.)",
      avgCost: "$76 – $150",
    },
    benefitsTitle: "Helping Hands, When You Need Them",
    benefitsIntro:
      "From loading a hire truck to rearranging a lounge room, our movers make short work of the heavy stuff.",
    benefits: [
      { title: "Loading & Unloading", text: "Movers to load or unload your truck, trailer, van or shipping container quickly and safely." },
      { title: "Rearrange & Restage", text: "Shifting furniture between rooms, staging a home for sale, or clearing space for renos." },
      { title: "Heavy Lifting", text: "Fridges, washing machines, sofas and wardrobes moved without the risk to your back." },
      { title: "By the Hour", text: "Book one or two movers for as long as you need — pay only for the time used." },
      { title: "Experienced Crews", text: "Our movers know how to lift, wrap and manoeuvre bulky items through tight spaces." },
      { title: "Same-Day Help", text: "Need hands today? We run seven days a week with same-day availability." },
    ],
    whyTitle: "Why Book Labour-Only With OYO",
    why: [
      { title: "Pay Only for Muscle", text: "No truck fee when you already have a vehicle — just affordable, hourly movers." },
      { title: "Verified & Insured-Ready", text: "ID-checked, experienced movers who treat your home and belongings with care." },
      { title: "Fast to Book", text: "Get a price and lock in movers online in about 60 seconds." },
    ],
    faqTitle: "Labour-Only FAQs",
    faqs: [
      { q: "What is a labour-only move?", a: "Labour-only means you provide the vehicle (a hire truck, trailer or van) and OYO provides the movers to do the loading, unloading and heavy lifting. It's a cost-effective option when you don't need us to supply a truck." },
      { q: "How much do labour-only movers cost in Melbourne?", a: "Labour-only help with OYO typically starts around $76–$150 depending on the number of movers and hours booked. You'll see an upfront estimate before you confirm." },
      { q: "Can I book movers just to load a hire truck?", a: "Yes — loading and unloading hire trucks is one of the most popular labour-only requests. Book one or two movers for the time you need." },
      { q: "Can movers help rearrange furniture inside my home?", a: "Absolutely. Our movers can shift heavy furniture between rooms, help with home staging, or clear rooms for renovations and cleaning." },
    ],
    ctaTitle: "Just need the muscle?",
    ctaText: "Book labour-only movers by the hour in about 60 seconds — same day, seven days a week.",
  },

  "appliance-delivery": {
    slug: "appliance-delivery",
    href: "/appliance-delivery",
    metaTitle: "Appliance Delivery Melbourne | Fridge, Washer & Dryer Movers — OYO",
    metaDescription:
      "Affordable appliance delivery and pickup across Melbourne. OYO Movers collects and delivers fridges, washing machines, dryers, dishwashers and more — with movers to carry them in. Get a quote fast.",
    keywords:
      "appliance delivery Melbourne, fridge delivery, washing machine delivery, appliance pickup, whitegoods delivery Melbourne, second hand appliance transport",
    breadcrumb: "Appliance Delivery",
    hero: {
      badge: "Appliance Delivery",
      h1: "Appliance Delivery & Pickup Across Melbourne",
      intro:
        "Bought a new fridge, washer or dryer — or picked up a bargain second-hand? OYO Movers collects your appliance from the store or seller and delivers it right where you need it, with movers to carry it in. No ute, no favours, no strained backs.",
      avgLabel: "Appliance Delivery (avg.)",
      avgCost: "$76 – $150",
    },
    benefitsTitle: "Big Appliances, Handled With Care",
    benefitsIntro:
      "Whitegoods are heavy, awkward and easily dented. Our movers do it properly, the first time.",
    benefits: [
      { title: "Store & Seller Pickup", text: "We collect from retailers, warehouses or private sellers — including marketplace bargains." },
      { title: "Carried Inside", text: "Not just dropped at the kerb — our movers bring your appliance into the room you want it." },
      { title: "Fridges, Washers & More", text: "Fridges, freezers, washing machines, dryers, dishwashers and ovens all moved safely." },
      { title: "Protected in Transit", text: "Blankets and straps keep your appliance secure and scratch-free on the road." },
      { title: "Stairs & Lifts", text: "Apartment delivery? We handle stairs, lifts and tight doorways without the drama." },
      { title: "Same-Day Options", text: "Need it today? We run seven days a week with same-day availability." },
    ],
    whyTitle: "Why Choose OYO for Appliance Delivery",
    why: [
      { title: "Cheaper Than Store Delivery", text: "Skip pricey retailer delivery fees — book movers with a truck for less." },
      { title: "Movers, Not Just a Driver", text: "You get people to lift and place the appliance, not just drop it off." },
      { title: "Upfront Pricing", text: "See your estimate before you book — no hidden fees." },
    ],
    faqTitle: "Appliance Delivery FAQs",
    faqs: [
      { q: "Can OYO pick up an appliance I bought second-hand?", a: "Yes. We regularly collect appliances from private sellers, including Facebook Marketplace and Gumtree, and deliver them to your home with movers to carry them in." },
      { q: "How much does appliance delivery cost in Melbourne?", a: "Appliance delivery with OYO typically starts around $76–$150 depending on the item, distance and access. You'll get an upfront estimate before confirming." },
      { q: "Will you bring the appliance inside my home?", a: "Yes — unlike many kerbside services, our movers carry the appliance into the room you choose, including up stairs or via lifts." },
      { q: "Do you deliver fridges and washing machines to apartments?", a: "We do. Our movers are experienced with apartment access, lifts and tight doorways, so your whitegoods get where they need to go." },
    ],
    ctaTitle: "Need an appliance moved?",
    ctaText: "Book pickup and delivery with movers in about 60 seconds — same day, seven days a week.",
  },

  "marketplace-delivery": {
    slug: "marketplace-delivery",
    href: "/marketplace-delivery",
    metaTitle: "Marketplace Pickup & Delivery Melbourne | Gumtree & FB — OYO Movers",
    metaDescription:
      "Bought something on Facebook Marketplace or Gumtree? OYO Movers picks it up and delivers it across Melbourne — with movers to load and carry. Furniture, appliances and more. Get a quote in 60 seconds.",
    keywords:
      "marketplace delivery Melbourne, Facebook Marketplace pickup, Gumtree delivery, furniture pickup delivery, second hand furniture transport Melbourne",
    breadcrumb: "Marketplace Pickup",
    hero: {
      badge: "Marketplace Pickup",
      h1: "Facebook Marketplace & Gumtree Pickup + Delivery",
      intro:
        "Scored a bargain online but it won't fit in the car? OYO Movers collects your Facebook Marketplace or Gumtree buy from the seller and delivers it to your door — with movers to load, carry and place it. From sofas to dining tables, we make second-hand simple.",
      avgLabel: "Marketplace Delivery (avg.)",
      avgCost: "$76 – $150",
    },
    benefitsTitle: "From Seller's Garage to Your Living Room",
    benefitsIntro:
      "No ute, no borrowed trailer, no roping in mates. Just book movers and we handle the rest.",
    benefits: [
      { title: "Pickup From Any Seller", text: "We collect from private sellers across Melbourne — Facebook Marketplace, Gumtree, eBay and more." },
      { title: "Loaded & Carried", text: "Movers load the item, secure it, and carry it into your home — not just drop it at the door." },
      { title: "Furniture & Bulky Buys", text: "Sofas, beds, dining sets, desks, appliances — if it's too big for the car, we've got it." },
      { title: "Protected On the Road", text: "Blankets and straps keep your find safe and damage-free in transit." },
      { title: "Fast Turnaround", text: "Sellers often want items gone quickly — we run seven days a week with same-day options." },
      { title: "One Simple Price", text: "Get an upfront quote covering pickup and delivery — no hidden fees." },
    ],
    whyTitle: "Why Use OYO for Marketplace Buys",
    why: [
      { title: "No Vehicle Needed", text: "Buy anything, any size — we bring the truck and the muscle." },
      { title: "Careful Handling", text: "Your bargain arrives in the condition you bought it, protected the whole way." },
      { title: "Book in Minutes", text: "Instant online pricing and same-day availability across Melbourne." },
    ],
    faqTitle: "Marketplace Pickup FAQs",
    faqs: [
      { q: "Can you pick up my Facebook Marketplace or Gumtree purchase?", a: "Yes — collecting marketplace buys from private sellers is one of our most popular services. We pick up from the seller and deliver to your home with movers to carry it in." },
      { q: "How much does marketplace delivery cost in Melbourne?", a: "Marketplace pickup and delivery with OYO typically starts around $76–$150 depending on the item size, distance and access. You'll see an upfront estimate before booking." },
      { q: "Do the movers carry the item inside?", a: "They do. Our movers load the item at the seller's, transport it safely, and carry it into the room you choose at your place." },
      { q: "Can you collect large furniture like sofas and beds?", a: "Yes. We move sofas, beds, dining tables, wardrobes, appliances and other bulky marketplace finds with the right-sized truck and crew." },
    ],
    ctaTitle: "Grabbed a marketplace bargain?",
    ctaText: "Book pickup and delivery with movers in about 60 seconds — same day, seven days a week.",
  },
};

export function serviceMetadata(c: ServiceContent): Metadata {
  const url = `${BASE_URL}${c.href}`;
  return {
    title: c.metaTitle,
    description: c.metaDescription,
    keywords: c.keywords,
    alternates: { canonical: url },
    openGraph: {
      title: c.metaTitle,
      description: c.metaDescription,
      url,
      type: "website",
      siteName: "OYO Movers",
    },
  };
}

export function serviceJsonLd(c: ServiceContent) {
  const url = `${BASE_URL}${c.href}`;
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Service",
        name: c.hero.h1,
        serviceType: c.breadcrumb,
        provider: {
          "@type": "MovingCompany",
          name: "OYO Movers",
          telephone: "+61 1300 013 131",
          areaServed: "Melbourne, Victoria, Australia",
          address: {
            "@type": "PostalAddress",
            streetAddress: "Level 1/454 Collins St",
            addressLocality: "Melbourne",
            addressRegion: "VIC",
            postalCode: "3000",
            addressCountry: "AU",
          },
          aggregateRating: {
            "@type": "AggregateRating",
            ratingValue: "4.9",
            reviewCount: "196",
          },
        },
        areaServed: { "@type": "City", name: "Melbourne" },
        description: c.metaDescription,
        url,
      },
      {
        "@type": "FAQPage",
        mainEntity: c.faqs.map((f) => ({
          "@type": "Question",
          name: f.q,
          acceptedAnswer: { "@type": "Answer", text: f.a },
        })),
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: BASE_URL },
          { "@type": "ListItem", position: 2, name: "Services", item: `${BASE_URL}/#services-section` },
          { "@type": "ListItem", position: 3, name: c.breadcrumb, item: url },
        ],
      },
    ],
  };
}
