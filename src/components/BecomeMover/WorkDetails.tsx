"use client";
import "./workdetails.scss";
import "./registration.scss";
import React, { useEffect, useState } from "react";
import Select from "../Select";
import VehicleSelect from "../Select/VehicleSelect";
import MoverInput from "./MoverInput";
import { useFormik } from "formik";
import * as Yup from "yup";
import { createMover } from "@/lib/serverAction";
import { FaArrowAltCircleRight, FaCheck } from "react-icons/fa";
import IconButton from "../IconButton";
import { errorToast, successToast } from "@/lib/toaster";
import { resendVerificationEmail } from "@/lib/serverAction/becomeMoverActions";
import { createHelper } from "@/lib/serverAction/becomeHelperActions";
import CustomModal from "../CustomModal";
import { Button } from "..";
import moment from "moment";
import { useRouter } from "next/navigation";
import ReCaptcha from "../ReCaptcha";
// Step 1 does not use CustomDatePicker

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
const selectServiceOptions = [
  { label: "Melbourne", value: "Melbourne" },
  { label: "Geelong", value: "Geelong" },
  { label: "Both (Melbourne & Geelong)", value: "Both (Melbourne & Geelong)" },
];
const validationSchema = Yup.object().shape({
  name: Yup.string()
    .required("Name is required")
    .min(3, "Full name must be at least 3 characters")
    .max(50, "Full name must be at most 50 characters"),
  // Phone: digits only, length check (Australia local without country code)
  // Australian mobile: +61 followed by 9 digits ⇒ local part must be exactly 9 digits
  phone: Yup.string()
    .required("Phone Number is required")
    .matches(/^\d+$/, "Phone must contain only digits")
    .length(9, "Enter 9 digits for Australian mobile"),
  email: Yup.string()
    .required("Email is required")
    .email("Email is invalid")
    .matches(/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i, "Email is invalid"),
  business: Yup.object({
    abn: Yup.string()
      .required("ABN is required")
      .matches(/^\d{11}$/, "ABN must be exactly 11 digits"),
    isGstRegistered: Yup.boolean()
      .oneOf([true, false], "GST selection is required")
      .required("GST selection is required"),
  }),
  day: Yup.string().required("Day is required"),
  month: Yup.string().required("Month is required"),
  year: Yup.string().required("Year is required"),
  dateOfBirth: Yup.string()
    .required("Date of Birth is required")
    .test("is-16-plus", "You must be at least 16 years old", function (v) {
      const { day, month, year } = this.parent;
      if (!day || !month || !year) return false;
      const dateStr = `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`;
      const birthDate = moment(dateStr, "YYYY-MM-DD");
      if (!birthDate.isValid()) return false;
      return moment().diff(birthDate, "years") >= 16;
    }),
  password: Yup.string()
    .required("Password is required")
    .min(8, "Password must be at least 8 characters"),
  confirmPassword: Yup.string()
    .required("Confirm Password is required")
    .oneOf([Yup.ref('password')], 'Passwords must match'),
  interestedRegions: Yup.string().required("Work area is required"),
  vehicleType: Yup.string().required("Vehicle is required"),
  agreeToTerms: Yup.boolean().oneOf([true], "You must agree to terms"),
  // Captcha is handled via popup; do not block Next Step with validation
  recaptcha: Yup.string().nullable().notRequired(),
});
interface IWorkDetails {
  name: string;
  email: string;
  phone: string;
  password: string;
  confirmPassword: string;
  dateOfBirth: string;
  interestedRegions: string;
  vehicleType: string;
  agreeToTerms: boolean;
  recaptcha: string;
  day: string;
  month: string;
  year: string;
  business?: {
    abn: string;
    isGstRegistered: boolean | null;
  };
}

