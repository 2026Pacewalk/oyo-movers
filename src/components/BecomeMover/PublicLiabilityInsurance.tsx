import MoverInput from "./MoverInput";
import IconButton from "../IconButton";
import { FaArrowAltCircleRight, FaArrowAltCircleLeft } from "react-icons/fa";
import { useState } from "react";
import "./liabilityInsurance.scss";
import { submitLiabilityInsurance } from "@/lib/serverAction/becomeMoverActions";
import { errorToast } from "@/lib/toaster";
import ExistingDocuments from "@/components/ExistingDocuments";
import UploadInput from "@/components/UploadInput";
import CustomDatePicker from "../CustomDatePicker";
import moment from "moment";
import { buildSignature, shouldSkipSubmit, markSubmitted } from "./submitGuard";

const PublicLiabilityInsurance = ({
  value,
  setFieldValue,
  handleBlur: _handleBlur,
  handleChange: _handleChange,
  handleSubmit,
  errors,
  isSubmitting,
  token: _token,
  setIsSkipInsuranceDoc: _setIsSkipInsuranceDoc,
  onBack,
  onNext,
  touched: _touched,
  submitCount = 0,
  validateForm,
  refreshProfileData,
  registerSubmitHandler,
}: any) => {
  const [fieldTouched, setFieldTouched] = useState({
    insuranceDocument: false,
    hasInsurance: false,
    expiryDate: false,
  });
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [isSubmittingLocal, setIsSubmittingLocal] = useState(false);
  const [insuranceDocumentFile, setInsuranceDocumentFile] = useState<File | null>(null);

  const markTouched = (field: string) => {
    setFieldTouched((prev) => ({ ...prev, [field]: true }));
  };

  const getWrapperClasses = () => {
    const classes = ["profile-form-wrapper", "liability-ins-wrapper", "compact"];
    if (Object.values(fieldTouched).some((v) => v)) classes.push("field-touched");
    if (formSubmitted || submitCount > 0) classes.push("form-submitted");
    return classes.join(" ");
  };

  // Expose a submit handler to parent so it can trigger insurance submit before final submit
  if (typeof registerSubmitHandler === 'function') {
    registerSubmitHandler(async () => {
      setIsSubmittingLocal(true);
      // If user chose to skip, or server docs already exist and no new file, nothing to upload
      const hasServerDocs = Array.isArray(value?.serverDocs) && value.serverDocs.length > 0;
      const hasDocuments = Array.isArray(value?.documents) && value.documents.length > 0;
      const hasAnyServer = hasServerDocs || hasDocuments;

      // If user says No insurance, make API call to save hasInsurance: false (same as Yes selection)
      if (value?.hasInsurance === false) {
        console.log('PublicLiabilityInsurance: Processing "No" insurance selection');
        try {
          const formData = new FormData();
          // Send the actual hasInsurance value (false)
          formData.append("hasInsurance", String(value?.hasInsurance));

          const serverDocCount = (Array.isArray(value?.serverDocs) ? value.serverDocs.length : 0) + (Array.isArray(value?.documents) ? value.documents.length : 0);
          const fileSig = ''; // No file for "No" selection
          const signature = buildSignature({ serverDocCount, fileSig, hasInsurance: value?.hasInsurance, expiryDate: '' });

          if (shouldSkipSubmit(8 as any, signature)) {
            return true;
          }

          const res = await submitLiabilityInsurance(formData);
          if (res && res.status === 200) {
            try { markSubmitted(8 as any, signature); } catch { }
            try { setFieldValue("liabilityIns._lastSubmittedSignature", signature); } catch { }
            if (refreshProfileData) {
              await refreshProfileData();
            }
            setIsSubmittingLocal(false);
            return true;
          } else {
            errorToast(res?.message || "Failed to submit insurance status");
            setIsSubmittingLocal(false);
            return false;
          }
        } catch (err: any) {
          errorToast(err?.response?.data?.message || err?.message || "Failed to submit insurance status");
          setIsSubmittingLocal(false);
          return false;
        }
      }

      if (value?.isSkip === true || (hasAnyServer && !insuranceDocumentFile)) {
        setIsSubmittingLocal(false);
        return true;
      }

      // Validate if no file and no server docs
      if (value?.hasInsurance !== false && !insuranceDocumentFile && !hasAnyServer) {
        const validationErrors = await validateForm?.();
        // mark inline error
        setFieldTouched(prev => ({ ...prev, insuranceDocument: true }));
        setFieldTouched(prev => ({ ...prev, expiryDate: true }));
        if (validationErrors && validationErrors.liabilityIns?.insuranceDocument) {
          setIsSubmittingLocal(false);
          return false;
        }
      }

      try {
        console.log('PublicLiabilityInsurance: Processing "Yes" insurance selection');
        const formData = new FormData();
        if (insuranceDocumentFile) {
          formData.append("insuranceDocument", insuranceDocumentFile!);
        }
        // Send the actual hasInsurance value
        formData.append("hasInsurance", String(value?.hasInsurance));
        if (value?.hasInsurance !== false && value?.expiryDate) {
          formData.append("expiryDate", value.expiryDate);
        }
        const serverDocCount = (Array.isArray(value?.serverDocs) ? value.serverDocs.length : 0) + (Array.isArray(value?.documents) ? value.documents.length : 0);
        const fileSig = insuranceDocumentFile ? `${insuranceDocumentFile.name}-${insuranceDocumentFile.size}-${insuranceDocumentFile.lastModified}` : '';
        const signature = buildSignature({ serverDocCount, fileSig, hasInsurance: value?.hasInsurance, expiryDate: value?.expiryDate || '' });

        if (shouldSkipSubmit(8 as any, signature) || (hasAnyServer && !insuranceDocumentFile)) {
          return true;
        }

        const res = await submitLiabilityInsurance(formData);
        if (res && res.status === 200) {
          try { markSubmitted(8 as any, signature); } catch { }
          try { setFieldValue("liabilityIns._lastSubmittedSignature", signature); } catch { }
          if (refreshProfileData) {
            await refreshProfileData();
          }
          setIsSubmittingLocal(false);
          return true;
        } else {
          errorToast(res?.message || "Failed to upload insurance document");
          setIsSubmittingLocal(false);
          return false;
        }
      } catch (err: any) {
        errorToast(err?.response?.data?.message || err?.message || "Failed to upload insurance document");
        setIsSubmittingLocal(false);
        return false;
      }
    });
  }
  const handelRemoveClick = (key: string) => {
    setFieldValue(
      "liabilityIns.insuranceDocument",
      (value.insuranceDocument || []).filter((img: any) => img.key !== key)
    );
  };

  return (
    <div className={getWrapperClasses()}>
      <div className="form-header">
        <h3 className="d-inline-flex align-items-center mb-1">
          <span>Public Liability Insurance</span>
          {/* <button
            type="button"
            className="btn btn-link p-0 ms-2"
            onClick={() => {
              try { _setIsSkipInsuranceDoc?.(true); } catch {}
              try { setFieldValue("liabilityIns._lastSubmittedSignature", "skip"); } catch {}
              // move to next step directly and mark as completed via signature
              if (typeof onNext === 'function') {
                onNext();
              } else {
                handleSubmit();
              }
            }}
          >
            Skip
          </button> */}
        </h3>

      </div>

      {/* Do you have liability insurance? */}
      <div className="form-section">
        <div className="tabRadioWraper">
          <label className="form-label">Do you have Public Liability Insurance?</label>
          <div className="d-flex gap-4 align-items-center">
            <MoverInput
              label="Yes"
              name="liabilityIns.hasInsurance"
              type="radio"
              value="true"
              checked={value?.hasInsurance !== false}
              onChange={() => {
                setFieldValue("liabilityIns.hasInsurance", true);
                setFieldTouched(prev => ({ ...prev, hasInsurance: true }));
              }}
              className="radio-input"
            />
            <MoverInput
              label="No"
              name="liabilityIns.hasInsurance"
              type="radio"
              value="false"
              checked={value?.hasInsurance === false}
              onChange={() => {
                setFieldValue("liabilityIns.hasInsurance", false);
                // Clear dependent fields when selecting No
                setFieldValue("liabilityIns.expiryDate", "");
                setFieldValue("liabilityIns.insuranceDocument", "");
                setIsSubmittingLocal(false);
                setInsuranceDocumentFile(null);
                setFieldTouched(prev => ({ ...prev, hasInsurance: true }));
              }}
              className="radio-input"
            />
          </div>
        </div>
      </div>

      {value?.hasInsurance !== false && (
        <div className="form-section">
          <div className="row">
            <div className="col-md-6">
              <CustomDatePicker
                value={value?.expiryDate}
                onChange={(newValue: any) => {
                  const formattedDate = moment(newValue).format("YYYY-MM-DD");
                  setFieldValue("liabilityIns.expiryDate", formattedDate);
                  setFieldTouched(prev => ({ ...prev, expiryDate: true }));
                }}
                label="Insurance Expiry Date"
                placeholder="Select expiry date"
                minDate={moment().toDate()}
                error={fieldTouched.expiryDate && errors?.liabilityIns?.expiryDate}
              />
            </div>
            <div className="col-md-6">
              <label className="form-label">Liability insurance certificate</label>
              <ExistingDocuments docs={value?.serverDocs || value?.documents || []} />
              <UploadInput
                accept="image/*,.pdf"
                maxSize={2}
                selectedFile={insuranceDocumentFile}
                onChange={(file) => {
                  setInsuranceDocumentFile(file);
                  setFieldValue("liabilityIns.insuranceDocument", file ? file.name : "");
                  markTouched("insuranceDocument");
                }}
                onRemove={() => {
                  setInsuranceDocumentFile(null);
                  setFieldValue("liabilityIns.insuranceDocument", "");
                }}
                error={
                  (fieldTouched.insuranceDocument || formSubmitted || submitCount > 0)
                  && (
                    !Array.isArray(value?.serverDocs) || (Array.isArray(value?.serverDocs) && value?.serverDocs.length === 0)
                  )
                  && (
                    !Array.isArray(value?.documents) || (Array.isArray(value?.documents) && value?.documents.length === 0)
                  )
                  && errors?.liabilityIns?.insuranceDocument
                }
              />
            </div>
          </div>
        </div>
      )}

      {/* Removed confirmation notice card */}

      {/* <div className="footerBtn d-flex justify-content-between align-items-center">
        <IconButton
          title="Back"
          icon={<FaArrowAltCircleLeft />}
          iconPosition="left"
          onClick={onBack}
          className="footerButton back-button"
          
        />
        <IconButton
          title={"Next Step"}
          icon={<FaArrowAltCircleRight />}
          onClick={async () => {
            setIsSubmittingLocal(true);
            setFormSubmitted(true);
            
            // If user chose to skip, advance without API
            if (value?.isSkip === true) {
              setIsSubmittingLocal(false);
              handleSubmit();
              return;
            }

            // Only file upload is validated: if server docs exist OR new file selected, proceed without error
            const hasServerDocs = Array.isArray(value?.serverDocs) && value.serverDocs.length > 0;
            const hasDocuments = Array.isArray(value?.documents) && value.documents.length > 0;
            const hasAnyServer = hasServerDocs || hasDocuments;
            if (!insuranceDocumentFile && !hasAnyServer) {
              // First validate the form to get specific errors
              const validationErrors = await validateForm();
              if (validationErrors && Object.keys(validationErrors).length > 0) {
                // Mark field as touched to show validation error
                if (validationErrors.liabilityIns?.insuranceDocument) {
                  setFieldTouched(prev => ({ ...prev, insuranceDocument: true }));
                }
                setIsSubmittingLocal(false);
                return;
              }
            }

            try {
              const formData = new FormData();
              if (insuranceDocumentFile) {
                formData.append("insuranceDocument", insuranceDocumentFile!);
              }
              // Add required constant field
              formData.append("hasInsurance", "true");
               const serverDocCount = (Array.isArray(value?.serverDocs) ? value.serverDocs.length : 0) + (Array.isArray(value?.documents) ? value.documents.length : 0);
              const fileSig = insuranceDocumentFile ? `${insuranceDocumentFile.name}-${insuranceDocumentFile.size}-${insuranceDocumentFile.lastModified}` : '';
              const signature = buildSignature({ serverDocCount, fileSig });
               if (shouldSkipSubmit(8 as any, signature) || (hasAnyServer && !insuranceDocumentFile)) {
                setIsSubmittingLocal(false);
                 if (typeof onNext === 'function') {
                   onNext();
                 } else {
                   handleSubmit();
                 }
                return;
              }
              const res = await submitLiabilityInsurance(formData);
              if (res && res.status === 200) {
                try { markSubmitted(8 as any, signature); } catch {}
                try { setFieldValue("liabilityIns._lastSubmittedSignature", signature); } catch {}
                
                // Refresh profile data to get latest server documents
                if (refreshProfileData) {
                  await refreshProfileData();
                }
                
                handleSubmit();
              } else {
                errorToast(res?.message || "Failed to upload insurance document");
              }
            } catch (err: any) {
              errorToast(err?.response?.data?.message || err?.message || "Failed to upload insurance document");
            } finally {
              setIsSubmittingLocal(false);
            }
          }}
          disabled={isSubmittingLocal}
          className="footerButton"
          
        />
      </div> */}
    </div>
  );
};

export default PublicLiabilityInsurance;

