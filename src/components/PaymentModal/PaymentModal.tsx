"use client";

import React, { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { FaXmark } from "react-icons/fa6";
import CustomModal from "@/components/CustomModal";
import { useMediaQuery } from "@/utils/hooks/useMediaQuery";
import {
  isAllowedPayOrigin,
  isPaymentIframeResizeMessage,
} from "@/utils/paymentIframeBridge";
import "./PaymentModal.scss";

export type PaymentModalProps = {
  show: boolean;
  paymentLink: string | null;
  onClose: () => void;
  confirmationPath?: string;
  quotationId?: string | null;
};

const MOBILE_SHEET_MQ = "(max-width: 991px)";
const MOBILE_SHEET_TOPBAR_PX = 62;
const MOBILE_SHEET_VIEWPORT_RATIO = 0.85;

const PaymentModal: React.FC<PaymentModalProps> = ({
  show,
  paymentLink,
  onClose,
}) => {
  const [iframeHeight, setIframeHeight] = useState<number | null>(null);
  const [mounted, setMounted] = useState(false);
  const isMobileSheet = useMediaQuery(MOBILE_SHEET_MQ);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const closeModal = () => onClose();
    window.addEventListener("oyo-close-payment-modal", closeModal);
    return () => window.removeEventListener("oyo-close-payment-modal", closeModal);
  }, [onClose]);

  useEffect(() => {
    if (!show) {
      setIframeHeight(null);
    }
  }, [show, paymentLink]);

  useEffect(() => {
    if (!show || !isMobileSheet) return;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prevOverflow;
    };
  }, [show, isMobileSheet]);

  useEffect(() => {
    if (!show || !isMobileSheet) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [show, isMobileSheet, onClose]);

  useEffect(() => {
    if (!show || !paymentLink) return;

    const onMessage = (event: MessageEvent) => {
      if (!isPaymentIframeResizeMessage(event.data)) return;
      if (!isAllowedPayOrigin(event.origin, paymentLink)) return;

      const headerAllowance = isMobileSheet ? MOBILE_SHEET_TOPBAR_PX : 56;
      const viewportCap = isMobileSheet ? MOBILE_SHEET_VIEWPORT_RATIO : 0.92;
      const max = Math.min(window.innerHeight * viewportCap, 900);
      const minHeight = isMobileSheet
        ? Math.max(360, window.innerHeight * MOBILE_SHEET_VIEWPORT_RATIO - headerAllowance)
        : 400;
      const next = Math.min(
        max,
        Math.max(minHeight, Math.ceil(event.data.height + headerAllowance))
      );
      setIframeHeight(next);
    };

    window.addEventListener("message", onMessage);
    return () => window.removeEventListener("message", onMessage);
  }, [show, paymentLink, isMobileSheet]);

  if (!paymentLink) return null;

  const iframeEl = (
    <iframe
      src={paymentLink}
      title="Secure payment"
      className={`payment-modal__iframe${
        iframeHeight != null ? " payment-modal__iframe--sized" : ""
      }`}
      style={iframeHeight != null ? { height: iframeHeight } : undefined}
      allow="payment *; fullscreen; clipboard-write"
      referrerPolicy="strict-origin-when-cross-origin"
    />
  );

  if (isMobileSheet) {
    if (!show || !mounted) return null;
    return createPortal(
      <div
        className="payment-sheet"
        role="dialog"
        aria-modal="true"
        aria-label="Secure payment"
      >
        <div className="payment-sheet__backdrop" aria-hidden />
        <div className="payment-sheet__panel">
          <div className="payment-sheet__topbar">
            <img
              src="/images/Oyo-Black.png"
              alt="OYO Movers"
              className="payment-sheet__logo"
            />
            <button
              type="button"
              className="payment-sheet__close"
              onClick={onClose}
              aria-label="Close"
            >
              <FaXmark />
            </button>
          </div>
          <div className="payment-sheet__body">{iframeEl}</div>
        </div>
      </div>,
      document.body
    );
  }

  return (
    <CustomModal
      title=""
      close={onClose}
      show={show}
      showFooter={false}
      closeButton={false}
      size="lg"
      mainClassName="fareModalwrapper payment-modal payment-modal--minimal"
      className="payment-modal__body"
      backdrop="static"
      keyboard
    >
      <div className="payment-modal__header">
        <button
          type="button"
          className="payment-modal__icon-btn payment-modal__icon-btn--close"
          onClick={onClose}
          aria-label="Close"
        >
          <FaXmark />
        </button>
      </div>
      {iframeEl}
    </CustomModal>
  );
};

export default PaymentModal;
