import { Image } from "@/components";
import { useJobBooking } from "@/components/JobBooking/JobBookingHook";
import React, { useEffect, useMemo, useState } from "react";
import { TfiInfoAlt } from "react-icons/tfi";
import Link from "next/link";
import { s3ImageBaseUrl } from "@/config";
import EstimateCostSlider from "@/components/EstimateCostSlider";
import AddressInput from "@/components/GooglePlaceAutoCompelete";
import IconButton from "@/components/IconButton";
import { FaArrowRight, FaPlus } from "react-icons/fa6";
import { FaTag } from "react-icons/fa";
import { getServiceArea } from "@/lib/serverAction/authAction";
import { getCustomerZone, outOfAreaMessage } from "@/components/JobBooking/Location";
import VehicleInfoPopup from "@/components/VehicleInfoPopup";
import { formatOpfVehicleLabel } from "@/components/JobBooking/OnePageMobile/formatOpfVehicleLabel";
import {
  buildVehiclePopupFeatures,
  getVehiclePopupDetails,
} from "@/utils/vehiclePopupDetails";
import {
  getSelectVehicleCardImageSrcDesktop,
  getSelectVehiclePopupImageSrc,
  usesSelectVehicleDimensionlessImage,
} from "@/utils/vehicleS3Images";
import {
  navigateToBookingFromQuote,
  persistQuoteAddressesForBooking,
} from "@/utils/quoteAddressStorage";

