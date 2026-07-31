"use client";

import { useEffect, useRef, useState } from "react";
import { flushSync } from "react-dom";
import TruckLoader from "@/components/TruckLoader";
import { successToast } from "@/lib/toaster";
import {
  handlePaymentIframeSuccess,
  isAllowedPayOrigin,
  isPaymentIframeSuccessMessage,
  PAYMENT_PARENT_MESSAGE_TYPE,
} from "@/utils/paymentIframeBridge";

type PaymentEmbedBridgeProps = {
  suppressSuccessToast?: boolean;
};

/**
 * Global listener on booking pages — closes the payment modal flow when the iframe
 * posts success (works even if PaymentModal remounts or the listener was missed).
 */
const PaymentEmbedBridge: React.FC<PaymentEmbedBridgeProps> = ({
  suppressSuccessToast = false,
}) => {
  const handledRef = useRef(false);
  const [completing, setCompleting] = useState(false);

  useEffect(() => {
    handledRef.current = false;

    const onMessage = (event: MessageEvent) => {
      if (handledRef.current) return;
      if (!isPaymentIframeSuccessMessage(event.data)) return;
      if (event.data.type !== PAYMENT_PARENT_MESSAGE_TYPE) return;
      if (!isAllowedPayOrigin(event.origin, null)) return;

      handledRef.current = true;

      flushSync(() => setCompleting(true));

      if (!suppressSuccessToast) {
        successToast(
          event.data.variant === "already_paid"
            ? "Payment already completed"
            : "Booking created successfully"
        );
      }

      window.dispatchEvent(new CustomEvent("oyo-close-payment-modal"));

      handlePaymentIframeSuccess(event.data);
    };

    window.addEventListener("message", onMessage);
    return () => window.removeEventListener("message", onMessage);
  }, [suppressSuccessToast]);

  return completing ? <TruckLoader /> : null;
};

export default PaymentEmbedBridge;
