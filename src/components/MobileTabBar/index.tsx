"use client";

import "./style.scss";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useEffect, useRef, useState } from "react";
import { FaDropbox, FaTag, FaRegUser, FaRegUserCircle, FaPlus } from "react-icons/fa";

/* Routes where the app-style bottom bar should NOT appear
   (dedicated full-screen flows or the app-home which has its own bar). */
const HIDE_ON = [
  "/quick-booking",
  "/rate-mover",
  "/app-home",
  "/book",
  "/login",
  "/signup",
  "/mover-login",
  "/forgot-password",
  "/verify-otp",
];

const MobileTabBar = () => {
  const pathname = usePathname() || "/";
  const [visible, setVisible] = useState(false);
  const lastY = useRef(0);

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY || document.documentElement.scrollTop;
      if (y < 120) {
        // near the very top: keep it tucked away
        setVisible(false);
      } else if (y < lastY.current - 4) {
        // scrolling up → reveal
        setVisible(true);
      } else if (y > lastY.current + 4) {
        // scrolling down → hide
        setVisible(false);
      }
      lastY.current = y;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  if (HIDE_ON.some((p) => pathname === p || pathname.startsWith(p + "/"))) {
    return null;
  }

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    return pathname === href || pathname.startsWith(href + "/");
  };

  return (
    <nav
      className={`mobile-tabbar ${visible ? "is-visible" : "is-hidden"}`}
      aria-label="Primary"
    >
      <Link
        href="/become-a-mover"
        className={`mtb-item ${isActive("/become-a-mover") || isActive("/become-mover") ? "active" : ""}`}
      >
        <FaRegUser />
        <span>Mover</span>
      </Link>

      <Link
        href="/#services-section"
        className={`mtb-item ${pathname.includes("services") ? "active" : ""}`}
      >
        <FaDropbox />
        <span>Services</span>
      </Link>

      <Link href="/booking" className="mtb-fab" aria-label="Book a move">
        <FaPlus />
      </Link>

      <Link
        href="/prices"
        className={`mtb-item ${isActive("/prices") ? "active" : ""}`}
      >
        <FaTag />
        <span>Prices</span>
      </Link>

      <Link
        href="/login"
        className={`mtb-item ${
          isActive("/login") || isActive("/profile") || isActive("/account-settings")
            ? "active"
            : ""
        }`}
      >
        <FaRegUserCircle />
        <span>Account</span>
      </Link>
    </nav>
  );
};

export default MobileTabBar;
