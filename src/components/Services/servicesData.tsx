import React from "react";
import {
  FaHome,
  FaBuilding,
  FaBriefcase,
  FaWarehouse,
  FaCouch,
  FaTrashAlt,
  FaHandHoldingHeart,
  FaStore,
  FaGraduationCap,
  FaHandsHelping,
  FaPlug,
  FaTags,
} from "react-icons/fa";

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
  { slug: "house-moving", href: "/house-moving", label: "House Moving", desc: "Studios to 5-bedroom homes", icon: <FaHome />, color: "#10b981" },
  { slug: "apartment-moves", href: "/apartment-moves", label: "Apartment Moving", desc: "Stairs, lifts & tight corners", icon: <FaBuilding />, color: "#ef4444" },
  { slug: "office-relocation", href: "/office-relocation", label: "Office Moving", desc: "Relocate after hours", icon: <FaBriefcase />, color: "#8b5cf6" },
  { slug: "storage-removals", href: "/storage-removals", label: "Storage Moving", desc: "Into or out of storage", icon: <FaWarehouse />, color: "#f59e0b" },
  { slug: "move-a-few-items", href: "/move-a-few-items", label: "Furniture Delivery", desc: "One item or a few", icon: <FaCouch />, color: "#0ea5e9" },
  { slug: "junk-removal", href: "/junk-removal", label: "Junk Removal", desc: "Hauled away & recycled", icon: <FaTrashAlt />, color: "#22c55e" },
  { slug: "donation-run", href: "/donation-run", label: "Donation Pick-up", desc: "Drop-offs to op-shops", icon: <FaHandHoldingHeart />, color: "#ec4899" },
  { slug: "store-delivery", href: "/store-delivery", label: "Store Delivery", desc: "Pick up store purchases", icon: <FaStore />, color: "#6366f1" },
  { slug: "college-moving", href: "/college-moving", label: "Student Moving", desc: "Budget moves for students", icon: <FaGraduationCap />, color: "#14b8a6" },
  { slug: "labour-only", href: "/labour-only", label: "Labour Only", desc: "Movers without a truck", icon: <FaHandsHelping />, color: "#f97316" },
  { slug: "appliance-delivery", href: "/appliance-delivery", label: "Appliance Delivery", desc: "Fridges, washers & dryers", icon: <FaPlug />, color: "#3b82f6" },
  { slug: "marketplace-delivery", href: "/marketplace-delivery", label: "Marketplace Pickup", desc: "Gumtree & FB Marketplace", icon: <FaTags />, color: "#a855f7" },
];
