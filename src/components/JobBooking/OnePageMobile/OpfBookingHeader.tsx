"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { FaArrowLeft, FaPhoneVolume } from "react-icons/fa6";

const SUPPORT_PHONE = "tel:1300 01 31 31";

type OpfBookingHeaderProps = {
  onBack?: () => void;
  showBack?: boolean;
  variant?: "booking" | "confirmation";
};

const OpfBookingHeader: React.FC<OpfBookingHeaderProps> = ({
  onBack,
  showBack = true,
  variant = "booking",
}) => {
  const router = useRouter();
  const isConfirmation = variant === "confirmation";
  const hideBack = isConfirmation || !showBack;

  const handleBack = () => {
    if (onBack) {
      onBack();
      return;
    }
    if (typeof window !== "undefined" && window.history.length > 1) {
      router.back();
      return;
    }
    router.push("/");
  };

  return (
    <header
      className={`opf-route-header${isConfirmation ? " opf-route-header--logo-start" : ""}`}
    >
      {!hideBack && (
        <button
          type="button"
          className="opf-route-header__icon-btn"
          onClick={handleBack}
          aria-label="Go back"
        >
          <FaArrowLeft />
        </button>
      )}

      <a href="/" className="opf-route-header__logo" aria-label="OYO Movers home">
        <img src="/images/Oyo-Black.png" alt="OYO Movers" width={84} height={33} />
      </a>

      <a
        href={SUPPORT_PHONE}
        className="opf-route-header__icon-btn"
        aria-label="Call OYO Movers"
      >
        <FaPhoneVolume />
      </a>
    </header>
  );
};

export default OpfBookingHeader;
