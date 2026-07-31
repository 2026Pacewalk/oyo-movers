"use client";

import React from "react";
import Image from "@/components/Image";
import { LuClock7 } from "react-icons/lu";

type OpfSlotRowProps = {
  slot: any;
  selected: boolean;
  disabled?: boolean;
  onSelect: () => void;
};

const OpfSlotRow: React.FC<OpfSlotRowProps> = ({ slot, selected, disabled, onSelect }) => {
  const label = slot.name === "ASAP" ? "ASAP" : slot.name;

  return (
    <button
      type="button"
      disabled={disabled}
      className={`opf-radio-row opf-slot-row ${selected ? "selected" : ""}`}
      onClick={onSelect}
    >
      <span className="opf-radio-indicator">
        {selected ? (
          <Image src="/checked.svg" alt="" className="opf-radio-icon" />
        ) : (
          <Image src="/checkbox.svg" alt="" className="opf-radio-icon" />
        )}
      </span>
      <span className={`opf-slot-row__label ${slot.name === "ASAP" ? "asap" : ""}`}>{label}</span>
      <LuClock7 className="opf-slot-row__clock" />
    </button>
  );
};

export default OpfSlotRow;
