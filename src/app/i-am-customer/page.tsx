"use client";

import WebAppWrapper from "@/components/WebAppWrapper";
import "./customer.scss";

const CustomerSupportPage = () => {
    // Helper function to handle email clicks
    const handleEmailClick = (e: React.MouseEvent<HTMLAnchorElement>, subject: string) => {
      e.preventDefault();
      const email = "Support@oyomovers.com.au";
      const encodedSubject = encodeURIComponent(subject);
      
      // Fixed Gmail URL - removed duplicate parameters
      const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=${email}&su=${encodedSubject}`;
      
      // For better mobile support, use mailto as fallback
      const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
      
      if (isMobile) {
        // Try Gmail app first, fallback to mailto
        const mailtoUrl = `mailto:${email}?subject=${encodedSubject}`;
        window.location.href = mailtoUrl;
      } else {
        window.open(gmailUrl, '_blank');
      }
    };

  return (
    <WebAppWrapper>
      <div className="customer-support-page"> 
        <div className="main-content">
          <div className="container">
            <div className="content-wrapper">
              <h1 className="main-title">
                Customer Support
                <div className="divider"></div>
              </h1>

              <div className="support-hours">
                <h2 className="support-title">Support Hours <span>(AEST)</span></h2>
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

              <div className="support-cards">
                <div className="card issue-support">
                  <h3>Booking Support</h3>
                  {/* <p>It's simple, click on <a href="/get-quote">Get a Quote</a></p> */}
                  <p>Call Support : <a href="tel:1300 01 31 31" style={{ color: "#000", textDecoration: "none" }}>1300 01 31 31</a></p>
                </div>
                
                <div className="card issue-support">
                  <h3>I've an Issue</h3>
                  <a href="#" onClick={(e) => handleEmailClick(e, "")} className="email-link">E-mail Support →</a>
                </div>
                
                <div className="card something-else">
                  <h3>Something Else</h3>
                  <a href="#" onClick={(e) => handleEmailClick(e, "")} className="email-link">E-mail Support →</a>
                </div>
                
                <div className="card report-driver">
                  <h3>Report Driver</h3>
                  <a href="#" onClick={(e) => handleEmailClick(e, "")} className="email-link">E-mail Support →</a>
                </div>
              </div>

              <div className="phone-support-box">
                <a href="/booking" className="phone-text">Book Online – 24x7</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </WebAppWrapper>
  );
};

export default CustomerSupportPage;
