import { removeCountryFromAddress } from "@/utils/helper";

export type ConfirmationLocationBlock = {
  address?: {
    addressLine1?: string;
    latitude?: string | number;
    longitude?: string | number;
  };
};

export type BookingConfirmationSnapshot = {
  jobId?: string;
  pickupLine: string;
  dropoffLine: string;
  stopLines?: string[];
  stopLocations?: ConfirmationLocationBlock[];
  pickUpLocation?: ConfirmationLocationBlock;
  dropOffLocation?: ConfirmationLocationBlock;
};

const STORAGE_KEY = "oyo_booking_confirmation";

export const isMongoObjectId = (id?: string) =>
  Boolean(id && /^[a-f0-9]{24}$/i.test(String(id)));

const formatAddressLine = (value?: string) => {
  if (!value) return "";
  return removeCountryFromAddress(value) || value;
};

/** Resolve display address from form state or API shapes (pickup/dropoff). */
export const extractPickupLine = (data: any): string => {
  if (!data) return "";
  const fromForm = data?.pickUpLocation?.address?.addressLine1;
  const fromApi =
    typeof data?.pickup?.address === "string"
      ? data.pickup.address
      : data?.pickup?.address?.addressLine1 || data?.pickup?.addressLine1;
  return formatAddressLine(fromForm || fromApi || "");
};

export const extractDropoffLine = (data: any): string => {
  if (!data) return "";
  const fromForm = data?.dropOffLocation?.address?.addressLine1;
  const fromApi =
    typeof data?.dropoff?.address === "string"
      ? data.dropoff.address
      : data?.dropoff?.address?.addressLine1 || data?.dropoff?.addressLine1;
  return formatAddressLine(fromForm || fromApi || "");
};

const extractStopLineFromItem = (stop: any): string => {
  if (!stop) return "";
  const fromForm = stop?.address?.addressLine1;
  const fromApi =
    typeof stop?.address === "string"
      ? stop.address
      : stop?.address?.addressLine1 || stop?.addressLine1;
  return formatAddressLine(fromForm || fromApi || "");
};

/** Resolve stop addresses from form stopOvers or API stops array. */
export const extractStopLines = (data: any): string[] => {
  if (!data) return [];

  const fromForm = Array.isArray(data?.stopOvers)
    ? data.stopOvers.map(extractStopLineFromItem).filter(Boolean)
    : [];

  if (fromForm.length) return fromForm;

  const fromApi = Array.isArray(data?.stops)
    ? data.stops.map(extractStopLineFromItem).filter(Boolean)
    : [];

  return fromApi;
};

/** Normalize map coords from pickUpLocation or API pickup/dropoff blocks. */
export const normalizePickUpLocation = (data: any) => {
  if (data?.pickUpLocation?.address) {
    return data.pickUpLocation;
  }
  const pickup = data?.pickup;
  if (!pickup) return undefined;
  const addressLine =
    typeof pickup.address === "string"
      ? pickup.address
      : pickup?.address?.addressLine1 || pickup?.addressLine1 || "";
  const lat = pickup.lat ?? pickup.latitude ?? pickup?.address?.latitude;
  const lng = pickup.lng ?? pickup.longitude ?? pickup?.address?.longitude;
  if (!addressLine && lat == null && lng == null) return undefined;
  return {
    address: {
      addressLine1: addressLine,
      latitude: lat,
      longitude: lng,
    },
  };
};

export const normalizeDropOffLocation = (data: any): ConfirmationLocationBlock | undefined => {
  if (data?.dropOffLocation?.address) {
    return data.dropOffLocation;
  }
  const dropoff = data?.dropoff;
  if (!dropoff) return undefined;
  const addressLine =
    typeof dropoff.address === "string"
      ? dropoff.address
      : dropoff?.address?.addressLine1 || dropoff?.addressLine1 || "";
  const lat = dropoff.lat ?? dropoff.latitude ?? dropoff?.address?.latitude;
  const lng = dropoff.lng ?? dropoff.longitude ?? dropoff?.address?.longitude;
  if (!addressLine && lat == null && lng == null) return undefined;
  return {
    address: {
      addressLine1: addressLine,
      latitude: lat,
      longitude: lng,
    },
  };
};

const normalizeStopItem = (stop: unknown): ConfirmationLocationBlock | undefined => {
  if (!stop || typeof stop !== "object") return undefined;

  const s = stop as Record<string, unknown>;

  if (s.address && typeof s.address === "object") {
    const addr = s.address as Record<string, unknown>;
    const addressLine = (addr.addressLine1 as string) || "";
    const lat = addr.latitude;
    const lng = addr.longitude;
    if (!addressLine && lat == null && lng == null) return undefined;
    return {
      address: {
        addressLine1: addressLine,
        latitude: lat as string | number | undefined,
        longitude: lng as string | number | undefined,
      },
    };
  }

  const addressLine =
    typeof s.address === "string" ? s.address : (s.addressLine1 as string) || "";
  const lat = s.lat ?? s.latitude ?? (s.address as Record<string, unknown> | undefined)?.latitude;
  const lng = s.lng ?? s.longitude ?? (s.address as Record<string, unknown> | undefined)?.longitude;
  if (!addressLine && lat == null && lng == null) return undefined;
  return {
    address: {
      addressLine1: addressLine,
      latitude: lat as string | number | undefined,
      longitude: lng as string | number | undefined,
    },
  };
};

