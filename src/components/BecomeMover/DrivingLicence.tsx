import { Button, Row, Col } from "react-bootstrap";
import Select from "../Select";
import CustomDatePicker from "../CustomDatePicker";
import moment from "moment";
import IconButton from "../IconButton";
import { FaArrowAltCircleRight, FaArrowAltCircleLeft } from "react-icons/fa";
import { useState, useRef, useEffect } from "react";
import "./drivingLicence.scss";
import { errorToast, successToast } from "@/lib/toaster";
import UploadInput from "@/components/UploadInput";
import { buildSignature, markSubmitted, shouldSkipSubmit } from "./submitGuard";
import ExistingDocuments from "../ExistingDocuments";
import { submitDrivingLicense } from "@/lib/serverAction/becomeMoverActions";

const issuestateoption = [
  { label: "ACT - Australian Capital Territory", value: "ACT" },
  { label: "NSW - New South Wales", value: "NSW" },
  { label: "NT - Northern Territory", value: "NT" },
  { label: "QLD - Queensland", value: "QLD" },
  { label: "TAS - Tasmania", value: "TAS" },
  { label: "VIC - Victoria", value: "VIC" },
  { label: "WA - Western Australia", value: "WA" },
];

const DrivingLicence = ({
  value,
  setFieldValue,
  handleChange,
  errors,
  handleSubmit,
  validateForm,
  token,
  onBack,
  onNext,
  touched,
  submitCount = 0,
  refreshProfileData,
}: any) => {
  // Track field-level touched state
  const [fieldTouched, setFieldTouched] = useState({
    issueState: false,
    licenseFront: false,
    licenseBack: false
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [frontFile, setFrontFile] = useState<File | null>(null);
  const [backFile, setBackFile] = useState<File | null>(null);
  const frontFileInputRef = useRef<HTMLInputElement>(null);
  const backFileInputRef = useRef<HTMLInputElement>(null);

  // Track if form has been submitted
  const [formSubmitted, setFormSubmitted] = useState(false);

  // Set default issueState on component mount
  useEffect(() => {
    if (!value.issueState) {
      setFieldValue("drivingLicence.issueState", "VIC");
    }
  }, [value.issueState, setFieldValue]);

  const handelRemoveClick = (key: string) => {
    setFieldValue(
      "drivingLicence.drivingLicense",
      value.drivingLicense.filter((item: any) => item.key !== key)
    );
  };

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

  // Get CSS classes based on form state
  const getWrapperClasses = () => {
    const classes = ["profile-form-wrapper", "driving-licence-wrapper", "compact"];

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

  // Handle API submission for driving license
  const handleApiSubmit = async () => {
    try {
      setIsSubmitting(true);

      // Get files from state
      const frontFileFromInput = frontFile;
      const backFileFromInput = null; // Back image no longer required

      // Skip API if unchanged since last success (no new files and same issueState)
      const norm = (v: any) => (v == null ? "" : String(v));
      const signature = JSON.stringify({
        issueState: norm(value?.issueState),
        frontName: frontFileFromInput ? norm(frontFileFromInput.name) : "",
        serverDocCount: Array.isArray(value?.serverDocs) ? value.serverDocs.length : 0,
      });
      const noNewFilesSelected = !frontFileFromInput && !backFileFromInput;
      if ((value as any)._lastSubmittedSignature === signature && noNewFilesSelected) {
        if (onNext) onNext(value);
        return;
      }

      // Validate that front file is selected
      if (!frontFileFromInput) {
        errorToast("Please select the front side of your driver's license");
        return;
      }

      // Create FormData for file upload
      const formData = new FormData();

      // Add actual data from form and files
      formData.append('issueState', value?.issueState || 'VIC');
      if (value?.expiryDate) {
        formData.append('expiryDate', value.expiryDate);
      }
      formData.append('licenseFront', frontFileFromInput); // Front side of driver's license
      // Back side no longer required

      // Call the driving license API
      const res = await submitDrivingLicense(formData);

      if (res && res.status === 200) {
        setFieldValue("drivingLicence._lastSubmittedSignature", signature);

        // Refresh profile data to get latest server documents
        if (refreshProfileData) {
          await refreshProfileData();
        }

        // Call onNext if provided
        if (onNext) {
          onNext(value);
        }
      } else {
        errorToast(res?.message || "Failed to submit driving license details");
      }
    } catch (error: any) {
      errorToast(error?.response?.data?.message || error.message || "Failed to submit driving license details");
    } finally {
      setIsSubmitting(false);
    }
  };

  const LoadingSpinner = () => (
    <div className="spinner-border spinner-border-sm" role="status" style={{ width: '16px', height: '16px' }}>
      <span className="visually-hidden">Loading...</span>
    </div>
  );

  return (
    <div className={getWrapperClasses()}>
      <div className="form-header">
        <h3>Driver Licence</h3>
        <p className="form-description">Upload your driver's licence details for verification</p>
      </div>

        <div className="form-section">
          <h5 >Licence Information</h5>
          <div className="row align-items-center">
            <div className="col-md-6">
              <Select
                placeholder="Issue State"
                label="Issue State"
                id="drivingLicence.issueState"
                name="drivingLicence.issueState"
                value={(issuestateoption.some(opt => opt.value === value.issueState) ? value.issueState : 'VIC')}
                option={issuestateoption}
                onChange={(value) => {
                  const syntheticEvent = { target: { name: "drivingLicence.issueState", value } } as any;
                  handleFieldChange(syntheticEvent);
                }}
                error={fieldTouched.issueState && errors?.drivingLicence?.issueState}
              />
              {value.issueState && !issuestateoption.some(opt => opt.value === value.issueState) && (
                <small className="text-warning d-block mt-1">Unrecognized state from profile: {String(value.issueState)}. Defaulted to VIC.</small>
              )}
            </div>
            <div className="col-md-6">
              <CustomDatePicker
                value={value?.expiryDate}
                onChange={(newValue: any) => {
                  const formattedDate = moment(newValue).format("YYYY-MM-DD");
                  handleFieldChange({ target: { name: "drivingLicence.expiryDate", value: formattedDate } } as any);
                }}
                label="Expiry Date"
                placeholder="Select expiry date"
                minDate={moment().toDate()}
                error={fieldTouched.issueState && errors?.drivingLicence?.expiryDate}
              />
            </div>
          </div>

          <div>
        <h5 className="mt-2">Upload Driving License</h5>
        <ExistingDocuments
          docs={value?.serverDocs}
          filterFn={(doc: any) => !String(doc?.type || "").toLowerCase().includes("back")}
        />
        <div className="license-images-section">
          <div className="license-image-container">
            <UploadInput
              label="Ensure You Hold an Unrestricted Full Australian Driver's License,"
              accept="image/*,.pdf"
              maxSize={2}
              selectedFile={frontFile}
              onChange={(file) => {
                setFrontFile(file);
                setFieldValue("drivingLicence.licenseFront", file ? [file.name] : []);
                markTouched("licenseFront");
              }}
              onRemove={() => {
                setFrontFile(null);
                if (frontFileInputRef.current) frontFileInputRef.current.value = "";
                setFieldValue("drivingLicence.licenseFront", []);
              }}
              error={
                (fieldTouched.licenseFront || formSubmitted || submitCount > 0) && 
                (
                  !Array.isArray(value?.serverDocs) || 
                  (Array.isArray(value?.serverDocs) && value?.serverDocs.length === 0)
                ) && 
                errors?.drivingLicence?.licenseFront
              }
            />
          </div>
        </div>
      </div>

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
          const hasServerDocs = Array.isArray(value?.serverDocs) && value.serverDocs.length > 0;
          const hasFrontSelected = Boolean(frontFile) || hasServerDocs;
          const noErrors = !(errors?.drivingLicence && Object.values(errors.drivingLicence).some(Boolean));
          const canProceed = hasFrontSelected && noErrors && !isSubmitting;
          return (
        <IconButton
         title={isSubmitting ? "Processing..." : "Next Step"}
         icon={isSubmitting ? <LoadingSpinner /> : <FaArrowAltCircleRight />}
          onClick={async () => {
            setFormSubmitted(true);

            // Check if server docs exist and no new file selected - skip validation and API
            const hasServerDocs = Array.isArray(value?.serverDocs) && value.serverDocs.length > 0;
            if (hasServerDocs && !frontFile) {
              if (onNext) onNext(value);
              return;
            }

            // If no server docs and no new file, validate and show specific error
            if (!hasServerDocs && !frontFile) {
              // First validate the form to get specific errors
              const validationErrors = await validateForm();
              if (validationErrors && Object.keys(validationErrors).length > 0) {
                // Mark fields as touched to show validation errors
                if (validationErrors.drivingLicence?.licenseFront) {
                  markTouched("licenseFront");
                }
                return;
              }
            }

            // If a new front file is selected, always submit (do not skip)
            if (frontFile) {
              await handleApiSubmit();
              try { markSubmitted(5, buildSignature({ issueState: value?.issueState, frontName: frontFile?.name })); } catch { }
              return;
            }

            // Otherwise, honor skip guard
            const signature = buildSignature({
              issueState: value?.issueState,
              hasFront: Array.isArray(value?.licenseFront) && value.licenseFront.length > 0,
            });
            if (shouldSkipSubmit(5, signature)) { onNext(value); return; }
            await handleApiSubmit();
            try { markSubmitted(5, signature); } catch { }
          }}
          disabled={!canProceed}
          className="footerButton"
        />
          );
        })()}
      </div>
    </div>
  );
};

export default DrivingLicence;

