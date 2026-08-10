"use client";
import React, { useState } from "react";

import { reviewData } from "../../../utils/helper";
import "./review.scss";
import { s3ImageBaseUrl } from "@/config";
import HeadingSection from "../Heading";
import { useReviewMarquee } from "./useReviewMarquee";
import { FaGoogle, FaFacebookF, FaStar } from "react-icons/fa";

/* Aggregate rating + platform trust data (from Google Business + review sites). */
const WRITE_REVIEW_URL = "https://g.page/r/CfGsZ5PhGz0WEBM/review";

const RATING = { score: "4.9", total: 196 };

const trustAvatars = [
  { i: "R", c: "#f59e0b" },
  { i: "S", c: "#ec4899" },
  { i: "M", c: "#10b981" },
];

const platforms = [
  { name: "Google", score: "4.9", suffix: "/5", count: "196 reviews", color: "#4285F4", icon: <FaGoogle /> },
  { name: "Facebook", score: "5", suffix: "/5", count: "7 votes", color: "#1877F2", icon: <FaFacebookF /> },
  { name: "Sirelo", score: "10", suffix: "/10", count: "79 reviews", color: "#00B67A", icon: <span className="rs-plat-letter">S</span> },
  { name: "Product Review", score: "5", suffix: "/5", count: "19 reviews", color: "#E8672F", icon: <FaStar /> },
];

type ReviewItem = (typeof reviewData)[number];

// Show the latest 10 reviews, duplicated once for a seamless single-row loop
const latestReviews = reviewData.slice(0, 10);
const duplicatedReviews = [...latestReviews, ...latestReviews];

const StarRating = () => (
  <>
    {[...Array(5)].map((_, i) => (
      <svg
        key={i}
        className="bi bi-star-fill text-warning"
        fill="currentColor"
        viewBox="0 0 16 16"
        xmlns="http://www.w3.org/2000/svg"
        width="20"
        height="20"
        aria-hidden
      >
        <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.32-.158-.888.283-.95l4.898-.696 2.184-4.327c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.63.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z" />
      </svg>
    ))}
  </>
);

const avatarColors = [
  "#6366f1",
  "#0ea5e9",
  "#f59e0b",
  "#ec4899",
  "#10b981",
  "#8b5cf6",
  "#ef4444",
  "#14b8a6",
];
const colorFor = (name: string) =>
  avatarColors[(name.charCodeAt(0) || 0) % avatarColors.length];

const ReviewCard = ({
  item,
  onReadMore,
}: {
  item: ReviewItem;
  onReadMore: (item: ReviewItem) => void;
}) => (
  <div className="review-card2">
    <div className="review-head">
      <div className="review-avatar" style={{ background: colorFor(item.user) }}>
        {item.user.charAt(0)}
      </div>
      <div className="review-meta">
        <span className="review-name">{item.user}</span>
        <div className="review-stars">
          <StarRating />
        </div>
      </div>
    </div>

    <p className="review-text">{item.review}</p>

    {item.review.length > 120 && (
      <button
        type="button"
        className="review-readmore"
        onClick={() => onReadMore(item)}
      >
        Read more
      </button>
    )}

    <div className="review-foot">
      <img
        src={s3ImageBaseUrl + `/${item.logo}`}
        className="review-source"
        alt=""
        loading="lazy"
        decoding="async"
      />
      <span className="review-source-label">Verified review</span>
    </div>
  </div>
);

const ReviewModal = ({
  item,
  onClose,
}: {
  item: ReviewItem;
  onClose: () => void;
}) => (
  <div className="review-modal-overlay" onClick={onClose}>
    <div
      className="review-modal"
      role="dialog"
      aria-modal="true"
      onClick={(e) => e.stopPropagation()}
    >
      <button className="review-modal-close" onClick={onClose} aria-label="Close">
        ×
      </button>
      <div className="review-head">
        <div className="review-avatar" style={{ background: colorFor(item.user) }}>
          {item.user.charAt(0)}
        </div>
        <div className="review-meta">
          <span className="review-name">{item.user}</span>
          <div className="review-stars">
            <StarRating />
          </div>
        </div>
      </div>
      <p className="review-modal-text">{item.review}</p>
      <div className="review-foot">
        <img
          src={s3ImageBaseUrl + `/${item.logo}`}
          className="review-source"
          alt=""
        />
        <span className="review-source-label">Verified review</span>
      </div>
    </div>
  </div>
);

