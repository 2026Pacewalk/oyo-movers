"use client";
// import Slider from "@/components/slider";
import { s3ImageBaseUrl } from "@/config";
// import { Card } from "react-bootstrap";
import HeadingSection from "../Heading";
import Link from "next/link";
import './style.scss'

const OurClients = () => {

   const clientLogos = [
    {
      id: 1,
      logo: "roy-morgan.png",
      name: "ROY MORGAN RESEARCH INSTITUTE"
    },
    {
      id: 2,
      logo: "australian-tire-traders.png",
      name: "att AUSTRALIAN TYRE TRADERS"
    },
    {
      id: 3,
      logo: "explorar-early-learning.png",
      name: "Explorers Early Learning"
    },
    {
      id: 4,
      logo: "enphase.png",
      name: "ENPHASE"
    },
    {
      id: 5,
      logo: "verve.png",
      name: "VERVE"
    },
    {
      id: 6,
      logo: "tbuild.png",
      name: "Tbuild."
    },
    {
      id: 7,
      logo: "logo1.png",
      name: "COSTCO WHOLESALE"
    },
    {
      id: 8,
      logo: "logo2.png",
      name: "storage king"
    },
     {
      id: 9,
      logo: "logo3.png",
      name: "NATIONAL STORAGE"
    },
     {
      id: 10,
      logo: "logo4.png",
      name: "FORT KNOX SELF STORAGE"
    },
     {
      id: 11,
      logo: "logo5.png",
      name: "SERVCORP"
    },
     {
      id: 12,
      logo: "logo6.png",
      name: "EMU Australia"
    },
  ];


  return (
    <section className="clients ourclients py-5">

 <HeadingSection buttonLabel="Our Clients"  mainHeading="Trusted by Australia's Best"  subHeading="From national retailers to fast-growing local businesses, leading brands rely on OYO Movers for seamless, on-time, stress-free relocations."/>
           
              {/* <Slider
                slidesToShow={6}
                slidesToScroll={4}
                autoplay={false}
                autoplaySpeed={4000}
                showDots={true}
                showArrows={false}
                infinite={true}
                marquee={false}
                className="w-100"
                   responsive={[
            {
              breakpoint: 1024,
              settings: {
                slidesToShow: 3,
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
                slidesToShow: 3,
                slidesToScroll: 3,
              },
            },
          ]}
              >
                {clientLogos.map((client) => (
                  <div key={client.id}>
                    <Card className="h-30 bg-white border border-gray-200 hover-border-warning hover-shadow transition-all duration-300 group">
                      <div className="p-1 h-100 d-flex flex-column align-items-center justify-content-center">
                        <div className="rounded-lg overflow-hidden group-hover-scale transition-transform duration-300">
                          <img className="w-100 h-100" alt={`${client.logo} logo`} src={`${s3ImageBaseUrl}/${client.logo}`} />
                        </div>
                      </div>
                    </Card>
                  </div>
                ))}
              </Slider> */}

              {/* New Static Grid Layout */}
              <div className="clients-grid-container">
                <div className="clients-grid">
                  {clientLogos.map((client) => (
                    <div key={client.id} className="client-logo-item">
                      <div className="client-logo-wrapper">
                        <img 
                          className="client-logo" 
                          alt={`${client.name} logo`} 
                          src={`${s3ImageBaseUrl}/${client.logo}`} 
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="clients-cta">
                <p>Ready to move your home or business with a team the best brands trust?</p>
                <Link href="/prices" className="clients-cta-btn">
                  Get a Free Quote
                </Link>
              </div>

    </section>
  );
};

export default OurClients;
