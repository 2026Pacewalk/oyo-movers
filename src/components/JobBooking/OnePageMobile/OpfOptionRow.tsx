"use client";

import React from "react";

type OpfOptionRowProps = {
  label: string;
  selected: boolean;
  onSelect: () => void;
};

/** Same row UI as OpfServiceRow / OpfVehicleRow — for rooms, office size, furnished, etc. */
const OpfOptionRow: React.FC<OpfOptionRowProps> = ({ label, selected, onSelect }) => (
  <button type="button" className={`opf-vehicle-row ${selected ? "selected" : ""}`} onClick={onSelect}>
    <span
      className={`opf-vehicle-row__radio ${selected ? "opf-vehicle-row__radio--checked" : ""}`}
      aria-hidden
    />
    <span className="opf-vehicle-row__main">
      <span className="opf-vehicle-row__name">{label}</span>
    </span>
  </button>
);

export default OpfOptionRow;
