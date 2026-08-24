"use client";

import "../../app-home/appHome.scss";
import "../book.scss";
import "./details.scss";
import Link from "next/link";
import React, { useState } from "react";
import { FaArrowLeft, FaArrowRight, FaCamera, FaTools, FaBoxOpen } from "react-icons/fa";

export default function BookDetails() {
  const [assembly, setAssembly] = useState(false);
  const [packing, setPacking] = useState(false);

  return (
    <div className="fig-home bk-page det-page">
      <div className="fh-screen">
        <header className="bk-subhead">
          <Link href="/book" className="bk-back" aria-label="Back"><FaArrowLeft /></Link>
          <span className="bk-subhead-title">Few More Details</span>
          <span className="bk-subhead-spacer" />
        </header>

        <main className="fh-body bk-body">
          {/* Notes */}
          <h3 className="det-label">Notes or special instructions</h3>
          <textarea
            className="det-textarea"
            placeholder="e.g. Heavy items, stairs on 2nd floor, fragile glassware…"
            rows={4}
          />

          {/* Optional add-ons */}
          <h3 className="det-label">Add-on services</h3>
          <label className={`det-option ${assembly ? "checked" : ""}`}>
            <span className="det-option-ic"><FaTools /></span>
            <span className="det-option-text">
              <strong>Assembly / Disassembly</strong>
              <small>Beds, wardrobes and flat-pack furniture</small>
            </span>
            <input type="checkbox" checked={assembly} onChange={(e) => setAssembly(e.target.checked)} />
            <span className="det-check" />
          </label>

          <label className={`det-option ${packing ? "checked" : ""}`}>
            <span className="det-option-ic"><FaBoxOpen /></span>
            <span className="det-option-text">
              <strong>Packing help</strong>
              <small>Boxes, wrapping and careful packing</small>
            </span>
            <input type="checkbox" checked={packing} onChange={(e) => setPacking(e.target.checked)} />
            <span className="det-check" />
          </label>

          {/* Photo upload */}
          <h3 className="det-label">Add photos <span className="det-optional">(optional)</span></h3>
          <label className="det-upload">
            <FaCamera />
            <span>Upload photos of your items</span>
            <input type="file" accept="image/*" multiple hidden />
          </label>

          <Link href="/signup" className="bk-continue">Get My Quote <FaArrowRight /></Link>
          <p className="det-foot">You&apos;ll review the final price before confirming.</p>
        </main>
      </div>
    </div>
  );
}
