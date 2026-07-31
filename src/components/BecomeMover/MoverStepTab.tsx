"use client";
import React, { useEffect, useLayoutEffect, useMemo, useState } from "react";
import "./mover.scss";
import "./workdetails.scss";
import { Container, Tab } from "react-bootstrap";
import { useFormik } from "formik";
import * as Yup from "yup";
import { updateMover, submitFinalApplication } from "@/lib/serverAction/becomeMoverActions";
import { errorToast } from "@/lib/toaster";
import MoreAbout from "./MoreAbout";
// ABN step removed
import PublicLiabilityInsurance from "./PublicLiabilityInsurance";
import EmailVerification from "./EmailVerification";
import SubmitApplication from "./SubmitApplication";
import VevoCheck from "./VevoCheck";
import VehicalDetails from "./VehicalDetails";
import DrivingLicence from "./DrivingLicence";
import CompleteProfile from "./CompleteProfile";
import { useRouter, useSearchParams } from "next/navigation";
import { tokenKey } from "@/config";
import CustomModal from "../CustomModal";
import Button from "../Button";
import IconButton from "../IconButton";
import { FaArrowAltCircleRight } from "react-icons/fa";
import { FaCheckCircle } from "react-icons/fa";
import { updateHelper } from "@/lib/serverAction/becomeHelperActions";
import { getMoverProfile } from "@/lib/serverAction/becomeMoverActions";
import { apiUrl } from "@/config";
import axios from "axios";
import MoverInput from "./MoverInput";

// Removed tabData - using individual components with their own steppers
const initialValues = {
  about: {
    email: "",
    experience: false,
    month: "",
    howManyPerson: "",
    canWorkThisWeekend: false,
    emergencyContact: {
      name: "",
      phone: "",
      relationship: "",
    },
    haveEmergencyContact: false,
    address: {},
  },
  business: {
    abn: "",
    isGstRegistered: false,
    businessName: "",
    businessAddress: "",
    invoiceEmail: "",
    agreeToTerms: false,
  },
  company: {
    name: "",
    phone: "",
    acn: "",
    areYouOwner: false,
  },

  drivingLicence: {
    issueState: "VIC",
    licenseFront: [],
    licenseBack: [],
  },
  vevoCheck: {
    citizen: "",
    visaType: "",
    visaExpiry: "",
    visaDocument: [],
  },
  vehicalDetails: {
    rego: "",
    vehicleMake: "",
    vehicleModel: "",
    vehicleYear: "",
    hasBranding: false,
    vehicleType: "",
    vehicleRegistration: [],
    vehiclePhotosFront: "",
    vehiclePhotosSide: "",
  },
  liabilityIns: {
    hasInsurance: undefined as unknown as boolean,
    policyNumber: "",
    expiryDate: "",
    coverageAmount: "",
    insuranceDocument: "",
  },
  finalSubmission: {
    confirmCapability: false,
    agreeToTerms: false,
    readyForReview: false,
  },
  _lastRefresh: 0,
};
const aboutSchema = Yup.object().shape({
  about: Yup.object().shape({
    experience: Yup.boolean().required("Please select your experience level"),
    month: Yup.string().when('experience', (experience, schema) => {
      return experience[0] ? schema.required("Please select experience duration") : schema;
    }),
    howManyPerson: Yup.string().required("Please select team size"),
    canWorkThisWeekend: Yup.boolean().required("Please select weekend availability"),
    haveEmergencyContact: Yup.boolean().required("Please confirm emergency contact"),
    emergencyContact: Yup.object().when('haveEmergencyContact', (haveEmergencyContact, schema) => {
      return haveEmergencyContact[0] ? schema.shape({
        name: Yup.string().required("Emergency contact name is required"),
        phone: Yup.string()
          .required("Emergency contact phone is required")
          .test('au-phone', 'Enter a valid Australian phone number', (val: any) => {
            if (!val || typeof val !== 'string') return false;
            const digits = val.replace(/\D/g, '');
            const local = digits.startsWith('61') ? '0' + digits.slice(2) : digits;
            // Accept AU mobile 04xxxxxxxx and landlines 02/03/07/08 with 8 digits
            return /^0(4\d{8}|[2378]\d{8})$/.test(local);
          }),
        relationship: Yup.string().required("Emergency contact relationship is required"),
      }) : schema;
    }),
    address: Yup.object().shape({
      locality: Yup.string().required("City is required"),
      administrative_area_level_1: Yup.string().required("State is required"),
      country: Yup.string().required("Country is required"),
    }),
  }),
});

const businessValidationSchema = Yup.object().shape({
  business: Yup.object().shape({
    abn: Yup.string()
      .matches(/^\d{11}$/, "ABN must be exactly 11 digits")
      .required("ABN is required"),
    // Hidden fields validations removed (isGstRegistered, businessName, businessAddress, invoiceEmail)
    agreeToTerms: Yup.boolean()
      .oneOf([true], "You must agree to the terms and conditions")
      .required("You must agree to the terms and conditions"),
  }),
});