type ReviewMarqueeProps = {
  direction: "left" | "right";
  itemClassName: string;
  wrapperClassName?: string;
  onReadMore: (item: ReviewItem) => void;
};

const ReviewMarquee = ({ direction, itemClassName, wrapperClassName = "", onReadMore }: ReviewMarqueeProps) => {
  const [paused, setPaused] = useState(false);
  const trackRef = useReviewMarquee(direction, paused);

  return (
    <div className={`slider-fade-wrapper ${wrapperClassName}`.trim()}>
      <div className="review-marquee-viewport">
        <div
          ref={trackRef}
          className={`review-marquee-track review-marquee-${direction}`}
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
          onTouchStart={() => setPaused(true)}
          onTouchEnd={() => setPaused(false)}
          onTouchCancel={() => setPaused(false)}
        >
          {duplicatedReviews.map((item, index) => (
            <div key={`${item.user}-${index}`} className={`review-marquee-item ${itemClassName}`}>
              <ReviewCard item={item} onReadMore={onReadMore} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const ReviewsSummary = () => (
  <div className="reviews-summary">
    <div className="rs-left">
      <div className="rs-score-row">
        <span className="rs-score">{RATING.score}</span>
        <div className="rs-score-meta">
          <div className="rs-stars">
            <StarRating />
          </div>
          <span className="rs-count">
            <FaGoogle className="rs-google" /> Based on {RATING.total} Google reviews
          </span>
        </div>
      </div>
      <span className="rs-badge">Excellent</span>

      <a
        className="rs-trust"
        href={WRITE_REVIEW_URL}
        target="_blank"
        rel="noopener noreferrer"
        title="See our reviews & leave one on Google"
      >
        <span className="rs-trust-avatars">
          {trustAvatars.map((a, i) => (
            <span key={i} className="rs-av" style={{ background: a.c }}>
              {a.i}
            </span>
          ))}
          <span className="rs-av rs-av-more">200+</span>
        </span>
        <span className="rs-trust-card">
          <img
            src={s3ImageBaseUrl + "/google-logo.png"}
            alt="Google"
            className="rs-trust-g"
          />
          <span className="rs-trust-info">
            <span className="rs-trust-stars">
              <StarRating />
              <b>{RATING.score}</b>
            </span>
            <span className="rs-trust-label">Trusted By 200+ Families</span>
          </span>
        </span>
      </a>
    </div>

    <div className="rs-platforms">
      {platforms.map((p) => (
        <div className="rs-platform" key={p.name}>
          <span className="rs-plat-icon" style={{ background: p.color }}>
            {p.icon}
          </span>
          <div className="rs-plat-info">
            <span className="rs-plat-name">{p.name}</span>
            <span className="rs-plat-score">
              {p.score}
              <small>{p.suffix}</small>
            </span>
          </div>
          <span className="rs-plat-count">{p.count}</span>
        </div>
      ))}
    </div>
  </div>
);

const ReviewService = () => {
  const [active, setActive] = useState<ReviewItem | null>(null);

  return (
    <div className="reviewContainer reviews-compact py-4">
      <div className="container">
        <HeadingSection
          buttonLabel=" Our Testimonials"
          mainHeading="User Reviews and Feedback"
          subHeading="See how OYO has helped their clients"
        />

        <ReviewsSummary />

        <ReviewMarquee
          direction="left"
          itemClassName=""
          wrapperClassName="reviews-single-row"
          onReadMore={setActive}
        />
      </div>

      {active && <ReviewModal item={active} onClose={() => setActive(null)} />}
    </div>
  );
};

export default ReviewService;
