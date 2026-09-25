"use client";

import React, { useState } from "react";
import { FaPlus, FaXmark } from "react-icons/fa6";
import "@/app/faqs/faqs.scss";
import "./faq-accordion.scss";

export type FaqQA = { q: string; a: string };

/* Highlights phone numbers, emails and URLs inside answer text (same as /faqs). */
const highlightLinks = (text: string) => {
  let h = text.replace(/\n/g, "<br>");
  h = h.replace(
    /(\d{4}\s\d{2}\s\d{2}\s\d{2}|\d{4}\s\d{3}\s\d{3}|\+61\s\d\s\d{4}\s\d{4}|\d{3}\s\d{3}\s\d{3})/g,
    '<a href="tel:$1" class="highlight-text">$1</a>'
  );
  h = h.replace(
    /([a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})/g,
    '<span class="highlight-text">$1</span>'
  );
  h = h.replace(
    /(https?:\/\/[^\s<>]+|www\.[^\s<>]+)/g,
    '<span class="highlight-text">$1</span>'
  );
  return h;
};

type Props = {
  items: FaqQA[];
  heading?: string;
  defaultOpen?: number | null;
};

/* Shared FAQ accordion — the /faqs card UI, reusable across all pages. */
const FaqAccordion = ({ items, heading = "Frequently Asked Questions", defaultOpen = 0 }: Props) => {
  const [active, setActive] = useState<number | null>(defaultOpen);

  if (!items || items.length === 0) return null;

  return (
    <section className="faq-section faq-section--inline">
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <div className="faq-inline-head">
              <h2 className="faq-inline-title">{heading}</h2>
              <div className="faq-divider"></div>
            </div>
            <div className="accordion mb-4" id="accordionExample">
              {items.map((item, i) => (
                <div key={i} className="card">
                  <div className="card-header p-0" id={`faq-h-${i}`}>
                    <a
                      href="javascript:void(0)"
                      className={`text-left ${active === i ? "" : "collapsed"}`}
                      onClick={() => setActive(active === i ? null : i)}
                      aria-expanded={active === i}
                      aria-controls={`faq-c-${i}`}
                    >
                      {item.q}
                      <span className="toggle-icon">
                        {active === i ? <FaXmark /> : <FaPlus />}
                      </span>
                    </a>
                  </div>
                  <div
                    id={`faq-c-${i}`}
                    className={`collapse ${active === i ? "show" : ""}`}
                    aria-labelledby={`faq-h-${i}`}
                  >
                    <div className="card-body">
                      <p dangerouslySetInnerHTML={{ __html: highlightLinks(item.a) }}></p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FaqAccordion;
