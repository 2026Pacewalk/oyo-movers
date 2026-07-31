import React, { useState } from "react";
import MoverInput from "./MoverInput";
import IconButton from "../IconButton";
import { FaArrowAltCircleRight, FaArrowAltCircleLeft } from "react-icons/fa";
import "./submitApplication.scss";

const SubmitApplication = ({ value, handleChange, handleBlur, errors, handleSubmit, onBack, submitCount = 0, isSubmitting }: any) => {
  const [fieldTouched, setFieldTouched] = useState({
    agreeToTerms: false,
    understandsWorkRights: false,
  });

  const markTouched = (field: keyof typeof fieldTouched) => {
    setFieldTouched((prev) => ({ ...prev, [field]: true }));
  };

  const LoadingSpinner = () => (
    <div className="spinner-border spinner-border-sm" role="status" style={{ width: '16px', height: '16px' }}>
      <span className="visually-hidden">Loading...</span>
    </div>
  );
  return (
    <div className="profile-form-wrapper submit-application-wrapper">
      {/* <div className="form-header">
        <h3>Submit Application</h3>
        <p className="form-description">Please confirm the following to submit your application for review.</p>
      </div> */}
      
      <div className="form-section">
        {/* <h5 className="mb-3">Final Confirmation</h5> */}
        
        <div className="emergency-checkbox-container mb-1">
          <MoverInput
            name="finalSubmission.agreeToTerms"
            id="finalSubmission.agreeToTerms"
            type="checkbox"
            className="emergency-checkbox"
            checked={Boolean(value?.agreeToTerms)}
            onChange={(e: any) => {
              handleChange(e);
              markTouched("agreeToTerms");
            }}
            onBlur={handleBlur}
          />
          <label htmlFor="finalSubmission.agreeToTerms" className="emergency-checkbox-label">
          By continuing, you confirm that you are capable of heavy liftings and agree to Oyo{" "}
          <a href="/movers-term" target="_blank" rel="noopener noreferrer" className="terms-link">
            Movers Terms and Conditions
          </a>{" "}
          &{" "}
          <a href="/privacy-policy" target="_blank" rel="noopener noreferrer" className="terms-link">
            Privacy Policy
          </a>.
          </label>
        </div>
        {fieldTouched.agreeToTerms && !Boolean(value?.agreeToTerms) && (
          <div className="text-danger mb-3">Please agree to the final confirmation to proceed</div>
        )}

        <div className="emergency-checkbox-container mb-1">
          <MoverInput
            name="finalSubmission.understandsWorkRights"
            id="finalSubmission.understandsWorkRights"
            type="checkbox"
            className="emergency-checkbox"
            checked={Boolean(value?.understandsWorkRights)}
            onChange={(e: any) => {
              handleChange(e);
              markTouched("understandsWorkRights");
            }}
            onBlur={handleBlur}
          />
          <label htmlFor="finalSubmission.understandsWorkRights" className="emergency-checkbox-label">
            You also understand that to work with OYO, you must have work rights, hold public liability insurance and provide proof of these to OYO Admin before starting any job.
          </label>
        </div>
        {fieldTouched.understandsWorkRights && !Boolean(value?.understandsWorkRights) && (
          <div className="text-danger mb-3">Please confirm you understand these requirements to proceed</div>
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
          const agreeOk = Boolean((value as any)?.agreeToTerms);
          const understandOk = Boolean((value as any)?.understandsWorkRights);
          const hasInsurance = (value as any)?.liabilityIns?.hasInsurance;
          const localDoc = (value as any)?.insuranceDocument;
          const serverDocs = (value as any)?.liabilityInsServerDocs || [];
          // If user selected "No" for insurance, skip insurance document validation
          const insuranceOk = hasInsurance === false || Boolean(localDoc) || (Array.isArray(serverDocs) && serverDocs.length > 0);
          const canProceed = agreeOk && understandOk && insuranceOk && !isSubmitting;
          
          // Debug logging
          console.log('SubmitApplication Debug:', {
            agreeOk,
            understandOk,
            hasInsurance,
            localDoc,
            serverDocs,
            insuranceOk,
            canProceed,
            value
          });
          return (
            <IconButton
              onClick={async () => {
                if (!value?.agreeToTerms || !value?.understandsWorkRights) {
                  setFieldTouched((prev: any) => ({ ...prev, agreeToTerms: true }));
                  setFieldTouched((prev: any) => ({ ...prev, understandsWorkRights: true }));
                  return;
                }
                handleSubmit();
              }}
              title={isSubmitting ? "Processing..." : "Submit"}
              icon={isSubmitting ? <LoadingSpinner /> : <FaArrowAltCircleRight />}
              className="footerButton"
              disabled={!canProceed}
            />
          );
        })()}
      </div>
    </div>
  );
};

export default SubmitApplication;


