"use client";
import { useEffect, useRef, useState } from "react";
import TruckLoader from "@/components/TruckLoader";
import { useJobBooking } from "../JobBookingHook";
import { successToast } from "@/lib/toaster";
import {
  buildConfirmationSnapshot,
  loadBookingConfirmationSnapshot,
  resolveConfirmationJobId,
  resolveQuotationLookupId,
  saveBookingConfirmationSnapshot,
} from "@/utils/bookingConfirmationStorage";

const CheckPayment = ({
  isPaymentDone,
  pendingPayment,
  confirmationPath = "/booking/confirmation",
}: {
  isPaymentDone?: boolean | null;
  pendingPayment?: string;
  confirmationPath?: string;
}) => {
  const { jobBooking, resetStep, resetJobBooking, resetLabour, setReBooking, setMoverData, quotation } =
    useJobBooking();
  const hasShownToast = useRef(false);
  const [completing, setCompleting] = useState(false);

  const resetBookingData = () => {
    resetStep();
    resetJobBooking();
    resetLabour();
    setReBooking({});
    setMoverData("");
  };
  const resetState = () => {
    resetBookingData();
    setTimeout(() => {
      window.location.replace("/booking");
    }, 2000);
  };
  useEffect(() => {
    // Prevent duplicate toast if effect runs multiple times
    if (hasShownToast.current) return;

    if (isPaymentDone === true) {
      // if (true) {
      hasShownToast.current = true;
      setCompleting(true);
      successToast(pendingPayment ? "Payement Done Successfully" : "Booking Created Successfully");

      // resetState();

      const lookupId = resolveQuotationLookupId(quotation);
      const displayJobId = resolveConfirmationJobId(quotation);

      const existing = loadBookingConfirmationSnapshot();
      if (!existing?.pickupLine && !existing?.dropoffLine) {
        const built = buildConfirmationSnapshot(jobBooking, displayJobId);
        if (built.pickupLine || built.dropoffLine) {
          saveBookingConfirmationSnapshot(built);
        }
      }

      resetBookingData();
      const params = new URLSearchParams({ payment: "success" });
      if (lookupId) params.set("quotationId", String(lookupId));
      if (displayJobId) params.set("jobId", String(displayJobId));
      window.location.replace(`${confirmationPath}?${params.toString()}`);

    } else if (isPaymentDone === false) {
      hasShownToast.current = true;
      console.log("isPaymentDone");
      successToast("Quotation Created Successfully");
      resetState();
    }
  }, [isPaymentDone, pendingPayment]);

  return completing ? <TruckLoader /> : null;
};

export default CheckPayment;
