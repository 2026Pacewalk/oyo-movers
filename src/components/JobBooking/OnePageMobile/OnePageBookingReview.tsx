"use client";

import React, { useEffect, useState } from "react";
import moment from "moment";
import { BsChevronDown, BsInfoCircle } from "react-icons/bs";
import { FaPhone, FaLocationDot } from "react-icons/fa6";
import { LuClock7 } from "react-icons/lu";
import { useJobBooking } from "@/components/JobBooking/JobBookingHook";
import { getQuotationId, secureQuotationWithDeposit } from "@/utils/secureQuotation";
import { applyCoupon } from "@/lib/serverAction/bookingAction";
import { errorToast, successToast } from "@/lib/toaster";
import Image from "@/components/Image";
import { removeCountryFromAddress } from "@/utils/helper";
import { getS3VehicleImageUrlWithoutDimensions } from "@/utils/vehicleS3Images";
import { dateFormat } from "@/components/JobBooking/DateForPikup";
import Map from "@/components/GoogleMap";
import EstimateCostTimeModal from "@/components/EstimateCostTimeModal";
import "@/components/JobBooking/jobdetails.scss";
import { PaymentModal, usePaymentModal } from "@/components/PaymentModal";
import { buildPublicQuotationPayload } from "./buildQuotationPayload";
import { formatOpfVehicleLabel } from "./formatOpfVehicleLabel";
import RestrictedItemsSheet from "@/components/JobBooking/RestrictedItemsSheet";
import WhatsIncludedSheet from "@/components/JobBooking/WhatsIncludedSheet";
import {
  buildConfirmationSnapshot,
  resolveConfirmationJobId,
  resolveQuotationLookupId,
  saveBookingConfirmationSnapshot,
} from "@/utils/bookingConfirmationStorage";
import "./one-page-mobile.scss";

const SUPPORT_PHONE = "tel:1300 01 31 31";

const formatSlotRange = (start?: string, end?: string) => {
  if (!start || !end) return "";
  const fmt = (t: string) => {
    const parsed = moment(t, ["HH:mm", "H:mm", "h:mm A", "hh:mm A", "hh:mma"]);
    return parsed.isValid() ? parsed.format("hh:mma") : t;
  };
  return `${fmt(start)} - ${fmt(end)}`;
};

const formatAccessBadge = (location?: { level?: string }) => {
  return (location?.level || "ground").trim().toLowerCase();
};

