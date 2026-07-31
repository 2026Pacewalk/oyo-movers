import React from "react";
import "./datePicker.scss";
import { DatePicker } from "./DatePicker";

interface CustomDatePickerProps {
  value: any;
  onChange: any;
  label?: string;
  setFieldValue?: any;
  error?: string;
  placeholder?: string;
  isTimeSlot?: boolean;
  minDate?: Date;
}

const CustomDatePicker: React.FC<CustomDatePickerProps> = ({
  value,
  onChange,
  placeholder,
  label,
  error,
  isTimeSlot,
  minDate,
}) => {
  return (
    <div className="custmDatePicker mb-3 mt-1">
      {isTimeSlot && (
        <div
          className={`datePickerTrigger ${
            isTimeSlot ? "datePickerTriggerHide" : ""
          }`}
        >
          <DatePicker
            date={value ? new Date(value) : ""}
            onChange={onChange}
            placeholder={"Choose a Date"}
            minDate={minDate}
          />
        </div>
      )}
      {label && <label> {label}</label>}
      {!isTimeSlot && (
        <DatePicker
          date={value ? new Date(value) : ""}
          onChange={onChange}
          placeholder={placeholder}
          minDate={minDate}
        />
      )}

      {error ? <span className="errorMessage">{error}</span> : null}
    </div>
  );
};

export default CustomDatePicker;
