"use client";

import React from "react";
import { useSearchParams } from "next/navigation";
import TruckLoader from "@/components/TruckLoader";

type OnePagePaymentGateProps = {
  children: React.ReactNode;
};

/**
 * Hides the booking UI while Stripe redirects back with payment_intent
 * (server redirect / CheckPayment runs before user sees Review page again).
 */
const OnePagePaymentGate: React.FC<OnePagePaymentGateProps> = ({ children }) => {
  const searchParams = useSearchParams();
  const paymentIntent = searchParams.get("payment_intent");

  if (paymentIntent) {
    return <TruckLoader />;
  }

  return <>{children}</>;
};

export default OnePagePaymentGate;
