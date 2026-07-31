import React from "react";
import WebAppWrapper from "../WebAppWrapper";
import Image from "../Image";
import "./movingWrapper.scss";
import ReviewService from "../LandingPage/Testimonial";
import { s3ImageBaseUrl } from "@/config";

const MovingServiceWrapper = ({ children, service }: any) => {
  const bookOyoFor = (title: string, description: string, img: string) => {
    return (
      <div className="col-md-4 bookOyoBox">
        <div className="pricing-btn active-p-btn">
          <a href="/">
            <span className="pricing-icon">
              <Image src={s3ImageBaseUrl+`/${img}`} alt="img" />
            </span>{" "}
            <h5 className="d-block my-head text-dark"> {title} </h5>
            <span className="lable-btn d-block">{description}</span>{" "}
          </a>
        </div>
      </div>
    );
  };

  const howItsWorkImageBox = (title: string, description: string, img: string) => {
    return (
      <div className="col-md-4 howItsWorkBox">
        <Image src={s3ImageBaseUrl+`/${img}`} alt="Book Your OYOMOVER" className="img-fluid mb-3" />
        <h4 className="text-center">{title}</h4>
        <p className="text-center px-5">{description}</p>
      </div>
    );
  };

  const getClass: any = {
    apartmentMoves: "breadcrumb-area-0",
    storeDelivery: "breadcrumb-area-1",
    movingFewItems: "breadcrumb-area-2",
    officeRelocation: "breadcrumb-area-6",
    donationRun: "breadcrumb-area-4",
    storageRemoval: "breadcrumb-area-7",
    junkRemoval: "breadcrumb-area-8",
  };

  const serviceDetails: any = {
    houseMoving: {
      title: "Stress-free House Moving",
      decscription: `Oyo is the best and perfect solution for getting help with moving places. Small Apartment to a Big 4-bedroom house. We Move Everything.`,
      link: "",
      avgTitle: "2 Bedroom House moving",
      avgCost: "$672- $840",
      avgDescription: "House Moving",
    },
    storeDelivery: {
      title: "Same Day Store Delivery.",
      decscription: `Need help to pick-up and deliver your purchases from your favourite furniture, appliance, or homeware store . Oyo is faster, convenient, and cheaper delivery service.`,
      link: "",
      avgTitle: "Store Delivery ",
      avgCost: "$76- $130",
      avgDescription: "Store Delivery",
    },
    movingFewItems: {
      title: "Same Day, Small Removals",
      decscription: `Want to move a Couch, Fridge, Desk or Marketplace Purchase? Oyo is the fast, cheaper, and best solution! In few simple steps book one or two Movers with truck.`,
      link: "",
      avgTitle: "Small Moving jobs ",
      avgCost: "$76- $130",
      avgDescription: "Small Moves",
    },
    officeRelocation: {
      title: "Office Moving in few clicks",
      decscription: `Choose a day or night that doesn’t disrupt your business. We do everything for you including packing, dismantling, re-assembling, moving etc.`,
      link: "",
      avgTitle: "Sml. Office Relocation",
      avgCost: "$336- $504",
      avgDescription: "Office Moving",
    },
    donationRun: {
      title: "Donation Run is easier Now!",
      decscription: `OYO connects you with movers and trucks for donating used furniture, appliances and other items to Op-Shops and Salvation Army.`,
      link: "",
      avgTitle: "Donation Run",
      avgCost: "$76- $130",
      avgDescription: "Donation Run",
    },
    storageRemoval: {
      title: "Storage Moving in few clicks.",
      decscription: `In just few simple steps book 2 movers and a truck to move your items and furniture into or out of a storage facility.`,
      link: "",
      avgTitle: "Storage Removal",
      avgCost: "$216- $336",
      avgDescription: "Storage Delivery",
    },
    junkRemoval: {
      title: "Got Junk,",
      title2: "Need Junk Movers Quickly?",
      decscription: `Oyo connects you with movers and trucks to remove and haul away your junk to nearest recycling facility. It is faster, convenient, and cheaper than traditional junk removal companies.`,
      link: "",
      avgTitle: "JUNK Removal",
      avgCost: "$200-$300",
      avgDescription: "Avg. JUNK Removal",
    },
    apartmentMoves: {
      title: "Apartment Moves are much easier",
      decscription: `Moving Studio, 1 BR or 2 Bedroom apartment? In just few simple steps book 2 movers and a truck to move your items and furniture into your new place.`,
      link: "",
      avgTitle: "Studio Apt. moving ",
      avgCost: "$252- $336",
      avgDescription: "Apartment Moving",
    },
  };
  const howItsWork = () => (
    <section className="works py-5">
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <div className="section-heading">
              <h2 className="text-center mb-3 uppercase h1">How it Works</h2>
              <div className="divider mb-3"></div>
              <p className="text-center mb-5">Clear you unwanted stuff in 3 Simple Steps.</p>
            </div>
          </div>
        </div>
        <div className="row">
          {howItsWorkImageBox(
            "1. Book Your Job",
            "Tell Us Your Pickup & Dropoff location, Choose your time, Vehicle & Service Type.",
            "how-it-work-1.jpg"
          )}
          {howItsWorkImageBox(
            "2. Don't Lift a Finger",
            "OYO Pros Will arrive, They will Load, Secure, Transport & Unload your stuff At Drop-Off Address.",
            "how-it-work-2.png"
          )}
          {howItsWorkImageBox(
            "3. Pay, Rate & Relax",
            "Pay And Review Your Experience With Option To Tip Your Movers. We’ll See You Next Time.",
            "how-it-work-3.jpg"
          )}
        </div>
      </div>
    </section>
  );
  const bookOyoForSection = () => (
    <section className="pt-5  pricing-feature">
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <div className="section-heading">
              <h2 className="text-center text-theme-2 mb-3 ">Book OYO For:-</h2>
              <div className="divider mb-5"></div>
            </div>
          </div>
          <div className="col-md-1"></div>
          <div className="col-md-10">
            <div className="row ">
              {/*  */}
              {bookOyoFor("House Moving", " Studio, 1 BR, 2 BR or whole house", "house-moving.png")}
              {bookOyoFor("Store Delivery", "Get your purchase home", "store-delivery.png")}
              {bookOyoFor("Moving Few Items", "Couch, fridge, Desk etc.", "move-a-few-items.png")}
              {bookOyoFor("Office Relocation", "Small workplace or Large Office", "office-relocation-icon.png")}
              {bookOyoFor("Donation Run", "Donate used items", "donation-run.png")}
              {bookOyoFor("Storage Removals", "Storing to & from", "storage-removals.png")}

              {bookOyoFor("Junk Removal", "Discard unwanted items easily", "junk-removal.png")}

              {bookOyoFor("Apartment Move", "Studio, 1BR or 2 BR", "apartment-moves.png")}
              {bookOyoFor("Helping Hands", "Muscles (💪)only, No Truck", "helping-hands.png")}
            </div>
          </div>
          <div className="col-md-1"></div>
        </div>
      </div>
    </section>
  );
  const someStoresWePickupFrom = () => (
    <section className="store pt-5">
      <div className="container">
        <div className="row align-items-center justify-content-center">
          <div className="col-md-12">
            <div className="section-heading">
              <h2 className="text-center mb-3 h1">
                {service === "storageRemoval"
                  ? "Some of our Favourite Storage facilities"
                  : "SOME STORES WE PICKUP FROM..."}
              </h2>
              <div className="divider mb-5"></div>
            </div>
          </div>
          <div className="col-md-9 text-md-left  text-center">
            <div className="row align-items-center justify-content-center">
              <div className="col-md-4 my-auto">
                <ul className="list-inline">
                  <li className="d-flex gap-3 storesPickUpImage">
                    <Image src={s3ImageBaseUrl +"/salvation-army.png"} className="pr-2 w-25"  alt="img"/> Salvation Army
                  </li>
                  <li className="d-flex gap-3 storesPickUpImage">
                    <Image src={s3ImageBaseUrl +"/red-cross.png"} className="pr-2 w-25" alt="img" /> Red Cross Shop
                  </li>
                </ul>
              </div>
              <div className="col-md-4 my-auto">
                <ul className="list-inline">
                  <li className="d-flex gap-3 storesPickUpImage">
                    <Image src={s3ImageBaseUrl +"/brotherhood-of-st-laurance.png"} className="pr-2 w-25" alt="img" /> Brotherhood of St
                    Laurance
                  </li>
                  <li className="d-flex gap-3 storesPickUpImage">
                    <Image src={s3ImageBaseUrl +"/sacred-heart-mission.png"} className="pr-2 w-25" alt="img" /> Sacred Heart Mission Op Shop
                  </li>
                </ul>
              </div>
              <div className="col-md-4 my-auto">
                <ul className="list-inline">
                  <li className="d-flex gap-3 storesPickUpImage">
                    <Image src={s3ImageBaseUrl +"/vinnies.png"} className="pr-2 w-25" alt="img"/> Vinnies
                  </li>
                  <li className="d-flex gap-3 storesPickUpImage">
                    <Image src={s3ImageBaseUrl +"/st-james-op-shop-drysdale.png"} className="pr-2 w-25" alt="img" /> St James Op Shop
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
  return (
    <WebAppWrapper>
      <div className={`breadcrumb-area ${getClass[service]}`}>
        <div className="container">
          <div className="row align-items-center">
            <div className="col-md-8">
              <div className="bg-white rounded-4 p-5">
                <h3 className="txt-blue">
                  {" "}
                  {serviceDetails[service].title}
                  {service === "junkRemoval" ? (
                    <>
                      <br />
                      {serviceDetails[service].title2}
                    </>
                  ) : (
                    ""
                  )}
                </h3>
                <p>{serviceDetails[service].decscription}</p>
                <a className=" btn btn-theme-2 mt-3" href="/booking">
                  Book OYO
                </a>
              </div>
            </div>
            <div className="col-md-7"></div>
          </div>
        </div>
      </div>
      <section className=" py-5 text-center ">
        <div className="container pb-5">
          <div className="row align-items-center justify-content-center">
            <div className="col-md-4 ">
              <div className="service-box imageBox">
                <Image src={s3ImageBaseUrl +"/on-time-on-demand.png"} className="mb-2" alt="img" />
                <h4>
                  On-Time
                  <br /> On-Demand
                </h4>
                <p>
                  No waiting, You set the time,
                  <br /> and we’re there. It’s that simple
                </p>
              </div>
            </div>
            <div className="col-md-4">
              <div className="service-box imageBox">
                <Image src={s3ImageBaseUrl+"/clear-upfront-prices.png"} className="clearUpfrontImg" alt="img"/>
                <h4>
                  Clear Upfront <br />
                  Prices
                </h4>
                <p>
                  Save Upto 20% Compared to <br />
                  traditional Movers. <span className="text-black">No surprises! </span>
                </p>
              </div>
            </div>
            <div className="col-md-4">
              <div className="service-box imageBox">
                <Image src={s3ImageBaseUrl+"/safe.png"} className="mb-2 fullyTrainedImg" alt="img"/>
                <h4>
                  Safe & <br />
                  Fully Trained
                </h4>
                <p>
                  Vetted, background checked &<br /> insured movers ready to go
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
      <div className="container top-0">
        <div className="row">
          <div className="col-md-2"></div>
          <div className="col-md-8 text-center">
            <div className="alert alert-primary text-center mt-2 py-3 mb-2">
              <span className="h4">
                {`Our average ${serviceDetails[service].avgTitle} cost is `}
                {service === "houseMoving" && <br className="d-none d-md-block " />}
                between-
                <a href="/prices" className="text-black underline mt-2 ">
                  {" "}
                  {serviceDetails[service].avgCost}
                </a>
                <br />
              </span>
            </div>
            {/* <div className="d-flex justify-content-center align-items-center">
              <Image src="/webapp/click.png" className="Image-fluid webClick" alt="img"/>
              <a href="/" className="text-primary underline ">
                Check here for <strong>Avg. {serviceDetails[service].avgDescription} Cost</strong>
              </a>
            </div> */}
          </div>
          <div className="col-md-2"></div>
        </div>
      </div>
      <ReviewService />
      {(service === "donationRun" || service === "storageRemoval") && someStoresWePickupFrom()}
      {service === "storeDelivery" && (
        <section className="store py-5">
          <div className="container">
            <div className="row align-items-center justify-content-center">
              <div className="col-md-12">
                <div className="section-heading">
                  <h2 className="text-center mb-3 h1">SOME STORES WE PICKUP FROM...</h2>
                  <div className="divider mb-5"></div>
                </div>
              </div>
              <div className="col-md-9 text-md-left  text-center">
                <div className="row align-items-center justify-content-center">
                  <div className="col-md-4 my-auto">
                    <ul className="list-inline">
                      <li className="d-flex gap-3 storesPickUpImage">
                        <Image src={s3ImageBaseUrl+"/bunnings-warehouse-logo.png"} className="pr-2 w-25" alt="img" /> Bunnings Warehouse
                      </li>
                      <li className="d-flex gap-3 storesPickUpImage">
                        <Image src={s3ImageBaseUrl+"/fantastic-furniture-logo.png"} className="pr-2 w-25" alt="img" /> Fantastic Furniture
                      </li>
                      <li className="d-flex gap-3 storesPickUpImage">
                        <Image src={s3ImageBaseUrl+"/barbequesgalore.png"} className="pr-2 w-25" alt="img"/> BBQ Galore
                      </li>
                      <li className="d-flex gap-3 storesPickUpImage">
                        <Image src={s3ImageBaseUrl+"/chiropedic.png"} className="pr-2 w-25" alt="img" /> Chiropedic Family Mattress
                      </li>
                      <li className="d-flex gap-3 storesPickUpImage">
                        <Image src={s3ImageBaseUrl+"/freedom.png"} className="pr-2 w-25"  alt="img"/> Freedom Furniture
                      </li>
                      <li className="d-flex gap-3 storesPickUpImage">
                        <Image src={s3ImageBaseUrl+"/adriatic.png"} className="pr-2 w-25" alt="img" /> Adriatic Furniture
                      </li>
                      <li className="d-flex gap-3 storesPickUpImage">
                        <Image src={s3ImageBaseUrl+"/thegoodguys.png"} className="pr-2 w-25" alt="img" /> Good Guys
                      </li>
                      <li className="d-flex gap-3 storesPickUpImage">
                        <Image src={s3ImageBaseUrl+"/designer-timber-furniture.png"} className="pr-2 w-25" alt="img" /> Designer Timber
                        Furniture
                      </li>
                      <li className="d-flex gap-3 storesPickUpImage">
                        <Image src={s3ImageBaseUrl+"/velvet-luxury-furniture.png"} className="pr-2 w-25" alt="img" /> Velvet luxury
                        Furniture
                      </li>
                      <li className="d-flex gap-3 storesPickUpImage" >
                        <Image src={s3ImageBaseUrl+"/cocolea.png"} className="pr-2 w-25" alt="img" /> Cocolea
                      </li>
                      <li className="d-flex gap-3 storesPickUpImage">
                        <Image src={s3ImageBaseUrl+"/domayne.png"} className="pr-2 w-25" alt="img" /> Domayne
                      </li>
                      <li className="d-flex gap-3 storesPickUpImage">
                        <Image src={s3ImageBaseUrl+"/bing-lee.png"} className="pr-2 w-25" alt="img" /> Bing Lee
                      </li>
                      <li className="d-flex gap-3 storesPickUpImage">
                        <Image src={s3ImageBaseUrl+"/mitre-10.png"} className="pr-2 w-25" alt="img" /> Mitre 10
                      </li>
                    </ul>
                  </div>
                  <div className="col-md-4 my-auto">
                    <ul className="list-inline">
                      <li className="d-flex gap-3 storesPickUpImage">
                        <Image src={s3ImageBaseUrl+"/ikea.png"} className="pr-2 w-25" alt="img"/> IKEA
                      </li>
                      <li className="d-flex gap-3 storesPickUpImage">
                        <Image src={s3ImageBaseUrl+"/harvey-norman.png"} className="pr-2 w-25" alt="img" /> Harvey Norman
                      </li>
                      <li className="d-flex gap-3 storesPickUpImage"> 
                        <Image src={s3ImageBaseUrl+"/furnituretrader.png"} className="pr-2 w-25" alt="img" /> Furniture Traders
                      </li>
                      <li className="d-flex gap-3 storesPickUpImage">
                        <Image src={s3ImageBaseUrl+"/bad-backs.png"} className="pr-2 w-25" alt="img" /> Bad Backs
                      </li>
                      <li className="d-flex gap-3 storesPickUpImage">
                        <Image src={s3ImageBaseUrl+"/nick-scali.png"} className="pr-2 w-25" alt="img" /> Nick Scali
                      </li>
                      <li className="d-flex gap-3 storesPickUpImage">
                        <Image src={s3ImageBaseUrl+"/bnd.png"} className="pr-2 w-25" alt="img" /> Beds n Dreams
                      </li>
                      <li className="d-flex gap-3 storesPickUpImage">
                        <Image src={s3ImageBaseUrl+"/misura.png"} className="pr-2 w-25" alt="img" /> Misura
                      </li>
                      <li className="d-flex gap-3 storesPickUpImage">
                        <Image src={s3ImageBaseUrl+"/sleeping-duck.png"} className="pr-2 w-25" alt="img" /> Sleeping Duck
                      </li>
                      <li className="d-flex gap-3 storesPickUpImage">
                        <Image src={s3ImageBaseUrl+"/zuster.png"} className="pr-2 w-25" alt="img" /> Zuster
                      </li>
                      <li className="d-flex gap-3 storesPickUpImage">
                        <Image src={s3ImageBaseUrl+"/vl.png"} className="pr-2 w-25" alt="img" /> Vintage Luxury
                      </li>
                      <li className="d-flex gap-3 storesPickUpImage">
                        <Image src={s3ImageBaseUrl+"/jb-hi-fi.png"} className="pr-2 w-25" alt="img" /> JB Hi-fi
                      </li>
                      <li className="d-flex gap-3 storesPickUpImage">
                        <Image src={s3ImageBaseUrl+"/retravision.png"} className="pr-2 w-25" alt="img" /> Retravision
                      </li>
                      <li className="d-flex gap-3 storesPickUpImage">
                        <Image src={s3ImageBaseUrl+"/vista-living.png"} className="pr-2 w-25" alt="img"/> Vista Living
                      </li>
                    </ul>
                  </div>
                  <div className="col-md-4 my-auto">
                    <ul className="list-inline">
                      <li className="d-flex gap-3 storesPickUpImage">
                        <Image src={s3ImageBaseUrl+"/costco.png"} className="pr-2 w-25"  alt="img"/> Costco
                      </li>
                      <li className="d-flex gap-3 storesPickUpImage">
                        <Image src={s3ImageBaseUrl+"/amart.png"} className="pr-2 w-25" alt="img" /> A-mart
                      </li >
                      <li className="d-flex gap-3 storesPickUpImage">
                        <Image src={s3ImageBaseUrl+"/koala.png"} className="pr-2 w-25" alt="img" /> Koala
                      </li>
                      <li className="d-flex gap-3 storesPickUpImage">
                        <Image src={s3ImageBaseUrl+"/focusonfurniture.png"} className="pr-2 w-25"  alt="img"/> Focus on furniture
                      </li>
                      <li className="d-flex gap-3 storesPickUpImage">
                        <Image src={s3ImageBaseUrl+"/king-living.png"} className="pr-2 w-25"  alt="img"/> King Living
                      </li>
                      <li className="d-flex gap-3 storesPickUpImage">
                        <Image src={s3ImageBaseUrl+"/lemontreeonline.png"} className="pr-2 w-25"  alt="img"/> Lemon Tree Furniture
                      </li>
                      <li className="d-flex gap-3 storesPickUpImage">
                        <Image src={s3ImageBaseUrl+"/fanuli.png"} className="pr-2 w-25"  alt="img"/> Fanuli Furniture
                      </li>
                      <li className="d-flex gap-3 storesPickUpImage">
                        <Image src={s3ImageBaseUrl+"/delujo.png"} className="pr-2 w-25" alt="img" /> Delujo Furniture
                      </li >
                      <li className="d-flex gap-3 storesPickUpImage">
                        <Image src={s3ImageBaseUrl+"/modernfurniture.png"} className="pr-2 w-25" alt="img" /> Modern Furniture
                      </li>
                      <li className="d-flex gap-3 storesPickUpImage">
                        <Image src={s3ImageBaseUrl+"/boconcept.png"} className="pr-2 w-25" alt="img" /> BoConcept Furniture
                      </li>
                      <li className="d-flex gap-3 storesPickUpImage">
                        <Image src={s3ImageBaseUrl+"/winning-appliances.png"} className="pr-2 w-25" alt="img" /> Winning Appliances
                      </li>
                      <li className="d-flex gap-3 storesPickUpImage">
                        <Image src={s3ImageBaseUrl+"/e-and-s.png"} className="pr-2 w-25" alt="img" /> e & s
                      </li>
                      <li className="d-flex gap-3 storesPickUpImage">
                        <Image src={s3ImageBaseUrl+"/next-living.png"} className="pr-2 w-25" alt="img" /> Next Living
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}
      {howItsWork()}
      {bookOyoForSection()}

      {children}
    </WebAppWrapper>
  );
};

export default MovingServiceWrapper;
