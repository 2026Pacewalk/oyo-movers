"use client";

import "./appHome.scss";
import Link from "next/link";
import React from "react";
import { FaBell, FaChevronRight, FaChevronDown, FaPlus } from "react-icons/fa";
import { HiOutlineHome } from "react-icons/hi2";
import { IoReceiptOutline, IoSwapHorizontal, IoPersonOutline } from "react-icons/io5";

/* NOTE: name & address are static placeholders — no backend is wired here.
   This screen is a UI shell that mirrors the native app design. */
const USER = { name: "Sam Smith", avatar: "/images/avtar.jpg" };
const PICKUP = "101 Collins St, Melbourne, VIC 3000";

const categories = [
  { label: "Trucks", img: "/images/large-truckn.png", href: "/prices" },
  { label: "Vans", img: "/images/1vann.png", href: "/prices" },
  { label: "Removalists", img: "/images/2men.png", href: "/house-moving" },
  { label: "Delivery", img: "/images/1man.png", href: "/store-delivery" },
];

const AppHome = () => {
  return (
    <div className="app-home">
      <div className="app-home-screen">
        {/* Header */}
        <header className="ah-header">
          <div className="ah-user">
            <span className="ah-avatar">
              <img src={USER.avatar} alt={USER.name} />
            </span>
            <div className="ah-welcome">
              <span>Welcome</span>
              <strong>{USER.name}</strong>
            </div>
          </div>
          <Link href="/notification" className="ah-bell" aria-label="Notifications">
            <FaBell />
          </Link>
        </header>

        {/* Scrollable body */}
        <main className="ah-body">
          {/* Pickup card */}
          <button type="button" className="ah-pickup">
            <span className="ah-pin">
              <svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true">
                <path
                  fill="#22a45d"
                  d="M12 2C7.9 2 4.5 5.4 4.5 9.5c0 5.3 6.6 11.6 6.9 11.9.3.3.9.3 1.2 0 .3-.3 6.9-6.6 6.9-11.9C19.5 5.4 16.1 2 12 2zm0 10.2a2.7 2.7 0 110-5.4 2.7 2.7 0 010 5.4z"
                />
              </svg>
            </span>
            <span className="ah-pickup-text">
              <span className="ah-pickup-label">Pickup from</span>
              <span className="ah-pickup-addr">{PICKUP}</span>
            </span>
            <FaChevronDown className="ah-pickup-caret" />
          </button>

          {/* Category grid */}
          <div className="ah-grid">
            {categories.map((c) => (
              <Link href={c.href} key={c.label} className="ah-cat">
                <div className="ah-cat-top">
                  <span className="ah-cat-label">{c.label}</span>
                  <FaChevronRight className="ah-cat-caret" />
                </div>
                <div className="ah-cat-img">
                  <img src={c.img} alt={c.label} />
                </div>
              </Link>
            ))}
          </div>

          {/* Promo banner */}
          <Link href="/prices" className="ah-banner">
            <span className="ah-banner-sm">On-Demand Movers</span>
            <span className="ah-banner-lg">Pay As You Go!</span>
          </Link>
        </main>

        {/* Bottom nav */}
        <nav className="ah-nav">
          <Link href="/app-home" className="ah-nav-item active">
            <HiOutlineHome />
            <span>Home</span>
          </Link>
          <Link href="/booking-list" className="ah-nav-item">
            <IoReceiptOutline />
            <span>My Orders</span>
          </Link>

          <Link href="/prices" className="ah-fab" aria-label="New move">
            <FaPlus />
          </Link>

          <Link href="/booking-list" className="ah-nav-item">
            <IoSwapHorizontal />
            <span>Transaction</span>
          </Link>
          <Link href="/profile" className="ah-nav-item">
            <IoPersonOutline />
            <span>Profile</span>
          </Link>
        </nav>
      </div>
    </div>
  );
};

export default AppHome;
