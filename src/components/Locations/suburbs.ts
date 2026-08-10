export type Suburb = {
  slug: string;
  name: string;
  region: string;
  postcode: string; // "" for broad areas
  nearby: string[];
  blurb: string; // unique local intro sentence(s)
};

/* Melbourne suburb data powering the /removalists/[suburb] pages and the
   "Areas We Cover" section. Each blurb is written to be genuinely local
   (character + geography) so pages are unique, not doorway duplicates. */
export const suburbs: Suburb[] = [
  // ---- South-East growth corridor ----
  { slug: "narre-warren", name: "Narre Warren", region: "South-East Melbourne", postcode: "3805", nearby: ["Berwick", "Cranbourne", "Hallam", "Fountain Gate"], blurb: "From the Fountain Gate precinct to the quiet family streets off Narre Warren North Road, we move households and businesses across this busy South-East growth suburb every day." },
  { slug: "berwick", name: "Berwick", region: "South-East Melbourne", postcode: "3806", nearby: ["Narre Warren", "Beaconsfield", "Officer", "Clyde North"], blurb: "Whether you're moving into a new Berwick estate or a heritage home near the village, our movers know the local roads, courts and new-build access points." },
  { slug: "pakenham", name: "Pakenham", region: "South-East Melbourne", postcode: "3810", nearby: ["Officer", "Beaconsfield", "Nar Nar Goon", "Cardinia"], blurb: "As one of Melbourne's fastest-growing towns, Pakenham sees plenty of new-home moves — and our crews handle the estates around Lakeside and Cardinia with ease." },
  { slug: "cranbourne", name: "Cranbourne", region: "South-East Melbourne", postcode: "3977", nearby: ["Narre Warren", "Clyde", "Botanic Ridge", "Lynbrook"], blurb: "From Cranbourne West to the growing estates near the Botanic Gardens, we make house and apartment moves across this South-East hub quick and affordable." },
  { slug: "keysborough", name: "Keysborough", region: "South-East Melbourne", postcode: "3173", nearby: ["Dandenong", "Springvale", "Noble Park", "Parkmore"], blurb: "Handy to the Parkmore shopping precinct and the EastLink corridor, Keysborough moves are made simple with movers who know the area's newer estates." },
  { slug: "rowville", name: "Rowville", region: "South-East Melbourne", postcode: "3178", nearby: ["Ferntree Gully", "Wheelers Hill", "Lysterfield", "Scoresby"], blurb: "Set below the Dandenongs near Stud Park, Rowville's leafy family homes are a familiar patch for our movers — stairs, double garages and all." },

  // ---- Eastern suburbs ----
  { slug: "box-hill", name: "Box Hill", region: "Eastern Suburbs", postcode: "3128", nearby: ["Blackburn", "Mont Albert", "Surrey Hills", "Doncaster"], blurb: "From high-rise apartments around Box Hill Central to established homes on the quiet side streets, we move it all across this bustling Eastern transport hub." },
  { slug: "croydon", name: "Croydon", region: "Eastern Suburbs", postcode: "3136", nearby: ["Ringwood", "Kilsyth", "Mooroolbark", "Bayswater"], blurb: "Out towards the foothills of the Dandenongs, Croydon's mix of family homes and units is well covered by our local removalists." },
  { slug: "doncaster", name: "Doncaster", region: "Eastern Suburbs", postcode: "3108", nearby: ["Templestowe", "Box Hill", "Bulleen", "Doncaster East"], blurb: "From the Westfield precinct on top of the hill to the riverside pockets near Bulleen, Doncaster moves are handled by crews who know its steep driveways." },
  { slug: "templestowe", name: "Templestowe", region: "Eastern Suburbs", postcode: "3106", nearby: ["Doncaster", "Bulleen", "Lower Templestowe", "Warrandyte"], blurb: "With its large blocks and homes backing onto the Yarra parklands, Templestowe removals often need a little extra muscle — which is exactly what our movers bring." },
  { slug: "boronia", name: "Boronia", region: "Eastern Suburbs", postcode: "3155", nearby: ["Ferntree Gully", "Bayswater", "Wantirna", "The Basin"], blurb: "Nestled at the foot of the Dandenongs, Boronia's family streets and units near the station are an easy patch for our local removalists." },
  { slug: "ringwood", name: "Ringwood", region: "Eastern Suburbs", postcode: "3134", nearby: ["Croydon", "Heathmont", "Ringwood East", "Nunawading"], blurb: "From Eastland apartments to established homes across Ringwood, our movers know the area's tight parking and the Maroondah Highway run." },
  { slug: "eastern-suburbs", name: "Eastern Suburbs", region: "Eastern Suburbs", postcode: "", nearby: ["Box Hill", "Doncaster", "Ringwood", "Camberwell"], blurb: "Across Melbourne's leafy Eastern Suburbs — from Camberwell and Box Hill out to Ringwood — OYO Movers is your affordable, on-demand removals option." },

  // ---- Inner-East / Boroondara ----
  { slug: "hawthorn", name: "Hawthorn", region: "Inner-East Melbourne", postcode: "3122", nearby: ["Kew", "Camberwell", "Richmond", "Glenferrie"], blurb: "Period terraces, student apartments near Glenferrie and river-view homes — Hawthorn moves come in every shape, and our crews handle each with care." },
  { slug: "balwyn", name: "Balwyn", region: "Inner-East Melbourne", postcode: "3103", nearby: ["Kew", "Canterbury", "Deepdene", "Box Hill"], blurb: "Balwyn's grand family homes and long driveways are a regular for our movers, who know the area between Whitehorse and Belmore Roads well." },
  { slug: "camberwell", name: "Camberwell", region: "Inner-East Melbourne", postcode: "3124", nearby: ["Hawthorn", "Canterbury", "Glen Iris", "Surrey Hills"], blurb: "From the Camberwell Junction shops to the quiet streets around Riversdale Road, we move homes and offices across this classic inner-east suburb." },
  { slug: "burwood", name: "Burwood", region: "Inner-East Melbourne", postcode: "3125", nearby: ["Ashburton", "Glen Iris", "Box Hill", "Mount Waverley"], blurb: "Close to Deakin University, Burwood sees plenty of student and family moves — and our affordable crews are built exactly for that." },

  // ---- South-East / Monash ----
  { slug: "oakleigh", name: "Oakleigh", region: "South-East Melbourne", postcode: "3166", nearby: ["Clayton", "Huntingdale", "Hughesdale", "Chadstone"], blurb: "Near the famous Eaton Mall and Chadstone, Oakleigh's mix of units and family homes is a well-worn route for our local removalists." },
  { slug: "clayton", name: "Clayton", region: "South-East Melbourne", postcode: "3168", nearby: ["Oakleigh", "Mount Waverley", "Notting Hill", "Clarinda"], blurb: "Home to Monash University and the medical precinct, Clayton is a hotspot for student and share-house moves we handle every week." },
  { slug: "glen-waverley", name: "Glen Waverley", region: "South-East Melbourne", postcode: "3150", nearby: ["Mount Waverley", "Wheelers Hill", "Mulgrave", "Vermont South"], blurb: "From The Glen shopping centre precinct to the large family homes on the hill, Glen Waverley moves are handled by movers who know its steep courts." },
  { slug: "mount-waverley", name: "Mount Waverley", region: "South-East Melbourne", postcode: "3149", nearby: ["Glen Waverley", "Ashwood", "Chadstone", "Notting Hill"], blurb: "Mount Waverley's leafy streets and split-level homes are a regular for our crews, who come prepared for stairs and long driveways." },

  // ---- Bayside / South ----
  { slug: "brighton", name: "Brighton", region: "Bayside Melbourne", postcode: "3186", nearby: ["Hampton", "Elsternwick", "Elwood", "Bentleigh"], blurb: "From the iconic bathing boxes to grand homes off Church Street, Brighton removals get the careful, professional handling this bayside suburb expects." },
  { slug: "bayside", name: "Bayside", region: "Bayside Melbourne", postcode: "", nearby: ["Brighton", "Sandringham", "Hampton", "Beaumaris"], blurb: "Right along the bay — from Brighton to Beaumaris — OYO Movers offers affordable, professional removals for homes and apartments." },
  { slug: "bentleigh", name: "Bentleigh", region: "Bayside Melbourne", postcode: "3204", nearby: ["Brighton", "McKinnon", "Ormond", "Moorabbin"], blurb: "Around the Centre Road shops and quiet family streets, Bentleigh moves are quick and affordable with our local crews." },
  { slug: "caulfield", name: "Caulfield", region: "South-East Melbourne", postcode: "3162", nearby: ["Elsternwick", "Malvern East", "Carnegie", "Glen Huntly"], blurb: "Near Monash Caulfield and the racecourse, Caulfield's apartments and period homes see plenty of student and family moves we handle with ease." },
  { slug: "armadale", name: "Armadale", region: "Inner-South Melbourne", postcode: "3143", nearby: ["Malvern", "Toorak", "Prahran", "Hawthorn"], blurb: "With its High Street boutiques and elegant period homes, Armadale removals are done with the care and discretion the suburb is known for." },
  { slug: "south-melbourne", name: "South Melbourne", region: "Inner-Melbourne", postcode: "3205", nearby: ["Port Melbourne", "Albert Park", "Southbank", "South Yarra"], blurb: "From warehouse-conversion apartments to terraces near the South Melbourne Market, our movers navigate the tight inner-city streets and lift access with ease." },
  { slug: "mordialloc", name: "Mordialloc", region: "Bayside Melbourne", postcode: "3195", nearby: ["Aspendale", "Mentone", "Parkdale", "Braeside"], blurb: "By the creek and the bay, Mordialloc's beachside homes and units are a relaxed, familiar patch for our local removalists." },

  // ---- Frankston / Mornington Peninsula ----
  { slug: "frankston", name: "Frankston", region: "Frankston & Peninsula", postcode: "3199", nearby: ["Frankston South", "Seaford", "Langwarrin", "Carrum Downs"], blurb: "The gateway to the Mornington Peninsula, Frankston moves — from the foreshore units to the family estates — are handled fast and affordably." },
  { slug: "frankston-south", name: "Frankston South", region: "Frankston & Peninsula", postcode: "3199", nearby: ["Frankston", "Mount Eliza", "Langwarrin", "Baxter"], blurb: "With its larger blocks and homes near Oliver's Hill, Frankston South removals often call for extra muscle — our crews come ready." },
  { slug: "seaford", name: "Seaford", region: "Frankston & Peninsula", postcode: "3198", nearby: ["Frankston", "Carrum", "Bonbeach", "Skye"], blurb: "A short stroll from the beach and wetlands, Seaford's homes and units are an easy, affordable move with our local team." },
  { slug: "mornington", name: "Mornington", region: "Frankston & Peninsula", postcode: "3931", nearby: ["Mount Eliza", "Mount Martha", "Moorooduc", "Tuerong"], blurb: "Down on the Peninsula, Mornington's coastal homes and Main Street precinct are well served by our movers — perfect for sea-change relocations." },

  // ---- North-West ----
  { slug: "essendon", name: "Essendon", region: "North-West Melbourne", postcode: "3040", nearby: ["Moonee Ponds", "Aberfeldie", "Niddrie", "Ascot Vale"], blurb: "From period homes off Buckley Street to apartments near the station, Essendon removals get the careful, on-time service this north-west suburb expects." },
];

export const suburbBySlug = (slug: string) => suburbs.find((s) => s.slug === slug);

/* Grouped for the "Areas We Cover" section (three balanced columns). */
export const suburbColumns = [
  suburbs.slice(0, 11),
  suburbs.slice(11, 22),
  suburbs.slice(22),
];
