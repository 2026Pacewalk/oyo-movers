"use client";
import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import Footer from "@/components/WebAppWrapper/Footer";
import "./ItemWeTake.scss";

const ItemWeTake = () => {
  const [activeSection, setActiveSection] = useState("common-household");

  const toggleSection = (section: string) => {
    setActiveSection(activeSection === section ? "" : section);
  };

  const commonHouseholdItems = [
    ["Appliances", "Air conditioners", "Air purifiers", "Armoires", "Bed frame sets", "Bookshelves", "Box springs", "Cameras", "Cardboard", "CD players", "Chairs", "Clothing", "Couches", "Dehumidifiers", "Dishwashers", "Dining Tables"],
    ["Dressers", "DVD & VCR players", "Exercise equipment", "Fans", "Foosball tables", "Fridge & Freezers", "Furniture", "Hutches", "Lamps", "Sectionals", "Sleeper sofas", "Love seats", "Mattresses", "Microwaves", "MP3 players", "Ottomans"],
    ["Pool tables", "Phones", "Pianos", "Radios/speakers", "Range hoods", "Refrigerators", "Space heaters", "Stoves/ovens", "Tables", "Tablets", "Televisions", "Toasters", "Toys", "Vanities", "Video games", "Washers/dryers"]
  ];

  const businessOfficeItems = [
    ["Coffee makers", "Computers", "Countertops", "Desks", "Electronics", "Fax machines"],
    ["File cabinets", "Fixtures", "Monitors", "Office cubicles", "Pallets", "Paper shredders"],
    ["Printers / copiers", "Projectors", "Safes", "Storage Boxes", "Shelvings"]
  ];

  const outdoorItems = [
    ["Basketball hoops", "Bicycles", "Fences", "Grills"],
    ["Hot tubs", "Large tree stumps", "Lawn mowers", "Pots & Plants"],
    ["Sheds", "Swing-sets/playsets", "Tires", "Trampolines"]
  ];

  const constructionItems = [
    ["Bathtubs", "Bricks", "Carpets/rugs", "Concrete"],
    ["Doors", "Flooring", "Insulation", "Lumber"],
    ["Power tools", "Radiators", "Sinks", "Water heaters"]
  ];

  return (
    <div className="item-we-take-page">
      {/* Hero Banner Section */}
      <section className="hero-banner">
        <Image
          src="/images/item-take-bg.jpg"
          alt="Items We Take"
          fill
          className="hero-image"
          priority
        />

      </section>

      <section className="breadcrumb-section">
        <nav aria-label="breadcrumb">
          <ol className="breadcrumb">
            <li className="breadcrumb-item">
              <Link href="/">Home</Link>
            </li>
            <li className="breadcrumb-item active" aria-current="page">
              Item We Take
            </li>
          </ol>
        </nav>
      </section>

      {/* Main Title Section */}
      <section className="title-section">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <div className="section-heading">
              <h1 className="text-center txt-blue pb-1 mb-1 h1">
                  Items We Take
                </h1>
                <h2 className="text-center txt-blue mb-3">
                  Big or small, we <span className="highlight">Move it all!</span>
                </h2>
                <div className="divider"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Items We Take Section */}
      <section className="items-we-take py-5">
        <div className="container-1">
          <div className="row">
            <div className="col-12">
              <div className="accordion">
                {/* Common Household Items */}
                <div className="card">
                  <div className="card-header-1 p-0">
                    <button
                      className={` text-left px-4 py-3 ${activeSection === 'common-household' ? 'active' : ''}`}
                      onClick={() => toggleSection('common-household')}
                    >
                      Common House-hold Items
                      <span className="accordion-icon">
                        {activeSection === 'common-household' ? '−' : '+'}
                      </span>
                    </button>
                  </div>
                  {activeSection === 'common-household' && (
                    <div className="card-body">
                      <div className="row">
                        {commonHouseholdItems.map((column, columnIndex) => (
                          <div key={columnIndex} className="col-md-4">
                            <ul className="list-inline my-check">
                              {column.map((item, itemIndex) => (
                                <li key={itemIndex}>
                                  <i className="fa-solid fa-check"></i> {item}
                                </li>
                              ))}
                            </ul>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                {/* Business & Office Items */}
                <div className="card">
                  <div className="card-header-1 p-0">
                    <button
                      className={` text-left px-4 py-3 ${activeSection === 'business-office' ? 'active' : ''}`}
                      onClick={() => toggleSection('business-office')}
                    >
                      Business & Office Items
                      <span className="accordion-icon">
                        {activeSection === 'business-office' ? '−' : '+'}
                      </span>
                    </button>
                  </div>
                  {activeSection === 'business-office' && (
                    <div className="card-body">
                      <div className="row">
                        {businessOfficeItems.map((column, columnIndex) => (
                          <div key={columnIndex} className="col-md-4">
                            <ul className="list-inline my-check">
                              {column.map((item, itemIndex) => (
                                <li key={itemIndex}>
                                  <i className="fa-solid fa-check"></i> {item}
                                </li>
                              ))}
                            </ul>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                {/* Outdoor Items */}
                <div className="card">
                  <div className="card-header-1 p-0">
                    <button
                      className={` text-left px-4 py-3 ${activeSection === 'outdoor' ? 'active' : ''}`}
                      onClick={() => toggleSection('outdoor')}
                    >
                      Outdoor Items
                      <span className="accordion-icon">
                        {activeSection === 'outdoor' ? '−' : '+'}
                      </span>
                    </button>
                  </div>
                  {activeSection === 'outdoor' && (
                    <div className="card-body">
                      <div className="row">
                        {outdoorItems.map((column, columnIndex) => (
                          <div key={columnIndex} className="col-md-4">
                            <ul className="list-inline my-check">
                              {column.map((item, itemIndex) => (
                                <li key={itemIndex}>
                                  <i className="fa-solid fa-check"></i> {item}
                                </li>
                              ))}
                            </ul>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                {/* Construction or Renovation Items */}
                <div className="card">
                  <div className="card-header-1 p-0">
                    <button
                      className={`text-left px-4 py-3 ${activeSection === 'construction' ? 'active' : ''}`}
                      onClick={() => toggleSection('construction')}
                    >
                      Construction or Renovation Items
                      <span className="accordion-icon">
                        {activeSection === 'construction' ? '−' : '+'}
                      </span>
                    </button>
                  </div>
                  {activeSection === 'construction' && (
                    <div className="card-body">
                      <div className="row">
                        {constructionItems.map((column, columnIndex) => (
                          <div key={columnIndex} className="col-md-4">
                            <ul className="list-inline my-check">
                              {column.map((item, itemIndex) => (
                                <li key={itemIndex}>
                                  <i className="fa-solid fa-check"></i> {item}
                                </li>
                              ))}
                            </ul>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* What we don't REMOVE Section */}
      <section className="pb-5 dont-remove">
        <div className="container-1 py-md-4">
          <div className="row">
            <div className="col-md-12">
              <div className="section-heading">
                <h2 className="text-center mb-3">What we don&apos;t REMOVE</h2>
                <div className="divider mb-5"></div>
              </div>
            </div>
          </div>
          <div className="row text-center dont-remove-row">
            <div className="col-md-3" style={{ borderRight: "2px solid #666" }}>
              <div className="dont-remove-item">
                <Image src="/images/icon-toxic.png" alt="Toxic and Flammable Liquids" width={80} height={80} />
                <h5>Toxic and Flammable Liquids</h5>
                <p>Such as:- Paints, Bleach, chlorine, Chemicals Etc.</p>
              </div>
            </div>
            <div className="col-md-3" style={{ borderRight: "2px solid #666" }}>
              <div className="dont-remove-item">
                <Image src="/images/icon-asbestos.png" alt="Asbestos" width={80} height={80} />
                <h5>Asbestos</h5>
                <p>In any form (Residential or commercial)</p>
              </div>
            </div>
            <div className="col-md-3" style={{ borderRight: "2px solid #666" }}>
              <div className="dont-remove-item">
                <Image src="/images/icon-explosives.png" alt="Explosives" width={80} height={80} />
                <h5>Explosives</h5>
                <p>Gas bottles, flairs & Fireworks, ammunition etc.</p>
              </div>
            </div>
            <div className="col-md-3">
              <div className="dont-remove-item">
                <Image src="/images/icon-oils.png" alt="Oils & Fuels" width={80} height={80} />
                <h5>Oils & Fuels</h5>
                <p>Petroleum, LPG, Diesel, Engine oils</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer Section */}
      <Footer />
    </div>
  );
};

export default ItemWeTake;