"use client";
import React from "react";
import "./stephandler.scss";
import { useJobBooking } from "../JobBookingHook";
import Button from "../../Button";
import { useUserData } from "@/components/User/UserDataHook";

const  StepHandler=({
  children,
  step,
  blockOnService,
  showOnly,
}: {
  children: React.ReactNode;
  step: number;
  blockOnService?: string;
  showOnly?: string;
})=> {
  const { activeStep, moverServices, setStep } = useJobBooking();
  const jumpStepServices = ["Store Delivery", "Haul Away", "Few Items",'Something Else'];
  const { user } = useUserData();
  if (activeStep !== step) return <></>;

  if (moverServices && (blockOnService === moverServices)) return <></>;
  if (showOnly && (showOnly !== moverServices)) return <></>;

  const handelBackClick = () => {

    if (activeStep === 9) {
      if (moverServices === "Labour Only" && user?.email) {
        setStep(step - 3);
      }else if (activeStep === 9 && user?.email) {
        setStep(step - 2);
      } else {
        setStep(step - 1);
      }
      return;
    }  
     else if (activeStep === 8 && moverServices === "Labour Only") {
      setStep(step - 2);
    } else if (activeStep === 5 && jumpStepServices.includes(moverServices)) {
      setStep(step - 4);
    } else if (activeStep === 5 && moverServices === "Office Relocation") {
      setStep(step - 3);
    } else if (activeStep === 5 && moverServices !== "Labour Only") {
      setStep(step - 2);
    }    
    else {
      setStep(step - 1);
    }
  };
  return (
    <>
      {step > 0 && (
        <Button onClick={() => handelBackClick()} className="backbtn">
          {" "}
          ← Back
        </Button>
      )}
      {children}
    </>
  );
}
export default React.memo(StepHandler);
