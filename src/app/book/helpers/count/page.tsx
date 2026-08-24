"use client";

import "../../../app-home/appHome.scss";
import "../../book.scss";
import "../../removalist/removalist.scss";
import "./count.scss";
import Link from "next/link";
import React, { useState } from "react";
import { FaArrowLeft, FaArrowRight, FaMinus, FaPlus, FaRegUser } from "react-icons/fa";

const durations = [
  { key: "1", label: "1 hour" },
  { key: "2", label: "2 hours" },
  { key: "3", label: "3 hours" },
  { key: "half", label: "Half day (4h)" },
  { key: "full", label: "Full day (8h)" },
];

export default function HelpersCount() {
  const [count, setCount] = useState(2);
  const [dur, setDur] = useState("2");

  return (
    <div className="fig-home bk-page rem-page cnt-page">
      <div className="fh-screen">
        <header className="bk-subhead">
          <Link href="/book/helpers" className="bk-back" aria-label="Back"><FaArrowLeft /></Link>
          <span className="bk-subhead-title">Helpers Only</span>
          <span className="bk-subhead-spacer" />
        </header>

        <main className="fh-body bk-body">
          <div className="rem-progress">
            <span className="done" /><span className="done" /><span />
          </div>

          <div className="rem-intro">
            <h1>How many helpers?</h1>
            <p>Most 2-bedroom moves are done comfortably with 2 movers.</p>
          </div>

          {/* Stepper */}
          <div className="cnt-stepper">
            <div className="cnt-stepper-info">
              <span className="cnt-stepper-ic"><FaRegUser /></span>
              <div>
                <strong>Movers</strong>
                <small>Trained &amp; background-checked</small>
              </div>
            </div>
            <div className="cnt-stepper-ctrl">
              <button type="button" aria-label="Fewer" onClick={() => setCount((c) => Math.max(1, c - 1))} disabled={count <= 1}><FaMinus /></button>
              <span className="cnt-num">{count}</span>
              <button type="button" aria-label="More" onClick={() => setCount((c) => Math.min(6, c + 1))} disabled={count >= 6}><FaPlus /></button>
            </div>
          </div>

          {/* Duration */}
          <h3 className="cnt-label">How long do you need them?</h3>
          <div className="cnt-durs">
            {durations.map((d) => (
              <button
                key={d.key}
                type="button"
                className={`cnt-dur ${dur === d.key ? "on" : ""}`}
                onClick={() => setDur(d.key)}
              >
                {d.label}
              </button>
            ))}
          </div>

          <Link href="/book/estimate" className="bk-continue">Continue <FaArrowRight /></Link>
        </main>
      </div>
    </div>
  );
}
