"use client";

import "./appHome.scss";
import Link from "next/link";
import React from "react";

/* Mobile Homepage — built to match Figma "Homepage" (node 2003:1869).
   Static placeholder text (address) — no backend wired here. */

const categories = [
  { label: "Trucks", img: "/figma/home/truck.png", href: "/prices", cls: "cat-truck" },
  { label: "Vans", img: "/figma/home/van.png", href: "/prices", cls: "cat-van" },
  { label: "Removalists", img: "/figma/home/removalists-sofa.png", sub: "/figma/home/removalists-washer.png", href: "/house-moving", cls: "cat-removalists" },
  { label: "Helpers Only", img: "/figma/home/helpers.png", href: "/labour-only", cls: "cat-helpers" },
];

export default function AppHome() {
  return (
    <div className="fig-home">
      <div className="fh-screen">
        {/* Desktop web navigation (shown on large screens) */}
        <header className="fh-webnav">
          <Link href="/" className="fh-webnav-logo" aria-label="OYO Movers home">
            <img src="/figma/home/logo.png" alt="OYO Movers" />
          </Link>
          <nav className="fh-webnav-links">
            <Link href="/app-home" className="active">Home</Link>
            <Link href="/booking-list">My Orders</Link>
            <Link href="/contact-us">Messages</Link>
            <Link href="/profile">Profile</Link>
          </nav>
          <div className="fh-webnav-actions">
            <a href="tel:1300013131" className="fh-webnav-phone">
              <img src="/figma/home/phone.svg" alt="" /> 1300 01 31 31
            </a>
            <Link href="/booking" className="fh-webnav-book">Book Now</Link>
          </div>
        </header>

        {/* Top bar (mobile / tablet) */}
        <header className="fh-topbar">
          <Link href="/" className="fh-logo" aria-label="OYO Movers home">
            <img src="/figma/home/logo.png" alt="OYO Movers" />
          </Link>
          <div className="fh-top-actions">
            <a href="tel:1300013131" className="fh-phone" aria-label="Call OYO Movers">
              <img src="/figma/home/phone.svg" alt="" />
            </a>
            <Link href="/booking" className="fh-book-pill">Book</Link>
            <Link href="/login" className="fh-profile" aria-label="Account">
              <span />
            </Link>
            <button className="fh-menu" aria-label="Menu" type="button">
              <img src="/figma/home/menu.svg" alt="" />
            </button>
          </div>
        </header>

        {/* Body with map background */}
        <main className="fh-body">
          <span className="fh-map" aria-hidden="true" />

          {/* Pickup card */}
          <button type="button" className="fh-pickup">
            <span className="fh-pin">
              <img src="/figma/home/pin.svg" alt="" />
            </span>
            <span className="fh-pickup-text">
              <span className="fh-pickup-label">Pickup from</span>
              <span className="fh-pickup-addr">Current Address Show here</span>
            </span>
            <img className="fh-pickup-caret" src="/figma/home/chevron-down.svg" alt="" />
          </button>

          {/* Category grid */}
          <div className="fh-grid">
            {categories.map((c) => (
              <Link href={c.href} key={c.label} className={`fh-cat ${c.cls}`}>
                <div className="fh-cat-top">
                  <span className="fh-cat-label">{c.label}</span>
                  <img className="fh-cat-caret" src="/figma/home/chevron-right.svg" alt="" />
                </div>
                <div className="fh-cat-img">
                  {c.sub && <img className="fh-cat-sub" src={c.sub} alt="" />}
                  <img className="fh-cat-main" src={c.img} alt={c.label} />
                </div>
              </Link>
            ))}
          </div>

          {/* Promo banner */}
          <Link href="/prices" className="fh-banner">
            <span className="fh-banner-sm">On-Demand Movers</span>
            <span className="fh-banner-lg">Pay as you go!</span>
          </Link>
        </main>

        {/* Bottom navigation */}
        <nav className="fh-bottomnav" aria-label="Primary">
          <Link href="/app-home" className="fh-nav-item active">
            <img src="/figma/home/nav-home.svg" alt="" />
            <span>Home</span>
          </Link>
          <Link href="/booking-list" className="fh-nav-item">
            <img src="/figma/home/nav-orders.svg" alt="" />
            <span>My Orders</span>
          </Link>
          <Link href="/booking" className="fh-nav-book" aria-label="Book a move">
            <img src="/figma/home/nav-plus.svg" alt="" />
            <span>Book</span>
          </Link>
          <Link href="/contact-us" className="fh-nav-item">
            <img src="/figma/home/nav-messages.svg" alt="" />
            <span>Messages</span>
          </Link>
          <Link href="/profile" className="fh-nav-item">
            <img src="/figma/home/nav-profile.svg" alt="" />
            <span>Profile</span>
          </Link>
        </nav>
      </div>
    </div>
  );
}
