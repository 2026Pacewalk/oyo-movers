import React, { useState } from "react";
import Button from "../Button";
import IconButton from "../IconButton";
import { FaArrowAltCircleRight, FaArrowAltCircleLeft } from "react-icons/fa";
import MoverInput from "./MoverInput";
import * as Yup from "yup";
import { submitAbnDetails } from "@/lib/serverAction/becomeMoverActions";
import { errorToast } from "@/lib/toaster";
import { buildSignature, markSubmitted, shouldSkipSubmit } from "./submitGuard";

const BussinessNumber = ({
  value,
  setFieldValue,
  handleBlur,
  handleChange,
  errors,
  touched,
  handleSubmit,
  validateForm,
  onBack,
  onNext,
  submitCount = 0,
}: any) => {
  // Field-level validation state
  const [fieldErrors, setFieldErrors] = useState({
    abn: "",
    businessName: "",
    businessAddress: "",
    invoiceEmail: "",
  });

  // Loading state for API call
  const [isSubmitting, setIsSubmitting] = useState(false);

  // API submission function
  const handleApiSubmit = async () => {
    setIsSubmitting(true);
    try {
      const requestBody = {
        abn: value?.business?.abn,
        isGstRegistered: value?.business?.isGstRegistered,
        businessName: value?.business?.businessName,
        businessAddress: value?.business?.businessAddress,
        invoiceEmail: value?.business?.invoiceEmail,
        agreeToTerms: value?.business?.agreeToTerms,
      };

      // Skip API if unchanged since last success (step 4)
      const signature = buildSignature(requestBody);
      if (shouldSkipSubmit(4, signature)) {
        if (onNext) onNext(value?.business);
        return;
      }

      const res = await submitAbnDetails(requestBody);

      if (res && res.status === 200) {
        markSubmitted(4, signature);
        // Call onNext to proceed to next step
        if (onNext) {
          onNext(value?.business);
        }
      } else {
        errorToast(res?.message || "Failed to submit ABN details");
      }
    } catch (error: any) {
      console.error("ABN Details submission error:", error);
      errorToast("Failed to submit ABN details. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  // Field-level validation functions
  const validateAbn = (value: string) => {
    if (!value) return "ABN is required";
    if (!/^\d{11}$/.test(value)) return "ABN must be exactly 11 digits";
    return "";
  };

  const validateEmail = (value: string) => {
    if (!value) return "Invoice email is required";
    if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(value)) {
      return "Please enter a valid email address";
    }
    return "";
  };

  const validateBusinessName = (value: string) => {
    if (!value) return "Business name is required";
    if (value.length < 2) return "Business name must be at least 2 characters";
    return "";
  };

  const validateBusinessAddress = (value: string) => {
    if (!value) return "Business address is required";
    if (value.length < 10) return "Business address must be at least 10 characters long";
    return "";
  };

  // mount and props

  const isBussinessRegistered = (v: any) => {
    setFieldValue("business.isGstRegistered", v);
  };
  // render

  const LoadingSpinner = () => (
    <div className="spinner-border spinner-border-sm" role="status" style={{ width: '16px', height: '16px' }}>
      <span className="visually-hidden">Loading...</span>
    </div>
  );

  return (
    <div className="profile-form-wrapper compact">
      <div className="form-header">
        <h3>ABN Details</h3>
        <p className="form-description">Please provide your Australian Business Number details</p>
      </div>
      
      <div className="form-section" style={{ background: "#fff" }}>
        <div className="label-wrapper">
          <label className="form-label">Australian Business Number *</label>
        </div>
        <MoverInput
          name="business.abn"
          placeholder="Enter ABN"
          type="text"
          value={value?.business?.abn ?? ""}
          onChange={(e: any) => {
            const digitsOnly = (e?.target?.value || "").replace(/[^\d]/g, "");
            handleChange({ target: { name: "business.abn", value: digitsOnly } });
            // Immediate field validation
            setFieldErrors(prev => ({
              ...prev,
              abn: validateAbn(digitsOnly)
            }));
          }}
          onBlur={handleBlur}
          error={(touched?.business?.abn || submitCount > 0) && errors?.business?.abn}
          touched={touched?.business?.abn}
          // maxLength handled in onChange
          className="mb-3"
        />
        
        <div className="tabRadioWraper">
          <p>GST Registered</p>
          <div className="d-flex gap-4">
          <MoverInput
              label="Yes"
              name="business.isGstRegistered"
              type="radio"
              value={"true"}
              className="d-flex gap-2"
              checked={value?.business?.isGstRegistered === true}
              onChange={() => isBussinessRegistered(true)}
            />
          <MoverInput
              label="No"
              name="business.isGstRegistered"
              type="radio"
              value={"false"}
              className="d-flex gap-2"
              checked={value?.business?.isGstRegistered === false}
              onChange={() => isBussinessRegistered(false)}
            />
          </div>
          {(touched?.business?.isGstRegistered || submitCount > 0) && errors?.business?.isGstRegistered && (
            <div className="text-danger">{errors.business.isGstRegistered}</div>
          )}
        </div>
      </div>
      
      {false && (
        <div className="form-section" style={{ background: "#fff" }}>
          <h5 className="mb-3">Business Information</h5>
          {/* Business Name */}
          <MoverInput label="Business Name" name="business.businessName" placeholder="Enter business name" className="mb-3" value={value?.business?.businessName ?? ""} onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            handleChange(e);
            setFieldErrors(prev => ({ ...prev, businessName: validateBusinessName(e.target.value) }));
          }} onBlur={handleBlur} error={(touched?.business?.businessName || submitCount > 0) && errors?.business?.businessName} touched={touched?.business?.businessName} />
          {/* Business Address */}
          <MoverInput label="Business Address" name="business.businessAddress" placeholder="Enter business address" className="mb-3" value={value?.business?.businessAddress ?? ""} onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            handleChange(e);
            setFieldErrors(prev => ({ ...prev, businessAddress: validateBusinessAddress(e.target.value) }));
          }} onBlur={handleBlur} error={(touched?.business?.businessAddress || submitCount > 0) && errors?.business?.businessAddress} touched={touched?.business?.businessAddress} />
          {/* Invoice Email */}
          <MoverInput label="Invoice Email" name="business.invoiceEmail" placeholder="Enter invoice email" type="email" className="mb-3" value={value?.business?.invoiceEmail ?? ""} onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            handleChange(e);
            setFieldErrors(prev => ({ ...prev, invoiceEmail: validateEmail(e.target.value) }));
          }} onBlur={handleBlur} error={(touched?.business?.invoiceEmail || submitCount > 0) && errors?.business?.invoiceEmail} touched={touched?.business?.invoiceEmail} />
        </div>
      )}
      
      <div className="form-section" style={{ background: "#fff" }}>
        <div className="emergency-checkbox-container">
          <MoverInput
            name="business.agreeToTerms"
            id="business.agreeToTerms"
            type="checkbox"
            className="emergency-checkbox"
            checked={Boolean(value?.business?.agreeToTerms)}
            onChange={(e: any) => {
              handleChange(e);
            }}
            onBlur={handleBlur}
          />
          <label htmlFor="business.agreeToTerms" className="emergency-checkbox-label">
            <span>By Clicking On The Button, I Acknowledge and Agree That:</span>
            <ul style={{ margin: 0, paddingLeft: 18 }}>
              <li>I am providing services to Oyo Movers through the business to which the ABN relates.</li>
              <li>By providing this information, I expressly consent for OYO, where required to issue invoices on behalf of my business for the services provided by my business in response to leads generated to Oyo Platform.</li>
              <li>I’m sole trader, director, or employee of above business where this ABN is associated.</li>
              <li>All above information is correct, and Oyo has no liability for any inaccurate information provided by me.</li>
            </ul>
          </label>
        </div>
        {(touched?.business?.agreeToTerms || submitCount > 0) && errors?.business?.agreeToTerms && (
          <div className="text-danger">{errors.business.agreeToTerms}</div>
        )}
      </div>

      <div className="footerBtn d-flex justify-content-between align-items-center">
        <IconButton
          title="Back"
          icon={<FaArrowAltCircleLeft />}
          iconPosition="left"
          onClick={onBack}
          className="footerButton back-button"
        />
        {(() => {
          // Compute readiness to proceed: required fields + no validation errors
          const abnOk = /^\d{11}$/.test(String(value?.business?.abn || ""));
          const gstOk = value?.business?.isGstRegistered === true || value?.business?.isGstRegistered === false;
          const agreeOk = Boolean(value?.business?.agreeToTerms);
          const noErrors = !(errors?.business && Object.values(errors.business).some(Boolean));
          const canProceed = abnOk && gstOk && agreeOk && noErrors && !isSubmitting;

          return (
            <IconButton
           title={isSubmitting ? "Processing..." : "Next Step"}
           icon={isSubmitting ? <LoadingSpinner /> : <FaArrowAltCircleRight />}
          onClick={async () => {
            // Validate the form and get validation errors
            const validationErrors = await validateForm();
            // Check if there are any validation errors
            const hasErrors = validationErrors?.business && Object.keys(validationErrors.business).length > 0;
            if (!hasErrors) {
              // If no validation errors, proceed with API call
              await handleApiSubmit();
            } else {
              // Trigger form submission to show validation errors
              handleSubmit();
            }
          }}
          className="footerButton"
          disabled={!canProceed}
          // type is set in IconButton component
        />
          );
        })()}
      </div>
    </div>
  );
};

export default BussinessNumber;
