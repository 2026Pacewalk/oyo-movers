"use client";

import React, { useState, useRef } from "react";
import Link from "next/link";
import { FaChevronDown } from "react-icons/fa";
import { servicesMenu } from "./servicesData";
import "./megaMenu.scss";

/* Desktop "Services" dropdown (hover / click), Lugg-style grid. */
const ServicesMegaMenu = () => {
  const [open, setOpen] = useState(false);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const openNow = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setOpen(true);
  };
  const closeSoon = () => {
    closeTimer.current = setTimeout(() => setOpen(false), 140);
  };

  return (
    <div
      className={`services-mega ${open ? "open" : ""}`}
      onMouseEnter={openNow}
      onMouseLeave={closeSoon}
    >
      <button
        type="button"
        className="services-mega-trigger nav-link"
        aria-expanded={open}
        aria-haspopup="true"
        onClick={() => setOpen((v) => !v)}
      >
        Services <FaChevronDown className="services-mega-caret" />
      </button>

      <div className="services-mega-panel" role="menu">
        <div className="services-mega-grid">
          {servicesMenu.map((s) => (
            <Link
              key={s.slug}
              href={s.href}
              className="services-mega-item"
              role="menuitem"
              onClick={() => setOpen(false)}
            >
              <span
                className="services-mega-icon"
                style={{ background: `${s.color}1f`, color: s.color }}
              >
                {s.icon}
              </span>
              <span className="services-mega-text">
                <span className="services-mega-label">{s.label}</span>
                <span className="services-mega-desc">{s.desc}</span>
              </span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ServicesMegaMenu;
