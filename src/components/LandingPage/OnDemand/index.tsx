import { Image } from "@/components";
import { s3ImageBaseUrl } from "@/config";
import React from "react";
import HeadingSection from "../Heading";
import './ondemand.scss'
const OnDemand = () => {
  return (
    <>
  

<section className="works py-5 ">
  <div className="container">
    {/* Hero Section */}
    <div className="row justify-content-center text-center mb-5">
      <div className="col-lg-10">
        <h1 className="hero-headline mb-3">
          On-demand professional Movers available 24x7
        </h1>
        <div className="divider"></div>
        <p className="hero-tagline mt-2">
          No more planning around your moving help.
        </p>
        <p className="hero-tagline">
          Our team of verified moving Professionals are always on time.
        </p>
      </div>
    </div>

    {/* Smartphone Mockups */}
    <div className="row justify-content-center align-items-center">
      <div className="col-lg-10">
        <div className="phone-mockups-container">
          <img
            src="/images/phoneimage3.png"
            alt="OYO Mover App Screens"
            className="phone-mockup-img"
          />
        </div>
      </div>
    </div>
  </div>
</section>

    </>
  );
};

export default OnDemand;
