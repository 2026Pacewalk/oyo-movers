"use client";

import "../../../app-home/appHome.scss";
import "../../book.scss";
import "../removalist.scss";
import "./access.scss";
import Link from "next/link";
import React, { useState } from "react";
import { FaArrowLeft, FaArrowRight, FaBoxOpen, FaCouch, FaBoxes } from "react-icons/fa";
import { FiChevronDown } from "react-icons/fi";

const furnish = [
  { key: "light", label: "Lightly furnished", sub: "Mostly boxes, few big items", icon: <FaBoxOpen /> },
  { key: "standard", label: "Standard furnished", sub: "Beds, sofas, appliances", icon: <FaCouch /> },
  { key: "full", label: "Fully furnished", sub: "Every room fully furnished", icon: <FaBoxes /> },
];

const access = [
  { key: "ground", label: "Ground floor / direct access" },
  { key: "stairs", label: "Stairs (no lift)" },
  { key: "lift", label: "Lift available" },
  { key: "narrow", label: "Narrow access / long carry" },
];

export default function RemovalistAccess() {
  const [level, setLevel] = useState("standard");
  const [picked, setPicked] = useState<string[]>(["ground"]);

  const toggle = (k: string) =>
    setPicked((p) => (p.includes(k) ? p.filter((x) => x !== k) : [...p, k]));

  return (
    <div className="fig-home bk-page rem-page acc-page">
      <div className="fh-screen">
        <header className="bk-subhead">
          <Link href="/book/removalist/size" className="bk-back" aria-label="Back"><FaArrowLeft /></Link>
          <span className="bk-subhead-title">House or Apartment</span>
          <span className="bk-subhead-spacer" />
        </header>

        <main className="fh-body bk-body">
          <div className="rem-progress">
            <span className="done" /><span className="done" /><span className="done" />
          </div>

          <div className="rem-intro">
            <h1>How furnished is it?</h1>
            <p>A quick idea of your load so the quote is accurate.</p>
          </div>

          <div className="rem-options">
            {furnish.map((o) => (
              <button
                key={o.key}
                type="button"
                className={`rem-option ${level === o.key ? "selected" : ""}`}
                onClick={() => setLevel(o.key)}
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

          <h3 className="acc-label">Access at pickup &amp; drop-off</h3>
          <div className="acc-chips">
            {access.map((a) => (
              <button
                key={a.key}
                type="button"
                className={`acc-chip ${picked.includes(a.key) ? "on" : ""}`}
                onClick={() => toggle(a.key)}
              >
                {a.label}
              </button>
            ))}
          </div>

          <Link href="/book/vehicle" className="bk-continue">Continue <FaArrowRight /></Link>
        </main>
      </div>
    </div>
  );
}
