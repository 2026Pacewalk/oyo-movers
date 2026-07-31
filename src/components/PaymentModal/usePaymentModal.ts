"use client";

import { useCallback, useState } from "react";
import {
  appendPaymentEmbedParams,
  savePaymentEmbedSession,
  type PaymentEmbedSession,
} from "@/utils/paymentIframeBridge";

export type OpenPaymentModalOptions = {
  quotationId?: string | null;
  displayJobId?: string | null;
  confirmationPath?: string;
};

export function usePaymentModal(defaultConfirmationPath = "/booking/confirmation") {
  const [show, setShow] = useState(false);
  const [paymentLink, setPaymentLink] = useState<string | null>(null);

  const open = useCallback(
    (link: string, options: OpenPaymentModalOptions = {}) => {
      const confirmationPath = options.confirmationPath || defaultConfirmationPath;
      const embeddedLink = appendPaymentEmbedParams(link);

      if (typeof window !== "undefined") {
        const session: PaymentEmbedSession = {
          parentOrigin: window.location.origin,
          quotationId: options.quotationId ?? null,
          displayJobId: options.displayJobId ?? null,
          confirmationPath,
        };
        savePaymentEmbedSession(session);
      }

      setPaymentLink(embeddedLink);
      setShow(true);
    },
    [defaultConfirmationPath]
  );

  const close = useCallback(() => {
    setShow(false);
    setPaymentLink(null);
  }, []);

  return { show, paymentLink, open, close };
}
