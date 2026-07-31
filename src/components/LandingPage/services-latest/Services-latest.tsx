import React, { useState, useEffect } from "react";
import "./services-latest.scss";
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

const ServicesLatest = () => {
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

<div className="banner-content-wrapper">
  <div className="left-content">
  <div className="main-headline-wrapper">

    <span className="pre-headline">Melbourne's</span>
    <h1 className="main-headline">
    Same Day Movers <img src="/images/arrow-icon.png" alt="Stress-Free Moving" className="arrow-icon" />
    </h1>
    <h2 className="sub-headline">
    Stress-Free Moving - Pay As You Go!
    </h2>
                {/* <h1 className="main-headline">
                  GOT JUNK
                </h1>
                <h1 className="main-headline">
                  NEED JUNK MOVERS
                </h1> 
                <h2 className="sub-headline">
                ON-DEMAND MOVING
              </h2> */}
              </div>

              {/* <ul className="services-points">
                <li>
                  <img src="images/tick-2.png" alt="check" />
                  No Minimum Hours, Pay As You Go..!
                </li>
                <li>
                  <img src="images/tick-2.png" alt="check" />
                  Last Min / Same Day X-PRESS Service
                </li>
                <li>
                  <img src="images/tick-2.png" alt="check" />
                  Whole Home, Few Rooms, Few Items or Something Else
                </li>
              </ul> */}
             

              {/* <div className="service-awards">
                <div className="award-badge">
                 <img className="award-img" src="/images/service-22.png" alt="award" />
                </div>
                <div className="award-badge">
                  <img className="award-img" src="/images/service-23.png" alt="award" />
                </div>
                <div className="award-badge">
                  <img className="award-img" src="/images/service-24.png" alt="award" />
                </div>
                <div className="award-badge">
                  <img className="award-img" src="/images/service-25.png" alt="award" />
                </div>
              </div> */}
            </div>

  <div className="right-content">
    <img className="right-img-2" src="/images/ServiceImg-2.png" alt="OYO Mover Right" />
    <img className="right-img" src="/images/ServiceImg-1.png" alt="OYO Mover Left" />
    
  </div>
</div>

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

export default ServicesLatest;
