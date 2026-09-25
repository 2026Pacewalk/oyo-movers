"use client";

import WebAppWrapper from "@/components/WebAppWrapper";
import "./contact-us.scss";
import Link from "next/link";
import { FaUser, FaTruck } from "react-icons/fa";

const ContactUs = () => {
  return (
    <WebAppWrapper>
      <div className="contact-us-page">
        <div className="cu-wrap">
          <h1 className="cu-title">Contact Us</h1>
          <div className="cu-divider"></div>

          {/* Support hours */}
          <h2 className="cu-hours-title">
            Support Hours <small>(AEST)</small>
          </h2>
          <ul className="cu-hours-list">
            <li>
              <span className="cu-day">Mon–Sat</span>
              <span className="cu-time">8:00 AM – 5:00 PM</span>
            </li>
            <li>
              <span className="cu-day">Sun</span>
              <span className="cu-time cu-closed">Closed</span>
            </li>
          </ul>

          {/* Who are you */}
          <div className="cu-roles">
            <Link href="/i-am-customer" className="cu-role-btn">
              <FaUser /> I&apos;m a Customer
            </Link>
            <Link href="/i-am-mover" className="cu-role-btn">
              <FaTruck /> I&apos;m a Mover
            </Link>
          </div>

          {/* Become a mover */}
          <p className="cu-become">
            <span className="cu-become-q">Become A Mover?</span>{" "}
            <Link href="/become-a-mover" className="cu-become-link">Apply Here</Link>
          </p>

          {/* Info boxes */}
          <div className="cu-info-row">
            <a href="tel:1300013131" className="cu-info-box">
              Booking Support: 1300 01 31 31
            </a>
            <Link href="/booking" className="cu-info-box">
              Online Bookings – 24x7
            </Link>
          </div>
        </div>
      </div>
    </WebAppWrapper>
  );
};

export default ContactUs;
