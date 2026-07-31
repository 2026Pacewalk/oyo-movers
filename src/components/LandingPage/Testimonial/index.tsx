"use client";
import React, { useState } from "react";
import { Card } from "react-bootstrap";

import { reviewData } from "../../../utils/helper";
import "./review.scss";
import { s3ImageBaseUrl } from "@/config";
import HeadingSection from "../Heading";
import { useReviewMarquee } from "./useReviewMarquee";

type ReviewItem = (typeof reviewData)[number];

const duplicatedReviews = [...reviewData, ...reviewData];

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

const ReviewCard = ({ item }: { item: ReviewItem }) => (
  <Card className="review-card mx-2 h-100">
    <div className="review-card-content p-4 h-100 d-flex flex-column-reverse justify-content-between">
      <div className="d-flex align-items-center">
        <img
          src={s3ImageBaseUrl + `/${item.logo}`}
          className="revieLogo me-2"
          alt=""
          loading="lazy"
          decoding="async"
        />
        <div className="d-flex">
          <StarRating />
        </div>
      </div>
      <p className="review-text text-dark mb-4 flex-grow-1">{item.review}</p>
      <div className="d-flex align-items-center card-user">
        <div
          className="review-user-circle rounded-circle text-white d-flex align-items-center justify-content-center me-3"
          style={{ backgroundColor: "#48a0ff" }}
        >
          {item.user.charAt(0)}
        </div>
        <span className="fw-semibold">{item.user}</span>
      </div>
    </div>
  </Card>
);

type ReviewMarqueeProps = {
  direction: "left" | "right";
  itemClassName: string;
  wrapperClassName?: string;
};

const ReviewMarquee = ({ direction, itemClassName, wrapperClassName = "" }: ReviewMarqueeProps) => {
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
              <ReviewCard item={item} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const ReviewService = () => {
  return (
    <div className="reviewContainer py-5">
      <div className="container">
        <HeadingSection
          buttonLabel=" Our Testimonials"
          mainHeading="User Reviews and Feedback"
          subHeading="See how OYO has helped their clients"
        />

        <ReviewMarquee direction="left" itemClassName="pt-5" />
        <ReviewMarquee direction="right" itemClassName="pb-5" wrapperClassName="sliderT mb-2" />
      </div>
    </div>
  );
};

export default ReviewService;
