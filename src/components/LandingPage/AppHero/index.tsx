"use client";

import "@/app/app-home/appHome.scss";
import "@/app/book/book.scss";
import "./appHero.scss";
import Link from "next/link";
import React, { useState } from "react";
import {
  FaLocationArrow,
  FaChevronDown,
  FaArrowRight,
} from "react-icons/fa";
import { FiMapPin, FiCalendar, FiTruck, FiFileText } from "react-icons/fi";

/* Landing-page hero mirroring the /app-home "first part".
   Shows the category cards only; tapping a card reveals the
   booking form inline (Locations / Date & Time / Vehicle / Notes). */

const categories = [
  { key: "trucks", label: "Trucks", img: "/figma/home/truck.png", cls: "cat-truck" },
  { key: "vans", label: "Vans", img: "/figma/home/van.png", cls: "cat-van" },
  { key: "removalists", label: "Removalists", img: "/figma/home/removalists-sofa.png", sub: "/figma/home/removalists-washer.png", cls: "cat-removalists" },
  { key: "helpers", label: "Helpers Only", img: "/figma/home/helpers.png", cls: "cat-helpers" },
];

const AppHero = () => {
  const [active, setActive] = useState<string | null>(null);

  return (
    <div className="fig-home bk-page landing-app-hero">
      <div className="fh-screen">
        <main className="fh-body">
          {/* Category grid */}
          <div className="fh-grid">
            {categories.map((c) => (
              <button
                type="button"
                key={c.key}
                className={`fh-cat ${c.cls} ${active === c.key ? "active" : ""}`}
                onClick={() => setActive(c.key)}
              >
                <div className="fh-cat-top">
                  <span className="fh-cat-label">{c.label}</span>
                  <img className="fh-cat-caret" src="/figma/home/chevron-right.svg" alt="" />
                </div>
                <div className="fh-cat-img">
                  {c.sub && <img className="fh-cat-sub" src={c.sub} alt="" />}
                  <img className="fh-cat-main" src={c.img} alt={c.label} />
                </div>
              </button>
            ))}
          </div>

          {/* Booking form — revealed after a card is tapped */}
          {active && (
            <div className="hero-book-form">
              <Link href="/book/locations" className="bk-field">
                <span className="bk-field-ic pin"><FiMapPin /></span>
                <span className="bk-field-label">Enter Locations</span>
                <FaLocationArrow className="bk-field-trail" />
              </Link>
              <Link href="/book/schedule" className="bk-field">
                <span className="bk-field-ic"><FiCalendar /></span>
                <span className="bk-field-label">Date &amp; Time</span>
                <FaChevronDown className="bk-field-trail" />
              </Link>
              <Link href="/book/vehicle" className="bk-field">
                <span className="bk-field-ic"><FiTruck /></span>
                <span className="bk-field-label">Select Vehicle</span>
                <FaChevronDown className="bk-field-trail" />
              </Link>
              <Link href="/book/details" className="bk-field">
                <span className="bk-field-ic"><FiFileText /></span>
                <span className="bk-field-label">Add Notes or Imp Instructions</span>
              </Link>
              <Link href="/book/locations" className="bk-continue">Continue <FaArrowRight /></Link>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default AppHero;
