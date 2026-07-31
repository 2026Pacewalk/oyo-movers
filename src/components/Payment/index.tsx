"use client";

// "use client";
// import { IoMdArrowForward } from "react-icons/io";

// import "./payment.scss";
// import Input from "../Input";
// import IconButton from "../IconButton";
// import StripePaymentDetails from "./form";
// import { Container } from "react-bootstrap";
// import { useJobBooking } from "../JobBooking/JobBookingHook";
// import { errorToast, successToast } from "@/lib/toaster";
// import { useState } from "react";
// import { applyCoupon, createPayment } from "@/lib/serverAction/bookingAction";
// import { removeCard } from "@/lib/serverAction/paymentAction";
// import Image from "../Image";
// import { useRouter } from "next/navigation";

// const Payment = ({ paymentCards, rebooking, isCompletePayment }: any) => {
//   const [isLoading, setIsLoading] = useState(false);
//   const [serachCoupon, setSerachCoupon] = useState<string>("");
//   const router = useRouter();
//   const [isCoupApplyLoading, setIsCoupApplyLoading] = useState<boolean>(false);
//   const { activeStep, cardId, setCardId, price, jobBooking, labour, setCouponId, reBooking, couponId, couponDetails, setCouponDetails, quotation } =
//     useJobBooking();

//   const handelRemoveClick = async (cardId: string) => {
//     await removeCard(cardId).then((res: any) => {
//       if (res.status === 200) {
//         successToast("Card Removed Successfully");
//       }
//     });
//   };

//   const { distance, user, ...rest } = jobBooking;

//   const getCreatePaymentPrice = () => {
//     if (rebooking) {
//       return reBooking?.howManyHelper ? price : reBooking.callOutFee;
//     } else {
//       return jobBooking.callOutFee;
//     }
//   };
//   const handelCoupanApply = () => {
//     setIsCoupApplyLoading(true);
//     applyCoupon(serachCoupon)
//       .then((res: any) => {
//         if (res?.status === 200) {
//           setCouponId(res?.data?._id || res?.data);
//           setCouponDetails(res?.data);
//           successToast("Coupon Applied Successfully");
//         } else {
//           errorToast("Either Promo code is not valid, or expired.");
//         }
//       })
//       .finally(() => setIsCoupApplyLoading(false));
//   };
//   const removeCouponCodeHandler = () => {
//     successToast("Coupon Removed Successfully");
//     setCouponId("");
//     setCouponDetails(null);
//     setSerachCoupon("");
//   };

//   return (
//     <Container>
//       <div className="mainContainerPayment">

//         <h2>Payment Details</h2>
//         {/* {activeStep === 9  ? ( */}
//         <div className="depositeContainer mb-3">
//           <p>Deposit Required to Confirm Booking</p>
//           <h5 className="depositeCardHeading">
//             {/* Secure Booking for - <span>${jobBooking?.callOutFee}</span> */}
//             Secure Booking for - <span>$50</span>
//           </h5>
//           <p>Your deposit will be deducted in final invoice. You can also cancel your job anytime.</p>
//         </div>
//         {/* ) : (
//             <></>
//           )} */}

