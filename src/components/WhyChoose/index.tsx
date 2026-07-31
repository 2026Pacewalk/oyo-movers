import { Image } from "@/components";
import React from "react";
import { s3ImageBaseUrl } from "@/config";


const WhyCooseCard = () => {

  const imageBox = (src: string, title: string, subtitle: string, imgClass?: string) => {
    return (
      <div className="col-md-4 mb-3">
        <div className="box-shadow p-4 wow bounce mb-4 bg-light d-flex flex-column align-items-center">
          <Image src={s3ImageBaseUrl+`/${src}`} alt="icon" className={`nextImageIcon ${imgClass}`} />
          <h5 className="text-center mb-2 mt-3 font-weight-bold text-uppercase">{title}</h5>
          <p className="mb-0 text-center">{subtitle}</p>
        </div>
      </div>
    );
  };

  return (
      <section className="why-choose py-5 bg-light">
        <div className="container py-md-3">
          <div className="row">
            <div className="col-md-12">
              <div className="section-heading">
                <h2 className="text-center mb-3 text-uppercase">
                  Why Choose<span className="font-weight-bold "> OYO</span>{" "}
                </h2>
                <div className="divider mb-3"></div>
              </div>
            </div>
          </div>
          <div className="row mt-5 ">
            {imageBox(
              "icon-clear-upfront-old.png",
              "Clear Upfront Prices",
              "Save Upto 20% Compared to traditional Movers. No Surprises!",
              "likedImg"
            )}
            {imageBox(
              "icon-on-time-old.png",
              "Fast, On Time & Same Day",
              "No Back & Forth, You Book & we arrive there, it’s that simple",
              "truckImg"
            )}
            {imageBox(
              "icon-all-trucks-old.png",
              "All Size Trucks",
              "We move anything that fits in our trucks, Day or Night",
              "twoTruck"
            )}
          </div>
        </div>
      </section>
  );
};

export default WhyCooseCard;
