"use client";

import React, { useCallback, useMemo, useRef, useState } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { getEstimateModalMenBadge } from "@/components/JobBooking/OnePageMobile/formatOpfVehicleLabel";
import { getS3VehicleImageUrlWithoutDimensions } from "@/utils/vehicleS3Images";
import "./estimateCostSlider.scss";

type EstimateCostSliderProps = {
  vehicalData: any[];
  jobBooking: { vehicleType?: string };
  variant?: "mobile" | "desktop" | "page";
};

const formatPrice = (value: number) => `$${value.toFixed(2)}`;

const SLIDER_TRACK_MIN = 0;
const SLIDER_TRACK_MAX = 300;
const SLIDER_MIN = 30;
const SLIDER_MAX = 270;
const SLIDER_STEP = 30;

const SCALE_MARKS = [
  { minute: 30, label: null, major: false },
  { minute: 60, label: "1 hr", major: true },
  { minute: 90, label: null, major: false },
  { minute: 120, label: "2 hrs", major: true },
  { minute: 150, label: null, major: false },
  { minute: 180, label: "3 hrs", major: true },
  { minute: 210, label: null, major: false },
  { minute: 240, label: "4 hrs", major: true },
  { minute: 270, label: null, major: false },
] as const;

const minuteToPercent = (minute: number) =>
  `${(minute / SLIDER_TRACK_MAX) * 100}%`;

const snapMinute = (minute: number) => {
  const snapped = Math.round(minute / SLIDER_STEP) * SLIDER_STEP;
  return Math.max(SLIDER_MIN, Math.min(SLIDER_MAX, snapped));
};

