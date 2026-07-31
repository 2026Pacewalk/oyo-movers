"use client";

import { useJobBooking } from "./JobBookingHook";
import IconButton from "../IconButton";
import { FaArrowRight } from "react-icons/fa6";
import { RiSubtractFill } from "react-icons/ri";
import { IoMdAdd } from "react-icons/io";
import StepHandler from "./StepHandler";

const HelperRequiredTime = () => {
  const {
    nextStep,
    setHelperTime,
    labour: { helperTime },
  } = useJobBooking();
  const counterButton = (icon: any, click: any, disabled?: boolean) => (
    <IconButton
      className="addStopButton hrBtn "
      iconPosition="left"
      icon={icon}
      onClick={click}
      disabled={disabled}
    />
  );
  return (
    <StepHandler step={4} showOnly="Labour Only">
      <div className="timeNeedHelpderWrapper">
        <h1>{"Time do you need Helpers for?"} </h1>
        <p className="mt-3">
          {
            "(You will be charged for the full-time block even your job finishes early)  "
          }
        </p>
        <div className="mt-4 mb-3 roomContainer typeOfSpace text-center timeNeedHelpderWrapper__innerContent">
          {counterButton(
            <RiSubtractFill />,
            () => helperTime > "2" && setHelperTime(parseInt(helperTime) - 1),
            helperTime <= "2"
          )}
          {helperTime}
          {counterButton(<IoMdAdd />, () =>
            setHelperTime(parseInt(helperTime) + 1)
          )}
        </div>
        <h6 className="justify-content-center d-flex helperContent">
          {" "}
          (2 Hours Minimum)
        </h6>
        <div className="continueButtonWrap d-flex justify-content-end ">
          <IconButton
            className="buttonClass continueStepButton"
            title="Continue"
            iconPosition="right"
            icon={<FaArrowRight />}
            onClick={() => nextStep()}
          />
        </div>
      </div>
    </StepHandler>
  );
};

export default HelperRequiredTime;
