/** Normalize men badge — API sometimes sends "Man with Van" instead of "Man". */
function normalizeMenBadge(moverRequired: string, vehicleName: string): string {
  const men = moverRequired.trim();
  const name = vehicleName.toLowerCase().replace(/\s+/g, " ");
  const menKey = men.toLowerCase().replace(/\s+/g, " ");

  if (
    name.includes("man with van") ||
    menKey === "man with van" ||
    menKey.includes("man with van")
  ) {
    return "Man";
  }

  return men;
}

/** Mobile OPF vehicle row: "Van with" + badge "Man" (not "Man with Van"). */
export function formatOpfVehicleLabel(vehicle: {
  vehicleName?: string;
  vehicleDisplayName?: string;
  moverRequired?: string;
}): { title: string; men: string } {
  const rawName = (vehicle.vehicleName || vehicle.vehicleDisplayName || "").trim();
  const menRaw = (vehicle.moverRequired || "").trim();
  const key = rawName.toLowerCase().replace(/\s+/g, " ");

  if (key === "man with van" || key.includes("man with van")) {
    return {
      title: "Van with",
      men: "Man",
    };
  }

  return {
    title: rawName,
    men: normalizeMenBadge(menRaw, rawName),
  };
}

export function getOpfVehicleHeadLabel(vehicle: {
  vehicleName?: string;
  vehicleDisplayName?: string;
  moverRequired?: string;
}): string {
  return formatOpfVehicleLabel(vehicle).title;
}

function normalizeLabelKey(value: string): string {
  return value.trim().toLowerCase().replace(/\s+/g, " ");
}

/** Men badge for estimate modal — hidden when it repeats the vehicle title (e.g. Man with Van). */
export function getEstimateModalMenBadge(vehicle: {
  vehicleName?: string;
  vehicleDisplayName?: string;
  moverRequired?: string;
}): string | null {
  const menRaw = (vehicle.moverRequired || "").trim();
  if (!menRaw) return null;

  const rawName = (vehicle.vehicleName || vehicle.vehicleDisplayName || "").trim();
  const men = normalizeMenBadge(menRaw, rawName);
  const nameKey = normalizeLabelKey(rawName);
  const menKey = normalizeLabelKey(men);

  if (!men || menKey === nameKey || nameKey.includes(menKey) || menKey.includes(nameKey)) {
    return null;
  }

  return men;
}
