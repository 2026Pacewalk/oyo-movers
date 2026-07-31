import React, { useMemo, useState } from "react";
import { Form } from "react-bootstrap";
import * as Slider from "@radix-ui/react-slider";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import "./estimateSlider.scss";

const EstimateSlider = ({ vehicalData, jobBooking, isPricePage, mobileLayout }: any) => {
  const [sliderValue, setSliderValue] = useState<any>(30);
  const [estimateTime, setEstimateTime] = useState<number>(30);

  const handleChanges = (val: any) => {
    if (Number.isNaN(val[0])) {
      return false
    }
    const convertData = parseInt(val[0]);
    if (val[0] > 30) {
      setEstimateTime(convertData);
      setSliderValue(convertData.toString());
    } else {
      setEstimateTime(convertData);
      setSliderValue(val[0]);
    }
  };

  const convertTime = (time: any) => {
    const hours = Math.floor(time / 60);
    const minutes = time % 60;
    if (hours === 0 && minutes === 0) {
      return `0min`;
    } else
      if (hours === 0) {
        return `30min`;
      } else {
        return `${hours}${minutes ? ".5" : ""} hrs`;
      }
  };

  const vehicle = useMemo(
    () =>
      vehicalData?.length ? vehicalData?.find(
        (vehicle: any) => vehicle._id === jobBooking.vehicleType
      ) : null,
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [vehicalData, jobBooking.vehicleType]
  );
  const calculateEstimatePrice = (estimateTime: any) => {
    const extraPrice = vehicle?.moverPrice || vehicle?.extraPrice || 0;
    const price = vehicle?.moverPrice || vehicle?.price || 0;
    const estimatedTime = Number(estimateTime || 0);
    const extraPriceType = vehicle?.extraPriceType?.split(" ");
    const howManyHelper: any = 1;

    console.log('Vehicle data for pricing:', {
      vehicle,
      extraPrice,
      price,
      estimatedTime,
      extraPriceType,
      extraPriceTypeString: vehicle?.extraPriceType
    });

    // Handle different pricing types
    if (extraPriceType?.length) {
      if (extraPriceType[2] === "hour" && extraPriceType[1] === "half") {
        return ((estimatedTime / 30) * extraPrice + price) * howManyHelper;
      } else if (extraPriceType[0] === "per" && extraPriceType[1] === "min") {
        return (extraPrice * estimatedTime + price) * howManyHelper;
      } else if (extraPriceType[0] === "per" && extraPriceType[1] === "hour") {
        return (extraPrice * estimatedTime + price) * howManyHelper;
      }
    }

    // Handle "30 min" case (common pricing type)
    if (vehicle?.extraPriceType === "30 min" || vehicle?.priceType === "30 min") {
      return ((estimatedTime / 30) * extraPrice + price) * howManyHelper;
    }

    // Fallback calculation: assume per 30 min pricing if we have both prices
    if (extraPrice > 0 && price > 0) {
      return ((estimatedTime / 30) * extraPrice + price) * howManyHelper;
    }

    // If no extraPrice, just return the base price
    if (price > 0) {
      return price * howManyHelper;
    }

    console.warn('No valid pricing data found for vehicle:', vehicle);
    return 0;
  };

  const getHourMinute = (time: any) => {
    const hours = Math.floor(time / 60);
    const minutes = time % 60;

    if (hours > 0 && minutes > 0) {
      return `${hours}h ${minutes}m`;
    } else if (hours > 0) {
      return `${hours}hr`;
    } else if (minutes > 0) {
      return `${minutes}min`;
    } else {
      return "0min";
    }
  };

  return (
    <div className="totalFareModal">
      <div className="totalFareCustom">
        <h2 className="">
          Estimate Cost & Time
        </h2>
      </div>
      <div className="totalfarebody">
        <div className="totalFareModal__scrollPrice">
          <div className="totalFareModal__scrollPrice">
            <div className="progessLabel">
              <Form.Label />
              <Form.Label className="minLabel" />

              <Form.Label>1 hrs </Form.Label>
              <Form.Label className="minLabel" />

              <Form.Label> 2 hrs </Form.Label>
              <Form.Label className="minLabel" />

              <Form.Label> 3 hrs </Form.Label>
              <Form.Label className="minLabel" />

              <Form.Label> 4 hrs </Form.Label>
              <Form.Label className="minLabel" />

              <Form.Label />
            </div>
            <Slider.Root
              className="relative sliderRootRangeWrapper mt-3 flex items-center w-full h-8"
              value={[sliderValue]}
              onValueChange={handleChanges}
              min={0}
              max={300}
              step={30}
            >
              <Slider.Track className=" sliderRootRangeInput  relative w-full h-2 rounded-full  overflow-hidden bg-gray-200">
                <Slider.Range
                  className=" sliderRootRangeInputInner"
                />
              </Slider.Track>

              <Slider.Thumb
                className="circleSliderIcon relative d-flex flex-col align-items-center justify-content-center
         focus:outline-none focus:ring-2 focus:ring-orange-400
                 text-white transition-transform transform hover:scale-110"
              >
                <div className="d-flex align-items-center gap-1">
                  <FaChevronLeft className=" text-lg" style={{ color: '#666' }} />
                  <FaChevronRight className="text-lg" style={{ color: '#666' }} />
                </div>

                {!mobileLayout && (
                  <div className="timeDescription d-flex flex-column justify-content-center flex-wrap text-center">
                    <h4>{getHourMinute(sliderValue)}</h4>
                    <h6>Est. time to load & unload your items</h6>
                  </div>
                )}
              </Slider.Thumb>
            </Slider.Root>
            {mobileLayout && (
              <div className="timeDescription timeDescription--below d-flex flex-column justify-content-center text-center">
                <h4>{getHourMinute(sliderValue)}</h4>
                <h6>Est. time to load & unload your items</h6>
              </div>
            )}
          </div>
          <div className="estimateListings mt-5 pt-5 ">
            <div className="d-flex align-items-center w-100 justify-content-between mb-1">
              <div className=" estimateListingsLeft">
                <h4>
                  Call-out Travel
                  <span>({vehicle?.vehicleName || "Van"})</span>
                </h4>
              </div>
              <div className="estimateListingsRight ">
                <h6>${vehicle?.moverPrice}</h6>
                {/* <h6>${vehicle?.baseDeposit || vehicle?.price || 0}</h6> */}
              </div>
            </div>

            <div className="d-flex align-items-center w-100 justify-content-between mb-1">
              <div className=" estimateListingsLeft">
                <h4>
                  Work-time{""}
                  <span className="ms-1">
                    ({convertTime(Number(sliderValue))})
                  </span>
                </h4>
              </div>
              <div className="estimateListingsRight ">
                <h6>
                  {" "}
                  ${((vehicle?.moverPrice || vehicle?.extraPrice || 0) * Number(sliderValue)) / 30}
                </h6>
              </div>
            </div>

            <div className="d-flex align-items-center w-100 justify-content-between mb-1 ">
              <div className=" estimateListingsLeft">
                <h4>
                  Total estimate
                  <span>(includes GST)</span>
                </h4>
              </div>
              <div className="estimateListingsRight ">
                <h3> ${(() => {
                  const result = calculateEstimatePrice(estimateTime);
                  console.log('Total estimate calculation:', { estimateTime, result });
                  return result.toFixed(0);
                })()}</h3>
              </div>
            </div>
          </div>
        </div>
        <div className="bookingAmountInfoSlider">
          <p>
            💰 Pay As You Go! <span>  No Minimum Hours to book </span>{" "}
          </p>
          <h6>30-min Call-out Travel for all local jobs which also cover fuel cost </h6>
          <span>Estimate only, Final Price may vary with actual work-time.</span>
        </div>

      </div>
    </div>
  );
};

export default EstimateSlider;