/** Normalize stop coords from form stopOvers or API stops array. */
export const normalizeStopLocations = (data: any): ConfirmationLocationBlock[] => {
  if (!data) return [];

  const fromForm: unknown[] = Array.isArray(data?.stopOvers) ? data.stopOvers : [];
  const stops: unknown[] = fromForm.length
    ? fromForm
    : Array.isArray(data?.stops)
      ? data.stops
      : [];

  return stops.flatMap((stop: unknown) => {
    const item = normalizeStopItem(stop);
    return item ? [item] : [];
  });
};

type MapCoord = { lat: number; lng: number };

const toMapCoord = (lat: unknown, lng: unknown): MapCoord | null => {
  if (lat == null || lng == null || lat === "" || lng === "") return null;
  const nLat = Number(lat);
  const nLng = Number(lng);
  if (Number.isNaN(nLat) || Number.isNaN(nLng)) return null;
  return { lat: nLat, lng: nLng };
};

/** Build Google Static Maps URL for pickup, optional stops, and dropoff. */
export const buildConfirmationStaticMapUrl = (
  pickUpLocation?: ConfirmationLocationBlock,
  stopLocations?: ConfirmationLocationBlock[],
  dropOffLocation?: ConfirmationLocationBlock,
  apiKey?: string
): string | null => {
  const pick = toMapCoord(
    pickUpLocation?.address?.latitude,
    pickUpLocation?.address?.longitude
  );
  const drop = toMapCoord(
    dropOffLocation?.address?.latitude,
    dropOffLocation?.address?.longitude
  );
  if (!pick || !drop || !apiKey) return null;

  const stopCoords = (stopLocations || [])
    .map((stop) => toMapCoord(stop?.address?.latitude, stop?.address?.longitude))
    .filter((coord): coord is MapCoord => coord != null);

  const allPoints = [pick, ...stopCoords, drop];
  const pathPoints = allPoints.map((p) => `${p.lat},${p.lng}`).join("|");
  const path = `color:0x4285F4|weight:3|${pathPoints}`;
  const markers = [
    `markers=color:green|${pick.lat},${pick.lng}`,
    ...stopCoords.map((s) => `markers=color:orange|${s.lat},${s.lng}`),
    `markers=color:red|${drop.lat},${drop.lng}`,
  ].join("&");
  const visible = allPoints.map((p) => `${p.lat},${p.lng}`).join("|");

  return `https://maps.googleapis.com/maps/api/staticmap?size=640x220&scale=2&maptype=roadmap&${markers}&path=${path}&visible=${visible}&key=${apiKey}`;
};

/** Resolve the customer-facing job reference (e.g. BPY614) from a quotation or job record. */
export const resolveConfirmationJobId = (data: any): string | undefined => {
  if (!data) return undefined;
  const raw = data?.rawData || data;
  const nestedQuotation = data?.quotation || raw?.quotation;
  const candidates = [
    nestedQuotation?.quotationId,
    data.quotationId,
    raw?.quotationId,
    data.jobId,
    data.jobRef,
    raw?.jobId,
    raw?.jobRef,
    nestedQuotation?.quotationNumber,
    data.quotationNumber,
    raw?.quotationNumber,
    nestedQuotation?.reference,
    data.reference,
    raw?.reference,
  ]
    .map((value) => (value != null ? String(value).trim() : ""))
    .filter(Boolean);

  return candidates.find((id) => !isMongoObjectId(id));
};

/** Email/phone for public quotation lookup (same sources as booking form). */
export const extractQuotationContact = (data: any): { email: string; phone: string } => ({
  email: String(
    data?.customerId?.email ||
      data?.customerDetails?.email ||
      data?.user?.email ||
      data?.rawData?.user?.email ||
      ""
  ).trim(),
  phone: String(
    data?.customerId?.phone ||
      data?.customerDetails?.phone ||
      data?.user?.phone ||
      data?.rawData?.user?.phone ||
      ""
  ).trim(),
});

/** Resolve Mongo/API lookup key for quotations (prefer _id over short ref). */
export const resolveQuotationLookupId = (data: any): string | undefined => {
  if (!data) return undefined;
  return (
    data._id ||
    data.quotationId ||
    data.quotationNumber ||
    data.reference ||
    undefined
  );
};

