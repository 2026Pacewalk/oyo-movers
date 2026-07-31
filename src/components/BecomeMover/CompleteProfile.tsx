"use client";
import "./workdetails.scss";
import React, { useEffect, useState } from "react";
import Select from "../Select";
import MoverInput from "./MoverInput";
import { useFormik } from "formik";
import * as Yup from "yup";
import { FaArrowAltCircleRight, FaArrowAltCircleLeft } from "react-icons/fa";
import IconButton from "../IconButton";
import { errorToast } from "@/lib/toaster";
import { buildSignature, markSubmitted, shouldSkipSubmit } from "./submitGuard";
import AddressMoverInput from "../GooglePlaceAutoCompelete";
import { completeMoverProfile } from "@/lib/serverAction/becomeMoverActions";

const experienceOptions = [
  { label: "0-6 months", value: "0-6 months" },
  { label: "6-12 months", value: "6-12 months" },
  { label: "1-2 years", value: "1-2 years" },
  { label: "2+ years", value: "2+ years" },
];

const teamSizeOptions = [
  { label: "One Person Moves", value: "One Person Moves" },
  { label: "Two Person Moves", value: "Two Person Moves" },
  { label: "Both (One or Two Person Moves)", value: "Both" },
];

const relationshipOptions = [
  { label: "Spouse", value: "Spouse" },
  { label: "Parent", value: "Parent" },
  { label: "Sibling", value: "Sibling" },
  { label: "Friend", value: "Friend" },
  { label: "Other", value: "Other" },
];

const validationSchema = Yup.object().shape({
  experience: Yup.boolean()
    .required("Please select your experience level")
    .typeError("Please select your experience level"),
  month: Yup.string().when('experience', (experience, schema) => {
    return experience[0] === true ?
      schema.required("Please select experience duration") :
      schema.notRequired();
  }),
  howManyPerson: Yup.string()
    .required("Please select team size")
    .typeError("Please select team size"),
  canWorkThisWeekend: Yup.boolean()
    .required("Please select weekend availability")
    .typeError("Please select weekend availability"),
  // Address is optional for now (fields validate only if provided)
  address: Yup.object().shape({
    addressLine1: Yup.string()
      .min(3, "Address must be at least 3 characters")
      .max(300, "Address must be at most 300 characters"),
    city: Yup.string()
      .min(2, "City must be at least 2 characters")
      .max(100, "City must be at most 100 characters"),
    state: Yup.string()
      .min(2, "State must be at least 2 characters")
      .max(100, "State must be at most 100 characters"),
    postalCode: Yup.string()
      .min(3, "Postal code must be at least 3 characters")
      .max(10, "Postal code must be at most 10 characters"),
  }).notRequired(),
  // Emergency contact removed per requirement
});

interface ICompleteProfile {
  experience: boolean;
  month: string;
  howManyPerson: string;
  canWorkThisWeekend: boolean;
  // emergency contact removed
  address?: {
    addressLine1?: string;
    city?: string;
    state?: string;
    postalCode?: string;
    latitude?: number | string;
    longitude?: number | string;
  };
}

