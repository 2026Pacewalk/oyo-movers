"use client";
import React, { useMemo } from "react";
import { Button, Col, Container, Row } from "react-bootstrap";
import MoverInput from "./MoverInput";
import Select from "../Select";
import { useFormik } from "formik";
import * as Yup from "yup";
import "./mover.scss";
import AddressMoverInput from "../GooglePlaceAutoCompelete";
import { createMover } from "@/lib/serverAction";

const moverRequirements = [
  "At least 18 years of age",
  "Valid Australian Driver's license",
  "Box-Truck or Van",
  "Strong and Physically able for heavy lifting.",
  "Strong Communication skills & good with people.",
  "Own a Smartphone or iPad to support OYO App.",
  "Able to work in a team.",
  "Able to pass a background check.",
];

const vehicleData = [
  {
    label: "Van (2 Tonne or above) Minimum 10 cubic meters.",
    value: "Van (2 Tonne or above) Minimum 10 cubic meters.",
  },
  {
    label: "Small Box Truck (3 Tonne or above) Minimum 12 cubic meters.",
    value: "Small Box Truck (3 Tonne or above) Minimum 12 cubic meters.",
  },
  {
    label: "Medium Box Truck (4 Tonne or above) Minimum 16 cubic meters.",
    value: "Medium Box Truck (4 Tonne or above) Minimum 16 cubic meters.",
  },
];
const validationSchema = Yup.object().shape({
  firstname: Yup.string().required("First Name is required"),
  lastname: Yup.string().required("Last Name is required"),
  phone: Yup.string().required("Phone Number is required"),
  email: Yup.string().required("Email is required").email("Email is invalid"),
});
const MoverBasicInfo = ({ value }: any) => {
  const initialValues = {
    firstname: "",
    lastname: "",
    phone: "",
    email: "",
    dob: "",
    area: "Melbourne",
    vehicle: "",
    address: {},

    aggree: false,
  };

  const onSubmit = async (values: any) => {
    createMover(values);
  };
  const {
    values,
    errors,
    touched,
    handleChange,
    handleBlur,
    handleSubmit,
    isSubmitting,
    setSubmitting,
    setFieldValue,
  }: any = useFormik({
    initialValues: initialValues,
    validationSchema,
    onSubmit,
  });

 
  const error = errors.address;
  const toucheds = errors.address;

  const addressError = useMemo(() => {
    if (!touched?.address) return "";
    if (error?.address) {
      if (Object.values(error?.address || {}).length === 0) {
        return "Address is required";
      } else {
        return (
          Object.values(error?.address || {}).join(", ") +
          " is missing in address"
        );
      }
    } else {
      return "Address is required";
    }
  }, [error?.address, touched?.address]);
  const handelAreaSelect = (value: any) => {
    setFieldValue("area", value);
  };
  return (
    <Container className="mt-3 moverRequirementWrapper">
      <h3 className="text-center mb-3">Mover Requirements</h3>
      <Row className="moverRequirementList">
        <Col md={6}>
          <ul>
            {moverRequirements.map((item, index) => {
              if (index < moverRequirements.length / 2) {
                return <li key={index}>{item}</li>;
              }
              return null;
            })}
          </ul>
        </Col>
        <Col md={6} className="moverRequirementList__list">
          <ul>
            {moverRequirements.map((item, index) => {
              if (index >= moverRequirements.length / 2) {
                return <li key={index}>{item}</li>;
              }
              return null;
            })}
          </ul>
        </Col>
      </Row>
      <Row className="mt-3">
        <h3 className="text-center mb-3">Which Area you want to work?</h3>
        <Col>
          <div className="tabRadioWraper secondTabRadio mb-3">
            <MoverInput
              label="Melbourne"
              name="area"
              type="radio"
              checked={values.area === "Melbourne"}
              value="Melbourne"
              onChange={() => handelAreaSelect("Melbourne")}
            />
            <MoverInput
              label="Geelong"
              name="area"
              type="radio"
              checked={values.area === "Geelong"}
              value="Geelong"
              onChange={() => handelAreaSelect("Geelong")}
              onBlur={handleBlur}
            />
            <MoverInput
              label="Both"
              name="area"
              placeholder="Full Name"
              value="Both"
              checked={values.area === "Melbourne,Geelong"}
              type="radio"
              onChange={() => handelAreaSelect("Melbourne,Geelong")}
              onBlur={handleBlur}
            />
          </div>
        </Col>
      </Row>
      <Row>
        <h3 className="text-center mb-3">Tell Us About Yourself</h3>
        <Col md={6} className="mb-4">
          <MoverInput
            isFloating={true}
            label="First Name"
            name="firstname"
            id="firstname"
            placeholder="First Name"
            value={values.firstname}
            type="text"
            onChange={handleChange}
            onBlur={handleBlur}
            error={touched["firstname"] && errors["firstname"]}
          />
        </Col>
        <Col md={6} className="mb-4">
          <MoverInput
            isFloating={true}
            label="Last Name"
            name="lastname"
            id="lastname"
            placeholder="Last Name"
            value={values.lastname}
            type="text"
            onChange={handleChange}
            onBlur={handleBlur}
            error={touched["lastname"] && errors["lastname"]}
          />
        </Col>

        <Col md={6} className="mb-4">
          <MoverInput
            isFloating={true}
            label="Mobile No"
            name="phone"
            id="phone"
            placeholder="Phone Number"
            type="number"
            value={values.phone}
            onChange={handleChange}
            onBlur={handleBlur}
            error={touched["phone"] && errors["phone"]}
          />
        </Col>
        <Col md={6} className="mb-4">
          <MoverInput
            isFloating={true}
            label="Email"
            name="email"
            id="email"
            placeholder="Email Address"
            type="email"
            value={values.email}
            onChange={handleChange}
            onBlur={handleBlur}
            error={touched["email"] && errors["email"]}
          />
        </Col>
        <Col md={6} className="mb-4">
          <MoverInput
            isFloating={true}
            label="Date of Birth"
            name="dob"
            id="dob"
            type="date"
            value={values.dob}
            onChange={handleChange}
            onBlur={handleBlur}
            error={touched["dob"] && errors["dob"]}
          />
        </Col>
        <Col md={6} className="mb-4">
          <AddressMoverInput
            label={"Your Address"}
            onSelectAddress={(e: any) => setFieldValue("address", e)}
            error={addressError}
            isFloting={true}
          />
        </Col>
        <h3 className="text-center mb-3">Vehicle You’ll Use</h3>
        <Col md={6}>
          <Select
            placeholder="Select Vehicle "
            label=""
            value={values.vehicle}
            id="vehicle"
            name="vehicle"
            option={vehicleData}
            onChange={handleChange}
          />
        </Col>
        <div className="tabRadioWraper secondTabRadio d-flex mb-3">
          <MoverInput
            name="aggree"
            id="aggree"
            type="checkbox"
            checked={Boolean(values.aggree)}
            onChange={handleChange}
            onBlur={handleBlur}
          />
          <p className="termsAndCondition">
            By continuing, you agree to our<a href="#"> Movers Terms and Conditions* </a>and <a href="#">Privacy Policy </a>
            and consent to receive emails & SMS Communication.
          </p>
        </div>
      </Row>
      <div className="d-flex justify-content-end mt-4 ">
        <Button
          type="submit"
          className="signupButton"
          onClick={() => handleSubmit()}
          disabled={values.aggree === false}
        >
          Continue
        </Button>
      </div>
    </Container>
  );
};

export default MoverBasicInfo;
