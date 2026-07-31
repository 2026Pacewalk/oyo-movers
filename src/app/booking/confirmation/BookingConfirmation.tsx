"use client";

import { useEffect } from "react";
import { Container } from "react-bootstrap";
import { Image } from "@/components";
import { useJobBooking } from "@/components/JobBooking/JobBookingHook";
import { useUserData } from "@/components/User/UserDataHook";
import { BsChatDots } from "react-icons/bs";
import { Icon } from "@iconify/react";
import "./confirmation.scss";
import Footer from "@/components/WebAppWrapper/Footer";

const BookingConfirmation = () => {
  const { resetStep, resetJobBooking, resetLabour, setReBooking, setMoverData } = useJobBooking();
  const { user } = useUserData();

  useEffect(() => {
    // Reset booking data when confirmation page loads
    try {
      resetStep();
      resetJobBooking();
      resetLabour();
      setReBooking({});
      setMoverData("");
    } catch (error) {
      console.error("Error resetting booking data:", error);
    }
  }, [resetStep, resetJobBooking, resetLabour, setReBooking, setMoverData]);

  const userName = user?.name?.split(' ')[0] || '';

  return (
    <>
    <Container className="booking-confirmation-container">
      <div className="confirmation-card">
        <div className="success-icon-wrapper">
          <Image
            src="/images/confirmtion.png"
            alt="Success"
            className="success-icon-image"
          />
        </div>
        
        <h1 className="congratulations-title">
          Congratulations {userName}!
        </h1>
        
        <p className="booking-confirmed-text">
          Your booking is confirmed in our system
        </p>
        
        <p className="email-instruction">
          Please check your email inbox / junk folder for confirmation email.
        </p>

        <div className="next-steps-section">
          <h2 className="next-steps-title">The Next steps are : -</h2>
          <ol className="next-steps-list">
            <li>We are engaging movers for your job.</li>
            <li>Once confirmed by mover we will share mover details with you.</li>
            <li>Movers will contact you 30 mins before arrival.</li>
          </ol>
        </div>

        <div className="contact-section">
          <div className="contact-header">
            <Icon icon="streamline:customer-support-1" className="headphone-icon" />
            <span className="contact-title">Question to ask?</span>
          </div>
          <div className="contact-options">
            <div className="contact-options-item">
              <a href="tel:1300 01 31 31" className="contact-card">
                <Icon icon="ic:baseline-call" className="contact-icon" />
                <div className="contact-details">
                  <span className="contact-label"><span style={{color: '#A8A8A8'}}>Call</span> 1300 01 31 31</span>
                </div>
              </a> 
              <span className="contact-hours">MON - SAT  8AM - 5PM</span>
            </div>
            <span className="contact-divider">or</span>
            <div className="contact-options-item">
              <a href="sms:0467222212" className="contact-card">
                <BsChatDots className="contact-icon" />
                <div className="contact-details">
                  <span className="contact-label"><span style={{color: '#A8A8A8'}}>Sms</span> 0467 222 212</span>  
                </div>
              </a>
              <span className="contact-hours">7 Days - Till Late</span>
            </div>
          </div>
        </div>
        
      </div>
    </Container>

  <Footer />
  </>
  );
};

export default BookingConfirmation;
