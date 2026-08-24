"use client";

import "../../app-home/appHome.scss";
import "../book.scss";
import "./estimate.scss";
import Link from "next/link";
import React, { useState } from "react";
import { FaArrowLeft, FaArrowRight, FaClock, FaInfoCircle, FaTruck } from "react-icons/fa";

export default function BookEstimate() {
  // Static illustrative estimate (real values come from backend once wired)
  const [hours, setHours] = useState(2);
  const baseCallout = 99;
  const perHalfHour = 30;
  const total = baseCallout + Math.max(0, (hours - 1) * 2) * perHalfHour;

  return (
    <div className="fig-home bk-page est-page">
      <div className="fh-screen">
        <header className="bk-subhead">
          <Link href="/book/vehicle" className="bk-back" aria-label="Back"><FaArrowLeft /></Link>
          <span className="bk-subhead-title">Estimated Cost &amp; Time</span>
          <span className="bk-subhead-spacer" />
        </header>

        <main className="fh-body bk-body">
          {/* Headline price */}
          <div className="est-hero">
            <span className="est-hero-label">Estimated Total</span>
            <div className="est-hero-price">
              <span className="est-was">$149</span>
              <span className="est-now">${total}</span>
            </div>
            <span className="est-hero-sub">
              <FaTruck /> Medium Truck · 2 Movers
            </span>
          </div>

          {/* Duration slider */}
          <div className="est-slider-card">
            <div className="est-slider-head">
              <span><FaClock /> Estimated duration</span>
              <strong>{hours} {hours === 1 ? "hour" : "hours"}</strong>
            </div>
            <input
              type="range"
              min={1}
              max={6}
              step={1}
              value={hours}
              onChange={(e) => setHours(Number(e.target.value))}
              className="est-range"
              aria-label="Estimated duration in hours"
            />
            <div className="est-range-scale">
              <span>1h</span><span>2h</span><span>3h</span><span>4h</span><span>5h</span><span>6h</span>
            </div>
          </div>

          {/* Breakdown */}
          <div className="est-breakdown">
            <div className="est-row">
              <span>Call-out fee (first hour)</span>
              <span>${baseCallout}</span>
            </div>
            <div className="est-row">
              <span>Additional time ({Math.max(0, hours - 1)}h)</span>
              <span>${Math.max(0, (hours - 1) * 2) * perHalfHour}</span>
            </div>
            <div className="est-row est-row--muted">
              <span>GST included</span>
              <span>Yes</span>
            </div>
            <div className="est-row est-row--total">
              <span>Total (est.)</span>
              <span>${total}</span>
            </div>
          </div>

          <p className="est-note">
            <FaInfoCircle /> Final price depends on the actual time taken on the day. You only pay for the time used.
          </p>

          <Link href="/book/details" className="bk-continue">Continue <FaArrowRight /></Link>
        </main>
      </div>
    </div>
  );
}
