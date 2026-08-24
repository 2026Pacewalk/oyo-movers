"use client";

import "./style.scss";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import { HiOutlineHome } from "react-icons/hi2";
import { FaPlus } from "react-icons/fa";
import {
  IoGridOutline,
  IoPricetagsOutline,
  IoPersonOutline,
} from "react-icons/io5";

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

  if (HIDE_ON.some((p) => pathname === p || pathname.startsWith(p + "/"))) {
    return null;
  }

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    return pathname === href || pathname.startsWith(href + "/");
  };

  return (
    <nav className="mobile-tabbar" aria-label="Primary">
      <Link href="/" className={`mtb-item ${isActive("/") ? "active" : ""}`}>
        <HiOutlineHome />
        <span>Home</span>
      </Link>

      <Link
        href="/#services-section"
        className={`mtb-item ${pathname.includes("services") ? "active" : ""}`}
      >
        <IoGridOutline />
        <span>Services</span>
      </Link>

      <Link href="/booking" className="mtb-fab" aria-label="Book a move">
        <FaPlus />
      </Link>

      <Link
        href="/prices"
        className={`mtb-item ${isActive("/prices") ? "active" : ""}`}
      >
        <IoPricetagsOutline />
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
        <IoPersonOutline />
        <span>Account</span>
      </Link>
    </nav>
  );
};

export default MobileTabBar;
