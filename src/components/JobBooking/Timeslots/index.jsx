import React, { Suspense } from "react";
import StepHandler from "../StepHandler";
import Timeslots from "./Timeslots";

const TimeslotsWapper = () => {
  return (
    <StepHandler step={5}>
      <Suspense fallback={<div>Timeslots Loading...</div>}>
        <Timeslots />
      </Suspense>
    </StepHandler>
  );
};

export default TimeslotsWapper;
