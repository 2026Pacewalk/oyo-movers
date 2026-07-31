"use client";

import React, { useEffect, useState } from "react";
import { Col } from "react-bootstrap";
import { FaArrowRight, FaPlus } from "react-icons/fa6";
import Input from "../Input";
import IconButton from "../IconButton";
import Button from "../Button";
import { useJobBooking } from "./JobBookingHook";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useUserData } from "../User/UserDataHook";
import StepHandler from "./StepHandler";
import { makeId } from "@/helper";
import { getServiceArea } from "@/lib/serverAction/authAction";
import { isPointInPolygon } from "geolib";
import useCreateDraft from "@/utils/hooks/useCreateDraft";
import Address from "../LocationAddress";

Yup.addMethod(Yup.string, "maxWords", function (max, message) {
  return this.test("maxWords", message, function (value) {
    const { path, createError } = this;
    if (!value) return true; // If the value is empty, no need to validate for words
    const wordCount = value.split(" ").filter((word) => word.length > 0).length;
    return wordCount <= max || createError({ path, message });
  });
});

export const getCustomerZone = async (location: any, areaZone: any) => {
  // console.log("getCustomerZone called with:", { location, areaZone });
  // console.log("areaZone?.length", areaZone?.length);

  if (!areaZone?.length) return true;

  // Check if the location is within any of the service areas
  for (const zone of areaZone) {
    // console.log("Checking zone:", zone.name);
    if (zone.coordinates && zone.coordinates.type === "Polygon") {
      const coordinates = zone.coordinates.coordinates[0]; // Get the first ring of the polygon
      // console.log("Zone coordinates:", coordinates);

      // Convert coordinates to the format expected by isPointInPolygon
      const polygonCoordinates = coordinates.map((coord: any) => ({
        latitude: coord[1], // Latitude is the second value
        longitude: coord[0]  // Longitude is the first value
      }));
      // console.log("Converted polygon coordinates:", polygonCoordinates);
      // console.log("Checking point:", { latitude: location.lat, longitude: location.lng });

      // Check if the point is inside this polygon
      const isInside = isPointInPolygon(
        { latitude: location.lat, longitude: location.lng },
        polygonCoordinates
      );
      // console.log("Is point inside:", isInside);

      if (isInside) {
        // console.log("Point is inside service area:", zone.name);
        return false; // Point is inside service area, return false (no error)
      }
    }
  }

  // console.log("Point is not inside any service area");
  // If we get here, the point is not inside any service area
  return true; // Return true to indicate validation error
};
export const outOfAreaMessage: any = "Oops, outside of the service area!";

const validationSchema = (areaZone: any) =>
  Yup.object().shape({
    addresses: Yup.array().of(
      Yup.object().shape({
        name: Yup.string(),
        address: Yup.object().shape({
          locality: Yup.string().required("City"),
          administrative_area_level_1: Yup.string().required("State"),
          country: Yup.string().required("Country"),


          latitude: Yup.string().test("latitude", outOfAreaMessage, function (value, data: any) {
            const currentIndex = data?.options?.index;

            const lat = data?.options?.context?.addresses[currentIndex]?.address?.latitude;
            const lng = data?.options?.context?.addresses[currentIndex]?.address?.longitude;
            if (!lat || !lng) {
              return true
            }
            const latNum = Number(lat);
            const lngNum = Number(lng);

            // Return a Promise to handle the async validation
            return new Promise((resolve, reject) => {
              getCustomerZone({ lat: latNum, lng: lngNum }, areaZone)
                .then((res) => {
                  if (res) {
                    return resolve(false); // Validation fails if outside service area
                  } else {
                    return resolve(true); // Validation success if inside service area
                  }
                })
                .catch((err) => {
                  console.error(err); // Handle errors if any
                  return resolve(false); // Return validation error in case of an error
                });
            });
          }),
        }),

        level: Yup.string().required("Level is required"),
        bookingTimeSlot: Yup.string().when(["level", "liftBooking"], {
          is: (level: string, liftBooking: boolean) => {
            return level === "lift" && liftBooking;
          },
          then: (schema: any) => schema.required("Booking Timeslot is required").maxWords(10, "10 words max"),
          otherwise: (schema) => schema.notRequired(),
        }),
      })
    ),
  });

