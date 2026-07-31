"use client";

import React from "react";
import { formatOpfVehicleLabel } from "./formatOpfVehicleLabel";

type OpfVehicleRowProps = {
  vehicle: any;
  selected: boolean;
  onSelect: () => void;
};

const OpfVehicleRow: React.FC<OpfVehicleRowProps> = ({ vehicle, selected, onSelect }) => {
  const { title: name, men } = formatOpfVehicleLabel(vehicle);

  return (
    <button
      type="button"
      className={`opf-vehicle-row ${selected ? "selected" : ""}`}
      onClick={onSelect}
    >
      <span className={`opf-vehicle-row__radio ${selected ? "opf-vehicle-row__radio--checked" : ""}`} aria-hidden />
      <span className="opf-vehicle-row__main">
        <span className="opf-vehicle-row__name">{name}</span>
        {men ? <span className="opf-men-badge">{men}</span> : null}
      </span>
      <span className="opf-vehicle-row__price">
        ${vehicle.moverPrice}
        <span className="opf-vehicle-row__unit">/ 30mins.</span>
      </span>
    </button>
  );
};

export default OpfVehicleRow;
