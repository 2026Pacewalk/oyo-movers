import moment from "moment";
import { dateFormat } from "@/components/JobBooking/DateForPikup";
import {
  HOUSE_DEFAULT_FURNISHING,
  isHouseMovingService,
  isOfficeRelocationService,
} from "./opfServiceTypes";

const toInt = (value: unknown, fallback = 0) => {
  const parsed = typeof value === "number" ? value : parseInt(String(value ?? ""), 10);
  return Number.isFinite(parsed) ? parsed : fallback;
};

const toNumber = (value: unknown, fallback = 0) => {
  const parsed = typeof value === "number" ? value : parseFloat(String(value ?? ""));
  return Number.isFinite(parsed) ? parsed : fallback;
};

const inferStairsOrLift = (level: string | undefined, liftBooked: boolean, flights: number) => {
  if (liftBooked) return "lift";
  const lvl = (level || "").toLowerCase();
  if (lvl.includes("elevator") || lvl.includes("lift")) return "lift";
  if (flights > 0 || lvl.includes("flight")) return "stairs";
  // Backend validates stairsOrLift as only "stairs" | "lift".
  // Keep "level" for exact floor detail; use "stairs" as safe default enum value.
  return "stairs";
};

const mapAddressBlock = (block: any) => {
  if (!block) return null;

  const level = block?.level || "ground";
  const flights = toInt(block?.flightOfStairs, 0);
  const liftBooked = Boolean(block?.liftBooking);
  const additionalInformation =
    block?.additionalInformation ??
    block?.additionalInfo ??
    block?.note ??
    block?.notes ??
    "";

  return {
    additionalInformation,
    address: block?.address?.addressLine1 || "",
    lat: block?.address?.latitude ?? null,
    lng: block?.address?.longitude ?? null,
    level,
    stairsOrLift: inferStairsOrLift(level, liftBooked, flights),
    liftBooked,
    ...(liftBooked ? { liftBookingTime: block?.bookingTimeSlot || "" } : {}),
    numberOfFlights: flights,
  };
};

const mapStops = (stops: any[]) =>
  Array.isArray(stops)
    ? stops.map((stop: any) => ({
        id: stop?.id || "",
        ...mapAddressBlock(stop),
      }))
    : [];

const mapPublicAddressBlock = (block: any) => {
  const mapped = mapAddressBlock(block);
  return mapped;
};

const mapPublicStops = (stops: any[]) =>
  Array.isArray(stops)
    ? stops
        .map((stop: any) => {
          const mapped = mapPublicAddressBlock(stop);
          if (!mapped) return null;
          return {
            id: stop?.id || "",
            ...mapped,
          };
        })
        .filter(Boolean)
    : [];

const extractRoomCount = (space: string) => {
  if (!space) return "";
  const match = String(space).match(/^(\d+)/);
  return match ? match[1] : String(space);
};

const mapFurnishingLevel = (level: string) => {
  const map: Record<string, string> = {
    Lightly: "light",
    Moderately: "moderately",
    Heavily: "heavily",
  };
  return map[level] || String(level).toLowerCase();
};

const formatScheduledAt = (pickUpDate: string) => {
  if (!pickUpDate) return "";
  const parsed = moment(pickUpDate, [dateFormat, "YYYY-MM-DD", moment.ISO_8601], true);
  return parsed.isValid() ? parsed.format("YYYY-MM-DD") : pickUpDate;
};

const formatTime = (time: string) => {
  if (!time) return "00:00";
  const parsed = moment(time, ["HH:mm", "H:mm", "h:mm A", "hh:mm A", "hh:mma"], true);
  return parsed.isValid() ? parsed.format("HH:mm") : time;
};

export const findTimeslotById = (id: string | undefined, timeslots?: any) => {
  if (!id || !timeslots) return null;
  const allSlots = [
    ...(timeslots?.today?.slots || []),
    ...(timeslots?.tomorrow?.slots || []),
    ...(timeslots?.custom?.slots || []),
  ];
  return allSlots.find((slot: any) => String(slot._id) === String(id)) ?? null;
};

export const isAsapTimeslot = (slot: any) => slot?.name === "ASAP";

