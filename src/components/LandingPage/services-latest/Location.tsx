"use client";
import { Button } from "@/components";
import { useJobBooking } from "@/components/JobBooking/JobBookingHook";
import {
  getCustomerZone,
  outOfAreaMessage,
} from "@/components/JobBooking/Location";
import { getServiceArea } from "@/lib/serverAction/authAction";
import { useFormik } from "formik";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { FaClock, FaRegClock } from "react-icons/fa6";
import Address from '../../LocationAddress'
import * as Yup from "yup";
import "./services-latest.scss";

const Locations = ({
  showValueIf,
  setError,
  setShowPriceImages,
}: {
  showValueIf?: boolean;
  setError?: (e: boolean) => void;
  setShowPriceImages?: (e: boolean) => void;
}) => {
  const router = useRouter();
  const [areaZone, setAreaZone] = useState<any>([]);
  const { setPickUpLocation, setDropOffLocation, jobBooking } = useJobBooking();

  useEffect(() => {
    if (areaZone.length === 0) {
      getCustomerBookingZone();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getCustomerBookingZone = async () => {
    const zones: any = await getServiceArea();
    // console.log("LandingPage - Service areas loaded:", zones?.data?.serviceAreas);
    setAreaZone(zones?.data?.serviceAreas);
  };

  const validationSchema = (areaZone: any) =>
    Yup.object().shape({
      addresses: Yup.array().of(
        Yup.object().shape({
          address: Yup.object().shape({
            addressLine1: Yup.string().required("Street Address Required"),
            locality: Yup.string().required("Street Address Required"),
            administrative_area_level_1: Yup.string().required("Street Address Required"),
            country: Yup.string().required("Street Address Required"),
            latitude: Yup.string().test(
              "latitude",
              outOfAreaMessage,
              function (value, data: any) {
                const currentIndex = data?.options?.index;

                const lat =
                  data?.options?.context?.addresses[currentIndex]?.address
                    ?.latitude;
                const lng =
                  data?.options?.context?.addresses[currentIndex]?.address
                    ?.longitude;
                if (!lat || !lng) {
                  return true;
                }

                // Convert to numbers to ensure proper validation
                const latNum = Number(lat);
                const lngNum = Number(lng);

                // Return a Promise to handle the async validation
                return new Promise((resolve, reject) => {
                  // console.log("LandingPage - Validating location:", { lat: latNum, lng: lngNum });
                  // console.log("LandingPage - Area zones:", areaZone);
                  getCustomerZone({ lat: latNum, lng: lngNum }, areaZone)
                    .then((res) => {
                      // console.log("LandingPage - getCustomerZone result:", res);
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
              }
            ),
          }),
        })
      ),
    });
  const initalValue: any = {
    addresses: [
      jobBooking.pickUpLocation || { id: "Pickup" },
      jobBooking.dropOffLocation || { id: "dropOff" },
    ],
  };
  useEffect(() => {
    if (
      jobBooking.pickUpLocation?.address?.addressLine1 &&
      jobBooking.dropOffLocation?.address?.addressLine1
    ) {
      setValues({
        addresses: [jobBooking.pickUpLocation, jobBooking.dropOffLocation],
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [jobBooking.pickUpLocation?.address, jobBooking.dropOffLocation?.address]);

  // Sync formik values with jobBooking data when component mounts or jobBooking changes
  useEffect(() => {
    if (jobBooking.pickUpLocation || jobBooking.dropOffLocation) {
      const currentAddresses = [
        jobBooking.pickUpLocation || { id: "Pickup" },
        jobBooking.dropOffLocation || { id: "dropOff" },
      ];

      // Only update if the addresses have changed
      const hasChanged =
        currentAddresses[0]?.address?.addressLine1 !== values.addresses[0]?.address?.addressLine1 ||
        currentAddresses[1]?.address?.addressLine1 !== values.addresses[1]?.address?.addressLine1;

      if (hasChanged) {
        setValues({
          addresses: currentAddresses,
        });
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [jobBooking.pickUpLocation, jobBooking.dropOffLocation]);

  const {
    values,
    errors,
    touched,
    handleChange,
    handleBlur,
    handleSubmit,
    setFieldValue,
    setErrors,
    setValues,
    isSubmitting,
    setFieldError,
    setFieldTouched,
  } = useFormik({
    initialValues: initalValue,
    validationSchema: validationSchema(areaZone),
    onSubmit: () => {
      if (showValueIf) {
        setShowPriceImages?.(true);
      } else {
        setPickUpLocation(values.addresses[0]);
        setDropOffLocation(values.addresses[1]);

        router.push("/prices");
      }
    },
  });

  useEffect(() => {
    const isValues =
      values.addresses[0]?.address?.addressLine1 ||
      values.addresses[1]?.address?.addressLine1;
    if (isValues) {
      setPickUpLocation(values.addresses[0]);
      setDropOffLocation(values.addresses[1]);
    }
    if (Object.keys(errors).length) {
      setError?.(true);
    } else {
      if (isValues) {
        setError?.(false);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [values?.addresses, errors]);

  const addressProps = {
    values,
    errors,
    touched,
    handleChange,
    setFieldValue,
    setErrors,
    setFieldError,
    setFieldTouched,
    handleBlur,
  };

  return (
    <div className={`row  py-0 ${!showValueIf ? "locationMain" : ""}`}>
      <div className="col-md-3 px-0 d-flex align-items-center position-relative justify-content-center">
        <div className="position-relative border-10 text-center">
          <h5 className="mb-0 query-heading">Get Quick Quote </h5>
          <span className="d-flex align-items-center justify-content-center location-time " style={{ fontSize: 12 , fontWeight: "600" }}>
            <FaRegClock size={11} style={{ marginRight: 3 }} /> Takes 60 Seconds
          </span>
        </div>
      </div>
      <div className="col-md-3 px-1 d-flex align-items-center position-relative ">
        <div className="position-relative border-10 addressfields  w-100">
          <Address
            key={"pikup"}
            index={0}
            {...addressProps}
            value={values.addresses[0]?.address?.addressLine1 || ""}
            setFieldValue={setFieldValue}
            isFastBooking
            areaZone={areaZone}
            handelClear={() => setFieldValue(`addresses[0].address`, {})}
          />
        </div>
      </div>
      <div className="col-md-3 px-1 d-flex align-items-center position-relative">
        <div className="position-relative border-10 addressfields  w-100">
          <Address
            key={"dropOff"}
            index={1}
            {...addressProps}
            value={values.addresses[1]?.address?.addressLine1 || ""}
            setFieldValue={setFieldValue}
            isFastBooking
            areaZone={areaZone}
            handelClear={() => setFieldValue(`addresses[1].address`, {})}
          />
        </div>
      </div>
      <div className="col-md-2 px-1 d-flex align-items-center position-relative justify-content-center">
        <Button
          onClick={handleSubmit}
          className="form-control w-100 rounded-pill rounded-btn btn btn-theme-2  "
          variant="info"
          isLoading={!showValueIf && isSubmitting}
        >
          Get Prices
        </Button>
      </div>
    </div>
  );
};

export default Locations;
