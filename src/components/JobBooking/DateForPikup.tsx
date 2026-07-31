"use client";

import React, { FC, useEffect, useState, useRef } from "react";
import Button from "../Button";
import moment from "moment";
import { LuClock7 } from "react-icons/lu";
import { FaCircleExclamation } from "react-icons/fa6";
import { useJobBooking } from "./JobBookingHook";
import Image from "../Image";
import useCreateDraft from "@/utils/hooks/useCreateDraft";
import CustomDatePicker from "../CustomDatePicker";
import ContinueButton from "./ContinueButton";

export const dateFormat = "MM-DD-YYYY";

const today = new Date();
const tomorrow = moment().add(1, "days").toDate();

// Removed checkSlotSelectable function - now using only API active property

// Helper function to parse API date format "Fri Nov 14 2025" to a comparable format
const parseApiDate = (apiDateString: string): string => {
  if (!apiDateString) return "";
  // Parse "Fri Nov 14 2025" format and convert to MM-DD-YYYY
  const parsed = moment(apiDateString, "ddd MMM DD YYYY");
  return parsed.isValid() ? parsed.format(dateFormat) : "";
};

// Check if selected date matches "today" from API (using API date to prevent timezone conflicts)
const checkIsToday = (selectedDate: any, timeslots?: any) => {
  if (!timeslots?.today?.date) {
    // Fallback to local date if API date not available
    const currentDay = moment(new Date()).format(dateFormat);
    return selectedDate === currentDay;
  }
  const apiTodayDate = parseApiDate(timeslots.today.date);
  return selectedDate === apiTodayDate;
};

// Check if selected date matches "tomorrow" from API (using API date to prevent timezone conflicts)
const checkIsTommarow = (selectedDate: any, timeslots?: any) => {
  if (!timeslots?.tomorrow?.date) {
    // Fallback to local date if API date not available
    const tomorrow = moment().add(1, "days").startOf("day");
    return moment(selectedDate, dateFormat).isSame(tomorrow, "day");
  }
  const apiTomorrowDate = parseApiDate(timeslots.tomorrow.date);
  return selectedDate === apiTomorrowDate;
};

const DateForPikup: FC<any> = ({ timeslots }) => {
  const {
    setPickUpDate,
    setPickUpSlot,
    nextStep,
    jobBooking: { pickUpDate, spaceInProperty, howFurnished },
  } = useJobBooking();

  const { updateDrafQuotationData } = useCreateDraft();

  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  const handleContinue = () => {
    nextStep();
  };

  useEffect(
    () => {
      if (pickUpDate && !selectedDate) {
        // Check if pickUpDate matches API today or tomorrow dates
        const apiTodayDate = timeslots?.today?.date ? parseApiDate(timeslots.today.date) : null;
        const apiTomorrowDate = timeslots?.tomorrow?.date ? parseApiDate(timeslots.tomorrow.date) : null;
        
        // Only set selectedDate if it's a custom date (not today or tomorrow from API)
        if (pickUpDate !== apiTodayDate && pickUpDate !== apiTomorrowDate) {
          const date = moment(pickUpDate, "MM-DD-YYYY").toDate();
          setSelectedDate(date);
        }
      }
    }, // eslint-disable-next-line react-hooks/exhaustive-deps
    [pickUpDate, timeslots]
  );

  const handleDateSelect = (date: Date, isCustom?: Boolean, dateType?: "today" | "tomorrow") => {
    setSelectedDate(isCustom ? date : null);
    setPickUpSlot("");
    
    // Use API date for today/tomorrow to prevent timezone conflicts
    let dateToStore: string;
    if (dateType === "today" && timeslots?.today?.date) {
      dateToStore = parseApiDate(timeslots.today.date);
    } else if (dateType === "tomorrow" && timeslots?.tomorrow?.date) {
      dateToStore = parseApiDate(timeslots.tomorrow.date);
    } else {
      // For custom dates, use the selected date
      dateToStore = moment(date).format(dateFormat);
    }
    
    setPickUpDate(dateToStore);
    updateDrafQuotationData(
      {
        pickUpDate: dateToStore,
        spaceInProperty,
        howFurnished,
      },
      "pickUpDate"
    );
  };

  const tabClass = (date: Date | null, dateType?: "today" | "tomorrow") => {
    if (!pickUpDate) return "buttonClass w-100 fw-bold";
    
    let compareDateStr: string;
    if (dateType === "today" && timeslots?.today?.date) {
      compareDateStr = parseApiDate(timeslots.today.date);
    } else if (dateType === "tomorrow" && timeslots?.tomorrow?.date) {
      compareDateStr = parseApiDate(timeslots.tomorrow.date);
    } else {
      compareDateStr = moment(date).format(dateFormat);
    }
    
    let activeClass = pickUpDate === compareDateStr;
    return `buttonClass w-100 fw-bold   ${activeClass && "innerActive"}`;
  };

  return (
    <div>
      <h1>Date & Time</h1>
      <div className="roomContainer typeOfSpace datetimepicker mt-4">
        <div className="typeOfSpace__inner">
          <WithDateForPikup
            timeslots={timeslots}
            date={pickUpDate}
            selected={timeslots?.today?.date ? parseApiDate(timeslots.today.date) : moment(today).format(dateFormat)}
          >
            <Button
              className={tabClass(new Date(), "today")}
              onClick={() => handleDateSelect(new Date(), false, "today")}
            >
              Today
            </Button>
          </WithDateForPikup>
        </div>
        <div className="typeOfSpace__inner">
          <WithDateForPikup
            timeslots={timeslots}
            date={pickUpDate}
            selected={timeslots?.tomorrow?.date ? parseApiDate(timeslots.tomorrow.date) : moment(tomorrow).format(dateFormat)}
          >
            <Button
              className={tabClass(moment().add(1, "days").toDate(), "tomorrow")}
              onClick={() =>
                handleDateSelect(moment().add(1, "days").toDate(), false, "tomorrow")
              }
            >
              Tomorrow
            </Button>
          </WithDateForPikup>
        </div>
        <div className="datePickerContainer typeOfSpace__inner">
          <WithDateForPikup
            timeslots={timeslots}
            date={pickUpDate}
            selected={selectedDate}
            key={pickUpDate} // Add key to force re-render when date changes
          >
            {/* <DatePicker
              className={tabClass(selectedDate)}
              selected={selectedDate}
              onChange={(date: Date) => handleDateSelect(date, true)}
              dateFormat="dd/MM/yyyy"
              placeholderText="Choose a Date"
              minDate={moment().add(2, "days").toDate()}
            /> */}
            <CustomDatePicker
              value={selectedDate}
              onChange={(date: Date) => handleDateSelect(date, true)}
              isTimeSlot={true}
              minDate={moment().add(1, "days").toDate()}
            // onChange={(newValue:any) =>
            //                 setFieldValue("dob", moment(newValue).format("YYYY-MM-DD"))
            // }
            // label={"Choose a Date"}
            // error={errors?.dob}
            />
          </WithDateForPikup>
        </div>
      </div>
      <div className="timezoneAlerts">
        <div className="timezoneCard">
          <div className="timezoneCard__header">
            <span className="timezoneCard__icon" aria-hidden>i</span>
            <span className="timezoneCard__title">Melbourne Time (AEST/AEDT)</span>
          </div>
          <p className="timezoneCard__body">
            Your selected time slot is our arrival window, not the total booking duration.<br />
            Movers will contact you before arrival.
          </p>
        </div>
      </div>
<ContinueButton
        validationKey="pickUpSlot"
        validationMessage="Please select a time slot to continue"
        onClick={handleContinue}
      />
      
    </div>
  );
};

