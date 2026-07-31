export type OpfRestrictedGridItem = {
  label: string;
  icon: string;
};

const restrictedIcon = (filename: string) => `/images/${filename}`;

/** OPF-6.18 restricted items grid — icons from /public/images */
export const OPF_RESTRICTED_GRID: OpfRestrictedGridItem[] = [
  { label: "Drugs", icon: restrictedIcon("drug.png") },
  { label: "Explosives", icon: restrictedIcon("explosive.png") },
  { label: "Weapons", icon: restrictedIcon("handgun.png") },
  { label: "Asbestos", icon: restrictedIcon("asbestos.png") },
  { label: "Paints", icon: restrictedIcon("paint.png") },
  { label: "Flammables", icon: restrictedIcon("flammable.png") },
  { label: "Chemicals", icon: restrictedIcon("chemicals.png") },
  { label: "Toxic Waste", icon: restrictedIcon("toxic-waste.png") },
  { label: "Batteries", icon: restrictedIcon("batteries.png") },
  { label: "Pet & Animals", icon: restrictedIcon("pets.png") },
  { label: "Gas Bottles", icon: restrictedIcon("gas.png") },
  { label: "Oversized items", icon: restrictedIcon("oversized-items.png") },
];

export const OPF_RESTRICTED_DISCLAIMER_LEAD = "The above list is indicative only:";
export const OPF_RESTRICTED_DISCLAIMER =
  "Any other dangerous or hazardous items are strictly prohibited from transport.";

/** Desktop booking page — 6×2 grid order and labels per Figma */
export const OPF_RESTRICTED_GRID_DESKTOP: OpfRestrictedGridItem[] = [
  { label: "Drugs", icon: restrictedIcon("drug.png") },
  { label: "Explosives", icon: restrictedIcon("explosive.png") },
  { label: "Weapons", icon: restrictedIcon("handgun.png") },
  { label: "Chemicals", icon: restrictedIcon("chemicals.png") },
  { label: "Toxic Waste", icon: restrictedIcon("toxic-waste.png") },
  { label: "Batteries", icon: restrictedIcon("batteries.png") },
  { label: "Asbestos", icon: restrictedIcon("asbestos.png") },
  { label: "Paints", icon: restrictedIcon("paint.png") },
  { label: "Flammables", icon: restrictedIcon("flammable.png") },
  { label: "Animals", icon: restrictedIcon("pets.png") },
  { label: "Gas Bottles", icon: restrictedIcon("gas.png") },
  { label: "Oversized", icon: restrictedIcon("oversized-items.png") },
];

export const OPF_RESTRICTED_DESKTOP_DISCLAIMER_LEAD = "This list is indicative only:";
export const OPF_RESTRICTED_DESKTOP_DISCLAIMER =
  "Any other dangerous, hazardous, illegal or unsafe items are not allowed.";

export const OPF_RESTRICTED_DESKTOP_HEAVY_NOTE =
  "Items over 120kg or 3m × 2m may not be accepted.";
