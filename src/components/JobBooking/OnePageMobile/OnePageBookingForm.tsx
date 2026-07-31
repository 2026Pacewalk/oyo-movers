"use client";

import React, { useEffect, useMemo, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import moment from "moment";
import {
  FaEnvelope,
  FaPhone,
  FaUser,
  FaBuilding,
  FaCalendarDays,
  FaTruck,
  FaArrowRight,
  FaClipboardList,
  FaHouse,
  FaBriefcase,
} from "react-icons/fa6";
import { getCustomerZone, outOfAreaMessage } from "@/components/JobBooking/Location";
import { getServiceArea } from "@/lib/serverAction/authAction";
import { phoneNumberRegex } from "@/helper";
import { shouldBypassRecaptchaValidation } from "@/utils/recaptchaSiteKey";
import { makeId } from "@/helper";
import { useJobBookingStore } from "@/components/JobBooking/jobBookingStore";
import { useShallow } from "zustand/react/shallow";
import ReCaptcha from "@/components/ReCaptcha";
import { dateFormat } from "@/components/JobBooking/DateForPikup";
import OpfAddressBlock from "./OpfAddressBlock";
import OpfCollapsible from "./OpfCollapsible";
import OpfCalendar from "./OpfCalendar";
import OpfSlotRow from "./OpfSlotRow";
import OpfVehicleRow from "./OpfVehicleRow";
import OpfServiceRow from "./OpfServiceRow";
import OpfOptionRow from "./OpfOptionRow";
import OpfTextField from "./OpfTextField";
import TruckLoader from "@/components/TruckLoader";
import { formatOpfVehicleLabel } from "./formatOpfVehicleLabel";
import {
  HOUSE_DEFAULT_FURNISHING,
  getServiceInquiryOptions,
  isHouseMovingService,
  isOfficeRelocationService,
} from "./opfServiceTypes";
import {
  buildPublicQuotationPayload,
  resolvePickupTimesForSlot,
} from "./buildQuotationPayload";
import {
  getQuotationId,
  resolveQuotationIdForUpdate,
  secureQuotationWithDeposit,
} from "@/utils/secureQuotation";
import { errorToast } from "@/lib/toaster";
import "./one-page-mobile.scss";

const parseApiDate = (apiDateString: string): string => {
  if (!apiDateString) return "";
  const parsed = moment(apiDateString, "ddd MMM DD YYYY");
  return parsed.isValid() ? parsed.format(dateFormat) : "";
};

type OnePageBookingFormProps = {
  onContinue: () => void;
};

const cloneAddressBlock = (item: any, fallbackId: string) => ({
  id: item?.id || fallbackId,
  address: { ...(item?.address || {}) },
  level: item?.level || "ground",
  flightOfStairs: item?.flightOfStairs || "0",
  additionalInformation: item?.additionalInformation || "",
});

const OnePageBookingForm: React.FC<OnePageBookingFormProps> = ({ onContinue }) => {
  const [areaZone, setAreaZone] = useState<any[]>([]);
  const [serviceOpen, setServiceOpen] = useState(false);
  const [roomOpen, setRoomOpen] = useState(false);
  const [officeSizeOpen, setOfficeSizeOpen] = useState(false);
  const [dateOpen, setDateOpen] = useState(false);
  const [slotOpen, setSlotOpen] = useState(false);
  const [vehicleOpen, setVehicleOpen] = useState(false);

  const {
    timeslots,
    availableRequirements,
    services,
    setPickUpLocation,
    setDropOffLocation,
    setStopOvers,
    setPickUpDate,
    setPickUpSlot,
    setPickupStartTime,
    setPickupEndTime,
    setVehicleType,
    setCallOutFee,
    setDismantlingAndAssembly,
    setPackingAndUnpacking,
    setNoteForMover,
    setMoverService,
    setMoverData,
    setSpaceInProperty,
    setHowFurnished,
    setJobBooking,
    quotation,
    setQuotation,
    couponDetails,
    moverServices,
    jobBooking,
  } = useJobBookingStore(
    useShallow((s) => ({
      timeslots: s.timeslots,
      availableRequirements: s.availableRequirements,
      services: s.services,
      setPickUpLocation: s.setPickUpLocation,
      setDropOffLocation: s.setDropOffLocation,
      setStopOvers: s.setStopOvers,
      setPickUpDate: s.setPickUpDate,
      setPickUpSlot: s.setPickUpSlot,
      setPickupStartTime: s.setPickupStartTime,
      setPickupEndTime: s.setPickupEndTime,
      setVehicleType: s.setVehicleType,
      setCallOutFee: s.setCallOutFee,
      setDismantlingAndAssembly: s.setDismantlingAndAssembly,
      setPackingAndUnpacking: s.setPackingAndUnpacking,
      setNoteForMover: s.setNoteForMover,
      setMoverService: s.setMoverService,
      setMoverData: s.setMoverData,
      setSpaceInProperty: s.setSpaceInProperty,
      setHowFurnished: s.setHowFurnished,
      setJobBooking: s.setJobBooking,
      quotation: s.quotation,
      setQuotation: s.setQuotation,
      couponDetails: s.couponDetails,
      moverServices: s.moverServices,
      jobBooking: s.jobBooking,
    }))
  );

  useEffect(() => {
    getServiceArea().then((zones: any) => {
      setAreaZone(zones?.data?.serviceAreas || []);
    });
  }, []);

  const validationSchema = useMemo(
    () =>
      Yup.object().shape({
        name: Yup.string().required("Full name is required"),
        phoneNumber: Yup.string()
          .required("Phone Number is required")
          .max(10, "Mobile number cannot be more than 10 digits")
          .matches(phoneNumberRegex, "Phone number is invalid"),
        email: Yup.string().email("Email is invalid").required("Email is required"),
        moverService: Yup.string().required("Service type is required"),
        spaceInProperty: Yup.string().test(
          "spaceInProperty",
          "Please select an option",
          function (value) {
            const svc = (Array.isArray(services) ? services : []).find(
              (s: any) => s._id === this.parent.moverService
            );
            if (!svc) return true;
            if (isHouseMovingService(svc.name) || isOfficeRelocationService(svc.name)) {
              return Boolean(value);
            }
            return true;
          }
        ),
        howFurnished: Yup.string(),
        pickUpDate: Yup.string().required("Date is required"),
        pickUpSlot: Yup.string().required("Time slot is required"),
        vehicleType: Yup.string().required("Vehicle is required"),
        recaptcha: Yup.string().test(
          "recaptcha",
          "Please complete the captcha",
          (value) => shouldBypassRecaptchaValidation() || Boolean(value)
        ),
        addresses: Yup.array().of(
          Yup.object().shape({
            address: Yup.object().shape({
              locality: Yup.string().required("City"),
              administrative_area_level_1: Yup.string().required("State"),
              country: Yup.string().required("Country"),
              latitude: Yup.string().test("latitude", outOfAreaMessage, function (_value, data: any) {
                const currentIndex = data?.options?.index;
                const lat = data?.options?.context?.addresses[currentIndex]?.address?.latitude;
                const lng = data?.options?.context?.addresses[currentIndex]?.address?.longitude;
                if (!lat || !lng) return true;
                return new Promise((resolve) => {
                  getCustomerZone({ lat: Number(lat), lng: Number(lng) }, areaZone)
                    .then((res) => resolve(!res))
                    .catch(() => resolve(false));
                });
              }),
            }),
            level: Yup.string().required(),
          })
        ),
      }),
    [areaZone, services]
  );

  const formik = useFormik({
    initialValues: {
      name: jobBooking?.user?.firstname || "",
      company: jobBooking?.user?.companyName || "",
      phoneNumber: jobBooking?.user?.phone || "",
      email: jobBooking?.user?.email || "",
      moverService: jobBooking?.moverService || "",
      spaceInProperty: jobBooking?.spaceInProperty || "",
      howFurnished: jobBooking?.howFurnished || "",
      addresses: [
        cloneAddressBlock(jobBooking?.pickUpLocation, "Pickup"),
        ...(jobBooking?.stopOvers || []).map((stop: any, index: number) =>
          cloneAddressBlock(stop, `stop-${index + 1}`)
        ),
        cloneAddressBlock(jobBooking?.dropOffLocation, "dropOff"),
      ],
      pickUpDate: jobBooking?.pickUpDate || "",
      pickUpSlot: jobBooking?.pickUpSlot || "",
      vehicleType: jobBooking?.vehicleType || "",
      notes: jobBooking?.noteForMover || "",
      dismantlingAndAssembly: jobBooking?.dismantlingAndAssembly ?? true,
      packingAndUnpacking: jobBooking?.packingAndUnpacking ?? false,
      recaptcha: "",
    },
    validationSchema,
    validateOnMount: true,
    validateOnChange: true,
    validateOnBlur: true,
    onSubmit: async (values) => {
      const addresses = values.addresses;
      const pickup = addresses[0];
      const dropoff = addresses[addresses.length - 1];
      const stops = addresses.slice(1, -1);

      const vehicle = availableRequirements?.find((v: any) => v._id === values.vehicleType);
      if (vehicle) setCallOutFee(vehicle.baseDeposit || 0);

      const selectedService = (Array.isArray(services) ? services : []).find(
        (s: any) => s._id === values.moverService
      );
      const isHouseService = isHouseMovingService(selectedService?.name);
      const howFurnishedValue = isHouseService
        ? HOUSE_DEFAULT_FURNISHING
        : values.howFurnished;
      const spaceInPropertyValue = values.spaceInProperty;

      const apiToday = timeslots?.today?.date ? parseApiDate(timeslots.today.date) : moment().format(dateFormat);
      const apiTomorrow = timeslots?.tomorrow?.date
        ? parseApiDate(timeslots.tomorrow.date)
        : moment().add(1, "day").format(dateFormat);

      let slotList: any[] = [];
      if (values.pickUpDate === apiToday) {
        slotList = timeslots?.today?.slots || [];
      } else if (values.pickUpDate === apiTomorrow) {
        slotList = (timeslots?.tomorrow?.slots || []).filter((s: any) => s?.name !== "ASAP");
      } else {
        slotList = timeslots?.custom?.slots || [];
      }
      const selectedSlot = slotList.find((s: any) => s._id === values.pickUpSlot);
      const { pickupStartTime, pickupEndTime } = resolvePickupTimesForSlot(selectedSlot);

      const updatedBooking = {
        ...jobBooking,
        pickUpLocation: pickup,
        dropOffLocation: dropoff,
        stopOvers: stops,
        pickUpDate: values.pickUpDate,
        pickUpSlot: values.pickUpSlot,
        pickupStartTime,
        pickupEndTime,
        vehicleType: values.vehicleType,
        moverService: values.moverService,
        serviceType: selectedService?.name || moverServices || "",
        dismantlingAndAssembly: values.dismantlingAndAssembly,
        packingAndUnpacking: values.packingAndUnpacking,
        noteForMover: values.notes,
        spaceInProperty: spaceInPropertyValue,
        howFurnished: howFurnishedValue,
        recaptchaToken: values.recaptcha,
        user: {
          firstname: values.name,
          email: values.email,
          phone: values.phoneNumber,
          companyName: values.company,
        },
      };

      setJobBooking(updatedBooking);

      const payload = buildPublicQuotationPayload(
        updatedBooking,
        services,
        availableRequirements,
        moverServices,
        couponDetails,
        timeslots
      );

      const quotationId = resolveQuotationIdForUpdate(quotation, getQuotationId(quotation));
      const method = quotationId ? "PUT" : "POST";
      const endpoint = quotationId
        ? `public/quotations/${quotationId}`
        : "public/quotations";

      console.log(`[OnePageForm] ${method} request`, { endpoint, quotationId, payload });

      const result = await secureQuotationWithDeposit({
        payload,
        existingQuotationInStore: quotation,
        quotationId: getQuotationId(quotation),
        createEndpoint: "public/quotations",
        mode: "public",
        publicContact: {
          email: values.email.trim(),
          phone: values.phoneNumber.trim(),
        },
      });

      console.log(`[OnePageForm] ${method} response`, { endpoint, quotationId, result });

      if (result.success) {
        if (result.quotation) setQuotation(result.quotation);
        onContinue();
        return;
      }

      errorToast(result.error || "Failed to save booking details. Please try again.");
    },
  });

  const { values, errors, touched, handleChange, handleBlur, handleSubmit, setFieldValue, setFieldTouched, isSubmitting, isValid } =
    formik;

  const addStop = () => {
    const next = [...values.addresses];
    next.splice(next.length - 1, 0, {
      id: makeId(),
      address: {},
      level: "ground",
      flightOfStairs: "0",
      additionalInformation: "",
    });
    setFieldValue("addresses", next);
  };

  const removeStop = (index: number) => {
    if (index <= 0 || index >= values.addresses.length - 1) return;
    const next = [...values.addresses];
    next.splice(index, 1);
    setFieldValue("addresses", next);
  };

  const selectedDate = values.pickUpDate
    ? moment(values.pickUpDate, dateFormat).isValid()
      ? moment(values.pickUpDate, dateFormat).toDate()
      : null
    : null;

  const apiToday = timeslots?.today?.date ? parseApiDate(timeslots.today.date) : moment().format(dateFormat);
  const apiTomorrow = timeslots?.tomorrow?.date
    ? parseApiDate(timeslots.tomorrow.date)
    : moment().add(1, "day").format(dateFormat);

  const getSlotsForDate = () => {
    if (values.pickUpDate === apiToday) {
      const list = timeslots?.today?.slots || [];
      return [...list].sort((a: any, b: any) => {
        if (a?.name === "ASAP") return -1;
        if (b?.name === "ASAP") return 1;
        return 0;
      });
    }
    if (values.pickUpDate === apiTomorrow) {
      return (timeslots?.tomorrow?.slots || []).filter((s: any) => s?.name !== "ASAP");
    }
    return timeslots?.custom?.slots || [];
  };

  const slots = getSlotsForDate();
  const selectedSlot = slots.find((s: any) => s._id === values.pickUpSlot);
  const selectedVehicle = availableRequirements?.find((v: any) => v._id === values.vehicleType);
  const selectedService = (Array.isArray(services) ? services : []).find(
    (s: any) => s._id === values.moverService
  );

  const showHouseFields = isHouseMovingService(selectedService?.name);
  const showOfficeFields = isOfficeRelocationService(selectedService?.name);
  const roomOptions =
    showHouseFields || showOfficeFields ? getServiceInquiryOptions(selectedService) : [];

  useEffect(() => {
    if (showHouseFields) {
      setFieldValue("howFurnished", HOUSE_DEFAULT_FURNISHING);
      setHowFurnished(HOUSE_DEFAULT_FURNISHING);
    }
  }, [showHouseFields, values.moverService, setFieldValue, setHowFurnished]);

  const handleServiceSelect = (service: any) => {
    setFieldValue("moverService", service._id);
    setMoverService(service._id);
    setMoverData(service.name);
    setServiceOpen(false);
    setRoomOpen(false);
    setOfficeSizeOpen(false);

    if (isHouseMovingService(service.name)) {
      setFieldValue("spaceInProperty", "");
      setSpaceInProperty("");
      setFieldValue("howFurnished", HOUSE_DEFAULT_FURNISHING);
      setHowFurnished(HOUSE_DEFAULT_FURNISHING);
    } else if (isOfficeRelocationService(service.name)) {
      setFieldValue("spaceInProperty", "");
      setSpaceInProperty("");
      setFieldValue("howFurnished", "");
      setHowFurnished("");
    } else {
      setFieldValue("spaceInProperty", "");
      setFieldValue("howFurnished", "");
      setSpaceInProperty("");
      setHowFurnished("");
    }
  };

  const handleRoomSelect = (room: string) => {
    setFieldValue("spaceInProperty", room);
    setSpaceInProperty(room);
    setRoomOpen(false);
  };

  const handleOfficeSizeSelect = (size: string) => {
    setFieldValue("spaceInProperty", size);
    setSpaceInProperty(size);
    setOfficeSizeOpen(false);
  };

  const handleDateSelect = (date: Date) => {
    const formatted = moment(date).format(dateFormat);
    setFieldValue("pickUpDate", formatted);
    setFieldValue("pickUpSlot", "");
    setPickUpDate(formatted);
    setDateOpen(false);
    setSlotOpen(false);
  };

  const handleSlotSelect = (slot: any) => {
    setFieldValue("pickUpSlot", slot._id);
    setPickUpSlot(slot._id);
    if (slot.name !== "ASAP") {
      setPickupStartTime(slot.startTime || "");
      setPickupEndTime(slot.endTime || "");
    } else {
      setPickupStartTime("");
      setPickupEndTime("");
    }
    setSlotOpen(false);
  };

  const handleVehicleSelect = (vehicle: any) => {
    setFieldValue("vehicleType", vehicle._id);
    setVehicleType(vehicle._id);
    setCallOutFee(vehicle.baseDeposit || 0);
    setVehicleOpen(false);
  };

  const selectActiveAsapSlot = () => {
    const asapSlot = (timeslots?.today?.slots || []).find(
      (s: any) => s?.name === "ASAP" && s?.active
    );
    if (!asapSlot) return;
    setFieldValue("pickUpSlot", asapSlot._id);
    setPickUpSlot(asapSlot._id);
    setPickupStartTime("");
    setPickupEndTime("");
  };

  const selectToday = () => {
    setFieldValue("pickUpDate", apiToday);
    setPickUpDate(apiToday);
    setFieldValue("pickUpSlot", "");
    selectActiveAsapSlot();
    setDateOpen(false);
    setSlotOpen(false);
  };

  const selectTomorrow = () => {
    setFieldValue("pickUpDate", apiTomorrow);
    setPickUpDate(apiTomorrow);
    setFieldValue("pickUpSlot", "");
    setDateOpen(false);
    setSlotOpen(false);
  };

  useEffect(() => {
    if (values.pickUpDate === apiToday && !values.pickUpSlot) {
      const asapSlot = (timeslots?.today?.slots || []).find(
        (s: any) => s?.name === "ASAP" && s?.active
      );
      if (!asapSlot) return;
      setFieldValue("pickUpSlot", asapSlot._id);
      setPickUpSlot(asapSlot._id);
      setPickupStartTime("");
      setPickupEndTime("");
    }
  }, [values.pickUpDate, values.pickUpSlot, apiToday, timeslots, setFieldValue, setPickUpSlot, setPickupStartTime, setPickupEndTime]);

  const serviceHeadLabel = selectedService?.name || "Select Service Type";
  const roomHeadLabel = values.spaceInProperty || "How many rooms?";
  const officeSizeHeadLabel = values.spaceInProperty || "Select Office";

  const dateHeadLabel = values.pickUpDate
    ? moment(values.pickUpDate, dateFormat).format("DD MMM (ddd)")
    : "Date & Time";

  const slotHeadLabel = selectedSlot
    ? selectedSlot.name === "ASAP"
      ? "ASAP"
      : selectedSlot.name
    : "Arrival TimeSlot";

  const selectedVehicleLabel = selectedVehicle ? formatOpfVehicleLabel(selectedVehicle) : null;
  const vehicleHeadLabel = selectedVehicleLabel ? (
    <>
      <span>{selectedVehicleLabel.title}</span>
      {selectedVehicleLabel.men ? <span className="opf-men-badge">{selectedVehicleLabel.men}</span> : null}
    </>
  ) : (
    "Select Vehicle"
  );

  const calendarMinDate = useMemo(
    () => moment(apiToday, dateFormat).startOf("day").toDate(),
    [apiToday]
  );

  return (
    <>
      {isSubmitting && <TruckLoader />}
      <form className="opf-booking" onSubmit={handleSubmit}>
      <div className="opf-inner">
        <h1 className="opf-title">Quick Booking Form</h1>
        <p className="opf-subtitle">Please send following details :-</p>

        <OpfTextField
          name="name"
          placeholder="Full Name"
          icon={<FaUser />}
          value={values.name}
          onChange={handleChange}
          onBlur={handleBlur}
          touched={!!touched.name}
          error={errors.name as string}
        />
        <OpfTextField
          name="company"
          placeholder="Company (Optional)"
          icon={<FaBuilding />}
          value={values.company}
          onChange={handleChange}
          onBlur={handleBlur}
        />
        <OpfTextField
          name="phoneNumber"
          placeholder="Mobile"
          icon={<FaPhone />}
          type="tel"
          value={values.phoneNumber}
          onChange={(e) => {
            const limitedValue = e.target.value.toString().slice(0, 10);
            setFieldValue("phoneNumber", limitedValue);
          }}
          onBlur={handleBlur}
          touched={!!touched.phoneNumber}
          error={errors.phoneNumber as string}
        />
        <OpfTextField
          name="email"
          placeholder="Your Email"
          icon={<FaEnvelope />}
          type="email"
          value={values.email}
          onChange={handleChange}
          onBlur={handleBlur}
          touched={!!touched.email}
          error={errors.email as string}
        />

        <OpfCollapsible
          icon={<FaClipboardList className="opf-icon-vehicle" />}
          label={serviceHeadLabel}
          isPlaceholder={!values.moverService}
          open={serviceOpen}
          onToggle={() => setServiceOpen((o) => !o)}
          error={touched.moverService && errors.moverService ? (errors.moverService as string) : undefined}
        >
          <div className="opf-vehicle-list">
            {Array.isArray(services) &&
              services.map((service: any) => (
                <OpfServiceRow
                  key={service._id}
                  service={service}
                  selected={values.moverService === service._id}
                  onSelect={() => handleServiceSelect(service)}
                />
              ))}
          </div>
        </OpfCollapsible>

        {showHouseFields && (
          <OpfCollapsible
            icon={<FaHouse className="opf-icon-vehicle" />}
            label={roomHeadLabel}
            isPlaceholder={!values.spaceInProperty}
            open={roomOpen}
            onToggle={() => setRoomOpen((o) => !o)}
            error={
              touched.spaceInProperty && errors.spaceInProperty
                ? (errors.spaceInProperty as string)
                : undefined
            }
          >
            <div className="opf-vehicle-list">
              {roomOptions.map((opt) => (
                <OpfOptionRow
                  key={opt.id}
                  label={opt.name}
                  selected={values.spaceInProperty === opt.name}
                  onSelect={() => handleRoomSelect(opt.name)}
                />
              ))}
            </div>
          </OpfCollapsible>
        )}

        {showOfficeFields && (
          <OpfCollapsible
            icon={<FaBriefcase className="opf-icon-vehicle" />}
            label={officeSizeHeadLabel}
            isPlaceholder={!values.spaceInProperty}
            open={officeSizeOpen}
            onToggle={() => setOfficeSizeOpen((o) => !o)}
            error={
              touched.spaceInProperty && errors.spaceInProperty
                ? (errors.spaceInProperty as string)
                : undefined
            }
          >
            <div className="opf-vehicle-list">
              {roomOptions.map((opt) => (
                <OpfOptionRow
                  key={opt.id}
                  label={opt.name}
                  selected={values.spaceInProperty === opt.name}
                  onSelect={() => handleOfficeSizeSelect(opt.name)}
                />
              ))}
            </div>
          </OpfCollapsible>
        )}

        <OpfAddressBlock
          key={`pickup-${values.addresses[0]?.id || "Pickup"}-0`}
          index={0}
          placeholder="Pickup Address"
          markerClass="pickup"
          values={values}
          errors={errors}
          touched={touched}
          setFieldValue={setFieldValue}
          setFieldTouched={setFieldTouched}
        />

        {values.addresses.slice(1, -1).map((_: any, i: number) => {
          const idx = i + 1;
          return (
            <OpfAddressBlock
              key={values.addresses[idx]?.id || idx}
              index={idx}
              placeholder={`Stop-${i + 1}`}
              markerClass="stop"
              values={values}
              errors={errors}
              touched={touched}
              setFieldValue={setFieldValue}
              setFieldTouched={setFieldTouched}
              onRemove={() => removeStop(idx)}
            />
          );
        })}

        <OpfAddressBlock
          key={`drop-${values.addresses[values.addresses.length - 1]?.id || "dropOff"}-${values.addresses.length - 1}`}
          index={values.addresses.length - 1}
          placeholder="Drop-Off Address"
          markerClass="dropoff"
          values={values}
          errors={errors}
          touched={touched}
          setFieldValue={setFieldValue}
          setFieldTouched={setFieldTouched}
        />

        <button type="button" className="opf-add-stop" onClick={addStop}>
          + Add Stop
        </button>

        <OpfCollapsible
          icon={<FaCalendarDays />}
          label={dateHeadLabel}
          isPlaceholder={!values.pickUpDate}
          open={dateOpen}
          onToggle={() => setDateOpen((o) => !o)}
          error={touched.pickUpDate && errors.pickUpDate ? (errors.pickUpDate as string) : undefined}
        >
          <div className="opf-quick-dates">
            <button
              type="button"
              className={`opf-quick-date ${values.pickUpDate === apiToday ? "active" : ""}`}
              onClick={selectToday}
            >
              Today
            </button>
            <button
              type="button"
              className={`opf-quick-date ${values.pickUpDate === apiTomorrow ? "active" : ""}`}
              onClick={selectTomorrow}
            >
              Tomorrow
            </button>
          </div>
          <OpfCalendar
            value={selectedDate}
            onChange={handleDateSelect}
            minDate={calendarMinDate}
          />
        </OpfCollapsible>

        {values.pickUpDate && (
          <OpfCollapsible
            icon={<FaCalendarDays />}
            label={slotHeadLabel}
            isPlaceholder={!values.pickUpSlot}
            open={slotOpen}
            onToggle={() => setSlotOpen((o) => !o)}
            error={touched.pickUpSlot && errors.pickUpSlot ? (errors.pickUpSlot as string) : undefined}
          >
            {slots.map((slot: any) => (
              <OpfSlotRow
                key={slot._id}
                slot={slot}
                selected={values.pickUpSlot === slot._id}
                disabled={!slot.active}
                onSelect={() => handleSlotSelect(slot)}
              />
            ))}
          </OpfCollapsible>
        )}

        <OpfCollapsible
          icon={<FaTruck className="opf-icon-vehicle" />}
          label={vehicleHeadLabel}
          isPlaceholder={!values.vehicleType}
          open={vehicleOpen}
          onToggle={() => setVehicleOpen((o) => !o)}
          error={touched.vehicleType && errors.vehicleType ? (errors.vehicleType as string) : undefined}
        >
          <div className="opf-vehicle-list">
            {Array.isArray(availableRequirements) &&
              availableRequirements
                .filter((r: any) => !r?.availableOnlyForAdmin)
                .map((vehicle: any) => (
                  <OpfVehicleRow
                    key={vehicle._id}
                    vehicle={vehicle}
                    selected={values.vehicleType === vehicle._id}
                    onSelect={() => handleVehicleSelect(vehicle)}
                  />
                ))}
          </div>
        </OpfCollapsible>

        <div className="opf-field">
          <div className={`opf-field__control ${values.notes?.trim() ? "has-value" : ""}`}>
            <span className="opf-field__icon">
              <img src="/notes.svg" alt="" width={13} height={15.36} />
            </span>
            <input
              className="opf-field__input"
              id="notes"
              name="notes"
              placeholder=" "
              value={values.notes}
              onChange={handleChange}
            />
            <label className="opf-field__label" htmlFor="notes">
              Add Notes or Imp Instructions
            </label>
          </div>
        </div>

        <div className="opf-checkbox-row">
          <label htmlFor="dismantling" className="opf-checkbox-row__control">
            <input
              type="checkbox"
              id="dismantling"
              name="dismantlingAndAssembly"
              checked={values.dismantlingAndAssembly}
              onChange={handleChange}
            />
            <span className="opf-checkbox-title">
              <span className="opf-checkbox-title__text">Need furniture assembly or disassembly?</span>
              <span className="opf-checkbox-icon opf-checkbox-icon--furniture" aria-hidden>
                <img src="/🛠️.png" alt="" width={14} height={14} />
              </span>
            </span>
          </label>
          <div className="opf-checkbox-hint">
            No additional fees, just adds to moving time. Change your mind anytime.
          </div>
        </div>

        <div className="opf-checkbox-row">
          <label htmlFor="packing" className="opf-checkbox-row__control">
            <input
              type="checkbox"
              id="packing"
              name="packingAndUnpacking"
              checked={values.packingAndUnpacking}
              onChange={handleChange}
            />
            <span className="opf-checkbox-title">
              <span className="opf-checkbox-title__text">Packing Service required?</span>
              <span className="opf-checkbox-icon opf-checkbox-icon--packing" aria-hidden>
                <img src="/logistics-delivery%201%20(1).png" alt="" width={20} height={20} />
              </span>
            </span>
          </label>
          <div className="opf-checkbox-hint">No additional fees, just adds to moving time.</div>
        </div>

        <div className="opf-recaptcha">
          <ReCaptcha
            onVerify={(token) => setFieldValue("recaptcha", token || "")}
            onExpire={() => setFieldValue("recaptcha", "")}
            onError={() => setFieldValue("recaptcha", "")}
            touched={touched.recaptcha}
            error={errors.recaptcha as string}
          />
        </div>

        <button
          type="submit"
          className={`opf-continue-btn ${isValid ? "opf-continue-btn--ready" : "opf-continue-btn--faded"}`}
          disabled={!isValid || isSubmitting}
        >
          Continue <FaArrowRight />
        </button>
      </div>
    </form>
    </>
  );
};

export default OnePageBookingForm;