//         {/* <p>
//           Payment will not be processed until the completion of the job but we need your card details to secure your
//           booking. You can also cancel your booking at any time.
//         </p> */}
//         <div className="promoCodeInput gap-3">
//           <div className="promoCodeInput__innerTab w-100 position-relative">
//             <Input
//               isFloating={true}
//               className={`promoCodeInput__innerTab__inputField ${couponId ? 'has-coupon' : ''}`}
//               label={"Enter Promo Code"}
//               value={serachCoupon}
//               placeholder={"Enter Promo Code"}
//               onChange={(e: any) => setSerachCoupon(e.target.value)}
//               disabled={Boolean(couponId)}
//             />
//             {couponId && couponDetails ? (
//               <div className="egPromocode d-flex align-items-center justify-content-between">
//                 <div className="d-flex align-items-center gap-2">
//                   <span className="promo-badge">{couponDetails.code || serachCoupon}</span>
//                   <span className="discount-text">
//                     {couponDetails.discountAmount}
//                     {couponDetails.discountType === 'percentage' ? '%' : '$'} OFF
//                   </span>
//                 </div>
//                 <Image 
//                   src="/close.svg" 
//                   alt="remove coupon" 
//                   className="egPromocode__img cursor-pointer" 
//                   onClick={removeCouponCodeHandler} 
//                 />
//               </div>
//             ) : (
//               <IconButton
//                 title="Apply"
//                 icon={<IoMdArrowForward />}
//                 onClick={() => handelCoupanApply()}
//                 disabled={isCoupApplyLoading || Boolean(couponId)}
//                 isLoading={isCoupApplyLoading}
//               />
//             )}
//           </div>
//         </div>

//         <div className="paymentCardInput">
//           <StripePaymentDetails isCompletePayment={isCompletePayment} rebooking={rebooking} />
//           <div className="d-flex align-items-center justify-content-between gap-2 paymentStripeHead">
//             <div className="d-flex align-items-center gap-2">
//               <Image src="/visa.png" alt="visa" className="paymentCardInput__visa" />
//               <Image src="/mastercard.png" alt="mastercard" className="paymentCardInput__img" />
//               <Image src="/american.png" alt="american" className="paymentCardInput__img" />
//             </div>
//             <p>
//               Powered by <b>stripe</b>
//             </p>
//           </div>
//         </div>
//         {/* {paymentCards?.length ? (
//           <div className="cardSelection">
//             <h3 className="mb-3">Select Already Added Cards</h3>
//             {paymentCards?.map((item: any) => {
//               const expMonth =
//                 item?.card?.exp_month.toString().length > 1 ? item?.card?.exp_month : `0${item?.card?.exp_month}`;
//               const expYear = item?.card?.exp_year.toString();

//               return (
//                 <div
//                   onClick={() => setCardId(item?.id)}
//                   className={`cardSelection__card ${cardId === item.id ? "selected" : ""}`}
//                   key={item?.id}
//                 >
//                   <div className="cardSelection__card__left">
//                     <Image src={`/${item?.card?.brand}.png`} alt="visa" className="paymentCardInput__visa" />
//                     <p>{`XXXX-XXXX-XXXX-${item?.card?.last4}`}</p>
//                   </div>
//                   <div className="cardSelection__card__right">
//                     <p>{`${expMonth} - ${expYear}`}</p>
//                     <Button type="submit" className="removeBtn" onClick={() => handelRemoveClick(item?.id)}>
//                       <Image src="/delete.svg" alt="delete" />
//                     </Button>
//                   </div>
//                 </div>
//               );
//             })}
//           </div>
//         ) : null} */}
//         {/* {/ TODO:will implement this in future /} */}
//         {/* <div className="checkBox">
//             <Form.Check
//               // checked={values.dismantlingAndAssembly}
//               name="payingCashMovingDay"
//               type={"checkbox"}
//               label={"Paying Cash on Moving day"}
//               id={`default-${1}`}
//               // onChange={handleChange}
//             />
//             <p>
//               We still need your card details to secure your booking! payments
//               will not be proceeded until the completion of your job.You can
//               still pay by Crash or PayID on movingday.
//             </p>
//           </div> */}
//         {/* {paymentCards?.length ? ( */}
//         {/* <div className="paymentcomplete">
//             <Button
//               isLoading={isLoading}
//               type="submit"
//               className="continueBtn"
//               // disabled={!cardId}
//               onClick={() => (isCompletePayment?.id ? handleCompletePayment() : handelPaymentSubmit())}
//             >
//               {isCompletePayment?.id ? "Complete Payment" : "Continue"}
//             </Button>
//           </div> */}
//         {/* ) : null} */}
//         <p className="getQuote">
//           <span className="d-flex justify-content-center mb-2"> Questions to Ask ? </span> Please call us on{" "}
//           <span> 1300 01 31 31 </span>
//         </p>
//       </div>
//     </Container>
//   );
// };

