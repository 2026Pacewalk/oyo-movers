'use client'
import React, { useEffect, useMemo, useState } from "react";
import { Col, OverlayTrigger, Row, Tooltip } from "react-bootstrap";
import { BsInfoCircle } from "react-icons/bs";
import IconButton from "../IconButton";
import Image from "../Image";
import AddressInput from "../GooglePlaceAutoCompelete";
import Button from "../Button";
import Input from "../Input";
import { adressLevels } from "@/helper";
const labels = [" Enter Pickup Address ", " Enter Drop-off Address ", "Stop-"];

const Address = ({
  index,
  onClose,
  values,
  errors,
  setFieldValue,
  value,
  user,
  setErrors,
  setFieldTouched,
  handleChange,
  handleBlur,
  touched,
  isFastBooking,
  handelClear,
  validateField,
}: any) => {
  const setAddress = (address: any) => {
    setFieldValue(`addresses[${index}].address`, address);
  };
  const fieldTouch = touched[`addresses`]?.[index];

  const data = values?.addresses[index];
  const [saveAddress, setSaveAddress] = useState<boolean>(false);
  const [selectedAddress, setSelectedAddress] = useState<string>("");
  const [isOnFocus, setIsOnFocus] = useState<boolean>(false);
  const [stairsValue, setStairsValue] = useState<number>(data?.flightOfStairs ? Number(data?.flightOfStairs) : 0);

  useEffect(() => {
    if (stairsValue) {
      setFieldValue(`addresses[${index}].flightOfStairs`, stairsValue);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [stairsValue]);

  const error = useMemo(
    () => errors.addresses?.[index],
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [errors.addresses]
  );
  const addressTouched = useMemo(
    () => touched?.addresses?.[index],
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [touched?.addresses, index]
  );

  const addressError = useMemo(() => {
    if (!addressTouched?.address || !error?.address) return "";

    const addrErr = error.address;
    if (typeof addrErr === "string") return addrErr;
    if (addrErr?.latitude) return addrErr.latitude;

    const nested = Object.values(addrErr || {}).filter((v) => v != null && v !== "");
    if (!nested.length) return "";

    if (isFastBooking) {
      return "Street Address Required";
    }
    if (!value) {
      return "Address is required";
    }
    return nested.join(", ") + " is missing in address";
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [error?.address, addressTouched?.address, isFastBooking, value]);

  const onBlur = (e: any) => {
    setIsOnFocus(false);
    const raw = e?.target?.value;
    const typedValue = typeof raw === "string" ? raw.trim().toLowerCase() : "";
    const selectedValue = typeof value === "string" ? value.trim().toLowerCase() : "";

    // If user edits the input after selecting an address, invalidate stale selection.
    if (!typedValue || typedValue !== selectedValue) {
      setFieldValue(`addresses[${index}].address`, {});
      validateField?.(`addresses[${index}]`);
    }
    setFieldTouched(`addresses[${index}].address`, true);
  };
  const onFocus = (e: any) => {
    setIsOnFocus(true);
  };

  const handelChangeOptions = (e: any, level?: boolean) => {
    if (level) {
      setFieldValue(`addresses[${index}].level`, e);
    } else {
      // Commented out - lift booking functionality
      // setFieldValue(`addresses[${index}].liftBooking`, e.target.checked);
      // // Clear bookingTimeSlot when liftBooking is unchecked
      // if (!e.target.checked) {
      //   setFieldValue(`addresses[${index}].bookingTimeSlot`, "");
      // }
    }
  };

  const tooltip = <Tooltip id="tooltip">10 or less steps classified as 1 flight</Tooltip>;

  const handelSaveAddress = (e: any) => {
    setSelectedAddress(e);
    setTimeout(() => {
      setErrors({});
    }, 500);

    const address = user?.bookingAddress.find((i: any) => i._id === e);

    setAddress({
      ...address,
      locality: address?.city,
      administrative_area_level_1: address?.state,
      country: address?.country,
    });
  };
  const isErrors = fieldTouch && addressError;

  return (
    <div
      className="position-relative addressCard  locationCard"
      style={
        isFastBooking
          ? { border: "none" }
          : {
            border: isErrors
              ? "2px solid var(--highlightColor)"
              : isOnFocus
                ? "2px solid var(--highlightColor)"
                : "1px solid #e6e6e6",
            boxShadow: isErrors
              ? "0px 8px 16px rgba(85, 88, 92, 0.08)"
              : isOnFocus
                ? "0px 8px 16px rgba(85, 88, 92, 0.08)"
                : "1px solid #e6e6e6",
          }
      }
    >
      {!isFastBooking && isErrors && (
        <div className="errorWraper">
          <p className="error">{addressError}</p>
        </div>
      )}
      {onClose && (
        <div className="addressCloseButton">
          <IconButton title=" " onClick={() => onClose(index)} icon={<Image src="./close.svg" alt="close" />} />
        </div>
      )}

      {/* {addressOptions?.length ? (
          <div className="tabCheckboxWraper">
            <Input
              type="checkbox"
              name="saveaddress"
              label="Use save address"
              checked={saveAddress}
              onChange={(e: any) => setSaveAddress(e.target.checked)}
            />
          </div>
        ) : null} */}
      {!saveAddress && (
        <AddressInput
          label={index > 1 ? labels[2] + (index - 1) : labels[index]}
          onSelectAddress={setAddress}
          isFloting={true}
          value={value}
          handelClear={handelClear || (() => setFieldValue(`addresses[${index}].address`, {}))}
          handleFocus={onFocus}
          handleBlur={onBlur}
          error={isErrors && isFastBooking ? addressError : ""}
        />
      )}

      {/* {saveAddress && (
          <Select
            placeholder="Select Address"
            id=""
            label={index > 1 ? labels[2] + (index - 1) : labels[index]}
            name=""
            value={selectedAddress}
            option={addressOptions}
            onChange={(e: any) => handelSaveAddress(e.target.value)}
            error={addressError}
          />
        )} */}

      {!isFastBooking && (
        <Row>
          <Col xxl={6} xl={7} lg={7} md={7} sm={12} className="gap-2 locationSection">
            {adressLevels.map((i) => (
              <div
                key={i}
                className={`locationTab locationTabFlight ${data?.level === i ? "active" : ""}`}
                onClick={() => handelChangeOptions(i, true)}
              >
                {i === "stairs" ? (
                  <>
                    <p>{i.charAt(0).toUpperCase() + i.slice(1)}</p>
                    {data?.level === i && (
                      <div className="locationTabInner">
                        <Button
                          className="elevatorButton"
                          onClick={() => setStairsValue((e) => e - 1)}
                          disabled={stairsValue === 0}
                        >
                          -
                        </Button>
                        <span>{stairsValue}</span>
                        <Button className="elevatorButton" onClick={() => setStairsValue((e) => e + 1)}>
                          +
                        </Button>
                      </div>
                    )}
                  </>
                ) : (
                  i.charAt(0).toUpperCase() + i.slice(1)
                )}
              </div>
            ))}
            {data?.level === "stairs" && (
              <OverlayTrigger placement="top" overlay={tooltip}>
                <div style={{ cursor: 'pointer', display: 'flex', alignItems: 'center' }} className="stairsInfoIcon">
                  <BsInfoCircle style={{ color: '#666', fontSize: '18px' }}  />
                </div>
              </OverlayTrigger>
            )}
          </Col>
        </Row>
      )}
      {/* {data?.level === "lift" && (
        <div className="elevatorsection">
          <div className="stairInput">
            <Input
              onChange={(e: any) => handelChangeOptions(e, false)}
              label={data?.level === "lift" ? "Is lift booked" : "No. of Flights"}
              isFloating={data?.level === "lift" ? false : true}
              name={"liftBooking"}
              type={"checkbox"}
              checked={values.addresses[index].liftBooking}
              className="checkInput"
              placeholder={data?.level === "lift" ? "Is lift booked " : "No. of Flights"}
              error={touched && error?.flightsOrLiftBooked && "This is Required"}
            />

            {values.addresses[index].liftBooking && (
              <Input
                value={values.addresses[index].bookingTimeSlot || ""}
                onChange={(e: any) => setFieldValue(`addresses[${index}].bookingTimeSlot`, e.target.value)}
                onBlur={handleBlur}
                className="w-50"
                label="Booking Timeslot"
                name={`addresses[${index}].bookingTimeSlot`}
                id={`addresses[${index}].bookingTimeSlot`}
                isFloating={true}
                placeholder="Booking Timeslot"
                maxLength={20}
                error={touched?.addresses?.[index]?.bookingTimeSlot && errors?.addresses?.[index]?.bookingTimeSlot}
              />
            )}
          </div>
        </div>
      )} */}

      {/* Additional Information Input */}
      {!isFastBooking && (
        <div className="additionalInfoSection ">
          <Input
            value={values.addresses[index].additionalInformation || ""}
            onChange={(e: any) => setFieldValue(`addresses[${index}].additionalInformation`, e.target.value)}
            onBlur={handleBlur}
            label="Additional Information (Optional)"
            name={`addresses[${index}].additionalInformation`}
            id={`addresses[${index}].additionalInformation`}
            isFloating={true}
            placeholder="Any additional details about this location"
            maxLength={160}
            error={touched?.addresses?.[index]?.additionalInformation && errors?.addresses?.[index]?.additionalInformation}
          />
        </div>
      )}
    </div>
  );
};
export default React.memo(Address);