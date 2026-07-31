"use client";

import WebAppWrapper from "@/components/WebAppWrapper";
import "./contact-us.scss";
import { Image } from "react-bootstrap";

const ContactUs = () => {
  return (
    <WebAppWrapper>
      <div className="contact-us-page">
        <div className="main-content">
          <div className="container">
            <div className="content-wrapper">
              <h1 className="main-title">Contact Us
              <div className="divider"></div>
              </h1>
              <div className="support-hours">
                <h2 className="support-title">Support Hours <span style={{color: '#666', fontWeight: '400'}}>(AEST)</span></h2>
                <div className="hours-list">
                  <div className="hours-item">
                    <span className="day">Mon-Sat</span>
                    <span className="time">8:00 AM - 5:00 PM</span>
                  </div>
                  {/* <div className="hours-item">
                    <span className="day">Sat</span>
                    <span className="time">8:00 AM - 4:00 PM</span>
                  </div> */}
                  <div className="hours-item">
                    <span className="day">Sun</span>
                    <span className="time closed">Closed</span>
                  </div>
                </div>
              </div>

              <div className="action-buttons">
                <button
                  className="customer-btn"
                  onClick={() => window.location.href = "/i-am-customer"}
                >
                  I'm a Customer
                </button>
                <button
                  className="customer-btn"
                  onClick={() => window.location.href = "/i-am-mover"}
                >
                  I'm a Mover
                </button>
              </div>

              <div className="become-mover-link">
                <span className="become-text">Become A Mover?</span>
                <a href="/become-mover" className="apply-link">Apply Here</a>
              </div>

              <div className="support-info">
                <div className="support-box">
                  <a href="tel:1300 01 31 31">
                    <span>Booking Support: 1300 01 31 31</span>
                  </a>
                </div>
                <div className="support-box">
                 <a href="/booking"><span>Online Bookings - 24x7</span></a>
                </div>
              </div>
            </div>
          </div>
        </div>  
      </div>
    </WebAppWrapper>
  );
};

export default ContactUs;
