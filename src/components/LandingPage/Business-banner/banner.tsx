import React from "react";
import "./banner.scss";

const BusinessBanner = () => {
  return (
    <div className="business-banner">
      <div className="business-banner-content">
        <div className="banner-text">
          <p className="top-text">Delivering For Business</p>
          <h1 className="main-headline-b">
            BUSINESS DELIVERIES
            <span className="yellow-underline" />
          </h1>
         
          <p className="sub-text">Offer Your Customers On-Demand Delivery Services</p>
        </div>
        <button className="partner-button">PARTNER WITH US</button>
      </div>
    </div>
  );
};

export default BusinessBanner;