const From = ({ vehicalData }: any) => {
  const { setVehicleType, jobBooking, setPickUpLocation, setDropOffLocation } = useJobBooking();
  const [areaZone, setAreaZone] = useState<any>([]);
  const [pickupError, setPickupError] = useState<string>("");
  const [dropoffError, setDropoffError] = useState<string>("");
  const [popupOpen, setPopupOpen] = useState<boolean>(false);
  const [selectedVehicle, setSelectedVehicle] = useState<any>(null);

  const defaultVehicle = useMemo(() => {
    if (!vehicalData?.length) return undefined;
    const mediumTruck = vehicalData.find((v: any) => {
      const name = String(v?.vehicleName || "").toLowerCase();
      const display = String(v?.vehicleDisplayName || "").toLowerCase();
      return (
        name === "med truck" ||
        name === "medium truck" ||
        display.includes("med truck") ||
        display.includes("medium truck")
      );
    });
    return mediumTruck || vehicalData[0];
  }, [vehicalData]);

  const vehicle = useMemo(
    () => {
      const selectedVehicle = vehicalData.find((vehicle: any) => vehicle._id === jobBooking.vehicleType) || defaultVehicle;
      console.log('Selected vehicle for pricing:', selectedVehicle);
      console.log('JobBooking vehicleType:', jobBooking.vehicleType);
      console.log('Available vehicles:', vehicalData);
      return selectedVehicle;
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [vehicalData, jobBooking.vehicleType, defaultVehicle]
  );
  useEffect(() => {
    if (!jobBooking.vehicleType && defaultVehicle?._id) {
      setVehicleType(defaultVehicle._id);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [vehicalData, defaultVehicle]);

  // Load service areas
  useEffect(() => {
    if (!areaZone || areaZone.length === 0) {
      getCustomerBookingZone();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getCustomerBookingZone = async () => {
    const zones: any = await getServiceArea();
    setAreaZone(zones?.data?.serviceAreas || []);
  };

  // Validate existing addresses when component loads
  useEffect(() => {
    if (areaZone && areaZone.length > 0) {
      if (jobBooking.pickUpLocation?.address?.latitude) {
        validateAddress(jobBooking.pickUpLocation.address, 'pickup');
      }
      if (jobBooking.dropOffLocation?.address?.latitude) {
        validateAddress(jobBooking.dropOffLocation.address, 'dropoff');
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [areaZone, jobBooking.pickUpLocation?.address, jobBooking.dropOffLocation?.address]);

  // Validate address against service area
  const validateAddress = async (address: any, type: 'pickup' | 'dropoff') => {
    if (!address?.latitude || !address?.longitude) {
      return;
    }

    try {
      const latNum = Number(address.latitude);
      const lngNum = Number(address.longitude);

      const isOutsideArea = await getCustomerZone({ lat: latNum, lng: lngNum }, areaZone);

      if (isOutsideArea) {
        if (type === 'pickup') {
          setPickupError(outOfAreaMessage);
        } else {
          setDropoffError(outOfAreaMessage);
        }
      } else {
        if (type === 'pickup') {
          setPickupError("");
        } else {
          setDropoffError("");
        }
      }
    } catch (error) {
      console.error('Error validating address:', error);
      if (type === 'pickup') {
        setPickupError("Error validating address");
      } else {
        setDropoffError("Error validating address");
      }
    }
  };

  const getVehicleImage = (vehicleType: any) => {
    if (!vehicleType) return "/light-truck-pricing.png";
    const objImgSrc: any = {
      "Lite Jobs": "/light-truck-pricing.png",
      "Small Truck": "/light-truck-pricing.png",
      "Medium Truck": "/small-truck-pricing.png",
      "Large Truck": "/medium-truck-pricing.png",
    };
    return objImgSrc[vehicleType];
  };

  const handleInfoClick = (vehicle: any, e: React.MouseEvent) => {
    e.stopPropagation();

    const details = getVehiclePopupDetails(vehicle);

    const vehicleData = {
      ...vehicle,
      imgSrc: getSelectVehiclePopupImageSrc(vehicle),
      features: buildVehiclePopupFeatures(details),
      capacity: details.capacity,
      space: details.space,
    };

    setSelectedVehicle(vehicleData);
    setPopupOpen(true);
  };

  const handleClosePopup = () => {
    setPopupOpen(false);
    setSelectedVehicle(null);
  };

  const handlePickupAddressSelect = (address: any) => {
    setPickUpLocation({
      id: "Pickup",
      address: address,
      level: "ground",
      flightOfStairs: "0",
      liftBooking: false,
      bookingTimeSlot: "",
    });
    // Validate pickup address
    validateAddress(address, 'pickup');
  };

  const handleDropoffAddressSelect = (address: any) => {
    setDropOffLocation({
      id: "dropOff",
      address: address,
      level: "ground",
      flightOfStairs: "0",
      liftBooking: false,
      bookingTimeSlot: "",
    });
    // Validate dropoff address
    validateAddress(address, 'dropoff');
  };

  const handlePickupClear = () => {
    setPickUpLocation({
      id: "Pickup",
      address: {},
      level: "ground",
      flightOfStairs: "0",
      liftBooking: false,
      bookingTimeSlot: "",
    });
    setPickupError("");
  };

  const handleDropoffClear = () => {
    setDropOffLocation({
      id: "dropOff",
      address: {},
      level: "ground",
      flightOfStairs: "0",
      liftBooking: false,
      bookingTimeSlot: "",
    });
    setDropoffError("");
  };

  const handleContinueBooking = () => {
    // Validate that required data is selected
    if (!jobBooking.vehicleType) {
      alert('Please select a vehicle type before continuing.');
      return;
    }

    if (!jobBooking.pickUpLocation?.address?.addressLine1) {
      alert('Please enter a pickup address before continuing.');
      return;
    }

    if (!jobBooking.dropOffLocation?.address?.addressLine1) {
      alert('Please enter a drop-off address before continuing.');
      return;
    }

    // Check for service area errors
    if (pickupError) {
      alert(`Pickup address: ${pickupError}`);
      return;
    }

    if (dropoffError) {
      alert(`Drop-off address: ${dropoffError}`);
      return;
    }

    persistQuoteAddressesForBooking(
      jobBooking,
      jobBooking.pickUpLocation,
      jobBooking.dropOffLocation
    );

    // Full page load keeps /booking CSS clean (no landing custom.scss bleed)
    navigateToBookingFromQuote();
  };

  const Loader = () => {
    return (
      <div className="loading-skeleton gap-3 w-100 priceLoader">
        <div className="serviceLoading" />
        <div className="serviceLoading" />
        <div className="serviceLoading" />
        <div className="serviceLoading" />
      </div>
    );
  };

  const isMedTruck = (name?: string) => {
    const key = String(name || "").toLowerCase();
    return key === "med truck" || key === "medium truck";
  };

  return (
    <div className="oyo-pricing-page">
      <section id="how-much-pricing" className="prices-page-section pb-5">
        <div className="container pb-4 ">
          <div className="headingPrice prices-page-intro">
            <div className="heading-with-gst">
              <div className="heading-wrapper">
                <h1>
                  Our <span className="our-word">Prices</span>
                </h1>
                <span className="yellow-underline" aria-hidden="true" />
              </div>
              <span className="includes-gst">Includes GST</span>
            </div>
          </div>
          <div className="row prices-page-main">
            <div className="col-12">
              <div className="prices-page-layout">
                <div className="price-list prices-page-vehicles">
                  <div className="limited-time-deals">
                    <FaTag className="limited-time-deals__icon" aria-hidden />
                    <span className="limited-time-deals__text">
                      Limited time deals - upto <span className="dealPer">30% off</span>
                    </span>
                  </div>
                  <div className="prices-page-vehicles__cards">
              <ul role="tablist" id="home">
                {vehicalData?.length ? (
                  // vehicalData.map((item: any) => {
                  vehicalData.map((item: any) => {
                    const isSelected =
                      (jobBooking.vehicleType || defaultVehicle?._id) === item._id;
                    const vehicleLabel = formatOpfVehicleLabel(item);
                    const vehicleImageSrc = getSelectVehicleCardImageSrcDesktop(item);
                    const isDimensionless = usesSelectVehicleDimensionlessImage(item);
                    const showMedGroundLine =
                      isMedTruck(item?.vehicleName) && isDimensionless;
                    return (
                      <li key={item._id} className="imageCard" onClick={() => setVehicleType(item._id)}>
                        <a
                          className={isSelected ? "active" : ""}
                          href="#home"
                          data-toggle="tab"
                          onClick={(e) => e.preventDefault()}
                        >
                          {isMedTruck(item?.vehicleName) && isSelected && (
                            <div className="mostPopularRibbon">Most Popular</div>
                          )}
                          <span
                            className={`price-card-image${isDimensionless ? " price-card-image--dimensionless" : ""}${showMedGroundLine ? " price-card-image--med" : ""}`}
                          >
                            <img
                              src={vehicleImageSrc}
                              className="next-Image"
                              alt={item?.vehicleDisplayName || item?.vehicleName || "Vehicle"}
                            />
                          </span>
                          <div className="prices-vehicle-card__content">
                            <div className="prices-vehicle-card__title-row">
                              <span className="prices-vehicle-card__title">
                                {vehicleLabel.title}
                              </span>
                              {vehicleLabel.men ? (
                                <span className="prices-vehicle-card__men-badge">
                                  {vehicleLabel.men}
                                </span>
                              ) : null}
                            </div>
                            <div className="prices-vehicle-card__price-row">
                              <span className="prices-vehicle-card__was-price">
                                ${item?.wasPrice}
                              </span>
                              <span className="prices-vehicle-card__now-price">
                                ${item?.moverPrice}
                              </span>
                              <span className="prices-vehicle-card__duration">/ 30 mins.</span>
                              <TfiInfoAlt
                                className="prices-vehicle-card__info"
                                onClick={(e) => handleInfoClick(item, e)}
                              />
                            </div>
                            <p className="prices-vehicle-card__desc">{item?.description}</p>
                          </div>
                        </a>
                      </li>
                    );
                  })
                ) : (
                  <Loader />
                )}
              </ul>
              <div className="continue-booking-wrapper d-flex justify-content-center align-items-center">
                {/* <div className="addLink"><Link href="#">+ Add Extra Man</Link><p>$30 <span className="">/ 30mins </span> </p></div> */}
                <button
                  className="btn btn-book-now-1"
                  onClick={handleContinueBooking}
                  disabled={!!pickupError || !!dropoffError}
                  style={{
                    opacity: (pickupError || dropoffError) ? 0.6 : 1,
                    cursor: (pickupError || dropoffError) ? 'not-allowed' : 'pointer'
                  }}
                >
                  Continue <FaArrowRight />
                </button>
              </div>
                  </div>
                </div>
                <div className="estimateslider-wrapper prices-page-estimate">
                  <p className="prices-address-heading prices-address-heading--aligned">
                    Enter addresses to estimate moving cost &amp; time
                  </p>
                  <div className="prices-page-estimate-container estimateslider-data">
                    <div className="prices-page-estimate__inputs">
                      <p className="prices-address-heading prices-address-heading--mobile">
                        Enter addresses to estimate moving cost &amp; time
                      </p>
                      <div className="prices-address-block pb-3 text-left">
                        <div className="section-heading prices-address-fields">
                          <div className="address-input-wrapper">
                            <AddressInput
                              onSelectAddress={handlePickupAddressSelect}
                              label="Enter Pickup Address"
                              placeholder="Enter Pickup Address"
                              addressType="pickup"
                              iconVariant="marker"
                              error={pickupError}
                              isFloting={false}
                              value={jobBooking?.pickUpLocation?.address?.addressLine1 || ""}
                              handelClear={handlePickupClear}
                            />
                          </div>
                          <div className="address-input-wrapper">
                            <AddressInput
                              onSelectAddress={handleDropoffAddressSelect}
                              label="Enter Drop-off Address"
                              placeholder="Enter Drop-off Address"
                              addressType="dropoff"
                              iconVariant="marker"
                              error={dropoffError}
                              isFloting={false}
                              value={jobBooking?.dropOffLocation?.address?.addressLine1 || ""}
                              handelClear={handleDropoffClear}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="prices-page-estimate__results">
                      <EstimateCostSlider
                        vehicalData={vehicalData}
                        jobBooking={jobBooking}
                        variant="page"
                      />
                      <div className="prices-page-disclaimer" role="note">
                        <TfiInfoAlt className="prices-page-disclaimer__icon" aria-hidden />
                        <div className="prices-page-disclaimer__copy">
                          <p className="prices-page-disclaimer__line prices-page-disclaimer__line--primary">
                            Estimate only, Final Price may vary based on actual work time.
                          </p>
                          <p className="prices-page-disclaimer__line prices-page-disclaimer__line--secondary">
                            30-min{" "}
                            <span className="prices-page-disclaimer__link">Call-out travel</span> applies to all
                            local jobs (Fuel included)
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

              {/* <div className="tab-content">
                <div className="container tab-pane active truckInfo">
                  <br />
                  <div className="row">
                    <div className="col-md-5 mt-5 pt-5">
                    
                      <Image
                        src={s3ImageBaseUrl + getVehicleImage(vehicle?.name)}
                        className="Image-fluid nextImage"
                        alt="img"
                      />
                      <div className="cmptBookingMain ">
                        <Link
                          href={"/booking"}
                          className="form-control cmptBooking rounded-pill rounded-btn btn btn-theme-2 border-10 btn-lg"
                        >
                          Complete Booking
                        </Link>
                      </div>
                    </div>
                    <div className="col-md-7 mb-md-0 mt-4 ">

                    </div>
                  </div>
                </div>
              </div> */}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Vehicle Info Popup */}
      <VehicleInfoPopup
        isOpen={popupOpen}
        onClose={handleClosePopup}
        vehicle={selectedVehicle}
      />
    </div>
  );
};

export default From;
