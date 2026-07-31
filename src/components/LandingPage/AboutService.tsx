import { Image } from "@/components";
import React from "react";
import "./services/services.scss";
import { s3ImageBaseUrl } from "@/config";


const AboutService = () => {
  return (
    <>
      <section className="about-service-section text-center py-5 position-relative">
        <div className="phones-images d-flex justify-content-center mb-4">
          <Image
            src="/phone1.png"
            alt="phone1"
            className="phone-img mx-2"
          />
          <Image
            src="/phone2.png"
            alt="phone2"
            className="phone-img mx-2"
          />
          <Image
            src="/phone3.png"
            alt="phone3"
            className="phone-img mx-2"
          />
        </div>
        <h2 className="main-heading mb-3">
          Get expert Moving help in minutes.
        </h2>
        <p className="sub-heading mb-4">
          Thousands already trust us for hassle-free home upkeep.
        </p>
        <div className="phone-contact d-flex justify-content-center align-items-center">
          <img
            src="/call-us-gif.png"
            alt="phone icon"
            className="phone-icon me-3"
          />
          <a href="tel:1300 01 31 31" className="phone-number">1300 01 31 31</a>
        </div>
      </section>
    </>
  );
};

export default AboutService;
