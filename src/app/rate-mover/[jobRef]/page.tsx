"use client";

import React, { useCallback, useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { FaArrowLeft, FaRegStar, FaStar } from "react-icons/fa6";
import {
  getPublicJobRating,
  postPublicJobRating,
  type RateMoverJobData,
} from "@/lib/rateMoverApi";
import { errorToast, successToast } from "@/lib/toaster";
import "../rate-mover.scss";

const STAR_COUNT = 5;

const RateMoverHeader = () => {
  const router = useRouter();

  return (
    <header className="rate-mover-page__header">
      <button
        type="button"
        className="rate-mover-page__back"
        onClick={() => router.push("/")}
        aria-label="Go to home"
      >
        <FaArrowLeft />
      </button>
      <h1>Review</h1>
    </header>
  );
};

const RateMoverPage = () => {
  const params = useParams();
  const jobRef = typeof params?.jobRef === "string" ? params.jobRef : "";

  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState<string | null>(null);
  const [jobData, setJobData] = useState<RateMoverJobData | null>(null);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [hoveredStar, setHoveredStar] = useState(0);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const readOnly = Boolean(jobData?.alreadyRated) || submitted;

  const loadJob = useCallback(async () => {
    if (!jobRef) {
      setLoadError("Invalid review link");
      setLoading(false);
      return;
    }

    setLoading(true);
    setLoadError(null);

    const res = await getPublicJobRating(jobRef);
    if (!res.ok || !res.data) {
      setLoadError(res.message || "Invalid or expired review link");
      setJobData(null);
    } else {
      setJobData(res.data);
      if (res.data.alreadyRated && res.data.rating) {
        setRating(Math.round(res.data.rating));
        setComment(res.data.comment || "");
      }
    }
    setLoading(false);
  }, [jobRef]);

  useEffect(() => {
    loadJob();
  }, [loadJob]);

  const displayStars = hoveredStar || rating;
  const isReviewReady = rating >= 1 && comment.trim().length > 0;

  const handleSubmit = async () => {
    if (readOnly || !jobRef || !isReviewReady) return;

    setSubmitting(true);
    const res = await postPublicJobRating(jobRef, {
      rating: Math.round(rating),
      comment: comment.trim(),
    });
    setSubmitting(false);

    if (res.ok) {
      successToast(res.message || "Review submitted successfully");
      setSubmitted(true);
      setJobData((prev) =>
        prev
          ? { ...prev, alreadyRated: true, rating, comment: comment.trim() }
          : prev
      );
    } else {
      errorToast(res.message || "Failed to submit review");
    }
  };

  const renderStars = () => {
    const stars = [];
    for (let i = 1; i <= STAR_COUNT; i++) {
      const filled = displayStars >= i;
      stars.push(
        <button
          key={i}
          type="button"
          className="rate-mover-page__star"
          disabled={readOnly || submitting}
          onClick={() => !readOnly && setRating(i)}
          onMouseEnter={() => !readOnly && setHoveredStar(i)}
          onMouseLeave={() => !readOnly && setHoveredStar(0)}
          aria-label={`Rate ${i} out of 5`}
        >
          {filled ? (
            <FaStar size={32} color="#fad232" />
          ) : (
            <FaRegStar size={32} color="#111" />
          )}
        </button>
      );
    }
    return stars;
  };

  if (!jobRef) {
    return (
      <div className="rate-mover-page">
        <RateMoverHeader />
        <div className="rate-mover-page__error">
          <h2>Invalid link</h2>
          <p>No job reference was provided.</p>
          <Link href="/" className="rate-mover-page__home-link">
            Go to home
          </Link>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="rate-mover-page">
        <RateMoverHeader />
        <div className="rate-mover-page__loading">
          <p>Loading…</p>
        </div>
      </div>
    );
  }

  if (loadError) {
    return (
      <div className="rate-mover-page">
        <RateMoverHeader />
        <div className="rate-mover-page__error">
          <h2>Unable to load review</h2>
          <p>{loadError}</p>
          <Link href="/" className="rate-mover-page__home-link">
            Go to home
          </Link>
        </div>
      </div>
    );
  }

  const moverName = jobData?.moverName || "your mover";
  const showThankYou = submitted || jobData?.alreadyRated;

  return (
    <div className="rate-mover-page">
      <RateMoverHeader />
      <div className="rate-mover-page__body">
        <p className="rate-mover-page__banner">
          How did {moverName} do?
        </p>

        {showThankYou && submitted ? (
          <div className="rate-mover-page__success">
            <h2>Thank you!</h2>
            <p>Your review has been submitted.</p>
          </div>
        ) : null}

        <div className="rate-mover-page__content">
          <p className="rate-mover-page__label">Rate your experience :</p>
          <div className="rate-mover-page__stars">{renderStars()}</div>
          <textarea
            className="rate-mover-page__textarea"
            placeholder="Write your review here"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            disabled={readOnly || submitting}
            maxLength={1000}
          />
          {jobData?.alreadyRated && !submitted ? (
            <p className="rate-mover-page__already-rated">
              You have already submitted a review for this job.
            </p>
          ) : null}
        </div>
      </div>

      {!readOnly ? (
        <div className="rate-mover-page__footer">
          <button
            type="button"
            className={`rate-mover-page__submit ${
              isReviewReady && !submitting
                ? "rate-mover-page__submit--ready"
                : "rate-mover-page__submit--faded"
            }`}
            disabled={!isReviewReady || submitting}
            onClick={handleSubmit}
          >
            {submitting ? "Submitting…" : "Submit Review"}
          </button>
        </div>
      ) : null}
    </div>
  );
};

export default RateMoverPage;
