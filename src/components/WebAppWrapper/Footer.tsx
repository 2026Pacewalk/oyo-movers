"use client";

import "./footer.scss";
import { s3ImageBaseUrl } from "@/config";
import Link from "next/link";
import React from "react";
import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaPhoneAlt,
  FaEnvelope,
  FaMapMarkerAlt,
  FaArrowRight,
  FaArrowUp,
} from "react-icons/fa";
import { FaTiktok } from "react-icons/fa6";

const helpfulLinks = [
  { label: "Moving Checklist", href: "/moving-checklist" },
  { label: "Packing Tips", href: "/packing-tips" },
  { label: "Item We Take", href: "/item-we-take" },
  { label: "Avg Moving Cost", href: "/avg-moving-cost" },
  { label: "How We Charge", href: "/how-we-charge" },
];

const legalLinks = [
  { label: "Platform T&C's", href: "/platform-terms" },
  { label: "Customer T&C's", href: "/customer-terms" },
  { label: "Cancellations & Changes", href: "/cancel-policy" },
  { label: "Insurance", href: "/insurance" },
  { label: "Privacy Policy", href: "/privacy-policy" },
];

const companyLinks = [
  { label: "Become a Mover", href: "/become-mover" },
  { label: "Customer Portal", href: "/login" },
  { label: "Get Estimate", href: "/prices" },
  { label: "FAQ's", href: "/faqs" },
  { label: "Contact us", href: "/contact-us" },
];

const socialLinks = [
  { label: "Facebook", href: "#", icon: <FaFacebookF /> },
  { label: "TikTok", href: "#", icon: <FaTiktok /> },
  { label: "Twitter", href: "#", icon: <FaTwitter /> },
  { label: "Instagram", href: "#", icon: <FaInstagram /> },
];

const paymentLogos = [
  { src: "/f-logo-2.png", cls: "master-card", alt: "Mastercard" },
  { src: "/f-logo-1.png", cls: "visa-p", alt: "Visa" },
  { src: "/f-logo-3.png", cls: "ammerican-express", alt: "American Express" },
  { src: "/f-logo-5.png", cls: "australia", alt: "Australian owned" },
  { src: "/f-logo-6.png", cls: "recycle", alt: "Eco friendly" },
];

const LinkColumn = ({
  title,
  links,
}: {
  title: string;
  links: { label: string; href: string }[];
}) => (
  <div className="footer-col">
    <h4 className="footer-col-title">{title}</h4>
    <ul className="footer-link-list">
      {links.map((l) => (
        <li key={l.label}>
          <Link href={l.href} className="footer-link">
            <span className="footer-link-arrow">
              <FaArrowRight />
            </span>
            {l.label}
          </Link>
        </li>
      ))}
    </ul>
  </div>
);

const Footer = () => {
  const scrollToTop = () =>
    window.scrollTo({ top: 0, behavior: "smooth" });

  return (
    <footer className="footer-section">
      {/* CTA strip */}
      <div className="footer-cta">
        <div className="footer-cta-inner">
          <div className="footer-cta-text">
            <h3>Ready to move? Get moving in 60 seconds.</h3>
            <p>Transparent pricing, no hidden fees. Book your same-day move now.</p>
          </div>
          <Link href="/prices" className="footer-cta-btn">
            Get a Free Quote <FaArrowRight />
          </Link>
        </div>
      </div>

      <div className="footer-main">
        <div className="footer-grid">
          {/* Brand column */}
          <div className="footer-brand">
            <Link href="/" className="footer-logo" aria-label="OYO Movers home">
              <img src="/images/footer-logo.png" alt="OYO Movers" />
            </Link>
            <p className="footer-tagline">
              Melbourne&apos;s trusted same-day movers. We move everything from a
              few items to a whole house — stress-free, pay as you go.
            </p>

            <ul className="footer-social">
              {socialLinks.map((s) => (
                <li key={s.label}>
                  <a
                    href={s.href}
                    className="social-icon"
                    aria-label={s.label}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {s.icon}
                  </a>
                </li>
              ))}
            </ul>

            <div className="footer-apps">
              <a href="#" aria-label="Download on the App Store">
                <img src="/images/AppleStore.png" alt="Download on the App Store" />
              </a>
              <a href="#" aria-label="Get it on Google Play">
                <img src="/images/GooglePlay.png" alt="Get it on Google Play" />
              </a>
            </div>
          </div>

          {/* Link columns */}
          <LinkColumn title="Helpful Links" links={helpfulLinks} />
          <LinkColumn title="Legal" links={legalLinks} />
          <LinkColumn title="Company" links={companyLinks} />

          {/* Contact column */}
          <div className="footer-col footer-contact">
            <h4 className="footer-col-title">Get in touch</h4>
            <ul className="footer-contact-list">
              <li>
                <span className="contact-ic">
                  <FaPhoneAlt />
                </span>
                <a href="tel:1300013131">1300 01 31 31</a>
              </li>
              <li>
                <span className="contact-ic">
                  <FaEnvelope />
                </span>
                <a href="mailto:support@oyomovers.com.au">
                  support@oyomovers.com.au
                </a>
              </li>
              <li>
                <span className="contact-ic">
                  <FaMapMarkerAlt />
                </span>
                <span>470 St Kilda Road, Melbourne VIC 3004</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="footer-bottom">
        <div className="footer-bottom-inner">
          <p className="copyright-text">
            Copyright &copy; 2026 OYO Movers | All rights reserved
          </p>
          <ul className="payment-logos">
            {paymentLogos.map((p) => (
              <li key={p.cls}>
                <img
                  src={s3ImageBaseUrl + p.src}
                  alt={p.alt}
                  className={`footer-logo-card ${p.cls}`}
                />
              </li>
            ))}
          </ul>
          <button
            type="button"
            className="back-to-top"
            onClick={scrollToTop}
            aria-label="Back to top"
          >
            <FaArrowUp />
          </button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