/** Build snapshot from quotation API response or customer job record. */
export const buildConfirmationSnapshotFromJob = (
  job: any,
  fallbackId?: string
): BookingConfirmationSnapshot => {
  const raw = job?.rawData || job;
  const merged = {
    ...raw,
    pickup: raw?.pickup ?? job?.pickup,
    dropoff: raw?.dropoff ?? job?.dropoff,
    stops: raw?.stops ?? job?.stops,
    stopOvers: raw?.stopOvers ?? job?.stopOvers,
    pickUpLocation: raw?.pickUpLocation ?? job?.pickUpLocation,
    dropOffLocation: raw?.dropOffLocation ?? job?.dropOffLocation,
  };
  const safeFallback =
    fallbackId && !isMongoObjectId(String(fallbackId)) ? fallbackId : undefined;
  const id = resolveConfirmationJobId(job) || safeFallback;
  return buildConfirmationSnapshot(merged, id);
};

export const buildConfirmationSnapshot = (
  jobBooking: any,
  jobId?: string
): BookingConfirmationSnapshot => {
  const pickupLine = extractPickupLine(jobBooking);
  const dropoffLine = extractDropoffLine(jobBooking);
  const stopLines = extractStopLines(jobBooking);
  const stopLocations = normalizeStopLocations(jobBooking);
  const pickUpLocation = normalizePickUpLocation(jobBooking);
  const dropOffLocation = normalizeDropOffLocation(jobBooking);

  return {
    jobId,
    pickupLine,
    dropoffLine,
    stopLines,
    stopLocations: stopLocations.length ? stopLocations : undefined,
    pickUpLocation,
    dropOffLocation,
  };
};

export const mergeConfirmationSnapshots = (
  primary: BookingConfirmationSnapshot | null,
  secondary: BookingConfirmationSnapshot | null
): BookingConfirmationSnapshot | null => {
  if (!primary && !secondary) return null;
  if (!primary) return secondary;
  if (!secondary) return primary;
  const primaryStops = primary.stopLines?.length ? primary.stopLines : [];
  const secondaryStops = secondary.stopLines?.length ? secondary.stopLines : [];
  const primaryStopLocs = primary.stopLocations?.length ? primary.stopLocations : [];
  const secondaryStopLocs = secondary.stopLocations?.length ? secondary.stopLocations : [];

  const pickJobId = (a?: string, b?: string) => {
    if (!a) return b;
    if (!b) return a;
    const aIsRef = !isMongoObjectId(a);
    const bIsRef = !isMongoObjectId(b);
    if (aIsRef && !bIsRef) return a;
    if (bIsRef && !aIsRef) return b;
    return a;
  };

  return {
    jobId: pickJobId(primary.jobId, secondary.jobId),
    pickupLine: primary.pickupLine || secondary.pickupLine,
    dropoffLine: primary.dropoffLine || secondary.dropoffLine,
    stopLines: primaryStops.length ? primaryStops : secondaryStops,
    stopLocations: primaryStopLocs.length ? primaryStopLocs : secondaryStopLocs,
    pickUpLocation: primary.pickUpLocation || secondary.pickUpLocation,
    dropOffLocation: primary.dropOffLocation || secondary.dropOffLocation,
  };
};

export const saveBookingConfirmationSnapshot = (data: BookingConfirmationSnapshot) => {
  if (typeof window === "undefined") return;
  try {
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch {
    /* ignore quota errors */
  }
};

export const loadBookingConfirmationSnapshot = (): BookingConfirmationSnapshot | null => {
  if (typeof window === "undefined") return null;
  try {
    const raw = sessionStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    return JSON.parse(raw) as BookingConfirmationSnapshot;
  } catch {
    return null;
  }
};

export const clearBookingConfirmationSnapshot = () => {
  if (typeof window === "undefined") return;
  sessionStorage.removeItem(STORAGE_KEY);
};

export const formatConfirmationJobId = (id?: string) => {
  if (!id) return "—";
  const str = String(id).trim();
  if (isMongoObjectId(str)) return "—";
  if (str.length <= 8) return str.toUpperCase();
  return str.slice(-6).toUpperCase();
};

/** True when snapshot has a display ref and/or route addresses worth merging. */
export const hasConfirmationSnapshotContent = (
  snapshot?: BookingConfirmationSnapshot | null
): boolean =>
  Boolean(
    snapshot &&
      ((snapshot.jobId && !isMongoObjectId(snapshot.jobId)) ||
        snapshot.pickupLine ||
        snapshot.dropoffLine ||
        snapshot.stopLines?.length)
  );

/** Resolve short customer-facing ref from URL params (jobId or quotationId). */
export const resolveDisplayJobIdFromUrl = (
  jobIdParam?: string | null,
  quotationIdParam?: string | null
): string | undefined => {
  const jobId = jobIdParam?.trim();
  if (jobId && !isMongoObjectId(jobId)) return jobId;

  const quotationId = quotationIdParam?.trim();
  if (quotationId && !isMongoObjectId(quotationId)) return quotationId;

  return undefined;
};

export const resolveQuotationId = (data: any): string | undefined => {
  if (!data) return undefined;
  return (
    data._id ||
    data.quotationId ||
    data.quotationNumber ||
    data.reference ||
    undefined
  );
};
