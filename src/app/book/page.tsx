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
  FaDolly,
  FaCouch,
} from "react-icons/fa";
import { FiShield, FiMapPin, FiCalendar, FiTruck, FiFileText } from "react-icons/fi";

const chips = [
  { key: "trucks", label: "Trucks", movers: "1-3 Movers", img: "/figma/home/truck.png" },
  { key: "vans", label: "Vans", movers: "1-2 Movers", img: "/figma/home/van.png" },
  { key: "removalists", label: "Removalists", movers: "1-3 Movers", img: "/figma/home/helpers.png" },
  { key: "delivery", label: "Delivery", movers: "1-2 Movers", img: "/figma/home/removalists-sofa.png" },
  { key: "helper", label: "Helper", movers: "1-2 Helpers", img: "/figma/home/helpers.png" },
];

const moveTypes = [
  { key: "house", label: "House or Apartment", sub: "Whole House, 1 BR, 2BR or Studio", icon: <FaHome /> },
  { key: "office", label: "Office Move", sub: "Small or Commercial Space", icon: <FaBuilding /> },
  { key: "fewitems", label: "Just Few Items", sub: "Small Move / Bulky Items", icon: <FaBoxOpen /> },
  { key: "delivery", label: "Store Delivery", sub: "Storage Moves, Marketplace or Store Delivery", icon: <FaTruck /> },
];

const helpTypes = [
  { key: "samebuilding", label: "Same Building Move", sub: "Move items within one building", icon: <FaBuilding /> },
  { key: "loadunload", label: "Load / Unload a Truck", sub: "You have a truck, need muscle", icon: <FaDolly /> },
  { key: "rearrange", label: "Rearrange Furniture", sub: "Shift heavy items around", icon: <FaCouch /> },
  { key: "packing", label: "Packing Help", sub: "Box up and wrap your things", icon: <FaBoxOpen /> },
];

const roomOptions = ["Studio", "1 BR", "2 BR", "3 BR", "4 BR+"];
const helperOptions = ["1 Helper", "2 Helpers", "3 Helpers", "4 Helpers"];

