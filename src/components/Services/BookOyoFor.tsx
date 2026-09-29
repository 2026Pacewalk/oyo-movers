"use client";

import React from "react";
import Link from "next/link";
import { servicesMenu } from "./servicesData";
import "./bookOyoFor.scss";

/* "Book OYO For:-" — services grid shown on every service page.
   Single source of truth: servicesMenu. Optionally hides the current page. */
const BookOyoFor = ({ currentSlug }: { currentSlug?: string }) => {
  const items = servicesMenu.filter((s) => s.slug !== currentSlug);

  return (
    <section className="book-oyo-section">
      <div className="book-oyo-container">
        <h2 className="book-oyo-title">
          Book OYO For<span className="book-oyo-colon">:-</span>
        </h2>
        <div className="book-oyo-underline" />
        <div className="book-oyo-grid">
          {items.map((s) => (
            <Link href={s.href} key={s.slug} className="book-oyo-card">
              <span className="book-oyo-ic">{s.icon}</span>
              <span className="book-oyo-text">
                <span className="book-oyo-label">{s.label}</span>
                <span className="book-oyo-desc">{s.desc}</span>
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BookOyoFor;
