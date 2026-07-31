const QUOTE_FLOW_PAYLOAD_KEY = "quoteFlowPayload";
const QUOTE_FLOW_PENDING_KEY = "quoteFlowPending";
/** @deprecated Legacy key — still cleared on consume */
const LEGACY_BOOKING_DATA_KEY = "bookingData";
const LEGACY_CURRENT_STEP_KEY = "currentStep";

export function clearQuoteFlowStorage() {
  if (typeof window === "undefined") return;
  sessionStorage.removeItem(QUOTE_FLOW_PAYLOAD_KEY);
  sessionStorage.removeItem(QUOTE_FLOW_PENDING_KEY);
  sessionStorage.removeItem(LEGACY_BOOKING_DATA_KEY);
  sessionStorage.removeItem(LEGACY_CURRENT_STEP_KEY);
}

/** Save quote → booking handoff (survives full page load to /booking). */
export function persistQuoteAddressesForBooking(
  jobBooking: Record<string, unknown>,
  pickUpLocation: unknown,
  dropOffLocation: unknown
) {
  if (typeof window === "undefined") return;

  const payload = {
    ...jobBooking,
    pickUpLocation,
    dropOffLocation,
  };

  sessionStorage.setItem(QUOTE_FLOW_PAYLOAD_KEY, JSON.stringify(payload));
  sessionStorage.setItem(QUOTE_FLOW_PENDING_KEY, "1");
  sessionStorage.setItem(LEGACY_CURRENT_STEP_KEY, "0");
}

export function getQuoteFlowPayload(): string | null {
  if (typeof window === "undefined") return null;
  return (
    sessionStorage.getItem(QUOTE_FLOW_PAYLOAD_KEY) ||
    sessionStorage.getItem(LEGACY_BOOKING_DATA_KEY)
  );
}

export function isQuoteFlowPending(): boolean {
  if (typeof window === "undefined") return false;
  return sessionStorage.getItem(QUOTE_FLOW_PENDING_KEY) === "1";
}

export function consumeQuoteFlowStorage() {
  if (typeof window === "undefined") return;
  sessionStorage.removeItem(QUOTE_FLOW_PAYLOAD_KEY);
  sessionStorage.removeItem(QUOTE_FLOW_PENDING_KEY);
  sessionStorage.removeItem(LEGACY_BOOKING_DATA_KEY);
  sessionStorage.removeItem(LEGACY_CURRENT_STEP_KEY);
}

export function navigateToBookingFromQuote() {
  if (typeof window === "undefined") return;
  window.location.href = "/booking?fromQuote=1";
}