export default function BookQuote() {
  const [selected, setSelected] = useState("removalists");
  const [moveType, setMoveType] = useState<string | null>(null);
  const [rooms, setRooms] = useState("1 BR");
  const [helpType, setHelpType] = useState<string | null>(null);
  const [helpers, setHelpers] = useState("1 Helper");
  const [assembly, setAssembly] = useState(true);
  const [sameAddress, setSameAddress] = useState(true);
  const [modal, setModal] = useState<null | "move" | "rooms" | "help" | "helpers">(null);

  const isRemovalist = selected === "removalists";
  const isHelper = selected === "helper";
  const richFlow = isRemovalist || isHelper;

  const activeMove = moveTypes.find((m) => m.key === moveType);
  const activeHelp = helpTypes.find((h) => h.key === helpType);
  const showRooms = isRemovalist && (moveType === "house" || moveType === "office");
  const showHelpers = isHelper && !!helpType;
  const showSecond = showRooms || showHelpers;

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
            {richFlow && (
              <div className={`bk-field-row ${showSecond ? "with-rooms" : ""}`}>
                <button
                  type="button"
                  className="bk-field bk-field--btn"
                  onClick={() => setModal(isHelper ? "help" : "move")}
                >
                  <span className="bk-field-ic">
                    {isHelper ? (activeHelp ? activeHelp.icon : <FaHome />) : (activeMove ? activeMove.icon : <FaHome />)}
                  </span>
                  <span className={`bk-field-label ${(isHelper ? activeHelp : activeMove) ? "filled" : ""}`}>
                    {isHelper
                      ? (activeHelp ? activeHelp.label : "What Help do You Need?")
                      : (activeMove ? activeMove.label : "What's Your Next Move?")}
                  </span>
                  <FaChevronDown className="bk-field-trail" />
                </button>

                {showSecond && (
                  <button
                    type="button"
                    className="bk-field bk-field--btn bk-field--rooms"
                    onClick={() => setModal(isHelper ? "helpers" : "rooms")}
                  >
                    <span className="bk-field-ic">{isHelper ? <FaRegUser /> : <FaBed />}</span>
                    <span className="bk-field-label filled">{isHelper ? helpers : rooms}</span>
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

          {/* Checkbox: assembly (removalist) or same-address (helper) */}
          {isRemovalist && (
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
          {isHelper && (
            <button
              type="button"
              className={`bk-assembly bk-assembly--simple ${sameAddress ? "on" : ""}`}
              onClick={() => setSameAddress((a) => !a)}
            >
              <span className="bk-assembly-box">{sameAddress && <FaCheck />}</span>
              <span className="bk-assembly-text">
                <strong>Same Address / Internal Move</strong>
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
              {!richFlow && <p>Quick, Affordable movers at your doorstep</p>}
            </div>
            <img className="bk-banner-photo" src="/images/2men.png" alt="OYO movers" />
          </div>

          {/* Truck / Vans / Delivery flow (mv1 / mv7): light trust + HOW IT WORKS */}
          {!richFlow && (
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
          {/* Removalist / Helper flow (mv3 / mv8): trust strip inside the dark nav */}
          {richFlow && (
            <div className="bk-trust-strip">
              <span><FiShield /> No Hidden Fee</span>
              <span><FaStar /> 5.0 Rating</span>
              <span><FaRegClock /> Booking in Mins</span>
            </div>
          )}
          <div className="bk-nav-row">
            <Link href="/become-mover" className="fh-nav-item"><FaTruck /><span>{richFlow ? "Become Mover" : "Mover"}</span></Link>
            <Link href="/#services-section" className="fh-nav-item"><FaThLarge /><span>Services</span></Link>
            <Link href="/booking" className="fh-nav-book" aria-label="Book"><img src="/figma/home/nav-plus.svg" alt="" /></Link>
            <Link href="/prices" className="fh-nav-item"><FaTag /><span>Prices</span></Link>
            <Link href="/login" className="fh-nav-item"><FaRegUser /><span>Account</span></Link>
          </div>
        </nav>

        {/* Move-type modal (mv3.2–mv6.1) */}
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
                    <span className="bk-sheet-opt-text"><strong>{m.label}</strong><small>{m.sub}</small></span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Help-type modal (mv8) */}
        {modal === "help" && (
          <div className="bk-sheet-overlay" onClick={() => setModal(null)}>
            <div className="bk-sheet" onClick={(e) => e.stopPropagation()}>
              <button type="button" className="bk-sheet-close" aria-label="Close" onClick={() => setModal(null)}><FaTimes /></button>
              <h2 className="bk-sheet-title">What help do you need?</h2>
              <p className="bk-sheet-sub">Pick a task and we&apos;ll send the right helpers</p>
              <div className="bk-sheet-options">
                {helpTypes.map((h) => (
                  <button
                    key={h.key}
                    type="button"
                    className={`bk-sheet-opt ${helpType === h.key ? "selected" : ""}`}
                    onClick={() => { setHelpType(h.key); setModal(null); }}
                  >
                    <span className="bk-sheet-opt-ic">{h.icon}</span>
                    <span className="bk-sheet-opt-text"><strong>{h.label}</strong><small>{h.sub}</small></span>
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
                  <button key={r} type="button" className={`bk-sheet-chip ${rooms === r ? "on" : ""}`} onClick={() => { setRooms(r); setModal(null); }}>{r}</button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Helpers count modal (mv8) */}
        {modal === "helpers" && (
          <div className="bk-sheet-overlay" onClick={() => setModal(null)}>
            <div className="bk-sheet" onClick={(e) => e.stopPropagation()}>
              <button type="button" className="bk-sheet-close" aria-label="Close" onClick={() => setModal(null)}><FaTimes /></button>
              <h2 className="bk-sheet-title">How many helpers?</h2>
              <p className="bk-sheet-sub">Most jobs are done comfortably with 2 helpers</p>
              <div className="bk-sheet-chips">
                {helperOptions.map((h) => (
                  <button key={h} type="button" className={`bk-sheet-chip ${helpers === h ? "on" : ""}`} onClick={() => { setHelpers(h); setModal(null); }}>{h}</button>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
