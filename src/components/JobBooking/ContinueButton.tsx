"use client";

import React, { useState } from "react";
import IconButton from "../IconButton";
import { FaArrowRight } from "react-icons/fa6";
import { useJobBooking } from "./JobBookingHook";

interface ContinueButtonProps {
  validationKey: string;
  validationMessage?: string;
  className?: string;
  title?: string;
  disabled?: boolean;
  onClick?: () => void;
}

const ContinueButton: React.FC<ContinueButtonProps> = ({
  validationKey,
  validationMessage = "Please complete the required fields to continue",
  className = "buttonClass",
  title = "Continue",
  disabled = false,
  onClick
}) => {
  const { nextStep, jobBooking, labour } = useJobBooking();
  const [isLoading, setIsLoading] = useState(false);

  const getValidationValue = () => {
    switch (validationKey) {
      case "moverService":
        return jobBooking.moverService;
      case "spaceInProperty":
        return jobBooking.spaceInProperty;
      case "howWeHelp":
        return labour.howWeHelp;
      case "howFurnished":
        return jobBooking.howFurnished;
      case "pickUpDate":
        return jobBooking.pickUpDate;
      case "pickUpSlot":
        return jobBooking.pickUpDate && jobBooking.pickUpSlot;
      case "vehicleType":
        return jobBooking.vehicleType;
      default:
        return true; // Default to enabled if validation key not found
    }
  };

  const isDisabled = disabled || !getValidationValue() || isLoading;

  const handleClick = async () => {
    if (isLoading) return;

    setIsLoading(true);
    try {
      if (onClick) {
        await onClick();
      } else {
        nextStep();
      }
    } catch (error) {
      console.error('Error in continue button:', error);
    } finally {
      // Add a small delay to show the loading state
      setTimeout(() => {
        setIsLoading(false);
      }, 500);
    }
  };

  const LoadingSpinner = () => (
    <div className="spinner-border spinner-border-sm" role="status" style={{ width: '16px', height: '16px' }}>
      <span className="visually-hidden">Loading...</span>
    </div>
  );

  return (
    <div className="continueButtonWrap d-flex justify-content-end mt-4">
      <IconButton
        className={`continueStepButton ${className}`}
        title={isLoading ? "Processing..." : title}
        iconPosition="right"
        icon={isLoading ? <LoadingSpinner /> : <FaArrowRight />}
        onClick={handleClick}
        disabled={isDisabled}
      />
    </div>
  );
};

export default ContinueButton;
