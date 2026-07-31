"use client";

import React, { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { BsChevronDown } from "react-icons/bs";
import { FaCheck, FaXmark } from "react-icons/fa6";
import { WHATS_INCLUDED_ITEMS } from "@/components/JobBooking/whatsIncludedItems";
import "./whatsIncludedSheet.scss";

type WhatsIncludedSheetProps = {
  className?: string;
};

const WhatsIncludedSheet = ({ className = "" }: WhatsIncludedSheetProps) => {
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
      <div className={`opf-whats-included ${className}`.trim()}>
        <button
          type="button"
          className="opf-whats-included-header"
          onClick={() => setOpen(true)}
          aria-haspopup="dialog"
          aria-expanded={open}
        >
          <span className="opf-whats-included-badge opf-action-icon" aria-hidden>
            <img src="/images/tick%202.png" alt="" width={18} height={16} />
          </span>
          <span className="opf-whats-included-title">What&apos;s Included</span>
          <BsChevronDown className="opf-whats-included-chevron" />
        </button>
      </div>

      {open &&
        mounted &&
        createPortal(
          <div
            className="opf-included-sheet"
            role="dialog"
            aria-modal="true"
            aria-labelledby="opf-included-sheet-title"
          >
            <button
              type="button"
              className="opf-included-sheet__backdrop"
              aria-label="Close What's Included"
              onClick={close}
            />
            <div className="opf-included-sheet__panel">
              <div className="opf-included-sheet__header">
                <h2 id="opf-included-sheet-title" className="opf-included-sheet__title">
                  What&apos;s Included
                </h2>
                <button type="button" className="opf-included-sheet__close" onClick={close} aria-label="Close">
                  <FaXmark />
                </button>
              </div>
              <div className="opf-included-sheet__divider" />
              <ul className="opf-included-sheet__list">
                {WHATS_INCLUDED_ITEMS.map((item) => (
                  <li key={item} className="opf-included-sheet__item">
                    <span className="opf-included-sheet__check" aria-hidden>
                      <FaCheck />
                    </span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <button type="button" className="opf-included-sheet__gotit" onClick={close}>
                Got it!
              </button>
            </div>
          </div>,
          document.body
        )}
    </>
  );
};

export default WhatsIncludedSheet;
