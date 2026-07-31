import { Image } from "@/components";
import React from "react";
import "./style.scss";


const CallToAction = () => {
  return (
    <>
      <section className="about-service-section text-center py-5 position-relative">
        
        {/* <div className="phones-images d-flex justify-content-center mb-4">
       
          <img
            src="/callphone.png"
            alt="phone2"
            className="phone-img mx-2"
          />
          <div className="callBg"></div>
          <div className="callBg1"></div>

          
        
        </div> */}
        
        {/* New Design with CalltoAction.png */}
        {/* <div className="cta-image-container">
          <img
            src="/images/CalltoAction.png"
            alt="Oyo Movers App Screens"
            className="cta-main-image"
          />
        </div> */}
        
        <div className="download">
          <h2 className="callheading mb-3">
            Get expert Moving help in minutes.
          </h2>
          <h1 className="download-heading mb-3">
            Download oyomovers!
          </h1>
          <p className="callsub-heading mb-4">
          Thousands already trusted us for stress-free moving.          </p>
          
          {/* App Store Download Buttons */}
          <div className="app-download-buttons d-flex justify-content-center align-items-center gap-3 mb-4">
            <a href="#" className="app-store-btn">
              <img
                src="/images/AppleStore.png"
                alt="Download on the App Store"
                className="download-badge"
              />
            </a>
            <a href="#" className="google-play-btn">
              <img
                src="/images/GooglePlay.png"
                alt="GET IT ON Google Play"
                className="download-badge"
              />
            </a>
          </div>
          
          {/* Phone Contact */}
          {/* <div className="phone-contact d-flex justify-content-center align-items-center">
            <img
              src="/call-us-gif.png"
              alt="phone icon"
              className="phone-icon me-3"
            />
          </div> */}
        </div>
      </section>
    </>
  );
};

export default CallToAction;
