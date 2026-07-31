"use client";

import React, { useState } from "react";
import AppInitializer from "../JobInitializer";
import OnePageBookingForm from "./OnePageBookingForm";
import OnePageBookingReview from "./OnePageBookingReview";
import OpfBookingHeader from "./OpfBookingHeader";
import "./one-page-mobile.scss";

type OnePageMobileBookingProps = {
  timeslots: any;
  availableRequirements: any;
  services: any;
};

const OnePageMobileBooking: React.FC<OnePageMobileBookingProps> = ({
  timeslots,
  availableRequirements,
  services,
}) => {
  const [step, setStep] = useState<"form" | "review">("form");

  return (
    <AppInitializer
      timeslots={timeslots}
      availableRequirements={availableRequirements}
      services={services}
    >
      <div className="one-page-booking-shell">
      <OpfBookingHeader onBack={step === "review" ? () => setStep("form") : undefined} />
      <div className="one-page-booking-flow">
        {step === "form" ? (
          <OnePageBookingForm onContinue={() => setStep("review")} />
        ) : (
          <OnePageBookingReview />
        )}
      </div>
      </div>
    </AppInitializer>
  );
};

export default OnePageMobileBooking;