const drivingLicenceSchema = Yup.object().shape({
  drivingLicence: Yup.object().shape({
    // Only validate licenseFront - no issueState validation needed
    licenseFront: Yup.array().when('serverDocs', {
      is: (docs: any) => Array.isArray(docs) && docs.length > 0,
      then: (schema) => schema,
      otherwise: (schema) => schema.min(1, "Please upload the front side of your driver's license").required("Please upload the front side of your driver's license"),
    }),
  }),
});
const vehicleDetailsSchema = Yup.object().shape({
  vehicalDetails: Yup.object().shape({
    rego: Yup.string()
      .required("Vehicle registration number is required")
      .min(3, "Registration must be at least 3 characters")
      .max(10, "Registration must be at most 10 characters"),
    vehicleMake: Yup.string()
      .required("Vehicle brand/manufacturer is required")
      .min(2, "Vehicle brand/manufacturer must be at least 2 characters")
      .max(50, "Vehicle brand/manufacturer must be at most 50 characters"),
    vehicleModel: Yup.string()
      .required("Vehicle model is required")
      .min(1, "Vehicle model must be at least 1 character")
      .max(50, "Vehicle model must be at most 50 characters"),
    vehicleYear: Yup.number()
      .typeError("Please enter a valid year")
      .required("Vehicle year is required")
      .min(1900, "Year must be at least 1900")
      .max(new Date().getFullYear(), `Year cannot be after ${new Date().getFullYear()}`),
    vehicleType: Yup.string()
      .required("Vehicle type is required"),
    hasBranding: Yup.boolean()
      .required("Please indicate if your vehicle has branding"),
    // Vehicle photos no longer required (Required Documents section commented out)
    vehiclePhotosFront: Yup.string().optional(),
    vehiclePhotosSide: Yup.string().optional(),
  }),
});
const liabilityInsSchema = Yup.object().shape({
  liabilityIns: Yup.object().shape({
    hasInsurance: Yup.boolean().required(),
    expiryDate: Yup.string().when('hasInsurance', (has: any, schema: any) => {
      return has !== false
        ? schema.required('Please provide insurance expiry date')
        : schema.optional();
    }),
    serverDocs: Yup.mixed().optional(),
    documents: Yup.mixed().optional(),
    insuranceDocument: Yup.string().when(['hasInsurance', 'serverDocs', 'documents'], (values: any[], schema: any) => {
      const [has, serverDocs, documents] = values || [];
      const hasServerDocs = Array.isArray(serverDocs) && serverDocs.length > 0;
      const hasDocuments = Array.isArray(documents) && documents.length > 0;
      if (has === false) return schema.optional();
      return schema.test(
        'file-required-when-no-server-docs',
        'Please upload your insurance document',
        function (val: any) {
          if (hasServerDocs || hasDocuments) return true;
          return typeof val === 'string' && val?.trim()?.length > 0;
        }
      );
    }),
  }),
});


