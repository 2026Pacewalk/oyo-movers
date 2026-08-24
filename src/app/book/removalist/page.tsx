"use client";

import "../../app-home/appHome.scss";
import "../book.scss";
import "./removalist.scss";
import Link from "next/link";
import React, { useState } from "react";
import { FaArrowLeft, FaArrowRight, FaHome, FaBuilding, FaWarehouse, FaCity } from "react-icons/fa";

const options = [
  { key: "house", label: "House", sub: "Standalone or terrace home", icon: <FaHome /> },
  { key: "apartment", label: "Apartment / Unit", sub: "Flat, unit or condo", icon: <FaBuilding /> },
  { key: "townhouse", label: "Townhouse", sub: "Multi-level attached home", icon: <FaCity /> },
  { key: "storage", label: "Storage / Other", sub: "Storage unit or other space", icon: <FaWarehouse /> },
];

export default function RemovalistProperty() {
  const [selected, setSelected] = useState("house");

  return (
    <div className="fig-home bk-page rem-page">
      <div className="fh-screen">
        <header className="bk-subhead">
          <Link href="/book" className="bk-back" aria-label="Back"><FaArrowLeft /></Link>
          <span className="bk-subhead-title">House or Apartment</span>
          <span className="bk-subhead-spacer" />
        </header>

        <main className="fh-body bk-body">
          <div className="rem-progress">
            <span className="done" /><span /><span />
          </div>

          <div className="rem-intro">
            <h1>What are you moving from?</h1>
            <p>Tell us about your current place so we send the right crew.</p>
          </div>

          <div className="rem-options">
            {options.map((o) => (
              <button
                key={o.key}
                type="button"
                className={`rem-option ${selected === o.key ? "selected" : ""}`}
                onClick={() => setSelected(o.key)}
              >
                <span className="rem-option-ic">{o.icon}</span>
                <span className="rem-option-text">
                  <strong>{o.label}</strong>
                  <small>{o.sub}</small>
                </span>
                <span className="rem-radio" />
              </button>
            ))}
          </div>

          <Link href="/book/removalist/size" className="bk-continue">Continue <FaArrowRight /></Link>
        </main>
      </div>
    </div>
  );
}
