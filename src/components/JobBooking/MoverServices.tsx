import { FC, Suspense } from "react";
import OyoServices from "./OyoServices";
import StepHandler from "./StepHandler";
import ContinueButton from "./ContinueButton";

const MoverServices: FC = () => {
  return (
    <StepHandler step={0}>
      <div className="moverServiceSectionWrapper">
        <div className="moverHeader">
          <h1>What&apos;s Your Next Move?</h1>
          <p>Select a category and we&apos;ll get you moving</p>
        </div>
        <Suspense fallback={<ServicesLoader />}>
          <OyoServices />
        </Suspense>
        <ContinueButton
          validationKey="moverService"
          validationMessage="Please select a service to continue"
        />
      </div>
    </StepHandler>
  );
};

export default MoverServices;


const ServicesLoader = async () => {
  return <div className="loading-skeleton" >
    <div className="serviceLoading" />
    <div className="serviceLoading" />
    <div className="serviceLoading" />
    <div className="serviceLoading" />
    <div className="serviceLoading" />
    <div className="serviceLoading" />
  </div>
}