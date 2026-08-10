"use client";

import React, { useState } from "react";
import Link from "next/link";
import Footer from "@/components/WebAppWrapper/Footer";
import ReviewService from "@/components/LandingPage/Testimonial";
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
                  <FaPhoneVolume /> 1300 01 31 31
                </a>
              </div>
              <ul className="sp-hero-points">
                <li><FaCheck /> No hidden fees</li>
                <li><FaCheck /> 4.9★ rated</li>
                <li><FaCheck /> Same-day, 7 days</li>
              </ul>
            </div>
            <div className="sp-hero-right">
              <div className="sp-cost-card">
                <FaTruck className="sp-cost-icon" />
                <span className="sp-cost-label">{content.hero.avgLabel}</span>
                <span className="sp-cost-value">{content.hero.avgCost}</span>
                <Link href="/prices" className="sp-cost-btn">Get your price</Link>
              </div>
            </div>
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

      {/* How it works */}
      <section className="sp-section sp-section-alt">
        <div className="sp-container">
          <h2 className="sp-h2">How It Works</h2>
          <p className="sp-sub">Book professional movers with a truck in three simple steps.</p>
          <div className="sp-grid-3">
            {steps.map((s) => (
              <div className="sp-step" key={s.title}>
                <span className="sp-step-icon">{s.icon}</span>
                <h3>{s.title}</h3>
                <p>{s.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

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

      {/* Service areas (GEO) */}
      <section className="sp-section sp-section-alt">
        <div className="sp-container sp-areas">
          <h2 className="sp-h2">Serving Melbourne & Surrounds</h2>
          <p className="sp-sub">
            OYO Movers operates right across the greater Melbourne region, seven days a week.
          </p>
          <ul className="sp-area-list">
            {serviceAreas.map((a) => (
              <li key={a}><FaMapMarkerAlt /> {a}</li>
            ))}
          </ul>
        </div>
      </section>

      {/* FAQ (AEO) */}
      <section className="sp-section">
        <div className="sp-container sp-faq-wrap">
          <h2 className="sp-h2">{content.faqTitle}</h2>
          <div className="sp-faq-list">
            {content.faqs.map((f, i) => (
              <div className={`sp-faq ${openFaq === i ? "open" : ""}`} key={i}>
                <button
                  type="button"
                  className="sp-faq-q"
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  aria-expanded={openFaq === i}
                >
                  {f.q}
                  <span className="sp-faq-ic">{openFaq === i ? <FaMinus /> : <FaPlus />}</span>
                </button>
                <div className="sp-faq-a">
                  <p>{f.a}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA band */}
      <section className="sp-cta">
        <div className="sp-container sp-cta-inner">
          <div>
            <h2>{content.ctaTitle}</h2>
            <p>{content.ctaText}</p>
          </div>
          <div className="sp-cta-actions">
            <Link href="/prices" className="sp-btn-primary">Get a Free Quote <FaArrowRight /></Link>
            <a href="tel:1300013131" className="sp-btn-dark"><FaPhoneVolume /> Call us</a>
          </div>
        </div>
      </section>

      <ReviewService />
      <Footer />
    </div>
  );
};

export default ServicePageTemplate;
