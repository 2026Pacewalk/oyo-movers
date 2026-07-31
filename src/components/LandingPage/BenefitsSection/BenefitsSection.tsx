import Slider from "@/components/slider";
import React from "react";
import { Card } from "react-bootstrap";


export const BenefitsSection = (): JSX.Element => {
  // Define service cards data for mapping
  const serviceCards = [
    {
      id: 1,
      title: "Store Delivery",
      description: "Moving your furniture into or out of a storage facility",
      image: "/image1.png",
      backgroundImage: "/unnamed--1--1-2.png",
    },
    {
      id: 2,
      title: "Moving Few Items",
      description: "Want to move a Couch, Fridge, Desk or Marketplace Purchase",
      image: "/image1.png",
      backgroundImage: "/unnamed--1--1-2.png",
      overlayImage: "/unnamed--2--1.png",
    },
    {
      id: 3,
      title: "Office Relocation",
      description: "",
      image: "/image1.png",
      backgroundImage: "/unnamed--1--1-2.png",
    },
    {
      id: 4,
      title: "Apartment Move",
      description: "Complete apartment moving service with professional care",
      image: "/image1.png",
      backgroundImage: "/unnamed--1--1-2.png",
    },
    {
      id: 5,
      title: "Donation Run",
      description: "Donate your unwanted items to local charities",
      image: "/image1.png",
      backgroundImage: "/unnamed--1--1-2.png",
    },
    {
      id: 6,
      title: "Storage Removal",
      description: "Moving items from storage units to your new location",
      image: "/image1.png",
      backgroundImage: "/unnamed--1--1-2.png",
    },
     {
      id: 6,
      title: "Storage Removal",
      description: "Moving items from storage units to your new location",
      image: "/image1.png",
      backgroundImage: "/unnamed--1--1-2.png",
    },
     {
      id: 6,
      title: "Storage Removal",
      description: "Moving items from storage units to your new location",
      image: "/image1.png",
      backgroundImage: "/unnamed--1--1-2.png",
    },
     {
      id: 6,
      title: "Storage Removal",
      description: "Moving items from storage units to your new location",
      image: "/image1.png",
      backgroundImage: "/unnamed--1--1-2.png",
    },
  ];

  return (
    <section className="w-full py-16 flex flex-col items-center">
      <div className="w-full max-w-[1200px] flex flex-col items-center">
     
        {/* Service Cards Slider */}
       
          <div className="w-full max-w-[1400px]">
          <Slider
            slidesToShow={3}
            slidesToScroll={1}
            autoplay={true}
            autoplaySpeed={3000}
            showDots={true}
            showArrows={true}
            infinite={true}
            className="w-full"
          >
            {serviceCards.map((card) => (
              <div key={card.id} className="flex flex-col h-full">
                <Card className="rounded-[20px] overflow-hidden border-none shadow-lg hover:shadow-xl transition-shadow duration-300">
                  <div className="p-0 relative h-[400px] group">
                    {/* Background image */}
                    <img
                      className="absolute w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                      alt={card.title}
                      src={card.backgroundImage}
                    />

                    {/* Overlay image if exists */}
                    {card.overlayImage && (
                      <img
                        className="absolute w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                        alt={`${card.title} overlay`}
                        src={card.overlayImage}
                      />
                    )}

                    {/* Main image */}
                    <img
                      className="absolute w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                      alt={card.title}
                      src={card.image}
                    />

                    {/* Gradient overlay for better text readability */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </div>
                </Card>

                <div className="mt-5 text-center flex-grow">
                  <h3 className="font-['Urbanist',Helvetica] font-bold text-[24px] text-[#0c0c0c] leading-[28px] mb-2">
                    {card.title}
                  </h3>
                  {card.description && (
                    <p className="font-['Lexend',Helvetica] font-medium text-base text-[#666666] leading-[24px] max-w-[300px] mx-auto">
                      {card.description}
                    </p>
                  )}
                </div>
              </div>
            ))}
          </Slider>
          </div>
       
      </div>
    </section>
  );
};