const initialValues = {
  address: {},
  level: "ground",
  flightOfStairs: "0",
  liftBooking: false,
  bookingTimeSlot: "",
};
const Services = ["Few Items", "Store Delivery", "Haul Away", "Something Else"];

const Location = ({ bookingList }: any) => {

  const [areaZone, setAreaZone] = useState([]);

  useEffect(() => {
    if (areaZone.length === 0) {
      getCustomerBookingZone();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getCustomerBookingZone = async () => {
    const zones: any = await getServiceArea();
    // console.log("JobBooking - Service areas loaded:", zones?.data?.serviceAreas);
    setAreaZone(zones?.data?.serviceAreas);
  };

  const {
    setPickUpLocation,
    setDropOffLocation,
    setStopOvers,
    nextStep,
    setStep,
    jobBooking,
    moverServices,
    setAddressOptions,
    addressOptions,
    setActiveTab,
    setNoteForMover,
  } = useJobBooking();

  const { user } = useUserData();
  const { distance, user: userdetail, ...rest } = jobBooking;
  const { draftData, createDraft, updateDrafQuotationData } = useCreateDraft();

  // useEffect(() => {
  //   if (user?.bookingAddress?.length > 0) {
  //     const addressOption: any = user?.bookingAddress.map((i: any) => {
  //       return { label: i.addressLine1, value: i._id };
  //     });
  //     setAddressOptions(addressOption);
  //   }

  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [user?.bookingAddress]);

  const pickUpInitialValues = {
    address: jobBooking?.pickUpLocation?.address || {},
    level: jobBooking?.pickUpLocation?.level || "ground",
    flightOfStairs: jobBooking?.pickUpLocation?.flightOfStairs || "0",
    liftBooking: jobBooking?.pickUpLocation?.liftBooking || false,
    bookingTimeSlot: jobBooking?.pickUpLocation?.bookingTimeSlot || "",
    additionalInformation: jobBooking?.pickUpLocation?.additionalInformation || "",
  };

  const dropOffInitialValues = {
    address: jobBooking?.dropOffLocation?.address || {},
    level: jobBooking?.dropOffLocation?.level || "ground",
    flightOfStairs: jobBooking?.dropOffLocation?.flightOfStairs || "0",
    liftBooking: jobBooking?.dropOffLocation?.liftBooking || false,
    bookingTimeSlot: jobBooking?.dropOffLocation?.bookingTimeSlot || "",
    additionalInformation: jobBooking?.dropOffLocation?.additionalInformation || "",
  };
  const onSubmitFrom = ({ addresses }: any) => {
    const [address, addressDrop] = addresses;
    setPickUpLocation(address);
    setNoteForMover(values.noteForMover);
    moverServices !== "Labour Only" && moverServices !== "Haul Away" && setDropOffLocation(addressDrop);
    const stopOvers = addresses?.slice(2)?.map((i: any) => i);
    setStopOvers(stopOvers);
    if (Services.includes(moverServices)) {
      setStep(5);
    } else {
      nextStep();
    }
    setActiveTab("6");
    try {
      if (draftData) {
        updateDrafQuotationData({ ...rest, moverServices }, 'location')
      } else {
        createDraft({ ...rest, pickUpLocation: address, dropOffLocation: addressDrop, noteForMover: values.noteForMover, stopOvers: stopOvers });
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (moverServices === "Labour Only" || moverServices === "Haul Away") {
      const newAddresses = [...values.addresses];
      newAddresses.splice(1, 2);
      setFieldValue("addresses", newAddresses);
      setTimeout(() => {
        setErrors({});
      }, 400);
    } else if (values?.addresses?.length === 1) {
      const newAddresses = [...values.addresses, { id: "dropOff", ...dropOffInitialValues }];

      setFieldValue("addresses", newAddresses);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [moverServices]);

  const {
    isValid,
    errors,
    handleSubmit,
    values,
    handleChange,
    handleBlur,
    setFieldValue,
    setErrors,
    setFieldError,
    setFieldTouched,
    validateForm,
    validateField,
    touched,
    setStatus
  } = useFormik({
    initialValues: {
      addresses: [
        { id: "Pickup", ...pickUpInitialValues },
        { id: "dropOff", ...dropOffInitialValues },
        ...jobBooking?.stopOvers,
      ],
      noteForMover: jobBooking?.noteForMover || "",
    },
    validationSchema: validationSchema(areaZone),
    onSubmit: onSubmitFrom,
  });
  const buildAddressesFromJobBooking = () => [
    {
      id: "Pickup",
      address: jobBooking?.pickUpLocation?.address || {},
      level: jobBooking?.pickUpLocation?.level || "ground",
      flightOfStairs: jobBooking?.pickUpLocation?.flightOfStairs || "0",
      liftBooking: jobBooking?.pickUpLocation?.liftBooking || false,
      bookingTimeSlot: jobBooking?.pickUpLocation?.bookingTimeSlot || "",
      additionalInformation: jobBooking?.pickUpLocation?.additionalInformation || "",
    },
    {
      id: "dropOff",
      address: jobBooking?.dropOffLocation?.address || {},
      level: jobBooking?.dropOffLocation?.level || "ground",
      flightOfStairs: jobBooking?.dropOffLocation?.flightOfStairs || "0",
      liftBooking: jobBooking?.dropOffLocation?.liftBooking || false,
      bookingTimeSlot: jobBooking?.dropOffLocation?.bookingTimeSlot || "",
      additionalInformation: jobBooking?.dropOffLocation?.additionalInformation || "",
    },
    ...(jobBooking?.stopOvers || []),
  ];

  useEffect(() => {
    const pickupLine = jobBooking?.pickUpLocation?.address?.addressLine1;
    const dropoffLine = jobBooking?.dropOffLocation?.address?.addressLine1;
    const formPickupLine = values.addresses[0]?.address?.addressLine1;
    const formDropoffLine = values.addresses[1]?.address?.addressLine1;

    if (
      (pickupLine && pickupLine !== formPickupLine) ||
      (dropoffLine && dropoffLine !== formDropoffLine)
    ) {
      setFieldValue("addresses", buildAddressesFromJobBooking());
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    jobBooking?.pickUpLocation?.address?.addressLine1,
    jobBooking?.dropOffLocation?.address?.addressLine1,
  ]);

  useEffect(() => {
    if (jobBooking?.isDraft) {
      if (jobBooking?.pickUpLocation && jobBooking?.dropOffLocation) {
        const bookAddreskPick = jobBooking?.pickUpLocation?.address;
        const bookAddreskDrop = jobBooking?.dropOffLocation?.address;

        jobBooking.pickUpLocation.address.locality = bookAddreskPick?.city;
        jobBooking.pickUpLocation.address.administrative_area_level_1 = bookAddreskPick?.state;
        jobBooking.pickUpLocation.address.addressLine1 = `${bookAddreskPick?.street_number} ${bookAddreskPick?.route},${bookAddreskPick?.state} ${bookAddreskPick?.postalCode}`;
        jobBooking.pickUpLocation.address.postalCode = bookAddreskPick?.postalCode

        jobBooking.dropOffLocation.address.locality = bookAddreskDrop?.city;
        jobBooking.dropOffLocation.address.administrative_area_level_1 = bookAddreskDrop?.state;
        jobBooking.dropOffLocation.address.addressLine1 = `${bookAddreskDrop?.street_number} ${bookAddreskDrop?.route},${bookAddreskDrop?.state} ${bookAddreskDrop?.postalCode}`;
        jobBooking.dropOffLocation.address.postalCode = bookAddreskDrop?.postalCode
        if (jobBooking?.stopOvers) {
          jobBooking.stopOvers.map((i: any) => {
            i.address.locality = i.address.city;
            i.address.administrative_area_level_1 = i.address.state;
            i.address.addressLine1 = `${i.address.street_number} ${i.address.route},${i.address.state} ${i.address.postalCode}`;
            i.address.postalCode = i.address.postalCode
            return i
          })
        }


        const newAddresses: any = [jobBooking?.pickUpLocation, jobBooking?.dropOffLocation]

        setFieldValue("addresses", [
          ...newAddresses,
          ...jobBooking?.stopOvers,
        ],);
        setStatus(true)
        setTimeout(() => {

          validateForm();
        }, 3000);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [jobBooking?.isDraft])

  const addStop = () => {
    let error = errors;
    setFieldValue("addresses", [...values.addresses, { id: makeId(), ...initialValues }]);

    setTimeout(() => {
      setErrors(error);
    }, 500);
  };

  const removeStop = (index: number) => {
    let error = errors;
    if (index > 1) {
      const newAddresses = [...values.addresses];
      newAddresses.splice(index, 1);
      setFieldValue("addresses", newAddresses);
    }
    setTimeout(() => {
      setErrors(error);
    }, 500);
  };

  const addressProps = {
    values,
    errors,
    touched,
    handleChange,
    setFieldValue,
    setErrors,
    setFieldTouched,
    handleBlur,
    user,
    validateField,
  };

  useEffect(() => {
    const addresses = values?.addresses;
    const [address, addressDrop] = addresses;
    if (address?.address?.addressLine1) {
      setPickUpLocation(address);
    }
    if (
      addressDrop?.address?.addressLine1 &&
      moverServices !== "Labour Only" &&
      moverServices !== "Haul Away"
    ) {
      setDropOffLocation(addressDrop);
    }
    const stopOvers = addresses?.slice(2)?.map((i: any) => i);
    setStopOvers(stopOvers);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [values?.addresses]);

  const pickupLine = values?.addresses[0]?.address?.addressLine1;
  const dropoffLine =
    moverServices !== "Labour Only" && moverServices !== "Haul Away"
      ? values?.addresses[1]?.address?.addressLine1
      : true;
  const isDisabled =
    ((Object.keys(errors)?.length !== 0) && !isValid) ||
    !pickupLine ||
    !dropoffLine;

  return (
    <StepHandler step={1}>
      {!bookingList && <h1 className="mb-2">Locations</h1>}
      <div className="roomContainer">
        <Address
          key={"pikup"}
          index={0}
          {...addressProps}
          value={values?.addresses[0]?.address?.addressLine1 || ""}
          setFieldValue={setFieldValue}
          addressOptions={addressOptions}
        />
        {values.addresses.map(
          (address: any, index: number) =>
            index > 1 && (
              <Address
                onClose={removeStop}
                key={address.id}
                index={index}
                {...addressProps}
                value={values?.addresses[index]?.address?.addressLine1}
                setFieldValue={setFieldValue}
                addressOptions={addressOptions}
              />
            )
        )}

        {moverServices !== "Labour Only" && moverServices !== "Haul Away" && (
          <Address
            key={"drop"}
            index={1}
            {...addressProps}
            value={values?.addresses[1]?.address?.addressLine1 || ""}
            setFieldValue={setFieldValue}
            addressOptions={addressOptions}
          />
        )}

        {/* <Col md={12} sm={12}>
          <Input
            value={values?.noteForMover}
            onChange={handleChange}
            label="Driver Notes"
            isFloating
            name="noteForMover"
            type="text"
            placeholder="Note for Movers"
          />
        </Col> */}

        <div className="footerLocation locationStepFooter">
          {moverServices !== "Labour Only" && moverServices !== "Haul Away" && (
            <Button
              type="button"
              className="iconButton addStopButton"
              onClick={addStop}
            >
              <span className="icon addStopDesktopPlus">
                <FaPlus />
              </span>
              <span className="text locationAddStopTitle">
                <span className="addStopMobilePlus" aria-hidden>
                  +{" "}
                </span>
                <span className="addStopLabel">Add Stop</span>
              </span>
            </Button>
          )}

          {!bookingList && (
            <IconButton
              className="buttonClass continueStepButton"
              // className="buttonClass "
              title="Continue"
              icon={<FaArrowRight />}
              disabled={isDisabled}
              onClick={() => handleSubmit()}
            />
          )}
        </div>
      </div>
    </StepHandler>
  );
};

export default React.memo(Location);

