"use client";

import "./appHero.scss";
import Link from "next/link";
import React from "react";
import { FaArrowRight, FaStar, FaBan, FaTruck, FaShuttleVan, FaUsers, FaUser } from "react-icons/fa";
import { FiMapPin, FiClock, FiChevronRight } from "react-icons/fi";

/* Landing hero.
   - Desktop (>=1024px): Figma "Same Day Movers" hero (composite scene + Choose a Service card).
   - Mobile (<1024px): Melbourne|Geelong + Choose a Service cards + yellow Same-Day Movers banner. */

type Service = {
  key: string;
  label: string;
  name?: React.ReactNode;
  desc: string;
  img: string;
  href: string;
  icon: React.ReactNode;
};

const services: Service[] = [
  { key: "trucks", label: "Trucks", desc: "2T to 10T Trucks", img: "/images/card-truck.png", href: "/book", icon: <FaTruck /> },
  { key: "vans", label: "Vans", desc: "Ideal for small moves", img: "/images/card-van.png", href: "/book", icon: <FaShuttleVan /> },
  { key: "removalists", label: "Removalists", desc: "Truck + Movers", img: "/figma/home/removalists-sofa.png", href: "/book", icon: <FaUsers /> },
  { key: "helpers", label: "Helpers Only", name: <>Helpers <span className="thin">Only</span></>, desc: "Need extra hands", img: "/images/1man.png", href: "/book", icon: <FaUser /> },
];

const AppHero = () => {
  return (
    <>
      {/* ---------- Desktop hero (Figma "Same Day Movers") ---------- */}
      <section className="dhero" aria-label="Same Day Movers">
        <div className="dhero-scene">
          <span className="dhero-skyline" aria-hidden="true" />
          <span className="dhero-mover-wrap">
            <img src="/images/hero-mover.png" alt="OYO mover" />
          </span>
          <div className="dhero-overlay">
            <div className="dhero-copy">
              <div className="dhero-copy-inner">
                <div className="dhero-badge-row">
                  <span className="dhero-badge">On-Demand Moving</span>
                  <img className="dhero-swoosh" src="/images/banner-swoosh.svg" alt="" />
                </div>
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
                <div className="dhero-service-top">
                  <span className="dhero-service-icon">{s.icon}</span>
                  <span className="dhero-service-name">{s.name ?? s.label}</span>
                  <FiChevronRight className="dhero-service-caret" />
                </div>
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
                <span className="mhero-card-icon">{s.icon}</span>
                <span className="mhero-card-name">{s.name ?? s.label}</span>
                <span className="mhero-card-caret"><FiChevronRight /></span>
              </div>
              <span className="mhero-card-desc">{s.desc}</span>
              <span className={`mhero-card-img mhero-card-img--${s.key}`}><img src={s.img} alt={s.label} /></span>
            </Link>
          ))}
        </div>

        {/* Same-Day Movers banner (Figma) */}
        <Link href="/book" className="mhero-banner" aria-label="Same-Day Movers — Get Estimate in 60 seconds">
          <div className="mhero-banner-copy">
            <div className="mhero-banner-badge-row">
              <span className="mhero-banner-badge">On-Demand Moving</span>
              <img className="mhero-banner-swoosh" src="/images/banner-swoosh.svg" alt="" />
            </div>
            <h3 className="mhero-banner-title">Same-Day Movers</h3>
            <p className="mhero-banner-sub">Stress-Free Moving • Pay As You Go!</p>
            <span className="mhero-banner-btn">
              <span className="mhero-banner-btn-main">Get Estimate <FaArrowRight /></span>
              <span className="mhero-banner-btn-sub">in 60 seconds</span>
            </span>
          </div>
          <img className="mhero-banner-mover" src="/images/hero-mover.png" alt="" />
        </Link>

        {/* Trust row */}
        <div className="mhero-trust">
          <span><FaBan className="no" /> No Hidden Fees</span>
          <i className="mhero-trust-sep" />
          <span><FaStar className="star" /> 4.9 Rating</span>
          <i className="mhero-trust-sep" />
          <span><FiClock /> Start at Pickup</span>
        </div>
      </div>
    </>
  );
};

export default AppHero;
