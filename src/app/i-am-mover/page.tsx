"use client";

import WebAppWrapper from "@/components/WebAppWrapper";
import "./mover.scss";

const MoverSupportPage = () => {
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
      <div className="mover-support-page">
        <div className="main-content">
          <div className="container">
            <div className="content-wrapper">
              <h1 className="main-title">
                Mover Support
                <div className="divider"></div>
              </h1>

              <div className="support-cards">
                <div className="card something-else">
                  <h3>Urgent Job-Related Enquiries</h3>
                  <p>Call Support : <a href="tel:1300 01 31 31" style={{ color: "#000", textDecoration: "none" }}>1300 01 31 31</a></p>
                </div>
                
                <div className="card something-else">
                  <h3>Something Else</h3>
                  <a href="#" onClick={(e) => handleEmailClick(e, "")} className="email-link">E-mail Support →</a>
                </div>
              </div>

              <div className="become-mover-section">
                <span className="become-text">Become A Mover?</span>
                <a href="/become-a-mover" className="apply-link">Apply Here</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </WebAppWrapper>
  );
};

export default MoverSupportPage;    
