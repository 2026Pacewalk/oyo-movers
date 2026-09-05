"use client";

import "./appHero.scss";
import Link from "next/link";
import React from "react";
import { FaArrowRight, FaStar, FaBan } from "react-icons/fa";
import { FiMapPin, FiClock, FiChevronRight } from "react-icons/fi";

/* Landing hero.
   - Desktop (>=1024px): Figma "Same Day Movers" hero (composite scene + Choose a Service card).
   - Mobile (<1024px): Melbourne|Geelong + Choose a Service cards + yellow Same-Day Movers banner. */

const services = [
  { key: "trucks", label: "Trucks", desc: "2T to 10T Trucks", img: "/figma/home/truck.png", href: "/book" },
  { key: "vans", label: "Vans", desc: "Ideal for small moves", img: "/figma/home/van.png", href: "/book" },
  { key: "removalists", label: "Removalists", desc: "Truck + Movers", img: "/figma/home/removalists-sofa.png", href: "/book" },
  { key: "helpers", label: "Helpers Only", desc: "Need extra hands", img: "/figma/home/helpers.png", href: "/book" },
];

const AppHero = () => {
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

      {/* ---------- Mobile hero ---------- */}
      <div className="mhero">
        <div className="mhero-loc"><FiMapPin /> Melbourne | Geelong</div>
        <div className="mhero-choose">Choose a Service<i /></div>

        <div className="mhero-grid">
          {services.map((s) => (
            <Link href={s.href} key={s.key} className="mhero-card">
              <div className="mhero-card-top">
                <span className="mhero-card-name">{s.label}</span>
                <FiChevronRight className="mhero-card-caret" />
              </div>
              <span className="mhero-card-desc">{s.desc}</span>
              <span className="mhero-card-img"><img src={s.img} alt={s.label} /></span>
            </Link>
          ))}
        </div>

        {/* Same-Day Movers yellow banner */}
        <Link href="/book" className="mhero-banner">
          <div className="mhero-banner-text">
            <span className="mhero-badge-row">
              <span className="mhero-badge">On-Demand Moving</span>
              <img className="mhero-swoosh" src="/images/banner-swoosh.svg" alt="" />
            </span>
            <h2 className="mhero-title">Same-Day Movers</h2>
            <p className="mhero-sub">Stress-Free Moving • Pay As You Go!</p>
            <span className="mhero-estimate">
              <span className="mhero-estimate-lines">
                <strong>Get Estimate</strong>
                <small>in 60 seconds</small>
              </span>
              <FaArrowRight />
            </span>
          </div>
          <img className="mhero-mover" src="/images/ServiceImg-1.png" alt="OYO mover" />
        </Link>

        {/* Trust row */}
        <div className="mhero-trust">
          <span><FaBan className="no" /> No Hidden Fees</span>
          <span><FaStar className="star" /> 4.9 Rating</span>
          <span><FiClock /> Start at Pickup</span>
        </div>
      </div>
    </>
  );
};

export default AppHero;
