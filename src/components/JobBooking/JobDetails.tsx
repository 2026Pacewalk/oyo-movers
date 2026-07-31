"use client";

import { useEffect, useState } from "react";
import "./jobdetails.scss";
import { useJobBooking } from "./JobBookingHook";
import { Accordion } from "react-bootstrap";
import { ImLocation2 } from "react-icons/im";
import { BsInfoCircle } from "react-icons/bs";
import moment from "moment";
import Image from "../Image";
import Map from "../GoogleMap";
import EstimateCostTimeModal from "@/components/EstimateCostTimeModal";
import { removeCountryFromAddress } from "@/utils/helper";
import { getS3VehicleImageUrlWithoutDimensions } from "@/utils/vehicleS3Images";
import { errorToast, successToast } from "@/lib/toaster";
import { getQuotationId, secureQuotationWithDeposit } from "@/utils/secureQuotation";
import { getCookie } from "@/lib/cookies";
import { tokenKey } from "@/config";
import { useUserData } from "../User/UserDataHook";
import { useMediaQuery } from "@/utils/hooks/useMediaQuery";
import {
  buildConfirmationSnapshot,
  saveBookingConfirmationSnapshot,
} from "@/utils/bookingConfirmationStorage";
import { PaymentModal, usePaymentModal } from "@/components/PaymentModal";
export const formatTime = (minutes: number) => {
  if (minutes < 60) {
    return minutes + " min";
  } else {
    const duration = moment.duration(minutes, 'minutes');
    const hours = duration.hours();
    const mins = duration.minutes();
    return hours + " Hr" + (mins > 0 ? " " + mins + " min" : "");
  }
}

const getSubtitleByTitle = (data: any, title: string) => {
  for (const key in data) {
    if (data[key].input.title === title) {
      return data[key].input.subtitle;
    }
  }
  return null;
};

const toInt = (value: any, fallback = 0) => {
  const parsed = typeof value === "number" ? value : parseInt(String(value ?? ""), 10);
  return Number.isFinite(parsed) ? parsed : fallback;
};

const inferStairsOrLift = (level: string | undefined, liftBooked: boolean, flights: number) => {
  if (liftBooked) return "lift";
  const lvl = (level || "").toLowerCase();
  if (lvl.includes("elevator") || lvl.includes("lift")) return "lift";
  if (flights > 0 || lvl.includes("flight")) return "stairs";
  return "stairs";
};

const mapAddressBlock = (block: any) => {
  if (!block) return null;

  const level = block?.level || "";
  const flights = toInt(block?.flightOfStairs, 0);
  const liftBooked = Boolean(block?.liftBooking);

  return {
    additionalInformation: block?.additionalInformation || "",
    address: block?.address?.addressLine1 || "",
    lat: block?.address?.latitude ?? null,
    lng: block?.address?.longitude ?? null,
    level,
    stairsOrLift: inferStairsOrLift(level, liftBooked, flights),
    liftBooked,
    ...(liftBooked ? { liftBookingTime: block?.bookingTimeSlot || "" } : {}),
    numberOfFlights: flights,
  };
};

const mapStops = (stops: any[]) =>
  Array.isArray(stops)
    ? stops.map((stop: any) => ({
      id: stop?.id || "",
      ...mapAddressBlock(stop),
    }))
    : [];

