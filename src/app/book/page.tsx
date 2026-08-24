"use client";

import "../app-home/appHome.scss";
import "./book.scss";
import Link from "next/link";
import React, { useState } from "react";
import {
  FaTruck,
  FaThLarge,
  FaTag,
  FaRegUser,
  FaStar,
  FaRegClock,
  FaLocationArrow,
  FaChevronDown,
  FaArrowRight,
} from "react-icons/fa";
import { FiShield, FiMapPin, FiCalendar, FiTruck, FiFileText } from "react-icons/fi";

const chips = [
  { key: "trucks", label: "Trucks", movers: "1-3 Movers", img: "/figma/home/truck.png" },
  { key: "vans", label: "Vans", movers: "1-2 Movers", img: "/figma/home/van.png" },
  { key: "removalists", label: "Removalists", movers: "2-3 Movers", img: "/figma/home/removalists-sofa.png" },
  { key: "delivery", label: "Delivery", movers: "1-2 Movers", img: "/figma/home/helpers.png" },
];

export default function BookQuote() {
  const [selected, setSelected] = useState("trucks");

  // Removalists has its own property-detail flow; trucks/vans/delivery share the standard flow.
  const continueHref = selected === "removalists" ? "/book/removalist" : "/book/locations";

  return (
    <div className="fig-home bk-page">
      <div className="fh-screen">
        {/* Floating header */}
        <header className="fh-topbar">
          <Link href="/" className="fh-logo" aria-label="OYO Movers home">
            <img src="/figma/home/logo.png" alt="OYO Movers" />
          </Link>
          <div className="fh-top-actions">
            <a href="tel:1300013131" className="fh-phone" aria-label="Call"><img src="/figma/home/phone.svg" alt="" /></a>
            <Link href="/booking" className="fh-book-pill">Book</Link>
            <button className="fh-menu" aria-label="Menu" type="button"><img src="/figma/home/menu.svg" alt="" /></button>
          </div>
        </header>

        <main className="fh-body bk-body">
          <span className="fh-map" aria-hidden="true" />

          {/* Category chips */}
          <div className="bk-chips">
            {chips.map((c) => (
              <button
                key={c.key}
                type="button"
                className={`bk-chip ${selected === c.key ? "selected" : ""}`}
                onClick={() => setSelected(c.key)}
              >
                {selected === c.key && <span className="bk-chip-check">✓</span>}
                <span className="bk-chip-label">{c.label}</span>
                <span className="bk-chip-img"><img src={c.img} alt={c.label} /></span>
                <span className="bk-chip-movers"><FaRegUser /> {c.movers}</span>
              </button>
            ))}
          </div>

          {/* Fields */}
          <div className="bk-fields">
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
          </div>

          <Link href={continueHref} className="bk-continue">Continue <FaArrowRight /></Link>

          {/* Same Day Movers banner */}
          <div className="bk-banner">
            <div className="bk-banner-text">
              <span className="bk-banner-city">Melbourne | Geelong</span>
              <h3>Same Day Movers</h3>
              <span className="bk-banner-tag">Australia&apos;s Tech Enabled Platform</span>
              <p>Quick, Affordable movers at your doorstep</p>
            </div>
            <img className="bk-banner-photo" src="/images/men.png" alt="OYO mover" />
          </div>

          {/* Trust badges */}
          <div className="fh-trust">
            <span className="fh-trust-item"><FiShield className="fh-trust-ic no" /> No Hidden Fee</span>
            <span className="fh-trust-item"><FaStar className="fh-trust-ic star" /> 5.0 Rating</span>
            <span className="fh-trust-item"><FaRegClock className="fh-trust-ic clock" /> Booking in Mins</span>
          </div>

          <div className="fh-hiw">
            <h2>HOW IT WORKS</h2>
            <span className="fh-hiw-underline" />
          </div>
        </main>

        {/* Dark bottom nav */}
        <nav className="fh-bottomnav" aria-label="Primary">
          <Link href="/become-mover" className="fh-nav-item"><FaTruck /><span>Movers</span></Link>
          <Link href="/#services-section" className="fh-nav-item"><FaThLarge /><span>Services</span></Link>
          <Link href="/booking" className="fh-nav-book" aria-label="Book"><img src="/figma/home/nav-plus.svg" alt="" /></Link>
          <Link href="/prices" className="fh-nav-item"><FaTag /><span>Prices</span></Link>
          <Link href="/login" className="fh-nav-item"><FaRegUser /><span>Account</span></Link>
        </nav>
      </div>
    </div>
  );
}
