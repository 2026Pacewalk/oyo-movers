"use client";

import "../../app-home/appHome.scss";
import "../book.scss";
import "./locations.scss";
import Link from "next/link";
import React, { useState } from "react";
import { FaArrowLeft, FaArrowRight, FaPlus, FaTimes } from "react-icons/fa";
import { FiMapPin, FiNavigation } from "react-icons/fi";

export default function BookLocations() {
  const [stops, setStops] = useState<string[]>([]);

  return (
    <div className="fig-home bk-page loc-page">
      <div className="fh-screen">
        {/* Header with back */}
        <header className="bk-subhead">
          <Link href="/book" className="bk-back" aria-label="Back"><FaArrowLeft /></Link>
          <span className="bk-subhead-title">Locations</span>
          <span className="bk-subhead-spacer" />
        </header>

        <main className="fh-body bk-body">
          {/* Map preview */}
          <div className="loc-map" aria-hidden="true">
            <span className="loc-map-pin loc-map-pin--pickup"><FiMapPin /></span>
            <span className="loc-map-pin loc-map-pin--drop"><FiMapPin /></span>
          </div>

          {/* Address inputs */}
          <div className="loc-fields">
            <label className="loc-field">
              <span className="loc-dot loc-dot--green" />
              <input type="text" placeholder="Pickup location" aria-label="Pickup location" />
              <button type="button" className="loc-locate" aria-label="Use current location">
                <FiNavigation />
              </button>
            </label>

            <span className="loc-line" aria-hidden="true" />

            <label className="loc-field">
              <span className="loc-dot loc-dot--red" />
              <input type="text" placeholder="Drop-off location" aria-label="Drop-off location" />
            </label>

            {stops.map((_, i) => (
              <React.Fragment key={i}>
                <span className="loc-line" aria-hidden="true" />
                <label className="loc-field">
                  <span className="loc-dot loc-dot--red" />
                  <input type="text" placeholder={`Stop ${i + 1}`} aria-label={`Stop ${i + 1}`} />
                  <button
                    type="button"
                    className="loc-remove"
                    aria-label="Remove stop"
                    onClick={() => setStops((s) => s.filter((_, idx) => idx !== i))}
                  >
                    <FaTimes />
                  </button>
                </label>
              </React.Fragment>
            ))}
          </div>

          <button
            type="button"
            className="loc-addstop"
            onClick={() => setStops((s) => [...s, ""])}
          >
            <FaPlus /> <span className="loc-addstop-label">Add Stop</span>
          </button>

          <Link href="/book/schedule" className="bk-continue">Continue <FaArrowRight /></Link>
        </main>
      </div>
    </div>
  );
}