const EstimateCostSlider = ({
  vehicalData,
  jobBooking,
  variant = "mobile",
}: EstimateCostSliderProps) => {
  const isDesktop = variant === "desktop";
  const isPage = variant === "page";
  const sliderFirst = isDesktop || isPage;
  const railRef = useRef<HTMLDivElement>(null);
  const [sliderValue, setSliderValue] = useState<number>(30);
  const [estimateTime, setEstimateTime] = useState(30);

  const setValue = useCallback((minute: number) => {
    const next = snapMinute(minute);
    setEstimateTime(next);
    setSliderValue(next);
  }, []);

  const updateFromClientX = useCallback(
    (clientX: number) => {
      const rail = railRef.current;
      if (!rail) return;
      const rect = rail.getBoundingClientRect();
      const ratio = Math.max(0, Math.min(1, (clientX - rect.left) / rect.width));
      setValue(ratio * SLIDER_TRACK_MAX);
    },
    [setValue]
  );

  const handlePointerDown = (event: React.PointerEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.currentTarget.setPointerCapture(event.pointerId);
    updateFromClientX(event.clientX);
  };

  const handlePointerMove = (event: React.PointerEvent<HTMLDivElement>) => {
    if (!event.currentTarget.hasPointerCapture(event.pointerId)) return;
    updateFromClientX(event.clientX);
  };

  const handlePointerUp = (event: React.PointerEvent<HTMLDivElement>) => {
    event.currentTarget.releasePointerCapture(event.pointerId);
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLButtonElement>) => {
    if (event.key === "ArrowLeft" || event.key === "ArrowDown") {
      event.preventDefault();
      setValue(sliderValue - SLIDER_STEP);
    } else if (event.key === "ArrowRight" || event.key === "ArrowUp") {
      event.preventDefault();
      setValue(sliderValue + SLIDER_STEP);
    } else if (event.key === "Home") {
      event.preventDefault();
      setValue(SLIDER_MIN);
    } else if (event.key === "End") {
      event.preventDefault();
      setValue(SLIDER_MAX);
    }
  };

  const convertTime = (time: number) => {
    const hours = Math.floor(time / 60);
    const minutes = time % 60;
    if (hours === 0 && minutes === 0) return "0min";
    if (hours === 0) return "30min";
    return `${hours}${minutes ? ".5" : ""} hrs`;
  };

  const vehicle = useMemo(
    () =>
      vehicalData?.length
        ? vehicalData.find((v: any) => v._id === jobBooking.vehicleType)
        : null,
    [vehicalData, jobBooking.vehicleType]
  );

  const calloutPrice = Number(vehicle?.moverPrice ?? 0);
  const workTimePrice =
    ((vehicle?.moverPrice || vehicle?.extraPrice || 0) * Number(sliderValue)) / 30;

  const calculateEstimatePrice = (time: number) => {
    const extraPrice = vehicle?.moverPrice || vehicle?.extraPrice || 0;
    const price = vehicle?.moverPrice || vehicle?.price || 0;
    const estimatedTime = Number(time || 0);
    const extraPriceType = vehicle?.extraPriceType?.split(" ");
    const howManyHelper = 1;

    if (extraPriceType?.length) {
      if (extraPriceType[2] === "hour" && extraPriceType[1] === "half") {
        return ((estimatedTime / 30) * extraPrice + price) * howManyHelper;
      }
      if (extraPriceType[0] === "per" && extraPriceType[1] === "min") {
        return (extraPrice * estimatedTime + price) * howManyHelper;
      }
      if (extraPriceType[0] === "per" && extraPriceType[1] === "hour") {
        return (extraPrice * estimatedTime + price) * howManyHelper;
      }
    }

    if (vehicle?.extraPriceType === "30 min" || vehicle?.priceType === "30 min") {
      return ((estimatedTime / 30) * extraPrice + price) * howManyHelper;
    }

    if (extraPrice > 0 && price > 0) {
      return ((estimatedTime / 30) * extraPrice + price) * howManyHelper;
    }

    if (price > 0) return price * howManyHelper;
    return 0;
  };

  const getHourMinute = (time: number) => {
    const hours = Math.floor(time / 60);
    const minutes = time % 60;
    if (hours > 0 && minutes > 0) return `${hours}h ${minutes}m`;
    if (hours > 0) return `${hours}hr`;
    if (minutes > 0) return `${minutes}min`;
    return "0min";
  };

  const totalEstimate = calculateEstimatePrice(estimateTime);

  const truckImageSrc = useMemo(() => {
    if (!vehicle) return "";
    return (
      getS3VehicleImageUrlWithoutDimensions({
        vehicleName: vehicle.vehicleName,
        vehicleDisplayName: vehicle.vehicleDisplayName,
        moverRequired: vehicle.moverRequired,
      }) || vehicle.imgSrc
    );
  }, [vehicle]);

  const isMediumTruck = vehicle?.vehicleName === "Med Truck";

  const menBadge = useMemo(
    () => (vehicle ? getEstimateModalMenBadge(vehicle) : null),
    [vehicle]
  );

  const breakdown = (
    <div className="estimate-cost__breakdown">
      <div className="estimate-cost__line">
        <p className="estimate-cost__line-label">
          Call-out Travel
          <span>({vehicle?.vehicleName || "Van"})</span>
        </p>
        <span className="estimate-cost__line-price">
          {formatPrice(calloutPrice)}
        </span>
      </div>

      <div className="estimate-cost__line">
        <p className="estimate-cost__line-label">
          Work-time
          <span>({convertTime(Number(sliderValue))})</span>
        </p>
        <span className="estimate-cost__line-price">
          {formatPrice(workTimePrice)}
        </span>
      </div>

      <div className="estimate-cost__divider estimate-cost__divider--solid" />

      <div className="estimate-cost__line estimate-cost__line--total">
        <p className="estimate-cost__line-label">
          Estimated price
          <span>(incl. GST)</span>
        </p>
        <span className="estimate-cost__line-price estimate-cost__line-price--total">
          {formatPrice(totalEstimate)}
        </span>
      </div>
    </div>
  );

  const sliderBlock = (
    <div className="estimate-cost__slider-block">
      <div className="estimate-cost__slider-scale">
        <div className="estimate-cost__scale-labels">
          {SCALE_MARKS.map((mark) =>
            mark.label ? (
              <span
                key={`label-${mark.minute}`}
                className="estimate-cost__scale-label"
                style={{ left: minuteToPercent(mark.minute) }}
              >
                {mark.label}
              </span>
            ) : null
          )}
        </div>
        <div
          ref={railRef}
          className="estimate-cost__slider-rail"
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
          onPointerCancel={handlePointerUp}
        >
          <div className="estimate-cost__slider-track" aria-hidden />
          <div
            className="estimate-cost__slider-range"
            style={{ width: minuteToPercent(sliderValue) }}
            aria-hidden
          />
          {SCALE_MARKS.map((mark) => (
            <span
              key={`tick-${mark.minute}`}
              className={`estimate-cost__tick ${mark.major ? "estimate-cost__tick--major" : "estimate-cost__tick--minor"}`}
              style={{ left: minuteToPercent(mark.minute) }}
            />
          ))}
          <button
            type="button"
            className="estimate-cost__slider-thumb"
            style={{ left: minuteToPercent(sliderValue) }}
            role="slider"
            aria-label="Estimated work time"
            aria-valuemin={SLIDER_MIN}
            aria-valuemax={SLIDER_MAX}
            aria-valuenow={sliderValue}
            aria-orientation="horizontal"
            onKeyDown={handleKeyDown}
          >
            <FaChevronLeft aria-hidden />
            <FaChevronRight aria-hidden />
          </button>
        </div>
      </div>
      <p className="estimate-cost__time-value">{getHourMinute(sliderValue)}</p>
      <p className="estimate-cost__time-hint">
        Est. Load & Unload time
      </p>
    </div>
  );

  return (
    <div
      className={`estimate-cost${isDesktop ? " estimate-cost--desktop" : ""}${isPage ? " estimate-cost--page" : ""}`}
    >
      {isDesktop && !isPage && vehicle && (
        <div className="estimate-cost__vehicle-banner">
          {isMediumTruck && <div className="mostPopularRibbon">Most Popular</div>}
          <div className="estimate-cost__vehicle-banner-inner">
            {truckImageSrc && (
              <img
                src={truckImageSrc}
                alt={vehicle.vehicleDisplayName || vehicle.vehicleName}
                className="estimate-cost__vehicle-img"
              />
            )}
            <div className="estimate-cost__vehicle-meta">
              <h2 className="estimate-cost__vehicle-name">
                {vehicle.vehicleName || vehicle.vehicleDisplayName}
                {menBadge ? (
                  <span className="estimate-cost__men-badge">{menBadge}</span>
                ) : null}
              </h2>
            </div>
          </div>
        </div>
      )}

      <div className="estimate-cost__header">
        <h1 id="opf-estimate-sheet-title" className="estimate-cost-modal__title">
          Estimated Cost &amp; Time
        </h1>
        {!isDesktop && !isPage && (
          <p className="estimate-cost-modal__subtitle">
            <span>Pay As You Go!</span> No Minimum Hours to book
          </p>
        )}
      </div>

      {sliderFirst ? (
        <>
          {sliderBlock}
          {breakdown}
        </>
      ) : (
        <>
          {breakdown}
          {sliderBlock}
        </>
      )}
    </div>
  );
};

export default EstimateCostSlider;
