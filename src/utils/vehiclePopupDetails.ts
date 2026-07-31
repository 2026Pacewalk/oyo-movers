export type VehiclePopupTypeKey = "van" | "small-truck" | "medium-truck" | "large-truck";

export type VehiclePopupDetails = {
  typeKey: VehiclePopupTypeKey;
  isVan: boolean;
  dimensions: { length: string; width: string; height: string };
  space: string;
  capacity: string;
  heightClearance: string;
};

type VehicleLookup = {
  vehicleName?: string;
  vehicleDisplayName?: string;
  moverRequired?: string;
  description?: string;
};

const VEHICLE_DETAILS: Record<
  VehiclePopupTypeKey,
  Omit<VehiclePopupDetails, "typeKey" | "isVan">
> = {
  van: {
    dimensions: { length: "3.2m", width: "1.6m", height: "1.5m" },
    space: "7-10 m³",
    capacity: "Few items or where you are ready to assist",
    heightClearance: "2.1m",
  },
  "small-truck": {
    dimensions: { length: "3.2m", width: "1.8m", height: "1.8m" },
    space: "11-15 m³",
    capacity: "Small Moves or 1 BR Apartment",
    heightClearance: "3.2m",
  },
  "medium-truck": {
    dimensions: { length: "5.5m", width: "2.2m", height: "2.3m" },
    space: "18-25 m³",
    capacity: "1-2 BR or Small office",
    heightClearance: "3.4m",
  },
  "large-truck": {
    dimensions: { length: "6.2m", width: "2.4m", height: "2.4m" },
    space: "35-45 m³",
    capacity: "2-3 BR or 6-10 ppl Office",
    heightClearance: "3.8m",
  },
};

function normalizeKey(value: string): string {
  return String(value || "")
    .toLowerCase()
    .replace(/\u00a0/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

/** Resolve popup vehicle type from API names (Sml Truck, Med Truck, Man with Van, etc.). */
export function resolveVehiclePopupTypeKey(vehicle: VehicleLookup): VehiclePopupTypeKey {
  const candidates = [
    vehicle.vehicleName,
    vehicle.vehicleDisplayName,
    vehicle.moverRequired,
    vehicle.description,
  ];

  for (const raw of candidates) {
    const key = normalizeKey(raw || "");
    if (!key) continue;

    if (
      key.includes("man with van") ||
      key.includes("van with") ||
      (key.includes("van") && !key.includes("truck"))
    ) {
      return "van";
    }
    if (key.includes("lrg") || key.includes("large")) {
      return "large-truck";
    }
    if (key.includes("med") || key.includes("medium")) {
      return "medium-truck";
    }
    if (
      key.includes("sml") ||
      key.includes("small") ||
      key.includes("lite")
    ) {
      return "small-truck";
    }
  }

  return "small-truck";
}

export function isMedTruckVehicle(vehicle: VehicleLookup): boolean {
  return resolveVehiclePopupTypeKey(vehicle) === "medium-truck";
}

export function getVehiclePopupDetails(vehicle: VehicleLookup): VehiclePopupDetails {
  const typeKey = resolveVehiclePopupTypeKey(vehicle);
  const base = VEHICLE_DETAILS[typeKey];
  return {
    typeKey,
    isVan: typeKey === "van",
    ...base,
  };
}

export function buildVehiclePopupFeatures(details: VehiclePopupDetails): string[] {
  const baseFeatures = [
    `${details.space} Space`,
    "No Minimum Hours! Book for as little as 30 mins.",
    "Strong 💪 and Verified movers",
    "Dismantling / Reassembling 🛠️",
    "Moving Blankets, Straps, Trolley, Flat Dolly",
    "Time start @ Pickup 📍",
    `Height Clearance - ${details.heightClearance}`,
  ];

  if (!details.isVan) {
    baseFeatures.splice(5, 0, "Ramp or 500kg Tailgate Lifter");
  }

  return baseFeatures;
}
