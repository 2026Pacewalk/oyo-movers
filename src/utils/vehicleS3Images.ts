const S3_BASE =
  "https://email-template-public-123.s3.ap-southeast-2.amazonaws.com/images/images/";

const VAN_IMAGE = "OYO_MOVERS_VAN_A_1_new.png";
const SMALL_TRUCK_IMAGE = "OYO MOVERS TRUCKS 3.2 A 1.png";
const MEDIUM_TRUCK_IMAGE = "OYO MOVERS TRUCKS 4.2 A 1.png";
const LARGE_TRUCK_IMAGE = "OYO MOVERS TRUCKS 6.2 A 1.png";

export type VehicleImageLookup = {
  vehicleName?: string;
  vehicleDisplayName?: string;
  moverRequired?: string;
};

function normalizeVehicleKey(value: string): string {
  return String(value || "")
    .toLowerCase()
    .replace(/\u00a0/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function resolveFilename(key: string): string | null {
  if (!key) return null;

  if (
    key.includes("van") ||
    key.includes("mwv") ||
    key.includes("man with van") ||
    key.includes("man with")
  ) {
    return VAN_IMAGE;
  }
  if (key.includes("sml") || key.includes("small")) {
    return SMALL_TRUCK_IMAGE;
  }
  if (key.includes("med") || key.includes("medium")) {
    return MEDIUM_TRUCK_IMAGE;
  }
  if (key.includes("lrg") || key.includes("large")) {
    return LARGE_TRUCK_IMAGE;
  }

  return null;
}

function toLookup(
  vehicleNameOrOptions: string | VehicleImageLookup,
  vehicleDisplayName?: string
): VehicleImageLookup {
  if (typeof vehicleNameOrOptions === "string") {
    return {
      vehicleName: vehicleNameOrOptions,
      vehicleDisplayName,
    };
  }
  return vehicleNameOrOptions;
}

/** Dimension-free vehicle artwork (Select Vehicle mobile cards, review, payment). */
export function getS3VehicleImageUrlWithoutDimensions(
  vehicleNameOrOptions: string | VehicleImageLookup,
  vehicleDisplayName?: string
): string | null {
  const { vehicleName, vehicleDisplayName: displayName, moverRequired } = toLookup(
    vehicleNameOrOptions,
    vehicleDisplayName
  );

  const candidates = [vehicleName, displayName, moverRequired];
  const seen = new Set<string>();

  for (const raw of candidates) {
    const key = normalizeVehicleKey(raw || "");
    if (!key || seen.has(key)) continue;
    seen.add(key);

    const filename = resolveFilename(key);
    if (filename) {
      return `${S3_BASE}${encodeURIComponent(filename)}`;
    }
  }

  return null;
}

/** Card list images: prefer S3 dimensionless art; avoid API imgSrc when type is known. */
export function getSelectVehicleCardImageSrc(requirement: {
  vehicleName?: string;
  vehicleDisplayName?: string;
  moverRequired?: string;
  imgSrc?: string;
}): string {
  const s3 = getS3VehicleImageUrlWithoutDimensions({
    vehicleName: requirement.vehicleName,
    vehicleDisplayName: requirement.vehicleDisplayName,
    moverRequired: requirement.moverRequired,
  });
  if (s3) return s3;
  return requirement.imgSrc || "/2MMT.svg";
}

/** Swap Sml/Med S3 art (3.2 PNG renders larger in the card box). */
function getSwappedSmlMedCardImageSrc(requirement: {
  vehicleName?: string;
  vehicleDisplayName?: string;
  moverRequired?: string;
  imgSrc?: string;
}): string {
  const key = normalizeVehicleKey(requirement.vehicleName || "");

  if (key.includes("sml") || key.includes("small")) {
    return (
      getS3VehicleImageUrlWithoutDimensions({ vehicleName: "Med Truck" }) ||
      getSelectVehicleCardImageSrc(requirement)
    );
  }
  if (key.includes("med") || key.includes("medium")) {
    return (
      getS3VehicleImageUrlWithoutDimensions({ vehicleName: "Sml Truck" }) ||
      getSelectVehicleCardImageSrc(requirement)
    );
  }
  return getSelectVehicleCardImageSrc(requirement);
}

/** Desktop Select Vehicle cards. */
export function getSelectVehicleCardImageSrcDesktop(requirement: {
  vehicleName?: string;
  vehicleDisplayName?: string;
  moverRequired?: string;
  imgSrc?: string;
}): string {
  return getSwappedSmlMedCardImageSrc(requirement);
}

/**
 * Vehicle info popup — artwork with L/H dimensions on the image (no CSS labels).
 * Prefer API imgSrc; otherwise correct S3 truck art (no Sml/Med swap).
 */
export function getSelectVehiclePopupImageSrc(requirement: {
  vehicleName?: string;
  vehicleDisplayName?: string;
  moverRequired?: string;
  imgSrc?: string;
}): string {
  if (requirement.imgSrc) {
    return requirement.imgSrc;
  }
  const s3 = getS3VehicleImageUrlWithoutDimensions({
    vehicleName: requirement.vehicleName,
    vehicleDisplayName: requirement.vehicleDisplayName,
    moverRequired: requirement.moverRequired,
  });
  if (s3) return s3;
  return "/2MMT.svg";
}

/** Mobile compact cards — swap only when using S3 dimensionless art. */
export function getSelectVehicleCardImageSrcMobile(requirement: {
  vehicleName?: string;
  vehicleDisplayName?: string;
  moverRequired?: string;
  imgSrc?: string;
}): string {
  const dimensionless = getS3VehicleImageUrlWithoutDimensions({
    vehicleName: requirement.vehicleName,
    vehicleDisplayName: requirement.vehicleDisplayName,
    moverRequired: requirement.moverRequired,
  });
  if (dimensionless) {
    return getSwappedSmlMedCardImageSrc(requirement);
  }
  return getSelectVehicleCardImageSrc(requirement);
}

/** True when this vehicle uses S3 dimensionless artwork (not API imgSrc fallback). */
export function usesSelectVehicleDimensionlessImage(requirement: {
  vehicleName?: string;
  vehicleDisplayName?: string;
  moverRequired?: string;
}): boolean {
  return Boolean(
    getS3VehicleImageUrlWithoutDimensions({
      vehicleName: requirement.vehicleName,
      vehicleDisplayName: requirement.vehicleDisplayName,
      moverRequired: requirement.moverRequired,
    })
  );
}

/** Mobile expanded (selected) — keep API imgSrc; swap only for dimensionless fallback. */
export function getSelectVehicleCardImageSrcMobileSelected(requirement: {
  vehicleName?: string;
  vehicleDisplayName?: string;
  moverRequired?: string;
  imgSrc?: string;
}): string {
  if (requirement.imgSrc) {
    return requirement.imgSrc;
  }
  return getSwappedSmlMedCardImageSrc(requirement);
}
