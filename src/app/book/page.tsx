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
  FaHome,
  FaBuilding,
  FaBoxOpen,
  FaCheck,
  FaTimes,
  FaBed,
  FaTools,
} from "react-icons/fa";
import { FiShield, FiMapPin, FiCalendar, FiTruck, FiFileText } from "react-icons/fi";

const chips = [
  { key: "trucks", label: "Trucks", movers: "1-3 Movers", img: "/figma/home/truck.png" },
  { key: "vans", label: "Vans", movers: "1-2 Movers", img: "/figma/home/van.png" },
  { key: "removalists", label: "Removalists", movers: "1-3 Movers", img: "/figma/home/helpers.png" },
  { key: "delivery", label: "Delivery", movers: "1-2 Movers", img: "/figma/home/removalists-sofa.png" },
];

const moveTypes = [
  { key: "house", label: "House or Apartment", sub: "Whole House, 1 BR, 2BR or Studio", icon: <FaHome /> },
  { key: "office", label: "Office Move", sub: "Small or Commercial Space", icon: <FaBuilding /> },
  { key: "fewitems", label: "Just Few Items", sub: "Small Move / Bulky Items", icon: <FaBoxOpen /> },
  { key: "delivery", label: "Store Delivery", sub: "Storage Moves, Marketplace or Store Delivery", icon: <FaTruck /> },
];

const roomOptions = ["Studio", "1 BR", "2 BR", "3 BR", "4 BR+"];

