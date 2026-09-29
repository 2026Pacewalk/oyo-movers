"use client";

import React, { useState } from "react";
import Link from "next/link";
import Footer from "@/components/WebAppWrapper/Footer";
import ReviewService from "@/components/LandingPage/Testimonial";
import HowItsWork from "@/components/LandingPage/HowItsWork";
import AreasWeCover from "@/components/Locations/AreasWeCover";
import { BiSolidPhoneCall } from "react-icons/bi";
import {
  LuBuilding2,
  LuTruck,
  LuSofa,
  LuBadgeDollarSign,
  LuShieldCheck,
  LuCalendarDays,
  LuBox,
  LuPackage,
  LuClock,
  LuMapPin,
  LuWrench,
  LuMonitor,
  LuRecycle,
  LuHeartHandshake,
  LuHelpingHand,
  LuStore,
  LuHome,
  LuBriefcase,
  LuWarehouse,
  LuPlug,
  LuUsers,
  LuCheck as LuCheckIcon,
} from "react-icons/lu";
import FaqAccordion from "@/components/FaqAccordion";
import BookOyoFor from "./BookOyoFor";
import {
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

const benefitIcons: Record<string, React.ReactNode> = {
  building: <LuBuilding2 />,
  truck: <LuTruck />,
  sofa: <LuSofa />,
  price: <LuBadgeDollarSign />,
  shield: <LuShieldCheck />,
  calendar: <LuCalendarDays />,
  box: <LuBox />,
  package: <LuPackage />,
  clock: <LuClock />,
  location: <LuMapPin />,
  wrench: <LuWrench />,
  monitor: <LuMonitor />,
  recycle: <LuRecycle />,
  charity: <LuHeartHandshake />,
  lifting: <LuHelpingHand />,
  store: <LuStore />,
  home: <LuHome />,
  briefcase: <LuBriefcase />,
  warehouse: <LuWarehouse />,
  appliance: <LuPlug />,
  crew: <LuUsers />,
  check: <LuCheckIcon />,
};

/* Pick a relevant line-art icon from a benefit's title (keyword match, first wins). */
const resolveBenefitIcon = (title: string): string => {
  const t = title.toLowerCase();
  if (/(assembl|disassembl)/.test(t)) return "wrench";
  if (/(workstation|chairs|desks, chairs)/.test(t)) return "briefcase";
  if (/(beds & desks|rearrange|restage)/.test(t)) return "wrench";
  if (/(it & electronics|electronics|monitor)/.test(t)) return "monitor";
  if (/(recycl|responsible disposal|disposal)/.test(t)) return "recycle";
  if (/charity/.test(t)) return "charity";
  if (/(lifting|loading|unloading|muscle|helping hand|experienced crew)/.test(t)) return "lifting";
  if (/storage/.test(t)) return "warehouse";
  if (/(stairs|lifts)/.test(t)) return "building";
  if (/(fridge|washer|appliance|whitegood)/.test(t)) return "appliance";
  if (/(pickup|seller|drop-off|pick up)/.test(t)) return "location";
  if (/carried inside/.test(t)) return "home";
  if (/(store|marketplace)/.test(t)) return "store";
  if (/(truck|crew|van)/.test(t)) return "truck";
  if (/(we move everything|furniture|bulky|item or a few|one item|loaded)/.test(t)) return "sofa";
  if (/(pricing|price|pay as you go|pay only|by the hour|fair|cheaper|upfront|one simple)/.test(t)) return "price";
  if (/(careful|protected|handling|insured|transit|kit)/.test(t)) return "shield";
  if (/(after-hours|weekend)/.test(t)) return "clock";
  if (/(same-day|7 days|fast|book in minutes|flexible|turnaround|minutes)/.test(t)) return "calendar";
  return "check";
};

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
            {content.benefits.map((b) => {
              const iconKey = b.icon ?? resolveBenefitIcon(b.title);
              return (
                <div className="sp-card sp-card-icon-only" key={b.title}>
                  <span className="sp-card-tick sp-card-lineicon">
                    {benefitIcons[iconKey] ?? benefitIcons.check}
                  </span>
                  <h3>{b.title}</h3>
                  <p>{b.text}</p>
                </div>
              );
            })}
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

      {/* Book OYO For — services grid, shown on every service page */}
      <BookOyoFor currentSlug={content.slug} />

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
