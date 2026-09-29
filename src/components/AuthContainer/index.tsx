import React from "react";
import Link from "next/link";
import { FaStar, FaBan, FaRegClock, FaCheckCircle } from "react-icons/fa";
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
              Book verified movers with a truck in about 60 seconds.
            </p>

            <ul className="auth-points">
              <li><FaCheckCircle /> Upfront, pay-as-you-go pricing</li>
              <li><FaCheckCircle /> Verified, professional movers</li>
              <li><FaCheckCircle /> Same-day, seven days a week</li>
            </ul>
          </div>

          <div className="auth-trust">
            <div className="auth-trust-item">
              <FaRegClock className="auth-trust-ic" />
              <span>Time Start at Pickup</span>
            </div>
            <div className="auth-trust-item">
              <FaBan className="auth-trust-ic" style={{ color: "#e5162a" }} />
              <span>No Hidden Fees</span>
            </div>
            <div className="auth-trust-item">
              <FaStar className="auth-trust-ic" style={{ color: "#15803d" }} />
              <span>4.9 Rating</span>
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
