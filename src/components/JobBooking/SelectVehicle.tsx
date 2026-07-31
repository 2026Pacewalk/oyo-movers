import { FC, Suspense } from "react";
import { Row, Col } from "react-bootstrap";
import StepHandler from "./StepHandler";
import AvailableRequirements from "./AvailableRequirement";
import ActionButton from "./AvailableRequirement/ActionButton";
import SetDefaultMediumTruck from "./AvailableRequirement/SetDefaultMediumTruck";
import "./SelectVehicle/SelectVehicle.scss";
import { BsInfoCircle } from "react-icons/bs";

const SelectVehicle: FC = () => {
  return (
    <StepHandler step={7} blockOnService="Labour Only">
      <div className="selectVehiclePage">
        <div className="selectVehicleHeader">
          <h1 className="selectVehicleTitle">Select Vehicle</h1>
        </div>
        <Row className="g-3 selectVehicleList">
          <style dangerouslySetInnerHTML={{
            __html: `
              .mobileScrollableContainer {
                height: 100%;
                width: 100%;
                display: flex;
                flex-direction: column;
                gap: 0.75rem;
              }
              @media (max-width: 480px) {
                .mobileScrollableContainer {
                  height: 51vh;
                  overflow-y: auto;
                  overflow-x: hidden;
                }
              }
            `
          }} />
          <Suspense fallback={<div>Requirements loading...</div>}>
            <SetDefaultMediumTruck />
            <div className="mobileScrollableContainer">
              <AvailableRequirements />
            </div>
            <Col xxl={10} xl={12} lg={12} md={12} sm={12} xs={12} className="notesection-container">
              <div className="notesection mb-2" style={{ gap: "4px", display: "flex", width: "100%" }}>
                <BsInfoCircle style={{ color: '#666', fontSize: '18px', marginRight: "8px" }} />
                Not sure of Truck size? Please call <a href="tel:1300 01 31 31" style={{ fontWeight: 600, fontSize: "15px", color: "#000", textDecoration: "none" }}>1300 01 31 31.</a>
              </div>
            </Col>
            <Col xxl={10} xl={12} lg={12} md={12} sm={12} xs={12}>
              <ActionButton />
            </Col>
          </Suspense>
        </Row>
      </div>
    </StepHandler>
  );
};

export default SelectVehicle;
