"use client";

import { useJobBooking } from "./JobBookingHook";
import Button from "../Button";
import StepHandler from "./StepHandler";
import useCreateDraft from "@/utils/hooks/useCreateDraft";
import ContinueButton from "./ContinueButton";

const HowFurnished = () => {
  const {
    nextStep,
    setHowFurnished,
    jobBooking: { spaceInProperty, howFurnished },
  } = useJobBooking();
  const { updateDrafQuotationData } = useCreateDraft();

  const handleSubmit = (mode: string) => {
    nextStep();
    nextStep();
    setHowFurnished(mode);
    updateDrafQuotationData(mode, 'howFurnished')
  };

  const handleContinue = () => {
    nextStep();
    nextStep();
  };

  return (
    <StepHandler step={3} blockOnService="Labour Only">
      <h1 className="mb-3">How Furnished</h1>
      {/* <h1 className="mb-4">{`How Furnished is your ${spaceInProperty}`}?</h1> */}
      <div className="moverfurnished ">
        <Button
          variant="secondary"
          onClick={() => handleSubmit("Lightly")}
          className={`buttonClass ${howFurnished === "Lightly" && "innerActive"}`}
        >
          Lightly
        </Button>
        <Button
          variant="secondary"
          onClick={() => handleSubmit("Moderately")}
          className={`buttonClass ${howFurnished === "Moderately" && "innerActive"}`}
        >
          Moderately
        </Button>
        <Button
          variant="secondary"
          onClick={() => handleSubmit("Heavily")}
          className={`buttonClass ${howFurnished === "Heavily" && "innerActive"}`}
        >
          Heavily
        </Button>
      </div>
      <ContinueButton
        validationKey="howFurnished"
        validationMessage="Please select how furnished your space is"
        onClick={handleContinue}
      />
    </StepHandler>
  );
};

export default HowFurnished;