const WorkDetails = ({ helper }: { helper?: boolean }) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  // Show inline success content instead of popup after successful submission
  const [submitted, setSubmitted] = useState<boolean>(false);
  const [isPopup, setIsPopup] = useState<boolean>(false);
  const [dobModal, setDobModal] = useState<boolean>(false);
  const [dobDismissed, setDobDismissed] = useState<boolean>(false);
  const [showCaptchaModal, setShowCaptchaModal] = useState<boolean>(false);
  const [submittedEmail, setSubmittedEmail] = useState<string>("");
  const [isResending, setIsResending] = useState<boolean>(false);
  const router = useRouter();

  const days = Array.from({ length: 31 }, (_, i) => ({
    label: (i + 1).toString(),
    value: (i + 1).toString(),
  }));

  const months = [
    { label: "January", value: "1" },
    { label: "February", value: "2" },
    { label: "March", value: "3" },
    { label: "April", value: "4" },
    { label: "May", value: "5" },
    { label: "June", value: "6" },
    { label: "July", value: "7" },
    { label: "August", value: "8" },
    { label: "September", value: "9" },
    { label: "October", value: "10" },
    { label: "November", value: "11" },
    { label: "December", value: "12" },
  ];
  const currentYear = new Date().getFullYear();
  const currentMonth = new Date().getMonth() + 1; // 1-12
  const currentDay = new Date().getDate();

  // Calculate the maximum year that would make someone exactly 16 years old
  const maxYearFor16 = currentYear - 16;

  // If we're past the current month/day, they can be 16 this year
  // Otherwise, they need to be born in the previous year to be 16
  const maxAllowedYear = (currentMonth === 12 && currentDay === 31) ? maxYearFor16 : maxYearFor16 - 1;

  const years = Array.from({ length: maxAllowedYear - 1900 + 1 }, (_, i) => ({
    label: (1900 + i).toString(),
    value: (1900 + i).toString(),
  })).reverse();

  // Filter months based on selected year (for 16+ validation)
  const getFilteredMonths = () => {
    if (!values.year) return months;

    const selectedYear = parseInt(values.year);
    const yearFor16 = currentYear - 16;

    if (selectedYear < yearFor16) {
      // If year is before the 16-year cutoff, all months are valid
      return months;
    } else if (selectedYear === yearFor16) {
      // If it's the exact 16-year year, filter months based on current month
      return months.filter(month => parseInt(month.value) <= currentMonth);
    } else {
      // If year is after 16-year cutoff, no months are valid (shouldn't happen with our year filter)
      return [];
    }
  };

  // Filter days based on selected year and month (for 16+ validation)
  const getFilteredDays = () => {
    if (!values.year || !values.month) return days;

    const selectedYear = parseInt(values.year);
    const selectedMonth = parseInt(values.month);
    const yearFor16 = currentYear - 16;

    if (selectedYear < yearFor16) {
      // If year is before the 16-year cutoff, all days are valid
      return days;
    } else if (selectedYear === yearFor16 && selectedMonth === currentMonth) {
      // If it's the exact 16-year year and month, filter days based on current day
      return days.filter(day => parseInt(day.value) <= currentDay);
    } else if (selectedYear === yearFor16 && selectedMonth < currentMonth) {
      // If it's the 16-year year but earlier month, all days are valid
      return days;
    } else {
      // If year/month is after 16-year cutoff, no days are valid (shouldn't happen with our filters)
      return [];
    }
  };

  const initialValues: IWorkDetails = {
    name: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    dateOfBirth: "",
    interestedRegions: "Melbourne",
    vehicleType: "",
    agreeToTerms: false,
    recaptcha: "",
    day: "",
    month: "",
    year: "",
    business: {
      abn: "",
      isGstRegistered: false,
    },
  };

  const onSubmit = async (values: any) => {
    // Calculate age from the formatted dateOfBirth
    const birthDate = moment(values.dateOfBirth, "YYYY-MM-DD");
    if (!birthDate.isValid()) {
      errorToast("Invalid date of birth");
      return;
    }

    const age = moment().diff(birthDate, "years");

    if (age < 18) {
      setDobModal(true);
      return;
    }

    // Build full phone with fixed Australia code +61
    const fullPhone = `+61${values.phone}`;

    const payload = {
      name: values.name,
      email: values.email,
      phone: fullPhone,
      password: values.password,
      dateOfBirth: values.dateOfBirth,
      interestedRegions: (() => {
        const workAreaValue = values.interestedRegions === "Both (Melbourne & Geelong)" ? ["Melbourne", "Geelong"] : [values.interestedRegions].filter(Boolean);
        console.log('WorkArea conversion:', { original: values.interestedRegions, converted: workAreaValue });
        return workAreaValue;
      })(),
      vehicleType: values.vehicleType,
      agreeToTerms: values.agreeToTerms,
      abn: values.business?.abn || "",
      isGstRegistered: Boolean(values.business?.isGstRegistered),
    };

    // save for resend link
    setSubmittedEmail(values.email);

    if (helper) {
      const res = await createHelper(payload);
      if (res?.status === 201) {
        setSubmitted(true);
      } else {
        errorToast("Something went wrong");
      }
    } else {
      const res = await createMover(payload);
      if (res?.status === 201) {
        setSubmitted(true);
      } else {
        errorToast(res?.message);
      }
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
    setErrors,
    submitCount,
  }: any = useFormik({
    initialValues: initialValues,
    validationSchema,
    onSubmit,
    validateOnMount: true,
  });

  // Local touched tracking for selects to avoid initial errors
  const [fieldTouchedLocal, setFieldTouchedLocal] = useState({
    interestedRegions: false,
    vehicleType: false,
  });
  const markTouchedLocal = (field: keyof typeof fieldTouchedLocal) => {
    setFieldTouchedLocal((prev) => ({ ...prev, [field]: true }));
  };

  useEffect(() => {
    if (values.day && values.month && values.year) {
      const formattedDate = moment(
        `${values.year}-${values.month.padStart(2, '0')}-${values.day.padStart(2, '0')}`,
        "YYYY-MM-DD"
      ).format("YYYY-MM-DD");
      if (moment(formattedDate, "YYYY-MM-DD").isValid()) {
        setFieldValue("dateOfBirth", formattedDate);
      }
    } else {
      setFieldValue("dateOfBirth", "");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [values.day, values.month, values.year]);

  // Reset dismissal only when DOB value changes
  useEffect(() => {
    setDobDismissed(false);
  }, [values.dateOfBirth]);

  // Show DOB notice instantly if age < 18, and hide when corrected
  useEffect(() => {
    if (!values.dateOfBirth) {
      if (dobModal) setDobModal(false);
      return;
    }
    const birthDate = moment(values.dateOfBirth, "YYYY-MM-DD");
    if (!birthDate.isValid()) {
      if (dobModal) setDobModal(false);
      return;
    }
    const age = moment().diff(birthDate, "years");
    if (age < 18) {
      if (dobDismissed) return;
      if (!dobModal) setDobModal(true);
    } else if (dobModal) {
      setDobModal(false);
    }
  }, [values.dateOfBirth, dobModal, dobDismissed]);

  useEffect(() => {
    if (
      values.vehicleType === "Medium Box Truck" ||
      values.vehicleType === "Small Box Truck" ||
      values.vehicleType === "Large Box Truck"
    ) {
      setIsPopup(true);
    }
  }, [values.vehicleType]);


  const colMoverInput = (
    name: string,
    placeholder: string,
    type?: string,
    setField?: (name: string, value: string) => void
  ) => (
    <MoverInput
      className={type !== "checkbox" ? "" : ""}
      name={name}
      label={placeholder}
      // Disable floating for password to enable eye icon in MoverInput
      isFloating={false}
      id={name}
      placeholder={placeholder}
      value={values[name]}
      type={type || "text"}
      onChange={(e: any) => {
        if (setField) {
          setField(name, e.target.value?.toString());
        } else {
          handleChange(e);
        }
      }}
      onBlur={handleBlur}
      error={touched[name] && errors?.[name]}
    />
  );
  const handelCloseModal = () => {
    setIsPopup(false);
    setDobModal(false);
    setDobDismissed(true);
  };
  const LoadingSpinner = () => (
    <div className="spinner-border spinner-border-sm" role="status" style={{ width: '16px', height: '16px' }}>
      <span className="visually-hidden">Loading...</span>
    </div>
  );
  // Determine if Submit can be enabled: all required fields present and no validation errors
  const requiredFilled = Boolean(
    values.name &&
    values.email &&
    (values.phone || '').toString().length === 9 &&
    values.password &&
    values.confirmPassword &&
    values.interestedRegions &&
    values.vehicleType &&
    values.agreeToTerms === true &&
    values.day && values.month && values.year &&
    (values.business?.abn || '').toString().length === 11 &&
    (values.business?.isGstRegistered === true || values.business?.isGstRegistered === false)
  );
  const noErrors = Object.keys(errors || {}).length === 0;
  const canProceed = requiredFilled && noErrors && !isSubmitting;
  return (
    <div className="workdetailsWraper wd-split">
      <aside className="wd-hero">
        <span className="wd-badge">Movers Wanted</span>
        <h1 className="wd-hero-title">
          Earn great money with your truck or van
        </h1>
        <p className="wd-hero-sub">
          Join Melbourne&apos;s trusted moving platform. Choose your own hours, accept
          confirmed jobs, and get paid fast — no quoting, no chasing leads.
        </p>
        <ul className="wd-points">
          <li><span className="wd-tick"><FaCheck /></span> Flexible work — you choose the jobs</li>
          <li><span className="wd-tick"><FaCheck /></span> Regular, confirmed bookings 7 days</li>
          <li><span className="wd-tick"><FaCheck /></span> Reliable, on-time payments</li>
          <li><span className="wd-tick"><FaCheck /></span> 100% supported by our team</li>
        </ul>
        <div className="wd-stats">
          <div className="wd-stat"><strong>$2,000+</strong><span>weekly potential</span></div>
          <div className="wd-stat"><strong>4.9★</strong><span>rated on Google</span></div>
          <div className="wd-stat"><strong>1000s</strong><span>of moves done</span></div>
        </div>
      </aside>
      <div className="workdetailsContainer registration-wrapper">
        {/* Inline success view replaces form after successful submission */}
        {submitted ? (
          <div className="profile-form-wrapper">
            <div
              className="form-section success-section"
            >
              <div className="d-flex flex-column align-items-center text-center gap-3">
                <div
                  style={{
                    width: 48,
                    height: 48,
                    borderRadius: 999,
                    background: "#f6fff6",
                    border: "2px solid var(--checkboxColor)",
                    display: "inline-flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "var(--checkboxColor)",
                    fontWeight: 700,
                    fontSize: 22,
                    lineHeight: 1,
                    boxShadow: "0 2px 6px rgba(0,0,0,0.05)",
                    flexShrink: 0,
                  }}
                >
                  ✓
                </div>
                <div style={{ width: "100%", maxWidth: "100%", wordWrap: "break-word", overflowWrap: "break-word" }}>
                  <h4 style={{ margin: 0, color: "#747474", fontWeight: 600 }}>Thanks for submitting your request</h4>
                  <p style={{ margin: "8px 0 0", color: "#555", lineHeight: 1.5, wordWrap: "break-word", overflowWrap: "break-word" }}>
                    A verification email link has been sent to your email. Please
                    verify your email first to complete the further process.
                    {" "}
                    <button
                      type="button"
                      className="terms-link"
                      style={{ background: "none", border: "none", padding: 0, marginLeft: 6, color: "#0d6efd", cursor: "pointer", whiteSpace: "nowrap" }}
                      onClick={async () => {
                        if (!submittedEmail) {
                          errorToast("Email not available");
                          return;
                        }
                        try {
                          setIsResending(true);
                          const res = await resendVerificationEmail(submittedEmail);
                          if (res?.status !== 200) {
                            errorToast(res?.message || "Failed to send verification email");
                          }
                        } catch (e: any) {
                          errorToast(e?.message || "Failed to send verification email");
                        } finally {
                          setIsResending(false);
                        }
                      }}
                      disabled={isResending}
                    >
                      {isResending ? "Sending..." : "Resend email"}
                    </button>
                  </p>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="profile-form-wrapper">
            <h4 className="form-title" style={{ margin: 0, marginBottom: 12, color: "#333", fontWeight: 600, textAlign: "center" }}>Movers Application</h4>
            {/* About You + Vehicle & Terms (single section) */}
            <div className="form-section">
              <Select
                placeholder="Area"
                label="Which area do you want to work in?"
                id="interestedRegions"
                name="interestedRegions"
                value={values.interestedRegions}
                option={selectServiceOptions}
                onChange={(value) => {
                  const syntheticEvent = { target: { name: "interestedRegions", value } } as any;
                  handleChange(syntheticEvent);
                  markTouchedLocal("interestedRegions");
                }}
                error={(fieldTouchedLocal.interestedRegions || submitCount > 0) && (errors as any)?.interestedRegions}
              />
              {/* <h6 className="mb-3">Tell us about yourself *</h6> */}
              {/* <label className="form-label mt-2">Tell us about yourself *</label> */}

              {/* Row 1: Full Name and Email Address */}
              <div className="row">
                <div className="col-md-6 mt-2">
                  <label className="form-label">Full Name</label>
                  {colMoverInput("name", "Full Name")}
                </div>
                <div className="col-md-6 mt-2">
                  <label className="form-label">Date Of Birth</label>
                  <div className="dateSelection d-flex gap-2 mb-2">
                    <div className="mainSelect">
                      <select
                        name="day"
                        id="day"
                        title="Day"
                        className="form-select"
                        value={values.day}
                        onChange={(e) => {
                          handleChange(e);
                        }}
                        onBlur={handleBlur}
                      >
                        <option hidden>Day</option>
                        {getFilteredDays().map((day) => (
                          <option key={day.value} value={day.value}>
                            {day.label}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div className="mainSelect">
                      <select
                        name="month"
                        id="month"
                        title="Month"
                        className="form-select"
                        value={values.month}
                        onChange={(e) => {
                          handleChange(e);
                          // Clear day if month changes and current day is no longer valid
                          if (values.day) {
                            const filteredDays = getFilteredDays();
                            const dayExists = filteredDays.some(day => day.value === values.day);
                            if (!dayExists) {
                              setFieldValue("day", "");
                            }
                          }
                        }}
                        onBlur={handleBlur}
                      >
                        <option hidden>Month</option>
                        {getFilteredMonths().map((month) => (
                          <option key={month.value} value={month.value}>
                            {month.label}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div className="mainSelect">
                      <select
                        name="year"
                        id="year"
                        title="Year"
                        className="form-select"
                        value={values.year}
                        onChange={(e) => {
                          handleChange(e);
                          // Clear month and day if year changes and they're no longer valid
                          if (values.month) {
                            const filteredMonths = getFilteredMonths();
                            const monthExists = filteredMonths.some(month => month.value === values.month);
                            if (!monthExists) {
                              setFieldValue("month", "");
                              setFieldValue("day", "");
                            } else if (values.day) {
                              const filteredDays = getFilteredDays();
                              const dayExists = filteredDays.some(day => day.value === values.day);
                              if (!dayExists) {
                                setFieldValue("day", "");
                              }
                            }
                          }
                        }}
                        onBlur={handleBlur}
                      >
                        <option hidden>Year</option>
                        {years.map((year) => (
                          <option key={year.value} value={year.value}>
                            {year.label}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                  {errors.dateOfBirth && (touched.dateOfBirth || submitCount > 0) ? (
                    <span className="errorMessage">{errors.dateOfBirth}</span>
                  ) : null}

                </div>
              </div>

              {/* Row 2: Mobile Number and Date of Birth */}
              <div className="row">
                <div className="col-md-6">
                  {/* Phone with fixed Australia country code */}
                  <div>
                    <label className="form-label">Mobile Number</label>
                    <div className="d-flex align-items-start gap-2">
                      <div
                        className="input-group-text"
                        style={{
                          minWidth: 70,
                          display: "inline-flex",
                          alignItems: "center",
                          justifyContent: "center",
                          padding: "10px 12px",
                          fontSize: 14,
                          lineHeight: 1.2,
                        }}
                      >
                        +61
                      </div>
                      <MoverInput
                        name="phone"
                        isFloating={false}
                        id="phone"
                        placeholder="Mobile Number"
                        value={values.phone}
                        type="tel"
                        onChange={(e: any) => {
                          // Allow only digits in local part
                          const onlyDigits = (e.target.value || "").toString().replace(/\D/g, "");
                          // Cap to 9 digits for AU mobiles
                          setFieldValue("phone", onlyDigits.slice(0, 9));
                        }}
                        onBlur={handleBlur}
                        error={touched["phone"] && (errors as any)?.["phone"]}
                      />
                    </div>
                  </div>

                </div>
                <div className="col-md-6">
                  <div className="d-flex flex-column mb-0">
                    <label className="form-label">Email Address</label>
                    {colMoverInput("email", "Email Address", "email")}
                  </div>
                </div>
              </div>

              {/* GST Registered and ABN in a single row (both required) */}
              <div className="row">
                <div className="col-md-6 mt-2">
                  <label className="form-label">Australian Business Number</label>
                  <MoverInput
                    className="mb-0"
                    name="business.abn"
                    isFloating={false}
                    id="business.abn"
                    placeholder="Enter ABN"
                    value={values.business?.abn || ""}
                    type="text"
                    onChange={(e: any) => {
                      const digitsOnly = (e?.target?.value || "").toString().replace(/[^\d]/g, "");
                      // Limit to 11 digits
                      const limitedDigits = digitsOnly.slice(0, 11);
                      setFieldValue("business.abn", limitedDigits);
                    }}
                    onBlur={handleBlur}
                    error={((touched as any)?.business?.abn || submitCount > 0) ? (errors as any)?.business?.abn : undefined}
                  />
                  <div className="mb-2">
                    <a
                      href="https://abr.business.gov.au"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="terms-link"
                      style={{ fontSize: 14, padding: 0, margin: 0, display: "inline" }}
                    >
                      Lookup my ABN
                    </a>
                  </div>
                </div>
                <div className="col-md-6 mt-2">
                  <div className="tabRadioWraper">
                    <label className="form-label">GST Registered </label>
                    <div className="d-flex gap-4">
                      <MoverInput
                        label="Yes"
                        name="business.isGstRegistered"
                        type="radio"
                        value={"true"}
                        className="d-flex gap-2"
                        checked={values.business?.isGstRegistered === true}
                        onChange={() => setFieldValue("business.isGstRegistered", true)}
                      />
                      <MoverInput
                        label="No"
                        name="business.isGstRegistered"
                        type="radio"
                        value={"false"}
                        className="d-flex gap-2"
                        checked={values.business?.isGstRegistered === false}
                        onChange={() => setFieldValue("business.isGstRegistered", false)}
                      />
                    </div>
                    {(submitCount > 0 || (touched as any)?.business?.isGstRegistered) && (errors as any)?.business?.isGstRegistered ? (
                      <span className="errorMessage">{(errors as any)?.business?.isGstRegistered}</span>
                    ) : null}
                  </div>
                </div>
              </div>


              {/* Row 3: Password and Confirm Password */}
              <div className="row">
                <div className="col-md-6">
                  {colMoverInput("password", "Password", "password")}
                </div>
                <div className="col-md-6">
                  {colMoverInput("confirmPassword", "Confirm Password", "password")}
                </div>
              </div>
              {/* Vehicle & Terms */}
              <div className="mt-2">
                <VehicleSelect
                  placeholder="Choose Vehicle"
                  label="Vehicle You’ll Use"
                  id="vehicleType"
                  name="vehicleType"
                  value={values.vehicleType}
                  option={selectVehicleOptions}
                  onChange={(value: string) => {
                    const syntheticEvent = { target: { name: "vehicleType", value } } as any;
                    handleChange(syntheticEvent);
                    markTouchedLocal("vehicleType");
                  }}
                  error={(fieldTouchedLocal.vehicleType || submitCount > 0) && (errors as any)?.vehicleType}
                />
                <div className="workcheckBox">
                  <MoverInput
                    name="agreeToTerms"
                    type="checkbox"
                    checked={values.agreeToTerms}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className=""
                  />
                  <label htmlFor="agreeToTerms" className="terms-label">
                    By continuing, you agree to our{" "}
                    <a href="/movers-term" target="_blank" rel="noopener noreferrer" className="terms-link">
                      Movers Terms and Conditions
                    </a>{" "}
                    and{" "}
                    <a href="/privacy-policy" target="_blank" rel="noopener noreferrer" className="terms-link">
                      Privacy Policy
                    </a>{" "}
                    and consent to receive emails & SMS Communication.
                  </label>

                </div>
                {touched.agreeToTerms && errors.agreeToTerms ? (
                  <span className="errorMessage">{errors.agreeToTerms}</span>
                ) : null}
                {/* reCAPTCHA moved to modal popup on Next Step */}
                <div className="footerBtn d-flex justify-content-end">
                  <IconButton
                    onClick={() => {
                      if (!values.recaptcha) {
                        setShowCaptchaModal(true);
                        return;
                      }
                      handleSubmit();
                    }}
                    disabled={isSubmitting || !canProceed}
                    title={isSubmitting ? "Processing..." : "Submit"}
                    icon={isSubmitting ? <LoadingSpinner /> : <FaArrowAltCircleRight />}
                  />
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
      {/* Keep the modal for other flows like DOB popup; success popup removed */}
      <CustomModal
        title={dobModal ? "Notice" : "Info"}
        close={() => handelCloseModal()}
        show={isPopup || dobModal}
        showFooter={false}
        cancelText="Cancel"
        showSaveButton="Confirm"
        mainClassName="thankYouWrapper"
      >
        <div className={`d-flex flex-column thankingApplication`}>
          <div className="whichVehicalUse">
            {dobModal ? (
              <p>
                “You might not be eligible to join as yet- because of Full Driver’s License Requirement”
              </p>
            ) : (
              <>
                <h2 className="text-left">Good News:-</h2>
                <ul>
                  <li>
                    {values.vehicleType === "Small Box Truck"
                      ? "Small Trucks- Also get Van Jobs."
                      : values.vehicleType === "Large Box Truck"
                        ? "Large Trucks- Also get Medium Truck Jobs."
                        : "Medium Trucks- also get Small Truck & Van Jobs."}
                  </li>
                  <li>
                    Our team of other movers and helpers will help you when
                    extra Movers or Trucks required.
                  </li>
                </ul>
              </>
            )}
          </div>

          <div className="d-flex justify-content-center">
            <Button
              variant="primary"
              className="signupButton"
              onClick={() => handelCloseModal()}
            >
              Ok
            </Button>
          </div>
        </div>
      </CustomModal>

      {/* Captcha lightweight popup (no modal chrome) */}
      {showCaptchaModal && (
        <div className="captchaOverlay" role="dialog" aria-modal="true">
          <div className="captchaBox">
            <ReCaptcha
              onVerify={(token) => {
                setFieldValue("recaptcha", token || "");
                setShowCaptchaModal(false);
                handleSubmit();
              }}
              onExpire={() => setFieldValue("recaptcha", "")}
              onError={() => setFieldValue("recaptcha", "")}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default WorkDetails;
