import { Button, Col, Row } from "react-bootstrap";
import CustomModal from "../CustomModal";
import MoverInput from "./MoverInput";
import Select from "../Select";
import IconButton from "../IconButton";
import { FaArrowAltCircleRight, FaArrowAltCircleLeft, FaInfoCircle } from "react-icons/fa";
import { useState, useRef, useEffect } from "react";
import "./vehicleDetails.scss";
import { submitVehicleDetails } from "@/lib/serverAction/becomeMoverActions";
import { errorToast, successToast } from "@/lib/toaster";
import ExistingDocuments from "@/components/ExistingDocuments";
import UploadInput from "@/components/UploadInput";
import { buildSignature, shouldSkipSubmit, markSubmitted } from "./submitGuard";

const VehicalDetails = ({ value, setFieldValue, handleBlur, handleChange, errors, handleSubmit, token, onBack, touched, submitCount = 0, validateForm, onNext, refreshProfileData }: any) => {
  // Track field-level touched state
  const [fieldTouched, setFieldTouched] = useState({
    rego: false,
    vehicleType: false,
    vehicleMake: false,
    vehicleModel: false,
    vehicleYear: false,
    hasBranding: false,
    vehicleRegistration: false,
    vehiclePhotosFront: false,
    vehiclePhotosSide: false
  });

  // Track selected files
  const [vehicleRegistrationFile, setVehicleRegistrationFile] = useState<File | null>(null);
  const [vehiclePhotosFrontFile, setVehiclePhotosFrontFile] = useState<File | null>(null);
  const [vehiclePhotosSideFile, setVehiclePhotosSideFile] = useState<File | null>(null);

  // Track if form has been submitted
  const [formSubmitted, setFormSubmitted] = useState(false);

  // API submission state
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showInfoModal, setShowInfoModal] = useState(false);

  // File input refs for direct file access
  const vehicleRegistrationRef = useRef<HTMLInputElement>(null);
  const vehiclePhotosFrontRef = useRef<HTMLInputElement>(null);
  const vehiclePhotosSideRef = useRef<HTMLInputElement>(null);

  const removeFrom = (field: string) => (key: string) => {
    setFieldValue(
      field,
      (value[field.split(".")[1]] || []).filter((img: any) => img.key !== key)
    );
  };

  const selectVehicleOptions = [
    { label: "Van (2 Tonne or above) Minimum 10 cubic meters.", value: "Van" },
    {
      label: "Small Box Truck (3 Tonne or above) Minimum 12 cubic meters.",
      value: "Small Box Truck",
    },
    {
      label: "Medium Box Truck (4 Tonne or above) Minimum 18 cubic meters.",
      value: "Medium Box Truck",
    },
    {
      label: "Large Box Truck (8 Tonne or above) Minimum 34 cubic meters",
      value: "Large Box Truck",
    },
  ];

  // Issue State options (same as DrivingLicence.tsx)
  const issuestateoption = [
    { label: "ACT - Australian Capital Territory", value: "ACT" },
    { label: "NSW - New South Wales", value: "NSW" },
    { label: "NT - Northern Territory", value: "NT" },
    { label: "QLD - Queensland", value: "QLD" },
    { label: "TAS - Tasmania", value: "TAS" },
    { label: "VIC - Victoria", value: "VIC" },
    { label: "WA - Western Australia", value: "WA" },
  ];

  // Mark field as touched
  const markTouched = (field: string) => {
    setFieldTouched(prev => ({ ...prev, [field]: true }));
  };

  // Custom handleChange to mark fields as touched
  const handleFieldChange = (e: any) => {
    handleChange(e);
    const fieldName = e.target.name.split('.')[1];
    markTouched(fieldName);
  };

  // Handle API submission for vehicle details
  const handleApiSubmit = async () => {
    try {
      setIsSubmitting(true);

      // Skip API if unchanged since last success
      const norm = (v: any) => (v == null ? "" : String(v));
      const signature = JSON.stringify({
        rego: norm(value.rego),
        vehicleType: norm(value.vehicleType),
        vehicleYear: norm(value.vehicleYear),
        vehicleMake: norm(value.vehicleMake),
        vehicleModel: norm(value.vehicleModel),
        hasBranding: String(Boolean(value.hasBranding)),
      });
      if ((value as any)._lastSubmittedSignature === signature) {
        if (onNext) onNext(value);
        return true;
      }

      // Create FormData for form data (no file uploads - Required Documents section commented out)
      const formData = new FormData();

      // Add form data only (no vehicle photos)
      formData.append('hasBranding', value.hasBranding ? 'true' : 'false');
      formData.append('vehicleType', value.vehicleType || '');
      formData.append('vehicleYear', value.vehicleYear || '');
      formData.append('vehicleMake', value.vehicleMake || '');
      formData.append('vehicleModel', value.vehicleModel || '');
      formData.append('rego', value.rego || '');

      // Call the vehicle details API
      const res = await submitVehicleDetails(formData);

      if (res && res.status === 200) {
        setFieldValue("vehicalDetails._lastSubmittedSignature", signature);

        // Refresh profile data
        if (refreshProfileData) {
          await refreshProfileData();
        }

        // Directly proceed to next step without showing modal
        if (onNext) onNext(value);
        return true;
      } else {
        errorToast(res?.message || "Failed to submit vehicle details");
        return false;
      }
    } catch (error: any) {
      errorToast(error?.response?.data?.message || error.message || "Failed to submit vehicle details");
      return false;
    } finally {
      setIsSubmitting(false);
    }
  };

  // Get CSS classes based on form state
  const getWrapperClasses = () => {
    const classes = ["profile-form-wrapper", "vehicle-details-wrapper", "compact"];

    // Add field-touched class if any field has been touched
    if (Object.values(fieldTouched).some(value => value)) {
      classes.push("field-touched");
    }

    // Add form-submitted class if form has been submitted
    if (formSubmitted || submitCount > 0) {
      classes.push("form-submitted");
    }

    return classes.join(" ");
  };

  const LoadingSpinner = () => (
    <div className="spinner-border spinner-border-sm" role="status" style={{ width: '16px', height: '16px' }}>
      <span className="visually-hidden">Loading...</span>
    </div>
  );

  return (
    <div className={getWrapperClasses()}>
      <div className="form-header">
        <h3 style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
          Vehicle Details
          <FaInfoCircle
            style={{
              cursor: 'pointer',
              color: '#6c757d',
              fontSize: '16px',
              transition: 'color 0.2s ease'
            }}
            onMouseEnter={(e) => (e.target as HTMLElement).style.color = '#007bff'}
            onMouseLeave={(e) => (e.target as HTMLElement).style.color = '#6c757d'}
            onClick={() => setShowInfoModal(true)}
          />
        </h3>
        <p className="form-description" style={{ textAlign: 'center' }}>Please provide details about your vehicle for moving services</p>
      </div>

      <div className="form-section">
        <h5>Registration Details</h5>
        <Row className="registration-row">
          <Col md={4} sm={12}>
            <div className="label-wrapper">
              <label className="form-label">Rego</label>
            </div>
            <MoverInput
              hideLabel={true}
              name="vehicalDetails.rego"
              placeholder="Registration number"
              type="text"
              value={value.rego}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                handleFieldChange(e);
              }}
              onBlur={handleBlur}
              className="mb-3"
              error={(fieldTouched.rego || formSubmitted || submitCount > 0) && errors?.vehicalDetails?.rego}
            />
          </Col>
          <Col md={4} sm={12}>
            <div className="label-wrapper">
              <label className="form-label">Issue State</label>
            </div>
            <Select
              placeholder="Issue State"
              id="vehicalDetails.issueState"
              name="vehicalDetails.issueState"
              value={(issuestateoption.some(opt => opt.value === value.issueState) ? value.issueState : 'VIC')}
              option={issuestateoption}
              onChange={(val) => {
                const syntheticEvent = {
                  target: {
                    name: "vehicalDetails.issueState",
                    value: val,
                  }
                } as any;
                handleFieldChange(syntheticEvent);
              }}
              className="mb-3"
            />
          </Col>
          <Col md={4} sm={12}>
            <div className="label-wrapper">
              <label className="form-label">Vehicle Type</label>
            </div>
            <Select
              placeholder="Vehicle Type"
              id="vehicalDetails.vehicleType"
              name="vehicalDetails.vehicleType"
              value={value.vehicleType}
              option={selectVehicleOptions}
              onChange={(value) => {
                // Create a synthetic event for handleChange
                const syntheticEvent = {
                  target: {
                    name: "vehicalDetails.vehicleType",
                    value
                  }
                };
                handleFieldChange(syntheticEvent);
              }}
              className="vehicle-type-select mb-3"
              error={(fieldTouched.vehicleType || formSubmitted || submitCount > 0) && errors?.vehicalDetails?.vehicleType}
            />
          </Col>
        </Row>
        <h5 className="mt-2">Vehicle Information</h5>
        <Row>
          <Col md={4} sm={12}>
            <MoverInput
              label="Make"
              name="vehicalDetails.vehicleMake"
              placeholder="e.g., Toyota"
              type="text"
              value={value.vehicleMake}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                handleFieldChange(e);
              }}
              onBlur={handleBlur}
              className="mb-3"
              error={(fieldTouched.vehicleMake || formSubmitted || submitCount > 0) && errors?.vehicalDetails?.vehicleMake}
            />
          </Col>
          <Col md={4} sm={12}>
            <MoverInput
              label="Model"
              name="vehicalDetails.vehicleModel"
              placeholder="e.g., HiAce / Thar"
              type="text"
              value={value.vehicleModel}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                handleFieldChange(e);
              }}
              onBlur={handleBlur}
              className="mb-3"
              error={(fieldTouched.vehicleModel || formSubmitted || submitCount > 0) && errors?.vehicalDetails?.vehicleModel}
            />
          </Col>
          <Col md={4} sm={12}>
            <MoverInput
              label="Year"
              name="vehicalDetails.vehicleYear"
              placeholder="e.g., 2020"
              type="text"
              value={value.vehicleYear}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                handleFieldChange(e);
              }}
              onBlur={handleBlur}
              className="mb-3"
              error={(fieldTouched.vehicleYear || formSubmitted || submitCount > 0) && errors?.vehicalDetails?.vehicleYear}
            />
          </Col>
        </Row>
        <div className="tabRadioWraper">
          <p>Any branding on vehicle?</p>
          <div className="d-flex gap-4 align-items-center">
            <MoverInput
              label="Yes"
              name="vehicalDetails.hasBranding"
              type="radio"
              value="true"
              checked={value?.hasBranding === true}
              onChange={() => {
                setFieldValue("vehicalDetails.hasBranding", true);
                markTouched("hasBranding");
              }}
              className="radio-input"
            />
            <MoverInput
              label="No"
              name="vehicalDetails.hasBranding"
              type="radio"
              value="false"
              checked={value?.hasBranding === false}
              onChange={() => {
                setFieldValue("vehicalDetails.hasBranding", false);
                markTouched("hasBranding");
              }}
              className="radio-input"
            />
          </div>
          {(fieldTouched.hasBranding || formSubmitted || submitCount > 0) && errors?.vehicalDetails?.hasBranding && (
            <div className="text-danger">{errors?.vehicalDetails?.hasBranding}</div>
          )}
        </div>
      </div>

      {/* Required Documents section - commented out for now */}
      {/* <div className="form-section">
        <h5 className="">Required Documents</h5>
        
        <Row >
          <Col lg={6} md={12} sm={12}>
            <label className="form-label">Front view of vehicle</label>
            <ExistingDocuments docs={value?.serverPhotos} filterFn={(d: any) => d?.type === 'front'} />
            <UploadInput
              accept="image/*,.pdf"
              maxSize={2}
              selectedFile={vehiclePhotosFrontFile}
              onChange={(file: File | null) => {
                setVehiclePhotosFrontFile(file);
                setFieldValue("vehicalDetails.vehiclePhotosFront", file ? file.name : "");
                markTouched("vehiclePhotosFront");
              }}
              onRemove={() => {
                setVehiclePhotosFrontFile(null);
                if (vehiclePhotosFrontRef.current) vehiclePhotosFrontRef.current.value = "";
                setFieldValue("vehicalDetails.vehiclePhotosFront", "");
              }}
              error={(fieldTouched.vehiclePhotosFront || formSubmitted || submitCount > 0) && (!Array.isArray(value?.serverPhotos) || value.serverPhotos.length === 0) && errors?.vehicalDetails?.vehiclePhotosFront}
            />
          </Col>
          <Col lg={6} md={12} sm={12}>
            <label className="form-label">Side view of vehicle</label>
            <ExistingDocuments docs={value?.serverPhotos} filterFn={(d: any) => d?.type === 'side'} />
            <UploadInput
              accept="image/*,.pdf"
              maxSize={2}
              selectedFile={vehiclePhotosSideFile}
              onChange={(file: File | null) => {
                setVehiclePhotosSideFile(file);
                setFieldValue("vehicalDetails.vehiclePhotosSide", file ? file.name : "");
                markTouched("vehiclePhotosSide");
              }}
              onRemove={() => {
                setVehiclePhotosSideFile(null);
                if (vehiclePhotosSideRef.current) vehiclePhotosSideRef.current.value = "";
                setFieldValue("vehicalDetails.vehiclePhotosSide", "");
              }}
              error={(fieldTouched.vehiclePhotosSide || formSubmitted || submitCount > 0) && (!Array.isArray(value?.serverPhotos) || value.serverPhotos.length === 0) && errors?.vehicalDetails?.vehiclePhotosSide}
            />
          </Col>
        </Row>
      </div> */}

      <div className="footerBtn d-flex justify-content-between align-items-center">
        <IconButton
          title="Back"
          icon={<FaArrowAltCircleLeft />}
          iconPosition="left"
          onClick={onBack}
          className="footerButton back-button"

        />
        {(() => {
          // Vehicle photos no longer required (Required Documents section commented out)
          const regoOk = Boolean(value?.rego);
          const typeOk = Boolean(value?.vehicleType);
          const makeOk = Boolean(value?.vehicleMake);
          const modelOk = Boolean(value?.vehicleModel);
          const yearOk = Boolean(value?.vehicleYear);
          const brandingOk = value?.hasBranding === true || value?.hasBranding === false;
          // Filter out vehicle photo errors since they're no longer required
          const relevantErrors = errors?.vehicalDetails ? Object.entries(errors.vehicalDetails).filter(([key]) =>
            key !== 'vehiclePhotosFront' && key !== 'vehiclePhotosSide'
          ) : [];
          const noErrors = relevantErrors.length === 0;
          const canProceed = regoOk && typeOk && makeOk && modelOk && yearOk && brandingOk && noErrors && !isSubmitting;
          return (
            <IconButton
              title={isSubmitting ? "Processing..." : "Next Step"}
              icon={isSubmitting ? <LoadingSpinner /> : <FaArrowAltCircleRight />}
              onClick={async () => {
                setFormSubmitted(true);

                // First validate the form (vehicle photos no longer required)
                const validationErrors = await validateForm();
                if (validationErrors && Object.keys(validationErrors).length > 0) {
                  // Mark fields as touched to show validation errors (excluding vehicle photos)
                  if (validationErrors.vehicalDetails?.rego) {
                    markTouched("rego");
                  }
                  if (validationErrors.vehicalDetails?.vehicleType) {
                    markTouched("vehicleType");
                  }
                  if (validationErrors.vehicalDetails?.vehicleMake) {
                    markTouched("vehicleMake");
                  }
                  if (validationErrors.vehicalDetails?.vehicleModel) {
                    markTouched("vehicleModel");
                  }
                  if (validationErrors.vehicalDetails?.vehicleYear) {
                    markTouched("vehicleYear");
                  }
                  if (validationErrors.vehicalDetails?.hasBranding) {
                    markTouched("hasBranding");
                  }
                  return; // Don't proceed if validation fails
                }

                // Build signature for step 7 (no files needed)
                const signature = buildSignature({
                  rego: value?.rego || "",
                  vehicleType: value?.vehicleType || "",
                  vehicleYear: value?.vehicleYear || "",
                  vehicleMake: value?.vehicleMake || "",
                  vehicleModel: value?.vehicleModel || "",
                  hasBranding: Boolean(value?.hasBranding),
                });
                if (shouldSkipSubmit(7 as any, signature)) {
                  if (onNext) onNext(value);
                  return;
                }

                // Submit via API (no files)
                const ok = await handleApiSubmit();
                if (ok) {
                  try {
                    markSubmitted(7 as any, signature);
                  } catch { }
                }
              }}
              disabled={!canProceed}
              className="footerButton"

            />
          );
        })()}
      </div>


      <CustomModal
        title="Add More Vehicles"
        close={() => setShowInfoModal(false)}
        show={showInfoModal}
        showFooter={false}
        mainClassName="thankYouWrapper"
      >
        <div className="d-flex flex-column thankingApplication">
          <p>You can add more vehicles after completing the on-boarding process.</p>
          <div className="d-flex justify-content-center">
            <Button
              variant="primary"
              className="signupButton"
              onClick={() => setShowInfoModal(false)}
            >
              Ok
            </Button>
          </div>
        </div>
      </CustomModal>
    </div>
  );
};

export default VehicalDetails;
