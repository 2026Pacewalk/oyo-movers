"use client";
import React, { useEffect } from "react";
import { useJobBooking } from "../JobBookingHook";
import useCreateDraft from "@/utils/hooks/useCreateDraft";

const CheckStep = ({ step }) => {
  const { setDraftData } = useCreateDraft();
  const { setStep, resetJobBooking } = useJobBooking();

  useEffect(() => {
    if (step) {
      setStep(Number(step));
      // Use router.push instead of window.history.replaceState to avoid hydration issues
      // window.history.replaceState(null, "", "/booking");
    }
    return () => {
      // resetJobBooking();
      // setStep(0);
      // setDraftData(null);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [step]);

  return null;
};

export default React.memo(CheckStep);
