import { getApi, postApi, putApi } from "@/lib/api";
import { resolveConfirmationJobId } from "@/utils/bookingConfirmationStorage";

const PENDING_QUOTATION_ID_KEY = "pendingQuotationId";

export type PublicQuotationContact = {
  email: string;
  phone: string;
};

export function getQuotationPaymentLink(quotation: any): string | null {
  const link =
    quotation?.paymentLink || quotation?.paymentRecords?.[0]?.paymentLink;
  return link && String(link).length > 0 ? String(link) : null;
}

/** Prefer Mongo _id / quotationId for PUT. */
export function getQuotationId(quotation: any): string | null {
  const id = quotation?._id || quotation?.quotationId;
  return id ? String(id) : null;
}

export function buildPublicContactQuery(contact: PublicQuotationContact): string {
  const params = new URLSearchParams();
  if (contact.email?.trim()) params.set("email", contact.email.trim());
  if (contact.phone?.trim()) params.set("phone", contact.phone.trim());
  const query = params.toString();
  return query ? `?${query}` : "";
}

export function extractQuotationFromResponse(response: any): any | null {
  const raw =
    response?.data?.data?.quotation ??
    response?.data?.quotation ??
    response?.data?.data ??
    response?.data ??
    response ??
    null;

  if (!raw || typeof raw !== "object") return null;
  if (raw.quotation && typeof raw.quotation === "object") return raw.quotation;
  return raw;
}

function normalizeQuotationRecord(raw: any, quotationId: string): any | null {
  if (!raw || typeof raw !== "object") return null;
  const record = raw.quotation && typeof raw.quotation === "object" ? raw.quotation : raw;
  const lookupId = record._id || quotationId;
  const existingRef =
    record.quotationId && !/^[a-f0-9]{24}$/i.test(String(record.quotationId))
      ? String(record.quotationId)
      : undefined;
  return {
    ...record,
    _id: lookupId,
    quotationId: existingRef || record.quotationNumber || record.reference || lookupId,
  };
}

function extractPaymentLinkFromResponse(
  response: any,
  fallbackQuotation?: any
): string | null {
  const quotation = extractQuotationFromResponse(response);
  const fromQuotation = quotation ? getQuotationPaymentLink(quotation) : null;
  if (fromQuotation) return fromQuotation;

  const topLevel =
    response?.data?.paymentLink ||
    response?.data?.data?.paymentLink ||
    response?.paymentLink;
  if (topLevel && String(topLevel).length > 0) return String(topLevel);

  if (fallbackQuotation) return getQuotationPaymentLink(fallbackQuotation);
  return null;
}

export function savePendingQuotationId(id: string) {
  if (typeof window === "undefined" || !id) return;
  try {
    sessionStorage.setItem(PENDING_QUOTATION_ID_KEY, id);
  } catch {
    // ignore storage errors
  }
}

export function getStoredPendingQuotationId(): string | null {
  if (typeof window === "undefined") return null;
  try {
    return sessionStorage.getItem(PENDING_QUOTATION_ID_KEY);
  } catch {
    return null;
  }
}

export function clearPendingQuotationId() {
  if (typeof window === "undefined") return;
  try {
    sessionStorage.removeItem(PENDING_QUOTATION_ID_KEY);
  } catch {
    // ignore
  }
}

/** GET /quotations/:quotationId (logged-in customer). */
export async function fetchQuotationById(
  quotationId: string
): Promise<any | null> {
  if (!quotationId?.trim()) return null;

  try {
    const res = await getApi(`quotations/${quotationId.trim()}`);
    return normalizeQuotationRecord(res, quotationId.trim());
  } catch (err) {
    console.error("Failed to fetch quotation by id:", err);
    return null;
  }
}

/** GET /public/quotations/:quotationId?email=...&phone=... (one-page booking). */
export async function fetchPublicQuotationById(
  quotationId: string,
  contact: PublicQuotationContact
): Promise<any | null> {
  if (!quotationId?.trim()) return null;
  if (!contact.email?.trim() && !contact.phone?.trim()) return null;

  try {
    const query = buildPublicContactQuery(contact);
    const res = await getApi(`public/quotations/${quotationId.trim()}${query}`);
    const extracted =
      extractQuotationFromResponse({ data: res }) ??
      extractQuotationFromResponse(res) ??
      (res?.quotation && typeof res.quotation === "object" ? res.quotation : res);
    if (!extracted || typeof extracted !== "object") return null;
    return normalizeQuotationRecord(extracted, quotationId.trim());
  } catch (err) {
    console.error("Failed to fetch public quotation by id:", err);
    return null;
  }
}

