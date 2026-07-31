"use client";
import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { FaCircle, FaPlus, FaMinus } from "react-icons/fa";
import Footer from "@/components/WebAppWrapper/Footer";
import "./MovingChecklist.scss";

const MovingChecklist = () => {
  const [activeSection, setActiveSection] = useState<string | null>(null);

  const toggleSection = (section: string) => {
    setActiveSection(activeSection === section ? null : section);
  };

  const checklistData = [
    {
      id: "4-weeks",
      title: "4 weeks to move",
      items: [
        "If you are renting then give formally notice to your real estate or landlord so you can get your Bond back.",
        "If you want to move yourself then buy packing material and moving boxes. Its perfect time for start packing those items, which you use often.",
        "Book a removalist if you cant move yourself (sometimes its hard to pack/unpack, labelling clearly and then moving) also this is the best time for getting quotations and you can also avoid last minute hassle.",
        "Book a Cleaner for Carpet cleaning and if necessary your house after move day, so you can get your bond.",
        "Organise a Storage if necessary.",
        "Clean Out your house, it is perfect time to clean your house for new tenants. Also you can find what cloths and items you need. Start with closets, then basement and garage.",
        "Sell, Donate or Through Away any unwanted items or Organise a Garage sale (you can also sell through Online Sites, e.g.: - Gumtree).",
        "Start using items you can't move, Such as Frozen food, Bleach and Aerosols.",
        "Organise Time-Off from your workplace for move."
      ]
    },
    {
      id: "2-weeks",
      title: "2 weeks to move",
      items: [
        "Disconnect your utilities from your old house and reconnect to your new house (Such as: - Gas, Water, Electricity, Cable, Satellite, Mobile phone connection, Telephone, Internet etc.).",
        "Arrange to redirect your mail through Australia Post.",
        "If necessary than organise rubbish removal.",
        "Notify anyone who needs to know and update you new address. Such as your Employer, Accountant, Doctor, Pharmacy, Health Insurance Provider, Car Insurance Provider, Schools, Bank, Credit Card Company, Auto Finance Company, Health club, Laundry Service, Magazines, News-letters, News-papers, ATO, Licensing Authority, Vehicle Registration Authority etc.",
        "Arrange childcare or Baby-sitting for your little ones.",
        "Arrange pet care for your pets.",
        "Keep packing stuff, which you don't use often."
      ]
    },
    {
      id: "1-week",
      title: "1 week to move",
      items: [
        "Contact your mover and Cleaners for conformation.",
        "Contact your Credit-Card company if you have plans to pay through Credit card or Debit Master Card.",
        "Return library books, DVD's or any borrowed items.",
        "Clean your fridge.",
        "Dispose of any flammables (e.g.- Drain Gas or oil from your lawn-mover).",
        "Gather all important documents and valuable items at one place and make sure you carry them during move (such as: - Passports, Cash, Certificates, jewellery etc.).",
        "Measure your doorway to figure out if large things can move while moving or not.",
        "Back-up your computer.",
        "Defrost your freezer at least a day before move.",
        "Settle any outstanding bills to pay.",
        "Cancel or redirect any deliveries (such as: - Milk, Newspaper, Groceries etc.)."
      ]
    },
    {
      id: "big-day",
      title: "Big Day/Moving Day",
      items: [
        "Plan for Dinner (Pizza is the best option).",
        "Place old sheets on your carpet or floor and place protector on your doors frame.",
        "Always ensure the items you are moving yourself aren't mixed with those which are moved by movers.",
        "Do a final walk to check everything is moved and nothing left behind.",
        "Always turn of the Gas, Electricity and water.",
        "Leave a note for the future residents so they can forward stray mails.",
        "Always re-check all doors and windows are locked.",
        "Handover all keys to the real Estate or Landlord including Garage Remote and Spare keys."
      ]
    }
  ];

  return (
    <div className="moving-checklist-page">
      {/* Hero Banner Section */}
      <section
        className="hero-banner">
        <div className="hero-content">
          <img src="/images/moving-checklist-bg.jpg" alt="Moving Checklist" />
        </div>
      </section>

      {/* Breadcrumb Section */}
      <section className="breadcrumb-section">
        <nav aria-label="breadcrumb">
          <ol className="breadcrumb">
            <li className="breadcrumb-item">
              <Link href="/">Home</Link>
            </li>
            <li className="breadcrumb-item active" aria-current="page">
              Moving Checklist
            </li>
          </ol>
        </nav>
      </section>

      {/* Main Content Section */}
      <section className="checklist-section">
        <div className="container-1 moving-checklist-container">
          <div className="row">
            <div className="col-12">
              <div className="checklist-container">
                <h1 className="checklist-title">Moving Checklist</h1>
                <div className="checklist-divider"></div>

                <div className="checklist-wrapper">
                  {checklistData.map((section) => (
                    <div key={section.id} className="checklist-item">
                      <div
                        className={`checklist-header ${activeSection === section.id ? 'active' : ''}`}
                        onClick={() => toggleSection(section.id)}
                      >
                        <span className="checklist-title-text">{section.title}</span>
                        <span className="checklist-icon">
                          {activeSection === section.id ? '×' : '+'}
                        </span>
                      </div>

                      {activeSection === section.id && (
                        <div className="checklist-content">
                          <ul className="checklist-list">
                            {section.items.map((item, index) => (
                              <li key={index} className="checklist-task">
                                <span className="task-bullet">○</span>
                                <span className="task-text">{item}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
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

export default MovingChecklist;