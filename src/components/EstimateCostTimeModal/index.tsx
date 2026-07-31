"use client";

import React, { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { FaXmark } from "react-icons/fa6";
import { BsInfoCircle } from "react-icons/bs";
import { TfiInfoAlt } from "react-icons/tfi";
import EstimateCostSlider from "@/components/EstimateCostSlider";
import "./estimateCostTimeModal.scss";

type EstimateCostTimeModalProps = {
  show: boolean;
  onClose: () => void;
  vehicalData: any[];
  jobBooking: { vehicleType?: string };
  variant?: "mobile" | "desktop";
};

const EstimateCostTimeModal = ({
  show,
  onClose,
  vehicalData,
  jobBooking,
  variant = "mobile",
}: EstimateCostTimeModalProps) => {
  const isDesktop = variant === "desktop";
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!show) return;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prevOverflow;
    };
  }, [show]);

  useEffect(() => {
    if (!show) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [show, onClose]);

  if (!show || !mounted) return null;

  return createPortal(
    <div
      className={`opf-estimate-sheet${isDesktop ? " opf-estimate-sheet--desktop" : ""}`}
      role="dialog"
      aria-modal="true"
      aria-labelledby="opf-estimate-sheet-title"
    >
      <button
        type="button"
        className="opf-estimate-sheet__backdrop"
        aria-label="Close Estimated Cost and Time"
        onClick={onClose}
      />
      <div className="opf-estimate-sheet__panel">
        <div className="opf-estimate-sheet__topbar">
          <button
            type="button"
            className="opf-estimate-sheet__close"
            onClick={onClose}
            aria-label="Close"
          >
            <FaXmark />
          </button>
        </div>

        <div className="opf-estimate-sheet__body">
          <EstimateCostSlider
            vehicalData={vehicalData}
            jobBooking={jobBooking}
            variant={variant}
          />
        </div>

        <div className="opf-estimate-sheet__footer">
          {isDesktop ? (
            <div className="opf-estimate-sheet__disclaimer opf-estimate-sheet__disclaimer--info">
              <TfiInfoAlt className="opf-estimate-sheet__disclaimer-icon" aria-hidden />
              <div className="opf-estimate-sheet__disclaimer-copy">
                <p className="opf-estimate-sheet__disclaimer-line opf-estimate-sheet__disclaimer-line--primary">
                  Estimate only, Final Price may vary based on actual work time.
                </p>
                <p className="opf-estimate-sheet__disclaimer-line opf-estimate-sheet__disclaimer-line--secondary">
                  30-min{" "}
                  <span className="opf-estimate-sheet__disclaimer-link">Call-out travel</span> applies to all
                  local jobs (Fuel included)
                </p>
              </div>
            </div>
          ) : (
            <div className="opf-estimate-sheet__disclaimer opf-estimate-sheet__disclaimer--mobile">
              <div className="opf-estimate-sheet__disclaimer-head">
                <BsInfoCircle className="opf-estimate-sheet__disclaimer-icon" aria-hidden />
                <span className="opf-estimate-sheet__disclaimer-title">This is only an estimate</span>
              </div>
              <p className="opf-estimate-sheet__disclaimer-text">
                Final price may vary based on actual work time.
                <br />
                <span className="opf-estimate-sheet__disclaimer-text-line">
                  30-min{" "}
                  <span className="opf-estimate-sheet__disclaimer-emphasis">Call-out Travel</span> applies
                  to all local jobs (Fuel included)
                </span>
              </p>
            </div>
          )}
          <button type="button" className="opf-estimate-sheet__gotit" onClick={onClose}>
            Got it!
          </button>
        </div>
      </div>
    </div>,
    document.body
  );
};

export default EstimateCostTimeModal;
