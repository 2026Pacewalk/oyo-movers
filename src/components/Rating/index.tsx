import React, { useState, useEffect } from "react";
import Button from "../Button";
import { FaRegStar, FaStar } from "react-icons/fa6";
import { errorToast } from "@/lib/toaster";

interface RatingProps {
  review?: number;
  comment?: string;
  moverName?: string;
  handelReview: (data: { rating: number; reviewMsg: string }) => void;
  isLoading?: boolean;
  readOnly?: boolean;
}

const Rating = ({
  review,
  comment,
  moverName = "",
  handelReview,
  isLoading,
  readOnly = false,
}: RatingProps) => {
  const [ratingCount, setRatingCount] = useState<number>(review || 0);
  const [reviewMsg, setReviewMsg] = useState<string>(comment || "");
  const [hoveredStar, setHoveredStar] = useState<number>(0);

  useEffect(() => {
    setRatingCount(review || 0);
    setReviewMsg(comment || "");
  }, [review, comment]);

  const handleStarClick = (starIndex: number) => {
    if (readOnly) return;
    setRatingCount(starIndex + 1);
  };

  const handleStarHover = (starIndex: number) => {
    if (readOnly) return;
    setHoveredStar(starIndex + 1);
  };

  const handleStarLeave = () => {
    if (readOnly) return;
    setHoveredStar(0);
  };

  const renderStars = () => {
    const stars = [];
    const displayRating = hoveredStar || ratingCount;

    for (let i = 0; i < 5; i++) {
      const starValue = i + 1;
      const isFullStar = displayRating >= starValue;

      stars.push(
        <span
          key={i}
          className={`star-rating-star ${readOnly ? "" : "clickable"}`}
          onClick={() => handleStarClick(i)}
          onMouseEnter={() => handleStarHover(i)}
          onMouseLeave={handleStarLeave}
          style={{ cursor: readOnly ? "default" : "pointer" }}
        >
          {isFullStar ? (
            <FaStar className="star filled" color="#fad232" size={25} />
          ) : (
            <FaRegStar className="star empty" color="#d9d9d9" size={25} />
          )}
        </span>
      );
    }

    return stars;
  };

  const handleSubmit = () => {
    if (ratingCount === 0) {
      errorToast("Please select a rating before submitting");
      return;
    }
    handelReview({ rating: ratingCount, reviewMsg });
  };

  const heading = readOnly
    ? "Your review"
    : moverName
      ? `How was your experience with ${moverName}?`
      : "How was your experience?";

  return (
    <div className="startRating">
      <h2 className="startRating__heading">{heading}</h2>

      <div className="startRating__rating-row">
        <span className="startRating__label">Rating:</span>
        <div className="startRating__stars">{renderStars()}</div>
      </div>

      <textarea
        value={reviewMsg}
        onChange={(e) => setReviewMsg(e.target.value)}
        placeholder="Write your review here"
        disabled={readOnly}
      />

      {!readOnly && (
        <Button
          type="submit"
          className={`reviewModal__submit${ratingCount > 0 ? " reviewModal__submit--active" : ""}`}
          onClick={handleSubmit}
          isLoading={isLoading}
          disabled={isLoading || ratingCount === 0}
        >
          Submit
        </Button>
      )}
    </div>
  );
};

export default Rating;
