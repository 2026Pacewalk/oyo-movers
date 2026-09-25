"use client";

import React, { useState } from "react";
import Link from "next/link";
import Footer from "@/components/WebAppWrapper/Footer";
import ReviewService from "@/components/LandingPage/Testimonial";
import HowItsWork from "@/components/LandingPage/HowItsWork";
import AreasWeCover from "@/components/Locations/AreasWeCover";
import { BiSolidPhoneCall } from "react-icons/bi";
import FaqAccordion from "@/components/FaqAccordion";
import {
  FaCheck,
  FaTruck,
  FaPhoneVolume,
  FaArrowRight,
  FaMapMarkerAlt,
  FaRegClipboard,
  FaBoxOpen,
  FaRegSmile,
  FaPlus,
  FaMinus,
  FaRegClock,
  FaBan,
  FaStar,
} from "react-icons/fa";
import { serviceAreas, serviceJsonLd, type ServiceContent } from "./serviceContent";
import "./servicePage.scss";

const steps = [
  { icon: <FaRegClipboard />, title: "1. Book Your Job", text: "Tell us your pickup and drop-off, then choose your time, vehicle and service type — all online in about 60 seconds." },
  { icon: <FaBoxOpen />, title: "2. We Do the Lifting", text: "Your verified movers arrive on time, then load, secure, transport and unload everything with care." },
  { icon: <FaRegSmile />, title: "3. Pay, Rate & Relax", text: "Pay securely through the app, rate your movers, and settle into your new place. Job done." },
];

const ServicePageTemplate = ({ content }: { content: ServiceContent }) => {
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  return (
    <div className="service-page">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceJsonLd(content)) }}
      />

      {/* Hero */}
      <section className="sp-hero">
        <div className="sp-container">
          <nav className="sp-crumbs" aria-label="Breadcrumb">
            <Link href="/">Home</Link>
            <span>/</span>
            <span>{content.breadcrumb}</span>
          </nav>
          <div className="sp-hero-grid">
            <div className="sp-hero-left">
              <span className="sp-badge">{content.hero.badge}</span>
              <h1 className="sp-h1">{content.hero.h1}</h1>
              <p className="sp-intro">{content.hero.intro}</p>
              <div className="sp-hero-cta">
                <Link href="/prices" className="sp-btn-primary">
                  Get a Free Quote <FaArrowRight />
                </Link>
                <a href="tel:1300013131" className="sp-btn-ghost">
                  <BiSolidPhoneCall /> 1300 01 31 31
                </a>
              </div>
              <ul className="sp-hero-points">
                <li><FaRegClock /> Time Start at Pickup</li>
                <li><FaBan className="no" /> No Hidden Fees</li>
                <li><FaStar className="star" /> 4.9 Rating</li>
              </ul>
            </div>
            {content.heroImage && (
              <div className="sp-hero-right">
                <div
                  className={`sp-hero-banner ${
                    /\.(jpg|jpeg|webp|avif)$/i.test(content.heroImage) ? "" : "is-illustration"
                  }`}
                >
                  <img src={content.heroImage} alt={content.hero.h1} />
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="sp-section">
        <div className="sp-container">
          <h2 className="sp-h2">{content.benefitsTitle}</h2>
          <p className="sp-sub">{content.benefitsIntro}</p>
          <div className="sp-grid-3">
            {content.benefits.map((b) => (
              <div className="sp-card" key={b.title}>
                <span className="sp-card-tick"><FaCheck /></span>
                <h3>{b.title}</h3>
                <p>{b.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How it works — same illustrated section as the home page */}
      <HowItsWork />

      {/* Why choose */}
      <section className="sp-section">
        <div className="sp-container">
          <h2 className="sp-h2">{content.whyTitle}</h2>
          <div className="sp-grid-3">
            {content.why.map((w) => (
              <div className="sp-why" key={w.title}>
                <h3>{w.title}</h3>
                <p>{w.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Service areas — same map + suburb list as the home page */}
      <AreasWeCover />

      {/* FAQ (AEO) — shared accordion UI */}
      <FaqAccordion items={content.faqs} heading={content.faqTitle} />

      {/* CTA band */}
      <section className="sp-cta">
        <div className="sp-container sp-cta-inner">
          <div>
            <h2>{content.ctaTitle}</h2>
            <p>{content.ctaText}</p>
          </div>
          <div className="sp-cta-actions">
            <Link href="/prices" className="sp-btn-primary">Get a Free Quote <FaArrowRight /></Link>
            <a href="tel:1300013131" className="sp-btn-dark"><BiSolidPhoneCall /> Call us</a>
          </div>
        </div>
      </section>

      <ReviewService />
      <Footer />
    </div>
  );
};

export default ServicePageTemplate;
