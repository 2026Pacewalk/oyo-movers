"use client";

import "../../../app-home/appHome.scss";
import "../../book.scss";
import "../removalist.scss";
import Link from "next/link";
import React, { useState } from "react";
import { FaArrowLeft, FaArrowRight, FaBed } from "react-icons/fa";

const options = [
  { key: "studio", label: "Studio / 1 Bedroom", sub: "A few rooms of furniture", crew: "1–2 movers" },
  { key: "2bed", label: "2 Bedrooms", sub: "Small to medium home", crew: "2 movers" },
  { key: "3bed", label: "3 Bedrooms", sub: "Medium to large home", crew: "2–3 movers" },
  { key: "4bed", label: "4+ Bedrooms", sub: "Large home, lots to move", crew: "3+ movers" },
];

export default function RemovalistSize() {
  const [selected, setSelected] = useState("2bed");

  return (
    <div className="fig-home bk-page rem-page">
      <div className="fh-screen">
        <header className="bk-subhead">
          <Link href="/book/removalist" className="bk-back" aria-label="Back"><FaArrowLeft /></Link>
          <span className="bk-subhead-title">House or Apartment</span>
          <span className="bk-subhead-spacer" />
        </header>

        <main className="fh-body bk-body">
          <div className="rem-progress">
            <span className="done" /><span className="done" /><span />
          </div>

          <div className="rem-intro">
            <h1>How big is your place?</h1>
            <p>This helps us pick the right truck and crew size.</p>
          </div>

          <div className="rem-options">
            {options.map((o) => (
              <button
                key={o.key}
                type="button"
                className={`rem-option ${selected === o.key ? "selected" : ""}`}
                onClick={() => setSelected(o.key)}
              >
                <span className="rem-option-ic"><FaBed /></span>
                <span className="rem-option-text">
                  <strong>{o.label}</strong>
                  <small>{o.sub} · {o.crew}</small>
                </span>
                <span className="rem-radio" />
              </button>
            ))}
          </div>

          <Link href="/book/removalist/access" className="bk-continue">Continue <FaArrowRight /></Link>
        </main>
      </div>
    </div>
  );
}
