import React from "react";
import Link from "next/link";
import { FaStar, FaShieldAlt, FaClock, FaCheckCircle } from "react-icons/fa";
import "./authContainer.scss";

const AuthContainer = ({ children }: any) => {
  return (
    <div className="auth-shell">
      {/* Left brand showcase (hidden on small screens) */}
      <aside className="auth-left">
        <div className="auth-left-inner">
          <Link href="/" className="auth-logo">
            <img src="/images/footer-logo.png" alt="OYO Movers" />
          </Link>

          <div className="auth-left-body">
            <span className="auth-badge">On-Demand Movers</span>
            <h2>Move smarter with Melbourne&apos;s trusted movers.</h2>
            <p>
              Book verified movers with a truck in about 60 seconds. Transparent pricing,
              no hidden fees, and help seven days a week.
            </p>

            <ul className="auth-points">
              <li><FaCheckCircle /> Upfront, pay-as-you-go pricing</li>
              <li><FaCheckCircle /> Verified, professional movers</li>
              <li><FaCheckCircle /> Same-day, seven days a week</li>
            </ul>
          </div>

          <div className="auth-trust">
            <div className="auth-trust-item">
              <FaStar className="auth-trust-ic" />
              <span><strong>4.9★</strong> Google rating</span>
            </div>
            <div className="auth-trust-item">
              <FaShieldAlt className="auth-trust-ic" />
              <span><strong>Verified</strong> movers</span>
            </div>
            <div className="auth-trust-item">
              <FaClock className="auth-trust-ic" />
              <span><strong>Same-day</strong> service</span>
            </div>
          </div>
        </div>
      </aside>

      {/* Right form panel */}
      <main className="auth-right">{children}</main>
    </div>
  );
};

export default AuthContainer;
