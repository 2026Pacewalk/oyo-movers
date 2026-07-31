"use client";

import React, { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { BsChevronDown } from "react-icons/bs";
import { FaTriangleExclamation, FaXmark } from "react-icons/fa6";
import {
  OPF_RESTRICTED_DISCLAIMER,
  OPF_RESTRICTED_DISCLAIMER_LEAD,
  OPF_RESTRICTED_GRID,
} from "@/components/JobBooking/OnePageMobile/opfRestrictedGridItems";
import "./restrictedItemsSheet.scss";

type RestrictedItemsSheetProps = {
  className?: string;
};

const RestrictedItemsSheet = ({ className = "" }: RestrictedItemsSheetProps) => {
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!open) return;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prevOverflow;
    };
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open]);

  const close = () => setOpen(false);

  return (
    <>
      <div className={`opf-restricted-trigger ${className}`.trim()}>
        <button
          type="button"
          className="opf-restricted-trigger__btn"
          onClick={() => setOpen(true)}
          aria-haspopup="dialog"
          aria-expanded={open}
        >
          <FaTriangleExclamation className="opf-restricted-trigger__warn opf-action-icon" aria-hidden />
          <div className="opf-restricted-trigger__text">
            <small>Read Before Booking</small>
            <span className="opf-restricted-trigger__title">Restricted Items</span>
          </div>
          <BsChevronDown className="opf-restricted-trigger__chevron" />
        </button>
      </div>

      {open &&
        mounted &&
        createPortal(
          <div
            className="opf-restricted-sheet"
            role="dialog"
            aria-modal="true"
            aria-labelledby="opf-restricted-sheet-title"
          >
            <button
              type="button"
              className="opf-restricted-sheet__backdrop"
              aria-label="Close Restricted Items"
              onClick={close}
            />
            <div className="opf-restricted-sheet__panel">
              <div className="opf-restricted-sheet__topbar">
                <img src="/images/Oyo-Black.png" alt="OYO Movers" className="opf-restricted-sheet__logo" />
                <button type="button" className="opf-restricted-sheet__close" onClick={close} aria-label="Close">
                  <FaXmark />
                </button>
              </div>

              <div className="opf-restricted-sheet__body">
                <div className="opf-restricted-sheet__banner">
                  <div className="opf-restricted-sheet__banner-copy">
                    <div className="opf-restricted-sheet__banner-heading">
                      <FaTriangleExclamation className="opf-restricted-sheet__banner-icon" aria-hidden />
                      <h2 id="opf-restricted-sheet-title" className="opf-restricted-sheet__banner-title">
                        Restricted Items
                      </h2>
                    </div>
                    <p className="opf-restricted-sheet__banner-sub">
                      The following items are not allowed to be transported
                    </p>
                  </div>
                </div>

                <div className="opf-restricted-sheet__grid">
                  {OPF_RESTRICTED_GRID.map((item) => (
                    <div key={item.label} className="opf-restricted-sheet__cell">
                      <img src={item.icon} alt="" className="opf-restricted-sheet__icon" />
                      <span className="opf-restricted-sheet__label">{item.label}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="opf-restricted-sheet__footer">
                <p className="opf-restricted-sheet__disclaimer">
                  <FaTriangleExclamation className="opf-restricted-sheet__disclaimer-icon" aria-hidden />
                  <span>
                    <strong>{OPF_RESTRICTED_DISCLAIMER_LEAD}</strong> {OPF_RESTRICTED_DISCLAIMER}
                  </span>
                </p>
                <button type="button" className="opf-restricted-sheet__gotit" onClick={close}>
                  Got it!
                </button>
              </div>
            </div>
          </div>,
          document.body
        )}
    </>
  );
};

export default RestrictedItemsSheet;