/** Match DateForPikup: ASAP must not send concrete start/end window times. */
export const resolvePickupTimesForSlot = (slot: any) => {
  if (isAsapTimeslot(slot)) {
    return { pickupStartTime: "", pickupEndTime: "" };
  }
  return {
    pickupStartTime: slot?.startTime || "",
    pickupEndTime: slot?.endTime || "",
  };
};

const buildPublicTimeSlot = (jobBooking: any, timeslots?: any) => {
  const slot = findTimeslotById(jobBooking?.pickUpSlot, timeslots);
  // Match normal booking: store clears times for ASAP; API expects valid HH:mm (00:00).
  if (isAsapTimeslot(slot)) {
    return { startTime: "00:00", endTime: "00:00" };
  }
  const start = jobBooking?.pickupStartTime || slot?.startTime || "";
  const end = jobBooking?.pickupEndTime || slot?.endTime || "";
  return {
    startTime: formatTime(start || "00:00"),
    endTime: formatTime(end || "00:00"),
    ...(slot?.name ? { name: slot.name } : {}),
  };
};

/** Payload shape expected by POST /public/quotations */
export const buildPublicQuotationPayload = (
  jobBooking: any,
  services: any,
  availableRequirements: any,
  serviceTypeFallback?: string,
  couponDetails?: any,
  timeslots?: any
) => {
  const selectedVehicle = Array.isArray(availableRequirements)
    ? availableRequirements.find(
        (item: any) => String(item?._id) === String(jobBooking?.vehicleType)
      )
    : null;

  const selectedService = Array.isArray(services)
    ? services.find((item: any) => String(item?._id) === String(jobBooking?.moverService))
    : null;

  const serviceType = selectedService?.name || jobBooking?.serviceType || serviceTypeFallback || "";
  const spaceInProperty = jobBooking?.spaceInProperty ?? "";
  const howFurnished = isHouseMovingService(serviceType)
    ? HOUSE_DEFAULT_FURNISHING
    : jobBooking?.howFurnished ?? "";

  const customerDetails = {
    name: jobBooking?.user?.firstname || "",
    email: jobBooking?.user?.email || "",
    phone: jobBooking?.user?.phone || "",
  companyName: jobBooking?.user?.companyName || "",
  };

  const pickup = mapAddressBlock(jobBooking?.pickUpLocation);
  const dropoff = mapAddressBlock(jobBooking?.dropOffLocation);
  const stopsFromAddresses =
    Array.isArray(jobBooking?.addresses) && jobBooking.addresses.length > 2
      ? jobBooking.addresses.slice(1, -1)
      : [];
  const stopSource = Array.isArray(jobBooking?.stopOvers)
    ? jobBooking.stopOvers
    : Array.isArray(jobBooking?.stops)
      ? jobBooking.stops
      : stopsFromAddresses;
  const scheduledAt = formatScheduledAt(jobBooking?.pickUpDate);
  const timeSlot = buildPublicTimeSlot(jobBooking, timeslots);
  const pickUpSlot = jobBooking?.pickUpSlot || "";
  const stops = mapStops(stopSource);
  const teamPricing = selectedVehicle?.vehicleType || "";
  const houseDetails =
    isHouseMovingService(serviceType) && howFurnished
      ? {
          numberOfRooms: extractRoomCount(spaceInProperty),
          furnishingLevel: mapFurnishingLevel(howFurnished),
        }
      : undefined;
  const listOfItems = jobBooking?.listOfItems ?? "";
  const dismantlingReassemblingRequired = Boolean(jobBooking?.dismantlingAndAssembly);
  const noteForMover = jobBooking?.noteForMover || "";
  const companyName = jobBooking?.user?.companyName || "";
  const recaptchaToken = jobBooking?.recaptchaToken || "";
  const selectedTeamPricing = selectedVehicle ? { ...selectedVehicle } : null;
  const promoCode = couponDetails?.code || "";

  const pricing = {
    baseRate: toNumber(selectedVehicle?.baseDeposit ?? jobBooking?.callOutFee, 50),
    hourlyRate: toNumber(selectedVehicle?.moverPrice, 0),
    estimatedHours: 4,
    additionalCharges: [] as unknown[],
    discount: 0,
    depositPercentage: 0,
    depositOptions: [] as unknown[],
  };
  const estimatedHours = pricing?.estimatedHours ?? 4;

  const rawData = {
    customerDetails,
    companyName,
    pickup,
    stops,
    stopOvers: stops,
    dropoff,
    scheduledAt,
    timeSlot,
    serviceType,
    teamPricing,
    pricing,
    ...(houseDetails ? { houseDetails } : {}),
    listOfItems,
    estimatedHours,
    dismantlingReassemblingRequired,
    selectedTeamPricing,
    ...(noteForMover
      ? {
          driverNotes: noteForMover,
          customerNotes: noteForMover,
          noteForMover,
        }
      : {}),
    ...(recaptchaToken ? { recaptchaToken } : {}),
  };

  return {
    customerDetails,
    companyName,
    serviceType,
    pickup,
    dropoff,
    scheduledAt,
    timeSlot,
    pickUpSlot,
    stops,
    stopOvers: stops,
    teamPricing,
    pricing,
    ...(houseDetails ? { houseDetails } : {}),
    listOfItems,
    estimatedHours,
    dismantlingReassemblingRequired,
    selectedTeamPricing,
    ...(noteForMover
      ? {
          driverNotes: noteForMover,
          customerNotes: noteForMover,
          noteForMover,
        }
      : {}),
    ...(recaptchaToken ? { recaptchaToken } : {}),
    ...(promoCode ? { promoCode } : {}),
    rawData: {
      ...(jobBooking && typeof jobBooking === "object" ? jobBooking : {}),
      ...rawData,
      stops,
      stopOvers: stops,
      ...(promoCode ? { promoCode } : {}),
    },
  };
};

