"use client";
import React from "react";

interface DobDatePickerProps {
  value?: string;
  onChange: (date: string) => void;
  placeholder?: string;
  error?: string | boolean;
}

const DobDatePicker: React.FC<DobDatePickerProps> = ({ value, onChange, placeholder = "Select date of birth", error }) => {
  const today = new Date();
  const cutoff = new Date(today.getFullYear() - 16, today.getMonth(), today.getDate());
  const max = cutoff.toISOString().split("T")[0];

  return (
    <div>
      <input
        type="date"
        className="form-control"
        value={value || ""}
        onChange={(e) => onChange(e.target.value)}
        max={max}
        placeholder={placeholder}
        style={{ fontSize: 14 }}
      />
      {error ? <span className="errorMessage">{error}</span> : null}
    </div>
  );
};

export default DobDatePicker;


