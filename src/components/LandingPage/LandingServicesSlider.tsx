"use client";
import React, { useState, useEffect } from "react";
import { Card } from "react-bootstrap";
import Slider from "../slider";
import HeadingSection from "./Heading";

const LandingServicesSlider = () => {
  const [slidesToShow, setSlidesToShow] = useState(4);

  const updateSlidesToShow = () => {
    const width = window.innerWidth;
    if (width <= 480) {
      setSlidesToShow(1);
    } else if (width <= 768) {
      setSlidesToShow(2);
    } else if (width <= 1024) {
      setSlidesToShow(3);
    } else {
      setSlidesToShow(4);
      
    }
  };

  useEffect(() => {
    updateSlidesToShow();
    window.addEventListener("resize", updateSlidesToShow);
    return () => window.removeEventListener("resize", updateSlidesToShow);
  }, []);

  const serviceCards = [
    {
      id: 1,
      title: "House Moving",
      description: "Small Appartment to a Big 4 bedroom house. We Move Everyting.",
      image: "/oyoimage1.png",
      backgroundImage: "/unnamed--1--1-2.png",
    },
    {
      id: 2,
      title: "Store Delivery",
      description: "Want to move a Couch, Fridge, Desk or Marketplace Purchase",
      image: "/oyoimage2.png",
      backgroundImage: "/unnamed--1--1-2.png",
      overlayImage: "/unnamed--2--1.png",
    },
    {
      id: 3,
      title: "Few Items",
      description: "Few items or too large to mail or pickup. We will get it there for you",
      image: "/oyoimage4.png",
      backgroundImage: "/unnamed--1--1-2.png",
    },
    {
      id: 4,
      title: "Office Moving",
      description: "Choose a day or night that doesn’t disrupt your business.",
      image: "/oyoimage3.png",
      backgroundImage: "/unnamed--1--1-2.png",
    },
    {
      id: 5,
      title: "Junk Removal",
      description: "Donate your unwanted items to local charities",
      image: "/oyoimage8.png",
      backgroundImage: "/unnamed--1--1-2.png",
    },
    {
      id: 6,
      title: "Storage",
      description: "Moving your furniture into or out of a storage facility.",
      image: "/oyoimage5.png",
      backgroundImage: "/unnamed--1--1-2.png",
    },
    {
      id: 7,
      title: "Packing",
      description: "For Packing / Unpacking to Dis-mantling or Reassembling of furniture. Oyo Helpers will help you to ease your moving process.",
      image: "/oyoimage9.png",
      backgroundImage: "/unnamed--1--1-2.png",
    },
    {
      id: 8,
      title: "Apartment Move",
      description: "For Packing / Unpacking to Dis-mantling or Reassembling of furniture. Oyo Helpers will help you to ease your moving process.",
      image: "/oyoimage6.png",
      backgroundImage: "/unnamed--1--1-2.png",
    },
    {
      id: 9,
      title: "Donation",
      description: "For Packing / Unpacking to Dis-mantling or Reassembling of furniture. Oyo Helpers will help you to ease your moving process.",
      image: "/oyoimage7.png",
      backgroundImage: "/unnamed--1--1-2.png",
    },
  ];

  return (
      <section id="services-section" style={{ paddingBottom: '40px' }}>
      <div className="container-fluid service-section">
        <HeadingSection
          buttonLabel="Our Services"
          mainHeading="Our Services"
          subHeading="From few items to Whole House, OYO Moves it all!"
        />
        <Slider
          slidesToShow={slidesToShow}
          slidesToScroll={1}
          autoplay={true}
          autoplaySpeed={5000}
          showDots={false}
          showArrows={false}
          infinite={false}
          className="w-100"
        marquee={true}
          responsive={[
            {
              breakpoint: 1800,
              settings: {
                slidesToShow: 4,
                slidesToScroll: 1,
              },
            },  
            {
              breakpoint: 1450,
              settings: {
                slidesToShow: 3,
                slidesToScroll: 1,
              },
            },
            {
              breakpoint: 1024,
              settings: {
                slidesToShow: 2,
                slidesToScroll: 1,
              },
            },
            {
              breakpoint: 768,
              settings: {
                slidesToShow: 2,
                slidesToScroll: 1,
              },
            },
            {
              breakpoint: 480,
              settings: {
                slidesToShow: 1,
                slidesToScroll: 2,
              },
            },
          ]}
        >
          {serviceCards.map((card) => (
            <div key={card.id} className="d-flex flex-column h-100 p-1">
              <Card className="rounded-3 overflow-hidden border-0 ">
                <div className="p-0 position-relative servicecards" >
                  {/* Background image */}
                  {/* <img
                    className="position-absolute w-100 h-100 object-fit-cover transition-transform duration-300 group-hover:scale-105"
                    alt={card.title}
                    src={card.backgroundImage}
                  /> */}

                  {/* Overlay image if exists */}
                  {/* {card.overlayImage && (
                    <img
                      className="position-absolute w-100 h-100 object-fit-cover transition-transform duration-300 group-hover:scale-105"
                      alt={`${card.title} overlay`}
                      src={card.overlayImage}
                    />
                  )} */}

                  {/* Main image */}
                  <img
                    className="position-absolute w-100 h-100 object-fit-contain transition-transform duration-300 group-hover:scale-105"
                    alt={card.title}
                    src={card.image}
                  />

                  {/* Gradient overlay for better text readability */}
                  <div className="position-absolute inset-0 bg-gradient-to-top opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
              </Card>

              <div className="mt-3 text-center flex-grow-1">
                <h3 className="fw-bold text-dark fs-4 mb-2 landing-slider-title">
                  {card.title}
                </h3>
                {card.description && (
                  <p className="fw-medium text-secondary mx-auto landing-slider-description">
                    {/* {card.description} */}
                  </p>
                )}
              </div>
            </div>
          ))}
        </Slider>
      </div>
    </section>
  );
};

export default LandingServicesSlider;
