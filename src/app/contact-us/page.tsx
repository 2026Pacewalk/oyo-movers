"use client";

import WebAppWrapper from "@/components/WebAppWrapper";
import "./contact-us.scss";
import Link from "next/link";
import {
  FaPhoneVolume,
  FaEnvelope,
  FaMapMarkerAlt,
  FaClock,
  FaUser,
  FaTruck,
  FaArrowRight,
} from "react-icons/fa";

const contactMethods = [
  {
    icon: <FaPhoneVolume />,
    label: "Call us",
    value: "1300 01 31 31",
    sub: "Booking support",
    href: "tel:1300013131",
  },
  {
    icon: <FaEnvelope />,
    label: "Email us",
    value: "support@oyomovers.com.au",
    sub: "We reply within 1 business day",
    href: "mailto:support@oyomovers.com.au",
  },
  {
    icon: <FaMapMarkerAlt />,
    label: "Visit us",
    value: "Level 1/454 Collins St, Melbourne VIC 3000",
    sub: "Christie Spaces, Melbourne CBD",
    href: "https://www.google.com/maps/search/?api=1&query=OYO+Movers+454+Collins+St+Melbourne",
  },
];

const ContactUs = () => {
  return (
    <WebAppWrapper>
      <div className="contact-us-page">
        {/* Hero */}
        <section className="cu-hero">
          <div className="cu-hero-inner">
            <span className="cu-badge">Get in touch</span>
            <h1 className="cu-title">Contact OYO Movers</h1>
            <div className="cu-divider"></div>
            <p className="cu-sub">
              Questions about a move, a booking or becoming a mover? Our friendly Melbourne
              team is here to help — reach out any way you like.
            </p>
          </div>
        </section>

        <div className="cu-container">
          {/* Contact method cards */}
          <div className="cu-methods">
            {contactMethods.map((m) => (
              <a
                key={m.label}
                href={m.href}
                className="cu-method"
                target={m.href.startsWith("http") ? "_blank" : undefined}
                rel={m.href.startsWith("http") ? "noopener noreferrer" : undefined}
              >
                <span className="cu-method-ic">{m.icon}</span>
                <span className="cu-method-label">{m.label}</span>
                <span className="cu-method-value">{m.value}</span>
                <span className="cu-method-sub">{m.sub}</span>
              </a>
            ))}
          </div>

          <div className="cu-grid">
            {/* Support hours */}
            <div className="cu-card cu-hours">
              <div className="cu-card-head">
                <span className="cu-card-ic"><FaClock /></span>
                <h2>Support Hours <small>(AEST)</small></h2>
              </div>
              <ul className="cu-hours-list">
                <li><span>Monday – Saturday</span><strong>8:00 AM – 5:00 PM</strong></li>
                <li><span>Sunday</span><strong className="closed">Closed</strong></li>
              </ul>
              <div className="cu-online">
                <FaClock /> Online bookings available <strong>24 / 7</strong>
                <Link href="/booking" className="cu-online-link">Book now <FaArrowRight /></Link>
              </div>
            </div>

            {/* Who are you */}
            <div className="cu-card cu-paths">
              <div className="cu-card-head">
                <h2>How can we help?</h2>
              </div>
              <div className="cu-path-row">
                <Link href="/i-am-customer" className="cu-path">
                  <span className="cu-path-ic"><FaUser /></span>
                  <span className="cu-path-text">
                    <strong>I&apos;m a Customer</strong>
                    <span>Help with a move or booking</span>
                  </span>
                  <FaArrowRight className="cu-path-arrow" />
                </Link>
                <Link href="/i-am-mover" className="cu-path">
                  <span className="cu-path-ic"><FaTruck /></span>
                  <span className="cu-path-text">
                    <strong>I&apos;m a Mover</strong>
                    <span>Support for OYO movers</span>
                  </span>
                  <FaArrowRight className="cu-path-arrow" />
                </Link>
              </div>

              <div className="cu-become">
                <span>Want to earn with your truck or van?</span>
                <Link href="/become-a-mover" className="cu-become-btn">
                  Become a Mover <FaArrowRight />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </WebAppWrapper>
  );
};

export default ContactUs;