// export default Payment;







{/* ----------------------------------------------------------------------------- */ }










import { FaTag } from "react-icons/fa";
import { BsChatDots, BsChevronDown, BsInfoCircle } from "react-icons/bs";
import { FaTriangleExclamation } from "react-icons/fa6";
import { Icon } from "@iconify/react";
import { Accordion } from "react-bootstrap";
import moment from "moment";

import "./payment.scss";
import StripePaymentDetails from "./form";
import { Container } from "react-bootstrap";
import { useJobBooking } from "../JobBooking/JobBookingHook";
import { errorToast, successToast } from "@/lib/toaster";
import { useState } from "react";
import { applyCoupon } from "@/lib/serverAction/bookingAction";
import Image from "../Image";
import { useMediaQuery } from "@/utils/hooks/useMediaQuery";
import { getS3VehicleImageUrlWithoutDimensions } from "@/utils/vehicleS3Images";
import EstimateCostTimeModal from "@/components/EstimateCostTimeModal";
import { getQuotationId, secureQuotationWithDeposit } from "@/utils/secureQuotation";
import { getCookie } from "@/lib/cookies";
import { tokenKey } from "@/config";
import {
  buildConfirmationSnapshot,
  saveBookingConfirmationSnapshot,
} from "@/utils/bookingConfirmationStorage";
import { PaymentModal, usePaymentModal } from "@/components/PaymentModal";
import RestrictedItemsSheet from "@/components/JobBooking/RestrictedItemsSheet";
import WhatsIncludedSheet from "@/components/JobBooking/WhatsIncludedSheet";
import {
  OPF_RESTRICTED_DESKTOP_DISCLAIMER,
  OPF_RESTRICTED_DESKTOP_DISCLAIMER_LEAD,
  OPF_RESTRICTED_DESKTOP_HEAVY_NOTE,
  OPF_RESTRICTED_GRID_DESKTOP,
} from "@/components/JobBooking/OnePageMobile/opfRestrictedGridItems";
const Payment = ({ rebooking, isCompletePayment }: any) => {
  const [serachCoupon, setSerachCoupon] = useState<string>("");
  const [isCoupApplyLoading, setIsCoupApplyLoading] = useState<boolean>(false);
  const [showPromoCode, setShowPromoCode] = useState<boolean>(false);
  const [whatsIncludedOpen, setWhatsIncludedOpen] = useState<string | null>(null);
  const [restrictedItemsOpen, setRestrictedItemsOpen] = useState<string | null>(null);
  const [mobileCouponOpen, setMobileCouponOpen] = useState<boolean>(false);
  const [isSecuringBooking, setIsSecuringBooking] = useState<boolean>(false);
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const { show: paymentModalOpen, paymentLink: pendingPaymentLink, open: openPaymentModal, close: closePaymentModal } = usePaymentModal();
  const isMobile = useMediaQuery("(max-width: 991px)");
  const isTruckCardNarrow = useMediaQuery("(max-width: 767px)");

  const { 
    setCouponId, 
    couponId, 
    couponDetails, 
    setCouponDetails,
    jobBooking,
    timeslots,
    availableRequirements,
    activeStep,
    labour,
    moverServices,
    setActiveStep,
    services,
    quotation,
    setQuotation,
  } = useJobBooking();

  const {
    pickUpDate,
    pickUpSlot,
    vehicleType,
  } = jobBooking || {};

  // Find timeslot from the new API structure
  const findTimeslotById = (id: string) => {
    if (!id || !timeslots) return null;
    const allSlots = [
      ...(timeslots?.today?.slots || []),
      ...(timeslots?.tomorrow?.slots || []),
      ...(timeslots?.custom?.slots || [])
    ];
    return allSlots.find((slot: any) => slot._id === id);
  };

  const timeslot = findTimeslotById(pickUpSlot);
  const vehicle = Array.isArray(availableRequirements) && availableRequirements.find((vehicle: any) => vehicle._id === vehicleType);
  const priceCardTruckSrc =
    vehicle &&
    (getS3VehicleImageUrlWithoutDimensions({
      vehicleName: vehicle.vehicleName,
      vehicleDisplayName: vehicle.vehicleDisplayName,
      moverRequired: vehicle.moverRequired,
    }) ||
      vehicle.imgSrc);
  const isOfficeRelocate = moverServices === "Office Relocation";

  const openModal = () => {
    setModalOpen(true);
  };

  // Helper functions for building quotation payload
  const toInt = (v: any, fallback = 0) => {
    const n = typeof v === 'number' ? v : parseInt(String(v ?? ''), 10);
    return Number.isFinite(n) ? n : fallback;
  };

  const inferStairsOrLift = (level: string | undefined, liftBooked: boolean, flights: number) => {
    if (liftBooked) return 'lift';
    const lvl = (level || '').toLowerCase();
    if (lvl.includes('elevator') || lvl.includes('lift')) return 'lift';
    if (flights > 0 || lvl.includes('flight')) return 'stairs';
    return 'stairs';
  };

  const mapAddressBlock = (block: any) => {
    if (!block) return null;
    const lat = block?.address?.latitude ?? null;
    const lng = block?.address?.longitude ?? null;
    const level = block?.level || '';
    const flights = toInt(block?.flightOfStairs, 0);
    const liftBooked = !!block?.liftBooking;

    return {
      additionalInformation: block?.additionalInformation || '',
      address: block?.address?.addressLine1 || '',
      lat,
      lng,
      level,
      stairsOrLift: inferStairsOrLift(level, liftBooked, flights),
      liftBooked,
      ...(liftBooked ? { liftBookingTime: block?.bookingTimeSlot || '' } : {}),
      numberOfFlights: flights,
    };
  };

  const mapStops = (arr: any[]) =>
    Array.isArray(arr)
      ? arr.map((s) => ({
        id: s?.id || '',
        ...mapAddressBlock(s),
      }))
      : [];

  const buildQuotationPayload = () => {
    const selectedVehicle = Array.isArray(availableRequirements)
      ? availableRequirements.find((v: any) => String(v._id) == String(jobBooking?.vehicleType))
      : null;
    const selectedService = Array.isArray(services)
      ? services.find((v: any) => String(v._id) == String(jobBooking?.moverService))
      : null;
    
    const raw = jobBooking || {};
    const listOfItems = raw?.listOfItems ?? [];
    const howFurnished = raw?.howFurnished ?? "";
    const spaceInProperty = raw?.spaceInProperty ?? "";
    const pick = raw?.pickUpLocation ?? {};
    const drop = raw?.dropOffLocation ?? {};

    return {
      houseDetails: howFurnished ? {
        numberOfRooms: spaceInProperty,
        furnishingLevel: howFurnished
      } : null,
      officeDetails: !howFurnished ? {
        size: spaceInProperty
      } : null,
      promoCode: couponDetails?.code || "",
      serviceType: selectedService?.name,
      items: listOfItems,
      distance: raw.distance,
      pickup: mapAddressBlock(pick),
      dropoff: mapAddressBlock(drop),
      stops: mapStops(raw?.stopOvers),
      scheduledAt: raw.pickUpDate,
      timeSlot: { startTime: raw.pickupStartTime || '00:00', endTime: raw.pickupEndTime || '00:00' },
      pricing: {
        baseRate: selectedVehicle?.baseDeposit,
        hourlyRate: selectedVehicle?.moverPrice,
        estimatedHours: 4,
        additionalCharges: [],
        discount: 0,
        depositPercentage: 0,
        depositOptions: [],
      },
      selectedTeamPricing: {
        ...selectedVehicle,
      },
      teamRequirements: { movers: 1, helpers: selectedVehicle?.helperCount },
      vehicleRequirements: { type: selectedVehicle?.vehicleType },
      ...(raw?.noteForMover ? { driverNotes: raw?.noteForMover } : {}),
      ...(raw?.noteForMover ? { customerNotes: raw?.noteForMover } : {}),
      dismantlingReassemblingRequired: !!raw?.dismantlingAndAssembly,
      packingAndMoving: !!raw?.packingAndUnpacking,
      photos: Array.isArray(raw?.itemImages) ? raw.itemImages : [],
      rawData: raw
    };
  };

  const handleSecureBooking = async () => {
    if (isSecuringBooking) return;

    try {
      setIsSecuringBooking(true);

      const token = await getCookie(tokenKey);
      if (!token) {
        errorToast("Please login to continue");
        return;
      }

      const payload = buildQuotationPayload();
      const result = await secureQuotationWithDeposit({
        payload,
        existingQuotationInStore: quotation,
        quotationId: getQuotationId(quotation),
      });

      if (result.success && result.paymentLink) {
        if (result.quotation) setQuotation(result.quotation);
        const jobId =
          result.quotation?._id ||
          result.quotation?.quotationNumber ||
          result.quotation?.reference;
        saveBookingConfirmationSnapshot(buildConfirmationSnapshot(jobBooking, jobId));
        openPaymentModal(result.paymentLink, {
          quotationId: jobId,
        });
        return;
      }

      errorToast(result.error || "Failed to secure booking. Please try again.");
    } catch (error: any) {
      const message =
        error?.response?.data?.message || error?.message || "Failed to secure booking. Please try again.";
      errorToast(message);
    } finally {
      setIsSecuringBooking(false);
    }
  };

  const handelCoupanApply = () => {
    setIsCoupApplyLoading(true);
    applyCoupon(serachCoupon)
      .then((res: any) => {
        if (res?.status === 200) {
          setCouponId(res?.data?._id || res?.data);
          setCouponDetails(res?.data);
          successToast("Coupon Applied Successfully");
        } else {
          errorToast("Either Promo code is not valid, or expired.");
        }
      })
      .finally(() => setIsCoupApplyLoading(false));
  };
  const removeCouponCodeHandler = () => {
    successToast("Coupon Removed Successfully");
    setCouponId("");
    setCouponDetails(null);
    setSerachCoupon("");
  };

  return (
    <Container>
      <div className="payment-page-container">
        {/* Mobile-only: Date/Time Card */}
        {isMobile && pickUpDate && (
          <div className="payment-datetime-card">
            <div className="payment-datetime-content">
              <div className="payment-datetime-item">
                {/* <Image src="/clender.svg" alt="calendar" /> */}
                <span>{moment(pickUpDate, "MM-DD-YYYY").format("DD MMM (ddd)")}</span>
              </div>
              {timeslot?.name && (
                <div className="payment-datetime-item">
                  {/* <Image src="/clender.svg" alt="clock" /> */}
                  <span className="payment-timeslot-badge">{timeslot.name}</span>
                </div>
              )}
            </div>
            <div className="payment-datetime-edit" onClick={() => setActiveStep(5)}>
              <Image src="/edit-rectangle.svg" alt="edit" />
            </div>
          </div>
        )}

        {/* Mobile-only: Price Card */}
        {isMobile && vehicle && (
          <div className="payment-price-card-wrapper">
            <div className="price-card">
              <div className="price-card-header">
                <h2 className="price-title">{isOfficeRelocate ? "Your Quote" : "Your Price"}</h2>
                <span className="price-subtitle">Includes GST</span>
              </div>
              <div className="price-card-content">
                <div className="price-illustration">
                  <div className="truck-illustration">
                    <img
                      src={priceCardTruckSrc || vehicle?.imgSrc}
                      alt={vehicle?.vehicleDisplayName || "Truck"}
                      className="truck-image"
                    />
                  </div>
                </div>
                <div className="price-details">
                  <h3 className="service-name">{vehicle?.vehicleName} <span className="men-required"> {vehicle?.moverRequired}</span></h3>
                  <div className="price-amount">
                    <span className="price-value">${vehicle?.moverPrice}</span>
                    <span className="price-unit"> / 30 mins</span>
                  </div>
                </div>
              </div>
              <div className="estimate-link" onClick={openModal}>
                <BsInfoCircle className="info-icon" />
                <span>Estimated Cost & Time!</span>
              </div>
              <div className="estimate-notes-1">
                <p><span style={{ fontWeight: 'bold' }}>Pay As You Go!</span> No Minimum Hours to Book.</p>
              </div>
              <div className="estimate-notes-2">
                <p>Our 30 min call out travel fee applies to all local jobs (fuel included)</p>
              </div>
            </div>

            <WhatsIncludedSheet />

            <RestrictedItemsSheet />

            {/* Mobile-only: Have a Coupon Section */}
            <div className="mobile-coupon-section">
              <div 
                className="mobile-coupon-header"
                onClick={() => setMobileCouponOpen(!mobileCouponOpen)}
              >
                <div className="mobile-coupon-header-left">
                  <FaTag className="mobile-tag-icon" />
                  <h3 className="mobile-coupon-title">Have a Promo Code?</h3>
                </div>
                <BsChevronDown className={`mobile-chevron-icon ${mobileCouponOpen ? 'open' : ''}`} />
              </div>
              {mobileCouponOpen && (
                <div className="mobile-coupon-content">
                  <div className="mobile-coupon-input-container">
                    <input
                      type="text"
                      className="mobile-coupon-input"
                      value={serachCoupon}
                      placeholder="Please enter Promo Code"
                      onChange={(e: any) => setSerachCoupon(e.target.value)}
                      disabled={Boolean(couponId)}
                    />
                    {couponId && couponDetails ? (
                      <div className="mobile-egPromocode d-flex align-items-center justify-content-between">
                        <div className="d-flex align-items-center gap-2">
                          <span className="promo-badge">{couponDetails.code || serachCoupon}</span>
                          <span className="discount-text">
                            {couponDetails.discountAmount}
                            {couponDetails.discountType === 'percentage' ? '%' : '$'} OFF
                          </span>
                        </div>
                        <Image
                          src="/close.svg"
                          alt="remove coupon"
                          className="egPromocode__img cursor-pointer"
                          onClick={removeCouponCodeHandler}
                        />
                      </div>
                    ) : (
                      <button
                        className="mobile-apply-button"
                        onClick={() => handelCoupanApply()}
                        disabled={isCoupApplyLoading || Boolean(couponId)}
                      >
                        Apply
                      </button>
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* Mobile-only: Secure Booking Button */}
            <div className="mobile-secure-booking">
            <button 
              className="mobile-secure-booking-button"
              type="button"
              onClick={handleSecureBooking}
              disabled={isSecuringBooking}
            >
              {isSecuringBooking
                ? "Processing..."
                : <>Secure my booking with a <strong>$50</strong> refundable deposit</>}
            </button>
            <div>

            <p className="mobile-secure-booking-note">
                        Change or cancel up to 24 hrs before start - Full refund.
<br />
                       Pay balance directly to movers on move day.
                      </p>
</div>
                      </div>

            <EstimateCostTimeModal
              show={modalOpen}
              onClose={() => setModalOpen(false)}
              vehicalData={availableRequirements}
              jobBooking={jobBooking}
              variant={isMobile ? "mobile" : "desktop"}
            />
          </div>
        )}

        {/* Card 1: Promo Code and Deposit */}
        <div className="payment-card">
          {/* Promo Code Section */}
          <div className="promo-code-section">
            <div
              className="promo-code-header"
              onClick={() => setShowPromoCode(!showPromoCode)}
            >
              <div className="promo-code-header-left">
                <FaTag className="tag-icon" />
                <span className="promo-code-title">Have a Promo Code?</span>
              </div>
              <BsChevronDown className={`chevron-icon ${showPromoCode ? 'open' : ''}`} />
            </div>

            {showPromoCode && (
              <div className="promo-code-input-wrapper">
                <div className="promo-code-input-container">
                  <input
                    type="text"
                    className="promo-code-input"
                    value={serachCoupon}
                    placeholder="Please enter Promo Code"
                    onChange={(e: any) => setSerachCoupon(e.target.value)}
                    disabled={Boolean(couponId)}
                  />
                  {couponId && couponDetails ? (
                    <div className="egPromocode d-flex align-items-center justify-content-between">
                      <div className="d-flex align-items-center gap-2">
                        <span className="promo-badge">{couponDetails.code || serachCoupon}</span>
                        <span className="discount-text">
                          {couponDetails.discountAmount}
                          {couponDetails.discountType === 'percentage' ? '%' : '$'} OFF
                        </span>
                      </div>
                      <Image
                        src="/close.svg"
                        alt="remove coupon"
                        className="egPromocode__img cursor-pointer"
                        onClick={removeCouponCodeHandler}
                      />
                    </div>
                  ) : (
                    <button
                      className="apply-button"
                      onClick={() => handelCoupanApply()}
                      disabled={isCoupApplyLoading || Boolean(couponId)}
                    >
                      Apply
                    </button>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Deposit Section */}
          <div className="deposit-section">
            <p className="deposit-title">Deposit Required to confirm Booking</p>
            <div className="deposit-amount">
              <span className="deposit-value">$50</span>
              <span className="deposit-currency">AUD</span>
            </div>
            <div className="deposit-refund-info">
              <p>100% Peace of mind guaranteed. Change your mind? No Problems</p>
              <p>Your Deposit is fully refundable. No Questions Ask!</p>
            </div>
          </div>
        </div>

        {/* Card 2: Contact Information */}
        <div className="payment-card">
          <div className="contact-header">
            <Icon icon="streamline:customer-support-1" className="headphone-icon" />
            <span className="contact-title">Question to ask?</span>
          </div>
          <div className="contact-options">
            <div className="contact-options-item">
              <a href="tel:1300 01 31 31" className="contact-card">
                <Icon icon="ic:baseline-call" className="contact-icon" />
                <div className="contact-details">
                  <span className="contact-label"><span style={{ color: '#A8A8A8' }}>Call</span> 1300 01 31 31</span>

                </div>
              </a>
              <span className="contact-hours">MON - SAT  8AM - 5PM</span>
            </div>
            <span className="contact-divider">or</span>
            <div className="contact-options-item">
              <a href="sms:0467222212" className="contact-card">
                <BsChatDots className="contact-icon" />
                <div className="contact-details">
                  <span className="contact-label"><span style={{ color: '#A8A8A8' }}>Sms</span> 0467 222 212</span>
                </div>
              </a>
              <span className="contact-hours">7 Days - Till Late</span>
            </div>
          </div>
        </div>

        {/* Card 3: What's Included */}
        <div className="payment-card payment-card--whats-included">
          <Accordion activeKey={whatsIncludedOpen || ""} onSelect={(e: any) => setWhatsIncludedOpen(e === whatsIncludedOpen ? null : e)}>
            <Accordion.Item eventKey="0">
              <Accordion.Header className="whats-included-accordion-header">
                <img src="/images/confirmtion.png" alt="check" className="whats-included-icon" />
                What&apos;s included
              </Accordion.Header>
              <Accordion.Body>
                <div className="whats-included-content">
                  <div className="included-column">
                    <div className="included-item">
                      <span className="task-bullet-check">✓</span>
                      <span>Time Start at Pickup</span>
                    </div>
                    <div className="included-item">
                      <span className="task-bullet-check">✓</span>
                      <span>Assembly / Dismantling</span>
                    </div>
                    <div className="included-item">
                      <span className="task-bullet-check">✓</span>
                      <span>Trolly, Blankets and Straps</span>
                    </div>
                    <div className="included-item">
                      <span className="task-bullet-check">✓</span>
                      <span>Loading & Uploading</span>
                    </div>
                  </div>
                  <div className="included-column">
                    <div className="included-item">
                      <span className="task-bullet-check">✓</span>
                      <span>No Minimum Hours to Book</span>
                    </div>
                    <div className="included-item">
                      <span className="task-bullet-check">✓</span>
                      <span>Strong & Experienced</span>
                    </div>
                    <div className="included-item">
                      <span className="task-bullet-check">✓</span>
                      <span>5 Million Public Liability Insurance</span>
                    </div>
                    <div className="included-item">
                      <span className="task-bullet-check">✓</span>
                      <span>Stress-Free Moving</span>
                    </div>
                  </div>
                </div>
              </Accordion.Body>
            </Accordion.Item>
          </Accordion>
        </div>

        {!isMobile && (
          <div className="payment-card payment-card--restricted-desktop">
            <Accordion
              activeKey={restrictedItemsOpen || ""}
              onSelect={(e: any) => setRestrictedItemsOpen(e === restrictedItemsOpen ? null : e)}
            >
              <Accordion.Item eventKey="0">
                <Accordion.Header className="restricted-accordion-header">
                  <FaTriangleExclamation className="restricted-accordion-icon" aria-hidden />
                  <span className="restricted-accordion-heading">
                    <span className="restricted-accordion-title">Restricted Items</span>
                    <span className="restricted-accordion-subtitle">
                      The following items are not allowed to be transported
                    </span>
                  </span>
                </Accordion.Header>
                <Accordion.Body className="restricted-desktop-accordion-body">
                  <div className="restricted-desktop-panel">
                    <div className="restricted-desktop-grid">
                      {OPF_RESTRICTED_GRID_DESKTOP.map((item) => (
                        <div key={item.label} className="restricted-desktop-cell">
                          <img src={item.icon} alt="" className="restricted-desktop-icon" />
                          <span className="restricted-desktop-label">{item.label}</span>
                        </div>
                      ))}
                    </div>
                    <div className="restricted-desktop-footer">
                      <FaTriangleExclamation
                        className="restricted-desktop-footer-icon"
                        aria-hidden
                      />
                      <div className="restricted-desktop-footer-copy">
                        <p>
                          <strong>{OPF_RESTRICTED_DESKTOP_DISCLAIMER_LEAD}</strong>{" "}
                          <span className="restricted-desktop-footer-muted">
                            {OPF_RESTRICTED_DESKTOP_DISCLAIMER}
                          </span>
                        </p>
                        <p>
                          <strong>Heavy &amp; Oversized items:</strong>{" "}
                          <span className="restricted-desktop-footer-muted">
                            {OPF_RESTRICTED_DESKTOP_HEAVY_NOTE}
                          </span>
                        </p>
                      </div>
                    </div>
                  </div>
                </Accordion.Body>
              </Accordion.Item>
            </Accordion>
          </div>
        )}

        {/* Footer */}
        <div className="payment-footer">
          <a href="/cancel-policy" className="footer-link">Cancellation Policy</a>
          <a href="/customer-terms" className="footer-link">Terms</a>
          <a href="/privacy-policy" className="footer-link">Privacy</a>
        </div>
      </div>

      <PaymentModal
        show={paymentModalOpen}
        paymentLink={pendingPaymentLink}
        onClose={closePaymentModal}
        quotationId={getQuotationId(quotation)}
      />
    </Container>
  );
};

export default Payment;