const WithDateForPikup = ({ children, date, selected, timeslots }: any) => {
  // selected is now a string in MM-DD-YYYY format (from API or local)
  const selectedDateStr = typeof selected === "string" ? selected : moment(selected).format(dateFormat);
  const compareDate = moment(date, dateFormat);
  const activeClass = selectedDateStr === date;
  const isToday = checkIsToday(date, timeslots);
  const isTommarow = checkIsTommarow(date, timeslots);
  const [isExpanded, setIsExpanded] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const manuallyExpandedRef = useRef(false);
  const manuallyCollapsedRef = useRef(false);

  const {
    nextStep,
    setPickUpSlot,
    setPickupStartTime,
    setPickupEndTime,
    jobBooking: { pickUpSlot },
  } = useJobBooking();

  const { updateDrafQuotationData } = useCreateDraft();

  // Get slots based on date type from the new API structure
  const getSlotsForDate = () => {
    if (isToday) {
      return timeslots?.today?.slots || [];
    } else if (isTommarow) {
      return timeslots?.tomorrow?.slots || [];
    } else {
      return timeslots?.custom?.slots || [];
    }
  };

  const currentDateSlots = getSlotsForDate();
  const selectedSlot = currentDateSlots.find((slot: any) => slot._id === pickUpSlot);

  // For today, show all slots (including ASAP if active) with ASAP first
  // For tomorrow and custom dates, show only regular slots (no ASAP)
  const displayTimeslots = isToday
    ? [...currentDateSlots].sort((a: any, b: any) => {
        // Put ASAP first
        if (a?.name === "ASAP") return -1;
        if (b?.name === "ASAP") return 1;
        return 0;
      })
    : currentDateSlots.filter((slot: any) => slot?.name !== "ASAP");

  const handelDateSelect = (id: string) => {
    const selectedSlot = currentDateSlots.find((slot: any) => slot._id === id);
    setPickUpSlot(id);

    // Save pickupStartTime and pickupEndTime if slot is not ASAP
    if (selectedSlot && selectedSlot.name !== "ASAP") {
      setPickupStartTime(selectedSlot.startTime || "");
      setPickupEndTime(selectedSlot.endTime || "");
    } else {
      // Clear times for ASAP slot
      setPickupStartTime("");
      setPickupEndTime("");
    }

    nextStep();
    updateDrafQuotationData(id, "pickUpSlot");
  };

  // Handle click outside to collapse
  useEffect(() => {
    if (!isExpanded) return;

    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Node;
      
      // Check if click is on a date picker button (don't collapse if clicking on tab buttons)
      const clickedButton = (target as Element).closest('button');
      const isDatePickerButton = clickedButton && (
        clickedButton.classList.contains('buttonClass') || 
        clickedButton.closest('.typeOfSpace__inner')
      );
      
      // Don't collapse if clicking on a date picker button (let the button's onClick handle it)
      if (isDatePickerButton) {
        return;
      }
      
      // Check if click is outside the container
      if (containerRef.current && !containerRef.current.contains(target)) {
        manuallyCollapsedRef.current = true;
        setIsExpanded(false);
        manuallyExpandedRef.current = false;
      }
    };

    // Use capture phase to catch clicks earlier
    document.addEventListener('mousedown', handleClickOutside, true);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside, true);
    };
  }, [isExpanded]);

  // Auto-expand when date becomes active, collapse when inactive
  useEffect(() => {
    if (activeClass) {
      // Always expand when tab becomes active (unless manually collapsed)
      // If manually expanded, definitely expand
      // Otherwise, expand if not manually collapsed
      if (manuallyExpandedRef.current || !manuallyCollapsedRef.current) {
        setIsExpanded(true);
      }
      // Reset flags once tab becomes active
      manuallyExpandedRef.current = false;
      manuallyCollapsedRef.current = false;
    } else {
      // Only collapse when tab becomes inactive if it wasn't just manually expanded
      // This prevents collapsing when clicking on an inactive tab that's about to become active
      if (isExpanded && !manuallyExpandedRef.current) {
        setIsExpanded(false);
      }
    }
  }, [activeClass]);

  // Auto-select ASAP when Today is selected and ASAP is available
  useEffect(() => {
    if (activeClass && isToday && !pickUpSlot && currentDateSlots.length > 0) {
      const asapSlot = currentDateSlots.find((slot: any) => slot?.name === "ASAP" && slot?.active);
      if (asapSlot) {
        setPickUpSlot(asapSlot._id);
        setPickupStartTime("");
        setPickupEndTime("");
        updateDrafQuotationData(asapSlot._id, "pickUpSlot");
      }
    }
  }, [activeClass, isToday, pickUpSlot, currentDateSlots, setPickUpSlot, setPickupStartTime, setPickupEndTime, updateDrafQuotationData]);

  // Handle button click to toggle expansion
  const handleButtonClick = (event: React.MouseEvent) => {
    // Check if this tab is currently active
    const isCurrentlyActive = activeClass;
    
    // If this tab is not active, mark that we're manually expanding it BEFORE updating state
    // This prevents the activeClass useEffect from collapsing it
    if (!isCurrentlyActive) {
      manuallyExpandedRef.current = true;
      manuallyCollapsedRef.current = false; // Reset collapse flag when manually expanding
      setIsExpanded(true);
    }
    
    // Call the original onClick if it exists (this updates the date)
    if (children.props.onClick) {
      children.props.onClick(event);
    }
    
    // If this tab is already active, toggle expansion
    if (isCurrentlyActive) {
      setIsExpanded(!isExpanded);
      manuallyExpandedRef.current = false;
      manuallyCollapsedRef.current = !isExpanded; // Track if we're collapsing
    }
    // Note: For inactive tabs, we don't reset manuallyExpandedRef here
    // It will be reset in the activeClass useEffect once the tab becomes active
  };

  return (
    <div className={`${activeClass ? "timeactive" : ""}`} ref={containerRef}>
      {React.cloneElement(children, { onClick: handleButtonClick })}
      {activeClass && isExpanded && (
        <div className="typeofbutton">
          <span className="tagline"> Estimated Arrival</span>
          {displayTimeslots.length > 0 ? (
            displayTimeslots?.map((slot: any, idx: number) => {
              // Slot is disabled only if API says it's inactive
              const isDisabled = !slot?.active;

              return (
                <Button
                  disabled={isDisabled}
                  key={slot?._id}
                  onClick={() => handelDateSelect(slot?._id)}
                  className={`buttonClass w-100 mt-2 mb-2 text-center justify-content-center pt-0 ${selectedSlot?._id === slot?._id && "innerbtnActive"
                    }`}
                >
                  {selectedSlot?._id === slot?._id ? (
                    <Image src="/checked.svg" alt="" className="checkedbox" />
                  ) : (
                    <Image src="/checkbox.svg" alt="" className="checkbox" />
                  )}
                  <span 
                    style={{ 
                      backgroundColor: isDisabled ? "gray" : "",
                      fontWeight: slot?.name === "ASAP" ? "600" : "normal"
                    }}
                  >
                    {slot?.name === "ASAP" ? "ASAP Arrival" : `${slot?.name} `}
                  </span>
                  <LuClock7 />
                </Button>
              );
            })
          ) : (
            <></>
          )}
        </div>
      )}
    </div>
  );
};

export default DateForPikup;
