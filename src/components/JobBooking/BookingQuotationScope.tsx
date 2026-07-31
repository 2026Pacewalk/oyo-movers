"use client";

import { useEffect } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import { useJobBooking } from "./JobBookingHook";
import {
  clearPendingQuotationId,
  fetchPublicQuotationById,
  fetchQuotationById,
  getQuotationId,
  getQuotationPaymentLink,
  getStoredPendingQuotationId,
  savePendingQuotationId,
} from "@/utils/secureQuotation";

const isOnePageBookingPath = (pathname: string) =>
  pathname.includes("/quick-booking");

/**
 * Hydrates quotation via GET by id:
 * - /booking → GET /quotations/:id
 * - /quick-booking → GET /public/quotations/:id?email=&phone=
 */
const BookingQuotationScope = () => {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { jobBooking, quotation, setQuotation } = useJobBooking();

  const urlQuotationId = searchParams.get("quotationId");
  const isOnePage = isOnePageBookingPath(pathname ?? "");

  const hasPickupStarted = Boolean(
    jobBooking?.pickUpLocation?.address?.addressLine1 ||
      jobBooking?.pickUpLocation?.address?.locality
  );

  const email = jobBooking?.user?.email?.trim() ?? "";
  const phone = jobBooking?.user?.phone?.trim() ?? "";

  useEffect(() => {
    let cancelled = false;

    const hydrateQuotation = async (id: string) => {
      savePendingQuotationId(id);

      let full = null;
      if (isOnePage && email && phone) {
        full = await fetchPublicQuotationById(id, { email, phone });
      } else if (!isOnePage) {
        full = await fetchQuotationById(id);
      }

      if (cancelled) return;

      if (full) {
        setQuotation(full);
        return;
      }

      setQuotation({ _id: id, quotationId: id });
    };

    const resolveIdToHydrate = (): string | null => {
      if (urlQuotationId) return urlQuotationId;
      if (!hasPickupStarted) return null;
      const currentId = getQuotationId(quotation);
      const storedId = getStoredPendingQuotationId();
      if (currentId && getQuotationPaymentLink(quotation)) return null;
      if (storedId && storedId !== currentId) return storedId;
      if (storedId && !currentId) return storedId;
      return null;
    };

    if (!urlQuotationId && !hasPickupStarted) {
      clearPendingQuotationId();
      if (quotation) setQuotation(null);
      return;
    }

    const idToHydrate = resolveIdToHydrate();
    if (!idToHydrate) return;

    const currentId = getQuotationId(quotation);
    if (
      currentId === idToHydrate &&
      getQuotationPaymentLink(quotation) &&
      (!isOnePage || (email && phone))
    ) {
      return;
    }

    if (isOnePage && (!email || !phone)) {
      if (currentId !== idToHydrate) {
        setQuotation({ _id: idToHydrate, quotationId: idToHydrate });
      }
      return;
    }

    hydrateQuotation(idToHydrate);

    return () => {
      cancelled = true;
    };
  }, [
    urlQuotationId,
    hasPickupStarted,
    isOnePage,
    email,
    phone,
  ]);

  return null;
};

export default BookingQuotationScope;
