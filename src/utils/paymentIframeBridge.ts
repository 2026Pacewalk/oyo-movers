export const PAYMENT_PARENT_MESSAGE_TYPE = "oyo_payment_success" as const;
export const PAYMENT_RESIZE_MESSAGE_TYPE = "oyo_payment_resize" as const;

export const PAYMENT_EMBED_SESSION_KEY = "oyo_payment_embed";

export const PAYMENT_RETURN_FLOW_ONE_PAGE = "one-page-booking";

const DEFAULT_PAY_ORIGINS = [
  "https://testpayoyomover.oyomovers.com.au",
  "https://payoyomover.oyomovers.com.au",
];

export type PaymentIframeSuccessMessage = {
  type: typeof PAYMENT_PARENT_MESSAGE_TYPE;
  variant?: "fresh" | "already_paid";
  paymentIntentId?: string;
  amountCents?: number;
  quotationId?: string;
  returnFlow?: string | null;
};

export type PaymentEmbedSession = {
  parentOrigin: string;
  quotationId?: string | null;
  displayJobId?: string | null;
  confirmationPath?: string;
};

export function isPaymentIframeSuccessMessage(
  data: unknown
): data is PaymentIframeSuccessMessage {
  if (!data || typeof data !== "object") return false;
  return (data as PaymentIframeSuccessMessage).type === PAYMENT_PARENT_MESSAGE_TYPE;
}

export type PaymentIframeResizeMessage = {
  type: typeof PAYMENT_RESIZE_MESSAGE_TYPE;
  height: number;
};

export function isPaymentIframeResizeMessage(
  data: unknown
): data is PaymentIframeResizeMessage {
  if (!data || typeof data !== "object") return false;
  const msg = data as PaymentIframeResizeMessage;
  return (
    msg.type === PAYMENT_RESIZE_MESSAGE_TYPE &&
    typeof msg.height === "number" &&
    msg.height > 0
  );
}

export function getPaymentLinkOrigin(paymentLink: string | null): string | null {
  if (!paymentLink) return null;
  try {
    return new URL(paymentLink).origin;
  } catch {
    return null;
  }
}

export function getAllowedPayOrigins(paymentLink: string | null): string[] {
  const origins = new Set<string>(DEFAULT_PAY_ORIGINS);

  const fromEnv = process.env.NEXT_PUBLIC_PAYMENT_LINK_URL;
  if (fromEnv) {
    try {
      origins.add(new URL(fromEnv).origin);
    } catch {
      /* ignore */
    }
  }

  const fromLink = getPaymentLinkOrigin(paymentLink);
  if (fromLink) origins.add(fromLink);

  return Array.from(origins);
}

export function isAllowedPayOrigin(origin: string, paymentLink: string | null): boolean {
  return getAllowedPayOrigins(paymentLink).includes(origin);
}

export function appendPaymentEmbedParams(link: string): string {
  try {
    const url = new URL(link);
    url.searchParams.set("embed", "1");
    if (typeof window !== "undefined") {
      url.searchParams.set("parent_origin", window.location.origin);
    }
    return url.toString();
  } catch {
    return link;
  }
}

export function savePaymentEmbedSession(session: PaymentEmbedSession): void {
  if (typeof window === "undefined") return;
  try {
    sessionStorage.setItem(PAYMENT_EMBED_SESSION_KEY, JSON.stringify(session));
  } catch {
    /* ignore */
  }
}

export function loadPaymentEmbedSession(): PaymentEmbedSession | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = sessionStorage.getItem(PAYMENT_EMBED_SESSION_KEY);
    if (!raw) return null;
    return JSON.parse(raw) as PaymentEmbedSession;
  } catch {
    return null;
  }
}

export function clearPaymentEmbedSession(): void {
  if (typeof window === "undefined") return;
  try {
    sessionStorage.removeItem(PAYMENT_EMBED_SESSION_KEY);
  } catch {
    /* ignore */
  }
}

export function buildPaymentConfirmationUrl(
  confirmationPath: string,
  quotationId?: string | null,
  displayJobId?: string | null
): string {
  const params = new URLSearchParams({ payment: "success" });
  if (quotationId) params.set("quotationId", String(quotationId));
  if (displayJobId) params.set("jobId", String(displayJobId));
  const path = confirmationPath.startsWith("/")
    ? confirmationPath
    : `/${confirmationPath}`;
  return `${path}?${params.toString()}`;
}

export function handlePaymentIframeSuccess(
  message: PaymentIframeSuccessMessage,
  options: {
    quotationId?: string | null;
    displayJobId?: string | null;
    confirmationPath?: string;
    onClose?: () => void;
  } = {}
): void {
  const session = loadPaymentEmbedSession();
  clearPaymentEmbedSession();
  options.onClose?.();

  const isOnePage = message.returnFlow === PAYMENT_RETURN_FLOW_ONE_PAGE;
  const path = isOnePage
    ? "/one-page-booking/confirmation"
    : options.confirmationPath || session?.confirmationPath || "/booking/confirmation";

  const qid = message.quotationId || options.quotationId || session?.quotationId;
  const displayJobId = options.displayJobId || session?.displayJobId;
  const url = buildPaymentConfirmationUrl(path, qid, displayJobId);

  window.location.replace(url);
}