export const buildQuotationPayload = (
  jobBooking: any,
  services: any,
  availableRequirements: any,
  couponDetails: any
) => {
  const selectedVehicle = Array.isArray(availableRequirements)
    ? availableRequirements.find(
        (item: any) => String(item?._id) === String(jobBooking?.vehicleType)
      )
    : null;

  const selectedService = Array.isArray(services)
    ? services.find((item: any) => String(item?._id) === String(jobBooking?.moverService))
    : null;

  const serviceTypeName = selectedService?.name || jobBooking?.serviceType || "";
  const spaceInProperty = jobBooking?.spaceInProperty ?? "";
  const howFurnished = isHouseMovingService(serviceTypeName)
    ? HOUSE_DEFAULT_FURNISHING
    : jobBooking?.howFurnished ?? "";

  return {
    houseDetails: howFurnished
      ? {
          numberOfRooms: spaceInProperty,
          furnishingLevel: howFurnished,
        }
      : null,
    officeDetails: isOfficeRelocationService(serviceTypeName)
      ? {
          size: spaceInProperty,
        }
      : null,
    promoCode: couponDetails?.code || "",
    serviceType: selectedService?.name,
    items: jobBooking?.listOfItems ?? [],
    distance: jobBooking?.distance,
    pickup: mapAddressBlock(jobBooking?.pickUpLocation),
    dropoff: mapAddressBlock(jobBooking?.dropOffLocation),
    stops: mapStops(jobBooking?.stopOvers),
    scheduledAt: jobBooking?.pickUpDate,
    timeSlot: {
      startTime: jobBooking?.pickupStartTime || "00:00",
      endTime: jobBooking?.pickupEndTime || "00:00",
    },
    pricing: {
      baseRate: selectedVehicle?.baseDeposit,
      hourlyRate: selectedVehicle?.moverPrice,
      estimatedHours: 4,
      additionalCharges: [],
      discount: 0,
      depositPercentage: 0,
      depositOptions: [],
    },
    selectedTeamPricing: {
      ...selectedVehicle,
    },
    teamRequirements: {
      movers: 1,
      helpers: selectedVehicle?.helperCount,
    },
    vehicleRequirements: {
      type: selectedVehicle?.vehicleType,
    },
    ...(jobBooking?.noteForMover
      ? {
          driverNotes: jobBooking?.noteForMover,
          customerNotes: jobBooking?.noteForMover,
        }
      : {}),
    dismantlingReassemblingRequired: Boolean(jobBooking?.dismantlingAndAssembly),
    packingAndMoving: Boolean(jobBooking?.packingAndUnpacking),
    photos: Array.isArray(jobBooking?.itemImages) ? jobBooking.itemImages : [],
    rawData: jobBooking,
  };
};