const buildQuotationPayload = (
  jobBooking: any,
  services: any,
  availableRequirements: any,
  couponDetails: any
) => {
  const selectedVehicle = Array.isArray(availableRequirements)
    ? availableRequirements.find(
      (item: any) => String(item?._id) === String(jobBooking?.vehicleType)
    )
    : null;

  const selectedService = Array.isArray(services)
    ? services.find(
      (item: any) => String(item?._id) === String(jobBooking?.moverService)
    )
    : null;

  const howFurnished = jobBooking?.howFurnished ?? "";
  const spaceInProperty = jobBooking?.spaceInProperty ?? "";

  return {
    houseDetails: howFurnished
      ? {
        numberOfRooms: spaceInProperty,
        furnishingLevel: howFurnished,
      }
      : null,
    officeDetails: !howFurnished
      ? {
        size: spaceInProperty,
      }
      : null,
    promoCode: couponDetails?.code || "",
    serviceType: selectedService?.name,
    items: jobBooking?.listOfItems ?? [],
    distance: jobBooking?.distance,
    pickup: mapAddressBlock(jobBooking?.pickUpLocation),
    dropoff: mapAddressBlock(jobBooking?.dropOffLocation),
    stops: mapStops(jobBooking?.stopOvers),
    scheduledAt: jobBooking?.pickUpDate,
    timeSlot: {
      startTime: jobBooking?.pickupStartTime || "00:00",
      endTime: jobBooking?.pickupEndTime || "00:00",
    },
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
    teamRequirements: {
      movers: 1,
      helpers: selectedVehicle?.helperCount,
    },
    vehicleRequirements: {
      type: selectedVehicle?.vehicleType,
    },
    ...(jobBooking?.noteForMover
      ? {
        driverNotes: jobBooking?.noteForMover,
        customerNotes: jobBooking?.noteForMover,
      }
      : {}),
    dismantlingReassemblingRequired: Boolean(jobBooking?.dismantlingAndAssembly),
    packingAndMoving: Boolean(jobBooking?.packingAndUnpacking),
    photos: Array.isArray(jobBooking?.itemImages) ? jobBooking.itemImages : [],
    rawData: jobBooking,
  };
};

