"use client";
import Input from "@/components/Input";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Col, Row } from "react-bootstrap";
import { Button } from "@/components";
import { errorToast, successToast } from "@/lib/toaster";
import { useRouter } from "next/navigation";
import DatePicker from "@/components/DatePicker";
import {  getCustomerZone, outOfAreaMessage } from "@/components/JobBooking/Location";
import { createQuotationBooking } from "@/lib/serverAction";
import { phoneNumberRegex } from "@/helper";
import { useEffect, useState } from "react";
import { getServiceArea } from "@/lib/serverAction/authAction";
import Address from "../../components/LocationAddress";
interface FormValues {
  name: string;
  company: string;
  phoneNumber: number | undefined;
  email: string;
  pickupAddress: string;
  dropoffAddress: string;
  pickUpDate: Date | undefined;
  notes: string;
  addresses: any;
}

const BookingForm = () => {
  const router = useRouter();
  const [areaZone, setAreaZone] = useState<any>([]);

  useEffect(() => {
    if (areaZone.length === 0) {
      getCustomerBookingZone();
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getCustomerBookingZone = async () => {
    const zones: any = await getServiceArea();
    setAreaZone(zones);
  };

  const validationSchema =(areaZone:any)=> Yup.object().shape({
    name: Yup.string().required("Name is required"),
    phoneNumber: Yup.string().required("Phone number is required").matches(phoneNumberRegex, "Phone number is invalid"),
    email: Yup.string()
      .email("Email is invalid")
      .matches(/^\S+@\S+\.\S+$/)
      .required("Email is required"),
    pickUpDate: Yup.date().required("Date is required"),
    addresses: Yup.array().of(
      Yup.object().shape({
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

            // Return a Promise to handle the async validation
            return new Promise((resolve, reject) => {
              getCustomerZone({ lat, lng }, areaZone)
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
        // }),
        }),
      })
    ),
  });

  const onSubmit = (values: FormValues) => {
    createQuotationBooking({
      ...values,
      pickUpLocation: { address: values?.addresses?.[0].address },
      dropOffLocation: { address: values?.addresses?.[1].address },
      user: {
        email: values.email,
        phone: values.phoneNumber,
        firstname: values.name,
        companyName: values.company,
      },
    })
      .then((res) => {
        if (res.status === 200) {
          successToast("Booking Created Successfully");
          router.push("/booking");
        } else {
          errorToast("Something went wrong");
        }
      })
      .finally(() => {
        setSubmitting(false);
      });
  };

  const {
    values,
    errors,
    touched,
    handleChange,
    handleBlur,
    handleSubmit,
    setFieldValue,
    setErrors,
    setFieldError,
    setFieldTouched,
    isSubmitting,
    setSubmitting,
  } = useFormik({
    initialValues: {
      addresses: [{ id: "Pickup" }, { id: "dropOff" }],
      name: "",
      company: "",
      phoneNumber: undefined,
      email: "",
      pickupAddress: "",
      dropoffAddress: "",
      pickUpDate: undefined,
      notes: "",
    },
    validationSchema: validationSchema(areaZone),
    onSubmit: onSubmit,
  });

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
    <form className="mt-3 " onSubmit={handleSubmit}>
      <Row>
        <Col md={6}>
          <Input
            label="Full Name"
            id="name"
            isFloating
            name="name"
            placeholder="Enter Full Name"
            value={values?.name}
            onChange={(e: any) => handleChange(e)}
            touched={touched?.name}
            error={errors?.name}
            onBlur={handleBlur}
            className="inputFieldBookingForm"
          />
        </Col>
        <Col md={6}>
          <Input
            label="Company"
            isFloating
            id="company"
            name="company"
            placeholder="Enter Company Name"
            value={values?.company}
            onChange={(e: any) => handleChange(e)}
            onBlur={handleBlur}
            className="inputFieldBookingForm"
          />
        </Col>
        <Col md={6}>
          <Input
            label="Phone Number"
            isFloating
            id="phoneNumber"
            name="phoneNumber"
            type="tel"
            placeholder="Enter Phone Number"
            value={values?.phoneNumber}
            onChange={(e: any) => handleChange(e)}
            touched={touched?.phoneNumber}
            error={touched?.phoneNumber ? errors?.phoneNumber : ""}
            onBlur={handleBlur}
            className="inputFieldBookingForm"
          />
        </Col>
        <Col md={6}>
          <Input
            label="Email"
            isFloating
            id="email"
            name="email"
            placeholder="Enter Email"
            value={values?.email}
            onChange={(e: any) => handleChange(e)}
            touched={touched?.email}
            error={touched?.email ? errors?.email : ""}
            onBlur={handleBlur}
            className="inputFieldBookingForm"
          />
        </Col>
        <Col md={12}>
          <Address
            key={"pikup"}
            index={0}
            {...addressProps}
            value={""}
            setFieldValue={setFieldValue}
            isFastBooking
            areaZone={areaZone}
          />
        </Col>
        <Col md={12} className="mt-4 mb-2">
          <Address
            key={"dropOff"}
            index={1}
            {...addressProps}
            value={""}
            setFieldValue={setFieldValue}
            isFastBooking
            areaZone={areaZone}
          />
        </Col>
        <Col md={12}>
          <DatePicker
            id="pickUpDate"
            name="pickUpDate"
            label="Preferred DATE"
            value={values?.pickUpDate}
            touched={touched?.pickUpDate}
            error={errors?.pickUpDate}
            onChange={(e) => handleChange(e)}
          />
        </Col>
        <Col md={12}>
          <Input
            name="notes"
            id="notes"
            type="text"
            as="textarea"
            placeholder="Enter Note"
            onChange={(e: any) => handleChange(e)}
            value={values?.notes}
          />
        </Col>
        <Col md={12}>
          <Button type="submit" className="buttonClassFastBooking w-100 mt-4" variant="info" isLoading={isSubmitting}>
            Submit
          </Button>
        </Col>
      </Row>
    </form>
  );
};

export default BookingForm;
