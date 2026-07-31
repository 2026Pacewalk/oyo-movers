"use client";

import React from "react";

type OpfServiceRowProps = {
  service: any;
  selected: boolean;
  onSelect: () => void;
};

const OpfServiceRow: React.FC<OpfServiceRowProps> = ({ service, selected, onSelect }) => (
  <button
    type="button"
    className={`opf-vehicle-row ${selected ? "selected" : ""}`}
    onClick={onSelect}
  >
    <span
      className={`opf-vehicle-row__radio ${selected ? "opf-vehicle-row__radio--checked" : ""}`}
      aria-hidden
    />
    <span className="opf-vehicle-row__main">
      <span className="opf-vehicle-row__name">{service.name}</span>
    </span>
  </button>
);

export default OpfServiceRow;