export function resolveQuotationIdForUpdate(
  existingQuotationInStore?: any | null,
  explicitQuotationId?: string | null
): string | null {
  if (explicitQuotationId && String(explicitQuotationId).trim()) {
    return String(explicitQuotationId).trim();
  }

  const fromStore = getQuotationId(existingQuotationInStore);
  if (fromStore) return fromStore;

  const fromSession = getStoredPendingQuotationId();
  if (fromSession) return fromSession;

  return null;
}

async function updateQuotationById(
  quotationId: string,
  payload: Record<string, unknown>,
  fallbackQuotation?: any,
  options?: {
    mode?: "authenticated" | "public";
    publicContact?: PublicQuotationContact;
  }
): Promise<{
  success: boolean;
  quotation?: any;
  paymentLink?: string;
  error?: string;
}> {
  const isPublic = options?.mode === "public" && options.publicContact;

  try {
    const putUrl = isPublic
      ? `public/quotations/${quotationId}${buildPublicContactQuery(options.publicContact!)}`
      : `quotations/${quotationId}/`;

    const updateRes = await putApi(putUrl, payload);

    if (updateRes.status === 200 || updateRes.status === 201) {
      const updated = extractQuotationFromResponse(updateRes);
      const shortRef =
        resolveConfirmationJobId(updated) ||
        resolveConfirmationJobId(fallbackQuotation);
      const merged = updated
        ? {
            ...fallbackQuotation,
            ...updated,
            _id: quotationId,
            quotationId: shortRef || updated?.quotationId || quotationId,
          }
        : {
            ...fallbackQuotation,
            _id: quotationId,
            quotationId: shortRef || quotationId,
          };
      const link = extractPaymentLinkFromResponse(updateRes, merged);

      if (link) {
        return { success: true, quotation: merged, paymentLink: link };
      }

      return {
        success: false,
        error: "Payment link not available after update. Please try again.",
      };
    }

    return {
      success: false,
      error:
        updateRes?.data?.message ||
        "Failed to update quotation. Please try again.",
    };
  } catch (error: any) {
    return {
      success: false,
      error:
        error?.response?.data?.message ||
        error?.message ||
        "Failed to update quotation. Please try again.",
    };
  }
}

type SecureQuotationOptions = {
  payload: Record<string, unknown>;
  existingQuotationInStore?: any | null;
  quotationId?: string | null;
  createEndpoint?: string;
  /** Use public GET/PUT with email+phone query (one-page booking only). */
  mode?: "authenticated" | "public";
  publicContact?: PublicQuotationContact;
};

/**
 * - Known quotation id → PUT (authenticated or public)
 * - No id → POST
 */
export async function secureQuotationWithDeposit({
  payload,
  existingQuotationInStore,
  quotationId: explicitQuotationId,
  createEndpoint = "quotations",
  mode = "authenticated",
  publicContact,
}: SecureQuotationOptions): Promise<{
  success: boolean;
  quotation?: any;
  paymentLink?: string;
  error?: string;
}> {
  if (mode === "public" && (!publicContact?.email?.trim() || !publicContact?.phone?.trim())) {
    return {
      success: false,
      error: "Email and phone are required for public booking.",
    };
  }

  const quotationId = resolveQuotationIdForUpdate(
    existingQuotationInStore,
    explicitQuotationId
  );

  if (quotationId) {
    const updateResult = await updateQuotationById(
      quotationId,
      payload,
      existingQuotationInStore ?? { _id: quotationId, quotationId },
      mode === "public" && publicContact
        ? { mode: "public", publicContact }
        : { mode: "authenticated" }
    );
    if (updateResult.success) {
      savePendingQuotationId(quotationId);
    }
    return updateResult;
  }

  try {
    const response = await postApi(createEndpoint, payload);
    if (response.status === 201 || response.status === 200) {
      const quotationData = extractQuotationFromResponse(response);
      const link = extractPaymentLinkFromResponse(response, quotationData);
      const newId = quotationData ? getQuotationId(quotationData) : null;

      if (quotationData && link) {
        if (newId) savePendingQuotationId(newId);
        const normalized = normalizeQuotationRecord(
          quotationData,
          newId || getQuotationId(quotationData) || ""
        );
        return {
          success: true,
          quotation: normalized || quotationData,
          paymentLink: link,
        };
      }
      return {
        success: false,
        error: "Payment link not available. Please try again.",
      };
    }

    return {
      success: false,
      error:
        response?.data?.message ||
        "Failed to secure booking. Please try again.",
    };
  } catch (error: any) {
    return {
      success: false,
      error:
        error?.response?.data?.message ||
        error?.message ||
        "Failed to secure booking. Please try again.",
    };
  }
}
