import { Image } from "@/components";
import { s3ImageBaseUrl } from "@/config";
import React from "react";
import HeadingSection from "../Heading";
import './howworks.scss'
const HowItsWork = () => {
  return (
    <>
      {/* <section className="works py-5 ">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
               <HeadingSection buttonLabel="
How it Works"  mainHeading="Fast, Simple & Stress‑Free Moving — Every Time "  subHeading="Move anything in 3 Easy Steps."/>
            </div>
          </div>

          <div className="row justify-content-center align-items-center ">
            <div className="col-md-1"></div>
            <div className="col-md-5 workscard">
              <Image
                src={s3ImageBaseUrl + "/how-it-work-1.jpg"}
                alt="Book Your OYOMOVER"
                className="how-it-works-img mb-2"
              />
              <h4 className="text-center  mb-1">1. Book Your Job</h4>
              <p className="text-center px-5">
                Tell Us Your Pickup & Dropoff location, Choose your time, Vehicle & Service Type.
              </p>
            </div>
            <div className="col-md-5 road-map ">
              <Image src={s3ImageBaseUrl + "/road-1.png"} alt="road" className="road-map-img" />
            </div>
            <div className="col-md-1"></div>
          </div>
          <div className="row justify-content-center">
            <div className="col-md-1"></div>

            <div className="col-md-5"></div>
            <div className="col-md-5 workscard">
              <Image
                src={s3ImageBaseUrl + "/how-it-work-2.png"}
                alt="Don’t Lift a Finger"
                className="how-it-works-img  mb-2"
              />
              <h4 className="text-center mb-1">{"2. Don't Lift a Finger"}</h4>
              <p className="text-center px-4">
              OYO Pros Will arrive, They will Load, Secure, Transport & Unload your stuff At Drop-Off Address.
              </p>
            </div>
            <div className="col-md-1"></div>
          </div>
          <div className="row justify-content-center  ">
            <div className="col-md-1"></div>

            <div className="col-md-5  content-map workscard">
              <Image
                src={s3ImageBaseUrl + "/how-it-work-3.jpg"}
                alt="Pay, Rate & Relax"
                className="how-it-works-img mb-2"
              />
              <h4 className="text-center mb-1">3. Pay, Rate & Relax</h4>
              <p className="text-center px-4">
                Pay And Review Your Experience With Option To Tip Your Movers. We’ll See You Next Time.
              </p>
            </div>
            <div className="col-md-5  road-map ">
              <Image src={s3ImageBaseUrl + "/road-2.png"} alt="road" className="road-map-img" />
            </div>
            <div className="col-md-1"></div>
          </div>
        </div>
      </section> */}

      <section className="works py-5">
        <div className="container">
          {/* How It Works Button */}
          {/* <div className="row justify-content-center mb-4">
            <div className="col-auto">
              <button className="works-how-it-works-btn">
                <span className="works-star-icon">⭐</span>
                How It Works
              </button>
            </div>
          </div> */}

          {/* Main Heading Section */}
          <div className="row justify-content-center text-center">
            <div className="col-lg-8">
              <h1 className="works-main-headline">
              How it Works
              </h1>
              <div className="divider"></div>
              <p className="works-main-tagline">
              Simple Steps to Get Lightning-Fast Moving Help
              </p>
            </div>
          </div>

          {/* Three Steps Section */}
          <div className="row justify-content-center">
            <div className="col">
              <div className="works-steps-container">
                {/* Step 1 */}
                <div className="works-step-item">
                  <div className="works-step-illustration">
                    <img
                      src="/images/HowitWorks-1.png"
                      alt="Book Your Job"
                      className="works-step-image"
                    />
                  </div>
                  <h3 className="works-step-title">1. Book Your Job</h3>
                  <p className="works-step-description">
                    Tell Us Your Pickup & Dropoff location, Choose your time, Vehicle & Service Type.
                  </p>
                </div>

                {/* Step 2 */}
                <div className="works-step-item">
                  <div className="works-step-illustration">
                    <img
                      src="/images/HowitWorks-2.png"
                      alt="Don't Lift a Finger"
                      className="works-step-image"
                    />
                  </div>
                  <h3 className="works-step-title">2. Don&apos;t Lift a finger</h3>
                  <p className="works-step-description">
                    OYO Pros Will arrive, They will Load, Secure, Transport & Unload your stuff At Drop-Off Address.
                  </p>
                </div>

                {/* Step 3 */}
                <div className="works-step-item">
                  <div className="works-step-illustration">
                    <img
                      src="/images/HowitWorks-3.png"
                      alt="Pay, Rate & Relax"
                      className="works-step-image"
                      // style={{ marginBottom: '25px' }}               
                    />
                  </div>
                  <h3 className="works-step-title">3. Pay, Rate & Relax</h3>
                  <p className="works-step-description">
                    Pay and Review Your Experience With Option To Tip Your Movers. We&apos;ll See You Next Time.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>


    </>
  );
};

export default HowItsWork;
