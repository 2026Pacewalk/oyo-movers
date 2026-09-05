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
  FaStar,
  FaBan,
} from "react-icons/fa";
import { FiMapPin, FiCalendar, FiTruck, FiFileText, FiClock } from "react-icons/fi";

/* Landing hero.
   - Desktop (>=1024px): Figma "Same Day Movers" hero — yellow scene with
     mover photo + a white "Choose a Service" card.
   - Mobile: app-style category cards; tapping one reveals the booking form. */

const categories = [
  { key: "trucks", label: "Trucks", img: "/figma/home/truck.png", cls: "cat-truck" },
  { key: "vans", label: "Vans", img: "/figma/home/van.png", cls: "cat-van" },
  { key: "removalists", label: "Removalists", img: "/figma/home/removalists-sofa.png", sub: "/figma/home/removalists-washer.png", cls: "cat-removalists" },
  { key: "helpers", label: "Helpers Only", img: "/figma/home/helpers.png", cls: "cat-helpers" },
];

const services = [
  { key: "trucks", label: "Trucks", desc: "2T to 10T Trucks", img: "/figma/home/truck.png", href: "/book" },
  { key: "vans", label: "Vans", desc: "Ideal for small moves", img: "/figma/home/van.png", href: "/book" },
  { key: "removalists", label: "Removalists", desc: "Truck + Movers", img: "/figma/home/removalists-sofa.png", href: "/book" },
  { key: "helpers", label: "Helpers Only", desc: "Extra hands to help", img: "/figma/home/helpers.png", href: "/book" },
];

const AppHero = () => {
  const [active, setActive] = useState<string | null>(null);

  return (
    <>
      {/* ---------- Desktop hero (Figma "Same Day Movers") ---------- */}
      <section className="dhero" aria-label="Same Day Movers">
        <div className="dhero-scene">
          <img className="dhero-bg" src="/images/hero-scene.png" alt="OYO mover with truck" />
          <div className="dhero-overlay">
            <div className="dhero-copy">
              <div className="dhero-copy-inner">
                <span className="dhero-badge">On-Demand Moving</span>
                <h1 className="dhero-title">Same Day Movers</h1>
                <p className="dhero-sub">Stress-Free Moving • Pay as you Go!</p>
                <div className="dhero-trust">
                  <span className="dhero-trust-item"><FiClock /> Time Start at Pickup</span>
                  <i className="dhero-sep" />
                  <span className="dhero-trust-item"><FaBan className="no" /> No Hidden Fees</span>
                  <i className="dhero-sep" />
                  <span className="dhero-trust-item"><FaStar className="star" /> 4.9 Rating</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="dhero-choose">
          <div className="dhero-choose-head">
            <span className="dhero-loc"><FiMapPin /> Melbourne | Geelong</span>
            <span className="dhero-choose-title">Choose a Service<i /></span>
          </div>
          <div className="dhero-services">
            {services.map((s) => (
              <Link href={s.href} key={s.key} className="dhero-service">
                <span className="dhero-service-name">{s.label}</span>
                <span className="dhero-service-desc">{s.desc}</span>
                <span className="dhero-service-img"><img src={s.img} alt={s.label} /></span>
              </Link>
            ))}
            <Link href="/book" className="dhero-estimate">
              <strong>Get Estimate</strong>
              <span className="dhero-estimate-time"><FiClock /> 60 Seconds</span>
              <span className="dhero-estimate-arrow"><FaArrowRight /></span>
            </Link>
          </div>
        </div>
      </section>

      {/* ---------- Mobile hero (app-style cards + reveal form) ---------- */}
      <div className="fig-home bk-page landing-app-hero">
        <div className="fh-screen">
          <main className="fh-body">
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
    </>
  );
};

export default AppHero;
