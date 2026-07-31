import React, { useState, useRef } from "react";
import "./vevoCheck.scss";
import Button from "../Button";
import IconButton from "../IconButton";
import { FaArrowAltCircleRight, FaArrowAltCircleLeft } from "react-icons/fa";
import Select from "../Select";
import CustomDatePicker from "../CustomDatePicker";
import moment from "moment";
import { submitVevoCheck } from "../../lib/serverAction/becomeMoverActions";
import { errorToast } from "@/lib/toaster";
import ExistingDocuments from "@/components/ExistingDocuments";
import UploadInput from "@/components/UploadInput";
import { buildSignature, markSubmitted, shouldSkipSubmit } from "./submitGuard";

const VevoCheck = ({
  value,
  setFieldValue,
  handleSubmit,
  handleChange,
  handleBlur,
  errors,
  touched,
  submitCount = 0,
  token,
  onBack,
  validateForm,
  onNext,
  refreshProfileData,
}: any) => {
  // Track field-level touched state
  const [fieldTouched, setFieldTouched] = useState({
    citizen: false,
    visaExpiry: false,
    visaIssueDate: false,
    visaDocument: false
  });
  
  // File input ref for direct file access
  const visaDocumentRef = useRef<HTMLInputElement>(null);
  
  // Track selected file state
  const [visaFile, setVisaFile] = useState<File | null>(null);
  
  // Track which field is currently being edited
  const [currentField, setCurrentField] = useState<string | null>(null);
  
  // Track if form has been submitted
  const [formSubmitted, setFormSubmitted] = useState(false);
  
  // API submission state
  const [isSubmitting, setIsSubmitting] = useState(false);
  const handelClick = (value: any) => {
    setFieldValue("vevoCheck.citizen", value);
    // Mark citizen as touched and set as current field
    setFieldTouched(prev => ({ ...prev, citizen: true }));
    setCurrentField("citizen");
  };
  const handelRemoveClick = (key: string) => {
    setFieldValue(
      "vevoCheck.visaDocument",
      (value.visaDocument || []).filter((item: any) => item.key !== key)
    );
  };

  // API submission function
  const handleApiSubmit = async () => {
    try {
      setIsSubmitting(true);
      
      // Get file from state
      const visaDocumentFile = visaFile;
      
      // Create FormData for file upload
      const formData = new FormData();
      
      // Add citizen status EXACTLY as backend expects
      const citizenToSend = (value.citizen === 'Australian/NZ PR' || value.citizen === 'Australian/NZ Citizen / PR')
        ? 'Australian/NZ Citizen'
        : (value.citizen || '');
      formData.append('citizen', citizenToSend);
      
      // For Australian/NZ Citizen or PR: only citizen is required; skip other fields
      if (value.citizen === 'Foreign National') {
        // Add visa document file if available
        if (visaDocumentFile) {
          formData.append('visaDocument', visaDocumentFile);
        }
        formData.append('visaExpiry', value.visaExpiry || '');
        formData.append('visaIssueDate', value.visaIssueDate || '');
      }
      
      // Skip API if unchanged since last success
      const norm = (v: any) => (v == null ? "" : String(v));
      const signature = JSON.stringify({
        citizen: norm(value.citizen),
        visaExpiry: norm(value.visaExpiry),
        visaIssueDate: norm(value.visaIssueDate),
      });
      const noNewFileSelected = !visaDocumentFile;
      if ((value as any)._lastSubmittedSignature === signature && noNewFileSelected) {
        return true;
      }

      // Call API
      const res = await submitVevoCheck(formData);
      
      if (res && res.status === 200) {
        setFieldValue("vevoCheck._lastSubmittedSignature", signature);
        
        // Refresh profile data to get latest server documents
        if (refreshProfileData) {
          await refreshProfileData();
        }
        
        return true;
      } else {
        errorToast(res?.message || "Failed to submit VEVO check");
        return false;
      }
    } catch (error: any) {
      errorToast(error?.message || "Failed to submit VEVO check");
      return false;
    } finally {
      setIsSubmitting(false);
    }
  };
  // Get CSS classes based on form state
  const getWrapperClasses = () => {
    const classes = ["profile-form-wrapper", "vevo-check-wrapper"];    
    if (Object.values(fieldTouched).some(value => value)) {
      classes.push("field-touched");
    }
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
        <h3>VEVO Check</h3>
        <p className="form-description">Please provide your citizenship status and visa details if applicable</p>
      </div>
      
      <div className="form-section">
        <h5 className="">Citizenship Status</h5>
        <div className="d-flex gap-3 flex-wrap">
          <Button
            className={`buttonClassVevo ${
              value?.citizen === "Australian/NZ Citizen" ? "activeClass" : ""
            }`}
            onClick={() => handelClick("Australian/NZ Citizen")}
            type="button"
          >
            Australian/NZ Citizen / PR
          </Button>
          <Button
            className={`buttonClassVevo ${
              value?.citizen === "Foreign National" ? "activeClass" : ""
            }`}
            onClick={() => handelClick("Foreign National")}
            type="button"
          >
            Foreign National
          </Button>
        </div>
        {fieldTouched.citizen && errors?.vevoCheck?.citizen && (
          <div className="text-danger mb-2">{errors.vevoCheck.citizen}</div>
        )}
        {/* Guidance moved inside Visa Details card when Foreign National */}
      </div>

      {value.citizen === "Foreign National" && (
        <div className="form-section">
          {/* <h5 className="">Visa Details</h5> */}
          <div className="info-card" style={{ fontSize: 14 }}>
            <ul>
              <li>If you are not a citizen of Australia or New Zealand, please upload (VEVO) check.</li>
              <li>
                You can visit the Department of Immigration's website, by clicking{' '}
                <a href="https://immi.homeaffairs.gov.au/" target="_blank" rel="noopener noreferrer" className="terms-link">here</a>.
              </li>
            </ul>
          </div>
          <div className="row">
            <div className="col-md-6">
              <CustomDatePicker
                value={value?.visaIssueDate}
                onChange={(newValue: any) => {
                  const formattedDate = moment(newValue).format("YYYY-MM-DD");
                  setFieldValue("vevoCheck.visaIssueDate", formattedDate);
                  setFieldTouched(prev => ({ ...prev, visaIssueDate: true }));
                  setCurrentField("visaIssueDate");
                }}
                label="Visa Issue Date"
                placeholder="Select issue date"
                error={fieldTouched.visaIssueDate && errors?.vevoCheck?.visaIssueDate}
              />
            </div>
            <div className="col-md-6">
              <CustomDatePicker
                value={value?.visaExpiry}
                onChange={(newValue: any) => {
                  const formattedDate = moment(newValue).format("YYYY-MM-DD");
                  setFieldValue("vevoCheck.visaExpiry", formattedDate);
                  setFieldTouched(prev => ({ ...prev, visaExpiry: true }));
                  setCurrentField("visaExpiry");
                }}
                label="Visa Expiry"
                placeholder="Select expiry date"
                minDate={moment().toDate()}
                error={fieldTouched.visaExpiry && errors?.vevoCheck?.visaExpiry}
              />
            </div>
          </div>

          <div className="">
            <label className="form-label">Upload Visa Document</label>
            <ExistingDocuments docs={value?.serverDocs || []} />
            <UploadInput
              accept="image/*,.pdf"
              maxSize={2}
              selectedFile={visaFile}
              onChange={(file) => {
                setVisaFile(file);
                setFieldValue('vevoCheck.visaDocument', file ? 'uploaded' : '');
                setFieldTouched(prev => ({ ...prev, visaDocument: true }));
                setCurrentField("visaDocument");
              }}
              onRemove={() => {
                setVisaFile(null);
                if (visaDocumentRef.current) visaDocumentRef.current.value = "";
                setFieldValue('vevoCheck.visaDocument', '');
              }}
              error={
                (fieldTouched.visaDocument || formSubmitted || submitCount > 0) && 
                (
                  !Array.isArray(value?.serverDocs) || 
                  (Array.isArray(value?.serverDocs) && value?.serverDocs.length === 0)
                ) && 
                errors?.vevoCheck?.visaDocument
              }
            />
          </div>
        </div>
      )}

      <div className="footerBtn d-flex justify-content-between align-items-center">
        <IconButton
          title="Back"
          icon={<FaArrowAltCircleLeft />}
          iconPosition="left"
          onClick={onBack}
          className="footerButton back-button"
        />
        {(() => {
          const citizenOk = Boolean(value?.citizen);
          let foreignRequirementsOk = true;
          if (value?.citizen === 'Foreign National') {
            const hasServer = Array.isArray(value?.serverDocs) && value.serverDocs.length > 0;
            const hasNewFile = Boolean(visaFile);
            const hasExpiry = Boolean(value?.visaExpiry);
            const hasIssueDate = Boolean(value?.visaIssueDate);
            foreignRequirementsOk = (hasServer || hasNewFile) && hasExpiry && hasIssueDate;
          }
          const noErrors = !(errors?.vevoCheck && Object.values(errors.vevoCheck).some(Boolean));
          const canProceed = citizenOk && foreignRequirementsOk && noErrors && !isSubmitting;
          return (
        <IconButton
           title={isSubmitting ? "Processing..." : "Next Step"}
           icon={isSubmitting ? <LoadingSpinner /> : <FaArrowAltCircleRight />}
          onClick={async () => {
            setFormSubmitted(true);
            
            // If AU Citizen or PR, only citizen is required
            if (value?.citizen === 'Australian/NZ Citizen' || value?.citizen === 'Australian/NZ PR') {
              const signature = buildSignature({ citizen: value?.citizen });
              if (shouldSkipSubmit(6, signature)) { if (onNext) onNext(value); return; }
              const apiSuccess = await handleApiSubmit();
              if (apiSuccess) { markSubmitted(6, signature); if (onNext) onNext(value); }
              return;
            }
            
            // Otherwise validate full VEVO fields for Foreign National
            // Early skip same as Vehicle Details: if server docs exist and no new file selected, skip validation and API
            if (value?.citizen === 'Foreign National') {
              const hasServer = Array.isArray(value?.serverDocs) && value.serverDocs.length > 0;
              const noNewFile = !visaFile;
              const hasExpiry = Boolean(value?.visaExpiry);
              const hasIssueDate = Boolean(value?.visaIssueDate);
              if (hasServer && noNewFile && hasExpiry && hasIssueDate) {
                if (onNext) onNext(value);
                return;
              }
            }

            const validationErrors = await validateForm();
            if (validationErrors && Object.keys(validationErrors).length > 0) {
              // Mark fields as touched to show validation errors
              if (validationErrors.vevoCheck?.visaExpiry) {
                setFieldTouched(prev => ({ ...prev, visaExpiry: true }));
              }
              if (validationErrors.vevoCheck?.visaIssueDate) {
                setFieldTouched(prev => ({ ...prev, visaIssueDate: true }));
              }
              if (validationErrors.vevoCheck?.visaDocument) {
                setFieldTouched(prev => ({ ...prev, visaDocument: true }));
              }
              return;
            }
            const serverDocCount = Array.isArray(value?.serverDocs) ? value.serverDocs.length : 0;
            const fileSig = visaFile ? `${visaFile.name}-${visaFile.size}-${visaFile.lastModified}` : '';
            const signature = buildSignature({
              citizen: value?.citizen,
              visaExpiry: value?.visaExpiry,
              visaIssueDate: value?.visaIssueDate,
              serverDocCount,
              fileSig,
            });
            if (shouldSkipSubmit(6, signature)) { if (onNext) onNext(value); return; }
            const apiSuccess = await handleApiSubmit();
            if (apiSuccess) { markSubmitted(6, signature); if (onNext) onNext(value); }
          }}
          className="footerButton"
          disabled={!canProceed}
        />
          );
        })()}
      </div>
    </div>
  );
};

export default VevoCheck;
