"use client";

import "../../app-home/appHome.scss";
import "../book.scss";
import "../removalist/removalist.scss";
import Link from "next/link";
import React, { useState } from "react";
import { FaArrowLeft, FaArrowRight, FaDolly, FaPeopleCarry, FaBoxOpen, FaCouch } from "react-icons/fa";

const options = [
  { key: "loadunload", label: "Load / unload a truck", sub: "You have a truck, need muscle", icon: <FaDolly /> },
  { key: "moveinside", label: "Move items within a place", sub: "Rearrange or shift heavy items", icon: <FaCouch /> },
  { key: "packing", label: "Packing & organising", sub: "Box up and wrap your things", icon: <FaBoxOpen /> },
  { key: "heavy", label: "Lift something heavy", sub: "One-off heavy or bulky item", icon: <FaPeopleCarry /> },
];

export default function HelpersType() {
  const [selected, setSelected] = useState("loadunload");

  return (
    <div className="fig-home bk-page rem-page">
      <div className="fh-screen">
        <header className="bk-subhead">
          <Link href="/book" className="bk-back" aria-label="Back"><FaArrowLeft /></Link>
          <span className="bk-subhead-title">Helpers Only</span>
          <span className="bk-subhead-spacer" />
        </header>

        <main className="fh-body bk-body">
          <div className="rem-progress">
            <span className="done" /><span /><span />
          </div>

          <div className="rem-intro">
            <h1>What do you need help with?</h1>
            <p>Book trained movers by the hour — no truck required.</p>
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

          <Link href="/book/helpers/count" className="bk-continue">Continue <FaArrowRight /></Link>
        </main>
      </div>
    </div>
  );
}