export default function BookQuote() {
  const [selected, setSelected] = useState("removalists");
  const [moveType, setMoveType] = useState<string | null>(null);
  const [rooms, setRooms] = useState("1 BR");
  const [assembly, setAssembly] = useState(true);
  const [modal, setModal] = useState<null | "move" | "rooms">(null);

  const activeMove = moveTypes.find((m) => m.key === moveType);
  const showMoveFields = selected === "removalists";
  const showRooms = showMoveFields && (moveType === "house" || moveType === "office");

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
                {selected === c.key && <span className="bk-chip-dot" />}
                <span className="bk-chip-label">{c.label}</span>
                <span className="bk-chip-img"><img src={c.img} alt={c.label} /></span>
                <span className="bk-chip-movers"><FaRegUser /> {c.movers}</span>
              </button>
            ))}
          </div>

          {/* Fields */}
          <div className="bk-fields">
            {showMoveFields && (
              <div className={`bk-field-row ${showRooms ? "with-rooms" : ""}`}>
                <button type="button" className="bk-field bk-field--btn" onClick={() => setModal("move")}>
                  <span className="bk-field-ic">{activeMove ? activeMove.icon : <FaHome />}</span>
                  <span className={`bk-field-label ${activeMove ? "filled" : ""}`}>
                    {activeMove ? activeMove.label : "What's Your Next Move?"}
                  </span>
                  <FaChevronDown className="bk-field-trail" />
                </button>
                {showRooms && (
                  <button type="button" className="bk-field bk-field--btn bk-field--rooms" onClick={() => setModal("rooms")}>
                    <span className="bk-field-ic"><FaBed /></span>
                    <span className="bk-field-label filled">{rooms}</span>
                    <FaChevronDown className="bk-field-trail" />
                  </button>
                )}
              </div>
            )}

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

          {/* Assembly checkbox */}
          {showMoveFields && (
            <button
              type="button"
              className={`bk-assembly ${assembly ? "on" : ""}`}
              onClick={() => setAssembly((a) => !a)}
            >
              <span className="bk-assembly-box">{assembly && <FaCheck />}</span>
              <span className="bk-assembly-text">
                <strong><FaTools className="bk-assembly-ic" /> Need furniture assembly or disassembly?</strong>
                <small>No additional fees, just adds to moving time. Change anytime.</small>
              </span>
            </button>
          )}

          <Link href="/book/locations" className="bk-continue">Continue <FaArrowRight /></Link>

          {/* Same Day Movers banner */}
          <div className="bk-banner">
            <div className="bk-banner-text">
              <span className="bk-banner-city">Melbourne | Geelong</span>
              <h3>Same Day Movers</h3>
              <span className="bk-banner-tag">Australia&apos;s Tech Enabled Platform</span>
              {!showMoveFields && <p>Quick, Affordable movers at your doorstep</p>}
            </div>
            <img className="bk-banner-photo" src="/images/2men.png" alt="OYO movers" />
          </div>

          {/* Truck / Vans / Delivery flow (mv1 / mv7): light trust + HOW IT WORKS */}
          {!showMoveFields && (
            <>
              <div className="fh-trust">
                <span className="fh-trust-item"><FiShield className="fh-trust-ic no" /> No Hidden Fee</span>
                <span className="fh-trust-item"><FaStar className="fh-trust-ic star" /> 5.0 Rating</span>
                <span className="fh-trust-item"><FaRegClock className="fh-trust-ic clock" /> Booking in Mins</span>
              </div>
              <div className="fh-hiw">
                <h2>HOW IT WORKS</h2>
                <span className="fh-hiw-underline" />
              </div>
            </>
          )}
        </main>

        {/* Dark bottom nav */}
        <nav className="fh-bottomnav bk-bottomnav" aria-label="Primary">
          {/* Removalist flow (mv3): trust strip inside the dark nav */}
          {showMoveFields && (
            <div className="bk-trust-strip">
              <span><FiShield /> No Hidden Fee</span>
              <span><FaStar /> 5.0 Rating</span>
              <span><FaRegClock /> Booking in Mins</span>
            </div>
          )}
          <div className="bk-nav-row">
            <Link href="/become-mover" className="fh-nav-item"><FaTruck /><span>{showMoveFields ? "Become Mover" : "Mover"}</span></Link>
            <Link href="/#services-section" className="fh-nav-item"><FaThLarge /><span>Services</span></Link>
            <Link href="/booking" className="fh-nav-book" aria-label="Book"><img src="/figma/home/nav-plus.svg" alt="" /></Link>
            <Link href="/prices" className="fh-nav-item"><FaTag /><span>Prices</span></Link>
            <Link href="/login" className="fh-nav-item"><FaRegUser /><span>Account</span></Link>
          </div>
        </nav>

        {/* Category modal (mv3.2–mv6.1) */}
        {modal === "move" && (
          <div className="bk-sheet-overlay" onClick={() => setModal(null)}>
            <div className="bk-sheet" onClick={(e) => e.stopPropagation()}>
              <button type="button" className="bk-sheet-close" aria-label="Close" onClick={() => setModal(null)}><FaTimes /></button>
              <h2 className="bk-sheet-title">What&apos;s your next move?</h2>
              <p className="bk-sheet-sub">Select a Category and we&apos;ll get you moving</p>
              <div className="bk-sheet-options">
                {moveTypes.map((m) => (
                  <button
                    key={m.key}
                    type="button"
                    className={`bk-sheet-opt ${moveType === m.key ? "selected" : ""}`}
                    onClick={() => { setMoveType(m.key); setModal(null); }}
                  >
                    <span className="bk-sheet-opt-ic">{m.icon}</span>
                    <span className="bk-sheet-opt-text">
                      <strong>{m.label}</strong>
                      <small>{m.sub}</small>
                    </span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Rooms modal */}
        {modal === "rooms" && (
          <div className="bk-sheet-overlay" onClick={() => setModal(null)}>
            <div className="bk-sheet" onClick={(e) => e.stopPropagation()}>
              <button type="button" className="bk-sheet-close" aria-label="Close" onClick={() => setModal(null)}><FaTimes /></button>
              <h2 className="bk-sheet-title">How many rooms?</h2>
              <p className="bk-sheet-sub">Pick the size that best matches your place</p>
              <div className="bk-sheet-chips">
                {roomOptions.map((r) => (
                  <button
                    key={r}
                    type="button"
                    className={`bk-sheet-chip ${rooms === r ? "on" : ""}`}
                    onClick={() => { setRooms(r); setModal(null); }}
                  >
                    {r}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
