import React from "react";
import {
  LuHome,
  LuBuilding2,
  LuBriefcase,
  LuWarehouse,
  LuSofa,
  LuTrash2,
  LuHeartHandshake,
  LuStore,
  LuGraduationCap,
  LuHelpingHand,
  LuPlug,
  LuTags,
} from "react-icons/lu";

export type ServiceMenuItem = {
  slug: string;
  href: string;
  label: string;
  desc: string;
  icon: React.ReactNode;
  color: string; // tint used for the icon chip
};

/* Single source of truth for the Services mega-menu + service pages.
   href points to real routes (8 existing + 4 new). */
export const servicesMenu: ServiceMenuItem[] = [
  { slug: "house-moving", href: "/house-moving", label: "House Moving", desc: "Studios to 5-bedroom homes", icon: <LuHome />, color: "#6b6b72" },
  { slug: "apartment-moves", href: "/apartment-moves", label: "Apartment Moving", desc: "Stairs, lifts & tight corners", icon: <LuBuilding2 />, color: "#6b6b72" },
  { slug: "office-relocation", href: "/office-relocation", label: "Office Moving", desc: "Relocate after hours", icon: <LuBriefcase />, color: "#6b6b72" },
  { slug: "storage-removals", href: "/storage-removals", label: "Storage Moving", desc: "Into or out of storage", icon: <LuWarehouse />, color: "#6b6b72" },
  { slug: "move-a-few-items", href: "/move-a-few-items", label: "Furniture Delivery", desc: "One item or a few", icon: <LuSofa />, color: "#6b6b72" },
  { slug: "junk-removal", href: "/junk-removal", label: "Junk Removal", desc: "Hauled away & recycled", icon: <LuTrash2 />, color: "#6b6b72" },
  { slug: "donation-run", href: "/donation-run", label: "Donation Pick-up", desc: "Drop-offs to op-shops", icon: <LuHeartHandshake />, color: "#6b6b72" },
  { slug: "store-delivery", href: "/store-delivery", label: "Store Delivery", desc: "Pick up store purchases", icon: <LuStore />, color: "#6b6b72" },
  { slug: "college-moving", href: "/college-moving", label: "Student Moving", desc: "Budget moves for students", icon: <LuGraduationCap />, color: "#6b6b72" },
  { slug: "labour-only", href: "/labour-only", label: "Labour Only", desc: "Movers without a truck", icon: <LuHelpingHand />, color: "#6b6b72" },
  { slug: "appliance-delivery", href: "/appliance-delivery", label: "Appliance Delivery", desc: "Fridges, washers & dryers", icon: <LuPlug />, color: "#6b6b72" },
  { slug: "marketplace-delivery", href: "/marketplace-delivery", label: "Marketplace Pickup", desc: "Gumtree & FB Marketplace", icon: <LuTags />, color: "#6b6b72" },
];
