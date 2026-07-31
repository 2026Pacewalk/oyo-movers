export const HOUSE_MOVING_SERVICE_NAMES = ["House Moving", "House or Apartment"];
export const OFFICE_RELOCATION_SERVICE_NAME = "Office Relocation";

export const FURNISHING_OPTIONS = ["Lightly", "Moderately", "Heavily"] as const;

/** Always sent for house/apartment bookings (furnishing UI hidden). */
export const HOUSE_DEFAULT_FURNISHING = "Moderately";

export const isHouseMovingService = (name?: string) =>
  Boolean(name && HOUSE_MOVING_SERVICE_NAMES.includes(name));

export const isOfficeRelocationService = (name?: string) => name === OFFICE_RELOCATION_SERVICE_NAME;

export const getServiceInquiryOptions = (service?: any) => {
  if (!service?.moreInquiry?.inputs) return [];
  return Object.values(service.moreInquiry.inputs)
    .map((item: any) => item?.input)
    .filter((input: any) => input?.type === "radio" && input?.title)
    .map((input: any) => ({ id: input.title, name: input.title }));
};

/** First office size from service config; used when office picker UI is hidden. */
export const getDefaultOfficeSpaceInProperty = (service?: any) =>
  getServiceInquiryOptions(service)[0]?.name ?? "";
