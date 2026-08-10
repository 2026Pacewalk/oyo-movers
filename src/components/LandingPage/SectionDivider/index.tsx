import React from "react";
import { FaTruckMoving } from "react-icons/fa";
import "./sectionDivider.scss";

/* Decorative "moving" divider — a road with lane markings and a driving truck.
   Purely visual; hidden from assistive tech. */
const SectionDivider = () => (
  <div className="section-divider" aria-hidden="true">
    <span className="sd-road sd-road-left" />
    <span className="sd-dot" />
    <span className="sd-truck">
      <FaTruckMoving />
    </span>
    <span className="sd-dot" />
    <span className="sd-road sd-road-right" />
  </div>
);

export default SectionDivider;