const JobDetails = () => {
  const {
    services,
    timeslots,
    availableRequirements,
    jobBooking,
    durationKm,
    setActiveStep,
    labour,
    moverServices,
    setCallOutFee,
    activeTab,
    activeStep,
    setActiveTab,
    couponDetails,
    quotation,
    setQuotation,
  } = useJobBooking();
  const { user } = useUserData();

  const movers = services;

  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const { show: paymentModalOpen, paymentLink: pendingPaymentLink, open: openPaymentModal, close: closePaymentModal } = usePaymentModal();
  const [isSecuringBooking, setIsSecuringBooking] = useState<boolean>(false);
  const [whatsIncludedOpen, setWhatsIncludedOpen] = useState<string | null>(activeStep === 0 ? "0" : null);
  const isMobile = useMediaQuery("(max-width: 991px)");

  const isLabourOnly = moverServices === "Labour Only";
  const isOfficeRelocate = moverServices === "Office Relocation";


  const openModal = () => {
    setModalOpen(true);
  };

  const {
    moverService,
    pickUpLocation,
    dropOffLocation,
    pickUpDate,
    pickUpSlot,
    spaceInProperty,
    howFurnished,
    vehicleType,
    stopOvers,
    listOfItems,
    dismantlingAndAssembly,
    packingAndUnpacking,
    distance,
    callOutFee,
  } = jobBooking;

  const service = Array.isArray(movers) && movers?.find((mover: any) => mover._id === moverService);

  // Find timeslot from the new API structure
  const findTimeslotById = (id: string) => {
    const allSlots = [
      ...(timeslots?.today?.slots || []),
      ...(timeslots?.tomorrow?.slots || []),
      ...(timeslots?.custom?.slots || [])
    ];
    return allSlots.find((slot: any) => slot._id === id);
  };

  const timeslot = findTimeslotById(pickUpSlot);
  const vehicle = Array.isArray(availableRequirements) && availableRequirements.find((vehicle: any) => vehicle._id === vehicleType);
  const selectedService = isLabourOnly ? service : vehicle;
  const priceCardTruckSrc =
    vehicle &&
    (getS3VehicleImageUrlWithoutDimensions({
      vehicleName: vehicle.vehicleName,
      vehicleDisplayName: vehicle.vehicleDisplayName,
      moverRequired: vehicle.moverRequired,
    }) ||
      vehicle.imgSrc);

  useEffect(() => {

    if (labour?.helperTime && isLabourOnly) {
      const time = (parseInt(labour.helperTime) * 60).toString();
      setCallOutFee(calculateEstimatePrice(time));
    } else {
      setCallOutFee(vehicle?.baseDeposit || 0);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [durationKm, labour, vehicle]);

  useEffect(() => {
    // Open "What's included" on step 0 (What's Your Next Move?), close on other steps
    if (activeStep === 0) {
      setWhatsIncludedOpen("0");
    } else {
      setWhatsIncludedOpen(null);
    }
  }, [activeStep]);

  // useEffect(() => {
  //   // Add class to body when on step 9 for CSS targeting
  //   if (activeStep === 9) {
  //     document.body.classList.add('booking-step-9');
  //   } else {
  //     document.body.classList.remove('booking-step-9');
  //   }
  //   return () => {
  //     document.body.classList.remove('booking-step-9');
  //   };
  // }, [activeStep]);

  const calculateEstimatePrice = (estimateTime: any) => {
    const extraPrice = selectedService?.moverPrice || 0;
    const price = selectedService?.baseDeposit || 0;
    const estimatedTime = Number(estimateTime || 0);
    const extraPriceType = selectedService?.timeUnit.split(" ");
    const howManyHelper: any = Number(labour.howManyHelper || 1);
    if (extraPriceType?.length) {
      if (extraPriceType[2] === "hour" && extraPriceType[1] === "half") {
        return ((estimatedTime / 30) * extraPrice + price) * howManyHelper;
      } else if (extraPriceType[0] === "per" && extraPriceType[1] === "min") {
        return (extraPrice * estimatedTime + price) * howManyHelper;
      } else if (extraPriceType[0] === "per" && extraPriceType[1] === "hour") {
        return (extraPrice * (isLabourOnly ? estimatedTime / 60 : estimatedTime) + price) * howManyHelper;
      }
    }
    return 0;
  };

  const isOfficeMoving: any =
    service?.name === "Office Relocation" &&
    service?.moreInpuiry?.inputs &&
    Object?.values(service?.moreInpuiry?.inputs)?.find(({ input }: any) => input?.title === spaceInProperty);

  const jobTimeEstimate = getSubtitleByTitle(service?.moreInpuiry?.inputs, spaceInProperty);

  const isUserLoggedIn = Boolean(user?.email);

  const handleSecureBooking = async () => {
    if (isSecuringBooking) return;

    try {
      setIsSecuringBooking(true);

      const token = await getCookie(tokenKey);
      if (!token) {
        errorToast("Please login to continue");
        setActiveStep(8);
        return;
      }

      const payload = buildQuotationPayload(
        jobBooking,
        services,
        availableRequirements,
        couponDetails
      );

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

  const closeBookingDrawer = () => {
    document.getElementById("bookingDetailsRightPannel")?.classList.remove("showDrawer");
  };

  const bookingDrawerCloseButton = (
    <div className="jobdetails-close-button-wrapper">
      <button
        type="button"
        className="jobdetails-close-button"
        onClick={closeBookingDrawer}
        aria-label="Close booking details"
      >
        <Image src="/close.svg" alt="" />
      </button>
    </div>
  );

  return (
    <div className={`bookingDetails ${activeStep == 1 ? "mcb" : "mcs"} ${activeStep == 0 ? "step-1" : ""} ${activeStep == 7 ? "step-7" : ""} ${activeStep == 9 ? "step-9" : ""}`}>
      <Map />
      <div className="accordion-section">
        <Accordion defaultActiveKey="1" activeKey={activeTab}>
          {activeStep === 1 && (
            <div className="distancesection">
              {distance && (
                <h3 className="distanceTitle ">
                  Distance - <span>{distance}</span>
                </h3>
              )}
              <div className="d-flex align-items-center justify-content-between distanceTime">
                {(durationKm || labour?.howWeHelp) && (
                  <p>Drive - {durationKm || (labour?.howWeHelp && `${labour.helperTime}hrs`)}</p>
                )}
              </div>
            </div>
          )}
          {activeStep !== 1 && pickUpLocation?.address?.locality && (
            <div className="bookingData">
              {activeStep === 9 && (
                <div className="review-booking-header">
                  <h2 className="review-booking-heading">Review Your Booking</h2>
                  {bookingDrawerCloseButton}
                </div>
              )}
              <div className="distancesection">
                {distance && (
                  <h3 className="distanceTitle ">
                    Distance - <span>{distance}</span>
                  </h3>
                )}
                <div className="distancesection__right">
                  {(durationKm || labour?.howWeHelp) && (
                    <h3 className="distanceTitle ">
                      Drive - <span>{durationKm || (labour?.howWeHelp && `${labour.helperTime}hrs`)}</span>
                    </h3>
                  )}
                  {activeStep !== 9 && bookingDrawerCloseButton}
                </div>
              </div>
              <div style={{ display: "flex", gap: "12px" }}>
                <h2> Pickup and Delivery Address</h2>
                <div className="bookingDetailsRight">
                  <div className="editdetails" onClick={() => setActiveStep(1)}>
                    <Image src="/edit-rectangle.svg" alt="edit" />
                  </div>
                </div>
              </div>
              <Address
                title={isLabourOnly ? "Locations" : "Pickup and Delivery Address"}
                address={pickUpLocation.address}
                onEdit={() => setActiveStep(1)}
                pickUpLocation={pickUpLocation}
                dropOffLocation={dropOffLocation}
                stopOvers={stopOvers}
                isLabourOnly={isLabourOnly}
              />
              {service && (
                <div className="bookingDetailsContainer">
                  <div className="bookingDetailsItem ">
                    <div className="bookingItemContainer">
                      <div className="movingDetails">
                        <Image src="./details.svg" alt="" /> <h2> Moving Details</h2>
                      </div>
                      <p className="noteDetails">
                        {service.name}
                        {spaceInProperty && (
                          <>
                            <label>{spaceInProperty}</label>
                            {isOfficeMoving?.input?.info && <label>{` ${isOfficeMoving?.input?.info || ""}`}</label>}
                          </>
                        )}
                        {howFurnished && <label>{howFurnished}</label>}
                      </p>
                      <p className="noteDetails">
                        {labour?.howWeHelp && <label>{labour.howWeHelp}</label>}
                        {labour?.howManyHelper && <label>{labour.howManyHelper} Helpers</label>}
                        {labour?.helperTime && labour?.howWeHelp && <label> {labour.helperTime} Hours</label>}
                      </p>
                    </div>

                    <div className="editdetails" onClick={() => setActiveStep(0)}>
                      <Image src="/edit-rectangle.svg" alt="" />
                    </div>
                  </div>
                </div>
              )}


              {listOfItems && (
                <div className="bookingDetailsContainer">
                  <div className="bookingDetailsItem">
                    <div className="bookingItemContainer">
                      <div className="movingDetails">
                        <Image src="./notes.svg" alt="" /> <h2>Notes and Photos</h2>
                      </div>
                      <p className="noteDetailsList mb-1">{listOfItems}</p>
                      <p className="noteDetails">
                        {dismantlingAndAssembly && <label>Dismantling / Re-assembling Required</label>}
                        {packingAndUnpacking && <label>Packing Required</label>}
                      </p>
                    </div>
                    <div className="bookingDetailsRight">
                      <div className="editdetails" onClick={() => setActiveStep(6)}>
                        <Image src="/edit-rectangle.svg" alt="" />
                      </div>
                    </div>
                  </div>
                </div>
              )}
              {pickUpDate && (
                <div className="bookingDetailsContainer">
                  <div className="bookingDetailsItem">
                    <div className="bookingItemContainer">
                      <span className="datetimeInformation">
                        <Image src="/clender.svg" alt="edit" />
                        {moment(pickUpDate, "MM-DD-YYYY").format("DD-MM-YYYY")} ({moment(pickUpDate, "MM-DD-YYYY").format("ddd")})
                        {timeslot?.name && <label> {timeslot?.name}</label>}
                      </span>
                    </div>
                    <div className="bookingDetailsRight">
                      <div className="editdetails" onClick={() => setActiveStep(5)}>
                        <Image src="/edit-rectangle.svg" alt="" />
                      </div>
                    </div>
                  </div>
                </div>
              )}
              {/* {((vehicleType && vehicle) || (isLabourOnly && labour?.howManyHelper)) && (
                <div className="bookingDetailsContainer">
                  <div className="quoteContainer">
                    <p>{isOfficeRelocate ? "Your Quote" : "Your Price"}</p>
                    <div className="quoteInner">
                      <div>
                        <h2 className="mb-1">👬🚚 {vehicle?.vehicleDisplayName || moverServices}</h2>

                        <h3 className="detailsPrices">
                          ${vehicle?.moverPrice || service?.price}
                          <span> {(vehicle?.extraPriceType || service?.priceType) === "30 min" ? '/ half hr' : vehicle?.timeUnit || service?.priceType} </span>
                        </h3>
                      </div>
                    </div>
                    <div className="detailPriceQuote">
                      <div>
                        <p>
                          💰 Pay As You Go ! <span>No Minimum Hours To book</span>
                        </p>
                      </div>
                    </div>

                    <div
                      onClick={openModal}
                      className="d-flex align-items-center justify-content-center gap-2 estimatesection"
                    >
                      <BsInfoCircleFill />
                      <span className="calculateEstimate">
                        <u>Calculate My Estimate!</u>👈
                      </span>
                    </div>


                  </div>

                  <CustomModal
                    title={``}
                    close={() => setModalOpen(false)}
                    show={modalOpen}
                    showFooter={false}
                    cancelText="Cancel"
                    showSaveButton="Confirm"
                    mainClassName="fareModalwrapper"
                  >
                    <div className="totalFareModal">
                      <div className="totalFareCustom">
                        <h3 className="d-flex align-items-center justify-content-center mb-3 fw-bold">
                          👬🚚 {vehicle?.vehicleDisplayName || moverServices}
                        </h3>
                        <EstimateSlider vehicalData={availableRequirements} jobBooking={jobBooking} />
                      </div>
                    </div>
                  </CustomModal>
                </div>)} */}

              {((vehicleType && vehicle) || (isLabourOnly && labour?.howManyHelper)) && (
                <div className="review-section">
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
                          <span className="price-value">${vehicle?.moverPrice || service?.price}</span>
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

                  {selectedService?.baseDeposit && activeStep >= 8 && isUserLoggedIn ? (
                    <div className="jobdetails-deposit-cta">
                      <button
                        type="button"
                        className="jobdetails-deposit-btn"
                        onClick={handleSecureBooking}
                        disabled={isSecuringBooking}
                      >
                        {isSecuringBooking
                          ? "Processing..."
                          : <>Secure my booking with a <strong>${selectedService.baseDeposit}</strong> refundable deposit</>}
                      </button>
                      <p className="jobdetails-deposit-note">
                        Change or cancel up to 24 hrs before start - Full refund. Pay balance directly to movers on move day.
                      </p>
                    </div>
                  ) : null}

                  <EstimateCostTimeModal
                    show={modalOpen}
                    onClose={() => setModalOpen(false)}
                    vehicalData={availableRequirements}
                    jobBooking={jobBooking}
                    variant={isMobile ? "mobile" : "desktop"}
                  />
                </div>
              )}

            </div>)}



          {/* <Accordion.Item eventKey="0" onClick={() => setActiveTab(activeTab === "0" ? "1" : "0")}>
            <Accordion.Header>What&apos;s included </Accordion.Header>
            <Accordion.Body>
              <div className="includedsection">
                <Image src="/filltick.svg" alt="Pay As You Go!!" />
                <div>
                  <h3>Pay As You Go!!</h3>
                  <p>Simple & upfront pricing, no hidden surprises,</p>
                </div>
              </div>
              <div className="includedsection">
                <Image src="/filltick.svg" alt="Experience Verified Movers" />
                <div>
                  <h3>Experience Verified Movers</h3>
                  <p>Varified by our 5 step quality assurance Process</p>
                </div>
              </div>
              <div className="includedsection">
                <Image src="/filltick.svg" alt="Pay As You Go!!" />
                <div>
                  <h3>Protective Covering</h3>
                  <p>Your Items will be protected by Heavy Duty Blankets.</p>
                </div>
              </div>
              <div className="includedsection">
                <Image src="/filltick.svg" alt="Pay As You Go!!" />
                <div>
                  <h3>Stress-Free Moving</h3>
                  <p>We do Loading, Moving, Unloading, You enjoy your coffee.</p>
                </div>
              </div>
            </Accordion.Body>
          </Accordion.Item> */}

          {/* Card 3: What's Included - Only show on steps 1-8, not on step 9 */}
          {activeStep !== 9 && (
            <div className="whats-included-card">
              <Accordion activeKey={whatsIncludedOpen ?? ""} onSelect={(e: any) => setWhatsIncludedOpen(e === whatsIncludedOpen ? null : e)}>
                <Accordion.Item eventKey="0">
                  <Accordion.Header className="whats-included-accordion-header">
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
          )}

        </Accordion>
      </div>

      <PaymentModal
        show={paymentModalOpen}
        paymentLink={pendingPaymentLink}
        onClose={closePaymentModal}
        quotationId={getQuotationId(quotation)}
      />
    </div>
  );
};

const Address = ({ address, onEdit, pickUpLocation, dropOffLocation, stopOvers, isLabourOnly }: any) => {
  const haveNestedPickup = pickUpLocation?.level === "Stairs";
  const haveNestedDropOffLocation = dropOffLocation?.level === "Stairs";
  const dropOffLocationAddress = dropOffLocation?.address;

  return (
    <div className="bookingDetailsContainer">
      <div className="bookingDetailsItem">
        <div className="bookingItemContainer">
          <div className="bookingStep">
            {isLabourOnly ? <ImLocation2 /> : <Image src="/pickup.png" alt="Pickup" />}
            <div className="bookingStepInnter">
              <div className="bookingAddressStep">
                <span className="warpAddress">{removeCountryFromAddress(address?.addressLine1)}</span>
              </div>

              <div className="droplocationlabel">
                {Array.isArray(address) ? null : ( // If address is an array, don't render the label
                  <>
                    {pickUpLocation.level && <label>{pickUpLocation.level}</label>}
                    {haveNestedPickup && <label>{pickUpLocation.flightsOrLiftBooked} Flight</label>}
                  </>
                )}
              </div>
            </div>
          </div>

          {Array.isArray(stopOvers) &&
            // If stopOvers is an array (multiple addresses), map over each address
            stopOvers.map((addr: any, index: any) => (
              <div key={index} className="bookingStep pl-2">
                <Image src="/stop-circle.svg" alt="Pickup" />
                <div className="bookingStepInnter">
                  <span className="warpAddress">{removeCountryFromAddress(addr?.address?.addressLine1)}</span>
                  <div className="droplocationlabel">
                    {Array.isArray(addr) ? null : ( // If address is an array, don't render the label
                      <>
                        {addr?.address?.level && <label>{addr?.address?.level} </label>}
                        {addr?.address?.level === "Stairs" && (
                          <label>{addr?.address?.flightsOrLiftBooked} Flight</label>
                        )}
                      </>
                    )}
                  </div>
                </div>
              </div>
            ))}
          {!isLabourOnly && dropOffLocationAddress?.administrative_area_level_1 && (
            <div className="bookingStep">
              <Image src="/delivery.png" alt="Pickup" />
              <div className="bookingStepInnter">
                <span className="warpAddress"> {removeCountryFromAddress(dropOffLocationAddress?.addressLine1)}</span>
                <div className="droplocationlabel">
                  {Array.isArray(dropOffLocation) ? null : ( // If address is an array, don't render the label
                    <>
                      {dropOffLocation.level && <label >{dropOffLocation.level} </label>}
                      {haveNestedDropOffLocation && <label>{dropOffLocation.flightsOrLiftBooked} Flight</label>}
                    </>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
        {/* <div className="bookingDetailsRight">
          <div className="editdetails" onClick={onEdit}>
            <Image src="/edit-rectangle.svg" alt="edit" />
          </div>
        </div> */}
      </div>
    </div>
  );
};

export default JobDetails;