const OnePageBookingReview: React.FC = () => {
  const [isSecuring, setIsSecuring] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const { show: paymentModalOpen, paymentLink: pendingPaymentLink, open: openPaymentModal, close: closePaymentModal } = usePaymentModal();
  const [discountOpen, setDiscountOpen] = useState(false);
  const [searchCoupon, setSearchCoupon] = useState("");
  const [isCouponApplyLoading, setIsCouponApplyLoading] = useState(false);

  const {
    jobBooking,
    services,
    timeslots,
    availableRequirements,
    couponId,
    couponDetails,
    setCouponId,
    setCouponDetails,
    quotation,
    setQuotation,
    moverServices,
  } = useJobBooking();

  const { pickUpLocation, dropOffLocation, stopOvers, pickUpDate, pickUpSlot, vehicleType } = jobBooking;

  const formatRouteAddress = (location?: { address?: { addressLine1?: string } }) =>
    removeCountryFromAddress(location?.address?.addressLine1) ||
    location?.address?.addressLine1 ||
    "";

  const routeStops = Array.isArray(stopOvers) ? stopOvers : [];

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  const findTimeslotById = (id: string) => {
    const allSlots = [
      ...(timeslots?.today?.slots || []),
      ...(timeslots?.tomorrow?.slots || []),
      ...(timeslots?.custom?.slots || []),
    ];
    return allSlots.find((slot: any) => slot._id === id);
  };

  const timeslot = findTimeslotById(pickUpSlot);
  const vehicle = Array.isArray(availableRequirements)
    ? availableRequirements.find((v: any) => v._id === vehicleType)
    : null;
  const vehicleLabel = vehicle ? formatOpfVehicleLabel(vehicle) : null;

  const pickupLine = formatRouteAddress(pickUpLocation);
  const dropoffLine = formatRouteAddress(dropOffLocation);

  const slotDisplay =
    timeslot?.name === "ASAP"
      ? "ASAP"
      : timeslot?.startTime && timeslot?.endTime
        ? formatSlotRange(timeslot.startTime, timeslot.endTime)
        : timeslot?.name || "";

  const truckImg =
    vehicle &&
    (getS3VehicleImageUrlWithoutDimensions({
      vehicleName: vehicle.vehicleName,
      vehicleDisplayName: vehicle.vehicleDisplayName,
      moverRequired: vehicle.moverRequired,
    }) ||
      vehicle.imgSrc);

  const wasPrice = vehicle?.wasPrice || vehicle?.originalPrice;

  const handleCouponApply = () => {
    const code = searchCoupon.trim();
    if (!code) {
      errorToast("Please enter a promo code.");
      return;
    }
    setIsCouponApplyLoading(true);
    applyCoupon(code)
      .then((res: any) => {
        if (res?.status === 200) {
          setCouponId(res?.data?._id || res?.data);
          setCouponDetails(res?.data);
          successToast("Coupon Applied Successfully");
        } else {
          errorToast("Either Promo code is not valid, or expired.");
        }
      })
      .finally(() => setIsCouponApplyLoading(false));
  };

  const removeCouponCodeHandler = () => {
    successToast("Coupon Removed Successfully");
    setCouponId("");
    setCouponDetails(null);
    setSearchCoupon("");
  };

  const handleSecureBooking = async () => {
    if (isSecuring) return;
    setIsSecuring(true);

    try {
      const email = jobBooking?.user?.email?.trim() ?? "";
      const phone = jobBooking?.user?.phone?.trim() ?? "";

      if (!email) {
        errorToast("Please complete contact details on the form.");
        return;
      }
      if (!phone) {
        errorToast("Please enter your phone number.");
        return;
      }

      const body = buildPublicQuotationPayload(
        jobBooking,
        services,
        availableRequirements,
        moverServices,
        couponDetails,
        timeslots
      );

      const result = await secureQuotationWithDeposit({
        payload: body,
        existingQuotationInStore: quotation,
        quotationId: getQuotationId(quotation),
        createEndpoint: "public/quotations",
        mode: "public",
        publicContact: { email, phone },
      });

      if (result.success && result.paymentLink) {
        if (result.quotation) setQuotation(result.quotation);
        const activeQuotation = result.quotation ?? quotation;
        const displayJobId = resolveConfirmationJobId(activeQuotation);
        const lookupId =
          resolveQuotationLookupId(activeQuotation) || getQuotationId(activeQuotation);
        saveBookingConfirmationSnapshot(buildConfirmationSnapshot(jobBooking, displayJobId));
        openPaymentModal(result.paymentLink, {
          quotationId: lookupId,
          displayJobId,
          confirmationPath: "/quick-booking/confirmation",
        });
        return;
      }

      errorToast(result.error || "Failed to secure booking.");
    } catch (error: any) {
      errorToast(error?.response?.data?.message || error?.message || "Failed to secure booking.");
    } finally {
      setIsSecuring(false);
    }
  };

  return (
    <div className="opf-review">
      <div style={{ display: "none" }}>
        <Map />
      </div>

      <div className="opf-review-body">
        <h1 className="opf-review-title">Review Your Booking</h1>
        <div className="opf-route-card">
          <div className="opf-route-track">
            <div className="opf-route-line">
              <FaLocationDot className="opf-route-icon opf-route-icon--pickup" aria-hidden />
              <div className="opf-route-line__content">
                <span className="route-text">{pickupLine || "Pickup address"}</span>
                <span className="opf-route-access-badge">{formatAccessBadge(pickUpLocation)}</span>
              </div>
            </div>
            <div className="route-connector" aria-hidden />
            {routeStops.map((stop: any, index: number) => {
              const stopLine = formatRouteAddress(stop);
              return (
                <React.Fragment key={stop?.id || `stop-${index}`}>
                  <div className="opf-route-line">
                    <FaLocationDot className="opf-route-icon opf-route-icon--stop" aria-hidden />
                    <div className="opf-route-line__content">
                      <span className="route-text">{stopLine || `Stop ${index + 1}`}</span>
                      <span className="opf-route-access-badge">{formatAccessBadge(stop)}</span>
                    </div>
                  </div>
                  <div className="route-connector" aria-hidden />
                </React.Fragment>
              );
            })}
            <div className="opf-route-line">
              <FaLocationDot className="opf-route-icon opf-route-icon--dropoff" aria-hidden />
              <div className="opf-route-line__content">
                <span className="route-text">{dropoffLine || "Drop-off address"}</span>
                <span className="opf-route-access-badge">{formatAccessBadge(dropOffLocation)}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="opf-datetime-card">
          <div className="opf-datetime-card__left">
            <img src="/clender.svg" alt="" width={16} height={15.5} className="opf-datetime-icon" />
            <span>
              {pickUpDate ? moment(pickUpDate, dateFormat).format("DD MMM (ddd)") : "—"}
            </span>
          </div>
          <div className="opf-datetime-card__right">
            <div className="slot-time">
              <LuClock7 className="slot-time__icon" aria-hidden />
              <span className="slot-time__text">{slotDisplay || "—"}</span>
            </div>
          </div>
        </div>

        {vehicle && (
          <div className="opf-price-card">
            <div className="price-header">
              Your Price <span>Includes GST</span>
            </div>
            <div className="price-row">
              <div className="price-row__text">
                <div className="service-name">
                  {vehicleLabel?.title || vehicle.vehicleName}
                  {vehicleLabel?.men ? <span className="men-badge">{vehicleLabel.men}</span> : null}
                </div>
                <div className="price-value">
                  <span className="price-main">
                    ${vehicle.moverPrice}
                    <span className="price-unit"> / 30mins. + Travel fee 30mins</span>
                  </span>
                  {wasPrice ? <span className="strike">${wasPrice}</span> : null}
                </div>
              </div>
              {truckImg && <img src={truckImg} alt="" className="truck-img" />}
            </div>
            <div className="price-card-divider" />
            <button type="button" className="estimate-link" onClick={() => setModalOpen(true)}>
              <span className="estimate-link__point" aria-hidden>👉</span>
              <BsInfoCircle /> Estimated Cost &amp; Time
            </button>
            <p className="payg-note">
              <strong>Pay As You Go!</strong> No Minimum Hours To book
            </p>
          </div>
        )}

        <WhatsIncludedSheet />

        <RestrictedItemsSheet />

        <div className="opf-discount-section">
          <button
            type="button"
            className="opf-discount-link"
            onClick={() => setDiscountOpen((open) => !open)}
            aria-expanded={discountOpen}
          >
            <img
              src="/images/discountcode.png"
              alt=""
              width={17}
              height={17}
              className="opf-discount-link__icon opf-action-icon"
            />
            <span className="opf-discount-link__text">Have a discount code?</span>
            <BsChevronDown className={`opf-discount-link__chevron ${discountOpen ? "open" : ""}`} />
          </button>
          {discountOpen && (
            <div className="opf-discount-panel">
              <div className="opf-discount-panel__row">
                <input
                  type="text"
                  className="opf-discount-panel__input"
                  value={searchCoupon}
                  placeholder="Please enter Promo Code"
                  onChange={(e) => setSearchCoupon(e.target.value)}
                  disabled={Boolean(couponId)}
                />
                {couponId && couponDetails ? (
                  <div className="opf-discount-applied">
                    <div className="opf-discount-applied__info">
                      <span className="opf-discount-applied__badge">
                        {couponDetails.code || searchCoupon}
                      </span>
                      <span className="opf-discount-applied__off">
                        {couponDetails.discountAmount}
                        {couponDetails.discountType === "percentage" ? "%" : "$"} OFF
                      </span>
                    </div>
                    <Image
                      src="/close.svg"
                      alt="Remove coupon"
                      className="opf-discount-applied__remove"
                      onClick={removeCouponCodeHandler}
                    />
                  </div>
                ) : (
                  <button
                    type="button"
                    className="opf-discount-panel__apply"
                    onClick={handleCouponApply}
                    disabled={isCouponApplyLoading || Boolean(couponId)}
                  >
                    {isCouponApplyLoading ? "Applying..." : "Apply"}
                  </button>
                )}
              </div>
            </div>
          )}
        </div>

        <button
          type="button"
          className="opf-deposit-btn"
          onClick={handleSecureBooking}
          disabled={isSecuring}
        >
          {isSecuring ? (
            "Processing..."
          ) : (
            <>
              Secure my booking with a <strong>${vehicle?.baseDeposit || 50}</strong> refundable deposit
            </>
          )}
        </button>
        <p className="opf-deposit-note">
          Change or cancel upto 24 hrs before start - Full Refund. Pay balance directly to movers on
          move day.
        </p>
      </div>

      <EstimateCostTimeModal
        show={modalOpen}
        onClose={() => setModalOpen(false)}
        vehicalData={availableRequirements}
        jobBooking={jobBooking}
      />

      <PaymentModal
        show={paymentModalOpen}
        paymentLink={pendingPaymentLink}
        onClose={closePaymentModal}
        quotationId={getQuotationId(quotation)}
        confirmationPath="/quick-booking/confirmation"
      />
    </div>
  );
};

export default OnePageBookingReview;