const CompleteProfile = ({ token, name, onNext, onBack, initialData }: { token: string; name: string; onNext: (data: any) => void; onBack?: () => void; initialData?: any }) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);


  // Field-level validation state
  const [fieldErrors, setFieldErrors] = useState({});

  // Field-level validation functions
  const validateEmergencyContactName = (value: string) => {
    if (!value) return "Emergency contact name is required";
    if (value.length < 2) return "Name must be at least 2 characters";
    return "";
  };

  const validateEmergencyContactPhone = (value: string) => {
    if (!value) return "Emergency contact phone is required";
    if (!/^[0-9+\s-]{8,15}$/.test(value)) return "Enter a valid phone number";
    return "";
  };

  const validateEmergencyContactRelationship = (value: string) => {
    if (!value) return "Emergency contact relationship is required";
    return "";
  };

  const initialValues: ICompleteProfile = initialData || {
    experience: false,
    month: "",
    howManyPerson: "",
    canWorkThisWeekend: false,

    address: {
      addressLine1: "",
      city: "",
      state: "",
      postalCode: "",
      latitude: "",
      longitude: "",
    },
  };

  const onSubmit = async (values: any) => {
    try {
      // Prepare the API request body
      const requestBody = {
        experience: values.experience,
        month: values.month || '0',
        howManyPerson: values.howManyPerson,
        canWorkThisWeekend: values.canWorkThisWeekend,
        // Backend requires this field; send dummy default false
        haveEmergencyContact: false,

        address: values.address && (values.address.addressLine1 || values.address.city || values.address.state || values.address.postalCode)
          ? values.address
          : undefined,
      };

      // Submit-guard for step 3
      const signature = buildSignature(requestBody);
      if (shouldSkipSubmit(3, signature)) {
        onNext(values);
        return;
      }
      // Call the real API with token
      const res = await completeMoverProfile({ ...requestBody, token });

      if (res && res.status === 200) {
        markSubmitted(3, signature);
        onNext(values);
      } else {
        errorToast(res?.message || "Something went wrong. Please try again.");
      }
    } catch (error) {
      errorToast("Something went wrong. Please try again.");
    }
  };

  const {
    values,
    errors,
    touched,
    handleChange,
    handleBlur,
    handleSubmit,
    isSubmitting,
    setFieldValue,
    submitCount,
    setFieldTouched,
  }: any = useFormik({
    initialValues: initialValues,
    validationSchema,
    onSubmit,
  });

  const colMoverInput = (
    name: string,
    placeholder: string,
    type?: string,
    setField?: (name: string, value: string) => void,
    validator?: (value: string) => string
  ) => {
    // Get the field path parts
    const pathParts = name.split('.');
    const fieldName = pathParts[pathParts.length - 1];

    // Get the field value using path parts
    let fieldValue = values;
    for (const part of pathParts) {
      fieldValue = fieldValue?.[part] ?? "";
    }

    // Get the touched state for this field
    let touchedField = touched;
    for (const part of pathParts) {
      touchedField = touchedField?.[part] ?? false;
    }

    // Get the error for this field
    let errorField = errors;
    for (const part of pathParts) {
      errorField = errorField?.[part] ?? "";
    }

    return (
      <MoverInput
        className={type !== "checkbox" ? "mb-3 mt-3" : ""}
        name={name}
        label={placeholder}
        isFloating={type !== "checkbox"}
        id={name}
        placeholder={placeholder}
        value={fieldValue}
        type={type || "text"}
        onChange={(e: any) => {
          const newValue = e.target.value?.toString();

          if (setField) {
            setField(name, newValue);
          } else {
            handleChange(e);
          }

          // Apply field-level validation if provided
          if (validator) {
            const errorKey = `emergencyContact${fieldName.charAt(0).toUpperCase() + fieldName.slice(1)}`;
            setFieldErrors(prev => ({
              ...prev,
              [errorKey]: validator(newValue)
            }));
          }
        }}
        onBlur={handleBlur}
        error={(touchedField || submitCount > 0) && errorField}
        touched={touchedField}
      />
    );
  };

  const LoadingSpinner = () => (
    <div className="spinner-border spinner-border-sm" role="status" style={{ width: '16px', height: '16px' }}>
      <span className="visually-hidden">Loading...</span>
    </div>
  );


  return (
    <div className="profile-form-wrapper compact">
      <div className="form-header">
        <h3>More About Yourself</h3>
        <p className="form-description">Tell us more about your experience and availability</p>
      </div>

      {/* Combined Experience, Team Size, and Weekend Availability Section */}
      <div className="form-section" style={{ background: "#fff" }}>
        <div className="row">
          {/* Experience (left) */}
          <div className="col-12 col-lg-6">
            <div className="tabRadioWraper">
              <p>Are you experienced or a fresher?</p>
              <div className="d-flex gap-4">
                <MoverInput
                  label="Experienced"
                  name="experience"
                  placeholder="Experienced"
                  type="radio"
                  value="true"
                  checked={values.experience === true}
                  onChange={() => setFieldValue("experience", true)}
                  className="radioCheck"
                />
                <MoverInput
                  label="Fresher"
                  name="experience"
                  placeholder="Fresher"
                  type="radio"
                  value="false"
                  checked={values.experience === false}
                  onChange={() => setFieldValue("experience", false)}
                  className="radioCheck"
                />
              </div>
              {errors.experience && (touched.experience || submitCount > 0) ? (
                <span className="errorMessage">{errors.experience}</span>
              ) : null}
            </div>
          </div>
          {/* Experience Duration (right, shown when experienced) */}
          {values.experience && (
            <div className="col-12 col-lg-6">
              <Select
                placeholder="Select experience duration"
                label="How many years/months of experience?"
                id="month"
                name="month"
                value={values.month}
                option={experienceOptions}
                className="select-sm"
                onChange={(value) => {
                  const syntheticEvent = {
                    target: {
                      name: "month",
                      value
                    }
                  } as any;
                  handleChange(syntheticEvent);
                }}
              />
              {errors.month && (touched.month || submitCount > 0) ? (
                <span className="errorMessage">{errors.month}</span>
              ) : null}
            </div>
          )}
        </div>

        {/* Weekend Availability (left) and Team Size (right) */}
        <div className="row mt-2">
          {/* Weekend Availability */}
          <div className="col-12 col-lg-6">
            <div className="tabRadioWraper">
              <p>Can you work this weekend?</p>
              <div className="d-flex gap-4">
                <MoverInput
                  label="Yes"
                  name="canWorkThisWeekend"
                  placeholder="Yes"
                  type="radio"
                  value="true"
                  checked={values.canWorkThisWeekend === true}
                  onChange={() => setFieldValue("canWorkThisWeekend", true)}
                  className="radioCheck"
                />
                <MoverInput
                  label="No"
                  name="canWorkThisWeekend"
                  placeholder="No"
                  type="radio"
                  value="false"
                  checked={values.canWorkThisWeekend === false}
                  onChange={() => setFieldValue("canWorkThisWeekend", false)}
                  className="radioCheck"
                />
              </div>
              {errors.canWorkThisWeekend && (touched.canWorkThisWeekend || submitCount > 0) ? (
                <span className="errorMessage">{errors.canWorkThisWeekend}</span>
              ) : null}
            </div>
          </div>

          {/* Team Size */}
          <div className="col-12 col-lg-6">
            <Select
              placeholder="Select team size"
              label="Please select below *"
              id="howManyPerson"
              name="howManyPerson"
              value={values.howManyPerson}
              option={teamSizeOptions}
              className="select-sm"
              onChange={(value) => {
                const syntheticEvent = {
                  target: {
                    name: "howManyPerson",
                    value
                  }
                } as any;
                handleChange(syntheticEvent);
              }}
            />
            {errors.howManyPerson && (touched.howManyPerson || submitCount > 0) ? (
              <span className="errorMessage">{errors.howManyPerson}</span>
            ) : null}
          </div>
        </div>
      </div>

      {/* Address (above Emergency Contact) */}
      <div className="form-section" style={{ background: "#fff" }}>
        <h6>Your Address *</h6>
        <div className="row mt-1">
          <div className="col-12 ">
            {/* Booking page search bar */}
            <AddressMoverInput
              label="Address"
              becomeMoverFlow
              value={values.address?.addressLine1 || ""}
              onSelectAddress={(addr: any) => {
                setFieldValue("address.addressLine1", addr?.addressLine1 || values.address?.addressLine1 || "");
                setFieldValue("address.city", addr?.city || values.address?.city || "");
                setFieldValue("address.state", addr?.state || values.address?.state || "");
                setFieldValue("address.postalCode", addr?.postalCode || values.address?.postalCode || "");
                if (addr?.latitude) setFieldValue("address.latitude", addr.latitude);
                if (addr?.longitude) setFieldValue("address.longitude", addr.longitude);

              }}
              error={(() => {
                if (submitCount <= 0) return undefined;
                const addrErr: any = (errors as any)?.address || {};
                return addrErr.addressLine1 || addrErr.city || addrErr.state || addrErr.postalCode;
              })()}
              handleBlur={() => {
                setFieldTouched('address.addressLine1', true);
                const v = (values.address?.addressLine1 || '').trim();
                if (!v) {
                  setFieldValue('address.city', '');
                  setFieldValue('address.state', '');
                  setFieldValue('address.postalCode', '');
                  setFieldValue('address.latitude', '');
                  setFieldValue('address.longitude', '');
                }
              }}
            />
          </div>

        </div>
      </div>


      <div className="footerBtn d-flex justify-content-between align-items-center">
        {onBack ? (
          <IconButton
            title="Back"
            icon={<FaArrowAltCircleLeft />}
            iconPosition="left"
            onClick={() => {
              if (onBack) onBack();
            }}
            className="footerButton back-button"
          />
        ) : <span />}
        {(() => {
          const hasExperience = values.experience === true || values.experience === false;
          const hasMonthIfExperienced = values.experience ? Boolean(values.month) : true;
          const hasTeam = Boolean(values.howManyPerson);
          const hasWeekend = values.canWorkThisWeekend === true || values.canWorkThisWeekend === false;
          const hasAddress = true; // address optional for enabling Next Step
          const noErrors = Object.keys(errors || {}).length === 0;
          const canProceed = hasExperience && hasMonthIfExperienced && hasTeam && hasWeekend && hasAddress && noErrors && !isSubmitting;
          return (
            <IconButton
              title={isSubmitting ? "Processing..." : "Next Step"}
              icon={isSubmitting ? <LoadingSpinner /> : <FaArrowAltCircleRight />}
              onClick={() => {
                handleSubmit();
              }}
              disabled={!canProceed}
            />
          );
        })()}
      </div>
    </div>
  );
};

export default CompleteProfile;