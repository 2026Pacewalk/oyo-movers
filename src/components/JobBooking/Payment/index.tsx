import React, { Suspense } from "react";
import StepHandler from "../StepHandler";
import PaymentPage from "./Payment";

const PaymentWapper = () => {
  return (
    <StepHandler step={9}>
      <Suspense fallback={<div>Payment loading...</div>}>
        <PaymentPage />
      </Suspense>
    </StepHandler>
  );
};

export default PaymentWapper;
