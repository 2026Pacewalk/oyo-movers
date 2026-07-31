"use client";
import React, { useState } from "react";
import HeadingSection from "../Heading";
import "./faq.scss";

const faqs = [
  {
    question: "What is OYO-App?",
    answer: "  OYO app is an on-demand moving and same -day delivery platform connecting users with verified professional movers for house moving, office relocations, furniture deliveries, and junk removals.",
    nextanswer:"Through the OYO app or website, you can quickly select your moving team, truck size, and number of movers with just a few clicks, either on-demand (with 60 mins) or schedule in advance."
  },
  {
    question: "Where does OYO operate?",
    answer: "Currently OYO covers greater areas of Melbourne and Geelong. We are actively working on expanding our reach to other cities soon.",
  },
  {
    question: "How do I Book Oyo Movers Service?",
    answer: "It’s simple! You can schedule a Move anytime by filling Online Booking Form (24x7). Also, our friendly customer service team is available at 1300 01 31 31, between 7 AM to 4 PM. (Mon – Saturday)",
  },
  {
    question: "Will Movers Disassemble / Reassemble my items?",
    answer: "Oyo Will share mover details with you 1 day before the Schedule booking for contact, if needed.",
    nextanswer:"Movers typically contact you 30 mins prior to arrival.  Please Note: - Sometimes arrival can be delayed due to previous jobs or traffic condition etc. If this happens, we will inform you straightway."
  },
  {
    question: "Can movers drop items for Recycling / Tip?",
    answer: "Yes, we can! Please keep in mind that disposal and recycle centers close sooner than you think, so you'll want to request early in the day.",
    nextanswer:"IMPORTANT: Recycle centers charge a fee to dispose your items. This fee will be charged on top of your regular moving quote. This fee is based on the weight of type of your items."
  },
];

const linkifyPhoneNumbers = (text: string) => {
  if (!text) return text;
  const parts = text.split(/(\d{4}\s\d{2}\s\d{2}\s\d{2}|\d{4}\s\d{3}\s\d{3})/g);
  return parts.map((part, index) =>
    /^(\d{4}\s\d{2}\s\d{2}\s\d{2}|\d{4}\s\d{3}\s\d{3})$/.test(part) ? (
      <a key={index} href={`tel:${part}`} className="highlight-text" style={{ textDecoration: "none" }}>
        {part}
      </a>
    ) : (
      part
    )
  );
};

const FAQItem = ({ faq, isOpen, onClick }: { faq: any; isOpen: boolean; onClick: () => void }) => {
  return (
    <div className="accordion-item mb-3 rounded faq-accordion-item">
      <h2 className="accordion-header" id={`heading-${faq.question}`}>
        <button
          className={`accordion-button ${!isOpen ? "collapsed" : ""} fw-bold fs-5 faq-accordion-button`}
          type="button"
          onClick={onClick}
          aria-expanded={isOpen}
          aria-controls={`collapse-${faq.question}`}
        >
          {faq.question}
        </button>
      </h2>
      <div
        id={`collapse-${faq.question}`}
        className={`accordion-collapse collapse ${isOpen ? "show" : ""}`}
        aria-labelledby={`heading-${faq.question}`}
      >
        <div className="accordion-body fs-6">{linkifyPhoneNumbers(faq.answer)}</div>
         <div className="accordion-body fs-6">{linkifyPhoneNumbers(faq.nextanswer)}</div>
      </div>
       
    </div>
  );
};

const FAQSection = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="faqsection">

       <HeadingSection buttonLabel="
FAQ's"  mainHeading="Frequently Asked Questions"  subHeading=""/>
   <div className="container ">
      <div className="accordion" id="faqAccordion">
        {faqs.map((faq, index) => (
          <FAQItem key={index} faq={faq} isOpen={openIndex === index} onClick={() => toggleFAQ(index)} />
        ))}
      </div>
    </div>
    </div>
   
  );
};

export default FAQSection;