function MoverStepTab({ token, name, helper, initialStep = 1 }: any) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [step, setStep] = useState<number>(initialStep);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [welcomeModal, setWelcomeModal] = useState<boolean>(false);
  const [isSkipInsuranceDoc, setIsSkipInsuranceDoc] = useState<boolean>(false);
  const [completedSteps, setCompletedSteps] = useState<number[]>([]);
  const [emailVerified, setEmailVerified] = useState<boolean>(false);
  const [isSubmittingFinal, setIsSubmittingFinal] = useState<boolean>(false);
  const [showVerificationModal, setShowVerificationModal] = useState<boolean>(false);

  // Initialize loader state - always start as false to prevent hydration mismatch
  // Will be set to true in useEffect after mount if needed
  const [isLoadingProfile, setIsLoadingProfile] = useState<boolean>(false);

  // Set loading state after mount to avoid hydration mismatch
  useEffect(() => {
    if (typeof window !== 'undefined') {
      try {
        const urlParams = new URLSearchParams(window.location.search);
        const urlStep = urlParams.get('step');
        if (urlStep === '3') {
          setIsLoadingProfile(true);
        }
      } catch (error) {
        // Silent fail
      }
    }
  }, []);

  // Determine if a step has actual data filled (not just navigation)
  const isStepDataFilled = (stepNum: number): boolean => {
    try {
      switch (stepNum) {
        case 1:
          return true; // Initial registration always considered done
        case 2:
          // Only consider Email Verification complete when actually verified
          return Boolean(emailVerified);
        case 3: {
          const a: any = (values as any)?.about;
          const hasBasics = a?.howManyPerson && (a?.experience !== undefined) && (a?.canWorkThisWeekend !== undefined);
          const ecOk = !a?.haveEmergencyContact || (a?.emergencyContact?.name && a?.emergencyContact?.phone && a?.emergencyContact?.relationship);
          return Boolean(hasBasics && ecOk);
        }
        case 4: {
          const b: any = (values as any)?.business;
          return Boolean(b?.abn || b?.businessName || b?.invoiceEmail || b?.businessAddress);
        }
        case 5: {
          const dl: any = (values as any)?.drivingLicence;
          const hasServer = Array.isArray(dl?.serverDocs) && dl.serverDocs.length > 0;
          const hasLocal = Array.isArray(dl?.licenseFront) && dl.licenseFront.length > 0;
          return Boolean(hasServer || hasLocal);
        }
        case 6: {
          const vc: any = (values as any)?.vevoCheck;
          if (!vc?.citizen) return false;
          if (vc.citizen === 'Foreign National') {
            const hasServer = Array.isArray(vc?.serverDocs) && vc.serverDocs.length > 0;
            const hasVisaDocument = vc?.visaDocument === 'uploaded' || vc?.visaDocument;
            return Boolean(hasServer || (hasVisaDocument && vc?.visaExpiry));
          }
          return true;
        }
        case 7: {
          const v: any = (values as any)?.vehicalDetails;
          const hasPhotos = Array.isArray(v?.serverPhotos) ? v.serverPhotos.length > 0 : false;
          const hasAllBasics = Boolean(
            v?.rego && v?.vehicleMake && v?.vehicleModel && v?.vehicleYear && v?.vehicleType
          );
          return Boolean(hasPhotos || hasAllBasics);
        }
        case 8: {
          const li: any = (values as any)?.liabilityIns;
          const hasServer = Array.isArray(li?.serverDocs) && li.serverDocs.length > 0;
          if (hasServer) return true;
          // Treat any recorded submission signature as completion
          if (typeof li?._lastSubmittedSignature === 'string' && li._lastSubmittedSignature.length > 0) {
            return true;
          }
          return false;
        }
        case 9: {
          const fs: any = (values as any)?.finalSubmission;
          return Boolean(fs?.agreeToTerms);
        }
        default:
          return false;
      }
    } catch {
      return false;
    }
  };

  // If a token is provided via query (deep link), set it as a client cookie for authenticated API calls
  useEffect(() => {
    if (typeof window === 'undefined') return;
    if (token && typeof token === 'string') {
      try {
        const expires = new Date();
        expires.setTime(expires.getTime() + 7 * 24 * 60 * 60 * 1000);
        document.cookie = `${tokenKey}=${token};expires=${expires.toUTCString()};path=/;SameSite=Lax`;
      } catch { }
    }
  }, [token]);

  // Show verification modal when redirected from email verification (step=3 in URL)
  // Only show once per session to prevent showing on every reload
  // Show popup only after data is loaded
  useEffect(() => {
    const urlStep = searchParams?.get('step');
    if (urlStep === '3' && token && name && !isLoadingProfile) {
      // Check if we've already shown this modal in this session
      const hasShownModal = sessionStorage.getItem('emailVerificationModalShown');
      if (!hasShownModal) {
        setShowVerificationModal(true);
        // Mark as shown in sessionStorage
        sessionStorage.setItem('emailVerificationModalShown', 'true');
        // Auto-hide after 3 seconds
        const timer = setTimeout(() => {
          setShowVerificationModal(false);
        }, 3000);
        return () => clearTimeout(timer);
      }
    }
  }, [searchParams, token, name, isLoadingProfile]);

  // Hydrate values from profile on first load
  // Use useLayoutEffect to call API immediately from client, before paint
  useLayoutEffect(() => {
    // Get token from URL if not available as prop yet (for immediate execution)
    let apiToken = token;
    if (!apiToken && typeof window !== 'undefined') {
      try {
        const urlParams = new URLSearchParams(window.location.search);
        apiToken = urlParams.get('token') || undefined;
      } catch (error) {
        // Silent fail
      }
    }

    // Only call API if we have token (from prop or URL)
    if (!apiToken) {
      setIsLoadingProfile(false);
      return;
    }

    (async () => {
      try {
        // Call API directly from client to avoid server action delay
        const response = await axios.get(`${apiUrl}/movers/profile`, {
          headers: {
            Authorization: `Bearer ${apiToken}`
          }
        });
        const user = response?.data?.data?.user || response?.data?.user;
        if (!user) {
          // Hide loader if no user data
          setIsLoadingProfile(false);
          return;
        }

        // If onboarding is already completed, show info and redirect
        if (user?.onboardingCompleted === true) {
          setIsLoadingProfile(false); // Hide loader before showing welcome modal
          setIsOpen(true);
          setWelcomeModal(true);
          // Redirect will occur only when user clicks Ok/close
          return;
        }

        // Map user fields into form slices as available
        // Step 1 & 3: About / More About Yourself
        if (typeof user?.email === "string") {
          setFieldValue("about.email", user.email);
        }
        if (typeof user?.emailVerified === "boolean") {
          setEmailVerified(Boolean(user.emailVerified));
        }
        if (typeof user?.experience === "boolean") {
          setFieldValue("about.experience", user.experience);
        }
        if (typeof user?.month === "string") {
          setFieldValue("about.month", user.month);
        }
        if (typeof user?.howManyPerson === "string") {
          setFieldValue("about.howManyPerson", user.howManyPerson);
        }
        if (typeof user?.canWorkThisWeekend === "boolean") {
          setFieldValue("about.canWorkThisWeekend", user.canWorkThisWeekend);
        }
        if (typeof user?.haveEmergencyContact === "boolean") {
          setFieldValue("about.haveEmergencyContact", user.haveEmergencyContact);
        }
        if (Array.isArray(user?.emergencyContacts) && user.emergencyContacts.length > 0) {
          const ec = user.emergencyContacts[0];
          setFieldValue("about.emergencyContact.name", ec?.name || "");
          setFieldValue("about.emergencyContact.phone", ec?.phone || "");
          setFieldValue("about.emergencyContact.relationship", ec?.relation || ec?.relationship || "");
        }

        // Address: hydrate into More About Yourself if available
        const addr: any = (user as any)?.address || (user as any)?.about?.address;
        if (addr && typeof addr === 'object') {
          if (addr.addressLine1) setFieldValue("about.address.addressLine1", addr.addressLine1);
          if (addr.city) setFieldValue("about.address.city", addr.city);
          if (addr.state) setFieldValue("about.address.state", addr.state);
          if (addr.postalCode) setFieldValue("about.address.postalCode", addr.postalCode);
          if (addr.latitude) setFieldValue("about.address.latitude", addr.latitude);
          if (addr.longitude) setFieldValue("about.address.longitude", addr.longitude);
          // Map to validation keys expected by Complete Profile (if used)
          if (addr.city) setFieldValue("about.address.locality", addr.city);
          if (addr.state) setFieldValue("about.address.administrative_area_level_1", addr.state);
          setFieldValue("about.address.country", addr.country || "Australia");
        }

        // Step 4: ABN Details (Business)
        if (user?.taxInvoiceSettings) {
          setFieldValue("business.abn", user.taxInvoiceSettings.abn || "");
          setFieldValue("business.isGstRegistered", Boolean(user.taxInvoiceSettings.isGstRegistered));
          setFieldValue("business.businessName", user.taxInvoiceSettings.companyName || "");
          setFieldValue("business.invoiceEmail", user.taxInvoiceSettings.invoiceEmail || "");
          setFieldValue("business.businessAddress", user.taxInvoiceSettings.billingAddress || "");
          setFieldValue("business.agreeToTerms", Boolean(user.taxInvoiceSettings.agree));
        }

        // Step 5: Driving Licence (only scalar fields)
        if (user?.drivingLicense) {
          if (user.drivingLicense.issueState) {
            setFieldValue("drivingLicence.issueState", user.drivingLicense.issueState);
          }
          if (user.drivingLicense.expiryDate) {
            setFieldValue("drivingLicence.expiryDate", String(user.drivingLicense.expiryDate).split("T")[0]);
          }
          if (Array.isArray(user.drivingLicense.documents)) {
            setFieldValue("drivingLicence.serverDocs", user.drivingLicense.documents);
          }
        }

        // Step 6: VEVO Check
        if (user?.vevoCheck) {
          setFieldValue("vevoCheck.citizen", user.vevoCheck.citizen || "");
          setFieldValue("vevoCheck.visaType", user.vevoCheck.visaType || "");
          setFieldValue("vevoCheck.visaExpiry", user.vevoCheck.visaExpiry ? String(user.vevoCheck.visaExpiry).split("T")[0] : "");
          if (Array.isArray(user.vevoCheck.documents)) {
            setFieldValue("vevoCheck.serverDocs", user.vevoCheck.documents);
          }
        }

        // Step 7: Vehicle Details (partial)
        if (user?.vehicleType) {
          setFieldValue("vehicalDetails.vehicleType", user.vehicleType);
        }
        if (Array.isArray(user?.vehicles) && user.vehicles.length > 0) {
          const v = user.vehicles[0];
          if (typeof v?.hasBranding === 'boolean') {
            setFieldValue("vehicalDetails.hasBranding", v.hasBranding);
          }
          if (v?.plateNumber) setFieldValue("vehicalDetails.rego", v.plateNumber);
          if (v?.make) setFieldValue("vehicalDetails.vehicleMake", v.make);
          if (v?.model) setFieldValue("vehicalDetails.vehicleModel", v.model);
          if (v?.size) setFieldValue("vehicalDetails.vehicleYear", String(v.size));
          if (Array.isArray(v?.photos)) {
            setFieldValue("vehicalDetails.serverPhotos", v.photos);
          }
        }

        // Step 8: Liability Insurance
        if (user?.liabilityIns) {
          if (typeof user.liabilityIns.hasInsurance === "boolean") {
            setFieldValue("liabilityIns.hasInsurance", user.liabilityIns.hasInsurance);
          }
          if (user.liabilityIns.policyNumber) {
            setFieldValue("liabilityIns.policyNumber", user.liabilityIns.policyNumber);
          }
          if (user.liabilityIns.expiryDate) {
            setFieldValue("liabilityIns.expiryDate", String(user.liabilityIns.expiryDate).split("T")[0]);
          }
          if (user.liabilityIns.coverageAmount) {
            setFieldValue("liabilityIns.coverageAmount", String(user.liabilityIns.coverageAmount));
          }
          if (Array.isArray(user.liabilityIns.documents)) {
            setFieldValue("liabilityIns.serverDocs", user.liabilityIns.documents);
          }
        }

        // Decide starting step: if not email verified → go to Email Verification (2)
        // else honor backend onboardingStep when available (cap 9 → 8 since step 9 merged)
        let startStep = 1;
        if (user?.emailVerified === false) {
          startStep = 2;
        } else if (typeof user?.onboardingStep === "number" && user.onboardingStep >= 1 && user.onboardingStep <= 9) {
          // ABN step (4) removed; remap 4 -> 5
          const remapped = user.onboardingStep === 4 ? 5 : user.onboardingStep;
          startStep = Math.min(remapped, 8);
        }
        setStep(startStep);

        // Mark completed steps in stepper based on profile
        const completed: number[] = [];
        // Step 1 (Initial Registration) considered completed if user exists
        completed.push(1);
        // Step 2 (Email Verification) if emailVerified
        if (user?.emailVerified) completed.push(2);
        // Mark all steps before onboardingStep as completed
        if (typeof user?.onboardingStep === 'number') {
          const last = user.onboardingStep === 4 ? 5 : user.onboardingStep;
          for (let s = 3; s < last; s++) completed.push(s);
        }
        setCompletedSteps(completed);
      } catch (error) {
        console.error('Error loading profile:', error);
      } finally {
        // Always hide loader after API call completes (success or error)
        setIsLoadingProfile(false);
      }
    })();
    // Run immediately on mount - get token from URL inside, don't wait for prop
  }, []); // Empty deps = run once on mount

  useEffect(() => {
    // Only show welcome modal if starting from step 1
    if (initialStep === 1) {
      setWelcomeModal(true);
    }
  }, [initialStep]);

  useEffect(() => {
    // step changed
  }, [step]);

  // Function to navigate to a previous step
  const navigateToPreviousStep = (targetStep: number) => {
    if (targetStep < step) {
      setStep(targetStep);
    }
  };

  // Function to refresh profile data after API calls
  const refreshProfileData = async () => {
    try {
      console.log("🔄 Refreshing profile data...");
      const res: any = await getMoverProfile(token);
      console.log("📊 Profile API response:", res);

      const user = (res as any)?.data?.user || (res as any)?.user;
      console.log("👤 User data:", user);

      if (!user) {
        console.log("❌ No user data found");
        return;
      }

      // Update form fields using setFieldValue to trigger re-renders
      // Step 1 & 3: About / More About Yourself
      if (typeof user?.email === "string") {
        setFieldValue("about.email", user.email);
      }
      if (typeof user?.emailVerified === "boolean") {
        setEmailVerified(Boolean(user.emailVerified));
      }
      if (typeof user?.name === "string") {
        setFieldValue("about.emergencyContact.name", user.name);
      }
      if (typeof user?.phone === "string") {
        setFieldValue("about.emergencyContact.phone", user.phone);
      }
      if (typeof user?.experience === "boolean") {
        setFieldValue("about.experience", user.experience);
      }
      if (typeof user?.month === "string") {
        setFieldValue("about.month", user.month);
      }
      if (typeof user?.howManyPerson === "string") {
        setFieldValue("about.howManyPerson", user.howManyPerson);
      }
      if (typeof user?.canWorkThisWeekend === "boolean") {
        setFieldValue("about.canWorkThisWeekend", user.canWorkThisWeekend);
      }
      if (typeof user?.emergencyContactName === "string") {
        setFieldValue("about.emergencyContact.name", user.emergencyContactName);
      }
      if (typeof user?.emergencyContactPhone === "string") {
        setFieldValue("about.emergencyContact.phone", user.emergencyContactPhone);
      }
      if (typeof user?.emergencyContactRelation === "string") {
        setFieldValue("about.emergencyContact.relationship", user.emergencyContactRelation);
      }
      if (typeof user?.emergencyContactIsMover === "boolean") {
        setFieldValue("about.haveEmergencyContact", user.emergencyContactIsMover);
      }

      // Step 4: ABN Details
      if (typeof user?.abn === "string") {
        setFieldValue("business.abn", user.abn);
      }
      if (typeof user?.businessName === "string") {
        setFieldValue("business.businessName", user.businessName);
      }
      if (typeof user?.businessAddress === "string") {
        setFieldValue("business.businessAddress", user.businessAddress);
      }

      // Step 5: Driving License - Update documents and expiry date for document display
      console.log("🚗 Driving License documents:", user?.drivingLicense?.documents);
      if (Array.isArray(user?.drivingLicense?.documents)) {
        console.log("✅ Setting drivingLicence.serverDocs:", user.drivingLicense.documents);
        setFieldValue("drivingLicence.serverDocs", user.drivingLicense.documents);
      }
      if (user?.drivingLicense?.expiryDate) {
        setFieldValue("drivingLicence.expiryDate", String(user.drivingLicense.expiryDate).split("T")[0]);
      }

      // Step 6: VEVO Check - Update documents for document display
      console.log("🛂 VEVO Check documents:", user?.vevoCheck?.documents);
      if (Array.isArray(user?.vevoCheck?.documents)) {
        console.log("✅ Setting vevoCheck.serverDocs:", user.vevoCheck.documents);
        setFieldValue("vevoCheck.serverDocs", user.vevoCheck.documents);
      }

      // Step 7: Vehicle Details - Update photos for document display
      console.log("🚙 Vehicle vehicles array:", user?.vehicles);
      if (Array.isArray(user?.vehicles) && user.vehicles.length > 0) {
        // Get photos from the first vehicle (assuming it's the default one)
        const vehiclePhotos = user.vehicles[0]?.photos || [];
        console.log("🚙 Vehicle photos:", vehiclePhotos);
        if (Array.isArray(vehiclePhotos) && vehiclePhotos.length > 0) {
          console.log("✅ Setting vehicalDetails.serverPhotos:", vehiclePhotos);
          setFieldValue("vehicalDetails.serverPhotos", vehiclePhotos);

          // Also update the individual photo fields for validation
          const frontPhoto = vehiclePhotos.find((photo: any) => photo.type === 'front');
          const sidePhoto = vehiclePhotos.find((photo: any) => photo.type === 'side');
          if (frontPhoto) {
            console.log("✅ Setting vehicalDetails.vehiclePhotosFront:", frontPhoto.s3Url);
            setFieldValue("vehicalDetails.vehiclePhotosFront", frontPhoto.s3Url);
          }
          if (sidePhoto) {
            console.log("✅ Setting vehicalDetails.vehiclePhotosSide:", sidePhoto.s3Url);
            setFieldValue("vehicalDetails.vehiclePhotosSide", sidePhoto.s3Url);
          }
        }
      }

      // Step 8: Liability Insurance - Update documents for document display
      console.log("🛡️ Insurance documents:", user?.liabilityIns?.documents);
      if (Array.isArray(user?.liabilityIns?.documents)) {
        console.log("✅ Setting liabilityIns.serverDocs:", user.liabilityIns.documents);
        setFieldValue("liabilityIns.serverDocs", user.liabilityIns.documents);
        setFieldValue("liabilityIns.documents", user.liabilityIns.documents);
      }

      // Force a re-render by updating a dummy field
      setFieldValue("_lastRefresh", Date.now());
      console.log("✅ Profile data refresh completed");
    } catch (error) {
      console.error("❌ Failed to refresh profile data:", error);
    }
  };

  const onSubmit = async (values: any) => {
    // container onSubmit called
    if (step === 8) {
      // Final submission happens here (merged into step 8)
      console.log('MoverStepTab: onSubmit called for step 8 (final submission)');
      const agreeToTerms = Boolean(values?.finalSubmission?.agreeToTerms);
      console.log('MoverStepTab: agreeToTerms:', agreeToTerms);
      if (!agreeToTerms) {
        console.log('MoverStepTab: agreeToTerms is false, returning');
        return;
      }
      console.log('MoverStepTab: Calling submitFinalApplication');
      const res = await submitFinalApplication({ agreeToTerms });
      console.log('MoverStepTab: submitFinalApplication response:', res);
      if (res?.status === 200) {
        console.log('MoverStepTab: Final submission successful, refreshing profile and showing thank you modal');
        await refreshProfileData();
        setIsOpen(true); // show thank-you popup
        console.log('MoverStepTab: Thank you modal should now be visible');
      } else {
        console.log('MoverStepTab: Final submission failed:', res?.message);
        errorToast(res?.message || "Failed to submit application. Please try again.");
      }
      return; // don't advance to a non-existent step
    }

    // For other steps, refresh and advance
    await refreshProfileData();
    setStep((e: any) => e + 1);
  };
  const getValidationSchema: any = useMemo(() => {
    switch (step) {
      case 1:
        return aboutSchema;
      case 2:
        return Yup.object();
      case 3:
        return aboutSchema; // More About Yourself uses same validation as MoreAbout
      case 4:
        return businessValidationSchema; // ABN Details
      case 5:
        return helper ? Yup.object() : drivingLicenceSchema;
      case 6:
        return Yup.object().shape({
          vevoCheck: Yup.object().shape({
            citizen: Yup.string()
              .required("Please select your citizenship status")
              .oneOf(['Australian/NZ Citizen', 'Australian/NZ PR', 'Foreign National'], "Please select a valid option"),
            // Require issue date, expiry and document only for Foreign National
            visaIssueDate: Yup.string().when('citizen', (citizenVal: any, schema: any) => {
              return citizenVal === 'Foreign National'
                ? schema.required('Please provide your visa issue date')
                : schema;
            }),
            visaExpiry: Yup.string().when('citizen', (citizenVal: any, schema: any) => {
              return citizenVal === 'Foreign National'
                ? schema.required('Please provide your visa expiry date')
                : schema;
            }),
            visaDocument: Yup.mixed().when(['citizen', 'serverDocs'], (values: any[], schema: any) => {
              const [citizenVal, serverDocs] = values || [];
              const hasServerDoc = Array.isArray(serverDocs) && serverDocs.length > 0;
              if (citizenVal === 'Foreign National' && !hasServerDoc) {
                return schema.test('visa-document-required', 'Please upload your visa document', function (value: any) {
                  // Accept string (when file is uploaded) or non-empty value
                  return typeof value === 'string' && value.trim().length > 0;
                });
              }
              return schema;
            }),
          }),
        });
      case 7:
        return helper ? Yup.object() : vehicleDetailsSchema;
      case 8:
        return liabilityInsSchema;
      case 9:
        return Yup.object().shape({
          finalSubmission: Yup.object().shape({
            agreeToTerms: Yup.boolean()
              .oneOf([true], 'Please agree to the final confirmation to proceed')
              .required('Please agree to the final confirmation to proceed'),
          }),
        });
      // Add more cases for additional steps
      default:
        return Yup.object();
    }
  }, [step, helper]);

  const {
    errors,
    handleSubmit,
    values,
    handleChange,
    touched,
    handleBlur,
    setFieldValue,
    isSubmitting,
    setFieldTouched,
    submitCount,
    validateForm,
  } = useFormik({
    initialValues: initialValues,
    validationSchema: getValidationSchema,
    onSubmit,
  });

  // Update completedSteps based on actual step completion in real-time
  useEffect(() => {
    const newCompletedSteps: number[] = [];
    for (let stepNum = 1; stepNum <= 9; stepNum++) {
      if (isStepDataFilled(stepNum)) {
        newCompletedSteps.push(stepNum);
      }
    }
    setCompletedSteps(newCompletedSteps);
  }, [values, emailVerified]);

  const handelOk = () => {
    setIsOpen(false);
    setWelcomeModal(false);
    router.push("/");
  };



  // Show only loader while API is loading (for step=3 redirect)

  // Hide initial HTML loader when React takes over
  useLayoutEffect(() => {
    const initialLoader = document.getElementById('initial-loader');
    if (initialLoader) {
      initialLoader.remove();
    }
  }, []);

  if (isLoadingProfile) {
    return (
      <div className="emailVerificationLoader">
        <div className="spinner-border" role="status" style={{
          width: '3rem',
          height: '3rem',
          borderWidth: '4px',
          borderColor: '#ffe147',
          borderRightColor: 'transparent'
        }}>
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  return (
    <Container>
      <div className="becomeMoverStep">
        <div className="becomeMoverStep__content">
          <h2>
            Welcome <strong> {name}</strong>
          </h2>
          <p className="mb-3">
            Please complete the required fields to create free account and get
            to access to available moving job
          </p>
          {/* Sticky mobile stepper (hide steps 1 and 2; ABN removed) */}
          <div className="mobileStepper">
            <ul className="mobileStepper__list">
              {[
                // Hidden: "Initial Registration",
                // Hidden: "Email Verification",
                "More About Yourself",
                "Driver License Upload",
                "VEVO Check",
                "Vehicle Details",
                "Liability Insurance",
              ].map((label, idx) => {
                // Map current step (3..8) to visible index (0..5)
                const mapActiveIdx = (currentStep: number) => {
                  if (currentStep <= 3) return 0; // Treat step 1/2/3 as index 0
                  // compress after removing ABN step (actual 5..8 -> visible 1..4)
                  return Math.min(currentStep - 4, 4);
                };
                // Map visible index back to actual step
                const mapStepperToStep = (stepperIdx: number) => (stepperIdx === 0 ? 3 : 4 + stepperIdx);

                const activeIdx = mapActiveIdx(step);
                const isActive = idx === activeIdx;

                const internalStep = mapStepperToStep(idx);
                const isCompleted = (() => {
                  try {
                    switch (internalStep) {
                      case 3: {
                        const a: any = (values as any)?.about;
                        const hasBasics = a?.howManyPerson && (a?.experience !== undefined) && (a?.canWorkThisWeekend !== undefined);
                        const ecOk = !a?.haveEmergencyContact || (a?.emergencyContact?.name && a?.emergencyContact?.phone && a?.emergencyContact?.relationship);
                        return Boolean(hasBasics && ecOk);
                      }
                      case 4: {
                        const b: any = (values as any)?.business;
                        return Boolean(b?.abn || b?.businessName || b?.invoiceEmail || b?.businessAddress);
                      }
                      case 5: {
                        const dl: any = (values as any)?.drivingLicence;
                        const hasServer = Array.isArray(dl?.serverDocs) && dl.serverDocs.length > 0;
                        const hasLocal = Array.isArray(dl?.licenseFront) && dl.licenseFront.length > 0;
                        return Boolean(hasServer || hasLocal);
                      }
                      case 6: {
                        const vc: any = (values as any)?.vevoCheck;
                        if (!vc?.citizen) return false;
                        if (vc.citizen === 'Foreign National') {
                          const hasServer = Array.isArray(vc?.serverDocs) && vc.serverDocs.length > 0;
                          const hasVisaDocument = vc?.visaDocument === 'uploaded' || vc?.visaDocument;
                          return Boolean(hasServer || (hasVisaDocument && vc?.visaExpiry));
                        }
                        return true;
                      }
                      case 7: {
                        const v: any = (values as any)?.vehicalDetails;
                        const hasPhotos = Array.isArray(v?.serverPhotos) ? v.serverPhotos.length > 0 : false;
                        const hasAllVehicleBasics = Boolean(
                          v?.rego && v?.vehicleMake && v?.vehicleModel && v?.vehicleYear && v?.vehicleType
                        );
                        return Boolean(hasPhotos || hasAllVehicleBasics);
                      }
                      case 8: {
                        const li: any = (values as any)?.liabilityIns;
                        const hasServer = Array.isArray(li?.serverDocs) && li.serverDocs.length > 0;
                        return Boolean(hasServer || li?.insuranceDocument);
                      }
                      default: return false;
                    }
                  } catch { return false; }
                })();

                return (
                  <li
                    key={`m-${idx}`}
                    className={`mobileStepper__item ${isActive ? 'active' : isCompleted ? 'completed' : ''}`}
                    onClick={() => setStep(mapStepperToStep(idx))}
                  >
                    <span className="idx">{idx + 1}</span>
                    <span className="lbl">{label}</span>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>

        {/* Two-column layout with left stepper, right content */}
        <div className="workdetailsWraper stepper-layout">
          {/* Left Stepper */}
          <div className="stepperLeft">
            <h3 className="mb-3">Registration Steps</h3>
            <ul className="list-unstyled">
              {[
                // Hidden: "Initial Registration",
                // Hidden: "Email Verification",
                "More About Yourself",
                "Driver License Upload",
                "VEVO Check",
                "Vehicle Details",
                "Liability Insurance",
              ].map((label, idx) => {
                // Map current step (3..8) to visible index (0..4) after removing ABN
                const mapActiveIdx = (currentStep: number) => {
                  if (currentStep <= 3) return 0; // Treat step 1/2/3 as index 0
                  return Math.min(currentStep - 4, 4);
                };
                // Map visible index back to actual step
                const mapStepperToStep = (stepperIdx: number) => (stepperIdx === 0 ? 3 : 4 + stepperIdx);

                const activeIdx = mapActiveIdx(step);
                const isActive = idx === activeIdx;
                const targetStepNum = mapStepperToStep(idx);
                const currentStepNum = mapStepperToStep(activeIdx);
                const isPreviouslyCompleted = completedSteps.includes(targetStepNum);
                const currentCompleted = completedSteps.includes(currentStepNum);
                const isImmediateNextAllowed = currentCompleted && idx === activeIdx + 1;
                // Allow rules as before (relative to visible range)
                let isClickable = (idx <= activeIdx) || (currentCompleted && isPreviouslyCompleted) || isImmediateNextAllowed;

                const internalStep = mapStepperToStep(idx);
                const isCompleted = isStepDataFilled(internalStep);

                return (
                  <li
                    key={idx}
                    className={`stepItem ${isActive ? "active" : isCompleted ? "completed" : "disabled"} ${isClickable ? "clickable" : ""}`}
                    onClick={() => {
                      if (!isClickable) return;
                      const target = mapStepperToStep(idx);
                      setStep(target);
                    }}
                    role={isClickable ? "button" : undefined}
                    tabIndex={isClickable ? 0 : undefined}
                  >
                    <span className="stepIndex">{idx + 1}</span>
                    <span className="stepLabel">{label}</span>
                  </li>
                );
              })}
            </ul>
          </div>

          {/* Right content */}
          <div className="workdetailsContainer">
            {step === 1 && (
              <MoreAbout
                value={values.about}
                setFieldValue={setFieldValue}
                handleChange={handleChange}
                handleBlur={handleBlur}
                errors={errors}
                handleSubmit={handleSubmit}
                setFieldTouched={setFieldTouched}
                touched={touched}
              />
            )}
            {/* Step 2 is Email Verification (skipped in current flow). No UI render here. */}
            {step === 2 && (
              <EmailVerification
                email={values?.about?.email || name}
                verified={emailVerified}
                onBack={() => navigateToPreviousStep(1)}
                onNext={() => setStep(3)}
              />
            )}
            {step === 3 && (
              <CompleteProfile
                token={token}
                name={name}
                initialData={values.about}
                onNext={(data) => {
                  setFieldValue("about", data);
                  // Skip ABN step; go directly to Driving Licence
                  setStep(5);
                }}
              />
            )}
            {/* Step 4 (ABN) removed */}
            {step === 5 && (
              <DrivingLicence
                value={values.drivingLicence}
                setFieldValue={setFieldValue}
                handleChange={handleChange}
                handleBlur={handleBlur}
                errors={errors}
                touched={touched}
                submitCount={submitCount}
                handleSubmit={handleSubmit}
                validateForm={validateForm}
                token={token}
                onBack={() => navigateToPreviousStep(4)}
                refreshProfileData={refreshProfileData}
                onNext={async (data: any) => {
                  setFieldValue("drivingLicence", data);
                  await refreshProfileData();
                  setStep(6);
                }}
              />
            )}
            {step === 6 && (
              <VevoCheck
                value={values.vevoCheck}
                setFieldValue={setFieldValue}
                handleChange={handleChange}
                handleBlur={handleBlur}
                errors={errors}
                touched={touched}
                submitCount={submitCount}
                handleSubmit={handleSubmit}
                validateForm={validateForm}
                token={token}
                onBack={() => navigateToPreviousStep(5)}
                refreshProfileData={refreshProfileData}
                onNext={async (data: any) => {
                  setFieldValue("vevoCheck", data);
                  await refreshProfileData();
                  setStep(7);
                }}
              />
            )}
            {step === 7 && (
              <VehicalDetails
                value={values.vehicalDetails}
                setFieldValue={setFieldValue}
                handleChange={handleChange}
                handleBlur={handleBlur}
                errors={errors}
                touched={touched}
                submitCount={submitCount}
                handleSubmit={handleSubmit}
                token={token}
                onBack={() => navigateToPreviousStep(6)}
                validateForm={validateForm}
                refreshProfileData={refreshProfileData}
                onNext={async (data: any) => {
                  setFieldValue("vehicalDetails", data);
                  await refreshProfileData();
                  setStep(8);
                }}
              />
            )}
            {step === 8 && (
              <>
                <PublicLiabilityInsurance
                  value={{ ...values.liabilityIns, isSkip: isSkipInsuranceDoc }}
                  setFieldValue={setFieldValue}
                  handleChange={handleChange}
                  handleBlur={handleBlur}
                  errors={errors}
                  touched={touched}
                  submitCount={submitCount}
                  handleSubmit={handleSubmit}
                  isSubmitting={isSubmitting}
                  token={token}
                  validateForm={validateForm}
                  setIsSkipInsuranceDoc={setIsSkipInsuranceDoc}
                  refreshProfileData={refreshProfileData}
                  onBack={() => navigateToPreviousStep(7)}
                  onNext={async () => {
                    await refreshProfileData();
                  }}
                  registerSubmitHandler={(fn: any) => {
                    // keep a ref on window to avoid prop drilling further
                    (window as any).__insuranceSubmit__ = fn;
                  }}
                />
                <SubmitApplication
                  value={{
                    agreeToTerms: (values as any)?.finalSubmission?.agreeToTerms,
                    understandsWorkRights: (values as any)?.finalSubmission?.understandsWorkRights,
                    // mirror insurance presence for simple 2-field check
                    insuranceDocument: (values as any)?.liabilityIns?.insuranceDocument,
                    liabilityInsServerDocs: (values as any)?.liabilityIns?.serverDocs || (values as any)?.liabilityIns?.documents || [],
                    // Pass the hasInsurance value to SubmitApplication
                    liabilityIns: {
                      hasInsurance: (values as any)?.liabilityIns?.hasInsurance
                    }
                  }}
                  handleChange={handleChange}
                  handleBlur={handleBlur}
                  errors={errors}
                  handleSubmit={async () => {
                    try {
                      console.log('MoverStepTab: Starting final submission process');
                      setIsSubmittingFinal(true);
                      // Trigger insurance submit first
                      console.log('MoverStepTab: Calling insurance submit handler');
                      const ok = typeof (window as any).__insuranceSubmit__ === 'function' ? await (window as any).__insuranceSubmit__() : true;
                      console.log('MoverStepTab: Insurance submit result:', ok);
                      if (!ok) {
                        console.log('MoverStepTab: Insurance submit failed, stopping');
                        setIsSubmittingFinal(false);
                        return;
                      }
                      // Then trigger final submission (call onSubmit to show thank you modal)
                      console.log('MoverStepTab: Insurance submit successful, calling onSubmit for final submission');
                      await onSubmit(values);
                      console.log('MoverStepTab: Final submission completed');
                    } catch (error) {
                      console.error('MoverStepTab: Error in final submission:', error);
                    } finally {
                      setIsSubmittingFinal(false);
                    }
                  }}
                  isSubmitting={isSubmittingFinal}
                  onBack={() => setStep(7)}
                  submitCount={submitCount}
                />
              </>
            )}
          </div>
        </div>
      </div>
      <CustomModal
        title={welcomeModal ? "Profile Completed" : "Thank You"}
        close={() => handelOk()}
        show={isOpen || welcomeModal}
        showFooter={false}
        cancelText="Cancel"
        showSaveButton="Confirm"
        mainClassName="thankYouWrapper"
      >
        <div className="d-flex flex-column thankingApplication">
          {welcomeModal ? (
            <>
              <p>Your profile is completed. Please wait for approval. We will notify you once approved.</p>
              <div className="d-flex justify-content-center">
                <Button
                  variant="primary"
                  className="signupButton"
                  onClick={handelOk}
                >
                  Ok
                </Button>
              </div>
            </>
          ) : (
            <>
              <h2>{`Thanks ${name} for the application!`}</h2>
              <p>
                Please Note- Application process typically takes 1-2 working days, A member of Oyo team will be in touch with you shortly.
              </p>

              <div className="d-flex justify-content-center">
                <Button
                  variant="primary"
                  className="signupButton"
                  onClick={handelOk}
                >
                  Ok
                </Button>
              </div>
            </>
          )}
        </div>
      </CustomModal>

      {/* Email Verification Success Modal */}
      <CustomModal
        title=""
        close={() => setShowVerificationModal(false)}
        show={showVerificationModal}
        showFooter={false}
        mainClassName="emailVerificationModal"
        backdrop={true}
        keyboard={true}
        closeButton={true}
      >
        <div className="d-flex flex-column align-items-center emailVerificationContent">
          <FaCheckCircle className="emailVerificationIcon" />
          <h2>Your Email is Verified</h2>
          <p>
            You're almost there! Complete a few steps to start earning as a Mover.
          </p>
        </div>
      </CustomModal>
    </Container>
  );
}

export default MoverStepTab;

