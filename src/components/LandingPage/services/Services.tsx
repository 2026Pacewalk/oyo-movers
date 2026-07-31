import React, { useState, useEffect } from "react";
import "./services.scss";
import { Image } from "@/components";
import AppInitializer from "@/components/JobBooking/JobInitializer";
import Locations from "./Location";
import { s3ImageBaseUrl } from "@/config";

const FlippingText = ({ texts }: { texts: string[] }) => {
  const [index, setIndex] = useState(0);
  const [fade, setFade] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setFade(false);
      setTimeout(() => {
        setIndex((prev) => (prev + 1) % texts.length);
        setFade(true);
      }, 500); // fade out duration
    }, 3500); // total duration including fade
    return () => clearInterval(interval);
  }, [texts.length]);

  return (
    <span className={`flipping-text ${fade ? "fade-in" : "fade-out"}`}>
      {texts[index]}
    </span>
  );
};

const Services = () => {
  const flippingTexts = [
    "Moving Houses Need Movers",
    "Last Min Move X-press Service",
    "Few Items Need Muscles",
    "Got Junk Need Junk Movers",
  ];

  return (
    <div className="services-section">
      <div className="services-container">
        <section className="services-banner">
          <div className="banner-content-wrapper d-flex justify-content-center align-items-center position-relative">
            {/* Left Mover */}
            <div className="left-mover">
              <img src="/images/ServiceImg-1.png" alt="OYO Mover Left" />
            </div>

            {/* Center Content */}
            <div className="center-content text-center">
              <div className="main-headline-wrapper">
                <h1 className="main-headline">
                  Melbourne&apos;s 30 min.</h1>
                <h1 className="main-headline">House Moving App</h1>
              </div>
              <h2 className="sub-headline">
                On-Demand Moving Services-exactly when you need it
              </h2>

              {/* App Download Buttons */}
              <div className="app-download-buttons d-flex justify-content-center gap-3 mt-4">
                <a href="#" className="app-store-btn">
                  <img src="/images/GooglePlay.png" alt="GET IT ON Google Play" />
                </a>
                <a href="#" className="app-store-btn">
                  <img src="/images/AppleStore.png" alt="Download on the App Store" />
                </a>
              </div>

              <p className="cta-text">
                Ready to book? Download the app <br /> or call us <span className="text-black fw-bold">1300-oyomovers</span>
              </p>
            </div>

            {/* Right Mover */}
            <div className="right-mover">
              <img src="/images/ServiceImg-2.png" alt="OYO Mover Right" />
            </div>
          </div>

          {/* Commented Out - Original Services Points and Phone Images */}
          {/* <ul className="services-points list-unstyled d-flex justify-content-center  mt-2">
              <li><img src="https://oyo-cdn.s3.ap-southeast-2.amazonaws.com/icon-check.png"/>No Min Hours, Pay As You Go</li>
              <li><img src="https://oyo-cdn.s3.ap-southeast-2.amazonaws.com/icon-check.png"/>Same Day X-PRESS Service</li>
              <li><img src="https://oyo-cdn.s3.ap-southeast-2.amazonaws.com/icon-check.png"/>Whole Home, Few Rooms, Few Items or Something Else</li>
            </ul>
            <div className="phones-images d-flex justify-content-center gap-3 mt-4">
              <img src="/phoneimg.png" alt="Phone 2" />
            </div> */}

          {/* Commented Out - Original Flipping Text */}
          {/* <h3 className="sub-heading">
              <FlippingText texts={flippingTexts} />
              <br />
              On-demand Moving
            </h3> */}

        </section>
      </div>
      <div className="locationMainlanding-wrap">
        <div className="query-form-shake locationMainlanding animate__animated animate__tada animate__delay-2s">
          <AppInitializer>
            <Locations />
          </AppInitializer>
        </div>
      </div>
      <div className="banner-form-spec mt-3">
        <ul className="list-inline mb-0 text-center d-flex justify-content-center">
          <li className="list-inline-item d-flex align-items-center gap-2 ">
            <Image src={s3ImageBaseUrl + "/icon-no-booking.png"} alt="icon" />
            <p className="font-weight-normal">No Hidden Fees</p>
          </li>
          <li className="list-inline-item d-flex align-items-center gap-2">
            <Image src={s3ImageBaseUrl + "/icon-5-rating.png"} alt="icon" />
            <p className="font-weight-normal">5.0 Rating</p>
          </li>
          <li className="list-inline-item d-flex align-items-center gap-2">
            <Image src={s3ImageBaseUrl + "/icon-in-mins.png"} alt="icon" />
            <p className="font-weight-normal">Bookings In Mins</p>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Services;
