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
import { servicesMenu } from "@/components/Services/servicesData";
import { suburbs, type Suburb } from "./suburbs";
import { locationFaqs, locationJsonLd } from "./locationSeo";
import "@/components/Services/servicePage.scss";
import "./locations.scss";

const steps = [
  { icon: <FaRegClipboard />, title: "1. Book Your Job", text: "Tell us your pickup and drop-off, then choose your time, vehicle and service type — all online in about 60 seconds." },
  { icon: <FaBoxOpen />, title: "2. We Do the Lifting", text: "Your verified movers arrive on time, then load, secure, transport and unload everything with care." },
  { icon: <FaRegSmile />, title: "3. Pay, Rate & Relax", text: "Pay securely through the app, rate your movers, and settle into your new place. Job done." },
];

const nearbyLink = (name: string) => {
  const match = suburbs.find((s) => s.name.toLowerCase() === name.toLowerCase());
  return match ? `/removalists/${match.slug}` : null;
};

const LocationPageTemplate = ({ suburb }: { suburb: Suburb }) => {
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const faqs = locationFaqs(suburb);
  const services = servicesMenu.slice(0, 8);

  return (
    <div className="service-page location-page">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(locationJsonLd(suburb)) }}
      />

      {/* Hero */}
      <section className="sp-hero">
        <div className="sp-container">
          <nav className="sp-crumbs" aria-label="Breadcrumb">
            <Link href="/">Home</Link>
            <span>/</span>
            <Link href="/#areas">Areas We Cover</Link>
            <span>/</span>
            <span>{suburb.name}</span>
          </nav>
          <div className="sp-hero-grid">
            <div className="sp-hero-left">
              <span className="sp-badge">
                <FaMapMarkerAlt /> {suburb.region}
              </span>
              <h1 className="sp-h1">Removalists in {suburb.name}{suburb.postcode ? ` ${suburb.postcode}` : ""}</h1>
              <p className="sp-intro">
                {suburb.blurb} OYO Movers gives you affordable, professional and trusted removals
                in {suburb.name} — book verified movers with a right-sized truck, pay as you go, and
                move the same day, seven days a week.
              </p>
              <div className="sp-hero-cta">
                <Link href="/prices" className="sp-btn-primary">Get a Free Quote <FaArrowRight /></Link>
                <a href="tel:1300013131" className="sp-btn-ghost"><FaPhoneVolume /> 1300 01 31 31</a>
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
                <span className="sp-cost-label">Local {suburb.name} move from</span>
                <span className="sp-cost-value">$76/hr</span>
                <Link href="/prices" className="sp-cost-btn">Get your price</Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services offered here (internal links) */}
      <section className="sp-section">
        <div className="sp-container">
          <h2 className="sp-h2">Removal Services in {suburb.name}</h2>
          <p className="sp-sub">Whatever you need moved in {suburb.name}, there's an OYO service for it.</p>
          <div className="loc-services">
            {services.map((s) => (
              <Link key={s.slug} href={s.href} className="loc-service">
                <span className="loc-service-ic" style={{ background: `${s.color}1f`, color: s.color }}>{s.icon}</span>
                <span className="loc-service-label">{s.label}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Why choose */}
      <section className="sp-section sp-section-alt">
        <div className="sp-container">
          <h2 className="sp-h2">Why {suburb.name} Chooses OYO Movers</h2>
          <div className="sp-grid-3">
            <div className="sp-why"><h3>Local & On Time</h3><p>Our movers know {suburb.name}&apos;s streets, parking and access, so your move runs on schedule.</p></div>
            <div className="sp-why"><h3>Upfront Pricing</h3><p>See a transparent, pay-as-you-go quote before you book — no call-out surprises or fuel levies.</p></div>
            <div className="sp-why"><h3>Rated 4.9 on Google</h3><p>Thousands of Melburnians — including plenty in {suburb.region} — trust and review OYO.</p></div>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="sp-section">
        <div className="sp-container">
          <h2 className="sp-h2">How It Works</h2>
          <p className="sp-sub">Book movers with a truck in {suburb.name} in three simple steps.</p>
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

      {/* Local coverage */}
      <section className="sp-section sp-section-alt">
        <div className="sp-container sp-areas">
          <h2 className="sp-h2">Covering {suburb.name} & Nearby Suburbs</h2>
          <p className="sp-sub">
            {suburb.postcode ? `Proudly serving ${suburb.name} ${suburb.postcode} and the surrounding ${suburb.region}.` : `Proudly serving ${suburb.name} and the surrounding ${suburb.region}.`}
          </p>
          <ul className="sp-area-list">
            {suburb.nearby.map((n) => {
              const href = nearbyLink(n);
              return (
                <li key={n}>
                  <FaMapMarkerAlt />{" "}
                  {href ? <Link href={href}>{n}</Link> : n}
                </li>
              );
            })}
          </ul>
        </div>
      </section>

      {/* FAQ */}
      <section className="sp-section">
        <div className="sp-container sp-faq-wrap">
          <h2 className="sp-h2">Removalists {suburb.name} — FAQs</h2>
          <div className="sp-faq-list">
            {faqs.map((f, i) => (
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
                <div className="sp-faq-a"><p>{f.a}</p></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="sp-cta">
        <div className="sp-container sp-cta-inner">
          <div>
            <h2>Need removalists in {suburb.name}?</h2>
            <p>Get an upfront quote in about 60 seconds and book movers with a truck — same day, seven days a week.</p>
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

export default LocationPageTemplate;
